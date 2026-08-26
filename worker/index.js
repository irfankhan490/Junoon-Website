// Cloudflare Worker entry point for the Junoon Tea site.
//
// This Worker does two things:
//   1. Serves the built Vite/React SPA from the `dist/` static assets
//      (via the ASSETS binding configured in wrangler.jsonc) for every
//      normal page request — unchanged from before this file existed.
//   2. Handles one backend route, POST /api/send-order — the only piece
//      of "backend" this project has. It receives the order placed at
//      checkout and emails it to the business owner (and, optionally,
//      the customer) via Resend's HTTP API, using an API key stored as
//      a Worker secret that is never shipped to the browser.
//
// No database is used. Orders are still recorded in the customer's own
// browser via localStorage (see src/context/CartContext.jsx) exactly as
// before — this Worker only adds the guaranteed email notification step.

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const GENERIC_ERROR = 'Could not send order notification.'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/api/send-order') {
      if (request.method !== 'POST') {
        return json({ ok: false, error: 'Method not allowed.' }, 405)
      }
      return handleSendOrder(request, env)
    }

    // Everything else: serve the static SPA. SPA fallback (unknown routes
    // resolving to index.html) is handled by `not_found_handling` on the
    // assets binding in wrangler.jsonc — no extra logic needed here.
    return env.ASSETS.fetch(request)
  },
}

async function handleSendOrder(request, env) {
  let order
  try {
    order = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid request body.' }, 400)
  }

  const problem = validateOrder(order)
  if (problem) {
    return json({ ok: false, error: problem }, 400)
  }

  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured on this Worker — cannot send order emails.')
    return json({ ok: false, error: GENERIC_ERROR }, 500)
  }

  // Defaults to the Resend account's own email (required for the free
  // onboarding@resend.dev sender to work without a verified domain — see
  // DEPLOYMENT.md). Override via the ORDER_NOTIFICATION_EMAIL Cloudflare
  // variable at any time without a code change or redeploy.
  const notifyEmail = env.ORDER_NOTIFICATION_EMAIL || 'iktraders490@gmail.com'
  const fromAddress = env.ORDER_FROM_EMAIL || 'Junoon Tea Website <onboarding@resend.dev>'

  // 1. Business notification — the critical email. If this fails, the
  //    order is NOT considered placed, so the customer sees an honest
  //    error instead of a false "success".
  const businessResult = await sendEmail(env.RESEND_API_KEY, {
    from: fromAddress,
    to: [notifyEmail],
    subject: `New Junoon Tea Order #${order.orderNumber}`,
    html: renderBusinessEmail(order),
  })

  if (!businessResult.ok) {
    console.error('Resend business notification failed:', businessResult.error)
    return json({ ok: false, error: GENERIC_ERROR }, 502)
  }

  // 2. Optional customer confirmation — best-effort only. This commonly
  //    fails until a custom sending domain is verified in Resend, which
  //    must never take down the actual order.
  if (order.customer?.email) {
    const customerResult = await sendEmail(env.RESEND_API_KEY, {
      from: fromAddress,
      to: [order.customer.email],
      subject: `Order #${order.orderNumber} Received`,
      html: renderCustomerEmail(order),
    })
    if (!customerResult.ok) {
      console.error('Resend customer confirmation failed (non-fatal):', customerResult.error)
    }
  }

  return json({ ok: true, orderNumber: order.orderNumber })
}

function validateOrder(order) {
  if (!order || typeof order !== 'object') return 'Missing order payload.'
  if (!order.orderNumber) return 'Missing order number.'
  if (!order.customer?.name || !order.customer?.phone || !order.customer?.address) {
    return 'Missing required customer details.'
  }
  if (!Array.isArray(order.items) || order.items.length === 0) return 'Order has no items.'
  return null
}

async function sendEmail(apiKey, payload) {
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      return { ok: false, error: `${res.status} ${text}`.trim() }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err?.message || 'Network error calling Resend.' }
  }
}

function money(amount) {
  const n = Number(amount) || 0
  return `Rs. ${n.toLocaleString('en-PK')}`
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return iso
  }
}

function paymentLabel(id) {
  return { cod: 'Cash on Delivery', easypaisa: 'EasyPaisa / JazzCash', bank: 'Bank Transfer' }[id] || id || 'Not specified'
}

function renderBusinessEmail(order) {
  const { orderNumber, customer = {}, items = [], subtotal, deliveryFee, total, placedAt, payment } = order

  const itemsHtml = items
    .map((i) => `<li>${escapeHtml(i.name)} &times; ${i.qty} — ${money(i.unitPrice * i.qty)}</li>`)
    .join('')

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #2A1B10; max-width: 560px; line-height: 1.5;">
      <p>New order received from the Junoon Tea website.</p>
      <p><strong>Order Number:</strong> ${escapeHtml(orderNumber)}</p>

      <h3 style="margin-bottom: 4px;">Customer Information</h3>
      <p style="margin-top: 0;">
        Name: ${escapeHtml(customer.name)}<br />
        Phone: ${escapeHtml(customer.phone)}<br />
        ${customer.email ? `Email: ${escapeHtml(customer.email)}<br />` : ''}
        Address: ${escapeHtml(customer.address)}${customer.city ? `, ${escapeHtml(customer.city)}` : ''}
        ${customer.notes ? `<br />Notes: ${escapeHtml(customer.notes)}` : ''}
      </p>

      <h3 style="margin-bottom: 4px;">Order Details</h3>
      <ul style="margin-top: 0; padding-left: 20px;">${itemsHtml}</ul>

      <p>
        Subtotal: ${money(subtotal)}<br />
        Delivery: ${deliveryFee === 0 ? 'Free' : money(deliveryFee)}<br />
        <strong>Total: ${money(total)}</strong>
      </p>

      <p>Payment method: ${escapeHtml(paymentLabel(payment))}</p>
      <p>Order Date: ${formatDate(placedAt)}</p>
      <p>WhatsApp Confirmation: Not confirmed yet</p>
    </div>
  `
}

function renderCustomerEmail(order) {
  const { orderNumber, customer = {}, items = [], total } = order
  const firstName = escapeHtml((customer.name || '').split(' ')[0] || 'there')
  const itemsHtml = items.map((i) => `<li>${escapeHtml(i.name)} &times; ${i.qty}</li>`).join('')

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #2A1B10; max-width: 560px; line-height: 1.5;">
      <p>Assalam-o-Alaikum ${firstName},</p>
      <p>Thank you for your order! Your order <strong>#${escapeHtml(orderNumber)}</strong> has been received successfully.</p>
      <ul style="padding-left: 20px;">${itemsHtml}</ul>
      <p><strong>Total: ${money(total)}</strong></p>
      <p>We have received your order details and will contact you shortly to confirm delivery.</p>
      <p>— Junoon Tea, One Tea Many Stories</p>
    </div>
  `
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ))
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

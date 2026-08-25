import { Link, useLocation, Navigate } from 'react-router-dom'
import { CheckCircle2, MessageCircle, Truck, Clock } from 'lucide-react'
import { formatPKR } from '../data/products.js'
import { BUSINESS, waLink } from '../data/business.js'

export default function OrderConfirmation() {
  const { state } = useLocation()
  const order = state?.order

  if (!order) {
    return <Navigate to="/shop" replace />
  }

  const { orderNumber, customer, items, total, payment, deliveryFee } = order

  return (
    <div className="section pt-10 md:pt-14">
      <div className="container max-w-3xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-leaf/15">
            <CheckCircle2 size={34} className="text-leaf" />
          </div>
          <h1 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">Order Placed Successfully! 🎉</h1>
          <p className="mt-2 max-w-md text-espresso-soft/75">
            Shukriya, {customer?.name?.split(' ')[0] || 'friend'} — your order <strong>{orderNumber}</strong> has
            been received successfully. We have your order details and will contact you shortly.
          </p>
          <p className="mt-4 rounded-full bg-espresso px-6 py-2 font-display text-lg font-bold text-gold">
            {orderNumber}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="card p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold">Order Details</h2>
            <div className="mt-4 divide-y divide-espresso/10">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-semibold">{item.name} <span className="text-espresso-soft/50">× {item.qty}</span></span>
                  <span className="font-bold">{formatPKR(item.unitPrice * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-espresso/10 pt-4 text-sm">
              <span className="text-espresso-soft/70">Delivery</span>
              <span className="font-semibold">{deliveryFee === 0 ? 'Free' : formatPKR(deliveryFee)}</span>
            </div>
            <div className="mt-2 flex justify-between text-base">
              <span className="font-bold">Total Amount</span>
              <span className="font-display font-bold text-chili">{formatPKR(total)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="card p-6">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold">
                <Truck size={18} className="text-chai-deep" /> Delivery Details
              </h3>
              <p className="mt-2 text-sm text-espresso-soft/75">
                {customer?.address}, {customer?.city}
              </p>
              <p className="mt-1 text-sm text-espresso-soft/75">{customer?.phone}</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-leaf-deep">
                <Clock size={13} /> Estimated: 1–3 days (in-city) / 3–5 days (other cities)
              </p>
              <p className="mt-2 text-xs text-espresso-soft/60">Payment method: {payment === 'cod' ? 'Cash on Delivery' : payment === 'easypaisa' ? 'EasyPaisa / JazzCash' : 'Bank Transfer'}</p>
            </div>

            <a
              href={waLink(BUSINESS.whatsapp[0], `Assalam-o-Alaikum, I just placed order ${orderNumber} on the Junoon Tea website.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark justify-center"
            >
              <MessageCircle size={16} /> Confirm via WhatsApp
            </a>
            <Link to="/shop" className="btn-outline justify-center">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'junoon-tea-cart-v1'
const ORDERS_KEY = 'junoon-tea-orders-v1'

function loadInitialState() {
  if (typeof window === 'undefined') return { items: [] }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? { items: JSON.parse(raw) } : { items: [] }
  } catch {
    return { items: [] }
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product, qty } = action.payload
      const existing = state.items.find((i) => i.id === product.id)
      const unitPrice = product.discountPrice ?? product.price
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + qty } : i
          ),
        }
      }
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            name: product.name,
            weight: product.weight,
            unitPrice,
            image: product.image,
            qty,
          },
        ],
      }
    }
    case 'UPDATE_QTY': {
      const { id, qty } = action.payload
      if (qty <= 0) {
        return { items: state.items.filter((i) => i.id !== id) }
      }
      return {
        items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
      }
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.id !== action.payload.id) }
    case 'CLEAR':
      return { items: [] }
    case 'HYDRATE':
      return { items: action.payload }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      /* storage unavailable — fail silently, cart still works in-memory */
    }
  }, [state.items])

  const totalWeightKg = useMemo(() => {
    return state.items.reduce((sum, item) => {
      const kgMatch = /([\d.]+)\s*kg|([\d.]+)\s*g/i.exec(item.weight || '')
      let kg = 0
      if (kgMatch) {
        if (kgMatch[1]) kg = parseFloat(kgMatch[1])
        else if (kgMatch[2]) kg = parseFloat(kgMatch[2]) / 1000
      }
      return sum + kg * item.qty
    }, 0)
  }, [state.items])

  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0),
    [state.items]
  )

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.qty, 0),
    [state.items]
  )

  const value = {
    items: state.items,
    itemCount,
    subtotal,
    totalWeightKg,
    addItem: (product, qty = 1) => dispatch({ type: 'ADD', payload: { product, qty } }),
    updateQty: (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } }),
    removeItem: (id) => dispatch({ type: 'REMOVE', payload: { id } }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

// Places an order: sends it to the Worker's /api/send-order route, which emails
// the business owner (and, optionally, the customer) via Resend — see
// worker/index.js. The order is only considered "placed" once that email is
// confirmed sent; on failure this throws so the checkout UI can show an honest
// error instead of a false success. A lightweight local record is still kept
// in localStorage (unchanged from before) purely for the customer's own device.
//
// `previous` lets a retry after a failed attempt reuse the same order number
// and timestamp instead of minting a new one each time — pass the `{ orderNumber,
// placedAt }` of a prior failed attempt (see src/pages/Checkout.jsx).
export async function placeOrder(order, previous = {}) {
  const orderNumber = previous.orderNumber || `JT-${Date.now().toString().slice(-6)}`
  const placedAt = previous.placedAt || new Date().toISOString()
  const fullOrder = { ...order, orderNumber, placedAt }

  const FAILURE_MESSAGE = "We couldn't complete your order right now. Please try again or contact us on WhatsApp."

  const fail = () => {
    // Carry the order number/timestamp on the error so the checkout UI can
    // retry with the SAME order identity instead of minting a new one.
    const err = new Error(FAILURE_MESSAGE)
    err.orderNumber = orderNumber
    err.placedAt = placedAt
    return err
  }

  let res
  try {
    res = await fetch('/api/send-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullOrder),
    })
  } catch {
    throw fail()
  }

  if (!res.ok) {
    throw fail()
  }

  try {
    const raw = window.localStorage.getItem(ORDERS_KEY)
    const orders = raw ? JSON.parse(raw) : []
    orders.push(fullOrder)
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  } catch {
    /* ignore storage errors — order confirmation still proceeds */
  }

  return fullOrder
}

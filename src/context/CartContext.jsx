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

// Orders are also mocked client-side (localStorage) so the checkout flow is fully
// demonstrable without a backend. Swap this for a real POST /api/orders call later —
// every call site already awaits placeOrder(), so the change is isolated to this file.
export function placeOrder(order) {
  const orderNumber = `JT-${Date.now().toString().slice(-6)}`
  const fullOrder = { ...order, orderNumber, placedAt: new Date().toISOString() }
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

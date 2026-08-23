import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { formatPKR } from '../data/products.js'
import { BUSINESS } from '../data/business.js'

export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, totalWeightKg, updateQty, removeItem } = useCart()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const freeDelivery = totalWeightKg >= BUSINESS.freeDeliveryThresholdKg
  const remainingForFreeDelivery = Math.max(0, BUSINESS.freeDeliveryThresholdKg - totalWeightKg)

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-espresso/50 backdrop-blur-sm" onClick={onClose} />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
          <h2 className="font-display text-xl font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-espresso/5"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
              <ShoppingBag size={40} className="text-espresso/20" />
              <p className="text-espresso-soft/70">Your cart is empty.</p>
              <Link to="/shop" onClick={onClose} className="btn-primary mt-2">
                Shop Tea
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 border-b border-espresso/10 pb-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-2xl">
                    🍵
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm font-bold leading-tight">{item.name}</p>
                    <p className="text-xs text-espresso-soft/60">{item.weight}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-espresso/15 px-1 py-1">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-espresso/10"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center text-sm font-bold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-espresso/10"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-chili">
                        {formatPKR(item.unitPrice * item.qty)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start text-espresso/30 hover:text-chili"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-espresso/10 px-6 py-5">
            {!freeDelivery ? (
              <p className="mb-3 rounded-xl bg-leaf/10 px-3 py-2 text-xs font-semibold text-leaf-deep">
                Add {remainingForFreeDelivery.toFixed(2)} kg more for FREE delivery!
              </p>
            ) : (
              <p className="mb-3 rounded-xl bg-leaf/10 px-3 py-2 text-xs font-semibold text-leaf-deep">
                🎉 You’ve unlocked FREE delivery!
              </p>
            )}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-espresso-soft/70">Subtotal</span>
              <span className="font-display text-xl font-bold">{formatPKR(subtotal)}</span>
            </div>
            <Link to="/checkout" onClick={onClose} className="btn-primary w-full">
              Proceed to Checkout
            </Link>
            <Link
              to="/shop"
              onClick={onClose}
              className="mt-2 block text-center text-sm font-semibold text-espresso-soft/70 hover:text-espresso"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </aside>
    </div>
  )
}

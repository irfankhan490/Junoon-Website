import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Minus, Trash2, ShoppingBag, Truck, Landmark, Smartphone, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react'
import { useCart, placeOrder } from '../context/CartContext.jsx'
import { formatPKR } from '../data/products.js'
import { BUSINESS } from '../data/business.js'

const STEPS = ['Cart', 'Delivery Details', 'Review & Confirm']

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: Truck, note: 'Pay when your order arrives.' },
  { id: 'easypaisa', label: 'EasyPaisa / JazzCash', icon: Smartphone, note: 'We’ll share payment details after confirming.' },
  { id: 'bank', label: 'Bank Transfer', icon: Landmark, note: 'Account details shared on WhatsApp.' },
]

export default function Checkout() {
  const { items, subtotal, totalWeightKg, updateQty, removeItem, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [payment, setPayment] = useState('cod')
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', notes: '' })
  const [errors, setErrors] = useState({})

  const freeDelivery = totalWeightKg >= BUSINESS.freeDeliveryThresholdKg
  const deliveryFee = items.length === 0 ? 0 : freeDelivery ? 0 : 150
  const total = subtotal + deliveryFee

  const validateDetails = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your full name.'
    if (!/^0?3\d{9}$/.test(form.phone.replace(/[\s-]/g, ''))) next.phone = 'Enter a valid Pakistani mobile number (e.g. 03xx xxxxxxx).'
    if (!form.address.trim() || form.address.trim().length < 8) next.address = 'Please enter your full delivery address.'
    if (!form.city.trim()) next.city = 'Please enter your city/area.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const goNext = () => {
    if (step === 0) {
      if (items.length === 0) return
      setStep(1)
    } else if (step === 1) {
      if (validateDetails()) setStep(2)
    }
  }

  const handleConfirm = () => {
    const order = placeOrder({
      customer: form,
      payment,
      items,
      subtotal,
      deliveryFee,
      total,
      totalWeightKg,
    })
    clearCart()
    navigate('/order-confirmation', { state: { order } })
  }

  return (
    <div className="section pt-10 md:pt-14">
      <div className="container max-w-4xl">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Checkout</h1>

        <ol className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wide sm:text-sm">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full ${
                  i <= step ? 'bg-espresso text-cream' : 'bg-espresso/10 text-espresso-soft/50'
                }`}
              >
                {i < step ? <CheckCircle2 size={15} /> : i + 1}
              </span>
              <span className={i <= step ? 'text-espresso' : 'text-espresso-soft/40'}>{s}</span>
              {i < STEPS.length - 1 && <span className="mx-1 h-px w-6 bg-espresso/10 sm:w-10" />}
            </li>
          ))}
        </ol>

        <div className="mt-10">
          {step === 0 && (
            <div>
              {items.length === 0 ? (
                <div className="card flex flex-col items-center gap-4 p-14 text-center">
                  <ShoppingBag size={36} className="text-espresso/20" />
                  <p className="text-espresso-soft/70">Your cart is empty. Add some tea to get started!</p>
                  <Link to="/shop" className="btn-primary">Shop Tea</Link>
                </div>
              ) : (
                <div className="card divide-y divide-espresso/10">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-wrap items-center gap-4 p-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-2xl">🍵</div>
                      <div className="min-w-[10rem] flex-1">
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-xs text-espresso-soft/60">{item.weight}</p>
                      </div>
                      <div className="flex items-center gap-1 rounded-full border border-espresso/15 px-1 py-1">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-espresso/10" aria-label="Decrease quantity">
                          <Minus size={13} />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-espresso/10" aria-label="Increase quantity">
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="w-24 text-right text-sm font-bold text-chili">{formatPKR(item.unitPrice * item.qty)}</span>
                      <button onClick={() => removeItem(item.id)} className="text-espresso/30 hover:text-chili" aria-label={`Remove ${item.name}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <form className="card grid gap-5 p-6 sm:p-8" onSubmit={(e) => { e.preventDefault(); goNext() }}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-field" htmlFor="name">Full Name</label>
                  <input id="name" className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Ahmed Raza" />
                  {errors.name && <p className="mt-1 text-xs font-semibold text-chili">{errors.name}</p>}
                </div>
                <div>
                  <label className="label-field" htmlFor="phone">Phone Number</label>
                  <input id="phone" className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="03xx xxxxxxx" />
                  {errors.phone && <p className="mt-1 text-xs font-semibold text-chili">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label className="label-field" htmlFor="address">Delivery Address</label>
                <textarea id="address" rows={3} className="input-field" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House #, street, area / landmark" />
                {errors.address && <p className="mt-1 text-xs font-semibold text-chili">{errors.address}</p>}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-field" htmlFor="city">City / Area</label>
                  <input id="city" className="input-field" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="e.g. Swabi" />
                  {errors.city && <p className="mt-1 text-xs font-semibold text-chili">{errors.city}</p>}
                </div>
                <div>
                  <label className="label-field" htmlFor="notes">Delivery Notes (optional)</label>
                  <input id="notes" className="input-field" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Preferred time, gate colour, etc." />
                </div>
              </div>

              <div>
                <p className="label-field mb-3">Payment Method</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setPayment(m.id)}
                      className={`flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition ${
                        payment === m.id ? 'border-gold bg-gold/10' : 'border-espresso/10 hover:border-espresso/25'
                      }`}
                    >
                      <m.icon size={20} className={payment === m.id ? 'text-gold-deep' : 'text-espresso-soft/60'} />
                      <span className="text-sm font-bold">{m.label}</span>
                      <span className="text-xs text-espresso-soft/60">{m.note}</span>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="card p-6 sm:p-8">
                <h2 className="font-display text-lg font-semibold">Review Your Order</h2>
                <div className="mt-5 divide-y divide-espresso/10">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3 text-sm">
                      <span className="font-semibold">{item.name} <span className="text-espresso-soft/50">× {item.qty}</span></span>
                      <span className="font-bold">{formatPKR(item.unitPrice * item.qty)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-1 rounded-2xl bg-espresso/5 p-5 text-sm">
                  <p className="font-bold">{form.name} • {form.phone}</p>
                  <p className="text-espresso-soft/70">{form.address}, {form.city}</p>
                  {form.notes && <p className="text-espresso-soft/60">Note: {form.notes}</p>}
                  <p className="mt-2 font-semibold text-chai-deep">
                    Payment: {PAYMENT_METHODS.find((m) => m.id === payment)?.label}
                  </p>
                </div>
              </div>

              <div className="card h-fit p-6 sm:p-8">
                <h2 className="font-display text-lg font-semibold">Order Summary</h2>
                <div className="mt-4 flex flex-col gap-2 text-sm">
                  <div className="flex justify-between"><span className="text-espresso-soft/70">Subtotal</span><span className="font-semibold">{formatPKR(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-espresso-soft/70">Delivery</span><span className="font-semibold">{deliveryFee === 0 ? 'Free' : formatPKR(deliveryFee)}</span></div>
                  <div className="mt-2 flex justify-between border-t border-espresso/10 pt-3 text-base"><span className="font-bold">Total</span><span className="font-display font-bold text-chili">{formatPKR(total)}</span></div>
                </div>
                <p className="mt-4 text-xs text-espresso-soft/60">
                  Estimated delivery: 1–3 business days within city, 3–5 days for other cities.
                </p>
                <button onClick={handleConfirm} className="btn-primary mt-6 w-full">
                  Confirm Order <CheckCircle2 size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="btn-outline disabled:opacity-0"
            >
              <ArrowLeft size={16} /> Back
            </button>
            {step < 2 && (
              <button onClick={goNext} className="btn-primary">
                Continue <ArrowRight size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

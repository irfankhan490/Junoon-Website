import { useState } from 'react'
import { Store, Building2, Coffee, Hotel, Briefcase, GlassWater, CheckCircle2, MessageCircle } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import { BUSINESS, waLink } from '../data/business.js'

const AUDIENCE = [
  { icon: Store, label: 'Grocery Stores' },
  { icon: Building2, label: 'Supermarkets' },
  { icon: GlassWater, label: 'Restaurants' },
  { icon: Coffee, label: 'Cafés' },
  { icon: Hotel, label: 'Hotels' },
  { icon: Briefcase, label: 'Offices' },
]

const BENEFITS = [
  'Exclusive wholesale pricing per kg',
  'Flexible order quantities for small & large businesses',
  'Priority restocking & dedicated support',
  'Consistent quality your customers will notice',
]

const BUSINESS_TYPES = ['Grocery Store', 'Supermarket', 'Restaurant', 'Café', 'Hotel', 'Office', 'Tea Shop / Dhaba', 'Other']

export default function Wholesale() {
  const [form, setForm] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: '',
    businessType: BUSINESS_TYPES[0],
    quantity: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const validate = () => {
    const next = {}
    if (!form.businessName.trim()) next.businessName = 'Business name is required.'
    if (!form.contactPerson.trim()) next.contactPerson = 'Contact person is required.'
    if (!/^0?3\d{9}$/.test(form.phone.replace(/[\s-]/g, ''))) next.phone = 'Enter a valid mobile number.'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.city.trim()) next.city = 'City/area is required.'
    if (!form.quantity.trim()) next.quantity = 'Please estimate a required quantity.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // Mock submission — stored for the future admin dashboard; wire to a real
    // POST /api/wholesale-inquiries endpoint when the backend is ready.
    try {
      const raw = window.localStorage.getItem('junoon-tea-wholesale-inquiries')
      const list = raw ? JSON.parse(raw) : []
      list.push({ ...form, submittedAt: new Date().toISOString() })
      window.localStorage.setItem('junoon-tea-wholesale-inquiries', JSON.stringify(list))
    } catch {
      /* ignore storage errors */
    }
    setSubmitted(true)
  }

  return (
    <div className="pt-10 md:pt-14">
      <section className="section !pt-0">
        <div className="container">
          <div className="grid items-center gap-10 rounded-[2.5rem] bg-espresso p-8 text-cream sm:p-14 lg:grid-cols-2">
            <div>
              <p className="eyebrow !text-gold">For Shops &amp; Businesses</p>
              <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Bring Junoon Tea to your customers.
              </h1>
              <p className="mt-4 max-w-md text-cream/70">
                Junoon Tea supplies premium chai in bulk to grocery stores, supermarkets,
                restaurants, cafés, hotels, offices and tea shops across Pakistan — with
                pricing built for your margins.
              </p>
              <a
                href={waLink(BUSINESS.whatsapp[0], 'Assalam-o-Alaikum, I want wholesale pricing for my business.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-7"
              >
                <MessageCircle size={16} /> Chat With Our Wholesale Team
              </a>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {AUDIENCE.map((a) => (
                <div key={a.label} className="flex flex-col items-center gap-2 rounded-2xl bg-cream/10 p-4 text-center">
                  <a.icon size={22} className="text-gold" />
                  <p className="text-xs font-semibold leading-tight">{a.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Why Partner With Us"
              title="Better tea, better margins."
              description="We treat every business partner like a long-term relationship — not a one-time order."
            />
            <ul className="mt-8 flex flex-col gap-4">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-espresso-soft/80">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-leaf" /> {b}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-3xl bg-gold/10 p-6">
              <p className="text-sm font-semibold text-espresso">Prefer to talk directly?</p>
              <p className="mt-1 text-sm text-espresso-soft/70">Call or WhatsApp us anytime during business hours.</p>
              <p className="mt-3 font-display text-lg font-bold">{BUSINESS.phones.join(' / ')}</p>
            </div>
          </div>

          <div className="card p-6 sm:p-8" id="wholesale-form">
            <h2 className="font-display text-xl font-semibold">Request Wholesale Pricing</h2>
            <p className="mt-1 text-sm text-espresso-soft/70">
              Fill this out and our team will reach out within one business day.
            </p>

            {submitted ? (
              <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-leaf/10 py-12 text-center">
                <CheckCircle2 size={32} className="text-leaf" />
                <p className="font-bold text-leaf-deep">Request received — shukriya!</p>
                <p className="max-w-xs text-sm text-espresso-soft/70">
                  Our wholesale team will contact you shortly with pricing and next steps.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label-field" htmlFor="businessName">Business Name</label>
                    <input id="businessName" className="input-field" value={form.businessName} onChange={update('businessName')} placeholder="e.g. Khan General Store" />
                    {errors.businessName && <p className="mt-1 text-xs font-semibold text-chili">{errors.businessName}</p>}
                  </div>
                  <div>
                    <label className="label-field" htmlFor="contactPerson">Contact Person</label>
                    <input id="contactPerson" className="input-field" value={form.contactPerson} onChange={update('contactPerson')} placeholder="Your name" />
                    {errors.contactPerson && <p className="mt-1 text-xs font-semibold text-chili">{errors.contactPerson}</p>}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label-field" htmlFor="w-phone">Phone Number</label>
                    <input id="w-phone" className="input-field" value={form.phone} onChange={update('phone')} placeholder="03xx xxxxxxx" />
                    {errors.phone && <p className="mt-1 text-xs font-semibold text-chili">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="label-field" htmlFor="w-email">Email (optional)</label>
                    <input id="w-email" type="email" className="input-field" value={form.email} onChange={update('email')} placeholder="you@business.com" />
                    {errors.email && <p className="mt-1 text-xs font-semibold text-chili">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label-field" htmlFor="w-city">City / Area</label>
                    <input id="w-city" className="input-field" value={form.city} onChange={update('city')} placeholder="e.g. Swabi" />
                    {errors.city && <p className="mt-1 text-xs font-semibold text-chili">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="label-field" htmlFor="w-type">Business Type</label>
                    <select id="w-type" className="input-field" value={form.businessType} onChange={update('businessType')}>
                      {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label-field" htmlFor="w-qty">Required Quantity (per month)</label>
                  <input id="w-qty" className="input-field" value={form.quantity} onChange={update('quantity')} placeholder="e.g. 50 Kg / month" />
                  {errors.quantity && <p className="mt-1 text-xs font-semibold text-chili">{errors.quantity}</p>}
                </div>

                <div>
                  <label className="label-field" htmlFor="w-message">Message (optional)</label>
                  <textarea id="w-message" rows={3} className="input-field" value={form.message} onChange={update('message')} placeholder="Tell us anything else that would help us serve you better." />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Request Wholesale Pricing
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

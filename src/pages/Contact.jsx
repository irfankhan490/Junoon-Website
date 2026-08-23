import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import { BUSINESS, waLink } from '../data/business.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: 'General Inquiry', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^0?3\d{9}$/.test(form.phone.replace(/[\s-]/g, ''))) next.phone = 'Enter a valid mobile number.'
    if (!form.message.trim()) next.message = 'Please write a short message.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    try {
      const raw = window.localStorage.getItem('junoon-tea-contact-messages')
      const list = raw ? JSON.parse(raw) : []
      list.push({ ...form, submittedAt: new Date().toISOString() })
      window.localStorage.setItem('junoon-tea-contact-messages', JSON.stringify(list))
    } catch {
      /* ignore storage errors */
    }
    setSubmitted(true)
  }

  return (
    <div className="section pt-10 md:pt-14">
      <div className="container">
        <SectionHeading
          eyebrow="Contact Us"
          title="We’d love to hear from you."
          description="Questions about an order, a bulk request, or just want to say salam? Reach out any way that suits you."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-4">
            <a href={`tel:${BUSINESS.phones[0].replace(/\s/g, '')}`} className="card flex items-center gap-4 p-5 transition hover:shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15"><Phone size={20} className="text-gold-deep" /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-espresso-soft/60">Call Us</p>
                <p className="font-bold">{BUSINESS.phones.join(' / ')}</p>
              </div>
            </a>

            <a href={waLink(BUSINESS.whatsapp[0])} target="_blank" rel="noopener noreferrer" className="card flex items-center gap-4 p-5 transition hover:shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf/15"><MessageCircle size={20} className="text-leaf-deep" /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-espresso-soft/60">WhatsApp</p>
                <p className="font-bold">{BUSINESS.whatsapp.join(' / ')}</p>
              </div>
            </a>

            <a href={`mailto:${BUSINESS.email}`} className="card flex items-center gap-4 p-5 transition hover:shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-chai/15"><Mail size={20} className="text-chai-deep" /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-espresso-soft/60">Email</p>
                <p className="font-bold">{BUSINESS.email}</p>
              </div>
            </a>

            <div className="card flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-chili/10"><MapPin size={20} className="text-chili" /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-espresso-soft/60">Location</p>
                <p className="font-bold">{BUSINESS.location}</p>
              </div>
            </div>

            <div className="card flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-espresso/10"><Clock size={20} className="text-espresso" /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-espresso-soft/60">Business Hours</p>
                <p className="font-bold">{BUSINESS.hours}</p>
              </div>
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold">Send Us a Message</h2>
            <p className="mt-1 text-sm text-espresso-soft/70">Includes general questions and wholesale/business inquiries.</p>

            {submitted ? (
              <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-leaf/10 py-12 text-center">
                <CheckCircle2 size={32} className="text-leaf" />
                <p className="font-bold text-leaf-deep">Message sent — shukriya!</p>
                <p className="max-w-xs text-sm text-espresso-soft/70">We typically reply within a few hours during business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label-field" htmlFor="c-name">Full Name</label>
                    <input id="c-name" className="input-field" value={form.name} onChange={update('name')} placeholder="Your name" />
                    {errors.name && <p className="mt-1 text-xs font-semibold text-chili">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="label-field" htmlFor="c-phone">Phone Number</label>
                    <input id="c-phone" className="input-field" value={form.phone} onChange={update('phone')} placeholder="03xx xxxxxxx" />
                    {errors.phone && <p className="mt-1 text-xs font-semibold text-chili">{errors.phone}</p>}
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label-field" htmlFor="c-email">Email (optional)</label>
                    <input id="c-email" type="email" className="input-field" value={form.email} onChange={update('email')} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="label-field" htmlFor="c-type">Inquiry Type</label>
                    <select id="c-type" className="input-field" value={form.type} onChange={update('type')}>
                      <option>General Inquiry</option>
                      <option>Order Support</option>
                      <option>Wholesale / Business</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label-field" htmlFor="c-message">Message</label>
                  <textarea id="c-message" rows={4} className="input-field" value={form.message} onChange={update('message')} placeholder="How can we help?" />
                  {errors.message && <p className="mt-1 text-xs font-semibold text-chili">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

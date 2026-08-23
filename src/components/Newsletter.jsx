import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    // Mock submit — in production this posts to a newsletter/CRM endpoint.
    setSubmitted(true)
  }

  return (
    <section className="section bg-gold-light/25">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-espresso px-6 py-14 text-center sm:px-16">
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-chili/10 blur-3xl" />

          <p className="eyebrow relative justify-center !text-gold">Stay in the loop</p>
          <h2 className="relative mt-3 font-display text-3xl font-semibold text-cream sm:text-4xl">
            Get first access to new offers &amp; the Lucky Draw
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm text-cream/60">
            Join our newsletter for early word on promotions, new blends, and wholesale deals — no spam, ever.
          </p>

          {submitted ? (
            <div className="relative mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full bg-leaf/20 px-6 py-4 text-sm font-semibold text-leaf-light">
              <CheckCircle2 size={18} /> You’re subscribed — welcome to the family!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-full border-2 border-cream/20 bg-cream/5 px-5 py-3.5 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-gold"
              />
              <button type="submit" className="btn-primary shrink-0">
                Subscribe <Send size={15} />
              </button>
            </form>
          )}
          {error && <p className="relative mt-3 text-xs font-semibold text-chili-deep bg-cream/90 inline-block px-3 py-1 rounded-full">{error}</p>}
        </div>
      </div>
    </section>
  )
}

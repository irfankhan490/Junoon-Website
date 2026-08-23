import { Link } from 'react-router-dom'
import { Gift, ArrowRight, Trophy } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import OfferCard from '../components/OfferCard.jsx'
import { OFFERS } from '../data/offers.js'

export default function Offers() {
  return (
    <div className="pt-10 md:pt-14">
      <section className="section !pt-0">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gold via-gold-light to-gold/70 p-8 sm:p-14">
            <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-cream/30 blur-3xl" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-espresso px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-gold">
                  <Trophy size={14} /> Lucky Draw is Live
                </span>
                <h1 className="mt-4 font-display text-3xl font-semibold text-espresso sm:text-4xl lg:text-5xl">
                  Buy Junoon Tea, Win Big Prizes.
                </h1>
                <p className="mt-4 max-w-lg text-espresso/80">
                  Every pack of Junoon Tea is a chance to win a motorcycle, home appliances,
                  solar panels and more — as seen across our Lucky Dera scheme.
                </p>
                <Link to="/shop" className="btn-dark mt-7">
                  Shop &amp; Enter the Draw <ArrowRight size={16} />
                </Link>
              </div>
              <div className="flex flex-wrap gap-3">
                {['🏍️ Motorcycle', '🌀 Washing Machine', '📺 LED TV', '☀️ Solar Panel', '🫖 Kettle', '⏰ Wall Clock'].map((p) => (
                  <span
                    key={p}
                    className="rounded-2xl bg-espresso/90 px-4 py-3 text-sm font-bold text-cream shadow-soft"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <SectionHeading
            eyebrow="All Current Offers"
            title="Every reason to stock up on Junoon Tea."
            description="Here’s everything running right now — for home orders and for shops & businesses alike."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {OFFERS.map((offer) => (
              <OfferCard key={offer.id} offer={offer} ctaTo={offer.id === 'wholesale-pricing' ? '/wholesale' : '/shop'} />
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <div className="card flex flex-col items-center gap-4 p-10 text-center sm:p-14">
            <Gift size={32} className="text-chili" />
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Don’t miss the next offer.
            </h2>
            <p className="max-w-md text-sm text-espresso-soft/75">
              Follow us or message us on WhatsApp to be the first to know when a new promotion
              or Lucky Draw round goes live.
            </p>
            <Link to="/contact" className="btn-chili mt-2">
              Contact Us on WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

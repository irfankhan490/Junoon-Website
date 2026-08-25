import { Link } from 'react-router-dom'
import { ArrowRight, Trophy, CheckCircle2 } from 'lucide-react'
import { OFFERS } from '../data/offers.js'
import luckyDrawImg from '../assets/lucky-draw-billboard.jpg'

/**
 * Shown on the Shop page when the "Special Offers" category is selected.
 * This is a teaser card only — it reuses the existing OFFERS mock data
 * (src/data/offers.js) for the prize list, and links out to the existing
 * /offers page for the full Lucky Draw details rather than duplicating them.
 */
export default function LuckyDrawPromoCard() {
  const offer = OFFERS.find((o) => o.id === 'lucky-draw')

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gold via-gold-light to-gold/70 p-8 sm:p-14">
      <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-cream/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-chili/10 blur-3xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-espresso px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-gold">
            <Trophy size={14} /> Special Offer
          </span>

          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-espresso sm:text-4xl">
            Buy Any Packet of Junoon Chai &amp; Win!
          </h2>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-espresso/80">
            Buy any packet of Junoon Chai and get a coupon for our Lucky Draw. Exciting prizes
            are waiting for you!
          </p>

          {offer?.prizes?.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {offer.prizes.slice(0, 5).map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-1 rounded-full bg-espresso/90 px-3.5 py-1.5 text-xs font-bold text-cream shadow-soft"
                >
                  <CheckCircle2 size={12} className="text-gold" /> {p}
                </li>
              ))}
            </ul>
          )}

          <Link to="/offers" className="btn-dark mt-8">
            Click Here for More Details <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-xs">
          <img
            src={luckyDrawImg}
            alt="Junoon Tea Lucky Draw promotion"
            className="w-full rounded-[2rem] object-cover shadow-card"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

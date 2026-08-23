import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { OFFERS } from '../data/offers.js'
import luckyDrawImg from '../assets/lucky-draw-billboard.jpg'

/**
 * Home-page spotlight pairing the real Lucky Draw billboard photo with the
 * packaging shot already shown in the Hero, so both images are visible
 * together on the home page (not just the small floating chip in the Hero).
 * Prize list is pulled from the shared OFFERS mock data — update prizes in
 * src/data/offers.js and this section stays in sync automatically.
 */
export default function LuckyDrawSpotlight() {
  const offer = OFFERS.find((o) => o.id === 'lucky-draw')
  if (!offer) return null

  return (
    <section className="section">
      <div className="container">
        <div className="grid items-center gap-10 rounded-[2.5rem] bg-gold/10 p-8 sm:p-14 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-md lg:order-2">
            <div className="absolute -right-3 -top-3 z-10 rounded-2xl bg-chili px-4 py-2 text-xs font-bold text-cream shadow-card sm:-right-6 sm:-top-6">
              🎁 Live Now
            </div>
            <img
              src={luckyDrawImg}
              alt="Junoon Tea Lucky Draw billboard advertisement"
              className="w-full rounded-[2rem] object-cover shadow-card"
              loading="lazy"
            />
            <p className="mt-3 text-center text-xs font-semibold uppercase tracking-wide text-espresso-soft/50">
              Spotted on billboards across Pakistan
            </p>
          </div>

          <div className="lg:order-1">
            <p className="eyebrow">🏆 Lucky Draw is Live</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Every pack of Junoon Tea is a chance to win.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-espresso-soft/80">
              {offer.description}
            </p>

            {offer.prizes?.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {offer.prizes.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-1 rounded-full bg-cream px-3 py-1.5 text-xs font-semibold text-espresso-soft shadow-soft"
                  >
                    <CheckCircle2 size={12} className="text-gold-deep" /> {p}
                  </li>
                ))}
              </ul>
            )}

            <Link to="/offers" className="btn-primary mt-7">
              See Full Lucky Draw Details <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

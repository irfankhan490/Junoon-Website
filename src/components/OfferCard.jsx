import { Link } from 'react-router-dom'
import { Gift, Truck, Building2, ArrowRight, CheckCircle2 } from 'lucide-react'

const ICONS = {
  'lucky-draw': Gift,
  'free-delivery': Truck,
  'wholesale-pricing': Building2,
}

const ACCENTS = {
  gold: { bg: 'bg-gold/15', text: 'text-gold-deep', chip: 'bg-gold text-espresso', ring: 'ring-gold/30' },
  leaf: { bg: 'bg-leaf/10', text: 'text-leaf-deep', chip: 'bg-leaf text-cream', ring: 'ring-leaf/30' },
  chili: { bg: 'bg-chili/10', text: 'text-chili', chip: 'bg-chili text-cream', ring: 'ring-chili/30' },
}

export default function OfferCard({ offer, ctaTo = '/shop' }) {
  const Icon = ICONS[offer.id] || Gift
  const accent = ACCENTS[offer.accent] || ACCENTS.gold

  return (
    <div className={`card relative flex flex-col overflow-hidden p-7 ring-1 ${accent.ring}`}>
      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${accent.bg}`}>
        <Icon size={26} className={accent.text} />
      </div>
      <span className={`mt-5 inline-block w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${accent.chip}`}>
        {offer.badge}
      </span>
      <h3 className="mt-3 font-display text-xl font-semibold leading-snug">{offer.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-espresso-soft/75">{offer.description}</p>

      {offer.prizes?.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {offer.prizes.slice(0, 4).map((p) => (
            <li
              key={p}
              className="flex items-center gap-1 rounded-full bg-espresso/5 px-3 py-1 text-xs font-semibold text-espresso-soft"
            >
              <CheckCircle2 size={12} className={accent.text} /> {p}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-espresso-soft/50">
        Validity: {offer.validity}
      </p>

      <Link
        to={ctaTo}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-espresso transition group-hover:gap-2.5"
      >
        {offer.cta} <ArrowRight size={16} />
      </Link>
    </div>
  )
}

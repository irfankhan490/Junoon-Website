import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import ProductImage from './ProductImage.jsx'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-60" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-chili/10 blur-3xl" />

      <div className="container relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
        <div className="animate-rise">
          <span className="eyebrow">
            <Sparkles size={14} /> Pakistan Standards Certified
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            One Tea,
            <br />
            <span className="italic text-chili">Many Stories.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-espresso-soft/80">
            Junoon Tea is hand-selected, richly brewed, and made for the moments that matter —
            morning chai with family, an afternoon break with friends, or a warm welcome for guests.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/shop" className="btn-primary">
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link to="/offers" className="btn-outline">
              View Latest Offers
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-espresso/10 pt-6">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['A', 'S', 'B', 'I'].map((l) => (
                  <span
                    key={l}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-cream bg-chai text-xs font-bold text-cream"
                  >
                    {l}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-espresso-soft/60">Loved by 500+ families</p>
              </div>
            </div>
            <div className="h-9 w-px bg-espresso/10" />
            <p className="text-xs font-semibold uppercase tracking-wide text-espresso-soft/60">
              Free delivery above 5kg
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm animate-rise" style={{ animationDelay: '150ms' }}>
          <div className="absolute -right-4 top-8 z-10 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-card sm:-right-8">
            <span className="text-2xl">☕</span>
            <div>
              <p className="text-xs font-bold leading-none">Fresh Brewed</p>
              <p className="text-[11px] text-espresso-soft/60">Bold & Aromatic</p>
            </div>
          </div>
          <div className="absolute -left-4 bottom-16 z-10 rounded-2xl bg-chili px-4 py-3 text-cream shadow-card sm:-left-10">
            <p className="text-xs font-bold leading-none">🎁 Lucky Draw</p>
            <p className="mt-1 text-[11px] text-cream/80">On every pack</p>
          </div>
          <ProductImage priority className="aspect-[3/4] w-full" />
        </div>
      </div>
    </section>
  )
}

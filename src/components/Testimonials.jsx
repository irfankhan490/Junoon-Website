import { Quote } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import StarRating from './StarRating.jsx'
import { TESTIMONIALS } from '../data/testimonials.js'

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Customer Stories"
          title="Many stories, one favourite chai."
          description="Real words from the families, cafés and shops who’ve made Junoon Tea part of their everyday ritual."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 6).map((t, i) => (
            <figure
              key={t.id}
              className="animate-rise card flex flex-col p-7"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Quote size={28} className="text-gold/50" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-espresso-soft/85">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between border-t border-espresso/10 pt-4">
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-espresso-soft/60">{t.city}</p>
                </div>
                <StarRating rating={t.rating} />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

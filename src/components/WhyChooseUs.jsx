import { Leaf, Award, Truck, ShieldCheck } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const REASONS = [
  {
    icon: Leaf,
    title: 'Hand-Selected Leaves',
    text: 'Every batch is chosen for colour, aroma and strength before it earns the Junoon name.',
  },
  {
    icon: Award,
    title: 'Consistent, Authentic Taste',
    text: 'The same bold, comforting cup — whether it’s your first pack or your fiftieth.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality You Can Trust',
    text: 'Pakistan Standards certified, hygienically packed, and sealed fresh from the source.',
  },
  {
    icon: Truck,
    title: 'Reliable Delivery',
    text: 'Fast home delivery nationwide, with free delivery on orders above 5 Kg.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section bg-espresso text-cream">
      <div className="container">
        <SectionHeading
          eyebrow="Why Junoon Tea"
          title="A cup that earns its name — Junoon means passion."
          description="From the leaf to your cup, every step is built around one goal: a chai that tastes as good on day one thousand as it did on day one."
          light
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <div
              key={r.title}
              className="animate-rise rounded-3xl border border-cream/10 bg-cream/5 p-7 transition-colors duration-300 hover:bg-cream/10"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15">
                <r.icon size={22} className="text-gold" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

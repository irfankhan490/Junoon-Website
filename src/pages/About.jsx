import { Link } from 'react-router-dom'
import { Leaf, Heart, Award, Users } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import ProductImage from '../components/ProductImage.jsx'

const VALUES = [
  { icon: Leaf, title: 'Quality First', text: 'Every leaf is chosen with the same care we’d want in our own kitchen — nothing less.' },
  { icon: Heart, title: 'Authentic Taste', text: 'No shortcuts. Just the bold, comforting flavour that real desi chai is meant to have.' },
  { icon: Award, title: 'Consistency', text: 'The cup you loved the first time is the cup you’ll get every single time after.' },
  { icon: Users, title: 'Customer Satisfaction', text: 'From a single home order to a shop’s monthly supply — every customer matters equally.' },
]

export default function About() {
  return (
    <div className="pt-10 md:pt-14">
      <section className="section !pt-0">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Our Story</p>
            <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl lg:text-[2.6rem]">
              Junoon means passion — and that’s exactly what goes into every pack.
            </h1>
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-espresso-soft/85">
              <p>
                Junoon Tea began with a simple frustration: too much tea on the shelf looked
                premium but tasted ordinary. We set out to change that — sourcing leaves not
                for how they look in a warehouse, but for how they taste in a cup, cooked slow
                with milk, the way chai is meant to be made at home.
              </p>
              <p>
                Every batch that carries our name is tasted, tested, and approved before it
                ever reaches a shelf. It’s a slower way to run a tea business — but it’s the
                only way we know how to keep a promise to the people who trust us with their
                morning cup.
              </p>
              <p>
                Today, Junoon Tea is brewed in homes across Khyber Pakhtunkhwa and beyond, and
                served in the cafés, hotels and tea shops that share our belief: a great chai
                doesn’t need to shout — it just needs to be honest, strong, and consistent,
                cup after cup, story after story.
              </p>
            </div>
            <Link to="/shop" className="btn-primary mt-8">Taste the Difference</Link>
          </div>
          <ProductImage priority className="mx-auto aspect-[4/5] w-full max-w-sm" />
        </div>
      </section>

      <section className="section bg-cream-deep/60">
        <div className="container">
          <SectionHeading eyebrow="What We Stand For" title="The values behind every cup." align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="card p-7 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15">
                  <v.icon size={22} className="text-gold-deep" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso-soft/75">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="rounded-[2.5rem] bg-espresso p-10 text-center text-cream sm:p-16">
            <p className="eyebrow !text-gold justify-center">One Tea, Many Stories</p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-semibold sm:text-3xl">
              Whatever your story — a busy morning, a family gathering, a shop full of
              regulars — there’s a Junoon Tea moment in it.
            </h2>
            <Link to="/shop" className="btn-primary mt-8 inline-flex">Shop Junoon Tea</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

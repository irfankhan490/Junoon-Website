import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import ProductCard from '../components/ProductCard.jsx'
import OfferCard from '../components/OfferCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import Testimonials from '../components/Testimonials.jsx'
import WholesaleTeaser from '../components/WholesaleTeaser.jsx'
import Newsletter from '../components/Newsletter.jsx'
import { PRODUCTS } from '../data/products.js'
import { OFFERS } from '../data/offers.js'

export default function Home() {
  const featured = PRODUCTS.slice(0, 4)
  const bestSellers = PRODUCTS.filter((p) => p.badge === 'Best Seller' || p.rating >= 4.8).slice(0, 3)

  return (
    <>
      <Hero />

      <section className="section">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Featured Products"
              title="Pick the pack that fits your kitchen."
              description="From everyday packs to premium blends — every size, one unmistakable Junoon taste."
            />
            <Link to="/shop" className="hidden items-center gap-1.5 text-sm font-bold text-chili sm:inline-flex">
              View All Products <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 80}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          <Link to="/shop" className="btn-outline mt-10 flex w-fit sm:hidden">
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section bg-cream-deep/60">
        <div className="container">
          <SectionHeading
            eyebrow="Latest Offers"
            title="Deals that make every cup sweeter."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {OFFERS.map((offer, i) => (
              <div key={offer.id} className="animate-rise" style={{ animationDelay: `${i * 100}ms` }}>
                <OfferCard offer={offer} ctaTo={offer.id === 'wholesale-pricing' ? '/wholesale' : '/offers'} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Best Sellers"
            title="What most households are brewing right now."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bestSellers.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 90}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <WholesaleTeaser />
      <Newsletter />
    </>
  )
}

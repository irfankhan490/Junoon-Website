import { Link } from 'react-router-dom'
import { Store, Building2, Coffee, Hotel, ArrowRight } from 'lucide-react'

const AUDIENCE = [
  { icon: Store, label: 'Grocery Stores' },
  { icon: Building2, label: 'Supermarkets' },
  { icon: Coffee, label: 'Cafés & Restaurants' },
  { icon: Hotel, label: 'Hotels & Offices' },
]

export default function WholesaleTeaser() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid items-center gap-10 rounded-[2.5rem] bg-chai/10 p-8 sm:p-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">For Shops &amp; Businesses</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Bring Junoon Tea to your customers.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-espresso-soft/80">
              We supply premium tea in bulk to grocery stores, supermarkets, restaurants,
              cafés, hotels, offices and tea shops — with special wholesale pricing and
              reliable restocking.
            </p>
            <Link to="/wholesale" className="btn-dark mt-7">
              Request Wholesale Pricing <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {AUDIENCE.map((a) => (
              <div key={a.label} className="card flex flex-col items-start gap-3 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-chai/15">
                  <a.icon size={20} className="text-chai-deep" />
                </div>
                <p className="text-sm font-bold">{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import LuckyDrawPromoCard from '../components/LuckyDrawPromoCard.jsx'
import { PRODUCTS, CATEGORIES } from '../data/products.js'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  const [category, setCategory] = useState(initialCategory)
  const [sort, setSort] = useState('featured')

  useEffect(() => {
    const param = searchParams.get('category')
    if (param) setCategory(param)
  }, [searchParams])

  const handleCategory = (id) => {
    setCategory(id)
    setSearchParams(id === 'all' ? {} : { category: id })
  }

  const products = useMemo(() => {
    let list =
      category === 'all'
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.categories.includes(category))

    if (sort === 'price-asc') {
      list = [...list].sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price))
    } else if (sort === 'price-desc') {
      list = [...list].sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price))
    } else if (sort === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating)
    }
    return list
  }, [category, sort])

  return (
    <div className="section pt-10 md:pt-14">
      <div className="container">
        <SectionHeading
          eyebrow="Shop Junoon Tea"
          title="Every pack, every size, one bold taste."
          description="Browse our full range — from everyday black tea to premium blends and family-sized value packs."
        />

        <div className="mt-10 flex flex-col gap-4 border-b border-espresso/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => handleCategory(c.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === c.id
                    ? 'bg-espresso text-cream'
                    : 'bg-espresso/5 text-espresso-soft hover:bg-espresso/10'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {category !== 'special-offers' && (
            <label className="flex items-center gap-2 text-sm font-semibold text-espresso-soft/70">
              <SlidersHorizontal size={15} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border-2 border-espresso/10 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-gold"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </label>
          )}
        </div>

        {category === 'special-offers' ? (
          <div className="mt-10">
            <LuckyDrawPromoCard />
          </div>
        ) : products.length === 0 ? (
          <p className="py-20 text-center text-espresso-soft/60">No products found in this category yet.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p, i) => (
              <div key={p.id} id={p.slug} style={{ animationDelay: `${(i % 8) * 70}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

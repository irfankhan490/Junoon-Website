import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Zap } from 'lucide-react'
import ProductImage from './ProductImage.jsx'
import StarRating from './StarRating.jsx'
import { formatPKR } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

const BADGE_STYLES = {
  'Best Seller': 'bg-gold text-espresso',
  New: 'bg-leaf text-cream',
  Sale: 'bg-chili text-cream',
  Premium: 'bg-espresso text-gold',
  Limited: 'bg-chai text-cream',
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const navigate = useNavigate()
  const hasDiscount = product.discountPrice && product.discountPrice < product.price

  const handleBuyNow = (e) => {
    e.preventDefault()
    addItem(product, 1)
    navigate('/checkout')
  }

  return (
    <div className="group animate-rise card flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
      <Link to={`/shop#${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-gradient-to-b from-gold-light/30 to-chai/10 p-5">
        {product.badge && (
          <span
            className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${BADGE_STYLES[product.badge] || 'bg-espresso text-cream'}`}
          >
            {product.badge}
          </span>
        )}
        {hasDiscount && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-chili px-3 py-1 text-[11px] font-bold text-cream">
            -{Math.round(100 - (product.discountPrice / product.price) * 100)}%
          </span>
        )}
        <ProductImage className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-chai">{product.weight}</p>
        <Link to={`/shop#${product.slug}`}>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug transition-colors group-hover:text-chili">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-espresso-soft/70">{product.tagline}</p>

        <div className="mt-2">
          <StarRating rating={product.rating} count={product.reviews} />
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-xl font-bold text-espresso">
            {formatPKR(hasDiscount ? product.discountPrice : product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm font-medium text-espresso/40 line-through">
              {formatPKR(product.price)}
            </span>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => addItem(product, 1)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-espresso/15 py-2.5 text-xs font-bold uppercase tracking-wide text-espresso transition hover:border-espresso hover:bg-espresso hover:text-cream"
          >
            <ShoppingCart size={14} /> Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gold py-2.5 text-xs font-bold uppercase tracking-wide text-espresso transition hover:bg-gold-deep hover:text-cream"
          >
            <Zap size={14} /> Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

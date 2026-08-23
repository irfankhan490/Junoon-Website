import { Star } from 'lucide-react'

export default function StarRating({ rating = 5, count, size = 14 }) {
  const full = Math.round(rating)
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < full ? 'fill-gold text-gold' : 'fill-espresso/10 text-espresso/10'}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs font-semibold text-espresso-soft/70">({count})</span>
      )}
    </div>
  )
}

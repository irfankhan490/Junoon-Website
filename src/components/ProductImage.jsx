import packImg from '../assets/junoon-pack-web.jpg'

/**
 * Renders the Junoon Tea pack photo inside an arch-shaped frame (a nod to
 * Pakistani architectural motifs) with a warm gradient backdrop. Swap `packImg`
 * for real per-product photography later — every product currently points at
 * the same shot via the `image: 'pack'` field in src/data/products.js.
 */
export default function ProductImage({ className = '', frame = true, priority = false }) {
  if (!frame) {
    return (
      <img
        src={packImg}
        alt="Junoon Tea pack"
        className={className}
        loading={priority ? 'eager' : 'lazy'}
      />
    )
  }
  return (
    <div className={`relative overflow-hidden rounded-arch bg-gradient-to-b from-gold-light/40 via-gold/20 to-chai/10 ${className}`}>
      <div className="absolute inset-0 bg-noise mix-blend-multiply opacity-40" />
      <img
        src={packImg}
        alt="Junoon Tea pack"
        loading={priority ? 'eager' : 'lazy'}
        className="relative z-10 h-full w-full object-contain p-6 drop-shadow-xl"
      />
    </div>
  )
}

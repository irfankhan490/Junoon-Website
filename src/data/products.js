// Mock product data. Structured so it can later be swapped for a real API response
// (e.g. GET /api/products) without changing any component code — every component
// consumes this exact shape via src/data/products.js.

export const CATEGORIES = [
  { id: 'all', label: 'All Tea' },
  { id: 'black-tea', label: 'Black Tea' },
  { id: 'premium-tea', label: 'Premium Tea' },
  { id: 'family-packs', label: 'Family Packs' },
  { id: 'special-offers', label: 'Special Offers' },
]

export const PRODUCTS = [
  {
    id: 'jt-1kg',
    slug: 'junoon-tea-1kg',
    name: 'Junoon Tea 1 Kg',
    tagline: 'The everyday family favourite',
    categories: ['black-tea', 'family-packs'],
    weight: '1000g',
    price: 1600,
    discountPrice: 1450,
    rating: 4.8,
    reviews: 214,
    badge: 'Best Seller',
    stock: 'in-stock',
    description:
      'Our signature blend of hand-picked CTC leaves, brewed dark, bold and full-bodied — the pack that keeps the whole household in chai.',
    features: ['Rich, full-bodied liquor', 'Strong aroma, low bitterness', 'Ideal for doodh patti & desi chai'],
    image: 'pack',
  },
  {
    id: 'jt-500g',
    slug: 'junoon-tea-500g',
    name: 'Junoon Tea 0.5 Kg',
    tagline: 'Everyday goodness, half the size',
    categories: ['black-tea'],
    weight: '500g',
    price: 850,
    discountPrice: 780,
    rating: 4.7,
    reviews: 168,
    badge: null,
    stock: 'in-stock',
    description:
      'The same bold Junoon character in a lighter pack — perfect for smaller households or trying us for the first time.',
    features: ['Everyday strong brew', 'Consistent taste, every cup', 'Great value pack'],
    image: 'pack',
  },
  {
    id: 'jt-250g',
    slug: 'junoon-tea-250g',
    name: 'Junoon Tea 0.25 Kg',
    tagline: 'The starter pouch',
    categories: ['black-tea'],
    weight: '250g',
    price: 450,
    discountPrice: 410,
    rating: 4.6,
    reviews: 96,
    badge: 'New',
    stock: 'in-stock',
    description:
      'A compact pack of our classic blend — light on the pocket, generous on flavour. Ideal for the office pantry or a quick top-up.',
    features: ['Compact everyday pack', 'Bold colour, balanced taste', 'Resealable pouch'],
    image: 'pack',
  },
  {
    id: 'jt-1kg-bigbag',
    slug: 'junoon-tea-1kg-big-bag',
    name: 'Junoon Tea 1 Kg Big Bag',
    tagline: 'Maximum value, family size',
    categories: ['family-packs', 'special-offers'],
    weight: '1000g (Value Bag)',
    price: 1500,
    discountPrice: 1350,
    rating: 4.8,
    reviews: 132,
    badge: 'Sale',
    stock: 'in-stock',
    description:
      'Our best-value bag for big families and busy kitchens — the same bold Junoon taste in a large, budget-friendly pack.',
    features: ['Lowest price per kg', 'Perfect for large households', 'Restaurant & dera favourite'],
    image: 'pack',
  },
  {
    id: 'jt-premium-500g',
    slug: 'junoon-premium-tea-500g',
    name: 'Junoon Premium Tea 0.5 Kg',
    tagline: 'For the connoisseur’s cup',
    categories: ['premium-tea'],
    weight: '500g',
    price: 1150,
    discountPrice: null,
    rating: 4.9,
    reviews: 87,
    badge: 'Premium',
    stock: 'in-stock',
    description:
      'A finer, carefully sorted leaf grade with a deeper aroma and smoother finish — for the days you want your chai to feel special.',
    features: ['Finer leaf grade', 'Smooth, aromatic finish', 'Low tannin, gentle on the stomach'],
    image: 'pack',
  },
  {
    id: 'jt-premium-tin',
    slug: 'junoon-premium-tea-gift-tin',
    name: 'Junoon Premium Gift Tin 200g',
    tagline: 'A gift worth gifting',
    categories: ['premium-tea', 'special-offers'],
    weight: '200g Tin',
    price: 720,
    discountPrice: 650,
    rating: 4.9,
    reviews: 54,
    badge: 'Limited',
    stock: 'low-stock',
    description:
      'Our premium blend in a reusable gift tin — a thoughtful gift for family, friends, or anyone who takes their chai seriously.',
    features: ['Reusable tin packaging', 'Premium leaf selection', 'Great Eid & wedding gift'],
    image: 'pack',
  },
]

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function formatPKR(amount) {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

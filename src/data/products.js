// Mock product data. Structured so it can later be swapped for a real API response
// (e.g. GET /api/products) without changing any component code — every component
// consumes this exact shape via src/data/products.js.

export const CATEGORIES = [
  { id: 'all', label: 'All Tea' },
  { id: 'black-tea', label: 'Black Tea' },
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
    price: 2000,
    discountPrice: 1800,
    rating: 4.8,
    reviews: 214,
    badge: 'Best Seller',
    stock: 'in-stock',
    description: 
      'Our best-value bag for big families and busy kitchens — the same bold Junoon taste in a large, budget-friendly pack.',
    features: ['Lowest price per kg', 'Perfect for large households', 'Restaurant & dera favourite'],
    image: 'pack',
     
  },
  {
    id: 'jt-500g',
    slug: 'junoon-tea-500g',
    name: 'Junoon Tea 500g',
    tagline: 'Everyday goodness, half the size',
    categories: ['black-tea'],
    weight: '500g',
    price: 1000,
    discountPrice: 900,
    rating: 4.7,
    reviews: 168,
    badge: null,
    stock: 'in-stock',
    description:
      'A compact pack of our classic blend — light on the pocket, generous on flavour. Ideal for the office pantry or a quick top-up.',
    features: ['Compact everyday pack', 'Bold colour, balanced taste', 'Resealable pouch'],
    image: 'pack',
      
  },
  {
    id: 'jt-250g',
    slug: 'junoon-tea-250g',
    name: 'Junoon Tea 250g',
    tagline: 'The starter pouch',
    categories: ['black-tea'],
    weight: '250g',
    price: 500,
    discountPrice: 450,
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
    id: 'jt-125g',
    slug: 'junoon-tea-125g',
    name: 'Junoon Tea 125g ',
    tagline: 'Minimum value, small size',
    categories: ['black-tea'],
    weight: '125g',
    price: 250,
    discountPrice: 225,
    rating: 4.8,
    reviews: 132,
    badge: 'Sale',
    stock: 'in-stock',
    description:
      'The same bold Junoon character in a lighter pack — perfect for smaller households or trying us for the first time.',
    features: ['Everyday strong brew', 'Consistent taste, every cup', 'Great value pack'],
    image: 'pack',
      
  },
 
 
]

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function formatPKR(amount) {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

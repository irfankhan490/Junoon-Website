# Junoon Tea — Website

"One Tea, Many Stories" — a premium, responsive e-commerce website for Junoon Tea,
built with React, React Router and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## What's included

- **Home** — hero, featured products, latest offers, why-choose-us, best sellers,
  testimonials, wholesale teaser, newsletter signup.
- **Shop** (`/shop`) — full catalog with category filters (Black Tea, Premium Tea,
  Family Packs, Special Offers) and sorting.
- **Offers** (`/offers`) — Lucky Draw, free delivery, and wholesale pricing promos.
- **Cart & Checkout** (`/checkout`) — cart review, delivery details form with
  validation, payment method selection, order review, and confirmation
  (`/order-confirmation`) with an order number, itemized total, and delivery ETA.
- **Wholesale** (`/wholesale`) — "For Shops & Businesses" page with a validated
  wholesale pricing request form.
- **About** (`/about`) — brand story.
- **Contact** (`/contact`) — phone, WhatsApp, email, location, and a contact form.
- Sticky navbar, floating WhatsApp button, fully responsive (mobile/tablet/desktop).

## Project structure

```
src/
  assets/        product photography
  components/    shared, reusable UI components
  context/       CartContext (cart state + mock order persistence)
  data/          mock product/offer/testimonial/business data (swap for a real API later)
  pages/         one file per route
  admin/README.md  notes on evolving this into a real backend + admin dashboard
```

## Notes

- All product, offer, and order data is mocked (see `src/data/`) and cart/orders
  persist to `localStorage` so the full flow — browse, add to cart, checkout,
  confirmation — works end-to-end without a backend.
- Replace the product photography in `src/assets/` with real product photos when
  available; every product currently points at the same packaging shot via the
  `image: 'pack'` field in `src/data/products.js`.
- See `src/admin/README.md` for how this is structured to plug into a real
  backend/admin dashboard later.

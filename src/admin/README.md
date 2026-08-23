# Admin-Ready Structure

This project is intentionally structured so a real backend and an admin dashboard
can be added later with minimal rework:

- **`src/data/products.js`** — the single source of truth for the product catalog.
  Every component reads from `PRODUCTS`/`CATEGORIES` exported here. Replacing the
  static array with a `fetch('/api/products')` call (e.g. via a `useEffect` +
  `useState`, or React Query) requires no changes to `ProductCard`, `Shop.jsx`, or
  `Home.jsx` — they only depend on the shape of each product object.
- **`src/data/offers.js`** — same pattern for promotions/offers. An admin "Create
  Offer" screen would simply write new rows to whatever table backs this array.
- **`src/context/CartContext.jsx`** — `placeOrder()` is the single choke point
  where an order is persisted. It currently writes to `localStorage`; swap its
  body for `await fetch('/api/orders', { method: 'POST', body: ... })` and every
  call site (`Checkout.jsx`) keeps working unchanged since it already does
  `const order = placeOrder(...)`.
- **Wholesale inquiries** (`Wholesale.jsx`) and **contact messages** (`Contact.jsx`)
  follow the same pattern — mock-persisted to `localStorage` under
  `junoon-tea-wholesale-inquiries` and `junoon-tea-contact-messages` respectively,
  ready to be swapped for real POST endpoints an admin dashboard could list.

## Suggested next steps for a real backend/admin panel

1. Stand up a small API (Node/Express, Django, Laravel, or a hosted backend like
   Supabase/Firebase) with tables/collections for `products`, `offers`, `orders`,
   and `wholesale_inquiries`.
2. Replace the static imports in `src/data/*.js` with data-fetching hooks that
   call that API, keeping the same exported shape (`PRODUCTS`, `OFFERS`, etc.) so
   no component code needs to change.
3. Build an authenticated `/admin` route (a separate app or a protected section
   of this one) with CRUD forms for products/offers and read views for orders
   and wholesale inquiries — pointing at the same API.
4. Add payment gateway integration (e.g. JazzCash/EasyPaisa merchant APIs or
   Stripe) behind the existing "Payment Method" step in `Checkout.jsx`.

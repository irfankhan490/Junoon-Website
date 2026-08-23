import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="section flex flex-col items-center py-32 text-center">
      <p className="font-display text-6xl font-bold text-gold">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold">This page has steeped away.</h1>
      <p className="mt-2 max-w-sm text-espresso-soft/70">
        We couldn’t find the page you’re looking for. Let’s get you back to something warm.
      </p>
      <Link to="/" className="btn-primary mt-8">Back to Home</Link>
    </div>
  )
}

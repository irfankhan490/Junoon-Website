export default function Logo({ light = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill={light ? '#F0AE0A' : '#2A1B10'} />
        <path
          d="M16 28h32c1.1 0 2 .9 2 2 0 8.8-7.2 16-16 16h-4c-8.8 0-16-7.2-16-16 0-1.1.9-2 2-2z"
          fill={light ? '#2A1B10' : '#F0AE0A'}
        />
        <path
          d="M46 30h3c3.3 0 6 2.7 6 6s-2.7 6-6 6h-1.5"
          stroke={light ? '#2A1B10' : '#F0AE0A'}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M24 24c-2-2-2-4 0-7M32 24c-2-2-2-5 1-8M40 24c-2-2-2-4 0-7"
          stroke={light ? '#F9D874' : '#F9D874'}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <span className={`font-display text-xl font-semibold leading-none ${light ? 'text-cream' : 'text-espresso'}`}>
        Junoon <span className="text-gold-deep">Tea</span>
      </span>
    </div>
  )
}

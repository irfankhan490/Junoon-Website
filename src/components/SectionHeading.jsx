export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
}) {
  return (
    <div
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2
        className={`text-3xl font-semibold sm:text-4xl ${light ? 'text-cream' : 'text-espresso'}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${light ? 'text-cream/70' : 'text-espresso-soft/80'}`}>
          {description}
        </p>
      )}
    </div>
  )
}

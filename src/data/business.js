// Central place for brand / contact constants — update once, reflected everywhere.
export const BUSINESS = {
  name: 'Junoon Tea',
  tagline: 'One Tea, Many Stories',
  phones: ['0313 9564338', '0314 9885315'],
  whatsapp: ['03139564338', '03149885315'],
  email: 'junoontea@gmail.com',
  location: 'Swabi, Khyber Pakhtunkhwa, Pakistan',
  hours: 'Mon – Sat, 9:00 AM – 8:00 PM',
  freeDeliveryThresholdKg: 5,
}

export function waLink(number, text) {
  const digits = number.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? `92${digits.slice(1)}` : digits
  const msg = encodeURIComponent(text || 'Assalam-o-Alaikum, I would like to know more about Junoon Tea.')
  return `https://wa.me/${intl}?text=${msg}`
}

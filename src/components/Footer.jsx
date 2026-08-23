import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram } from 'lucide-react'
import Logo from './Logo.jsx'
import { BUSINESS, waLink } from '../data/business.js'

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            One Tea, Many Stories. Premium, authentic Pakistani chai — carefully
            selected, consistently brewed, delivered to your door or your shop.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 transition hover:bg-gold hover:text-espresso"
              aria-label="Junoon Tea on Facebook"
            >
              <Facebook size={16} />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 transition hover:bg-gold hover:text-espresso"
              aria-label="Junoon Tea on Instagram"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gold">Explore</h3>
          <ul className="flex flex-col gap-3 text-sm text-cream/70">
            <li><Link to="/shop" className="hover:text-cream">Shop All Tea</Link></li>
            <li><Link to="/offers" className="hover:text-cream">Latest Offers</Link></li>
            <li><Link to="/wholesale" className="hover:text-cream">Wholesale & Bulk Orders</Link></li>
            <li><Link to="/about" className="hover:text-cream">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-cream">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gold">Shop by Category</h3>
          <ul className="flex flex-col gap-3 text-sm text-cream/70">
            <li><Link to="/shop?category=black-tea" className="hover:text-cream">Black Tea</Link></li>
            <li><Link to="/shop?category=premium-tea" className="hover:text-cream">Premium Tea</Link></li>
            <li><Link to="/shop?category=family-packs" className="hover:text-cream">Family Packs</Link></li>
            <li><Link to="/shop?category=special-offers" className="hover:text-cream">Special Offers</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gold">Get in Touch</h3>
          <ul className="flex flex-col gap-3 text-sm text-cream/70">
            <li className="flex items-start gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>{BUSINESS.phones.join(' / ')}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MessageCircle size={16} className="mt-0.5 shrink-0 text-gold" />
              <a href={waLink(BUSINESS.whatsapp[0])} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                WhatsApp Us
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-cream">{BUSINESS.email}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>{BUSINESS.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6">
        <div className="container flex flex-col items-center justify-between gap-3 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Junoon Tea. All rights reserved.</p>
          <p>Made with Junoon, in Pakistan 🇵🇰</p>
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ShoppingCart } from 'lucide-react'
import Logo from './Logo.jsx'
import CartDrawer from './CartDrawer.jsx'
import { useCart } from '../context/CartContext.jsx'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/offers', label: 'Offers' },
  { to: '/wholesale', label: 'Wholesale' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { itemCount } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [navigate])

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-cream/90 shadow-soft backdrop-blur-md' : 'bg-cream/40 backdrop-blur-sm'
        }`}
      >
        <nav className="container flex h-18 items-center justify-between py-3">
          <NavLink to="/" className="shrink-0" aria-label="Junoon Tea home">
            <Logo />
          </NavLink>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-espresso text-cream'
                        : 'text-espresso-soft hover:bg-espresso/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-espresso text-cream transition hover:bg-espresso-soft"
              aria-label={`Open cart, ${itemCount} items`}
            >
              <ShoppingCart size={19} />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-chili px-1 text-[11px] font-bold text-cream">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-espresso/10 text-espresso lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-espresso/10 bg-cream lg:hidden">
            <ul className="container flex flex-col gap-1 py-4">
              {LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-base font-semibold ${
                        isActive ? 'bg-espresso text-cream' : 'text-espresso-soft hover:bg-espresso/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

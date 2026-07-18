import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Flower2, ShoppingCart, Search, User, Menu, X } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'

interface HeaderProps {
  onCartOpen: () => void
}

export const Header: React.FC<HeaderProps> = ({ onCartOpen }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const totalItems = useCartStore((state) => state.getTotalItems())

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const leftLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ARTICLES', path: '/articles' },
    { name: 'ABOUT', path: '/about' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 h-[72px] w-full border-b border-charcoal-100 bg-white/95 backdrop-blur-sm">
      <div
        data-testid="header-container"
        className="mx-auto grid h-full max-w-[1440px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-4 sm:px-6 lg:px-8"
      >
        <div data-testid="header-left" className="flex min-w-0 items-center justify-start">
          <nav className="hidden items-center gap-6 md:flex lg:gap-9" aria-label="Navigasi utama">
            {leftLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[11px] font-bold leading-none tracking-widest transition-colors duration-200 hover:text-primary-600 ${
                  isActive(link.path) ? 'text-primary-600' : 'text-charcoal-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-charcoal-800 transition-colors hover:bg-charcoal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 sm:h-11 sm:w-11 md:hidden"
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" strokeWidth={1.8} /> : <Menu className="h-5 w-5" strokeWidth={1.8} />}
          </button>
        </div>

        <div data-testid="header-logo" className="flex items-center justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center whitespace-nowrap font-serif text-base font-semibold leading-none tracking-normal text-charcoal-900 transition-colors hover:text-primary-600 sm:text-xl"
            aria-label="Kembang Seladang"
          >
            <span>Kembang</span>
            <Flower2 className="mx-1 h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            <span>Seladang</span>
          </Link>
        </div>

        <div data-testid="header-actions" className="flex min-w-0 items-center justify-end gap-1 sm:gap-2">
          <button
            type="button"
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full text-charcoal-700 transition-colors hover:bg-charcoal-50 hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 sm:inline-flex"
            aria-label="Cari"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </button>

          <Link
            to="/login"
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full text-charcoal-700 transition-colors hover:bg-charcoal-50 hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 sm:inline-flex"
            aria-label="Login"
          >
            <User className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </Link>

          <button
            type="button"
            onClick={onCartOpen}
            className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-charcoal-700 transition-colors hover:bg-charcoal-50 hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 sm:h-11 sm:w-11"
            aria-label="Keranjang"
          >
            <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={1.8} />
            {totalItems > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-charcoal-900 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-40 border-b border-charcoal-100 bg-white">
          <nav
            className="mx-auto flex max-w-[1440px] flex-col px-4 py-3 sm:px-6"
            aria-label="Navigasi mobile"
          >
            {leftLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`border-b border-charcoal-100 py-3 text-xs font-bold leading-none tracking-widest ${
                  isActive(link.path) ? 'text-primary-600' : 'text-charcoal-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="py-3 text-xs font-bold leading-none tracking-widest text-charcoal-700"
            >
              LOGIN / AKUN
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header

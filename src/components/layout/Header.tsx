import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'

interface HeaderProps {
  onCartOpen: () => void
}

export const Header: React.FC<HeaderProps> = ({ onCartOpen }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const totalItems = useCartStore((state) => state.getTotalItems())

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <header
      className={`fixed top-0 left-0 w-full bg-white border-b border-charcoal-100 z-50 transition-all duration-200 ${
        isScrolled ? 'h-16 shadow-sm' : 'h-[72px]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-full w-full">
          
          {/* 1. Left: Navigation links (Desktop) or Hamburger (Mobile) */}
          <div className="flex items-center justify-start h-full">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {leftLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] font-bold tracking-widest transition-colors duration-200 hover:text-primary-600 ${
                    isActive(link.path) ? 'text-primary-600' : 'text-charcoal-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-charcoal-50 text-charcoal-800 transition-colors cursor-pointer -ml-2"
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* 2. Center: Logo (Mathematically Centered) */}
          <div className="flex items-center justify-center">
            <Link to="/" className="inline-flex items-center justify-center select-none group">
              <span className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-charcoal-900 group-hover:text-primary-600 transition-colors whitespace-nowrap flex items-center justify-center">
                <span>Kembang</span>
                <svg className="w-5.5 h-5.5 text-charcoal-900 fill-current mx-1 -mt-0.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c-1.5-1.5-3.5-1.8-4-4 0 2 1.5 3.5 4 4zm0 0c1.5-1.5 3.5-1.8 4-4 0 2-1.5 3.5-4 4zm0 0c0-2.5.5-5 .5-5s-1 2.5-.5 5z" />
                </svg>
                <span>Seladang</span>
              </span>
            </Link>
          </div>

          {/* 3. Right: Search, Account, Cart */}
          <div className="flex items-center justify-end gap-1 sm:gap-2 h-full">
            {/* Search */}
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-charcoal-50 text-charcoal-700 hover:text-primary-600 transition-colors cursor-pointer"
              aria-label="Cari"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Login / User (Hidden on mobile to save space) */}
            <Link
              to="/login"
              className="w-10 h-10 hidden sm:flex items-center justify-center rounded-full hover:bg-charcoal-50 text-charcoal-700 hover:text-primary-600 transition-colors"
              aria-label="Login"
            >
              <User className="w-4.5 h-4.5" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={onCartOpen}
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-charcoal-50 text-charcoal-700 hover:text-primary-600 transition-colors cursor-pointer"
              aria-label="Keranjang"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              {totalItems >= 0 && (
                <span className="absolute top-1.5 right-1.5 bg-charcoal-900 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-charcoal-100 shadow-md absolute top-full left-0 w-full overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-6 py-4 space-y-3 flex flex-col">
            {leftLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-2 text-xs font-bold tracking-widest border-b border-charcoal-50 ${
                  isActive(link.path) ? 'text-primary-600' : 'text-charcoal-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* Show login link inside mobile menu */}
            <Link
              to="/login"
              className="py-2 text-xs font-bold tracking-widest text-charcoal-700 border-b border-charcoal-50"
            >
              LOGIN / AKUN
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

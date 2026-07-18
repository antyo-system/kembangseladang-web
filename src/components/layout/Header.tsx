import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react'
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
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const leftLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ARTICLE', path: '/articles' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-white border-b border-charcoal-100 ${
        isScrolled ? 'py-3 shadow-sm' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center">
          
          {/* Left: Navigation links (Desktop) */}
          <nav className="hidden md:flex space-x-6 items-center">
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
          
          {/* Mobile hamburger menu (Left side on mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl hover:bg-primary-50 text-charcoal-800 transition-all cursor-pointer"
            >
              {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex justify-center">
            <Link to="/" className="text-center select-none group">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-widest text-charcoal-900 group-hover:text-primary-600 transition-colors uppercase">
                Kembang Seladang
              </span>
              <span className="text-[9px] block tracking-[0.25em] text-gold-500 font-bold uppercase mt-0.5">
                Flower & Bouquet Expertise
              </span>
            </Link>
          </div>

          {/* Right: Actions (User, Search, Cart/Chart) */}
          <div className="flex items-center justify-end space-x-2 sm:space-x-4">
            {/* Search */}
            <button
              className="p-2 rounded-full hover:bg-primary-50 text-charcoal-700 hover:text-primary-600 transition-colors cursor-pointer"
              aria-label="Cari"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Login / User */}
            <Link
              to="/login"
              className="p-2 rounded-full hover:bg-primary-50 text-charcoal-700 hover:text-primary-600 transition-colors"
              aria-label="Login"
            >
              <User className="w-4.5 h-4.5" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={onCartOpen}
              className="relative p-2 rounded-full hover:bg-primary-50 text-charcoal-700 hover:text-primary-600 transition-colors cursor-pointer"
              aria-label="Keranjang"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary-600 text-white text-[9px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full border border-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-charcoal-100 shadow-lg absolute top-full left-0 w-full overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
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
          </div>
        </div>
      )}
    </header>
  )
}

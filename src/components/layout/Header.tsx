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
    { name: 'ARTICLES', path: '/articles' },
    { name: 'ABOUT', path: '/about' },
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
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center w-full">
          
          {/* Left: Navigation links (Desktop) */}
          <div className="w-1/3 flex justify-start">
            <nav className="hidden md:flex gap-6 items-center">
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
          </div>

          {/* Center: Brand Logo */}
          <div className="w-1/3 flex justify-center text-center">
            <Link to="/" className="inline-block select-none group">
              <span className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-charcoal-900 group-hover:text-primary-600 transition-colors whitespace-nowrap flex items-center justify-center">
                <span>Kembang</span>
                <svg className="w-5 h-5 text-charcoal-900 fill-current mx-1 -mt-0.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c-1.5-1.5-3.5-1.8-4-4 0 2 1.5 3.5 4 4zm0 0c1.5-1.5 3.5-1.8 4-4 0 2-1.5 3.5-4 4zm0 0c0-2.5.5-5 .5-5s-1 2.5-.5 5z" />
                </svg>
                <span>Seladang</span>
              </span>
            </Link>
          </div>

          {/* Right: Actions (User, Search, Cart/Chart) */}
          <div className="w-1/3 flex items-center justify-end gap-1 sm:gap-2">
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
              <ShoppingCart className="w-4.5 h-4.5" />
              {totalItems >= 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-charcoal-900 text-white text-[8px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full">
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

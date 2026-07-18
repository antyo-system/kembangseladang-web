import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, Heart } from 'lucide-react'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal-900 text-charcoal-100 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-display text-2xl font-bold text-primary-400 tracking-wide">
                Kembang Seladang
              </span>
              <span className="text-xl">🌸</span>
            </Link>
            <p className="text-charcoal-400 text-sm leading-relaxed text-balance">
              Menghadirkan keindahan rangkaian bunga segar, buket tangan premium, standing flower, dan papan ucapan untuk momen istimewa Anda di Tangerang Selatan & sekitarnya.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-charcoal-800 hover:bg-primary-600 rounded-full text-charcoal-300 hover:text-white transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram Kembang Seladang"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-white tracking-wide">
              Navigasi Cepat
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-charcoal-400 hover:text-primary-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-charcoal-400 hover:text-primary-400 transition-colors">
                  Katalog Bunga
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-charcoal-400 hover:text-primary-400 transition-colors">
                  Artikel Florist
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-charcoal-400 hover:text-primary-400 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-charcoal-400 hover:text-primary-400 transition-colors">
                  Kontak Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Operational Hours */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-white tracking-wide">
              Jam Operasional
            </h3>
            <ul className="space-y-3 text-sm text-charcoal-400">
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal-200">Setiap Hari</p>
                  <p className="text-xs text-charcoal-500">07:00 - 21:00 WIB</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal-200">Toko Fisik</p>
                  <p className="text-xs text-charcoal-500">Bintaro, Tangerang Selatan</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-white tracking-wide">
              Hubungi Florist
            </h3>
            <p className="text-charcoal-400 text-sm">
              Butuh custom order bouquet atau dekorasi pernikahan? Diskusikan dengan Kak Priska.
            </p>
            <a
              href="https://wa.me/6287772636627"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2.5 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 cursor-pointer"
            >
              <Phone className="w-4.5 h-4.5" />
              <span>Chat WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-charcoal-800 my-10" />

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-charcoal-500 space-y-4 sm:space-y-0">
          <p>© {currentYear} Kembang Seladang. All rights reserved.</p>
          <p className="flex items-center">
            Made with <Heart className="w-3.5 h-3.5 text-primary-500 mx-1 fill-primary-500" /> in Tangerang Selatan
          </p>
        </div>
      </div>
    </footer>
  )
}

import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { WhatsAppFAB } from './components/layout/WhatsAppFAB'
import { CartDrawer } from './components/cart/CartDrawer'
import { Products } from './pages/Products'
import { ProductDetail } from './pages/ProductDetail'
import { Articles } from './pages/Articles'
import { ArticleDetail } from './pages/ArticleDetail'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { supabaseConfigError } from './lib/supabase'

export const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleCartOpen = () => setIsCartOpen(true)
  const handleCartClose = () => setIsCartOpen(false)

  if (supabaseConfigError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream-50 px-6 py-12">
        <section className="max-w-md border border-charcoal-100 bg-white p-6 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
            Konfigurasi Belum Lengkap
          </p>
          <h1 className="mt-3 font-display text-2xl font-bold text-charcoal-900">
            Website belum terhubung ke katalog.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-charcoal-500">
            Tambahkan environment variable Vercel untuk Supabase, lalu deploy ulang website.
          </p>
          <div className="mt-5 space-y-2 border border-charcoal-100 bg-charcoal-50 p-3 text-left text-xs font-semibold text-charcoal-700">
            <p>VITE_SUPABASE_URL</p>
            <p>VITE_SUPABASE_ANON_KEY</p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Layout */}
      <Header onCartOpen={handleCartOpen} />

      {/* Main Pages Outlet */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/blog" element={<Articles />} />
          <Route path="/blog/:slug" element={<ArticleDetail />} />
          <Route path="/artikel" element={<Articles />} />
          <Route path="/artikel/:slug" element={<ArticleDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer Layout */}
      <Footer />

      {/* Cart Drawer Slide-over */}
      <CartDrawer isOpen={isCartOpen} onClose={handleCartClose} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFAB />
    </div>
  )
}

export default App

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

export const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleCartOpen = () => setIsCartOpen(true)
  const handleCartClose = () => setIsCartOpen(false)

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

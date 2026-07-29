import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { WhatsAppFAB } from './components/layout/WhatsAppFAB'
import { Products } from './pages/Products'
import { supabaseConfigError } from './lib/supabase'
import { PWAUpdatePrompt } from './components/layout/PWAUpdatePrompt'
import { trackPageView } from './utils/analytics'
import { updateSEOMetadata, getFloristLocalBusinessSchema, getHomepageFAQSchema, getCombinedGraphSchema } from './utils/seo'
// Lazy-loaded secondary route and UI components for optimal initial bundle size
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(m => ({ default: m.ProductDetail })))
const Articles = lazy(() => import('./pages/Articles').then(m => ({ default: m.Articles })))
const ArticleDetail = lazy(() => import('./pages/ArticleDetail').then(m => ({ default: m.ArticleDetail })))
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })))
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })))
const ReturnPolicy = lazy(() => import('./pages/ReturnPolicy').then(m => ({ default: m.ReturnPolicy })))
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })))
const CategoryLanding = lazy(() => import('./pages/CategoryLanding').then(m => ({ default: m.CategoryLanding })))
const CartDrawer = lazy(() => import('./components/cart/CartDrawer').then(m => ({ default: m.CartDrawer })))

// Slug-aware redirects — carry :slug to canonical /articles/:slug
const RedirectBlogSlug: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={`/articles/${slug}`} replace />
}
const RedirectArtikelSlug: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={`/articles/${slug}`} replace />
}

// Lightweight fallback loader during route transition
const PageFallback: React.FC = () => (
  <div className="min-h-[40vh] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
  </div>
)


export const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname)
    // Inject Florist LocalBusiness + FAQ Schema on root homepage and products catalog
    if (location.pathname === '/' || location.pathname === '/products') {
      updateSEOMetadata({
        jsonLd: getCombinedGraphSchema(
          getFloristLocalBusinessSchema(),
          getHomepageFAQSchema()
        )
      })
    }
  }, [location.pathname])

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
      {/* PWA Auto-Update Banner */}
      <PWAUpdatePrompt />

      {/* Header Layout */}
      <Header onCartOpen={handleCartOpen} />

      {/* Main Pages Outlet */}
      <main className="flex-grow">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            {/* /blog and /artikel redirect to canonical /articles path */}
            <Route path="/blog" element={<Navigate to="/articles" replace />} />
            <Route path="/blog/:slug" element={<RedirectBlogSlug />} />
            <Route path="/artikel" element={<Navigate to="/articles" replace />} />
            <Route path="/artikel/:slug" element={<RedirectArtikelSlug />} />
            <Route path="/katalog" element={<Navigate to="/products" replace />} />
            <Route path="/katalog/:slug" element={<CategoryLanding />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/kebijakan-pengembalian" element={<ReturnPolicy />} />
            <Route path="/returns" element={<ReturnPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer Layout */}
      <Footer />

      {/* Cart Drawer Slide-over */}
      <Suspense fallback={null}>
        <CartDrawer isOpen={isCartOpen} onClose={handleCartClose} />
      </Suspense>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFAB />
    </div>
  )
}

export default App

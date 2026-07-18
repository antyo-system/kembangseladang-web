import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Send, ShieldCheck, Truck } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { useArticles } from '../hooks/useArticles'
import { ProductCard } from '../components/product/ProductCard'
import { ArticleCard } from '../components/article/ArticleCard'
import { Button } from '../components/ui/Button'

export const Home: React.FC = () => {
  const { data: products, isLoading: productsLoading } = useProducts()
  const { data: articles, isLoading: articlesLoading } = useArticles()

  const featuredProducts = products?.slice(0, 4) || []
  const latestArticles = articles?.slice(0, 3) || []

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-primary-50 border border-primary-100 px-3.5 py-1.5 rounded-full text-primary-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Florist Premium Tangerang Selatan</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal-900 leading-tight">
              Sentuhan Kasih Lewat Keindahan <span className="text-primary-600 block">Bunga Segar</span>
            </h1>
            
            <p className="text-sm sm:text-base text-charcoal-600 max-w-lg mx-auto lg:mx-0 leading-relaxed text-balance">
              Kembang Seladang merangkai mawar segar pilihan dan aneka bunga premium untuk setiap pesan cinta, ucapan selamat, hingga dekorasi momen istimewa Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4">
              <Link to="/products">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-lg shadow-primary-500/15">
                  <span>Lihat Katalog</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="cream" size="lg" className="w-full sm:w-auto">
                  Tentang Kami
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Right Image (WOW Graphic element) */}
          <div className="relative mx-auto max-w-md lg:max-w-none w-full">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-400 to-gold-400 rounded-[2.5rem] blur-xl opacity-30 animate-pulse" />
            <div className="relative bg-white p-4 rounded-[2.5rem] border border-primary-100 shadow-xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800"
                alt="Beautiful Flower Arrangement"
                className="w-full h-full object-cover rounded-[2rem] hover:scale-102 transition-transform duration-700"
              />
            </div>
            
            {/* Float badge */}
            <div className="absolute -bottom-4 -left-4 glass p-4 rounded-2xl border border-primary-100 shadow-lg flex items-center space-x-3 animate-float max-w-[200px]">
              <span className="text-2xl">🌹</span>
              <div>
                <p className="font-bold text-xs text-charcoal-900">100% Segar</p>
                <p className="text-[10px] text-charcoal-500">Dipetik & dirangkai hari ini</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass p-8 rounded-3xl border border-primary-100/50 shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-primary-50 text-primary-600 rounded-2xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-charcoal-900">Desain Premium</h3>
            <p className="text-xs text-charcoal-500 text-balance leading-relaxed">
              Setiap buket dirangkai oleh florist berpengalaman dengan detail keindahan yang khas dan personal.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-primary-100/50 shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-primary-50 text-primary-600 rounded-2xl">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-charcoal-900">Pengiriman Cepat</h3>
            <p className="text-xs text-charcoal-500 text-balance leading-relaxed">
              Layanan kurir khusus menjamin rangkaian bunga sampai ke tangan penerima dalam kondisi prima.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-primary-100/50 shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-primary-50 text-primary-600 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-charcoal-900">Layanan Personal</h3>
            <p className="text-xs text-charcoal-500 text-balance leading-relaxed">
              Konsultasi gratis, konfirmasi foto sebelum kirim, dan update rute via WhatsApp.
            </p>
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-center sm:text-left">
          <div className="space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900">
              Koleksi Rangkaian Terpopuler
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500">
              Pilihan bunga terlaris untuk merayakan momen spesial Anda.
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline" size="md">
              <span>Lihat Semua Produk</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square skeleton rounded-3xl" />
                <div className="h-4 skeleton w-2/3" />
                <div className="h-4 skeleton w-1/3" />
              </div>
            ))}
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-12 text-charcoal-500">
            Katalog bunga sedang dimuat. Silakan chat kami via WhatsApp untuk order cepat.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Custom Arrangement Promo Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2rem] overflow-hidden bg-charcoal-900 text-white p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12 border border-charcoal-800 shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 flex-1 space-y-6 text-center lg:text-left">
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Punya Rencana Custom Rangkaian Sendiri?
            </h2>
            <p className="text-sm text-charcoal-300 max-w-lg mx-auto lg:mx-0 leading-relaxed text-balance">
              Diskusikan ide rangkaian bunga Anda mulai dari pilihan jenis mawar, kombinasi warna, hiasan kertas pita, hingga budget yang Anda inginkan bersama tim florist profesional kami.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/6287772636627?text=Halo%20Kak%20Priska%2C%20saya%20mau%20konsultasi%20custom%20order%20rangkaian%20bunga%20di%20Kembang%20Seladang."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-primary-600/20 active:scale-98 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 mr-2" />
                <span>Hubungi Kak Priska</span>
              </a>
            </div>
          </div>

          <div className="relative z-10 w-full max-w-sm lg:max-w-xs shrink-0 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-charcoal-800">
            <img
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=600"
              alt="Custom arrangement flower table"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Latest Blog Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900">
            Tips & Inspirasi Florist
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 max-w-md mx-auto">
            Temukan panduan merawat bunga potong serta inspirasi desain dekorasi bunga terupdate.
          </p>
        </div>

        {articlesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[16/10] skeleton rounded-3xl" />
                <div className="h-4 skeleton w-3/4" />
                <div className="h-4 skeleton w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>

    </div>
  )
}

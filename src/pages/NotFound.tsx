import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Flower, ArrowLeft, ShoppingBag } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { updateSEOMetadata } from '../utils/seo'

export const NotFound: React.FC = () => {
  useEffect(() => {
    updateSEOMetadata({
      title: 'Halaman Tidak Ditemukan (404) | Kembang Seladang',
      description: 'Halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan. Kembali ke katalog buket bunga Kembang Seladang.',
      canonicalUrl: 'https://kembangseladang.com/404'
    })
  }, [])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-cream-50/50">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-[2rem] border border-primary-100 shadow-xs">
        <div className="w-20 h-20 bg-pink-100/70 text-primary-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
          <Flower className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
            Error 404 — Not Found
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-900">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-sm text-charcoal-500 leading-relaxed">
            Maaf, halaman atau rangkaian bunga yang Anda cari telah dipindahkan atau tidak tersedia lagi.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full flex items-center justify-center space-x-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Lihat Katalog Bunga</span>
            </Button>
          </Link>
          <Link to="/blog" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Baca Artikel SEO</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound

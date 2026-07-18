import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, Plus, Minus, Send, Check } from 'lucide-react'
import { useProduct } from '../hooks/useProducts'
import { useCartStore } from '../store/useCartStore'
import { formatRupiah } from '../utils/formatCurrency'
import { buildCartMessage, buildWhatsAppUrl } from '../utils/whatsapp'
import { Button } from '../components/ui/Button'

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: product, isLoading, isError } = useProduct(id || '')
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleIncrement = () => setQuantity((prev) => prev + 1)
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    if (!product) return
    addItem(product, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleBuyNowDirect = () => {
    if (!product) return
    const cartItem = { product, quantity }
    const message = buildCartMessage([cartItem])
    const url = buildWhatsAppUrl(message)
    window.open(url, '_blank')
  }

  if (isLoading) {
    return (
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="h-6 bg-cream-200 w-24 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-cream-200 rounded-[2rem]" />
          <div className="space-y-6">
            <div className="h-8 bg-cream-200 w-3/4 rounded-lg" />
            <div className="h-6 bg-cream-200 w-1/3 rounded-lg" />
            <div className="h-20 bg-cream-200 rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="pt-32 pb-20 text-center space-y-4 max-w-md mx-auto px-4">
        <p className="font-display text-xl font-bold text-charcoal-800">
          Produk Tidak Ditemukan
        </p>
        <p className="text-sm text-charcoal-500">
          Maaf, rangkaian bunga yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Link to="/products" className="inline-block">
          <Button variant="primary">Kembali ke Katalog</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Back Button / Navigation */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-sm font-semibold text-charcoal-600 hover:text-primary-600 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4.5 h-4.5 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali</span>
        </button>
      </div>

      {/* Main product details container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Product Image Panel */}
        <div className="relative bg-white p-4 rounded-[2rem] border border-primary-100/40 shadow-sm overflow-hidden aspect-square select-none">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-[1.5rem]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-charcoal-400 text-7xl bg-cream-50 rounded-[1.5rem]">
              🌸
            </div>
          )}
          
          {product.is_arranged && (
            <span className="absolute top-8 left-8 bg-primary-600 text-white text-[10px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-lg shadow-sm">
              Rangkaian Premium
            </span>
          )}
        </div>

        {/* Product Meta & Actions */}
        <div className="space-y-8">
          
          {/* Headline info */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-gold-500 tracking-wider uppercase">
              {product.flower_type || 'Bunga Potong'}
            </span>
            
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900 leading-tight">
              {product.name}
            </h1>
            
            <div className="font-display text-2xl font-bold text-primary-700">
              {formatRupiah(product.base_price)}
            </div>
          </div>

          <div className="h-px bg-cream-100" />

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-charcoal-400">Deskripsi Rangkaian</h2>
            <p className="text-sm text-charcoal-600 leading-relaxed text-balance">
              {product.description || 'Tidak ada deskripsi lengkap untuk produk ini.'}
            </p>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-primary-100/30">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">Warna Bunga</p>
              <p className="text-sm font-semibold text-charcoal-800">{product.color || 'Custom/Sesuai Request'}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">Tangkai</p>
              <p className="text-sm font-semibold text-charcoal-800">{product.stem_length ? `Mawar ${product.stem_length}` : 'Bebas'}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 font-body">Satuan Jual</p>
              <p className="text-sm font-semibold text-charcoal-800">{product.unit || 'Buket'}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">Status Stok</p>
              <p className="text-sm font-semibold text-emerald-600">Bunga Segar Ready</p>
            </div>
          </div>

          <div className="h-px bg-cream-100" />

          {/* Action Row */}
          <div className="space-y-4">
            
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-charcoal-500">Jumlah:</span>
              <div className="flex items-center space-x-3 border border-primary-100 rounded-xl p-1 bg-white">
                <button
                  onClick={handleDecrement}
                  className="p-1.5 hover:bg-primary-50 text-charcoal-600 rounded-lg transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold px-3 text-charcoal-800 min-w-8 text-center select-none">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="p-1.5 hover:bg-primary-50 text-charcoal-600 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                variant={isAdded ? 'cream' : 'outline'}
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 rounded-xl"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4.5 h-4.5 mr-2 text-primary-600 animate-in zoom-in" />
                    <span className="text-primary-700">Tersimpan di Keranjang</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4.5 h-4.5 mr-2" />
                    <span>Masukkan Keranjang</span>
                  </>
                )}
              </Button>
              
              <Button
                variant="primary"
                size="lg"
                onClick={handleBuyNowDirect}
                className="flex-1 rounded-xl shadow-lg shadow-primary-500/15"
              >
                <Send className="w-4.5 h-4.5 mr-2" />
                <span>Pesan Langsung</span>
              </Button>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

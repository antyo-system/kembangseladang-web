import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Star } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import type { Product } from '../../store/useCartStore'
import { formatRupiah } from '../../utils/formatCurrency'
import { Button } from '../ui/Button'

interface ProductCardProps {
  product: Product
}

// Array of high quality bouquet photos from Unsplash to serve as fallback images
const FALLBACK_BOUQUET_IMAGES = [
  'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
]

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem)

  // Determinisitic fallback image index based on product ID
  const imageIndex = Math.abs(
    product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  ) % FALLBACK_BOUQUET_IMAGES.length

  const productImage = product.image || FALLBACK_BOUQUET_IMAGES[imageIndex]

  // Mock review details
  const mockRating = 5.0
  const mockReviewCount = 12 + (imageIndex * 7)

  return (
    <div className="group bg-white rounded-3xl border border-charcoal-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Product Image Panel */}
      <Link to={`/products/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-cream-50 select-none">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badges */}
        {product.is_arranged && (
          <span className="absolute top-4 left-4 bg-charcoal-900/90 backdrop-blur-sm text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
            Best Seller
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="text-[10px] font-bold text-gold-500 tracking-widest uppercase mb-1">
            {product.flower_type || 'Bunga Potong'}
          </div>
          
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-display text-sm font-bold text-charcoal-900 group-hover:text-primary-600 transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
          
          {/* Mock Rating Stars */}
          <div className="flex items-center space-x-1 mt-1 text-gold-400">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="text-[10px] text-charcoal-400 font-medium pt-0.5">
              {mockRating.toFixed(1)} ({mockReviewCount})
            </span>
          </div>

          <p className="text-xs text-charcoal-500 line-clamp-2 mt-2 leading-relaxed">
            {product.description || 'Tidak ada deskripsi produk.'}
          </p>
        </div>

        {/* Action Panel */}
        <div className="flex items-center justify-between pt-3 border-t border-charcoal-50">
          <span className="font-display text-sm font-bold text-charcoal-900">
            {formatRupiah(product.base_price)}
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
            }}
            className="rounded-lg p-2 hover:bg-primary-50 text-charcoal-700 hover:text-primary-600 cursor-pointer"
            aria-label="Tambah ke keranjang"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

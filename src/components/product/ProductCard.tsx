import React from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import type { Product } from '../../store/useCartStore'
import { formatRupiah } from '../../utils/formatCurrency'

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


  return (
    <div className="group bg-white rounded-3xl border border-charcoal-100 p-4 hover:shadow-lg transition-all duration-300 flex flex-col h-full items-center text-center space-y-3">
      {/* Product Image Panel */}
      <Link to={`/products/${product.id}`} className="block relative aspect-square w-full overflow-hidden rounded-2xl bg-cream-50 select-none">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badges */}
        {product.is_arranged && (
          <span className="absolute top-3 left-3 bg-charcoal-900/90 text-white text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded">
            Best Seller
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between w-full space-y-2">
        <div className="space-y-1">
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-display text-sm font-bold text-charcoal-900 group-hover:text-primary-600 transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
          
          <div className="text-xs font-semibold text-charcoal-600">
            {formatRupiah(product.base_price)}
          </div>
          
          {/* Mock Rating Stars */}
          <div className="flex items-center justify-center space-x-1 text-gold-400">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3.5 fill-current" />
              ))}
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="pt-2">
          <button
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
            }}
            className="w-full border border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-white rounded-full py-2 text-[10px] font-bold tracking-widest transition-all duration-300 uppercase cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

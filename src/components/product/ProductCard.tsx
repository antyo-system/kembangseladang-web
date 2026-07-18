import React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Product, useCartStore } from '../../store/useCartStore'
import { formatRupiah } from '../../utils/formatCurrency'
import { Button } from '../ui/Button'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <div className="group bg-white rounded-3xl border border-primary-100/40 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-500/5 hover:border-primary-200 transition-all duration-300 flex flex-col h-full">
      {/* Product Image Panel */}
      <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-cream-50 select-none">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-charcoal-400 group-hover:scale-105 transition-transform duration-500 text-5xl">
            🌸
          </div>
        )}
        
        {/* Badges */}
        {product.is_arranged && (
          <span className="absolute top-4 left-4 bg-primary-600/90 backdrop-blur-sm text-white text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-lg">
            Rangkaian Premium
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-medium text-gold-500 tracking-wider uppercase mb-1">
            {product.flower_type || 'Bunga Potong'}
          </div>
          
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-display text-base font-bold text-charcoal-900 group-hover:text-primary-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-xs text-charcoal-400 line-clamp-2 mt-1.5 leading-relaxed">
            {product.description || 'Tidak ada deskripsi produk.'}
          </p>
        </div>

        {/* Action Panel */}
        <div className="flex items-center justify-between pt-5 mt-4 border-t border-cream-100">
          <span className="font-display text-base font-bold text-primary-700">
            {formatRupiah(product.base_price)}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
            }}
            className="rounded-lg p-2 hover:bg-primary-600 hover:text-white"
            aria-label="Tambah ke keranjang"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

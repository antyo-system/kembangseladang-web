import React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import type { Product } from '../../store/useCartStore'
import { formatRupiah } from '../../utils/formatCurrency'
import { getProductDiscountPercentage, getProductOriginalPrice } from '../../utils/productPricing'
import { formatSoldCount, getProductSoldCount } from '../../utils/productSales'

interface ProductCardProps {
  product: Product
}

// Array of high quality bouquet photos from Unsplash to serve as fallback images
const FALLBACK_BOUQUET_IMAGES = [
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&q=80&w=600',
]

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem)

  // Deterministic fallback image index based on product ID
  const imageIndex = Math.abs(
    product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  ) % FALLBACK_BOUQUET_IMAGES.length

  const productImage = product.image || FALLBACK_BOUQUET_IMAGES[imageIndex]
  const originalPrice = getProductOriginalPrice(product)
  const discountPercentage = getProductDiscountPercentage(product)
  const soldCount = getProductSoldCount(product)


  return (
    <article className="group flex h-full flex-col overflow-hidden border border-charcoal-100 bg-white transition-colors duration-200 hover:border-charcoal-300">
      <Link
        to={`/products/${product.id}`}
        className="relative block aspect-square w-full overflow-hidden bg-cream-50 select-none"
      >
        <img
          src={productImage}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        
        {discountPercentage > 0 ? (
          <span className="absolute left-2 top-2 bg-primary-100 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-charcoal-900">
            Sale
          </span>
        ) : product.is_arranged && (
          <span className="absolute left-2 top-2 bg-charcoal-900 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white">
            Terlaris
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-3 p-3">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="line-clamp-2 min-h-[2.35rem] text-sm font-semibold leading-snug text-charcoal-900 transition-colors group-hover:text-primary-600">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-end justify-between gap-2">
          <div className="min-w-0 space-y-1">
            {discountPercentage > 0 && (
              <span className="inline-flex border border-primary-600 bg-primary-600 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                Hemat {discountPercentage}%
              </span>
            )}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] font-medium uppercase tracking-wide text-charcoal-400">
              <span>Mulai dari</span>
              {soldCount > 0 && (
                <span className="font-semibold normal-case tracking-normal text-charcoal-500">
                  {formatSoldCount(soldCount)} terjual
                </span>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="whitespace-nowrap text-[13px] font-bold text-charcoal-900 sm:text-sm">
                {formatRupiah(product.base_price)}
              </p>
              {originalPrice && (
                <p className="whitespace-nowrap text-[11px] font-semibold text-charcoal-400 line-through">
                  {formatRupiah(originalPrice)}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
            }}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-charcoal-900 text-charcoal-900 transition-colors hover:bg-charcoal-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
            aria-label={`Tambah ${product.name} ke keranjang`}
            title="Tambah ke keranjang"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </article>
  )
}

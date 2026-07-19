import React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import type { Product } from '../../store/useCartStore'
import { formatRupiah } from '../../utils/formatCurrency'
import { getProductDiscountPercentage, getProductOriginalPrice } from '../../utils/productPricing'
import { formatSoldCount, getProductSoldCount } from '../../utils/productSales'
import { getProductRating } from '../../utils/productRatings'

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
  const { rating } = getProductRating(product.id)

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-charcoal-100 bg-white transition-all duration-300 hover:border-primary-300 hover:shadow-md rounded-md">
      <Link
        to={`/products/${product.id}`}
        className="relative block aspect-square w-full overflow-hidden bg-cream-50 select-none"
      >
        <img
          src={productImage}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        
        {/* Discount Badge Shopee style - Yellow flag at top right */}
        {discountPercentage > 0 && (
          <div className="absolute right-0 top-0 bg-[#ffd124] text-[#ee4d2d] px-1.5 py-1 text-[11px] font-extrabold rounded-bl-sm z-10 shadow-sm leading-none">
            -{discountPercentage}%
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-2 p-3">
        <div className="flex flex-col gap-1">
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-charcoal-900 transition-colors group-hover:text-primary-600">
              {product.name}
            </h3>
          </Link>

          {/* Shopee-style thin bordered promotion tag */}
          <div className="flex flex-wrap gap-1">
            <span className="border border-primary-200 bg-primary-50 px-1.5 py-0.5 text-[9px] font-semibold text-primary-700 rounded-sm leading-none">
              Garansi Segar
            </span>
            <span className="border border-gold-300 bg-cream-50 px-1.5 py-0.5 text-[9px] font-semibold text-gold-600 rounded-sm leading-none">
              Free Card
            </span>
          </div>

          {/* Sold Count Row */}
          <div className="flex items-center gap-1.5 text-[11px] text-charcoal-500 select-none mt-0.5">
            <span className="text-charcoal-600">
              {soldCount > 0 ? `${formatSoldCount(soldCount)} terjual` : ''}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 pt-1 border-t border-dashed border-charcoal-100">
          <div className="min-w-0">
            {discountPercentage > 0 && (
              <div className="mb-0.5">
                <span className="inline-flex border border-primary-100 bg-primary-50 px-1 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-primary-600 rounded-sm">
                  Hemat {discountPercentage}%
                </span>
              </div>
            )}
            
            <div className="flex flex-col gap-0.5">
              <div className="flex flex-wrap items-baseline gap-x-1.5">
                <span className="text-base font-extrabold text-primary-600 whitespace-nowrap">
                  {formatRupiah(product.base_price)}
                </span>
                {originalPrice && (
                  <span className="text-[11px] font-semibold text-charcoal-400 line-through whitespace-nowrap">
                    {formatRupiah(originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
            }}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary-600 bg-white text-primary-600 shadow-sm transition-all hover:bg-primary-600 hover:text-white hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
            aria-label={`Tambah ${product.name} ke keranjang`}
            title="Tambah ke keranjang"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </article>
  )
}

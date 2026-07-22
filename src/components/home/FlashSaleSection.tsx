import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Zap, ChevronRight } from 'lucide-react'
import { useProducts } from '../../hooks/useProducts'
import { type Product } from '../../store/useCartStore'
import { formatRupiah } from '../../utils/formatCurrency'
import { getProductOriginalPrice, getProductDiscountPercentage } from '../../utils/productPricing'
import { getFlashSaleSession, rotateFlashSaleProducts, calculateFlashSaleStock } from '../../utils/flashSale'

export const FlashSaleSection: React.FC = () => {
  const { data: products, isLoading } = useProducts()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const session = useMemo(() => getFlashSaleSession(3, now), [now])

  const flashSalePool = useMemo(() => {
    const valid = (products || []).filter((p) => p.is_live !== false && p.base_price > 0)
    if (valid.length > 0) return valid
    return (products || []).filter((p) => p.base_price > 0)
  }, [products])

  const activeProducts = useMemo(() => {
    return rotateFlashSaleProducts(flashSalePool, session.sessionKey, 6)
  }, [flashSalePool, session.sessionKey])

  if (isLoading || activeProducts.length === 0) return null

  return (
    <div className="bg-white border border-charcoal-100 p-4 sm:p-5 space-y-4 rounded-none font-sans">
      {/* Kembang Seladang Brand Pink Minimalist Header */}
      <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1 text-pink-600 font-black italic text-lg sm:text-xl tracking-tight">
            <Zap className="w-5 h-5 fill-current text-pink-600" />
            <span>FLASH SALE</span>
          </div>

          {/* Black Timer Blocks */}
          <div className="flex items-center gap-1 font-mono font-bold text-xs">
            <span className="bg-charcoal-900 text-white px-1.5 py-0.5 rounded-none">
              {String(session.hours).padStart(2, '0')}
            </span>
            <span className="text-charcoal-900 font-black">:</span>
            <span className="bg-charcoal-900 text-white px-1.5 py-0.5 rounded-none">
              {String(session.minutes).padStart(2, '0')}
            </span>
            <span className="text-charcoal-900 font-black">:</span>
            <span className="bg-charcoal-900 text-white px-1.5 py-0.5 rounded-none">
              {String(session.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        <Link
          to="/products"
          className="text-pink-600 hover:text-pink-700 font-semibold text-xs flex items-center gap-0.5 transition-colors"
        >
          <span>Lihat Semua</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Shopee-style Grid of Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {activeProducts.map((product: Product) => {
          const stockInfo = calculateFlashSaleStock(
            product.id,
            session.sessionKey,
            5,
            product.sold_count,
            (product as any).stock_qty,
            product.unit || 'buket'
          )
          const originalPrice = getProductOriginalPrice(product)
          const discountPercentage = getProductDiscountPercentage(product) || 25

          return (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group bg-white border border-transparent hover:border-pink-200 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="relative aspect-square w-full bg-cream-50 overflow-hidden rounded-none mb-2">
                <img
                  src={product.image || 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=600'}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Brand Pink Discount Badge */}
                <div className="absolute right-0 top-0 bg-pink-600 text-white px-1.5 py-0.5 text-[10px] font-extrabold rounded-none z-10 leading-none shadow-xs">
                  -{discountPercentage}%
                </div>
              </div>

              <div className="space-y-1.5 p-1 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="line-clamp-1 text-xs font-semibold text-charcoal-900 group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex flex-wrap items-baseline gap-1 mt-1">
                    <span className="text-sm font-bold text-pink-600 whitespace-nowrap">
                      {formatRupiah(product.base_price)}
                    </span>
                    {originalPrice && (
                      <span className="text-[10px] text-charcoal-400 line-through whitespace-nowrap">
                        {formatRupiah(originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Brand Dark Pink Scarcity Progress Bar */}
                <div className="pt-1">
                  <div className="w-full h-3.5 bg-pink-50 rounded-full overflow-hidden relative flex items-center justify-center border border-pink-100">
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-700 rounded-full"
                      style={{ width: `${stockInfo.soldPercent}%` }}
                    />
                    <span className="relative z-10 text-[9px] font-extrabold text-white uppercase tracking-wider drop-shadow-xs">
                      {stockInfo.statusText}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

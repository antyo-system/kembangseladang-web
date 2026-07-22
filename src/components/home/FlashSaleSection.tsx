import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Clock, ShoppingBag } from 'lucide-react'
import { useProducts } from '../../hooks/useProducts'
import { useCartStore, type Product } from '../../store/useCartStore'
import { formatRupiah } from '../../utils/formatCurrency'
import { getProductOriginalPrice, getProductDiscountPercentage } from '../../utils/productPricing'
import { getFlashSaleSession, rotateFlashSaleProducts, calculateFlashSaleStock } from '../../utils/flashSale'

export const FlashSaleSection: React.FC = () => {
  const { data: products, isLoading } = useProducts()
  const addItem = useCartStore((state) => state.addItem)

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 rounded-[2rem] p-5 sm:p-7 text-white shadow-xl space-y-5 border border-red-500/30 relative overflow-hidden">
        {/* Background glow & subtle pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-red-900 flex items-center justify-center font-black shadow-lg animate-pulse">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-wider text-white drop-shadow-sm">
                  FLASH SALE
                </h2>
                <span className="text-[10px] font-black px-2.5 py-0.5 bg-yellow-400 text-red-950 rounded-full uppercase tracking-wider shadow-xs">
                  LIVE
                </span>
              </div>
              <p className="text-xs text-rose-100 mt-0.5">
                Diskon terbesar berputar otomatis setiap 3 jam. Stok sangat terbatas!
              </p>
            </div>
          </div>

          {/* Real-time Countdown Timer */}
          <div className="flex items-center gap-2.5 bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 self-start sm:self-auto shadow-inner">
            <Clock className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs font-semibold text-rose-100 hidden sm:inline">Berakhir Dalam:</span>
            <div className="flex items-center gap-1 font-mono font-extrabold text-sm sm:text-base text-yellow-300">
              <span className="bg-charcoal-900 text-yellow-300 px-2 py-0.5 rounded-lg border border-white/10">
                {String(session.hours).padStart(2, '0')}
              </span>
              <span className="font-bold">:</span>
              <span className="bg-charcoal-900 text-yellow-300 px-2 py-0.5 rounded-lg border border-white/10">
                {String(session.minutes).padStart(2, '0')}
              </span>
              <span className="font-bold">:</span>
              <span className="bg-charcoal-900 text-yellow-300 px-2 py-0.5 rounded-lg border border-white/10">
                {String(session.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Shopee-Style Grid / Carousel */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {activeProducts.map((product: Product) => {
            const stockInfo = calculateFlashSaleStock(product.id, session.sessionKey, 5, product.sold_count)
            const originalPrice = getProductOriginalPrice(product)
            const discountPercentage = getProductDiscountPercentage(product) || 25

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl p-2.5 text-charcoal-900 flex flex-col justify-between shadow-lg relative transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border border-white/40"
              >
                {/* Shopee-Style Yellow Flag Badge */}
                <div className="absolute right-0 top-0 bg-[#ffd124] text-[#ee4d2d] px-2 py-1 text-[11px] font-extrabold rounded-bl-lg rounded-tr-2xl z-10 shadow-sm leading-none">
                  -{discountPercentage}%
                </div>

                <Link to={`/products/${product.id}`} className="block relative aspect-square w-full rounded-xl overflow-hidden bg-cream-50 mb-2">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=600'}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>

                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="line-clamp-1 text-xs font-bold text-charcoal-900 group-hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex flex-wrap items-baseline gap-1 mt-1">
                      <span className="text-sm font-black text-primary-600 whitespace-nowrap">
                        {formatRupiah(product.base_price)}
                      </span>
                      {originalPrice && (
                        <span className="text-[10px] text-charcoal-400 line-through whitespace-nowrap">
                          {formatRupiah(originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Shopee-Style Scarcity Progress Bar */}
                  <div className="pt-1">
                    <div className="w-full h-4 bg-red-100 rounded-full overflow-hidden relative flex items-center justify-center shadow-inner">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${stockInfo.soldPercent}%` }}
                      />
                      <span className="relative z-10 text-[9px] font-black text-white uppercase tracking-wider drop-shadow-md flex items-center gap-1">
                        {stockInfo.statusText}
                      </span>
                    </div>
                  </div>

                  {/* Quick Cart Button */}
                  <button
                    onClick={() => addItem(product)}
                    className="w-full mt-1 py-1.5 px-2 bg-charcoal-900 hover:bg-primary-600 text-white rounded-xl text-[11px] font-bold transition-colors flex items-center justify-center gap-1 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>+ Keranjang</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

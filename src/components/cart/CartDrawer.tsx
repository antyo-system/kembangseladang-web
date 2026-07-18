import React from 'react'
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCartStore } from '../../store/useCartStore'
import { formatRupiah } from '../../utils/formatCurrency'
import { buildCartMessage, buildWhatsAppUrl } from '../../utils/whatsapp'
import { Button } from '../ui/Button'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore()

  const handleCheckout = () => {
    const message = buildCartMessage(items)
    const url = buildWhatsAppUrl(message)
    window.open(url, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal-900 z-50 cursor-pointer"
          />

          {/* Cart panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-cream-50 z-50 shadow-2xl flex flex-col border-l border-primary-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-primary-100/60 flex justify-between items-center bg-white">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="w-5 h-5 text-primary-600" />
                <h2 className="font-display text-lg font-bold text-charcoal-900">
                  Keranjang Belanja
                </h2>
                <span className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {getTotalItems()} Item
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-primary-50 rounded-lg text-charcoal-500 hover:text-primary-600 transition-colors cursor-pointer"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
                  <div className="p-5 bg-primary-50/50 text-primary-500 rounded-full">
                    <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold text-charcoal-800">
                      Keranjang Anda kosong
                    </p>
                    <p className="text-xs text-charcoal-400 max-w-[240px] mt-1">
                      Lihat katalog produk kami dan tambahkan rangkaian bunga impian Anda.
                    </p>
                  </div>
                  <Button variant="primary" size="sm" onClick={onClose} className="mt-2">
                    Mulai Belanja
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex bg-white p-4 rounded-2xl border border-primary-100/50 shadow-sm space-x-4 items-start"
                  >
                    {/* Placeholder image (using Unsplash floral patterns) */}
                    <div className="w-18 h-18 bg-cream-100 rounded-xl overflow-hidden shrink-0 border border-primary-50 flex items-center justify-center">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xl">🌸</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-sm text-charcoal-900 truncate pr-2">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-charcoal-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                          aria-label="Hapus item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-charcoal-400 mt-0.5">
                        {item.product.flower_type ? `${item.product.flower_type} • ` : ''}
                        {item.product.color || ''}
                      </p>
                      
                      <div className="flex justify-between items-center mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 border border-primary-100/80 rounded-lg p-0.5 bg-cream-50/50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-white text-charcoal-500 rounded transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-semibold px-2 text-charcoal-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-white text-charcoal-500 rounded transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        {/* Price */}
                        <span className="font-semibold text-sm text-primary-700">
                          {formatRupiah(item.product.base_price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary / Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-primary-100/60 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-charcoal-500">Subtotal</span>
                  <span className="font-display text-lg font-bold text-primary-700">
                    {formatRupiah(getTotalPrice())}
                  </span>
                </div>
                <p className="text-[11px] text-charcoal-400 text-balance leading-normal">
                  *Belum termasuk ongkir. Pesanan Anda akan dikonfirmasi langsung oleh florist melalui WhatsApp sebelum pengiriman.
                </p>
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleCheckout}
                  className="shadow-lg shadow-primary-500/15"
                >
                  Pesan via WhatsApp
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

import type { CartItem } from '../store/useCartStore'
import { formatRupiah } from './formatCurrency'

const WHATSAPP_NUMBER = '6287772636627' // Priska

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function buildCartMessage(items: CartItem[]): string {
  const lines = items.map((item, i) => 
    `${i + 1}. *${item.product.name}* x${item.quantity} — ${formatRupiah(item.product.base_price * item.quantity)}`
  )
  
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.base_price * item.quantity, 
    0
  )
  
  return `Halo Kak Priska 🌸\nSaya mau order dari kembangseladang.com:\n\n${lines.join('\n')}\n\n*Total Belanja:* ${formatRupiah(subtotal)}\n\n*Format Penerima:*\nNama:\nNo. WhatsApp:\nAlamat Pengiriman:\nTanggal & Jam Kirim:\nCatatan:\n\nTerima kasih! 🌺`
}

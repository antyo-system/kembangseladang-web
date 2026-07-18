import React from 'react'
import { Phone } from 'lucide-react'

export const WhatsAppFAB: React.FC = () => {
  return (
    <a
      href="https://wa.me/6287772636627?text=Halo%20Kak%20Priska%20%F0%9F%8C%B8%20Saya%20tertarik%20dengan%20koleksi%20bunga%20di%20Kembang%20Seladang."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-30 group flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 sm:p-4 rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/35 transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer"
      aria-label="Hubungi kami di WhatsApp"
    >
      {/* Tooltip text */}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap text-xs font-semibold tracking-wide pr-0 group-hover:pr-1 select-none">
        Tanya Florist (Priska)
      </span>
      <Phone className="w-6 h-6 fill-white" />
    </a>
  )
}

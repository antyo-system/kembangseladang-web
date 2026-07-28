import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

export interface FAQItem {
  question: string
  answer: string
}

export const HOMEPAGE_FAQS: FAQItem[] = [
  {
    question: 'Apakah Kembang Seladang menyediakan pengiriman bunga sameday / 1 jam sampai di Bintaro & Tangsel?',
    answer: 'Ya! Kembang Seladang menyediakan layanan pengiriman kilat sameday dan 1 jam sampai untuk wilayah Rempoa, Ciputat, Bintaro Jaya (Sektor 1-9), Serpong BSD, hingga Jakarta Selatan dengan garansi kesegaran bunga tetap terjaga.'
  },
  {
    question: 'Berapa lama bunga mawar segar potong bisa bertahan mekar di rumah?',
    answer: 'Bunga mawar segar Kembang Seladang dipotong langsung dari petani setiap hari dan dapat bertahan mekar indah hingga 7–14 hari jika dirawat dalam vas berisi air dingin dan dipotong miring ujung batangnya secara berkala.'
  },
  {
    question: 'Apakah bisa pesan buket bunga custom sesuai budget?',
    answer: 'Tentu saja! Anda bisa memesan buket bunga mawar custom, pilihan warna kertas wrapping Korean style, jumlah tangkai, maupun kombinasi jenis bunga sesuai budget dan momen spesial Anda via WhatsApp 0877-7263-6627.'
  },
  {
    question: 'Di mana lokasi toko fisik Kembang Seladang Florist?',
    answer: 'Toko fisik Kembang Seladang berlokasi strategis di Jl. Kepodang No.68, Rempoa, Ciputat Timur, Kota Tangerang Selatan (Dekat Bintaro & Jakarta Selatan). Buka setiap hari pukul 07.00 - 21.00 WIB.'
  },
  {
    question: 'Apakah setiap pemesanan buket bunga sudah termasuk kartu ucapan (greeting card)?',
    answer: 'Ya, setiap pemesanan buket bunga, bunga meja, maupun standing flower di Kembang Seladang sudah termasuk kartu ucapan custom (printed greeting card) secara gratis.'
  }
]

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section className="bg-white border border-charcoal-100 p-6 sm:p-8 space-y-6" aria-labelledby="faq-title">
      <div className="space-y-2 border-b border-charcoal-100 pb-4">
        <div className="flex items-center gap-2 text-primary-600 font-bold text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Pertanyaan Sering Diajukan</span>
        </div>
        <h2 id="faq-title" className="font-display text-xl sm:text-2xl font-bold text-charcoal-900">
          Tanya Jawab seputar Layanan Florist & Pengiriman Bunga
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Informasi lengkap seputar pemesanan buket bunga segar, area pengiriman, dan perawatan bunga di Kembang Seladang.
        </p>
      </div>

      <div className="space-y-3">
        {HOMEPAGE_FAQS.map((faq, index) => {
          const isOpen = openIndex === index

          return (
            <div
              key={index}
              className="border border-charcoal-100 bg-cream-50/50 transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between p-4 text-left font-semibold text-charcoal-900 transition-colors hover:text-primary-600 focus:outline-none"
              >
                <span className="text-sm leading-snug pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-charcoal-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-primary-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-charcoal-100 bg-white p-4 text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

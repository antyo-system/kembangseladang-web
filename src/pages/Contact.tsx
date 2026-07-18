import React, { useState } from 'react'
import { Phone, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { buildWhatsAppUrl } from '../utils/whatsapp'

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Konsultasi Bunga',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construct custom form submission message
    const waMessage = `Halo Kak Priska 🌸\nSaya mengirim pesan dari kontak website kembangseladang.com:\n\n*Nama:* ${formData.name}\n*No. WA:* ${formData.phone}\n*Perihal:* ${formData.subject}\n*Pesan:* ${formData.message}\n\nTerima kasih! 🌺`
    
    const url = buildWhatsAppUrl(waMessage)
    window.open(url, '_blank')
  }

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Intro */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-charcoal-900">
          Hubungi Kami
        </h1>
        <p className="text-sm text-charcoal-500 text-balance leading-relaxed">
          Punya pertanyaan seputar ketersediaan jenis mawar khusus, pemesanan bunga dalam jumlah banyak, atau ingin menanyakan status rute? Chat kami sekarang.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-primary-100/40 shadow-sm flex items-start space-x-4">
            <div className="p-3 bg-primary-50 text-primary-600 rounded-xl shrink-0">
              <Phone className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">WhatsApp Florist</p>
              <a
                href="https://wa.me/6287772636627"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-charcoal-800 hover:text-primary-600 transition-colors"
              >
                0877-7263-6627 (Priska)
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-primary-100/40 shadow-sm flex items-start space-x-4">
            <div className="p-3 bg-primary-50 text-primary-600 rounded-xl shrink-0">
              <MapPin className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">Alamat Toko</p>
              <p className="text-sm font-semibold text-charcoal-800 leading-normal text-balance">
                Bintaro Sektor 9, Tangerang Selatan, Banten
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-primary-100/40 shadow-sm flex items-start space-x-4">
            <div className="p-3 bg-primary-50 text-primary-600 rounded-xl shrink-0">
              <Clock className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">Waktu Operasional</p>
              <p className="text-sm font-semibold text-charcoal-800">
                Setiap Hari: 07.00 - 21.00 WIB
              </p>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-[2rem] border border-primary-100/40 shadow-sm space-y-6"
          >
            <h2 className="font-display text-xl font-bold text-charcoal-900 mb-4">
              Kirim Pesan Cepat
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
                  Nama Lengkap
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-cream-50/50 px-4 py-3 rounded-xl text-sm border-2 border-transparent focus:border-primary-100 focus:bg-white focus:outline-none transition-all"
                  placeholder="Isi nama Anda"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
                  Nomor WhatsApp
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-cream-50/50 px-4 py-3 rounded-xl text-sm border-2 border-transparent focus:border-primary-100 focus:bg-white focus:outline-none transition-all"
                  placeholder="Contoh: 081234567890"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="subject" className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
                Perihal
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-cream-50/50 px-4 py-3 rounded-xl text-sm border-2 border-transparent focus:border-primary-100 focus:bg-white focus:outline-none transition-all cursor-pointer"
              >
                <option value="Konsultasi Bunga">Konsultasi Rangkaian Bunga</option>
                <option value="Custom Order">Pesan Custom Rangkaian</option>
                <option value="Status Kiriman">Tanya Pengiriman / Rute</option>
                <option value="Lainnya">Pertanyaan Lainnya</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
                Isi Pesan
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-cream-50/50 px-4 py-3 rounded-xl text-sm border-2 border-transparent focus:border-primary-100 focus:bg-white focus:outline-none transition-all resize-none"
                placeholder="Tuliskan detail pertanyaan atau pesanan Anda di sini..."
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-lg shadow-primary-500/10"
            >
              <Send className="w-4 h-4 mr-2" />
              <span>Kirim via WhatsApp</span>
            </Button>
          </form>
        </div>

      </div>

    </div>
  )
}

import React from 'react'
import { Sparkles, Calendar, Heart, ShieldCheck } from 'lucide-react'

export const About: React.FC = () => {
  return (
    <div className="pt-28 pb-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Intro Banner */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center lg:text-left">
          <span className="text-xs font-semibold text-gold-500 tracking-wider uppercase">Cerita Kami</span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-charcoal-900 leading-tight">
            Tentang Kembang Seladang
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed text-balance">
            Kembang Seladang didirikan atas dasar kecintaan kami terhadap keindahan alami kelopak bunga segar. Bermula dari hobi merangkai bunga hias sederhana, kini kami dipercaya sebagai florist lokal andalan masyarakat Tangerang Selatan untuk aneka keperluan hand bouquet, ucapan wisuda, duka cita, pembukaan cabang usaha baru, hingga dekorasi pernikahan intim.
          </p>
        </div>
        <div className="aspect-[4/3] rounded-[2rem] overflow-hidden border border-primary-100 shadow-xl select-none">
          <img
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"
            alt="Florist tools and roses workspace"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-900">Nilai Inti Kami</h2>
          <p className="text-xs sm:text-sm text-charcoal-500 max-w-sm mx-auto">
            Komitmen kami untuk memberikan kualitas produk dan layanan florist terbaik kepada Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-primary-100/40 text-center space-y-3">
            <div className="p-3 bg-primary-50 text-primary-600 rounded-xl inline-block">
              <Sparkles className="w-5.5 h-5.5" />
            </div>
            <h3 className="font-display text-base font-bold text-charcoal-900">Kualitas Bunga Segar</h3>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              Semua bunga dipetik segar setiap hari langsung dari perkebunan bunga terpercaya.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-primary-100/40 text-center space-y-3">
            <div className="p-3 bg-primary-50 text-primary-600 rounded-xl inline-block">
              <Heart className="w-5.5 h-5.5" />
            </div>
            <h3 className="font-display text-base font-bold text-charcoal-900">Dirangkai Dengan Hati</h3>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              Setiap kelopak bunga diposisikan secara mendetail demi keindahan harmonis buket.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-primary-100/40 text-center space-y-3">
            <div className="p-3 bg-primary-50 text-primary-600 rounded-xl inline-block">
              <Calendar className="w-5.5 h-5.5" />
            </div>
            <h3 className="font-display text-base font-bold text-charcoal-900">Tepat Waktu</h3>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              Penjadwalan matang memastikan buket bunga sampai tepat di waktu momen perayaan Anda.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-primary-100/40 text-center space-y-3">
            <div className="p-3 bg-primary-50 text-primary-600 rounded-xl inline-block">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <h3 className="font-display text-base font-bold text-charcoal-900">Layanan Garansi</h3>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              Kami mengirimkan foto rangkaian buket sebelum diantar kurir ke lokasi Anda.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}

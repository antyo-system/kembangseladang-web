import React, { useEffect } from 'react'
import { RefreshCw, ShieldCheck, Truck, Clock, PhoneCall, CheckCircle2, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { updateSEOMetadata, getFloristLocalBusinessSchema } from '../utils/seo'

export const ReturnPolicy: React.FC = () => {
  useEffect(() => {
    updateSEOMetadata({
      title: 'Kebijakan Pengembalian & Garansi Retur (Return Policy) | Kembang Seladang',
      description: 'Garansi kepuasan pelanggan Kembang Seladang. Kebijakan pengembalian produk (retur), penukaran (exchange), dan pengembalian dana (refund) yang jelas, transparan, dan bersahabat.',
      jsonLd: {
        ...getFloristLocalBusinessSchema(),
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          'applicableCountry': 'ID',
          'returnPolicyCategory': 'https://schema.org/MerchantReturnFiniteReturnWindow',
          'merchantReturnDays': 7,
          'returnMethod': 'https://schema.org/ReturnByMail',
          'returnFees': 'https://schema.org/FreeReturn',
          'refundType': 'https://schema.org/FullRefund',
          'merchantReturnLink': 'https://kembangseladang.com/return-policy'
        }
      }
    })
  }, [])

  return (
    <div className="bg-cream-50/30 py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center text-xs font-semibold text-charcoal-500 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-900 via-charcoal-900 to-charcoal-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-500/20 text-primary-300 text-xs font-bold uppercase tracking-wider rounded-full border border-primary-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Google Merchant Verified Policy
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Kebijakan Pengembalian & Penukaran (Return Policy)
            </h1>
            <p className="text-charcoal-300 text-sm sm:text-base leading-relaxed">
              Di <strong className="text-white">Kembang Seladang</strong>, kepuasan dan senyum Anda adalah prioritas utama kami. Kami memberikan garansi pengembalian, penggantian, dan penukaran produk dengan proses yang cepat, transparan, dan ramah.
            </p>
          </div>
        </div>

        {/* Key Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-primary-100/60 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-primary-50 text-primary-600 rounded-xl w-fit">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-charcoal-900">
                Terima Retur & Penukaran
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Kami menerima pengembalian (retur) dan penukaran (exchange) baik untuk produk cacat/rusak akibat pengiriman maupun penukaran varian.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-charcoal-100 flex items-center text-[11px] font-semibold text-primary-700">
              <CheckCircle2 className="w-4 h-4 mr-1.5 shrink-0" />
              Accepts Defective & Non-Defective
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-primary-100/60 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-primary-50 text-primary-600 rounded-xl w-fit">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-charcoal-900">
                Jangka Waktu Retur
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                <strong>Bunga Segar:</strong> Laporan 24 jam sejak diterima.<br />
                <strong>Artificial / Aksesoris:</strong> Hingga 7 hari kalender.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-charcoal-100 flex items-center text-[11px] font-semibold text-primary-700">
              <CheckCircle2 className="w-4 h-4 mr-1.5 shrink-0" />
              Return Window 24h / 7 Days
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-primary-100/60 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-primary-50 text-primary-600 rounded-xl w-fit">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-charcoal-900">
                Bebas Biaya Kirim Retur
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Jika terjadi kerusakan atau kesalahan dari florist kami, biaya pengiriman ulang ditanggung 100% oleh Kembang Seladang.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-charcoal-100 flex items-center text-[11px] font-semibold text-primary-700">
              <CheckCircle2 className="w-4 h-4 mr-1.5 shrink-0" />
              Free Return on Defective
            </div>
          </div>
        </div>

        {/* Detailed Terms */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-primary-100/60 shadow-sm space-y-8">
          
          <div>
            <h2 className="font-display text-2xl font-bold text-charcoal-900 border-b border-charcoal-100 pb-3">
              Syarat & Ketentuan Pengembalian (Return Policy Details)
            </h2>
          </div>

          {/* Section 1: Perishable vs Non-Perishable */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-base text-primary-700 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-800 text-xs font-bold">1</span>
              Kategori Produk & Batas Waktu Retur
            </h3>
            <div className="pl-8 text-sm text-charcoal-600 space-y-3 leading-relaxed">
              <div className="p-4 bg-cream-50 rounded-xl border border-cream-200/60">
                <h4 className="font-bold text-charcoal-900 text-sm">🌹 Rangkaian Bunga Segar (Fresh Flowers)</h4>
                <p className="text-xs text-charcoal-600 mt-1">
                  Bunga segar merupakan produk alami berdaya tahan terbatas. Jika bunga diterima dalam keadaan rusak parah, patah, atau layu akibat kendala kurir, mohon informasikan kepada kami dalam waktu <strong className="text-charcoal-900">24 jam setelah pesanan diterima</strong> beserta foto/video pendukung. Kami akan merangkai kembali dan mengirimkan buket baru di hari yang sama.
                </p>
              </div>

              <div className="p-4 bg-cream-50 rounded-xl border border-cream-200/60">
                <h4 className="font-bold text-charcoal-900 text-sm">💐 Bunga Artificial, Vas, & Aksesoris Non-Bunga</h4>
                <p className="text-xs text-charcoal-600 mt-1">
                  Untuk produk non-segar seperti bunga artificial, vas bunga, standing frame, dan aksesoris hampers, pengembalian atau penukaran dapat diajukan hingga <strong className="text-charcoal-900">7 (tujuh) hari kalender</strong> sejak barang diterima. Produk harus dalam keadaan baik dan belum dipakai.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Defective vs Non-defective */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-base text-primary-700 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-800 text-xs font-bold">2</span>
              Kondisi Pengembalian (Defective & Non-Defective)
            </h3>
            <div className="pl-8 text-sm text-charcoal-600 space-y-3 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2 text-xs text-charcoal-600">
                <li>
                  <strong className="text-charcoal-900">Produk Cacat / Rusak (Defective):</strong> Apabila buket/standing flower rusak saat sampai, pita terlepas, atau warna mawar tidak sesuai konfirmasi awal.
                </li>
                <li>
                  <strong className="text-charcoal-900">Produk Non-Cacat / Tukar Varian (Non-Defective Exchange):</strong> Apabila pelanggan ingin mengganti jenis pita, warna pembungkus (wrapping), atau menambah ucapan sebelum/setelah penerimaan.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Shipping Fees */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-base text-primary-700 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-800 text-xs font-bold">3</span>
              Ketentuan Biaya Pengiriman (Return Shipping Fees)
            </h3>
            <div className="pl-8 text-sm text-charcoal-600 space-y-3 leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/60">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">Kesalahan Florist / Cacat</span>
                  <p className="text-xs text-emerald-900">
                    Ongkos kirim penjemputan & pengiriman buket pengganti ditanggung <strong>100% GRATIS</strong> oleh Kembang Seladang.
                  </p>
                </div>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/60">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">Penukaran Selera / Non-Cacat</span>
                  <p className="text-xs text-amber-900">
                    Apabila retur/penukaran atas permintaan khusus pembeli, ongkos kirim ditanggung oleh pihak pembeli.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Refund Method */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-base text-primary-700 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-800 text-xs font-bold">4</span>
              Prosedur Pengembalian Dana (Refund Procedure)
            </h3>
            <div className="pl-8 text-sm text-charcoal-600 space-y-3 leading-relaxed">
              <p className="text-xs text-charcoal-600">
                Apabila penggantian barang tidak memungkinkan atau pembeli memilih opsi pengembalian dana (refund):
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-charcoal-600">
                <li>Refund dilakukan secara penuh (full refund) sesuai nominal pembelian.</li>
                <li>Dana ditransfer melalui Bank Transfer (BCA, Mandiri, BRI, BNI) atau E-Wallet (GoPay, OVO, DANA, ShopeePay).</li>
                <li>Waktu pemrosesan refund adalah <strong className="text-charcoal-900">1 hingga 3 hari kerja</strong> setelah klaim disetujui.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* How to Request Return Step-by-Step */}
        <div className="bg-primary-50/60 border border-primary-200/50 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary-600 text-white rounded-xl">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-charcoal-900">
                Cara Mudah Mengajukan Retur / Pengembalian
              </h3>
              <p className="text-xs text-charcoal-600">
                Ikuti 3 langkah mudah berikut untuk klaim garansi:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-primary-100 text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-sm mx-auto flex items-center justify-center">
                1
              </div>
              <h4 className="font-bold text-xs text-charcoal-900">Dokumentasikan</h4>
              <p className="text-[11px] text-charcoal-500 leading-relaxed">
                Foto atau rekam video singkat produk yang ingin diretur saat diterima.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-primary-100 text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-sm mx-auto flex items-center justify-center">
                2
              </div>
              <h4 className="font-bold text-xs text-charcoal-900">Hubungi Florist</h4>
              <p className="text-[11px] text-charcoal-500 leading-relaxed">
                Kirim foto & nama pemesan via WhatsApp Kak Priska di 0877-7263-6627.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-primary-100 text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-sm mx-auto flex items-center justify-center">
                3
              </div>
              <h4 className="font-bold text-xs text-charcoal-900">Solusi Cepat</h4>
              <p className="text-[11px] text-charcoal-500 leading-relaxed">
                Florist kami akan langsung mengirimkan produk baru atau melakukan refund 1-3 hari.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <a
              href="https://wa.me/6287772636627?text=Halo%20Kak%20Priska%20%F0%9F%8C%B8%2C%20saya%20ingin%20mengajukan%20retur%2Fpenukaran%20pesanan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl text-sm transition-all duration-200 shadow-md shadow-primary-600/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Hubungi Customer Support via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Store Location & Contact Info Footer Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-primary-100/60 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 text-xs text-charcoal-600">
            <p className="font-bold text-sm text-charcoal-900">Kembang Seladang Florist & Toko Bunga</p>
            <p>Jl. Kepodang No.68, Rempoa, Kec. Ciputat Tim., Kota Tangerang Selatan, Banten 15412</p>
            <p>WhatsApp: <a href="https://wa.me/6287772636627" target="_blank" rel="noreferrer" className="text-primary-600 font-semibold underline">0877-7263-6627</a> | Jam Operasional: 07.00 - 21.00 WIB</p>
          </div>
          <Link to="/contact">
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              Halaman Kontak
            </Button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default ReturnPolicy

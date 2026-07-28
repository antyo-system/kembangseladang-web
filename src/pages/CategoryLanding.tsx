import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Sparkles, MapPin, Truck, ShieldCheck, HeartHandshake } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { ProductCard } from '../components/product/ProductCard'
import { updateSEOMetadata, getCombinedGraphSchema, getFloristLocalBusinessSchema } from '../utils/seo'
import { FAQSection } from '../components/home/FAQSection'

export interface CategoryLandingConfig {
  slug: string
  h1: string
  metaTitle: string
  metaDescription: string
  heroBadge: string
  subHeading: string
  focusKeywords: string[]
  matchTerms: string[]
  contentSection: {
    headline: string
    paragraphs: string[]
    highlights: string[]
  }
}

export const CATEGORY_LANDING_CONFIGS: Record<string, CategoryLandingConfig> = {
  'buket-bunga-wisuda': {
    slug: 'buket-bunga-wisuda',
    h1: 'Buket Bunga Wisuda Tangerang Selatan & Jakarta Selatan',
    metaTitle: 'Buket Bunga Wisuda Tangerang Selatan & Jaksel | UIN, STAN, UNPAM',
    metaDescription: 'Pesan buket bunga wisuda segar untuk kelulusan UIN Jakarta, STAN Bintaro, UNPAM, & UI. Pengiriman cepat sameday buket mawar wisuda di Kembang Seladang.',
    heroBadge: 'Wisuda & Kelulusan UIN, STAN, UNPAM, UI',
    subHeading: 'Rayakan momen kelulusan sahabat & pasangan tercinta dengan buket bunga mawar segar premium buatan florist ahli.',
    focusKeywords: ['buket wisuda uin', 'buket wisuda stan', 'buket wisuda unpam', 'buket bunga wisuda tangerang selatan'],
    matchTerms: ['wisuda', 'buket', 'mawar', 'bouquet', 'kelulusan'],
    contentSection: {
      headline: 'Layanan Pengiriman Buket Wisuda Cepat Langsung ke Gedung Kampus',
      paragraphs: [
        'Momen kelulusan universitas adalah pencapaian bersejarah yang patut dirayakan dengan hadiah terbaik. Kembang Seladang melayani pengiriman kilat buket bunga wisuda segar langsung ke lokasi auditorium dan gedung sidang di wilayah Tangerang Selatan dan Jakarta Selatan.',
        'Setiap kuntum mawar dirangkai rapi dengan kertas pembungkus Korean Style elegan dan sudah dilengkapi kartu ucapan selamat printed secara gratis.'
      ],
      highlights: [
        'UIN Syarif Hidayatullah Jakarta (Ciputat)',
        'PKN STAN (Bintaro Jaya)',
        'Universitas Pamulang (UNPAM)',
        'Universitas Indonesia (UI Depok)',
        'Binus BSD & Universitas Prasetiya Mulya'
      ]
    }
  },
  'buket-mawar-merah': {
    slug: 'buket-mawar-merah',
    h1: 'Buket Mawar Merah Romantis — Gift Valentine & Anniversary',
    metaTitle: 'Buket Mawar Merah Romantis Valentine & Anniversary | Kembang Seladang',
    metaDescription: 'Beli buket mawar merah segar kualitas premium untuk hadiah romantis anniversary & Valentine. Pengiriman cepat 1 jam sampai Tangsel & Bintaro.',
    heroBadge: 'Cinta Sejati & Romansa Pasangan',
    subHeading: 'Ungkapkan ketulusan cinta sejati dengan buket mawar merah pekat yang harum dan tahan mekar indah hingga 14 hari.',
    focusKeywords: ['buket mawar merah valentine', 'bunga mawar merah anniversary', 'mawar merah romantis', 'hand bouquet mawar merah'],
    matchTerms: ['merah', 'red', 'mawar', 'buket', 'bouquet'],
    contentSection: {
      headline: 'Makna Jumlah Tangkai Mawar Merah untuk Momen Spesial',
      paragraphs: [
        'Bunga mawar merah adalah simbol klasik cinta membara dan apresiasi tertinggi. Kembang Seladang menyediakan variasi tangkai mawar segar freshly picked dari petani lokal.',
        'Dipadu dengan kertas wrapping matte bertali pita satin mewah, buket mawar merah kami dijamin memberikan kejutan romantis yang tak terlupakan bagi pasangan Anda.'
      ],
      highlights: [
        '10 Tangkai Mawar: Simbol ungkapan cinta sempurna',
        '20 Tangkai Mawar: Simbol rasa syukur dan kesetiaan',
        'Garansi Kesegaran Kuntum Bunga H+7',
        'Free Romantic Printed Greeting Card'
      ]
    }
  },
  'papan-bunga-tangerang-selatan': {
    slug: 'papan-bunga-tangerang-selatan',
    h1: 'Karangan Papan Bunga & Standing Flower Tangerang Selatan',
    metaTitle: 'Karangan Papan Bunga & Standing Flower Tangsel | Duka Cita & Wedding',
    metaDescription: 'Sewa & pesan karangan papan bunga duka cita, papan ucapan pernikahan, & standing flower grand opening di Tangerang Selatan. Pengiriman ekspres 3 jam.',
    heroBadge: 'Papan Ucapan Megah & Standing Flower',
    subHeading: 'Wujud penghormatan & simpati paling elegan untuk ucapan pernikahan (Happy Wedding), Duka Cita, dan Grand Opening usaha.',
    focusKeywords: ['papan bunga tangerang selatan', 'papan ucapan duka cita tangsel', 'standing flower wedding', 'karangan bunga ciputat'],
    matchTerms: ['papan', 'standing', 'duka', 'wedding', 'opening', 'karangan'],
    contentSection: {
      headline: 'Pengiriman Kilat Papan Bunga Ucapan 3 Jam Sampai di Tangsel & Jaksel',
      paragraphs: [
        'Menyampaikan ucapan selamat maupun duka cita mendalam membutuhkan ketepatan waktu tinggi. Tim kurir Kembang Seladang siap merangkai dan mengantarkan papan bunga berukuran standar (2m x 1.2m) hingga jumbo langsung ke lokasi acara.',
        'Kami berpengalaman mengantarkan karangan bunga ke seluruh gedung pernikahan dan rumah duka utama di kawasan Tangerang Selatan.'
      ],
      highlights: [
        'Rumah Duka Oasis Lestari & Dharmais',
        'Gedung Resepsi Bintaro Jaya & BSD City',
        'Desain Huruf & Bunga Padat Rapi',
        'Konfirmasi Foto Lokasi Sebelum Kirim'
      ]
    }
  },
  'bunga-meja-vas-kaca': {
    slug: 'bunga-meja-vas-kaca',
    h1: 'Rangkaian Bunga Meja Vas Kaca — Dekorasi Rumah & Kantor',
    metaTitle: 'Rangkaian Bunga Meja Vas Kaca Dekorasi Ruangan & Kantor | Kembang Seladang',
    metaDescription: 'Rangkaian bunga meja vas kaca mewah untuk dekorasi ruang tamu, meja makan, & meja kerja kantor. Bunga segar tahan mekar lama florist Kembang Seladang.',
    heroBadge: 'Dekorasi Meja Tamu & Ruang Kerja',
    subHeading: 'Hadirkan nuansa alam sejuk dan kesan estetik di sudut ruangan Anda dengan rangkaian bunga meja segar vas kaca bening.',
    focusKeywords: ['dekorasi bunga vas ruangan', 'bunga meja kantor', 'bunga vas kaca segar', 'table arrangement florist'],
    matchTerms: ['meja', 'vas', 'vase', 'table', 'rangkaian'],
    contentSection: {
      headline: 'Solusi Hiasan Ruangan Praktis Tanpa Repot Menata Vas',
      paragraphs: [
        'Rangkaian bunga meja vas kaca (Table Arrangement) dirancang khusus agar siap pajang secara instan. Kombinasi mawar segar, lily harum, dan dedaunan hijau eucalyptus menciptakan daya tarik visual yang menyegarkan.',
        'Sangat cocok dijadikan kado syukuran rumah baru (housewarming), hadiah apresiasi atasan kantor, maupun hiasan meja makan keluarga.'
      ],
      highlights: [
        'Vas Kaca Kristal Bening Eksklusif Included',
        'Batang Selalu Terendam Air Segar (Awet 10-14 Hari)',
        'Praktis Langsung Pajang Tanpa Merangkai Ulang',
        'Pengiriman Aman Dilengkapi Water Cushion'
      ]
    }
  }
}

export const CategoryLanding: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const config = slug ? CATEGORY_LANDING_CONFIGS[slug] : null
  const { data: products, isLoading } = useProducts()

  // SEO update on component mount
  React.useEffect(() => {
    if (!config) return

    const canonical = `https://kembangseladang.com/katalog/${config.slug}`
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': config.focusKeywords.map((kw) => ({
        '@type': 'Question',
        'name': `Bagaimana cara pesan ${kw} di Kembang Seladang?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Pemesanan ${kw} sangat praktis! Pilih rangkaian di katalog kami atau hubungi WhatsApp 0877-7263-6627 untuk pengiriman kilat sameday ke Tangerang Selatan.`
        }
      }))
    }

    updateSEOMetadata({
      title: config.metaTitle,
      description: config.metaDescription,
      canonicalUrl: canonical,
      ogType: 'website',
      jsonLd: getCombinedGraphSchema(
        getFloristLocalBusinessSchema(),
        faqSchema
      )
    })
  }, [config])

  if (!config) {
    return <Navigate to="/products" replace />
  }

  const categoryProducts = (products || []).filter((product) => {
    const searchable = [
      product.name,
      product.description,
      product.flower_type,
      product.color,
      product.unit
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return config.matchTerms.some((term) => searchable.includes(term.toLowerCase()))
  })

  // Fallback to all products if filter returns 0
  const displayProducts = categoryProducts.length > 0 ? categoryProducts : (products || [])

  return (
    <div className="pt-8 sm:pt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 bg-white">
      
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-charcoal-600 hover:text-primary-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Semua Katalog</span>
        </Link>
      </div>

      {/* Hero Header Section */}
      <section className="bg-cream-50 border border-primary-100/50 p-6 sm:p-10 rounded-2xl space-y-4 relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-primary-600 fill-primary-600" />
          <span>{config.heroBadge}</span>
        </div>

        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-charcoal-900 leading-tight">
          {config.h1}
        </h1>

        <p className="text-sm sm:text-base text-charcoal-600 max-w-3xl leading-relaxed">
          {config.subHeading}
        </p>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-primary-100">
          <div className="flex items-center space-x-2 text-xs text-charcoal-700 font-semibold">
            <Truck className="w-4 h-4 text-primary-600 shrink-0" />
            <span>Sameday 1 Jam Sampai</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-charcoal-700 font-semibold">
            <ShieldCheck className="w-4 h-4 text-primary-600 shrink-0" />
            <span>Garansi Segar H+7</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-charcoal-700 font-semibold">
            <MapPin className="w-4 h-4 text-primary-600 shrink-0" />
            <span>Area Tangsel & Jaksel</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-charcoal-700 font-semibold">
            <HeartHandshake className="w-4 h-4 text-primary-600 shrink-0" />
            <span>Free Greeting Card</span>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-charcoal-100 pb-3">
          <h2 className="font-display text-lg sm:text-xl font-bold text-charcoal-900">
            Rangkaian Bunga Pilihan ({displayProducts.length})
          </h2>
          <span className="text-xs text-charcoal-500 font-medium">
            Pengiriman langsung dari Florist Rempoa
          </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square skeleton rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Rich SEO Editorial Article Section */}
      <section className="border border-charcoal-100 bg-white p-6 sm:p-8 rounded-2xl space-y-6">
        <h2 className="font-display text-xl font-bold text-charcoal-900">
          {config.contentSection.headline}
        </h2>

        <div className="space-y-4 text-sm text-charcoal-600 leading-relaxed">
          {config.contentSection.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="bg-cream-50 p-4 rounded-xl space-y-2 border border-primary-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-800">
            Keunggulan Layanan Kembang Seladang:
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-charcoal-700">
            {config.contentSection.highlights.map((item, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <span className="text-primary-600 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <FAQSection />

    </div>
  )
}

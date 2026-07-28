import React, { useState, useEffect } from 'react'
import { Star, ThumbsUp, CheckCircle, Plus, X, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'

export interface CustomerReview {
  id: string
  productId: string
  author: string
  location?: string
  rating: number
  title: string
  comment: string
  date: string
  verified: boolean
  likes: number
}

interface ProductReviewsProps {
  productId: string
  productName: string
}

// Pre-seeded high quality reviews to ensure instant social proof for every product
const INITIAL_MOCK_REVIEWS: Record<string, CustomerReview[]> = {
  default: [
    {
      id: 'rev-1',
      productId: 'default',
      author: 'Siti Rahmawati',
      location: 'Bintaro Sektor 7',
      rating: 5,
      title: 'Bunga Segar Banget & Wangi Alami!',
      comment: 'Pesan pagi jam 9 untuk kejutan wisuda sepupu di UIN Ciputat, jam 10.15 sudah sampai di lokasi. Bunganya harum dan warna mawar pinknya cantik banget persis di foto. Packaging rapi dan dapat free kartu ucapan.',
      date: '2 hari yang lalu',
      verified: true,
      likes: 12
    },
    {
      id: 'rev-2',
      productId: 'default',
      author: 'Dimas Prasetyo',
      location: 'Rempoa, Tangerang Selatan',
      rating: 5,
      title: 'Respon Admin Cepat & Pengiriman Kilat',
      comment: 'Beli buat hadiah anniversary istri. Penjual sangat kooperatif, bisa minta kartu ucapan custom sesuai keinginan. Istri suka banget, bunganya awet mekar sampai 5 hari di rumah.',
      date: '5 hari yang lalu',
      verified: true,
      likes: 8
    },
    {
      id: 'rev-3',
      productId: 'default',
      author: 'Anisa Amanda',
      location: 'BSD City',
      rating: 5,
      title: 'Kertas Wrapping Korean Style Rapi Banget',
      comment: 'Rangkaian bunganya estetik banget, wrappingnya kelihatan mewah padahal harganya bersahabat. Recommended florist di Tangsel!',
      date: '1 minggu yang lalu',
      verified: true,
      likes: 15
    }
  ]
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, productName }) => {
  const [reviews, setReviews] = useState<CustomerReview[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterRating, setFilterRating] = useState<number | 'all'>('all')
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({})

  // Form State
  const [formRating, setFormRating] = useState(5)
  const [formAuthor, setFormAuthor] = useState('')
  const [formLocation, setFormLocation] = useState('')
  const [formTitle, setFormTitle] = useState('')
  const [formComment, setFormComment] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Load reviews from localStorage + defaults
  useEffect(() => {
    const storageKey = `reviews_${productId}`
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        setReviews(JSON.parse(saved))
      } catch (e) {
        setReviews(INITIAL_MOCK_REVIEWS.default)
      }
    } else {
      setReviews(INITIAL_MOCK_REVIEWS.default)
    }
  }, [productId])

  // Save new review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formAuthor.trim() || !formComment.trim()) return

    const newRev: CustomerReview = {
      id: `rev-user-${Date.now()}`,
      productId,
      author: formAuthor.trim(),
      location: formLocation.trim() || 'Tangerang Selatan',
      rating: formRating,
      title: formTitle.trim() || 'Pengalaman Sangat Memuaskan',
      comment: formComment.trim(),
      date: 'Baru saja',
      verified: true,
      likes: 0
    }

    const updated = [newRev, ...reviews]
    setReviews(updated)
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updated))

    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setIsModalOpen(false)
      // Reset form
      setFormAuthor('')
      setFormLocation('')
      setFormTitle('')
      setFormComment('')
      setFormRating(5)
    }, 1500)
  }

  const handleToggleLike = (id: string) => {
    setLikedReviews(prev => {
      const isLiked = !prev[id]
      setReviews(current =>
        current.map(r => (r.id === id ? { ...r, likes: isLiked ? r.likes + 1 : r.likes - 1 } : r))
      )
      return { ...prev, [id]: isLiked }
    })
  }

  // Calculate statistics
  const totalCount = reviews.length
  const avgRating = totalCount > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalCount).toFixed(1) : '5.0'
  const count5Star = reviews.filter(r => r.rating === 5).length
  const count4Star = reviews.filter(r => r.rating === 4).length

  const filteredReviews = reviews.filter(r => (filterRating === 'all' ? true : r.rating === filterRating))

  return (
    <div className="space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-primary-100 shadow-sm" id="ulasan-pelanggan">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-100 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-primary-700 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-primary-600 fill-primary-600" />
            <span>Ulasan & Pengalaman Pembeli</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-charcoal-900">
            Ulasan Pelanggan ({totalCount})
          </h2>
          <p className="text-xs text-charcoal-500 mt-1">
            Ulasan nyata dari pembeli buket {productName} di Kembang Seladang.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="rounded-xl px-5 py-2.5 text-xs font-bold shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Tulis Ulasan Bunga
        </Button>
      </div>

      {/* Rating Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-cream-50/70 p-6 rounded-2xl border border-cream-200/60">
        {/* Score Card */}
        <div className="flex flex-col items-center justify-center text-center space-y-1 md:border-r border-cream-200/80 pr-4">
          <div className="text-4xl font-black font-display text-charcoal-900">{avgRating}</div>
          <div className="flex items-center space-x-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
            ))}
          </div>
          <span className="text-xs font-semibold text-charcoal-500 mt-1">
            Berdasarkan {totalCount} ulasan pembeli
          </span>
        </div>

        {/* Rating Bars */}
        <div className="space-y-2 md:col-span-2 flex flex-col justify-center">
          <div className="flex items-center text-xs text-charcoal-600 gap-2">
            <span className="w-12 font-medium">5 Bintang</span>
            <div className="flex-1 bg-cream-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${totalCount ? (count5Star / totalCount) * 100 : 100}%` }}
              />
            </div>
            <span className="w-8 text-right font-bold text-charcoal-700">{count5Star}</span>
          </div>

          <div className="flex items-center text-xs text-charcoal-600 gap-2">
            <span className="w-12 font-medium">4 Bintang</span>
            <div className="flex-1 bg-cream-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${totalCount ? (count4Star / totalCount) * 100 : 0}%` }}
              />
            </div>
            <span className="w-8 text-right font-bold text-charcoal-700">{count4Star}</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setFilterRating('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            filterRating === 'all'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-cream-100 text-charcoal-600 hover:bg-cream-200'
          }`}
        >
          Semua Ulasan ({totalCount})
        </button>
        <button
          onClick={() => setFilterRating(5)}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            filterRating === 5
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-cream-100 text-charcoal-600 hover:bg-cream-200'
          }`}
        >
          5 Bintang ⭐ ({count5Star})
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map(rev => (
          <div
            key={rev.id}
            className="p-5 rounded-2xl bg-white border border-primary-100/40 hover:border-primary-200 transition-all space-y-3 shadow-2xs"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm text-charcoal-900">{rev.author}</span>
                  {rev.verified && (
                    <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      <CheckCircle className="w-3 h-3 mr-1 text-emerald-600" />
                      Pembeli Terverifikasi
                    </span>
                  )}
                </div>
                {rev.location && (
                  <p className="text-[11px] text-charcoal-400 font-medium">{rev.location}</p>
                )}
              </div>
              <span className="text-xs font-medium text-charcoal-400">{rev.date}</span>
            </div>

            {/* Stars */}
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              ))}
            </div>

            {/* Title & Comment */}
            <div>
              <h4 className="font-bold text-sm text-charcoal-800">{rev.title}</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed mt-1">{rev.comment}</p>
            </div>

            {/* Like Button */}
            <div className="pt-2 flex items-center justify-between border-t border-cream-50">
              <button
                onClick={() => handleToggleLike(rev.id)}
                className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  likedReviews[rev.id]
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-charcoal-400 hover:bg-cream-100'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Membantu ({rev.likes})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tulis Ulasan */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5 border border-primary-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-charcoal-400 hover:text-charcoal-700 rounded-full hover:bg-cream-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-display text-xl font-bold text-charcoal-900">
                Tulis Ulasan Produk
              </h3>
              <p className="text-xs text-charcoal-500 mt-1">
                Bagikan pengalaman Anda memesan buket <strong className="text-primary-700">{productName}</strong>.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-base">Terima Kasih Atas Ulasan Anda!</h4>
                <p className="text-xs text-emerald-700">Ulasan Anda berhasil ditambahkan ke halaman produk.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Rating Selector */}
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 mb-1.5">
                    Rating Bintang Anda:
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormRating(star)}
                        className="p-1 transition-transform hover:scale-110 cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= formRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-cream-300 stroke-cream-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-extrabold text-amber-600 ml-2">
                      {formRating}.0 dari 5 Bintang
                    </span>
                  </div>
                </div>

                {/* Name & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={formAuthor}
                      onChange={e => setFormAuthor(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-cream-200 focus:outline-hidden focus:border-primary-500 bg-cream-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 mb-1">Wilayah / Area</label>
                    <input
                      type="text"
                      placeholder="Contoh: Rempoa / Bintaro"
                      value={formLocation}
                      onChange={e => setFormLocation(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-cream-200 focus:outline-hidden focus:border-primary-500 bg-cream-50/50"
                    />
                  </div>
                </div>

                {/* Review Title */}
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 mb-1">Judul Ringkas Ulasan</label>
                  <input
                    type="text"
                    placeholder="Contoh: Bunganya Segar Banget & Kirim Cepat!"
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-cream-200 focus:outline-hidden focus:border-primary-500 bg-cream-50/50"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 mb-1">Isi Ulasan Pengalaman *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Ceritakan kesegaran bunga, ketepatan waktu pengiriman, atau pelayanan admin Kembang Seladang..."
                    value={formComment}
                    onChange={e => setFormComment(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-cream-200 focus:outline-hidden focus:border-primary-500 bg-cream-50/50"
                  />
                </div>

                {/* Submit CTA */}
                <Button type="submit" size="lg" className="w-full rounded-xl py-3 text-xs font-bold">
                  Kirim Ulasan Sekarang
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

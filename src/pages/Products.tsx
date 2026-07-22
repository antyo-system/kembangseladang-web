import React, { useState, useMemo } from 'react'
import { PanelLeftClose, PanelLeftOpen, Search, SlidersHorizontal } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { ProductCard } from '../components/product/ProductCard'
import { PromoBanner } from '../components/promo/PromoBanner'
import { FlashSaleSection } from '../components/home/FlashSaleSection'

const CATEGORY_SLIDES = [
  {
    value: 'bunga-potong-segar',
    label: 'Bunga Potong Segar',
    description: 'Tangkai fresh untuk custom dan dekorasi.',
    image: '/images/categories/bunga-potong-segar.jpg',
    terms: [
      'bunga potong',
      'bunga segar',
      'fresh',
      'tangkai',
      'stem',
      'petani',
      'mawar',
      'rose',
      'lily',
      'tulip',
      'matahari',
      'sunflower',
      'hortensia',
      'hydrangea',
    ],
  },
  {
    value: 'buket-bunga',
    label: 'Buket Bunga',
    description: 'Hadiah cantik untuk momen spesial.',
    image: '/images/categories/buket-bunga.jpg',
    terms: ['buket', 'bouquet', 'hand bouquet', 'bunga tangan'],
  },
  {
    value: 'rangkaian-meja',
    label: 'Rangkaian Meja',
    description: 'Sentuhan elegan untuk meja dan ruangan.',
    image: '/images/categories/rangkaian-meja.jpg',
    terms: ['rangkaian meja', 'table', 'centerpiece', 'meja', 'vas', 'vase', 'bloom box'],
  },
  {
    value: 'standing-flower',
    label: 'Standing Flower',
    description: 'Ucapan besar untuk acara dan peresmian.',
    image: '/images/categories/standing-flower.jpg',
    terms: ['standing', 'standing flower', 'papan bunga', 'grand opening', 'duka cita', 'congratulations'],
  },
]

const FILTER_COLORS = [
  {
    value: 'pinksweet',
    label: 'Pinksweet',
    swatch: 'linear-gradient(135deg, #ff5fa8 0%, #ff8fc8 52%, #ffd1e3 100%)',
    terms: ['pinksweet', 'pink sweet', 'pink', 'soft pink'],
  },
  {
    value: 'peach',
    label: 'Peach',
    swatch: 'linear-gradient(135deg, #ff7f5f 0%, #ffac7a 55%, #ffd3bd 100%)',
    terms: ['peach', 'salem', 'persik'],
  },
  {
    value: 'putih',
    label: 'Putih',
    swatch: 'linear-gradient(135deg, #ffffff 0%, #f7f3ff 58%, #d7c9f1 100%)',
    terms: ['putih', 'white'],
  },
  {
    value: 'merah',
    label: 'Merah',
    swatch: 'linear-gradient(135deg, #f04b69 0%, #cc2448 100%)',
    terms: ['merah', 'red'],
  },
  {
    value: 'candy',
    label: 'Candy',
    swatch: 'linear-gradient(135deg, #ff3f6c 0%, #ff7a3d 45%, #ffd43b 100%)',
    terms: ['candy', 'rainbow', 'cerah', 'bright'],
  },
  {
    value: 'ungu',
    label: 'Ungu',
    swatch: 'linear-gradient(135deg, #a78bfa 0%, #6d4fc2 100%)',
    terms: ['ungu', 'purple', 'violet'],
  },
  {
    value: 'orange',
    label: 'Orange',
    swatch: 'linear-gradient(135deg, #ff9a56 0%, #f15a24 100%)',
    terms: ['orange', 'oranye', 'jingga'],
  },
  {
    value: 'kuning',
    label: 'Kuning',
    swatch: 'linear-gradient(135deg, #ffe27a 0%, #e6a817 100%)',
    terms: ['kuning', 'yellow'],
  },
  {
    value: 'bebas-campur',
    label: 'Bebas/Campur',
    swatch: 'conic-gradient(from 45deg, #ff5fa8, #ff9a56, #ffe27a, #8bd7a8, #7aa7ff, #a78bfa, #ff5fa8)',
    terms: ['bebas', 'campur', 'multi', 'mixed', 'mix'],
  },
]

const FLOWER_TYPES = [
  { value: 'rose', label: 'Mawar', terms: ['mawar', 'rose'] },
  { value: 'lily', label: 'Lili', terms: ['lily', 'lili'] },
  { value: 'tulip', label: 'Tulip', terms: ['tulip'] },
  { value: 'sunflower', label: 'Bunga Matahari', terms: ['matahari', 'sunflower'] },
  { value: 'hydrangea', label: 'Hortensia', terms: ['hortensia', 'hydrangea'] },
]

export const Products: React.FC = () => {
  const { data: products, isLoading } = useProducts()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedFlowerTypes, setSelectedFlowerTypes] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState<number>(2500000)
  const [sortBy, setSortBy] = useState('terbaru')
  const [isFilterVisible, setIsFilterVisible] = useState(
    () => typeof window === 'undefined' || window.innerWidth >= 1024
  )

  const handleFlowerTypeToggle = (type: string) => {
    setSelectedFlowerTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('Semua')
    setSelectedColor(null)
    setSelectedFlowerTypes([])
    setMaxPrice(2500000)
  }

  const filteredProducts = useMemo(() => {
    if (!products) return []

    return products
      .filter((product) => {
        const searchableProduct = [
          product.name,
          product.description,
          product.flower_type,
          product.color,
          product.unit,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()

        const matchesSearch = searchableProduct.includes(searchQuery.toLowerCase())
        const activeCategory = CATEGORY_SLIDES.find((category) => category.value === selectedCategory)

        const matchesCategory =
          selectedCategory === 'Semua' ||
          Boolean(activeCategory?.terms.some((term) => searchableProduct.includes(term))) ||
          searchableProduct.includes(selectedCategory.toLowerCase())

        const activeColor = FILTER_COLORS.find((color) => color.value === selectedColor)

        const matchesColor =
          !selectedColor ||
          Boolean(activeColor?.terms.some((term) => searchableProduct.includes(term))) ||
          searchableProduct.includes(selectedColor.toLowerCase())

        const activeFlowerTypes = FLOWER_TYPES.filter((type) =>
          selectedFlowerTypes.includes(type.value)
        )

        const matchesFlowerType =
          selectedFlowerTypes.length === 0 ||
          activeFlowerTypes.some((type) =>
            type.terms.some((term) => searchableProduct.includes(term))
          )

        const matchesPrice = product.base_price <= maxPrice
        const matchesLive = product.is_live !== false

        return (
          matchesSearch &&
          matchesCategory &&
          matchesColor &&
          matchesFlowerType &&
          matchesPrice &&
          matchesLive
        )
      })
      .sort((a, b) => {
        if (sortBy === 'termurah') return a.base_price - b.base_price
        if (sortBy === 'termahal') return b.base_price - a.base_price
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      })
  }, [products, searchQuery, selectedCategory, selectedColor, selectedFlowerTypes, maxPrice, sortBy])

  const selectedCategoryLabel =
    selectedCategory === 'Semua'
      ? 'Semua'
      : CATEGORY_SLIDES.find((category) => category.value === selectedCategory)?.label || selectedCategory

  const productGridClassName = isFilterVisible
    ? 'grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4'
    : 'grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5'

  return (
    <div className="pt-8 sm:pt-10 pb-20 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <FlashSaleSection />
      <PromoBanner />

      <section className="space-y-4" aria-labelledby="category-slider-title">
        <div className="space-y-1">
          <h1 id="category-slider-title" className="font-display text-xl font-bold text-charcoal-900 sm:text-2xl">
            Pilih Kategori Bunga
          </h1>
          <p className="text-xs font-medium text-charcoal-500 sm:text-sm">
            Temukan produk berdasarkan kebutuhan acara Anda.
          </p>
        </div>

        <div className="overflow-x-auto border border-charcoal-100 bg-white no-scrollbar">
          <div className="flex snap-x snap-mandatory gap-0 lg:grid lg:grid-cols-4">
            {CATEGORY_SLIDES.map((slide) => {
              const isSelected = selectedCategory === slide.value

              return (
                <button
                  key={slide.value}
                  type="button"
                  onClick={() => setSelectedCategory(slide.value)}
                  aria-pressed={isSelected}
                  className={`group relative min-w-[220px] snap-start overflow-hidden border-r border-charcoal-100 bg-white text-left aspect-square transition-colors duration-200 last:border-r-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal-900 sm:min-w-[240px] lg:min-w-0 ${
                    isSelected
                      ? 'bg-charcoal-50 outline outline-2 outline-charcoal-900 outline-offset-[-2px]'
                      : 'hover:bg-cream-50'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.label}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-x-0 bottom-0 space-y-2 border-t border-charcoal-100 bg-white/95 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-sm font-bold leading-tight text-charcoal-900">
                        {slide.label}
                      </h2>
                      <span
                        className={`h-2.5 w-2.5 shrink-0 border ${
                          isSelected ? 'border-charcoal-900 bg-charcoal-900' : 'border-charcoal-300 bg-white'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="line-clamp-2 text-xs leading-relaxed text-charcoal-500">
                      {slide.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <div className="grid gap-3 border border-charcoal-100 bg-white p-3 sm:p-4 lg:grid-cols-[minmax(240px,1fr)_auto] lg:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            placeholder="Cari buket, standing flower..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full border border-charcoal-100 bg-charcoal-50 pl-10 pr-4 text-xs font-semibold transition-colors focus:border-charcoal-900 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => setIsFilterVisible((visible) => !visible)}
            aria-controls="product-filters"
            aria-expanded={isFilterVisible}
            className="inline-flex h-10 items-center justify-center gap-2 border border-charcoal-900 px-3 text-[10px] font-bold uppercase tracking-wider text-charcoal-900 transition-colors hover:bg-charcoal-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal-900"
          >
            {isFilterVisible ? (
              <PanelLeftClose className="h-4 w-4" strokeWidth={2} />
            ) : (
              <PanelLeftOpen className="h-4 w-4" strokeWidth={2} />
            )}
            <span>{isFilterVisible ? 'Sembunyikan Filter' : 'Tampilkan Filter'}</span>
          </button>
          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex h-10 items-center justify-center border border-charcoal-200 px-3 text-[10px] font-bold uppercase tracking-wider text-charcoal-600 transition-colors hover:border-charcoal-900 hover:text-charcoal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal-900"
          >
            Reset Filter
          </button>
          <div className="flex h-10 items-center space-x-2 border border-charcoal-100 bg-charcoal-50 px-3">
            <SlidersHorizontal className="w-3.5 h-3.5 text-charcoal-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent pr-2 text-xs font-bold uppercase text-charcoal-700 focus:outline-none cursor-pointer"
            >
              <option value="terbaru">TERBARU</option>
              <option value="termurah">Harga: Termurah</option>
              <option value="termahal">Harga: Termahal</option>
            </select>
          </div>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 items-start gap-6 ${
          isFilterVisible ? 'lg:grid-cols-[260px_minmax(0,1fr)]' : ''
        }`}
      >
        {isFilterVisible && (
          <aside
            id="product-filters"
            className="space-y-6 border border-charcoal-100 bg-white p-5 lg:sticky lg:top-28"
          >
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
              <h2 className="text-sm font-bold tracking-widest uppercase text-charcoal-900">
                Filter
              </h2>
              <button
                type="button"
                onClick={() => setIsFilterVisible(false)}
                className="inline-flex h-9 w-9 items-center justify-center border border-charcoal-200 text-charcoal-600 transition-colors hover:border-charcoal-900 hover:text-charcoal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal-900"
                aria-label="Sembunyikan filter"
                title="Sembunyikan filter"
              >
                <PanelLeftClose className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-charcoal-850 uppercase">
                Harga
              </h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="250000"
                  max="2500000"
                  step="50000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="h-1 w-full cursor-pointer rounded-none bg-charcoal-100 accent-charcoal-900"
                />
                <div className="flex justify-between items-center text-[10px] font-bold text-charcoal-500">
                  <span>Rp 250k</span>
                  <span className="text-charcoal-900">
                    Rp {(maxPrice / 1000).toLocaleString('id-ID')}k+
                  </span>
                </div>
              </div>
            </div>

            <div className="h-px bg-charcoal-100" />

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-charcoal-850 uppercase">
                Warna
              </h3>
              <div className="space-y-1">
                {FILTER_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSelectedColor(selectedColor === color.value ? null : color.value)}
                    className={`flex h-9 w-full items-center space-x-2 border px-2 text-left text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal-900 ${
                      selectedColor === color.value
                        ? 'border-charcoal-900 bg-charcoal-900 text-white'
                        : 'border-charcoal-100 text-charcoal-700 hover:border-charcoal-300 hover:text-charcoal-900'
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full border border-charcoal-100"
                      style={{ background: color.swatch }}
                      aria-hidden="true"
                    />
                    <span>{color.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-charcoal-100" />

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-charcoal-850 uppercase">
                Jenis Bunga
              </h3>
              <div className="space-y-2">
                {FLOWER_TYPES.map((type) => (
                  <label
                    key={type.value}
                    className="flex h-9 cursor-pointer items-center space-x-3 border border-charcoal-100 px-2 text-[10px] font-bold uppercase tracking-wider text-charcoal-600 transition-colors hover:border-charcoal-300 hover:text-charcoal-900"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFlowerTypes.includes(type.value)}
                      onChange={() => handleFlowerTypeToggle(type.value)}
                      className="h-4 w-4 cursor-pointer rounded-none border-charcoal-300 text-charcoal-900 accent-charcoal-900 focus:ring-charcoal-950"
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>
        )}

        <section className="min-w-0 space-y-6">
          <div className="flex justify-between items-center text-xs text-charcoal-500 font-medium">
            <span>Kategori: <strong className="text-charcoal-800 uppercase tracking-wider">{selectedCategoryLabel}</strong></span>
            <span>Menampilkan {filteredProducts.length} hasil</span>
          </div>

          {isLoading ? (
            <div className={productGridClassName}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-square skeleton rounded-none" />
                  <div className="h-4 skeleton w-2/3" />
                  <div className="h-4 skeleton w-1/3" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="border border-charcoal-100 bg-white py-24 text-center space-y-3">
              <p className="font-display text-base font-bold text-charcoal-700">
                Rangkaian Bunga Kosong
              </p>
              <p className="text-xs text-charcoal-400 max-w-sm mx-auto">
                Silakan reset filter atau gunakan opsi filter lain untuk menemukan rangkaian bunga yang Anda cari.
              </p>
            </div>
          ) : (
            <div className={productGridClassName}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

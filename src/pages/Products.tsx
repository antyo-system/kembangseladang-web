import React, { useState, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { ProductCard } from '../components/product/ProductCard'

// Mock categories matching mockup exactly
const CATEGORY_SLIDES = [
  { name: 'BOUQUET', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=400' },
  { name: 'BLOOM BOX', image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=400' },
  { name: 'VASE', image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=400' },
  { name: 'CAKE', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=400' }
]

const FILTER_COLORS = [
  { name: 'White', class: 'bg-white border border-charcoal-350' },
  { name: 'Red', class: 'bg-red-650' },
  { name: 'Yellow', class: 'bg-yellow-450' },
  { name: 'Green', class: 'bg-emerald-650' },
  { name: 'Blue', class: 'bg-blue-650' },
  { name: 'Multi', class: 'bg-gradient-to-tr from-pink-400 via-yellow-400 to-teal-400' }
]

const MOCK_FLOWER_TYPES = ['Rose', 'Lily', 'Tulip', 'Sunflower', 'Hydrangea']

export const Products: React.FC = () => {
  const { data: products, isLoading } = useProducts()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedFlowerTypes, setSelectedFlowerTypes] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState<number>(2500000)
  const [sortBy, setSortBy] = useState('terbaru')

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
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description || '').toLowerCase().includes(searchQuery.toLowerCase())
        
        const matchesCategory =
          selectedCategory === 'Semua' || 
          (product.flower_type || '').toLowerCase().includes(selectedCategory.toLowerCase()) ||
          product.name.toLowerCase().includes(selectedCategory.toLowerCase())

        const matchesColor =
          !selectedColor || 
          (product.color || '').toLowerCase().includes(selectedColor.toLowerCase())

        const matchesFlowerType =
          selectedFlowerTypes.length === 0 ||
          selectedFlowerTypes.some((type) => {
            // map 'Rose' check to database 'mawar', etc
            const typeMapping: { [key: string]: string } = {
              'rose': 'mawar',
              'lily': 'lily',
              'tulip': 'tulip',
              'sunflower': 'matahari',
              'hydrangea': 'hortensia'
            }
            const term = typeMapping[type.toLowerCase()] || type.toLowerCase()
            return (product.flower_type || '').toLowerCase().includes(term) ||
                   product.name.toLowerCase().includes(term)
          })

        const matchesPrice = product.base_price <= maxPrice

        return matchesSearch && matchesCategory && matchesColor && matchesFlowerType && matchesPrice
      })
      .sort((a, b) => {
        if (sortBy === 'termurah') return a.base_price - b.base_price
        if (sortBy === 'termahal') return b.base_price - a.base_price
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      })
  }, [products, searchQuery, selectedCategory, selectedColor, selectedFlowerTypes, maxPrice, sortBy])

  return (
    <div className="pt-28 pb-20 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      
      {/* Category Horizontal Slider Section (mocked exactly after screenshot) */}
      <section className="bg-white rounded-[2rem] border border-charcoal-100 p-6 sm:p-8">
        <div className="flex justify-center gap-8 sm:gap-14 overflow-x-auto pb-2 scrollbar-none">
          {/* Option to show all */}
          <button
            onClick={() => setSelectedCategory('Semua')}
            className="flex flex-col items-center space-y-3 cursor-pointer group"
          >
            <div className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full overflow-hidden border p-0.5 transition-all duration-300 flex items-center justify-center bg-charcoal-50 ${
              selectedCategory === 'Semua' ? 'border-charcoal-900 scale-105 shadow-sm' : 'border-charcoal-100 group-hover:scale-102'
            }`}>
              <span className="text-xl">💐</span>
            </div>
            <span className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase transition-colors ${
              selectedCategory === 'Semua' ? 'text-charcoal-900 border-b border-charcoal-900 pb-0.5' : 'text-charcoal-500 group-hover:text-charcoal-900'
            }`}>
              ALL PRODUCTS
            </span>
          </button>

          {CATEGORY_SLIDES.map((slide) => (
            <button
              key={slide.name}
              onClick={() => setSelectedCategory(slide.name)}
              className="flex flex-col items-center space-y-3 cursor-pointer group"
            >
              <div className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full overflow-hidden border p-0.5 transition-all duration-300 ${
                selectedCategory === slide.name ? 'border-charcoal-900 scale-105 shadow-sm' : 'border-charcoal-100 group-hover:scale-102'
              }`}>
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase transition-colors ${
                selectedCategory === slide.name ? 'text-charcoal-900 border-b border-charcoal-900 pb-0.5' : 'text-charcoal-500 group-hover:text-charcoal-900'
              }`}>
                {slide.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Filter / Sort bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center p-4 bg-white border border-charcoal-100 rounded-3xl">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            placeholder="Cari buket mawar, bloom box..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-charcoal-50 pl-10 pr-4 py-2.5 rounded-2xl text-xs font-semibold border-2 border-transparent focus:border-primary-100 focus:bg-white focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleClearFilters}
            className="text-xs font-bold tracking-wider text-charcoal-500 hover:text-primary-600 transition-colors uppercase cursor-pointer"
          >
            Clear Filters
          </button>
          <div className="flex items-center space-x-2 bg-charcoal-50 px-3 py-2 rounded-2xl border border-charcoal-100">
            <SlidersHorizontal className="w-3.5 h-3.5 text-charcoal-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-charcoal-700 focus:outline-none cursor-pointer pr-2 uppercase"
            >
              <option value="terbaru">TERBARU</option>
              <option value="termurah">Harga: Termurah</option>
              <option value="termahal">Harga: Termahal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Split Layout: Left sidebar filters, Right product grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left column sidebar filters */}
        <aside className="space-y-6 bg-white p-6 rounded-3xl border border-charcoal-100 lg:sticky lg:top-28">
          
          <h2 className="text-sm font-bold tracking-widest uppercase text-charcoal-900 border-b border-charcoal-100 pb-3">
            FILTERS
          </h2>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-charcoal-850 uppercase">
              Price
            </h3>
            <div className="space-y-3">
              <input
                type="range"
                min="250000"
                max="2500000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-charcoal-900 cursor-pointer h-1 bg-charcoal-100 rounded-lg"
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

          {/* Color Palette Selector */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-charcoal-850 uppercase">
              Color
            </h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-3">
              {FILTER_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
                  className={`flex items-center space-x-2 text-[10px] font-bold text-charcoal-600 cursor-pointer hover:text-charcoal-900 transition-all ${
                    selectedColor === color.name ? 'scale-102 font-extrabold text-charcoal-900' : ''
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full shrink-0 ${color.class}`} />
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-charcoal-100" />

          {/* Flower Type Checkbox List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-charcoal-850 uppercase">
              Flower Type
            </h3>
            <div className="space-y-3">
              {MOCK_FLOWER_TYPES.map((type) => (
                <label key={type} className="flex items-center space-x-3 text-[10px] font-bold text-charcoal-600 hover:text-charcoal-900 cursor-pointer uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedFlowerTypes.includes(type)}
                    onChange={() => handleFlowerTypeToggle(type)}
                    className="w-4 h-4 rounded text-charcoal-900 accent-charcoal-900 border-charcoal-300 focus:ring-charcoal-950 cursor-pointer"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

        </aside>

        {/* Right column product display grid */}
        <section className="lg:col-span-3 space-y-6">
          <div className="flex justify-between items-center text-xs text-charcoal-500 font-medium">
            <span>Kategori: <strong className="text-charcoal-800 uppercase tracking-wider">{selectedCategory}</strong></span>
            <span>Menampilkan {filteredProducts.length} hasil</span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-square skeleton rounded-3xl" />
                  <div className="h-4 skeleton w-2/3" />
                  <div className="h-4 skeleton w-1/3" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-charcoal-100 space-y-3">
              <p className="font-display text-base font-bold text-charcoal-700">
                Rangkaian Bunga Kosong
              </p>
              <p className="text-xs text-charcoal-400 max-w-sm mx-auto">
                Silakan reset filter atau gunakan opsi filter lain untuk menemukan rangkaian bunga yang Anda cari.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

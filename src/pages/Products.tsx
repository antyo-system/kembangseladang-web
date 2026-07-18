import React, { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, ChevronRight, ChevronLeft, Star } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { ProductCard } from '../components/product/ProductCard'

// Category Slide mockup data with images like Three Bouquets screenshot
const CATEGORY_SLIDES = [
  { name: 'Bouquet', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=400' },
  { name: 'Bloom Boxes', image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=400' },
  { name: 'Vase', image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=400' },
  { name: 'Cake & Gift', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=400' },
  { name: 'Standing Flower', image: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&q=80&w=400' },
  { name: 'Flower Board', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400' }
]

const FILTER_COLORS = [
  { name: 'Biru', class: 'bg-blue-600' },
  { name: 'Hijau', class: 'bg-emerald-600' },
  { name: 'Oranye', class: 'bg-orange-500' },
  { name: 'Abu-Abu', class: 'bg-gray-200' },
  { name: 'Merah Muda', class: 'bg-pink-300' },
  { name: 'Ungu', class: 'bg-purple-600' },
  { name: 'Merah', class: 'bg-red-600' },
  { name: 'Putih', class: 'bg-white border border-charcoal-200' },
  { name: 'Kuning', class: 'bg-yellow-400' }
]

export const Products: React.FC = () => {
  const { data: products, isLoading } = useProducts()
  
  // State variables for searching/filtering
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedFlowerTypes, setSelectedFlowerTypes] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState<number>(2000000)
  const [sortBy, setSortBy] = useState('terbaru')

  // Available flower types for checkbox list (from actual products + default mock ones if empty)
  const flowerTypes = useMemo(() => {
    if (!products) return ['Mawar', 'Baby\'s breath', 'Krisan', 'Tulip', 'Carnation']
    const types = new Set(
      products
        .map((p) => p.flower_type?.trim())
        .filter(Boolean)
    )
    if (types.size === 0) return ['Mawar', 'Baby\'s breath', 'Krisan', 'Tulip', 'Carnation']
    return Array.from(types)
  }, [products])

  // Toggle flower type selection
  const handleFlowerTypeToggle = (type: string) => {
    setSelectedFlowerTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('Semua')
    setSelectedColor(null)
    setSelectedFlowerTypes([])
    setMaxPrice(2000000)
  }

  // Filter & Sort core logic
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
          selectedFlowerTypes.some((type) =>
            (product.flower_type || '').toLowerCase().includes(type.toLowerCase())
          )

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
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      
      {/* Category Horizontal Slider Section (mocked after treeboquet/threebouquets category layout) */}
      <section className="relative group">
        <h2 className="text-center font-display text-2xl font-bold text-charcoal-900 tracking-wider uppercase mb-6">
          Kategori Pilihan
        </h2>
        
        {/* Slider row */}
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
          {CATEGORY_SLIDES.map((slide) => (
            <button
              key={slide.name}
              onClick={() => setSelectedCategory(slide.name)}
              className={`flex-shrink-0 w-44 sm:w-56 snap-start bg-white border rounded-3xl overflow-hidden group/slide hover:shadow-md transition-all duration-300 relative text-left cursor-pointer ${
                selectedCategory === slide.name ? 'border-primary-600 shadow-sm ring-1 ring-primary-600' : 'border-charcoal-100'
              }`}
            >
              {/* Slide image */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-cream-50 select-none">
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="w-full h-full object-cover group-hover/slide:scale-102 transition-transform duration-500"
                />
              </div>
              {/* Name footer */}
              <div className="p-3 text-center bg-white border-t border-charcoal-100">
                <span className="text-xs font-bold tracking-wider text-charcoal-800 uppercase">
                  {slide.name}
                </span>
              </div>
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
            className="text-xs font-semibold text-charcoal-500 hover:text-primary-600 transition-colors cursor-pointer"
          >
            Reset Filter
          </button>
          <div className="flex items-center space-x-2 bg-charcoal-50 px-3 py-2 rounded-2xl border border-charcoal-100">
            <SlidersHorizontal className="w-3.5 h-3.5 text-charcoal-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-charcoal-700 focus:outline-none cursor-pointer pr-2"
            >
              <option value="terbaru">TERBARU</option>
              <option value="termurah">HARGA: TERMURAH</option>
              <option value="termahal">HARGA: TERMAHAL</option>
            </select>
          </div>
        </div>
      </div>

      {/* Split Layout: Left sidebar filter, Right product grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left column sidebar filters */}
        <aside className="space-y-8 bg-white p-6 rounded-3xl border border-charcoal-100 lg:sticky lg:top-28">
          
          {/* Price Range Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal-800">
              Filter Harga
            </h3>
            <div className="space-y-2">
              <input
                type="range"
                min="50000"
                max="2000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary-600 cursor-pointer h-1.5 bg-charcoal-100 rounded-lg"
              />
              <div className="flex justify-between items-center text-xs font-semibold text-charcoal-600">
                <span>Rp50rb</span>
                <span className="text-primary-700 bg-primary-50 px-2 py-0.5 rounded">
                  Max: Rp{(maxPrice / 1000).toLocaleString('id-ID')}rb
                </span>
              </div>
            </div>
          </div>

          <div className="h-px bg-charcoal-100" />

          {/* Color Palette Selector */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal-800">
              Warna Bunga
            </h3>
            <div className="flex flex-wrap gap-2">
              {FILTER_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
                  className={`w-7 h-7 rounded-full transition-all duration-300 relative ${color.class} ${
                    selectedColor === color.name ? 'scale-110 ring-2 ring-primary-500 ring-offset-2' : 'hover:scale-105'
                  }`}
                  title={color.name}
                  aria-label={`Pilih warna ${color.name}`}
                />
              ))}
            </div>
          </div>

          <div className="h-px bg-charcoal-100" />

          {/* Flower Type Checkbox List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal-800">
              Jenis Bunga
            </h3>
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {flowerTypes.map((type) => (
                <label key={type} className="flex items-center space-x-3 text-xs text-charcoal-600 hover:text-charcoal-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFlowerTypes.includes(type)}
                    onChange={() => handleFlowerTypeToggle(type)}
                    className="w-4 h-4 rounded text-primary-600 accent-primary-600 border-charcoal-300 focus:ring-primary-500 cursor-pointer"
                  />
                  <span className="capitalize">{type}</span>
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
                  <div className="aspect-[4/5] skeleton rounded-3xl" />
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

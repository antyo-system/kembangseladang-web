import React, { useState, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { ProductCard } from '../components/product/ProductCard'

export const Products: React.FC = () => {
  const { data: products, isLoading } = useProducts()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('Semua')
  const [sortBy, setSortBy] = useState('terbaru')

  // Get unique flower types for filter buttons
  const flowerTypes = useMemo(() => {
    if (!products) return ['Semua']
    const types = new Set(products.map((p) => p.flower_type).filter(Boolean))
    return ['Semua', ...Array.from(types)]
  }, [products])

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    if (!products) return []

    return products
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description || '').toLowerCase().includes(searchQuery.toLowerCase())
        
        const matchesType =
          selectedType === 'Semua' || product.flower_type === selectedType

        return matchesSearch && matchesType
      })
      .sort((a, b) => {
        if (sortBy === 'termurah') {
          return a.base_price - b.base_price
        }
        if (sortBy === 'termahal') {
          return b.base_price - a.base_price
        }
        // Default: terbaru (based on created_at or sequence)
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      })
  }, [products, searchQuery, selectedType, sortBy])

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Title & Intro */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-charcoal-900">
          Katalog Rangkaian Bunga
        </h1>
        <p className="text-sm text-charcoal-500 text-balance leading-relaxed">
          Jelajahi koleksi buket eksklusif Kembang Seladang. Pilih rangkaian terbaik untuk setiap momen berharga Anda.
        </p>
      </div>

      {/* Filter Controls Row */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center bg-white p-5 rounded-3xl border border-primary-100/40 shadow-sm">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
          <input
            type="text"
            placeholder="Cari buket mawar, papan ucapan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-cream-50 pl-12 pr-4 py-3 rounded-2xl text-sm font-medium border-2 border-transparent focus:border-primary-200 focus:bg-white focus:outline-none transition-all"
          />
        </div>

        {/* Sort & Quick filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2 bg-cream-50 p-2 rounded-2xl border border-primary-50">
            <SlidersHorizontal className="w-4 h-4 text-primary-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-semibold focus:outline-none text-charcoal-700 cursor-pointer pr-4"
            >
              <option value="terbaru">Terbaru</option>
              <option value="termurah">Harga: Termurah</option>
              <option value="termahal">Harga: Termahal</option>
            </select>
          </div>
        </div>

      </div>

      {/* Flower Type Category Pill Row */}
      <div className="flex flex-wrap gap-2.5 pb-2 justify-center lg:justify-start">
        {flowerTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type || 'Semua')}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
              selectedType === type
                ? 'bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-500/10'
                : 'bg-white border-primary-100 hover:border-primary-300 text-charcoal-700'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Product Grid Area */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-square skeleton rounded-3xl" />
              <div className="h-4 skeleton w-2/3" />
              <div className="h-4 skeleton w-1/3" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 glass rounded-3xl border border-primary-100/50 space-y-3">
          <p className="font-display text-base font-semibold text-charcoal-700">
            Tidak ada produk yang cocok
          </p>
          <p className="text-xs text-charcoal-400 max-w-sm mx-auto">
            Coba gunakan kata kunci lain atau pilih filter kategori yang berbeda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  )
}

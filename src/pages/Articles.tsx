import React, { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { useArticles } from '../hooks/useArticles'
import { ArticleCard } from '../components/article/ArticleCard'

export const Articles: React.FC = () => {
  const { data: articles, isLoading } = useArticles()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')

  const categories = useMemo(() => {
    if (!articles) return ['Semua']
    const cats = new Set(articles.map((a) => a.category).filter(Boolean))
    return ['Semua', ...Array.from(cats)]
  }, [articles])

  const filteredArticles = useMemo(() => {
    if (!articles) return []

    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory =
        selectedCategory === 'Semua' || article.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [articles, searchQuery, selectedCategory])

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Info */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-charcoal-900">
          Tips & Artikel Florist
        </h1>
        <p className="text-sm text-charcoal-500 text-balance leading-relaxed">
          Temukan panduan praktis merawat bunga hias, inspirasi dekorasi perkawinan, serta info terbaru seputar kado bunga.
        </p>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-primary-100/40 shadow-sm">
        
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            placeholder="Cari artikel tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-cream-50 pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold border-2 border-transparent focus:border-primary-200 focus:bg-white focus:outline-none transition-all"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary-600 border-primary-600 text-white shadow-sm'
                  : 'bg-white border-primary-100 hover:border-primary-200 text-charcoal-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Article Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[16/10] skeleton rounded-3xl" />
              <div className="h-4 skeleton w-3/4" />
              <div className="h-4 skeleton w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-primary-100/40 space-y-2">
          <p className="font-display text-base font-semibold text-charcoal-700">
            Tidak ada artikel ditemukan
          </p>
          <p className="text-xs text-charcoal-400">
            Gunakan kata kunci pencarian atau kategori lain.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

    </div>
  )
}

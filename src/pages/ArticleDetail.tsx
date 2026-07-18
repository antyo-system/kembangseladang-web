import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, User, Tag, Send } from 'lucide-react'
import { useArticle } from '../hooks/useArticles'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Button } from '../components/ui/Button'

// Simple markdown renderer to avoid external dependencies
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n')
  
  return (
    <div className="space-y-4 text-charcoal-700 leading-relaxed text-sm sm:text-base">
      {lines.map((line, index) => {
        const trimmed = line.trim()
        
        if (!trimmed) return <div key={index} className="h-2" />

        // H1
        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={index} className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900 pt-6 pb-2">
              {trimmed.substring(2)}
            </h1>
          )
        }
        
        // H2
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={index} className="font-display text-xl sm:text-2xl font-bold text-charcoal-900 pt-5 pb-2">
              {trimmed.substring(3)}
            </h2>
          )
        }

        // H3
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={index} className="font-display text-lg font-bold text-charcoal-900 pt-4 pb-1">
              {trimmed.substring(4)}
            </h3>
          )
        }

        // List item
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const text = trimmed.substring(2)
          return (
            <ul key={index} className="list-disc list-inside pl-4 space-y-1">
              <li className="text-charcoal-700">
                {parseBoldText(text)}
              </li>
            </ul>
          )
        }

        // Standard paragraph
        return (
          <p key={index} className="text-justify text-balance">
            {parseBoldText(trimmed)}
          </p>
        )
      })}
    </div>
  )
}

// Inline parser for **bold** text
function parseBoldText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) => {
    // Every odd index is a captured group (bold)
    if (i % 2 === 1) {
      return <strong key={i} className="font-bold text-charcoal-900">{part}</strong>
    }
    return part
  })
}

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: article, isLoading, isError } = useArticle(slug || '')

  if (isLoading) {
    return (
      <div className="pt-10 sm:pt-12 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 animate-pulse">
        <div className="h-6 bg-cream-200 w-20 rounded-lg" />
        <div className="h-10 bg-cream-200 w-3/4 rounded-lg" />
        <div className="aspect-[16/8] bg-cream-200 rounded-[2rem]" />
        <div className="space-y-4">
          <div className="h-4 bg-cream-200 rounded-lg" />
          <div className="h-4 bg-cream-200 w-5/6 rounded-lg" />
          <div className="h-4 bg-cream-200 w-2/3 rounded-lg" />
        </div>
      </div>
    )
  }

  if (isError || !article) {
    return (
      <div className="pt-16 pb-20 text-center space-y-4 max-w-md mx-auto px-4">
        <p className="font-display text-xl font-bold text-charcoal-800">
          Artikel Tidak Ditemukan
        </p>
        <p className="text-sm text-charcoal-500">
          Maaf, artikel tips florist yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Link to="/articles" className="inline-block">
          <Button variant="primary">Kembali ke Blog</Button>
        </Link>
      </div>
    )
  }

  const publishedDate = article.published_at 
    ? new Date(article.published_at) 
    : new Date(article.created_at)

  return (
    <div className="pt-10 sm:pt-12 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-sm font-semibold text-charcoal-600 hover:text-primary-600 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4.5 h-4.5 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali</span>
        </button>
      </div>

      {/* Main Container */}
      <article className="space-y-8">
        
        {/* Title & Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-400">
            <span className="inline-flex items-center space-x-1.5 bg-primary-50 text-primary-700 font-semibold px-3 py-1 rounded-full border border-primary-100">
              <Tag className="w-3.5 h-3.5" />
              <span>{article.category}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={publishedDate.toISOString()}>
                {format(publishedDate, 'dd MMMM yyyy', { locale: id })}
              </time>
            </span>
            <span className="flex items-center space-x-1">
              <User className="w-3.5 h-3.5" />
              <span>{article.author}</span>
            </span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 leading-tight">
            {article.title}
          </h1>
        </div>

        {/* Cover Image */}
        {article.cover_image && (
          <div className="aspect-[16/8] rounded-[2rem] overflow-hidden border border-primary-100/50 shadow-sm select-none">
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Body content */}
        <div className="bg-white p-6 sm:p-10 rounded-[2rem] border border-primary-100/40 shadow-sm">
          <MarkdownRenderer content={article.content} />
        </div>

        {/* Sticky Call To Action Bottom */}
        <div className="bg-gradient-hero border border-primary-100 rounded-[2rem] p-8 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal-900">
              Tertarik Rangkaian Bunga di Atas?
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-500 max-w-md">
              Dapatkan produk bunga segar premium buatan florist berpengalaman kami di Tangerang Selatan.
            </p>
          </div>
          <Link to="/products">
            <Button variant="primary" size="lg" className="shadow-lg shadow-primary-500/15">
              <span>Buka Katalog Bunga</span>
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

      </article>

    </div>
  )
}

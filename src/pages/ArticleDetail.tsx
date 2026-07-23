import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, User, Tag, Send, Clock, Sparkles } from 'lucide-react'
import { useArticle } from '../hooks/useArticles'
import { useProducts } from '../hooks/useProducts'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Button } from '../components/ui/Button'

import { trackWAClick } from '../utils/analytics'

// Full-featured, clean markdown renderer
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n')
  
  return (
    <div className="space-y-3 text-charcoal-700 leading-relaxed text-sm sm:text-base text-left">
      {lines.map((line, index) => {
        const trimmed = line.trim()
        
        if (!trimmed) return <div key={index} className="h-2" />

        // Horizontal Rule
        if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
          return <hr key={index} className="my-6 border-t border-primary-100/80" />
        }

        // H1
        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={index} className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900 pt-6 pb-2 border-b border-primary-100 text-left">
              {parseFormattedText(trimmed.substring(2))}
            </h1>
          )
        }
        
        // H2
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={index} className="font-display text-xl sm:text-2xl font-bold text-charcoal-900 pt-5 pb-2 text-left">
              {parseFormattedText(trimmed.substring(3))}
            </h2>
          )
        }

        // H3
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={index} className="font-display text-lg font-bold text-charcoal-900 pt-4 pb-1 text-left">
              {parseFormattedText(trimmed.substring(4))}
            </h3>
          )
        }

        // Blockquote
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={index} className="p-4 bg-primary-50/60 rounded-2xl border-l-4 border-primary-500 italic text-charcoal-800 text-xs sm:text-sm my-3 text-left">
              {parseFormattedText(trimmed.substring(2))}
            </blockquote>
          )
        }

        // Numbered list item e.g. "1. ", "2. "
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/)
        if (numberedMatch) {
          const num = numberedMatch[1]
          const text = numberedMatch[2]
          return (
            <div key={index} className="flex gap-2.5 items-start my-2 text-charcoal-700 text-left">
              <span className="font-bold text-primary-600 min-w-[20px] text-right shrink-0">{num}.</span>
              <div className="flex-1 leading-relaxed">{parseFormattedText(text)}</div>
            </div>
          )
        }

        // Bullet list item "- " or "* "
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const text = trimmed.substring(2)
          return (
            <div key={index} className="flex gap-2.5 items-start my-1.5 text-charcoal-700 text-left pl-2">
              <span className="text-primary-500 font-bold shrink-0 mt-2 h-1.5 w-1.5 rounded-full bg-primary-500" />
              <div className="flex-1 leading-relaxed">{parseFormattedText(text)}</div>
            </div>
          )
        }

        // Standard paragraph (Clean left alignment, NO text-justify)
        return (
          <p key={index} className="text-left text-charcoal-700 leading-relaxed my-1">
            {parseFormattedText(trimmed)}
          </p>
        )
      })}
    </div>
  )
}

// Inline parser for [markdown links](url), **bold**, and *italic*
function parseFormattedText(text: string): React.ReactNode[] {
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*[^*]+?\*)/g
  const parts = text.split(regex)

  return parts.map((part, i) => {
    if (!part) return null

    // Markdown Link: [text](url)
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/)
      if (match) {
        const linkText = match[1]
        const linkUrl = match[2]
        const isWa = linkUrl.includes('wa.me') || linkUrl.includes('whatsapp')

        return (
          <a
            key={i}
            href={linkUrl}
            target={linkUrl.startsWith('http') ? '_blank' : '_self'}
            rel="noreferrer"
            className={
              isWa
                ? 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs no-underline transition-all active:scale-95 shadow-sm my-1 mx-1 align-middle'
                : 'text-primary-600 font-bold underline hover:text-primary-700'
            }
          >
            {parseFormattedText(linkText)}
          </a>
        )
      }
    }

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={i} className="font-bold text-charcoal-900">
          {parseFormattedText(part.slice(2, -2))}
        </strong>
      )
    }

    // Italic: *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={i} className="italic text-charcoal-800">
          {parseFormattedText(part.slice(1, -1))}
        </em>
      )
    }

    return part
  })
}

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: article, isLoading, isError } = useArticle(slug || '')
  const { data: products = [] } = useProducts()

  // SEO & Head Tags Inserter
  useEffect(() => {
    if (!article) return

    // 1. Dynamic Page Title
    const originalTitle = document.title
    document.title = article.meta_title || `${article.title} | Kembang Seladang`

    // 2. Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', article.meta_description || article.excerpt || '')

    // 3. OpenGraph Social Tags
    const setMetaTag = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', property)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMetaTag('og:title', article.meta_title || article.title)
    setMetaTag('og:description', article.meta_description || article.excerpt || '')
    if (article.cover_image) setMetaTag('og:image', article.cover_image)
    setMetaTag('og:type', 'article')
    setMetaTag('og:url', window.location.href)

    // 4. JSON-LD Schema Markup Injection
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': article.title,
      'description': article.meta_description || article.excerpt,
      'image': article.cover_image ? [article.cover_image] : [],
      'datePublished': article.published_at || article.created_at,
      'author': {
        '@type': 'Organization',
        'name': article.author_name || article.author || 'Kembang Seladang'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Kembang Seladang Toko Bunga',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://kembangseladang.com/logo.png'
        }
      }
    }

    let scriptTag = document.querySelector('#jsonld-article-schema') as HTMLScriptElement | null
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = 'jsonld-article-schema'
      scriptTag.type = 'application/ld+json'
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify(schemaData)

    return () => {
      document.title = originalTitle
      if (scriptTag) scriptTag.remove()
    }
  }, [article])

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

  const readingTime = article.reading_time_minutes || 4

  return (
    <div className="pt-10 sm:pt-12 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-sm font-semibold text-charcoal-600 hover:text-primary-600 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4.5 h-4.5 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Blog</span>
        </button>
      </div>

      {/* Main Container */}
      <article className="space-y-8">
        
        {/* Title & Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-500">
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
              <Clock className="w-3.5 h-3.5" />
              <span>~{readingTime} Menit Baca</span>
            </span>
            <span className="flex items-center space-x-1">
              <User className="w-3.5 h-3.5" />
              <span>{article.author_name || article.author || 'Kembang Seladang Team'}</span>
            </span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 leading-tight">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-sm sm:text-base text-charcoal-600 font-medium leading-relaxed border-l-4 border-primary-500 pl-4 py-1 italic bg-cream-50/50 rounded-r-xl">
              {article.excerpt}
            </p>
          )}
        </div>

        {/* Cover Image */}
        {article.cover_image && (
          <div className="aspect-[16/8] rounded-[2rem] overflow-hidden border border-primary-100/50 shadow-sm select-none">
            <img
              src={article.cover_image}
              alt={article.cover_image_alt || article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Body content */}
        <div className="bg-white p-6 sm:p-10 rounded-[2rem] border border-primary-100/40 shadow-sm">
          <MarkdownRenderer content={article.content} />
        </div>

        {/* Recommended Bouquet Cross-Sell Widgets */}
        {products.length > 0 && (
          <div className="bg-white p-6 rounded-[2rem] border border-primary-100/50 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary-700 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-primary-500" />
                <span>Rekomendasi Buket Bunga Segar Pilihan</span>
              </div>
              <Link to="/products" className="text-xs text-primary-600 hover:underline font-semibold">
                Lihat Semua Katalog &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.slice(0, 3).map((p) => (
                <div key={p.id} className="p-3 bg-cream-50/60 rounded-2xl border border-primary-100 flex flex-col justify-between space-y-2 hover:shadow-md transition-shadow">
                  {p.image && (
                    <img src={p.image} alt={p.name} className="w-full h-28 object-cover rounded-xl border border-primary-100" />
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-charcoal-900 truncate">{p.name}</h4>
                    <p className="text-xs font-bold text-primary-600 mt-0.5">
                      Rp {p.base_price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/6281260000000?text=Halo%20Kembang%20Seladang,%20saya%20tertarik%20pesan%20bunga%20${encodeURIComponent(p.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackWAClick({ productId: p.id, productName: p.name })}
                    className="w-full py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-[11px] font-bold text-center block transition-colors"
                  >
                    Pesan via WA
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sticky Call To Action Bottom */}
        <div className="bg-gradient-hero border border-primary-100 rounded-[2rem] p-8 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal-900">
              Tertarik Rangkaian Bunga di Atas?
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-500 max-w-md">
              Dapatkan produk bunga segar premium buatan florist berpengalaman kami di Kembang Seladang.
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

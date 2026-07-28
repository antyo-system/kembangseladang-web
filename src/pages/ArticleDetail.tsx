import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, User, Tag, Send, Clock, Sparkles, Link2, Check } from 'lucide-react'
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

// ── Social Share Bar ────────────────────────────────────────────────────────
interface ShareBarProps {
  url: string
  title: string
}

  const [copied, setCopied] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const encodedUrl   = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      id: 'facebook',
      label: 'Bagikan ke Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      color: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
    },
    {
      id: 'twitter',
      label: 'Bagikan ke X / Twitter',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: 'hover:bg-black hover:text-white hover:border-black',
    },
    {
      id: 'pinterest',
      label: 'Bagikan ke Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
      ),
      color: 'hover:bg-[#E60023] hover:text-white hover:border-[#E60023]',
    },
    {
      id: 'whatsapp',
      label: 'Bagikan ke WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      ),
      color: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366]',
    },
  ]

  const copyButtons = [
    {
      id: 'instagram',
      label: 'Salin link → bagikan di Instagram',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
      color: 'hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45] hover:text-white hover:border-[#C13584]',
    },
    {
      id: 'tiktok',
      label: 'Salin link → bagikan di TikTok',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z" />
        </svg>
      ),
      color: 'hover:bg-black hover:text-white hover:border-black',
    },
  ]

  const handleCopyForPlatform = async (platformId: string) => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopiedId(platformId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal-400 mb-1">Bagikan</span>

      {shareLinks.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={item.label}
          title={item.label}
          className={`w-10 h-10 flex items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 bg-white shadow-sm transition-all duration-200 active:scale-90 ${
            item.color
          }`}
        >
          {item.icon}
        </a>
      ))}

      {/* Instagram & TikTok — copy to clipboard */}
      {copyButtons.map((item) => (
        <div key={item.id} className="flex flex-col items-center">
          <button
            onClick={() => handleCopyForPlatform(item.id)}
            aria-label={item.label}
            title={item.label}
            className={`w-10 h-10 flex items-center justify-center rounded-full border shadow-sm transition-all duration-200 active:scale-90 ${
              copiedId === item.id
                ? 'border-emerald-400 bg-emerald-50 text-emerald-600'
                : `border-charcoal-200 bg-white text-charcoal-600 ${item.color}`
            }`}
          >
            {copiedId === item.id ? <Check className="w-4 h-4" /> : item.icon}
          </button>
          {copiedId === item.id && (
            <span className="text-[9px] font-semibold text-emerald-600 animate-pulse whitespace-nowrap">Tersalin!</span>
          )}
        </div>
      ))}

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        aria-label="Salin tautan artikel"
        title="Salin tautan"
        className={`w-10 h-10 flex items-center justify-center rounded-full border shadow-sm transition-all duration-200 active:scale-90 ${
          copied
            ? 'border-emerald-400 bg-emerald-50 text-emerald-600'
            : 'border-charcoal-200 bg-white text-charcoal-600 hover:bg-primary-50 hover:border-primary-400 hover:text-primary-600'
        }`}
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>

      {copied && (
        <span className="text-[10px] font-semibold text-emerald-600 animate-pulse">Tersalin!</span>
      )}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: article, isLoading, isError } = useArticle(slug || '')
  const { data: products = [] } = useProducts()

  // SEO & Head Tags Inserter
  useEffect(() => {
    if (!article) return

    // Canonical URL always points to /articles/:slug regardless of arrival path
    const canonicalUrl = `https://kembangseladang.com/articles/${slug}`

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

    // 3. Canonical Link Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalTag)
    }
    canonicalTag.setAttribute('href', canonicalUrl)

    // 4. OpenGraph Social Tags
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
    setMetaTag('og:url', canonicalUrl)

    // 5. JSON-LD Schema Markup Injection
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl
      },
      'headline': article.title,
      'description': article.meta_description || article.excerpt,
      'image': article.cover_image ? [article.cover_image] : [],
      'datePublished': article.published_at || article.created_at,
      'dateModified': article.published_at || article.created_at,
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
      if (canonicalTag) canonicalTag.remove()
      if (scriptTag) scriptTag.remove()
    }
  }, [article, slug])

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

        {/* Body + Share Bar */}
        <div className="flex gap-6 items-start">
          {/* Share Bar — desktop sidebar (hidden on mobile) */}
          <div className="hidden md:flex flex-col items-center pt-10 sticky top-24 self-start">
            <ShareBar
              url={`https://kembangseladang.com/articles/${slug}`}
              title={article.title}
            />
          </div>

          {/* Article Body */}
          <div className="flex-1 bg-white p-6 sm:p-10 rounded-[2rem] border border-primary-100/40 shadow-sm">
            <MarkdownRenderer content={article.content} />
          </div>
        </div>

        {/* Share Bar — mobile inline row (hidden on desktop) */}
        <div className="md:hidden bg-white rounded-[1.5rem] border border-primary-100/40 shadow-sm px-6 py-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-charcoal-400 text-center mb-4">Bagikan Artikel Ini</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[
              { id: 'fb', label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://kembangseladang.com/articles/${slug}`)}`, color: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
              { id: 'tw', label: 'X / Twitter', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://kembangseladang.com/articles/${slug}`)}&text=${encodeURIComponent(article.title)}`, color: 'hover:bg-black hover:text-white hover:border-black', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
              { id: 'pin', label: 'Pinterest', href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://kembangseladang.com/articles/${slug}`)}&description=${encodeURIComponent(article.title)}`, color: 'hover:bg-[#E60023] hover:text-white hover:border-[#E60023]', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg> },
              { id: 'wa', label: 'WhatsApp', href: `https://api.whatsapp.com/send?text=${encodeURIComponent(article.title)}%20${encodeURIComponent(`https://kembangseladang.com/articles/${slug}`)}`, color: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366]', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg> },
            ].map((item) => (
              <a key={item.id} href={item.href} target="_blank" rel="noreferrer noopener" aria-label={item.label} title={item.label}
                className={`w-10 h-10 flex items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 bg-white shadow-sm transition-all duration-200 active:scale-90 ${item.color}`}>
                {item.icon}
              </a>
            ))}
          </div>
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

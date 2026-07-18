import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import { Article } from '../../hooks/useArticles'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface ArticleCardProps {
  article: Article
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const publishedDate = article.published_at 
    ? new Date(article.published_at) 
    : new Date(article.created_at)

  return (
    <article className="group bg-white rounded-3xl border border-primary-100/40 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 flex flex-col h-full">
      {/* Cover Image */}
      <Link to={`/articles/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-cream-50 select-none">
        {article.cover_image ? (
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-charcoal-400 text-5xl">
            📖
          </div>
        )}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-700 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg shadow-sm border border-primary-50">
          {article.category}
        </span>
      </Link>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Metadata */}
          <div className="flex items-center text-xs text-charcoal-400 space-x-2">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={publishedDate.toISOString()}>
              {format(publishedDate, 'dd MMMM yyyy', { locale: id })}
            </time>
          </div>

          {/* Title */}
          <Link to={`/articles/${article.slug}`} className="block">
            <h3 className="font-display text-lg font-bold text-charcoal-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-sm text-charcoal-500 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Read More Link */}
        <div className="pt-6 mt-6 border-t border-cream-100 flex items-center">
          <Link
            to={`/articles/${article.slug}`}
            className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 group-hover:translate-x-1 transition-all duration-300"
          >
            <span>Baca Selengkapnya</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}

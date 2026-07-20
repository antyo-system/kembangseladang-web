import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Send, Sparkles, Wand2, Truck } from 'lucide-react'

interface SlideItem {
  id: number
  title: string
  subtitle: string
  badge: string
  badgeIcon: React.ReactNode
  ctaText: string
  ctaLink: string
  image: string
  bgColor: string
}

export const PromoBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef<any>(null)

  const slides: SlideItem[] = [
    {
      id: 1,
      title: 'Rangkaian Bunga Segar & Premium',
      subtitle: 'Dibuat hand-made oleh florist profesional untuk merayakan setiap momen berharga Anda di Tangerang Selatan.',
      badge: 'Kembang Seladang Signature',
      badgeIcon: <Sparkles className="w-3.5 h-3.5 mr-1" />,
      ctaText: 'Pesan Rangkaian',
      ctaLink: 'https://wa.me/6287772636627?text=Halo%20Kak%20Priska%2C%20saya%20tertarik%20dengan%20rangkaian%20bunga%20Kembang%20Seladang.',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80',
      bgColor: 'from-pink-900/90 via-charcoal-900/80 to-charcoal-900/40'
    },
    {
      id: 2,
      title: 'Pengiriman Hari Yang Sama (Sameday)',
      subtitle: 'Butuh rangkaian bunga mendadak? Kami melayani pengiriman instant/sameday di wilayah Tangerang Selatan & sekitarnya.',
      badge: 'Layanan Express',
      badgeIcon: <Truck className="w-3.5 h-3.5 mr-1" />,
      ctaText: 'Pesan Cepat',
      ctaLink: 'https://wa.me/6287772636627?text=Halo%20Kak%20Priska%2C%20saya%20butuh%20order%20bunga%20cepat%20untuk%20dikirim%20hari%20ini.',
      image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=1200&q=80',
      bgColor: 'from-amber-900/90 via-charcoal-900/80 to-charcoal-900/40'
    },
    {
      id: 3,
      title: 'Custom Buket Sesuai Impianmu',
      subtitle: 'Diskusikan pilihan jenis bunga, kombinasi warna kertas wrapping, pita, hingga budget yang Anda inginkan.',
      badge: 'Layanan Kustom',
      badgeIcon: <Wand2 className="w-3.5 h-3.5 mr-1" />,
      ctaText: 'Konsultasi Gratis',
      ctaLink: 'https://wa.me/6287772636627?text=Halo%20Kak%20Priska%2C%20saya%20mau%20konsultasi%20custom%20order%20rangkaian%20bunga%20di%20Kembang%20Seladang.',
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80',
      bgColor: 'from-rose-950/90 via-charcoal-900/80 to-charcoal-900/40'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Handle auto-play
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(nextSlide, 5000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isHovered])

  return (
    <div
      className="relative w-full rounded-none overflow-hidden bg-charcoal-900 text-white shadow-xl border border-charcoal-100/10 group/banner"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Promotions and Announcements Banner"
    >
      {/* Slides Container */}
      <div className="relative h-[340px] sm:h-[380px] md:h-[400px] w-full overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-10000 ease-linear scale-105 group-hover/banner:scale-100"
              />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} md:via-charcoal-900/70 md:to-transparent`} />
              
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Content Panel */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 max-w-xl sm:max-w-2xl">
                <div className="space-y-4 sm:space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center glass-dark px-3 py-1.5 rounded-none border border-white/10 text-primary-250 text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
                    {slide.badgeIcon}
                    <span>{slide.badge}</span>
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white tracking-tight drop-shadow-sm">
                    {slide.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm md:text-base text-charcoal-200 font-medium leading-relaxed max-w-lg">
                    {slide.subtitle}
                  </p>

                  {/* CTA Button */}
                  <div className="pt-2 sm:pt-4">
                    <a
                      href={slide.ctaLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 sm:px-6 sm:py-3.5 rounded-none font-bold text-xs sm:text-sm shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 active:scale-98 transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span>{slide.ctaText}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation Arrows (visible on hover or focus) */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-none bg-charcoal-900/30 hover:bg-charcoal-900/60 border border-white/10 text-white/70 hover:text-white transition-all opacity-0 group-hover/banner:opacity-100 focus:opacity-100 cursor-pointer hidden sm:block focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-none bg-charcoal-900/30 hover:bg-charcoal-900/60 border border-white/10 text-white/70 hover:text-white transition-all opacity-0 group-hover/banner:opacity-100 focus:opacity-100 cursor-pointer hidden sm:block focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicator Bars */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 transition-all duration-300 cursor-pointer rounded-none ${
              index === currentSlide ? 'bg-primary-500 w-6 sm:w-8' : 'bg-white/40 w-3 sm:w-4 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-pressed={index === currentSlide}
          />
        ))}
      </div>
    </div>
  )
}

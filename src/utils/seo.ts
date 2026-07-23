export interface SEOOptions {
  title?: string
  description?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product'
  noindex?: boolean
  jsonLd?: Record<string, any>
}

const DEFAULT_TITLE = 'Kembang Seladang — Toko Bunga Terdekat & Florist Tangerang Selatan 24 Jam'
const DEFAULT_DESC = 'Kembang Seladang — Toko bunga terdekat di Rempoa, Ciputat, Bintaro, & Tangerang Selatan. Pesan buket mawar segar, standing flower, dan papan bunga 24 jam dengan pengiriman cepat.'
const SITE_DOMAIN = 'https://kembangseladang.com'
const DEFAULT_OG_IMAGE = `${SITE_DOMAIN}/logo.png`

/**
 * Dynamically updates document SEO head tags (title, meta description, OG tags, canonical link, JSON-LD, robots)
 */
export function updateSEOMetadata(options: SEOOptions) {
  if (typeof document === 'undefined') return

  const fullTitle = options.title
    ? (options.title.includes('Kembang Seladang') ? options.title : `${options.title} | Kembang Seladang`)
    : DEFAULT_TITLE

  const description = options.description || DEFAULT_DESC
  const canonical = options.canonicalUrl || `${SITE_DOMAIN}${window.location.pathname}`
  const ogImage = options.ogImage || DEFAULT_OG_IMAGE
  const ogType = options.ogType || 'website'

  // 1. Page Title
  document.title = fullTitle

  // 2. Meta Description
  let metaDesc = document.querySelector('meta[name="description"]')
  if (!metaDesc) {
    metaDesc = document.createElement('meta')
    metaDesc.setAttribute('name', 'description')
    document.head.appendChild(metaDesc)
  }
  metaDesc.setAttribute('content', description)

  // 3. OpenGraph Title
  let ogTitle = document.querySelector('meta[property="og:title"]')
  if (!ogTitle) {
    ogTitle = document.createElement('meta')
    ogTitle.setAttribute('property', 'og:title')
    document.head.appendChild(ogTitle)
  }
  ogTitle.setAttribute('content', fullTitle)

  // 4. OpenGraph Description
  let ogDesc = document.querySelector('meta[property="og:description"]')
  if (!ogDesc) {
    ogDesc = document.createElement('meta')
    ogDesc.setAttribute('property', 'og:description')
    document.head.appendChild(ogDesc)
  }
  ogDesc.setAttribute('content', description)

  // 5. OpenGraph Image
  let ogImg = document.querySelector('meta[property="og:image"]')
  if (!ogImg) {
    ogImg = document.createElement('meta')
    ogImg.setAttribute('property', 'og:image')
    document.head.appendChild(ogImg)
  }
  ogImg.setAttribute('content', ogImage)

  // 6. OpenGraph Type
  let ogTypeTag = document.querySelector('meta[property="og:type"]')
  if (!ogTypeTag) {
    ogTypeTag = document.createElement('meta')
    ogTypeTag.setAttribute('property', 'og:type')
    document.head.appendChild(ogTypeTag)
  }
  ogTypeTag.setAttribute('content', ogType)

  // 7. Canonical Tag
  let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!canonicalTag) {
    canonicalTag = document.createElement('link')
    canonicalTag.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalTag)
  }
  canonicalTag.setAttribute('href', canonical)

  // 8. Robots Meta Tag (Prevents Soft 404 indexing in Single Page App)
  let robotsTag = document.querySelector('meta[name="robots"]')
  if (options.noindex) {
    if (!robotsTag) {
      robotsTag = document.createElement('meta')
      robotsTag.setAttribute('name', 'robots')
      document.head.appendChild(robotsTag)
    }
    robotsTag.setAttribute('content', 'noindex, follow')
  } else if (robotsTag) {
    robotsTag.remove()
  }

  // 9. JSON-LD Structured Data
  let jsonLdScript = document.getElementById('dynamic-jsonld-schema') as HTMLScriptElement | null
  if (options.jsonLd) {
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script')
      jsonLdScript.id = 'dynamic-jsonld-schema'
      jsonLdScript.type = 'application/ld+json'
      document.head.appendChild(jsonLdScript)
    }
    jsonLdScript.text = JSON.stringify(options.jsonLd)
  } else if (jsonLdScript) {
    jsonLdScript.remove()
  }
}

/**
 * Returns Florist LocalBusiness JSON-LD schema for Kembang Seladang
 */
export function getFloristLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Florist',
    'name': 'Kembang Seladang - Toko Bunga & Florist Tangerang Selatan',
    'alternateName': 'Kembang Seladang Florist',
    'image': `${SITE_DOMAIN}/logo.png`,
    '@id': `${SITE_DOMAIN}/#store`,
    'url': SITE_DOMAIN,
    'telephone': '+6287772636627',
    'priceRange': 'Rp 50.000 - Rp 2.500.000',
    'hasMap': 'https://share.google/YxQVId3hVxgn9mInO',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Jl. Kepodang No.68, Rempoa',
      'addressLocality': 'Kota Tangerang Selatan',
      'addressRegion': 'Banten',
      'postalCode': '15412',
      'addressCountry': 'ID'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -6.2891,
      'longitude': 106.7608
    },
    'areaServed': [
      'Rempoa',
      'Ciputat Timur',
      'Ciputat',
      'Bintaro',
      'Serpong',
      'BSD City',
      'Tangerang Selatan',
      'Jakarta Selatan'
    ],
    'keywords': [
      'toko bunga terdekat',
      'toko bunga tangerang selatan',
      'florist rempoa',
      'buket bunga terdekat',
      'papan bunga tangerang selatan',
      'toko bunga ciputat'
    ],
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'opens': '07:00',
      'closes': '21:00'
    },
    'sameAs': [
      'https://kembangseladang.com',
      'https://share.google/YxQVId3hVxgn9mInO'
    ]
  }
}

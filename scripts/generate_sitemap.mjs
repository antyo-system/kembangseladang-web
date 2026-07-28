import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const SITE_URL = 'https://kembangseladang.com'

// Parse .env manually
let envText = ''
try { envText = fs.readFileSync('.env', 'utf8') } catch (e) {}
const envVars = {}
envText.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
  if (match) {
    const key = match[1].trim()
    let value = (match[2] || '').trim().replace(/^["']|["']$/g, '').trim()
    envVars[key] = value
  }
})

const supabaseUrl = envVars.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://emgqlsmzijdyceahuifg.supabase.co'
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtZ3Fsc216aWpkeWNlYWh1aWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MjE1MTgsImV4cCI6MjA5ODk5NzUxOH0.9hLQT4sEkgcfqGODjaEe5iqcS8B6TmJK2JiejxV65Ew'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const FALLBACK_ARTICLE_SLUGS = [
  '5-cara-merawat-bunga-mawar-wisuda-agar-awet-segar',
  'rekomendasi-warna-bunga-mawar-makna-dan-arti',
  'panduan-memilih-buket-bunga-ulang-tahun-terbaik',
  'tips-memilih-bunga-hantaran-dan-karangan-bunga-pernikahan',
  'bunga-meja-vs-hand-bouquet-pilihan-rangkaian-segar',
  'toko-bunga-terdekat-tangerang-selatan-rempoa',
  'toko-bunga-bintaro-serpong-terdekat-pengiriman-cepat',
  'rekomendasi-papan-bunga-dan-standing-flower-tangerang-selatan',
  'tips-memilih-buket-bunga-valentine-dan-anniversary-romantis',
  'rangkaian-bunga-meja-vas-kaca-dekorasi-ruang-tamu-kantor',
  'buket-bunga-wisuda-terbaik-tangerang-selatan-jakarta-selatan'
]

function escapeXml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function slugify(text = '') {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}


async function generateSitemapAndMerchantFeed() {
  console.log('🗺️ Generating dynamic sitemaps & Google Merchant RSS Feed for kembangseladang.com...')

  const today = new Date().toISOString().split('T')[0]
  const publicDir = path.join(process.cwd(), 'public')
  const prodImgDir = path.join(publicDir, 'images', 'products')

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  if (!fs.existsSync(prodImgDir)) {
    fs.mkdirSync(prodImgDir, { recursive: true })
  }

  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily', lastmod: today },
    { loc: `${SITE_URL}/products`, priority: '0.9', changefreq: 'daily', lastmod: today },
    { loc: `${SITE_URL}/katalog/buket-bunga-wisuda`, priority: '0.9', changefreq: 'daily', lastmod: today },
    { loc: `${SITE_URL}/katalog/buket-mawar-merah`, priority: '0.9', changefreq: 'daily', lastmod: today },
    { loc: `${SITE_URL}/katalog/papan-bunga-tangerang-selatan`, priority: '0.9', changefreq: 'daily', lastmod: today },
    { loc: `${SITE_URL}/katalog/bunga-meja-vas-kaca`, priority: '0.9', changefreq: 'daily', lastmod: today },
    { loc: `${SITE_URL}/articles`, priority: '0.9', changefreq: 'daily', lastmod: today },
    { loc: `${SITE_URL}/blog`, priority: '0.9', changefreq: 'daily', lastmod: today },
    { loc: `${SITE_URL}/about`, priority: '0.8', changefreq: 'monthly', lastmod: today },
    { loc: `${SITE_URL}/contact`, priority: '0.8', changefreq: 'monthly', lastmod: today },
    { loc: `${SITE_URL}/return-policy`, priority: '0.8', changefreq: 'monthly', lastmod: today },
    { loc: `${SITE_URL}/kebijakan-pengembalian`, priority: '0.8', changefreq: 'monthly', lastmod: today },
  ]

  // 1. Fetch live articles from Supabase
  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('slug, updated_at')
      .eq('status', 'published')

    if (!error && articles && articles.length > 0) {
      articles.forEach(art => {
        const lastmod = art.updated_at ? new Date(art.updated_at).toISOString().split('T')[0] : today
        urls.push({ loc: `${SITE_URL}/blog/${art.slug}`, priority: '0.8', changefreq: 'weekly', lastmod })
        urls.push({ loc: `${SITE_URL}/articles/${art.slug}`, priority: '0.8', changefreq: 'weekly', lastmod })
      })
    } else {
      FALLBACK_ARTICLE_SLUGS.forEach(slug => {
        urls.push({ loc: `${SITE_URL}/blog/${slug}`, priority: '0.8', changefreq: 'weekly', lastmod: today })
      })
    }
  } catch (e) {
    FALLBACK_ARTICLE_SLUGS.forEach(slug => {
      urls.push({ loc: `${SITE_URL}/blog/${slug}`, priority: '0.8', changefreq: 'weekly', lastmod: today })
    })
  }

  // 2. Fetch live products from Supabase
  let merchantItems = []
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && products && products.length > 0) {
      const liveProducts = products.filter(p => p.code !== 'SYS_FLASH_SALE_CONFIG' && p.is_live !== false)

      liveProducts.forEach(p => {
        const lastmod = p.updated_at ? new Date(p.updated_at).toISOString().split('T')[0] : today
        const prodSlug = (p.slug && p.slug.trim()) ? p.slug.trim() : (slugify(p.name) || p.id)
        urls.push({ loc: `${SITE_URL}/products/${prodSlug}`, priority: '0.7', changefreq: 'weekly', lastmod })

        // Process Image URL for Google Merchant Feed
        let imageUrl = `${SITE_URL}/logo.png`
        if (p.image) {
          if (p.image.startsWith('data:image')) {
            // Save base64 image as static JPEG/PNG file so Googlebot can crawl it!
            try {
              const base64Data = p.image.replace(/^data:image\/\w+;base64,/, '')
              const buffer = Buffer.from(base64Data, 'base64')
              const fileName = `prod_${p.id}.jpg`
              const filePath = path.join(prodImgDir, fileName)
              fs.writeFileSync(filePath, buffer)
              imageUrl = `${SITE_URL}/images/products/${fileName}`
              console.log(`📸 Converted Base64 image to static file for product: ${p.name} (${fileName})`)
            } catch (err) {
              console.warn(`Failed base64 conversion for ${p.id}:`, err.message)
            }
          } else if (p.image.startsWith('http')) {
            imageUrl = p.image
          } else if (p.image.startsWith('/')) {
            imageUrl = `${SITE_URL}${p.image}`
          }
        }

        const price = Math.round(Number(p.base_price) || 0)
        const title = p.name || 'Buket Bunga Segar Kembang Seladang'
        const description = p.description || `Beli ${title} segar berkualitas premium di Kembang Seladang. Pengiriman cepat untuk wilayah Rempoa, Ciputat, Bintaro, dan Tangerang Selatan.`

        merchantItems.push({
          id: p.id,
          title: escapeXml(title),
          description: escapeXml(description),
          link: `${SITE_URL}/products/${prodSlug}`,
          image_link: escapeXml(imageUrl),
          price: `${price} IDR`,
          availability: 'in_stock',
          condition: 'new',
          brand: 'Kembang Seladang',
          google_product_category: '632'
        })
      })
    }
  } catch (e) {
    console.warn('Could not fetch products for sitemap & feed:', e.message)
  }

  // 3. Generate XML Sitemap
  const xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  const txtSitemap = urls.map(u => u.loc).join('\n')

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xmlSitemap)
  fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), xmlSitemap)
  fs.writeFileSync(path.join(publicDir, 'sitemap.txt'), txtSitemap)
  console.log(`✅ Sitemaps generated: sitemap.xml, sitemap_index.xml, sitemap.txt (${urls.length} URLs included)`)

  // 4. Generate Google Merchant Center RSS 2.0 XML Feed
  const merchantXmlFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Kembang Seladang — Florist &amp; Toko Bunga Tangerang Selatan</title>
    <link>${SITE_URL}</link>
    <description>Katalog Rangkaian Bunga Segar, Buket Mawar, Standing Flower, dan Karangan Bunga Kembang Seladang</description>
${merchantItems.map(item => `    <item>
      <g:id>${item.id}</g:id>
      <title>${item.title}</title>
      <description>${item.description}</description>
      <link>${item.link}</link>
      <g:image_link>${item.image_link}</g:image_link>
      <g:availability>${item.availability}</g:availability>
      <g:price>${item.price}</g:price>
      <g:condition>${item.condition}</g:condition>
      <g:brand>${item.brand}</g:brand>
      <g:google_product_category>${item.google_product_category}</g:google_product_category>
      <g:identifier_exists>no</g:identifier_exists>
      <g:pickup_method>buy</g:pickup_method>
      <g:pickup_SLA>same_day</g:pickup_SLA>
      <g:shipping>
        <g:country>ID</g:country>
        <g:service>Kurir Florist Tangerang Selatan</g:service>
        <g:price>0 IDR</g:price>
      </g:shipping>
    </item>`).join('\n')}
  </channel>
</rss>`

  fs.writeFileSync(path.join(publicDir, 'google-merchant-feed.xml'), merchantXmlFeed)
  fs.writeFileSync(path.join(publicDir, 'feed.xml'), merchantXmlFeed)
  fs.writeFileSync(path.join(publicDir, 'products-feed.xml'), merchantXmlFeed)
  console.log(`🛍️ Google Merchant Feed generated: google-merchant-feed.xml (${merchantItems.length} products included)`)
}

generateSitemapAndMerchantFeed().catch(console.error)

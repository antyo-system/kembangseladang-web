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
  'bunga-meja-vs-hand-bouquet-pilihan-rangkaian-segar'
]

async function generateSitemap() {
  console.log('🗺️ Generating dynamic sitemaps (XML & TXT) for kembangseladang.com...')

  const today = new Date().toISOString().split('T')[0]

  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily', lastmod: today },
    { loc: `${SITE_URL}/products`, priority: '0.9', changefreq: 'daily', lastmod: today },
    { loc: `${SITE_URL}/articles`, priority: '0.9', changefreq: 'daily', lastmod: today },
    { loc: `${SITE_URL}/blog`, priority: '0.9', changefreq: 'daily', lastmod: today },
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
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('id, updated_at')

    if (!error && products && products.length > 0) {
      products.forEach(p => {
        const lastmod = p.updated_at ? new Date(p.updated_at).toISOString().split('T')[0] : today
        urls.push({ loc: `${SITE_URL}/products/${p.id}`, priority: '0.7', changefreq: 'weekly', lastmod })
      })
    }
  } catch (e) {
    console.warn('Could not fetch products for sitemap:', e.message)
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  // Generate Plain TXT Sitemap (1 URL per line, Google GSC native)
  const txt = urls.map(u => u.loc).join('\n')

  const publicDir = path.join(process.cwd(), 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml)
  fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), xml)
  fs.writeFileSync(path.join(publicDir, 'sitemap.txt'), txt)
  console.log(`✅ Sitemaps generated: sitemap.xml, sitemap_index.xml, sitemap.txt (${urls.length} URLs included)`)
}

generateSitemap().catch(console.error)

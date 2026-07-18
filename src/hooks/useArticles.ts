import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image?: string
  category: string
  tags: string[]
  status: string
  published_at?: string
  author: string
  created_at: string
}

const MOCK_ARTICLES: Article[] = [
  {
    id: 'mock-1',
    slug: 'tips-merawat-bunga-mawar-agar-awet',
    title: '5 Cara Mudah Merawat Rangkaian Bunga Mawar di Rumah',
    excerpt: 'Ingin buket bunga mawar Anda bertahan segar lebih lama? Ikuti panduan praktis dari florist kami agar mawar tetap cantik hingga 2 minggu.',
    content: `
# 5 Cara Mudah Merawat Rangkaian Bunga Mawar di Rumah

Menerima hadiah buket bunga mawar selalu mendatangkan kebahagiaan. Namun, seringkali kita bingung bagaimana cara merawatnya agar keindahan tersebut tidak cepat layu. 

Sebagai salah satu toko bunga premium di Tangerang Selatan, **Kembang Seladang** membagikan tips rahasia agar bunga mawar potong Anda tetap segar, harum, dan tegak berdiri hingga 10-14 hari:

## 1. Gunakan Wadah Bersih dan Air Dingin
Sebelum memasukkan bunga ke dalam vas, pastikan vas telah dicuci bersih dengan sabun. Kuman yang tertinggal di vas adalah musuh utama kesegaran bunga. Isi vas dengan air dingin bersih sekitar setengah tinggi wadah.

## 2. Potong Batang Secara Miring
Potong batang mawar sekitar 1-2 cm dari ujung bawah dengan sudut 45 derajat. Gunakan pisau tajam atau gunting khusus bunga, hindari gunting biasa karena dapat merusak pembuluh batang. Pemotongan miring memperluas area penyerapan air.

## 3. Bersihkan Daun Bagian Bawah
Daun-daun yang terendam air akan cepat membusuk dan memicu pertumbuhan bakteri. Buang semua daun yang posisinya berada di bawah batas permukaan air vas.

## 4. Ganti Air Setiap Dua Hari
Air bersih adalah kunci kelangsungan hidup bunga potong. Ganti air vas Anda setiap 2 hari sekali, dan lakukan pemotongan ulang batang secara miring sekitar 0.5 cm untuk membuka kembali pori-pori batang.

## 5. Hindari Sinar Matahari Langsung dan Kipas Angin
Letakkan mawar Anda di area yang sejuk. Hindari menaruh bunga dekat jendela yang terkena sinar matahari terik, di atas perangkat elektronik yang panas, atau tepat di bawah hembusan AC/kipas angin karena akan mempercepat penguapan kadar air pada kelopak bunga.

Selamat mencoba! Jika Anda butuh rangkaian mawar segar terbaik untuk momen spesial Anda, jangan ragu untuk menghubungi tim florist Kembang Seladang.
    `,
    cover_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    category: 'Tips & Trik',
    tags: ['Mawar', 'Merawat Bunga', 'Tips Florist'],
    status: 'published',
    published_at: new Date('2026-07-10').toISOString(),
    author: 'Admin Kembang Seladang',
    created_at: new Date('2026-07-10').toISOString()
  },
  {
    id: 'mock-2',
    slug: 'inspirasi-bunga-pernikahan-modern',
    title: 'Tren Bunga Pernikahan Modern: Dari Elegan hingga Minimalis',
    excerpt: 'Pilih rangkaian bunga pernikahan yang merepresentasikan cinta Anda. Cari tahu tren buket pengantin dan dekorasi altar terpopuler tahun ini.',
    content: `
# Tren Bunga Pernikahan Modern: Dari Elegan hingga Minimalis

Pernikahan adalah momen sekali seumur hidup yang keindahannya selalu ingin dikenang. Salah satu elemen visual terpenting yang menentukan nuansa romantis hari bahagia Anda adalah pilihan rangkaian bunga.

Tahun ini, tren bunga pernikahan bergeser ke arah kombinasi warna natural dan desain yang lebih berani. Berikut adalah beberapa inspirasi bunga pernikahan modern terpopuler versi **Kembang Seladang**:

## 1. Hand Bouquet Monokromatik
Gaya buket tangan dengan satu jenis bunga dan satu warna (misalnya, full mawar putih dengan sedikit daun eucalyptus) kembali menjadi favorit. Tampilan monokromatik memberikan kesan elegan, bersih, dan mewah secara instan.

## 2. Palet Warna Terakota dan Peach
Selain merah muda klasik, warna-warna hangat seperti peach, salmon, terakota, dan sentuhan aprikot sedang sangat diminati. Warna ini memberikan kesan hangat, hangat, dan sangat indah saat difoto, cocok untuk tema pernikahan luar ruangan (outdoor/garden party).

## 3. Sentuhan Bunga Kering (Dried Flowers)
Memadukan bunga segar dengan bunga kering seperti pampas grass, baby's breath kering, atau daun palem kering memberikan tekstur bohemian-chic yang estetik dan unik.

## 4. Instalasi Altar Asimetris
Dekorasi pelaminan tidak lagi kaku berbentuk persegi panjang. Tren saat ini adalah lengkungan bunga melingkar (floral arch) yang asimetris, memberikan kesan natural layaknya taman bunga liar yang tumbuh alami.

Konsultasikan kebutuhan bunga pernikahan Anda bersama **Kembang Seladang** untuk hasil dekorasi yang memukau dan sesuai anggaran. Hubungi kami lewat WhatsApp untuk portofolio selengkapnya!
    `,
    cover_image: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&q=80&w=800',
    category: 'Inspirasi',
    tags: ['Wedding', 'Hand Bouquet', 'Dekorasi'],
    status: 'published',
    published_at: new Date('2026-07-15').toISOString(),
    author: 'Admin Kembang Seladang',
    created_at: new Date('2026-07-15').toISOString()
  }
]

export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false })

        if (error) {
          console.warn('Fallback to mock articles due to database access:', error.message)
          return MOCK_ARTICLES
        }

        if (!data || data.length === 0) {
          return MOCK_ARTICLES
        }

        return data as Article[]
      } catch (err) {
        console.warn('Fallback to mock articles due to network exception:', err)
        return MOCK_ARTICLES
      }
    }
  })
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .single()

        if (error) {
          const mock = MOCK_ARTICLES.find(a => a.slug === slug)
          if (mock) return mock
          throw error
        }

        return data as Article
      } catch (err) {
        const mock = MOCK_ARTICLES.find(a => a.slug === slug)
        if (mock) return mock
        throw err
      }
    },
    enabled: !!slug
  })
}

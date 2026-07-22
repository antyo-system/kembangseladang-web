import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export interface Article {
  id: string
  slug: string
  title: string
  meta_title?: string
  meta_description?: string
  focus_keyword?: string
  excerpt: string
  content: string
  cover_image?: string
  cover_image_alt?: string
  category: string
  tags: string[]
  status: string
  published_at?: string
  author?: string
  author_name?: string
  reading_time_minutes?: number
  related_product_ids?: string[]
  views_count?: number
  created_at: string
}

export const INITIAL_SEO_ARTICLES: Article[] = [
  {
    id: 'seo-art-1',
    slug: '5-cara-merawat-bunga-mawar-wisuda-agar-awet-segar',
    title: '5 Cara Merawat Bunga Mawar Wisuda Agar Awet & Tetap Segar Berhari-Hari',
    meta_title: '5 Cara Merawat Bunga Mawar Wisuda Agar Awet & Segar | Kembang Seladang',
    meta_description: 'Panduan praktis merawat buket mawar wisuda dari florist Kembang Seladang agar tetap indah, harum, dan tidak cepat layu di rumah.',
    focus_keyword: 'merawat bunga mawar wisuda',
    excerpt: 'Menerima buket mawar wisuda? Ikuti 5 tips rahasia dari florist profesional agar bunga mawar kesayangan Anda tetap indah dan awet hingga 2 minggu.',
    cover_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
    cover_image_alt: 'Buket Bunga Mawar Wisuda Segar Kembang Seladang',
    category: 'Tips & Trik',
    tags: ['mawar', 'wisuda', 'merawat bunga', 'buket mawar', 'tips florist'],
    author_name: 'Tim Florist Kembang Seladang',
    reading_time_minutes: 4,
    status: 'published',
    published_at: new Date('2026-07-20T08:00:00Z').toISOString(),
    views_count: 142,
    created_at: new Date('2026-07-20T08:00:00Z').toISOString(),
    content: `# 5 Cara Merawat Bunga Mawar Wisuda Agar Awet & Tetap Segar Berhari-Hari

Momen wisuda adalah salah satu pencapaian paling membanggakan dalam hidup. Menghadiahkan buket mawar segar menjadi bentuk apresiasi terbaik untuk merayakan momen bahagia tersebut. Namun, masalah umum yang sering dihadapi adalah bunga mawar potong yang cepat layu dalam 2-3 hari jika tidak dirawat dengan benar.

Sebagai **toko bunga profesional Kembang Seladang**, kami membagikan 5 langkah praktis merawat buket bunga mawar wisuda Anda agar tetap mekar anggun, segar, dan harum hingga 10-14 hari di rumah:

---

## 1. Segera Buka Pembungkus (Wrapper) & Potong Batang Miring 45 Derajat

Setelah sesi foto wisuda selesai, segera buka kertas pembungkus (*wrapper*) buket mawar Anda. Potong bagian ujung bawah batang bunga sekitar **1-2 cm secara miring dengan sudut 45 derajat**. 

> **Tips Florist:** Gunakan pisau tajam atau gunting khusus bunga. Pemotongan miring memperluas permukaan serapan air sehingga bunga mawar dapat minum air secara optimal.

---

## 2. Gunakan Vas Bersih dan Air Dingin

Kebersihan wadah adalah kunci utama daya tahan bunga potong. Cuci vas bunga Anda menggunakan sabun hingga bebas dari bakteri. Isi vas dengan **air dingin bersih (sekitar setengah tinggi vas)**. Hindari menggunakan air hangat atau air mendidih karena dapat merusak sel batang mawar.

---

## 3. Bersihkan Daun Bagian Bawah Batang

Buang seluruh daun yang posisinya berada di bawah batas permukaan air vas. Daun yang terendam air akan mengalami pembusukan dan memicu perkembangbiakan bakteri yang menyumbat saluran air pada batang mawar.

---

## 4. Ganti Air Vas Setiap 2 Hari & Trim Batang Berkala

Air tenang yang tidak diganti adalah sarang mikroorganisme. Gantilah air vas setiap 2 hari sekali. Setiap kali mengganti air, potong kembali ujung batang mawar sekitar **0.5 cm** untuk membuka kembali pori-pori serapan air yang mulai tertutup.

---

## 5. Jauhkan dari Sinar Matahari Langsung & AC Terik

Letakkan vas mawar Anda di area ruangan yang sejuk dan berventilasi baik. Hindari meletakkan bunga di:
- Bawah sinar matahari terik langsung dari jendela.
- Dekat perangkat elektronik yang mengeluarkan hawa panas (TV/Kulkas).
- Tepat di bawah hembusan pendingin ruangan (AC) atau kipas angin karena akan mempercepat penguapan air dari kelopak bunga.

---

### Siap Menghadiahkan Buket Mawar Premium untuk Wisuda Berikutnya?
Jelajahi berbagai pilihan **hand bouquet mawar segar** buatan florist ahli kami di **Kembang Seladang**. Kami menyediakan pilihan warna mawar lengkap dari merah, pink, putih, kuning, hingga peach.`
  },
  {
    id: 'seo-art-2',
    slug: 'rekomendasi-warna-bunga-mawar-makna-dan-arti',
    title: 'Rekomendasi Warna Bunga Mawar untuk Momen Spesial: Makna & Arti Setiap Warna',
    meta_title: 'Arti & Makna Warna Bunga Mawar untuk Hadiah Spesial | Kembang Seladang',
    meta_description: 'Jangan salah pilih! Pelajari arti warna bunga mawar merah, pink, putih, kuning, hingga peach sebelum memesan buket bunga untuk pasangan atau sahabat.',
    focus_keyword: 'arti warna bunga mawar',
    excerpt: 'Setiap warna mawar memiliki pesan tersirat. Simak arti warna mawar merah, pink, putih, hingga peach agar hadiah buket Anda semakin berkesan.',
    cover_image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1200',
    cover_image_alt: 'Variasi Warna Bunga Mawar Segar Kembang Seladang',
    category: 'Inspirasi Bunga',
    tags: ['arti bunga mawar', 'mawar merah', 'mawar pink', 'hadiah valentine', 'buket bunga'],
    author_name: 'Tim Florist Kembang Seladang',
    reading_time_minutes: 5,
    status: 'published',
    published_at: new Date('2026-07-21T09:30:00Z').toISOString(),
    views_count: 98,
    created_at: new Date('2026-07-21T09:30:00Z').toISOString(),
    content: `# Rekomendasi Warna Bunga Mawar untuk Momen Spesial: Makna & Arti Setiap Warna

Bunga mawar selalu menjadi simbol bahasa kalbu yang abadi. Namun, tahukah Anda bahwa **setiap warna bunga mawar menyimpan makna dan pesan emosional yang berbeda**? Salah memilih warna bisa menyampaikan pesan yang kurang tepat bagi si penerima.

Di **Kembang Seladang**, kami menyediakan 8 warna mawar segar pilihan premium. Berikut panduan lengkap arti warna bunga mawar agar hadiah Anda terasa pas dan berkesan:

---

## 1. Mawar Merah (Red Roses): Cinta Membara & Romansa Sejati

Mawar merah adalah simbol romansa paling klasik dan universal. Warna merah pekat melambangkan **cinta yang mendalam, hasrat, keberanian, dan rasa kagum**.
- **Cocok untuk:** Momen anniversary pernikahan, lamaran, Valentine, atau kejutan ulang tahun pasangan.

---

## 2. Mawar Pink / Merah Muda: Kelembutan, Rasa Syukur & Kasih Sayang

Mawar pink menyampaikan nuansa manis, kelembutan, dan apresiasi yang tulus. 
- **Pink Muda (Soft Pink):** Melambangkan rasa kagum dan kelembutan hati.
- **Pink Tua (Deep Pink):** Melambangkan rasa terima kasih dan penghargaan tinggi.
- **Cocok untuk:** Hadiah ulang tahun sahabat, ungkapan terima kasih untuk Ibu, atau ucapan selamat wisuda.

---

## 3. Mawar Putih (White Roses): Kesucian, Harapan Baru & Kedamaian

Mawar putih melambangkan **kemurnian hati, kepolosan, dan awal perjalanan baru yang suci**.
- **Cocok untuk:** Rangkaian bunga pernikahan (*wedding bouquet*), momen duka cita, atau perayaan pembukaan bisnis baru.

---

## 4. Mawar Peach & Apricot: Kehangatan, Keakraban & Ketulusan

Mawar warna peach memancarkan kesan hangat, manis, dan bersahaja. Bunga ini sering melambangkan ketulusan janji dan rasa syukur atas hubungan yang terjalin erat.
- **Cocok untuk:** Hadiah untuk rekan kerja, kado kelulusan, atau ungkapan apresiasi untuk sahabat dekat.

---

## 5. Mawar Kuning (Yellow Roses): Persahabatan, Keceriaan & Semangat Baru

Warna kuning cerah membawa energi positif, keceriaan, dan persahabatan sejati.
- **Cocok untuk:** Memberikan semangat pada teman yang sedang sakit, kado ulang tahun sahabat, atau perayaan keberhasilan karir.

---

### Konsultasikan Buket Mawar Custom Anda bersama Kembang Seladang
Ingin mengombinasikan 2 warna mawar sekaligus dalam 1 buket (*Mixed Roses*)? **Kembang Seladang** siap merangkai mawar custom sesuai keinginan dan makna yang ingin Anda sampaikan.`
  },
  {
    id: 'seo-art-3',
    slug: 'panduan-memilih-buket-bunga-ulang-tahun-terbaik',
    title: 'Panduan Memilih Buket Bunga Ulang Tahun: Rekomendasi Jenis Bunga & Rangkaian Terbaik',
    meta_title: 'Panduan Memilih Buket Bunga Ulang Tahun Terbaik | Kembang Seladang',
    meta_description: 'Cari hadiah ulang tahun yang istimewa? Temukan rekomendasi jenis bunga dan gaya buket yang cocok untuk pacar, istri, maupun sahabat tercinta.',
    focus_keyword: 'buket bunga ulang tahun',
    excerpt: 'Bingung memilih kado buket ulang tahun? Berikut tips memilih kombinasi bunga segar, kertas wrapper, dan kartu ucapan yang dijamin berkesan.',
    cover_image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=1200',
    cover_image_alt: 'Buket Bunga Ulang Tahun Premium Kembang Seladang',
    category: 'Panduan Perawatan',
    tags: ['buket ulang tahun', 'kado ultah', 'bunga segar', 'hand bouquet', 'toko bunga'],
    author_name: 'Tim Florist Kembang Seladang',
    reading_time_minutes: 4,
    status: 'published',
    published_at: new Date('2026-07-21T14:15:00Z').toISOString(),
    views_count: 85,
    created_at: new Date('2026-07-21T14:15:00Z').toISOString(),
    content: `# Panduan Memilih Buket Bunga Ulang Tahun: Rekomendasi Jenis Bunga & Rangkaian Terbaik

Ulang tahun adalah momen istimewa untuk merayakan bertambahnya usia dan kebahagiaan orang yang kita sayangi. Menghadiahkan **buket bunga segar** bukan sekadar memberi barang, tetapi menyampaikan bentuk perhatian dan kasih sayang secara personal.

Berikut adalah panduan dari tim florist **Kembang Seladang** untuk memilih rangkaian buket bunga ulang tahun yang tepat bagi setiap penerima:

---

## 1. Untuk Pasangan (Istri / Pacar): Buket Mawar Premium Monokromatik

Untuk pasangan tercinta, buket bunga mawar merah pekat atau kombinasi mawar pink manis dalam wadah kertas wrapping Korean-style selalu menjadi pilihan favorit.
- **Rekomendasi:** 10 atau 20 tangkai Mawar Merah Premium dengan aksen pemanis daun pita satin elegan.

---

## 2. Untuk Sahabat / Teman Dekat: Buket Mawar Mixed Ceria

Beri kejutan ulang tahun yang meriah untuk sahabat Anda dengan perpaduan warna mawar yang ceria seperti kuning, peach, dan putih.
- **Rekomendasi:** Rangkaian mawar mixed (*multi-color*) yang memberikan nuansa hangat, ceria, dan penuh energi positif.

---

## 3. Untuk Ibu / Orang Tua: Rangkaian Bunga Meja Vas Kaca

Untuk orang tua tercinta, rangkaian **bunga meja segar dalam vas kaca** sangat cocok karena praktis diletakkan langsung di meja tamu atau ruang keluarga tanpa perlu repot mencari vas di rumah.

---

## 4. Tambahkan Kartu Ucapan Personal

Sentuhan akhir yang paling penting adalah **kartu ucapan (greeting card)** yang berisi doa dan harapan tulus Anda. Di **Kembang Seladang**, setiap pemesanan buket bunga sudah termasuk *custom printed card* secara gratis.

---

### Pesan Buket Bunga Ulang Tahun Anda Hari Ini di Kembang Seladang
Kami menyediakan layanan pengiriman cepat, bunga segar kualitas terjamin, serta garansi ketepatan waktu antaran.`
  },
  {
    id: 'seo-art-4',
    slug: 'tips-memilih-bunga-hantaran-dan-karangan-bunga-pernikahan',
    title: 'Tips Memilih Bunga Hantaran & Papan Karangan Bunga Pernikahan Elegan',
    meta_title: 'Tips Memilih Bunga Hantaran & Dekorasi Pernikahan Elegan | Kembang Seladang',
    meta_description: 'Inspirasi rangkaian bunga hantaran nikah dan papan bunga ucapan pernikahan yang mewah, tahan lama, dan berkesan untuk momen bahagia.',
    focus_keyword: 'bunga hantaran pernikahan',
    excerpt: 'Bunga hantaran pernikahan menjadi simbol keindahan momen sakral. Simak tips memilih perpaduan warna dan jenis bunga hantaran yang elegan.',
    cover_image: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&q=80&w=1200',
    cover_image_alt: 'Bunga Hantaran Pernikahan Elegan Kembang Seladang',
    category: 'Rangkaian & Hand Bouquet',
    tags: ['hantaran nikah', 'bunga pernikahan', 'karangan bunga', 'wedding bouquet', 'florist'],
    author_name: 'Tim Florist Kembang Seladang',
    reading_time_minutes: 5,
    status: 'published',
    published_at: new Date('2026-07-22T10:00:00Z').toISOString(),
    views_count: 67,
    created_at: new Date('2026-07-22T10:00:00Z').toISOString(),
    content: `# Tips Memilih Bunga Hantaran & Papan Karangan Bunga Pernikahan Elegan

Pernikahan adalah penyatuan dua insan manusia dalam ikatan suci. Bunga memegang peranan krusial sebagai elemen visual utama, baik sebagai buket tangan pengantin (*bride hand bouquet*), rangkaian seserahan/hantaran nikah, maupun papan karangan bunga ucapan selamat.

Berikut tips memilih bunga hantaran dan karangan pernikahan yang elegan dari **Kembang Seladang**:

---

## 1. Disesuaikan dengan Tema & Palet Warna Pernikahan

Sebelum menentukan jenis bunga, pastikan Anda mengetahui tema dekorasi pesta nikah:
- **Tema Traditional / Classic:** Mawar merah pekat, mawar putih, dan melati.
- **Tema Modern Garden / Bohemian:** Mawar peach, pastel pink, dan aksen dedaunan hijau alami.

---

## 2. Pilih Bunga Potong dengan Kualitas Freshness Tinggi

Bunga hantaran dan buket pengantin akan digunakan sepanjang hari dari prosesi akad hingga resepsi. Pastikan florist Anda menggunakan bunga potong yang baru saja dipanen untuk mencegah kelopak terkulai di tengah acara.

---

## 3. Ukuran Proporsional & Nyaman Digenggam

Untuk buket pengantin (*wedding hand bouquet*), pastikan pegangan batang dilapisi pita satin yang lembut dan ukurannya tidak terlalu berat agar nyaman dibawa oleh sang pengantin wanita sepanjang hari.

---

### Konsultasi Gratis Bunga Pernikahan bersama Florist Kembang Seladang
Tim profesional kami siap membantu Anda merancang buket pengantin, bunga meja resepsi, hingga papan karangan bunga ucapan pernikahan yang anggun dan berkelas.`
  },
  {
    id: 'seo-art-5',
    slug: 'bunga-meja-vs-hand-bouquet-pilihan-rangkaian-segar',
    title: 'Bunga Meja vs Hand Bouquet: Mana Rangkaian Bunga Segar yang Tepat untuk Ruangan Anda?',
    meta_title: 'Bunga Meja vs Hand Bouquet: Pilihan Rangkaian Bunga Segar Terbaik',
    meta_description: 'Bandingkan keunggulan bunga meja vas untuk dekorasi ruangan dan buket tangan untuk kado apresiasi. Temukan pilihan terbaik di Kembang Seladang.',
    focus_keyword: 'rangkaian bunga meja segar',
    excerpt: 'Apakah Anda butuh dekorasi vas meja atau buket tangan yang praktis? Pelajari perbedaan serta keunggulan masing-masing tipe rangkaian bunga.',
    cover_image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?auto=format&fit=crop&q=80&w=1200',
    cover_image_alt: 'Rangkaian Bunga Meja Segar Kembang Seladang',
    category: 'Promo & Event',
    tags: ['bunga meja', 'hand bouquet', 'dekorasi ruangan', 'bunga vas', 'kembang seladang'],
    author_name: 'Tim Florist Kembang Seladang',
    reading_time_minutes: 4,
    status: 'published',
    published_at: new Date('2026-07-22T16:45:00Z').toISOString(),
    views_count: 110,
    created_at: new Date('2026-07-22T16:45:00Z').toISOString(),
    content: `# Bunga Meja vs Hand Bouquet: Mana Rangkaian Bunga Segar yang Tepat untuk Ruangan Anda?

Ketika ingin memesan bunga segar di toko florist, dua jenis rangkaian yang paling populer adalah **Hand Bouquet (Buket Tangan)** dan **Bunga Meja (Table Flower)**. Kedua jenis rangkaian ini memiliki fungsi dan estetika yang berbeda.

Simak perbandingan lengkap dari **Kembang Seladang** untuk menentukan tipe mana yang paling tepat sesuai kebutuhan Anda:

---

## 1. Hand Bouquet (Buket Tangan)
Rangkaian bunga segar yang dibungkus rapi dengan kertas *wrapping* premium dan diikat pita cantik.
- **Kelebihan:** Sangat berkesan saat diserahkan secara langsung secara personal, estetik untuk difoto (*photogenic*).
- **Cocok untuk:** Momen wisuda, kado ulang tahun, hadiah romantis Valentine, atau ucapan selamat.

---

## 2. Bunga Meja (Table Arrangement)
Rangkaian bunga segar yang sudah ditata rapi dalam wadah vas kaca, keranjang, atau *oasis floral foam*.
- **Kelebihan:** Siap pajang instan tanpa perlu repot mencari vas di rumah, air di wadah menjaga kesegaran bunga lebih stabil.
- **Cocok untuk:** Hiasan meja tamu, ruang kerja kantor, kado *housewarming* rumah baru, atau ucapan duka cita.

---

### Dapatkan Rangkaian Bunga Segar Terbaik di Kembang Seladang
Baik Hand Bouquet maupun Bunga Meja, **Kembang Seladang** menjamin kesegaran kuntum mawar premium dengan harga terjangkau dan pengiriman aman.`
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

        if (error || !data || data.length === 0) {
          return INITIAL_SEO_ARTICLES
        }

        return data as Article[]
      } catch (err) {
        return INITIAL_SEO_ARTICLES
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

        if (error || !data) {
          const found = INITIAL_SEO_ARTICLES.find(a => a.slug === slug)
          if (found) return found
          throw error || new Error('Article not found')
        }

        return data as Article
      } catch (err) {
        const found = INITIAL_SEO_ARTICLES.find(a => a.slug === slug)
        if (found) return found
        throw err
      }
    },
    enabled: !!slug
  })
}

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
  },
  {
    id: 'seo-art-6',
    slug: 'toko-bunga-terdekat-tangerang-selatan-rempoa',
    title: 'Toko Bunga Terdekat di Tangerang Selatan & Rempoa: Pesan Buket & Rangkaian Segar',
    meta_title: 'Toko Bunga Terdekat Rempoa & Tangerang Selatan | Kembang Seladang',
    meta_description: 'Cari toko bunga terdekat di Rempoa, Ciputat, Bintaro, & Tangerang Selatan? Kembang Seladang melayani pesanan buket mawar segar, papan bunga, dan standing flower dengan pengiriman cepat.',
    focus_keyword: 'toko bunga terdekat',
    excerpt: 'Mencari toko bunga terdekat dengan pilihan mawar segar, buket wisuda, dan karangan papan bunga? Simak keunggulan layanan florist Kembang Seladang Rempoa Tangerang Selatan.',
    cover_image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=1200',
    cover_image_alt: 'Toko Bunga Terdekat Kembang Seladang Rempoa Tangerang Selatan',
    category: 'Toko Bunga & Florist',
    tags: ['toko bunga terdekat', 'florist tangerang selatan', 'florist rempoa', 'buket mawar', 'papan bunga', 'toko bunga ciputat'],
    author_name: 'Tim Florist Kembang Seladang',
    reading_time_minutes: 5,
    status: 'published',
    published_at: new Date('2026-07-23T10:00:00Z').toISOString(),
    views_count: 210,
    created_at: new Date('2026-07-23T10:00:00Z').toISOString(),
    content: `# Toko Bunga Terdekat di Tangerang Selatan & Rempoa: Pesan Buket & Rangkaian Segar

Saat membutuhkan hadiah kejutan ulang tahun, ucapan selamat wisuda, atau ucapan duka cita mendadak, menemukan **toko bunga terdekat** yang responsif, menyediakan bunga potong segar kualitas terbaik, dan melayani pengiriman cepat adalah kunci utama.

**Kembang Seladang** hadir sebagai solusi utama **florist & toko bunga terdekat** yang berlokasi strategis di **Jl. Kepodang No.68, Rempoa, Kecamatan Ciputat Timur, Kota Tangerang Selatan**. Kami melayani area pengiriman cepat untuk Rempoa, Ciputat, Bintaro, Serpong, BSD City, hingga wilayah Jakarta Selatan.

---

## Mengapa Memilih Kembang Seladang Sebagai Toko Bunga Terdekat Anda?

### 1. Bunga Potong Fresh Langsung dari Petani
Setiap kuntum mawar, lily, tulip, dan hortensia yang kami rangkai dipilah secara ketat setiap pagi. Kami menjamin kesegaran bunga tetap tahan mekar hingga 7–14 hari di rumah Anda.

### 2. Layanan Pengiriman Cepat 1–2 Jam Sampai
Butuh buket bunga dadakan untuk acara hari ini? Tim kurir internal kami siap mengantarkan buket bunga tangan (*hand bouquet*) maupun *standing flower* langsung ke lokasi penerima dalam hitungan jam dengan garansi kesegaran bunga tetap terjaga.

### 3. Pemesanan Praktis Online & Konsultasi WhatsApp Respon Cepat
Anda tidak perlu repot keluar rumah atau terjebak macet. Cukup pilih katalog di **kembangseladang.com** atau konsultasikan kebutuhan desain buket custom Anda langsung dengan tim florist profesional kami melalui WhatsApp **0877-7263-6627**.

---

## Rangkaian Bunga Unggulan di Toko Bunga Kembang Seladang

1. **Buket Mawar Segar (Hand Bouquet):** Tersedia mawar merah, pink sweet, putih, peach, kuning, dan ungu untuk momen wisuda, Valentine, dan anniversary.
2. **Bunga Meja & Vas Kaca:** Dekorasi meja tamu dan kantor elegan yang praktis tanpa repot menata vas.
3. **Standing Flower & Papan Bunga:** Ucapan duka cita (*sympathy flower*), *Grand Opening*, serta selamat pernikahan (*Congratulations*).

---

## Lokasi Toko & Alamat Google Maps

- **Nama Toko:** Kembang Seladang Florist
- **Alamat:** Jl. Kepodang No.68, Rempoa, Kec. Ciputat Tim., Kota Tangerang Selatan, Banten 15412
- **Jam Operasional:** 07:00 – 21:00 WIB (Buka Setiap Hari)
- **WhatsApp:** [0877-7263-6627 (Priska)](https://wa.me/6287772636627)
- **Google Maps:** [Kembang Seladang di Google Maps](https://share.google/YxQVId3hVxgn9mInO)

---

### Pesan Bunga Segar di Toko Bunga Terdekat Hari Ini!
Jelajahi [Katalog Produk Kembang Seladang](https://kembangseladang.com/products) atau klik tombol WhatsApp melayang di pojok kanan bawah untuk konsultasi gratis dengan florist kami!`
  },
  {
    id: 'seo-art-7',
    slug: 'toko-bunga-bintaro-serpong-terdekat-pengiriman-cepat',
    title: 'Toko Bunga Bintaro & Serpong Terdekat: Rangkaian Buket Mawar Premium Pengiriman 1 Jam',
    meta_title: 'Toko Bunga Bintaro & Serpong Terdekat Pengiriman Cepat | Kembang Seladang',
    meta_description: 'Mencari toko bunga terdekat di Bintaro Sektor 1-9 & Serpong BSD? Kembang Seladang menyediakan buket mawar segar, bunga meja, & papan ucapan pengiriman cepat.',
    focus_keyword: 'toko bunga bintaro',
    excerpt: 'Mencari layanan florist terpercaya untuk area Bintaro Jaya dan Serpong BSD? Kembang Seladang melayani pesanan buket bunga segar dan papan ucapan pengiriman super cepat.',
    cover_image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=1200',
    cover_image_alt: 'Buket Bunga Mawar Segar Toko Bunga Bintaro Serpong Kembang Seladang',
    category: 'Toko Bunga & Florist',
    tags: ['toko bunga bintaro', 'florist serpong', 'buket mawar bintaro', 'toko bunga bsd', 'pengiriman cepat'],
    author_name: 'Tim Florist Kembang Seladang',
    reading_time_minutes: 5,
    status: 'published',
    published_at: new Date('2026-07-23T11:00:00Z').toISOString(),
    views_count: 175,
    created_at: new Date('2026-07-23T11:00:00Z').toISOString(),
    content: `# Toko Bunga Bintaro & Serpong Terdekat: Rangkaian Buket Mawar Premium Pengiriman 1 Jam

Aktivitas masyarakat yang padat di kawasan perkotaan seperti **Bintaro Jaya (Sektor 1-9)** dan **Serpong BSD City** seringkali menuntut solusi pengiriman kado bunga yang serba cepat dan praktis. Baik untuk kejutan ulang tahun pasangan, ucapan selamat wisuda, maupun hiasan meja kantor.

Sebagai **toko bunga terdekat Kembang Seladang**, kami memadukan kualitas kelopak mawar segar *freshly picked* dari perkebunan dengan jaringan armada pengiriman kilat yang mampu tiba di lokasi penerima Bintaro & Serpong hanya dalam waktu 1 jam.

---

## Jangkauan Area Pengiriman Kilat Bintaro & Serpong

1. **Bintaro Jaya Sektor 1 s/d 9 & Graha Raya Bintaro**
2. **BSD City, Serpong, Alam Sutera, & Gading Serpong**
3. **Ciputat Timur, Rempoa, Pondok Indah, & Jakarta Selatan**

> **Garansi Kesegaran:** Setiap bunga yang dikirim menggunakan *water sponge retention* khusus pada tangkai bawah sehingga kelopak bunga tetap segar mekar saat tiba di tangan penerima.

---

## Pilihan Rangkaian Terfavorit Pelanggan Bintaro & Serpong

- **Hand Bouquet Mawar Red & Soft Pink:** Pembungkus *Korean Premium Wrapping* elegan bertali pita satin.
- **Bunga Meja Vas Kaca:** Sangat cocok untuk penghias meja kerja kantor di kawasan BSD & Bintaro Trade Center.
- **Papan Bunga Ucapan Selamat:** Rangkaian papan bunga *Grand Opening* dan *Happy Wedding* berukuran besar.

---

### Siap Memesan Buket Bunga Segar ke Bintaro atau Serpong?
[Pesan Buket Mawar Bintaro via WhatsApp](https://wa.me/6287772636627?text=Halo%20Kembang%20Seladang,%20saya%20mau%20pesan%20Buket%20Bunga%20untuk%20area%20Bintaro/Serpong)`
  },
  {
    id: 'seo-art-8',
    slug: 'rekomendasi-papan-bunga-dan-standing-flower-tangerang-selatan',
    title: 'Rekomendasi Papan Bunga & Standing Flower Ucapan Duka Cita & Wedding Tangsel',
    meta_title: 'Papan Bunga & Standing Flower Tangerang Selatan | Kembang Seladang',
    meta_description: 'Pesan karangan papan bunga dan standing flower ucapan pernikahan, duka cita, & grand opening di Tangerang Selatan. Desain mewah, harga terjangkau, pengiriman cepat.',
    focus_keyword: 'papan bunga tangerang selatan',
    excerpt: 'Butuh papan bunga ucapan duka cita atau standing flower pernikahan di Tangerang Selatan? Kembang Seladang siap merangkai papan bunga megah dengan pengerjaan kilat.',
    cover_image: 'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?auto=format&fit=crop&q=80&w=1200',
    cover_image_alt: 'Karangan Papan Bunga dan Standing Flower Tangerang Selatan Kembang Seladang',
    category: 'Karangan & Papan Bunga',
    tags: ['papan bunga tangerang selatan', 'standing flower tangsel', 'bunga duka cita', 'bunga pernikahan', 'karangan bunga'],
    author_name: 'Tim Florist Kembang Seladang',
    reading_time_minutes: 6,
    status: 'published',
    published_at: new Date('2026-07-23T11:30:00Z').toISOString(),
    views_count: 140,
    created_at: new Date('2026-07-23T11:30:00Z').toISOString(),
    content: `# Rekomendasi Papan Bunga & Standing Flower Ucapan Duka Cita & Wedding Tangsel

Karangan **papan bunga ucapan** dan **standing flower** adalah wujud nyata rasa hormat, apresiasi, serta ucapan simpati yang paling elegan. Baik saat menghadiri acara *Grand Opening* gedung usaha baru, pesta pernikahan (*Happy Wedding*), maupun menyampaikan duka cita mendalam (*Deepest Condolences*).

Di **Kembang Seladang Tangerang Selatan**, kami memahami betapa pentingnya ketepatan waktu pengiriman papan ucapan agar tiba sebelum acara dimulai.

---

## Perbedaan Karangan Papan Bunga vs Standing Flower

### 1. Karangan Papan Bunga (Flower Board)
- **Ukuran:** Standar (2m x 1.2m) hingga Ukuran Jumbo Double Board (4m x 1.2m).
- **Penggunaan:** Ditempatkan di luar ruangan (*outdoor*) area pintu masuk gedung resepsi atau rumah duka.
- **Kelebihan:** Tulisan ucapan besar, terbaca jelas dari kejauhan, dan tampak megah.

### 2. Standing Flower (Bunga Berdiri)
- **Ukuran:** Tinggi 1.5m - 1.8m berbahan besi atau kayu artistik.
- **Penggunaan:** Ditempatkan di dalam ruangan (*indoor*) dekat pelaminan atau panggung utama.
- **Kelebihan:** Rangkaian bunga segar mawar & lily lebih padat, terkesan eksklusif dan mewah.

---

## Layanan Pembuatan Papan Bunga Ekspres 3 Jam Sampai

Kami melayani pengiriman langsung ke seluruh rumah duka dan *wedding hall* di Tangerang Selatan & Jakarta Selatan:
- Rumah Duka Oasis Lestari, Rumah Duka Dharmais, Rumah Duka Jelambar.
- Gedung Pernikahan Bintaro, BSD, Serpong, Pondok Indah, & Kebayoran Baru.

---

### Konsultasikan Pesanan Papan Bunga Anda Sekarang
[Pesan Papan Bunga via WhatsApp](https://wa.me/6287772636627?text=Halo%20Kembang%20Seladang,%20saya%20mau%20pesan%20Papan%20Bunga%20/%20Standing%20Flower%20Tangsel)`
  },
  {
    id: 'seo-art-9',
    slug: 'tips-memilih-buket-bunga-valentine-dan-anniversary-romantis',
    title: 'Tips Memilih Buket Bunga Valentine & Anniversary: Kombinasi Mawar Merah & Soft Pink',
    meta_title: 'Buket Bunga Valentine & Anniversary Romantis | Kembang Seladang',
    meta_description: 'Cari buket bunga valentine dan anniversary romantis? Temukan kombinasi mawar merah pekat dan soft pink Korean style dari florist Kembang Seladang.',
    focus_keyword: 'buket bunga valentine',
    excerpt: 'Ingin memberikan kejutan romantis yang tak terlupakan saat anniversary atau Valentine? Simak tips merancang buket mawar merah & pink spesial dari Kembang Seladang.',
    cover_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
    cover_image_alt: 'Buket Bunga Mawar Merah Valentine dan Anniversary Romantis Kembang Seladang',
    category: 'Inspirasi Bunga',
    tags: ['buket bunga valentine', 'bunga anniversary', 'mawar merah romantis', 'hand bouquet mawar', 'toko bunga terdekat'],
    author_name: 'Tim Florist Kembang Seladang',
    reading_time_minutes: 4,
    status: 'published',
    published_at: new Date('2026-07-23T12:00:00Z').toISOString(),
    views_count: 195,
    created_at: new Date('2026-07-23T12:00:00Z').toISOString(),
    content: `# Tips Memilih Buket Bunga Valentine & Anniversary: Kombinasi Mawar Merah & Soft Pink

Memberikan kejutan **buket bunga mawar segar** pada momen anniversary pernikahan atau hari Valentine adalah gestur romantis yang tak pernah gagal menyentuh hati pasangan. Bunga memancarkan pesona estetika yang mampu menyampaikan ungkapan cinta lebih dalam dibanding kata-kata.

Namun, agar buket bunga hadiah Anda memberikan impresi mendalam, perhatikan kombinasi warna dan jumlah tangkai bunga berikut dari florist **Kembang Seladang**:

---

## 1. Makna Jumlah Tangkai Mawar untuk Pasangan

- **12 Tangkai Mawar:** Simbol ketulusan cinta sejati (*"Be Mine"*).
- **20 Tangkai Mawar:** Ungkapan rasa syukur dan kesetiaan mendalam.
- **50 Tangkai Mawar (Giant Bouquet):** Kejutan mewah ungkapan cinta tanpa batas (*Unconditional Love*).

---

## 2. Kombinasi Warna Mawar Merah & Soft Pink Korean Style

Tren buket mawar modern saat ini menggabungkan **Mawar Merah Passionate** di bagian tengah dengan lingkaran **Mawar Soft Pink Sweet** di tepi luar. Balutan kertas *wrapping* matte transparan bertali pita satin merah memberikan kesan manis sekaligus mewah.

> **Bonus Gratis:** Setiap pemesanan buket bunga anniversary di Kembang Seladang sudah termasuk *printed romantic greeting card* serta foto cetak mungil kenangan Anda bersama pasangan.

---

### Pesan Buket Mawar Romantis Sekarang
[Pesan Buket Mawar Romantis via WhatsApp](https://wa.me/6287772636627?text=Halo%20Kembang%20Seladang,%20saya%20mau%20pesan%20Buket%20Mawar%20Romantis%20Anniversary/Valentine)`
  },
  {
    id: 'seo-art-10',
    slug: 'rangkaian-bunga-meja-vas-kaca-dekorasi-ruang-tamu-kantor',
    title: 'Rangkaian Bunga Meja Vas Kaca: Solusi Dekorasi Ruang Tamu & Kantor Elegan',
    meta_title: 'Bunga Meja Vas Kaca Dekorasi Rumah & Kantor | Kembang Seladang',
    meta_description: 'Bunga meja vas kaca mewah untuk dekorasi ruang tamu, meja makan, & meja kerja kantor. Bunga segar tahan mekar lama dari florist Kembang Seladang.',
    focus_keyword: 'bunga meja vas kaca',
    excerpt: 'Segarkan suasana ruangan rumah dan meja kerja kantor Anda dengan rangkaian bunga meja vas kaca dari Kembang Seladang. Bunga dipotong segar setiap hari.',
    cover_image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=1200',
    cover_image_alt: 'Rangkaian Bunga Meja Vas Kaca Elegan Kembang Seladang',
    category: 'Dekorasi & Rangkaian Meja',
    tags: ['bunga meja vas kaca', 'dekorasi rumah', 'bunga meja kantor', 'bunga vas segar', 'florist tangsel'],
    author_name: 'Tim Florist Kembang Seladang',
    reading_time_minutes: 4,
    status: 'published',
    published_at: new Date('2026-07-23T12:30:00Z').toISOString(),
    views_count: 160,
    created_at: new Date('2026-07-23T12:30:00Z').toISOString(),
    content: `# Rangkaian Bunga Meja Vas Kaca: Solusi Dekorasi Ruang Tamu & Kantor Elegan

Menghadirkan rangkaian **bunga meja vas kaca segar** di sudut ruang tamu, meja makan, maupun meja kerja di kantor terbukti secara psikologis dapat meningkatkan suasana hati (*mood*), mengurangi tingkat stres, serta memberikan kesan elegan pada hunian Anda.

Di **Kembang Seladang**, kami mendesain rangkaian bunga meja (*table arrangement*) menggunakan vas kaca bening kristal dengan kombinasi mawar premium, lily harum, dan dedaunan hijau *eucalyptus*.

---

## Keunggulan Bunga Meja Vas Kaca Dibanding Buket Tangan

1. **Siap Pajang Instan:** Langsung diletakkan di atas meja tanpa perlu repot mencari vas tambahan di rumah.
2. **Daya Tahan Lebih Lama:** Batang bunga selalu terendam air segar vas, menjaga kuntum bunga tetap mekar anggun hingga 10–14 hari.
3. **Kado Housewarming & Ucapan Selamat:** Sangat pas sebagai kado syukuran rumah baru (*housewarming*) atau ucapan selamat atas kenaikan jabatan rekan kerja.

---

### Dapatkan Rangkaian Bunga Meja Vas Kaca Anda
[Pesan Bunga Meja Vas Kaca via WhatsApp](https://wa.me/6287772636627?text=Halo%20Kembang%20Seladang,%20saya%20mau%20pesan%20Rangkaian%20Bunga%20Meja%20Vas%20Kaca)`
  },
  {
    id: 'seo-art-11',
    slug: 'buket-bunga-wisuda-terbaik-tangerang-selatan-jakarta-selatan',
    title: 'Buket Bunga Wisuda Terbaik Tangerang Selatan: Pilihan Warna & Hadiah Kelulusan',
    meta_title: 'Buket Bunga Wisuda Tangerang Selatan & Jaksel | Kembang Seladang',
    meta_description: 'Buket bunga wisuda terbaik di Tangerang Selatan & Jakarta Selatan untuk kelulusan UIN Jakarta, STAN, Binus, & UI. Pengiriman cepat bunga segar buket mawar.',
    focus_keyword: 'buket bunga wisuda',
    excerpt: 'Rayakan kelulusan sahabat & pasangan tercinta dengan buket bunga wisuda segar dari Kembang Seladang. Layanan pengiriman langsung ke kampus area Tangsel & Jaksel.',
    cover_image: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&q=80&w=1200',
    cover_image_alt: 'Buket Bunga Wisuda Segar Kembang Seladang Tangerang Selatan',
    category: 'Tips & Trik',
    tags: ['buket bunga wisuda', 'bunga kelulusan', 'wisuda tangsel', 'buket mawar wisuda', 'toko bunga terdekat'],
    author_name: 'Tim Florist Kembang Seladang',
    reading_time_minutes: 5,
    status: 'published',
    published_at: new Date('2026-07-23T13:00:00Z').toISOString(),
    views_count: 220,
    created_at: new Date('2026-07-23T13:00:00Z').toISOString(),
    content: `# Buket Bunga Wisuda Terbaik Tangerang Selatan: Pilihan Warna & Hadiah Kelulusan

Momen wisuda adalah puncak perayaan atas kerja keras dan perjuangan akademik bertahun-tahun. Memberikan **buket bunga wisuda segar** menjadi tradisi terbaik untuk mengabadikan momen kebahagiaan bersama keluarga dan sahabat tercinta saat sesi foto wisuda.

**Kembang Seladang** melayani pengiriman buket bunga wisuda segar langsung ke lokasi auditorium universitas di kawasan Tangerang Selatan dan Jakarta Selatan, meliputi:
- **UIN Syarif Hidayatullah Jakarta (Ciputat)**
- **PKN STAN (Bintaro)**
- **Universitas Pamulang (UNPAM)**
- **Universitas Indonesia (UI Depok)**
- **Universitas Prasetiya Mulya & Binus BSD**

---

## Rekomendasi Tema Buket Bunga Wisuda Favorit

1. **Buket Mawar Kuning & Sunflower (Keceriaan & Masa Depan Cerah):** Simbol optimisme meraih sukses di dunia kerja.
2. **Buket Mawar Soft Pink & White (Anggun & Manis):** Pilihan favorit wisudawati dengan kertas *wrapping* Korean style pastel.
3. **Buket Mawar Merah & Boneka Wisuda Custom:** Dilengkapi boneka kelulusan mungil bertoga sesuai atribut universitas.

---

### Pesan Buket Bunga Wisuda Sekarang
[Pesan Buket Wisuda via WhatsApp](https://wa.me/6287772636627?text=Halo%20Kembang%20Seladang,%20saya%20mau%20pesan%20Buket%20Bunga%20Wisuda%20Tangsel/Jaksel)`
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

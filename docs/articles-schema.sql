-- =======================================================
-- KEMBANG SELADANG - ARTICLES SCHEMA (FOR PUBLIC BLOG/SEO)
-- =======================================================
-- Copy dan paste kode di bawah ini ke SQL Editor di Supabase Anda, lalu klik "Run".

CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,                -- Menyimpan isi artikel (Format Markdown)
  cover_image TEXT,                      -- URL image dari Supabase Storage atau eksternal
  category TEXT NOT NULL DEFAULT 'Tips & Trik', -- Tips & Trik, Inspirasi, Berita, dll
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft',  -- 'draft' | 'published'
  published_at TIMESTAMPTZ,
  author TEXT NOT NULL DEFAULT 'Kembang Seladang',
  meta_title TEXT,                       -- SEO Title (optional override)
  meta_description TEXT,                 -- SEO Description (optional override)
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Mengaktifkan Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- 1. Kebijakan akses CRUD penuh untuk pengguna terotentikasi (Admin via panel admin)
CREATE POLICY "Allow full access to authenticated users for articles" 
  ON articles 
  FOR ALL 
  TO authenticated 
  USING (true);

-- 2. Kebijakan akses SELECT (baca) publik untuk artikel yang berstatus 'published' (untuk website publik)
CREATE POLICY "Allow public read for published articles" 
  ON articles 
  FOR SELECT 
  TO anon 
  USING (status = 'published');

-- Kebijakan akses SELECT publik untuk produk (dijalankan di Supabase jika produk butuh diakses anonim)
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY; -- (Sudah aktif di admin schema)
CREATE POLICY "Allow public read for products" 
  ON products 
  FOR SELECT 
  TO anon 
  USING (true);

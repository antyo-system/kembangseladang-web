import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { PromoBanner } from '../types/banner'

export const DEFAULT_STOREFRONT_BANNERS: PromoBanner[] = [
  {
    id: 'a1b2c3d4-1111-4000-8000-000000000001',
    title: 'Rangkaian Bunga Segar & Premium',
    subtitle: 'Dibuat hand-made oleh florist profesional untuk merayakan setiap momen berharga Anda di Tangerang Selatan.',
    badge: 'Kembang Seladang Signature',
    cta_text: 'Pesan Rangkaian',
    cta_link: 'https://wa.me/6287772636627?text=Halo%20Kak%20Priska%2C%20saya%20tertarik%20dengan%20rangkaian%20bunga%20Kembang%20Seladang.',
    image_url: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80',
    image_alt: 'Buket Bunga Mawar Segar Premium Kembang Seladang Rempoa Tangerang Selatan',
    gradient_theme: 'from-pink-900/90 via-charcoal-900/80 to-charcoal-900/40',
    display_order: 1,
    is_active: true
  },
  {
    id: 'a1b2c3d4-2222-4000-8000-000000000002',
    title: 'Pengiriman Hari Yang Sama (Sameday)',
    subtitle: 'Butuh rangkaian bunga mendadak? Kami melayani pengiriman instant/sameday di wilayah Tangerang Selatan & sekitarnya.',
    badge: 'Layanan Express',
    cta_text: 'Pesan Cepat',
    cta_link: 'https://wa.me/6287772636627?text=Halo%20Kak%20Priska%2C%20saya%20butuh%20order%20bunga%20cepat%20untuk%20dikirim%20hari%20ini.',
    image_url: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=1200&q=80',
    image_alt: 'Pengiriman Cepat Buket Bunga Sameday Rempoa Bintaro Tangsel',
    gradient_theme: 'from-amber-900/90 via-charcoal-900/80 to-charcoal-900/40',
    display_order: 2,
    is_active: true
  },
  {
    id: 'a1b2c3d4-3333-4000-8000-000000000003',
    title: 'Custom Buket Sesuai Impianmu',
    subtitle: 'Diskusikan pilihan jenis bunga, kombinasi warna kertas wrapping, pita, hingga budget yang Anda inginkan.',
    badge: 'Layanan Kustom',
    cta_text: 'Konsultasi Gratis',
    cta_link: 'https://wa.me/6287772636627?text=Halo%20Kak%20Priska%2C%20saya%20mau%20konsultasi%20custom%20order%20rangkaian%20bunga%20di%20Kembang%20Seladang.',
    image_url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80',
    image_alt: 'Custom Hand Bouquet Bunga Mawar Wisuda Tangerang Selatan',
    gradient_theme: 'from-rose-950/90 via-charcoal-900/80 to-charcoal-900/40',
    display_order: 3,
    is_active: true
  }
]

export function useBanners() {
  return useQuery<PromoBanner[]>({
    queryKey: ['active_promo_banners'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('promo_banners')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })

        if (error || !data || data.length === 0) {
          return DEFAULT_STOREFRONT_BANNERS
        }

        return data as PromoBanner[]
      } catch (err) {
        return DEFAULT_STOREFRONT_BANNERS
      }
    }
  })
}

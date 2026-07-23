export interface PromoBanner {
  id: string
  title: string
  subtitle: string
  badge: string
  cta_text: string
  cta_link: string
  image_url: string
  image_alt: string
  gradient_theme: string
  display_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

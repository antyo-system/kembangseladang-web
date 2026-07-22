import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { Product } from '../store/useCartStore'

const PRODUCT_SELECT_WITH_LIVE =
  'id, code, name, base_price, original_price, sold_count, description, flower_type, color, stem_length, unit, is_arranged, created_at, is_live, image'

const PRODUCT_SELECT_WITH_LIVE_WITHOUT_SOLD =
  'id, code, name, base_price, original_price, description, flower_type, color, stem_length, unit, is_arranged, created_at, is_live, image'

const PRODUCT_SELECT_WITH_LIVE_WITHOUT_ORIGINAL =
  'id, code, name, base_price, sold_count, description, flower_type, color, stem_length, unit, is_arranged, created_at, is_live, image'

const BASE_PRODUCT_SELECT_WITH_LIVE =
  'id, code, name, base_price, description, flower_type, color, stem_length, unit, is_arranged, created_at, is_live, image'

const PRODUCT_SELECT =
  'id, code, name, base_price, original_price, sold_count, description, flower_type, color, stem_length, unit, is_arranged, created_at, image'

const PRODUCT_SELECT_WITHOUT_SOLD_COUNT =
  'id, code, name, base_price, original_price, description, flower_type, color, stem_length, unit, is_arranged, created_at, image'

const PRODUCT_SELECT_WITHOUT_ORIGINAL_PRICE =
  'id, code, name, base_price, sold_count, description, flower_type, color, stem_length, unit, is_arranged, created_at, image'

const BASE_PRODUCT_SELECT =
  'id, code, name, base_price, description, flower_type, color, stem_length, unit, is_arranged, created_at, image'

const PRODUCT_SELECT_CANDIDATES = [
  { columns: PRODUCT_SELECT_WITH_LIVE, defaults: {} },
  { columns: PRODUCT_SELECT_WITH_LIVE_WITHOUT_SOLD, defaults: { sold_count: 0 } },
  { columns: PRODUCT_SELECT_WITH_LIVE_WITHOUT_ORIGINAL, defaults: { original_price: null } },
  { columns: BASE_PRODUCT_SELECT_WITH_LIVE, defaults: { original_price: null, sold_count: 0 } },
  { columns: PRODUCT_SELECT, defaults: { is_live: true } },
  { columns: PRODUCT_SELECT_WITHOUT_SOLD_COUNT, defaults: { sold_count: 0, is_live: true } },
  { columns: PRODUCT_SELECT_WITHOUT_ORIGINAL_PRICE, defaults: { original_price: null, is_live: true } },
  { columns: BASE_PRODUCT_SELECT, defaults: { original_price: null, sold_count: 0, is_live: true } },
]

function isMissingOptionalProductColumn(error: { message?: string; details?: string } | null) {
  const message = `${error?.message || ''} ${error?.details || ''}`.toLowerCase()
  return (
    message.includes('original_price') ||
    message.includes('sold_count') ||
    message.includes('is_live') ||
    message.includes('image')
  )
}

function applyProductDefaults(products: unknown[] | null, defaults: Partial<Pick<Product, 'original_price' | 'sold_count' | 'is_live'>> = {}) {
  return (products || [])
    .filter((product) => (product as Product)?.code !== 'SYS_FLASH_SALE_CONFIG')
    .map((product) => {
      const p = (product || {}) as Product
      return {
        ...p,
        is_live: (p as any).is_live !== false,
        is_flash_sale: (p as any).is_flash_sale === true,
        sold_count: p.sold_count ?? 0,
        original_price: p.original_price ?? null,
        ...defaults,
      }
    }) as Product[]
}

function applySingleProductDefaults(product: unknown, defaults: Partial<Pick<Product, 'original_price' | 'sold_count' | 'is_live'>>) {
  const p = product as Product
  return {
    ...p,
    is_live: (p as any).is_live !== false,
    ...defaults,
  } as Product
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })

        if (!error && data) {
          return applyProductDefaults(data)
        }

        const fallback = await supabase
          .from('products')
          .select('*')

        if (!fallback.error && fallback.data) {
          return applyProductDefaults(fallback.data)
        }

        console.error('Error fetching products on storefront:', error || fallback.error)
        return []
      } catch (err) {
        console.error('Unexpected error fetching products on storefront:', err)
        return []
      }
    }
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      for (const candidate of PRODUCT_SELECT_CANDIDATES) {
        const { data, error } = await supabase
          .from('products')
          .select(candidate.columns)
          .eq('id', id)
          .single()

        if (!error) {
          return applySingleProductDefaults(data, candidate.defaults)
        }

        if (!isMissingOptionalProductColumn(error)) {
          console.error(`Error fetching product ${id}:`, error)
          throw error
        }
      }

      throw new Error('Gagal mengambil detail produk karena schema katalog tidak kompatibel.')
    },
    enabled: !!id
  })
}

export interface FlashSaleConfig {
  active: boolean
  pinnedIds: string[]
}

export function useFlashSaleConfig() {
  return useQuery({
    queryKey: ['flash_sale_config'],
    queryFn: async (): Promise<FlashSaleConfig> => {
      const { data } = await supabase
        .from('products')
        .select('description')
        .eq('code', 'SYS_FLASH_SALE_CONFIG')
        .maybeSingle()

      if (data && data.description) {
        try {
          const parsed = JSON.parse(data.description)
          return {
            active: parsed.active !== false,
            pinnedIds: Array.isArray(parsed.pinnedIds) ? parsed.pinnedIds : [],
          }
        } catch (e) {}
      }

      return { active: true, pinnedIds: [] }
    },
  })
}


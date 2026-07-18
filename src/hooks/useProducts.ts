import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { Product } from '../store/useCartStore'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, code, name, base_price, description, flower_type, color, stem_length, unit, is_arranged, created_at')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching products:', error)
        throw error
      }

      return data as Product[]
    }
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, code, name, base_price, description, flower_type, color, stem_length, unit, is_arranged, created_at')
        .eq('id', id)
        .single()

      if (error) {
        console.error(`Error fetching product ${id}:`, error)
        throw error
      }

      return data as Product
    },
    enabled: !!id
  })
}

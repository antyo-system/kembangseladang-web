import type { Product } from '../store/useCartStore'

type ProductSales = Pick<Product, 'sold_count'>

export function getProductSoldCount(product: ProductSales): number {
  const soldCount = Number(product.sold_count) || 0
  return Math.max(0, Math.floor(soldCount))
}

export function formatSoldCount(count: number | null | undefined): string {
  const value = Math.max(0, Math.floor(Number(count) || 0))
  if (value >= 1000) return `${Math.floor(value / 1000)}RB+`
  return value.toLocaleString('id-ID')
}

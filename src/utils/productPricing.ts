import type { Product } from '../store/useCartStore'

type ProductPricing = Pick<Product, 'base_price' | 'original_price'>

export function getProductPrice(product: ProductPricing): number {
  return Number(product.base_price) || 0
}

export function getProductOriginalPrice(product: ProductPricing): number | null {
  const currentPrice = getProductPrice(product)
  const originalPrice = Number(product.original_price) || 0

  return originalPrice > currentPrice ? originalPrice : null
}

export function getProductDiscountPercentage(product: ProductPricing): number {
  const currentPrice = getProductPrice(product)
  const originalPrice = getProductOriginalPrice(product)

  if (!originalPrice || currentPrice <= 0) return 0

  return Math.max(1, Math.round(((originalPrice - currentPrice) / originalPrice) * 100))
}

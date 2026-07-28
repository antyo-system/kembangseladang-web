import type { Product } from '../store/useCartStore'

/**
 * Converts a string into a URL-friendly slug.
 * Example: "Mawar Peach (20 Tangkai)" -> "mawar-peach-20-tangkai"
 */
export function slugify(text: string): string {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // Separate accent marks
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .replace(/[^a-z0-9 -]/g, '') // Remove non-alphanumeric chars except space and hyphen
    .replace(/\s+/g, '-') // Replace spaces with single hyphen
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Trim leading and trailing hyphens
}

/**
 * Generates or extracts the canonical slug for a product.
 * Prefers product.slug if defined in database, otherwise generates slug from product.name.
 */
export function getProductSlug(product: Partial<Product> | null | undefined): string {
  if (!product) return ''
  if (product.slug && typeof product.slug === 'string' && product.slug.trim()) {
    return product.slug.trim()
  }
  if (product.name && typeof product.name === 'string' && product.name.trim()) {
    const derived = slugify(product.name)
    if (derived) return derived
  }
  if (product.code && typeof product.code === 'string' && product.code.trim()) {
    return slugify(product.code)
  }
  return product.id || ''
}

/**
 * Checks if a product matches a given slug, ID, or product code.
 */
export function matchesProductSlug(product: Partial<Product> | null | undefined, slugOrId: string): boolean {
  if (!product || !slugOrId) return false
  const target = slugOrId.toLowerCase().trim()
  if (product.id && product.id.toLowerCase() === target) return true
  if (product.code && product.code.toLowerCase() === target) return true
  if (product.slug && product.slug.toLowerCase() === target) return true
  
  const productDerivedSlug = getProductSlug(product)
  if (productDerivedSlug && productDerivedSlug.toLowerCase() === target) return true
  if (productDerivedSlug && slugify(target) === productDerivedSlug) return true
  
  return false
}

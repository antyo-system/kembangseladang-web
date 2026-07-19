export interface ProductRating {
  rating: number
  count: number
}

/**
 * Generates a deterministic rating and review count based on a product's ID.
 * This guarantees consistent values for each product without storing ratings in the database.
 */
export function getProductRating(productId: string): ProductRating {
  if (!productId) {
    return { rating: 4.8, count: 25 }
  }

  // Simple string hashing
  let hash = 0
  for (let i = 0; i < productId.length; i++) {
    hash = productId.charCodeAt(i) + ((hash << 5) - hash)
  }
  hash = Math.abs(hash)

  // Generate rating between 4.7 and 5.0
  const ratingIndex = hash % 4
  const rating = 4.7 + ratingIndex * 0.1

  // Generate review count between 15 and 180
  const count = 15 + (hash % 166)

  return { rating, count }
}

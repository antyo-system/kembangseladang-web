/**
 * Flower Freshness & Shelf-Life Engine for Storefront
 * Max 4 Days Sellable Window (Day 5+ is Expired / Damaged).
 */

export interface FreshnessInfo {
  ageInDays: number
  currentDay: number
  maxDays: number
  status: 'PRIME' | 'PROMO_READY' | 'EXPIRED'
  statusLabel: string
  badgeText: string
  colorClass: 'emerald' | 'amber' | 'rose'
  isSellable: boolean
  recommendedAction: string
}

export const MAX_FLOWER_SHELF_LIFE_DAYS = 4

export function calculateFlowerFreshness(
  restockDate?: string | Date | null,
  maxDays: number = MAX_FLOWER_SHELF_LIFE_DAYS,
  now: Date = new Date()
): FreshnessInfo {
  const dateObj = restockDate ? new Date(restockDate) : now
  const restockTime = isNaN(dateObj.getTime()) ? now.getTime() : dateObj.getTime()
  
  const diffMs = Math.max(0, now.getTime() - restockTime)
  const ageInDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const currentDay = Math.min(maxDays + 1, ageInDays + 1)

  if (ageInDays >= maxDays) {
    return {
      ageInDays,
      currentDay: Math.max(5, ageInDays + 1),
      maxDays,
      status: 'EXPIRED',
      statusLabel: 'Bunga Rusak / Kadaluarsa',
      badgeText: `Hari ke-${ageInDays + 1} (Bunga Rusak)`,
      colorClass: 'rose',
      isSellable: false,
      recommendedAction: 'Off Sale / Catat Penyusutan',
    }
  }

  if (ageInDays >= 2) {
    return {
      ageInDays,
      currentDay,
      maxDays,
      status: 'PROMO_READY',
      statusLabel: 'Siap Flash Sale / Promo',
      badgeText: `Hari ke-${currentDay} dari ${maxDays} (Promo Ready)`,
      colorClass: 'amber',
      isSellable: true,
      recommendedAction: 'Prioritaskan ke Flash Sale',
    }
  }

  return {
    ageInDays,
    currentDay,
    maxDays,
    status: 'PRIME',
    statusLabel: 'Bunga Segar Prime',
    badgeText: `Hari ke-${currentDay} dari ${maxDays} (Segar)`,
    colorClass: 'emerald',
    isSellable: true,
    recommendedAction: 'Harga Normal / Premium',
  }
}

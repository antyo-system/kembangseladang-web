/**
 * Flash Sale Engine Utility Functions for Storefront
 * Handles auto-cycling session calculation, deterministic product rotation, and Shopee-style stock progress bars.
 */

export interface FlashSaleSession {
  sessionKey: string
  startTime: Date
  endTime: Date
  remainingSeconds: number
  formattedCountdown: string
  hours: number
  minutes: number
  seconds: number
}

export interface FlashSaleStockInfo {
  soldCount: number
  quota: number
  soldPercent: number
  remainingStock: number
  statusText: string
  isSoldOut: boolean
}

export function getFlashSaleSession(cycleHours: number = 3, now: Date = new Date()): FlashSaleSession {
  const currentMs = now.getTime()
  const year = now.getFullYear()
  const month = now.getMonth()
  const date = now.getDate()
  const currentHour = now.getHours()

  const startHour = Math.floor(currentHour / cycleHours) * cycleHours
  const startTime = new Date(year, month, date, startHour, 0, 0, 0)
  
  const endTime = new Date(startTime.getTime() + cycleHours * 60 * 60 * 1000)
  const remainingMs = Math.max(0, endTime.getTime() - currentMs)
  const remainingSeconds = Math.floor(remainingMs / 1000)

  const hours = Math.floor(remainingSeconds / 3600)
  const minutes = Math.floor((remainingSeconds % 3600) / 60)
  const seconds = remainingSeconds % 60

  const pad = (n: number) => n.toString().padStart(2, '0')
  const formattedCountdown = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`

  const dateStr = `${year}-${pad(month + 1)}-${pad(date)}`
  const sessionKey = `${dateStr}-${pad(startHour)}`

  return {
    sessionKey,
    startTime,
    endTime,
    remainingSeconds,
    formattedCountdown,
    hours,
    minutes,
    seconds,
  }
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0
  }
  return Math.abs(hash)
}

export function rotateFlashSaleProducts<T>(pool: T[], sessionKey: string, count: number = 6): T[] {
  if (!pool || pool.length === 0) return []
  if (pool.length <= count) return [...pool]

  const seed = hashString(sessionKey)
  const shuffled = [...pool]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const pseudoRandom = Math.abs(Math.sin(seed + i))
    const j = Math.floor(pseudoRandom * (i + 1))
    const temp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = temp
  }

  return shuffled.slice(0, count)
}

export function calculateFlashSaleStock(
  productId: string,
  sessionKey: string,
  quotaPerSession: number = 5,
  realSoldCount?: number | null
): FlashSaleStockInfo {
  const seed = hashString(`${sessionKey}-${productId}`)
  const quota = Math.max(1, quotaPerSession)
  
  const pseudoRandomRatio = 0.35 + ((seed % 55) / 100)
  
  let soldCount = Math.floor(quota * pseudoRandomRatio)
  if (typeof realSoldCount === 'number' && realSoldCount > 0) {
    soldCount = Math.min(quota, (realSoldCount % quota) + soldCount)
  }

  soldCount = Math.max(1, Math.min(quota, soldCount))
  const remainingStock = Math.max(0, quota - soldCount)
  const soldPercent = Math.min(100, Math.round((soldCount / quota) * 100))
  const isSoldOut = remainingStock === 0

  let statusText = 'STOK TERBATAS'
  if (isSoldOut) {
    statusText = 'HABIS'
  } else if (remainingStock <= 2) {
    statusText = `TERSISA ${remainingStock} BUKET!`
  } else {
    statusText = `TERJUAL ${soldPercent}%`
  }

  return {
    soldCount,
    quota,
    soldPercent,
    remainingStock,
    statusText,
    isSoldOut,
  }
}

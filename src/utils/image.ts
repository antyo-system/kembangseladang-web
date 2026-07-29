/**
 * Helper to optimize image URLs (especially Unsplash CDN images and static fallback images)
 * into modern WebP format with specified target width and quality.
 */
export function optimizeImageUrl(url: string | undefined | null, width = 600): string {
  if (!url) return ''

  // Optimize Unsplash images dynamically
  if (url.includes('images.unsplash.com')) {
    // Strip existing width and format parameters if present
    let cleanUrl = url
      .replace(/([?&])w=\d+/g, '')
      .replace(/([?&])auto=[^&]*/g, '')
      .replace(/([?&])fm=[^&]*/g, '')
      .replace(/([?&])q=\d+/g, '')
      .replace(/[?&]+$/, '')

    const connector = cleanUrl.includes('?') ? '&' : '?'
    return `${cleanUrl}${connector}auto=format&fit=crop&w=${width}&q=75&fm=webp`
  }

  // Optimize local category JPGs to WebP fallback
  if (url.startsWith('/images/categories/') && url.endsWith('.jpg')) {
    return url.replace(/\.jpg$/, '.webp')
  }

  // Optimize local product JPGs to WebP fallback
  if (url.startsWith('/images/products/') && url.endsWith('.jpg')) {
    return url.replace(/\.jpg$/, '.webp')
  }

  return url
}

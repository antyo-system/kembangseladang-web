import { supabase } from '../lib/supabase'

export function isDeveloperOrAdmin(): boolean {
  if (typeof window === 'undefined') return true

  const hostname = window.location.hostname
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local')) {
    return true
  }

  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('dev') === 'true' || urlParams.get('preview') === 'true') {
    return true
  }

  try {
    if (localStorage.getItem('ks_admin') === 'true' || localStorage.getItem('sb-access-token')) {
      return true
    }
  } catch (e) {}

  return false
}

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'server'

  try {
    let sid = sessionStorage.getItem('ks_analytics_sid')
    if (!sid) {
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
      const randStr = Math.random().toString(36).substring(2, 9)
      sid = `sid_${dateStr}_${randStr}`
      sessionStorage.setItem('ks_analytics_sid', sid)
    }
    return sid
  } catch (e) {
    return `sid_fallback_${Math.random().toString(36).substring(2, 9)}`
  }
}

export function detectDeviceType(): 'mobile' | 'desktop' {
  if (typeof window === 'undefined') return 'mobile'
  return window.innerWidth < 768 ? 'mobile' : 'desktop'
}

export async function trackPageView(pagePath: string) {
  if (isDeveloperOrAdmin()) {
    console.log('[Analytics] Skipped page_view (Developer/Admin detected):', pagePath)
    return
  }

  try {
    const sessionKey = `ks_pv_${pagePath}`
    if (sessionStorage.getItem(sessionKey)) {
      return // Don't double track identical pageview in same tab session
    }
    sessionStorage.setItem(sessionKey, '1')

    const sessionId = getOrCreateSessionId()
    const deviceType = detectDeviceType()

    await supabase.from('analytics_events').insert([
      {
        session_id: sessionId,
        event_type: 'page_view',
        page_path: pagePath,
        device_type: deviceType,
        user_agent: navigator.userAgent
      }
    ])
  } catch (err) {
    console.warn('[Analytics] Failed to track page_view:', err)
  }
}

export async function trackWAClick(params: {
  productId?: string
  productName?: string
  pagePath?: string
}) {
  if (isDeveloperOrAdmin()) {
    console.log('[Analytics] Skipped wa_click (Developer/Admin detected):', params)
    return
  }

  try {
    const sessionId = getOrCreateSessionId()
    const deviceType = detectDeviceType()
    const currentPath = params.pagePath || window.location.pathname

    // Prevent rapid multi-click spam within 5 seconds
    const lastClickTime = sessionStorage.getItem('ks_last_wa_click')
    const now = Date.now()

    if (lastClickTime && now - parseInt(lastClickTime, 10) < 5000) {
      console.log('[Analytics] Suppressed rapid WA click spam')
      return
    }
    sessionStorage.setItem('ks_last_wa_click', now.toString())

    await supabase.from('analytics_events').insert([
      {
        session_id: sessionId,
        event_type: 'wa_click',
        page_path: currentPath,
        product_id: params.productId || null,
        product_name: params.productName || null,
        device_type: deviceType,
        user_agent: navigator.userAgent
      }
    ])
  } catch (err) {
    console.warn('[Analytics] Failed to track wa_click:', err)
  }
}

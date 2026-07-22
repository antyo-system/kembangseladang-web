import React, { useEffect, useState } from 'react'
import { Sparkles, RefreshCw, X } from 'lucide-react'

export const PWAUpdatePrompt: React.FC = () => {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)
  const [showPrompt, setShowPrompt] = useState<boolean>(false)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    let refreshing = false

    const onControllerChange = () => {
      if (!refreshing) {
        refreshing = true
        window.location.reload()
      }
    }

    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange)

    navigator.serviceWorker.register('/sw.js').then((registration) => {
      if (registration.waiting) {
        setWaitingWorker(registration.waiting)
        setShowPrompt(true)
      }

      registration.onupdatefound = () => {
        const newWorker = registration.installing
        if (!newWorker) return

        newWorker.onstatechange = () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setWaitingWorker(newWorker)
            setShowPrompt(true)
          }
        }
      }

      const checkUpdateInterval = setInterval(() => {
        registration.update().catch(() => {})
      }, 10 * 60 * 1000)

      const handleFocus = () => {
        registration.update().catch(() => {})
      }

      window.addEventListener('focus', handleFocus)

      return () => {
        clearInterval(checkUpdateInterval)
        window.removeEventListener('focus', handleFocus)
      }
    }).catch((err) => {
      console.warn('[PWA] Registration failed:', err)
    })

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange)
    }
  }, [])

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' })
    }
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full p-4 bg-charcoal-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-primary-500/40 animate-bounce-short">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary-600/30 rounded-xl border border-primary-500/50 text-primary-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              Pembaruan Website Tersedia!
            </h4>
            <p className="text-xs text-charcoal-300 mt-0.5 leading-relaxed">
              Toko Bunga Kembang Seladang memiliki konten & fitur terbaru. Klik untuk memperbarui.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowPrompt(false)}
          className="text-charcoal-400 hover:text-white transition-colors p-1"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          onClick={() => setShowPrompt(false)}
          className="px-3 py-1.5 text-xs font-semibold text-charcoal-300 hover:text-white transition-colors"
        >
          Nanti Saja
        </button>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-primary-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 animate-spin-slow" />
          <span>Perbarui Sekarang</span>
        </button>
      </div>
    </div>
  )
}

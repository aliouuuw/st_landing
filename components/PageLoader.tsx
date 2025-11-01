'use client'

import { useEffect, useState } from 'react'

export function PageLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F5F7FB]">
      <div className="text-center">
        <div className="relative flex h-16 w-16 items-center justify-center mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-pulse" />
          <div className="relative flex h-16 w-16 rotate-45 items-center justify-center rounded-2xl bg-neutral-900 animate-spin">
            <div className="h-6 w-6 -rotate-45 rounded-md bg-blue-500" />
          </div>
        </div>
        <p className="text-sm font-medium text-neutral-600">Chargement...</p>
      </div>
    </div>
  )
}


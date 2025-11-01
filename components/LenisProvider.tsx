'use client'

import { useEffect } from 'react'
import { initLenis, destroyLenis } from '@/lib/lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add lenis class to html element
    document.documentElement.classList.add('lenis')
    
    // Initialize Lenis
    const lenis = initLenis()
    
    return () => {
      document.documentElement.classList.remove('lenis')
      destroyLenis()
    }
  }, [])

  return <>{children}</>
}


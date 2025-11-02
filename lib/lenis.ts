'use client'

import Lenis from '@studio-freight/lenis'

let lenisInstance: Lenis | null = null
let rafId: number | null = null

export function initLenis() {
  if (typeof window === 'undefined') return null
  
  if (lenisInstance) return lenisInstance

  lenisInstance = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
    autoResize: true,
  })

  function raf(time: number) {
    lenisInstance?.raf(time)
    rafId = requestAnimationFrame(raf)
  }

  rafId = requestAnimationFrame(raf)

  return lenisInstance
}

export function getLenis() {
  return lenisInstance
}

export function scrollTo(target: string | number, options?: { offset?: number; duration?: number }) {
  if (!lenisInstance) return
  
  lenisInstance.scrollTo(target, {
    offset: options?.offset || 0,
    duration: options?.duration || 1.2,
  })
}

export function destroyLenis() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}


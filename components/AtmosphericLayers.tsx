'use client'

import { useEffect, useRef } from 'react'

export const AtmosphericLayers = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const scrolled = window.scrollY
      const lightRays = containerRef.current.querySelectorAll('.light-ray')
      const floatingShapes = containerRef.current.querySelectorAll('.floating-shape')
      
      // Parallax light rays
      lightRays.forEach((ray, index) => {
        const speed = 0.3 + (index * 0.1)
        const element = ray as HTMLElement
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${15 + index * 5}deg)`
      })
      
      // Slow rotation and parallax for floating shapes
      floatingShapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05)
        const rotation = (scrolled * 0.02) + (index * 45)
        const element = shape as HTMLElement
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(37, 99, 235, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, rgba(96, 165, 250, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 75%, rgba(167, 139, 250, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 10% 80%, rgba(37, 99, 235, 0.06) 0%, transparent 40%),
              radial-gradient(circle at 90% 70%, rgba(96, 165, 250, 0.06) 0%, transparent 40%)
            `,
            animation: 'gradientShift 20s ease-in-out infinite alternate'
          }}
        />
      </div>

      {/* Floating Geometric Shapes - Midground */}
      <div className="absolute inset-0">
        {/* Triangle */}
        <div 
          className="floating-shape absolute top-[15%] left-[10%] w-16 h-16 opacity-5"
          style={{ 
            animation: 'float-soft 12s ease-in-out infinite',
            animationDelay: '0s'
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
            <polygon points="50,10 90,90 10,90" fill="currentColor" />
          </svg>
        </div>

        {/* Circle */}
        <div 
          className="floating-shape absolute top-[60%] right-[15%] w-24 h-24 opacity-4"
          style={{ 
            animation: 'float-soft 15s ease-in-out infinite',
            animationDelay: '2s'
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-purple-400">
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </svg>
        </div>

        {/* Square */}
        <div 
          className="floating-shape absolute top-[40%] left-[70%] w-20 h-20 opacity-5"
          style={{ 
            animation: 'float-soft 18s ease-in-out infinite',
            animationDelay: '4s'
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
            <rect x="20" y="20" width="60" height="60" fill="currentColor" rx="8" />
          </svg>
        </div>

        {/* Pentagon */}
        <div 
          className="floating-shape absolute top-[25%] right-[30%] w-14 h-14 opacity-4"
          style={{ 
            animation: 'float-soft 14s ease-in-out infinite',
            animationDelay: '1s'
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-400">
            <polygon points="50,5 95,35 80,90 20,90 5,35" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Light Rays - Foreground */}
      <div className="absolute inset-0 mix-blend-overlay">
        <div 
          className="light-ray absolute top-0 -left-[10%] w-[3px] h-[40%] bg-gradient-to-b from-transparent via-blue-400/20 to-transparent blur-sm"
          style={{ transform: 'rotate(15deg)' }}
        />
        <div 
          className="light-ray absolute top-[10%] left-[30%] w-[2px] h-[35%] bg-gradient-to-b from-transparent via-purple-300/15 to-transparent blur-sm"
          style={{ transform: 'rotate(20deg)' }}
        />
        <div 
          className="light-ray absolute top-[5%] right-[20%] w-[3px] h-[45%] bg-gradient-to-b from-transparent via-blue-300/20 to-transparent blur-sm"
          style={{ transform: 'rotate(25deg)' }}
        />
        <div 
          className="light-ray absolute top-[15%] right-[50%] w-[2px] h-[30%] bg-gradient-to-b from-transparent via-indigo-400/15 to-transparent blur-sm"
          style={{ transform: 'rotate(18deg)' }}
        />
      </div>

      {/* Film Grain Overlay - Very Subtle */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Style tag for animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  )
}


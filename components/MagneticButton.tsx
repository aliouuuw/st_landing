'use client'

import { useEffect, useRef } from 'react'
import { magneticButton } from '@/lib/animations'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: (e: React.MouseEvent) => void
  strength?: number
}

export function MagneticButton({ 
  children, 
  className = '', 
  href, 
  onClick,
  strength = 0.3 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null)

  useEffect(() => {
    if (!buttonRef.current) return
    
    const cleanup = magneticButton(buttonRef.current as HTMLElement, {
      strength: strength,
      radius: 80,
      scale: 1.05,
      glow: true
    })
    
    return cleanup
  }, [strength])

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  )
}


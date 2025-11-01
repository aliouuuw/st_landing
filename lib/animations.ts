'use client'

import { animate, stagger } from 'animejs'

// Fade and scale reveal animation
export function fadeScaleReveal(
  targets: string | HTMLElement | HTMLElement[],
  options?: {
    delay?: number
    duration?: number
    stagger?: number
  }
) {
  return animate(targets, {
    opacity: [0, 1],
    scale: [0.98, 1],
    translateY: [24, 0],
    duration: options?.duration || 800,
    delay: options?.delay || 0,
    stagger: options?.stagger || 0,
    easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
  })
}

// Staggered text reveal (split by words)
export function staggeredTextReveal(element: HTMLElement, options?: { delay?: number }) {
  const text = element.textContent || ''
  const words = text.split(' ')
  
  element.innerHTML = words
    .map((word) => `<span class="inline-block" style="opacity: 0;">${word}</span>`)
    .join(' ')

  return animate(element.querySelectorAll('span'), {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    delay: stagger(50, { start: options?.delay || 0 }),
    easing: 'easeOutQuad',
  })
}

// Number counter animation
export function animateCounter(
  element: HTMLElement,
  targetValue: number,
  options?: {
    duration?: number
    decimals?: number
    prefix?: string
    suffix?: string
  }
) {
  const obj = { value: 0 }
  
  return animate(obj, {
    value: targetValue,
    duration: options?.duration || 2000,
    easing: 'easeOutExpo',
    round: options?.decimals !== undefined ? Math.pow(10, options.decimals) : 1,
    update: () => {
      const prefix = options?.prefix || ''
      const suffix = options?.suffix || ''
      element.textContent = `${prefix}${obj.value.toFixed(options?.decimals || 0)}${suffix}`
    },
  })
}

// Magnetic button effect
export function magneticButton(button: HTMLElement, strength: number = 0.3) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    animate(button, {
      translateX: deltaX,
      translateY: deltaY,
      duration: 300,
      easing: 'easeOutQuad',
    })
  }

  const handleMouseLeave = () => {
    animate(button, {
      translateX: 0,
      translateY: 0,
      duration: 500,
      easing: 'easeOutElastic(1, 0.6)',
    })
  }

  button.addEventListener('mousemove', handleMouseMove)
  button.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    button.removeEventListener('mousemove', handleMouseMove)
    button.removeEventListener('mouseleave', handleMouseLeave)
  }
}

// Scroll-triggered animation with IntersectionObserver
export function observeAndAnimate(
  selector: string,
  animationFn: (element: HTMLElement) => void,
  options?: IntersectionObserverInit
) {
  if (typeof window === 'undefined') return

  const elements = document.querySelectorAll(selector)
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame to avoid layout thrashing
          requestAnimationFrame(() => {
            animationFn(entry.target as HTMLElement)
          })
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.05,
      rootMargin: '0px 0px -50px 0px',
      ...options,
    }
  )

  elements.forEach((el) => observer.observe(el))

  return observer
}

// Parallax effect
export function parallaxScroll(element: HTMLElement, speed: number = 0.5) {
  const handleScroll = () => {
    const scrolled = window.pageYOffset
    const rect = element.getBoundingClientRect()
    const elementTop = rect.top + scrolled
    
    if (scrolled > elementTop - window.innerHeight && scrolled < elementTop + rect.height) {
      const yPos = -(scrolled - elementTop) * speed
      element.style.transform = `translate3d(0, ${yPos}px, 0)`
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  
  return () => window.removeEventListener('scroll', handleScroll)
}

// Morphing shape animation
export function morphShape(
  target: string | HTMLElement,
  pathData: string[],
  options?: { duration?: number; loop?: boolean }
) {
  return animate(target, {
    d: pathData,
    duration: options?.duration || 3000,
    easing: 'easeInOutQuad',
    loop: options?.loop || false,
  })
}

// Pulse animation for badges
export function pulseAnimation(target: string | HTMLElement) {
  return animate(target, {
    scale: [1, 1.05, 1],
    duration: 1200,
    easing: 'easeInOutQuad',
    loop: true,
  })
}

// Underline slide animation
export function underlineSlide(link: HTMLElement) {
  const underline = document.createElement('span')
  underline.className = 'absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500'
  link.style.position = 'relative'
  link.appendChild(underline)

  const handleMouseEnter = () => {
    animate(underline, {
      width: '100%',
      duration: 220,
      easing: 'easeOutQuad',
    })
  }

  const handleMouseLeave = () => {
    animate(underline, {
      width: 0,
      duration: 220,
      easing: 'easeOutQuad',
    })
  }

  link.addEventListener('mouseenter', handleMouseEnter)
  link.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    link.removeEventListener('mouseenter', handleMouseEnter)
    link.removeEventListener('mouseleave', handleMouseLeave)
  }
}

// Glow effect on hover
export function glowOnHover(element: HTMLElement, color: string = 'rgba(96, 165, 250, 0.3)') {
  const handleMouseEnter = () => {
    animate(element, {
      boxShadow: `0 0 24px ${color}`,
      duration: 180,
      easing: 'easeOutQuad',
    })
  }

  const handleMouseLeave = () => {
    animate(element, {
      boxShadow: '0 0 0px rgba(0, 0, 0, 0)',
      duration: 180,
      easing: 'easeOutQuad',
    })
  }

  element.addEventListener('mouseenter', handleMouseEnter)
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}


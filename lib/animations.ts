'use client'

import { animate, stagger } from 'animejs'

// Elite easing curves
export const EASING = {
  standard: 'cubicBezier(0.4, 0.0, 0.2, 1)',
  enter: 'cubicBezier(0.0, 0.0, 0.2, 1)',
  exit: 'cubicBezier(0.4, 0.0, 1, 1)',
  spring: 'cubicBezier(0.34, 1.56, 0.64, 1)',
  bounce: 'cubicBezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'easeOutElastic(1, 0.6)'
} as const

// Elite duration system
export const DURATION = {
  micro: 160,
  fast: 220,
  standard: 300,
  content: 420,
  slow: 700,
  cinematic: 1200
} as const

// Elite fade and scale reveal with physics
export function fadeScaleReveal(
  targets: string | HTMLElement | HTMLElement[],
  options?: {
    delay?: number
    duration?: number
    stagger?: number
    direction?: 'up' | 'down' | 'left' | 'right'
  }
) {
  const direction = options?.direction || 'up'
  const transforms = {
    up: { translateY: [32, 0] },
    down: { translateY: [-32, 0] },
    left: { translateX: [32, 0] },
    right: { translateX: [-32, 0] }
  }

  return animate(targets, {
    opacity: [0, 1],
    scale: [0.96, 1],
    ...transforms[direction],
    duration: options?.duration || DURATION.content,
    delay: options?.delay || 0,
    stagger: options?.stagger || 60,
    easing: EASING.spring,
  })
}

// Elite text reveal with split animation
export function staggeredTextReveal(
  element: HTMLElement, 
  options?: { 
    delay?: number
    splitBy?: 'words' | 'chars' | 'lines'
    stagger?: number
    direction?: 'up' | 'down'
  }
) {
  const text = element.textContent || ''
  const splitBy = options?.splitBy || 'words'
  const direction = options?.direction || 'up'
  
  let parts: string[]
  if (splitBy === 'words') {
    parts = text.split(' ')
  } else if (splitBy === 'chars') {
    parts = text.split('')
  } else {
    parts = text.split('\n')
  }
  
  const joinChar = splitBy === 'words' ? ' ' : ''
  
  element.innerHTML = parts
    .map((part) => {
      const transform = direction === 'up' ? 'translateY(100%)' : 'translateY(-100%)'
      return `<span class="inline-block overflow-hidden"><span class="inline-block" style="opacity: 0; transform: ${transform};">${part}</span></span>`
    })
    .join(joinChar)

  const spans = element.querySelectorAll('span span')
  
  return animate(spans, {
    opacity: [0, 1],
    translateY: direction === 'up' ? ['100%', '0%'] : ['-100%', '0%'],
    duration: DURATION.content,
    delay: stagger(options?.stagger || 80, { start: options?.delay || 0 }),
    easing: EASING.spring,
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

// Elite magnetic button with proximity zones
export function magneticButton(
  button: HTMLElement, 
  options?: {
    strength?: number
    radius?: number
    scale?: number
    glow?: boolean
  }
) {
  const strength = options?.strength || 0.4
  const radius = options?.radius || 100
  const scale = options?.scale || 1.05
  const glow = options?.glow !== false
  
  let isInRange = false
  
  const handleMouseMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    )
    
    if (distance < radius) {
      if (!isInRange) {
        isInRange = true
        // Enter magnetic field
        animate(button, {
          scale: scale,
          duration: DURATION.fast,
          easing: EASING.spring,
        })
        
        if (glow) {
          animate(button, {
            boxShadow: '0 0 32px rgba(37, 99, 235, 0.3)',
            duration: DURATION.fast,
            easing: EASING.enter,
          })
        }
      }
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      animate(button, {
        translateX: deltaX,
        translateY: deltaY,
        duration: DURATION.micro,
        easing: EASING.standard,
      })
    } else if (isInRange) {
      isInRange = false
      handleMouseLeave()
    }
  }

  const handleMouseLeave = () => {
    isInRange = false
    animate(button, {
      translateX: 0,
      translateY: 0,
      scale: 1,
      boxShadow: '0 0 0px rgba(0, 0, 0, 0)',
      duration: DURATION.slow,
      easing: EASING.elastic,
    })
  }

  document.addEventListener('mousemove', handleMouseMove)
  button.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    document.removeEventListener('mousemove', handleMouseMove)
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

// Elite glow effect with multiple layers
export function glowOnHover(
  element: HTMLElement, 
  options?: {
    color?: string
    intensity?: 'subtle' | 'medium' | 'strong'
    duration?: number
  }
) {
  const color = options?.color || 'rgba(37, 99, 235, 0.3)'
  const intensity = options?.intensity || 'medium'
  const duration = options?.duration || DURATION.fast
  
  const glowLevels = {
    subtle: `0 0 16px ${color}`,
    medium: `0 0 24px ${color}, 0 0 48px ${color.replace('0.3', '0.1')}`,
    strong: `0 0 32px ${color}, 0 0 64px ${color.replace('0.3', '0.15')}, 0 0 96px ${color.replace('0.3', '0.05')}`
  }

  const handleMouseEnter = () => {
    animate(element, {
      boxShadow: glowLevels[intensity],
      duration,
      easing: EASING.enter,
    })
  }

  const handleMouseLeave = () => {
    animate(element, {
      boxShadow: '0 0 0px rgba(0, 0, 0, 0)',
      duration,
      easing: EASING.exit,
    })
  }

  element.addEventListener('mouseenter', handleMouseEnter)
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}

// Navigation scroll choreography
export function navigationScrollChoreography(
  nav: HTMLElement,
  options?: {
    hideThreshold?: number
    showThreshold?: number
  }
) {
  let lastScrollY = 0
  let isHidden = false
  const hideThreshold = options?.hideThreshold || 100
  const showThreshold = options?.showThreshold || 50
  
  const handleScroll = () => {
    const currentScrollY = window.scrollY
    const scrollingDown = currentScrollY > lastScrollY
    const scrollDelta = Math.abs(currentScrollY - lastScrollY)
    
    if (scrollingDown && currentScrollY > hideThreshold && !isHidden && scrollDelta > 5) {
      // Hide navigation
      isHidden = true
      animate(nav, {
        translateY: '-100%',
        duration: DURATION.standard,
        easing: EASING.exit,
      })
    } else if (!scrollingDown && scrollDelta > showThreshold && isHidden) {
      // Show navigation
      isHidden = false
      animate(nav, {
        translateY: '0%',
        duration: DURATION.content,
        easing: EASING.spring,
      })
    }
    
    lastScrollY = currentScrollY
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  return () => window.removeEventListener('scroll', handleScroll)
}

// Progress ring animation
export function progressRing(
  element: HTMLElement,
  progress: number,
  options?: {
    duration?: number
    color?: string
  }
) {
  const duration = options?.duration || DURATION.content
  const circumference = 2 * Math.PI * 16 // Assuming radius of 16
  const offset = circumference - (progress / 100) * circumference
  
  return animate(element, {
    strokeDashoffset: offset,
    duration,
    easing: EASING.standard,
  })
}

// Atmospheric particle system
export function createAtmosphericParticles(
  container: HTMLElement,
  count: number = 20
) {
  const particles: HTMLElement[] = []
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div')
    particle.className = 'absolute w-1 h-1 bg-blue-500/20 rounded-full pointer-events-none'
    particle.style.left = Math.random() * 100 + '%'
    particle.style.top = Math.random() * 100 + '%'
    
    container.appendChild(particle)
    particles.push(particle)
    
    // Animate particle
    animate(particle, {
      translateY: [0, -Math.random() * 200 - 100],
      translateX: [0, (Math.random() - 0.5) * 100],
      opacity: [0, Math.random() * 0.6 + 0.2, 0],
      scale: [0, Math.random() * 0.8 + 0.4, 0],
      duration: Math.random() * 3000 + 2000,
      delay: Math.random() * 2000,
      easing: 'easeOutQuad',
      loop: true,
    })
  }
  
  return () => {
    particles.forEach(particle => particle.remove())
  }
}

// Typewriter animation with looping and flash deletion
export function typewriterLoop(
  element: HTMLElement,
  sentences: Array<{ text: string; highlight?: string }>,
  options?: {
    typingSpeed?: number
    deletingSpeed?: number
    pauseDuration?: number
    cursorChar?: string
  }
) {
  const typingSpeed = options?.typingSpeed || 80
  const deletingSpeed = options?.deletingSpeed || 20
  const pauseDuration = options?.pauseDuration || 2000
  const cursorChar = options?.cursorChar || '|'
  
  let currentIndex = 0
  let isDeleting = false
  let currentText = ''
  let timeoutId: NodeJS.Timeout
  let deleteChunkSize = 1
  
  const renderText = (text: string, sentence: { text: string; highlight?: string }, showFlash: boolean = false) => {
    const flashClass = showFlash ? 'text-shadow-glow' : ''
    
    if (sentence.highlight && text.includes(sentence.highlight)) {
      const parts = text.split(sentence.highlight)
      if (parts.length > 1) {
        element.innerHTML = `<span class="${flashClass}">${parts[0]}<span class="text-blue-gradient">${sentence.highlight}</span>${parts[1]}</span><span class="inline-block w-1 h-[0.7em] bg-blue-500 ml-1 animate-pulse"></span>`
      } else {
        element.innerHTML = `<span class="${flashClass}">${text}</span><span class="inline-block w-1 h-[0.7em] bg-blue-500 ml-1 animate-pulse"></span>`
      }
    } else {
      element.innerHTML = `<span class="${flashClass}">${text}</span><span class="inline-block w-1 h-[0.7em] bg-blue-500 ml-1 animate-pulse"></span>`
    }
  }
  
  const updateText = () => {
    const sentence = sentences[currentIndex]
    const fullText = sentence.text
    
    if (!isDeleting) {
      // Typing
      currentText = fullText.substring(0, currentText.length + 1)
      
      if (currentText === fullText) {
        // Finished typing, pause then start deleting
        deleteChunkSize = 1 // Reset chunk size
        timeoutId = setTimeout(() => {
          isDeleting = true
          updateText()
        }, pauseDuration)
        
        renderText(currentText, sentence)
        return
      }
      
      renderText(currentText, sentence)
      timeoutId = setTimeout(updateText, typingSpeed)
    } else {
      // Flash deletion - accelerating chunks
      const charsToDelete = Math.min(deleteChunkSize, currentText.length)
      currentText = fullText.substring(0, currentText.length - charsToDelete)
      
      // Accelerate deletion (Tron-style)
      deleteChunkSize = Math.min(deleteChunkSize + 1, 8)
      
      if (currentText === '') {
        // Finished deleting, flash effect then move to next
        element.innerHTML = '<span class="inline-block w-1 h-[0.7em] bg-blue-500 ml-1 animate-ping"></span>'
        
        isDeleting = false
        currentIndex = (currentIndex + 1) % sentences.length
        timeoutId = setTimeout(updateText, 300)
        return
      }
      
      // Show flash effect during fast deletion
      renderText(currentText, sentence, deleteChunkSize > 2)
      
      const speed = Math.max(deletingSpeed / deleteChunkSize, 8)
      timeoutId = setTimeout(updateText, speed)
    }
  }
  
  // Start the animation
  updateText()
  
  // Return cleanup function
  return () => {
    if (timeoutId) clearTimeout(timeoutId)
  }
}


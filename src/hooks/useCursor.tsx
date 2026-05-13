/**
 * Custom cursor — mix-blend-mode: difference white dot that follows the pointer
 * and grows when hovering interactive elements.
 *
 * Disabled automatically on touch devices and when prefers-reduced-motion is set.
 * Renders a fixed-position element via portal-like inline render in App.
 */

import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/lib/hooks'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor="interactive"]'

const isFinePointerDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: fine)').matches
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const enabled = isFinePointerDevice() && !reduced

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    if (!dot) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let initialized = false

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      if (!initialized) {
        currentX = targetX
        currentY = targetY
        initialized = true
      } else {
        currentX = lerp(currentX, targetX, 0.22)
        currentY = lerp(currentY, targetY, 0.22)
      }
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(animate)
    }

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      dot.style.opacity = '1'
    }

    const onLeave = () => {
      dot.style.opacity = '0'
    }

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (target && target.closest(INTERACTIVE_SELECTOR)) {
        dot.dataset.state = 'hover'
      } else {
        dot.dataset.state = 'idle'
      }
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    document.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      data-state="idle"
      className="
        pointer-events-none fixed left-0 top-0 z-[9999]
        h-1.5 w-1.5 rounded-full bg-white
        mix-blend-difference
        opacity-0
        transition-[width,height,opacity]
        duration-300 ease-out
        data-[state=hover]:h-10 data-[state=hover]:w-10
      "
      style={{ willChange: 'transform' }}
    />
  )
}

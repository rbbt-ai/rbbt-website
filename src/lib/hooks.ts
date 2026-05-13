/**
 * Shared hooks used across sections.
 */

import { useEffect, useState } from 'react'

/**
 * useIsMobile — reactive matchMedia hook.
 * Default breakpoint mirrors Tailwind's `md` (768px).
 */
export function useIsMobile(maxWidth = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(`(max-width: ${maxWidth - 1}px)`).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia(`(max-width: ${maxWidth - 1}px)`)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [maxWidth])

  return isMobile
}

/**
 * useActiveSection — observes section IDs in the viewport and returns the topmost active one.
 * Useful for syncing header nav active state with scroll position.
 */
export function useActiveSection(sectionIds: readonly string[], rootMargin = '-30% 0px -60% 0px'): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) {
          setActive(visible.target.id)
        }
      },
      { rootMargin, threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds, rootMargin])

  return active
}

/**
 * usePrefersReducedMotion — respects the user's OS setting.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return reduced
}

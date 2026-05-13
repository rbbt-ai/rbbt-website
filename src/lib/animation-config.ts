/**
 * Animation Config — Single source of truth for motion qualities
 *
 * Applies Disney's 12 principles selectively for institutional polish:
 * - Slow In/Out: nomed easing presets (avoid `linear`, avoid framer defaults blindly)
 * - Staging: hierarchical delays defined here, not per-component
 * - Anticipation: pause constants used between sequential reveals
 *
 * Division of responsibility between animation libs:
 *   - Framer Motion → layout, scroll-triggered reveals, page transitions, hover states
 *   - anime.js v4   → text line-reveals (product heros), SVG path timelines (GrowthConnector),
 *                     organic stagger (Manifesto). Scope: max 5 components.
 *   - GSAP          → scroll-scrub on video (CamiIntroSection only, if/when ported).
 */

// ────────────────────────────────────────────────────────────────────────────
// Easing presets
// Cubic-bezier tuples. Use these in framer-motion `transition.ease`.
// Names match anime.js v4 conventions for cross-lib consistency.
// ────────────────────────────────────────────────────────────────────────────

export const easeOutCubic = [0.33, 1, 0.68, 1] as const
export const easeInOutCubic = [0.65, 0, 0.35, 1] as const
export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeInOutExpo = [0.87, 0, 0.13, 1] as const
export const easeOutQuart = [0.25, 1, 0.5, 1] as const
export const easeStandard = [0.25, 0.1, 0.25, 1] as const

// anime.js v4 named easings (string identifiers) — keep parity with the bezier values above
export const animeEase = {
  outCubic: 'outCubic',
  inOutCubic: 'inOutCubic',
  outExpo: 'outExpo',
  inOutExpo: 'inOutExpo',
  outQuart: 'outQuart',
} as const

// ────────────────────────────────────────────────────────────────────────────
// Duration constants (seconds for framer-motion, milliseconds for anime.js)
// ────────────────────────────────────────────────────────────────────────────

export const duration = {
  instant: 0.15,
  fast: 0.3,
  medium: 0.6,
  slow: 0.9,
  page: 1.2,
} as const

export const durationMs = {
  instant: 150,
  fast: 300,
  medium: 600,
  slow: 900,
  page: 1200,
} as const

// ────────────────────────────────────────────────────────────────────────────
// Spring presets — for layout animations and interactive reveals
// ────────────────────────────────────────────────────────────────────────────

export const springSnappy = {
  type: 'spring',
  stiffness: 380,
  damping: 30,
  mass: 0.8,
} as const

export const springGentle = {
  type: 'spring',
  stiffness: 150,
  damping: 22,
  mass: 1,
} as const

export const springSoft = {
  type: 'spring',
  stiffness: 80,
  damping: 20,
  mass: 1.2,
} as const

// ────────────────────────────────────────────────────────────────────────────
// Staging delays — hierarchical reveal timing
// Use these to give the eye a path through a section, not random simultaneity.
// ────────────────────────────────────────────────────────────────────────────

export const stageDelay = {
  label: 0,
  anticipation: 0.1,   // breath between label and headline
  headline: 0.18,
  subhead: 0.42,
  cta: 0.62,
  decoration: 0.8,     // background grain, parallax, etc. — last to draw eye
} as const

// Stagger amounts for child reveals inside a parent container
export const stagger = {
  tight: 0.04,
  default: 0.08,
  loose: 0.14,
  prose: 0.18,         // for manifesto-style paragraph reveals
} as const

// ────────────────────────────────────────────────────────────────────────────
// Viewport reveal defaults — applied to all `whileInView` patterns
// ────────────────────────────────────────────────────────────────────────────

export const viewportOnce = { once: true, amount: 0.2 } as const
export const viewportRepeat = { once: false, amount: 0.3 } as const

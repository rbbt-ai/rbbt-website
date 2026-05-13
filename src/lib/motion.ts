/**
 * Framer Motion variants — typed, consolidated, reused across all sections.
 * Built on top of animation-config.ts presets so that any easing/timing change
 * propagates everywhere from a single edit.
 */

import type { Variants } from 'framer-motion'
import {
  easeOutCubic,
  easeOutExpo,
  duration,
  stagger,
  stageDelay,
} from './animation-config'

// ────────────────────────────────────────────────────────────────────────────
// Container variants — orchestrate children with stagger
// ────────────────────────────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.default,
      delayChildren: stageDelay.anticipation,
    },
  },
}

export const staggerContainerTight: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.tight,
      delayChildren: stageDelay.anticipation,
    },
  },
}

export const staggerContainerLoose: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.loose,
      delayChildren: stageDelay.anticipation,
    },
  },
}

// ────────────────────────────────────────────────────────────────────────────
// Item variants — for elements inside a stagger container
// ────────────────────────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.medium, ease: easeOutCubic },
  },
}

export const fadeUpSlow: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.medium, ease: easeOutCubic },
  },
}

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.medium, ease: easeOutCubic },
  },
}

// ────────────────────────────────────────────────────────────────────────────
// Page transition variants — used by AnimatePresence at the route level
// ────────────────────────────────────────────────────────────────────────────

export const pageVariants: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: duration.fast, ease: easeOutCubic },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.instant, ease: easeOutCubic },
  },
}

// ────────────────────────────────────────────────────────────────────────────
// Hero staging — sequential reveal applying anticipation principle
// Used in HeroSection: label appears, breath, then headline, etc.
// ────────────────────────────────────────────────────────────────────────────

export const heroLabel: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.medium,
      ease: easeOutCubic,
      delay: stageDelay.label,
    },
  },
}

export const heroHeadline: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easeOutExpo,
      delay: stageDelay.headline,
    },
  },
}

export const heroSubhead: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.medium,
      ease: easeOutCubic,
      delay: stageDelay.subhead,
    },
  },
}

export const heroCta: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.medium,
      ease: easeOutCubic,
      delay: stageDelay.cta,
    },
  },
}

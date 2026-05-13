import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { heroLabel, heroHeadline, heroCta } from '@/lib/motion'

/**
 * HeroSection — editorial, Apple/Japan minimalism.
 *
 * Design decisions (from frontend-developer review):
 * - NO stats grid (anti-institutional signal)
 * - NO gradient clip text on the headline (absence of typographic trick IS the trick)
 * - Staging sequence: strapline → anticipation → headline → subhead → CTA
 *   (Disney principle: anticipation creates the headline as a "response", not a parallel reveal)
 * - One primary CTA + one secondary text link (not two equal buttons)
 */
export function HeroSection() {
  return (
    <section className="relative min-h-[88vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Subtle ambient gradient — barely visible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(147, 51, 234, 0.08) 0%, transparent 55%)',
        }}
      />

      {/* Grain texture — adds depth, ~1KB inline */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <Container className="relative z-10 pt-28 pb-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Brand wordmark — solid fill in PP Neue Machina Light.
              "rbbt" in primary, "lab" in foreground. Scales fluidly with viewport via clamp(). */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={heroLabel}
            aria-label="rbbt lab"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(3rem, 9vw, 10rem)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              textRendering: 'geometricPrecision',
            }}
            className="
              flex items-baseline justify-center gap-[0.08em]
              leading-[0.85]
              mb-10 md:mb-14
              -mx-4 sm:-mx-8 md:-mx-12
              tracking-[-0.02em]
            "
          >
            <span className="text-[var(--primary)]">rbbt</span>
            <span className="text-[var(--foreground)]">lab</span>
          </motion.h1>

          {/* Tagline única — a frase canônica da marca.
              Hierarquia: afirmação roman (foreground) + propósito itálico (muted). */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroHeadline}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
            className="
              text-xl md:text-2xl lg:text-3xl
              leading-[1.3] tracking-[-0.01em]
              text-[var(--foreground)]/90
              max-w-4xl mx-auto mb-14 md:mb-16
            "
          >
            A arquitetura cognitiva que opera sua empresa.
            <br />
            <span className="italic text-[var(--muted)]">Para que seu time pense nela.</span>
          </motion.p>

          {/* CTAs — single primary + text link */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroCta}
            className="flex flex-col sm:flex-row sm:items-center justify-center gap-5"
          >
            <Button size="lg" asChild>
              <Link to="/contato" className="group">
                Falar com a gente
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <a
              href="#plataforma"
              className="
                group inline-flex items-center gap-2 text-sm font-medium
                text-[var(--foreground)]/80 hover:text-[var(--foreground)]
                transition-colors
              "
            >
              Conheça a plataforma
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

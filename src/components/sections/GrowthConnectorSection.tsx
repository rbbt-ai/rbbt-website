import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { createTimeline } from 'animejs'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { fadeUp } from '@/lib/motion'
import { viewportOnce, durationMs, animeEase } from '@/lib/animation-config'
import { usePrefersReducedMotion } from '@/lib/hooks'

/**
 * GrowthConnectorSection — the ecosystem visualization.
 *
 * Layout: three blocks in linear sequence — RBBT Social → RBBT.GROWTH → RBBT Sales.
 * Animation: SVG connectors draw sequentially via anime.js v4 timeline.
 *
 * Why anime.js here: Framer Motion can do single path-draw with `pathLength`, but
 * orchestrating two paths with relative offsets (`-200ms`) requires manual delay
 * math. anime.js v4's `createTimeline().add(..., '-=200')` handles it cleanly.
 *
 * Trigger: Framer Motion `useInView` (section is below the fold; no premature fire).
 */
export function GrowthConnectorSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { amount: 0.4, once: true })
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!inView || reduced) return

    // Both connector paths animated via stroke-dashoffset.
    // We set initial dasharray/dashoffset inline in JSX so they're invisible
    // until the timeline plays.
    const tl = createTimeline({ defaults: { ease: animeEase.inOutCubic } })

    tl.add(
      '#growth-path-left',
      { strokeDashoffset: 0, duration: durationMs.medium },
    )
      .add(
        '#growth-node-center',
        { opacity: [0, 1], scale: [0.9, 1], duration: durationMs.fast, ease: animeEase.outCubic },
        '-=200',
      )
      .add(
        '#growth-path-right',
        { strokeDashoffset: 0, duration: durationMs.medium },
        '-=150',
      )
      .add(
        '.growth-node-end',
        {
          opacity: [0.4, 1],
          scale: [0.96, 1],
          duration: durationMs.fast,
          delay: (_el: Element, i: number) => i * 60,
          ease: animeEase.outCubic,
        },
        '-=250',
      )

    return () => {
      tl.cancel()
    }
  }, [inView, reduced])

  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp} className="mb-20 md:mb-24 max-w-2xl">
            <SectionLabel accent="primary">Conectados</SectionLabel>
            <h2
              className="
                mt-6 font-[var(--font-display)] font-light
                text-4xl md:text-5xl lg:text-6xl
                leading-[1.05] tracking-[-0.02em]
                text-[var(--foreground)]
              "
            >
              Quando os dois se falam, <br className="hidden md:inline" />
              <span className="text-[var(--muted)]">a operação aprende.</span>
            </h2>
            <p className="mt-6 text-base text-[var(--muted)] leading-relaxed">
              Uma dúvida no Instagram vira contexto na conversa do WhatsApp. Uma objeção no WhatsApp
              vira pauta de conteúdo. Sem operador no meio — porque a plataforma por baixo é a mesma.
            </p>
          </motion.div>

          {/* Connector diagram */}
          <div ref={containerRef} className="relative">
            <div className="grid grid-cols-3 items-center gap-4 md:gap-8">
              {/* Left node — RBBT Social */}
              <NodeEnd accent="social" label="RBBT Social" lines={['Escuta o', 'Instagram']} />

              {/* Center node — RBBT.GROWTH */}
              <div className="flex justify-center">
                <div
                  id="growth-node-center"
                  className="
                    relative flex items-center justify-center
                    h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40
                    rounded-full
                    border border-[var(--primary)]/40
                    bg-[var(--primary)]/[0.08]
                    backdrop-blur-sm
                  "
                  style={{ opacity: 0 }}
                >
                  <span
                    className="
                      font-[var(--font-display)] font-light
                      text-xs md:text-sm
                      text-[var(--foreground)]
                      uppercase tracking-[0.2em]
                      text-center px-2
                    "
                  >
                    rbbt
                    <br />
                    lab
                  </span>
                  {/* Subtle pulse ring */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-[var(--primary)]/20 animate-ping"
                    style={{ animationDuration: '3s' }}
                  />
                </div>
              </div>

              {/* Right node — RBBT Sales */}
              <NodeEnd accent="sales" label="RBBT Sales" lines={['Guia no', 'WhatsApp']} />
            </div>

            {/* SVG connector lines — drawn via anime.js timeline */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="growthGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--social-blue)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="growthGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--sales-green)" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <path
                id="growth-path-left"
                d="M 17 10 L 42 10"
                stroke="url(#growthGradLeft)"
                strokeWidth="0.4"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="25"
                strokeDashoffset="25"
              />
              <path
                id="growth-path-right"
                d="M 58 10 L 83 10"
                stroke="url(#growthGradRight)"
                strokeWidth="0.4"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="25"
                strokeDashoffset="25"
              />
            </svg>
          </div>

          {/* Bottom caption */}
          <motion.div variants={fadeUp} className="mt-16 md:mt-20 text-center">
            <p className="text-sm text-[var(--muted)]">
              A inteligência potencializa. O humano cria. A marca evolui. <span className="text-[var(--foreground)]">O consumidor é servido.</span>
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

interface NodeEndProps {
  accent: 'sales' | 'social'
  label: string
  lines: [string, string]
}

const accentClasses: Record<'sales' | 'social', { ring: string; dot: string; text: string }> = {
  sales: {
    ring: 'border-[var(--sales-green)]/30',
    dot: 'bg-[var(--sales-green)]',
    text: 'text-[var(--sales-green)]',
  },
  social: {
    ring: 'border-[var(--social-blue)]/30',
    dot: 'bg-[var(--social-blue)]',
    text: 'text-[var(--social-blue)]',
  },
}

function NodeEnd({ accent, label, lines }: NodeEndProps) {
  const a = accentClasses[accent]
  return (
    <div
      className="growth-node-end flex flex-col items-center text-center"
      style={{ opacity: 0.4 }}
    >
      <div
        className={`
          flex items-center gap-2 mb-3
          rounded-full border ${a.ring}
          bg-white/[0.02]
          px-3 py-1.5
        `}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} aria-hidden="true" />
        <span className={`text-xs font-medium ${a.text} tracking-wide`}>{label}</span>
      </div>
      <p className="text-xs md:text-sm text-[var(--muted)] leading-snug font-[var(--font-display)] font-light">
        {lines[0]}
        <br />
        {lines[1]}
      </p>
    </div>
  )
}

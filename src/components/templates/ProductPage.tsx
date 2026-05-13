import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { animate, stagger } from 'animejs'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce, durationMs, animeEase } from '@/lib/animation-config'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { IntegratedDemo } from '@/components/flowchart-v2/IntegratedDemo'
import type { ProductConfig, IntegrationStatus } from '@/data/products'

interface ProductPageProps {
  config: ProductConfig
}

const accentTextClass = {
  sales: 'text-[var(--sales-green)]',
  social: 'text-[var(--social-blue)]',
} as const

const integrationStatusLabel: Record<IntegrationStatus, string> = {
  active: 'Ativo',
  'in-development': 'Em desenvolvimento',
  planned: 'Planejado',
}

const integrationStatusClass: Record<IntegrationStatus, string> = {
  active: 'border-[var(--sales-green)]/30 bg-[var(--sales-green)]/[0.06] text-[var(--sales-green)]',
  'in-development': 'border-[var(--social-blue)]/30 bg-[var(--social-blue)]/[0.06] text-[var(--social-blue)]',
  planned: 'border-white/10 bg-white/[0.03] text-white/60',
}

export function ProductPage({ config }: ProductPageProps) {
  return (
    <main className="pt-16">
      <Hero config={config} />
      <Audience config={config} />
      <Features config={config} />
      {config.slug === 'sales' && <LiveDemo />}
      {config.integrations && <Integrations config={config} />}
      <Pricing config={config} />
      <CrossSell config={config} />
      <Closing config={config} />
    </main>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// LiveDemo — Sales-only. Render o IntegratedDemo da flowchart-v2 dentro
// de um wrapper com label + headline + body, depois das features.
// ────────────────────────────────────────────────────────────────────────────

function LiveDemo() {
  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-12 md:mb-16 max-w-2xl">
            <SectionLabel accent="sales">Demo em tempo real</SectionLabel>
            <h2
              className="
                mt-6 font-[var(--font-display)] font-light
                text-3xl md:text-4xl lg:text-5xl
                leading-[1.1] tracking-[-0.02em]
                text-[var(--foreground)] mb-6
              "
            >
              O agente em ação. <br className="hidden md:inline" />
              <span className="text-[var(--muted)]">WhatsApp, memória, contexto.</span>
            </h2>
            <p className="text-base text-[var(--muted)] leading-relaxed max-w-xl">
              Uma conversa real entre cliente e agente. Veja a mensagem chegar, a inteligência
              consultar memória, estoque e base de conhecimento, e a resposta voltar — em segundos,
              com contexto, na voz da marca.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <IntegratedDemo />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Hero — line-reveal headline via anime.js v4 stagger
// ────────────────────────────────────────────────────────────────────────────

function Hero({ config }: ProductPageProps) {
  const { hero } = config
  const linesRef = useRef<HTMLSpanElement[]>([])
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const targets = linesRef.current.filter(Boolean)
    if (targets.length === 0) return

    animate(targets, {
      translateY: ['100%', '0%'],
      opacity: [0, 1],
      duration: durationMs.slow,
      ease: animeEase.outExpo,
      delay: stagger(120, { start: 200 }),
    })
  }, [reduced])

  return (
    <section className="relative min-h-[78vh] flex items-center overflow-hidden">
      {/* Soft accent gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            config.accentColor === 'sales'
              ? 'radial-gradient(ellipse at 50% 0%, rgba(34, 197, 94, 0.08) 0%, transparent 55%)'
              : 'radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 55%)',
        }}
      />

      <Container className="relative z-10 pt-20 pb-16">
        <div className="max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <StatusBadge status={hero.status === 'production' ? 'production' : 'beta'}>
              {hero.eyebrow}
            </StatusBadge>
          </div>

          {/* Headline — anime.js line-reveal */}
          <h1
            className="
              font-[var(--font-display)] font-light
              text-[2.5rem] md:text-[4rem] lg:text-[5.25rem]
              leading-[1.02] tracking-[-0.02em]
              text-[var(--foreground)]
              mb-10
            "
          >
            {hero.headlineLines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  ref={(el) => {
                    if (el) linesRef.current[i] = el
                  }}
                  className="block"
                  style={{
                    transform: reduced ? 'none' : 'translateY(100%)',
                    opacity: reduced ? 1 : 0,
                    willChange: 'transform, opacity',
                  }}
                >
                  {i === 1 ? <span className="text-[var(--muted)]">{line}</span> : line}
                </span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="text-base md:text-lg text-[var(--muted)] max-w-2xl mb-12 leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.33, 1, 0.68, 1] }}
            className="flex flex-col sm:flex-row sm:items-center gap-5"
          >
            <Button size="lg" asChild>
              <Link to={hero.primaryCta.to} className="group">
                {hero.primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Link
              to={hero.secondaryCta.to}
              className="
                group inline-flex items-center gap-2 text-sm font-medium
                text-[var(--foreground)]/80 hover:text-[var(--foreground)]
                transition-colors
              "
            >
              {hero.secondaryCta.label}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Audience — editorial paragraph
// ────────────────────────────────────────────────────────────────────────────

function Audience({ config }: ProductPageProps) {
  const { audience } = config
  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20"
        >
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <SectionLabel accent={config.accentColor}>{audience.eyebrow}</SectionLabel>
          </motion.div>
          <motion.div variants={fadeUp} className="lg:col-span-8">
            <h2
              className="
                font-[var(--font-display)] font-light
                text-3xl md:text-4xl lg:text-5xl
                leading-[1.1] tracking-[-0.02em]
                text-[var(--foreground)] mb-6
              "
            >
              {audience.headline}
            </h2>
            <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
              {audience.body}
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Features — editorial card grid (NOT generic feature cards)
// ────────────────────────────────────────────────────────────────────────────

function Features({ config }: ProductPageProps) {
  const { features } = config
  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-16 md:mb-20 max-w-2xl">
            <SectionLabel accent={config.accentColor}>{features.eyebrow}</SectionLabel>
            <h2
              className="
                mt-6 font-[var(--font-display)] font-light
                text-4xl md:text-5xl lg:text-6xl
                leading-[1.05] tracking-[-0.02em]
                text-[var(--foreground)]
              "
            >
              {features.headline}
            </h2>
            <p className="mt-6 text-base text-[var(--muted)] leading-relaxed">{features.subhead}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className={`grid grid-cols-1 ${features.items.length === 4 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-10 md:gap-14`}
          >
            {features.items.map(({ icon: Icon, title, description }) => (
              <motion.article key={title} variants={fadeUp} className="grid grid-cols-[auto_1fr] gap-5">
                <Icon className={`h-5 w-5 mt-1 ${accentTextClass[config.accentColor]}`} aria-hidden="true" />
                <div>
                  <h3
                    className="
                      font-[var(--font-display)] font-medium
                      text-xl md:text-2xl
                      text-[var(--foreground)]
                      tracking-[-0.01em] mb-3
                    "
                  >
                    {title}
                  </h3>
                  <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Integrations / Differential
// ────────────────────────────────────────────────────────────────────────────

function Integrations({ config }: ProductPageProps) {
  const integ = config.integrations!
  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel accent={config.accentColor}>{integ.eyebrow}</SectionLabel>
            <h2
              className="
                mt-6 font-[var(--font-display)] font-light
                text-3xl md:text-4xl lg:text-5xl
                leading-[1.1] tracking-[-0.02em]
                text-[var(--foreground)] mb-6
              "
            >
              {integ.headline}
            </h2>
            <p className="text-base text-[var(--muted)] leading-relaxed max-w-md">{integ.body}</p>
          </motion.div>

          <motion.ul variants={staggerContainer} className="flex flex-wrap gap-2.5 lg:gap-3 lg:self-end">
            {integ.items.map((item) => (
              <motion.li key={item.label} variants={fadeUp}>
                <span
                  className={`
                    inline-flex items-center gap-2 rounded-full border
                    px-4 py-2 text-sm
                    ${integrationStatusClass[item.status]}
                  `}
                >
                  {item.label}
                  <span className="opacity-70 text-xs">· {integrationStatusLabel[item.status]}</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Pricing — gated, no tiers exposed
// ────────────────────────────────────────────────────────────────────────────

function Pricing({ config }: ProductPageProps) {
  const { pricing } = config
  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel accent={config.accentColor}>{pricing.eyebrow}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="
              mt-6 font-[var(--font-display)] font-light
              text-4xl md:text-5xl lg:text-6xl
              leading-[1.05] tracking-[-0.02em]
              text-[var(--foreground)] mb-8
            "
          >
            {pricing.headline}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base md:text-lg text-[var(--muted)] leading-relaxed mb-6">
            {pricing.body}
          </motion.p>
          <motion.p variants={fadeUp} className="text-sm text-[var(--muted)]/80 italic mb-10">
            {pricing.footnote}
          </motion.p>
          <motion.div variants={fadeUp}>
            <Button asChild>
              <Link to={pricing.cta.to} className="group">
                {pricing.cta.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Cross-sell
// ────────────────────────────────────────────────────────────────────────────

function CrossSell({ config }: ProductPageProps) {
  const { crossSell } = config
  const crossAccent = crossSell.slug === 'sales' ? 'sales' : 'social'

  return (
    <section className="py-24 md:py-32 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel accent={crossAccent}>{crossSell.eyebrow}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="
              mt-6 font-[var(--font-display)] font-light
              text-3xl md:text-4xl lg:text-5xl
              leading-[1.1] tracking-[-0.02em]
              text-[var(--foreground)] mb-6
            "
          >
            {crossSell.headline}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base md:text-lg text-[var(--muted)] leading-relaxed mb-10 max-w-2xl">
            {crossSell.body}
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              to={crossSell.cta.to}
              className={`
                group inline-flex items-center gap-2 text-sm font-medium
                ${accentTextClass[crossAccent]}
                transition-transform
              `}
            >
              {crossSell.cta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Closing CTA
// ────────────────────────────────────────────────────────────────────────────

function Closing({ config }: ProductPageProps) {
  const { closing } = config
  return (
    <section className="py-32 md:py-44 border-t border-white/[0.04] overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 pointer-events-none -mt-32 h-full"
        style={{
          background:
            'radial-gradient(ellipse 800px 500px at 50% 40%, rgba(147, 51, 234, 0.08) 0%, transparent 60%)',
        }}
      />
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="relative max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="
              font-[var(--font-display)] font-light
              text-4xl md:text-5xl lg:text-6xl
              leading-[1.05] tracking-[-0.02em]
              text-[var(--foreground)] mb-8
            "
          >
            {closing.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-[var(--muted)] max-w-xl mx-auto mb-12 leading-relaxed"
          >
            {closing.subhead}
          </motion.p>
          <motion.div variants={fadeUp}>
            <Button asChild size="lg" className="group">
              <Link to={closing.cta.to}>
                {closing.cta.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

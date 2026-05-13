import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce } from '@/lib/animation-config'

/**
 * Cases lightweight — três casos lado a lado.
 * Camys (origem Rbbt Sales), X-One (origem Rbbt Social), NBA Stores (em customização).
 * NBA destacado apenas pela cor do eyebrow (primary), mantendo proporção visual.
 */

interface CasePreview {
  n: '01' | '02' | '03'
  caseLabel: string
  brand: string
  logoSrc: string
  logoHeight: string
  description: string
  segment: string
  channel: string
  productLabel: string
  productSlug: '/sales' | '/social' | '/contato'
  accent?: 'primary'
}

const cases: readonly CasePreview[] = [
  {
    n: '01',
    caseLabel: 'Origem · Rbbt Sales',
    brand: 'Camys',
    logoSrc: '/logos/camys.png',
    logoHeight: 'h-7 md:h-8',
    description:
      'Marca de moda feminina que vende, atende e fideliza pelo WhatsApp. Foi a operação real que deu origem ao Rbbt Sales: um agente de vendas com memória, que conhece o catálogo, lê o histórico da cliente e conduz a conversa até o pedido — sem fricção, sem perder o tom da marca.',
    segment: 'Moda feminina',
    channel: 'WhatsApp',
    productLabel: 'Ver Rbbt Sales',
    productSlug: '/sales',
  },
  {
    n: '02',
    caseLabel: 'Origem · Rbbt Social',
    brand: 'X-One',
    logoSrc: '/logos/xone.png',
    logoHeight: 'h-8 md:h-9',
    description:
      'Marca de acessórios premium que constrói demanda no Instagram. Foi a operação que originou o Rbbt Social: leitura de sinais em comentários e DMs, cruzamento entre orgânico e ads, e resposta na voz da marca. A inteligência identifica intenção de compra antes do clique e protege a experiência em escala.',
    segment: 'Acessórios premium',
    channel: 'Instagram',
    productLabel: 'Ver Rbbt Social',
    productSlug: '/social',
  },
  {
    n: '03',
    caseLabel: 'Customização em andamento · Varejo físico em rede',
    brand: 'NBA Stores',
    logoSrc: '/logos/nba.png',
    logoHeight: 'h-12 md:h-14',
    description:
      'Estamos customizando a infraestrutura Rbbt Lab para a operação nacional da NBA Stores Brasil: 30 lojas físicas integradas em uma única camada de decisão. Rbbt Social, Rbbt Sales, ERP Microvix Linx e agentes especialistas operam conectados — normalização de dados, alertas em tempo real e inteligência aplicada onde gera resultado: eficiência operacional, gestão de estoque e times de loja decidindo com contexto.',
    segment: '30 lojas físicas',
    channel: 'ERP Microvix Linx',
    productLabel: 'Falar com a gente',
    productSlug: '/contato',
    accent: 'primary',
  },
] as const

export function CasesLightweight() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-16 md:mb-20 max-w-2xl">
            <SectionLabel accent="muted">Aplicada em contextos distintos</SectionLabel>
            <h2
              className="
                mt-6 font-[var(--font-display)] font-light
                text-4xl md:text-5xl lg:text-6xl
                leading-[1.05] tracking-[-0.02em]
                text-[var(--foreground)]
              "
            >
              Da moda <br className="hidden md:inline" />
              <span className="text-[var(--muted)]">ao varejo físico em rede.</span>
            </h2>
            <p className="mt-6 text-base text-[var(--muted)] leading-relaxed">
              A mesma infraestrutura, três operações diferentes: moda feminina convertendo no
              WhatsApp, acessórios premium gerando demanda no Instagram, e uma rede nacional de
              varejo físico operando lojas conectadas em tempo real. Cada caso revela um lado da
              plataforma — a mesma camada de inteligência, moldada para o contexto de cada marca.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 md:items-stretch"
          >
            {cases.map((c) => (
              <CaseCard key={c.n} c={c} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────

function CaseCard({ c }: { c: CasePreview }) {
  const eyebrowColor =
    c.accent === 'primary' ? 'text-[var(--primary)]' : 'text-[var(--muted)]'

  return (
    <motion.article
      variants={fadeUp}
      aria-label={`Caso ${c.brand} — ${c.caseLabel}`}
      className="
        group flex flex-col
        rounded-2xl
        border border-white/[0.06]
        bg-white/[0.015]
        p-6 md:p-8
        transition-colors duration-300
        hover:border-white/[0.12]
      "
    >
      {/* Número + caseLabel */}
      <div className="flex items-baseline gap-4 mb-6">
        <span
          aria-hidden="true"
          className="font-[var(--font-display)] font-light text-2xl text-[var(--muted)]/60 tracking-tight"
        >
          {c.n}
        </span>
        <span
          className={`text-xs uppercase tracking-[0.2em] font-[var(--font-display)] ${eyebrowColor}`}
        >
          {c.caseLabel}
        </span>
      </div>

      {/* Logo — container uniforme, altura proporcional do logo dentro */}
      <div className="flex items-end h-12 md:h-14 mb-6 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        <img
          src={c.logoSrc}
          alt={c.brand}
          className={`${c.logoHeight} w-auto`}
          loading="lazy"
        />
      </div>

      {/* Body */}
      <p className="text-sm text-[var(--muted)] leading-relaxed mb-6 max-w-[42ch]">
        {c.description}
      </p>

      {/* Metadata */}
      <p className="text-sm text-[var(--muted)] mb-8">
        {c.segment} <span className="opacity-50">·</span> {c.channel}
      </p>

      {/* CTA — empurrado pro fundo */}
      <Link
        to={c.productSlug}
        className="
          mt-auto inline-flex items-center gap-2 text-sm font-medium
          text-[var(--foreground)]/80 hover:text-[var(--foreground)]
          transition-colors py-2 min-h-[44px]
        "
        aria-label={`${c.productLabel} — caso ${c.brand}`}
      >
        {c.productLabel}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.article>
  )
}

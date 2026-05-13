import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingBag, BarChart3, ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce } from '@/lib/animation-config'

/**
 * Products preview — two side-by-side editorial cards (NOT a feature grid).
 * Each card is a portal into the full /sales or /social product page.
 */

interface ProductPreview {
  slug: '/sales' | '/social'
  shortName: string
  fullName: string
  status: 'production' | 'beta'
  statusLabel: string
  Icon: typeof ShoppingBag
  headline: string
  body: string
  cta: string
  accent: 'sales' | 'social'
}

const products: readonly ProductPreview[] = [
  {
    slug: '/sales',
    shortName: 'Sales',
    fullName: 'Rbbt Sales',
    status: 'production',
    statusLabel: 'Em produção',
    Icon: ShoppingBag,
    headline: 'Conversa que vira venda no WhatsApp.',
    body:
      'Atende com contexto, lembra do histórico do cliente, recomenda no momento certo, fecha sem fricção. Devolve tempo ao time para focar em estratégia.',
    cta: 'Conhecer Sales',
    accent: 'sales',
  },
  {
    slug: '/social',
    shortName: 'Social',
    fullName: 'Rbbt Social',
    status: 'beta',
    statusLabel: 'Em testes',
    Icon: BarChart3,
    headline: 'Cada sinal do Instagram vira decisão.',
    body:
      'Lê o que a audiência pede antes dela dizer. Detecta intenção de compra. Cruza orgânico e ads no mesmo painel — em português nativo.',
    cta: 'Conhecer Social',
    accent: 'social',
  },
] as const

const accentRing = {
  sales: 'hover:border-[var(--sales-green)]/40',
  social: 'hover:border-[var(--social-blue)]/40',
} as const

const accentIcon = {
  sales: 'text-[var(--sales-green)]',
  social: 'text-[var(--social-blue)]',
} as const

const accentLink = {
  sales: 'text-[var(--sales-green)]',
  social: 'text-[var(--social-blue)]',
} as const

export function ProductsPreview() {
  return (
    <section id="produtos" className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-16 md:mb-20 max-w-2xl">
            <SectionLabel accent="primary">O começo do framework</SectionLabel>
            <h2
              className="
                mt-6 font-[var(--font-display)] font-light
                text-4xl md:text-5xl lg:text-6xl
                leading-[1.05] tracking-[-0.02em]
                text-[var(--foreground)]
              "
            >
              Os primeiros produtos. <br className="hidden md:inline" />
              <span className="text-[var(--muted)]">O começo da jornada.</span>
            </h2>
            <p className="mt-6 text-base text-[var(--muted)] leading-relaxed max-w-2xl">
              Sales e Social são os nossos dois primeiros produtos — construídos a partir de dores
              reais de clientes (Camys no WhatsApp, X-One no Instagram) e validados em produção.
              Funcionam <span className="text-[var(--foreground)]">sozinhos</span> para quem precisa
              de foco, ou <span className="text-[var(--foreground)]">integrados</span> ao resto da
              plataforma para quem quer ir além. Compõem o framework que continua crescendo — outros
              produtos vão nascer do mesmo modo: problema observado, solução construída, validação
              real, virada em plataforma.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {products.map((p) => (
              <motion.div key={p.slug} variants={fadeUp}>
                <Link
                  to={p.slug}
                  className={`
                    group relative block h-full
                    rounded-2xl border border-white/[0.08]
                    bg-white/[0.015]
                    p-8 md:p-10
                    transition-all duration-300
                    hover:bg-white/[0.025]
                    ${accentRing[p.accent]}
                  `}
                >
                  <div className="flex items-center justify-between mb-8">
                    <p.Icon className={`h-7 w-7 ${accentIcon[p.accent]}`} aria-hidden="true" />
                    <StatusBadge status={p.status}>{p.statusLabel}</StatusBadge>
                  </div>

                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-3 font-[var(--font-display)]">
                    {p.fullName}
                  </p>
                  <h3
                    className="
                      font-[var(--font-display)] font-medium
                      text-2xl md:text-3xl
                      text-[var(--foreground)]
                      tracking-[-0.01em] leading-[1.15]
                      mb-5
                    "
                  >
                    {p.headline}
                  </h3>
                  <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed mb-10">
                    {p.body}
                  </p>

                  <span
                    className={`
                      inline-flex items-center gap-2 text-sm font-medium
                      ${accentLink[p.accent]}
                      transition-transform group-hover:gap-3
                    `}
                  >
                    {p.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

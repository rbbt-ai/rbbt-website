import { motion } from 'framer-motion'
import { Brain, Layers, Cable } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce } from '@/lib/animation-config'

/**
 * PlatformPillars — os 3 pilares da infraestrutura Rbbt Lab.
 * Substitui PlatformOverview (V2). Apresenta Cognition Core / Atelier / The Bridge
 * como os componentes da plataforma AI-native que opera sobre operações existentes.
 *
 * Section id: `plataforma` (linkado do Hero "Conheça a plataforma").
 */

const pillars = [
  {
    n: '01',
    title: 'The Bridge.',
    icon: Cable,
    body:
      'A integração com profundidade. Conecta a plataforma aos sistemas que o cliente já usa — ERP, e-commerce, CRM, dashboards. Quando a base de dados precisa ser corrigida na origem para sustentar IA profunda, fazemos esse trabalho de fundação antes da camada cognitiva.',
  },
  {
    n: '02',
    title: 'Cognition Core.',
    icon: Brain,
    body:
      'O cérebro multi-agente. Onde identidade do agente, memória que persiste e orquestração entre canais vivem. A inteligência que aprende a cada interação e mantém o consumidor no centro.',
  },
  {
    n: '03',
    title: 'Atelier.',
    icon: Layers,
    body:
      'A workspace onde a inteligência vira operação. O cliente compõe agentes, configura rotinas, define alertas e desenha fluxos. É onde a integração técnica vira valor operacional — porque o time consegue ver, ajustar e evoluir.',
  },
]

export function PlatformPillars() {
  return (
    <section id="plataforma" className="relative py-24 md:py-32 lg:py-40 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-16 md:mb-20 max-w-3xl">
            <SectionLabel accent="primary">A infraestrutura</SectionLabel>
            <h2
              className="
                mt-6 font-[var(--font-display)] font-light
                text-4xl md:text-5xl lg:text-6xl
                leading-[1.05] tracking-[-0.02em]
                text-[var(--foreground)]
              "
            >
              Uma camada. Três pilares. <br className="hidden md:inline" />
              <span className="text-[var(--muted)]">
                Construímos a inteligência sobre o que você já tem.
              </span>
            </h2>
            <p className="mt-6 text-base text-[var(--muted)] leading-relaxed max-w-2xl">
              A Rbbt Lab é uma plataforma AI-native que opera sobre a operação existente do cliente.
              Conectamos dados, sistemas legados e canais em uma camada que aprende. Quando a base
              precisa ser corrigida antes — normalização de catálogo, deduplicação, alinhamento entre
              sistemas de origem — fazemos esse trabalho primeiro, para que a inteligência tenha o
              que operar com profundidade.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16"
          >
            {pillars.map((p) => (
              <motion.article key={p.n} variants={fadeUp}>
                <div className="flex items-baseline gap-4 mb-5">
                  <span
                    aria-hidden="true"
                    className="font-[var(--font-display)] font-light text-2xl text-[var(--muted)]/60 tracking-tight"
                  >
                    {p.n}
                  </span>
                  <p.icon className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
                </div>
                <h3
                  className="
                    font-[var(--font-display)] font-medium
                    text-xl md:text-2xl
                    text-[var(--foreground)]
                    tracking-[-0.01em] mb-4
                  "
                >
                  {p.title}
                </h3>
                <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">{p.body}</p>
              </motion.article>
            ))}
          </motion.div>

          {/* Linha de fechamento — manifesto resumido dos 3 pilares */}
          <motion.p
            variants={fadeUp}
            className="
              mt-20 md:mt-24 pt-12
              border-t border-white/[0.04]
              max-w-4xl mx-auto
              text-center
              font-[var(--font-display)] font-light
              text-lg md:text-xl lg:text-2xl
              leading-[1.5] md:leading-[1.4] tracking-[-0.01em]
              text-[var(--muted)]
              flex flex-col md:block gap-3 md:gap-0
            "
          >
            <span className="inline-flex items-center justify-center gap-2 md:gap-3">
              <span className="text-[var(--foreground)]">The Bridge</span>
              <span className="text-[var(--muted)]">conecta ao que já existe</span>
            </span>
            <span aria-hidden="true" className="text-[var(--primary)]/60 md:mx-3 inline-block">→</span>
            <span className="inline-flex items-center justify-center gap-2 md:gap-3">
              <span className="text-[var(--foreground)]">Cognition Core</span>
              <span className="text-[var(--muted)]">entrega a inteligência</span>
            </span>
            <span aria-hidden="true" className="text-[var(--primary)]/60 md:mx-3 inline-block">→</span>
            <span className="inline-flex items-center justify-center gap-2 md:gap-3">
              <span className="text-[var(--foreground)]">Atelier</span>
              <span className="text-[var(--muted)]">transforma em operação.</span>
            </span>
          </motion.p>
        </motion.div>
      </Container>
    </section>
  )
}

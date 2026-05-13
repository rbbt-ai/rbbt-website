import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { animate, stagger } from 'animejs'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce, durationMs, animeEase } from '@/lib/animation-config'
import { usePrefersReducedMotion } from '@/lib/hooks'

/**
 * ManifestoFull — the complete manifesto rendered as an editorial piece.
 *
 * Animation strategy: anime.js v4 with non-linear stagger for organic reading rhythm.
 * Disney principle "timing" — variable delay creates emotion that uniform stagger can't.
 */

const acreditamosNinguem = [
  'Esperar dias por uma resposta.',
  'Ser tratado como número.',
  'Repetir a mesma explicação várias vezes.',
  'Ser empurrado para comprar o que não precisa.',
  'Ficar perdido no pós-venda.',
  'Ser ignorado quando precisa de ajuda.',
]

const acreditamosCliente = [
  'Encontrar o que procura de forma simples e rápida.',
  'Entender o que está comprando.',
  'Sentir que fez uma boa escolha.',
  'Ser reconhecido. Ser valorizado.',
  'Ser surpreendido por bons atendimentos.',
  'Ser atendido por humanos quando quiser.',
  'Ser tratado bem no pré-venda. Na venda. No pós-venda.',
]

const pillars = [
  {
    title: 'Profundidade técnica.',
    body:
      'Arquitetura própria, organizada em três camadas: Cognition Core (cérebro multi-agente com memória, identidade e orquestração), Atelier (workspace onde o cliente compõe agentes, rotinas e alertas — onde a inteligência vira operação) e The Bridge (integração não-invasiva com sistemas legados). Concorrentes copiam interface, não infraestrutura.',
  },
  {
    title: 'Simbiose humano + inteligência.',
    body:
      'Framework Human → Agent → Human. A inteligência elimina ruído e conecta silos. O humano sobe de operador a estrategista.',
  },
  {
    title: 'Transição guiada.',
    body:
      'Dados são abundantes. Método é raro. Guiamos empresas na transição para a nova era, sem promessas irreais e sem perder o controle do negócio.',
  },
]

const naoSomos = [
  { not: 'Não somos um chatbot.', explanation: 'Chatbot é a parte mais rasa do que entregamos.' },
  { not: 'Não somos um wrapper.', explanation: 'Construímos a camada que falta, não encapsulamos o que já existe.' },
  { not: 'Não somos uma ferramenta isolada.', explanation: 'Reorganizamos sistemas. Não substituímos tarefas.' },
  { not: 'Não vendemos tecnologia.', explanation: 'Vendemos comportamento estruturado pelo consumidor.' },
]

export function ManifestoFull() {
  return (
    <section id="manifesto" className="py-32 md:py-44 border-t border-white/[0.04]">
      <Container>
        {/* Block 1 — Opening */}
        <BlockOpening />

        {/* Block 2 — Acreditamos */}
        <BlockBeliefs />

        {/* Block 3 — Three pillars */}
        <BlockPillars />

        {/* Block 4 — Não somos */}
        <BlockNotIs />
      </Container>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────

function BlockOpening() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="max-w-3xl mb-32 md:mb-40"
    >
      <motion.div variants={fadeUp}>
        <SectionLabel accent="primary">Manifesto</SectionLabel>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="
          mt-6 mb-10 font-[var(--font-display)] font-light
          text-4xl md:text-5xl lg:text-6xl
          leading-[1.05] tracking-[-0.02em]
          text-[var(--foreground)]
        "
      >
        O varejo <br className="hidden md:inline" />
        <span className="text-[var(--muted)]">ficou barulhento.</span>
      </motion.h2>
      <motion.div variants={fadeUp} className="space-y-5 text-base md:text-lg text-[var(--muted)] leading-relaxed">
        <p>
          Feeds infinitos. Mensagens ignoradas. Respostas automáticas. Clientes repetindo a mesma
          história dez vezes. Pessoas esperando. Marcas falando. Poucas ouvindo.
        </p>
        <p className="text-[var(--foreground)]/90">
          Nós não começamos pela tecnologia. Começamos pelas pessoas.
        </p>
      </motion.div>
    </motion.div>
  )
}

// ────────────────────────────────────────────────────────────────────────────

function BlockBeliefs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { amount: 0.2, once: true })
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!inView || reduced) return
    // Organic stagger: slows down at the start, speeds up — like reading
    animate('.manifesto-belief', {
      opacity: [0, 1],
      translateY: ['12px', '0px'],
      duration: durationMs.medium,
      ease: animeEase.outCubic,
      delay: stagger(80, { start: 0 }),
    })
  }, [inView, reduced])

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-32 md:mb-40">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] font-[var(--font-display)] mb-6">
          Acreditamos que ninguém deveria
        </p>
        <ul className="space-y-3 text-base text-[var(--muted)] leading-relaxed">
          {acreditamosNinguem.map((line) => (
            <li
              key={line}
              className="manifesto-belief flex items-start gap-3"
              style={{ opacity: reduced ? 1 : 0 }}
            >
              <span aria-hidden="true" className="text-red-400/60 mt-1 shrink-0">—</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] font-[var(--font-display)] mb-6">
          Acreditamos que o cliente deveria
        </p>
        <ul className="space-y-3 text-base text-[var(--foreground)]/85 leading-relaxed">
          {acreditamosCliente.map((line) => (
            <li
              key={line}
              className="manifesto-belief flex items-start gap-3"
              style={{ opacity: reduced ? 1 : 0 }}
            >
              <span aria-hidden="true" className="text-[var(--sales-green)]/70 mt-1 shrink-0">+</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────

function BlockPillars() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="mb-32 md:mb-40"
    >
      <motion.h3
        variants={fadeUp}
        className="
          font-[var(--font-display)] font-light
          text-3xl md:text-4xl lg:text-5xl
          leading-[1.05] tracking-[-0.02em]
          text-[var(--foreground)] mb-12 md:mb-16 max-w-2xl
        "
      >
        Como construímos isso.
      </motion.h3>
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {pillars.map((p, i) => (
          <motion.div key={p.title} variants={fadeUp}>
            <span
              aria-hidden="true"
              className="font-[var(--font-display)] font-light text-2xl text-[var(--muted)]/50"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h4
              className="
                mt-3 mb-3 font-[var(--font-display)] font-medium
                text-xl md:text-2xl
                text-[var(--foreground)]
                tracking-[-0.01em]
              "
            >
              {p.title}
            </h4>
            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">{p.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

// ────────────────────────────────────────────────────────────────────────────

function BlockNotIs() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="mb-32 md:mb-40"
    >
      <motion.h3
        variants={fadeUp}
        className="
          font-[var(--font-display)] font-light
          text-3xl md:text-4xl lg:text-5xl
          leading-[1.05] tracking-[-0.02em]
          text-[var(--foreground)] mb-12 md:mb-16 max-w-3xl
        "
      >
        O que a RBBT Lab <span className="text-[var(--muted)]">não é.</span>
      </motion.h3>
      <motion.ul variants={staggerContainer} className="space-y-8 md:space-y-10 max-w-3xl">
        {naoSomos.map((item) => (
          <motion.li key={item.not} variants={fadeUp} className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 md:gap-8 pb-8 border-b border-white/[0.06] last:border-b-0 last:pb-0">
            <p className="font-[var(--font-display)] font-medium text-xl md:text-2xl text-[var(--foreground)] tracking-[-0.01em]">
              {item.not}
            </p>
            <p className="text-base text-[var(--muted)] leading-relaxed">
              {item.explanation}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}


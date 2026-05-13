import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce } from '@/lib/animation-config'

/**
 * VisionEditorial — declaration-style vision section.
 * Moved here from the homepage. Reformulated as editorial paragraph + typographic accent
 * (NOT a timeline with alternating sides).
 */
export function VisionEditorial() {
  return (
    <section id="visao" className="py-32 md:py-44 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
        >
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <SectionLabel accent="primary">A visão</SectionLabel>
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-8">
            <h2
              className="
                font-[var(--font-display)] font-light
                text-4xl md:text-5xl lg:text-6xl
                leading-[1.05] tracking-[-0.02em]
                text-[var(--foreground)] mb-10
              "
            >
              Toda empresa será reescrita pela IA. <br />
              <span className="text-[var(--muted)]">A questão é se será por dentro ou por fora.</span>
            </h2>

            <div className="space-y-6 text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
              <p>
                A geração anterior de software automatizou tarefas. A próxima vai operar empresas
                inteiras. Isso não é uma mudança de ferramenta. É uma mudança no que significa
                construir uma empresa.
              </p>

              <p>
                Por décadas, empresas foram projetadas para humanos operarem. Processos viviam em
                cabeças. Decisões em conversas. Contexto em reuniões. A empresa funcionava porque
                alguém, em algum lugar, sabia.
              </p>

              <p className="text-[var(--foreground)]/90">
                O fundador da próxima década projeta diferente.
              </p>

              <p>
                Ele constrói uma empresa que pode ser entendida, não apenas usada, por inteligência.
                Onde contexto é arquitetura, e não memória de quem está há mais tempo. Onde decisão é
                princípio escrito, e não regra implícita que cada um interpreta do seu jeito. Onde a
                empresa pensa com o time, e não apenas através dele.
              </p>

              <p className="text-[var(--foreground)]/90">
                A Rbbt Lab existe para construir essa camada.
              </p>

              <p>
                Não para empresas que querem usar IA. Para empresas que querem ser repensadas por
                ela, sem perder o foco. É onde começamos. Não onde paramos.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

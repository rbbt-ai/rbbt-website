import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce } from '@/lib/animation-config'

/**
 * PlatformLayer — bloco intermediário do /sobre que sinaliza maturidade técnica
 * sem cair em jargão de vendor. Posicionado entre TeamSection e ManifestoFull.
 */
export function PlatformLayer() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20"
        >
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <SectionLabel accent="primary">A camada</SectionLabel>
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-8">
            <h2
              className="
                font-[var(--font-display)] font-light
                text-3xl md:text-4xl lg:text-5xl
                leading-[1.1] tracking-[-0.02em]
                text-[var(--foreground)] mb-8
              "
            >
              Plataforma própria. <br className="hidden md:inline" />
              <span className="text-[var(--muted)]">Operação real.</span>
            </h2>

            <div className="space-y-5 text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
              <p>
                A Rbbt Lab opera uma plataforma multi-agêntica proprietária organizada em três
                camadas: o <span className="text-[var(--foreground)]">Cognition Core</span> orquestra
                identidade, memória e raciocínio dos agentes; o{' '}
                <span className="text-[var(--foreground)]">Atelier</span> é a workspace onde o
                cliente compõe agentes, rotinas e alertas — onde a inteligência vira operação; e{' '}
                <span className="text-[var(--foreground)]">The Bridge</span> conecta tudo aos
                sistemas que o cliente já usa.
              </p>
              <p>
                Hoje, mais de uma dezena de agentes especialistas rodam em produção — vendas,
                atendimento, operações de loja, conteúdo, gestão de estoque. Integrações ativas com
                WhatsApp, Instagram, e-commerce (Wake, Nuvemshop) e ERPs de varejo. Auditoria completa
                por agente. Multi-tenancy isolado.
              </p>
              <p className="text-[var(--foreground)]/90">
                Não é wrapper. É infraestrutura.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

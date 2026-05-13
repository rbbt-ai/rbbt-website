import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce } from '@/lib/animation-config'

/**
 * ClosingDeclaration — fechamento da página /sobre.
 * Vem depois de VisionEditorial. Fluxo staccato de 4 frases +
 * parágrafo de fechamento sobre o propósito da RBBT Lab.
 */

const declarationLines = [
  'A IA opera.',
  'O humano decide.',
  'A empresa pensa.',
  'E o cliente será ouvido. Finalmente.',
]

export function ClosingDeclaration() {
  return (
    <section className="py-32 md:py-44 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-12">
            <SectionLabel accent="primary">E assim:</SectionLabel>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="space-y-3 font-[var(--font-display)] font-light text-2xl md:text-4xl tracking-[-0.02em] mb-16 md:mb-20"
          >
            {declarationLines.map((line, i) => (
              <motion.p
                key={line}
                variants={fadeUp}
                className={
                  i === declarationLines.length - 1
                    ? 'text-[var(--foreground)] mt-6'
                    : 'text-[var(--muted)]'
                }
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="space-y-4 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            <motion.p variants={fadeUp} className="text-[var(--muted)]">
              A IA vai transformar a forma como empresas operam e humanos trabalham.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[var(--foreground)]/90">
              É pra isso que a RBBT Lab existe.
            </motion.p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

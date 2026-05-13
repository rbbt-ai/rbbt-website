import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce } from '@/lib/animation-config'

/**
 * Lab + Scale — the methodology section.
 *
 * Editorial layout (per design review):
 * - No cards, no borders, no emoji.
 * - Title left, ordered methodology right.
 * - Numbers act as typographic anchors (mono, muted) — not decoration.
 * - Whitespace is the design.
 */

const steps = [
  {
    n: '01',
    title: 'Explorar.',
    body:
      'Entendemos profundamente o problema e avaliamos se, onde e como a inteligência pode realmente gerar valor.',
  },
  {
    n: '02',
    title: 'Prototipar.',
    body:
      'Construímos rapidamente um MVP funcional conectado ao contexto real do negócio.',
  },
  {
    n: '03',
    title: 'Validar & Escalar.',
    body:
      'Testamos em ambiente real. O que prova impacto evolui para produto escalável.',
  },
]

export function LabScaleSection() {
  return (
    <section id="processo" className="relative py-24 md:py-32 lg:py-40">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
        >
          {/* Left column — title + manifesto */}
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <SectionLabel accent="primary">Nosso modelo</SectionLabel>
            <h2
              className="
                mt-6 font-[var(--font-display)] font-light
                text-4xl md:text-5xl lg:text-6xl
                leading-[1.05] tracking-[-0.02em]
                text-[var(--foreground)]
              "
            >
              Lab <span className="text-[var(--muted)]">+</span> Scale.
            </h2>
            <p className="mt-8 text-base text-[var(--muted)] leading-relaxed max-w-md">
              Operamos em dois modos. O <span className="text-[var(--foreground)]">Lab</span> é onde
              exploramos o que há de mais novo em inteligência para resolver problemas reais. O{' '}
              <span className="text-[var(--foreground)]">Scale</span> é onde as soluções que provam
              valor ganham tração e viram produto.
            </p>
          </motion.div>

          {/* Right column — numbered steps */}
          <motion.ol variants={staggerContainer} className="lg:col-span-7 space-y-12 lg:space-y-14">
            {steps.map((step) => (
              <motion.li key={step.n} variants={fadeUp} className="grid grid-cols-[auto_1fr] gap-6 md:gap-10">
                <span
                  aria-hidden="true"
                  className="
                    font-[var(--font-display)] font-light
                    text-3xl md:text-4xl
                    text-[var(--muted)]/60
                    tracking-tight
                    pt-1
                  "
                >
                  {step.n}
                </span>
                <div>
                  <h3
                    className="
                      font-[var(--font-display)] font-medium
                      text-2xl md:text-3xl
                      text-[var(--foreground)]
                      tracking-[-0.01em]
                      mb-3
                    "
                  >
                    {step.title}
                  </h3>
                  <p className="text-base text-[var(--muted)] leading-relaxed max-w-xl">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </Container>
    </section>
  )
}

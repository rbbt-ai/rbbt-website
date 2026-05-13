import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce } from '@/lib/animation-config'

/**
 * ManifestoPreview — quiet, blockquote-style declaration block.
 * Standalone — no CTA, no link to a "full manifesto".
 */
export function ManifestoPreview() {
  return (
    <section
      className="
        relative py-32 md:py-44
        border-t border-white/[0.04]
        overflow-hidden
      "
    >
      {/* Subtle grain texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-10">
            <SectionLabel accent="primary">No que acreditamos</SectionLabel>
          </motion.div>

          <motion.blockquote
            variants={fadeUp}
            className="
              font-[var(--font-display)] font-light
              text-3xl md:text-5xl lg:text-6xl
              leading-[1.1] tracking-[-0.02em]
              text-[var(--foreground)]
              mb-12
            "
          >
            Software inteligente <br />
            <span className="text-[var(--muted)]">liberta pessoas inteligentes.</span>
          </motion.blockquote>

          <motion.p variants={fadeUp} className="text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-2xl mx-auto mb-12">
            A maior parte do que chamamos de trabalho é apenas fricção: mover informação,
            lembrar processo, repetir o mesmo e-mail. Quando a tecnologia entende contexto,
            o trabalho humano volta a ser humano.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  )
}

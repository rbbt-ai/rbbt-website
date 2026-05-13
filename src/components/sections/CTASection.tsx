import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce } from '@/lib/animation-config'

export function CTASection() {
  return (
    <section id="cta" className="relative py-32 md:py-44 border-t border-white/[0.04] overflow-hidden">
      {/* Soft gradient halo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 800px 500px at 50% 40%, rgba(147, 51, 234, 0.10) 0%, transparent 60%)',
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
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <SectionLabel accent="primary">Conversa</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="
              font-[var(--font-display)] font-light
              text-4xl md:text-5xl lg:text-6xl
              leading-[1.05] tracking-[-0.02em]
              text-[var(--foreground)] mb-8
            "
          >
            Pronto para conversar?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-[var(--muted)] max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Reservamos trinta minutos para entender o seu varejo e mostrar onde a plataforma
            entra primeiro.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="group">
              <Link to="/contato">
                Agendar conversa
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Link
              to="#produtos"
              className="
                group inline-flex items-center gap-2 text-sm font-medium
                text-[var(--foreground)]/80 hover:text-[var(--foreground)]
                transition-colors
              "
            >
              Ver os produtos
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce } from '@/lib/animation-config'

/**
 * TrustedBySection — vitrine de marcas que operam com a RBBT Lab.
 * Logos reais (Camys, X-One) processados pra monocromático branco com fundo
 * transparente. NBA e Growth como SVG inline.
 *
 * Layout: linha horizontal em desktop, grid 2x2 em mobile.
 * Cor: opacidade 50% por default → 100% em hover.
 */

interface Brand {
  id: string
  name: string
  src: string
  /** Altura em px (controla escala visual entre logos de proporções diferentes) */
  height: string
}

const brands: readonly Brand[] = [
  { id: 'camys', name: 'Camys', src: '/logos/camys.png', height: 'h-5 md:h-6' },
  { id: 'nba', name: 'NBA Brasil', src: '/logos/nba.png', height: 'h-20 md:h-24' },
  { id: 'xone', name: 'X-One', src: '/logos/xone.png', height: 'h-6 md:h-7' },
  { id: 'growth', name: 'Growth', src: '/logos/growth.svg', height: 'h-8 md:h-9' },
] as const

export function TrustedBySection() {
  return (
    <section className="relative py-20 md:py-28 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <SectionLabel accent="muted">Operam com a RBBT Lab</SectionLabel>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base text-[var(--muted)] max-w-xl mx-auto mb-12 md:mb-16 leading-relaxed"
          >
            Marcas e redes que confiam na nossa plataforma — do físico ao digital, do feed à conversa.
          </motion.p>

          {/* Logos — flex em desktop, grid 2x2 em mobile */}
          <motion.div
            variants={staggerContainer}
            className="
              grid grid-cols-2 gap-y-10 gap-x-6
              md:flex md:flex-row md:items-center md:justify-center md:flex-wrap
              md:gap-x-12 lg:gap-x-16 md:gap-y-0
            "
          >
            {brands.map((brand) => (
              <motion.div
                key={brand.id}
                variants={fadeUp}
                className="
                  flex items-center justify-center
                  opacity-50 hover:opacity-100
                  transition-opacity duration-300
                "
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  className={`${brand.height} w-auto`}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce } from '@/lib/animation-config'
import { team } from '@/data/team'

/**
 * TeamSection — editorial team grid.
 * Treats each member as a brief editorial card (not LinkedIn-style scraped profile).
 */
export function TeamSection() {
  return (
    <section id="time" className="py-24 md:py-32 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-16 md:mb-20 max-w-2xl">
            <SectionLabel accent="primary">Quem está construindo</SectionLabel>
            <h2
              className="
                mt-6 font-[var(--font-display)] font-light
                text-4xl md:text-5xl lg:text-6xl
                leading-[1.05] tracking-[-0.02em]
                text-[var(--foreground)]
              "
            >
              Cinco co-fundadores. <br className="hidden md:inline" />
              <span className="text-[var(--muted)]">Uma plataforma.</span>
            </h2>
            <p className="mt-6 text-base text-[var(--muted)] leading-relaxed">
              Engenharia, estratégia, produto, growth e capital — construindo a infraestrutura
              cognitiva para o varejo brasileiro.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
          >
            {team.map((m) => (
              <motion.article key={m.id} variants={fadeUp} className="flex gap-5 md:gap-6">
                {/* Avatar — small circle, lets even Tiago's 386px photo look sharp */}
                <div className="flex-shrink-0">
                  <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border border-white/[0.08]">
                    <img
                      src={m.photo}
                      alt={`Foto de ${m.name}`}
                      className="absolute inset-0 w-full h-full object-cover grayscale-[40%] contrast-[1.05]"
                      loading="lazy"
                      width="96"
                      height="96"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] font-[var(--font-display)] mb-2">
                    {m.role}
                  </p>
                  <h3
                    className="
                      font-[var(--font-display)] font-medium
                      text-2xl md:text-3xl
                      text-[var(--foreground)]
                      tracking-[-0.01em] mb-3
                    "
                  >
                    {m.name}
                  </h3>
                  <p className="text-sm italic text-[var(--muted)]/80 mb-4 leading-relaxed">
                    “{m.tagline}”
                  </p>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {m.bio}
                  </p>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        mt-4 inline-flex items-center gap-2 text-xs font-medium
                        text-[var(--foreground)]/70 hover:text-[var(--foreground)]
                        transition-colors
                      "
                    >
                      LinkedIn →
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

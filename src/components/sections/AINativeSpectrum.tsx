import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce } from '@/lib/animation-config'

/**
 * AINativeSpectrum — apresenta o espectro AI-driven → AI-first → AI-native
 * e posiciona a RBBT Lab como a camada AI-native que conecta a operação
 * existente do cliente. Aparece no /sobre entre Team e PlatformLayer.
 *
 * Visual: 3 cards horizontais com progressão de intensidade — primeiro
 * com border/opacity menor, último em destaque com border primary.
 */

const stages = [
  {
    label: 'AI-driven.',
    body:
      'A inteligência é usada em processos pontuais — uma análise aqui, uma sugestão ali. Descritivo, não estratégico.',
    intensity: 'low',
  },
  {
    label: 'AI-first.',
    body:
      'A inteligência é prioridade no roadmap. Construída sobre arquiteturas tradicionais como camada de melhoria. Há teto: overhead cresce, deploys ficam lentos, governança fragmenta.',
    intensity: 'mid',
  },
  {
    label: 'AI-native.',
    body:
      'Dados, processos e tecnologia ajustados para que a inteligência leia e entenda a empresa inteira. A inteligência deixa de ser função e vira camada cognitiva — integra tudo, conecta tudo. A empresa passa a operar como um organismo vivo.',
    intensity: 'high',
  },
] as const

const intensityClasses = {
  low: {
    border: 'border-white/[0.06]',
    bg: 'bg-white/[0.01]',
    label: 'text-[var(--muted)]',
  },
  mid: {
    border: 'border-white/[0.10]',
    bg: 'bg-white/[0.02]',
    label: 'text-[var(--foreground)]/80',
  },
  high: {
    border: 'border-[var(--primary)]/40',
    bg: 'bg-[var(--primary)]/[0.06]',
    label: 'text-[var(--foreground)]',
  },
} as const

export function AINativeSpectrum() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-16 md:mb-20 max-w-3xl">
            <SectionLabel accent="primary">O espectro</SectionLabel>
            <h2
              className="
                mt-6 font-[var(--font-display)] font-light
                text-4xl md:text-5xl lg:text-6xl
                leading-[1.05] tracking-[-0.02em]
                text-[var(--foreground)]
              "
            >
              Três estágios entre empresa e inteligência. <br className="hidden md:inline" />
              <span className="text-[var(--muted)]">E como se chega ao último.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          >
            {stages.map((s) => {
              const c = intensityClasses[s.intensity]
              return (
                <motion.article
                  key={s.label}
                  variants={fadeUp}
                  className={`
                    rounded-2xl border ${c.border} ${c.bg}
                    p-7 md:p-8
                    transition-colors duration-300
                  `}
                >
                  <h3
                    className={`
                      font-[var(--font-display)] font-medium
                      text-xl md:text-2xl
                      ${c.label}
                      tracking-[-0.01em] mb-4
                    `}
                  >
                    {s.label}
                  </h3>
                  <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
                    {s.body}
                  </p>
                </motion.article>
              )
            })}
          </motion.div>

          {/* Closing — posicionamento RBBT */}
          <motion.div
            variants={fadeUp}
            className="mt-16 md:mt-20 max-w-3xl"
          >
            <div className="space-y-5 text-base md:text-lg text-[var(--muted)] leading-relaxed">
              <p>
                A maioria das empresas brasileiras estabelecidas não nasceu AI-native — e não precisa
                ter nascido.{' '}
                <span className="text-[var(--foreground)]">
                  AI-native é um estado que se conquista
                </span>
                , desde que dados, processos e tecnologia sejam ajustados para que a inteligência
                consiga ler e entender a empresa inteira.
              </p>
              <p>
                A RBBT Lab é a parceira dessa transição. Trazemos a camada cognitiva que integra a
                operação e, quando preciso, preparamos a base junto: normalização de dados na origem,
                redesenho de fluxos, alinhamento entre sistemas. Em alguns casos, a plataforma pluga
                em cima e a inteligência passa a operar. Em outros, o trabalho começa antes — na
                fundação.
              </p>
              <p>
                No fim do processo, a empresa não tem inteligência embutida em pontos isolados. Ela
                opera como um organismo vivo, com a inteligência integrando tudo. Encontramos a
                empresa onde ela está, e vamos tão fundo quanto o problema pedir.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

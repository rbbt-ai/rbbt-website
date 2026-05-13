import { useState, type FormEvent, type ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Send, CheckCircle, AlertCircle, Calendar } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce } from '@/lib/animation-config'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

// Formspree endpoint — set VITE_FORMSPREE_ENDPOINT in .env to enable form submission.
// Without it, the form falls back to a mailto link.
const FORMSPREE_ENDPOINT = import.meta.env['VITE_FORMSPREE_ENDPOINT'] as string | undefined
const CONTACT_EMAIL = 'hello@rbbtlab.ai'
const CALENDLY_URL = 'https://calendly.com/thiago-freire/30min'

const channelOptions = [
  'WhatsApp',
  'Instagram',
  'E-commerce próprio',
  'Marketplace',
  'Loja física',
] as const

export function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: '',
    lgpd: false,
  })
  const [channels, setChannels] = useState<Set<string>>(new Set())

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!formData.lgpd) {
      setStatus('error')
      setErrorMessage('Confirme o consentimento para envio dos dados.')
      return
    }

    if (!FORMSPREE_ENDPOINT) {
      // Fallback: open mailto with the form body
      const body = encodeURIComponent(
        `Nome: ${formData.name}\nEmail: ${formData.email}\nEmpresa: ${formData.company}\nCargo: ${formData.role}\nCanais: ${[...channels].join(', ')}\n\n${formData.message}`,
      )
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Contato pelo site')}&body=${body}`
      setStatus('success')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          channels: [...channels].join(', '),
          message: formData.message,
        }),
      })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error
          ? `Algo deu errado. Tente novamente ou escreva para ${CONTACT_EMAIL}.`
          : `Algo deu errado. Tente novamente ou escreva para ${CONTACT_EMAIL}.`,
      )
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const v = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData((prev) => ({ ...prev, [name]: v }))
  }

  const toggleChannel = (channel: string) => {
    setChannels((prev) => {
      const next = new Set(prev)
      if (next.has(channel)) next.delete(channel)
      else next.add(channel)
      return next
    })
  }

  return (
    <main className="pt-24 pb-24 md:pt-32 md:pb-32">
      <Container>
        {/* Hero */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl mb-16 md:mb-20"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel accent="primary">Contato</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="
              mt-6 font-[var(--font-display)] font-light
              text-4xl md:text-5xl lg:text-6xl
              leading-[1.05] tracking-[-0.02em]
              text-[var(--foreground)] mb-6
            "
          >
            Fale com a gente.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
            Trinta minutos para entender o seu varejo e mostrar onde a plataforma entra
            primeiro.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-[var(--sales-green)]/30 bg-[var(--sales-green)]/[0.04] p-10 text-center"
              >
                <CheckCircle className="w-12 h-12 text-[var(--sales-green)] mx-auto mb-5" />
                <h3 className="font-[var(--font-display)] text-xl md:text-2xl text-[var(--foreground)] mb-3">
                  Mensagem recebida.
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Respondemos em até 24h úteis.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={staggerContainer}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <motion.div variants={fadeUp}>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={handleChange}
                    className="
                      w-full px-4 py-3
                      bg-white/[0.03] border border-white/10 rounded-lg
                      text-[var(--foreground)] placeholder:text-[var(--muted)]/40
                      focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 focus:border-[var(--primary)]/40
                      transition-colors
                    "
                    placeholder="Seu nome"
                  />
                </motion.div>

                <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                      E-mail corporativo
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      maxLength={254}
                      value={formData.email}
                      onChange={handleChange}
                      className="
                        w-full px-4 py-3
                        bg-white/[0.03] border border-white/10 rounded-lg
                        text-[var(--foreground)] placeholder:text-[var(--muted)]/40
                        focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 focus:border-[var(--primary)]/40
                        transition-colors
                      "
                      placeholder="voce@empresa.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                      Cargo <span className="text-[var(--muted)] text-xs">(opcional)</span>
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      maxLength={80}
                      value={formData.role}
                      onChange={handleChange}
                      className="
                        w-full px-4 py-3
                        bg-white/[0.03] border border-white/10 rounded-lg
                        text-[var(--foreground)] placeholder:text-[var(--muted)]/40
                        focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 focus:border-[var(--primary)]/40
                        transition-colors
                      "
                      placeholder="Diretor de marketing, founder…"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label htmlFor="company" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    maxLength={120}
                    value={formData.company}
                    onChange={handleChange}
                    className="
                      w-full px-4 py-3
                      bg-white/[0.03] border border-white/10 rounded-lg
                      text-[var(--foreground)] placeholder:text-[var(--muted)]/40
                      focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 focus:border-[var(--primary)]/40
                      transition-colors
                    "
                    placeholder="Nome da empresa"
                  />
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
                    Onde você vende hoje?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {channelOptions.map((channel) => (
                      <button
                        key={channel}
                        type="button"
                        onClick={() => toggleChannel(channel)}
                        className={`
                          rounded-full border px-4 py-2 text-sm transition-colors
                          ${
                            channels.has(channel)
                              ? 'border-[var(--primary)]/50 bg-[var(--primary)]/[0.12] text-[var(--foreground)]'
                              : 'border-white/10 bg-white/[0.02] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-white/20'
                          }
                        `}
                      >
                        {channel}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    O que você está tentando resolver?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={2000}
                    value={formData.message}
                    onChange={handleChange}
                    className="
                      w-full px-4 py-3
                      bg-white/[0.03] border border-white/10 rounded-lg
                      text-[var(--foreground)] placeholder:text-[var(--muted)]/40
                      focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 focus:border-[var(--primary)]/40
                      transition-colors resize-none
                    "
                    placeholder="Conte sobre seu desafio…"
                  />
                </motion.div>

                <motion.div variants={fadeUp} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="lgpd"
                    name="lgpd"
                    checked={formData.lgpd}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 accent-[var(--primary)]"
                    required
                  />
                  <label htmlFor="lgpd" className="text-xs text-[var(--muted)] leading-relaxed">
                    Autorizo o uso dos meus dados para retorno deste contato, conforme a{' '}
                    <Link to="/privacidade" className="text-[var(--foreground)] underline underline-offset-2 hover:no-underline">
                      Política de Privacidade
                    </Link>
                    .
                  </label>
                </motion.div>

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errorMessage || 'Algo deu errado. Tente novamente.'}
                  </motion.div>
                )}

                <motion.button
                  variants={fadeUp}
                  type="submit"
                  disabled={status === 'loading'}
                  className="
                    w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5
                    bg-[var(--primary)] text-white font-medium rounded-lg
                    hover:bg-[var(--primary-light)] active:bg-[var(--primary-dark)]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all
                  "
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Enviando…
                    </>
                  ) : (
                    <>
                      Enviar mensagem
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </div>

          {/* Sidebar */}
          <motion.aside
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="lg:col-span-2 space-y-6"
          >
            <motion.div variants={fadeUp} className="rounded-2xl border border-white/[0.08] bg-white/[0.015] p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-[var(--primary)]" />
                <h3 className="font-[var(--font-display)] text-base text-[var(--foreground)]">
                  Agende direto
                </h3>
              </div>
              <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                Prefere reservar um horário agora?
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex items-center gap-2 text-sm font-medium
                  text-[var(--foreground)]
                  border-b border-white/20 hover:border-white/60 pb-0.5
                  transition-colors
                "
              >
                Abrir agenda →
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl border border-white/[0.08] bg-white/[0.015] p-6">
              <h3 className="font-[var(--font-display)] text-base text-[var(--foreground)] mb-3">
                O que esperar
              </h3>
              <ol className="space-y-3 text-sm text-[var(--muted)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--primary)] font-[var(--font-display)] shrink-0">01</span>
                  Conversa de 30 minutos para entender seu varejo e suas dores.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--primary)] font-[var(--font-display)] shrink-0">02</span>
                  Onde a plataforma entra primeiro — Sales, Social ou ambos.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--primary)] font-[var(--font-display)] shrink-0">03</span>
                  Proposta sob medida, com timeline e plano comercial.
                </li>
              </ol>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl border border-white/[0.08] bg-white/[0.015] p-6">
              <h3 className="font-[var(--font-display)] text-base text-[var(--foreground)] mb-2">
                Tempo de resposta
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Respondemos em até <span className="text-[var(--foreground)]">24 horas úteis</span>.
              </p>
            </motion.div>
          </motion.aside>
        </div>
      </Container>
    </main>
  )
}

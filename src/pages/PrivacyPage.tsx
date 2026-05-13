import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'

/**
 * PrivacyPage — minimal LGPD landing.
 * Final legal text should be reviewed by counsel before launch.
 */
export function PrivacyPage() {
  return (
    <main className="pt-32 pb-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <SectionLabel accent="muted">Política de Privacidade</SectionLabel>
          <h1
            className="
              mt-6 mb-12 font-[var(--font-display)] font-light
              text-4xl md:text-5xl
              leading-[1.05] tracking-[-0.02em]
              text-[var(--foreground)]
            "
          >
            Como tratamos seus dados.
          </h1>

          <div className="space-y-8 text-base text-[var(--muted)] leading-relaxed">
            <section>
              <h2 className="font-[var(--font-display)] text-xl text-[var(--foreground)] mb-3">
                Controlador
              </h2>
              <p>
                Rabbit Tecnologia e Web3 Ltda (RBBT Lab), CNPJ 47.544.516/0001-60, com sede em São
                Paulo, Brasil.
              </p>
            </section>

            <section>
              <h2 className="font-[var(--font-display)] text-xl text-[var(--foreground)] mb-3">
                Dados coletados
              </h2>
              <p>
                Quando você usa o formulário de contato, coletamos: nome, e-mail corporativo,
                empresa, cargo (opcional), canais de venda atuais e a mensagem enviada.
              </p>
            </section>

            <section>
              <h2 className="font-[var(--font-display)] text-xl text-[var(--foreground)] mb-3">
                Finalidade
              </h2>
              <p>
                Os dados são usados exclusivamente para retornar seu contato, entender seu negócio
                e propor soluções. Não compartilhamos seus dados com terceiros para fins comerciais.
              </p>
            </section>

            <section>
              <h2 className="font-[var(--font-display)] text-xl text-[var(--foreground)] mb-3">
                Base legal
              </h2>
              <p>
                Tratamos seus dados com base no consentimento informado ao enviar o formulário (Lei
                Geral de Proteção de Dados, art. 7º, I).
              </p>
            </section>

            <section>
              <h2 className="font-[var(--font-display)] text-xl text-[var(--foreground)] mb-3">
                Seus direitos
              </h2>
              <p>
                Você pode solicitar a qualquer momento acesso, correção, anonimização, portabilidade
                ou eliminação dos seus dados. Para isso, escreva para{' '}
                <a
                  href="mailto:hello@rbbtlab.ai"
                  className="text-[var(--foreground)] underline underline-offset-2 hover:no-underline"
                >
                  hello@rbbtlab.ai
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-[var(--font-display)] text-xl text-[var(--foreground)] mb-3">
                Retenção
              </h2>
              <p>
                Mantemos os dados pelo tempo necessário para responder ao contato ou conduzir uma
                proposta. Em caso de não-celebração de contrato, eliminamos os dados em até 12 meses.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  )
}

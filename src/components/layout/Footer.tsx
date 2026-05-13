import { Link } from 'react-router-dom'
import { Container } from './Container'

const footerLinks = {
  produtos: [
    { label: 'RBBT Sales', href: '/sales' },
    { label: 'RBBT Social', href: '/social' },
  ],
  empresa: [
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[var(--background)]">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            {/* Logo + tagline */}
            <div className="md:col-span-2">
              <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
                <img
                  src="/rbbt_logo.png"
                  alt=""
                  aria-hidden="true"
                  className="h-7 w-auto"
                  width="32"
                  height="32"
                  loading="lazy"
                />
                <span
                  className="flex items-baseline gap-1 font-[var(--font-display)] font-light text-lg tracking-tight leading-none"
                  aria-label="RBBT Lab"
                >
                  <span className="text-[var(--foreground)]">rbbt</span>
                  <span className="text-[var(--foreground)]">lab</span>
                </span>
              </Link>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-3 font-[var(--font-display)]">
                Think Service.
              </p>
              <p className="text-sm text-[var(--muted)] max-w-xs leading-relaxed">
                Plataforma de agentes que estrutura o crescimento do varejo — do físico ao digital, do feed à conversa.
              </p>
            </div>

            {/* Produtos */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] mb-4 font-[var(--font-display)]">
                Produtos
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.produtos.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-[var(--foreground)]/80 hover:text-[var(--foreground)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] mb-4 font-[var(--font-display)]">
                Empresa
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.empresa.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-[var(--foreground)]/80 hover:text-[var(--foreground)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-xs text-[var(--muted)]">
                © {new Date().getFullYear()} RBBT Lab. Todos os direitos reservados.
              </p>
              <p className="text-xs text-[var(--muted)]">
                São Paulo, Brasil
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

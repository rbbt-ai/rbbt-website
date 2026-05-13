import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6">
      <div className="text-center max-w-md">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-4 font-[var(--font-display)]">
          Página não encontrada
        </p>
        <h1 className="text-4xl md:text-5xl font-[var(--font-display)] font-light text-[var(--foreground)] mb-6">
          Esse caminho não existe.
        </h1>
        <p className="text-sm text-[var(--muted)] mb-8 leading-relaxed">
          O conteúdo que você procurava pode ter mudado de lugar. Volte para a home ou fale com a gente.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/">Voltar para a home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/contato">Falar com a gente</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

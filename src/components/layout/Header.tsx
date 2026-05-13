import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, ChevronDown } from 'lucide-react'
import * as Popover from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'
import { Button } from '../ui/Button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '../ui/Sheet'

interface NavLink {
  label: string
  href: string
  dropdown?: { label: string; href: string; accent: 'sales' | 'social' }[]
}

const navLinks: NavLink[] = [
  { label: 'Lab', href: '/#processo' },
  {
    label: 'Produtos',
    href: '#',
    dropdown: [
      { label: 'RBBT Sales', href: '/sales', accent: 'sales' },
      { label: 'RBBT Social', href: '/social', accent: 'social' },
    ],
  },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
]

const accentDot = {
  sales: 'bg-[var(--sales-green)]',
  social: 'bg-[var(--social-blue)]',
} as const

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  const isActive = (href: string) => {
    if (href.startsWith('/#') || href === '#') return false
    return location.pathname === href
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-[var(--background)]/80 backdrop-blur-lg border-b border-white/5" />
      <nav className="relative mx-auto max-w-[1280px] px-6 md:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + wordmark */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2.5">
            <img
              src="/rbbt_logo.png"
              alt=""
              aria-hidden="true"
              className="h-7 w-auto"
              width="32"
              height="32"
            />
            <span
              className="flex items-baseline gap-1 font-[var(--font-display)] font-light text-lg tracking-tight leading-none"
              aria-label="RBBT Lab"
            >
              <span className="text-[var(--foreground)]">rbbt</span>
              <span className="text-[var(--foreground)]">lab</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) =>
              link.dropdown ? (
                <Popover.Root key={link.label}>
                  <Popover.Trigger asChild>
                    <button
                      className={cn(
                        'group flex items-center gap-1 text-sm font-medium transition-colors',
                        'text-[var(--muted)] hover:text-[var(--foreground)]',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-sm',
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                      />
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      align="start"
                      sideOffset={12}
                      className={cn(
                        'z-50 w-56 rounded-xl border border-white/10 bg-[var(--background-alt)]/95 backdrop-blur-md py-2 shadow-2xl',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out',
                        'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
                        'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
                      )}
                    >
                      {link.dropdown.map((item) => (
                        <Popover.Close asChild key={item.href}>
                          <Link
                            to={item.href}
                            className={cn(
                              'flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                              isActive(item.href)
                                ? 'text-[var(--foreground)] bg-white/[0.04]'
                                : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-white/[0.04]',
                            )}
                          >
                            <span className={cn('h-1.5 w-1.5 rounded-full', accentDot[item.accent])} />
                            {item.label}
                          </Link>
                        </Popover.Close>
                      ))}
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-sm',
                    isActive(link.href)
                      ? 'text-[var(--foreground)]'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)]',
                  )}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex md:items-center">
            <Button asChild size="sm">
              <Link to="/contato">Falar com a gente</Link>
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button
                className="p-2 text-[var(--foreground)] hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="mb-8 flex items-center gap-2.5">
                  <img
                    src="/rbbt_logo.png"
                    alt=""
                    aria-hidden="true"
                    className="h-7 w-auto"
                    width="32"
                    height="32"
                  />
                  <span
                    className="flex items-baseline gap-1 font-[var(--font-display)] font-light text-lg tracking-tight leading-none"
                    aria-label="RBBT Lab"
                  >
                    <span className="text-[var(--foreground)]">rbbt</span>
                    <span className="text-[var(--foreground)]">lab</span>
                  </span>
                </div>

                <nav className="flex flex-col gap-1">
                  <Link
                    to="/"
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      'px-3 py-2 text-lg font-medium rounded-lg transition-colors',
                      location.pathname === '/'
                        ? 'text-[var(--foreground)] bg-white/5'
                        : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-white/5',
                    )}
                  >
                    Home
                  </Link>
                  <Link
                    to="/#processo"
                    onClick={() => setIsMobileOpen(false)}
                    className="px-3 py-2 text-lg font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-white/5 rounded-lg transition-colors"
                  >
                    Lab
                  </Link>

                  <div className="px-3 py-2 mt-2">
                    <span className="text-xs uppercase tracking-wider text-[var(--muted)]">
                      Produtos
                    </span>
                  </div>
                  <Link
                    to="/sales"
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      'px-3 py-2 ml-3 text-lg font-medium rounded-lg transition-colors flex items-center gap-2',
                      isActive('/sales')
                        ? 'text-[var(--foreground)] bg-white/5'
                        : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-white/5',
                    )}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--sales-green)]" />
                    RBBT Sales
                  </Link>
                  <Link
                    to="/social"
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      'px-3 py-2 ml-3 text-lg font-medium rounded-lg transition-colors flex items-center gap-2',
                      isActive('/social')
                        ? 'text-[var(--foreground)] bg-white/5'
                        : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-white/5',
                    )}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--social-blue)]" />
                    RBBT Social
                  </Link>

                  <Link
                    to="/sobre"
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      'px-3 py-2 mt-2 text-lg font-medium rounded-lg transition-colors',
                      isActive('/sobre')
                        ? 'text-[var(--foreground)] bg-white/5'
                        : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-white/5',
                    )}
                  >
                    Sobre
                  </Link>
                  <Link
                    to="/contato"
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      'px-3 py-2 text-lg font-medium rounded-lg transition-colors',
                      isActive('/contato')
                        ? 'text-[var(--foreground)] bg-white/5'
                        : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-white/5',
                    )}
                  >
                    Contato
                  </Link>
                </nav>

                <div className="mt-auto pt-8">
                  <Button asChild className="w-full">
                    <Link to="/contato" onClick={() => setIsMobileOpen(false)}>
                      Falar com a gente
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

import { cn } from '@/lib/utils'

export interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  /** Color accent for the leading line */
  accent?: 'primary' | 'sales' | 'social' | 'muted'
}

const accentClasses: Record<NonNullable<SectionLabelProps['accent']>, string> = {
  primary: 'bg-[var(--primary)]',
  sales: 'bg-[var(--sales-green)]',
  social: 'bg-[var(--social-blue)]',
  muted: 'bg-[var(--muted)]',
}

/**
 * SectionLabel — small monospace eyebrow label preceded by a colored line.
 * Used to introduce sections in a quiet, editorial tone (Apple/Japan minimalism).
 *
 * Example:
 *   <SectionLabel accent="primary">Manifesto</SectionLabel>
 */
export function SectionLabel({ children, className, accent = 'primary' }: SectionLabelProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 font-[var(--font-display)] text-xs uppercase tracking-[0.18em] text-[var(--muted)]',
        className,
      )}
    >
      <span aria-hidden="true" className={cn('h-px w-8 shrink-0', accentClasses[accent])} />
      <span>{children}</span>
    </div>
  )
}

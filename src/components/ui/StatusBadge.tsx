import { cn } from '@/lib/utils'

export type StatusVariant = 'production' | 'beta' | 'roadmap' | 'neutral'

export interface StatusBadgeProps {
  status: StatusVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<StatusVariant, string> = {
  production:
    'border-[var(--sales-green)]/30 bg-[var(--sales-green)]/[0.08] text-[var(--sales-green)]',
  beta:
    'border-[var(--social-blue)]/30 bg-[var(--social-blue)]/[0.08] text-[var(--social-blue)]',
  roadmap:
    'border-white/15 bg-white/[0.04] text-white/60',
  neutral:
    'border-white/10 bg-white/[0.03] text-white/70',
}

const dotClasses: Record<StatusVariant, string> = {
  production: 'bg-[var(--sales-green)]',
  beta: 'bg-[var(--social-blue)]',
  roadmap: 'bg-white/40',
  neutral: 'bg-white/50',
}

/**
 * StatusBadge — pill that indicates lifecycle stage of a product/feature.
 * Quiet, no animation, intentional.
 */
export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.7rem] font-medium tracking-wide',
        variantClasses[status],
        className,
      )}
    >
      <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full', dotClasses[status])} />
      {children}
    </span>
  )
}

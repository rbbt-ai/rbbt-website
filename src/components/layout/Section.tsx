import { cn } from '../../lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  as?: 'section' | 'div' | 'article'
}

export function Section({
  children,
  className,
  id,
  as: Component = 'section'
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(
        'py-24 md:py-32',
        className
      )}
    >
      {children}
    </Component>
  )
}

import { cn } from '../../lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}

const sizeClasses = {
  narrow: 'max-w-4xl',
  default: 'max-w-[1280px]',
  wide: 'max-w-7xl',
}

export function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div
      className={cn(
        sizeClasses[size],
        'mx-auto px-6 md:px-8 lg:px-12',
        className
      )}
    >
      {children}
    </div>
  )
}

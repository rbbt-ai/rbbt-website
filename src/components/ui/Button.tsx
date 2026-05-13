import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const variantClasses = {
  primary:
    'bg-[var(--primary)] text-white hover:bg-[var(--primary-light)] active:bg-[var(--primary-dark)] shadow-md hover:shadow-lg',
  outline:
    'border border-white/20 bg-transparent text-[var(--foreground)] hover:bg-white/5 hover:border-white/30',
  ghost:
    'bg-transparent text-[var(--foreground)] hover:bg-white/5',
}

const sizeClasses = {
  sm: 'h-8 px-3 text-sm rounded-md',
  md: 'h-10 px-5 text-base rounded-lg',
  lg: 'h-12 px-8 text-lg rounded-lg',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
          'disabled:pointer-events-none disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }

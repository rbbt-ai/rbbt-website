import * as React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { viewportOnce } from '@/lib/animation-config'
import { cn } from '@/lib/utils'

export interface AnimatedSectionProps extends Omit<HTMLMotionProps<'section'>, 'children'> {
  children?: React.ReactNode
  /** Use stagger orchestration so child <motion.*> elements with `fadeUp` variants animate sequentially */
  stagger?: boolean
}

/**
 * AnimatedSection — wraps a <section> with viewport-triggered reveal.
 * Children that need to animate inline can use the exported `fadeUp` variant.
 *
 * Example:
 *   <AnimatedSection stagger>
 *     <motion.h2 variants={fadeUp}>...</motion.h2>
 *     <motion.p variants={fadeUp}>...</motion.p>
 *   </AnimatedSection>
 */
export const AnimatedSection = React.forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({ className, children, stagger, ...rest }, ref) => {
    return (
      <motion.section
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={stagger ? staggerContainer : fadeUp}
        {...rest}
      >
        {children}
      </motion.section>
    )
  },
)
AnimatedSection.displayName = 'AnimatedSection'

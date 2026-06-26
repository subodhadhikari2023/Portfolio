'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const prefersReduced = useReducedMotion()

  const initial = prefersReduced
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: direction === 'up' ? 24 : 0,
        x: direction === 'left' ? -24 : direction === 'right' ? 24 : 0,
      }

  const animate = { opacity: 1, y: 0, x: 0 }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

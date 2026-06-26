import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl ${
        hover
          ? 'transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-lg hover:shadow-accent-cyan/5'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

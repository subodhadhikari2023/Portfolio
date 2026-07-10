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
          ? 'hover-glow transition-all duration-300 hover:-translate-y-1'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

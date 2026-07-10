import GradientText from './GradientText'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  light?: boolean
}

export default function SectionHeader({ title, subtitle, light = false }: SectionHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        <GradientText className="drop-shadow-[0_0_24px_rgba(var(--accent-cyan-rgb),var(--glow-strength))]">{title}</GradientText>
      </h2>
      <div className="mx-auto mb-4 h-0.5 w-16 rounded-full bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink" />
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl mx-auto ${light ? 'text-[var(--text-secondary)]' : 'text-[var(--text-secondary)]'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

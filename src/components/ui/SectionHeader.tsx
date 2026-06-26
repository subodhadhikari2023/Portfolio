import GradientText from './GradientText'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  light?: boolean
}

export default function SectionHeader({ title, subtitle, light = false }: SectionHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-3">
        <GradientText>{title}</GradientText>
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl mx-auto ${light ? 'text-[var(--text-secondary)]' : 'text-[var(--text-secondary)]'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

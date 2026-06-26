import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import type { Stat } from '@/lib/types'

interface AboutProps {
  about: string
  stats: Stat[]
}

export default function About({ about, stats }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <SectionHeader title="About Me" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={0.1}>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">
              {about}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={0.15 + i * 0.08}>
                <GlassCard className="p-6 text-center">
                  <div className="text-3xl font-extrabold gradient-text mb-1">{stat.value}</div>
                  <div className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

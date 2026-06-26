import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Stat } from '@/lib/types'

interface AboutProps {
  about: string
  stats: Stat[]
}

const STAT_ICONS: Record<string, string> = {
  'Projects Shipped': '◎',
  'Automated Tests':  '✓',
  'Government Client':'△',
  'Avg. Delivery':    '⚡',
}

export default function About({ about, stats }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <SectionHeader title="About Me" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-start mt-4">
          <AnimatedSection delay={0.1}>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">
              {about}
            </p>

            {/* Proof points */}
            <div className="mt-8 flex flex-col gap-3">
              {[
                'Spring Boot + Hibernate REST APIs with JWT security',
                'Angular frontends with role-based access control',
                'Docker + GitHub Actions CI/CD to Railway / cloud',
              ].map((point) => (
                <div key={point} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                  <span className="text-accent-cyan mt-0.5 shrink-0">→</span>
                  {point}
                </div>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={0.15 + i * 0.08}>
                <div className="glass rounded-2xl p-6 text-center hover:-translate-y-0.5 transition-transform duration-200 border-b-2 border-b-accent-cyan/30">
                  <div
                    className="text-lg font-mono mb-1"
                    style={{ color: 'var(--accent-cyan)' }}
                  >
                    {STAT_ICONS[stat.label] ?? '·'}
                  </div>
                  <div className="text-3xl font-extrabold gradient-text mb-1">{stat.value}</div>
                  <div className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide leading-tight">
                    {stat.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

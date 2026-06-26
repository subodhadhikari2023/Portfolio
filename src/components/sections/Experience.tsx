import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Experience as ExperienceType } from '@/lib/types'

interface ExperienceProps {
  experience: ExperienceType[]
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <SectionHeader title="Experience" />
        </AnimatedSection>

        <div className="max-w-2xl mx-auto mt-12 flex flex-col gap-4">
          {experience.map((item, i) => (
            <AnimatedSection key={`${item.role}-${item.org}`} delay={0.1 + i * 0.1}>
              {item.highlight ? (
                /* Highlighted entry — Govt of Sikkim */
                <div className="relative p-6 rounded-2xl border border-accent-cyan/30 bg-gradient-to-br from-accent-cyan/5 to-accent-purple/5 backdrop-blur-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl gradient-bg" />
                  <div className="pl-2">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">{item.role}</h3>
                        <p className="text-sm font-semibold text-accent-cyan">{item.org}</p>
                      </div>
                      <span className="text-xs text-[var(--text-secondary)] glass px-3 py-1 rounded-full whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3">{item.description}</p>
                  </div>
                </div>
              ) : (
                /* Non-highlighted entries */
                <div className="glass rounded-2xl p-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{item.role}</span>
                    <span className="text-[var(--text-secondary)] mx-2">·</span>
                    <span className="text-sm text-[var(--text-secondary)]">{item.org}</span>
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] glass px-3 py-1 rounded-full whitespace-nowrap">
                    {item.period}
                  </span>
                </div>
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

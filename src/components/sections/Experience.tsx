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

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto mt-12">
          {/* Vertical line */}
          <div className="absolute left-4 top-3 bottom-3 w-px bg-gradient-to-b from-accent-cyan via-accent-purple/40 to-transparent" />

          <div className="flex flex-col gap-8">
            {experience.map((item, i) => (
              <AnimatedSection key={`${item.role}-${item.org}`} delay={0.1 + i * 0.12}>
                <div className="flex gap-6">
                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0 mt-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                        item.highlight
                          ? 'gradient-bg text-white border-transparent shadow-lg shadow-[rgba(var(--accent-cyan-rgb),0.3)]'
                          : 'glass border-[var(--glass-border)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {i + 1}
                    </div>
                  </div>

                  {/* Card */}
                  {item.highlight ? (
                    <div className="flex-1 relative p-5 rounded-2xl border border-accent-cyan/25 bg-gradient-to-br from-accent-cyan/5 to-accent-purple/5 backdrop-blur-sm shadow-lg shadow-[rgba(var(--accent-cyan-rgb),0.06)]">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-base font-bold text-[var(--text-primary)]">{item.role}</h3>
                          <p className="text-sm font-semibold text-accent-cyan mt-0.5">{item.org}</p>
                        </div>
                        <span className="text-xs text-[var(--text-secondary)] glass px-3 py-1 rounded-full whitespace-nowrap">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                    </div>
                  ) : (
                    <div className="flex-1 glass rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
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
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

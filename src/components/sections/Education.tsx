import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import type { Education as EducationType } from '@/lib/types'

interface EducationProps {
  education: EducationType[]
}

export default function Education({ education }: EducationProps) {
  return (
    <section id="education" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <SectionHeader title="Education" />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
          {education.map((edu, i) => (
            <AnimatedSection key={edu.degree} delay={0.1 + i * 0.1}>
              <GlassCard className="p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-[var(--text-secondary)] glass px-3 py-1 rounded-full">
                    {edu.period}
                  </span>
                  <span className="text-sm font-bold gradient-text">{edu.cgpa}</span>
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-1 leading-snug">
                  {edu.degree}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">{edu.institution}</p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

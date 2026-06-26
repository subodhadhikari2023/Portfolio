import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'
import type { SkillsMap } from '@/lib/types'

interface SkillsProps {
  skills: SkillsMap
}

const CATEGORY_ICONS: Record<string, string> = {
  Languages: '{ }',
  Backend: '⚙',
  Frontend: '◈',
  DevOps: '⬡',
  Databases: '▤',
  Tools: '⚒',
}

export default function Skills({ skills }: SkillsProps) {
  const categories = Object.entries(skills)

  return (
    <section id="skills" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <SectionHeader
            title="Skills"
            subtitle="Technologies I work with — backed by projects and certifications."
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {categories.map(([category, items], i) => (
            <AnimatedSection key={category} delay={0.08 * i}>
              <div className="glass rounded-2xl p-5 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-accent-cyan font-mono text-sm">{CATEGORY_ICONS[category] ?? '·'}</span>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1.5 glass rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-accent-cyan/30 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

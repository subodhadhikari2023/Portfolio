import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'
import type { SkillsMap } from '@/lib/types'

interface SkillsProps {
  skills: SkillsMap
}

const CATEGORY_META: Record<string, { icon: string; color: string }> = {
  'Web Applications':    { icon: '◈', color: 'var(--accent-cyan)' },
  'APIs & Backend':      { icon: '⚙', color: 'var(--accent-purple)' },
  'Deployment & DevOps': { icon: '⬡', color: 'var(--color-success)' },
  'Data & Storage':      { icon: '▤', color: 'var(--color-ibm)' },
  'Languages':           { icon: '{}', color: 'var(--color-udemy)' },
  'Tools':               { icon: '⚒', color: 'var(--text-secondary)' },
}

export default function Skills({ skills }: SkillsProps) {
  const categories = Object.entries(skills)

  return (
    <section id="skills" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <SectionHeader
            title="Skills"
            subtitle="What I can build for you — grouped by deliverable, backed by shipped projects."
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {categories.map(([category, items], i) => {
            const meta = CATEGORY_META[category] ?? { icon: '·', color: 'var(--accent-cyan)' }
            return (
              <AnimatedSection key={category} delay={0.08 * i}>
                <div
                  className="glass rounded-2xl p-5 h-full border-l-2 hover:-translate-y-0.5 transition-transform duration-200"
                  style={{ borderLeftColor: meta.color }}
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <span
                      className="font-mono text-base leading-none"
                      style={{ color: meta.color }}
                    >
                      {meta.icon}
                    </span>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                      {category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1.5 glass rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150 cursor-default"
                        style={{ ['--hover-border' as string]: meta.color }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}

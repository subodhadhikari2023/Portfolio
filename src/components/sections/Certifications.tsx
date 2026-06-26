import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Certification } from '@/lib/types'

interface CertificationsProps {
  certifications: Certification[]
}

const ISSUER_COLORS: Record<string, string> = {
  'Udemy': 'text-udemy',
  'IBM / Coursera': 'text-ibm',
}

export default function Certifications({ certifications }: CertificationsProps) {
  return (
    <section id="certifications" className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <SectionHeader
            title="Certifications"
            subtitle="Verified credentials — all certificates on file."
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {certifications.map((cert, i) => (
            <AnimatedSection key={cert.name} delay={0.06 * i}>
              <div className="glass rounded-xl p-4 h-full flex flex-col gap-2 hover:border-[var(--glass-border)] transition-all duration-200 hover:-translate-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-semibold ${ISSUER_COLORS[cert.issuer] ?? 'text-accent-cyan'}`}>
                    {cert.issuer}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">{cert.date}</span>
                </div>
                <p className="text-sm text-[var(--text-primary)] font-medium leading-snug">{cert.name}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

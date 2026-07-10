import Image from 'next/image'
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

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

export default function Certifications({ certifications }: CertificationsProps) {
  return (
    <section id="certifications" className="relative section-seam py-24 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <SectionHeader
            title="Certifications"
            subtitle="Verified credentials — click any card to view the certificate."
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {certifications.map((cert, i) => (
            <AnimatedSection key={cert.name} delay={0.06 * i}>
              <a
                href={cert.screenshot ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass hover-glow rounded-xl overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300"
              >
                {/* Certificate thumbnail */}
                {cert.screenshot ? (
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={cert.screenshot}
                      alt={cert.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <span className="flex items-center gap-1.5 text-white text-xs font-medium px-3 py-1.5 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <ExternalLinkIcon />
                        View Certificate
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full bg-[var(--bg-secondary)] flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
                    <span className="text-[var(--text-secondary)] text-3xl">🎓</span>
                  </div>
                )}

                {/* Info */}
                <div className="p-4 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-semibold ${ISSUER_COLORS[cert.issuer] ?? 'text-accent-cyan'}`}>
                      {cert.issuer}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)] shrink-0">{cert.date}</span>
                  </div>
                  <p className="text-sm text-[var(--text-primary)] font-medium leading-snug">{cert.name}</p>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

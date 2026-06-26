import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import type { FeaturedProject } from '@/lib/types'

interface ProjectsProps {
  projects: FeaturedProject[]
}

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <SectionHeader
            title="Projects"
            subtitle="Systems I've built and shipped — from internship portals to live academic platforms."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {projects.map((project, i) => (
            <AnimatedSection key={project.repo} delay={0.1 + i * 0.1}>
              <GlassCard className="h-full flex flex-col overflow-hidden">
                {/* Screenshot strip — scroll-snap carousel, CSS only */}
                {project.screenshots && project.screenshots.length > 0 && (
                  <div
                    className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory"
                    style={{ scrollSnapType: 'x mandatory' }}
                  >
                    {project.screenshots.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative flex-shrink-0 w-full snap-start"
                        style={{ aspectRatio: '16/9' }}
                      >
                        <Image
                          src={src}
                          alt={`${project.customTitle} screenshot ${idx + 1}`}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    {project.language && (
                      <span className="text-xs text-[var(--text-secondary)] mb-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-accent-cyan inline-block" />
                        {project.language}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{project.customTitle}</h3>
                  </div>
                </div>

                {/* Highlight badge */}
                <span className="inline-flex self-start mb-4 text-xs px-3 py-1 rounded-full bg-accent-purple/10 text-accent-cyan border border-accent-purple/20 font-medium">
                  {project.highlight}
                </span>

                {/* Description */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 flex-1">
                  {project.customDescription}
                </p>

                {/* Collaborator */}
                {project.collaborator && (
                  <p className="text-xs text-[var(--text-secondary)] mb-4 italic">{project.collaborator}</p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 glass rounded-full text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer links */}
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--glass-border)]">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <GitHubIcon />
                    View Code
                  </a>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-accent-cyan hover:opacity-80 transition-opacity"
                    >
                      <ExternalLinkIcon />
                      Live Demo
                    </a>
                  ) : (
                    <span className="text-xs text-[var(--text-secondary)] opacity-60 italic">
                      {project.liveLabel}
                    </span>
                  )}
                </div>
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

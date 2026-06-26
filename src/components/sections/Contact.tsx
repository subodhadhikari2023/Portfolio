import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Personal } from '@/lib/types'

interface ContactProps {
  personal: Personal
}

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

export default function Contact({ personal }: ContactProps) {
  const contacts = [
    {
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      icon: <MailIcon />,
      description: 'Start a project conversation',
    },
    {
      label: 'GitHub',
      value: 'subodhadhikari2023',
      href: personal.github,
      icon: <GitHubIcon />,
      description: 'See my code',
    },
    {
      label: 'LinkedIn',
      value: 'Subodh Adhikari',
      href: personal.linkedin,
      icon: <LinkedInIcon />,
      description: 'Connect professionally',
    },
  ]

  return (
    <section id="contact" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <AnimatedSection>
          <SectionHeader
            title="Start a Project"
            subtitle="Tell me what you need — I'll send a scoped proposal within 24 hours."
          />
          <p className="mt-4 text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            Web app from scratch, a backend API, or a full deployment pipeline — reach out via email with a brief description and I&apos;ll get back to you same day.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          {contacts.map((contact, i) => (
            <AnimatedSection key={contact.label} delay={0.1 + i * 0.1}>
              <a
                href={contact.href}
                target={contact.href.startsWith('mailto') ? undefined : '_blank'}
                rel={contact.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="group glass rounded-2xl p-6 flex flex-col items-center gap-3 hover:-translate-y-1 hover:border-accent-cyan/30 transition-all duration-300 block"
              >
                <span className="text-[var(--text-secondary)] group-hover:text-accent-cyan transition-colors duration-200">
                  {contact.icon}
                </span>
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{contact.label}</div>
                  <div className="text-xs text-[var(--text-secondary)] mt-0.5">{contact.description}</div>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

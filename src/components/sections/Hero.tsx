'use client'

import { motion, useReducedMotion, type Transition } from 'framer-motion'
import Image from 'next/image'
import type { Personal } from '@/lib/types'

interface HeroProps {
  personal: Personal
}

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const ArrowDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
  </svg>
)

export default function Hero({ personal }: HeroProps) {
  const prefersReduced = useReducedMotion()

  const t = (delay: number): Transition => ({ duration: 0.6, delay, ease: 'easeOut' as const })
  const fadeUp = (delay: number) => ({
    initial: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: t(delay),
  })

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div className="space-y-6">
            {personal.availableForWork && (
              <motion.div {...fadeUp(0)}>
                <span className="inline-flex items-center gap-2 text-sm px-3 py-1.5 glass rounded-full text-[var(--text-secondary)]">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  Available for Freelance Work
                </span>
              </motion.div>
            )}

            <motion.h1 {...fadeUp(0.1)} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              <span className="gradient-text">{personal.name.split(' ')[0]}</span>
              <br />
              <span className="text-[var(--text-primary)]">{personal.name.split(' ')[1]}</span>
            </motion.h1>

            <motion.h2 {...fadeUp(0.2)} className="text-xl sm:text-2xl font-semibold text-[var(--text-secondary)]">
              {personal.title}
            </motion.h2>

            <motion.p {...fadeUp(0.3)} className="text-base text-[var(--text-secondary)] leading-relaxed max-w-lg">
              {personal.tagline}
            </motion.p>

            <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="px-6 py-3 gradient-bg rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-accent-purple/20"
              >
                Hire Me
              </a>
              <a
                href="#projects"
                className="px-6 py-3 glass rounded-xl text-[var(--text-primary)] font-semibold text-sm hover:bg-white/10 transition-all duration-200"
              >
                View Projects
              </a>
              <a
                href={personal.resumeUrl}
                download
                className="px-6 py-3 glass rounded-xl text-[var(--text-secondary)] font-medium text-sm hover:text-[var(--text-primary)] transition-all duration-200"
              >
                Download CV
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.5)} className="flex items-center gap-4 pt-2">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hover:scale-110 duration-200"
              >
                <GitHubIcon />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[var(--text-secondary)] hover:text-accent-cyan transition-colors hover:scale-110 duration-200"
              >
                <LinkedInIcon />
              </a>
              <div className="w-px h-5 bg-[var(--glass-border)]" />
              <span className="text-xs text-[var(--text-secondary)]">{personal.location}</span>
            </motion.div>
          </div>

          {/* Right — photo */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              {/* Glow rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 blur-3xl scale-110" />
              <div className="absolute -inset-3 rounded-3xl border border-accent-cyan/20" />
              <div className="absolute -inset-6 rounded-3xl border border-accent-purple/10" />
              {/* Image */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden glass border border-[var(--glass-border)]">
                <Image
                  src="/assets/hero-image.jpeg"
                  alt="Subodh Adhikari — Full-Stack Developer"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 288px, 320px"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          {...fadeUp(0.8)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-secondary)] flex flex-col items-center gap-1 text-xs"
        >
          <ArrowDown />
        </motion.div>
      </div>
    </section>
  )
}

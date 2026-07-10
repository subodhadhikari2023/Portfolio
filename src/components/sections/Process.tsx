import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'

const STEPS = [
  {
    title: 'Discover',
    description: 'We align on scope, stack, and timeline on a short call. You get a clear, scoped proposal within 24 hours.',
  },
  {
    title: 'Build',
    description: 'I architect the system, then build the backend API and frontend in parallel — with tests written alongside the code, not after.',
  },
  {
    title: 'Deploy',
    description: 'Containerized with Docker and shipped through CI/CD to your cloud of choice — Railway, Oracle Cloud, or Vercel.',
  },
  {
    title: 'Support',
    description: 'Post-launch fixes and iteration — I stay reachable until you\'re confident running it on your own.',
  },
]

export default function Process() {
  return (
    <section id="process" className="relative section-seam py-16 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <SectionHeader
            title="How I Work"
            subtitle="Four steps from first call to a system running in production."
          />
        </AnimatedSection>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink" />

          {STEPS.map((step, i) => (
            <AnimatedSection key={step.title} delay={0.1 * i}>
              <div className="glass hover-glow rounded-2xl p-5 h-full relative">
                <div className="relative z-10 w-9 h-9 rounded-full gradient-bg text-white flex items-center justify-center text-sm font-bold mb-3">
                  {i + 1}
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

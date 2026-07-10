import type { Personal } from '@/lib/types'

interface FooterProps {
  personal: Personal
}

export default function Footer({ personal }: FooterProps) {
  return (
    <footer className="relative section-seam border-t border-[var(--glass-border)] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--text-secondary)]">
          © {new Date().getFullYear()} {personal.name} · Built with Next.js & deployed on Vercel
        </p>
        <div className="flex items-center gap-4">
          {(['About', 'Projects', 'Skills', 'Contact'] as const).map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

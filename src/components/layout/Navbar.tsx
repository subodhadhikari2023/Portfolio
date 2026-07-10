'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/components/ui/ThemeToggle'
import type { Personal } from '@/lib/types'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

interface NavbarProps {
  personal: Personal
}

export default function Navbar({ personal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-[var(--bg-primary)]/70 border-b border-[var(--glass-border)] shadow-[0_1px_24px_rgba(var(--accent-cyan-rgb),0.08)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="#"
          className="font-bold text-lg text-[var(--text-primary)] hover:opacity-80 transition-opacity"
          onClick={closeMenu}
        >
          <span className="gradient-text">{personal.name.split(' ')[0]}</span>
          <span className="text-[var(--text-secondary)]"> {personal.name.split(' ')[1]}</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative px-2.5 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg transition-all duration-200 whitespace-nowrap"
              >
                {link.label}
                <span className="absolute left-2.5 right-2.5 -bottom-0.5 h-px scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 bg-gradient-to-r from-accent-cyan to-accent-purple" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <a
            href={personal.resumeUrl}
            download
            className="text-sm px-4 py-1.5 glass rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover-glow transition-all duration-200"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="text-sm px-4 py-1.5 gradient-bg rounded-lg text-white font-medium hover:opacity-90 transition-all duration-200 shadow-[0_0_18px_rgba(var(--accent-purple-rgb),var(--glow-strength))] hover:shadow-[0_0_26px_rgba(var(--accent-cyan-rgb),calc(var(--glow-strength)+0.15))]"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg glass"
          >
            <span className={`block w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-[32rem] border-b border-[var(--glass-border)] shadow-[0_1px_24px_rgba(var(--accent-cyan-rgb),0.08)]' : 'max-h-0'
        } backdrop-blur-xl bg-[var(--bg-primary)]/95`}
      >
        <ul className="px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="block px-3 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2 flex gap-2">
            <a
              href={personal.resumeUrl}
              download
              onClick={closeMenu}
              className="flex-1 text-center text-sm px-4 py-2 glass rounded-lg text-[var(--text-secondary)]"
            >
              Resume
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="flex-1 text-center text-sm px-4 py-2 gradient-bg rounded-lg text-white font-medium"
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

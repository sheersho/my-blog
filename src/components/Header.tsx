'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/blog', label: 'Writing' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-ink-50/80 backdrop-blur-sm border-b border-ink-100">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-xl font-semibold text-ink-950 hover:text-accent-700 transition-colors">
          {process.env.NEXT_PUBLIC_SITE_NAME ?? 'My Blog'}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-500 hover:text-ink-900 transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/newsletter" className="btn-primary text-xs py-2 px-4">
            Subscribe →
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-ink-500 hover:text-ink-900"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-ink-100 bg-ink-50 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-ink-600 hover:text-ink-900 py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/newsletter" className="btn-primary text-xs w-full justify-center mt-2">
            Subscribe →
          </Link>
        </div>
      )}
    </header>
  )
}

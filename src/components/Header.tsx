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
    <header className="sticky top-0 z-50 border-b border-white/70 bg-ink-50/75 backdrop-blur-xl supports-[backdrop-filter]:bg-ink-50/60">
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold tracking-tight text-ink-950 hover:text-accent-700 transition-colors">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-500 shadow-[0_0_0_6px_rgba(46,136,255,0.12)]" />
          {process.env.NEXT_PUBLIC_SITE_NAME ?? "Sheersho's Blog"}
        </Link>

        <nav className="hidden md:flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-2 py-2 shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-600 hover:bg-ink-100 hover:text-ink-950 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/newsletter" className="btn-primary text-xs py-2 px-4 ml-2">
            Subscribe →
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden inline-flex items-center justify-center rounded-full border border-ink-200 bg-white/80 p-3 text-ink-500 shadow-sm hover:text-ink-900"
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

      {mobileOpen && (
        <div className="md:hidden border-t border-white/70 bg-white/90 px-6 py-4 space-y-2 shadow-soft">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-100 hover:text-ink-950"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/newsletter" className="btn-primary text-xs w-full justify-center mt-3">
            Subscribe →
          </Link>
        </div>
      )}
    </header>
  )
}

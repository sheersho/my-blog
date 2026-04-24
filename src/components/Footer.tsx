import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Sheersho's Blog"

  return (
    <footer className="border-t border-ink-100 bg-white mt-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand */}
          <div className="space-y-2">
            <Link href="/" className="font-serif text-lg font-semibold text-ink-950 hover:text-accent-700 transition-colors">
              {siteName}
            </Link>
            <p className="text-sm text-ink-400 max-w-xs">
              Thoughts on building, creating, and living well.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 text-sm">
            <div className="space-y-2">
              <p className="font-medium text-ink-700">Content</p>
              <nav className="space-y-1.5">
                <Link href="/blog" className="block text-ink-400 hover:text-ink-700 transition-colors">Writing</Link>
                <Link href="/newsletter" className="block text-ink-400 hover:text-ink-700 transition-colors">Newsletter</Link>
                <Link href="/about" className="block text-ink-400 hover:text-ink-700 transition-colors">About</Link>
              </nav>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-ink-700">Legal</p>
              <nav className="space-y-1.5">
                <Link href="/privacy" className="block text-ink-400 hover:text-ink-700 transition-colors">Privacy</Link>
                <Link href="/terms" className="block text-ink-400 hover:text-ink-700 transition-colors">Terms</Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ink-100 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-ink-400">
          <p>© {year} {siteName}. All rights reserved.</p>
          <p>Built with Next.js, Sanity & Resend</p>
        </div>
      </div>
    </footer>
  )
}

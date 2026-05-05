import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Sheersho's Blog"

  return (
    <footer className="mt-24 border-t border-white/70 bg-white/70 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="space-y-2">
            <Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold tracking-tight text-ink-950 hover:text-accent-700 transition-colors">
              <span className="h-2.5 w-2.5 rounded-full bg-accent-500" />
              {siteName}
            </Link>
            <p className="text-sm leading-6 text-ink-500 max-w-xs">
              Thoughts on building, creating, and living well.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">
            <div className="space-y-3">
              <p className="font-medium text-ink-700 uppercase tracking-[0.18em] text-[0.72rem]">Content</p>
              <nav className="space-y-2">
                <Link href="/blog" className="block text-ink-500 hover:text-ink-950 transition-colors">Writing</Link>
                <Link href="/newsletter" className="block text-ink-500 hover:text-ink-950 transition-colors">Newsletter</Link>
                <Link href="/about" className="block text-ink-500 hover:text-ink-950 transition-colors">About</Link>
              </nav>
            </div>
            <div className="space-y-3">
              <p className="font-medium text-ink-700 uppercase tracking-[0.18em] text-[0.72rem]">Legal</p>
              <nav className="space-y-2">
                <Link href="/privacy" className="block text-ink-500 hover:text-ink-950 transition-colors">Privacy</Link>
                <Link href="/terms" className="block text-ink-500 hover:text-ink-950 transition-colors">Terms</Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ink-100 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-ink-500">
          <p>© {year} {siteName}. All rights reserved.</p>
          <p>Built with Next.js, Sanity & Resend</p>
        </div>
      </div>
    </footer>
  )
}

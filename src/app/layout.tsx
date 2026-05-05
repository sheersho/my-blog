import type { Metadata } from 'next'
import { Inter, Fraunces, IBM_Plex_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'My Blog'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || 'http://localhost:3000'),
  title: {
    default: siteName,
    template: `%s — ${siteName}`,
  },
  description: 'Thoughts on building, creating, and living well.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@yourtwitterhandle',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${fraunces.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-ink-50 text-ink-800">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

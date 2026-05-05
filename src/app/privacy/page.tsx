import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
      <div className="rounded-[2.5rem] border border-white/70 bg-white/75 p-10 text-center shadow-soft backdrop-blur">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-ink-950 mb-4 tracking-tight">Privacy Policy</h1>
        <p className="text-ink-500 text-lg leading-8 max-w-xl mx-auto">Coming soon.</p>
      </div>
    </div>
  )
}

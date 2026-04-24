import type { Metadata } from 'next'
import { NewsletterForm } from '@/components/NewsletterForm'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Subscribe to get new essays and ideas delivered to your inbox.',
}

const BENEFITS = [
  {
    icon: '✦',
    title: 'Weekly essays',
    description: 'Long-form writing on creativity, craft, and building things — sent every week.',
  },
  {
    icon: '✦',
    title: 'Early access',
    description: 'Subscribers read new pieces before they\'re published publicly.',
  },
  {
    icon: '✦',
    title: 'Curated links',
    description: 'A handful of the best things I\'ve read, watched, or listened to each week.',
  },
  {
    icon: '✦',
    title: 'No spam, ever',
    description: 'One email per week, maximum. Unsubscribe with a single click at any time.',
  },
]

export default function NewsletterPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="max-w-2xl">
        {/* Header */}
        <span className="inline-block text-xs font-semibold text-accent-600 uppercase tracking-widest mb-5">
          Newsletter
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-ink-950 leading-tight mb-5">
          Ideas worth sitting with.
        </h1>
        <p className="text-xl text-ink-500 leading-relaxed mb-12">
          A weekly letter about the practice of writing, building in public, and staying sane while doing creative work. Join over 1,000 readers.
        </p>

        {/* Subscribe form */}
        <div className="bg-white border border-ink-100 rounded-2xl p-8 mb-16">
          <h2 className="font-serif text-xl font-semibold text-ink-950 mb-2">Subscribe — it&apos;s free</h2>
          <p className="text-sm text-ink-400 mb-6">Enter your email and you&apos;ll get the next issue.</p>
          <NewsletterForm />
        </div>

        {/* Benefits */}
        <h2 className="font-serif text-2xl font-semibold text-ink-950 mb-8">What you&apos;ll get</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {BENEFITS.map(b => (
            <div key={b.title} className="flex gap-4">
              <span className="text-accent-500 mt-0.5 shrink-0">{b.icon}</span>
              <div>
                <p className="font-medium text-ink-800 mb-1">{b.title}</p>
                <p className="text-sm text-ink-500 leading-relaxed">{b.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="mt-16 pt-10 border-t border-ink-100">
          <p className="font-serif text-lg text-ink-700 italic mb-4">
            &ldquo;One of the few newsletters I actually look forward to reading.&rdquo;
          </p>
          <p className="text-sm text-ink-400">— A happy subscriber</p>
        </div>
      </div>
    </div>
  )
}

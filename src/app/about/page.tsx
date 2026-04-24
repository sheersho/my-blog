import type { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterForm } from '@/components/NewsletterForm'
import { getAllCategories } from '@/lib/sanity'
import type { Category } from '@/types'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about the author.',
}

const TOPICS = [
  { label: 'Writing & craft', description: 'The practice of finding the right words, and what that practice does to you over time.' },
  { label: 'Building in public', description: 'What it means to share your work openly — the rewards, the costs, and the lessons.' },
  { label: 'Productivity & systems', description: 'How to organize your work so it actually moves forward without burning out.' },
  { label: 'Creativity & ideas', description: 'Where ideas come from, how to develop them, and how to stop killing them too early.' },
]

// Edit these directly to match your real details
const AUTHOR = {
  name: 'Your Name',
  tagline: 'Writer, builder, and occasional overthinker. I write about the craft of creative work — what it takes to keep going, get better, and make things that matter.',
  twitter: '@yourhandle',
}

export default async function AboutPage() {
  const categories: Category[] = (await getAllCategories()) ?? []

  const initials = AUTHOR.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Profile */}
      <div className="flex flex-col sm:flex-row items-start gap-8 mb-16">
        <div className="w-20 h-20 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center text-2xl font-semibold font-serif shrink-0">
          {initials}
        </div>
        <div>
          <h1 className="font-serif text-4xl font-semibold text-ink-950 mb-3">
            {AUTHOR.name}
          </h1>
          <p className="text-ink-500 text-lg leading-relaxed max-w-xl">
            {AUTHOR.tagline}
          </p>
          {AUTHOR.twitter && (
            <a
              href={`https://twitter.com/${AUTHOR.twitter.replace('@', '')}`}
              className="inline-flex items-center gap-1.5 text-sm text-accent-600 hover:text-accent-800 transition-colors mt-4 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              {AUTHOR.twitter} ↗
            </a>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-16">
        <div className="md:col-span-2 space-y-8">
          {/* Bio */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-ink-950 mb-4">About</h2>
            <div className="prose-blog space-y-4">
              <p>
                I started writing publicly a few years ago, mostly as a way to think out loud. What began as a scratchpad became a discipline — and eventually, something I care about deeply.
              </p>
              <p>
                My writing sits at the intersection of creativity and craft: how do you build a sustainable practice? How do you develop a voice? How do you ship work that feels true without waiting until it&apos;s perfect?
              </p>
              <p>
                I&apos;m also interested in the business of independent creation — newsletters, products, communities — and the tension between making art and making a living.
              </p>
            </div>
          </section>

          {/* What I write about */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-ink-950 mb-6">What I write about</h2>
            <div className="space-y-5">
              {TOPICS.map(t => (
                <div key={t.label} className="flex gap-4">
                  <span className="text-accent-500 mt-1 shrink-0">✦</span>
                  <div>
                    <p className="font-medium text-ink-800 mb-0.5">{t.label}</p>
                    <p className="text-sm text-ink-500 leading-relaxed">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {categories.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-ink-400 uppercase tracking-widest mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Link
                    key={cat._id}
                    href={`/blog?category=${cat.slug.current}`}
                    className="px-3 py-1 rounded-full text-sm bg-white border border-ink-200 text-ink-600 hover:border-accent-300 hover:text-accent-700 transition-colors"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="bg-white border border-ink-100 rounded-2xl p-6">
            <h3 className="font-serif text-lg font-semibold text-ink-950 mb-2">Get the newsletter</h3>
            <p className="text-xs text-ink-400 leading-relaxed mb-4">
              New essays in your inbox every week. Free.
            </p>
            <NewsletterForm compact />
          </div>
        </div>
      </div>
    </div>
  )
}

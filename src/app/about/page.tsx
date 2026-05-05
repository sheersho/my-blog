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
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
      <div className="rounded-[2.5rem] border border-white/70 bg-white/75 p-8 shadow-soft backdrop-blur md:p-12 mb-16">
        <div className="flex flex-col sm:flex-row items-start gap-8">
          <div className="w-20 h-20 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center text-2xl font-semibold font-serif shrink-0 ring-1 ring-accent-200/60">
            {initials}
          </div>
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-ink-950 mb-3 tracking-tight">
              {AUTHOR.name}
            </h1>
            <p className="text-ink-500 text-lg leading-8 max-w-2xl">
              {AUTHOR.tagline}
            </p>
            {AUTHOR.twitter && (
              <a
                href={`https://twitter.com/${AUTHOR.twitter.replace('@', '')}`}
                className="inline-flex items-center gap-1.5 text-sm text-accent-700 hover:text-accent-900 transition-colors mt-4 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {AUTHOR.twitter} ↗
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
        <div className="md:col-span-2 space-y-8">
          <section className="rounded-[2rem] border border-white/70 bg-white/65 p-8 shadow-soft backdrop-blur">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink-950 mb-4 tracking-tight">About</h2>
            <div className="prose-blog space-y-4 max-w-none">
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

          <section className="rounded-[2rem] border border-white/70 bg-white/65 p-8 shadow-soft backdrop-blur">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink-950 mb-6 tracking-tight">What I write about</h2>
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
            <div className="rounded-[2rem] border border-white/70 bg-white/65 p-6 shadow-soft backdrop-blur">
              <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-[0.22em] mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Link
                    key={cat._id}
                    href={`/blog?category=${cat.slug.current}`}
                    className="px-3 py-1.5 rounded-full text-sm bg-white/85 border border-white/80 text-ink-600 shadow-sm hover:border-accent-200 hover:text-accent-700 transition-colors"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-[2rem] border border-ink-950 bg-ink-950 p-6 text-white shadow-soft">
            <h3 className="font-serif text-lg font-semibold mb-2 tracking-tight">Get the newsletter</h3>
            <p className="text-xs text-white/70 leading-relaxed mb-4">
              New essays in your inbox every week. Free.
            </p>
            <NewsletterForm compact />
          </div>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PLACEHOLDER_POSTS } from '@/lib/placeholder'
import { NewsletterForm } from '@/components/NewsletterForm'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return PLACEHOLDER_POSTS.map(post => ({ slug: post.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = PLACEHOLDER_POSTS.find(p => p.slug.current === slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = PLACEHOLDER_POSTS.find(p => p.slug.current === slug)
  if (!post) notFound()

  const authorInitials = post.author.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link href="/blog" className="text-sm text-ink-400 hover:text-ink-700 transition-colors mb-10 inline-flex items-center gap-1">
        ← All Writing
      </Link>

      {/* Post header */}
      <header className="mt-8 mb-12">
        <div className="flex items-center gap-3 mb-5">
          {post.categories.map(cat => (
            <span key={cat._id} className="text-xs font-semibold text-accent-600 uppercase tracking-widest">
              {cat.title}
            </span>
          ))}
          {post.isPremium && (
            <span className="badge-premium">★ Premium</span>
          )}
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-ink-950 leading-tight mb-6 max-w-2xl">
          {post.title}
        </h1>

        <p className="text-xl text-ink-500 leading-relaxed max-w-2xl mb-8">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 text-sm text-ink-400 pb-8 border-b border-ink-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center text-xs font-semibold">
              {authorInitials}
            </div>
            <span className="text-ink-700 font-medium">{post.author.name}</span>
          </div>
          <span>·</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span>·</span>
          <span>{post.estimatedReadingTime} min read</span>
        </div>
      </header>

      {/* Body */}
      <div className="prose-blog max-w-2xl">
        <p>
          There&apos;s a particular kind of silence that settles in before the first word. Not an empty silence — a charged one. The cursor blinks. The notebook sits open. And you, the writer, must decide whether today is the day you finally say the thing you&apos;ve been circling for weeks.
        </p>

        <p>
          Most days, the decision isn&apos;t dramatic. You sit down, you write, you close the document. But somewhere in the accumulation of those unremarkable sessions, something shifts. The work begins to feel less like performance and more like thinking — and that&apos;s when it gets interesting.
        </p>

        <h2>The compounding return of consistent practice</h2>

        <p>
          Writers who produce consistently over years aren&apos;t necessarily more talented than those who don&apos;t. They&apos;ve simply made a different bargain: they&apos;ve traded the possibility of the perfect piece for the certainty of many real ones. Over time, that trade pays interest.
        </p>

        <p>
          Each session adds a small deposit to an account you can&apos;t see in the moment. The ideas you capture today become the scaffolding for an insight you&apos;ll have in six months. The phrase you discard becomes the exact phrase you need next year. Nothing is wasted — it&apos;s all fermenting somewhere.
        </p>

        <blockquote>
          You don&apos;t wait for inspiration. You show up, and inspiration learns your address.
        </blockquote>

        <h2>What actually changes</h2>

        <p>
          The external evidence of a writing practice is modest: a growing archive, a slightly larger audience, perhaps some money. The internal evidence is harder to describe but more significant. Your thinking sharpens. You start noticing the structure in things — conversations, arguments, your own moods. You become harder to fool because you&apos;ve spent so many hours trying to be precise.
        </p>

        <p>
          You also become more patient with ambiguity. Writing teaches you that the first version of any idea is almost certainly wrong, and that this is fine — it&apos;s just the start of the process of getting it right. You stop needing to be right immediately, which makes you better at almost everything.
        </p>

        <h2>How to start (or restart)</h2>

        <p>
          The only requirement is that you write something today. Not good something. Not publishable something. Just something. A paragraph, a list, a complaint. The quality of the first draft is irrelevant; the only thing that matters is that you practiced the act of translating thought into language.
        </p>

        <p>
          Do this enough times and you won&apos;t need motivation. You&apos;ll need the practice the way you need coffee in the morning — not because you decided to want it, but because the absence of it makes the day feel off.
        </p>

        <p>
          That&apos;s the quiet art of it. No fanfare. Just the daily work of becoming someone who writes.
        </p>
      </div>

      {/* Author card */}
      <div className="mt-16 pt-10 border-t border-ink-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center font-semibold text-sm shrink-0">
            {authorInitials}
          </div>
          <div>
            <p className="font-medium text-ink-950 mb-1">{post.author.name}</p>
            <p className="text-sm text-ink-500 leading-relaxed max-w-lg">{post.author.bio}</p>
            {post.author.twitter && (
              <a
                href={`https://twitter.com/${post.author.twitter.replace('@', '')}`}
                className="text-sm text-accent-600 hover:text-accent-800 transition-colors mt-2 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.author.twitter}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16 p-8 bg-white border border-ink-100 rounded-2xl">
        <h3 className="font-serif text-xl font-semibold text-ink-950 mb-2">Enjoyed this?</h3>
        <p className="text-ink-500 text-sm mb-6">
          Subscribe to get new essays delivered to your inbox.
        </p>
        <NewsletterForm compact />
      </div>
    </article>
  )
}

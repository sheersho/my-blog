import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/sanity'
import { PortableText } from '@/components/PortableText'
import { NewsletterForm } from '@/components/NewsletterForm'
import type { Post } from '@/types'

type Props = { params: Promise<{ slug: string }> }


export async function generateStaticParams() {
  const posts: Post[] = await getAllPosts()
  return posts.map(post => ({ slug: post.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post: Post | null = await getPostBySlug(slug)
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
  const post: Post | null = await getPostBySlug(slug)
  if (!post) notFound()

  const authorInitials = post.author.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-ink-400 hover:text-ink-700 transition-colors mb-10 inline-flex items-center gap-1"
      >
        ← All Writing
      </Link>

      {/* Post header */}
      <header className="mt-8 mb-12">
        <div className="flex items-center gap-3 mb-5">
          {post.categories?.map(cat => (
            <span key={cat._id} className="text-xs font-semibold text-accent-600 uppercase tracking-widest">
              {cat.title}
            </span>
          ))}
          {post.isPremium && <span className="badge-premium">★ Premium</span>}
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-ink-950 leading-tight mb-6 max-w-2xl">
          {post.title}
        </h1>

        <p className="text-xl text-ink-500 leading-relaxed max-w-2xl mb-8">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-400 pb-8 border-b border-ink-100">
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
      {post.body?.length > 0 && <PortableText value={post.body} />}

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

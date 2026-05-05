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
    <article className="max-w-5xl mx-auto px-6 py-16 md:py-20">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm text-ink-500 shadow-sm transition-colors hover:text-ink-950"
      >
        ← All Writing
      </Link>

      <header className="mt-4 mb-12 rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-soft backdrop-blur md:p-12">
        <div className="flex items-center gap-3 mb-5">
          {post.categories?.map(cat => (
            <span key={cat._id} className="text-[0.7rem] font-semibold text-accent-700 uppercase tracking-[0.2em]">
              {cat.title}
            </span>
          ))}
          {post.isPremium && <span className="badge-premium">★ Premium</span>}
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-ink-950 leading-[1.02] mb-6 max-w-3xl tracking-tight">
          {post.title}
        </h1>

        <p className="text-lg md:text-xl text-ink-500 leading-8 max-w-2xl mb-8">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-500 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center text-xs font-semibold ring-1 ring-accent-200/60">
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

      <div className="mt-16 pt-10 border-t border-ink-100">
        <div className="flex items-start gap-4 rounded-[1.75rem] bg-white/70 p-6 shadow-soft backdrop-blur">
          <div className="w-12 h-12 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center font-semibold text-sm shrink-0 ring-1 ring-accent-200/60">
            {authorInitials}
          </div>
          <div>
            <p className="font-medium text-ink-950 mb-1">{post.author.name}</p>
            <p className="text-sm text-ink-500 leading-6 max-w-lg">{post.author.bio}</p>
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

      <div className="mt-16 p-8 bg-white/80 border border-white/70 rounded-[2rem] shadow-soft backdrop-blur">
        <h3 className="font-serif text-2xl font-semibold text-ink-950 mb-2 tracking-tight">Enjoyed this?</h3>
        <p className="text-ink-500 text-sm mb-6 leading-6">
          Subscribe to get new essays delivered to your inbox.
        </p>
        <NewsletterForm compact />
      </div>
    </article>
  )
}

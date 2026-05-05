import Link from 'next/link'
import type { Post } from '@/types'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group py-8 md:py-10 transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center gap-3 mb-4">
        {(post.categories ?? []).slice(0, 2).map(cat => (
          <span key={cat._id} className="text-[0.7rem] font-semibold text-accent-700 uppercase tracking-[0.2em]">
            {cat.title}
          </span>
        ))}
        {post.isPremium && (
          <span className="badge-premium">★ Premium</span>
        )}
      </div>

      <Link href={`/blog/${post.slug.current}`} className="block group">
        <h2 className="font-serif text-2xl md:text-[2rem] font-semibold text-ink-950 mb-3 group-hover:text-accent-700 transition-colors leading-tight tracking-tight max-w-3xl">
          {post.title}
        </h2>
      </Link>

      <p className="text-ink-500 leading-7 mb-5 max-w-2xl">
        {post.excerpt}
      </p>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-500">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span className="text-ink-300">·</span>
        <span>{post.estimatedReadingTime} min read</span>
        {post.author && (
          <>
            <span className="text-ink-300">·</span>
            <span>{post.author.name}</span>
          </>
        )}
      </div>
    </article>
  )
}

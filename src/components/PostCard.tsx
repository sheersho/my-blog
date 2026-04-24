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
    <article className="py-8 group">
      <div className="flex items-center gap-3 mb-3">
        {(post.categories ?? []).slice(0, 2).map(cat => (
          <span key={cat._id} className="text-xs font-medium text-accent-600 uppercase tracking-wider">
            {cat.title}
          </span>
        ))}
        {post.isPremium && (
          <span className="badge-premium">★ Premium</span>
        )}
      </div>

      <Link href={`/blog/${post.slug.current}`} className="block group">
        <h2 className="font-serif text-2xl font-semibold text-ink-950 mb-2 group-hover:text-accent-700 transition-colors leading-snug">
          {post.title}
        </h2>
      </Link>

      <p className="text-ink-500 leading-relaxed mb-4 max-w-2xl">
        {post.excerpt}
      </p>

      <div className="flex items-center gap-3 text-sm text-ink-400">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span>·</span>
        <span>{post.estimatedReadingTime} min read</span>
        {post.author && (
          <>
            <span>·</span>
            <span>{post.author.name}</span>
          </>
        )}
      </div>
    </article>
  )
}

import type { Metadata } from 'next'
import { PostCard } from '@/components/PostCard'
import { PLACEHOLDER_POSTS, PLACEHOLDER_CATEGORIES } from '@/lib/placeholder'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'All posts and essays.',
}

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Page header */}
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-semibold text-ink-950 mb-3">Writing</h1>
        <p className="text-ink-500 text-lg">
          {PLACEHOLDER_POSTS.length} essays on{' '}
          {PLACEHOLDER_CATEGORIES.map((c, i) => (
            <span key={c._id}>
              {i > 0 && i < PLACEHOLDER_CATEGORIES.length - 1 ? ', ' : ''}
              {i === PLACEHOLDER_CATEGORIES.length - 1 && i > 0 ? ' & ' : ''}
              <span className="text-ink-700">{c.title.toLowerCase()}</span>
            </span>
          ))}
          .
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-ink-950 text-white">
          All
        </span>
        {PLACEHOLDER_CATEGORIES.map(cat => (
          <span
            key={cat._id}
            className="px-3 py-1 rounded-full text-sm font-medium bg-white border border-ink-200 text-ink-600 hover:border-ink-400 transition-colors cursor-pointer"
          >
            {cat.title}
          </span>
        ))}
      </div>

      {/* Posts */}
      <div className="divide-y divide-ink-100">
        {PLACEHOLDER_POSTS.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}

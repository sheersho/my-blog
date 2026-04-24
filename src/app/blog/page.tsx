import type { Metadata } from 'next'
import { PostCard } from '@/components/PostCard'
import { getAllPosts, getAllCategories } from '@/lib/sanity'
import type { Post, Category } from '@/types'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'All posts and essays.',
}

export default async function BlogPage() {
  const [posts, categories]: [Post[], Category[]] = await Promise.all([
    getAllPosts().then(r => r ?? []),
    getAllCategories().then(r => r ?? []),
  ])

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Page header */}
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-semibold text-ink-950 mb-3">Writing</h1>
        <p className="text-ink-500 text-lg">
          {posts.length} {posts.length === 1 ? 'essay' : 'essays'}
          {categories.length > 0 && (
            <>
              {' '}on{' '}
              {categories.map((c, i) => (
                <span key={c._id}>
                  {i > 0 && i < categories.length - 1 ? ', ' : ''}
                  {i === categories.length - 1 && i > 0 ? ' & ' : ''}
                  <span className="text-ink-700">{c.title.toLowerCase()}</span>
                </span>
              ))}
            </>
          )}
          .
        </p>
      </div>

      {/* Category filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-ink-950 text-white">
            All
          </span>
          {categories.map(cat => (
            <span
              key={cat._id}
              className="px-3 py-1 rounded-full text-sm font-medium bg-white border border-ink-200 text-ink-600 hover:border-ink-400 transition-colors cursor-pointer"
            >
              {cat.title}
            </span>
          ))}
        </div>
      )}

      {/* Posts */}
      {posts.length > 0 ? (
        <div className="divide-y divide-ink-100">
          {posts.map((post: Post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-ink-400 py-16 text-center">No posts yet — check back soon.</p>
      )}
    </div>
  )
}

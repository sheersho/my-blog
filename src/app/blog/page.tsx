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
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
      <div className="mb-12 rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-soft backdrop-blur">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-ink-950 mb-4 tracking-tight">Writing</h1>
        <p className="max-w-3xl text-ink-500 text-lg leading-8">
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
          <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-ink-950 text-white shadow-sm">
            All
          </span>
          {categories.map(cat => (
            <span
              key={cat._id}
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/80 border border-white/80 text-ink-600 shadow-sm transition-colors cursor-pointer"
            >
              {cat.title}
            </span>
          ))}
        </div>
      )}

      {/* Posts */}
      {posts.length > 0 ? (
        <div className="divide-y divide-ink-100 rounded-[2rem] border border-white/70 bg-white/60 px-6 shadow-soft backdrop-blur">
          {posts.map((post: Post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-ink-500 py-16 text-center">No posts yet. Check back soon.</p>
      )}
    </div>
  )
}

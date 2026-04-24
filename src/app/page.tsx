import Link from 'next/link'
import { PostCard } from '@/components/PostCard'
import { NewsletterForm } from '@/components/NewsletterForm'
import { getAllPosts } from '@/lib/sanity'
import type { Post } from '@/types'

export default async function HomePage() {
  const posts: Post[] = (await getAllPosts()) ?? []
  const recentPosts = posts.slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16">
        <span className="inline-block text-xs font-semibold text-accent-600 uppercase tracking-widest mb-5">
          Slow Journalism
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl font-semibold text-ink-950 leading-tight max-w-2xl mb-6">
          Writing about building, creating &amp; living well.
        </h1>
        <p className="text-xl text-ink-500 max-w-xl leading-relaxed mb-10">
          A newsletter and blog exploring creativity, craft, and the quiet work of making something meaningful.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/blog" className="btn-primary">
            Read the Blog →
          </Link>
          <Link href="/newsletter" className="btn-secondary">
            Subscribe Free
          </Link>
        </div>
      </section>

      {/* Recent Writing */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-serif text-2xl font-semibold text-ink-950">Recent Writing</h2>
          <Link href="/blog" className="text-sm text-accent-600 hover:text-accent-800 transition-colors font-medium">
            All posts →
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className="divide-y divide-ink-100">
            {recentPosts.map((post: Post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-ink-400 py-12 text-center">No posts yet — check back soon.</p>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-white border-y border-ink-100">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="max-w-xl">
            <span className="inline-block text-xs font-semibold text-accent-600 uppercase tracking-widest mb-4">
              Newsletter
            </span>
            <h2 className="font-serif text-3xl font-semibold text-ink-950 mb-3">
              Stay in the loop.
            </h2>
            <p className="text-ink-500 leading-relaxed mb-8">
              New essays, ideas, and occasional recommendations — delivered to your inbox. No spam, unsubscribe any time.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}

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
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 md:pt-20">
        <div className="rounded-[2.5rem] border border-white/70 bg-white/72 p-8 shadow-soft backdrop-blur md:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(46,136,255,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(11,16,32,0.05),transparent_28%)]" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-200/80 bg-accent-50 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent-700 mb-5">
              Slow Journalism
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-ink-950 leading-[0.98] max-w-3xl mb-6 tracking-tight">
              Writing about building, creating, and living well.
            </h1>
            <p className="text-lg md:text-xl text-ink-500 max-w-2xl leading-8 mb-10">
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
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink-950 tracking-tight">Recent Writing</h2>
          <Link href="/blog" className="text-sm text-accent-700 hover:text-accent-900 transition-colors font-medium">
            All posts →
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className="divide-y divide-ink-100 rounded-[2rem] border border-white/70 bg-white/60 px-6 shadow-soft backdrop-blur">
            {recentPosts.map((post: Post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-ink-500 py-12 text-center">No posts yet. Check back soon.</p>
        )}
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="rounded-[2.5rem] border border-white/70 bg-ink-950 px-8 py-10 text-white shadow-soft md:px-12 md:py-12 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(46,136,255,0.28),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/80 mb-4">
              Newsletter
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-3 tracking-tight">
              Stay in the loop.
            </h2>
            <p className="text-white/72 leading-8 mb-8 max-w-xl">
              New essays, ideas, and occasional recommendations delivered to your inbox. No spam, unsubscribe any time.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}

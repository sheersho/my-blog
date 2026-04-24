'use client'

import { useState } from 'react'

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    // TODO: wire up to /api/newsletter once Resend is configured
    await new Promise(r => setTimeout(r, 800))
    setStatus('success')
    setEmail('')
  }

  if (status === 'success') {
    return (
      <div className="text-center py-4">
        <p className="font-serif text-lg text-ink-800">You&apos;re on the list.</p>
        <p className="text-sm text-ink-400 mt-1">Check your inbox for a confirmation email.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'flex gap-2' : 'flex flex-col sm:flex-row gap-3'}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-2.5 rounded-lg border border-ink-200 bg-white text-ink-800 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary whitespace-nowrap disabled:opacity-60"
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe Free →'}
      </button>
    </form>
  )
}

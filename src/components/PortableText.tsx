import { PortableText as BasePortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { SanityBlock } from '@/types'

const components = {
  types: {
    image: ({ value }: { value: { asset?: { _ref: string }; alt?: string; caption?: string } }) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value as any).width(800).auto('format').url()}
            alt={value.alt ?? ''}
            width={800}
            height={500}
            className="rounded-xl w-full"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-ink-400 mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-2xl font-semibold text-ink-950 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-xl font-semibold text-ink-950 mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="font-serif text-lg font-semibold text-ink-950 mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-accent-400 pl-6 italic text-ink-600 my-8">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-6">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-ink-950">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-ink-100 text-ink-700 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode
      value?: { href?: string; blank?: boolean }
    }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-accent-700 underline underline-offset-2 decoration-accent-300 hover:decoration-accent-600 transition-all"
      >
        {children}
      </a>
    ),
  },
}

export function PortableText({ value }: { value: SanityBlock[] }) {
  return (
    <div className="prose-blog max-w-2xl">
      <BasePortableText value={value as any} components={components} />
    </div>
  )
}

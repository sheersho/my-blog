import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImage } from '@/types'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  // Only use token for server-side writes; reads are public
  token: process.env.SANITY_API_TOKEN,
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

// ─── Typed GROQ Queries ──────────────────────────────────────────────────────

export const postFields = `
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  isPremium,
  estimatedReadingTime,
  mainImage { asset, alt, caption },
  categories[]-> { _id, title, "slug": slug.current, color },
  author-> { _id, name, bio, image, twitter }
`

export async function getAllPosts() {
  return sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      ${postFields}
    }`
  )
}

export async function getPostBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      ${postFields},
      body
    }`,
    { slug }
  )
}

export async function getFeaturedPosts(limit = 3) {
  return sanityClient.fetch(
    `*[_type == "post" && defined(slug.current) && featured == true] | order(publishedAt desc)[0...$limit] {
      ${postFields}
    }`,
    { limit }
  )
}

export async function getPostsByCategory(categorySlug: string) {
  return sanityClient.fetch(
    `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
      ${postFields}
    }`,
    { categorySlug }
  )
}

export async function getAllCategories() {
  return sanityClient.fetch(
    `*[_type == "category"] | order(title asc) {
      _id, title, "slug": slug.current, color, description
    }`
  )
}

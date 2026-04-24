// ─── Sanity Post ────────────────────────────────────────────────────────────
export interface Post {
  _id: string
  _createdAt: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  estimatedReadingTime: number
  mainImage: SanityImage
  categories: Category[]
  author: Author
  body: SanityBlock[]
  isPremium: boolean
}

export interface Author {
  _id: string
  name: string
  bio: string
  image: SanityImage
  twitter?: string
}

export interface Category {
  _id: string
  title: string
  slug: { current: string }
  color: string
}

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  alt?: string
  caption?: string
}

export type SanityBlock = {
  _type: string
  _key: string
  [key: string]: unknown
}

// ─── Newsletter ──────────────────────────────────────────────────────────────
export interface NewsletterSubscriber {
  email: string
  firstName?: string
  subscribedAt: string
}

export interface NewsletterResponse {
  success: boolean
  message: string
}

// ─── Monetization ────────────────────────────────────────────────────────────
export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  checkoutUrl: string
  type: 'one-time' | 'subscription'
}

// ─── API Responses ───────────────────────────────────────────────────────────
export interface ApiResponse<T = void> {
  success: boolean
  data?: T
  error?: string
}

// Lemon Squeezy monetization integration
// Docs: https://docs.lemonsqueezy.com/api

const LEMON_SQUEEZY_API = 'https://api.lemonsqueezy.com/v1'

async function lsRequest(path: string, options: RequestInit = {}) {
  const res = await fetch(`${LEMON_SQUEEZY_API}${path}`, {
    ...options,
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
      ...options.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`Lemon Squeezy API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts() {
  const data = await lsRequest(
    `/products?filter[store_id]=${process.env.LEMON_SQUEEZY_STORE_ID}`
  )
  return data.data
}

export async function getProduct(productId: string) {
  const data = await lsRequest(`/products/${productId}`)
  return data.data
}

// ─── Subscriptions ────────────────────────────────────────────────────────────

export async function getSubscription(subscriptionId: string) {
  const data = await lsRequest(`/subscriptions/${subscriptionId}`)
  return data.data
}

export async function cancelSubscription(subscriptionId: string) {
  return lsRequest(`/subscriptions/${subscriptionId}`, { method: 'DELETE' })
}

// ─── Checkout ─────────────────────────────────────────────────────────────────

export async function createCheckout({
  variantId,
  email,
  name,
  customData,
}: {
  variantId: string
  email?: string
  name?: string
  customData?: Record<string, string>
}) {
  return lsRequest('/checkouts', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            email,
            name,
            custom: customData,
          },
        },
        relationships: {
          store: {
            data: { type: 'stores', id: process.env.LEMON_SQUEEZY_STORE_ID },
          },
          variant: {
            data: { type: 'variants', id: variantId },
          },
        },
      },
    }),
  })
}

// ─── Webhook Verification ─────────────────────────────────────────────────────

import { createHmac } from 'crypto'

export function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET
  if (!secret) return false

  const expectedSignature = createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  return expectedSignature === signature
}

// ─── Check if user has active subscription ────────────────────────────────────

export async function checkSubscriberAccess(email: string): Promise<boolean> {
  try {
    const data = await lsRequest(
      `/subscriptions?filter[store_id]=${process.env.LEMON_SQUEEZY_STORE_ID}&filter[user_email]=${email}`
    )
    return data.data?.some(
      (sub: { attributes: { status: string } }) => sub.attributes.status === 'active'
    ) ?? false
  } catch {
    return false
  }
}

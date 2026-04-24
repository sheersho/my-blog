interface Env {
  RESEND_API_KEY: string
  RESEND_AUDIENCE_ID: string
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  let email: string
  try {
    const body = await request.json() as { email?: string }
    email = body.email ?? ''
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers })
  }

  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Valid email is required' }), { status: 400, headers })
  }

  if (!env.RESEND_API_KEY || !env.RESEND_AUDIENCE_ID) {
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500, headers })
  }

  // Check if already subscribed
  const listRes = await fetch(`https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`, {
    headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}` },
  })
  if (listRes.ok) {
    const { data } = await listRes.json() as { data: Array<{ email: string; unsubscribed: boolean }> }
    const existing = data?.find(c => c.email.toLowerCase() === email.toLowerCase())
    if (existing && !existing.unsubscribed) {
      return new Response(JSON.stringify({ error: 'already_subscribed' }), { status: 409, headers })
    }
  }

  const res = await fetch(`https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  })

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Failed to subscribe' }), { status: 502, headers })
  }

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Sheersho Pramanik <hi@sheersho.in>',
      to: email,
      subject: "You're subscribed!",
      html: `<p>Hey,</p>
<p>Thanks for subscribing to my blog. You'll be the first to know when I publish something new.</p>
<p>— Sheersho</p>`,
    }),
  })

  return new Response(JSON.stringify({ success: true }), { status: 200, headers })
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

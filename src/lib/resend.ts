import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// ─── Newsletter Subscription ─────────────────────────────────────────────────

export async function subscribeToNewsletter(email: string, firstName?: string) {
  if (!process.env.RESEND_AUDIENCE_ID) {
    throw new Error('RESEND_AUDIENCE_ID not configured')
  }

  // Add contact to Resend audience
  const contact = await resend.contacts.create({
    email,
    firstName,
    audienceId: process.env.RESEND_AUDIENCE_ID,
    unsubscribed: false,
  })

  // Send welcome email
  await resend.emails.send({
    from: `${process.env.NEXT_PUBLIC_SITE_NAME} <hello@yourdomain.com>`,
    to: email,
    subject: `Welcome to ${process.env.NEXT_PUBLIC_SITE_NAME}! 🎉`,
    html: welcomeEmailTemplate(firstName ?? 'there'),
  })

  return contact
}

export async function unsubscribeFromNewsletter(email: string) {
  if (!process.env.RESEND_AUDIENCE_ID) {
    throw new Error('RESEND_AUDIENCE_ID not configured')
  }
  
  // Find and update contact
  const contacts = await resend.contacts.list({
    audienceId: process.env.RESEND_AUDIENCE_ID,
  })

  const contact = contacts.data?.data?.find(c => c.email === email)
  if (contact) {
    await resend.contacts.update({
      id: contact.id,
      audienceId: process.env.RESEND_AUDIENCE_ID,
      unsubscribed: true,
    })
  }
}

// ─── Send Newsletter Broadcast ────────────────────────────────────────────────

export async function sendNewsletter({
  subject,
  previewText,
  htmlContent,
}: {
  subject: string
  previewText: string
  htmlContent: string
}) {
  if (!process.env.RESEND_AUDIENCE_ID) {
    throw new Error('RESEND_AUDIENCE_ID not configured')
  }

  return resend.broadcasts.create({
    audienceId: process.env.RESEND_AUDIENCE_ID,
    from: `${process.env.NEXT_PUBLIC_SITE_NAME} <hello@yourdomain.com>`,
    subject,
    html: `<!-- ${previewText} -->${htmlContent}`,
  })
}

// ─── Email Templates ─────────────────────────────────────────────────────────

function welcomeEmailTemplate(name: string): string {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'My Blog'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '#'

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Welcome to ${siteName}</title>
      </head>
      <body style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #37332f; background: #fdf8ef;">
        <h1 style="font-size: 28px; color: #1e1c19; margin-bottom: 8px;">Welcome, ${name}!</h1>
        <p style="font-size: 16px; line-height: 1.7; color: #5e5850;">
          You're now subscribed to ${siteName}. I write about [your topics here] — 
          expect thoughtful essays, practical guides, and the occasional rabbit hole.
        </p>
        <p style="font-size: 16px; line-height: 1.7; color: #5e5850;">
          While you're waiting for the next issue, here are some of the most popular posts:
        </p>
        <div style="margin: 32px 0;">
          <a href="${siteUrl}/blog" style="display: inline-block; background: #de872c; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 15px;">
            Browse all posts →
          </a>
        </div>
        <p style="font-size: 13px; color: #948d7e; margin-top: 48px; border-top: 1px solid #d8d4ca; padding-top: 24px;">
          You're receiving this because you subscribed at ${siteUrl}. 
          <a href="${siteUrl}/unsubscribe?email={{email}}" style="color: #948d7e;">Unsubscribe</a>
        </p>
      </body>
    </html>
  `
}

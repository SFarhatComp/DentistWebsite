/**
 * Netlify Forms webhook receiver.
 *
 * Configured in Netlify Site → Forms → Form notifications → Outgoing webhook
 * pointing to: https://defactodentiste.netlify.app/api/form-notification
 *
 * For each submission, this route:
 * 1. Receives the JSON payload from Netlify
 * 2. Renders an HTML email with the appropriate template
 * 3. Sends it via Resend to the dentist's inbox
 *
 * Returns 200 OK quickly so Netlify doesn't retry.
 * Failures are logged but don't error out the response (we'll still see the
 * submission in Netlify dashboard as a backup).
 */

import { NextResponse } from "next/server"
import { Resend } from "resend"
import { renderTemplate, type NetlifyPayload } from "@/lib/email-templates"

// Force this route to be dynamic (no static optimization)
export const dynamic = "force-dynamic"

// Sender identity — using verified subdomain on Resend
const FROM_EMAIL = process.env.NOTIFICATION_FROM || "Studio De Facto <notifications@studiodefacto.ca>"

// Each template defines its own `to` address (e.g. contact@studiodefacto.ca,
// rendezvous@studiodefacto.ca, urgence@studiodefacto.ca, laboratoire@studiodefacto.ca).
// Cloudflare Email Routing then forwards these to the dentist's real Gmail.

export async function POST(request: Request) {
  // Quick sanity check on env
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("[form-notification] RESEND_API_KEY not set")
    return NextResponse.json({ error: "Email service not configured" }, { status: 200 })
  }

  let payload: NetlifyPayload
  try {
    payload = (await request.json()) as NetlifyPayload
  } catch (e) {
    console.error("[form-notification] Invalid JSON payload", e)
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  if (!payload.form_name || !payload.data) {
    console.warn("[form-notification] Missing form_name or data", payload)
    return NextResponse.json({ error: "Missing form_name or data" }, { status: 400 })
  }

  console.log(`[form-notification] Received submission for form: ${payload.form_name}`)

  // Render the appropriate template
  const template = renderTemplate(payload)
  if (!template) {
    console.warn(`[form-notification] No template for form: ${payload.form_name}`)
    // Still return 200 so Netlify doesn't retry
    return NextResponse.json({ ok: true, note: "no template" }, { status: 200 })
  }

  // Send via Resend
  try {
    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: template.to,
      subject: template.subject,
      html: template.html,
      replyTo: template.replyTo,
    })

    if (error) {
      console.error("[form-notification] Resend error", error)
      // Return 200 anyway — submission is captured in Netlify dashboard,
      // we just couldn't email it. Netlify retries would be useless.
      return NextResponse.json({ ok: false, error: error.message }, { status: 200 })
    }

    console.log(`[form-notification] Sent email id=${data?.id} for form=${payload.form_name}`)
    return NextResponse.json({ ok: true, emailId: data?.id }, { status: 200 })
  } catch (e) {
    console.error("[form-notification] Unexpected error", e)
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Unknown error" },
      { status: 200 },
    )
  }
}

// Allow GET for health checks (helpful for debugging webhook URL)
export async function GET() {
  return NextResponse.json(
    {
      service: "Studio De Facto — Form Notification Handler",
      status: "ready",
      env_configured: Boolean(process.env.RESEND_API_KEY),
    },
    { status: 200 },
  )
}

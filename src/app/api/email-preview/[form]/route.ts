/**
 * Email preview endpoint — renders any email template with sample data
 * directly in the browser. Useful for design iteration without sending.
 *
 * URLs:
 *   /api/email-preview/contact
 *   /api/email-preview/appointment
 *   /api/email-preview/emergency
 *   /api/email-preview/partner-onboarding
 *   /api/email-preview/lab-prescription
 *   /api/email-preview/referred-case
 *   /api/email-preview/lab-professional
 *
 * Add ?index=1 (or no param) for the index of all templates.
 */

import { NextResponse } from "next/server"
import { renderTemplate } from "@/lib/email-templates"
import { getSamplePayload, samplePayloads } from "@/lib/email-templates/sample-payloads"

export const dynamic = "force-dynamic"

const AVAILABLE_FORMS = Object.keys(samplePayloads)

function renderIndex(): string {
  const links = AVAILABLE_FORMS.map(
    (f) =>
      `<li style="margin-bottom:12px;"><a href="/api/email-preview/${f}" style="color:#3A2438; font-size:16px; text-decoration:none; border-bottom:1px solid #C56A2A;">${f}</a></li>`,
  ).join("")
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Email Preview — Studio De Facto</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 48px; max-width: 600px; margin: 0 auto; background: #FAF7F0; color: #1A1717; }
    h1 { font-family: "Cormorant Garamond", Georgia, serif; font-size: 32px; margin: 0 0 24px 0; color: #3A2438; }
    p { color: #6E6864; line-height: 1.6; }
    ul { list-style: none; padding: 0; margin: 32px 0; }
    a:hover { color: #C56A2A !important; }
    .badge { display: inline-block; background: #F5F0E6; color: #3A2438; padding: 4px 10px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; border: 1px solid #EEE7DC; margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="badge">Preview tool — dev only</div>
  <h1>Templates de courriels</h1>
  <p>Aperçus des courriels envoyés automatiquement aux dentistes lors d'une soumission. Données de test pré-remplies.</p>
  <ul>${links}</ul>
  <p style="font-size:13px; color:#8C837A; margin-top:48px;">Ces aperçus utilisent <code>sample-payloads.ts</code>. Pour modifier les données de test, éditez ce fichier.</p>
</body>
</html>`
}

export async function GET(_request: Request, { params }: { params: { form: string } }) {
  const formName = params.form

  // Special case: list page
  if (formName === "index" || formName === "list" || formName === "all") {
    return new NextResponse(renderIndex(), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    })
  }

  const payload = getSamplePayload(formName)
  if (!payload) {
    return new NextResponse(
      `<h1>Form not found: ${formName}</h1><p>Available forms:</p><ul>${AVAILABLE_FORMS.map((f) => `<li><a href="/api/email-preview/${f}">${f}</a></li>`).join("")}</ul>`,
      { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 404 },
    )
  }

  try {
    const rendered = await renderTemplate(payload)
    if (!rendered) {
      return new NextResponse(`<h1>Template not found for ${formName}</h1>`, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
        status: 404,
      })
    }

    // Wrap with a thin preview header so it's clear this is a preview
    const previewBanner = `<div style="position:sticky; top:0; background:#3A2438; color:#FFFFFF; padding:10px 24px; font-family:-apple-system, sans-serif; font-size:13px; display:flex; justify-content:space-between; align-items:center; z-index:1000;">
      <span><strong>${formName}</strong> · destinataire: ${rendered.to} · sujet: ${rendered.subject}</span>
      <span><a href="/api/email-preview/index" style="color:#C56A2A; text-decoration:none;">← Tous les templates</a></span>
    </div>`

    return new NextResponse(previewBanner + rendered.html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    })
  } catch (e) {
    return new NextResponse(
      `<h1>Render error</h1><pre>${e instanceof Error ? e.message : String(e)}</pre>`,
      { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 500 },
    )
  }
}

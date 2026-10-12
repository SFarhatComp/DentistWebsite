/**
 * Email template router.
 * Renders React Email components to HTML strings for sending via Resend.
 */

import { render } from "@react-email/render"
import { ContactEmail, contactMeta } from "./templates/contact"
import { RappelEmail, rappelMeta } from "./templates/rappel"
import { UrgenceEmail, urgenceMeta } from "./templates/urgence"
import type { NetlifyPayload, EmailMeta } from "./types"

export interface RenderedEmail {
  html: string
  to: string
  subject: string
  replyTo?: string
}

export async function renderTemplate(payload: NetlifyPayload): Promise<RenderedEmail | null> {
  let element: React.ReactElement
  let meta: EmailMeta

  switch (payload.form_name) {
    case "contact":
      element = ContactEmail({ payload })
      meta = contactMeta(payload)
      break
    // Formulaire d urgence de la v2 : nom de formulaire distinct de l ancien
    // « emergency », qui reste branche le temps que les caches des visiteurs
    // expirent.
    case "rappel":
      element = RappelEmail({ payload })
      meta = rappelMeta(payload)
      break
    case "urgence":
      element = UrgenceEmail({ payload })
      meta = urgenceMeta(payload)
      break
    default:
      return null
  }

  const html = await render(element)

  return {
    html,
    to: meta.to,
    subject: meta.subject,
    replyTo: meta.replyTo,
  }
}

export type { NetlifyPayload } from "./types"

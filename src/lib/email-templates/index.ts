/**
 * Email template router.
 * Renders React Email components to HTML strings for sending via Resend.
 */

import { render } from "@react-email/render"
import { ContactEmail, contactMeta } from "./templates/contact"
import { AppointmentEmail, appointmentMeta } from "./templates/appointment"
import { EmergencyEmail, emergencyMeta } from "./templates/emergency"
import { PartnerOnboardingEmail, partnerOnboardingMeta } from "./templates/partner-onboarding"
import { LabPrescriptionEmail, labPrescriptionMeta } from "./templates/lab-prescription"
import { ReferredCaseEmail, referredCaseMeta } from "./templates/referred-case"
import { LabProfessionalEmail, labProfessionalMeta } from "./templates/lab-professional"
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
    case "appointment":
      element = AppointmentEmail({ payload })
      meta = appointmentMeta(payload)
      break
    case "emergency":
      element = EmergencyEmail({ payload })
      meta = emergencyMeta(payload)
      break
    case "partner-onboarding":
      element = PartnerOnboardingEmail({ payload })
      meta = partnerOnboardingMeta(payload)
      break
    case "lab-prescription":
      element = LabPrescriptionEmail({ payload })
      meta = labPrescriptionMeta(payload)
      break
    case "referred-case":
      element = ReferredCaseEmail({ payload })
      meta = referredCaseMeta(payload)
      break
    case "lab-professional":
      element = LabProfessionalEmail({ payload })
      meta = labProfessionalMeta(payload)
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

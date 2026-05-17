import * as React from "react"
import {
  EmailLayout,
  EmailHeader,
  Hero,
  SectionTitle,
  DetailRow,
  LongTextBlock,
  PhoneCallCard,
  Section,
} from "../components"
import { formatDate, getString } from "../theme"
import type { NetlifyPayload } from "../types"

const SUBJECT_LABELS: Record<string, string> = {
  general: "Question générale",
  rdv: "Rendez-vous",
  assurance: "Assurance",
  urgence: "Urgence",
  professionnel: "Demande professionnelle",
  laboratoire: "Laboratoire",
  autre: "Autre",
}

export function ContactEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const name = getString(d, "name")
  const email = getString(d, "email")
  const phone = getString(d, "phone")
  const subject = getString(d, "subject")
  const message = getString(d, "message")
  const subjectLabel = SUBJECT_LABELS[subject] || subject || "Question générale"

  return (
    <EmailLayout preview={`Demande de contact — ${name || "sans nom"}`}>
      <EmailHeader kicker="Demande de contact" />

      <Hero
        eyebrow="Nouvelle demande"
        name={name || "Demande sans nom"}
        badge={{ label: subjectLabel, tone: subject === "urgence" ? "red" : "default" }}
        timestamp={formatDate(payload.created_at)}
      />

      {message && (
        <>
          <SectionTitle>Message</SectionTitle>
          <LongTextBlock value={message} />
        </>
      )}

      <SectionTitle>Coordonnées</SectionTitle>
      <Section>
        <DetailRow label="Courriel" value={email} />
        <DetailRow label="Téléphone" value={phone} />
      </Section>

      {phone && <PhoneCallCard phone={phone} />}
    </EmailLayout>
  )
}

export const contactMeta = (payload: NetlifyPayload) => {
  const name = getString(payload.data, "name")
  const subject = getString(payload.data, "subject")
  return {
    to: "contact@studiodefacto.ca",
    subject: `[Contact] ${name || "Nouvelle demande"}`,
    replyTo: getString(payload.data, "email") || undefined,
    isUrgent: subject === "urgence",
  }
}

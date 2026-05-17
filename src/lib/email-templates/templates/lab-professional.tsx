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

/** Legacy form kept for backwards compatibility. Will eventually be deprecated. */
export function LabProfessionalEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const name = getString(d, "dentistName")
  const clinic = getString(d, "clinic")
  const phone = getString(d, "phone")
  const email = getString(d, "email")
  const caseType = getString(d, "caseType")
  const material = getString(d, "material")
  const comments = getString(d, "comments")

  return (
    <EmailLayout preview={`Demande pro (legacy) — ${name}`}>
      <EmailHeader kicker="Demande professionnelle (legacy)" />

      <Hero
        eyebrow="Demande laboratoire"
        name={name || "Demande"}
        subtitle={clinic}
        timestamp={formatDate(payload.created_at)}
      />

      {comments && (
        <>
          <SectionTitle>Commentaires</SectionTitle>
          <LongTextBlock value={comments} />
        </>
      )}

      <SectionTitle>Cas</SectionTitle>
      <Section>
        <DetailRow label="Type" value={caseType} />
        <DetailRow label="Matériau" value={material} />
      </Section>

      <SectionTitle>Professionnel</SectionTitle>
      <Section>
        <DetailRow label="Courriel" value={email} />
        <DetailRow label="Clinique" value={clinic} />
      </Section>

      <PhoneCallCard phone={phone} />
    </EmailLayout>
  )
}

export const labProfessionalMeta = (payload: NetlifyPayload) => {
  const name = getString(payload.data, "dentistName")
  return {
    to: "laboratoire@studiodefacto.ca",
    subject: `[Labo legacy] ${name}`,
    replyTo: getString(payload.data, "email") || undefined,
  }
}

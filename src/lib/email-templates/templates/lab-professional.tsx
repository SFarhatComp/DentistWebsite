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
import { formatDate, getString, resolveLang } from "../theme"
import type { NetlifyPayload } from "../types"

const L = {
  fr: {
    previewPrefix: "Demande pro (legacy)",
    kicker: "Demande professionnelle (legacy)",
    eyebrow: "Demande laboratoire",
    defaultName: "Demande",
    sectionComments: "Commentaires",
    sectionCase: "Cas",
    labelType: "Type",
    labelMaterial: "Matériau",
    sectionProfessional: "Professionnel",
    labelEmail: "Courriel",
    labelClinic: "Clinique",
    subjectPrefix: "[Labo legacy]",
  },
  en: {
    previewPrefix: "Pro request (legacy)",
    kicker: "Professional request (legacy)",
    eyebrow: "Laboratory request",
    defaultName: "Request",
    sectionComments: "Comments",
    sectionCase: "Case",
    labelType: "Type",
    labelMaterial: "Material",
    sectionProfessional: "Professional",
    labelEmail: "Email",
    labelClinic: "Clinic",
    subjectPrefix: "[Lab legacy]",
  },
} as const

/** Legacy form kept for backwards compatibility. Will eventually be deprecated. */
export function LabProfessionalEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const lang = resolveLang(d)
  const t = L[lang]
  const name = getString(d, "dentistName")
  const clinic = getString(d, "clinic")
  const phone = getString(d, "phone")
  const email = getString(d, "email")
  const caseType = getString(d, "caseType")
  const material = getString(d, "material")
  const comments = getString(d, "comments")

  return (
    <EmailLayout preview={`${t.previewPrefix} — ${name}`} lang={lang}>
      <EmailHeader kicker={t.kicker} />

      <Hero
        eyebrow={t.eyebrow}
        name={name || t.defaultName}
        subtitle={clinic}
        timestamp={formatDate(payload.created_at, lang)}
        lang={lang}
      />

      {comments && (
        <>
          <SectionTitle>{t.sectionComments}</SectionTitle>
          <LongTextBlock value={comments} />
        </>
      )}

      <SectionTitle>{t.sectionCase}</SectionTitle>
      <Section>
        <DetailRow label={t.labelType} value={caseType} />
        <DetailRow label={t.labelMaterial} value={material} />
      </Section>

      <SectionTitle>{t.sectionProfessional}</SectionTitle>
      <Section>
        <DetailRow label={t.labelEmail} value={email} />
        <DetailRow label={t.labelClinic} value={clinic} />
      </Section>

      <PhoneCallCard phone={phone} lang={lang} />
    </EmailLayout>
  )
}

export const labProfessionalMeta = (payload: NetlifyPayload) => {
  const lang = resolveLang(payload.data)
  const t = L[lang]
  const name = getString(payload.data, "dentistName")
  return {
    to: "laboratoire@studiodefacto.ca",
    subject: `${t.subjectPrefix} ${name}`,
    replyTo: getString(payload.data, "email") || undefined,
  }
}

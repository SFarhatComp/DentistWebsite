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
    kicker: "Demande de contact",
    eyebrow: "Nouvelle demande",
    previewPrefix: "Demande de contact",
    unnamed: "sans nom",
    unnamedTitle: "Demande sans nom",
    sectionMessage: "Message",
    sectionContact: "Coordonnées",
    labelEmail: "Courriel",
    labelPhone: "Téléphone",
    subjects: {
      general: "Question générale",
      rdv: "Rendez-vous",
      assurance: "Assurance",
      urgence: "Urgence",
      professionnel: "Demande professionnelle",
      laboratoire: "Laboratoire",
      autre: "Autre",
    } as Record<string, string>,
    defaultSubject: "Question générale",
    subjectPrefix: "[Contact]",
    subjectNewRequest: "Nouvelle demande",
  },
  en: {
    kicker: "Contact request",
    eyebrow: "New request",
    previewPrefix: "Contact request",
    unnamed: "unnamed",
    unnamedTitle: "Unnamed request",
    sectionMessage: "Message",
    sectionContact: "Contact details",
    labelEmail: "Email",
    labelPhone: "Phone",
    subjects: {
      general: "General question",
      rdv: "Appointment",
      assurance: "Insurance",
      urgence: "Emergency",
      professionnel: "Professional request",
      laboratoire: "Laboratory",
      autre: "Other",
    } as Record<string, string>,
    defaultSubject: "General question",
    subjectPrefix: "[Contact]",
    subjectNewRequest: "New request",
  },
} as const

export function ContactEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const lang = resolveLang(d)
  const t = L[lang]
  const name = getString(d, "name")
  const email = getString(d, "email")
  const phone = getString(d, "phone")
  const subject = getString(d, "subject")
  const message = getString(d, "message")
  const subjectLabel = t.subjects[subject] || subject || t.defaultSubject

  return (
    <EmailLayout preview={`${t.previewPrefix} — ${name || t.unnamed}`} lang={lang}>
      <EmailHeader kicker={t.kicker} />

      <Hero
        eyebrow={t.eyebrow}
        name={name || t.unnamedTitle}
        badge={{ label: subjectLabel, tone: subject === "urgence" ? "red" : "default" }}
        timestamp={formatDate(payload.created_at, lang)}
        lang={lang}
      />

      {message && (
        <>
          <SectionTitle>{t.sectionMessage}</SectionTitle>
          <LongTextBlock value={message} />
        </>
      )}

      <SectionTitle>{t.sectionContact}</SectionTitle>
      <Section>
        <DetailRow label={t.labelEmail} value={email} />
        <DetailRow label={t.labelPhone} value={phone} />
      </Section>

      {phone && <PhoneCallCard phone={phone} lang={lang} />}
    </EmailLayout>
  )
}

export const contactMeta = (payload: NetlifyPayload) => {
  const lang = resolveLang(payload.data)
  const t = L[lang]
  const name = getString(payload.data, "name")
  const subject = getString(payload.data, "subject")
  return {
    to: "contact@studiodefacto.ca",
    subject: `${t.subjectPrefix} ${name || t.subjectNewRequest}`,
    replyTo: getString(payload.data, "email") || undefined,
    isUrgent: subject === "urgence",
  }
}

import * as React from "react"
import {
  EmailLayout,
  EmailHeader,
  Hero,
  SectionTitle,
  DetailRow,
  LongTextBlock,
  PhoneCallCard,
  TagList,
  Section,
} from "../components"
import { formatDate, getString, isChecked, resolveLang } from "../theme"
import type { NetlifyPayload } from "../types"

const TITLE_LABELS = {
  fr: {
    dentiste_generaliste: "Dentiste généraliste",
    prosthodontiste: "Prosthodontiste",
    orthodontiste: "Orthodontiste",
    parodontiste: "Parodontiste",
    endodontiste: "Endodontiste",
    chirurgien_maxillo_facial: "Chirurgien maxillo-facial",
    denturologiste: "Denturologiste",
    hygieniste_dentaire: "Hygiéniste dentaire",
    gestionnaire_clinique: "Gestionnaire de clinique",
    autre: "Autre",
  } as Record<string, string>,
  en: {
    dentiste_generaliste: "General dentist",
    prosthodontiste: "Prosthodontist",
    orthodontiste: "Orthodontist",
    parodontiste: "Periodontist",
    endodontiste: "Endodontist",
    chirurgien_maxillo_facial: "Maxillofacial surgeon",
    denturologiste: "Denturologist",
    hygieniste_dentaire: "Dental hygienist",
    gestionnaire_clinique: "Clinic manager",
    autre: "Other",
  } as Record<string, string>,
}

const COLLAB_LIST = {
  fr: [
    { key: "collaboration_lab_regulier", label: "Cas labo réguliers" },
    { key: "collaboration_lab_occasionnel", label: "Cas labo occasionnels" },
    { key: "collaboration_cas_esthetiques", label: "Cas esthétiques complexes" },
    { key: "collaboration_consultation", label: "Consultations cliniques" },
    { key: "collaboration_reference_clinique", label: "Références cliniques" },
    { key: "collaboration_autre", label: "Autre" },
  ],
  en: [
    { key: "collaboration_lab_regulier", label: "Regular lab cases" },
    { key: "collaboration_lab_occasionnel", label: "Occasional lab cases" },
    { key: "collaboration_cas_esthetiques", label: "Complex aesthetic cases" },
    { key: "collaboration_consultation", label: "Clinical consultations" },
    { key: "collaboration_reference_clinique", label: "Clinical referrals" },
    { key: "collaboration_autre", label: "Other" },
  ],
}

const SERVICES_LIST = {
  fr: [
    { key: "service_orthodontie", label: "Orthodontie" },
    { key: "service_prostho_amovible", label: "Prosthodontie amovible" },
    { key: "service_prostho_fixe", label: "Prosthodontie fixe" },
    { key: "service_plaques_occlusales", label: "Plaques occlusales" },
    { key: "service_gouttieres", label: "Gouttières" },
    { key: "service_wax_up", label: "Wax-up" },
    { key: "service_prise_teinte", label: "Prise de teinte" },
    { key: "service_esthetique", label: "Cas esthétiques" },
    { key: "service_reparations", label: "Réparations" },
    { key: "service_emax", label: "E.max" },
    { key: "service_zircone", label: "Zircone" },
    { key: "service_impression_3d", label: "Impression 3D" },
    { key: "service_autre", label: "Autre" },
  ],
  en: [
    { key: "service_orthodontie", label: "Orthodontics" },
    { key: "service_prostho_amovible", label: "Removable prosthodontics" },
    { key: "service_prostho_fixe", label: "Fixed prosthodontics" },
    { key: "service_plaques_occlusales", label: "Occlusal splints" },
    { key: "service_gouttieres", label: "Trays" },
    { key: "service_wax_up", label: "Wax-up" },
    { key: "service_prise_teinte", label: "Shade matching" },
    { key: "service_esthetique", label: "Aesthetic cases" },
    { key: "service_reparations", label: "Repairs" },
    { key: "service_emax", label: "E.max" },
    { key: "service_zircone", label: "Zirconia" },
    { key: "service_impression_3d", label: "3D printing" },
    { key: "service_autre", label: "Other" },
  ],
}

const CONTACT_PREFS = {
  fr: [
    { key: "contact_telephone", label: "Téléphone" },
    { key: "contact_courriel", label: "Courriel" },
    { key: "contact_sms", label: "SMS" },
    { key: "contact_en_personne", label: "En personne" },
  ],
  en: [
    { key: "contact_telephone", label: "Phone" },
    { key: "contact_courriel", label: "Email" },
    { key: "contact_sms", label: "SMS" },
    { key: "contact_en_personne", label: "In person" },
  ],
}

const L = {
  fr: {
    previewPrefix: "Partenariat",
    kicker: "Demande de partenariat professionnel",
    eyebrow: "Nouveau professionnel",
    defaultName: "Demande",
    sectionMessage: "Message",
    sectionCoordonnees: "Coordonnées",
    labelEmail: "Courriel",
    labelPhone: "Téléphone",
    labelClinic: "Clinique",
    labelAddress: "Adresse",
    sectionCollaboration: "Collaboration recherchée",
    sectionServices: "Services d'intérêt",
    sectionContactPref: "Préférence de contact",
    subjectPrefix: "[Partenariat]",
  },
  en: {
    previewPrefix: "Partnership",
    kicker: "Professional partnership request",
    eyebrow: "New professional",
    defaultName: "Request",
    sectionMessage: "Message",
    sectionCoordonnees: "Contact details",
    labelEmail: "Email",
    labelPhone: "Phone",
    labelClinic: "Clinic",
    labelAddress: "Address",
    sectionCollaboration: "Collaboration sought",
    sectionServices: "Services of interest",
    sectionContactPref: "Contact preference",
    subjectPrefix: "[Partnership]",
  },
} as const

export function PartnerOnboardingEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const lang = resolveLang(d)
  const t = L[lang]
  const titleMap = TITLE_LABELS[lang]

  const name = getString(d, "dentistName")
  const title = getString(d, "professionalTitle")
  const titleOther = getString(d, "professionalTitleOther")
  const clinic = getString(d, "clinicName")
  const address = getString(d, "clinicAddress")
  const phone = getString(d, "phone")
  const email = getString(d, "email")
  const message = getString(d, "message")

  const titleLabel = title === "autre" && titleOther ? titleOther : (titleMap[title] || title)

  return (
    <EmailLayout preview={`${t.previewPrefix} — ${name} (${clinic})`} lang={lang}>
      <EmailHeader kicker={t.kicker} />

      <Hero
        eyebrow={t.eyebrow}
        name={name || t.defaultName}
        badge={titleLabel ? { label: titleLabel, tone: "info" } : undefined}
        subtitle={clinic}
        timestamp={formatDate(payload.created_at, lang)}
        lang={lang}
      />

      {message && (
        <>
          <SectionTitle>{t.sectionMessage}</SectionTitle>
          <LongTextBlock value={message} />
        </>
      )}

      <SectionTitle>{t.sectionCoordonnees}</SectionTitle>
      <Section>
        <DetailRow label={t.labelEmail} value={email} />
        <DetailRow label={t.labelPhone} value={phone} />
        <DetailRow label={t.labelClinic} value={clinic} />
        <DetailRow label={t.labelAddress} value={address} />
      </Section>

      <SectionTitle>{t.sectionCollaboration}</SectionTitle>
      <TagList items={COLLAB_LIST[lang].map((c) => ({ ...c, selected: isChecked(d, c.key) }))} />

      <SectionTitle>{t.sectionServices}</SectionTitle>
      <TagList items={SERVICES_LIST[lang].map((s) => ({ ...s, selected: isChecked(d, s.key) }))} />

      <SectionTitle>{t.sectionContactPref}</SectionTitle>
      <TagList items={CONTACT_PREFS[lang].map((c) => ({ ...c, selected: isChecked(d, c.key) }))} />

      <PhoneCallCard phone={phone} lang={lang} />
    </EmailLayout>
  )
}

export const partnerOnboardingMeta = (payload: NetlifyPayload) => {
  const lang = resolveLang(payload.data)
  const t = L[lang]
  const name = getString(payload.data, "dentistName")
  const clinic = getString(payload.data, "clinicName")
  return {
    to: "laboratoire@studiodefacto.ca",
    subject: `${t.subjectPrefix} ${name} — ${clinic}`,
    replyTo: getString(payload.data, "email") || undefined,
  }
}

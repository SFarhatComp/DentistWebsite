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
import { formatDate, getString, isChecked } from "../theme"
import type { NetlifyPayload } from "../types"

const TITLE_LABELS: Record<string, string> = {
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
}

const COLLAB_LIST = [
  { key: "collaboration_lab_regulier", label: "Cas labo réguliers" },
  { key: "collaboration_lab_occasionnel", label: "Cas labo occasionnels" },
  { key: "collaboration_cas_esthetiques", label: "Cas esthétiques complexes" },
  { key: "collaboration_consultation", label: "Consultations cliniques" },
  { key: "collaboration_reference_clinique", label: "Références cliniques" },
  { key: "collaboration_autre", label: "Autre" },
]

const SERVICES_LIST = [
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
]

const CONTACT_PREFS = [
  { key: "contact_telephone", label: "Téléphone" },
  { key: "contact_courriel", label: "Courriel" },
  { key: "contact_sms", label: "SMS" },
  { key: "contact_en_personne", label: "En personne" },
]

export function PartnerOnboardingEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const name = getString(d, "dentistName")
  const title = getString(d, "professionalTitle")
  const titleOther = getString(d, "professionalTitleOther")
  const clinic = getString(d, "clinicName")
  const address = getString(d, "clinicAddress")
  const phone = getString(d, "phone")
  const email = getString(d, "email")
  const message = getString(d, "message")

  const titleLabel = title === "autre" && titleOther ? titleOther : (TITLE_LABELS[title] || title)

  return (
    <EmailLayout preview={`Partenariat — ${name} (${clinic})`}>
      <EmailHeader kicker="Demande de partenariat professionnel" />

      <Hero
        eyebrow="Nouveau professionnel"
        name={name || "Demande"}
        badge={titleLabel ? { label: titleLabel, tone: "info" } : undefined}
        subtitle={clinic}
        timestamp={formatDate(payload.created_at)}
      />

      <PhoneCallCard phone={phone} />

      <SectionTitle>Coordonnées</SectionTitle>
      <Section>
        <DetailRow label="Courriel" value={email} />
        <DetailRow label="Téléphone" value={phone} />
        <DetailRow label="Clinique" value={clinic} />
        <DetailRow label="Adresse" value={address} />
      </Section>

      <SectionTitle>Collaboration recherchée</SectionTitle>
      <TagList items={COLLAB_LIST.map((c) => ({ ...c, selected: isChecked(d, c.key) }))} />

      <SectionTitle>Services d&apos;intérêt</SectionTitle>
      <TagList items={SERVICES_LIST.map((s) => ({ ...s, selected: isChecked(d, s.key) }))} />

      <SectionTitle>Préférence de contact</SectionTitle>
      <TagList items={CONTACT_PREFS.map((c) => ({ ...c, selected: isChecked(d, c.key) }))} />

      {message && (
        <>
          <SectionTitle>Message</SectionTitle>
          <LongTextBlock value={message} />
        </>
      )}
    </EmailLayout>
  )
}

export const partnerOnboardingMeta = (payload: NetlifyPayload) => {
  const name = getString(payload.data, "dentistName")
  const clinic = getString(payload.data, "clinicName")
  return {
    to: "laboratoire@studiodefacto.ca",
    subject: `[Partenariat] ${name} — ${clinic}`,
    replyTo: getString(payload.data, "email") || undefined,
  }
}

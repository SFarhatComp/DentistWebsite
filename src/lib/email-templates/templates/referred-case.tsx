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
  AlertBanner,
  Section,
} from "../components"
import { formatDate, getString, isChecked } from "../theme"
import type { NetlifyPayload } from "../types"

const REASON_LABELS: Record<string, string> = {
  evaluation_complete: "Évaluation complète",
  douleur: "Douleur",
  esthetique: "Préoccupation esthétique",
  endodontie: "Endodontie",
  parodontie: "Parodontie / greffe",
  implantologie: "Implantologie",
  prosthodontie: "Prosthodontie / restauration complexe",
  deuxieme_avis: "Deuxième avis",
  laboratoire: "Service de laboratoire",
  autre: "Autre",
}

const LANG_LABELS: Record<string, string> = {
  francais: "Français",
  anglais: "Anglais",
  francais_anglais: "Français ou anglais",
  autre: "Autre",
}

const MOTIFS_LIST = [
  { key: "motif_secondaire_douleur", label: "Douleur" },
  { key: "motif_secondaire_sensibilite", label: "Sensibilité" },
  { key: "motif_secondaire_saignement_gencives", label: "Saignement des gencives" },
  { key: "motif_secondaire_dent_mobile", label: "Dent mobile" },
  { key: "motif_secondaire_fracture", label: "Fracture" },
  { key: "motif_secondaire_usure", label: "Usure dentaire" },
  { key: "motif_secondaire_esthetique", label: "Esthétique" },
  { key: "motif_secondaire_infection", label: "Infection suspectée" },
  { key: "motif_secondaire_autre", label: "Autre" },
]

const DOCS_LIST = [
  { key: "doc_photos", label: "Photos" },
  { key: "doc_radiographies", label: "Radiographies" },
  { key: "doc_stl_scan", label: "STL / scan" },
  { key: "doc_plan_traitement", label: "Plan de traitement existant" },
  { key: "doc_notes_cliniques", label: "Notes cliniques" },
  { key: "doc_autre", label: "Autre" },
]

export function ReferredCaseEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const refProf = getString(d, "referringProfessionalName")
  const clinic = getString(d, "clinicName")
  const clinicPhone = getString(d, "clinicPhone")
  const refEmail = getString(d, "email")
  const patientName = getString(d, "patientName")
  const patientDob = getString(d, "patientDob")
  const patientPhone = getString(d, "patientPhone")
  const patientEmail = getString(d, "patientEmail")
  const patientLang = getString(d, "patientLanguage")
  const patientLangOther = getString(d, "patientLanguageOther")
  const mainReason = getString(d, "referralMainReason")
  const mainReasonOther = getString(d, "referralMainReasonOther")
  const urgency = getString(d, "urgency")
  const summary = getString(d, "clinicalSummary")
  const previous = getString(d, "previousTreatments")

  const reasonLabel = mainReason === "autre" && mainReasonOther ? mainReasonOther : (REASON_LABELS[mainReason] || mainReason)
  const langLabel = patientLang === "autre" && patientLangOther ? patientLangOther : (LANG_LABELS[patientLang] || patientLang)
  const isUrgent = urgency === "oui"

  return (
    <EmailLayout preview={`Référence — ${patientName} (${reasonLabel})`} tone={isUrgent ? "red" : "default"}>
      <EmailHeader kicker={isUrgent ? "Référence URGENTE" : "Nouvelle référence patient"} />

      <Hero
        eyebrow="Patient référé"
        name={patientName || "Patient"}
        badge={{ label: reasonLabel, tone: isUrgent ? "red" : "default" }}
        subtitle={`Référé par ${refProf} — ${clinic}`}
        timestamp={formatDate(payload.created_at)}
      />

      <PhoneCallCard phone={patientPhone} urgent={isUrgent} />

      {isUrgent && <AlertBanner title="Référence marquée URGENTE par le professionnel référent" />}

      <SectionTitle>Patient</SectionTitle>
      <Section>
        <DetailRow label="Date naissance" value={patientDob} />
        <DetailRow label="Courriel" value={patientEmail} />
        <DetailRow label="Langue" value={langLabel} />
      </Section>

      <SectionTitle>Professionnel référent</SectionTitle>
      <Section>
        <DetailRow label="Nom" value={refProf} />
        <DetailRow label="Clinique" value={clinic} />
        <DetailRow label="Tél. clinique" value={clinicPhone} />
        <DetailRow label="Courriel" value={refEmail} />
      </Section>

      {MOTIFS_LIST.some((m) => isChecked(d, m.key)) && (
        <>
          <SectionTitle>Motifs secondaires</SectionTitle>
          <TagList items={MOTIFS_LIST.map((m) => ({ ...m, selected: isChecked(d, m.key) }))} />
        </>
      )}

      {summary && (
        <>
          <SectionTitle>Résumé clinique</SectionTitle>
          <LongTextBlock value={summary} />
        </>
      )}

      {previous && (
        <>
          <SectionTitle>Traitements déjà réalisés</SectionTitle>
          <LongTextBlock value={previous} />
        </>
      )}

      {DOCS_LIST.some((d2) => isChecked(d, d2.key)) && (
        <>
          <SectionTitle>Documents transmis</SectionTitle>
          <TagList items={DOCS_LIST.map((doc) => ({ ...doc, selected: isChecked(d, doc.key) }))} />
        </>
      )}
    </EmailLayout>
  )
}

export const referredCaseMeta = (payload: NetlifyPayload) => {
  const patient = getString(payload.data, "patientName")
  const isUrgent = getString(payload.data, "urgency") === "oui"
  return {
    to: "laboratoire@studiodefacto.ca",
    subject: `${isUrgent ? "⚠ " : ""}[Référence] ${patient}`,
    replyTo: getString(payload.data, "email") || undefined,
    isUrgent,
  }
}

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
import { formatDate, getString, isChecked, resolveLang } from "../theme"
import type { NetlifyPayload } from "../types"

const REASON_LABELS = {
  fr: {
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
  } as Record<string, string>,
  en: {
    evaluation_complete: "Complete evaluation",
    douleur: "Pain",
    esthetique: "Aesthetic concern",
    endodontie: "Endodontics",
    parodontie: "Periodontics / graft",
    implantologie: "Implantology",
    prosthodontie: "Prosthodontics / complex restoration",
    deuxieme_avis: "Second opinion",
    laboratoire: "Laboratory service",
    autre: "Other",
  } as Record<string, string>,
}

const LANG_LABELS = {
  fr: {
    francais: "Français",
    anglais: "Anglais",
    francais_anglais: "Français ou anglais",
    autre: "Autre",
  } as Record<string, string>,
  en: {
    francais: "French",
    anglais: "English",
    francais_anglais: "French or English",
    autre: "Other",
  } as Record<string, string>,
}

const MOTIFS_LIST = {
  fr: [
    { key: "motif_secondaire_douleur", label: "Douleur" },
    { key: "motif_secondaire_sensibilite", label: "Sensibilité" },
    { key: "motif_secondaire_saignement_gencives", label: "Saignement des gencives" },
    { key: "motif_secondaire_dent_mobile", label: "Dent mobile" },
    { key: "motif_secondaire_fracture", label: "Fracture" },
    { key: "motif_secondaire_usure", label: "Usure dentaire" },
    { key: "motif_secondaire_esthetique", label: "Esthétique" },
    { key: "motif_secondaire_infection", label: "Infection suspectée" },
    { key: "motif_secondaire_autre", label: "Autre" },
  ],
  en: [
    { key: "motif_secondaire_douleur", label: "Pain" },
    { key: "motif_secondaire_sensibilite", label: "Sensitivity" },
    { key: "motif_secondaire_saignement_gencives", label: "Bleeding gums" },
    { key: "motif_secondaire_dent_mobile", label: "Loose tooth" },
    { key: "motif_secondaire_fracture", label: "Fracture" },
    { key: "motif_secondaire_usure", label: "Tooth wear" },
    { key: "motif_secondaire_esthetique", label: "Aesthetics" },
    { key: "motif_secondaire_infection", label: "Suspected infection" },
    { key: "motif_secondaire_autre", label: "Other" },
  ],
}

const DOCS_LIST = {
  fr: [
    { key: "doc_photos", label: "Photos" },
    { key: "doc_radiographies", label: "Radiographies" },
    { key: "doc_stl_scan", label: "STL / scan" },
    { key: "doc_plan_traitement", label: "Plan de traitement existant" },
    { key: "doc_notes_cliniques", label: "Notes cliniques" },
    { key: "doc_autre", label: "Autre" },
  ],
  en: [
    { key: "doc_photos", label: "Photos" },
    { key: "doc_radiographies", label: "Radiographs" },
    { key: "doc_stl_scan", label: "STL / scan" },
    { key: "doc_plan_traitement", label: "Existing treatment plan" },
    { key: "doc_notes_cliniques", label: "Clinical notes" },
    { key: "doc_autre", label: "Other" },
  ],
}

const L = {
  fr: {
    previewPrefix: "Référence",
    kickerUrgent: "Référence URGENTE",
    kickerNormal: "Nouvelle référence patient",
    eyebrow: "Patient référé",
    defaultPatient: "Patient",
    referredByPrefix: "Référé par",
    alertUrgent: "Référence marquée URGENTE par le professionnel référent",
    sectionSummary: "Résumé clinique",
    sectionPatient: "Patient",
    labelDob: "Date naissance",
    labelEmail: "Courriel",
    labelLanguage: "Langue",
    sectionReferring: "Professionnel référent",
    labelName: "Nom",
    labelClinic: "Clinique",
    labelClinicPhone: "Tél. clinique",
    sectionMotifs: "Motifs secondaires",
    sectionPrevious: "Traitements déjà réalisés",
    sectionDocs: "Documents transmis",
    subjectPrefix: "[Référence]",
  },
  en: {
    previewPrefix: "Referral",
    kickerUrgent: "URGENT referral",
    kickerNormal: "New patient referral",
    eyebrow: "Referred patient",
    defaultPatient: "Patient",
    referredByPrefix: "Referred by",
    alertUrgent: "Referral marked URGENT by the referring professional",
    sectionSummary: "Clinical summary",
    sectionPatient: "Patient",
    labelDob: "Date of birth",
    labelEmail: "Email",
    labelLanguage: "Language",
    sectionReferring: "Referring professional",
    labelName: "Name",
    labelClinic: "Clinic",
    labelClinicPhone: "Clinic phone",
    sectionMotifs: "Secondary reasons",
    sectionPrevious: "Previous treatments",
    sectionDocs: "Documents shared",
    subjectPrefix: "[Referral]",
  },
} as const

export function ReferredCaseEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const lang = resolveLang(d)
  const t = L[lang]
  const reasonMap = REASON_LABELS[lang]
  const langMap = LANG_LABELS[lang]

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

  const reasonLabel = mainReason === "autre" && mainReasonOther ? mainReasonOther : (reasonMap[mainReason] || mainReason)
  const langLabel = patientLang === "autre" && patientLangOther ? patientLangOther : (langMap[patientLang] || patientLang)
  const isUrgent = urgency === "oui"

  return (
    <EmailLayout preview={`${t.previewPrefix} — ${patientName} (${reasonLabel})`} tone={isUrgent ? "red" : "default"} lang={lang}>
      <EmailHeader kicker={isUrgent ? t.kickerUrgent : t.kickerNormal} />

      <Hero
        eyebrow={t.eyebrow}
        name={patientName || t.defaultPatient}
        badge={{ label: reasonLabel, tone: isUrgent ? "red" : "default" }}
        subtitle={`${t.referredByPrefix} ${refProf} — ${clinic}`}
        timestamp={formatDate(payload.created_at, lang)}
        lang={lang}
      />

      {isUrgent && <AlertBanner title={t.alertUrgent} />}

      {summary && (
        <>
          <SectionTitle>{t.sectionSummary}</SectionTitle>
          <LongTextBlock value={summary} />
        </>
      )}

      <SectionTitle>{t.sectionPatient}</SectionTitle>
      <Section>
        <DetailRow label={t.labelDob} value={patientDob} />
        <DetailRow label={t.labelEmail} value={patientEmail} />
        <DetailRow label={t.labelLanguage} value={langLabel} />
      </Section>

      <SectionTitle>{t.sectionReferring}</SectionTitle>
      <Section>
        <DetailRow label={t.labelName} value={refProf} />
        <DetailRow label={t.labelClinic} value={clinic} />
        <DetailRow label={t.labelClinicPhone} value={clinicPhone} />
        <DetailRow label={t.labelEmail} value={refEmail} />
      </Section>

      {MOTIFS_LIST[lang].some((m) => isChecked(d, m.key)) && (
        <>
          <SectionTitle>{t.sectionMotifs}</SectionTitle>
          <TagList items={MOTIFS_LIST[lang].map((m) => ({ ...m, selected: isChecked(d, m.key) }))} />
        </>
      )}

      {previous && (
        <>
          <SectionTitle>{t.sectionPrevious}</SectionTitle>
          <LongTextBlock value={previous} />
        </>
      )}

      {DOCS_LIST[lang].some((d2) => isChecked(d, d2.key)) && (
        <>
          <SectionTitle>{t.sectionDocs}</SectionTitle>
          <TagList items={DOCS_LIST[lang].map((doc) => ({ ...doc, selected: isChecked(d, doc.key) }))} />
        </>
      )}

      <PhoneCallCard phone={patientPhone} urgent={isUrgent} lang={lang} />
    </EmailLayout>
  )
}

export const referredCaseMeta = (payload: NetlifyPayload) => {
  const lang = resolveLang(payload.data)
  const t = L[lang]
  const patient = getString(payload.data, "patientName")
  const isUrgent = getString(payload.data, "urgency") === "oui"
  return {
    to: "laboratoire@studiodefacto.ca",
    subject: `${isUrgent ? "⚠ " : ""}${t.subjectPrefix} ${patient}`,
    replyTo: getString(payload.data, "email") || undefined,
    isUrgent,
  }
}

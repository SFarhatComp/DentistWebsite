import * as React from "react"
import {
  EmailLayout,
  EmailHeader,
  Hero,
  SectionTitle,
  DetailRow,
  PhoneCallCard,
  TagList,
  YnIndicatorList,
  AlertBanner,
  Section,
} from "../components"
import { formatDate, getString, isChecked, getYn, resolveLang } from "../theme"
import type { NetlifyPayload } from "../types"

const TYPES_LIST = {
  fr: [
    { key: "type_douleur", label: "Douleur intense", alert: true },
    { key: "type_enflure", label: "Enflure", alert: true },
    { key: "type_abces", label: "Abcès", alert: true },
    { key: "type_fracture", label: "Dent cassée", alert: false },
    { key: "type_trauma", label: "Traumatisme", alert: true },
    { key: "type_saignement", label: "Saignement", alert: true },
    { key: "type_couronne", label: "Perte d'une couronne", alert: false },
    { key: "type_restauration", label: "Perte d'une restauration", alert: false },
    { key: "type_infection", label: "Infection suspectée", alert: true },
    { key: "type_autre", label: "Autre", alert: false },
  ],
  en: [
    { key: "type_douleur", label: "Severe pain", alert: true },
    { key: "type_enflure", label: "Swelling", alert: true },
    { key: "type_abces", label: "Abscess", alert: true },
    { key: "type_fracture", label: "Broken tooth", alert: false },
    { key: "type_trauma", label: "Trauma", alert: true },
    { key: "type_saignement", label: "Bleeding", alert: true },
    { key: "type_couronne", label: "Lost crown", alert: false },
    { key: "type_restauration", label: "Lost restoration", alert: false },
    { key: "type_infection", label: "Suspected infection", alert: true },
    { key: "type_autre", label: "Other", alert: false },
  ],
}

const SYMPTOMS = {
  fr: [
    { key: "sym_breathe", label: "Difficulté à respirer", alertOnYes: true as const },
    { key: "sym_swallow", label: "Difficulté à avaler", alertOnYes: true as const },
    { key: "sym_swelling", label: "Enflure importante", alertOnYes: true as const },
    { key: "sym_fever", label: "Fièvre", alertOnYes: true as const },
    { key: "sym_night", label: "Douleur qui réveille la nuit", alertOnYes: false as const },
  ],
  en: [
    { key: "sym_breathe", label: "Difficulty breathing", alertOnYes: true as const },
    { key: "sym_swallow", label: "Difficulty swallowing", alertOnYes: true as const },
    { key: "sym_swelling", label: "Significant swelling", alertOnYes: true as const },
    { key: "sym_fever", label: "Fever", alertOnYes: true as const },
    { key: "sym_night", label: "Pain that wakes you at night", alertOnYes: false as const },
  ],
}

const L = {
  fr: {
    previewPrefix: "⚠ URGENCE",
    kicker: "⚠ Urgence dentaire",
    eyebrow: "Demande d'urgence",
    badge: "URGENT",
    defaultPatient: "Patient",
    alertTitle: "⚠ Signaux d'alerte",
    sectionType: "Type d'urgence",
    emptyTypes: "Aucun type sélectionné par le patient",
    sectionSymptoms: "Symptômes",
    labelDuration: "Durée",
    sectionPatient: "Patient",
    labelEmail: "Courriel",
    labelDob: "Date naissance",
    subjectPrefix: "⚠ URGENCE —",
  },
  en: {
    previewPrefix: "⚠ EMERGENCY",
    kicker: "⚠ Dental emergency",
    eyebrow: "Emergency request",
    badge: "URGENT",
    defaultPatient: "Patient",
    alertTitle: "⚠ Warning signs",
    sectionType: "Type of emergency",
    emptyTypes: "No type selected by the patient",
    sectionSymptoms: "Symptoms",
    labelDuration: "Duration",
    sectionPatient: "Patient",
    labelEmail: "Email",
    labelDob: "Date of birth",
    subjectPrefix: "⚠ EMERGENCY —",
  },
} as const

export function EmergencyEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const lang = resolveLang(d)
  const t = L[lang]
  const typesList = TYPES_LIST[lang]
  const symptoms = SYMPTOMS[lang]
  const alertingTypes = typesList.filter((x) => x.alert).map((x) => x.key)

  const firstName = getString(d, "firstName")
  const lastName = getString(d, "lastName")
  const phone = getString(d, "phone")
  const email = getString(d, "email")
  const dob = getString(d, "dob")
  const symptomDuration = getString(d, "symptomDuration")

  const typesItems = typesList.map((x) => ({ ...x, selected: isChecked(d, x.key) }))
  const symptomsItems = symptoms.map((s) => ({
    label: s.label,
    value: getYn(d, s.key),
    alertOnYes: s.alertOnYes,
  }))

  const criticalSymptoms = symptomsItems.filter((s) => s.value === "yes" && s.alertOnYes)
  const alertingTypesSelected = typesItems.filter((x) => x.selected && x.alert)
  const showCriticalBanner = criticalSymptoms.length > 0 || alertingTypesSelected.length > 0

  const fullName = `${firstName} ${lastName}`.trim() || t.defaultPatient

  return (
    <EmailLayout preview={`${t.previewPrefix} — ${fullName}`} tone="red" lang={lang}>
      <EmailHeader kicker={t.kicker} />

      <Hero
        eyebrow={t.eyebrow}
        name={fullName}
        badge={{ label: t.badge, tone: "red" }}
        timestamp={formatDate(payload.created_at, lang)}
        lang={lang}
      />

      {showCriticalBanner && (
        <AlertBanner
          title={t.alertTitle}
          items={[...alertingTypesSelected.map((x) => x.label), ...criticalSymptoms.map((s) => s.label)]}
        />
      )}

      <SectionTitle accent={alertingTypesSelected.length > 0 ? "red" : "default"}>{t.sectionType}</SectionTitle>
      <TagList
        items={typesItems}
        alertItems={alertingTypes}
        emptyText={t.emptyTypes}
      />

      <SectionTitle accent={criticalSymptoms.length > 0 ? "red" : "default"}>{t.sectionSymptoms}</SectionTitle>
      <YnIndicatorList items={symptomsItems} lang={lang} />
      {symptomDuration && <DetailRow label={t.labelDuration} value={symptomDuration} />}

      <SectionTitle>{t.sectionPatient}</SectionTitle>
      <Section>
        <DetailRow label={t.labelEmail} value={email} />
        <DetailRow label={t.labelDob} value={dob} />
      </Section>

      <PhoneCallCard phone={phone} urgent lang={lang} />
    </EmailLayout>
  )
}

export const emergencyMeta = (payload: NetlifyPayload) => {
  const lang = resolveLang(payload.data)
  const t = L[lang]
  const firstName = getString(payload.data, "firstName")
  const lastName = getString(payload.data, "lastName")
  return {
    to: "urgence@studiodefacto.ca",
    subject: `${t.subjectPrefix} ${firstName} ${lastName}`.trim(),
    replyTo: getString(payload.data, "email") || undefined,
    isUrgent: true,
  }
}

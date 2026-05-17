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
import { formatDate, getString, isChecked, getYn } from "../theme"
import type { NetlifyPayload } from "../types"

const TYPES_LIST = [
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
]

const ALERTING_TYPES = TYPES_LIST.filter((t) => t.alert).map((t) => t.key)

const SYMPTOMS = [
  { key: "sym_breathe", label: "Difficulté à respirer", alertOnYes: true as const },
  { key: "sym_swallow", label: "Difficulté à avaler", alertOnYes: true as const },
  { key: "sym_swelling", label: "Enflure importante", alertOnYes: true as const },
  { key: "sym_fever", label: "Fièvre", alertOnYes: true as const },
  { key: "sym_night", label: "Douleur qui réveille la nuit", alertOnYes: false as const },
]

export function EmergencyEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const firstName = getString(d, "firstName")
  const lastName = getString(d, "lastName")
  const phone = getString(d, "phone")
  const email = getString(d, "email")
  const dob = getString(d, "dob")
  const symptomDuration = getString(d, "symptomDuration")

  const typesItems = TYPES_LIST.map((t) => ({ ...t, selected: isChecked(d, t.key) }))
  const symptomsItems = SYMPTOMS.map((s) => ({
    label: s.label,
    value: getYn(d, s.key),
    alertOnYes: s.alertOnYes,
  }))

  const criticalSymptoms = symptomsItems.filter((s) => s.value === "yes" && s.alertOnYes)
  const alertingTypesSelected = typesItems.filter((t) => t.selected && t.alert)
  const showCriticalBanner = criticalSymptoms.length > 0 || alertingTypesSelected.length > 0

  const fullName = `${firstName} ${lastName}`.trim() || "Patient"

  return (
    <EmailLayout preview={`⚠ URGENCE — ${fullName}`} tone="red">
      <EmailHeader kicker="⚠ Urgence dentaire" />

      <Hero
        eyebrow="Demande d'urgence"
        name={fullName}
        badge={{ label: "URGENT", tone: "red" }}
        timestamp={formatDate(payload.created_at)}
      />

      {showCriticalBanner && (
        <AlertBanner
          title="⚠ Signaux d'alerte"
          items={[...alertingTypesSelected.map((t) => t.label), ...criticalSymptoms.map((s) => s.label)]}
        />
      )}

      <SectionTitle accent={alertingTypesSelected.length > 0 ? "red" : "default"}>Type d&apos;urgence</SectionTitle>
      <TagList
        items={typesItems}
        alertItems={ALERTING_TYPES}
        emptyText="Aucun type sélectionné par le patient"
      />

      <SectionTitle accent={criticalSymptoms.length > 0 ? "red" : "default"}>Symptômes</SectionTitle>
      <YnIndicatorList items={symptomsItems} />
      {symptomDuration && <DetailRow label="Durée" value={symptomDuration} />}

      <SectionTitle>Patient</SectionTitle>
      <Section>
        <DetailRow label="Courriel" value={email} />
        <DetailRow label="Date naissance" value={dob} />
      </Section>

      <PhoneCallCard phone={phone} urgent />
    </EmailLayout>
  )
}

export const emergencyMeta = (payload: NetlifyPayload) => {
  const firstName = getString(payload.data, "firstName")
  const lastName = getString(payload.data, "lastName")
  return {
    to: "urgence@studiodefacto.ca",
    subject: `⚠ URGENCE — ${firstName} ${lastName}`.trim(),
    replyTo: getString(payload.data, "email") || undefined,
    isUrgent: true,
  }
}

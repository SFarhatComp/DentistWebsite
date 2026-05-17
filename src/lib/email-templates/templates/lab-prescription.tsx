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

const MATERIAL_LABELS: Record<string, string> = {
  zircone: "Zircone",
  emax_presse: "E.max pressé",
  emax_usine: "E.max usiné",
  resine_imprimee: "Résine imprimée",
  resine_usinee: "Résine usinée",
  pmma: "PMMA",
  composite_lab: "Composite de laboratoire",
  a_determiner: "À déterminer par le laboratoire",
  autre: "Autre",
}

const TYPES_LIST = [
  { key: "type_couronne", label: "Couronne" },
  { key: "type_couronne_emax_presse", label: "Couronne e.max pressée" },
  { key: "type_couronne_emax_usine", label: "Couronne e.max usinée" },
  { key: "type_couronne_zircone", label: "Couronne zircone" },
  { key: "type_pont", label: "Pont" },
  { key: "type_facette", label: "Facette" },
  { key: "type_incrustation", label: "Incrustation / onlay" },
  { key: "type_prothese_complete", label: "Prothèse complète" },
  { key: "type_prothese_partielle", label: "Prothèse partielle" },
  { key: "type_plaque_occlusale", label: "Plaque occlusale" },
  { key: "type_gouttiere", label: "Gouttière" },
  { key: "type_wax_up", label: "Wax-up diagnostique" },
  { key: "type_modele", label: "Modèle imprimé" },
  { key: "type_temporaire", label: "Restauration temporaire" },
  { key: "type_recimentation_couronne", label: "Recimentation couronne" },
  { key: "type_recimentation_pont", label: "Recimentation pont" },
  { key: "type_recollage_facette", label: "Recollage facette" },
  { key: "type_reparation", label: "Réparation" },
  { key: "type_autre", label: "Autre" },
]

export function LabPrescriptionEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const professional = getString(d, "prescribingProfessional")
  const clinic = getString(d, "clinicName")
  const phone = getString(d, "phone")
  const email = getString(d, "email")
  const patient = getString(d, "patientName")
  const teeth = getString(d, "affectedTeeth")
  const material = getString(d, "material")
  const materialOther = getString(d, "materialOther")
  const shade = getString(d, "shade")
  const date = getString(d, "desiredDate")
  const instructions = getString(d, "clinicalInstructions")

  const materialLabel = material === "autre" && materialOther ? materialOther : (MATERIAL_LABELS[material] || material)

  return (
    <EmailLayout preview={`Prescription — ${patient} (${clinic})`}>
      <EmailHeader kicker="Prescription laboratoire" />

      <Hero
        eyebrow="Nouvelle prescription"
        name={patient || "Cas"}
        badge={materialLabel ? { label: materialLabel, tone: "info" } : undefined}
        subtitle={`Prescripteur : ${professional} — ${clinic}`}
        timestamp={formatDate(payload.created_at)}
      />

      {instructions && (
        <>
          <SectionTitle>Instructions cliniques</SectionTitle>
          <LongTextBlock value={instructions} />
        </>
      )}

      <SectionTitle>Détails du cas</SectionTitle>
      <Section>
        <DetailRow label="Dents" value={teeth} />
        <DetailRow label="Matériau" value={materialLabel} />
        <DetailRow label="Teinte" value={shade} />
        <DetailRow label="Date souhaitée" value={date} />
      </Section>

      <SectionTitle>Type(s) de cas</SectionTitle>
      <TagList items={TYPES_LIST.map((t) => ({ ...t, selected: isChecked(d, t.key) }))} />

      <SectionTitle>Professionnel</SectionTitle>
      <Section>
        <DetailRow label="Nom" value={professional} />
        <DetailRow label="Clinique" value={clinic} />
        <DetailRow label="Courriel" value={email} />
        <DetailRow label="Téléphone" value={phone} />
      </Section>

      <PhoneCallCard phone={phone} />
    </EmailLayout>
  )
}

export const labPrescriptionMeta = (payload: NetlifyPayload) => {
  const patient = getString(payload.data, "patientName")
  const clinic = getString(payload.data, "clinicName")
  return {
    to: "laboratoire@studiodefacto.ca",
    subject: `[Prescription] ${patient} — ${clinic}`,
    replyTo: getString(payload.data, "email") || undefined,
  }
}

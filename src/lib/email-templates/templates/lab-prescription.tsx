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

const APPAREIL_LABELS: Record<string, string> = {
  couronne: "Couronne",
  pont: "Pont",
  incrustation: "Incrustation",
  facette: "Facette",
  prothese_amovible_complete: "Prothèse amovible complète",
  guide_chirurgical: "Guide chirurgical",
  plaque_occlusale: "Plaque occlusale",
  porte_empreinte: "Porte-empreinte personnalisé",
  gouttiere_retention: "Gouttière de rétention",
  gouttiere_blanchiment: "Gouttière de blanchiment",
  essix: "Essix",
  wax_up: "Wax-up diagnostique",
  reparation: "Réparation",
  autres: "Autres",
}

const SUB_OPTION_LABELS: Record<string, string> = {
  temporaire: "Temporaire",
  permanente: "Permanente",
  immediat: "Immédiat",
  permanent: "Permanent",
  rigide: "Rigide",
  flexible: "Flexible",
  avec_dent_postiche: "Avec dent postiche",
  sans_dent_postiche: "Sans dent postiche",
}

const MATERIAL_LABELS: Record<string, string> = {
  porcelaine_feldspathique: "Porcelaine feldspathique",
  emax_presse: "E.max pressé",
  zircone_3y: "Zircone 3Y",
  zircone_multicouche: "Zircone multi-couche",
  lt_clear: "LT Clear (rigide)",
  lt_comfort: "LT Comfort (flexible)",
}

const ARCADE_LABELS: Record<string, string> = {
  superieure: "Supérieure",
  inferieure: "Inférieure",
  les_deux: "Les deux",
}

export function LabPrescriptionEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const professional = getString(d, "prescribingProfessional")
  const clinic = getString(d, "clinicName")
  const phone = getString(d, "phone")
  const email = getString(d, "email")
  const patient = getString(d, "patientName")

  const appareilKey = getString(d, "appareil")
  const appareilOtherText = getString(d, "appareilOtherText")
  const subOptionKey = getString(d, "subOption")
  const arcadeKey = getString(d, "arcade")
  const teethList = getString(d, "teeth")
  const materialKey = getString(d, "material")
  const lamination = getString(d, "lamination")
  const colorIndications = getString(d, "colorIndications")
  const instructions = getString(d, "clinicalInstructions")

  const appareilLabel =
    appareilKey === "autres" && appareilOtherText
      ? appareilOtherText
      : APPAREIL_LABELS[appareilKey] || appareilKey
  const subOptionLabel = SUB_OPTION_LABELS[subOptionKey] || subOptionKey
  const materialLabel = MATERIAL_LABELS[materialKey] || materialKey
  const arcadeLabel = ARCADE_LABELS[arcadeKey] || arcadeKey

  const heroLabel = subOptionLabel ? `${appareilLabel} — ${subOptionLabel}` : appareilLabel

  return (
    <EmailLayout preview={`Prescription — ${patient} (${appareilLabel})`}>
      <EmailHeader kicker="Prescription laboratoire" />

      <Hero
        eyebrow="Nouvelle prescription"
        name={patient || "Cas"}
        badge={heroLabel ? { label: heroLabel, tone: "info" } : undefined}
        subtitle={`Prescripteur : ${professional} — ${clinic}`}
        timestamp={formatDate(payload.created_at)}
      />

      {instructions && (
        <>
          <SectionTitle>Instructions cliniques</SectionTitle>
          <LongTextBlock value={instructions} />
        </>
      )}

      <SectionTitle>Appareil prescrit</SectionTitle>
      <Section>
        <DetailRow label="Appareil" value={appareilLabel} />
        {subOptionLabel && <DetailRow label="Type" value={subOptionLabel} />}
        {arcadeLabel && <DetailRow label="Arcade" value={arcadeLabel} />}
        {teethList && <DetailRow label="Dents (FDI)" value={teethList} />}
      </Section>

      {(materialLabel || lamination) && (
        <>
          <SectionTitle>Matériau et finition</SectionTitle>
          <Section>
            {materialLabel && <DetailRow label="Matériau" value={materialLabel} />}
            {lamination && (
              <DetailRow label="Lamination de porcelaine" value={lamination === "oui" ? "Oui" : "Non"} />
            )}
          </Section>
        </>
      )}

      {colorIndications && (
        <>
          <SectionTitle>Couleur et maquillage</SectionTitle>
          <LongTextBlock value={colorIndications} />
        </>
      )}

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
  const appareilKey = getString(payload.data, "appareil")
  const appareilOther = getString(payload.data, "appareilOtherText")
  const appareilLabel =
    appareilKey === "autres" && appareilOther ? appareilOther : APPAREIL_LABELS[appareilKey] || appareilKey
  return {
    to: "laboratoire@studiodefacto.ca",
    subject: `[Prescription] ${patient} — ${appareilLabel} (${clinic})`,
    replyTo: getString(payload.data, "email") || undefined,
  }
}

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

const APPAREIL_LABELS = {
  fr: {
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
  } as Record<string, string>,
  en: {
    couronne: "Crown",
    pont: "Bridge",
    incrustation: "Inlay/onlay",
    facette: "Veneer",
    prothese_amovible_complete: "Complete removable denture",
    guide_chirurgical: "Surgical guide",
    plaque_occlusale: "Occlusal splint",
    porte_empreinte: "Custom impression tray",
    gouttiere_retention: "Retention tray",
    gouttiere_blanchiment: "Whitening tray",
    essix: "Essix",
    wax_up: "Diagnostic wax-up",
    reparation: "Repair",
    autres: "Other",
  } as Record<string, string>,
}

const SUB_OPTION_LABELS = {
  fr: {
    temporaire: "Temporaire",
    permanente: "Permanente",
    immediat: "Immédiat",
    permanent: "Permanent",
    rigide: "Rigide",
    flexible: "Flexible",
    avec_dent_postiche: "Avec dent postiche",
    sans_dent_postiche: "Sans dent postiche",
  } as Record<string, string>,
  en: {
    temporaire: "Temporary",
    permanente: "Permanent",
    immediat: "Immediate",
    permanent: "Permanent",
    rigide: "Rigid",
    flexible: "Flexible",
    avec_dent_postiche: "With pontic tooth",
    sans_dent_postiche: "Without pontic tooth",
  } as Record<string, string>,
}

const MATERIAL_LABELS = {
  fr: {
    porcelaine_feldspathique: "Porcelaine feldspathique",
    emax_presse: "E.max pressé",
    zircone_3y: "Zircone 3Y",
    zircone_multicouche: "Zircone multi-couche",
    resine: "Résine",
    lt_clear: "LT Clear (rigide)",
    lt_comfort: "LT Comfort (flexible)",
  } as Record<string, string>,
  en: {
    porcelaine_feldspathique: "Feldspathic porcelain",
    emax_presse: "Pressed e.max",
    zircone_3y: "3Y zirconia",
    zircone_multicouche: "Multi-layer zirconia",
    resine: "Resin",
    lt_clear: "LT Clear (rigid)",
    lt_comfort: "LT Comfort (flexible)",
  } as Record<string, string>,
}

const ARCADE_LABELS = {
  fr: { superieure: "Supérieure", inferieure: "Inférieure", les_deux: "Les deux" } as Record<string, string>,
  en: { superieure: "Upper", inferieure: "Lower", les_deux: "Both" } as Record<string, string>,
}

const L = {
  fr: {
    previewPrefix: "Prescription",
    kicker: "Prescription laboratoire",
    eyebrow: "Nouvelle prescription",
    defaultCase: "Cas",
    prescriberPrefix: "Prescripteur :",
    sectionInstructions: "Instructions cliniques",
    sectionDevice: "Appareil prescrit",
    labelDevice: "Appareil",
    labelType: "Type",
    labelArch: "Arcade",
    labelTeeth: "Dents (FDI)",
    sectionMaterial: "Matériau et finition",
    labelMaterial: "Matériau",
    labelLamination: "Lamination de porcelaine",
    yes: "Oui",
    no: "Non",
    sectionColor: "Couleur et maquillage",
    sectionProfessional: "Professionnel",
    labelName: "Nom",
    labelClinic: "Clinique",
    labelEmail: "Courriel",
    labelPhone: "Téléphone",
    subjectPrefix: "[Prescription]",
  },
  en: {
    previewPrefix: "Prescription",
    kicker: "Laboratory prescription",
    eyebrow: "New prescription",
    defaultCase: "Case",
    prescriberPrefix: "Prescriber:",
    sectionInstructions: "Clinical instructions",
    sectionDevice: "Prescribed appliance",
    labelDevice: "Appliance",
    labelType: "Type",
    labelArch: "Arch",
    labelTeeth: "Teeth (FDI)",
    sectionMaterial: "Material and finish",
    labelMaterial: "Material",
    labelLamination: "Porcelain lamination",
    yes: "Yes",
    no: "No",
    sectionColor: "Shade and characterization",
    sectionProfessional: "Professional",
    labelName: "Name",
    labelClinic: "Clinic",
    labelEmail: "Email",
    labelPhone: "Phone",
    subjectPrefix: "[Prescription]",
  },
} as const

export function LabPrescriptionEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const lang = resolveLang(d)
  const t = L[lang]
  const appareilMap = APPAREIL_LABELS[lang]
  const subMap = SUB_OPTION_LABELS[lang]
  const matMap = MATERIAL_LABELS[lang]
  const archMap = ARCADE_LABELS[lang]

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
      : appareilMap[appareilKey] || appareilKey
  const subOptionLabel = subMap[subOptionKey] || subOptionKey
  const materialLabel = matMap[materialKey] || materialKey
  const arcadeLabel = archMap[arcadeKey] || arcadeKey

  const heroLabel = subOptionLabel ? `${appareilLabel} — ${subOptionLabel}` : appareilLabel

  return (
    <EmailLayout preview={`${t.previewPrefix} — ${patient} (${appareilLabel})`} lang={lang}>
      <EmailHeader kicker={t.kicker} />

      <Hero
        eyebrow={t.eyebrow}
        name={patient || t.defaultCase}
        badge={heroLabel ? { label: heroLabel, tone: "info" } : undefined}
        subtitle={`${t.prescriberPrefix} ${professional} — ${clinic}`}
        timestamp={formatDate(payload.created_at, lang)}
        lang={lang}
      />

      {instructions && (
        <>
          <SectionTitle>{t.sectionInstructions}</SectionTitle>
          <LongTextBlock value={instructions} />
        </>
      )}

      <SectionTitle>{t.sectionDevice}</SectionTitle>
      <Section>
        <DetailRow label={t.labelDevice} value={appareilLabel} />
        {subOptionLabel && <DetailRow label={t.labelType} value={subOptionLabel} />}
        {arcadeLabel && <DetailRow label={t.labelArch} value={arcadeLabel} />}
        {teethList && <DetailRow label={t.labelTeeth} value={teethList} />}
      </Section>

      {(materialLabel || lamination) && (
        <>
          <SectionTitle>{t.sectionMaterial}</SectionTitle>
          <Section>
            {materialLabel && <DetailRow label={t.labelMaterial} value={materialLabel} />}
            {lamination && (
              <DetailRow label={t.labelLamination} value={lamination === "oui" ? t.yes : t.no} />
            )}
          </Section>
        </>
      )}

      {colorIndications && (
        <>
          <SectionTitle>{t.sectionColor}</SectionTitle>
          <LongTextBlock value={colorIndications} />
        </>
      )}

      <SectionTitle>{t.sectionProfessional}</SectionTitle>
      <Section>
        <DetailRow label={t.labelName} value={professional} />
        <DetailRow label={t.labelClinic} value={clinic} />
        <DetailRow label={t.labelEmail} value={email} />
        <DetailRow label={t.labelPhone} value={phone} />
      </Section>

      <PhoneCallCard phone={phone} lang={lang} />
    </EmailLayout>
  )
}

export const labPrescriptionMeta = (payload: NetlifyPayload) => {
  const lang = resolveLang(payload.data)
  const t = L[lang]
  const appareilMap = APPAREIL_LABELS[lang]
  const patient = getString(payload.data, "patientName")
  const clinic = getString(payload.data, "clinicName")
  const appareilKey = getString(payload.data, "appareil")
  const appareilOther = getString(payload.data, "appareilOtherText")
  const appareilLabel =
    appareilKey === "autres" && appareilOther ? appareilOther : appareilMap[appareilKey] || appareilKey
  return {
    to: "laboratoire@studiodefacto.ca",
    subject: `${t.subjectPrefix} ${patient} — ${appareilLabel} (${clinic})`,
    replyTo: getString(payload.data, "email") || undefined,
  }
}

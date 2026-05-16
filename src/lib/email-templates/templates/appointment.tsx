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

const TYPE_LABELS: Record<string, string> = {
  premiere_visite: "Première visite / examen complet",
  nettoyage: "Nettoyage et suivi",
  consultation_ciblee: "Consultation ciblée",
  urgence: "Urgence dentaire",
  douleur: "Douleur",
  dent_cassee: "Dent cassée ou restauration fracturée",
  esthetique: "Esthétique",
  orthodontie: "Orthodontie / aligneurs",
  implant_couronne: "Implant / couronne / prothèse",
  laboratoire: "Laboratoire ou demande professionnelle",
  autre: "Autre",
}

const URGENT_TYPES = new Set(["urgence", "douleur", "dent_cassee"])

const MOTIFS_LIST = [
  { key: "motif_douleur", label: "Douleur" },
  { key: "motif_sensibilite", label: "Sensibilité" },
  { key: "motif_saignement_gencives", label: "Saignement des gencives" },
  { key: "motif_mauvaise_haleine", label: "Mauvaise haleine" },
  { key: "motif_dent_mobile", label: "Dent mobile" },
  { key: "motif_fracture", label: "Fracture" },
  { key: "motif_usure", label: "Usure dentaire" },
  { key: "motif_serrement_grincement", label: "Serrement ou grincement" },
  { key: "motif_esthetique", label: "Préoccupation esthétique" },
  { key: "motif_deuxieme_avis", label: "Deuxième avis" },
  { key: "motif_suivi_traitement", label: "Suivi de traitement existant" },
  { key: "motif_autre", label: "Autre" },
]

const ALERTING_MOTIFS = ["motif_douleur", "motif_fracture", "motif_dent_mobile"]

const JOURS_LIST = [
  { key: "jour_lundi", label: "Lundi" },
  { key: "jour_mardi", label: "Mardi" },
  { key: "jour_mercredi", label: "Mercredi" },
  { key: "jour_jeudi", label: "Jeudi (sur RDV)" },
  { key: "jour_vendredi", label: "Vendredi (sur RDV)" },
  { key: "jour_asap", label: "Dès que possible" },
  { key: "jour_flexible", label: "Flexible" },
]

const MOMENTS_LIST = [
  { key: "moment_matin", label: "Matin (9h-12h)" },
  { key: "moment_midi", label: "Midi (12h-14h)" },
  { key: "moment_apres_midi", label: "Après-midi (14h-18h)" },
  { key: "moment_flexible", label: "Flexible" },
]

const CONTACT_LIST = [
  { key: "contact_telephone", label: "Téléphone" },
  { key: "contact_courriel", label: "Courriel" },
  { key: "contact_sms", label: "SMS" },
]

const CONDITIONS_LIST = [
  { key: "condition_hypertension", label: "Hypertension artérielle" },
  { key: "condition_cardiaque", label: "Maladie cardiaque" },
  { key: "condition_souffle_valvulaire", label: "Souffle / valvulaire" },
  { key: "condition_endocardite", label: "Antécédent d'endocardite" },
  { key: "condition_diabete", label: "Diabète" },
  { key: "condition_respiratoire", label: "Asthme / respiratoire" },
  { key: "condition_apnee_sommeil", label: "Apnée du sommeil" },
  { key: "condition_foie", label: "Maladie du foie" },
  { key: "condition_renale", label: "Maladie rénale" },
  { key: "condition_coagulation", label: "Trouble de coagulation" },
  { key: "condition_anticoagulants", label: "Anticoagulants / antiplaquettaires" },
  { key: "condition_epilepsie", label: "Épilepsie ou convulsions" },
  { key: "condition_neurologique", label: "Trouble neurologique" },
  { key: "condition_cancer", label: "Cancer (actuel ou antécédent)" },
  { key: "condition_radiotherapie", label: "Radiothérapie tête/cou" },
  { key: "condition_chimiotherapie", label: "Chimio / immunothérapie" },
  { key: "condition_immunosuppression", label: "Immunosuppression" },
  { key: "condition_osteoporose", label: "Ostéoporose" },
  { key: "condition_bisphosphonates", label: "Bisphosphonates" },
  { key: "condition_thyroide", label: "Trouble thyroïdien" },
  { key: "condition_reflux", label: "Reflux gastrique important" },
  { key: "condition_anxiete", label: "Anxiété importante" },
  { key: "condition_grossesse", label: "Grossesse / allaitement" },
  { key: "condition_allergies", label: "Allergies connues" },
  { key: "condition_autre", label: "Autre condition" },
]

// Conditions that require special attention (could affect treatment)
const CRITICAL_CONDITIONS = [
  "condition_cardiaque",
  "condition_souffle_valvulaire",
  "condition_endocardite",
  "condition_anticoagulants",
  "condition_coagulation",
  "condition_immunosuppression",
  "condition_bisphosphonates",
  "condition_grossesse",
  "condition_allergies",
]

export function AppointmentEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const firstName = getString(d, "firstName")
  const lastName = getString(d, "lastName")
  const phone = getString(d, "phone")
  const email = getString(d, "email")
  const language = getString(d, "preferredLanguage")
  const languageOther = getString(d, "preferredLanguageOther")
  const typeDemande = getString(d, "typeDemande")
  const typeDemandeOther = getString(d, "typeDemandeOther")
  const message = getString(d, "message")

  const typeLabel = typeDemande === "autre" && typeDemandeOther ? typeDemandeOther : (TYPE_LABELS[typeDemande] || typeDemande)
  const langueLabel = language === "autre" && languageOther ? languageOther : language
  const isUrgent = URGENT_TYPES.has(typeDemande)

  const conditionsItems = CONDITIONS_LIST.map((c) => ({ ...c, selected: isChecked(d, c.key) }))
  const conditionsCount = conditionsItems.filter((c) => c.selected).length
  const criticalCount = conditionsItems.filter((c) => c.selected && CRITICAL_CONDITIONS.includes(c.key)).length

  const motifsItems = MOTIFS_LIST.map((m) => ({ ...m, selected: isChecked(d, m.key) }))

  return (
    <EmailLayout preview={`${firstName} ${lastName} — ${typeLabel}`} tone={isUrgent ? "red" : "default"}>
      <EmailHeader kicker={isUrgent ? "Demande potentiellement urgente" : "Nouvelle demande de rendez-vous"} />

      <Hero
        eyebrow="Demande de rendez-vous"
        name={`${firstName} ${lastName}`.trim() || "Patient"}
        badge={{ label: typeLabel, tone: isUrgent ? "red" : "default" }}
        timestamp={formatDate(payload.created_at)}
      />

      <PhoneCallCard phone={phone} urgent={isUrgent} />

      {criticalCount > 0 && (
        <AlertBanner
          title={`${criticalCount} condition${criticalCount > 1 ? "s" : ""} médicale${criticalCount > 1 ? "s" : ""} à considérer`}
          items={conditionsItems.filter((c) => c.selected && CRITICAL_CONDITIONS.includes(c.key)).map((c) => c.label)}
        />
      )}

      <SectionTitle>Coordonnées</SectionTitle>
      <Section>
        <DetailRow label="Courriel" value={email} />
        <DetailRow label="Téléphone" value={phone} />
        <DetailRow label="Langue préférée" value={langueLabel} />
      </Section>

      {motifsItems.some((m) => m.selected) && (
        <>
          <SectionTitle>Motifs secondaires</SectionTitle>
          <TagList items={motifsItems} alertItems={ALERTING_MOTIFS} />
        </>
      )}

      {message && (
        <>
          <SectionTitle>Message du patient</SectionTitle>
          <LongTextBlock value={message} />
        </>
      )}

      <SectionTitle>Disponibilités</SectionTitle>
      <TagList
        label="Journées"
        items={JOURS_LIST.map((j) => ({ ...j, selected: isChecked(d, j.key) }))}
      />
      <TagList
        label="Moments"
        items={MOMENTS_LIST.map((m) => ({ ...m, selected: isChecked(d, m.key) }))}
      />
      <TagList
        label="Mode de contact préféré"
        items={CONTACT_LIST.map((c) => ({ ...c, selected: isChecked(d, c.key) }))}
      />

      {conditionsCount > 0 && (
        <>
          <SectionTitle accent={criticalCount > 0 ? "red" : "default"}>
            Profil médical — {conditionsCount} condition{conditionsCount > 1 ? "s" : ""} déclarée{conditionsCount > 1 ? "s" : ""}
          </SectionTitle>
          <TagList
            items={conditionsItems}
            alertItems={CRITICAL_CONDITIONS}
            emptyText=""
          />
          {getString(d, "allergies_details") && (
            <LongTextBlock label="Détails allergies" value={getString(d, "allergies_details")} />
          )}
          {getString(d, "other_condition_details") && (
            <LongTextBlock label="Autre condition" value={getString(d, "other_condition_details")} />
          )}
        </>
      )}
    </EmailLayout>
  )
}

export const appointmentMeta = (payload: NetlifyPayload) => {
  const d = payload.data
  const firstName = getString(d, "firstName")
  const lastName = getString(d, "lastName")
  const typeDemande = getString(d, "typeDemande")
  const typeDemandeOther = getString(d, "typeDemandeOther")
  const typeLabel = typeDemande === "autre" && typeDemandeOther ? typeDemandeOther : (TYPE_LABELS[typeDemande] || typeDemande)
  const isUrgent = URGENT_TYPES.has(typeDemande)
  return {
    to: isUrgent ? "urgence@studiodefacto.ca" : "rendezvous@studiodefacto.ca",
    subject: `${isUrgent ? "⚠ " : ""}[RDV] ${firstName} ${lastName} — ${typeLabel}`,
    replyTo: getString(d, "email") || undefined,
    isUrgent,
  }
}

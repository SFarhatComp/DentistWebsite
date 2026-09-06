import * as React from "react"
import { Body, Container, Head, Html, Preview, Section, Row, Column, Text } from "@react-email/components"
import { formatDate, getString, resolveLang } from "../theme"
import type { NetlifyPayload } from "../types"

/* --------------------------------------------------------------------------
 * Rapport de demande de rendez-vous reçu à la réception (handoff §10).
 *
 * C'est la moitié utile du questionnaire : la réception doit pouvoir trier sans
 * ouvrir le courriel (d'où la priorité dans l'objet), puis agir sans réfléchir
 * (d'où la liste « à faire » générée depuis les réponses).
 *
 * Rendu sur papier clair, pensé pour être lu à l'écran comme imprimé.
 * ----------------------------------------------------------------------- */

const PAPIER = "#F2E7E4"
const ENCRE = "#1A1A18"
const ENCRE_DOUCE = "#5A544F"
const FILET = "#D8CBC6"
const PANNEAU = "#EDE4DA"

type Lang = "fr" | "en"

/** Priorité de rappel, dérivée de l'étape 3 du questionnaire. */
const PRIORITE: Record<string, { fr: string; en: string; ton: string }> = {
  aucune: { fr: "RAPPEL RÉGULIER", en: "REGULAR CALLBACK", ton: "#4B463F" },
  progresse: { fr: "À RAPPELER SOUS 24 H", en: "CALL BACK WITHIN 24 H", ton: "#B5793D" },
  aujourdhui: { fr: "PRIORITÉ — RAPPEL LE JOUR MÊME", en: "PRIORITY — SAME-DAY CALLBACK", ton: "#7A3E52" },
}

const L = {
  fr: {
    titre: "DEMANDE DE RENDEZ-VOUS",
    nouveau: "Nouveau patient",
    existant: "Patient du studio",
    statut: "STATUT",
    motif: "MOTIF DÉCLARÉ",
    precisions: "PRÉCISIONS",
    douleur: "DOULEUR",
    duree: "DURÉE SUGGÉRÉE",
    jours: "JOURS",
    moments: "MOMENTS",
    delai: "DÉLAI SOUHAITÉ",
    assurance: "ASSURANCE",
    telephone: "TÉLÉPHONE",
    courriel: "COURRIEL",
    naissance: "DATE DE NAISSANCE",
    contact: "CONTACT PRÉFÉRÉ",
    note: "NOTE DU PATIENT",
    aFaire: "À FAIRE À LA RÉCEPTION",
    recuLe: "Reçu le",
    a: "à",
    pied: "Formulaire du site · Aucune donnée clinique détaillée n'est collectée en ligne.",
    sujet: "Demande de RDV",
    min: "min",
    nonPrecise: "Non précisé",
  },
  en: {
    titre: "APPOINTMENT REQUEST",
    nouveau: "New patient",
    existant: "Studio patient",
    statut: "STATUS",
    motif: "STATED REASON",
    precisions: "DETAILS",
    douleur: "PAIN",
    duree: "SUGGESTED DURATION",
    jours: "DAYS",
    moments: "TIME OF DAY",
    delai: "PREFERRED TIMEFRAME",
    assurance: "INSURANCE",
    telephone: "PHONE",
    courriel: "EMAIL",
    naissance: "DATE OF BIRTH",
    contact: "PREFERRED CONTACT",
    note: "PATIENT NOTE",
    aFaire: "FOR RECEPTION TO DO",
    recuLe: "Received on",
    a: "at",
    pied: "Website form · No detailed clinical data is collected online.",
    sujet: "Appointment request",
    min: "min",
    nonPrecise: "Not specified",
  },
}

const MAP: Record<string, Record<string, { fr: string; en: string }>> = {
  douleur: {
    aucune: { fr: "Aucune douleur", en: "No pain" },
    progresse: { fr: "Un inconfort qui progresse", en: "A discomfort that is getting worse" },
    aujourdhui: { fr: "Douleur ou gonflement aujourd'hui", en: "Pain or swelling today" },
  },
  jours: {
    lundi: { fr: "Lundi", en: "Monday" },
    mardi: { fr: "Mardi", en: "Tuesday" },
    mercredi: { fr: "Mercredi", en: "Wednesday" },
  },
  moments: {
    matin: { fr: "Matin (9 h – 12 h)", en: "Morning (9 a.m. – 12 p.m.)" },
    apres_midi: { fr: "Après-midi (12 h – 15 h)", en: "Afternoon (12 p.m. – 3 p.m.)" },
    fin_journee: { fr: "Fin de journée (15 h – 18 h)", en: "End of day (3 p.m. – 6 p.m.)" },
  },
  delai: {
    asap: { fr: "Dès que possible", en: "As soon as possible" },
    deux_semaines: { fr: "Dans les deux semaines", en: "Within two weeks" },
    mois: { fr: "Dans le mois", en: "Within the month" },
  },
  assurance: {
    privee: { fr: "Assurance privée", en: "Private insurance" },
    ramq: { fr: "RAMQ", en: "RAMQ" },
    rcsd: { fr: "Régime canadien de soins dentaires (RCSD)", en: "Canadian Dental Care Plan (CDCP)" },
    non: { fr: "Aucune — paiement direct", en: "None — direct payment" },
    inconnu: { fr: "Ne sait pas", en: "Does not know" },
  },
  contact: {
    telephone: { fr: "Téléphone", en: "Phone" },
    courriel: { fr: "Courriel", en: "Email" },
    texto: { fr: "Texto", en: "Text message" },
  },
}

const label = (groupe: string, code: string, lang: Lang, repli: string) =>
  MAP[groupe]?.[code]?.[lang] ?? (code || repli)

const liste = (groupe: string, csv: string, lang: Lang, repli: string) => {
  const codes = csv.split(",").map((c) => c.trim()).filter(Boolean)
  return codes.length ? codes.map((c) => label(groupe, c, lang, c)).join(" · ") : repli
}

/**
 * Liste d'actions générée depuis les réponses.
 * Chaque ligne correspond à une règle du handoff §10 — l'ordre est celui du
 * traitement à la réception, pas celui du formulaire.
 */
function actionsReception(d: Record<string, string | string[] | undefined>, lang: Lang): string[] {
  const g = (k: string) => getString(d, k)
  const statut = g("statut")
  const assurance = g("assurance")
  const assureur = g("assureur")
  const duree = Number(g("dureeSuggeree")) || 45
  const canal = label("contact", g("contactPreference"), lang, lang === "fr" ? "téléphone" : "phone").toLowerCase()
  const fr = lang === "fr"
  const out: string[] = []

  out.push(
    statut === "nouveau"
      ? fr
        ? "Ouvrir un dossier patient (nom, date de naissance, coordonnées ci-dessus)"
        : "Open a patient file (name, date of birth, contact details above)"
      : fr
        ? "Retrouver le dossier existant et vérifier les coordonnées"
        : "Find the existing file and check the contact details"
  )
  out.push(
    fr
      ? `Bloquer environ ${duree} min à l'agenda, selon le motif déclaré`
      : `Block about ${duree} min in the schedule, according to the stated reason`
  )
  if (g("priorite") === "aujourdhui") {
    out.push(
      fr
        ? "Rappeler aujourd'hui — douleur ou gonflement signalé"
        : "Call back today — pain or swelling reported"
    )
  }
  if (assurance === "privee") {
    out.push(
      fr
        ? `Demander la carte d'assurance${assureur ? ` (${assureur})` : ""} avant le rendez-vous`
        : `Ask for the insurance card${assureur ? ` (${assureur})` : ""} before the appointment`
    )
  }
  if (assurance === "rcsd") {
    out.push(
      fr
        ? "Vérifier l'admissibilité au Régime canadien de soins dentaires et noter le numéro de client"
        : "Check eligibility for the Canadian Dental Care Plan and note the client number"
    )
  }
  if (assurance === "ramq") {
    out.push(
      fr
        ? "Valider la carte d'assurance maladie et l'admissibilité RAMQ"
        : "Validate the health insurance card and RAMQ eligibility"
    )
  }
  if (assurance === "inconnu") {
    out.push(
      fr ? "Vérifier la couverture avec le patient au téléphone" : "Check coverage with the patient by phone"
    )
  }
  if (duree >= 75) {
    out.push(
      fr
        ? "Prévoir le temps d'examen complet et les radiographies"
        : "Allow time for the complete examination and radiographs"
    )
  }
  out.push(
    fr
      ? `Confirmer par ${canal} et envoyer le rappel 48 h avant`
      : `Confirm by ${canal} and send the reminder 48 h beforehand`
  )
  return out
}

/* -------------------------------------------------------------------------- */

function Paire({ label: l, value }: { label: string; value: React.ReactNode }) {
  return (
    <Column style={{ width: "50%", verticalAlign: "top", paddingRight: "12px", paddingBottom: "14px" }}>
      <Text style={{ margin: "0 0 3px", fontSize: "10px", letterSpacing: "0.16em", color: ENCRE_DOUCE }}>
        {l}
      </Text>
      <Text style={{ margin: 0, fontSize: "14px", lineHeight: "1.45", color: ENCRE }}>{value}</Text>
    </Column>
  )
}

export function AppointmentEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const lang = resolveLang(d) as Lang
  const t = L[lang]
  const g = (k: string) => getString(d, k)

  const prenom = g("firstName")
  const nom = g("lastName")
  const statut = g("statut") === "nouveau" ? t.nouveau : t.existant
  const motifLabel = g("motifLabel") || g("motif") || t.nonPrecise
  const prio = PRIORITE[g("priorite")] ?? PRIORITE.aucune
  const duree = Number(g("dureeSuggeree")) || 45
  const note = g("note")
  const assurance = label("assurance", g("assurance"), lang, t.nonPrecise)
  const assureur = g("assureur")
  const police = g("police")
  const assuranceComplete = [assurance, assureur, police && `n° ${police}`].filter(Boolean).join(" · ")
  const actions = actionsReception(d, lang)
  const recu = formatDate(payload.created_at, lang)

  return (
    <Html lang={lang}>
      <Head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Preview>{`${prio[lang]} — ${prenom} ${nom} — ${motifLabel}`}</Preview>
      <Body
        style={{
          backgroundColor: "#E4D8D4",
          margin: 0,
          padding: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
        }}
      >
        <Container style={{ maxWidth: "640px", margin: "0 auto", padding: "24px 12px" }}>
          <Container style={{ backgroundColor: PAPIER, padding: "28px 26px", color: ENCRE }}>
            {/* En-tête : identité à gauche, priorité à droite */}
            <Row>
              <Column style={{ verticalAlign: "top" }}>
                <Text style={{ margin: "0 0 6px", fontSize: "10px", letterSpacing: "0.2em", color: ENCRE_DOUCE }}>
                  {t.titre}
                </Text>
                <Text style={{ margin: 0, fontSize: "26px", lineHeight: "1.15", fontWeight: 600, color: ENCRE }}>
                  {prenom} {nom}
                </Text>
                <Text style={{ margin: "6px 0 0", fontSize: "13px", color: ENCRE_DOUCE }}>
                  {statut} · {motifLabel}
                </Text>
              </Column>
              <Column style={{ verticalAlign: "top", textAlign: "right", width: "210px" }}>
                <Text
                  style={{
                    display: "inline-block",
                    margin: 0,
                    padding: "8px 12px",
                    backgroundColor: prio.ton,
                    color: "#FFFFFF",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                  }}
                >
                  {prio[lang]}
                </Text>
              </Column>
            </Row>

            <Section style={{ borderTop: `1px solid ${FILET}`, marginTop: "22px", paddingTop: "20px" }}>
              <Row>
                <Paire label={t.statut} value={statut} />
                <Paire label={t.motif} value={motifLabel} />
              </Row>
              <Row>
                <Paire label={t.precisions} value={g("precisions") || t.nonPrecise} />
                <Paire label={t.douleur} value={label("douleur", g("douleur"), lang, t.nonPrecise)} />
              </Row>
              <Row>
                <Paire label={t.duree} value={`${duree} ${t.min}`} />
                <Paire label={t.delai} value={label("delai", g("delai"), lang, t.nonPrecise)} />
              </Row>
              <Row>
                <Paire label={t.jours} value={liste("jours", g("jours"), lang, t.nonPrecise)} />
                <Paire label={t.moments} value={liste("moments", g("moments"), lang, t.nonPrecise)} />
              </Row>
              <Row>
                <Paire label={t.assurance} value={assuranceComplete} />
                <Paire label={t.contact} value={label("contact", g("contactPreference"), lang, t.nonPrecise)} />
              </Row>
              <Row>
                <Paire label={t.telephone} value={g("phone") || t.nonPrecise} />
                <Paire label={t.courriel} value={g("email") || t.nonPrecise} />
              </Row>
              <Row>
                <Paire label={t.naissance} value={g("birthdate") || t.nonPrecise} />
                <Column style={{ width: "50%" }} />
              </Row>
            </Section>

            {note && (
              <Section style={{ borderTop: `1px solid ${FILET}`, paddingTop: "18px" }}>
                <Text style={{ margin: "0 0 6px", fontSize: "10px", letterSpacing: "0.16em", color: ENCRE_DOUCE }}>
                  {t.note}
                </Text>
                <Text style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: ENCRE, whiteSpace: "pre-wrap" }}>
                  {note}
                </Text>
              </Section>
            )}

            <Section style={{ marginTop: "22px", backgroundColor: PANNEAU, padding: "20px 20px 8px" }}>
              <Text style={{ margin: "0 0 14px", fontSize: "10px", letterSpacing: "0.16em", fontWeight: 700, color: ENCRE }}>
                {t.aFaire}
              </Text>
              {actions.map((a) => (
                <Text key={a} style={{ margin: "0 0 10px", fontSize: "14px", lineHeight: "1.5", color: ENCRE }}>
                  <span style={{ display: "inline-block", width: "18px", color: ENCRE_DOUCE }}>☐</span>
                  {a}
                </Text>
              ))}
            </Section>

            <Text style={{ margin: "22px 0 0", fontSize: "11px", lineHeight: "1.5", color: ENCRE_DOUCE }}>
              {t.recuLe} {recu} · {t.pied}
            </Text>
          </Container>
        </Container>
      </Body>
    </Html>
  )
}

export const appointmentMeta = (payload: NetlifyPayload) => {
  const d = payload.data
  const lang = resolveLang(d) as Lang
  const t = L[lang]
  const prio = PRIORITE[getString(d, "priorite")] ?? PRIORITE.aucune
  const jourMeme = getString(d, "priorite") === "aujourdhui"
  const nom = `${getString(d, "firstName")} ${getString(d, "lastName")}`.trim()
  return {
    // La priorité est dans l'objet pour que la réception trie sans ouvrir.
    to: jourMeme ? "urgence@studiodefacto.ca" : "rendezvous@studiodefacto.ca",
    subject: `[${prio[lang]}] ${t.sujet} — ${nom}`,
    replyTo: getString(d, "email") || undefined,
    isUrgent: jourMeme,
  }
}

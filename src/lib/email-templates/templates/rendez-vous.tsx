import * as React from "react"
import { Body, Container, Head, Html, Preview, Section, Row, Column, Text } from "@react-email/components"
import { formatDate, getString, resolveLang } from "../theme"
import { DESTINATAIRE_RENDEZ_VOUS } from "../destinataire"
import type { NetlifyPayload } from "../types"

/* --------------------------------------------------------------------------
 * Demande de rendez-vous avec plage choisie.
 *
 * Le courriel est fait pour qu'on puisse décider sans ouvrir autre chose : la
 * plage demandée en haut, puis le motif, la couverture et la douleur — les
 * trois choses qui changent la conduite à tenir.
 *
 * L'objet porte la date et l'heure : la réception trie son matin sans ouvrir
 * un seul message.
 * ----------------------------------------------------------------------- */

const PAPIER = "#F5F0E6"
const ENCRE = "#291B2E"
const ENCRE_DOUCE = "#5E4A63"
const FILET = "#DCD2C4"

type Lang = "fr" | "en"

const L = {
  fr: {
    titre: "DEMANDE DE RENDEZ-VOUS",
    plage: "PLAGE DEMANDÉE",
    telephone: "TÉLÉPHONE",
    courriel: "COURRIEL",
    motif: "MOTIF",
    couverture: "COUVERTURE",
    premiereVisite: "PREMIÈRE VISITE",
    douleur: "DOULEUR",
    precisions: "PRÉCISIONS",
    aFaire: "À FAIRE À LA RÉCEPTION",
    actions: [
      "Rappeler pour confirmer la plage, ou en proposer une autre.",
      "Inscrire le rendez-vous à l'agenda du studio une fois confirmé.",
      "Vérifier la couverture annoncée et prévoir la carte à la première visite.",
    ],
    actionDouleur: "Douleur signalée : rappeler en premier, et évaluer si la plage choisie est assez rapprochée.",
    recuLe: "Reçu le",
    pied: "Formulaire de rendez-vous du site · Aucun renseignement de santé n'est demandé en ligne.",
    sujet: "Rendez-vous",
    nonPrecise: "Non précisé",
  },
  en: {
    titre: "APPOINTMENT REQUEST",
    plage: "REQUESTED SLOT",
    telephone: "PHONE",
    courriel: "EMAIL",
    motif: "REASON",
    couverture: "COVERAGE",
    premiereVisite: "FIRST VISIT",
    douleur: "PAIN",
    precisions: "DETAILS",
    aFaire: "FOR RECEPTION TO DO",
    actions: [
      "Call back to confirm the slot, or offer another one.",
      "Enter the appointment in the studio calendar once confirmed.",
      "Check the coverage given and plan for the card at the first visit.",
    ],
    actionDouleur: "Pain reported: call first, and check whether the chosen slot is soon enough.",
    recuLe: "Received on",
    pied: "Website appointment form · No health information is requested online.",
    sujet: "Appointment",
    nonPrecise: "Not specified",
  },
}

/** Vrai si la personne a signalé une douleur, quelle qu'en soit l'intensité. */
function aMal(valeur: string): boolean {
  return /oui|yes/i.test(valeur)
}

function Paire({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Column style={{ width: "50%", verticalAlign: "top", paddingRight: "12px", paddingBottom: "14px" }}>
      <Text style={{ margin: "0 0 3px", fontSize: "10px", letterSpacing: "0.16em", color: ENCRE_DOUCE }}>{label}</Text>
      <Text style={{ margin: 0, fontSize: "14px", lineHeight: "1.45", color: ENCRE }}>{value}</Text>
    </Column>
  )
}

export function RendezVousEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const lang = resolveLang(d) as Lang
  const t = L[lang]
  const g = (k: string) => getString(d, k)

  const douleur = g("douleur")
  const precisions = g("precisions")

  const champs: [string, string][] = (
    [
      [t.motif, g("motif")],
      [t.couverture, g("couverture")],
      [t.premiereVisite, g("premiereVisite")],
      [t.douleur, douleur],
      [t.courriel, g("courriel")],
    ] as [string, string][]
  ).filter(([, v]) => v)

  const actions = aMal(douleur) ? [t.actionDouleur, ...t.actions] : t.actions

  return (
    <Html lang={lang}>
      <Head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Preview>{`${g("creneauLibelle")} — ${g("nom")} — ${g("motif")}`}</Preview>
      <Body
        style={{
          backgroundColor: "#E9E1EA",
          margin: 0,
          padding: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
        }}
      >
        <Container style={{ maxWidth: "640px", margin: "0 auto", padding: "24px 12px" }}>
          <Container style={{ backgroundColor: PAPIER, padding: "28px 26px", color: ENCRE }}>
            <Text style={{ margin: "0 0 6px", fontSize: "10px", letterSpacing: "0.2em", color: ENCRE_DOUCE }}>
              {t.titre}
            </Text>
            <Text style={{ margin: 0, fontSize: "26px", lineHeight: "1.15", fontWeight: 600, color: ENCRE }}>
              {g("nom")}
            </Text>

            <Section style={{ marginTop: "18px", backgroundColor: "#FBF8F3", padding: "16px 18px" }}>
              <Text style={{ margin: "0 0 3px", fontSize: "10px", letterSpacing: "0.16em", color: ENCRE_DOUCE }}>
                {t.plage}
              </Text>
              <Text style={{ margin: 0, fontSize: "20px", fontWeight: 600, color: ENCRE }}>
                {g("creneauLibelle") || t.nonPrecise}
              </Text>
              <Text style={{ margin: "10px 0 0", fontSize: "10px", letterSpacing: "0.16em", color: ENCRE_DOUCE }}>
                {t.telephone}
              </Text>
              <Text style={{ margin: 0, fontSize: "20px", fontWeight: 600, color: ENCRE }}>
                {g("telephone") || t.nonPrecise}
              </Text>
            </Section>

            <Section style={{ borderTop: `1px solid ${FILET}`, marginTop: "22px", paddingTop: "20px" }}>
              {champs.map((paire, i) =>
                i % 2 === 0 ? (
                  <Row key={paire[0]}>
                    <Paire label={paire[0]} value={paire[1]} />
                    {champs[i + 1] ? (
                      <Paire label={champs[i + 1][0]} value={champs[i + 1][1]} />
                    ) : (
                      <Column style={{ width: "50%" }} />
                    )}
                  </Row>
                ) : null
              )}
            </Section>

            {precisions && (
              <Section style={{ borderTop: `1px solid ${FILET}`, paddingTop: "18px" }}>
                <Text style={{ margin: "0 0 6px", fontSize: "10px", letterSpacing: "0.16em", color: ENCRE_DOUCE }}>
                  {t.precisions}
                </Text>
                <Text style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", whiteSpace: "pre-wrap", color: ENCRE }}>
                  {precisions}
                </Text>
              </Section>
            )}

            <Section style={{ marginTop: "16px", backgroundColor: "#EDE4DA", padding: "20px 20px 8px" }}>
              <Text
                style={{ margin: "0 0 14px", fontSize: "10px", letterSpacing: "0.16em", fontWeight: 700, color: ENCRE }}
              >
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
              {t.recuLe} {formatDate(payload.created_at, lang)} · {t.pied}
            </Text>
          </Container>
        </Container>
      </Body>
    </Html>
  )
}

export const rendezVousMeta = (payload: NetlifyPayload) => {
  const d = payload.data
  const lang = resolveLang(d) as Lang
  const t = L[lang]
  const mal = aMal(getString(d, "douleur"))
  return {
    to: DESTINATAIRE_RENDEZ_VOUS,
    subject: `[${t.sujet}${mal ? " · douleur" : ""}] ${getString(d, "creneauLibelle")} — ${getString(d, "nom")}`,
    replyTo: getString(d, "courriel") || undefined,
    isUrgent: mal,
  }
}

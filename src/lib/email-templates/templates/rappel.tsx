import * as React from "react"
import { Body, Container, Head, Html, Preview, Section, Row, Column, Text } from "@react-email/components"
import { formatDate, getString, resolveLang } from "../theme"
import { DESTINATAIRE } from "../destinataire"
import type { NetlifyPayload } from "../types"

/* --------------------------------------------------------------------------
 * Demande de rappel pour un rendez-vous (maquette v2).
 *
 * La personne n'a pas choisi d'heure : elle a laissé ses coordonnées et une
 * préférence. Le courriel est donc fait pour qu'on décroche le téléphone — le
 * numéro en gros, la préférence de jour et de moment juste à côté, et le reste
 * en dessous.
 * ----------------------------------------------------------------------- */

const PAPIER = "#F5F0E6"
const ENCRE = "#291B2E"
const ENCRE_DOUCE = "#5E4A63"
const FILET = "#DCD2C4"

type Lang = "fr" | "en"

const L = {
  fr: {
    titre: "DEMANDE DE RAPPEL",
    telephone: "À RAPPELER AU",
    courriel: "COURRIEL",
    motif: "MOTIF",
    couverture: "COUVERTURE",
    premiereVisite: "PREMIÈRE VISITE",
    jour: "JOUR SOUHAITÉ",
    moment: "MOMENT SOUHAITÉ",
    aFaire: "À FAIRE À LA RÉCEPTION",
    actions: [
      "Rappeler pendant les heures d'ouverture pour fixer la date et l'heure.",
      "Vérifier la couverture annoncée et prévoir la carte à la première visite.",
      "Inscrire le rendez-vous à l'agenda du studio une fois l'heure convenue.",
    ],
    recuLe: "Reçu le",
    pied: "Formulaire de rappel du site · Aucun renseignement de santé n'est demandé en ligne.",
    sujet: "Rappel",
    nonPrecise: "Non précisé",
  },
  en: {
    titre: "CALLBACK REQUEST",
    telephone: "CALL BACK AT",
    courriel: "EMAIL",
    motif: "REASON",
    couverture: "COVERAGE",
    premiereVisite: "FIRST VISIT",
    jour: "PREFERRED DAY",
    moment: "PREFERRED TIME",
    aFaire: "FOR RECEPTION TO DO",
    actions: [
      "Call back during opening hours to set the date and time.",
      "Check the coverage given and plan for the card at the first visit.",
      "Enter the appointment in the studio calendar once the time is agreed.",
    ],
    recuLe: "Received on",
    pied: "Website callback form · No health information is requested online.",
    sujet: "Callback",
    nonPrecise: "Not specified",
  },
}

function Paire({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Column style={{ width: "50%", verticalAlign: "top", paddingRight: "12px", paddingBottom: "14px" }}>
      <Text style={{ margin: "0 0 3px", fontSize: "10px", letterSpacing: "0.16em", color: ENCRE_DOUCE }}>{label}</Text>
      <Text style={{ margin: 0, fontSize: "14px", lineHeight: "1.45", color: ENCRE }}>{value}</Text>
    </Column>
  )
}

export function RappelEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const lang = resolveLang(d) as Lang
  const t = L[lang]
  const g = (k: string) => getString(d, k)

  const champs: [string, string][] = (
    [
      [t.motif, g("motif")],
      [t.couverture, g("couverture")],
      [t.premiereVisite, g("premiereVisite")],
      [t.courriel, g("courriel")],
      [t.jour, g("jour")],
      [t.moment, g("moment")],
    ] as [string, string][]
  ).filter(([, v]) => v)

  return (
    <Html lang={lang}>
      <Head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Preview>{`${g("nom")} — ${g("telephone")} — ${g("motif")}`}</Preview>
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
                {t.telephone}
              </Text>
              <Text style={{ margin: 0, fontSize: "22px", fontWeight: 600, color: ENCRE }}>
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

            <Section style={{ marginTop: "16px", backgroundColor: "#EDE4DA", padding: "20px 20px 8px" }}>
              <Text
                style={{ margin: "0 0 14px", fontSize: "10px", letterSpacing: "0.16em", fontWeight: 700, color: ENCRE }}
              >
                {t.aFaire}
              </Text>
              {t.actions.map((a) => (
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

export const rappelMeta = (payload: NetlifyPayload) => {
  const d = payload.data
  const lang = resolveLang(d) as Lang
  const t = L[lang]
  return {
    to: DESTINATAIRE,
    subject: `[${t.sujet}] ${getString(d, "nom")} — ${getString(d, "motif")}`,
    replyTo: getString(d, "courriel") || undefined,
  }
}

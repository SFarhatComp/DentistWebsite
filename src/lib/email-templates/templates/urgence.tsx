import * as React from "react"
import { Body, Container, Head, Html, Preview, Section, Row, Column, Text } from "@react-email/components"
import { formatDate, getString, resolveLang } from "../theme"
import { DESTINATAIRE_RENDEZ_VOUS } from "../destinataire"
import type { NetlifyPayload } from "../types"

/* --------------------------------------------------------------------------
 * Demande d'urgence envoyée depuis le site (maquette v2).
 *
 * Le formulaire est à embranchements : seules les réponses de la branche
 * choisie sont transmises. Le rapport n'affiche donc que ce qui a été demandé,
 * plutôt qu'une grille de champs vides.
 *
 * La priorité est calculée ici et placée dans l'objet du courriel : la
 * réception doit pouvoir trier sans ouvrir.
 * ----------------------------------------------------------------------- */

const PAPIER = "#F2E7E4"
const ENCRE = "#1A1A18"
const ENCRE_DOUCE = "#5A544F"
const FILET = "#D8CBC6"

type Lang = "fr" | "en"

const L = {
  fr: {
    titre: "DEMANDE D'URGENCE",
    type: "TYPE DE SITUATION",
    telephone: "TÉLÉPHONE",
    courriel: "COURRIEL",
    ou: "OÙ",
    cote: "CÔTÉ",
    intensite: "INTENSITÉ",
    depuis: "DEPUIS",
    declencheurs: "DÉCLENCHEURS",
    quelleDent: "QUELLE DENT",
    mal: "DOULEUR",
    morceau: "MORCEAU GARDÉ",
    bord: "BORD COUPANT",
    fievre: "FIÈVRE",
    protheseType: "TYPE DE PROTHÈSE",
    protheseProbleme: "PROBLÈME",
    description: "DESCRIPTION",
    consentement: "FRAIS ACCEPTÉS",
    aFaire: "À FAIRE À LA RÉCEPTION",
    recuLe: "Reçu le",
    pied: "Formulaire d'urgence du site · Aucune donnée clinique détaillée n'est collectée en ligne.",
    sujet: "Urgence",
    nonPrecise: "Non précisé",
  },
  en: {
    titre: "EMERGENCY REQUEST",
    type: "TYPE OF SITUATION",
    telephone: "PHONE",
    courriel: "EMAIL",
    ou: "WHERE",
    cote: "SIDE",
    intensite: "INTENSITY",
    depuis: "SINCE",
    declencheurs: "TRIGGERS",
    quelleDent: "WHICH TOOTH",
    mal: "PAIN",
    morceau: "PIECE KEPT",
    bord: "SHARP EDGE",
    fievre: "FEVER",
    protheseType: "TYPE OF DENTURE",
    protheseProbleme: "PROBLEM",
    description: "DESCRIPTION",
    consentement: "FEES ACCEPTED",
    aFaire: "FOR RECEPTION TO DO",
    recuLe: "Received on",
    pied: "Website emergency form · No detailed clinical data is collected online.",
    sujet: "Emergency",
    nonPrecise: "Not specified",
  },
}

const TYPES: Record<string, { fr: string; en: string }> = {
  douleur: { fr: "Douleur", en: "Pain" },
  cassee: { fr: "Dent cassée", en: "Broken tooth" },
  enflure: { fr: "Enflure", en: "Swelling" },
  prothese: { fr: "Prothèse", en: "Denture" },
  autre: { fr: "Autre", en: "Other" },
}

/**
 * Priorité de rappel.
 *
 * Une enflure avec fièvre, ou une douleur décrite comme forte ou insupportable,
 * remonte en tête : ce sont les deux situations où attendre coûte le plus cher.
 */
function priorite(d: Record<string, string | string[] | undefined>, lang: Lang) {
  const g = (k: string) => getString(d, k)
  const type = g("type")
  const intensite = g("intensite").toLowerCase()
  const fievre = g("fievre").toLowerCase()
  const forte = /insupportable|forte|unbearable|severe/.test(intensite)
  const avecFievre = /oui|yes/.test(fievre)

  if ((type === "enflure" && avecFievre) || (type === "douleur" && forte)) {
    return { label: lang === "fr" ? "PRIORITÉ — RAPPELER EN PREMIER" : "PRIORITY — CALL FIRST", ton: "#7A3E52" }
  }
  if (type === "enflure" || type === "douleur" || type === "cassee") {
    return { label: lang === "fr" ? "À RAPPELER AUJOURD'HUI" : "CALL BACK TODAY", ton: "#B5793D" }
  }
  return { label: lang === "fr" ? "RAPPEL RÉGULIER" : "REGULAR CALLBACK", ton: "#4B463F" }
}

function actions(d: Record<string, string | string[] | undefined>, lang: Lang): string[] {
  const g = (k: string) => getString(d, k)
  const fr = lang === "fr"
  const out: string[] = [
    fr
      ? "Rappeler la personne pour comprendre la situation et fixer une heure."
      : "Call the person back to understand the situation and set a time.",
    fr
      ? "Rappeler que la venue n'est confirmée qu'après cet appel."
      : "Remind them that the visit is confirmed only after this call.",
  ]
  if (g("type") === "enflure") {
    out.push(
      fr
        ? "Vérifier au téléphone la respiration, la déglutition et l'ouverture de la bouche — si l'un des trois est atteint, diriger vers l'urgence hospitalière."
        : "Check breathing, swallowing and mouth opening by phone — if any is affected, direct to the hospital emergency department."
    )
  }
  out.push(
    fr
      ? "Prévoir l'examen d'urgence (61 $) et la radiographie périapicale (44 $) si nécessaire."
      : "Plan for the emergency examination ($61) and the periapical radiograph ($44) if needed."
  )
  return out
}

function Paire({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Column style={{ width: "50%", verticalAlign: "top", paddingRight: "12px", paddingBottom: "14px" }}>
      <Text style={{ margin: "0 0 3px", fontSize: "10px", letterSpacing: "0.16em", color: ENCRE_DOUCE }}>
        {label}
      </Text>
      <Text style={{ margin: 0, fontSize: "14px", lineHeight: "1.45", color: ENCRE }}>{value}</Text>
    </Column>
  )
}

export function UrgenceEmail({ payload }: { payload: NetlifyPayload }) {
  const d = payload.data
  const lang = resolveLang(d) as Lang
  const t = L[lang]
  const g = (k: string) => getString(d, k)

  const type = g("type")
  const typeLabel = TYPES[type]?.[lang] ?? type ?? t.nonPrecise
  const p = priorite(d, lang)

  // On ne retient que les champs effectivement remplis : le formulaire est à
  // embranchements, afficher les autres n'apporterait que du vide.
  const champs: [string, string][] = (
    [
      [t.ou, g("ou")],
      [t.cote, g("cote")],
      [t.intensite, g("intensite")],
      [t.depuis, g("depuis")],
      [t.declencheurs, g("declencheurs")],
      [t.quelleDent, g("quelleDent")],
      [t.mal, g("mal")],
      [t.morceau, g("morceau")],
      [t.bord, g("bord")],
      [t.fievre, g("fievre")],
      [t.protheseType, g("protheseType")],
      [t.protheseProbleme, g("protheseProbleme")],
    ] as [string, string][]
  ).filter(([, v]) => v)

  const description = g("description")

  return (
    <Html lang={lang}>
      <Head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Preview>{`${p.label} — ${g("nom")} — ${typeLabel}`}</Preview>
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
            <Row>
              <Column style={{ verticalAlign: "top" }}>
                <Text style={{ margin: "0 0 6px", fontSize: "10px", letterSpacing: "0.2em", color: ENCRE_DOUCE }}>
                  {t.titre}
                </Text>
                <Text style={{ margin: 0, fontSize: "26px", lineHeight: "1.15", fontWeight: 600, color: ENCRE }}>
                  {g("nom")}
                </Text>
                <Text style={{ margin: "6px 0 0", fontSize: "13px", color: ENCRE_DOUCE }}>{typeLabel}</Text>
              </Column>
              <Column style={{ verticalAlign: "top", textAlign: "right", width: "210px" }}>
                <Text
                  style={{
                    display: "inline-block",
                    margin: 0,
                    padding: "8px 12px",
                    backgroundColor: p.ton,
                    color: "#FFFFFF",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                  }}
                >
                  {p.label}
                </Text>
              </Column>
            </Row>

            <Section style={{ borderTop: `1px solid ${FILET}`, marginTop: "22px", paddingTop: "20px" }}>
              <Row>
                <Paire label={t.telephone} value={g("telephone") || t.nonPrecise} />
                <Paire label={t.courriel} value={g("courriel") || t.nonPrecise} />
              </Row>
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

            {description && (
              <Section style={{ borderTop: `1px solid ${FILET}`, paddingTop: "18px" }}>
                <Text style={{ margin: "0 0 6px", fontSize: "10px", letterSpacing: "0.16em", color: ENCRE_DOUCE }}>
                  {t.description}
                </Text>
                <Text style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", whiteSpace: "pre-wrap", color: ENCRE }}>
                  {description}
                </Text>
              </Section>
            )}

            <Section style={{ marginTop: "22px", backgroundColor: "#EDE4DA", padding: "20px 20px 8px" }}>
              <Text style={{ margin: "0 0 14px", fontSize: "10px", letterSpacing: "0.16em", fontWeight: 700, color: ENCRE }}>
                {t.aFaire}
              </Text>
              {actions(d, lang).map((a) => (
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

export const urgenceMeta = (payload: NetlifyPayload) => {
  const d = payload.data
  const lang = resolveLang(d) as Lang
  const t = L[lang]
  const p = priorite(d, lang)
  const typeLabel = TYPES[getString(d, "type")]?.[lang] ?? getString(d, "type")
  return {
    to: DESTINATAIRE_RENDEZ_VOUS,
    subject: `[${p.label}] ${t.sujet} — ${getString(d, "nom")} — ${typeLabel}`,
    replyTo: getString(d, "courriel") || undefined,
    isUrgent: p.ton === "#7A3E52",
  }
}

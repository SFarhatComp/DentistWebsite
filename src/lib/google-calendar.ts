import { createSign } from "node:crypto"

/* --------------------------------------------------------------------------
 * Lecture des periodes occupees de l agenda Google de la direction.
 *
 * On passe par un compte de service et l API FreeBusy, pas par l adresse iCal
 * privee de l agenda. Deux raisons :
 *
 *  - le flux iCal est mis en cache par Google et peut retarder de plusieurs
 *    heures, ce qui est trop pour afficher des disponibilites ;
 *  - il livre les recurrences sous forme de lignes RRULE brutes. Un bloc
 *    hebdomadaire ressortirait donc comme libre, faute d un moteur de
 *    recurrence cote site. FreeBusy, lui, developpe les recurrences.
 *
 * FreeBusy ne renvoie que des intervalles : ni titre, ni invite, ni
 * description. L agenda de la direction contient des rendez-vous nominatifs,
 * donc des renseignements personnels de sante ; ce point d entree ne peut pas
 * les divulguer meme si quelqu un appelle l API directement.
 * ----------------------------------------------------------------------- */

const SCOPE = "https://www.googleapis.com/auth/calendar.readonly"

interface Creds {
  email: string
  cle: string
  agenda: string
}

export function lireCreds(): Creds | null {
  const email = process.env.GOOGLE_SA_EMAIL
  const cle = process.env.GOOGLE_SA_PRIVATE_KEY
  const agenda = process.env.GOOGLE_CALENDAR_ID
  if (!email || !cle || !agenda) return null
  // Les variables d environnement Netlify gardent les sauts de ligne sous la
  // forme \n litteral : sans cette reprise, la cle est refusee par OpenSSL.
  return { email, cle: cle.replace(/\n/g, "\n"), agenda }
}

function b64url(s: string | Buffer): string {
  return Buffer.from(s).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

/** Echange un JWT signe contre un jeton d acces (flux « two-legged OAuth »). */
async function jeton(c: Creds): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const entete = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  const corps = b64url(
    JSON.stringify({
      iss: c.email,
      scope: SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  )
  const sign = createSign("RSA-SHA256")
  sign.update(`${entete}.${corps}`)
  const signature = b64url(sign.sign(c.cle))

  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${entete}.${corps}.${signature}`,
    }),
  })
  if (!r.ok) throw new Error(`jeton refuse (${r.status})`)
  const j = (await r.json()) as { access_token?: string }
  if (!j.access_token) throw new Error("jeton absent de la reponse")
  return j.access_token
}

/** Intervalles occupes entre deux instants. Rien d autre n est demande. */
export async function periodesOccupees(debut: Date, fin: Date): Promise<{ start: string; end: string }[]> {
  const c = lireCreds()
  if (!c) throw new Error("agenda non configure")
  const t = await jeton(c)

  const r = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      timeMin: debut.toISOString(),
      timeMax: fin.toISOString(),
      items: [{ id: c.agenda }],
    }),
  })
  if (!r.ok) throw new Error(`freeBusy a repondu ${r.status}`)

  const j = (await r.json()) as {
    calendars?: Record<string, { busy?: { start: string; end: string }[]; errors?: { reason: string }[] }>
  }
  const cal = j.calendars?.[c.agenda]
  if (cal?.errors?.length) {
    // Le cas courant : l agenda n a pas ete partage avec le compte de service.
    throw new Error(`agenda inaccessible (${cal.errors.map((e) => e.reason).join(", ")})`)
  }
  return cal?.busy ?? []
}

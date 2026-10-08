import { NextResponse, type NextRequest } from "next/server"
import { fr } from "@/content/fr"
import { isLocale, type Locale } from "@/lib/i18n-config"
import { mailConfigured, sendMail } from "@/lib/mailer"
import { href, type PageKey } from "@/lib/routes"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Réception des trois formulaires du site (rendez-vous, contact, urgence).
 * Envoi direct par SMTP à la boîte du studio, puis redirection 303 vers /merci.
 * Rien n'est conservé ni journalisé, sauf le type de formulaire et le code
 * d'erreur (cahier 8.6). Protection : origine, champ piège, délai minimal de
 * remplissage et limite d'envois par adresse IP (cahier 8.14).
 */

type Kind = "rendezvous" | "contact" | "urgence"
const KINDS: Kind[] = ["rendezvous", "contact", "urgence"]
const PAGE_OF: Record<Kind, PageKey> = { rendezvous: "booking", contact: "contact", urgence: "emergency" }

// Limite d'envois : 5 par adresse IP par 10 minutes (par instance de fonction).
const WINDOW = 10 * 60 * 1000
const MAX = 5
const hits = new Map<string, number[]>()
function limited(ip: string): boolean {
  const now = Date.now()
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW)
  list.push(now)
  hits.set(ip, list)
  if (hits.size > 5000) hits.clear()
  return list.length > MAX
}

const str = (v: FormDataEntryValue | null, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "")
const oneOf = (v: string, allowed: string[]) => (allowed.includes(v) ? v : "")
const EMAIL = /^[^\s@<>,;"]+@[^\s@<>,;"]+\.[^\s@<>,;"]{2,}$/
const validPhone = (p: string) => (p.match(/\d/g) || []).length >= 10 && /^[\d\s()+.\-]+$/.test(p)

const motifs = fr.home.bookingBar.motifs.map((m) => m.value).filter((v) => v !== "urgence")
const days = fr.home.bookingBar.days.map((m) => m.value)
const moments = fr.home.bookingBar.moments.map((m) => m.value)
const label = (list: { value: string; label: string }[], v: string) => list.find((m) => m.value === v)?.label || "—"

/** Redirection relative : ne dépend pas de l'hôte vu par le serveur. */
function redirect(path: string) {
  return new NextResponse(null, { status: 303, headers: { Location: path } })
}

function sameOrigin(req: NextRequest): boolean {
  if (req.headers.get("sec-fetch-site") === "cross-site") return false
  const origin = req.headers.get("origin")
  if (!origin) return true // anciens navigateurs : le champ piège et la limite restent actifs
  try {
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host")
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export async function GET() {
  return new NextResponse(null, { status: 404 })
}

export async function POST(req: NextRequest) {
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return new NextResponse(null, { status: 400 })
  }

  const kind = oneOf(str(form.get("kind"), 20), KINDS) as Kind | ""
  const langRaw = str(form.get("lang"), 2)
  const lang: Locale = isLocale(langRaw) ? langRaw : "fr"
  if (!kind) return new NextResponse(null, { status: 400 })

  const back = (code: string) => redirect(`${href(PAGE_OF[kind], lang)}?erreur=${code}#formulaire`)
  const thanks = () => redirect(`${href("thanks", lang)}?type=${kind}`)

  if (!sameOrigin(req)) return new NextResponse(null, { status: 403 })

  // Champ piège rempli : on fait comme si tout allait bien, sans rien envoyer.
  if (str(form.get("site_web"), 200)) return thanks()

  // Durée de remplissage mesurée dans le navigateur (absente sans script).
  // Trop rapide pour une personne : on demande de réessayer, sans faux succès.
  const duree = Number(str(form.get("duree"), 12))
  if (duree > 0 && duree < 2500) return back("champs")

  const ip = req.headers.get("x-nf-client-connection-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "?"
  if (limited(ip)) return back("limite")

  if (!mailConfigured()) {
    console.error(`[demande] ${kind} : SMTP non configuré`)
    return back("envoi")
  }

  const received = new Date().toLocaleString("fr-CA", { timeZone: "America/Toronto" })
  let subject = ""
  let text = ""
  let replyTo: string | undefined

  if (kind === "urgence") {
    // Contenu chiffré dans le navigateur avec la clé publique du studio : le
    // serveur ne voit jamais le texte et n'accepte rien d'autre.
    const pgp = str(form.get("pgp"), 20000)
    if (!pgp.startsWith("-----BEGIN PGP MESSAGE-----") || !pgp.includes("-----END PGP MESSAGE-----")) return back("champs")
    subject = "Demande d'urgence (site web) : à rappeler"
    text = `Demande d'urgence reçue le ${received} (${lang.toUpperCase()}).\nContenu chiffré : déchiffrer avec la clé privée du studio.\n\n${pgp}\n`
  } else {
    const name = str(form.get("nom"), 120)
    const phone = str(form.get("telephone"), 40)
    const email = str(form.get("courriel"), 200)
    if (email && !EMAIL.test(email)) return back("champs")
    if (email) replyTo = email

    if (kind === "rendezvous") {
      const first = oneOf(str(form.get("premiere"), 5), ["oui", "non"])
      const coverage = oneOf(str(form.get("couverture"), 40), fr.forms.coverageOptions)
      const motif = oneOf(str(form.get("motif"), 20), motifs)
      const day = oneOf(str(form.get("jour"), 20), days)
      const moment = oneOf(str(form.get("moment"), 20), moments)
      if (!name || !validPhone(phone) || !first || !coverage || !motif) return back("champs")
      // Le soir n'existe que le mercredi.
      if (moment === "soir" && day && day !== "mercredi") return back("champs")
      subject = "Demande de rendez-vous (site web)"
      text = [
        `Demande de rendez-vous reçue le ${received}.`,
        "",
        `Nom : ${name}`,
        `Téléphone : ${phone}`,
        `Courriel : ${email || "—"}`,
        `Première visite au studio : ${first}`,
        `Couverture : ${coverage}`,
        `Motif : ${label(fr.home.bookingBar.motifs, motif)}`,
        `Jour souhaité : ${day ? label(fr.home.bookingBar.days, day) : "peu importe"}`,
        `Moment souhaité : ${moment ? label(fr.home.bookingBar.moments, moment) : "peu importe"}`,
        `Langue du site : ${lang === "fr" ? "français" : "anglais"}`,
        "",
        "À faire : rappeler pour confirmer l'heure, puis inscrire le rendez-vous dans Dentitek et HORAIRE STUDIO.",
      ].join("\n")
    } else {
      const subjectChoice = oneOf(str(form.get("sujet"), 40), fr.forms.subjects)
      const message = str(form.get("message"), 3000)
      if (!name || !email || !subjectChoice || !message) return back("champs")
      if (phone && !validPhone(phone)) return back("champs")
      subject = `Message du site : ${subjectChoice}`
      text = [
        `Message reçu le ${received}.`,
        "",
        `Nom : ${name}`,
        `Courriel : ${email}`,
        `Téléphone : ${phone || "—"}`,
        `Sujet : ${subjectChoice}`,
        `Langue du site : ${lang === "fr" ? "français" : "anglais"}`,
        "",
        message,
      ].join("\n")
    }
  }

  try {
    await sendMail({ subject, text, replyTo })
  } catch (e) {
    console.error(`[demande] ${kind} : échec d'envoi (${(e as { code?: string })?.code || "inconnu"})`)
    return back("envoi")
  }
  return thanks()
}

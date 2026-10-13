import { NextResponse } from "next/server"
import { DUREES, FUSEAU, plagesLibres, type Plage } from "@/lib/disponibilites"
import { lireCreds, periodesOccupees } from "@/lib/google-calendar"

/* --------------------------------------------------------------------------
 * Plages proposables pour une demande de rendez-vous.
 *
 * Trois etats de reponse, et l interface doit savoir lequel elle a :
 *
 *   source: "agenda"   les plages tiennent compte de l agenda reel ;
 *   source: "horaires" l agenda n est pas configure ou n a pas repondu, on
 *                      retombe sur les heures d ouverture seules.
 *
 * Dans le second cas les plages restent utiles — une demande est de toute
 * facon confirmee par telephone — mais l interface doit le dire, sinon on
 * promet un creneau deja pris.
 *
 * Aucun detail d evenement ne sort d ici : voir lib/google-calendar.ts.
 * ----------------------------------------------------------------------- */

export const dynamic = "force-dynamic"

const JOURS = 21

export async function GET(req: Request) {
  const url = new URL(req.url)
  // En minuscules : la cle vient de l'interface et doit correspondre a
  // DUREES, dont les cles sont toutes en minuscules avec trait d'union.
  const motif = (url.searchParams.get("motif") || "autre").toLowerCase()
  const duree = DUREES[motif] ?? DUREES.autre

  const debut = new Date()
  const fin = new Date(Date.now() + (JOURS + 1) * 86400000)

  let occupees: { start: string; end: string }[] = []
  let source: "agenda" | "horaires" = "horaires"
  let motifRepli: string | undefined

  if (lireCreds()) {
    try {
      occupees = await periodesOccupees(debut, fin)
      source = "agenda"
    } catch (e) {
      // On n expose pas le detail de l erreur au visiteur, mais on la journalise :
      // un agenda non partage avec le compte de service est silencieux autrement.
      console.error("[disponibilites] agenda illisible :", e)
      motifRepli = "agenda-illisible"
    }
  } else {
    motifRepli = "non-configure"
  }

  const plages: Plage[] = plagesLibres(occupees, duree, JOURS)

  // Regroupees par jour : c est ainsi que l interface les affiche, et cela
  // evite au client de refaire la conversion de fuseau.
  const parJour = new Map<string, Plage[]>()
  for (const p of plages) {
    const cle = new Intl.DateTimeFormat("en-CA", {
      timeZone: FUSEAU,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(p.debut))
    const liste = parJour.get(cle) ?? []
    liste.push(p)
    parJour.set(cle, liste)
  }

  return NextResponse.json(
    {
      source,
      motifRepli,
      motif,
      duree,
      fuseau: FUSEAU,
      jours: [...parJour.entries()].map(([date, creneaux]) => ({ date, creneaux })),
    },
    { headers: { "Cache-Control": "private, max-age=60" } }
  )
}

/* --------------------------------------------------------------------------
 * Calcul des plages libres du studio.
 *
 * Les heures d'ouverture sont celles de la maquette : lundi et mardi 10 h – 18 h,
 * mercredi 15 h – 20 h. Jeudi et vendredi ne sont pas encore ouverts.
 *
 * Tout est calculé en heure de Montréal. L'agenda Google de la direction a UTC
 * comme fuseau par défaut alors que ses événements portent America/Toronto :
 * s'en remettre au fuseau du calendrier décalerait les plages de quatre à cinq
 * heures selon la saison.
 * ----------------------------------------------------------------------- */

export const FUSEAU = "America/Toronto"

/** Heures d'ouverture par jour de semaine (0 = dimanche). */
const OUVERTURE: Record<number, { debut: number; fin: number } | null> = {
  0: null,
  1: { debut: 10, fin: 18 },
  2: { debut: 10, fin: 18 },
  3: { debut: 15, fin: 20 },
  4: null,
  5: null,
  6: null,
}

/**
 * Durée d'un rendez-vous, en minutes, selon le motif déclaré.
 *
 * Ces durées doivent correspondre au tableau publié sur la page rendez-vous :
 * c'est la même promesse, faite deux fois. Si la plage réservée est plus
 * courte que la durée annoncée, la journée du studio ne tombe plus juste.
 */
export const DUREES: Record<string, number> = {
  examen: 60,
  "examen-nettoyage": 90,
  nettoyage: 60,
  urgence: 30,
  consultation: 30,
  prothese: 60,
  reparation: 45,
  autre: 45,
}

export interface Plage {
  /** Début, en ISO 8601 avec décalage. */
  debut: string
  fin: string
  /** Libellé lisible, déjà en heure de Montréal. */
  libelle: string
}

/** Décalage de Montréal par rapport à UTC, en minutes, à une date donnée. */
function decalageMinutes(d: Date): number {
  // On lit l'heure locale de Montréal via Intl, puis on mesure l'écart avec UTC.
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: FUSEAU,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
  const p = Object.fromEntries(fmt.formatToParts(d).map((x) => [x.type, x.value]))
  const local = Date.UTC(
    Number(p.year),
    Number(p.month) - 1,
    Number(p.day),
    Number(p.hour === "24" ? "0" : p.hour),
    Number(p.minute),
    Number(p.second)
  )
  return (local - d.getTime()) / 60000
}

/** Construit un instant à partir d'une heure locale de Montréal. */
function instantMontreal(annee: number, mois: number, jour: number, heure: number, minute: number): Date {
  // Première approximation en UTC, puis correction par le décalage réel —
  // deux passes suffisent, y compris les jours de changement d'heure.
  let d = new Date(Date.UTC(annee, mois, jour, heure, minute))
  for (let i = 0; i < 2; i++) {
    const dec = decalageMinutes(d)
    d = new Date(Date.UTC(annee, mois, jour, heure, minute) - dec * 60000)
  }
  return d
}

/** Jour de la semaine à Montréal (0 = dimanche). */
function jourSemaineMontreal(d: Date): number {
  const nom = new Intl.DateTimeFormat("en-US", { timeZone: FUSEAU, weekday: "short" }).format(d)
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(nom)
}

function libelle(d: Date): string {
  return new Intl.DateTimeFormat("fr-CA", {
    timeZone: FUSEAU,
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d)
}

/**
 * Découpe les heures d'ouverture en plages de `duree` minutes, sur `jours`
 * jours à partir de demain, puis retire celles qui chevauchent une occupation.
 *
 * `pas` est l'écart entre deux débuts proposés, et non la durée : à 15 minutes
 * on obtenait plus de deux cents boutons sur trois semaines, ce qui ne se
 * choisit pas. Une demi-heure couvre la journée sans la hacher.
 *
 * `occupees` vient de l'API FreeBusy : des intervalles, sans détail — on n'a
 * besoin de rien d'autre, et surtout pas du contenu des rendez-vous.
 */
export function plagesLibres(
  occupees: { start: string; end: string }[],
  duree: number,
  jours = 21,
  pas = 30
): Plage[] {
  const occ = occupees.map((o) => ({ d: new Date(o.start).getTime(), f: new Date(o.end).getTime() }))
  const out: Plage[] = []
  const maintenant = Date.now()

  for (let i = 1; i <= jours; i++) {
    const repere = new Date(maintenant + i * 86400000)
    const jour = jourSemaineMontreal(repere)
    const h = OUVERTURE[jour]
    if (!h) continue

    const parts = Object.fromEntries(
      new Intl.DateTimeFormat("en-CA", { timeZone: FUSEAU, year: "numeric", month: "2-digit", day: "2-digit" })
        .formatToParts(repere)
        .map((x) => [x.type, x.value])
    )
    const [A, M, J] = [Number(parts.year), Number(parts.month) - 1, Number(parts.day)]

    const ouverture = instantMontreal(A, M, J, h.debut, 0).getTime()
    const fermeture = instantMontreal(A, M, J, h.fin, 0).getTime()

    for (let t = ouverture; t + duree * 60000 <= fermeture; t += pas * 60000) {
      const fin = t + duree * 60000
      const chevauche = occ.some((o) => t < o.f && fin > o.d)
      if (chevauche) continue
      out.push({ debut: new Date(t).toISOString(), fin: new Date(fin).toISOString(), libelle: libelle(new Date(t)) })
    }
  }
  return out
}

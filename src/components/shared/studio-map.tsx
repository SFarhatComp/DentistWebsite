/**
 * Carte du studio — Google Maps.
 *
 * Embarquée par iframe sans clé d'API : la forme `?q=…&output=embed` est celle
 * que Google expose publiquement. `loading="lazy"` évite de charger la carte
 * tant qu'elle n'approche pas du viewport, ce qui compte sur l'accueil où elle
 * se trouve tout en bas.
 *
 * L'adresse est en dur plutôt qu'issue des traductions : c'est la même dans les
 * deux langues, et une coquille de traduction enverrait les patients ailleurs.
 */
const ADRESSE = "728 rue Fleury Est, Montréal, QC"
const SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADRESSE)}&output=embed`

export function StudioMap({ title, className = "w-full h-full min-h-[380px]" }: { title: string; className?: string }) {
  return (
    <iframe
      src={SRC}
      className={`${className} border-0`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={title}
    />
  )
}

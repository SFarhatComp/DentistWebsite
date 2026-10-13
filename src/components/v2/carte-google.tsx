/**
 * La carte du studio.
 *
 * Elle se charge avec la page : quelqu'un qui cherche comment venir ne devrait
 * pas avoir un clic de plus à faire pour voir où c'est.
 *
 * Google dépose des témoins dès ce chargement. La mention sous la carte le dit
 * — c'est ce qu'exige la Loi 25, et elle compte davantage maintenant que la
 * carte s'affiche sans qu'on l'ait demandé.
 *
 * Le lien « Itinéraire » reste à côté : la carte intégrée montre l'endroit, lui
 * ouvre la navigation dans l'application de la personne.
 */
export function CarteGoogle({
  note,
  itineraire,
  titreCadre,
}: {
  note: string
  itineraire: string
  titreCadre: string
}) {
  const ADRESSE = "728 rue Fleury Est, Montréal, QC H2C 1P1"
  const lienMaps = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADRESSE)}`
  const lienCadre = `https://www.google.com/maps?q=${encodeURIComponent(ADRESSE)}&z=16&output=embed`

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-plum">
        <iframe
          src={lienCadre}
          title={titreCadre}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="m-0 max-w-[52ch] text-[15px] text-foreground/70">{note}</p>
        <a
          href={lienMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap font-medium text-primary underline-offset-4 hover:underline"
        >
          {itineraire} →
        </a>
      </div>
    </div>
  )
}

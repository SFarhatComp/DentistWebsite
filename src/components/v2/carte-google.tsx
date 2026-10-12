"use client"

import { useState } from "react"

/**
 * La carte, chargée seulement si on la demande.
 *
 * Tant qu'on ne clique pas, aucune requête ne part vers Google : pas de
 * témoin déposé, rien à déclarer. C'est ce que demande la maquette, et c'est
 * aussi ce qui évite de faire porter au visiteur un pistage qu'il n'a pas
 * choisi pour la seule raison qu'il cherchait une adresse.
 *
 * Le lien « Itinéraire » reste utile sans la carte : il ouvre Google Maps dans
 * un onglet, où la personne décide elle-même.
 */
export function CarteGoogle({
  bouton,
  note,
  itineraire,
  titreCadre,
}: {
  bouton: string
  note: string
  itineraire: string
  titreCadre: string
}) {
  const [affichee, setAffichee] = useState(false)

  const ADRESSE = "728 rue Fleury Est, Montréal, QC H2C 1P1"
  const lienMaps = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADRESSE)}`
  const lienCadre = `https://www.google.com/maps?q=${encodeURIComponent(ADRESSE)}&output=embed`

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-plum">
        {affichee ? (
          <iframe
            src={lienCadre}
            title={titreCadre}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <button
              type="button"
              onClick={() => setAffichee(true)}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-sm border-0 bg-primary px-[26px] text-base font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              {bouton}
            </button>
            <a
              href={lienMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/85 underline-offset-4 hover:text-white"
            >
              {itineraire}
            </a>
          </div>
        )}
      </div>
      <p className="mt-3 text-[15px] text-foreground/70">{note}</p>
    </div>
  )
}

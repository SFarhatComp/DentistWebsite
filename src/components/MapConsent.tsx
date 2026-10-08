"use client"

import { useState } from "react"
import { facts } from "@/lib/facts"
import { Photo } from "./Photo"

/**
 * Carte Google chargée seulement après un clic (cahier 2.7, Loi 25) : rien de
 * Google n'est demandé avant. Le lien d'itinéraire reste toujours disponible.
 */
export function MapConsent({
  t,
}: {
  t: { show: string; directions: string; consent: string; iframeTitle: string; alt: string }
}) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-aub-soft sm:aspect-[16/10]">
        {show ? (
          <iframe
            title={t.iframeTitle}
            src={facts.mapsEmbed}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <>
            <Photo name="entree" alt={t.alt} sizes="(min-width: 1024px) 50vw, 100vw" className="absolute inset-0" position="50% 35%" />
            <div className="absolute inset-0 bg-gradient-to-t from-aub-deep/85 via-aub-deep/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-3 p-5">
              <button type="button" className="btn btn-primary" onClick={() => setShow(true)}>
                {t.show}
              </button>
              <a href={facts.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                {t.directions}
              </a>
            </div>
          </>
        )}
      </div>
      <p className="mt-3 text-[15px] text-aub/70">{t.consent}</p>
      {show && (
        <a href={facts.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow mt-2">
          {t.directions} →
        </a>
      )}
    </div>
  )
}

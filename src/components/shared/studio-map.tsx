"use client"
import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"

// Coordonnées exactes du studio — 728 rue Fleury Est, Montréal (OpenStreetMap).
const STUDIO: [number, number] = [45.5560771, -73.6600516]

/**
 * Carte du studio.
 *
 * Montée côté client uniquement : Leaflet touche `window` à l'import.
 * Le rendu sombre vient d'un filtre appliqué au seul `.leaflet-tile-pane`,
 * pour que le marqueur rose reste hors du filtre (handoff §5).
 *
 * L'attribution OpenStreetMap est une exigence de licence : ne jamais la retirer.
 */
export function StudioMap({ label = "728 FLEURY E." }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let map: import("leaflet").Map | undefined
    let cancelled = false

    import("leaflet").then((L) => {
      if (cancelled || !ref.current) return
      map = L.map(el, {
        center: STUDIO,
        zoom: 16,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: true,
      })
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map)
      L.marker(STUDIO, {
        keyboard: false,
        icon: L.divIcon({
          className: "",
          iconSize: [80, 46],
          iconAnchor: [40, 46],
          html: `<div class="df-pin"><b>${label}</b><i></i></div>`,
        }),
      }).addTo(map)
    })

    return () => {
      cancelled = true
      map?.remove()
    }
  }, [label])

  return (
    <div
      ref={ref}
      className="w-full h-full min-h-[380px] bg-surface-alt"
      role="img"
      aria-label="Carte — 728 rue Fleury Est, Ahuntsic, Montréal"
    />
  )
}

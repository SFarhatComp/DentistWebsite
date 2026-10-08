"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

/**
 * Apparition au défilement (lot 4.5). Tout est visible au premier rendu, avec
 * ou sans script. Après l'hydratation, ce composant marque d'abord ce qui est
 * déjà à l'écran (`is-in`), puis active le masquage (`reveal-ready`) pour ce qui
 * est plus bas : rien de visible ne disparaît, même un instant.
 */
export function Reveal() {
  const pathname = usePathname()
  useEffect(() => {
    const root = document.documentElement
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"))
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"))
      return
    }
    const below: HTMLElement[] = []
    for (const el of els) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) el.classList.add("is-in")
      else below.push(el)
    }
    root.classList.add("reveal-ready")
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    )
    below.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
  return null
}

import type { SVGProps } from "react"

/* --------------------------------------------------------------------------
 * Icones au trait de la maquette v2, extraites du fichier de reference.
 *
 * Toutes en 48 x 48, tracees en `currentColor` : elles prennent la couleur du
 * texte qui les entoure. Le libelle en commentaire est celui qui les
 * accompagnait dans la maquette — il sert a retrouver la bonne icone.
 * ----------------------------------------------------------------------- */

type Props = SVGProps<SVGSVGElement> & { taille?: number }

/** Urgence dentaire Douleur, dent */
export function Icone01({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><g transform="translate(14 8) scale(0.7)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g><path d="M3 12l7 3-4 3 7 3M3 28l7 3-4 3 7 3"></path></svg>
  )
}

/** 01 Communication */
export function Icone02({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 8h30a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H20l-8 7v-7H6a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z"></path><g transform="translate(10.2 10.2) scale(0.45)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g></svg>
  )
}

/** 02 Questionnaire médical et */
export function Icone03({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="7" width="30" height="36" rx="3"></rect><rect x="17" y="3" width="14" height="7" rx="2"></rect><path d="M15 20l3 3 5-5M15 32l3 3 5-5M28 21h5M28 33h5"></path></svg>
  )
}

/** 03 L'examen */
export function Icone04({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><g transform="translate(1 3) scale(0.72)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g><circle cx="34" cy="32" r="7"></circle><path d="M39 37l6 6"></path></svg>
  )
}

/** 04 Outils : radiographies, */
export function Icone05({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 14V8a4 4 0 0 1 4-4h6M34 4h6a4 4 0 0 1 4 4v6M44 34v6a4 4 0 0 1-4 4h-6M14 44H8a4 4 0 0 1-4-4v-6"></path><g transform="translate(10.8 10.8) scale(0.55)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g></svg>
  )
}

/** 05 Synthèse */
export function Icone06({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="6" width="40" height="28" rx="3"></rect><path d="M17 42h14M24 34v8M9 21h7l3-7 4 14 3-7h13"></path></svg>
  )
}

/** 06 Plan de traitement */
export function Icone07({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="9" width="38" height="34" rx="4"></rect><path d="M5 18h38M15 5v8M33 5v8"></path><g transform="translate(15.4 20.4) scale(0.36)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g></svg>
  )
}

/** RCSD : accepté. Apportez */
export function Icone08({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="10" width="40" height="28" rx="4"></rect><g transform="translate(8.8 14.8) scale(0.42)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g><path d="M26 19h12M26 25h12M26 31h7"></path></svg>
  )
}

/** RAMQ : plusieurs services */
export function Icone09({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4h17l9 9v31H12z"></path><path d="M29 4v9h9M25 20v12M19 26h12"></path></svg>
  )
}

/** Assurances privées : acceptées. */
export function Icone10({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M24 4l16 6v12c0 10-7 18-16 22-9-4-16-12-16-22V10z"></path><g transform="translate(14.4 12.4) scale(0.4)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g></svg>
  )
}

/** Paiement : comptant, débit */
export function Icone11({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 14l21-8 3 8"></path><rect x="5" y="14" width="38" height="28" rx="4"></rect><path d="M43 23h-8a5 5 0 0 0 0 10h8"></path><path d="M35 28h.01" strokeWidth="3.5"></path></svg>
  )
}

/** Financement : offert par */
export function Icone12({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="18" cy="30" r="13"></circle><path d="M22 25c-1-2-8-2-8 1.5s8 2 8 5.5-7 3.5-8 1M18 21v18"></path><g transform="translate(26 2) scale(0.45)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g></svg>
  )
}

/** Examen */
export function Icone13({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><g transform="translate(1 3) scale(0.72)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g><circle cx="34" cy="32" r="7"></circle><path d="M39 37l6 6"></path></svg>
  )
}

/** Nettoyage */
export function Icone14({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 41l16-16"></path><path d="M21 23l13-13a3.5 3.5 0 0 1 5 5L26 28z"></path><path d="M25 17l-4-4M29 13l-4-4M33 9l-4-4M40 31v8M36 35h8"></path></svg>
  )
}

/** Obturation */
export function Icone15({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12c1 3 3 5 5 5s4-2 5-5" fill="currentColor" fillOpacity="0.18"></path><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z"></path></svg>
  )
}

/** Traitement de canal */
export function Icone16({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z"></path><path d="M17 22c3-3 11-3 14 0M17 22l-1 14M31 22l1 14"></path></svg>
  )
}

/** Gencives */
export function Icone17({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z"></path><path d="M2 28c5-3 9 3 14 0s9-3 14 0 9 3 14 0"></path></svg>
  )
}

/** Extraction */
export function Icone18({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><g transform="translate(2 14) scale(0.66)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g><path d="M38 22V4M33 9l5-5 5 5"></path></svg>
  )
}

/** Couronne */
export function Icone19({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 31c0 6 2 12 5 12 2 0 3-4 4-4s2 4 4 4c3 0 5-6 5-12v-3c0-2-3-3-9-3s-9 1-9 3z"></path><path d="M10 20c0-9 5-15 14-15s14 6 14 15c0 1-1 2-2 2H12c-1 0-2-1-2-2z" fill="currentColor" fillOpacity="0.18"></path></svg>
  )
}

/** Pont */
export function Icone20({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 18h38"></path><g transform="translate(-1.4 10) scale(0.4)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g><g transform="translate(14.6 10) scale(0.4)"><path d="M14 6c-5 0-8 4-8 10 0 2 .3 4 1 6 5 2 11 3 17 3s12-1 17-3c.7-2 1-4 1-6 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke" fill="currentColor" fillOpacity="0.18"></path></g><g transform="translate(30.6 10) scale(0.4)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g></svg>
  )
}

/** Implant */
export function Icone21({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 4h20c3 0 5 3 4 6l-2 7H12l-2-7c-1-3 1-6 4-6z" fill="currentColor" fillOpacity="0.18"></path><path d="M20 17v5h8v-5M17 22h14l-2 17-5 5-5-5zM17 27h14M18 32h12M19 37h10"></path></svg>
  )
}

/** Prothèses */
export function Icone22({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 16c6-5 32-5 38 0v6c-6 3-32 3-38 0z" fill="currentColor" fillOpacity="0.18"></path><rect x="9" y="22" width="7" height="12" rx="3"></rect><rect x="17" y="23" width="7" height="13" rx="3"></rect><rect x="25" y="23" width="7" height="13" rx="3"></rect><rect x="33" y="22" width="7" height="12" rx="3"></rect></svg>
  )
}

/** Gouttières */
export function Icone23({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 14c0 16 7 28 17 28s17-12 17-28M15 14c0 10 4 20 9 20s9-10 9-20M7 14h8M33 14h8"></path></svg>
  )
}

/** Blanchiment */
export function Icone24({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><g transform="translate(2 8) scale(0.72)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g><path d="M39 3v8M35 7h8M41 17v6M38 20h6"></path></svg>
  )
}

/** Examen régulier */
export function Icone25({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><g transform="translate(2 2) scale(0.62)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g><circle cx="35" cy="35" r="9"></circle><path d="M35 30v5l3 3"></path></svg>
  )
}

/** Brosse à dents */
export function Icone26({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 41l16-16"></path><path d="M21 23l13-13a3.5 3.5 0 0 1 5 5L26 28z"></path><path d="M25 17l-4-4M29 13l-4-4M33 9l-4-4M40 31v8M36 35h8"></path></svg>
  )
}

/** Soie dentaire */
export function Icone27({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 42l14-14M22 28l2-15M22 28l15-2M24 13l13 13"></path></svg>
  )
}

/** Brossettes */
export function Icone28({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 42l14-14M20 28l20-20M27 15l6 6M31 11l6 6M35 7l5 5"></path></svg>
  )
}

/** Fromage après le repas */
export function Icone29({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 38L36 16l7 6v16z"></path><path d="M5 38h38"></path><circle cx="25" cy="31" r="2.5"></circle><circle cx="35" cy="28" r="1.5"></circle></svg>
  )
}

/** Gouttière de fluor */
export function Icone30({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><g transform="translate(2 6) scale(0.6)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g><path d="M38 18l7 3v6c0 5-3 9-7 11-4-2-7-6-7-11v-6z"></path><path d="M35 28l2 2 4-4"></path></svg>
  )
}

/** Incrustation Répare une partie */
export function Icone31({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 11c1-3 4-5 7-5 4 0 6 2 10 2s6-2 10-2c3 0 6 2 7 5-4 4-10 6-17 6S11 15 7 11z" fill="currentColor" fillOpacity="0.18"></path><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z"></path></svg>
  )
}

/** Couronne Recouvre toute la */
export function Icone32({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 31c0 6 2 12 5 12 2 0 3-4 4-4s2 4 4 4c3 0 5-6 5-12v-3c0-2-3-3-9-3s-9 1-9 3z"></path><path d="M10 20c0-9 5-15 14-15s14 6 14 15c0 1-1 2-2 2H12c-1 0-2-1-2-2z" fill="currentColor" fillOpacity="0.18"></path></svg>
  )
}

/** Pont Remplace une dent */
export function Icone33({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 18h38"></path><g transform="translate(-1.4 10) scale(0.4)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g><g transform="translate(14.6 10) scale(0.4)"><path d="M14 6c-5 0-8 4-8 10 0 2 .3 4 1 6 5 2 11 3 17 3s12-1 17-3c.7-2 1-4 1-6 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke" fill="currentColor" fillOpacity="0.18"></path></g><g transform="translate(30.6 10) scale(0.4)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g></svg>
  )
}

/** Douleur */
export function Icone34({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="29" cy="24" r="15"></circle><path d="M23 20l3 2-3 2M35 20l-3 2 3 2M24 32c3-3 7-3 10 0M2 12l7 2-4 3 7 2M2 30l7 2-4 3 7 2"></path></svg>
  )
}

/** Dent fracturée */
export function Icone35({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z"></path><path d="M25 8l-4 9 6 5-4 9"></path></svg>
  )
}

/** Enflure */
export function Icone36({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 6C13 6 7 13 7 23c0 9 6 17 15 17 6 0 10-3 13-6 5-1 8-5 7-10-1-4-4-6-8-6-2-7-7-12-12-12z"></path><path d="M14 20l4 1M24 21l4-1M16 31c2-2 6-2 8 0"></path><path d="M36 21c2 1 3 3 3 5"></path></svg>
  )
}

/** Dent délogée après un */
export function Icone37({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><g transform="rotate(-18 24 24)"><g transform="translate(7 7) scale(0.68)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g></g><path d="M37 7c3 2 5 5 5 9M41 4c3 3 5 6 5 10"></path></svg>
  )
}

/** Couronne ou obturation décollée */
export function Icone38({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 30c0 6 2 13 5 13 2 0 3-5 6-5s4 5 6 5c3 0 5-7 5-13z"></path><path d="M11 21c0-9 5-14 13-14s13 5 13 14z" fill="currentColor" fillOpacity="0.18"></path></svg>
  )
}

/** Prothèse cassée */
export function Icone39({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 16c6-5 32-5 38 0v6c-6 3-32 3-38 0z"></path><rect x="9" y="22" width="7" height="12" rx="3"></rect><rect x="17" y="23" width="7" height="13" rx="3"></rect><rect x="25" y="23" width="7" height="13" rx="3"></rect><rect x="33" y="22" width="7" height="12" rx="3"></rect><path d="M25 6l-3 7 4 4-3 7"></path></svg>
  )
}

/** Saignement */
export function Icone40({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><g transform="translate(1 1) scale(0.72)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g><path d="M37 25c-4 6-6 9-6 12a6 6 0 0 0 12 0c0-3-2-6-6-12z" fill="currentColor" fillOpacity="0.18"></path></svg>
  )
}

/** Facette */
export function Icone41({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6h16c2 0 3 2 3 4l-2 12c-1 8-4 13-7 20h-4c-3-7-6-12-7-20L6 10c0-2 1-4 3-4z"></path><path d="M26 9h10c3 0 4 2 4 4l-2 11c-1 6-3 10-5 14" fill="currentColor" fillOpacity="0.18"></path><path d="M26 9c3 8 3 19-2 29"></path><path d="M38 40l4 3M41 36l4 1"></path></svg>
  )
}

/** Prothèse partielle amovible */
export function Icone42({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 30V17c0-4 2-6 5-6s5 2 5 6v13M44 30V17c0-4-2-6-5-6s-5 2-5 6v13"></path><path d="M14 19c3 0 5 2 5 5M34 19c-3 0-5 2-5 5"></path><rect x="15" y="28" width="18" height="9" rx="4" fill="currentColor" fillOpacity="0.18"></rect><rect x="17" y="15" width="6" height="13" rx="3"></rect><rect x="25" y="15" width="6" height="13" rx="3"></rect><path d="M9 34c0 5 3 8 6 8h18c3 0 6-3 6-8"></path></svg>
  )
}

/** Scanner intra-oral */
export function Icone43({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 36l18-18a4 4 0 0 1 6 0 4 4 0 0 1 0 6L14 42a4 4 0 0 1-6 0 4 4 0 0 1 0-6z"></path><path d="M30 18l6-6a3 3 0 0 1 4 4l-6 6M41 5l3-2M43 10h4"></path></svg>
  )
}

/** Conception E */
export function Icone44({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="6" width="40" height="28" rx="3"></rect><path d="M17 42h14M24 34v8"></path><g transform="translate(14 8) scale(0.5)"><path d="M14 6c-5 0-8 4-8 10 0 5 2 8 3 13 1 6 2 13 5 13 3 0 3-6 5-10 1-2 2-3 5-3s4 1 5 3c2 4 2 10 5 10 3 0 4-7 5-13 1-5 3-8 3-13 0-6-3-10-8-10-4 0-6 2-10 2s-6-2-10-2z" vectorEffect="non-scaling-stroke"></path></g></svg>
  )
}

/** Impression 3D */
export function Icone45({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="6" y="4" width="36" height="40" rx="3"></rect><path d="M6 12h36M20 12v5h8v-5M22 17l2 3 2-3M12 38h24M17 38v-8h14v8"></path></svg>
  )
}

/** Fraiseuse VH */
export function Icone46({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="17" y="4" width="14" height="14" rx="2"></rect><path d="M21 18v6h6v-6M24 24v8"></path><rect x="8" y="34" width="32" height="9" rx="2"></rect></svg>
  )
}

/** Fours et presse */
export function Icone47({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 42V24a16 16 0 0 1 32 0v18z"></path><path d="M4 42h40M19 35c0-4 4-4 4-8M27 35c0-4 4-4 4-8"></path></svg>
  )
}

/** En autobus La ligne */
export function Icone48({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="5" width="30" height="34" rx="5"></rect><path d="M9 25h30M9 14h30M15 39v4M33 39v4"></path><path d="M15 32h.01M33 32h.01" strokeWidth="3.5"></path></svg>
  )
}

/** En métro Stations Sauvé */
export function Icone49({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="11" y="5" width="26" height="32" rx="8"></rect><path d="M11 22h26M17 37l-5 6M31 37l5 6"></path><path d="M18 29h.01M30 29h.01" strokeWidth="3.5"></path></svg>
  )
}

/** En voiture À environ */
export function Icone50({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 30l4-12a4 4 0 0 1 4-3h20a4 4 0 0 1 4 3l4 12v8H6z"></path><path d="M6 30h36M12 38v4M36 38v4"></path><path d="M13 34h.01M35 34h.01" strokeWidth="3.5"></path></svg>
  )
}

/** Stationnement Dans la rue, */
export function Icone51({ taille = 32, ...props }: Props) {
  return (
    <svg {...props} width={taille} height={taille} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="6" y="6" width="36" height="36" rx="6"></rect><path d="M19 35V14h7a6 6 0 0 1 0 12h-7"></path></svg>
  )
}


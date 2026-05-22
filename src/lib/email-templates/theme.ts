/**
 * Design tokens shared across all email templates.
 * Mirrors globals.css HSL but expressed as hex for email-client compatibility.
 */

export const colors = {
  // Surfaces
  bg: "#FFFFFF", // page background — pure white for crisp modern feel
  surfaceMuted: "#FAF7F0", // subtle warm panel
  surface: "#F5F0E6", // brand cream — used very sparingly

  // Text
  text: "#1A1717", // deep black
  textMuted: "#6E6864",
  textSubtle: "#8C837A",

  // Brand
  primary: "#3A2438", // aubergine — for branding accents
  accent: "#C56A2A", // burnt orange — used ONLY for primary CTAs and highlights

  // Functional
  borderSubtle: "#EEE7DC",
  borderStrong: "#1A1717",

  // Alert states
  alertBg: "#FEF2F2",
  alertBorder: "#FCA5A5",
  alertText: "#B91C1C",
  alertStrong: "#7F1D1D",

  // Success / info
  successBg: "#F0FDF4",
  successText: "#166534",
} as const

export const fonts = {
  display: '"Cormorant Garamond", "Times New Roman", Georgia, serif',
  body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
} as const

export const fontSizes = {
  hero: "32px",
  h1: "24px",
  h2: "18px",
  body: "15px",
  small: "13px",
  micro: "11px",
} as const

export const spacing = {
  xs: "8px",
  sm: "16px",
  md: "24px",
  lg: "32px",
  xl: "48px",
  xxl: "64px",
} as const

export type EmailLang = "fr" | "en"

/** Resolve a payload's lang field to a supported language; defaults to "fr". */
export function resolveLang(data: Record<string, unknown>): EmailLang {
  const v = data["lang"]
  if (typeof v === "string" && v.toLowerCase() === "en") return "en"
  return "fr"
}

/** Format Netlify timestamp into "15 mai 2026 à 16 h 43" (fr) or "May 15, 2026, 4:43 PM" (en) */
export function formatDate(iso: string | undefined, lang: EmailLang = "fr"): string {
  try {
    const d = iso ? new Date(iso) : new Date()
    const locale = lang === "en" ? "en-CA" : "fr-CA"
    return d.toLocaleString(locale, {
      timeZone: "America/Montreal",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return iso || ""
  }
}

/** Safe getter for form data */
export function getString(data: Record<string, unknown>, key: string): string {
  const v = data[key]
  if (typeof v === "string") return v
  if (Array.isArray(v)) return v.join(", ")
  return ""
}

/** Robust boolean check for checkbox values */
export function isChecked(data: Record<string, unknown>, key: string): boolean {
  const v = data[key]
  if (v === undefined || v === null || v === "" || v === false || v === 0) return false
  return Boolean(v)
}

/** Get yes/no value from radio */
export function getYn(data: Record<string, unknown>, key: string): "yes" | "no" | "" {
  const v = data[key]
  if (v === undefined || v === null) return ""
  const s = String(v).toLowerCase()
  if (s === "yes" || s === "oui") return "yes"
  if (s === "no" || s === "non") return "no"
  return ""
}

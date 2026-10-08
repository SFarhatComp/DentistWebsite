export const i18n = { defaultLocale: "fr", locales: ["fr", "en"] as const } as const
export type Locale = (typeof i18n.locales)[number]
export function isLocale(v: string): v is Locale {
  return (i18n.locales as readonly string[]).includes(v)
}

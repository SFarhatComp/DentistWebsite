import fr from "@/locales/fr/common.json"
import en from "@/locales/en/common.json"
import type { Locale } from "@/types"

const dictionaries = { fr, en }

function resolve(lang: Locale, key: string): unknown {
  const dict = dictionaries[lang] || dictionaries.fr
  return key.split(".").reduce<unknown>((acc, k) => {
    if (acc && typeof acc === "object" && k in acc) return (acc as Record<string, unknown>)[k]
    return undefined
  }, dict)
}

export function getTranslations(lang: Locale) {
  return (key: string): string => {
    const result = resolve(lang, key)
    return typeof result === "string" ? result : key
  }
}

/** Retourne un tableau de chaînes pour les clés stockées en array dans common.json. */
export function getTranslationList(lang: Locale, key: string): string[] {
  const result = resolve(lang, key)
  if (Array.isArray(result) && result.every((v) => typeof v === "string")) return result as string[]
  return []
}

/** Retourne un tableau d'objets (typé) pour les clés array-of-objects dans common.json. */
export function getTranslationObjectList<T>(lang: Locale, key: string): T[] {
  const result = resolve(lang, key)
  if (Array.isArray(result)) return result as T[]
  return []
}

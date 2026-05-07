import fr from "@/locales/fr/common.json"
import en from "@/locales/en/common.json"
import type { Locale } from "@/types"

const dictionaries = { fr, en }

export function getTranslations(lang: Locale) {
  const dict = dictionaries[lang] || dictionaries.fr
  return (key: string): string => {
    const result = key.split(".").reduce<unknown>((acc, k) => {
      if (acc && typeof acc === "object" && k in acc) return (acc as Record<string, unknown>)[k]
      return undefined
    }, dict)
    return typeof result === "string" ? result : key
  }
}

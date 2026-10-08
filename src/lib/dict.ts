import { fr, type Dict } from "@/content/fr"
import { en } from "@/content/en"
import type { Locale } from "./i18n-config"

const dicts: Record<Locale, Dict> = { fr, en }

export function getDict(lang: Locale): Dict {
  return dicts[lang]
}

export type { Dict }

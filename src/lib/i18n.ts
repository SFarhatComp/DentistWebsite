import type { Locale, TranslationKeys } from '@/types'

export const locales: Locale[] = ['en', 'fr']
export const defaultLocale: Locale = 'en'

// Import locale files directly
import enCommon from '../locales/en/common.json'
import frCommon from '../locales/fr/common.json'

const translations: Record<Locale, TranslationKeys> = {
  en: enCommon as TranslationKeys,
  fr: frCommon as TranslationKeys,
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: TranslationKeys, path: string): string {
  const keys = path.split('.')
  let current: TranslationKeys | string = obj
  
  for (const key of keys) {
    if (typeof current === 'string') return path
    if (current[key] === undefined) return path
    current = current[key] as TranslationKeys | string
  }
  
  return typeof current === 'string' ? current : path
}

/**
 * Translation function
 * Usage: t('nav.home') => 'Home' or 'Accueil'
 */
export function getTranslations(locale: Locale) {
  const localeTranslations = translations[locale] || translations[defaultLocale]
  
  return function t(key: string, replacements?: Record<string, string>): string {
    let value = getNestedValue(localeTranslations, key)
    
    // Handle replacements like {name}
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        value = value.replace(new RegExp(`{${k}}`, 'g'), v)
      })
    }
    
    return value
  }
}

/**
 * Get all translations for a locale
 */
export function getDictionary(locale: Locale): TranslationKeys {
  return translations[locale] || translations[defaultLocale]
}

/**
 * Check if locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

/**
 * Get browser's preferred locale
 */
export function getBrowserLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale
  
  const browserLang = navigator.language.split('-')[0]
  return isValidLocale(browserLang) ? browserLang : defaultLocale
}

/**
 * Format date based on locale
 */
export function formatDate(date: string, locale: Locale): string {
  return new Date(date).toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

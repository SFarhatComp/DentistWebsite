import type { Locale } from '@/types'

export const i18nConfig = {
  defaultLocale: 'en' as Locale,
  locales: ['en', 'fr'] as Locale[],
}

export function generateStaticParams() {
  return i18nConfig.locales.map((lang) => ({ lang }))
}

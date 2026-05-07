import Link from "next/link"
import { Container } from "./container"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function Footer({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  return (
    <footer className="border-t border-border bg-surface/50 mt-32">
      <Container>
        <div className="py-16 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-2xl text-primary mb-4">De Facto Studio Dentaire</div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">{t("footer.tagline")}</p>
          </div>
          <div>
            <div className="label-sm text-foreground mb-4">{t("footer.coordonnees")}</div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>728 rue Fleury Est</li>
              <li>Montréal, QC</li>
              <li><a href="tel:" className="hover:text-primary">{t("contact.phonePlaceholder")}</a></li>
              <li><a href="mailto:" className="hover:text-primary">{t("contact.emailPlaceholder")}</a></li>
            </ul>
          </div>
          <div>
            <div className="label-sm text-foreground mb-4">{t("footer.liens")}</div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><Link href={`/${lang}/services`} className="hover:text-primary">{t("nav.services")}</Link></li>
              <li><Link href={`/${lang}/rendez-vous`} className="hover:text-primary">{t("nav.cta")}</Link></li>
              <li><Link href={`/${lang}/contact`} className="hover:text-primary">{t("nav.contact")}</Link></li>
              <li><Link href={`/${lang}/politique-confidentialite`} className="hover:text-primary">{t("footer.confidentialite")}</Link></li>
              <li><Link href={`/${lang}/conditions-utilisation`} className="hover:text-primary">{t("footer.conditions")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-6 text-xs text-muted-foreground">© {new Date().getFullYear()} De Facto Studio Dentaire</div>
      </Container>
    </footer>
  )
}

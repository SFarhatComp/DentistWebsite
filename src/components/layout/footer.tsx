import Link from "next/link"
import { Container } from "./container"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function Footer({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const phone = t("contact.phonePlaceholder")
  const phoneTel = t("contact.phoneTel")
  const email = t("contact.emailPlaceholder")

  return (
    <footer className="border-t border-border bg-surface/50 mt-32">
      <Container>
        <div className="py-16 grid gap-12 md:grid-cols-4">
          <div>
            <div className="font-display text-2xl text-primary mb-4">Studio Dentaire De Facto</div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t("footer.tagline")}</p>
            <div className="label-sm text-foreground mb-3">{t("footer.coordonnees")}</div>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>728 rue Fleury Est</li>
              <li>Montréal, QC</li>
              <li>
                <a href={`tel:${phoneTel}`} className="hover:text-primary">
                  {phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="hover:text-primary">
                  {email}
                </a>
              </li>
            </ul>
            <div className="label-sm text-foreground mt-6 mb-2">{t("footer.horaires")}</div>
            <p className="text-sm text-muted-foreground">{t("footer.horairesPlaceholder")}</p>
          </div>

          <div>
            <div className="label-sm text-foreground mb-4">{t("footer.liens")}</div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                <Link href={`/${lang}/rendez-vous`} className="hover:text-primary">
                  {t("footer.rendezVous")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/urgence`} className="hover:text-primary">
                  {t("footer.urgence")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/premiere-visite`} className="hover:text-primary">
                  {t("footer.premiereVisite")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-primary">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/laboratoire`} className="hover:text-primary">
                  {t("footer.laboratoire")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="label-sm text-foreground mb-4">{t("footer.secondaires")}</div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                <Link href={`/${lang}/le-studio`} className="hover:text-primary">
                  {t("nav.studio")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/ressources`} className="hover:text-primary">
                  {t("nav.ressources")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="hover:text-primary">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="label-sm text-foreground mb-4">Légal</div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                <Link href={`/${lang}/confidentialite`} className="hover:text-primary">
                  {t("footer.confidentialite")}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/conditions-utilisation`} className="hover:text-primary">
                  {t("footer.conditions")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground italic max-w-2xl leading-relaxed">{t("footer.mention")}</p>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Studio Dentaire De Facto</p>
        </div>
      </Container>
    </footer>
  )
}

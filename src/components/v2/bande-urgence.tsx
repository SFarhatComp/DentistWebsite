import Link from "next/link"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

/**
 * Bande « Urgence dentaire », reprise sur l'accueil et la page Services.
 *
 * Le numéro est un lien d'appel plutôt qu'un simple texte : sur téléphone,
 * c'est le geste que quelqu'un qui a mal cherche en premier.
 */
export function BandeUrgence({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] pb-24">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-sm bg-primary-soft p-[clamp(20px,3vw,32px)]">
          <div className="max-w-[62ch]">
            <p className="m-0 flex items-center gap-2.5 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-primary-hover">
              <span aria-hidden="true">▲</span>
              {t("urgence.bandeTitre")}
            </p>
            <p className="mt-3 text-[17px] leading-[1.6] text-foreground">
              {t("urgence.bandeTexte")}{" "}
              <a href={`tel:${t("contact.phoneTel")}`} className="font-medium text-primary-hover underline-offset-4">
                {t("contact.phoneDisplay")}
              </a>
              .
            </p>
          </div>
          <Link
            href={`/${lang}/urgence`}
            className="font-medium text-foreground underline-offset-4 hover:text-primary-hover"
          >
            {t("urgence.bandeLien")}
          </Link>
        </div>
      </div>
    </section>
  )
}

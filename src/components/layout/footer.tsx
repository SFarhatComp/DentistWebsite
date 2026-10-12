import Link from "next/link"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

/**
 * Pied de page de la maquette v2.
 *
 * Photo du couloir en fond à 35 %, voilée par un dégradé qui va du translucide
 * au prune plein : le texte reste lisible quelle que soit la zone de la photo.
 * Le panneau central est un verre dépoli posé par-dessus.
 *
 * Il porte aussi les mentions exigées par la Loi 25 : responsable de la
 * protection des renseignements personnels, et lien vers la page Accessibilité.
 */
export function Footer({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const autreLangue: Locale = lang === "fr" ? "en" : "fr"

  const liens = [
    { href: `/${lang}/services`, label: t("nav.services") },
    { href: `/${lang}/urgence`, label: t("nav.urgence") },
    { href: `/${lang}/rendez-vous`, label: t("nav.cta") },
    { href: `/${lang}/faq`, label: t("nav.faq") },
    { href: `/${lang}/confidentialite`, label: t("footer.confidentialite") },
    { href: `/${lang}/conditions-utilisation`, label: t("footer.conditions") },
    { href: `/${lang}/accessibilite`, label: t("footer.accessibilite") },
  ]

  return (
    <footer className="relative w-full overflow-hidden bg-plum-deep font-sans text-base leading-relaxed text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/v2/couloir.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--plum-deep) / .7) 0%, hsl(var(--plum-deep) / .82) 50%, hsl(var(--plum-deep)) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-[72px]">
        <div
          className="rounded-[4px] p-[clamp(24px,4vw,40px)] backdrop-blur-[22px]"
          style={{
            background: "linear-gradient(180deg, hsl(var(--plum-deep) / .55), hsl(var(--foreground) / .62))",
            boxShadow:
              "inset 1px 0 0 rgba(255,255,255,0.14), inset -1px 0 0 rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <div className="flex flex-wrap gap-10">
            <div className="flex flex-[1.3_1_300px] flex-col justify-center gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/v2/logo.svg"
                alt="Studio Dentaire De Facto"
                className="block h-[clamp(84px,9vw,120px)] w-auto max-w-full self-start"
              />
              <p className="m-0 font-display text-[clamp(32px,3.4vw,44px)] leading-[1.05]">
                {t("footer.signature1")}
                <br />
                {t("footer.signature2")}
              </p>
            </div>

            <div className="flex-[1_1_220px]">
              <p className="m-0 text-[13px] font-medium uppercase tracking-[0.16em] text-lavender">
                {t("footer.nousJoindre")}
              </p>
              <p className="mt-3.5">{t("contact.adresseComplete")}</p>
              <p className="mt-1">
                <a href={`tel:${t("contact.phoneTel")}`} className="text-white">
                  {t("contact.phoneDisplay")}
                </a>
              </p>
              <p className="mt-1">
                <a href={`mailto:${t("contact.courriel")}`} className="text-white">
                  {t("contact.courriel")}
                </a>
              </p>
              <p className="mt-[26px] text-[13px] font-medium uppercase tracking-[0.16em] text-lavender">
                {t("footer.heures")}
              </p>
              <p className="mt-3">
                {t("contact.heuresLundi")}
                <br />
                {t("contact.heuresMardi")}
                <br />
                {t("contact.heuresMercredi")}
                <br />
                {t("contact.heuresJeudiVendredi")}
              </p>
            </div>

            <div className="flex-[1_1_200px]">
              <p className="m-0 text-[13px] font-medium uppercase tracking-[0.16em] text-lavender">
                {t("footer.liens")}
              </p>
              <div className="mt-3.5 flex flex-col gap-1.5">
                {liens.map((l) => (
                  <Link key={l.href} href={l.href} className="text-white/90 no-underline hover:text-primary-pale">
                    {l.label}
                  </Link>
                ))}
                <Link
                  href={`/${autreLangue}`}
                  hrefLang={autreLangue}
                  lang={autreLangue}
                  className="text-white/90 no-underline hover:text-primary-pale"
                >
                  {autreLangue === "en" ? "English" : "Français"}
                </Link>
              </div>
            </div>
          </div>

          <div className="my-7 h-px bg-white/30" />

          <div className="flex flex-col gap-2 text-[15px] text-white/80">
            <p className="m-0">{t("footer.raisonSociale")}</p>
            <p className="m-0">{t("footer.responsableLoi25")}</p>
            <p className="m-0">{t("footer.avisClinique")}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

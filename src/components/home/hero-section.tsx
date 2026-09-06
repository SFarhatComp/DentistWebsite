import Link from "next/link"
import { FadeIn } from "@/components/motion/fade-in"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

export function HeroSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)

  return (
    <section className="relative isolate">
      {/* La photo reste décorative : le texte porte tout le sens, d'où alt="". */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/couloir.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        style={{ objectPosition: "50% 42%" }}
      />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background) / .5) 0%, hsl(var(--background) / .86) 62%, hsl(var(--background)) 100%)",
        }}
      />
      <div className="relative flex min-h-[560px] items-end px-6 pb-14 md:px-12">
        <FadeIn className="w-full">
          <div className="mx-auto w-full max-w-7xl">
            <div className="label-sm text-accent mb-5">{t("home.hero.label")}</div>
            <h1 className="font-display font-semibold text-[2.75rem] leading-[0.98] tracking-[-0.035em] md:text-[4.75rem] max-w-[20ch]">
              {t("home.hero.title")}
            </h1>
            <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-muted-foreground">
              {t("home.hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={`/${lang}/rendez-vous`}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-4 text-[15px] font-semibold transition-colors"
              >
                {t("home.hero.ctaPrimary")}
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={`/${lang}/le-studio`}
                className="inline-flex items-center border px-6 py-4 text-[15px] font-medium transition-colors hover:border-primary hover:text-primary"
                style={{ borderColor: "hsl(var(--foreground) / .34)" }}
              >
                {t("home.hero.ctaSecondary")}
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

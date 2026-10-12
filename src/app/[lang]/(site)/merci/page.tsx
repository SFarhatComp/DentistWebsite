import Link from "next/link"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return { title: { absolute: t("merci.title") }, robots: { index: false, follow: false } }
}

/**
 * Page d'accusé de réception, atteinte après l'envoi d'un formulaire.
 *
 * Elle porte le fond prune des héros et occupe la hauteur de l'écran : c'est
 * une page de fin, pas une page qu'on parcourt. Elle n'est pas indexée — elle
 * n'a de sens qu'au sortir d'un envoi.
 */
export default async function MerciPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  const t = getTranslations(lang)

  return (
    <section className="relative flex min-h-[680px] flex-col overflow-hidden bg-hero text-white">
      <div className="relative mx-auto mb-0 mt-auto w-full max-w-page px-[clamp(16px,5vw,56px)] pb-[72px] pt-[150px]">
        <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-surface-alt">
          [ {t("merci.label")} ]
        </p>
        <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(38px,5.6vw,68px)] font-semibold leading-[1.02]">
          {t("merci.title")}
        </h1>
        <p className="mt-6 max-w-[58ch] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-white/[0.88]">
          {t("merci.body")}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href={`/${lang}`}
            className="inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-[26px] text-base font-medium text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
          >
            {t("merci.backHome")}
          </Link>
          <a
            href="tel:+15148637805"
            className="inline-flex min-h-12 items-center justify-center rounded-sm px-[26px] text-base font-medium text-white no-underline shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] transition-colors hover:bg-white/10"
          >
            514 863-7805
          </a>
        </div>
      </div>
    </section>
  )
}

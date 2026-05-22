import Link from "next/link"
import { Container } from "@/components/layout/container"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const t = getTranslations(params.lang as Locale)
  return { title: t("merci.label"), robots: { index: false } }
}

export default async function MerciPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  return (
    <Container>
      <div className="py-32 max-w-2xl">
        <div className="label-sm text-accent mb-4">{t("merci.label")}</div>
        <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mb-6">
          {t("merci.title")}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          {t("merci.body")}
        </p>
        <Link href={`/${lang}`} className="text-primary hover:underline text-base">
          {t("merci.backHome")} →
        </Link>
      </div>
    </Container>
  )
}

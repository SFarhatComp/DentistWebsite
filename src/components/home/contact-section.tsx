import Link from "next/link"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { StudioMap } from "@/components/shared/studio-map"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

function Paire({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-4">
      <div className="text-[11px] tracking-[0.18em] text-accent">{label}</div>
      <div className="mt-2 text-[15px] leading-[1.5]">{children}</div>
    </div>
  )
}

export function ContactSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)

  return (
    <section className="px-6 py-[76px] md:px-12">
      <Container className="px-0">
        <div className="grid gap-14 md:grid-cols-2">
          <FadeIn>
            <SectionLabel>{t("home.contactSection.label")}</SectionLabel>
            <h2 className="font-display font-semibold text-3xl leading-[1.05] tracking-[-0.03em] md:text-[2.5rem]">
              {t("home.contactSection.titleLine1")}
              <br />
              {t("home.contactSection.titleLine2")}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Paire label={t("home.contactSection.telephoneLabel")}>
                <a
                  href={`tel:${t("contact.phoneTel")}`}
                  className="text-primary transition-colors hover:text-primary-hover"
                >
                  {t("contact.phoneDisplay")}
                </a>
              </Paire>
              <Paire label={t("home.contactSection.heuresLabel")}>
                {t("home.contactSection.heuresValue")}
              </Paire>
              <Paire label={t("home.contactSection.courrielLabel")}>
                <a
                  href={`mailto:${t("home.contactSection.courrielValue")}`}
                  className="transition-colors hover:text-primary"
                >
                  {t("home.contactSection.courrielValue")}
                </a>
              </Paire>
              <Paire label={t("home.contactSection.transportLabel")}>
                {t("home.contactSection.transportValue")}
              </Paire>
            </div>
            <Link
              href={`/${lang}/rendez-vous`}
              className="mt-10 inline-flex items-center gap-2 bg-primary px-6 py-4 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              {t("home.contactSection.cta")}
              <span aria-hidden="true">→</span>
            </Link>
          </FadeIn>
          <FadeIn direction="right">
            <div className="h-full min-h-[380px] border border-border">
              <StudioMap title={t("contact.mapTitle")} />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { getTranslations } from "@/lib/i18n"
import type { Service, Locale } from "@/types"
import { getAllServices } from "@/lib/content"

export function ServicePageTemplate({ service, lang }: { service: Service; lang: Locale }) {
  const t = getTranslations(lang)
  const allServices = getAllServices(lang)
  const related = (service.related || [])
    .map((slug) => allServices.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s))

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-surface/40">
        <Container>
          <div className="py-20 md:py-28 grid gap-12 md:grid-cols-2 items-end">
            <FadeIn>
              <SectionLabel>{t("servicePage.serviceLabel")}</SectionLabel>
              <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6">{service.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{service.shortDescription}</p>
            </FadeIn>
            <FadeIn direction="right">
              {service.heroImage ? (
                <div className="relative aspect-video overflow-hidden border border-border bg-surface">
                  <Image
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <PlaceholderImage aspect="video" />
              )}
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-16 md:grid-cols-3">
            <aside className="md:sticky md:top-24 self-start">
              <div className="label-sm text-muted-foreground mb-4">{t("servicePage.onThisPage")}</div>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li><a href="#consulter" className="hover:text-primary">{t("servicePage.consulterAnchor")}</a></li>
                <li><a href="#deroulement" className="hover:text-primary">{t("servicePage.deroulementAnchor")}</a></li>
                <li><a href="#options" className="hover:text-primary">{t("servicePage.optionsAnchor")}</a></li>
                <li><a href="#limites" className="hover:text-primary">{t("servicePage.limitesAnchor")}</a></li>
                <li><a href="#specialistes" className="hover:text-primary">{t("servicePage.specialistesAnchor")}</a></li>
                <li><a href="#apres" className="hover:text-primary">{t("servicePage.apresAnchor")}</a></li>
                <li><a href="#faq" className="hover:text-primary">{t("servicePage.faqAnchor")}</a></li>
              </ul>
            </aside>

            <div className="md:col-span-2 space-y-16">
              {service.content && (
                <FadeIn>
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{service.content.trim()}</p>
                </FadeIn>
              )}

              <FadeIn>
                <section id="consulter">
                  <SectionLabel>{t("servicePage.consulterLabel")}</SectionLabel>
                  <h2 className="font-display text-2xl md:text-3xl mb-6">{t("servicePage.consulterTitle")}</h2>
                  <ul className="space-y-3">
                    {service.whenToConsult?.map((item) => (
                      <li key={item} className="flex gap-3 text-base text-muted-foreground">
                        <span className="text-accent">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </FadeIn>

              <FadeIn>
                <section id="deroulement">
                  <SectionLabel>{t("servicePage.deroulementLabel")}</SectionLabel>
                  <h2 className="font-display text-2xl md:text-3xl mb-6">{t("servicePage.deroulementTitle")}</h2>
                  <ol className="space-y-4">
                    {service.treatmentSteps?.map((step, i) => (
                      <li key={step} className="flex gap-4 text-base text-muted-foreground">
                        <span className="font-display text-xl text-accent/70 min-w-[2rem]">0{i + 1}</span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              </FadeIn>

              <FadeIn>
                <section id="options">
                  <SectionLabel>{t("servicePage.optionsLabel")}</SectionLabel>
                  <h2 className="font-display text-2xl md:text-3xl mb-6">{t("servicePage.optionsTitle")}</h2>
                  <ul className="space-y-2 text-base text-muted-foreground">
                    {service.options?.map((opt) => (
                      <li key={opt} className="border-t border-border pt-3">{opt}</li>
                    ))}
                  </ul>
                </section>
              </FadeIn>

              <FadeIn>
                <section id="limites" className="bg-surface/50 p-8 md:p-10">
                  <SectionLabel>{t("servicePage.limitesLabel")}</SectionLabel>
                  <p className="text-base text-muted-foreground leading-relaxed">{service.limits}</p>
                </section>
              </FadeIn>

              <FadeIn>
                <section id="specialistes" className="border-l-2 border-accent/40 pl-6 md:pl-8">
                  <SectionLabel>{t("servicePage.specialistesLabel")}</SectionLabel>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {t("servicePage.specialistesBody")}
                  </p>
                </section>
              </FadeIn>

              <FadeIn>
                <section id="apres">
                  <SectionLabel>{t("servicePage.apresLabel")}</SectionLabel>
                  <h2 className="font-display text-2xl md:text-3xl mb-6">{t("servicePage.apresTitle")}</h2>
                  <p className="text-base text-muted-foreground leading-relaxed">{service.aftercare}</p>
                </section>
              </FadeIn>

              <FadeIn>
                <section id="faq">
                  <SectionLabel>{t("servicePage.faqLabel")}</SectionLabel>
                  <h2 className="font-display text-2xl md:text-3xl mb-8">{t("servicePage.faqTitle")}</h2>
                  <div className="space-y-6">
                    {service.faq?.map((q) => (
                      <div key={q.question} className="border-t border-border pt-5">
                        <h3 className="font-display text-lg mb-2">{q.question}</h3>
                        <p className="text-base text-muted-foreground leading-relaxed">{q.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <FadeIn className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-6">{t("servicePage.ctaTitle")}</h2>
            <p className="text-lg opacity-80 mb-8">{t("servicePage.ctaBody")}</p>
            <Link href={`/${lang}/rendez-vous`} className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3.5 text-sm font-medium tracking-wide">
              {t("servicePage.ctaButton")}
            </Link>
          </FadeIn>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 md:py-24">
          <Container>
            <SectionLabel>{t("servicePage.relatedLabel")}</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl mb-12">{t("servicePage.relatedTitle")}</h2>
            <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <Link key={s.slug} href={`/${lang}/soins/${s.slug}`} className="block bg-background p-8 hover:bg-surface/40 transition-colors">
                  <h3 className="font-display text-xl mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.shortDescription}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}

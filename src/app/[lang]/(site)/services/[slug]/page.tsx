import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Section, TitreSection } from "@/components/v2/section"
import { getAllServices, getService } from "@/lib/content"
import { getTranslations } from "@/lib/i18n"
import { i18n } from "@/lib/i18n-config"
import * as Ic from "@/components/v2/icones"
import type { Locale } from "@/types"

export function generateStaticParams() {
  return i18n.locales.flatMap((lang) =>
    getAllServices(lang as Locale).map((s) => ({ lang, slug: s.slug }))
  )
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await props.params
  const s = getService(lang as Locale, slug)
  if (!s) return {}
  return { title: s.title, description: s.shortDescription }
}

const ICONES_VARIANTES = [Ic.Icone31, Ic.Icone32, Ic.Icone33]

/**
 * Gabarit unique des 20 fiches de service.
 *
 * Les sections cliniques — quand consulter, comment ça se passe, FAQ — ne sont
 * rendues que si la fiche les porte. Onze fiches n'ont pour l'instant que leur
 * titre et leur description : elles affichent un en-tête, l'encadré « un examen
 * d'abord » et les services liés, sans section vide.
 */
export default async function FicheServicePage(props: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang: langParam, slug } = await props.params
  const lang = langParam as Locale
  const t = getTranslations(lang)
  const s = getService(lang, slug)
  if (!s) notFound()

  const tous = getAllServices(lang)
  const liees = (s.related ?? [])
    .map((r) => tous.find((x) => x.slug === r))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))

  return (
    <>
      {/* En-tête sombre : l'en-tête du site flotte par-dessus. */}
      <section className="relative flex min-h-[680px] flex-col overflow-hidden bg-hero text-white">
        <div className="mx-auto mb-0 mt-auto w-full max-w-page px-[clamp(16px,5vw,56px)] pb-[72px] pt-[150px]">
          <nav aria-label={t("fiche.filAriane")} className="flex flex-wrap gap-2 text-[13px] text-white/70">
            <Link href={`/${lang}`} className="text-white/70 no-underline hover:text-white">
              {t("fiche.accueil")}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${lang}/services`} className="text-white/70 no-underline hover:text-white">
              {t("nav.services")}
            </Link>
            <span aria-hidden="true">/</span>
          </nav>

          {s.surtitre && (
            <p className="mt-6 text-[13px] font-medium uppercase tracking-[0.16em] text-surface-alt">{s.surtitre}</p>
          )}
          <h1 className="mt-4 max-w-[22ch] font-display text-[clamp(38px,5.6vw,68px)] font-semibold leading-[1.02]">
            {s.title}
          </h1>
          <p className="mt-6 max-w-[64ch] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-white/[0.88]">
            {s.intro ?? s.shortDescription}
          </p>

          {s.variantes && s.variantes.length > 0 && (
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {s.variantes.map((v, i) => {
                const Icone = ICONES_VARIANTES[i]
                return (
                  <div key={v.nom} className="flex gap-3.5 border-t border-white/20 pt-5">
                    {Icone && <Icone taille={28} className="shrink-0 text-primary-pale" />}
                    <span>
                      <span className="block font-medium">{v.nom}</span>
                      <span className="mt-1 block text-[15px] text-white/75">{v.desc}</span>
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            {s.whenToConsult && s.whenToConsult.length > 0 && (
              <>
                <TitreSection>{t("fiche.quandConsulter")}</TitreSection>
                <ul className="m-0 mt-6 list-none p-0">
                  {s.whenToConsult.map((x) => (
                    <li key={x} className="flex gap-3 border-b border-border py-3.5 leading-relaxed">
                      <span aria-hidden="true" className="shrink-0 text-primary">
                        ☐
                      </span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {s.bonASavoir && (
              <div className="mt-12 rounded-sm bg-surface p-7">
                <h2 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">{t("fiche.bonASavoir")}</h2>
                <p className="mt-3 leading-relaxed text-foreground/80">{s.bonASavoir}</p>
              </div>
            )}

            {s.treatmentSteps && s.treatmentSteps.length > 0 && (
              <>
                <TitreSection className="mt-14">{t("fiche.commentCaSePasse")}</TitreSection>
                <ol className="m-0 mt-6 list-none p-0">
                  {s.treatmentSteps.map((x, i) => (
                    <li key={x} className="grid grid-cols-[48px_1fr] gap-4 border-b border-border py-5">
                      <span className="font-display text-[22px] leading-none text-primary" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-relaxed">{x}</span>
                    </li>
                  ))}
                </ol>
              </>
            )}

            {s.options && s.options.length > 0 && (
              <>
                <TitreSection className="mt-14">{t("fiche.options")}</TitreSection>
                <ul className="m-0 mt-6 flex list-none flex-col gap-2.5 p-0">
                  {s.options.map((x) => (
                    <li key={x} className="flex gap-2.5 leading-relaxed text-foreground/85">
                      <span aria-hidden="true" className="shrink-0 text-primary">
                        —
                      </span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {(s.limits || s.aftercare) && (
              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                {s.limits && (
                  <div className="border-t border-border pt-5">
                    <h3 className="font-medium">{t("fiche.limites")}</h3>
                    <p className="mt-2 leading-relaxed text-foreground/80">{s.limits}</p>
                  </div>
                )}
                {s.aftercare && (
                  <div className="border-t border-border pt-5">
                    <h3 className="font-medium">{t("fiche.apres")}</h3>
                    <p className="mt-2 leading-relaxed text-foreground/80">{s.aftercare}</p>
                  </div>
                )}
              </div>
            )}

            {s.faq && s.faq.length > 0 && (
              <>
                <TitreSection className="mt-14">{t("fiche.faq")}</TitreSection>
                <div className="mt-6">
                  {s.faq.map((q) => (
                    <details key={q.question} className="border-t border-border py-4">
                      <summary className="cursor-pointer list-none font-medium marker:hidden">
                        {q.question}
                      </summary>
                      <p className="mt-3 leading-relaxed text-foreground/80">{q.answer}</p>
                    </details>
                  ))}
                </div>
              </>
            )}

            <div className="mt-14 border-t border-border pt-6">
              <h2 className="m-0 font-display text-[22px]">{t("fiche.servicesLies")}</h2>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <Link href={`/${lang}/atelier`} className="font-medium underline-offset-4 hover:text-primary">
                  {t("fiche.lienAtelier")}
                </Link>
                {liees.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${lang}/services/${r.slug}`}
                    className="font-medium underline-offset-4 hover:text-primary"
                  >
                    {r.title} →
                  </Link>
                ))}
              </div>
            </div>

            <p className="mt-10 text-[15px] leading-relaxed text-muted-foreground">{t("fiche.avis")}</p>
          </div>

          {/* Encadré d'appel à l'action, collant sur grand écran */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm bg-plum-deep p-8 text-white">
              <p className="m-0 text-[13px] font-medium uppercase tracking-[0.16em] text-lavender">
                {t("fiche.encadreSurtitre")}
              </p>
              <p className="mt-4 font-display text-[27px] leading-[1.2]">{t("fiche.encadreTitre")}</p>
              <p className="mt-3 leading-relaxed text-white/80">{t("fiche.encadreTexte")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/${lang}/rendez-vous`}
                  className="inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-[22px] text-[15px] font-medium text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
                >
                  {t("nav.cta")}
                </Link>
                <a
                  href={`tel:${t("contact.phoneTel")}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-sm px-[22px] text-[15px] font-medium text-white no-underline shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]"
                >
                  {t("contact.phoneDisplay")}
                </a>
              </div>
              <p className="mt-7 border-t border-white/20 pt-5 text-[15px] text-white/80">
                {t("contact.adresseComplete")}
              </p>
              <p className="mt-3 text-[15px] text-white/80">
                {t("contact.heuresLundi")}
                <br />
                {t("contact.heuresMardi")}
                <br />
                {t("contact.heuresMercredi")}
                <br />
                {t("contact.heuresJeudiVendredi")}
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section fond="ivoire">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
            {t("servicesPage.ctaTitre1")}
            <br />
            {t("servicesPage.ctaTitre2")}
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/rendez-vous`}
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-[26px] text-base font-medium text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
            >
              {t("nav.cta")}
            </Link>
            <a
              href={`tel:${t("contact.phoneTel")}`}
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-foreground/30 px-[26px] text-base font-medium text-foreground no-underline transition-colors hover:border-primary hover:text-primary"
            >
              {t("servicesPage.ctaAppeler")}
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}

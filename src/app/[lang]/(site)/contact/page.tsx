import type { Metadata } from "next"
import { HeroPage } from "@/components/v2/hero-page"
import { CarteGoogle } from "@/components/v2/carte-google"
import * as Ic from "@/components/v2/icones"
import { ContactForm } from "@/components/forms/contact-form"
import { FormulaireRappel } from "@/components/v2/formulaire-rappel"
import { getTranslationObjectList, getTranslations } from "@/lib/i18n"
import { metaPage } from "@/lib/metadonnees"
import type { Locale } from "@/types"

interface Coordonnee {
  role: string
  valeur: string
  precision?: string
}
interface Heure {
  jour: string
  valeur: string
}
interface Venir {
  mode: string
  texte: string
}
interface Quartier {
  nom: string
  texte: string
}

/** Autobus, métro, voiture, stationnement — dans l'ordre de la maquette. */
const TRANSPORTS = [Ic.Icone48, Ic.Icone49, Ic.Icone50, Ic.Icone51]

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return metaPage(params.lang as Locale, "/contact", { titre: t("contactPage.metaTitre"), description: t("contactPage.metaDescription") })
}

export default async function ContactPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  const lang = params.lang as Locale
  const t = getTranslations(lang)

  const coordonnees = getTranslationObjectList<Coordonnee>(lang, "contactPage.coordonnees")
  const heures = getTranslationObjectList<Heure>(lang, "contactPage.heures")
  const venir = getTranslationObjectList<Venir>(lang, "contactPage.venir")
  const quartiers = getTranslationObjectList<Quartier>(lang, "contactPage.quartiers")

  /** Le téléphone et le courriel deviennent cliquables ; l'adresse, non. */
  const lien = (v: string) =>
    v.includes("@") ? `mailto:${v}` : /^\d/.test(v.replace(/\s/g, "")) ? `tel:+1${v.replace(/\D/g, "")}` : null

  return (
    <>
      <HeroPage
        lang={lang}
        surtitre={t("contactPage.surtitre")}
        titre={t("contactPage.titre")}
        intro={t("contactPage.intro")}
        hauteur={640}
      />

      <section className="bg-background">
        <div className="mx-auto flex max-w-page flex-wrap gap-16 px-[clamp(16px,5vw,56px)] py-24">
          <div className="flex-[0.9_1_380px]">
            <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
              {t("contactPage.coordonneesTitre")}
            </h2>

            {coordonnees.map((c) => {
              const href = lien(c.valeur)
              return (
                <div key={c.role} className="flex flex-wrap gap-x-6 gap-y-1 border-b border-foreground/[0.12] py-4">
                  <span className="min-w-[120px] text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-muted-foreground">
                    {c.role}
                  </span>
                  <span className="flex min-w-[240px] flex-col gap-0.5">
                    {href ? (
                      <a href={href} className="text-foreground no-underline hover:text-primary">
                        {c.valeur}
                      </a>
                    ) : (
                      <span>{c.valeur}</span>
                    )}
                    {c.precision && <span className="text-[15px] text-foreground/70">{c.precision}</span>}
                  </span>
                </div>
              )
            })}

            <p className="mt-10 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-muted-foreground">
              {t("contactPage.heuresTitre")}
            </p>
            {heures.map((h) => (
              <div
                key={h.jour}
                className="flex justify-between gap-6 border-b border-foreground/[0.12] py-4 last:border-0"
              >
                <span>{h.jour}</span>
                <span className="text-foreground/80">{h.valeur}</span>
              </div>
            ))}
            <p className="mt-3 text-[15px] text-foreground/70">{t("contactPage.heuresNote")}</p>
          </div>

          <div className="flex-[1.1_1_440px]">
            <CarteGoogle
              note={t("contactPage.carteNote")}
              itineraire={t("contactPage.carteItineraire")}
              titreCadre={t("contactPage.carteTitreCadre")}
            />
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-24">
          <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
            {t("contactPage.venirTitre")}
          </h2>
          <div className="mt-8 flex flex-col gap-5">
            {venir.map((v, i) => {
              const Icone = TRANSPORTS[i]
              return (
                <div key={v.mode} className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                  <strong className="flex min-w-[13ch] items-center gap-3 font-medium">
                    <span className="flex shrink-0 self-center text-muted-foreground" aria-hidden="true">
                      {Icone ? <Icone taille={28} /> : null}
                    </span>
                    {v.mode}
                  </strong>
                  <span className="flex-[1_1_260px] text-foreground/85">{v.texte}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-lavender-soft">
        <div className="mx-auto flex max-w-page flex-wrap gap-16 px-[clamp(16px,5vw,56px)] py-24">
          <div className="flex-[1_1_440px]">
            <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
              {t("contactPage.quartiersTitre")}
            </h2>
            <ul className="m-0 mt-6 flex list-none flex-col gap-3 p-0">
              {quartiers.map((q) => (
                <li key={q.nom} className="flex gap-3">
                  <span aria-hidden="true" className="shrink-0 text-primary">
                    —
                  </span>
                  <span>
                    <strong className="font-medium">{q.nom} :</strong> {q.texte}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* L'ancre sert le lien « Accessibilité » du pied de page : la maquette
              place ce texte ici plutôt que sur une page à part. */}
          <div id="accessibilite" className="flex-[1_1_340px] scroll-mt-28">
            <h2 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">
              {t("contactPage.accessibiliteTitre")}
            </h2>
            <p className="mt-3 text-foreground/85">{t("contactPage.accessibiliteTexte")}</p>
          </div>
        </div>
      </section>

      {/* Deux formulaires côte à côte : écrire au studio, ou demander qu'on
          rappelle pour un rendez-vous. Ils se partagent la largeur, ce qui
          évite la colonne de vide que laissait un formulaire seul. */}
      <section className="bg-background">
        <div className="mx-auto flex max-w-page flex-wrap items-start gap-x-16 gap-y-20 px-[clamp(16px,5vw,56px)] py-24">
          <div className="min-w-0 flex-[1_1_420px]">
            <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
              {t("contactPage.ecrireTitre")}
            </h2>
            <p className="mt-4 max-w-[52ch] text-foreground/85">{t("contactPage.ecrireTexte")}</p>
            <div className="mt-8">
              <ContactForm lang={lang} />
            </div>
          </div>

          <div id="rappel" className="min-w-0 flex-[1_1_420px] scroll-mt-28">
            <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
              {t("contactPage.rappelTitre")}
            </h2>
            <p className="mt-4 max-w-[52ch] text-foreground/85">{t("contactPage.rappelTexte")}</p>
            <div className="mt-8">
              <FormulaireRappel lang={lang} />
            </div>
            <p className="mt-5 text-[15px] text-foreground/75">
              {t("contactPage.rappelUrgenceAvant")}
              <a href="tel:+15148637805" className="text-primary no-underline hover:underline">
                514 863-7805
              </a>
              {t("contactPage.rappelUrgenceApres")}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from "next"
import { HeroPage } from "@/components/v2/hero-page"
import { CarteGoogle } from "@/components/v2/carte-google"
import { GrilleFilets, CaseFilets } from "@/components/v2/grille-filets"
import { ContactForm } from "@/components/forms/contact-form"
import { getTranslationObjectList, getTranslations } from "@/lib/i18n"
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

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params
  const t = getTranslations(params.lang as Locale)
  return { title: { absolute: t("contactPage.metaTitre") }, description: t("contactPage.metaDescription") }
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
              bouton={t("contactPage.carteBouton")}
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
          <GrilleFilets className="mt-10">
            {venir.map((v) => (
              <CaseFilets key={v.mode} base={260} fond="bg-surface">
                <h3 className="m-0 font-display text-[27px] font-semibold leading-[1.2]">{v.mode}</h3>
                <p className="mt-3 text-foreground/85">{v.texte}</p>
              </CaseFilets>
            ))}
          </GrilleFilets>
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

      <section className="bg-background">
        <div className="mx-auto max-w-page px-[clamp(16px,5vw,56px)] py-24">
          <h2 className="m-0 font-display text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.08]">
            {t("contactPage.ecrireTitre")}
          </h2>
          <div className="mt-8 max-w-[760px]">
            <ContactForm lang={lang} />
          </div>
        </div>
      </section>
    </>
  )
}

"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { getTranslationList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

/**
 * Mini-formulaire de réservation du plan d'ouverture.
 *
 * Il ne réserve rien : il porte les trois choix jusqu'à la page de rendez-vous,
 * en paramètres d'URL, pour que le questionnaire s'ouvre déjà orienté. La
 * réservation elle-même reste une demande que le studio confirme.
 */
export function ReservationRapide({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const router = useRouter()
  const motifs = getTranslationList(lang, "accueil.reservation.motifs")
  const jours = getTranslationList(lang, "accueil.reservation.jours")
  const moments = getTranslationList(lang, "accueil.reservation.moments")

  const [motif, setMotif] = useState(motifs[0] ?? "")
  const [jour, setJour] = useState(jours[0] ?? "")
  const [moment, setMoment] = useState(moments[0] ?? "")

  const champ =
    "mt-1.5 h-12 w-full rounded-sm border border-white/25 bg-white/[0.06] px-3.5 font-sans text-base text-white"
  const etiquette = "text-[13px] font-medium uppercase tracking-[0.16em] text-surface-alt"

  function envoyer(e: React.FormEvent) {
    e.preventDefault()
    const q = new URLSearchParams({ motif, jour, moment })
    router.push(`/${lang}/rendez-vous?${q.toString()}`)
  }

  return (
    <div className="relative mx-auto w-full max-w-page px-[clamp(16px,5vw,56px)] pb-10">
      <form
        onSubmit={envoyer}
        className="rounded-[4px] p-6 backdrop-blur-[22px]"
        style={{
          background: "linear-gradient(180deg, hsl(var(--plum-deep) / .55), hsl(var(--foreground) / .62))",
          boxShadow:
            "inset 1px 0 0 rgba(255,255,255,0.14), inset -1px 0 0 rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <div className="flex flex-wrap items-end gap-4">
          <label className="block flex-[1.5_1_240px]">
            <span className={etiquette}>{t("accueil.reservation.motifLabel")}</span>
            <select className={champ} value={motif} onChange={(e) => setMotif(e.target.value)}>
              {motifs.map((m) => (
                <option key={m} value={m} className="bg-plum-deep">
                  {m}
                </option>
              ))}
            </select>
          </label>
          <label className="block flex-[1_1_160px]">
            <span className={etiquette}>{t("accueil.reservation.jourLabel")}</span>
            <select className={champ} value={jour} onChange={(e) => setJour(e.target.value)}>
              {jours.map((j) => (
                <option key={j} value={j} className="bg-plum-deep">
                  {j}
                </option>
              ))}
            </select>
          </label>
          <label className="block flex-[1_1_160px]">
            <span className={etiquette}>{t("accueil.reservation.momentLabel")}</span>
            <select className={champ} value={moment} onChange={(e) => setMoment(e.target.value)}>
              {moments.map((m) => (
                <option key={m} value={m} className="bg-plum-deep">
                  {m}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="inline-flex min-h-12 flex-[0_0_auto] items-center justify-center whitespace-nowrap rounded-sm bg-primary px-[26px] text-base font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            {t("accueil.reservation.cta")}
          </button>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-white/80">{t("accueil.reservation.note")}</p>
      </form>
    </div>
  )
}

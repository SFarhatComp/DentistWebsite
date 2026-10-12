import { getTranslationObjectList, getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

interface Stade {
  etiquette: string
  nom: string
  texte?: string
}

/**
 * Le schéma des cinq stades.
 *
 * La forme compte autant que le contenu : le parcours n'est pas une échelle.
 * Après le stade 1, il se dédouble — on va au stade 2 ou directement au
 * stade 4 — puis les deux branches rejoignent le stade 3. C'est ce qui dit, à
 * l'œil, que le stade 4 n'est ni obligatoire ni supérieur au stade 2.
 *
 * Les deux branches sont tenues par une grille de trois colonnes dont celle du
 * milieu, large de 72 px, ne porte que les traits pointillés et la mention
 * « Direct ». En dessous de 640 px la grille s'effondre en une colonne et les
 * liaisons disparaissent : à cette largeur elles se croisent et embrouillent
 * plus qu'elles n'expliquent.
 */
export function SchemaParcours({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const stades = getTranslationObjectList<Stade>(lang, "parcours.schema.stades")
  const [s0, s1, s2, s4, s3] = stades

  const carte = "min-w-0 rounded-[14px] px-[18px] py-[22px] text-center"
  const etiquette = "m-0 font-etiquette text-[13px] font-semibold uppercase leading-[1.6] tracking-[0.18em]"
  const nom = "mt-1.5 font-display text-[clamp(22px,2.4vw,30px)] font-semibold leading-[1.15]"
  const Fleche = () => (
    <div aria-hidden="true" className="py-2.5 text-center text-2xl leading-none text-lavender">
      ↓
    </div>
  )

  return (
    <div className="mx-auto mt-12 w-full max-w-[860px] rounded-[20px] border border-white/[0.18] bg-white/[0.04] p-[clamp(20px,4vw,48px)] text-white">
      <div className="flex justify-center">
        <span className="inline-flex min-h-12 items-center rounded-full bg-white px-7 font-display text-[clamp(22px,2.4vw,30px)] font-semibold leading-[1.15] text-foreground">
          {t("parcours.schema.depart")}
        </span>
      </div>

      <Fleche />
      <div className={`${carte} border border-white/[0.28] bg-white/[0.08]`}>
        <p className={`${etiquette} text-surface-alt`}>{s0.etiquette}</p>
        <p className={nom}>{s0.nom}</p>
      </div>

      <Fleche />
      <div className={`${carte} bg-primary`}>
        <p className={`${etiquette} text-[#FBE3D8]`}>{s1.etiquette}</p>
        <p className={nom}>{s1.nom}</p>
      </div>

      {/* Le dédoublement. Trois colonnes sur écran large, une seule en dessous
          de 640 px, où les liaisons sont masquées plutôt que repliées. */}
      <div className="grid items-stretch max-[639px]:grid-cols-1 min-[640px]:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)]">
        <Fleche />
        <div aria-hidden="true" className="hidden justify-center min-[640px]:flex">
          <span className="w-0 border-l-2 border-dashed border-lavender" />
        </div>
        <div className="max-[639px]:hidden">
          <Fleche />
        </div>

        <div className={`${carte} border-2 border-lavender bg-lavender/[0.14]`}>
          <p className={`${etiquette} text-surface-alt`}>{s2.etiquette}</p>
          <p className={nom}>{s2.nom}</p>
          <p className="mt-2 text-sm leading-[1.4] opacity-85">{s2.texte}</p>
        </div>

        <div
          aria-hidden="true"
          className="hidden flex-col items-center justify-center gap-1.5 min-[640px]:flex"
        >
          <span className="w-0 flex-auto border-l-2 border-dashed border-lavender" />
          <span className="text-[11px] uppercase tracking-[0.12em] text-surface-alt [writing-mode:vertical-rl] [transform:rotate(180deg)]">
            {t("parcours.schema.direct")}
          </span>
          <span className="w-0 flex-auto border-l-2 border-dashed border-lavender" />
        </div>

        <div className={`${carte} border-2 border-lavender bg-lavender/[0.14] max-[639px]:mt-4`}>
          <p className={`${etiquette} text-surface-alt`}>{s4.etiquette}</p>
          <p className={nom}>{s4.nom}</p>
          <p className="mt-2 text-sm leading-[1.4] opacity-85">{s4.texte}</p>
        </div>

        <Fleche />
        <div className="max-[639px]:hidden">
          <Fleche />
        </div>
        <div className="max-[639px]:hidden">
          <Fleche />
        </div>
      </div>

      <div className={`${carte} bg-surface-alt text-foreground`}>
        <p className={`${etiquette} text-muted-foreground`}>{s3.etiquette}</p>
        <p className={nom}>{s3.nom}</p>
      </div>
    </div>
  )
}

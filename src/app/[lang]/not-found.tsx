import Link from "next/link"

/**
 * Page 404.
 *
 * not-found.tsx ne reçoit pas params.lang : on ne sait donc pas dans quelle
 * langue s'adresser au visiteur, et l'affichage reste bilingue.
 *
 * Elle est hors du groupe (site) et n'a ni menu ni pied de page — on ne peut
 * pas les rendre sans connaître la langue. Les deux liens de retour suffisent.
 */
export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-hero text-white">
      <div className="relative mx-auto mb-auto mt-auto w-full max-w-page px-[clamp(16px,5vw,56px)] py-24">
        <p className="m-0 text-[13px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-surface-alt">
          [ 404 ]
        </p>
        <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(38px,5.6vw,68px)] font-semibold leading-[1.02]">
          Page introuvable
          <span className="block text-white/60">Page not found</span>
        </h1>
        <p className="mt-6 max-w-[58ch] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-white/[0.88]">
          La page que vous cherchez a été déplacée ou n&apos;existe plus.
          <span className="mt-1 block text-white/70">
            The page you are looking for has moved or no longer exists.
          </span>
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/fr"
            className="inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-[26px] text-base font-medium text-primary-foreground no-underline transition-colors hover:bg-primary-hover"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/en"
            className="inline-flex min-h-12 items-center justify-center rounded-sm px-[26px] text-base font-medium text-white no-underline shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] transition-colors hover:bg-white/10"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}

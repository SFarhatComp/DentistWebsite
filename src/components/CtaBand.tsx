import Link from "next/link"
import { facts } from "@/lib/facts"

/** Appel final de chaque page : un seul bouton principal, et le téléphone. */
export function CtaBand({
  title,
  text,
  bookHref,
  bookLabel,
  callLabel,
  signature,
}: {
  title: string | string[]
  text?: string
  bookHref: string
  bookLabel: string
  callLabel: string
  signature?: string
}) {
  const lines = Array.isArray(title) ? title : [title]
  return (
    <section className="relative isolate overflow-hidden bg-ivory text-aub">
      <div className="frame py-20 sm:py-28">
        <div className="reveal grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="t-1">
              {lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            {text && <p className="lede mt-5 max-w-[48ch] text-aub/80">{text}</p>}
            {signature && <p className="mt-6 font-display text-[26px] italic text-mauve-ink">{signature}</p>}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-start lg:flex-row lg:justify-end">
            <Link href={bookHref} className="btn btn-primary">
              {bookLabel}
            </Link>
            <a href={`tel:${facts.phoneTel}`} className="btn btn-ghost">
              {callLabel} {facts.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

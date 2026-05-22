import { AlertTriangle } from "lucide-react"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

interface MedicalEmergencyNoticeProps {
  phoneTel?: string
  phoneDisplay?: string
  lang?: Locale
}

export function MedicalEmergencyNotice({
  phoneTel = "+15148637805",
  phoneDisplay = "514 863 7805",
  lang = "fr",
}: MedicalEmergencyNoticeProps) {
  const t = getTranslations(lang)
  return (
    <div
      role="alert"
      className="border border-accent/40 bg-accent/5 p-6 md:p-8 mb-10 flex gap-5"
    >
      <AlertTriangle className="h-6 w-6 text-accent shrink-0 mt-1" aria-hidden="true" />
      <div className="space-y-4">
        <p className="text-base text-foreground leading-relaxed">
          {t("medicalEmergencyNotice.body")}
        </p>
        <a
          href={`tel:${phoneTel}`}
          className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-primary-foreground px-5 py-2.5 text-sm font-medium tracking-wide transition-colors"
        >
          {t("medicalEmergencyNotice.callButton")} — {phoneDisplay}
        </a>
      </div>
    </div>
  )
}

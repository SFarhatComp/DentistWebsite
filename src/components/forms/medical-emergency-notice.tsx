import { AlertTriangle } from "lucide-react"

interface MedicalEmergencyNoticeProps {
  phoneTel?: string
  phoneDisplay?: string
}

export function MedicalEmergencyNotice({
  phoneTel = "+15148637805",
  phoneDisplay = "514 863 7805",
}: MedicalEmergencyNoticeProps) {
  return (
    <div
      role="alert"
      className="border border-accent/40 bg-accent/5 p-6 md:p-8 mb-10 flex gap-5"
    >
      <AlertTriangle className="h-6 w-6 text-accent shrink-0 mt-1" aria-hidden="true" />
      <div className="space-y-4">
        <p className="text-base text-foreground leading-relaxed">
          Si vous présentez une difficulté à respirer, une enflure importante du visage ou du cou,
          de la fièvre importante, un traumatisme sévère ou des signes généraux inquiétants,
          contactez les services d&apos;urgence ou présentez-vous à l&apos;hôpital.
        </p>
        <a
          href={`tel:${phoneTel}`}
          className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-primary-foreground px-5 py-2.5 text-sm font-medium tracking-wide transition-colors"
        >
          Appeler la clinique — {phoneDisplay}
        </a>
      </div>
    </div>
  )
}

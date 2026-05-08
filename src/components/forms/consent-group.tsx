import Link from "next/link"
import { CheckboxField } from "./fields"

interface ConsentItem {
  name: string
  label: React.ReactNode
  required?: boolean
  defaultChecked?: boolean
}

interface ConsentBlockProps {
  number: string
  title: string
  description?: string
  items: ConsentItem[]
}

export function ConsentBlock({ number, title, description, items }: ConsentBlockProps) {
  return (
    <div className="border-t border-border pt-6 first:border-t-0 first:pt-0">
      <div className="flex items-baseline gap-4 mb-3">
        <span className="font-display text-sm text-accent/70 tabular-nums">{number}</span>
        <h4 className="font-display text-base text-foreground">{title}</h4>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 ml-9">{description}</p>
      )}
      <div className="space-y-3 ml-9">
        {items.map((item) => (
          <CheckboxField
            key={item.name}
            name={item.name}
            value="1"
            label={item.label}
            required={item.required}
            defaultChecked={item.defaultChecked}
          />
        ))}
      </div>
    </div>
  )
}

interface ConsentGroupProps {
  lang: string
}

export function ConsentGroup({ lang }: ConsentGroupProps) {
  return (
    <div className="space-y-6">
      <ConsentBlock
        number="01"
        title="Consentements obligatoires"
        items={[
          {
            name: "consent_no_replace",
            required: true,
            label: "Je comprends que ce formulaire ne remplace pas une consultation dentaire.",
          },
          {
            name: "consent_contact",
            required: true,
            label: "J'autorise Studio Dentaire De Facto à me contacter concernant ma demande.",
          },
          {
            name: "consent_no_confirmation",
            required: true,
            label: "Je comprends que l'envoi d'un formulaire ne confirme pas automatiquement un rendez-vous.",
          },
        ]}
      />

      <ConsentBlock
        number="02"
        title="Communications cliniques"
        items={[
          {
            name: "consent_use",
            required: true,
            label: "J'accepte que mes renseignements soient utilisés pour traiter ma demande de rendez-vous et préparer mon dossier.",
          },
        ]}
      />

      <ConsentBlock
        number="03"
        title="Confidentialité"
        description="Pour plus d'informations, consultez notre politique de confidentialité."
        items={[
          {
            name: "consent_privacy",
            required: true,
            label: (
              <>
                Je comprends que les communications électroniques peuvent comporter certains risques et j&apos;ai pris connaissance de la{" "}
                <Link
                  href={`/${lang}/confidentialite`}
                  className="text-primary underline hover:no-underline"
                  target="_blank"
                >
                  politique de confidentialité
                </Link>
                .
              </>
            ),
          },
        ]}
      />

      <ConsentBlock
        number="04"
        title="Urgence médicale"
        items={[
          {
            name: "consent_emergency",
            required: true,
            label: "Je comprends que pour une urgence médicale (difficulté à respirer, enflure importante, fièvre élevée, traumatisme sévère), je dois contacter les services d'urgence ou me présenter à l'hôpital.",
          },
        ]}
      />

      <ConsentBlock
        number="05"
        title="Communications informatives (optionnel)"
        description="Cochez uniquement si vous souhaitez recevoir nos communications. Cette case n'est pas pré-cochée."
        items={[
          {
            name: "consent_communications",
            required: false,
            defaultChecked: false,
            label: "J'accepte de recevoir des communications informatives de la clinique.",
          },
        ]}
      />
    </div>
  )
}

import { fr } from "@/content/fr"
import type { Dict } from "./dict"

/**
 * Le strict nécessaire pour les formulaires (composants client) : on évite
 * d'envoyer tout le dictionnaire au navigateur. Les valeurs envoyées au serveur
 * sont toujours les libellés français, quelle que soit la langue affichée.
 */
export function formText(d: Dict) {
  return {
    forms: d.forms,
    bookingBar: d.home.bookingBar,
    urgentNotice: d.booking.urgentNotice,
    formUrgent: d.contact.formUrgent,
    formUnavailable: d.emergency.formUnavailable,
    values: {
      coverage: fr.forms.coverageOptions,
      subjects: fr.forms.subjects,
      situations: fr.forms.situations,
    },
  }
}

export type FormText = ReturnType<typeof formText>

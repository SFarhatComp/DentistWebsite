/**
 * Realistic sample payloads for previewing email templates without
 * submitting actual forms. Used by /api/email-preview/[form] route.
 */

import type { NetlifyPayload } from "./types"

const NOW = new Date().toISOString()

export const samplePayloads: Record<string, NetlifyPayload> = {
  contact: {
    form_name: "contact",
    created_at: NOW,
    data: {
      lang: "fr",
      name: "Sami Farhat",
      email: "sfarhat4@gmail.com",
      phone: "514 581 2205",
      subject: "rdv",
      message: "Bonjour,\n\nJ'aimerais prendre rendez-vous pour un examen complet. Je suis nouveau patient et j'ai entendu parler de votre clinique par un collègue.\n\nMerci,\nSami",
    },
  },

  rappel: {
    form_name: "rappel",
    created_at: new Date().toISOString(),
    data: {
      lang: "fr",
      nom: "Camille Bouchard",
      telephone: "514 555 0142",
      courriel: "camille.bouchard@example.com",
      premiereVisite: "Oui",
      couverture: "RCSD",
      motif: "Examen complet (nouveau patient)",
      jour: "Mardi",
      moment: "Après-midi",
    },
  },
  urgence: {
    form_name: "urgence",
    created_at: NOW,
    data: {
      lang: "fr",
      nom: "Marie-Pier Lavoie",
      telephone: "514 555 0142",
      courriel: "mp.lavoie@example.com",
      type: "enflure",
      ou: "Joue",
      depuis: "2 à 3 jours",
      fievre: "Oui",
      consentement: "oui",
    },
  },





}

export function getSamplePayload(formName: string): NetlifyPayload | null {
  return samplePayloads[formName] || null
}

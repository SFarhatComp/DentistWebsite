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

  appointment: {
    form_name: "appointment",
    created_at: NOW,
    data: {
      lang: "fr",
      statut: "nouveau",
      motif: "douleur",
      motifLabel: "Douleur ou problème précis",
      precisions: "Sensible au froid ou au chaud · Douleur en mordant · Autre",
      note: "Ça a commencé il y a environ cinq jours, surtout du côté droit en bas. Je voudrais surtout comprendre d'où ça vient.",
      douleur: "aujourdhui",
      priorite: "aujourdhui",
      dureeSuggeree: "30",
      jours: "lundi,mercredi",
      moments: "apres_midi,fin_journee",
      delai: "asap",
      assurance: "privee",
      assureur: "Croix Bleue",
      police: "884120-01",
      firstName: "Marie-Pier",
      lastName: "Lavoie",
      phone: "514 555 0142",
      email: "mp.lavoie@example.com",
      birthdate: "14 / 03 / 1987",
      contactPreference: "telephone",
      consent: "oui",
    },
  },
  emergency: {
    form_name: "emergency",
    created_at: NOW,
    data: {
      lang: "fr",
      firstName: "Jean-Philippe",
      lastName: "Tremblay",
      phone: "438 555 0917",
      email: "jp.tremblay@example.com",
      dob: "1985-03-22",
      // Types d'urgence — sélection alarmante
      type_douleur: "1",
      type_enflure: "1",
      type_infection: "1",
      symptomDuration: "depuis 3 jours, ça empire",
      // Symptômes — quelques Oui alertes
      sym_breathe: "no",
      sym_swallow: "yes",
      sym_swelling: "yes",
      sym_fever: "yes",
      sym_night: "yes",
    },
  },

  "partner-onboarding": {
    form_name: "partner-onboarding",
    created_at: NOW,
    data: {
      lang: "fr",
      dentistName: "Dre Catherine Bouchard",
      professionalTitle: "orthodontiste",
      clinicName: "Orthodontie Plus Montréal",
      clinicAddress: "1234 boul. Saint-Joseph Est, Montréal, QC H2J 1L8",
      phone: "514 555 9876",
      email: "c.bouchard@orthoplus.example.com",
      collaboration_lab_regulier: "1",
      collaboration_cas_esthetiques: "1",
      service_orthodontie: "1",
      service_plaques_occlusales: "1",
      service_gouttieres: "1",
      service_impression_3d: "1",
      contact_courriel: "1",
      contact_telephone: "1",
      message: "Bonjour,\n\nJ'aimerais explorer une collaboration pour la fabrication de gouttières et de plaques occlusales pour mes patients. J'ai actuellement environ 30-40 cas par mois.\n\nJ'aimerais aussi discuter de la possibilité d'imprimer certains modèles ortho.\n\nMerci,\nDre Bouchard",
    },
  },

  "lab-prescription": {
    form_name: "lab-prescription",
    created_at: NOW,
    data: {
      lang: "en",
      prescribingProfessional: "Dr Antoine Roy",
      clinicName: "Clinique Dentaire Ahuntsic",
      phone: "514 555 3344",
      email: "antoine.roy@cda.example.com",
      patientName: "Patient #2026-0421",
      appareil: "facette",
      subOption: "permanente",
      arcade: "superieure",
      teeth: "11, 12, 21, 22",
      material: "emax_presse",
      lamination: "oui",
      colorIndications: "A2 cervical, A1 incisal. Caractérisations bleutées discrètes en bord incisal. Maquillage léger pour rester naturel.",
      clinicalInstructions: "Facettes antérieures sup. Patient avec sourire gingival léger — préserver translucidité incisale. Taille minimale, conservation maximale d'émail. Provisoires acrylique déjà en place depuis 2 semaines.",
    },
  },

  "referred-case": {
    form_name: "referred-case",
    created_at: NOW,
    data: {
      lang: "fr",
      referringProfessionalName: "Dre Sophie Larocque",
      clinicName: "Centre dentaire Rosemont",
      clinicPhone: "514 555 8822",
      email: "s.larocque@cdr.example.com",
      patientName: "Robert Gagnon",
      patientDob: "1962-11-08",
      patientPhone: "514 555 7766",
      patientEmail: "robert.gagnon@example.com",
      patientLanguage: "francais",
      referralMainReason: "implantologie",
      urgency: "non",
      motif_secondaire_dent_mobile: "1",
      clinicalSummary: "Patient de 63 ans avec mobilité importante 36, fracture coronaire 36 et 37. Extraction nécessaire. Patient désire option implantaire.\n\nSanté générale: hypertension contrôlée, pas d'anticoagulants.\n\nNon-fumeur, hygiène orale moyenne.",
      previousTreatments: "Couronnes 14, 16, 24, 26 (2018-2020). TC 11 (2015). Aucun traitement implantaire antérieur.",
      doc_photos: "1",
      doc_radiographies: "1",
      doc_notes_cliniques: "1",
    },
  },

  "lab-professional": {
    form_name: "lab-professional",
    created_at: NOW,
    data: {
      lang: "fr",
      dentistName: "Dr Pierre Martin",
      clinic: "Clinique Dentaire de la Cité",
      phone: "514 555 1188",
      email: "p.martin@cdlc.example.com",
      caseType: "couronne",
      material: "zircone",
      comments: "Couronne 46. Préférence pour zircone monolithique translucide. Teinte A3.",
    },
  },
}

export function getSamplePayload(formName: string): NetlifyPayload | null {
  return samplePayloads[formName] || null
}

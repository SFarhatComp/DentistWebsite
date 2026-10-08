/**
 * Une information = une seule valeur (cahier, lot 3). Tout ce qui décrit le
 * studio (adresse, heures, téléphone, courriels) est défini ici et nulle part ailleurs.
 */
export const facts = {
  name: "Studio Dentaire De Facto",
  dentist: "Dr Bader Ramdani",
  street: "728, rue Fleury Est",
  streetEn: "728 Fleury Street East",
  city: "Montréal",
  region: "QC",
  postalCode: "H2C 1P1",
  country: "CA",
  geo: { lat: 45.5560771, lng: -73.6600516 },
  phoneDisplay: "514 863-7805",
  phoneTel: "+15148637805",
  emailInfo: "info@studiodefacto.ca",
  siteUrl: "https://studiodefacto.ca",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Studio+Dentaire+De+Facto%2C+728+rue+Fleury+Est%2C+Montr%C3%A9al+QC+H2C+1P1",
  mapsEmbed:
    "https://www.google.com/maps?q=728+rue+Fleury+Est,+Montr%C3%A9al,+QC+H2C+1P1&output=embed",
  /** Heures d'ouverture (décision du 5 oct. 2026) — jours ISO : 1 = lundi */
  hours: [
    { days: [1, 2], opens: "10:00", closes: "18:00" },
    { days: [3], opens: "15:00", closes: "20:00" },
  ],
  openingDate: "2026-10-12",
  /** Le bandeau d'ouverture disparaît à la première compilation après cette date. */
  openingBannerUntil: "2026-12-01",
  /**
   * Offre d'ouverture (page /nouveau-patient) : affichée jusqu'à cette date.
   * Le prix régulier de 513 $ doit rester en vigueur au moins 90 jours après la
   * dernière diffusion de l'offre (Code de déontologie, 3.09.08).
   */
  openingOfferUntil: "2027-01-01",
  /** Page de réservation Google (HORAIRE STUDIO). Vide = bouton masqué. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
} as const

export function showOpeningOffer(now = new Date()) {
  return now < new Date(`${facts.openingOfferUntil}T00:00:00-05:00`)
}

export function showOpeningBanner(now = new Date()) {
  return now < new Date(`${facts.openingBannerUntil}T00:00:00-05:00`)
}

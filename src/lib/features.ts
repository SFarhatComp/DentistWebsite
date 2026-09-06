/**
 * Drapeaux d'affichage de la refonte 2026-09.
 *
 * La bande urgence et les légendes de la galerie doivent rester activables et
 * désactivables sans toucher aux composants (handoff §4). Ils sont regroupés ici
 * plutôt que dispersés pour qu'une modification soit une ligne, pas une chasse.
 */
export const features = {
  /** Bande « Urgence dentaire » sous l'en-tête de l'accueil. */
  urgenceBanner: true,
  /** Légendes en surimpression sur la galerie photo du studio. */
  galerieCaptions: true,
} as const

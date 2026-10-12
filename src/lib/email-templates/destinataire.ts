/**
 * Adresse unique de réception des formulaires du site.
 *
 * Tout arrive dans la même boîte. Le tri se fait sur l'objet du courriel, qui
 * porte le type de demande et sa priorité — c'est plus robuste qu'un éventail
 * d'alias à maintenir, et ça évite qu'une demande se perde dans une boîte que
 * personne n'ouvre.
 *
 * Pour changer la destination, c'est ici et nulle part ailleurs.
 */
export const DESTINATAIRE = "direction@studiodefacto.ca"

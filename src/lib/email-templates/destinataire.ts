/**
 * Adresses de réception des formulaires du site.
 *
 * Deux boîtes, parce que deux personnes différentes agissent dessus :
 *
 *  - les demandes de rendez-vous vont à `rendezvous@`, que la réception ouvre
 *    pour remplir l'agenda ;
 *  - tout le reste va à `direction@`.
 *
 * Les urgences vont aussi à `rendezvous@` : elles se règlent en rappelant pour
 * donner une heure, c'est le même geste et la même personne.
 *
 * Pour changer une destination, c'est ici et nulle part ailleurs. Le tri se
 * fait ensuite sur l'objet du courriel, qui porte le type de demande et sa
 * priorité — plus robuste qu'un éventail d'alias à maintenir.
 */
export const DESTINATAIRE = "direction@studiodefacto.ca"

/** Les demandes de rendez-vous et les urgences. */
export const DESTINATAIRE_RENDEZ_VOUS = "rendezvous@studiodefacto.ca"

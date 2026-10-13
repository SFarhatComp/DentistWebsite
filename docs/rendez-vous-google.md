# Brancher le planning de rendez-vous Google sur le site

Le site peut afficher votre calendrier de réservation directement dans la page
`/rendez-vous`. Le patient choisit son créneau, reçoit sa confirmation, et le
créneau disparaît du site aussitôt.

Tout se fait dans Google Agenda et dans Netlify. Aucune ligne de code à écrire.

Comptez une quinzaine de minutes.

---

## Avant de commencer

**Décidez quel agenda recevra les rendez-vous.** Aujourd'hui, `direction@`
contient surtout des ateliers d'organismes, pas des rendez-vous patients. Deux
possibilités :

- tenir les rendez-vous patients dans `direction@` aussi ;
- créer un second agenda, par exemple « Clinique », et y mettre le planning.

La seconde est plus propre si `direction@` sert aussi à autre chose : les
ateliers et l'administratif restent séparés des disponibilités offertes aux
patients. Le choix se fait à l'étape 1.3.

---

## Étape 1 — Créer le planning

1. Ouvrez <https://calendar.google.com> **avec le compte
   `direction@studiodefacto.ca`**. Si un autre compte est ouvert, changez-en en
   haut à droite — un planning créé sur le mauvais compte ne verra pas le bon
   agenda.

2. En haut à gauche, cliquez sur **Créer**, puis sur **Planning de
   rendez-vous**.

3. Remplissez :

   - **Titre** : ce que le patient verra, par exemple
     « Rendez-vous — Studio Dentaire De Facto ».
   - **Durée** : 60 minutes convient pour un examen complet. Vous pourrez créer
     d'autres plannings plus tard, un par durée.
   - **Disponibilité générale** : lundi et mardi 10 h – 18 h, mercredi
     15 h – 20 h. **Décochez jeudi, vendredi, samedi et dimanche** : le studio
     est fermé, et un créneau offert ces jours-là serait une promesse que
     personne ne peut tenir.
   - **Fuseau horaire** : vérifiez qu'il indique bien **(GMT-05:00) Heure de
     l'Est — Toronto**. Votre agenda est réglé sur UTC par défaut ; laissé
     ainsi, l'horaire afficherait vos plages avec quatre ou cinq heures de
     décalage.
   - **Calendrier** : choisissez l'agenda décidé plus haut.

4. Ouvrez **Paramètres de réservation** et réglez :

   - **Délai minimum avant réservation** : 24 heures. Sans cela, quelqu'un peut
     réserver pour dans dix minutes.
   - **Durée tampon** : 15 minutes entre deux rendez-vous, si vous en voulez une.
   - **Nombre maximal de réservations par jour** : à votre convenance.

5. **Vérifier la disponibilité dans les agendas** : laissez cette option
   activée, et cochez les agendas à consulter. C'est ce qui empêche qu'on
   réserve pendant un atelier déjà inscrit.

6. Cliquez sur **Suivant**, puis personnalisez le formulaire de réservation :
   nom, courriel et téléphone. **N'ajoutez aucune question sur la santé** — ces
   réponses seraient hébergées chez Google, hors du Québec. L'état de santé se
   discute au téléphone ou au studio.

7. **Enregistrez**.

---

## Étape 2 — Récupérer le lien

1. Dans la barre latérale gauche, une rubrique **Pages de réservation** est
   apparue. Passez la souris sur votre planning et cliquez sur **Partager**.

2. Choisissez l'onglet **Intégrer** (ou « Intégration au site Web »).

3. Choisissez **Page de réservation intégrée**, pas le bouton avec fenêtre.

4. Cliquez sur **Copier**.

Vous obtiendrez soit une adresse, soit un bloc de code commençant par
`<iframe`. **Les deux conviennent** : collez tel quel à l'étape suivante, le
site saura s'y retrouver.

---

## Étape 3 — Le donner au site

1. Ouvrez <https://app.netlify.com> et choisissez le site.

2. **Site configuration** → **Environment variables** → **Add a variable**.

3. Remplissez :

   | Champ | Valeur |
   | --- | --- |
   | Key | `NEXT_PUBLIC_GOOGLE_RDV_URL` |
   | Value | ce que vous venez de copier |
   | Scopes | laissez tout coché |

4. **Create variable**.

5. Allez dans **Deploys** et cliquez sur **Trigger deploy** → **Deploy site**.
   Une variable d'environnement n'est lue qu'à la construction : sans ce
   redéploiement, le site continue d'afficher l'ancienne version.

Comptez environ deux minutes.

---

## Étape 4 — Vérifier

Ouvrez <https://studiodefacto.ca/fr/rendez-vous>.

- **Le calendrier s'affiche** : c'est fait.
- **Vous voyez encore « La réservation en ligne arrive »** : la variable est
  vide, mal nommée, ou le redéploiement n'a pas eu lieu. Reprenez l'étape 3 ; le
  nom doit être exactement `NEXT_PUBLIC_GOOGLE_RDV_URL`, majuscules comprises.

Puis **faites une vraie réservation de bout en bout**, avec votre adresse
personnelle :

1. Réservez un créneau depuis le site.
2. Vérifiez que le rendez-vous apparaît dans l'agenda choisi.
3. Vérifiez que vous avez reçu le courriel de confirmation.
4. Rechargez la page du site : **le créneau réservé ne doit plus être offert**.
5. Supprimez le rendez-vous de test dans l'agenda.

Ce quatrième point est le seul qui prouve que la synchronisation fonctionne.
Faites-le avant d'annoncer la réservation en ligne à vos patients.

---

## Ce que le site fait de ce lien

Il l'affiche dans un cadre, et rien d'autre. Les coordonnées saisies dans le
calendrier vont directement à Google : elles ne transitent pas par le site, qui
ne les voit jamais et n'en garde aucune trace.

C'est pour cette raison que la page porte, sous le calendrier, la mention que
Google héberge ces renseignements à l'extérieur du Québec. La Loi 25 l'exige, et
cette mention doit rester.

Le formulaire « Vous préférez qu'on vous rappelle ? », à côté, ne passe pas par
Google : il arrive par courriel à `direction@studiodefacto.ca`.

---

## Changer le planning plus tard

Modifier les heures, la durée ou les questions se fait dans Google Agenda ; le
site suit tout seul, sans redéploiement.

Seul le remplacement du planning par un **nouveau** change le lien : il faut
alors reprendre les étapes 2 et 3.

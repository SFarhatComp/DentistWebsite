# Brancher l agenda Google sur les plages de rendez-vous

Le site peut proposer des plages de rendez-vous qui tiennent compte de
l agenda reel, pour ne pas offrir un creneau deja pris.

Il fonctionne sans cette configuration : il propose alors les heures
d ouverture seules, et l interface indique que la plage reste a confirmer.
Ce qui suit est donc une amelioration, pas un prerequis.

## Ce que le site lit, et ce qu il ne lit pas

Le site interroge l API « FreeBusy » de Google. Cette API ne renvoie que des
intervalles : **debut et fin, rien d autre**. Ni titre, ni invite, ni
description, ni lieu.

C est volontaire. L agenda `direction@` contient des rendez-vous nominatifs,
donc des renseignements personnels de sante. Meme si quelqu un appelait
directement le point d entree du site, il ne pourrait en tirer que des
intervalles occupes — jamais le contenu des rendez-vous.

## Les quatre etapes

### 1. Creer un projet et activer l API

1. Ouvrir <https://console.cloud.google.com/>
2. Creer un projet, par exemple `studio-defacto-site`.
3. Dans « APIs & Services » > « Library », chercher **Google Calendar API** et
   cliquer **Enable**.

### 2. Creer un compte de service

Un compte de service est une identite technique : le site s en sert pour lire
l agenda, sans jamais utiliser le mot de passe du compte Google.

1. « APIs & Services » > « Credentials » > **Create credentials** >
   **Service account**.
2. Lui donner un nom, par exemple `site-web`. Aucun role n est necessaire a
   cette etape — l acces se donnera par le partage de l agenda.
3. Ouvrir le compte de service cree, onglet **Keys** > **Add key** >
   **Create new key** > **JSON**. Un fichier se telecharge.

Ce fichier est un secret. Il ne va pas dans le depot : seulement dans les
variables d environnement Netlify.

### 3. Partager l agenda avec ce compte de service

C est l etape qu on oublie, et sans elle le site recoit une erreur
`notFound` meme si tout le reste est juste.

1. Ouvrir Google Agenda avec le compte `direction@studiodefacto.ca`.
2. Parametres de l agenda `direction@studiodefacto.ca` > **Partager avec des
   personnes en particulier** > **Ajouter une personne**.
3. Coller l adresse du compte de service (`...@...iam.gserviceaccount.com`,
   champ `client_email` du fichier JSON).
4. Autorisation : **Voir les details de tous les evenements**.

Lecture seule. Le site ne peut rien creer ni modifier dans l agenda.

### 4. Renseigner les variables sur Netlify

Site configuration > Environment variables > Add a variable :

| Variable | Valeur |
|---|---|
| `GOOGLE_SA_EMAIL` | le `client_email` du fichier JSON |
| `GOOGLE_SA_PRIVATE_KEY` | le `private_key` du fichier JSON, colle tel quel |
| `GOOGLE_CALENDAR_ID` | `direction@studiodefacto.ca` |

Pour `GOOGLE_SA_PRIVATE_KEY`, copier toute la valeur depuis
`-----BEGIN PRIVATE KEY-----` jusqu a `-----END PRIVATE KEY-----\n`, avec les
`\n` tels qu ils apparaissent dans le fichier. Le site les retraduit en sauts
de ligne.

Puis redeployer.

## Verifier que ca marche

Ouvrir <https://studiodefacto.ca/api/disponibilites?motif=examen>.

- `"source": "agenda"` : l agenda est lu, les creneaux occupes sont retires.
- `"source": "horaires"` avec `"motifRepli": "non-configure"` : une des trois
  variables manque.
- `"source": "horaires"` avec `"motifRepli": "agenda-illisible"` : les
  variables sont la mais la lecture echoue — presque toujours l etape 3
  oubliee. Le detail est dans les journaux de la fonction, sur Netlify.

## Deux points a decider

**Les heures d ouverture sont dans le code**, pas dans l agenda : lundi et
mardi 10 h – 18 h, mercredi 15 h – 20 h, dans `src/lib/disponibilites.ts`.
L agenda sert a retirer des creneaux, pas a en ajouter. Un jour ouvert en plus
se change dans ce fichier.

**Tout evenement de l agenda bloque un creneau**, quel qu il soit. Dans
l agenda `direction@` tel qu il est aujourd hui, les entrees sont des ateliers
et des rencontres d organismes, pas des rendez-vous patients : le site
montrerait donc le studio presque entierement libre.

Deux facons de s en sortir, au choix :

- tenir les rendez-vous patients dans ce meme agenda — le site devient juste ;
- creer un second agenda, par exemple « Clinique », le partager de la meme
  facon avec le compte de service et mettre son identifiant dans
  `GOOGLE_CALENDAR_ID`. Les ateliers et l administratif restent alors separes
  des disponibilites affichees.

La seconde est plus propre si l agenda de direction sert aussi a autre chose.

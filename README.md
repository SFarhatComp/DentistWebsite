# studiodefacto.ca

Site du Studio Dentaire De Facto (Dr Bader Ramdani, dentiste généraliste). Next.js 16 (App Router), hébergé sur Netlify.

## Commandes

```bash
npm ci
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

Essai local d'un build de production en http : `LOCAL_PREVIEW=1 npm run build && npm start`.

## Où modifier quoi

| Quoi | Fichier |
|---|---|
| Adresse, téléphone, heures, dates d'ouverture et de l'offre | `src/lib/facts.ts` |
| Textes des pages (FR / EN) | `src/content/fr.ts`, `src/content/en.ts` |
| Fiches de services (aussi dans /admin) | `content/services/fr/*.md`, `content/services/en/*.md` |
| Adresses des pages FR / EN et anciennes adresses (301) | `src/lib/route-table.json` |
| En-têtes de sécurité, redirections | `next.config.js` |
| Photos | `public/img/*.webp` ; images de partage 1200 × 630 : `public/og/*.jpg` |

Chaque version publiée est une publicité : en garder une copie 5 ans (Code de déontologie, 3.09.11).

## Formulaires

Les trois formulaires (rendez-vous, contact, urgence) passent par `/api/demande`, qui envoie un courriel à `MAIL_TO` par SMTP. Rien n'est stocké sur le site. Variables : voir `.env.example`.

Le formulaire d'urgence n'apparaît que si la clé publique du studio est en place (`public/pgp/studio.asc`). Le navigateur chiffre la demande avec cette clé ; le courriel reçu contient un bloc « BEGIN PGP MESSAGE ».

Mise en service :

1. Créer la paire de clés du studio sur le poste du bureau, par exemple avec l'extension Mailvelope (Chrome) ou GnuPG : `gpg --quick-generate-key "Studio Dentaire De Facto <contact@studiodefacto.ca>" ed25519 cert,sign never`, puis `gpg --quick-add-key <empreinte> cv25519 encr never`.
2. Exporter la clé publique (`gpg --armor --export contact@studiodefacto.ca > studio.asc`), la placer dans `public/pgp/studio.asc`, committer et déployer.
3. Garder la clé privée sur le poste du bureau seulement, avec une phrase de passe et une copie de secours hors ligne. Mailvelope déchiffre les messages directement dans Gmail.

## Bandeau et offre d'ouverture

L'accueil et `/nouveau-patient` sont régénérés toutes les heures : le bandeau disparaît après `openingBannerUntil`, l'offre après `openingOfferUntil` (`src/lib/facts.ts`).

## Administration

`/admin` (Decap CMS, version figée et vérifiée par empreinte). Netlify Identity : inscription sur invitation seulement.

Phase 2 (hors de cette version) : portail patient de niveau 1 (cahier, lot 7).

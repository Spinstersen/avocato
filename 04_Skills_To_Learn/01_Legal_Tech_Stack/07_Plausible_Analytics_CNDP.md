# 07 — Plausible Analytics & Conformité CNDP

> **Le principe :** mesurer l'audience sans stocker de profil de visiteur nommément reconstituable. Plausible (≈9-14 $/mois selon palier, août 2026, à vérifier) : 0 cookie, IP tronquée, hébergement UE, script 1 kb. Google Analytics, lui, pose un double problème juridique au Maroc : transfert de données hors Maroc (autorisation préalable CNDP sous la loi 09-08) ET consentement. Cette fiche dit pourquoi et comment.

## POURQUOI pas Google Analytics (version honnête)

L'ancienne version citait une « délibération 40-22 » de la CNDP : **cette référence est inventée, elle ne doit plus jamais apparaître dans le vault**. Le vrai raisonnement juridique ne dépend d'aucune délibération mystérieuse :

1. **GA collecte des données personnelles.** IP, identifiants publicitaires, événements liés à un utilisateur — la loi 09-08 traite comme donnée personnelle toute information permettant d'identifier une personne directement ou indirectement ; l'IP + un ID stable, ça qualifie.
2. **Donc transfert hors Maroc.** GA traite aux États-Unis (Google LLC). La loi 09-08 (art. 31 et suivants) soumet les transferts hors Maroc à **autorisation préalable de la CNDP**. Un cabinet de quelques dizaines de pages ne va pas la demander — et Google n'est pas de taille à se préoccuper de ton dossier.
3. **Donc double risque :** (a) le défaut d'accomplissement des formalités (déclaration/autorisation, information des personnes) expose aux sanctions administratives et pénales de la loi 09-08 — l'**art. 64** réprime le non-respect des formalités d'une amende de **10 000 à 100 000 DH**, l'**art. 65** prévoit des peines pouvant aller jusqu'à **3 ans d'emprisonnement** pour les infractions les plus graves ; (b) le bandeau consent que GA impose ajoute friction et obligation de gestion. JAMAIS de « sanction 300 000 » ni de numéro de décision inventé dans tes communications clients.
4. Le détail des sanctions et des formalités est dans `02_Niches_Deep_Dive\03_Loi_09-08_GDPR_Compliance\` et `08_Jurisprudence\01_Loi_09-08_CNDP_Sanctions.md` — cite ces sources, pas des délibérations fantômes.

## COMMENT — pourquoi Plausible répond

| Problème GA | Réponse Plausible |
|---|---|
| Cookie de tracking | 0 cookie |
| IP complète stockée | IP hashée/jetée, non récupérable |
| Traitement US | Hébergé UE (Allemagne/Islande) |
| Bandeau consent | Pas nécessaire en configuration par défaut (0 cookie) — à confirmer selon usage (événements custom, etc.) |
| Sur-mesure (profils) | Vues, sources, pages, pays, conversion d'objectifs — rien d'autre |

Ce que Plausible **ne fait pas** : identifier un individu, dire « le visiteur de Casablanca qui est resté 4 min ». Pour un site d'avocat, c'est exactement le niveau nécessaire : savoir quel article amène des diagnostics, pas qui l'a lu.

## Setup (15 min, cliquable)

1. Compte sur plausible.io → « Add a website » → `cabinet.ma`.
2. Copier le snippet :
   ```html
   <script defer data-domain="cabinet.ma" src="https://plausible.io/js/script.js"></script>
   ```
3. Coller dans le `<head>` du site (Astro : `Layout.astro` ; WordPress : header.php ou plugin).
4. Vérifier 5 min plus tard dans le dashboard (vue Realtime) + dans les DevTools (Network) : la requête `api.plausible.io/event` sort bien.
5. Bloquer le referral de ton propre IP (Settings → Ignore traffic → tes IP du bureau) : sinon tes sessions de test faussent les vues.
6. Objectifs : ajouter `custom event` `diagnostic_booked` déclenché à la soumission Calendly (snippet `plausible('goal', {name:'diagnostic_booked'})` dans la page de merci).

## Alternative souveraine : Matomo auto-hébergé

- Matomo sur un VPS (OVH ≈5-10 €/mois) : tu hébergé toi-même, 0 transfert, cookies optionnels (mode « cookieless » dispo).
- Gratuit en self-host ; à privilégier quand le site dépasse ~50-100 k pages vues/mois et que tu veux l'e-commerce analytics.
- Coût caché : la maintenance (mises à jour, sécurité du serveur).

## Registre 09-08 : même avec Plausible, une ligne suffit

Modèle : `05_Document_Bank/templates/05_Registre_09-08_Modele.md`.

```
Finalité        : mesure d'audience anonymisée
Base légale     : intérêt légitime (fonctionnement du site)
Données         : pages vues, pays, referer — 0 cookie, IP non conservée
Destinataire    : Plausible (UE) — pas de transfert hors UE
Durée           : 13 mois max
Droits          : contact@cabinet.ma
```

Aucune autorisation de transfert n'est nécessaire pour Plausible (traitement UE) — c'est précisément l'argument de vente.

## Installer un objectif de conversion (10 min)

1. Sur le site : page de merci post-réservation (`cabinet.ma/merci`).
2. Plausible → Settings → Site settings → **Goals** → « Add goal » → type « Custom event », nom `diagnostic_booked`.
3. Dans la page merci, avant `</body>` :
   ```html
   <script>plausible('goal', {name: 'diagnostic_booked'});</script>
   ```
4. Tester en réservation réelle (ton propre lien) → la conversion apparaît dans Reports → Conversions sous 1-2 min.
5. Ajouter un second objectif `newsletter_ok` si un capture email existe — deux goals suffisent à un jeune cabinet ; au-delà, tu mesures pour ne pas décider.

## Ce que Plausible ne mesure PAS (et pourquoi c'est le principe)

- Pas de cookie persistant → pas de « même visiteur retrouvé 3 semaines plus tard » ; tu vois des sessions, pas des individus.
- Pas de données démographiques, pas de liste d'IP, pas de heatmaps : l'outil ne peut pas être compromis par une demande d'identification — c'est ça, la conformité par conception.
- Conséquence honnête : les chiffres « repeat visitors » sont approximatifs (fenêtre 24 h) ; ne construis jamais un reporting client sur cette limite — ou passe à Matomo avec cookies opt-in documentés.

## Interpréter les données : les 3 pièges du cabinet

1. **Le pic d'anniversaire** : un post LinkedIn viral ≠ une demande en hausse — croise TOUJOURS vues et réservations ; la seule courbe utile est `diagnostic_booked`.
2. **Le pays qui ment** : des vues depuis les US peuvent être un agrégateur ou ton futur client ; ne conclus pas sur la localisation, conclus sur le referrer.
3. **L'article qui performe et qui convertit mal** : trafic large = curieux, pas clients ; si un article « droit du travail » attire sans diagnostics, il nourrit la notoriété, pas le pipeline — décide lequel tu veux.

## Plausible / Umami / Matomo en une page

| Critère | Plausible | Umami | Matomo |
|---|---|---|---|
| Prix | ≈9-14 $/mois | Gratuit cloud limité / self-host gratuit | Gratuit self-host (VPS) ; cloud payant |
| Hébergement | UE | Toi (Node, simple) | Toi ou cloud |
| Cookies / consent | Non requis (0 cookie) | Non requis en config par défaut | Paramétrable (sans cookie possible) |
| Profondeur | Essentielle | Essentielle | E-commerce, funnel, heatmaps |
| Maintenance | Zéro | Légère | Réelle (PHP/DB, mises à jour) |
| Verdict cabinet | Standard M0-M12 | Alternative si tu aimes bricoler | Au-delà de 50-100k vues/mois |

## KPI à suivre (hebdo, 10 min, dimanche)

1. Top 3 articles (vues) → sujet à décliner en carrousel.
2. Source top : LinkedIn vs Google vs direct → si LinkedIn >60 %, ton SEO de niche a de la place.
3. Taux de rebond d'un article >70 % → article trop court ou titre promettant autre chose.
4. Objectif `diagnostic_booked` : le ratio vues→réservations est ta seule vraie mesure marketing. Cible indicative de pilotage (pas une norme) : ~0,5-1 % des vues qualifiées → un diagnostic.
5. Trajectoire : 1 000 vues mensuelles à M6 ≈ 1 diagnostic/semaine.

## Erreurs classiques

- Recopier le script sur un staging avec le mauvais `data-domain` → données perdues.
- Garder GA4 « le temps de voir » → les deux collectent, le risque court dès le premier jour.
- Promettre à un client « 100 % conforme CNDP » → on ne promet jamais une conformité, on documente un état (registre + choix d'outil).
- Oublier que la **mesure d'audience est un traitement** : elle vit au registre, avec les autres (intake, facturation, IA).

> **Lecture pro :** l'analytics sobre est un argument commercial en soi — quand un client e-commerce te demande « pourquoi pas GA ? », tu sors le tableau ci-dessus, et tu vends la mission de mesure d'audience conforme (ligne du catalogue e-commerce, cf. `02_Niches_Deep_Dive\02_Ecommerce_Dropshipping_YouCan\`).

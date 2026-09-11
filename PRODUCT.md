# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: **Choix exercé 2026-08-28 pour le shell A — retained vanilla static HTML/CSS/JS** (`webapp/` avec `marked` + `Chart.js` vendored, `node webapp/scripts/build.js` → `data.js`) avec design brass rebuild (Plaque & Encrier). Liberté framework totale accordée par l'utilisateur (« si plus esthétique ») — évaluation : Astro/Next/SvelteKit n'apportent pas de gain esthétique sur une app offline file:// où le principe « Posséder son outil » prime ; le vanilla file:// reste plus beau (immédiat, sans build, parchemin/encre intact) et porte la même grammaire qu'un framework générerait en statique. Migration vers Vite/Astro reste ouverte pour de futures surfaces générées, mais non retenue ici. Hébergement : GitHub Pages (`webapp/`) — toujours relatif + hash, pas de base-path.

## Users

**Primary — Avocat solo Droit de l'Entreprise, petite ville / petit cabinet, ADHD-friendly.** Situation : lancement ou scale d'un cabinet sans publicité (Loi 28-08 interdit publicité/démarchage). Bureau = studio Zoom à faible coût, portée nationale (Casa / Rabat / Tanger) + internationale (Dubai / Paris, MRE). Job : acquérir des clients B2B récurrents (pas dossiers one-shot) en productisant le droit (packs, templates, Notion, Loom) plutôt qu'en vendant de l'heure. ADHD-friendly : besoin d'un OS quotidien qui soutient l'exécution sans burnout.

Pas d'audience secondaire à figer pour l'instant — usage solo. Les clients finaux (freelancers offshore, e-commerçants YouCan, PME Loi 09-08, créateurs, MRE, AE→SARL) sont les *cibles* des niches du vault, pas des utilisateurs du produit lui-même.

## Product Purpose

AVOCATO fait exister ce qui manquait au Maroc : un système complet pour obtenir des clients **sans publicité** et faire tourner le cabinet au quotidien, dans une seule app offline.

- **Vault (Base documentaire)** — 587 docs : stratégie & déontologie (loi 66-23, ex-28-08 — 06_Deontologie_Pratique), 11 niches deep-dive, 6 canaux d'acquisition sans pub, 19 compétences (Legal Tech, AI, Sales, Design, Finance cabinet, Drafting FR/EN, Litigation basics, Recherche juridique, Client Ops, Opérations, EQ/désescalade, Structuration transfrontalière, etc.), système ADHD, plan 90 jours, jurisprudence. Chaque doc est lisible, cherchable, avec TOC, checklists persistées, charts auto et mode sombre/impression.
- **Cabinet OS** — offline localStorage : dossiers (client, ICE, type, mission, honoraires HT/TVA/TTC, provision %, statut, échéance), conventions d'honoraires (ex-art. 30 loi 28-08 → loi 66-23, numérotation en transposition) (CH-YYYY-XXX), reçus provision + factures solde, échéances, bibliothèque 8 modèles + fiches jurisprudence, export/import JSON.

Le produit existe pour transformer la contrainte légale en avantage. Succès = pipeline éducatif qui génère des diagnostics → conventions signées (provision 50 % encaissée) → missions productisées (600–28 000 DH HT) → livrables + restitution (Loom / Zoom / cabinet) + → solde → abonnements 2 500–6 000 DH HT/mois, sans dépendre du bouche-à-oreille ni de la prospection interdite, et tenu dans la durée grâce à l'OS ADHD.

## Positioning

Le seul système qui combine **vault d'acquisition sans pub + packs juridiques productisés + OS ADHD + Cabinet OS offline** en une seule web-app statique utilisable en double-clic.

Un concurrent générique (banque de modèles, SaaS de gestion de cabinet, ou formation marketing) ne peut pas copier véridiquement : (1) la conformité déontologique marocaine 28-08 « Éduquer, pas publiciser » intégrée à chaque script/canal, (2) la spécialisation Business Law récurrente + 6 niches non saturées scorées pour le Maroc, (3) l'avantage trilingue FR/AR + EN pour capter MRE / offshoring / startups / freelancers payés en USD (90 % des avocats FR/AR only), (4) l'ADHD OS comme principe de conception, et (5) le tout possédé en local (file://, localStorage, pas de serveur).

## Operating Context

**Modes (toggle en tête de sidebar) :**
- **📚 Base (Vault)** — lecture : dashboard progression par dossier, charts revenu/distribution, rendu markdown (tables, blockquotes, code, TOC), auto-charts « 📊 Voir en graphique », blocs ` ```chart:line/bar/doughnut `, checklists `- [ ]` persistées, recherche `/`, prev/next `[` `]`, thème `d`, A−/A+, impression.
- **⚖️ Cabinet OS** — opération : Tableau de bord (CA HT, provisions, en-cours, retards + charts statut/CA par mission + échéances 7j), Dossiers CRUD + fiche liée, Conventions (aperçu imprimable → window.print PDF), Factures, Échéances, Bibliothèque, Outils (exemples, export/import JSON).

**Flux pro canonique :** Dossier → Convention d'honoraires (provision 50 %, art. 30) → Lettre de mission → Livrables + restitution (Loom / Zoom / cabinet) → Facture solde + PV de remise → Clôture / Abonnement. Tous montants HT + TVA (20 % si assujetti, 0 % art. 91 CGI sinon).

**Environnement & tech :** App 100 % statique, offline — double-clic `webapp/index.html` (hash routing, chemins relatifs, vendor `marked.min.js` + `chart.umd.min.js`). Source de vérité = 587 `.md` (rebuild `node webapp/scripts/build.js` → `webapp/data.js`). Cabinet = `localStorage` (`avocato:dossiers`, `conventions`, `factures`, `echeances`, `read`, `checks`, `folders`, `theme`, `font`, `mode`). Déploiement GitHub Pages via `.github/workflows/deploy.yml` (rebuild + deploy `webapp/` sur push `main`, Settings → Pages → Source: GitHub Actions). Backend local optionnel `server/` (node:http + node:sqlite, port 8790), sync désactivée par défaut.

**Documents & rituels :** 8 modèles (convention, reçu/facture, lettre de mission, PV, trames contrats/CGV/registre, scripts) + 4 fiches jurisprudence/déontologie. Rituels ADHD : daily OS, weekly review, body-double / dopamine menu, deep-work Pomodoro.

## Capabilities and Constraints

**Capacités confirmées :**
- Vault reader complet (587 docs, 9 domaines : 00_START_HERE, 01_Strategy, 02_Niches ×11, 03_Acquisition ×6, 04_Skills ×19, 05_Document_Bank, 06_ADHD, 07_90Day, 08_Jurisprudence) avec recherche plein-texte, suivi lecture, persistance checklists.
- Cabinet OS CRUD + générations imprimables (convention art. 30 numérotée, reçu provision, facture solde HT/TVA/TTC calculée), échéances auto-créées, filtres, export/import JSON.
- Charts : explicites (`chart:` fences) + implicites (table → graphique).
- Thème clair/sombre, tailles de police, responsive (sidebar drawer <860px, scrim), print stylesheet, accessibilité clavier.

**Contraintes confirmées :**
- Déontologie marocaine : Loi 28-08 (pas de publicité/démarchage — contenu = information juridique), Loi 09-08 / CNDP, Loi 31-08, DOC, Office des Changes IGOC 2024, fiscalité internationale, OMPIC — le vault justifie chaque pack par une grille sanction/procédure.
- Usage solo pour l'instant — pas de multi-tenant, pas de serveur, pas de données sensibles hors navigateur.

**Explicitement non décidé / liberté UI accordée (mise à jour) :**
- **Aucune contrainte visuelle ou stack** — confirmé 2026-08-28 : l'utilisateur, seul utilisateur, accorde liberté totale sur framework, palette, typo, layout et direction visuelle. Le système actuel (vanilla + tokens encrier/parchemin) est un point de départ observable, pas une norme à préserver. Toute proposition impeccable (Read/Operate) est recevable.

## Brand Commitments

Nom : **AVOCATO** (jeu Avocat + Avocado). **Aucune contrainte de marque imposée** — liberté UI totale confirmée 2026-08-28 (seul utilisateur, aucun asset intouchable).

Constats actuels (non contraignants, libres d'être remplacés) : marque « ⚖️ AVOCATO · Base documentaire & Cabinet OS », monogramme AV serif, palette encrier (`#0f2a44`) / parchemin (`#f7f5f0`/`#efece4`) / accent `#1fa89e`, typo system-ui, iconographie sobre. Langue produit : vault en français + glossaires AR, exemples EN pédagogiques (trilinguisme FR/AR/EN conserve sa valeur positionnement, mais sans contrainte visuelle). Ton : « Éduquer, pas publiciser ». Aucune référence externe rendue contraignante — impeccable a carte blanche sur la direction visuelle.

## Evidence on Hand

- Repo : `avocato` — `webapp/index.html` (318 lignes), `webapp/app.js` (702 lignes), `webapp/cabinet.js` (1410 lignes) + modules `cabinet-ops.js` (323), `cabinet-features.js` (1247), `cabinet-cour.js` (285), `cabinet-agenda.js` (1232), `cabinet-relations.js` (906), `cabinet-mahakim.js` (859), `sync.js` (421), `mock-data.js` (486), `palette.js` (129), `sw.js` (41), `webapp/data.js` (généré, 587 docs au 07/09/2026 — niche 08 étendue 14_→18_ hors passe audit), `webapp/scripts/build.js` (générateur), `webapp/vendor/marked.min.js` + `chart.umd.min.js` (offline). Backend local `server/index.js` (node:http + node:sqlite, port 8790).
- 582 `.md` source : `00_START_HERE/` (3), `01_Strategy/` (6 sous-domaines), `02_Niches_Deep_Dive/` (07 PI, 08 Fiscalité, 09 Office Changes, 10 MRE, 11 Nomads + 6 niches historiques), `03_Acquisition_Without_Ads/` (6 canaux), `04_Skills_To_Learn/` (19 dossiers), `05_Document_Bank/` (templates + registre), `06_ADHD_System/`, `07_90Day_Plan/`, `08_Jurisprudence/` (01–08 fiches).
- Templates : `05_Document_Bank/templates/01_Convention_Honoraires_Modele.md`, `03_Pack_Freelance_Contrat.md`, `04_Pack_Ecommerce_CGV.md`, `05_Registre_09-08_Modele.md` + reçus/PV/lettres (8 au total via Cabinet OS Bibliothèque).
- Deploy : `.github/workflows/deploy.yml` (GitHub Pages, Actions).
- État git : branch `main` à jour `origin/main` (Spinstersen/avocato), nombreuses modifications non commitées — redesign law-firm en cours (commits v3.3 encrier/or).
- Absences à ne pas fabriquer : pas de témoignages clients, pas de benchmarks CA réels, pas de données CNDP/OMPIC réelles au-delà des fiches — ne pas inventer.

## Product Principles

1. **Éduquer, pas démarcher** — chaque contenu doit être information juridique utile (09-08, 31-08, DOC, Office) qui attire, jamais publicité directe. La déontologie est un feature, pas un frein.
2. **Productiser, pas facturer l'heure** — packs à périmètre/montant fixe (HT/TVA clair), provision 50 % encaissée, livrables + restitution (Loom / Zoom / cabinet). Le temps est encapsulé, le client achète un résultat.
3. **Posséder son outil** — offline d'abord, localStorage d'abord, file:// d'abord. Pas de dépendance SaaS pour le cœur cabinet ; le vault reste lisible sans serveur.
4. **Trilingue par conception** — penser FR/AR/EN dès le pack, le template et le SEO. L'EN n'est pas une traduction, c'est un marché (MRE, nomads, offshoring).
5. **ADHD comme contrainte de design** — lisible, cherchable, cochable, imprimable, avec progression visible et rituels courts. Si l'OS ne se tient pas à 20 min/jour, le système échoue.

## Accessibility & Inclusion

ADHD-friendly comme exigence produit : hiérarchie visuelle nette, contrastes vérifiés, lecture sans distraction, cibles clavier (`/`, `[`, `]`, `d`, `Esc`), tailles de police réglables, mode sombre, impression épurée, checklists avec persistance. Supports gaucher/droitier non pertinent (web). Aucun standard WCAG formellement exigé pour l'instant, mais viser AA sur contraste et navigation clavier. Contenu en français avec translittération AR — prévoir lisibilité trilingue (RTL futur non requis aujourd'hui).

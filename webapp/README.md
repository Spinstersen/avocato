# AVOCATO — Vault & Cabinet OS — Web App

Une web app propre, lisible et offline : **Vault** (stratégie, niches, skills, plans) + **Cabinet OS** (dossiers, conventions, factures, échéances, frais, délais, veille). Aucun serveur, aucun internet — double-clic sur `index.html`.

## ▶️ Comment l'ouvrir

**Double-cliquez sur `index.html`** — fonctionne en `file://` (librairies vendues localement).

Optionnellement avec un serveur :
```
python -m http.server 8765 --directory "C:\Users\N\Documents\Default Project\avocato\webapp"
# http://localhost:8765
```

## 🗂️ Deux modes (toggle en haut de la sidebar)

| Mode | Usage |
| :--- | :--- |
| **📚 Vault** | Lisez la base de 638 docs (stratégie, 11 niches, 8 canaux d'acquisition, 21 skills, système ADHD, plan 90 jours, jurisprudence). Recherche, checklists, graphiques, suivi de lecture. |
| **⚖️ Cabinet OS** | Faites tourner votre cabinet — offline, localStorage. |

## 📖 Vault — fonctionnalités

- **Tableau de bord** — progression par dossier, graphique objectif de revenus, répartition, démarrage rapide.
- **Rendu lisible** — tableaux, citations, code, sommaire (TOC) par doc. **A−/A+ agrandit le texte des documents** (13,5 / 15 / 17 px, mémorisé).
- **Typographie hors-ligne** — polices auto-hébergées dans `fonts/` (aucun CDN), double-filet laiton sur les titres, données chiffrées en tabulaire.
- **Navigation** — groupes Piloter / Argent / Base repliables (état mémorisé), icônes SVG sur chaque vue ; sur mobile, A−/A+/thème se replient derrière « ⋯ ».
- **Accessibilité** — lien « Aller au contenu », palette Ctrl+K en combobox ARIA, graphiques avec table de données de repli.
- **Graphiques auto depuis les tableaux** — toute table numérique → bouton "📊 Voir en graphique".
- **Graphiques explicites** — blocs ` ```chart:line ` (bar/line/doughnut).
- **Checklists interactives** — `- [ ]` persistées, suivi de lecture, recherche (`/`), doc précédent/suivant (`[` `]`), mode sombre (`d`), A-/A+, impression.

## ⚖️ Cabinet OS — fonctionnalités (offline, localStorage)

| Vue | Fonction |
| :--- | :--- |
| **Aujourd'hui** | Retards, échéances 7 j, factures à encaisser, provisions à prendre + rituel daily + verrous ouverts (provision manquante, rythme absent). *Nouveau :* goulots et abonnements à facturer mis en évidence. |
| **Tableau de bord** | CA HT total, provisions, en-cours, retards + graphiques (statut, CA par mission) + échéances 7 j. *Nouveau :* **Trésorerie réelle** (Encaissé TTC/HT/TVA, À encaisser, Prévisionnel 90j, Frais, Net), **Objectif CA** (mensuel/annuel avec barre %), **Entonnoir Prospect→Signé** (Prospect, Convention envoyée/signée, En cours, Livré, Clôturé + taux de conversion), **Goulots d'étranglement** (dossiers bloqués > seuil). |
| **Pipeline** | Kanban drag & drop par statut. Passage en « signée/en cours/livré » sans provision encaissée → dialog **Forcer le verrou art. 30** (motif obligatoire, journalisé). |
| **Dossiers** | CRUD complet + verrous onboarding (pouvoirs, ICE, conflits, provision), **canal de restitution (Loom / Zoom / cabinet)**, **checklist de processus 15 étapes**, **journal des transitions**, timeline. *Nouveau :* champ **Partie adverse** (pour check conflits), section **Abonnement mensuel** (montant HT, début, prochaine facturation, jour), **Frais & débours** par dossier, **Veille liée**, alerte conflits. |
| **Conventions** | Convention d'honoraires (art. 30) depuis un dossier → aperçu imprimable + PDF, clause de restitution au canal du dossier, **RIB du cabinet en pied**. Numérotation séquentielle anti-collision (jamais de réutilisation). |
| **Factures** | Reçu provision + facture solde, statut Émise/Encaissée. **Encaisser le reçu de provision lève le verrou art. 30 et crée le rythme J0→J7 + garde-fous (6 échéances)**. *Nouveau :* **Factures d'abonnement** auto-générées (FH mensuel, statut Émise) + échéance « Renouvellement abonnement ». Suppression avec annulation. |
| **Échéances** | Liste triée, filtres (À faire/Faites/En retard), coche, suppression. Rythmes auto J0/J2/J4/J5/J6/J7 par dossier. *Nouveau :* bouton **📅 .ics** par ligne (télécharge un fichier iCalendar pour Google/Apple Calendar). |
| **Frais & Débours** *(nouveau A3)* | **Frais & Débours** — tous les débours du cabinet (timbres, OMPIC, CNDP, greffe, déplacement, traduction). Par dossier : date, catégorie, libellé, HT/TVA/TTC, remboursable (à refacturer), statut (À facturer/Facturé/Non remboursable). Totaux HT/TTC + « À refacturer ». Accessible globalement et depuis la fiche dossier. |
| **Délais CPC** *(nouveau C1)* | **Calculateur de délais** — presets CPC (Opposition 15j art.130, Appel 30j art.134, Pourvoi 30j, Injonction 15j, CNDP 60j) + personnalisé. Saisissez date de départ + N jours + mode (calendaire / ouvrable hors fériés/week-end). Gestion des **fériés MA 2026-27** (fixes : 1 jan, 11 jan, 1 mai, 30 juil, 14 août, 20-21 août, 6 nov, 18 nov + lunaires estimés Aïd al-Fitr ~20 mars, Aïd al-Adha ~27 mai) + week-end (sam/dim). Report automatique au prochain jour ouvrable (CPC art.512). Résultat : échéance brute + ajustée + bouton **Créer l'échéance** et **Télécharger .ics**. |
| **Veille juridique** *(nouveau C3)* | **Veille juridique** — base BO / sgg.gov.ma / CNDP / OMPIC / DGI / Office des Changes. Par entrée : date, source, titre, URL, tags, dossier lié, statut (À lire/Lu/Action requise/Archivé), notes. Filtres par source/statut + recherche. Liée aux dossiers (affichée dans la fiche). |
| **Paramètres** | Nom, barreau, ICE, tél, **RIB 24 chiffres + banque** — imprimés sur convention, reçu et facture. *Nouveau :* **Objectif CA** (HT mensuel/annuel) et **Liste noire conflits** (un par ligne, gérée depuis Paramètres). |
| **Bibliothèque** | 8 modèles (convention, reçu/facture, lettre de mission, PV, trames contrats/CGV/registre, scripts) → ouvre le doc dans le Vault. + fiches jurisprudence/déontologie. |
| **Outils** | Exemples, **Export/Import JSON complet v2** (dossiers, actes, frais, veille, réglages, lu/checklists, journal, numérotation) avec annulation. |

**Flux pro :** Dossier → Convention (provision 50%) → Lettre de mission → Livrables + restitution (Loom / Zoom / cabinet) → Facture solde + PV de remise → Clôture / Abonnement (mensuel auto). Tous les montants en **HT + TVA** (art. 91 CGI si non assujetti). Les **frais** s'ajoutent en sus ; les **abonnements** génèrent chaque mois une facture FH + échéance.

### 🆕 Nouveautés détaillées (11 features)

#### A1 — Abonnements facturés auto (mensuel)
- Dans **Dossiers → Nouveau/Éditer → étape 2** : cochez « Dossier en abonnement mensuel », saisissez **Montant mensuel HT**, **Début**, **Prochaine facturation**, **Jour préféré**.
- Si `Mission` contient « Abonnement », la case se coche auto.
- Au **Tableau de bord** (et à chaque ouverture), le moteur **Traite les abonnements** : pour tout dossier `abonnementActif` avec `prochaineFacturation ≤ aujourd'hui` et statut non Abandonné/Clôturé, il crée **Facture solde FH** (TVA du dossier) + **Échéance « Renouvellement abonnement »** pour ce mois, puis pousse `prochaineFacturation` au mois suivant.
- Dans la **fiche dossier** (si abonnement) : carte « Abonnement mensuel » avec montant TTC, prochaine date (échéance en rouge si dépassée), boutons **Générer facture du mois**, **Activer/Désactiver**, **Traiter tous**.

#### A2 — Trésorerie réelle
- **Tableau de bord → Trésorerie réelle** : 4 cartes **Encaissé TTC** (factures Encaissée), **À encaisser TTC** (Émise), **Prévisionnel 90j TTC** (soldes non facturés des dossiers Prospect→En cours + 3 mois d'abonnements à venir), **Frais débours TTC** (total HT/TTC + « À refacturer »). Badges : **TVA encaissée**, **Net encaissé (TTC - frais)**, **Relances : N factures**.
- Calcul : `Encaissé HT/TVA` somme des `ht/tva` des factures Encaissée ; `À encaisser` idem pour Émise ; `Prévisionnel` = soldes restants (TTC × (100-provision%)/100) pour dossiers non Clôturés/Abandonnés + abonnements des 90 prochains jours.

#### A3 — Frais & Débours
- **Frais & Débours** (vue globale) : table Date/Dossier/Catégorie/Libellé/HT/TVA/TTC/Remboursable/Statut + filtres par dossier/statut + totaux. Bouton **+ Ajouter un frais** → dialog (dossier, date, catégorie, HT, TVA, libellé, remboursable, statut).
- **Fiche dossier → Frais & Débours** : même table filtrée au dossier + total HT/TTC + badge « Total à refacturer ». Ajout/suppression inline, recalculé.

#### A4 — Objectif CA gamifié
- **Paramètres → Objectif CA** (ou bouton **Définir objectif** dans le tableau de bord) : saisissez **Objectif HT** et **Période** (mensuel/annuel). Stocké en `avocato:objectifCA`.
- **Tableau de bord → Objectif CA** : barre de progression `Réalisé HT / Objectif HT = %`, montant restant, niveau **· Bronze (≥40%) / Argent (≥70%) / Or (≥100%)**, couleur or/teal si ≥80%.

#### C1 — Calculateur de délais CPC
- Voir ci-dessus.

#### C2 — Check conflits v2 (fuzzy + adverse/liste noire)
- **Dossiers → Nouveau/Éditer** : champ **Partie adverse / Société adverse** + case **Conflits vérifiés**.
- **Paramètres → Liste noire conflits** : textarea (un par ligne : noms, sociétés, ICE). Stockée en `avocato:conflictList`.
- Moteur **fuzzy** : normalise (minuscule, sans accents, sans ponctuation), découpe en tokens, teste `inclusion` ou `Jaccard ≥0.5` entre `client/ICE/adverse` saisi et tous les dossiers existants + liste noire. Affiche **bannière ⚠️ X conflit(s) potentiel(s)** en haut de la fiche + hint sous le champ adverse en temps réel.

#### C3 — Veille juridique
- Voir ci-dessus.

#### D4 — Calendrier 1-clic .ics
- **Échéances** (vue globale) : colonne **📅** par ligne → télécharge `client-intitulé-date.ics` (VCALENDAR avec DTSTART all-day, SUMMARY = intitulé + client, DESCRIPTION = dossier + type).
- **Fiche dossier → Échéances** : idem. **Délais → Résultat** : boutons **Créer l'échéance** + **Télécharger .ics**.

#### F1 — Entonnoir Prospect→Signé
- **Tableau de bord → Entonnoir** : 6 barres **Prospect, Convention envoyée, Convention signée, En cours, Livré - solde dû, Clôturé** (largeur = count/max). Badges : **Conv. Prospect→Signé %** (signée / (prospect+envoyée+signée)), **Signé→Clôturé %**, **Abandonnés**.

#### F2 — Goulots d'étranglement
- **Tableau de bord → Goulots — bloqués > seuil** : liste des dossiers non Clôturés/Abandonnés où `jours depuis updatedAt > seuil` (Prospect 7j, Convention envoyée 10j, En cours 14j, Livré 7j) ou avec échéance en retard. Tri par ancienneté, bouton **Ouvrir**.

#### F3 — Recherche globale v2 (Ctrl+K)
- **Palette (Ctrl+K)** indexe désormais : **Actions** (Frais, Délais, Veille), **Dossiers** (client/ICE/mission/adverse), **Échéances** (intitulé/type/date), **Veille** (titre/source/tags), **Frais** (libellé/catégorie), **Factures** (num/type), **Docs** (Vault). Tapez un nom de client, une date, un tag « 09-08 » ou « CNDP » → tout remonte.

## ⌨️ Raccourcis (Vault)

| Touche | Action |
| :--- | :--- |
| `/` | Focus recherche |
| `[` / `]` | Doc précédent / suivant |
| `d` | Mode sombre |
| `Esc` | Fermer sidebar |

## 🔨 Rebuild après édition des .md

```
node webapp/scripts/build.js
```
Régénère `data.js` (638 docs au 10/09/2026). Aucun npm requis. Contrôle qualité du vault : `node webapp/scripts/lint-vault.js` (références mortes + marqueurs juridiques interdits).

## ✅ Tests

```
cd tests
npm ci
npm test
```
`npm test` lance `tests/run-all.mjs` : démarre un serveur isolé sur un port libre avec une base temporaire (`AVOCATO_DATA`), exécute les 12 fichiers de test (jsdom + API), puis nettoie. Aucun serveur manuel requis. `npm run test:server` ne lance que la suite sécurité de l'API. Le CI (`.github/workflows/test.yml`) exécute le rebuild + la suite complète sur chaque push/PR, Node 24, `TZ=Africa/Casablanca`.

## 🚀 Déployer sur GitHub Pages

L'app est 100% statique (chemins relatifs + hash routing) → fonctionne sur GitHub Pages depuis n'importe quel repo/subpath, sans config de base-path.

Le repo contient `.github/workflows/deploy.yml` : à chaque push sur `main`, il rebuild `data.js` et déploie `webapp/` via GitHub Actions.

Setup (une fois) :
1. Poussez le repo sur GitHub.
2. **Settings → Pages → Source: "GitHub Actions".**
3. C'est tout — chaque push met à jour le site.

## 📁 Fichiers

```
webapp/
  index.html            → entrée (Vault + Cabinet toggle)
  avocato-core.js       → helpers partagés (esc, uid, dates, calcTTC, provPct, fuzzy, ICS)
  app.js                → logique Vault
  cabinet.js            → logique Cabinet OS (dossiers, conventions, factures, échéances, frais, veille, délais)
  cabinet-features.js   → 11 nouvelles features (trésorerie, abonnements, objectif, entonnoir, goulots, ICS, conflits, veille, délais)
  cabinet-ops.js        → verrous art.30, journal, rythmes J0-J7
  cabinet-cour.js       → audiences & jugements (Phase C)
  cabinet-agenda.js     → calendrier, alertes, ICS VALARM, rôle d'audiences (Phase D)
  cabinet-relations.js  → clients, finances, LM/PV, relances, backup nag (Phase E)
  cabinet-mahakim.js    → import mahakim triple/AR, mapping, lots (Phase F/F+)
  mock-data.js          → seed/wipe/validate démo supprimable (Phase G)
  sync.js               → sync locale optionnelle vers server/ (Phase B) — ouvrir l'app via http://127.0.0.1:8790/app/ (origine file:// refusée par l'API)
  palette.js            → palette Ctrl+K (docs + dossiers + échéances + veille + frais + factures)
  icons.js              → jeu d'icônes SVG gravées (nav, statuts, actions) — pas d'emoji
  styles.css            → thème (Vault + Cabinet + print) ; --doc-size pilote A−/A+
  fonts.css             → @font-face auto-hébergées (Cormorant, Inter, JetBrains Mono)
  fonts/                → woff2 latin (variable) + licences OFL — fonctionne hors-ligne
  data.js               → GÉNÉRÉ (638 docs au 10/09/2026)
  scripts/build.js      → générateur
  scripts/fetch-fonts.mjs     → (one-shot) récupère les woff2 Google Fonts + licences
  scripts/gen-design-json.mjs → régénère .impeccable/design.json depuis DESIGN.md
  scripts/lint-vault.js       → références mortes + marqueurs juridiques interdits
  vendor/               → marked + Chart.js (offline)
```

Les .md restent source de vérité. Les données Cabinet sont dans le navigateur (`avocato:dossiers`, `avocato:frais`, `avocato:veille`, `avocato:echeances`, etc.) — exportez JSON régulièrement.

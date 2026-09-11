# AVOCATO — Thèmes : options, design systems, décision (07/09/2026)

> Document de référence avant adoption. Trois directions testées dans `webapp_v2_react/` (sélecteur Encrier / CMS / Éditorial, mêmes données, même logique). **Décision : thème CMS adopté** dans l'application principale `webapp/`. Les deux autres directions meurent avec l'archive du prototype (section 5).

## 1. Les trois options comparées

| | 1. Encrier (nuit premium) | 2. CMS — ADOPTÉ | 3. Éditorial (masthead clair) |
|---|---|---|---|
| Origine | Premier prototype `webapp_v2_react/` | Captures `cms.law` + raffinage proto | Voix validée « elle sonne juste », reconstruite en 3ᵉ thème |
| Fond | Encre `#070e1c` partout | Papier `#fbfaf7`, sidebar pétrole `#0a3942` | Papier lumineux `#fdfcf8`, surfaces blanches |
| Accent | Laiton `#c5a46a` | Orange `#e0641f` (CTA seuls) | Pétrole sobre, laiton (zéro orange) |
| Navigation | Sidebar sombre | Sidebar sombre (gardée) | Masthead horizontal clair |
| Typographie | EB Garamond + Inter | Cormorant Garamond + Inter + JetBrains Mono | Cormorant Garamond + Inter |
| Verdict | Écarté : fatigue diurne, écarts WCAG | **Adopté** : identité distinctive + lisibilité | Écarté : coquille inhabituelle pour un OS dense |

## 2. Design system du thème CMS (porté dans `webapp/`)

```css
--petrol: #0d535f;        /* second plan, filets forts */
--petrol-deep: #083a44;
--petrol-ink: #0b2e35;    /* boutons primaires, liens, focus */
--sidebar: #0a3942;       /* registre latéral (dégradé #0d4550) */
--sidebar-deep: #07272d;
--accent-cms: #e0641f;    /* appels à l'action UNIQUEMENT */
--accent-cms-deep: #b34d12;
--paper: #f6f0e3;         /* papier conservé, comme v2 CMS */
--brass: #c5a46a;         /* filets, exergues, serif */
```

Règles : papier conservé, sidebar sombre exclusive ; orange = provision/nouveau dossier/alertes J-15, jamais de remplissage décoratif ; pétrole = boutons, liens, focus, filets forts ; serif conservé (titres, wordmark, chiffres) ; tableaux au double filet haut ; chiffres tabulaires ; cibles ≥ 44px ; `prefers-reduced-motion` respecté.

Adoption fidèle (v4 bis — corrige le portage hybride initial) : purge du laiton des composants d'action et de navigation (sidebar, arbre, boutons, focus, calendrier, cloches, entonnoir, graphiques) — le laiton ne reste que pour filets, exergues, ombres et sceau ; plaque cuivre remplacée par un bloc marque sobre au filet orange ; pastilles d'état colorées conservées (la couleur porte l'état).

Composants portés et **branchés** : `.kicker` (Today/Pipeline/Dashboard/Dossiers/fiche) · `.stats-band` (dashboard, 4 chiffres) · `.btn-accent` (FAB « Nouveau dossier ») · `.tbl` double filet (`cab-table` + `doc`) · `.pill-*` (disponibles, pastilles sobres capitales) · `.toast` fond pétrole · manifest PWA pétrole `#0b2e35`.

**v5 (09/09/2026) — portage 1:1 achevé.** Tokens `:root` alignés sur le CMS du proto (laiton `#a98a4b`, ochre/bordeaux/success, `--accent-soft #fdeee2`) ; Inter + JetBrains Mono chargés ; composants `.btn-ink`, `.btn-line`, `.input`, `.index-row`, `.rule-double`, `.pill-ochre/.pill-bordeaux/.pill-green`, `.scroll-thin`, `.mono` portés ; bascule nuit conservée mais recalée sur le thème Encrier du proto ; `sw.js` en `avocato-v4`.

**v5.1 (09/09/2026) — UI dashboard + polices.** Piles de polices littérales (Inter / JetBrains Mono / Cormorant, comme `webapp_v2_react`) — le `var()` dans le raccourci `font:` était ignoré ; alias nocturnes (`--text`, `--text-dim`, `--accent-cms*`, `--warn`…) redéfinis en valeurs littérales dans `body.dark` ; tableau de bord : bandeau de chiffres unique (5 stats, dont provisions encaissées) — suppression des cartes KPI dupliquées ; légendes et axes Chart.js en Inter ; badge de démo en `.pill-green` ; `sw.js` en `avocato-v5`.

## 3. Table de portage (proto React → `webapp/` vanilla)

| Proto (`webapp_v2_react/src/`) | Cible (`webapp/`) | Note |
|---|---|---|
| `index.css` `:root` CMS | `styles.css` `:root` (v5 : valeurs 1:1 — papier `#fbfaf7`, lignes `#e3ddce`, encres `#12262b`, laiton `#a98a4b`, ochre/bordeaux/success repris) | Écarts résiduels : aucun sur la palette |
| `.sidebar-cab`, `.sidelink`, `.side-label` | Sidebar + `.cab-nav-item` | Mêmes couleurs, structure HTML inchangée |
| `.btn-accent`, `.kicker`, `.stats-band`, `.pill-*` | `styles.css` (nouveaux blocs) | Noms conservés pour la traçabilité |
| `App.jsx` (logique) | `cabinet.js` (kickers, stats-band — additif, ids stables) | Aucun `id`/`data-*` testé modifié |
| `body[data-theme]` | — | Non porté : thème unique, sélecteur supprimé |

## 4. Vérification exigée (stop si rouge)

`node webapp/scripts/build.js` → `tests/test-packs.mjs` + suite `tests/` → preview `webapp/` 200 → `detect`/`doctor` (référence : seul `em-dash-overuse` advisory).

## 5. Retraits — archiver puis supprimer (après `go` post-vérification)

| Cible | Contenu | Action |
|---|---|---|
| `webapp_v2_react/` (hors `node_modules/`, `dist/`) | Prototype 3 thèmes + `README_TEST.md` + `tests/test-v2.mjs` | copie → `_archive/webapp_v2_react/` puis suppression |
| `webapp_concepts/` | `index.html` + concepts A/B/C | copie → `_archive/webapp_concepts/` puis suppression |
| Code Encrier/Éditorial | `body[data-theme]`, `.theme-seg`, masthead | meurt avec l'archive (aucune trace dans `webapp/`) |

Intacts : `server/data/`, `tests/node_modules/`, `webapp/` (+ `DESIGN.md` mis à jour). Sans `git` disponible, `_archive/` est l'unique filet retour.

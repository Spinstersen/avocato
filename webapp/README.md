# AVOCATO — Web App v3 (deux applications, 100% offline)

Deux applications distinctes, aucune dépendance réseau — double-clic et ça marche :

| App | Fichier | Rôle | Accent |
|---|---|---|---|
| 🎓 **AVOCATO Learn** | `index.html` | Formation : lecture des 680 docs, curriculum ordonné, progression, QCM interactifs, recherche | Teal |
| ⚖️ **Cabinet OS** | `cabinet.html` | Gestion du cabinet : dossiers, conventions art.30, factures/provisions, échéances, bibliothèque | Bleu conseil |

Chaque app lie vers l'autre depuis sa barre latérale. Les données Learn (lu ✓, cases cochées, thème) sont séparées de celles du Cabinet (localStorage).

## Design system v3

Basé sur les meilleures pratiques UX éducatives (Coursera / Duolingo / Khan Academy / docs-as-code) :

- **Tokens sémantiques CSS** (`--bg`, `--bg-2`, `--bg-3`…) — surfaces en couches
- **Thème clair / sombre / système** — sombre `#121212` (pas de noir pur), contrastes WCAG AA
- **Progression toujours visible** — anneau global sur l'accueil, barres par module, point ● par doc lu, barre de progression de lecture en haut
- **Reprise de lecture** — carte « Reprendre » sur l'accueil + navigation précédent/suivant dans l'ordre du curriculum (00→01→08→02→…)
- **TOC scroll-spy** à droite (écrans larges) + sommaire repliable en colonnes
- **QCM interactifs** — réponses masquées derrière « Voir la réponse » 💡
- **Checklists persistées** — bind après insertion DOM (fix `bindContentEvents`)
- **Auto « lu »** à 90 % de scroll + bouton manuel `✓` (raccourci `l`)
- **Typographie de lecture** serif 17px, interligne 1.78, taille ajustable A−/A+
- **Responsive** — sidebar off-canvas mobile, `prefers-reduced-motion` respecté
- **Accessibilité** — focus visibles, aria-labels, raccourcis clavier : `/` recherche · `[` `]` leçons · `d` thème · `l` lu

## Ouvrir

Double-cliquer `index.html` (fonctionne depuis `file://`, librairies vendues localement).
Optionnel : `python -m http.server 8765 --directory webapp`

## Rebuild après modification des .md

```
node webapp/scripts/build.js   # → data.js (680 docs)
```

## Déploiement GitHub Pages

Le workflow `.github/workflows/deploy.yml` rebuild `data.js` et déploie tout `webapp/` — les deux pages (`/index.html`, `/cabinet.html`) sont servies.

# AVOCATO — Vault & Cabinet OS — Web App

A clean, readable, offline web app: **Vault** (strategy, niches, skills, plans) + **Cabinet OS** (dossiers, conventions, factures, échéances). No server, no internet — double-click `index.html`.

## 🚀 How to Open

**Double-click `index.html`** — works from `file://` (libraries vendored locally).

Optionally serve it:
```
python -m http.server 8765 --directory "C:\Users\N\Documents\Default Project\avocato\webapp"
# http://localhost:8765
```

## 🧭 Two Modes (toggle top of sidebar)

| Mode | Purpose |
| :--- | :--- |
| **📚 Vault** | Read the 177-doc knowledge base (strategy, 6 niches, 6 acquisition channels, skills, ADHD system, 90-day plan, jurisprudence). Search, checklists, charts, read tracking. |
| **⚖️ Cabinet OS** | Run your cabinet — offline, localStorage. |

## ✨ Vault Features

- **Tableau de bord** — progress per folder, revenue-target chart, distribution, quick-start.
- **Readable rendering** — tables, blockquotes, code, TOC per doc.
- **Auto-charts from tables** — any numeric table → "📊 Voir en graphique" toggle.
- **Explicit charts** — fenced ` ```chart:line ` blocks (bar/line/doughnut).
- **Interactive checklists** — `- [ ]` persisted, read tracking, search (`/`), prev/next (`[` `]`), dark mode (`d`), A−/A+, print.

## ⚖️ Cabinet OS Features (offline, localStorage)

| Vue | Fonction |
| :--- | :--- |
| **Tableau de bord** | CA HT total, provisions, en-cours, retards + charts (statut, CA par mission) + échéances 7 jours |
| **Dossiers** | CRUD complet (client, ICE, type, mission, honoraires HT/TVA/TTC, provision %, statut, échéance, contact, notes). Filtre + recherche. Fiche dossier avec conventions/factures/échéances liées. |
| **Conventions** | Génère **Convention d'honoraires** (art. 30 Loi 28-08) depuis un dossier → aperçu imprimable + PDF (window.print). Numérotation CH-YYYY-XXX. |
| **Factures** | **Reçu provision** + **Facture solde** depuis dossier/convention → aperçu imprimable, statut Encaissée/Émise. |
| **Échéances** | Liste triée, filtres (À faire/Faites/En retard), coche, suppression. Auto-créée à la création de dossier si échéance renseignée. |
| **Bibliothèque** | 8 modèles (convention, reçu/facture, lettre de mission, PV remise, trames contrats/CGV/registre, scripts) → ouvre le doc dans le Vault. + 4 fiches jurisprudence/déontologie. |
| **Outils** | Charger 3 dossiers d'exemple, Export/Import JSON (sauvegarde). |

**Flux pro :** Dossier → Convention (provision 50%) → Lettre de mission → Livrables + Loom → Facture solde + PV de remise → Clôture / Abonnement. Tous les montants en **HT + TVA** (art. 91 CGI si non assujetti).

## ⌨️ Shortcuts (Vault)

| Key | Action |
| :--- | :--- |
| `/` | Focus search |
| `[` / `]` | Prev / next doc |
| `d` | Dark mode |
| `Esc` | Close sidebar |

## 🔄 Rebuild after editing .md

```
node webapp/scripts/build.js
```
Regenerates `data.js` (177 docs). No npm needed.

## 🌍 Deploy to GitHub Pages

The app is fully static (relative paths + hash routing) → works on GitHub Pages from any repo/subpath, no base-path config needed.

The repo root contains `.github/workflows/deploy.yml`: on every push to `main`, it rebuilds `data.js` and deploys `webapp/` via GitHub Actions.

Setup (once):
1. Push the repo to GitHub.
2. **Settings → Pages → Source: "GitHub Actions".**
3. Done — every future push updates the live site automatically.

## 🗂️ Files

```
webapp/
  index.html        → entry (Vault + Cabinet toggle)
  app.js            → Vault logic
  cabinet.js        → Cabinet OS logic
  styles.css        → theming (Vault + Cabinet + print)
  data.js           → GENERATED (51 docs)
  scripts/build.js  → generator
  vendor/           → marked + Chart.js (offline)
```

Vault .md files remain source of truth. Cabinet data is in browser localStorage (`avocato:dossiers` etc.) — export JSON regularly.

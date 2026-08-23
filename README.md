# AVOCATO — Your No-Ads Client Acquisition Vault

> For a Moroccan `Avocat` (Droit de l'Entreprise) | Trilingual (AR/FR/EN) | Tech + AI + Design Savvy | Small City | Small Office | ADHD-Friendly

**Core Constraint:** Moroccan Law 28-08 forbids direct advertising/démarchage. This entire vault is built to get clients *without* advertising.

### Your Unfair Advantages (Why you will win)
1.  **Trilingual:** 90% of lawyers are FR/AR only. You can capture EN market: MRE, offshoring, startups, freelancers paid in USD.
2.  **Tech/AI/Design:** You can productize law (packs, templates, Notion) while others sell hourly consultations.
3.  **Small City = Low Cost + National Reach:** You don't need foot traffic. Your office is a Zoom studio. Your clients are in Casa/Rabat/Tanger + Dubai/Paris online.
4.  **Droit de l'Entreprise:** The most monetizable master for *recurring* B2B clients (not one-shot divorce cases).

### How to Use This Vault (ADHD Mode)
- **Don't read linearly.** Start with `00_START_HERE/00_READ_ME_FIRST.md` (5 min)
- Then pick **ONE niche** from `02_Niches_Deep_Dive/` (don't try 3 at once)
- Then run **ONE acquisition channel** from `03_Acquisition_Without_Ads/`
- Use `06_ADHD_System/` to not burn out

### 📖 Web App — Vault & Cabinet OS (Recommended)
Open **`webapp/index.html`** — double-click, offline. Toggle **📚 Base** (680 docs, charts, checklists) / **🎓 Curriculum** (ordre pédagogique) / **⚖️ Cabinet OS** (dossiers, conventions d'honoraires art. 30, factures, échéances, bibliothèque). Details: `webapp/README.md`. Rebuild after editing .md: `node webapp/scripts/build.js` (génère `webapp/data.js`).

### ⚖️ Veille légale 2025-2026 — LIRE AVANT TOUT DIAGNOSTIC (vérifié le 23/08/2026)

Trois réformes majeures changent les règles citées dans ce vault. Détail complet + calendrier : **`00_START_HERE/12_VEILLE_LEGALE_2025_2026.md`**.

| Loi | Entrée en vigueur | Impact express |
|---|---|---|
| **Loi 58-25** — nouveau Code de procédure civile (BO n°7485 du 23/02/2026) | **24 août 2026** | Ancien CPC 1974 abrogé : requête écrite **ou électronique**, audiences à distance encadrées, notification via adresse CIN, juge de la mise en état renforcé, **voies de recours conditionnées à la valeur du litige**, médiation systématique. Affaires en cours → ancien régime |
| **Loi 66.23** — profession d'avocat (dahir 1-26-75 du 18/08/2026, BO n°7536 du 20/08/2026) | Immédiate [vérifier art.146] | Master obligatoire, stage 2 ans, limitation des mandats, traçabilité des honoraires, contrôle Cour des comptes, discipline réformée. Décision Cour constitutionnelle pendante — à surveiller |
| **Loi 03.23** — Code de procédure pénale (BO n°7437 du 08/09/2025) | **8 décembre 2025** (déjà en vigueur) | Détention provisoire exceptionnelle + peines alternatives, défense renforcée, victimes protégées, notification CIN |

> Règle vault : chaque chiffre garde sa **base légale + date de vérification**. Pendant la transition 58-25, la date de dépôt de la requête décide du régime applicable (art. 641).

### 🌍 Deploy to GitHub Pages (free hosting)

1. Create a repo on GitHub and push this folder:
   ```
   git init
   git add .
   git commit -m "AVOCATO vault + web app"
   git branch -M main
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Source: "GitHub Actions"** (not branch).
3. The workflow `.github/workflows/deploy.yml` rebuilds `data.js` and deploys automatically on every push.

Live URL: `https://<user>.github.io/<repo>/` — no server needed, works from any subpath (relative links + hash routing).

### Folder Map
```
00_START_HERE/          -> Start here (5 min)
01_Strategy/            -> Big picture + déontologie Loi 28-08 (06_Deontologie_Pratique)
02_Niches_Deep_Dive/    -> 12 niches (missions HT, provision 50%, convention) — freelancers, e-commerce, 09-08, créateurs, MRE, AE→SARL, PI, fiscalité internationale, Office des Changes, nomads...
03_Acquisition_Without_Ads/ -> 6 channels sans publicité
04_Skills_To_Learn/     -> 19 tracks de skills (sales, français, sharpness, IA, design, litigation, LE drafting, finance, automatisation IA, secteurs…)
05_Document_Bank/       -> 11 templates pros + 3 fiches opérationnelles (convention, reçu, PV, registre, checklist 19 points…)
06_ADHD_System/         -> OS quotidien
07_90Day_Plan/          -> Plan 90 jours
08_Jurisprudence/       -> 8 dossiers citables ×7 fichiers (texte, décisions, grille, phrase diagnostic, fiches, source V1) + veille mensuelle
webapp/                 -> Vault reader + Cabinet OS (offline, localStorage)
```

### Golden Rule: Educate, Don't Advertise
You are forbidden to say: "I am the best lawyer, hire me!"
You are ALLOWED to say: "Here is how Loi 09-08 impacts your e-commerce store. Common mistake #3 costs 50,000 DH HT."
The first is `publicité`. The second is `information juridique`. One is illegal, one brings clients.

**Next Step:** Open `00_START_HERE/00_READ_ME_FIRST.md`

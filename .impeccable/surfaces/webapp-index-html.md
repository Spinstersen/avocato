---
version: 2
slug: "webapp-index-html"
primary_target: "webapp/index.html"
related_targets: ["webapp/styles.css","webapp/app.js","webapp/cabinet.js","webapp/cabinet-features.js","webapp/data.js"]
---

# Surface: AVOCATO Shell — Read + Operate

## Scope
- Primary: `webapp/index.html` (single-page shell, hash routing, file:// offline)
- Related: `webapp/styles.css`, `webapp/app.js`, `webapp/cabinet*.js`, `webapp/data.js`, `webapp/icons.js`
- Mode: **Operate** (cabinet) + **Read** (vault) hybrid — shell is Operate, doc pane is Read

## Audience & Job
- Solo avocat Droit de l'Entreprise (ADHD) — job: tenir pipeline sans pub (diagnostic → convention art.30 → provision 50% → restitution → solde)
- Secondary: parcourir 638 docs (Read), gérer dossiers / échéances / audiences / finances (Operate)

## Proof / Content / Constraints
- Real: 638 .md bundled in `data.js`, dossiers/échéances/factures localStorage, convention CH-YYYY-XXX, tables HT/TVA/TTC tabular
- Constraints: loi 66-23 (éduquer, pas démarcher), offline file:// + localStorage, HT/TVA art. 91, no invented testimonials, no fabricated jurisprudence

## Chosen Direction
- **The Ink & Parchment Bureau — CMS register (v5).** Paper `#fbfaf7`, petrol sidebar `#0a3942`, action orange `#e0641f` (CTA only), brass `#a98a4b` rules, petrol-ink `#0b2e35` primary, Cormorant Garamond + Inter + JetBrains Mono, 2px controls, double-filet signature, stats band petrol-ink.
- First viewport: 280px petrol sidebar (wordmark, mode switch, search, tree) + paper content pane (dashboard ledger or document) — primary action orange "Nouveau dossier".
- Signature: brass double-rule, tabular mono money, flat tonal + card-rest shadow only, `seal` on signed conventions.

## Unresolved
- Framework: vanilla static retained (no build step) as the fitting form for an offline bureau; framework migration deferred.
- Motion: restrained — plaque sweep retired; only seal-press + progress fades; all disabled under `prefers-reduced-motion`.
- Dark: Encrier inversion (`#070e1c`) exists; `meta theme-color` must follow the toggle.

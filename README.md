# AVOCATO - Your No-Ads Client Acquisition Vault

> Pour un `Avocat` marocain (Droit de l'Entreprise) | Trilingue (AR/FR/EN) | Tech + AI + Design | Petite ville / Petit cabinet | ADHD-Friendly

**Contrainte :** La loi 66-23 (ex 28-08) interdit la publicité/démarchage. Tout ce vault est conçu pour obtenir des clients *sans publicité*.

### Vos avantages unfair (pourquoi vous allez gagner)
1. **Trilingue :** 90% des avocats sont FR/AR seulement. Vous captez le marché EN : MRE, offshoring, startups, freelances payés en USD.
2. **Tech/AI/Design :** Vous productisez le droit (packs, templates, Notion) pendant que d'autres vendent de l'heure.
3. **Petite ville = Coût faible + Portée nationale :** Pas besoin de passage. Votre bureau est un studio Zoom. Vos clients sont à Casa/Rabat/Tanger + Dubai/Paris en ligne.
4. **Droit de l'Entreprise :** Le master le plus monétisable pour des clients B2B récurrents (pas des dossiers one-shot divorce).

### Comment utiliser ce Vault (mode ADHD)
- **Ne lisez pas linéairement.** Commencez par `00_START_HERE/00_READ_ME_FIRST.md` (5 min)
- Puis choisissez **UNE niche** dans `02_Niches_Deep_Dive/` (pas 3 à la fois)
- Puis lancez **UN canal d'acquisition** dans `03_Acquisition_Without_Ads/`
- Utilisez `06_ADHD_System/` pour ne pas cramer

### 🖥️ Web App — Vault & Cabinet OS (recommandé)
Ouvrez **`webapp/index.html`** — double-clic, offline. Toggle **📚 Vault** (638 docs, graphiques, checklists) / **⚖️ Cabinet OS** (dossiers, conventions d'honoraires art. 30, factures, échéances, frais, délais, veille, bibliothèque). Détails : `webapp/README.md`. Rebuild après édition des .md : `node webapp/scripts/build.js`.

### 🆕 Nouveautés Cabinet OS — 11 features (sept 2026)

**Trésorerie & pilotage :**
- **A1 Abonnements** — facturation mensuelle auto (FH + échéance) + panel par dossier.
- **A2 Trésorerie réelle** — Encaissé / À encaisser / Prévisionnel 90j / Frais / TVA / Net, dans le tableau de bord.
- **A3 Frais & Débours** — nouvelle vue globale + par dossier (timbres, OMPIC, déplacements, etc., remboursables).
- **A4 Objectif CA** — objectif HT mensuel/annuel + barre % + niveaux Bronze/Argent/Or.

**Ops juridiques :**
- **C1 Calculateur délais CPC** — presets 15j/30j, fériés MA 2026-27, report au prochain ouvrable, création d'échéance + .ics.
- **C2 Conflits v2** — check fuzzy (sans accents, Jaccard ≥0.5) sur client/ICE/adverse + liste noire (Paramètres), alerte dans la fiche.
- **C3 Veille juridique** — base BO/sgg/CNDP/OMPIC/DGI/OC (À lire/Lu/Action requise), liée aux dossiers.

**Productivité :**
- **D4 .ics 1-clic** — bouton 📅 sur chaque échéance (et depuis Délais) → fichier iCalendar.
- **F1 Entonnoir** — Prospect→Signé et Signé→Clôturé en % + barres.
- **F2 Goulots** — dossiers bloqués > seuil (7/10/14j) + retards.
- **F3 Recherche globale v2** — Ctrl+K indexe dossiers + échéances + veille + frais + factures + docs.

Voir le détail complet dans `webapp/README.md` → section « Cabinet OS — fonctionnalités ».

### 🚀 Déployer sur GitHub Pages (hébergement gratuit)

1. Créez un repo sur GitHub et poussez ce dossier :
   ```
   git init
   git add .
   git commit -m "AVOCATO vault + web app"
   git branch -M main
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
2. Dans le repo : **Settings → Pages → Source: "GitHub Actions"** (pas branch).
3. Le workflow `.github/workflows/deploy.yml` rebuild `data.js` et déploie automatiquement à chaque push.

URL live : `https://<user>.github.io/<repo>/` — pas de serveur, fonctionne depuis n'importe quel subpath (liens relatifs + hash routing).

### Dossiers
```
00_START_HERE/          -> Commencez ici (5 min)
01_Strategy/            -> Big picture + déontologie (loi 66-23, ex-28-08 — 06_Deontologie_Pratique)
02_Niches_Deep_Dive/    -> 11 niches auditées (missions HT, provision 50%, convention)
03_Acquisition_Without_Ads/ -> 8 canaux sans publicité (6 playbooks + 2 fiches)
04_Skills_To_Learn/     -> 21 dossiers de compétences (Sales, French, sharpness, AI, design, SEO, speaking, négo, finance, DRAFTING FR/EN, litigation basics, recherche juridique, client ops, SOP/ops, EQ/désescalade, structuration internationale, compta)
05_Document_Bank/       -> 16 modèles pros + 3 fiches (convention, reçu, PV, trames)
06_ADHD_System/         -> OS quotidien
07_90Day_Plan/          -> Plan 90 jours
08_Jurisprudence/       -> Banque vérifiée (références ouvertes uniquement) + méthode 3V
webapp/                 -> Vault reader + Cabinet OS (offline, localStorage)
```

### Règle d'or : Éduquer, pas démarcher
Il vous est interdit de dire : "Je suis le meilleur avocat, engagez-moi !"
Vous avez le droit de dire : "Voici comment la loi 09-08 impacte votre boutique e-commerce. L'erreur #3 coûte 50 000 DH HT."
Le premier est `publicité`. Le second est `information juridique`. L'un est illégal, l'autre apporte des clients.

**Prochaine étape :** Ouvrez `00_START_HERE/00_READ_ME_FIRST.md`

### Accents
Tous les fichiers sont en UTF-8 propre (`<meta charset="UTF-8">`). Après une mise à jour, faire Ctrl+Shift+R si le navigateur affiche d'anciens caractères.

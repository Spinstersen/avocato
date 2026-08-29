# BRASS — Prochaine implémentation (choix 1-a · 2-a · 3-P1+P2)

> **Contexte :** Critique `webapp/index.html` du 2026-08-28 — score **24/40 Acceptable** — monde **Plaque & Encrier** `seed df3c790f` (ink `#070e1c` + parchment `#f6f0e3` + brass `#c5a46a` + teal `#1a8a7f` rare). Tes choix : **1-a Réassurance provision 50%** · **2-a Garder plaque prestige ink/sweep tel quel (pas de bande aube)** · **3 P1+P2 (top 3 P1 + 2 P2 = 5 issues)**. Ce README est la to-do implémentable la prochaine fois — coche, code, vérifie.

**Fichiers cibles :** `webapp/index.html` · `webapp/styles.css` · `webapp/app.js` · `webapp/cabinet.js` · `webapp/scripts/build.js` (BOM fix déjà fait) · `DESIGN.md`/` .impeccable/design.json` après.

**Comment utiliser :** Ouvre `webapp/index.html` double-clic ou `python -m http.server 8766 --directory webapp` puis coche chaque `- [ ]`. Hard refresh `Ctrl+Shift+R` après chaque lot CSS/JS.

---

## Règle d'or pour cette passe (2-a)

- **Garder** plaque `320px` ink `linear-gradient(#0a1430,var(--ink),#0b162e)` + `inset brass` + sweep `rotate(12deg) translateX` `0.9s`, encrier `radial 40%+80%`, double-filet or `4px+1px`. Ne pas réchauffer vers aube rose/cobalt.
- Palette reste `ink #070e1c / parchment #f6f0e3 / brass #c5a46a / teal #1a8a7f ≤10%` + terracotta `#9c3a1a`. Dark garde `var(--ink) #070e1c → #0d1322`.
- Typo reste `EB Garamond 500/700 italic` + `Public Sans 400-700` + `Cascadia Code` tabular.

---

## P1 — Réassurance provision 50% (pic confiance) — priorité 1-a

**Problème :** `cabinet.js:411-436` preview `CH-YYYY-XXX` à crochets `[Nom]/[Ville]/[X]` + `Loom 15min` hardcodé, pas de liaison live avec le champ `provisionPct` de `index.html:120`, pas d'explication art.30 au moment où on demande l'argent. Chute confiance au pic.

### À faire — `webapp/index.html:120`

- [ ] **Aide inline collée au champ** `Provision %` : ajouter sous `<input name="provisionPct">` un `<span class="field-help">ⓘ Exigible avant démarrage — reçu immédiat, art.30 Loi 28-08. Solde à la remise.</span>` `11px #6b6a63` avec `aria-describedby`.
- [ ] **Calcul live miroir** : au-dessus du bouton `Enregistrer dossier` ajouter `<div id="provisionLive" class="mono" aria-live="polite"></div>` qui affiche `HT 3 500 → TTC 4 200 · Provision 50% = 2 100 TTC` mis à jour `input` `honoraires`, `tva`, `provisionPct` (`calcTTC` même formule que `cabinet.js:49`). `font 12px tabular`.

### À faire — `webapp/cabinet.js:49` `calcTTC` + `openDlgDossier` + `genConvention`

- [ ] **Hydrater identité plaque** : dans `genConvention` `previewConvention`, remplacer `[Nom]/[Ville]/[X]` par valeurs plaque `Me Alami` / `Barreau` lues depuis `plaque-meta` ou `localStorage avocato:plaque` (fallback `Me [Nom]` si vide). Injecter `dossier.client` + `ICE` déjà fait, mais ajouter `dossier.contact` tel.
- [ ] **Miroir param mission** : remplacer lorem `"1 présentation Loom 15 min + 1 révision sous 7 jours"` par mapping mission → texte (ex: `Diagnostic → 1 restitution Loom 15min + 1 correctif J+7`, `Loi 09-08 → Registre 5 onglets + dépôt CNDP`). Si mission inconnue, garder générique mais sans crochets.
- [ ] **Lien visuel provision** : dans preview table, ligne `Provision 50% = 2 100 TTC` doit reprendre exactement la valeur du live ci-dessus (même `calcTTC` + `provisionPct`). Ajouter microcopy sous table `12px #6b6a63` : `Provision encaissée à la signature — protège art.30, solde verrouillé à la remise. RIB 24 chiffres en pied.`

**Acceptance :**
- Saisir `3 500 HT / TVA 20% / 50%` → live affiche `2 100 TTC` et preview identique.
- Ouvrir un dossier existant → convention montre `Me Alami` pas `[Nom]`.
- Pas de crochets restants dans la feuille imprimable.

**Commande suggérée :** `/impeccable clarify webapp/index.html`

---

## P1 — Overload à l'entrée (27 options d'un coup)

**Problème :** `app.js:346` `isOpen = foldersOpen[folder] !== false` ouvre 14 dossiers + 177 `tree-item` + dialog 11 champs (7 types + 6 missions + 7 statuts) = silo attention. `app.js:277` TOC toujours `open` si `>1`. ADHD wall.

### À faire — `webapp/app.js:326` `renderTree`

- [ ] **Collapse par défaut en 4 cohortes** : grouper `FOLDER_ORDER` en `Commencer ici (00)` / `Niches (02)` / `Acquisition (03) + Stratégie (01)` / `ADHD/90j (06/07)` + `Jurisprudence (08)` + `Banque (05)`. Au boot, `isOpen = filter ? true : (cohorte === 'Commencer' ? true : false)` puis `Voir tout (490)` `<button>` qui `foldersOpen[folder]=true` pour tous. Persister `foldersOpen` déjà fait.
- [ ] **Chip reprise** : sticky au-dessus de `#tree` : `<div id="resumeChip"><span>Dernier: 00_READ_ME_FIRST.md</span><button>Reprendre</button></div>` lisant `LS.get('last')` + `read` progression `23%`. Clic → `openDoc(last)`.
- [ ] **TOC disclosure** : passer `toc` de `open` à `details` fermé par défaut si `toc.length > 4`, bouton `Sommaire (6)` `11px uppercase`.

### À faire — `webapp/index.html:94` `dlgDossier`

- [ ] **Dialog en 2 steps** : step1 `Prospect (3 champs)` `Client/ICE`, `Type`, `Mission` + `Honoraires` + `Continuer`. Step2 `Avancé` `TVA`, `Provision %` (avec aide ci-dessus), `Statut`, `Échéance`, `Contact`, `Notes` + `Enregistrer`. Garder `1fr 1fr` mais masquer step2 `hidden` jusqu'à `Continuer`. Validation `honoraires` garde `required`, pas de blocage step1 si `tva/provision` vides (défauts 20/50).

**Acceptance :**
- Premier affichage : ≤4 cohortes ouvertes, `Voir tout (490)` visible, `Reprendre` chip fonctionnel.
- Dialog `Nouveau dossier` montre 4 champs d'abord, pas 11.

**Commande suggérée :** `/impeccable distill webapp/index.html`

---

## P1 — Fork Base ↔ Cabinet brise le flux signature

**Problème :** `index.html:34` `mode-switch` plaque (2 pills `📚Base/⚖️Cabinet`) contrôle `cabinet.js:65` visibilité `tree/search` vs `cabinetNav`. Recherche disparaît en Cabinet, `Nouveau dossier` enterré `cab-nav-item` `9px`. Bibliothèque `cabinet.js:666` nécessite 2 hops `setMode('vault')+hashchange`.

### À faire — `webapp/index.html:34` + `webapp/cabinet.js:57` `setMode`

- [ ] **FAB primaire** : en Cabinet, afficher `button#fabNewDossier` `position:fixed bottom 18px right 18px` `ink/brass` `＋ Nouveau dossier` `N` shortcut. Même action que `openDlgDossier()`, `aria-label`.
- [ ] **Recherche cross-mode** : garder `#searchWrap` visible en Cabinet mais filtrer `STORE.dossiers` (`client/ICE/mission`) via `filterDossiers()` au lieu de masquer `hidden`. Placeholder `Rechercher dossier… ( / )`.
- [ ] **Crumbs dernier doc** : en Cabinet `crumbs` ajout `<span class="pill mono" id="lastDocChip">Dernier: 00_READ_ME_FIRST</span>` clic → `setMode('vault')`.

**Acceptance :**
- En Cabinet, `N` ouvre dialog, `/` focus search dossiers, `lastDocChip` ramène Base.

**Commande suggérée :** `/impeccable layout webapp/index.html`

---

## P2 — Contrôles micro icon-only échouent ADHD AA

**Problème :** Topbar `webapp/index.html:77` `←→✓A−A+🌙` `34px` `icon-btn`, mode `◈▣✎`, `caret 10px` `▶` sans label, `11px uppercase rgba(.26)` fail 4.5:1.

### À faire — `webapp/styles.css:136` `icon-btn` + `webapp/index.html:54` `cab-nav-item .glyph`

- [ ] **Cibles 40px** : passer `icon-btn` `34→40px` `border-radius 2px`, `tree-folder caret` zone `24px`.
- [ ] **Labels visibles** : ajouter `title` déjà présent + `aria-label` ok, mais ajouter `span.visually-hidden` sous icône `12px` `Prèc/Suiv/Lu` en `sm` breakpoint caché, tooltip `focus` persistant `::after`.
- [ ] **Contraste** : `11px`→`12px` pour `brand-sub/build-hint/plaque-desc`, `--text-dim #6b6a63→#4a4642` sur `parchment #f6f0e3` (vérifier AA 4.5:1), `--line rgba(.26)→rgba(.32)` pour hairline.

**Acceptance :**
- Lighthouse a11y `aria-*` 100, contraste AA, cibles `44pt` mobile pass.

**Commande suggérée :** `/impeccable audit webapp/index.html`

---

## P2 — Désert feedback (mutations muettes)

**Problème :** `cabinet.js:591` `STORE.dossiers =` / `store set` silencieux, suppression `confirm()` système hors monde plaque.

### À faire — `webapp/index.html` + `webapp/cabinet.js:591` `LS.set`

- [ ] **Région toast** : ajouter en `index.html` fin `main` : `<div id="toastRegion" aria-live="polite" aria-atomic="true"></div>` `fixed bottom 14px left 50% translateX` `1px brass` `surface` `2px` `shadow 18px`. Fonction `toast(msg, {undo})` 3s + bouton `Annuler` 30s qui restore `Abandonné` fallback.
- [ ] **Remplacer confirm/alert** : `delDossier(id)` → toast `Dossier supprimé — Annuler` au lieu de `confirm`. `importJSON` `JSON invalide` → inline `field-error` sous `input[type=file]` pas `alert`.
- [ ] **Célébration Clôturé** : en `viewDossier` statut `Clôturé` ajouter classe `seal` qui déclenche `encrier` scale `0.9→1` + `border brass 2px` 600ms (respect `prefers-reduced-motion`).

**Acceptance :**
- Enregistrer dossier → toast `Dossier enregistré` + `Annuler` 3s, pas de `alert`.
- Supprimer → undo dans 30s remet dossier.

**Commande suggérée :** `/impeccable harden webapp/index.html`

---

## Vérification finale (après les 5 lots)

- [ ] `node webapp/scripts/build.js` → `490 docs` titres propres (BOM strip), `DESIGN.md` `(root)` exclu si tu veux (ajouter `IGNORE_DIRS` `DESIGN.md`).
- [ ] Hard refresh `Ctrl+Shift+R` file:// + `python -m http.server 8766 --directory webapp` `http://localhost:8766`
- [ ] `node .github/skills/impeccable/scripts/detect.mjs --json webapp/index.html` → `[]` (0) ou seul `em-dash` advisory, exit 0.
- [ ] `node .github/skills/impeccable/scripts/doctor.mjs` → `design-sidecar-stale` si `DESIGN.md` édité → `/impeccable document`.
- [ ] Re-run `/impeccable critique webapp/index.html` cible `24/40 → 30+/40` (Good).

## Ne pas toucher (2-a)

- Plaque/kicker/ME Alami, sweep `0.9s`, double-filet or, encrier `38px`.
- Workflow solo offline `file://` + `localStorage avocato:*`.
- HT/TVA `art.91` / `calcTTC` / `CH/RP/FH` numérotation.

---

> Tu peux lancer chaque lot séparément `/impeccable clarify`, `/impeccable distill`, `/impeccable layout`, `/impeccable audit`, `/impeccable harden` puis `/impeccable polish` final, ou tout d'un coup. Re-run `critique` à la fin pour voir le score grimper.

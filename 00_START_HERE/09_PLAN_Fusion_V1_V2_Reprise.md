# 09 — Plan Fusion V1+V2 v2.0 : vault unifié applicable (reprendre en 1 fichier)

> **Version 2.0 — 23/08/2026.** Remplace intégralement la v1 (obsolète : écrite avant l'exécution des Options A+B+C dans V2).
> **Recensement vérifié par script le 23/08 :** V1 = 504 md · V2 = 683 md working tree (commit interne `8ff6d90`) · **504 chemins communs** (39 identiques / **192 préfixes purs** V2⊇V1 / **273 divergés**) · **178 fichiers uniquement dans V2** · 1 uniquement dans V1 (ce plan). Manifestes : `%TEMP%\opencode\fusion\manifest_complet.csv` (+ 4 CSV par catégorie).
> **Ouvrir uniquement ce fichier** à chaque reprise ; après chaque phase, cocher le journal §8.

---

## 1. Vision — ne pas perdre

Vault = mémoire externe art.59 Loi 28-08 : chaque chiffre avec base légale + date vérifiée sgg.gov.ma / oc.gov.ma IGOC juillet 2024 / cndp.ma / ompic.ma 1 200 DH/classe + CNSS 27,83%. Ordre diagnostic : 01 Résidence 183j → 09 AE/SARL → 02 PE 6m → 07 Convention art.27 (crédit) → 03 Rapatriement 30j → 04 TVA art.92 (3 conditions cumulatives) → 12 Compte convertible → 10 Provision 50% convenue art.30 (pas «art.32 impose») → 06/05. **FR fait foi, EN/AR miroir.** Convention fiscale FR–Maroc = **29 mai 1970** (jamais «1959»).

## 2. Décisions verrouillées (validées utilisateur 23/08)

1. **Base = V1** dans le repo racine — les 152 corrections restent intactes par construction.
2. Appendices V2 («Appendice Encyclopédique/QCM» répétés) : **déduplication + `_Annexes.md` par dossier** pour les blocs à valeur unique.
3. **08_Jurisprudence : dossiers ×6 canoniques** (structure V2) ; les 8 flats V1 retirés après transfert de leur contenu corrigé.
4. **`avocato-V2/` gelé**, supprimé au commit final (backup : bundle §Phase 0).

## 3. Ce qui a changé depuis la v1 du plan (pourquoi réécriture)

| | v1 du plan (snapshot 22/08) | Réalité 23/08 |
|---|---|---|
| V2 | 594 md | **683 md**, working tree non commité : 467 fichiers, +45 100 lignes |
| Contenu | analyse des 89 à garder | **Options A+B+C exécutées** (`PLAN_Next_Skills.md`) : tracks `14_Litigation→19_Sectors` (77), `12_Moot` (4), Numbers `03a/b/c` (3), `08/09_Veille_Mensuelle`, templates `09–11`, `06_ADHD/12_Shadow_Sprint`, webapp **3 modes** 📚/🎓/⚖️ |
| Erreurs résiduelles | «1959» dans 08 seulement | **~37 fichiers V2** citent «1959» (dont nouvelles tracks `03a_Numbers_Fiscal`, dossier `06`, comparatifs internationaux niches) |
| Webapp | V1 = seule corrigée | V2 = UI plus récente (3 modes) mais **sans** le fix P0 `bindContentEvents` ; cabinet.js utilise innerHTML ×18 sans rebind |

**Verdict clé :** sur les 273 divergés, le corps V2 est *antérieur aux corrections V1* («art.32 impose la provision», Yassine/Fatima génériques, «1959») avec appendices collés dessus → règle «commun = V2 gagne» interdite ; appliquer le tableau §4.

## 4. Règle de fusion par catégorie

| Catégorie (CSV) | Nb | Action |
|---|---|---|
| `IDENTICAL` | 39 | rien |
| `PREFIX_V2` (V2 = V1 + appendices) | 192 | prendre **V2** ; strip appendices dupliqués ; blocs uniques → `<dossier>/_Annexes.md` |
| `DIVERGED` | 273 | garder **V1** (corps corrigé) ; extraire les appendices du delta V2 → annexes si valeur |
| `ONLY_V2` | 178 | copier tel quel puis passe de correction (§Phase 1) |
| `ONLY_V1` | 1 | ce plan — conservé |

Détection appendice : titres `## Appendice …` / `## QCM …` après un `---`, signature répétée «But: Porter ce fichier à 8k+», QCM dont toutes les réponses sont 1-a/2-a/3-a. Cas spéciaux à merger à la main (v1 §4 toujours valable) : workflows V2 des `03_Offre` niches 03/04 (FAQ + J-3→J+30), `03_Acquisition` garder **une** `Fiche_Complete` par canal (doublons 04_/05_), MAJ des `00_INDEX`.

## 5. Phases

### Phase 0 — Sécurité + plan (✅ FAIT 23/08/2026)
- [x] Commit snapshot V2 interne : `8ff6d90` «snapshot avant fusion…» (646 fichiers, +74 624 lignes).
- [x] Bundle : `avocato-V2.backup.bundle` (3,08 MB, non tracké à la racine — supprimer/mettre en sécurité au commit final).
- [x] Manifestes CSV : `%TEMP%\opencode\fusion\{manifest_complet,ONLY_V2,DIVERGED,PREFIX_V2,IDENTICAL}.csv`.
- [x] `avocato-V2/PLAN_Next_Skills.md` → copié (pas déplacé, V2 reste gelé) vers `00_START_HERE/10_PLAN_Next_Skills.md`.
- [x] Ce plan réécrit (v2.0).

### Phase 1 — Port des 178 ONLY_V2 + passe de correction (~1 session)
Copie fidèle (mêmes chemins) : `00_START_HERE` 05-08 (4) · `01_Strategy` 11/12 (10) · `02_Niches` flats 08-12 + AR 13/14 (17) · `03_Acquisition` Fiche_Complete (10) · `04_Skills` tracks 14-19 + `12_Moot` + `03a/b/c` (84) · `05_Document_Bank/templates` 09-11 (3) · `06_ADHD/12_Shadow_Sprint` (1) · `08_Jurisprudence` dossiers ×6 + `09_Veille_Mensuelle` (49).
Puis correction déterministe **sur ces fichiers seuls** :
1. `1959` → `France–Maroc du 29 mai 1970` (variantes «1959 modifiée», `conv. FR-MA 1959`) — ~37 cibles ;
2. `L'art. 32 impose la provision` → formulation «provision usuelle 50% convenue dans la convention (art.30)» si présente ;
3. Yassine/Fatima générique → `cas d'usage illustratif` hors fichiers persona ;
4. encodage UTF-8 (réparer aussi les 4 fichiers U+FFFD côté V1).
MAJ des `00_INDEX` recevant des nouveaux fichiers. Build `node webapp/scripts/build.js`. Commit `fusion P1: port V2-only 178 + correction 1959/art30`.

### Phase 2 — 08_Jurisprudence hybride (~1 session, P0)
Pour chaque dossier `01…08` : injecter depuis le flat V1 correspondant (contenu corrigé 1970/grilles/décisions) dans `01_Texte_Source`, `02_Decisions_Commentées`, `03_Grille` ; garder `04_Phrase_Diagnostic` trilingue V2 (patch 1959) ; strip appendices internes répétés. MAJ `08/00_Index.md` (dossiers + veille). Supprimer ensuite les **8 flats V1** (mappage flat N ↔ dossier N identique). Build (~668 docs). Commit `fusion P2: jurisprudence dossiers canoniques`.

### Phase 3 — Déduplication appendices sur les communs (~2 sessions)
- `PREFIX_V2` (192) : adopter V2, extraire blocs appendice → si déjà vu à l'identique dans le dossier → jeté, sinon → `<dossier>/_Annexes.md` + lien depuis le fichier hôte.
- `DIVERGED` (273) : garder V1 tel quel ; même extraction sur le delta V2 uniquement.
- Lots de commit : (a) 01_Strategy+00, (b) 02_Niches+03_Acquisition, (c) 04_Skills+05-07+webapp README.
- Cas spéciaux §4 traités ici. Build après chaque lot. Commits `fusion P3a/b/c`.

### Phase 4 — Webapp (~½ session, P0)
- Base = webapp V2 (3 modes 📚/🎓/⚖️) ; **porter le fix `bindContentEvents`** depuis V1 `webapp/app.js:96-121` dans V2 `app.js` (après CHAQUE `innerHTML`, sites lignes 71→538) et auditer `cabinet.js` (18 sites innerHTML — même classe de bug checklists → fixer si non persistées en mode ⚖️).
- Comparer `vendor/`, `scripts/build.js`, `styles.css` (identiques ?) — garder la version la plus récente de chacun.
- Rebuild complet : cible **~673 docs** dans `data.js` (503 + 178 − 8 flats − doublons Fiche_Complete fusionnés).

### Phase 5 — Cohérence transverse + suppression V2 (~½ session)
README (≈673 docs, 19 skills), `00_READ_ME_FIRST`, `04_ROADMAP` (renvoyer 05-08 + tracks 14-19), `04_Skills/00_MASTER_INDEX_ENCYCLOPEDIQUE` (+14-19), `05_Document_Bank/00_Index` (+templates 09-11), vérifier liens Mermaid `07_Table_Matieres`. QA finale : grep zéro `1959` / `art. 32 impose` / `SPaced` / U+FFFD ; test checklist persistée (toggle → reload, modes Base ET Cabinet). Commit puis `git rm -r avocato-V2` + nettoyer `.bundle` + commit final `fusion: suppression V2 gelé (backup bundle)`.

### Phase 6 — Backlog post-fusion (ne PAS faire pendant la fusion)
Réécriture niche-par-niche des 12 fiches AR génériques (registre 5 colonnes, OMPIC opposition 2 mois, MRE 183j…) · secteurs santé/immo/éduc `19_Sectors` · vidéos Loom · décisions ouvertes Level-2 (voir `00_START_HERE/10_PLAN_Next_Skills.md`).

## 6. Sources à vérifier à chaque diagnostic (date sur chaque fiche)

`sgg.gov.ma` (CGI art.23/92/213, Loi 5-96/20-19, Loi 09-08 art.21/24/52, Loi 28-08 art.30/36/59, Loi 02-03 art.13), `oc.gov.ma` IGOC juillet 2024 (rapatriement 30j, dotations 15k/100k), `cndp.ma` guide 2024 + délib. 40-22 cookies, `ompic.ma` 1 200 DH/classe, `rbe.ompic.ma` BO 10k-50k, Bofip convention FR-Maroc 29 mai 1970 art.4/5/7/10-13/27, `CNB RIN 10.3 / OBFG`, PLF 01/10 + IGOC 15/07 annuels.

> Devoir art.59 Loi 28-08 : information doctrinale, pas consultation. Diagnostic 45 min + co-traitance comptable agréé + confrère étranger si PE/dividende. Le chiffre exact = comptable.

## 7. Questions ouvertes (post-fusion, cf. `10_PLAN_Next_Skills.md`)
1. Priorité next skills : `14_Litigation` (0-3 ans barreau) ou `18_AI_Auto` (3-8 ans) ?
2. Vidéo Loom hébergée vs offline `md+Canva+localStorage` ?
3. Prix Level 2 : même vault ou +50% ?
4. Poids EN pour `16_LE_Drafting` : FR 80/EN 20 actuel ou EN 40 ?

## 8. Procédure de reprise (copier-coller)
1. Ouvrir **ce fichier** → choisir la prochaine phase non cochée §5.
2. Après chaque phase : `node webapp/scripts/build.js` + commit message `fusion Px: …` + cocher/journaliser ci-dessous.
3. Le cwd EST le repo `avocato` ; V2 est dans `avocato-V2/` (gelé — ne jamais modifier, lecture seule jusqu'à suppression finale).
4. Ne jamais ré-appliquer «commun = V2 gagne» : suivre le tableau §4.

## 9. Journal

| Date | Phase | Contenu | Statut |
|---|---|---|---|
| 23/08/2026 | v1 plan | obsolète (snapshot V2 594) | remplacé par v2.0 |
| 23/08/2026 | recensement | 504 communs (39 id / 192 préfixe / 273 divergés), 178 V2-only, webapps divergentes (V2 3 modes sans fix bind) | ✅ |
| 23/08/2026 | **Phase 0** | snapshot V2 `8ff6d90` · bundle 3,08 MB · 5 CSV · `10_PLAN_Next_Skills.md` copié · plan v2.0 écrit | ✅ |
| | Phase 1 | port 178 ONLY_V2 + correction 1959/art30/Yassine | ⬜ |
| | Phase 2 | 08 dossiers canoniques + flats retirés | ⬜ |
| | Phase 3 | dédup appendices 192+273 → _Annexes | ⬜ |
| | Phase 4 | webapp 3 modes + fix bindContentEvents | ⬜ |
| | Phase 5 | cohérence + QA + suppression V2 | ⬜ |
| | Phase 6 | backlog AR fiches / secteurs / Loom | ⬜ |

> **Suivant immédiat : Phase 1** — copier les 178 ONLY_V2 depuis le manifeste, passe de correction, build, commit.

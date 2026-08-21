# Roadmap Next Steps — Continuer sans perdre la vision

> **Dernière mise à jour : 21/08/2026 — commit 692064b**
> **Objectif :** Tracer ce qui est fait, ce qui reste, et le nouveau volet fiscal pour reprise en 1 fichier. Ouvrez ce fichier à chaque reprise — pas besoin de relire tout l'audit.

---

## 1. Vision (à ne pas perdre)

Avocat d'affaires niché (FR/AR/EN), sans pub, 35-60k DH/mois.
Vault = mémoire externe art.59 Loi 28-08 : chaque chiffre a sa base légale + date vérif sgg.gov.ma / oc.gov.ma / cndp.ma / ompic.ma.
Ordre diagnostic : 01 Résidence 183j → 09 AE/SARL → 02 PE 6m → 07 Convention art.27 → 03 Rapatriement 30j → 04 TVA art.92 → 12 Compte → 10 Provision → 06/05.

---

## 2. Accompli — 21/08/2026 (105 fichiers, push main 692064b)

- **Glossaire central** `00_START_HERE/03_Glossaire_12_Concepts_Cles.md:1` — 12 concepts (§01-§12) avec définition + base légale + procédure + interaction + erreur à 15-30k
- **02_Niches 01-06 dé-copiés (37 fichiers)** : 12_Fiches (12 cases spécifiques), 11_Arbre (arbre niche-spécifique), 08_Zones (5 zones grises + cas chiffré), 09_Jurisprudence (3 décisions pertinentes), 10_Comparatif (tableau Maroc/FR/BE), + 7 SEO (tableau 10 long-tail + calendrier 12 sem)
- **08_Jurisprudence 04-08 remplis (5 fichiers)** : Office/OMPIC/Fiscalité/CNSS/Clause pénale — 4 décisions chacun + grille + phrase diagnostic
- **08_Jurisprudence/00_Index.md:13** corrigé + cartographie transversale
- **04_Skills 09-12 (41 fichiers)** : SEO 11 + Public Speaking 10 + Négociation 10 + Finance 10 — tous passés de 20l à 78-89l
- **07_Sharp_Legal_Mind/03_Numbers_Sheet.md:1** source de vérité 6 colonnes + procédure MAJ 01/10 PLF + 15/07 IGOC
- **18 footers clonés** remplacés par footers contextuels (Yassine/Fatima générique supprimé)
- **webapp/data.js** rebuild 488 docs / 1956 KB

---

## 3. Reste à faire — Dette tracée (non bloquant, à reprendre sans perte)

| Priorité | Fichiers | État | Action future |
|---|---|---|---|
| P1 Moyen | `02_Niches_Deep_Dive/*/03_Offre_Productisee.md` (6) | Listes prix 2 900/5 900 sans pédagogie Yousign/provision | Enrichir avec procédure convention art.30 + débours OMPIC 1 200 DH/classe |
| P1 Moyen | `02_Niches_Deep_Dive/*.md` racine (7) : `01_Freelancers...md` etc. | Playbooks marketing 7j, pas de fond droit | Conserver ou enrichir si besoin vente |
| P2 Léger | `04_Skills/00_Learning_Roadmap/02_Roadmap_12_Sprints`, `08_Livres/*` | Footers encore génériques courts | Remplacer comme les 18 déjà faits |
| P2 Audit | `05_Document_Bank/templates/*` | Non audités cette fois | Vérifier cohérence provision art.30 / TVA art.92 / registre 09-08 |

Ces dettes ne bloquent pas le nouveau module — à traiter après le volet ingénierie fiscale.

---

## 4. Nouveau volet — Ingénierie fiscale internationale & shell (à faire)

### 4.1 Pourquoi ce volet — votre besoin "connaître les pratiques pour connaître les limites"

> Vous avez précisé : connaître les pratiques pour **savoir où est la ligne rouge**, ne pas se retrouver en problème. Le volet sera donc structuré en **"pratique → limite légale → sanction → parade légale"** — pas en mode d'emploi d'évasion. Chaque montage est présenté avec son test substance + obligation déclarative Maroc + échange CRS/BO.

**Positionnement :** Information doctrinale sobre, renvoi systématique diagnostic 45 min + co-traitance comptable agréé + confrère étranger. Base `sgg.gov.ma` (CGI art.23, art.213 prix transfert), `oc.gov.ma` (IGOC 2024 100M / rapatriement 30j), `cndp.ma` si données, `Bofip` FR, modèle OCDE BEPS.

### 4.2 Architecture retenue

**Dossier :** `02_Niches_Deep_Dive/12_Ingenierie_Fiscale_Internationale_Shell/` — 13 fichiers vendables Pack 7 500-12 000 HT
**Miroir léger :** `04_Skills_To_Learn/13_Ingenierie_Fiscale_Avancee/00_INDEX.md` pointe vers dossier 12 (évite duplication)
**Extension glossaire :** Ajout §13 Substance, §14 CRS/BO, §15 Prix transfert à `00_START_HERE/03_Glossaire_12_Concepts_Cles.md:308`

### 4.3 Les 13 fichiers prévus

| # | Fichier | Pratique → Limite → Sanction (ce que vous saurez) |
|---|---|---|
| 00 | `00_INDEX.md` | Dossier maître : optimisation légale vs évasion, arbre "as-tu de la substance ?", matrice juridictions, renvois 08/09/10/11 |
| 01 | `01_Optimisation_vs_Evasion_Cadre_BEPS.md` | BEPS 15 actions OCDE, ATAD UE, CGI art.213 abus de droit, majoration 30% + 6 mois Loi 19-06 — où s'arrête l'optimisation |
| 02 | `02_Residence_Substance_Criteres.md` | Test substance : bureau réel 12m + 2 salariés + CA local + PV décision — pourquoi shell 0 salarié = requalifié PE art.7 |
| 03 | `03_Holding_Filiale_Succursale_Comparatif.md` | Holding (participation), filiale (IS local + dividende 10% FR art.10), succursale (PE) — tableau 5 colonnes Maroc/FR/Dubai/Estonia/US |
| 04 | `04_Shell_Shelf_Substance_Piege.md` | Shell = coquille sans substance (KYC banque refusé, CRS déclaré), shelf = dormante — risque BO registre + Office 19-06 |
| 05 | `05_Juridictions_Comparatif.md` | 5 colonnes IS/substance/BO/CRS/coût : Maroc 15% vs Dubai 9% (substance 2 salariés) vs Estonia 20% différé vs US LLC 21% vs UK LLP — convention Maroc-France 1959 / UAE 2022 / US 1977 |
| 06 | `06_Montage_Holding_Maroc_Cas_Chiffre.md` | Cas 1M bénéfice : SARL Casa seule 15% (150k) vs holding Dubai avec substance (bureau+2 salariés) 9% (90k) vs shell sans substance redressé 30% (300k) + Office 100M RC1 |
| 07 | `07_Prix_Transfert_Documentation.md` | CGI art.213 : master file + local file + CbCR, méthode prix marché (comparable 5k vs 1k sous-facturé), sanction 30% |
| 08 | `08_CRS_BO_FATCA_Echange.md` | CRS 109 pays, BO registre Maroc, FATCA US — pourquoi compte Dubai solde 500k = DGI reçoit via CRS → déclaration avoir étranger annexe DGI |
| 09 | `09_Autorisations_Maroc_Office_DGI.md` | IGOC 2024 : investissement étranger >100M dossier Office RC1 30j, déclaration avoir étranger DGI, attestation résidence art.4 + 5000-F |
| 10 | `10_Arbre_Decision_Shell_ou_Holding.md` | Arbre 4Q : PE 6m ? 2 salariés+bureau ? CA>1M ? IP à protéger ? → shell ❌ / holding substance ✅ / SARL Casa suffit |
| 11 | `11_Zones_Grises_Sanctions.md` | 5 zones : holding sans substance, dividende sans 5000-F 15% vs 10%, prix transfert 1k, BO non déclaré, Office sans RC1 — cas 250k redressé |
| 12 | `12_Fiches_Checklist_Substance_KYC.md` | Checklist 15 points : substance (bail, 2 salariés, PV, compta locale), KYC banque (BO, source fonds), CRS, BO, DGI, Office, convention art.27 |

### 4.4 Phasage reprise

- **Phase 0 (15 min)** : Headers glossaire §13-15
- **Phase 1 (2-3h)** : 00-04 — cadre BEPS, substance, holding/shell — le cœur "ligne rouge"
- **Phase 2 (2-3h)** : 05-08 — juridictions + cas chiffré + prix transfert + CRS/BO
- **Phase 3 (1-2h)** : 09-12 — autorisations Maroc + arbres/checklists
- **Phase 4 (30 min)** : Cross-links 08/10/11 + `node webapp/scripts/build.js` + push `../avocato`

---

## 5. Décisions ouvertes à trancher à reprise

- [ ] Juridictions prioritaires (choisir 3 max) : Dubai / Estonia / US LLC (Delaware/Wyoming) / UK LLP / Malte / Espagne ?
- [ ] Ticket : Pack 7 500 HT (note substance) vs 12 000 HT (note + KYC + co-traitance) ?
- [ ] Emplacement confirmé : `02_Niches/12_...` + miroir `04_Skills/13_...` ?

---

## 6. Procédure reprise (copier-coller)

1. Ouvrir ce fichier
2. Choisir phase 0→4
3. Après chaque phase : `node webapp/scripts/build.js` (488→~501 docs)
4. Sync `robocopy` → `../avocato` → `git add -A && git commit -m "..." && git push origin main`

---

## 7. Sources à vérifier à chaque diagnostic

sgg.gov.ma (CGI, Loi 5-96, Loi 17-97, Loi 09-08, Loi 114-13, Loi 19-06), oc.gov.ma (IGOC 2024 juillet), cndp.ma (délib 40-22), ompic.ma (1 200 DH/classe), Bofip impôts.gouv.fr (conv. France 1959 art.4/7/10/27), OCDE BEPS.

> Devoir art.59 Loi 28-08 : information doctrinale, pas consultation. Diagnostic 45 min + comptable agréé obligatoire. Connaître les pratiques = connaître les limites pour ne pas les franchir.

---

## 8. Journal — à compléter à chaque session

| Date | Phase | Fichiers créés/modifiés | Commit | Notes |
|---|---|---|---|---|
| 21/08/2026 | Audit + Fix 105 fichiers | Glossaire + niches + jurisprudence + skills | 692064b | Salade mots-clés traitée |
| | Phase 0 prochaine | Ce roadmap | | |
| | | | | |

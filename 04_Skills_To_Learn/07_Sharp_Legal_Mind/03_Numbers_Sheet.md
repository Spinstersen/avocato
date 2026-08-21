# 03 — Numbers Sheet 10 Chiffres Clés — Source de Vérité (à mémoriser)

> **Ce fichier est la SOURCE UNIQUE — tous les autres (`12_Finance/01_Pricing`, `03_Sales/02_Script`, `01_Legal_Tech_Stack/04_Yousign`, etc.) y renvoient, ne dupliquez pas les chiffres.** Vérifiés le 20/08/2026. Base légale = seule vérité opposable.

| # | Chiffre | Valeur 2025 | Base légale exacte | Source + date vérif | Procédure MAJ |
|---|---|---|---|---|---|
| 1 | AE service plafond | **500 000 DH** HT/an | Loi 114-13 art.4, PLF 2025 | sgg.gov.ma BO 01/01/2025 | Vérifier PLF octobre (sgg.gov.ma) — si PLF 2026 modifie, MAJ ici seul |
| 2 | AE commerce plafond | **1 000 000 DH** HT/an | Loi 114-13 art.4 | sgg.gov.ma 01/01/2025 | Idem PLF octobre |
| 3 | TVA standard | **20%** | CGI art.92 I | sgg.gov.ma CGI 01/01/2025 | Vérifier CGI 1er janvier (PLF) |
| 4 | TVA export exon 0% | **0% si 3 conditions cumulatives** : service hors Maroc + paiement devises + rapatriement 30j | CGI art.92 I-1° + IGOC 2024 | sgg.gov.ma + oc.gov.ma IGOC juillet 2024 | Vérifier IGOC 15 juillet (oc.gov.ma) |
| 5 | Amende Loi 09-08 | **300 000–500 000 DH + 6 mois prison** | Loi 09-08 art.52 | cndp.ma guide sanctions 01/03/2025 | Vérifier cndp.ma + Loi 09-08 sgg |
| 6 | Délai CNDP | **Déclaration 30j, mise en demeure 45j** | CNDP délib. 40-22 art.12/14 | cndp.ma 15/02/2025 | Veille cndp.ma trimestrielle |
| 7 | Frais CRI SARL | **~2 000 DH** (OMPIC + CRI) | Arrêté CRI + tarifs OMPIC | ompic.ma + directompic.ma 01/04/2025 | Vérifier ompic.ma tarifs CRI |
| 8 | Capital SARL min | **10 000 DH** | Loi 5-96 art.6 | sgg.gov.ma Loi 5-96 20/08/2026 | Stable — vérifier réforme Loi 5-96 sgg |
| 9 | Délai création SARL | **7–14 jours** OMPIC | Procédure OMPIC | directompic.ma 01/04/2025 | Vérifier directompic.ma délais |
| 10 | Honoraires diagnostic | **600–1 200 DH HT** (45 min + note risques) | Cabinet — convention art.30 Loi 28-08 | Modèle `05_Document_Bank/templates/01_Convention` 20/08/2026 | MAJ selon grille cabinet Q1 |

> ⚠️ Ancien tableau disait "400k (500k 2026?)" sans millésime ni base légale → obsolète. Remplacé par valeurs ci-dessus. Ne jamais citer sans année + base légale + source datée.

## Procédure MAJ trimestrielle — qui / où / quand / comment

**Qui :**
- Vous (titulaire). Pas de délégation. Responsabilité art.59 Loi 28-08.
- En cas d'absence, suppléant note dans Notion `BDD VEILLE` avec date + URL.

**Où (3 URLs seules) :**
- `sgg.gov.ma` → PLF + CGI (art.92) + Lois 114-13 / 5-96 / 09-08 / 28-08
- `oc.gov.ma` → IGOC 2024 (rapatriement 30j, dotations)
- `cndp.ma` → délibérations 40-22 + guide sanctions art.52

**Quand :**
- **1er octobre** — PLF déposé (vérif plafonds AE 500k/1M + IS)
- **15 juillet** — IGOC mise à jour (Office des Changes)
- **1er janvier** — CGI/PLF promulguée (TVA 20% / art.92)
- Rythme : **01/01, 01/04, 01/07, 01/10** — rappel Notion récurrent.

**Comment (10 min chrono) :**
1. Ouvrir 3 URLs + `directompic.ma` (délais/frais).
2. Noter valeur + date exacte dans Notion `BDD VEILLE` (colonnes : chiffre / valeur / base légale / source / date vérif).
3. Si changement → éditer **ce fichier seul** + `git commit "MAJ Numbers Sheet 01/10 PLF"`.
4. Test 5/10 à blanc (voir Test J90 ci-dessous).
5. Propager via renvoi — ne jamais copier-coller les chiffres ailleurs.

## Comment utiliser en diagnostic — exemple SPIN Implication

Ne citez jamais un chiffre nu. Formule : **chiffre + base légale + risque chiffré + ROI mission**.

> **Exemple SPIN-I (09-08) :** « Sans registre 09-08, vous exposez **300 000 DH** d'amende + 6 mois prison (Loi 09-08 art.52, cndp.ma 01/03/2025). Notre mission registre + politique confidentialité = **5 900 DH HT**. **ROI 50×** — vous sécurisez 300k pour 5,9k, en 7 jours. » — Formule courte à mémoriser : « Sans registre = 300k vs mission 5 900 = ROI 50x »

> **Exemple TVA :** « Votre CA offshore 600k DH — sans mention art.92 + rapatriement 30j (CGI art.92 I-1° + IGOC 30j), TVA 20% = 120k redressée + pénalités 15%. Pack contrat FR/EN 2 900 DH = ROI 41×. »

> **Exemple AE :** « AE service plafonné 500k (Loi 114-13 art.4). Vous êtes à 600k → dépassement → radiation + IS 15%. Création SARL 10k capital (Loi 5-96 art.6) en 7-14j pour 2 000 DH = sécurisé. »

Usage : glisser 1 chiffre maximum par phase Implication, toujours avec base légale affichée à l'écran.

## Test J90 — mémorisation

- **J7 :** réciter **5/10** sans notes (valeur + base légale courte). Ex: "500k Loi114-13, 20% CGI92".
- **J30 :** **7/10** sans notes + 1 exemple SPIN-I complet.
- **J90 :** **10/10 avec base légale exacte + source + date** (ex: "AE service 500k — Loi 114-13 art.4 — sgg 01/01/2025").
- **Échec <5/10 →** revoir Anki 10 min/j pendant 7j (voir `07_Sharp_Legal_Mind/04_Routine_Hebdo.md` — mardi CNDP / jeudi jep.ma).
- Noter score dans Notion `BDD KPI` + Dopamine Board.

---

## Footer — checklist MAJ + sources + renvoi

**Checklist MAJ trimestrielle (cocher à chaque échéance) :**
- [ ] 01/10 PLF ouvert (sgg.gov.ma) — plafonds AE 500k/1M vérifiés
- [ ] 15/07 IGOC ouvert (oc.gov.ma) — rapatriement 30j confirmé
- [ ] 01/01 CGI ouvert (sgg.gov.ma) — TVA 20% / art.92 inchangé
- [ ] cndp.ma ouvert — délib 40-22 (30j/45j) + art.52 inchangé
- [ ] directompic.ma + ompic.ma — frais 2k + délai 7-14j confirmés
- [ ] Notion VEILLE MAJ + test 5/10 réussi + commit git

**Sources primaires seules :** `sgg.gov.ma` (CGI, Lois 114-13/5-96/09-08/28-08), `oc.gov.ma` (IGOC 2024), `cndp.ma` (délib 40-22), `directompic.ma` / `ompic.ma`. Aucune source secondaire ou YouTube.

**Renvoi glossaire :** `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §01-§12 (focus §01 Résidence 183j → §04 TVA art.92 → §06 Loi 09-08 registre → §09 AE/SARL → §10 Provision art.30). Ne citez pas ce Numbers Sheet sans avoir lu §01-§12.

**Plan 30j :** S1 (J1-J7) mémoriser 5/10 + Anki, S2 (J8-J21) utiliser 1 chiffre/diag en SPIN-I, S3 (J22-J30) test J90 10/10 + MAJ Notion. Prochain sprint : `07_Sharp_Legal_Mind/12_Plan_90J.md`.

> Philosophie : sobre, sourcé, opposable. Un chiffre sans base légale = hallucination. Mieux vaut 70% sourcé que 95% approximatif.

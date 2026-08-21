# Fiscalité Internationale — Conventions & Prix de Transfert (4 décisions utiles)

> À citer en diagnostic Mission 08. Sources : sgg.gov.ma (CGI, conventions), Bofip impôts.gouv.fr, oc.gov.ma pour volet change.

## 1. Résidence fiscale — 183j vs foyer (CGI art.23 + Conv. art.4)

- **Faits :** MRE Paris avec foyer (femme/enfants) à Casa, 40j/an Maroc, se déclare non-résident. Contrôle DGI Casa : requalifié résident (foyer = critère 1 art.4).
- **Solution :** Art.4 convention France-Maroc 1959 : foyer permanent Casa → résident Maroc même à 40j. IS mondial dû au Maroc (15% <300k) + crédit France art.27. Redressement 3 ans.
- **Takeaway :** "40j ne fait pas non-résident si foyer à Casa. Foyer prime sur 183j. Attestation DGI = preuve, pas passeport."
- **Mission liée :** Test résidence `08_Fiscalite/01_Residence_Fiscale_183j_Foyer.md` + attestation DGI 30j.

## 2. Établissement stable — Salarié Paris 7 mois (Conv. art.7)

- **Faits :** SARL Casa avec 1 commercial à Paris 7 mois qui signe contrats FR. Contrôle fisc FR : PE avéré, bénéfice France 200k taxé 25% + Maroc 15%.
- **Solution :** Art.7 + art.5 PE : salarié avec pouvoir de conclure = PE même sans bureau. Bénéfice rattaché PE taxé France 25% (50k) + Maroc 15% (30k) → crédit art.27 30k → reste France 20k → total 50k vs 30k sans PE = **20k surcoût**.
- **Takeaway :** "1 salarié Paris 7 mois qui signe = PE = 20k d'IS en plus. Solution : portage 8% ou filiale, pas salarié direct."
- **Mission liée :** Arbre PE `08_Fiscalite/07_Etablissement_Stable_Prix_Transfert.md`.

## 3. Prix de transfert — Facturation intra-groupe Casa-Paris (CGI art.213)

- **Faits :** SARL Casa facture sa filiale Paris à 1k/mois alors que marché = 5k (sous-facturation pour rapatrier bénéfice Maroc 15% vs France 25%).
- **Solution :** CGI art.213 + doctrine prix transfert : prix doit être prix de marché (comparable). Redressement DGI : bénéfice rehaussé 48k + pénalités 30% + intérêts.
- **Takeaway :** "Facturer sa filiale à 1k au lieu de 5k = redressement prix transfert. Justifiez prix marché (devis concurrent)."
- **Mission liée :** Dossier prix transfert + co-traitance comptable + expert FR.

## 4. Dividende MRE — Retenue 10% France non optimisée (Conv. art.10)

- **Faits :** MRE Paris perçoit dividende SARL Casa 100k, retenue source Maroc 15% au lieu de 10% convention France 1959, sans formulaire 5000-F.
- **Solution :** Art.10 convention France : dividende source 10% si attestation DGI + 5000-F avant versement. Sans formulaire : 15% retenu → perte 5k. Avec : 10k retenue + crédit France art.27 = 0 double impo.
- **Takeaway :** "Dividende Casa→Paris = 10% pas 15% si 5000-F. Sans formulaire, 5k perdus. Faites 5000-F avant AG."
- **Mission liée :** Formulaire 5000-F + attestation DGI + AG dividende.

## Grille fiscalité internationale à connaître

| Revenu | Base | Taux / Procédure |
| :--- | :--- | :--- |
| Résidence | CGI art.23 + Conv art.4 | 183j OU foyer OU centre intérêts → attestation DGI 30j |
| Bénéfice SARL sans PE | Conv art.7 | Maroc 15% <300k seul |
| Bénéfice avec PE 7 mois | Conv art.7 + art.5 | France 25% + Maroc 15% - crédit art.27 |
| Prix transfert | CGI art.213 | Prix marché, dossier comparables |
| Dividende France | Conv 1959 art.10 | 10% retenue + 5000-F + crédit art.27 |
| Dividende Belgique | Conv 1972 art.10 | 15% retenue |

**Phrase de diagnostic :** "Où est votre foyer ? Avez-vous un salarié en France >6 mois ? Votre dividende est à 10% ou 15% ? 3 questions = 20k d'économie ou de redressement."

> Vérifiez chaque convention sur sgg.gov.ma (publication) et Bofip (interprétation FR) — les taux IS évoluent PLF.

---

## Analyse doctrinale — Fiscalité internationale

**Pourquoi les conventions existent :** Sans elles, même bénéfice taxé 2 fois (Maroc IS 15% + France IR 25% = 40%). Art.7 répartit le droit d'imposer, art.27 élimine double impo par crédit. Le PE est le piège : 1 salarié qui signe = PE = France récupère l'impôt.

**Raisonnement :** 1) Résidence art.4 → 2) Qualification revenu (bénéfice art.7 vs dividende art.10 vs salaire art.15) → 3) Test PE 6 mois/pouvoir conclure → 4) Élimination art.27. Chaque étape exige attestation DGI + justificatif bancaire — sinon convention théorique.

**Doctrine :** Modèle OCDE commenté, Bofip FR, CGI Maroc.

### Sources primaires (à jour au 20/08/2026)

*   **sgg.gov.ma** — CGI art.23, art.213, conventions 1959/1972/1985/1977, Loi 5-96 SARL.
*   **impots.gouv.fr Bofip** — Interprétation conventions FR-Maroc.
*   **oc.gov.ma** — IGOC rapatriement dividende 30j.
*   **00_START_HERE/03_Glossaire_12_Concepts_Cles.md §01, §02, §07** — Détail résidence, PE, convention.

> Vérifiez barème IS PLF et taux retenue dividende sur convention à jour — LF 2023 a modifié IS progressif.

### Limites et devoir d'information (art. 59 Loi 28-08)

Information doctrinale, pas consultation. Diagnostic 45 min + co-traitance comptable agréé + expert étranger (CPA US si US) obligatoire. Chiffrage exact = comptable.

---

## Note de méthode professionnelle

Ce document s'inscrit dans la démarche `01_Strategy/01_Rules_Of_The_Game_No_Ads_Morocco/` : information sobre, références primaires (`sgg.gov.ma`, `oc.gov.ma`, `cndp.ma`), devoir d'information art. 59, secret art. 36, convention art. 30. Le chiffre n'est jamais jeté sans sa base légale et sa date de vérification.

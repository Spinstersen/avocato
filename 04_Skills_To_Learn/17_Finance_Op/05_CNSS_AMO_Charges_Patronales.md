# 05 — CNSS & AMO : Charges Sociales et Onboarding Salarié

> **Cockpit opérateur — module 05/13.** Embaucher n'est pas une décision RH, c'est une décision financière : le coût réel d'un salarié n'est jamais son salaire brut. Part patronale 21,09 %, majorations de retard 3 %/mois, indemnité de licenciement à provisionner — ce module chiffre tout, puis déroule l'onboarding CNSS sans faute.

**Liens :** [Index piste](00_INDEX.md) · [03b_Numbers_Social](../07_Sharp_Legal_Mind/03b_Numbers_Social.md) · [Droit social & CNSS](../../08_Jurisprudence/07_Droit_Social_CNSS.md) · [Scaling AE→SARL](../../02_Niches_Deep_Dive/06_Autoentrepreneur_to_SARL_Scaling/00_INDEX.md)

## Objectifs
1. Décomposer les cotisations : 6,74 % salarié + 21,09 % patronal ≈ 27,83 % du brut.
2. Calculer le coût employeur complet AVANT toute annonce d'embauche.
3. Provisionner l'engagement licenciement (~1,5 mois de salaire par année, Code travail).
4. Exécuter l'onboarding CNSS via DAMANCOM sans erreur ni retard.
5. Mesurer le risque travail dissimulé (art.370 Code travail : amende 25.000–30.000).

## Prérequis
- SARL constituée (module 11 / scaling AE→SARL) et affiliée CNSS comme employeur.
- P&L mensuel opérationnel ; gate MRR défini (≥9.000 dans le modèle avant embauche).
- Forecast 13 semaines capable d'absorber +4.844/mois (module 02).
- Contrat de travail type validé (renvoi droit social).

## TL;DR
Assistant(e) à 4.000 brut = ~4.844/mois coût employeur (+21,09 %) et ~58.100/an, hors provision licenciement (~500/mois supplémentaires). Retard de paiement CNSS : 3 %/mois de majoration — deux mois de flottement coûtent ~290 DH sur ce seul poste, et une réputation auprès de l'inspection. Travail dissimulé (salarié non déclaré) : amende 25.000–30.000 (art.370 Code travail). La déclaration passe par DAMANCOM, mensuellement, avant les échéances.

## Base légale

| Règle | Base | Source + date |
|---|---|---|
| Part salariale 6,74 % + part patronale 21,09 % ≈ 27,83 % du brut | Code sécurité sociale | cnss.ma |
| Majoration de retard 3 %/mois sur cotisations impayées | Code sécurité sociale | cnss.ma |
| Déclaration mensuelle télématique DAMANCOM | CNSS | cnss.ma |
| Indemnité de licenciement ~1,5 mois/salaire par année d'ancienneté | Code travail (art.53 et sq.) | sgg.gov.ma |
| Travail dissimulé : amende 25.000–30.000 DH | Code travail art.370 | sgg.gov.ma |

⚠️ Bases plafonnées par branche (prestations sociales notamment) : montants à jour sur cnss.ma et dans [03b_Numbers_Social](../07_Sharp_Legal_Mind/03b_Numbers_Social.md) — ne jamais recalculer de mémoire.

## Procédure pas-à-pas

### Étape 1 — Chiffrer le coût employeur complet
| Élément | Taux | Sur 4.000 brut |
|---|---|---|
| Brut annoncé | — | 4.000 |
| CNSS patronale (part employeur) | 21,09 % | 843,60 |
| **Coût employeur mensuel** | | **4.843,60** |
| Provision licenciement (1,5 mois/an ÷ 12) | ~12,5 % du brut | 500 |
| **Coût de possession mensuel réel** | | **~5.344** |

Traduction retainers (module 01) : 5.344 ≈ 1,78 retainer à 3.000. Gate : MRR ≥9.000 avant signature du contrat.

### Étape 2 — Décomposer la part patronale
| Branche | Part patronale |
|---|---|
| Prestations sociales (base plafonnée [vérifier]) | 8,98 % |
| Allocations familiales | 6,40 % |
| AMO (assurance maladie obligatoire) | 4,11 % |
| Taxe de formation professionnelle | 1,60 % |
| **Total part patronale** | **21,09 %** |

Côté salarié : 6,74 % retenus sur le brut (dont AMO 2,26 %) — apparaissent sur le bulletin, pas dans votre coût additionnel.

### Étape 3 — Onboarding CNSS (ordre chronologique)
1. Affiliation employeur de la SARL (une fois, si déjà faite à la constitution, vérifier l'accès).
2. Création accès DAMANCOM (télé-déclaration mensuelle obligatoire).
3. Déclaration d'affiliation du salarié AVANT le premier jour travaillé.
4. Contrat écrit signé et archivé (CDD/CDI justifié — renvoi droit social).
5. Visite médicale d'embauche planifiée.
6. Bulletin de paie mensuel : brut, retenues 6,74 %, IR selon barème, net à payer.
7. Paiement des cotisations dans le délai légal (mois suivant) — alerte forecast.
8. Archivage : contrat, bulletins, quittances DAMANCOM (6 ans).

### Étape 4 — Brancher dans la mécanique financière
Forecast (module 02) : ligne CNSS 4.850 aux semaines de paiement ; majoration possible 3 %/mois si glissement — interdit par discipline. P&L (module 01) : coût 4.844 en charges fixes + 500 de provision licenciement. KPI (module 07) : ratio masse salariale/MRR suivi mensuellement.

## Cas pratique chiffré
Salma (niche e-commerce) hésite entre freelance et salarié(e) pour un poste ops/juridique junior.
- Freelance facturant 5.000/mois : pas de CNSS employeur, mais pas d'exclusivité ni de maîtrise ; risque de requalification en travail dissimulé si subordination réelle → exposition amende 25.000–30.000.
- Salarié(e) 4.500 brut : coût employeur 5.449/mois (×1,2109), ~65.400/an + provision licenciement ~6.750/an. Décision : salarié(e), car MRR 14.000 couvre 2,6 fois le poste et le besoin est permanent.
Gate respectée, forecast ajusté : point bas descend de 71.200 à ~66.000 — buffer intact.

## Erreurs Top 5

| # | Erreur | Coût typique |
|---|---|---|
| ❌ | Recruter « au feeling » sans coût ×1,2109 | Sous-estimation ~10.000-12.000/an |
| ❌ | Salarié déclaré après quelques semaines « d'essai informel » | Travail dissimulé : amende 25.000–30.000 + rappels |
| ❌ | Cotisations payées en retard | Majoration 3 %/mois : ~290/trimestre sur ce poste, et contentieux inutile |
| ❌ | Zéro provision licenciement | Sortie à froid : ~6.000 sortis d'un coup par année d'ancienneté |
| ⚠️ | Confondre net, brut et coût employeur en entretien | Négociation faussée dès la promesse |

## Checklist 12 points

1. [ ] Gate MRR ≥9.000 franchi AVANT l'annonce du poste.
2. [ ] Coût employeur ×1,2109 calculé et validé dans le forecast.
3. [ ] Provision licenciement ~500/mois ouverte (par année d'ancienneté).
4. [ ] Accès DAMANCOM fonctionnel (identifiants testés).
5. [ ] Affiliation salarié déclarée avant jour 1.
6. [ ] Contrat écrit signé, clause d'essai conforme au Code travail.
7. [ ] Visite médicale d'embauche programmée.
8. [ ] Modèle de bulletin paramétré (retenues 6,74 % + IR).
9. [ ] Alerte calendaire paiement CNSS dans le forecast.
10. [ ] Quittances mensuelles archivées (dossier numérique).
11. [ ] Ratio masse salariale/MRR revu au dashboard mensuel.
12. [ ] Procédure de sortie écrite (préavis, indemnité ~1,5 mois/an) connue AVANT besoin.

## QCM

**Q1. Salaire proposé 4.000 brut. Quel chiffre annoncez-vous au forecast ?**
A. 4.000 B. 4.270 C. ~4.844 (+ provision licenciement 500)

> **Réponse : C —** le coût employeur inclut la part patronale 21,09 % (≈844), soit ~4.844/mois, plus ~500 de provision licenciement (1,5 mois/an). Annoncer 4.000 au forecast, c'est creuser le point bas de 844 chaque mois.

**Q2. Vous avez payé la CNSS avec 2 mois de retard. Conséquence ?**
A. Rien si vous payez enfin B. Majoration 3 %/mois, soit ~6 % cumulés, plus risque de contrôle C. Remise automatique pour premier incident

> **Réponse : B —** la majoration court mois par mois et l'historique de retard reste visible. Dans le modèle, cela représente ~290 sur un trimestre — cher payé pour un oubli d'alerte calendaire.

**Q3. Un « freelance » exclusif, horaires imposés, votre matériel : qualification ?**
A. Freelance puisque facture B. Risque de travail dissimulé — amende 25.000–30.000 (art.370 Code travail) C. Statut mixte toléré

> **Réponse : B —** les indices de subordination (exclusivité, horaires, moyens matériels) caractérisent le salariat dissimulé. Coût comparé : la différence freelance/salarié économisée (~600/mois) contre une amende de 50 mois d'économie.

## Fiches révision

**Carte 1 — Le multiplicateur 27,83 %**
Brut + 21,09 % = coût employeur ; brut − 6,74 % = net avant IR. Trois chiffres, jamais confondus, surtout en entretien d'embauche.

**Carte 2 — Onboarding en 8 gestes**
Affiliation → DAMANCOM → affiliation salarié AVANT jour 1 → contrat écrit → visite médicale → bulletin → paiement à temps → archive 6 ans.

**Carte 3 — Le poste se finance lui-même**
Gate MRR ≥9.000, poste ≤1,78 retainer, provision licenciement mensuelle : l'embauche devient une équation, plus un saut dans le vide.

## EN - Key takeaways
Hiring is priced, not felt: an assistant at 4,000 gross costs ≈4,844/month once the employer-side 21.09% is loaded, plus ~500/month provisioning for severance (~1.5 month's salary per year of seniority under the Labor Code) — about 64,100/year of real commitment against a hiring gate of MRR ≥9,000. The employer share decomposes into pensions (plafoned base), family allowances, mandatory health insurance (AMO) and vocational training tax; employee deductions total 6.74% shown on the payslip. Late contributions accrue a 3%/month penalty, wired through monthly DAMANCOM declarations. Never start anyone informally: concealed employment carries a 25,000–30,000 fine (Labor Code art.370). The onboarding sequence is chronological and non-negotiable — affiliation, pre-start declaration, written contract, medical visit, payroll, timely payment, six-year archiving.

## AR - ملخص ومصطلحات

| FR | العربية |
|---|---|
| Cotisations sociales | الاشتراكات الاجتماعية |
| Part patronale | حصة المشغّل |
| Part salariale | حصة الأجير |
| Bulletin de paie | كشف الأجرة |
| Affiliation (CNSS) | الانتساب للصندوق الاجتماعي |
| Majoration de retard | زيادة التأخير |

**Darija :**
- « L-brut machi huwa l-coût » : zid 21,09% f rassek qbel ma tgoul « rakhir wa7ed khedam m3aya » — w zid 500 chhriya dyal t-sbiqa dyal l-indemnité.
- « Khallas f we9to » : 3% kol chhar taakhkhir — r-rasml kaykber bla ma t7ess bih.

---
**Sources primaires :** sgg.gov.ma (CGI, PLF, Loi 114-13) · cnss.ma · oc.gov.ma (IGOC 2024) · impôts.gouv.fr (convention FR-Maroc) · ompic.ma. Dernière vérification : 23/08/2026 — re-vérifier PLF 01/10 et IGOC 15/07.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Décisions fiscales = comptable agréé obligatoire. Secret professionnel art.36. QCM pédagogique — aucun certificat.

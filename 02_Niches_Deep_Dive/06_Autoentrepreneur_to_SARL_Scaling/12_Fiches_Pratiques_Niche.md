# 12 — Fiches Pratiques + Checklist (06_Autoentrepreneur_to_SARL_Scaling)

> **Niche :** AE à 180k-400k service qui explose plafond 200k HT 12m. Rester AE 2e année = radiation + redressement 38% + 30%. Passage SARL = survie, pas optimisation.

## Checklist 12 points — AE → SARL (scaling, sortie plafond)

*   [ ] Radiation AE Loi 114-13 clôture 1j — dépôt portail AE + attestation fiscale DGI quitus, radiation 1j si CA à jour, sinon redressement IR 38% + 30% pénalités si dépassement 2 ans → voir Glossaire §09
*   [ ] Statuts SARL Loi 5-96 capital 10 000 DH — rédaction statuts : dénomination + objet + siège + capital 10k min + gérance + parts, capital bloqué attestation 48h, déblocage après RC → voir Glossaire §09
*   [ ] PV transformation & AGE — PV assemblée : décision transformation AE→SARL + nomination gérant + pouvoirs Apostille si MRE, dépôt OMPIC 7-14j → voir Glossaire §09
*   [ ] Formalités OMPIC RC 7-14j CRI ~2 000 DH — dossier directompic.ma : statuts + blocage 10k + CIN + quitus AE + bail, RC 7j Casa /14j région, ICE/IF auto, frais CRI ~2 000 DH (pas 5k) → voir Glossaire §09
*   [ ] Choix fiscal IR 1-2% vs IS 15% (CGI art.19/144) — AE IR libératoire 0,5 % commerce / 1 % servicesice sur CA, SARL IS 20 % unique (LF 2026 : benefice net <100M MAD ; 35 % au-dela) + TVA 20% ou exon art.92, simuler seuil rentabilité → voir Glossaire §09 + §04
*   [ ] TVA art.92 exon export si clients hors Maroc — SARL seule permet exon 0% (3 conditions : service hors Maroc + devises + rapatriement 30j), AE non assujetti mais pas exon → voir Glossaire §04
*   [ ] Rapatriement 30j IGOC 2024 (Office) — SARL exportatrice facture devises → SWIFT → banque 30j, dossier gardé 10 ans, condition exon TVA art.92, sanction 3k-30k → voir Glossaire §03
*   [ ] Compte convertible 48-72h (BAM/IGOC) — ouverture banque RC SARL + statuts + contrat, alimenté par rapatriement 30j, dotation e-commerce 15k + voyage 100k → voir Glossaire §12
*   [ ] Contrat FR/EN DOC art.443/264/618 + cession PI Loi 2-00 — refaire contrats clients au nom SARL (pas AE), FR fait foi, preuve >10k, clause pénale 10%, réserve propriété écrite, cession PI art.11 → voir Glossaire §11
*   [ ] Registre Loi 09-08 5 colonnes art.14 — migrer base clients AE : re-collecter consentement non pré-coché + MAJ registre + déclaration CNDP 30j + contrat sous-traitant art.24 → voir Glossaire §06
*   [ ] Provision 50% art.30 Loi 28-08 — convention préalable HT/TVA 20% ou 0% export, provision 50% Yousign avant statuts, délai 7j après provision + quitus AE + blocage 10k → voir Glossaire §10
*   [ ] Clôture comptable AE & ouverture SARL bilan — clôture AE : déclaration CA finale + quitus, SARL : compta engagement + IS 15% + co-traitance expert-comptable obligatoire → voir Glossaire §09

> **Légende :** Chaque case = Concept (base légale) — procédure 1 ligne + chiffre 2025 + renvoi Glossaire. Ne cochez pas sans avoir lu le §.

## Scripts (FR fait foi)

*   **DM scaling :** `Bonjour [Prénom], vu ton AE à [180k/350k] : plafond service 200k HT 12m glissants — à 350k 2 ans = radiation + redressement IS 15% + IR 38%. Je fais diag 1 200 HT (AE vs SARL 10k + IS 15% + TVA art.92) + pack transformation 7 500 HT 7j (radiation 1j + statuts 5-96 + RC 7-14j + contrats SARL + 09-08). Checklist 1p ? — [Nom], avocat [Ville]`
*   **Objection "je reste AE" :** `AE 350k 2e année = radiation auto + IS mondial si 210j résident (art.23). SARL 10k IS 20 % (LF 2026) te coûte 15k sur 100k vs IR 38% en redressement. On simule en diag 45 min.`
*   **Objection "coût SARL" :** `SARL 10k bloqué 48h puis débloqué, RC 2 000 DH, pas 5k. Tu récupères en 1 facture exon art.92 (TVA 20% économisée = 20k sur 100k).`

## Modèles `05_Document_Bank` à joindre

*   `templates/16_Radiation_AE_Quitus_Modele.md` — demande radiation portail AE + quitus DGI + déclaration finale
*   `templates/14_Statuts_SARL_5-96_MRE_Modele.md` — statuts SARL 10k + PV AGE + attestation blocage 48h
*   `templates/03_Pack_Freelance_Contrat.md` — contrats clients migrés SARL FR/EN + PI Loi 2-00 + art.618
*   `templates/01_Convention_Honoraires_Modele.md` — provision 50% + planning 7-14j + co-traitance comptable
*   `templates/09_Politique_Confidentialite_09-08_Modele.md` — MAJ registre 09-08 migration AE→SARL

## Plan 7j — AE → SARL

*   **J1 :** Diag 1 200 HT — audit CA 12m glissants + plafond 200k/500k + simu IR 1-2% vs IS 15% + test PE/TVA
*   **J2 :** Provision 50% + quitus AE + blocage 10k 48h → convention Yousign + PV AGE
*   **J3 :** Radiation AE 1j (portail) + dépôt OMPIC directompic.ma (statuts + blocage + bail)
*   **J4-J5 :** Suivi OMPIC + refonte contrats FR/EN + MAJ registre 09-08 + modèle facture art.144
*   **J7 :** RC 7j + ICE/IF → ouverture compte convertible 48-72h + refonte contrats FR/EN + registre 09-08 MAJ
*   **J8 :** Dépôt dossier banque + dotation 15k si SaaS, formation rapatriement 30j
*   **J14 :** Livraison SARL + formation rapatriement 30j + dotation 15k + clôture comptable avec expert-comptable

## Erreurs qui coûtent cher — AE→SARL

*   Garder factures au nom AE après RC SARL → CA AE continue → dépassement + radiation rétroactive
*   Pas de quitus DGI → OMPIC bloque RC SARL, 2 semaines perdues
*   Oublier re-consentement 09-08 → base illégale, migration = nouveau traitement art.14

## Chiffres 2025 à vérifier à chaque diag (PLF + IGOC)

*   AE plafond glissant 200k service /500k commerce HT, IR 0,5 % commerce / 1 % servicesice
*   Radiation AE 1j + quitus DGI, sinon redressement IR 38% + 30% si 2 ans dépassement
*   SARL 10k bloqué 48h → débloqué RC, RC 7-14j CRI ~2 000 DH, IS 20 % (LF 2026)/20% /32%
*   TVA 20% ou 0% art.92 si 3 cond., rapatriement 30j 10 ans, compte 48-72h dotation 15k/100k
*   Contrat >10k écrit art.443, pénale 10% max art.264, registre 09-08 5 colonnes dès 1 donnée

---

## Fiche comme mémoire externe, pas comme script de vente

Cette fiche est une mémoire pour transformer un AE qui explose le plafond sans le crasher : radiation 1j ≠ disparition dettes (quitus DGI obligatoire), capital 10k bloqué 48h puis débloqué, RC 7-14j CRI ~2 000 DH pas 10j fixe ni 5k, IR 0,5 % commerce / 1 % servicesice sur CA vs IS 15% sur bénéfice <300k (simuler : 400k CA 100k bénéfice → AE 8k vs SARL 15k mais SARL permet TVA art.92 exon + PE crédible), contrats à refaire au nom SARL (DOC art.443 >10k), registre 09-08 à migrer avec nouveau consentement. Ne laissez pas un AE à 350k 2 ans — radiation + redressement 30% = 50k de casse. L'ordre est quitus → blocage 10k → OMPIC → compte → contrats → 09-08.

> Sources : `sgg.gov.ma` Loi 114-13, Loi 5-96, CGI art.19/92/144, `oc.gov.ma` IGOC 2024, `ompic.ma` 7-14j, `cndp.ma` Loi 09-08 art.14 — vérifier PLF. Glossaire : `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §03 §04 §06 §09 §10 §11 §12.
> Contexte niche 06 : scaling = sortir du plafond avant sanction. AE 500k commerce /200k service HT 12m glissants, pas annuel civil. Comptez glissant ou redressement.

**Fin Fiches 06_Autoentrepreneur_to_SARL_Scaling — profondeur max.**

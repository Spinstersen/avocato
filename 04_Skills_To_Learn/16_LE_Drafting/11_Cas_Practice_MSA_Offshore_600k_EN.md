# 11 — Cas practice · MSA offshore 600 k DH (négociation complète commentée)

> Fil rouge du module : Yassine, développeur freelance (≈ 600 000 DH/an), reçoit un Master Services Agreement (MSA) d'une LLC américaine. Décortiquez clause par clause : red flags détectés avec la grille du fichier 07, corrections appliquées avec la bibliothèque (fichiers 02–06), et l'économie finale du deal. Ce cas se déroule sur 5 jours et sert de répétition générale à votre prochaine négociation EN.

**Liens utiles :** [Red flags 25](07_Red_Flags_Checklist_25_Contrats_EN.md) · [Clause library 02](03_Clause_Library_02_Scope_Fees_Payment_FR_EN.md) · [Clause library 06](06_Clause_Library_06_Term_Termination_Dispute_FR_EN.md) · [Templates pack](09_Templates_EN_Pack_Freelance_NDA_CGV.md) · [Signature bilingue](10_Yousign_Bilingue_Workflow_Loom_EN.md)

## Objectifs

- Appliquer la grille de tri (fichier 07) sur un MSA réel.
- Produire un contre-projet EN clause par clause en 48 h.
- Calculer l'impact économique de chaque redline (devise, net, cap, IP).

## Prérequis

- Fichiers 02–07 : bibliothèque maîtrisée, grille des 25 flags en tête.

## TL;DR

- 7 red flags trouvés dans le MSA de la LLC : loi NY, uncapped indemnity, IP « upon creation », net-60, evergreen, set-off, DPA RGPD-only.
- Chaque flag a reçu une contre-mesure chiffrée (net-30 = +30 j de trésorerie ; cap 1× = protection patrimoniale).
- Résultat : contrat rendu en 48 h, signé en Yousign en 24 h, retainer de 3 000 DH HT/mois + pack négocié.

---

## Le contexte (jour 0)

Yassine est sollicité par une LLC américaine (développement d'une plateforme SaaS). La LLC lui envoie son MSA de 14 pages en anglais, rédigé par son counsel US. Aucune contrepartie « par défaut » : tout est orienté client. Yassine applique l'ordre de lecture imposé du fichier 07.

## J1 — Scan 10 minutes (grille fichier 07)

| Flag | Wording relevé | Gravité | Contre-mesure (bibliothèque) |
|------|----------------|---------|------------------------------|
| 1 | "governed by the laws of the State of New York" | ❌ | droit marocain + arbitrage CIMAC (cl. 21) |
| 2 | "Provider shall indemnify Client without limitation" | ❌ | indemnité mutuelle ciblée intégrée au cap (cl. 14-15) |
| 4 | "all work product is deemed assigned upon creation" | ❌ | transfert au paiement intégral + licence pré-paiement (cl. 10-11) |
| 7 | "payment within sixty (60) days of invoice" | ⚠️ | net-30 without set-off or deduction (cl. 7) |
| 15 | "Client may offset any claimed amounts" | ❌ | « without discount, set-off or deduction » (cl. 7.1) |
| 3 | "renews automatically for successive one-year terms" | ⚠️ | renouvellement par accord écrit exprès (cl. 18) |
| 20 | DPA « GDPR only », silence loi 09-08 | ⚠️ | miroir loi 09-08 / CNDP (cl. 12) |

**Comptage :** 4 ❌ + 3 ⚠️ = plus de 3 rouges → appel + contre-projet structuré. Yassine ne signe rien avant J5.

## J2 — Contre-projet EN (48 h chrono)

### Bloc 1 — Loi applicable & arbitrage (cl. 21)

> **EN (contre-projet) :** "This Agreement shall be governed by Moroccan law. Any dispute arising out of or in connection with this Agreement shall be finally settled by arbitration administered by CIMAC (Casablanca) under its rules, in the English language. For the avoidance of doubt, the seat of arbitration shall be Casablanca, Morocco."

**Note de drafting :** la LLC demandait NY + cour fédérale. En conservant l'anglais comme langue d'arbitrage, on garde le confort du client US tout en ramenant le forum à Casablanca (coût ≈ 5× inférieur à Paris/Londres, exécution facilitée au Maroc).

### Bloc 2 — Cap & indemnité (cl. 14-15)

> **EN (contre-projet) :** "Each Party's aggregate liability arising out of or in connection with this Agreement, whether in contract, tort or otherwise, shall not exceed the total fees paid or payable by Client to Provider under this Agreement during the twelve (12) months preceding the claim. Neither Party shall be liable for indirect, consequential, or lost-profit damages, except for breach of confidentiality, data protection obligations, or the indemnity in clause 15."

### Bloc 3 — IP (cl. 10-11)

> **EN (contre-projet) :** "Title to the work product shall transfer to Client upon full payment of the invoice relating to the relevant deliverable. Until full payment, Client is granted a non-exclusive, revocable licence to use the work product solely for internal testing. Pre-existing tools and know-how of Provider are expressly excluded."

**Note de drafting :** le « work made for hire » US (flag 11) est inopérant au Maroc ; la cession au paiement intégral aligne le risque financier et la propriété. Les préexistances (bibliothèques, modules réutilisables) restent à Yassine : indispensable pour son portefeuille.

### Bloc 4 — Paiement (cl. 7)

> **EN (contre-projet) :** "Invoices shall be paid within thirty (30) days of receipt, without discount, set-off or deduction of any kind. Any late payment shall bear interest at the rate provided by Moroccan law, and a penalty capped at approximately ten percent (10%) of the invoiced amount, consistent with article 264 of the Moroccan Obligations and Contracts (D.O.C.)."

**Note de drafting :** net-60 → net-30 = +30 jours de trésorerie pour Yassine. La pénalité « liquidated damages » démultipliée du MSA est recalibrée à ~10 % (logique DOC art. 264) : crédible en négo, opposable devant le juge.

### Bloc 5 — Renouvellement & sortie (cl. 18-19)

> **EN (contre-projet) :** "This Agreement shall renew only upon a written agreement of both Parties. Either Party may terminate this Agreement for convenience upon thirty (30) days' written notice. Clauses 4, 5, 12, 13 and 20(d) shall survive termination."

### Bloc 6 — Données (cl. 12)

> **EN (contre-projet) :** "Both Parties shall comply with Moroccan Law 09-08 on personal data protection. Any transfer of personal data outside Morocco requires prior authorisation from the CNDP. Provider shall implement appropriate technical and organisational measures to protect personal data."

## J3 — Conférence de rédaction avec le counsel US

La LLC objecte sur deux points : le forum (elle voulait NY) et le cap (elle voulait uncapped). Yassine tient la ligne sur le forum (CIMAC, anglais) et propose un compromis sur le cap : 1× honoraires sur 12 mois, carve-outs bornés (confidentialité + données). Le counsel US accepte en 24 h — il cherchait surtout un interlocuteur qui maîtrise l'idiome contractuel et qui ne bluffe pas.

## J4 — Signature (fichier 10)

Workflow Yousign : version FR (fait foi) + version EN (courtoisie), horodatage, archivage `AAAA-MMJJ_LLC_USA_MSA_FR/EN_signed`. Anonymisation vérifiée avant tout enregistrement Loom.

## J5 — Économie finale du deal

| Poste | Valeur |
|-------|--------|
| Honoraires projet (SOW n°1) | 48 000 DH HT |
| Retainer mensuel | 3 000 DH HT/mois |
| Durée prévisionnelle | 8 mois |
| **Revenu total prévu** | **72 000 DH HT** |
| TVA export (3 conditions art.92 I-1° + IGOC 30j) | 0 % |
| Délai encaissement | net-30 (vs net-60 initial) = +30 j trésorerie |

## Erreurs Top 5 (à ne pas reproduire)

| # | Erreur | Conséquence | Coût |
|---|--------|-------------|------|
| 1 | Signer le MSA initial sans scan | forum NY + uncapped indemnity | ❌ exposition illimitée |
| 2 | Accepter « work made for hire » | code non payé appartient au client | ❌ actif perdu |
| 3 | Négocier oralement sans redline | promesses non opposables | ⚠️ retour case départ |
| 4 | Ignorer la loi 09-08 dans le DPA | non-conformité + sanction | amende 300k-500k |
| 5 | Garder net-60 « pour faire plaisir » | -30 j de trésorerie à chaque facture | ⚠️ cash flow affaibli |

## Checklist express

- [ ] Ordre de scan respecté (loi → cap → IP → paiement → sortie)
- [ ] 7 flags identifiés, contre-mesures numérotées (cl. 7/10/11/12/14/15/18/21)
- [ ] FR fait foi + EN courtoisie (clause de langue)
- [ ] Arbitrage CIMAC, langue anglaise
- [ ] Cap 1× + carve-outs bornés
- [ ] IP au paiement intégral, préexistances exclues
- [ ] net-30 sans set-off, pénalité ~10 %
- [ ] Pas d'evergreen, préavis 30 j
- [ ] Miroir loi 09-08 / CNDP
- [ ] Signature Yousign + archivage conforme

## QCM

**Q1.** Pourquoi Yassine n'a-t-il pas signé le MSA initial ?
A. il n'aime pas le client
B. plus de 3 red flags critiques (forum, indemnité, IP, paiement)
C. le contrat était en anglais

> **Réponse : B —** le scan a révélé 4 ❌ + 3 ⚠️ : au-delà de 3 rouges, on ne signe pas sans contre-projet structuré.

**Q2.** Quel compromis a débloqué la négociation sur le cap ?
A. cap supprimé entièrement
B. cap 1× honoraires sur 12 mois + carve-outs bornés (confidentialité, données)
C. cap uniquement pour la LLC, pas pour Yassine

> **Réponse : B —** le cap symétrique 1× avec carve-outs bornés a été le compromis acceptable, tout en gardant l'arbitrage CIMAC.

**Q3.** Quel est l'impact direct du net-60 → net-30 ?
A. aucun, c'est cosmétique
B. +30 jours de trésorerie à chaque facture
C. moins de travail

> **Réponse : B —** encaisser à 30 jours au lieu de 60 améliore le cash flow de 30 jours par facture, sans aucun coût.

## Fiches révision — 3 cartes

**Carte 1 — Le MSA initial :** loi NY · uncapped · work for hire · net-60 · set-off · evergreen · GDPR only = 7 flags à traiter dans l'ordre.

**Carte 2 — La formule gagnante :** CIMAC + anglais (forum) · cap 1× + carve-outs (exposition) · IP au paiement (actif) · net-30 sans set-off (cash) · miroir 09-08 (conformité).

**Carte 3 — La règle des 48 h :** scan 10 min → contre-projet numéroté → conférence → signature Yousign. Jamais de blabla oral sans redline écrite.

## AR - ملخص ومصطلحات

| FR | EN | AR |
|----|----|----|
| contrat-cadre | Master Services Agreement (MSA) | اتفاقية الخدمات الرئيسية |
| contre-projet | redline / counter-draft | مشروع مضاد |
| plafond de responsabilité | liability cap | سقف المسؤولية |
| cession de droits | IP assignment | نقل الحقوق |
| clause de renouvellement | evergreen clause | شرط التجديد التلقائي |
| arbitrage | arbitration (CIMAC) | تحكيم |

**Darija :**
- Ila b3tlk l'client l'anglais w kaygol "sign here", ma tsa9anch — dir scan 10 dqi9a b grille 07, w redline 48 sa3a.
- L'formule dyal Yassine : CIMAC + net-30 + cap 1x + IP mn ba3d l'khlas — hakka kat7mi ro7ek w katbi3 l'bilinguisme b prix 3ali.

---
**Sources primaires :** impôts.gouv.fr (convention FR-Maroc) · sgg.gov.ma (DOC, Loi 09-08, CGI) · cndp.ma · ICC-arbitration.org / CIMAC (arbitrage). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Modèles = points de départ à adapter au dossier ; convention écrite + provision art.30 avant mission. Secret professionnel art.36. QCM pédagogique — aucun certificat.
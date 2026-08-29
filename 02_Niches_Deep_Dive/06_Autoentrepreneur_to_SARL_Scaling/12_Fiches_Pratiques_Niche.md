# 12 — Fiches Pratiques + Checklists (06_Autoentrepreneur_to_SARL_Scaling)

> Trois fiches de terrain : le kit de bascule (la mission M1 en 1 page), le 1ᵉʳ recrutement (l'option social), et l'agenda de conformité de la SARL année 1 (le produit d'appel de l'abonnement M4).

## Fiche A — Kit bascule AE → SARL (plan 30 jours)

**Semaine -2 (décision)**
*   [ ] Diagnostic 900 HT tenu ; note M2 remise (3 scénarios avec le comptable)
*   [ ] Convention d'honoraires signée (périmètre : SARL + cessation AE + avenants clients jusqu'à 4 + social jusqu'à 2 salariés) + provision
*   [ ] Date cible de bascule écrite (idéalement 1/1 ou 1/7) + rétroplanning attaché

**Semaine 1 (structure)**
*   [ ] Certificat négatif réservé **et** dépôt de marque OMPIC en parallèle (raison sociale ≠ marque — `13` S8)
*   [ ] Statuts (capital, gérance, liste d'actes réservés) signés
*   [ ] RDV banque obtenu ; dépôt des fonds → certificat de dépôt
*   [ ] Enregistrement des statuts (droits)

**Semaine 2 (formalités)**
*   [ ] Immatriculation RC (OMPIC) + extrait
*   [ ] Déclaration commencement d'activité (IF), TP selon local
*   [ ] ICE / identifiants TVA du régime — avec le comptable
*   [ ] **Déclaration de cessation AE à la date de bascule** (RNAE/Barid) + clôture compte de recouvrement

**Semaine 3 (continuité — la partie que tout le monde oublie)**
*   [ ] Avenants de substitution signés : top 4 clients (modèle `13` S2)
*   [ ] Fournisseurs/bail : avenants ou nouveaux contrats au nom de la SARL
*   [ ] Banque : compte pro SARL actif AVANT la 1ʳᵉ facture SARL
*   [ ] Premières factures SARL conformes (CGI art. 145) — modèle inclus

**Semaine 4 (social + clôture)**
*   [ ] Immatriculation employeur CNSS ; contrats 65-99 signés (option) ; bulletins
*   [ ] Registre 09-08 (données clients/salariés) — dépôt si nécessaire
*   [ ] Archive AE (factures, déclarations) copiée + conservée 10 ans
*   [ ] Loom clôture + agenda année 1 (Fiche C) + facture solde

**Le détail qui signe la mission** : la **date** de cessation doit être la même partout (RNAE, DGI, clients, banque). Cinq documents, un seul calendrier.

## Fiche B — 1ᵉʳ recrutement (le kit anti-requalification)

*   [ ] Le poste est un **emploi**, pas une faveur : fiche de poste écrite
*   [ ] Contrat 65-99 : CDI sauf motif du CDD (le « CDD à blanc » successif = CDI requalifié), période d'essai chiffrée (durées légales à vérifier au texte consolidé), rémunération ≥ SMIG horaire légal en vigueur (à sourcer au jour du contrat)
*   [ ] Immatriculation employeur CNSS **avant** le 1ᵉʳ jour travaillé ; déclaration du salarié (DAMANARIC/teledeclaration selon portail du jour)
*   [ ] Bulletin de paie — le 1ᵉʳ mois, pas le premier contrôle
*   [ ] Durée du travail, repos, congés : le code du travail s'applique au 2ᵉ jour, pas au 2ᵉ an
*   [ ] Données personnelles des salariés/futurs clients : registre 09-08 (pivot `03/08_...`)
*   [ ] Le passif de la « période AE non déclarée » : ne pas le régulariser par écrit non conseillé — en parler au client, chiffrer les branches, documenter la décision dans la note

## Fiche C — Agenda de conformité SARL année 1 (celui qui vend M4)

| Quand | Quoi | Base |
| :--- | :--- | :--- |
| Chaque mois | Paie + déclarations CNSS (si salariés) | Code CNSS |
| Chaque mois/trimestre | TVDS (TVA) selon régime | CGI ; calendrier DGI `tax.gov.ma` |
| Chaque trimestre | Situation intermédiaire + suivi plafond (le comptable) | — |
| J+4 après clôture | AG : comptes annuels + **affectation du résultat** (PV même en SARL-AU) | loi 5-96 |
| Après AG | Liasse fiscale (IS 20 % taux 2026) + TV | CGI LF 2026 |
| Année 1 | Dépôt du/des traitement(s) de données personnelles (registre 09-08) si non fait à la création | loi 09-08 |
| Chaque année | Renouvellements : marque (10 ans), autorisations sectorielles | 17-97 |
| 1ᵉʳ janvier | Veille LF (IS, RAS 11,25 → 10 % 2027, franchise TVA) + IGOC si activité internationale | — |

## Plan 7 jours (client urgent « je suis radié dans 3 semaines »)

*   **J1** : Diagnostic accéléré (900 HT) ; convention + provision ; certificat négatif posé.
*   **J2-3** : Statuts signés (modèle SARL-AU bascule avec clauses `13` S4) ; RDV banque.
*   **J4** : Dépôt des fonds ; enregistrement.
*   **J5** : Immatriculation RC ; IF/TP ; commencement d'activité.
*   **J6** : Cessation AE déclarée à la date choisie ; avenant du client principal envoyé.
*   **J7** : Loom 10 min « ce qui reste à faire » (marque, social, registre) — le reste de la mission se poursuit hors urgence.

## Modèles `05_Document_Bank` mobilisés

*   `01_Convention_Honoraires_Modele.md` (périmètre bascule + options)
*   Trame **avenant de substitution** (client AE → SARL) — à créer dans le pack `templates` (réf. `13` S2)
*   Trame **contrat de prestation réel** (la « fausse freelance » régularisée) — pivot pack freelance `03`
*   Lettre tripartite avocat-comptable-client (process M2)

---

## Fiche comme mémoire externe, pas comme script de vente

La niche se gagne sur l'**ordre** : les mêmes formalités faites dans le mauvais ordre produisent une fenêtre sans statut, une facture inopposable, une embauche requalifiable. Les trois fiches sont la matérialisation d'une seule promesse : « à la fin, tout est daté au même endroit ». C'est aussi le produit qui rend l'avocat remplaçable aux yeux du client — en apparence : le client qui a goûté au calendrier ne revient plus jamais à une prestation sans calendrier, et c'est exactement le chemin de l'abonnement.

> Sources : `sgg.gov.ma` (lois 114-13, 5-96, 65-99, CGI), `tax.gov.ma`, `cnss.ma`, `ae.gov.ma`, `ompic.ma`. Vérifié le 29/08/2026 ; grilles CNSS/TVA à recopier au jour du dossier.

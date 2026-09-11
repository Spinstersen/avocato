# 14 — Contrats clients étrangers encyclopédique (freelance & agence offshore)

> Le contrat qui fait rapatrier l'argent. Chaque clause expliquée : pourquoi, comment la rédiger, variante FR/EN, piège marocain (change, TVA, preuve). À lire avec `13_Solutions` (playbook) et `08_Fiscalite/14` (leviers). Vérifié 07/09/2026 — bases : IGOC 2026 (90j services / 150j biens), TVA export art. 92 CGI à ouvrir, facturation CGI art. 145, loi 5-96, loi 66-23 (ex 28-08) convention d'honoraires.

## 1. Anatomie d'un contrat offshore qui tient en banque et au contrôle

Un contrat freelance export = 10 blocs : parties → objet/livrables → prix/paiement (compte MA + exigibilité) → délais → propriété intellectuelle → confidentialité → responsabilités/garanties → résiliation → droit applicable/juridiction → annexes (devis, RIB, attestation). Sans le bloc paiement avec compte marocain et date d'exigibilité, les 90j ne courent pas proprement et la banque bloque.

## 2. Clause par clause — explication longue

**2.1 Parties.** Identifier personne + ICE/RC/AE + adresse + représentant. Si client US/UK : dénomination exacte + EIN/Company number + adresse + contact finance (c'est lui qui fournira l'attestation de paiement). Erreur : facturer « John, startup US » sans entité — impayé irrécouvrable.

**2.2 Objet et livrables.** Décrire livrable vérifiable (fonctionnalités, maquettes, jalons, critères d'acceptation, outils, délais). Prévoir recette écrite sous X jours, silence = acceptation. Pourquoi : sans acceptation datée, le client retarde le paiement et le délai de rapatriement dérive.

**2.3 Prix et paiement — la clause mère.** Modèle :
> « Prix : [X] [devise], hors taxes marocaines. Payé par virement au compte bancaire marocain du Prestataire n° [IBAN devise/dirhams convertibles, banque, SWIFT] au plus tard le [date d'exigibilité : ex. 15 jours après acceptation]. Le Client fournira sur demande toute attestation de paiement requise par les autorités de change marocaines. Tout changement de compte notifié 15j avant par écrit. Retard = intérêts [taux] + frais. »
Explication : le compte MA pré-rempli rend le rapatriement automatique ; la date fixe le départ des 90j ; l'attestation transforme le client en auxiliaire de preuve ; le changement de compte encadré évite le rebond Wise perso.

**2.4 TVA.** Mention : « Prestation à client non-résident utilisée à l'étranger — exonération TVA art. 92 CGI (conditions à ouvrir), à défaut TVA marocaine applicable. » + facture identique. Sans mention + preuve d'usage étranger (brief, livrable, IP), la DGI réintègre.

**2.5 IP et cession.** Cession seulement après paiement intégral, périmètre (code, design, droits patrimoniaux loi 2-00 modifiée 34-05 à ouvrir), garantie d'originalité, licence sur outils préexistants. Agence : clause sous-traitants (qui cède quoi, quand).

**2.6 Confidentialité / non-sollicitation.** Durée, périmètre, sanction (clause pénale à doser — contentieux pénalité : `08_Jurisprudence/08`), non-débauchage 12 mois.

**2.7 Responsabilité.** Plafond (ex. 100% du prix du lot), exclusion indirects, assurance RC pro, force majeure, maintenance/garantie corrective X jours.

**2.8 Résiliation.** Préavis, paiement du fait accompli (timesheets/livrables), restitution, kill fee 30-50% si annulation tardive.

**2.9 Droit et litiges.** Droit marocain + arbitrage/CCI ou tribunal compétent selon enjeu ; langue FR/EN (préciser version faisant foi) ; médiation préalable 30j (vendable, désescalade).

## 3. Trois variantes encyclopédiques

**A. Freelance dev (TJM/jalon).** Facturation au jalon accepté, acompte 30%, registre 90j par facture, clause suspension si retard >15j.
**B. Agence avec sous-traitants.** Contrat client + contrats miroirs sous-traitants (prix, délais, IP cédée à l'agence avant re-cession, confidentialité descendante, assurance). Marge = différence documentée, pas cascade opaque (`08/17`).
**C. Maintenance/run mensuel.** Abonnement avec SLA, reporting, révision annuelle prix, résiliation à date anniversaire.

## 4. Dossier de preuve joint au contrat (checklist banque/contrôle)

Contrat signé + devis accepté + factures art. 145 + preuves d'usage étranger + acceptations + SWIFT + registre (exigibilité→butoir→crédit→alerte J-15). Classement mensuel. Sans ce dossier, le contrat est un PDF, pas une protection.

---
> Templates : `05_Document_Bank/templates/03_Pack_Freelance_Contrat.md`. Co-traitance comptable pour TVA/liasse. Tout taux étranger (retenue client US/UK) = confirmation confrère/CPA jointe.

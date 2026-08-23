# 04 — Clause Library 03 · IP & Data Protection (Clauses 10–13)

> Le bloc qui protège votre actif (le code, les créations) et votre conformité (loi 09-08 / CNDP). Règle d'or du module : la propriété intellectuelle suit le paiement intégral, jamais la signature. Clauses 10 à 13 sur 24, en miroir FR/EN avec notes de drafting.

**Liens utiles :** [Clause library 02](03_Clause_Library_02_Scope_Fees_Payment_FR_EN.md) · [Clause library 05](05_Clause_Library_05_Liability_Indemnity_ForceMajeure_FR_EN.md) · [Glossaire trilingue](../../00_START_HERE/06_Glossaire_Trilingue_50_Termes_FR_EN_AR.md)

## Objectifs

- Conditionner le transfert de propriété intellectuelle au paiement intégral.
- Donner au client une licence pré-paiement qui lui permet de tester sans vous dépouiller.
- Offrir un miroir EN de la loi 09-08 (registre CNDP, autorisation de transfert hors Maroc).
- Encadrer la confidentialité avec exclusions standard et durée raisonnable.

## Prérequis

- Fichier 02 : defined terms "Livrables/Deliverables", "Informations Confidentielles".
- Fichier 01 : discipline des modaux.

## TL;DR

- Transfert de propriété AU PAIEMENT INTÉGRAL ; avant, simple licence révocable d'évaluation.
- Loi 09-08 : registre des traitements + autorisation CNDP pour tout transfert hors Maroc — deux mots-clés qui rassurent un DPO étranger.
- Confidentialité mutuelle, exclusions classiques, survie 3 ans après fin du contrat.

## Position dans les 24 clauses

| Clauses | Bloc | Rôle |
|---|---|---|
| 10 | IP Assignment upon Full Payment | transfert conditionné |
| 11 | Pre-Payment Licence | pont commercial |
| 12 | Data Protection (Loi 09-08) | conformité données |
| 13 | Confidentiality | secret mutuel |
| → 14–17 | fichier 05 | bloc risque |

---

### Clause 10 — IP Assignment upon Full Payment · Cession au paiement intégral

> **FR :**
> **10.1** La pleine propriété des Livrables spécifiquement développés pour le Client est transférée au Client à compter du paiement intégral des sommes dues au titre du SOW correspondant.
> **10.2** Jusqu'à cette date, le Prestataire conserve l'intégralité des droits sur les Livrables.

> **EN :**
> **10.1** Full ownership of the Deliverables specifically developed for the Client transfers to the Client upon receipt in full of all amounts due under the corresponding Statement of Work.
> **10.2** Until such date, the Provider retains all rights in and to the Deliverables.

*Note de drafting —* C'est le pendant services de la réserve de propriété écrite de l'art. 618 DOC (prévue pour la vente de marchandises) : ici aussi, l'écrit est indispensable et le transfert ne joue qu'au paiement effectif. Refusez toute formulation "assigned upon creation" — c'est le red flag n°4 du fichier 07.

---

### Clause 11 — Pre-Payment Licence · Licence pré-paiement

> **FR :**
> **11.1** En attendant le paiement intégral visé à l'article 10, le Prestataire accorde au Client une licence non exclusive, non transférable et révocable d'utiliser les Livrables en interne uniquement, à des fins d'évaluation.
> **11.2** Cette licence prend fin automatiquement en cas de défaut de paiement.

> **EN :**
> **11.1** Pending payment in full under Clause 10, the Provider grants the Client a non-exclusive, non-transferable and revocable licence to use the Deliverables internally only, for evaluation purposes.
> **11.2** Such licence terminates automatically upon any payment default.

*Note de drafting —* Le pont commercial : le client peut tester en production interne sans acquérir de droits définitifs. La révocation automatique est votre levier de recouvrement pacifique — elle évite de devoir « couper » un système chez un client mécontent.

---

### Clause 12 — Data Protection · Protection des données (Loi 09-08)

> **FR :**
> **12.1** Chaque Partie traite les données personnelles conformément à la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et aux décisions de la Commission Nationale de contrôle de la protection des Données à caractère Personnel (CNDP).
> **12.2** Le Prestataire agit comme sous-traitant du Client, tient le registre des traitements requis et met en œuvre des mesures de sécurité raisonnables.
> **12.3** Aucun transfert de données hors du Maroc n'est effectué sans l'autorisation préalable de la CNDP lorsque celle-ci est requise.

> **EN :**
> **12.1** Each Party processes personal data in accordance with Moroccan Law No. 09-08 on the protection of individuals with regard to the processing of personal data and with the decisions of the Moroccan data protection authority (CNDP).
> **12.2** The Provider acts as processor on behalf of the Client, maintains the required processing register and implements reasonable security measures.
> **12.3** No personal data shall be transferred outside Morocco without prior authorisation from the CNDP where such authorisation is required.

*Note de drafting —* Ce miroir EN est devenu incontournable dès qu'un client US/UE touche des données de résidents marocains : registre + autorisation de transfert sont les deux mots-clés qu'un DPO étranger cherche dans votre contrat. Un hébergement cloud européen = transfert hors Maroc : anticipez l'autorisation CNDP avant le premier commit, pas après.

---

### Clause 13 — Confidentiality · Confidentialité

> **FR :**
> **13.1** Chaque Partie garde confidentielles les Informations Confidentielles de l'autre pendant la durée du Contrat et trois (3) ans après son terme.
> **13.2** Ne constituent pas des Informations Confidentielles : les informations publiques, déjà connues légitimement, développées indépendamment ou reçues de tiers sans restriction ; celles dont la divulgation est exigée par la loi ou une juridiction, sous réserve d'une notification préalable si permise.

> **EN :**
> **13.1** Each Party keeps the other Party's Confidential Information confidential during the term of this Agreement and for three (3) years after its expiry or termination.
> **13.2** Confidential Information does not include information that is public, already known legitimately, independently developed or received from third parties without restriction; nor information whose disclosure is required by law or a court, subject to prior notice where permitted.

*Note de drafting —* Les exclusions standard (public, connu, indépendant, tiers) sont attendues par tout counsel US : leur absence signale un NDA amateur. Survie de 3 ans = équilibre courant pour du dev ; pour des secrets d'affaires purs, prévoyez une option "as long as trade secrets remain so".

## Cas pratique

Yassine livre la v1 de l'application, le client paie 60 % puis traîne trois semaines sur le solde. Activation combinée : licence pré-paiement révoquée (clause 11), accès staging suspendu, relance citant les clauses 7, 8 et 11. Facture payée en 72 heures. Aucun tribunal, aucune agressivité : le contrat a fait le travail que la relation seule n'a pas su faire. Point clé : Yassine avait refusé en amont la clause "IP assigned upon creation" du contrat client — sinon il aurait livré ses droits sans contrepartie complète.

## Erreurs Top 5

| # | Erreur | Conséquence | Coût |
|---|--------|-------------|------|
| 1 | Accepter "IP assigned upon creation" | droits perdus avant paiement | ❌ actif entier exposé |
| 2 | Livrer sans licence pré-paiement encadrée | usage illimité sans recours | solde impayé durable |
| 3 | Ignorer l'autorisation CNDP pour un cloud UE | non-conformité loi 09-08 | ⚠️ sanction + perte du client EU |
| 4 | Confidentialité sans exclusions | clause inapplicable, image amateur | renégociation coûteuse |
| 5 | Confidentialité perpétuelle acceptée | prison contractuelle douce | portfolio gelé |

## Checklist

- [ ] Transfert IP strictement lié au paiement intégral (clauses 10 + 7)
- [ ] Licence pré-paiement : interne, évaluation, révocable automatiquement
- [ ] Préexclusions des Livrables cohérentes avec la clause 1 (fichier 02)
- [ ] Registre des traitements tenu ; autorisation CNDP demandée AVANT tout cloud hors Maroc
- [ ] Exclusions standard de confidentialité présentes ; survie bornée (3 ans)
- [ ] Miroir EN conforme mot à mot au FR (aucun sens divergent)

## QCM

**Q1.** Quand la pleine propriété des Livrables se transfère-t-elle ?
A. à la signature
B. à la livraison
C. au paiement intégral du SOW correspondant

> **Réponse : C —** logique de réserve de propriété transposée aux services (esprit art. 618 DOC) : la signature engage, seul le paiement intégral transfère.

**Q2.** Votre stack tourne sur un cloud européen avec des données marocaines :
A. aucun problème, le cloud est mondial
B. transfert hors Maroc → autorisation CNDP requise quand applicable
C. seul le RGPD compte

> **Réponse : B —** la loi 09-08 soumet le transfert vers l'étranger à l'autorisation CNDP lorsque celle-ci est requise. Anticipez la formalité avant le premier déploiement.

**Q3.** Le client veut utiliser les Livrables pendant la période de paiement :
A. impossible
B. licence non exclusive, non transférable, révocable, usage interne d'évaluation (clause 11)
C. cession partielle gratuite

> **Réponse : B —** le pont exact : test possible, droits définitifs non acquis, révocation automatique en cas de défaut.

## Fiches révision — 3 cartes

**Carte 1 — IP suit le paiement :** "Full ownership transfers upon receipt in full" — jamais "upon creation". Référence d'esprit : réserve de propriété écrite art. 618 DOC.

**Carte 2 — Duo 09-08/CNDP :** registre des traitements tenu + aucun transfert hors Maroc sans autorisation préalable. Deux phrases EN à connaître par cœur.

**Carte 3 — Confidentialité pro :** mutualité, 4 exclusions standard (publique, connue, indépendante, tiers), divulgation légale avec notification, survie 3 ans.

## AR - ملخص ومصطلحات

| FR | EN | AR |
|----|----|----|
| cession de droits | assignment of rights | التنازل عن الحقوق |
| licence d'utilisation | licence | رخصة الاستغلال |
| registre des traitements | processing register | سجل عمليات المعالجة |
| transfert de données à l'étranger | cross-border data transfer | نقل المعطيات نحو الخارج |
| sous-traitant de données | processor | المتعامل بالنيابة عن المسؤول |
| informations confidentielles | confidential information | المعلومات السرية |

**Darija :**
- L'code dyalek howa rasmalek : mat3tihch meli kayseftlek chek — 3tih ghir licence sghira wajda hta ykhles, w ila tqadach, tkansliha b wa7ed click.
- Ila l'data dyal nas maghribiya kathel f cloud barra, khass autorisation men CNDP qbel — had l'kelma wa7eda katmeyez bin professional w amateur f 3inin dyal l'DPO l'khariji.

---
**Sources primaires :** impôts.gouv.fr (convention FR-Maroc) · sgg.gov.ma (DOC, Loi 09-08) · cndp.ma · ICC-arbitration.org / CIMAC (arbitrage). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Modèles = points de départ à adapter au dossier ; convention écrite + provision art.30 avant mission. Secret professionnel art.36. QCM pédagogique — aucun certificat.

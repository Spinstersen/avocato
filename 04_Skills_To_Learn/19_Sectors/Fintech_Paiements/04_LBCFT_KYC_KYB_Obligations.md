# 04 — LBCFT : Obligations KYC/KYB pour Plateformes et Marketplaces

> Skills n°19 Sector Deep Dives — Fintech & Paiements (Maroc)

**Temps de lecture : ~12 min** · **Niveau : cœur de spécialité** · **Prérequis : [02_Cadre EDP](02_Cadre_Juridique_Etablissements_Paiement.md)**

**Liens croisés :** [Glossaire](../../../00_START_HERE/03_Glossaire_12_Concepts_Cles.md) · [Données 09-08](03_Donnees_Paiement_0908_Transferts.md) · [Arbre licence vs partenaire](10_Arbre_Decision_Licence_vs_Partenaire.md)

## Objectifs

- Expliquer le dispositif anti-blanchiment marocain (Loi 43-05 modifiée, ANRF).
- Construire un dossier KYC (particuliers) / KYB (entreprises, UBO) défendable.
- Sécuriser une marketplace qui détient des fonds de vendeurs.

## Prérequis

- Fichier 02 (qualification paiement) : la détention de fonds de tiers déclenche la couche LBCFT.
- Bases du droit des sociétés (gérant, associés, bénéficiaire effectif).

## TL;DR

La **Loi 43-05 modifiée** organise la lutte contre le blanchiment de capitaux et le financement du terrorisme autour de l'**ANRF**, qui centralise les **déclarations de soupçon**. Toute plateforme qui encaisse, détient ou reverse des fonds doit appliquer une vigilance : **KYC** sur les particuliers (identité vérifiée, documents), **KYB** sur les vendeurs professionnels (bénéficiaires effectifs/UBO, statuts, RIB au nom de la société) et **traçabilité** des flux. Pour une marketplace à 3M MAD/an, un dispositif minimal documenté est la différence entre un investisseur convaincu et un deal mort.

## Base légale

| Règle | Base | Source + date vérif |
|-------|------|---------------------|
| Vigilance KYC/KYB et traçabilité des opérations | Loi 43-05 modifiée | sgg.gov.ma + anrf.ma, vérifié 23/08/2026 |
| Déclaration de soupçon auprès de l'ANRF | Loi 43-05 modifiée | anrf.ma, 23/08/2026 |
| Conservation des pièces justificatives `[durée précise à vérifier]` | Loi 43-05 modifiée | anrf.ma, 23/08/2026 |
| Données collectées au titre KYC = données personnelles | Loi 09-08 | cndp.ma, 23/08/2026 |

## Contenu principal

### Le triptyque KYC — KYB — Traçabilité

| Pilier | Contenu minimal | Preuve archivée |
|--------|-----------------|-----------------|
| KYC particulier | Identité officielle en cours de validité ; coordonnées ; vérification cohérence | Copie document + log de vérification |
| KYB vendeur pro | Registre commercial/statuts ; identité du dirigeant ; RIB au nom de la société | Dossier entreprise complet |
| UBO (bénéficiaires effectifs) | Identifier les personnes physiques qui contrôlent in fine le vendeur | Déclaration UBO signée |
| Screening | Vérification contre listes de gel/sanctions publiées `[listes applicables à vérifier]` | Résultat de screening daté |
| Traçabilité flux | Chaque reversement rattaché à une commande et un vendeur identifié | Journal des paiements |
| Surveillance | Seuils/alertes internes (volume anormal, multiplicité de comptes bancaires) | Procédure écrite + rapports d'alerte |

### Marketplace : pourquoi vous êtes exposée

Une marketplace qui collecte chez l'acheteur puis reverse au vendeur fonctionne comme une chambre de compensation de fait. Même si les fonds passent par un PSP partenaire agréé (recommandé, fichier 10), la marketplace conserve des obligations contractuelles et pratiques :

1. **Ne pas onboarder un vendeur sans dossier KYB/UBO complet.**
2. **Payer toujours sur le RIB de la société vendeuse**, jamais sur le compte personnel du gérant — signal d'alerte classique de blanchiment.
3. **Documenter la procédure** : qui vérifie quoi, quand, avec quel rejet possible.
4. **Savoir déclarer** : face à une opération suspecte, la question de la déclaration de soupçon auprès de l'ANRF se pose `[qualifiés assujettis exacts à vérifier selon votre statut — avocat spécialisé requis]`.

### Articulation avec la Loi 09-08

Les pièces KYC sont des données personnelles sensibles par nature (documents d'identité). Prévoir : registre CNDP à jour, durées de conservation définies, accès restreint, aucune synchronisation vers un outil cloud étranger sans autorisation (fichier 03).

## Cas pratique chiffré

Marketplace, 3M MAD/an de GMV, 340 vendeurs actifs dont 60% de micro-entrepreneurs :

- État des lieux : 0 pièce KYB pour 210 vendeurs historiques ; reversements parfois vers comptes personnels.
- Remédiation en 6 semaines : campagne de collecte KYB/UBO (S1–S3), blocage automatique des vendeurs incomplets (S3), bascule 100% RIB société (S4), procédure de vigilance écrite + screening initial (S5), formation équipe support (S6).
- Facturation : pack conformité 18.000–28.000 HT selon périmètre + retainer 2.500–3.500 HT/mois (screening continu, veille).
- Impact business racontable à l'investisseur : dossier KYB complet = diligence financière accélérée, levée sécurisée (fichier 08).

## Erreurs coûteuses — Top 5 (DH)

1. ❌ Reverser sur des comptes personnels de gérants : rupture totale de traçabilité → refus bancaire du PSP partenaire, gel des flux.
2. ⚠️ Onboarder « maintenant, vérifier plus tard » : vendeur douteux déjà payé = recouvrement impossible + exposition LBCFT.
3. ❌ Aucun screening sanctions : découverte lors de la DD investisseur → clause d'indemnité négociée contre vous.
4. ⚠️ KYC stocké dans un Drive partagé non maîtrisé : violation 09-08 cumulée (jusqu'à 300.000–500.000 DH art. 52).
5. ❌ Ne rien écrire (« on fait confiance ») : en LBCFT, ce qui n'est pas documenté n'existe pas ; coût de remise à niveau rétroactive x3.

## Checklist dispositif LBCFT minimum

- [ ] Procédure de vigilance écrite, datée, signée par la direction.
- [ ] Dossier KYB/UBO pour chaque vendeur actif, à jour.
- [ ] Reversements exclusivement vers RIB société vérifié.
- [ ] Screening initial + périodique documenté `[listes à déterminer]`.
- [ ] Journal de traçabilité commandes ↔ paiements ↔ vendeurs.
- [ ] Registre CNDP couvrant les données KYC ; conservation encadrée.

## QCM (3 questions)

**Q1.** Quelle institution centralise les déclarations de soupçon au Maroc ?
A. La CNDP · B. L'ANRF · C. Bank Al-Maghrib
> **Réponse : B —** l'ANRF est l'organe de renseignement financier issu du dispositif Loi 43-05 modifiée ; BAM reste régulateur des établissements de paiement et CNDP compétente pour les données.

**Q2.** Le « KYB » d'un vendeur professionnel comprend au minimum :
A. Un logo et un Instagram · B. Statuts/RC, identité du dirigeant, RIB société, bénéficiaires effectifs (UBO) · C. Une facture TVA
> **Réponse : B —** le KYB vise à savoir QUI contrôle in fine la société vendeuse et où arrivent réellement les fonds ; le RIB personnel du gérant est un red flag majeur.

**Q3.** Les documents d'identité collectés au titre du KYC sont :
A. Exclus du champ 09-08 · B. Des données personnelles à déclarer et conserver de façon encadrée · C. Publiable dans les CGU
> **Réponse : B —** ils relèvent de la Loi 09-08 : registre, durées de conservation, sécurité, et pas de transfert hors Maroc sans autorisation CNDP.

## Fiches révision (3 cartes)

- **Carte 1 — Cadre :** Loi 43-05 modifiée + ANRF = déclaration de soupçon ; vigilance continue obligatoire.
- **Carte 2 — Outils :** KYC (identité) · KYB (société + UBO) · screening · traçabilité commande→reversement.
- **Carte 3 — Réflexe marketplace :** jamais de reversement sur compte perso ; dossier KYB avant premier versement ; tout est documenté.

## EN - Key takeaways

Morocco's anti-money-laundering framework rests on Law 43-05 as amended and its financial intelligence unit, ANRF, which receives suspicious transaction reports. Any platform that collects, holds or disburses funds must run proportionate due diligence: identity verification for individuals, corporate verification for professional sellers including ultimate beneficial owners, screening against applicable lists, end-to-end traceability from order to payout, and written procedures with alert thresholds. For a marketplace handling three million dirhams yearly, the classic red flags are payouts to managers' personal accounts and sellers onboarded without documentation. These obligations interlock with Law 09-08 since identity documents are personal data requiring register entries and controlled retention. A documented six-week remediation, billed within the compliance pack, converts regulatory risk into investor confidence and recurring advisory revenue.

## AR - ملخص ومصطلحات

| FR | AR |
|----|----|
| Blanchiment de capitaux | غسل الأموال |
| Déclaration de soupçon | التصريح بالشبهة |
| KYB / Bénéficiaire effectif | التعرف على المؤسسة / المستفيد الحقيقي |
| Vigilance | اليقظة |
| Traçabilité des flux | تتبع التدفقات المالية |
| Gel des avoirs | تجميع الأموال |

**Darija :**
- Ma tkhellesch flouss dyal vendeur f compte personnel dyalo — khass RIB dyal charika, sinon khasara kbira.
- Qbel ma tqbel chi vendeur f marketplace, khoud menno dossier kmel: statuts, RC, chkoun li kaycontrôli mn dakhel (UBO).

---
**Sources primaires :** bkam.ma (Bank Al-Maghrib) · cmi.co.ma · sgg.gov.ma (Loi 103-12, Loi 43-05, Loi 09-08) · cndp.ma · oc.gov.ma (IGOC 2024). Dernière vérification : 23/08/2026 — re-vérifier liste PSP agréés sur bkam.ma.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Secteur régulé : valider toujours avec l'autorité (BAM/CNDP) et un confrère spécialisé. QCM pédagogique — aucun certificat.

# 00 — Index Module Fintech & Paiements

> Skills n°19 Sector Deep Dives — Fintech & Paiements (Maroc)

**Temps de lecture : ~7 min** · **Niveau : intermédiaire** · **Statut : ✅ construit sprint 1 (23/08/2026)**

**Liens croisés :** [Glossaire 12 concepts clés](../../../00_START_HERE/03_Glossaire_12_Concepts_Cles.md) · [Index secteurs](../00_INDEX.md) · [Numbers Sheet](../../07_Sharp_Legal_Mind/03_Numbers_Sheet.md)

## Objectifs

À la fin de ce module, vous savez : cartographier les acteurs du paiement au Maroc, déterminer si un client doit obtenir un agrément d'établissement de paiement ou s'associer à un agréé, sécuriser un contrat marchand, défendre un chargeback, appliquer les obligations LBCFT aux marketplaces, traiter les données de paiement (09-08), et chiffrer une mission de conformité fintech.

## Prérequis

- Bases Loi 09-08 (voir niche [03_Loi_09-08_GDPR_Compliance](../../../02_Niches_Deep_Dive/03_Loi_09-08_GDPR_Compliance/00_INDEX.md)).
- Notions de contrat commercial et de responsabilité.
- Aucune connaissance bancaire préalable requise.

## TL;DR

Le paiement marocain est un écosystème régulé par **Bank Al-Maghrib** (Loi 103-12) avec le **CMI** comme infrastructure centrale. Un fondateur fintech a toujours deux questions : « ai-je besoin d'un agrément ? » (fichier 10) et « suis-je conforme ? » (fichiers 03, 04, 06). Votre offre se vend en trois paliers : diagnostic 600–1.200 HT, pack conformité 12.000–28.000 HT, retainer 2.500–3.500 HT/mois.

## Ordre de lecture (12 fichiers)

| # | Fichier | Question à laquelle il répond |
|---|---------|-------------------------------|
| 01 | Paysage fintech Maroc | Qui fait quoi dans l'écosystème paiement ? |
| 02 | Cadre juridique EDP | Qu'est-ce qu'un établissement de paiement (Loi 103-12) ? |
| 03 | Données paiement & transferts 09-08 | Que faire des données clients/cloud ? |
| 04 | LBCFT, KYC/KYB | Quelles obligations anti-blanchiment ? |
| 05 | Contrat marchand / acquisition CMI | Comment négocier l'adhésion marchand ? |
| 06 | Chargebacks & litiges consommateur | Comment défendre une rétrofacturation ? |
| 07 | Change, devises, IGOC 2024 | Comment traiter les revenus en devises ? |
| 08 | Cas practice PSP pré-levage | À quoi ressemble une mission DD complète ? |
| 09 | Offre pack fintech chiffrée | Combien facturer, comment pitcher ? |
| 10 | Arbre licence vs partenaire | Agrément EDP ou partenariat ? |
| 11 | Checklist audit 20 pts + QCM | Le client est-il prêt pour un audit ? |

## Personas du module

| Persona | Profil | Fichiers clés |
|---------|--------|---------------|
| Salma | E-commerçante high volume, cartes + COD | 05, 06, 07 |
| Hicham | Plateforme d'abonnements SaaS (recurring billing) | 03, 05, 07, 10 |
| Marketplace | Place de marché ~3M MAD/an détenus vendeurs | 02, 04, 10 |
| Startup PSP | Wallet/PSP pré-levage, due diligence investisseurs | 02, 04, 08 |

## Quand vendre quoi (symptôme → fichier → offre)

| Ce que dit le prospect | Ouvrir | Offre à proposer |
|------------------------|--------|------------------|
| « Un investisseur fait sa due diligence » | 08 | Diagnostic puis pack conformité |
| « On va lancer une marketplace » | 02 + 04 + 10 | Pack conformité + retainer |
| « La banque nous demande des documents » | 05 | Mission ponctuelle chiffrée |
| « On reçoit beaucoup de chargebacks » | 06 | Playbook chargeback + formation |
| « On veut facturer en euros » | 07 | Audit change IGOC |

## Base légale (vue module)

| Règle | Base | Source + date vérif |
|-------|------|---------------------|
| Agrément des établissements de paiement par BAM | Loi 103-12 | sgg.gov.ma + bkam.ma, vérifié 23/08/2026 |
| LBCFT : vigilance, KYC/KYB, déclaration de soupçon | Loi 43-05 modifiée | sgg.gov.ma + anrf.ma, 23/08/2026 |
| Données de paiement = données personnelles ; transfert hors Maroc soumis à autorisation CNDP | Loi 09-08, art. 52 | cndp.ma + sgg.gov.ma, 23/08/2026 |
| Protection consommateur e-commerce (information précontractuelle, livraison) | Loi 31-08 | sgg.gov.ma, 23/08/2026 |
| Change : rapatriement 30 j, comptes pro devises, dotations voyage/e-commerce | IGOC 2024 | oc.gov.ma, 23/08/2026 |

## Erreurs coûteuses — Top 5 (DH)

1. ⚠️ Détenir les fonds des vendeurs d'une marketplace sans statut adapté : risque de requalification (établissement de paiement non agréé) + exposition LBCFT — coût potentiel : sanctions et gel des flux [à vérifier bkam.ma].
2. ⚠️ Transfert de données de paiement hors Maroc sans autorisation CNDP : amende 300.000–500.000 DH + emprisonnement (art. 52 Loi 09-08).
3. ❌ Signer l'adhésion marchand CMI sans lire les clauses de réserve, plafond et résiliation : trésorerie bloquée au pire moment (Salma, fichier 05).
4. ❌ Ignorer le rapatriement des créances en devises sous 30 jours (IGOC 2024) : redressement Office des Changes.
5. ⚠️ Vendre un audit fintech au forfait « diagnostic » quand le périmètre exige le pack : marge perdue de 11.400 à 26.800 HT par dossier.

## Cas pratique chiffré (fil rouge)

Une marketplace marocaine réalise 3M MAD/an de GMV. Elle collecte les paiements acheteurs, reverse aux vendeurs chaque semaine. Trois sujets juridiques immédiats : qualification de son activité (fichier 02/10), obligations KYB sur ses vendeurs (fichier 04), formalités CNDP sur les données acheteurs (fichier 03). Facturation réaliste : diagnostic 1.200 HT, pack conformité 24.000 HT, retainer 3.000 HT/mois.

## Checklist démarrage rapide

- [ ] Identifier si le client détient des fonds de tiers (déclic n°1).
- [ ] Vérifier le statut du prestataire de paiement utilisé : liste agréés BAM [à vérifier bkam.ma].
- [ ] Cartographier les traitements de données de paiement (déclaration CNDP ?).
- [ ] Relire l'adhésion marchand : réserve, plafonds, résiliation.
- [ ] Vérifier les flux devises : rapatriement 30 j respecté ?

## QCM (3 questions)

**Q1.** Quelle institution agrée les établissements de paiement au Maroc ?
A. Le CMI · B. Bank Al-Maghrib · C. L'ANRF
> **Réponse : B —** la Loi 103-12 confie l'agrément et la supervision des établissements de paiement à Bank Al-Maghrib ; la liste des agréés est publiée par BAM [à vérifier bkam.ma]. Le CMI est une infrastructure d'interconnexion monétique, pas un régulateur.

**Q2.** Une marketplace qui conserve les fonds des vendeurs avant reversement doit d'abord analyser :
A. Son référencement SEO · B. Sa qualification au regard de la Loi 103-12 et ses obligations LBCFT · C. Son logo
> **Réponse : B —** la détention de fonds de tiers est le déclencheur principal du régime EDP et impose une analyse LBCFT (Loi 43-05 modifiée, KYB/UBO). C'est exactement l'arbre de décision du fichier 10.

**Q3.** Sanction maximale type en cas de violation des règles de transfert de données (Loi 09-08, art. 52) ?
A. Amende 300.000–500.000 DH + emprisonnement jusqu'à 6 mois · B. Simple avertissement CNDP · C. Aucune sanction
> **Réponse : A —** l'article 52 prévoit amende de 300.000 à 500.000 DH et emprisonnement pouvant atteindre 6 mois ; c'est l'argument massue face à un fondateur qui veut « juste brancher un CRM cloud ».

## Fiches révision (3 cartes)

- **Carte 1 — Écosystème :** BAM régule (Loi 103-12) · CMI interconnecte les cartes · banques acquéreurs adhèrent les commerçants · PSP/agrégateurs simplifient l'intégration.
- **Carte 2 — Déclencheurs :** détenir des fonds de tiers → analyse EDP + LBCFT · traiter des données paiement → 09-08/CNDP · encaisser en devises → IGOC 2024.
- **Carte 3 — Offre :** diagnostic 600–1.200 HT → pack 12.000–28.000 HT → retainer 2.500–3.500 HT/mois.

## EN - Key takeaways

This module index organizes the twelve files of the Fintech & Payments sector track for Moroccan business lawyers. The ecosystem is regulated by Bank Al-Maghrib under Law 103-12, with CMI as the card interconnection infrastructure and acquiring banks signing merchant agreements. Four recurring personas drive demand: a high-volume e-commerce seller, a subscription platform, a marketplace holding seller funds, and a pre-fundraise PSP startup facing investor due diligence. Reading order moves from actor landscape to licensing analysis, data compliance under Law 09-08, AML/KYB duties, merchant contracts, chargebacks, currency controls (IGOC 2024), a full priced case study, the offer ladder, and the license-versus-partner decision tree. Monetization follows three tiers: diagnostic 600–1,200 MAD HT, compliance pack 12,000–28,000 MAD HT, retainer 2,500–3,500 MAD HT monthly. Always verify the current list of licensed payment institutions on bkam.ma before advising.

## AR - ملخص ومصطلحات

| FR | AR |
|----|----|
| Établissement de paiement (EDP) | مؤسسة الأداء |
| Agrément | اعتماد |
| Adhésion marchand | انخراط التاجر |
| Rétrofacturation (chargeback) | الرجوع بالعملية |
| Données de paiement | معطيات الأداء |
| Rapatriement des devises | إرجاع العملات الصعبة |

**Darija :**
- Ila kanti katjme3 flouss dyal talaja f marketplace, khass tsa9si wach nta "établissement de paiement" qbel matbi3 chi haja.
- Lista dyal li 3andhom agrément men Bank Al-Maghrib khassek tcheckih dima 9bel tekhdem m3a PSP.

---
**Sources primaires :** bkam.ma (Bank Al-Maghrib) · cmi.co.ma · sgg.gov.ma (Loi 103-12, Loi 43-05, Loi 09-08) · cndp.ma · oc.gov.ma (IGOC 2024). Dernière vérification : 23/08/2026 — re-vérifier liste PSP agréés sur bkam.ma.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Secteur régulé : valider toujours avec l'autorité (BAM/CNDP) et un confrère spécialisé. QCM pédagogique — aucun certificat.

# 07 — Change, Plateformes et Devises : IGOC 2024 en Pratique

> Skills n°19 Sector Deep Dives — Fintech & Paiements (Maroc)

**Temps de lecture : ~11 min** · **Niveau : spécialisé** · **Prérequis : [01_Paysage](01_Paysage_Fintech_Maroc_Acteurs.md)**

**Liens croisés :** [Niche Office des Changes IGOC 2024](../../../02_Niches_Deep_Dive/09_Office_Changes_Dotation_IGOC2024/00_INDEX.md) · [Numbers Sheet](../../07_Sharp_Legal_Mind/03_Numbers_Sheet.md) · [Glossaire](../../../00_START_HERE/03_Glossaire_12_Concepts_Cles.md)

## Objectifs

- Appliquer les chiffres clés de l'IGOC 2024 à une plateforme qui facture en devises.
- Sécuriser le rapatriement des créances et l'usage des comptes professionnels en devises.
- Éviter les redressements Office des Changes les plus fréquents.

## Prérequis

- Bases de la réglementation des changes (voir la niche dédiée).
- Compréhension du cycle de facturation d'un SaaS/e-commerce.

## TL;DR

L'**Instruction Générale des Opérations de Change 2024** encadre les opérations avec l'étranger. Quatre repères à connaître par cœur pour vos clients plateformes : **rapatriement des créances sur l'étranger sous 30 jours**, possibilité de **comptes professionnels en devises**, **dotation voyage 100.000 MAD/an**, **dotation e-commerce 15.000 MAD/an** pour achats en ligne auprès de non-résidents. Un revenu en devises n'est pas un problème ; le problème est de le laisser dormir offshore ou de payer des fournisseurs sans titres conformes.

## Base légale

| Règle | Base | Source + date vérif |
|-------|------|---------------------|
| Rapatriement des créances sur l'étranger sous 30 jours | IGOC 2024 | oc.gov.ma, vérifié 23/08/2026 |
| Ouverture possible de comptes professionnels en devises | IGOC 2024 | oc.gov.ma, 23/08/2026 |
| Dotation voyage : 100.000 MAD/an | IGOC 2024 | oc.gov.ma, 23/08/2026 |
| Dotation e-commerce : 15.000 MAD/an (achats auprès de non-résidents) | IGOC 2024 | oc.gov.ma, 23/08/2026 |

⚠️ L'IGOC évolue chaque année : re-vérifier systématiquement la version en vigueur sur oc.gov.ma avant tout avis.

## Contenu principal

### Le cycle devise d'une plateforme marocaine

```
[Client étranger paie en EUR/USD]
   -> PSP / passerelle
   -> compte (devises ou MAD selon montage)
   -> obligation: rapatriement sous 30 jours [sauf options IGOC]
   -> tenue de comptabilité + justificatifs (factures, contrats)
```

### Les 5 contrôles systématiques

1. **Rapatriement 30 j** : chaque encaissement étranger est-il rapatrié dans le délai ? Qui suit le calendrier ?
2. **Comptes professionnels en devises** : le client en a-t-il un chez sa banque marocaine pour fluidifier les flux `[conditions bancaires à vérifier]` ?
3. **Justificatifs** : facture, contrat, prestation réelle — la banque et l'Office peuvent demander la contrepartie économique.
4. **Dotations** : voyage 100.000 MAD/an et e-commerce 15.000 MAD/an sont des plafonds d'usage personnel/professionnel — ne pas improviser au-delà `[détails et cumuls à vérifier IGOC]`.
5. **Paiements fournisseurs étrangers** (outils SaaS, pub) : exécutés via les circuits autorisés avec documents à l'appui.

### Articulation avec le reste du module

- Le choix du PSP et le lieu d'encaissement conditionnent le respect du délai de 30 jours (fichiers 01, 05).
- Des revenus devises mal documentés ressortent immédiatement en due diligence investisseur (fichier 08).
- La facturation internationale doit rester cohérente avec les données clients traitées (fichier 03).

## Cas pratique chiffré

Hicham, plateforme d'abonnements SaaS : 40% de ses abonnés paient depuis l'Europe (~montant annuel significatif en EUR). Constats :

- Encaissements EUR restés plusieurs mois sur une solution étrangère → violation du rapatriement 30 jours.
- Aucun titre de dépense documenté pour les outils SaaS payés directement depuis cette poche offshore.
- Remédiation : bascule vers encaissement via partenaire local avec reversement rapide, ouverture d'un compte pro en devises chez sa banque marocaine, procédure interne « flux devises » (suivi 30 j + classement des titres), formation du comptable.
- Facturation : audit change 600–1.200 HT en diagnostic ; mise en place complète incluse dans pack conformité 12.000–28.000 HT selon périmètre ; retainer 2.500–3.500 HT/mois (revue trimestrielle des flux).

## Erreurs coûteuses — Top 5 (DH)

1. ❌ Laisser des revenus en devises sur une plateforme étrangère au-delà de 30 jours : redressement Office des Changes + sanctions financières `[barèmes à vérifier]`.
2. ⚠️ Payer des prestataires étrangers hors circuits autorisés : irrégularité de change cumulée à un risque fiscal.
3. ❌ Utiliser la dotation e-commerce (15.000 MAD/an) comme si elle était illimitée : dépassement constatable facilement.
4. ⚠️ Confondre dotation voyage personnelle (100.000 MAD/an) et flux professionnels : mélange des genres sanctionnable.
5. ❌ Aucun archivage des titres (factures/contrats) : impossibilité de justifier lors d'un contrôle, amende quasi automatique.

## Checklist flux devises plateforme

- [ ] Cartographie des encaissements en devises (qui paie quoi, où atterrit l'argent).
- [ ] Calendrier de suivi du rapatriement 30 j opérationnel.
- [ ] Compte professionnel en devises ouvert `[si pertinent]`.
- [ ] Titres économiques archivés par flux.
- [ ] Dotations voyage/e-commerce utilisées dans les limites IGOC 2024.
- [ ] Revue trimestrielle planifiée (retainer).

## QCM (3 questions)

**Q1.** Délai de rapatriement des créances sur l'étranger selon l'IGOC 2024 :
A. 90 jours · B. 30 jours · C. Aucun délai
> **Réponse : B —** l'IGOC 2024 impose le rapatriement sous 30 jours ; à re-vérifier chaque année car l'instruction est actualisée (oc.gov.ma).

**Q2.** Dotation e-commerce annuelle pour achats auprès de non-résidents :
A. 15.000 MAD · B. 100.000 MAD · C. Illimitée
> **Réponse : A —** 15.000 MAD/an pour l'e-commerce ; 100.000 MAD/an correspond à la dotation voyage — ne pas confondre les deux plafonds.

**Q3.** Votre client SaaS facture des clients européens. Premier conseil :
A. Tout garder sur un wallet étranger · B. Structurer l'encaissement et garantir le rapatriement 30 j, idéalement via un compte pro en devises · C. Arrêter l'international
> **Réponse : B —** vendre en devises est légal si les flux sont rapatriés dans le délai et documentés ; le compte professionnel en devises facilite la gestion `[conditions bancaires à vérifier]`.

## Fiches révision (3 cartes)

- **Carte 1 — Chiffres :** 30 j rapatriement · compte pro devises · 100k/an voyage · 15k/an e-commerce (IGOC 2024).
- **Carte 2 — Discipline :** chaque euro a un titre (facture/contrat) et un délai (30 j) ; pas de poche offshore.
- **Carte 3 — Offre :** audit change 600–1.200 HT ; intégration dans pack 12.000–28.000 HT ; revue trimestrielle en retainer 2.500–3.500 HT/mois.

## EN - Key takeaways

Morocco's foreign-exchange framework (IGOC 2024) directly shapes how platforms monetize international customers. Four figures anchor the advice: export receivables must be repatriated within 30 days; professional accounts in foreign currency are available through Moroccan banks to streamline flows; the annual travel allowance is 100,000 MAD; and the annual e-commerce allowance for purchases from non-residents is 15,000 MAD. The classic violations are revenues parked on foreign payment solutions beyond the deadline and supplier payments executed without proper documentation. The lawyer's deliverable is a currency-flow procedure: mapping inbound foreign receipts, tracking the thirty-day clock, opening a professional currency account where appropriate, filing every supporting invoice or contract, and reviewing compliance quarterly. Because the IGOC is updated annually, always confirm the current text on oc.gov.ma before advising, and bundle this audit into the fintech compliance pack.

## AR - ملخص ومصطلحات

| FR | AR |
|----|----|
| Office des Changes | مكتب الصرف |
| IGOC 2024 | التعليمة العامة لعمليات الصرف 2024 |
| Rapatriement des devises | إرجاع العملات الصعبة |
| Compte en devises | حساب بالعملة الصعبة |
| Dotation | العلاوة السنوية |
| Créance sur l'étranger | الذمم المالية على الخارج |

**Darija :**
- Flouss li dakhla men lkharej khasshom yrja3o f 30 yum — matkhelihomch gharbin 3la solution kharijiya.
- Dotation dyal e-commerce 15 alf f 3am, w dyal safariya 100 alf — matkhaltohomch.

---
**Sources primaires :** bkam.ma (Bank Al-Maghrib) · cmi.co.ma · sgg.gov.ma (Loi 103-12, Loi 43-05, Loi 09-08) · cndp.ma · oc.gov.ma (IGOC 2024). Dernière vérification : 23/08/2026 — re-vérifier liste PSP agréés sur bkam.ma.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Secteur régulé : valider toujours avec l'autorité (BAM/CNDP) et un confrère spécialisé. QCM pédagogique — aucun certificat.

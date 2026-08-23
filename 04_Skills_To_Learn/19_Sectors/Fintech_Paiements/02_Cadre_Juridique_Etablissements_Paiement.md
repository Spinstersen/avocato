# 02 — Cadre Juridique des Établissements de Paiement (Loi 103-12)

> Skills n°19 Sector Deep Dives — Fintech & Paiements (Maroc)

**Temps de lecture : ~12 min** · **Niveau : cœur de spécialité** · **Prérequis : [01_Paysage](01_Paysage_Fintech_Maroc_Acteurs.md)**

**Liens croisés :** [Arbre licence vs partenaire](10_Arbre_Decision_Licence_vs_Partenaire.md) · [Glossaire](../../../00_START_HERE/03_Glossaire_12_Concepts_Cles.md) · [LBCFT KYC/KYB](04_LBCFT_KYC_KYB_Obligations.md)

## Objectifs

- Expliquer ce qu'est un établissement de paiement (EDP) au sens de la Loi 103-12.
- Identifier les déclencheurs qui obligent une fintech à solliciter l'agrément BAM.
- Rédiger un avis structuré « agrément requis / non requis » défendable.

## Prérequis

- Cartographie des acteurs (fichier 01).
- Notions de personnalité morale et de capital social.

## TL;DR

La **Loi 103-12** relative aux établissements de crédit et organismes assimilés fait des **établissements de paiement** une catégorie régulée, **agréée et supervisée par Bank Al-Maghrib**. Le critère décisif pour votre client : **détient-il des fonds de tiers pour exécuter des services de paiement ?** Si oui → analyse d'agrément. Si non (pass-through, encaissement direct sur le compte marchand) → partenariat avec un agréé suffit souvent. Liste des EDP agréés : publication BAM `[à vérifier bkam.ma]`.

## Base légale

| Règle | Base | Source + date vérif |
|-------|------|---------------------|
| Les établissements de paiement sont agréés par BAM | Loi 103-12 | sgg.gov.ma + bkam.ma, vérifié 23/08/2026 |
| Exercice d'activité sans agrément = situation illégale exposant à sanctions | Loi 103-12 `[modalités à vérifier]` | sgg.gov.ma, 23/08/2026 |
| Obligations LBCFT applicables aux acteurs de paiement | Loi 43-05 modifiée | anrf.ma, 23/08/2026 |
| Données de paiement traitées sous la Loi 09-08 | Loi 09-08 | cndp.ma, 23/08/2026 |

## Contenu principal

### Ce qui déclenche le régime EDP

| Comportement du modèle | Analyse |
|------------------------|---------|
| Collecter les paiements clients puis reverser aux vendeurs après délai (marketplace escrow) | Détention de fonds de tiers → risque fort de qualification EDP |
| Émettre des instruments de paiement (wallet prépayé, carte) | Activité de paiement typique → agrément requis |
| Exécuter des virements/prélèvements pour compte de tiers | Activité de paiement typique → agrément requis |
| Encaisser directement sur le compte marchand propre (vente de ses produits) | Simple commerçant → pas d'agrément |
| Fournir une interface technique vers un PSP agréé (pass-through) | Prestataire tech → pas d'agrément si aucun fonds détenu |
| Détenir les fonds « quelques jours » avant reversement | La durée ne sauve pas : analyse au cas par cas, prudence |

### Les trois étages de l'analyse

1. **Qualification** : lister précisément les flux. Qui paie, qui reçoit, combien de temps l'argent reste chez le client, à quel titre juridique.
2. **Agrément ou alternative** : soit déposer un dossier d'agrément auprès de BAM (capital, gouvernance, dispositifs internes — exigences détaillées `[à vérifier bkam.ma]`), soit restructurer le modèle pour passer par un EDP agréé ou une banque (voir fichier 10).
3. **Obligations connexes** : dès que le client est dans le périmètre paiement, il hérite de la couche LBCFT (Loi 43-05 modifiée) et de la couche données (Loi 09-08).

### Sanctions et risques en pratique

- Exercer sans agrément une activité réservée : illégalité de fond, nullités possibles dans les contrats, blocage bancaire `[sanctions pécuniaires précises à vérifier sgg.gov.ma]`.
- Risque réputationnel massue lors d'une due diligence investisseur (fichier 08) : la question n°1 de tout DD fintech est « où sont les fonds des utilisateurs, et sous quel statut ? ».

## Cas pratique chiffré

Une marketplace réalise 3M MAD/an de GMV ; elle collecte via son contrat marchand puis reverse aux vendeurs tous les 15 jours. Encaissement moyen détenu simultanément : ~125.000 MAD. Deux options :

- **Option A — statu quo dangereux** : continuer à détenir les fonds de tiers sans statut clair. Risque de requalification + échec DD investisseurs. Coût si ça casse : flux gelés + renégociation forcée en position de faiblesse.
- **Option B — restructuration** : basculer sur un reversement via PSP partenaire agréé (fonds jamais inscrits au bilan de la marketplace), refonte CGU. Mission : diagnostic 1.200 HT + pack conformité 18.000–28.000 HT selon périmètre + retainer 2.500–3.500 HT/mois pendant la transition.

## Erreurs coûteuses — Top 5 (DH)

1. ❌ Qualifier « d'escompte fournisseur » la détention de fonds vendeurs pour esquiver le régime EDP : requalification quasi certaine en audit/DD.
2. ⚠️ Déposer un dossier d'agrément sans business plan crédible ni dispositifs internes LBCFT : refus ou années perdues `[process à vérifier bkam.ma]`.
3. ❌ Signer des CGU affirmant « fonds ségrégués » alors qu'ils dorment sur le compte pro de la société : fausse déclaration = responsabilité pénale potentielle.
4. ⚠️ Oublier que l'analyse EDP conditionne aussi la fiscalité et le change des flux (fichier 07).
5. ❌ Négocier avec un investisseur sans avoir cartographié les flux : décote de valorisation ou deal mort (fichier 08).

## Comparatif : banque vs EDP vs partenaire

| Critère | Banque | EDP agréé | Partenaire d'un agréé |
|---------|--------|-----------|----------------------|
| Agrément | Agrément bancaire complet | Agrément BAM catégorie paiement `[catégories à vérifier]` | Aucun requis |
| Périmètre d'activité | Large (crédit, dépôts…) | Services de paiement | Limité à son métier |
| Barrière d'entrée | Très haute | Haute (capital, gouvernance) | Faible |
| Délai d'accès au marché | Long | Long | Immédiat |
| Adapté à | Banques néo | Projets sérieusement financés | 90% des startups du dossier type |

## Checklist

- [ ] Schéma des flux signé par le client (qui détient quoi, quand).
- [ ] Recherche écrite : activités exercées vs activités de paiement réglementées.
- [ ] Vérification liste agréés BAM à date `[à vérifier bkam.ma]`.
- [ ] Avis motivé « agrément requis / alternative retenue » archivé au dossier.
- [ ] Si alternative : contrat de partenariat avec l'EDP/banque revu (fichiers 05, 10).

## QCM (3 questions)

**Q1.** Quelle loi encadre les établissements de paiement au Maroc ?
A. Loi 31-08 · B. Loi 103-12 · C. Loi 09-08
> **Réponse : B —** la Loi 103-12 relative aux établissements de crédit et organismes assimilés crée et régule les établissements de paiement, agréés par Bank Al-Maghrib.

**Q2.** Une plateforme collecte l'argent des acheteurs et reverse les vendeurs sous 15 jours. Première analyse :
A. C'est du simple e-commerce libre · B. Détention de fonds de tiers → analyser la qualification EDP · C. Il faut juste une TVA spécifique
> **Réponse : B —** la détention même temporaire de fonds de tiers est LE déclencheur ; la durée courte ne sécurise rien. Voir l'arbre du fichier 10 pour choisir entre agrément et partenariat.

**Q3.** Où vérifie-t-on la liste des établissements de paiement agréés ?
A. Sur cmi.co.ma · B. Sur la publication officielle de Bank Al-Maghrib · C. Dans le pitch deck du PSP
> **Réponse : B —** seule la liste publiée par BAM vaut preuve `[à vérifier bkam.ma]` ; ni le site du CMI, ni la communication commerciale d'un prestataire.

## Fiches révision (3 cartes)

- **Carte 1 — Texte :** Loi 103-12 = loi mère ; EDP agréés et supervisés par BAM ; liste publique à re-vérifier.
- **Carte 2 — Déclencheur :** fonds de tiers + services de paiement = régime EDP ; pass-through sans détention = partenariat possible.
- **Carte 3 — Livrable :** avis écrit « qualification → agrément ou alternative → obligations LBCFT/data », base de toute mission fintech facturable 600–28.000 HT.

## EN - Key takeaways

Law 103-12 creates the category of payment institutions in Morocco: entities authorized and supervised by Bank Al-Maghrib to provide payment services such as issuing payment instruments or executing transfers for third parties. The decisive trigger is custody of third-party funds combined with payment execution: a marketplace collecting buyer money and paying sellers later sits dangerously close to the licensing regime, regardless of how short the holding period is. The lawyer's deliverable is a written opinion with three steps: flow mapping, qualification analysis, then choice between applying for a BAM license or restructuring through a licensed partner. Operating without required authorization exposes the company to illegality, blocked banking flows and catastrophic investor due-diligence findings. Always verify current requirements and the official license list on bkam.ma before concluding, since thresholds and process details evolve and public Moroccan guidance remains thin.

## AR - ملخص ومصطلحات

| FR | AR |
|----|----|
| Loi 103-12 | القانون 103.12 |
| Établissement de crédit | مؤسسة ائتمانية |
| Fonds de tiers | أموال الغير |
| Agrément de Bank Al-Maghrib | اعتماد بنك المغرب |
| Supervision | الرقابة |
| Requalification | إعادة التكييف القانوني |

**Darija :**
- Ila katchad flouss dyal nas okhrin o katkhelles men ba3d, khass tsa9si wach khassek agrément men bank al-maghrib.
- Ma tkhlichch "ghir chwiya" dyal lwe9t f hbas flouss — lqanoun makayfereqch bzzaf.

---
**Sources primaires :** bkam.ma (Bank Al-Maghrib) · cmi.co.ma · sgg.gov.ma (Loi 103-12, Loi 43-05, Loi 09-08) · cndp.ma · oc.gov.ma (IGOC 2024). Dernière vérification : 23/08/2026 — re-vérifier liste PSP agréés sur bkam.ma.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Secteur régulé : valider toujours avec l'autorité (BAM/CNDP) et un confrère spécialisé. QCM pédagogique — aucun certificat.

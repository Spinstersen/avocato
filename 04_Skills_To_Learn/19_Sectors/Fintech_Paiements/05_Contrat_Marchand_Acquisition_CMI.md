# 05 — Contrat Marchand et Acquisition : Adhésion CMI en Pratique

> Skills n°19 Sector Deep Dives — Fintech & Paiements (Maroc)

**Temps de lecture : ~11 min** · **Niveau : pratique contractuelle** · **Prérequis : [01_Paysage](01_Paysage_Fintech_Maroc_Acteurs.md)**

**Liens croisés :** [Chargebacks](06_Chargebacks_Litiges_Consommateur.md) · [Glossaire](../../../00_START_HERE/03_Glossaire_12_Concepts_Cles.md) · [Numbers Sheet](../../07_Sharp_Legal_Mind/03_Numbers_Sheet.md)

## Objectifs

- Comprendre l'architecture du contrat marchand (banque acquéreur + interconnexion CMI).
- Identifier les clauses qui coûtent le plus d'argent aux e-commerçants.
- Mener une renégociation structurée pour un client à fort volume.

## Prérequis

- Fichier 01 (qui est acquéreur, qui est infrastructure).
- Bases de négociation contractuelle.

## TL;DR

Pour accepter les cartes au Maroc, le commerçant signe une **adhésion marchand** avec une **banque acquéreur**, l'acceptation circulant via l'interconnexion du **CMI**. Ce contrat est rarement lu par les fondateurs — et pourtant il gouverne les commissions, les délais de reversement, les réserves de garantie, les plafonds d'encaissement, la responsabilité en cas de fraude et la sortie de relation. Une relecture professionnelle se facture seule 600–1.200 HT en diagnostic, et devient un pack complet quand elle s'accompagne de CGV et process chargeback (12.000–28.000 HT selon périmètre).

## Base légale

| Règle | Base | Source + date vérif |
|-------|------|---------------------|
| Adhésion marchand requise pour accepter les cartes | Conventions bancaires / dispositif CMI | cmi.co.ma, vérifié 23/08/2026 |
| Information précontractuelle du consommateur sur paiement et livraison | Loi 31-08 | sgg.gov.ma, 23/08/2026 |
| Conditions tarifaires et plafonds | Libre négociation commerciale `[grilles réelles non publiées]` | cmi.co.ma + banques `[à vérifier]` |

## Contenu principal

### Anatomie du dossier d'acceptation

```
[Commerçant] --contrat d'adhésion marchand--> [Banque acquéreur]
                     |
              interconnexion CMI (autorisation e-paiement)
                     |
        terminal virtuel / TPE -> porteurs de cartes
```

Pièces classiques demandées `[liste indicative, varie par banque]` : RC, statuts, ID gérant, attestation bancaire, justificatif activité/site web, CGV conformes 31-08. Délais d'ouverture variables `[à vérifier auprès des banques]`.

### Les 8 clauses qui font perdre de l'argent

| Clause | Question à poser | Risque si ignorée |
|--------|------------------|-------------------|
| Commission par transaction | % + minimum facturable ? `[taux réels à vérifier banque]` | Coût unitaire supérieur au revenu sur petits paniers |
| Délai de reversement | J+? ou V+? ; jours ouvrés ? | Trou de trésorerie chronique |
| Réserve/rétrocession | Quel % retenu ? Combien de temps ? | Trésorerie bloquée après un litige |
| Plafond mensuel | Cohérent avec le CA prévu ? | Blocage en pleine saison (Salma) |
| Dépôt de garantie | Montant exigé à la signature ? | Cash immobilisé au démarrage |
| Résiliation/préavis | Qui peut sortir, sous quel délai ? | Impossible de changer de partenaire vite |
| Fraude & chargebacks | Frais de contestation ? Responsabilité ? | Coûts invisibles par incident |
| Évolution tarifaire | Révision unilatérale possible ? | Marges rognées sans préavis |

### Méthode de renégociation (client volume)

1. **Extraire les données** : 12 mois de transactions, ticket moyen, saisonnalité, taux de litiges.
2. **Comparer** : grille actuelle vs offres concurrentes `[demander devis écrits]`.
3. **Argumenter avec le risque** : taux de fraude faible + CGV solides + process chargeback documenté = argument commission.
4. **Sécuriser par écrit** : avenant listant taux, plafonds, délais, conditions de sortie.

## Cas pratique chiffré

Salma, high volume (~3M MAD/an encaissés cartes), découvre lors d'un pic : plafond mensuel atteint, ventes bloquées 6 jours, réserve de 15% appliquée suite à une série de litiges `[pourcentages illustratifs]`.

- Audit du contrat : 2 clauses défavorables identifiées (plafond figé depuis l'ouverture ; réserve sans mécanisme de levée documentée).
- Renégociation menée avec dossier chiffré (volume, litigiosité maîtrisée) : plafond aligné sur CA réel, procédure de levée de réserve sur preuve livraison.
- Facturation : diagnostic 600–1.200 HT ; refonte complète CGV + playbook litiges → pack 14.000–20.000 HT selon périmètre ; retainer 2.500 HT/mois pendant la mise en œuvre.

## Erreurs coûteuses — Top 5 (DH)

1. ❌ Signer l'adhésion sans vérifier le plafond vs business plan : blocage de ventes en haute saison = CA perdu irrécupérable.
2. ⚠️ Ignorer la clause de réserve : des dizaines de milliers de DH immobilisés au pire moment.
3. ❌ Accepter une commission avec minimum facturable élevé sur petits paniers : rentabilité unitaire détruite `[chiffrer avant signature]`.
4. ⚠️ Oublier le préavis de résiliation dans le plan de migration vers un autre PSP : double facturation pendant des mois.
5. ❌ Ne pas aligner CGV (31-08) et pratiques d'encaissement : litiges consommateur perdus d'avance (fichier 06).

## Comparatif : points de vigilance par profil

| Profil | Priorité n°1 | Priorité n°2 |
|--------|--------------|--------------|
| Démarrage (Hicham) | Dépôt de garantie minimal | Pas de minimum facturable écrasant |
| Volume installé (Salma) | Plafonds + reversement | Levée documentée des réserves |
| Marketplace | Rattachement vendeur/flux | Coordination avec KYB (fichier 04) |

## Checklist relecture contrat marchand

- [ ] Taux, minimums, frais annexes listés noir sur blanc.
- [ ] Délai de reversement + calendrier réel testé.
- [ ] Réserve : déclencheurs, montant, levée documentable.
- [ ] Plafond cohérent avec CA projeté (+ marge 30%).
- [ ] Résiliation : préavis, sort des fonds, portabilité historique.
- [ ] CGV site conformes Loi 31-08 (information précontractuelle, livraison).

## QCM (3 questions)

**Q1.** L'adhésion marchand permettant d'accepter les cartes se conclut :
A. Directement avec le CMI · B. Avec une banque acquéreur (interconnexion via CMI) · C. Avec Visa Europe
> **Réponse : B —** le CMI assure l'interconnexion monétique/e-paiement ; le contrat commercial engageant le commerçant est l'adhésion marchand conclue auprès d'une banque acquéreur.

**Q2.** La clause la plus dangereuse pour la trésorerie d'un e-commerçant est généralement :
A. La couleur du logo bancaire · B. La réserve/rétrocession combinée aux plafonds · C. Le nom du fichier PDF
> **Réponse : B —** réserve + plafond bas = argent bloqué et ventes stoppées précisément quand l'activité décolle ; à chiffrer systématiquement avant signature.

**Q3.** Avant renégociation d'un contrat marchand volume, vous préparez :
A. Un email poli · B. Un dossier de 12 mois de données (transactions, litigiosité) et des offres concurrentes écrites · C. Rien
> **Réponse : B —** la banque négocie le RISQUE, pas la sympathy : données de volume et process antifraude documenté sont vos meilleurs arguments.

## Fiches révision (3 cartes)

- **Carte 1 — Architecture :** adhésion marchand (banque acquéreur) + interconnexion CMI = acceptation de cartes au Maroc.
- **Carte 2 — Clauses rouges :** commission/minimun, reversement, réserve, plafond, garantie, résiliation, fraude, révision tarifaire.
- **Carte 3 — Offre :** relecture seule 600–1.200 HT ; pack CGV + playbook litiges 12.000–28.000 HT ; retainer 2.500–3.500 HT/mois.

## EN - Key takeaways

Card acceptance in Morocco is governed by a merchant agreement signed with an acquiring bank, with transactions flowing through the CMI interconnection. Founders routinely sign it unread; the lawyer's value is decoding eight money-draining clauses: per-transaction fees and minimums, settlement delays, rolling reserves, monthly caps inconsistent with projected revenue, security deposits, termination notice, fraud and dispute fees, and unilateral repricing. For established merchants like a three-million-dirham seller, renegotiation is data-driven: twelve months of transaction history, low dispute rates and documented anti-fraud processes justify better rates, higher caps and evidence-based reserve release procedures. Aligning terms and conditions with consumer Law 31-08 prevents losing disputes before they start. This review sells as a standalone diagnostic or inside a compliance pack, followed by a modest retainer for monitoring caps, reserves and renewal dates.

## AR - ملخص ومصطلحات

| FR | AR |
|----|----|
| Adhésion marchand | انخراط التاجر |
| Banque acquéreur | البنك المستحوذ |
| Reversement | التسديد للبائع |
| Réserve de garantie | احتياطي الضمان |
| Plafond d'encaissement | سقف التحصيل |
| Préavis de résiliation | مهلة الإنهاء |

**Darija :**
- Qbel tsini l'adhésion marchand, qra mzyan: plafond, réserve, délais dyal reversement — hado li kayblokiw flouss.
- Ila kanti katbi3 bzzaf, jme3 data dyal 3am kamla o tafawad: lbanka katsmi3 li 3ando raqm o risk mtkhffif.

---
**Sources primaires :** bkam.ma (Bank Al-Maghrib) · cmi.co.ma · sgg.gov.ma (Loi 103-12, Loi 43-05, Loi 09-08) · cndp.ma · oc.gov.ma (IGOC 2024). Dernière vérification : 23/08/2026 — re-vérifier liste PSP agréés sur bkam.ma.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Secteur régulé : valider toujours avec l'autorité (BAM/CNDP) et un confrère spécialisé. QCM pédagogique — aucun certificat.

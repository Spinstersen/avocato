# 06 — Chargebacks et Litiges Consommateur : Workflow de Défense

> Skills n°19 Sector Deep Dives — Fintech & Paiements (Maroc)

**Temps de lecture : ~11 min** · **Niveau : opérationnel** · **Prérequis : [05_Contrat marchand](05_Contrat_Marchand_Acquisition_CMI.md)**

**Liens croisés :** [Jurisprudence Loi 31-08](../../../08_Jurisprudence/02_Loi_31-08/00_INDEX.md) · [Contrat marchand CMI](05_Contrat_Marchand_Acquisition_CMI.md) · [Glossaire](../../../00_START_HERE/03_Glossaire_12_Concepts_Cles.md)

## Objectifs

- Expliquer le mécanisme de rétrofacturation et ses délais qualitatifs.
- Construire un kit de représentation documentaire par motif de litige.
- Aligner la défense chargeback avec les obligations de la Loi 31-08.

## Prérequis

- Fichier 05 (rôle de l'acquéreur, circulation des fonds).
- Bases du droit marocain de la consommation.

## TL;DR

Un **chargeback** permet au porteur de contester un débit auprès de sa banque émettrice ; le commerçant se défend par une **représentation documentaire** transmise via l'acquéreur. Les **délais et formats varient selon le schéma carte et le motif** — ne jamais citer de chiffre universel `[règles des réseaux, à vérifier]`. La défense se gagne en amont : CGV conformes 31-08 avec preuve d'acceptation horodatée, preuve de livraison archivée, réconciliation mensuelle. Un playbook écrit divise durablement les pertes et se facture.

## Base légale

| Règle | Base | Source + date vérif |
|-------|------|---------------------|
| Information précontractuelle (prix, paiement, livraison) | Loi 31-08 | sgg.gov.ma, vérifié 23/08/2026 |
| Livraison conforme | Loi 31-08 | sgg.gov.ma, 23/08/2026 |
| Fenêtres et règles de contestation | Schémas cartes / conventions acquéreur `[à vérifier réseau par réseau]` | cmi.co.ma + banques, 23/08/2026 |
| Preuves = données personnelles | Loi 09-08 | cndp.ma, 23/08/2026 |

## Contenu principal

### Le cycle d'un chargeback

```
1. Acheteur conteste auprès de sa banque émettrice
2. Émetteur -> schéma carte -> acquéreur du marchand
3. Acquéreur notifie le marchand (fenêtre VARIABLE selon réseau/motif)
4. Marchand produit son dossier de représentation documentaire
5a. Acceptée -> fonds recrédités au marchand
5b. Refusée -> étape d'arbitrage possible, coûteuse [selon règles réseau]
```

⚠️ Règle opérationnelle : traiter toute notification comme urgente sous 48 h ouvrées et vérifier la deadline exacte auprès de l'acquéreur à chaque dossier `[selon convention]`.

### Matrice des preuves par motif

| Motif client | Ce que l'acquéreur veut voir | Source chez le marchand |
|--------------|------------------------------|--------------------------|
| « Je n'ai pas fait cet achat » | Cohérence IP/appareil, historique client, authentification forte si disponible `[dispositif selon intégration]` | Logs plateforme + PSP |
| « Jamais reçu » | Bon de livraison signé, tracking transporteur, correspondances | Transporteur + CRM |
| « Pas conforme » | Photos exactes, fiche article datée, CGV versionnée | Catalogue + archives CGV |
| Abonnement contesté | Opt-in clair, emails de confirmation, historique de facturation | Console abonnements |
| Double débit | Réconciliation paiements, preuve de remboursement éventuel | Back-office comptabilité |

### Prévention : 6 réflexes gagnants

1. CGV conformes 31-08 affichées avant commande (voir [jurisprudence 31-08](../../../08_Jurisprudence/02_Loi_31-08/00_INDEX.md)).
2. Preuve d'acceptation des CGV horodatée et versionnée.
3. Descriptifs produits fidèles, photos réelles.
4. Confirmation de commande automatique.
5. Tracking de livraison systématique et archivé.
6. Réconciliation mensuelle paiements/commandes ; suivi du taux de litiges — un ratio dégradé déclenche réserves et plafonds côté acquéreur (fichier 05).

## Cas pratique chiffré

Salma, high volume (~3M MAD/an), litiges concentrés sur les ventes cross-border :

- Diagnostic : CGV non versionnées, livraisons internationales sans signature, notifications traitées « quand on peut ».
- Plan 4 semaines : playbook par motif, dossiers types (fraude/non-reçu/non-conforme), alerte J+0 sur notification, archivage automatique des preuves, reporting mensuel des indicateurs.
- Effets attendus : meilleure conversion des représentations, relation acquéreur stabilisée, levée plus rapide des réserves.
- Facturation : playbook + formation 8.000–14.000 HT (inclus dans pack 12.000–28.000 HT selon périmètre) ; retainer 2.500–3.500 HT/mois pour dossiers sensibles et reporting.

## Erreurs coûteuses — Top 5 (DH)

1. ❌ Laisser expirer la fenêtre de réponse : perte sèche totale + frais `[selon conventions]` — cause n°1 de pertes évitables.
2. ⚠️ Preuves génériques non ciblées sur le motif : rejet quasi certain.
3. ❌ CGV jamais archivées : impossible de prouver ce que le client a accepté.
4. ⚠️ Rembourser systématiquement par peur : signal faible pour fraudeurs, pertes cumulées significatives sur volume.
5. ❌ Ventes cross-border sans analyse de droit applicable : double exposition 31-08 + loi étrangère `[correspondant requis]`.

## Checklist workflow chargeback (7 étapes)

- [ ] Notification centralisée, une personne responsable.
- [ ] Qualification du motif sous 48 h ouvrées.
- [ ] Dossier construit depuis la matrice des preuves.
- [ ] Deadline exacte confirmée auprès de l'acquéreur.
- [ ] Envoi complet, daté, traçable.
- [ ] Archivage du résultat + enseignements.
- [ ] Reporting mensuel des indicateurs au client.

## QCM (3 questions)

**Q1.** Le délai pour répondre à un chargeback :
A. Est toujours de 30 jours partout · B. Varie selon réseau, motif et convention acquéreur · C. N'existe pas
> **Réponse : B —** aucun chiffre universel n'est citable `[à vérifier par dossier]` ; règle opérationnelle : agir sous 48 h ouvrées et confirmer la fenêtre exacte auprès de l'acquéreur.

**Q2.** Face au motif « jamais reçu », la preuve reine est :
A. Une capture du site · B. Le bon de livraison/tracking signé rattaché à la commande · C. Le logo du transporteur
> **Réponse : B —** la représentation doit prouver précisément l'élément contesté : livraison effective liée à la transaction litigieuse.

**Q3.** La conformité Loi 31-08 sert en pratique à :
A. Rien côté litiges · B. Gagner en amont : un client correctement informé perd sa contestation · C. Seulement la TVA
> **Réponse : B —** information précontractuelle claire + preuve d'acceptation rendent la contestation fragile ; c'est la première ligne de défense du marchand.

## Fiches révision (3 cartes)

- **Carte 1 — Mécanisme :** émetteur → réseau → acquéreur → marchand ; défense = représentation documentaire ; délais variables `[jamais de chiffre de mémoire]`.
- **Carte 2 — Preuves :** fraude → logs/IP · non-reçu → BL signé · non-conforme → fiche datée · abonnement → opt-in + historique.
- **Carte 3 — Business :** playbook 8.000–14.000 HT ; retainer 2.500–3.500 HT/mois justifié par le reporting mensuel.

## EN - Key takeaways

A chargeback lets the cardholder dispute a debit through the issuing bank; the merchant's only shield is documentary representation filed through its acquirer. Response windows differ by card scheme, reason code and acquiring agreement, so never quote fixed deadlines from memory: treat every notification as urgent within two business days and verify the exact window each time. Defense is won upstream: Law 31-08-compliant terms with timestamped acceptance, faithful product pages, automatic order confirmations, signed proof of delivery, monthly reconciliation, and evidence kits matched to each dispute reason covering fraud, non-receipt, misdescription and subscription complaints. Monitor dispute and recovery rates monthly, since deteriorating ratios trigger reserves and caps from the acquirer. Commercially this becomes a priced playbook plus team training, followed by a retainer for sensitive cases and monthly reporting.

## AR - ملخص ومصطلحات

| FR | AR |
|----|----|
| Chargeback / rétrofacturation | الرجوع بالعملية |
| Représentation documentaire | التمثيل الوثائقي للدفعة |
| Motif de contestation | سبب الاعتراض |
| Bon de livraison | وصل التوصيل |
| Arbitrage | التحكيم البنكي |
| Taux de litiges | نسبة النزاعات |

**Darija :**
- Ma tkhellich deadline dyal chargeback tfout — jaweb f 48 sa3a khedma o jme3 les preuves dyal lmotif b'dabt.
- Archivi dima CGV versionnées w bon de livraison: hado homa li kayrbhou lik llitige.

---
**Sources primaires :** bkam.ma (Bank Al-Maghrib) · cmi.co.ma · sgg.gov.ma (Loi 103-12, Loi 43-05, Loi 09-08) · cndp.ma · oc.gov.ma (IGOC 2024). Dernière vérification : 23/08/2026 — re-vérifier liste PSP agréés sur bkam.ma.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Secteur régulé : valider toujours avec l'autorité (BAM/CNDP) et un confrère spécialisé. QCM pédagogique — aucun certificat.

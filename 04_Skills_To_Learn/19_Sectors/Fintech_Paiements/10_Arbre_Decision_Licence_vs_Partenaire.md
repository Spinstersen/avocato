# 10 — Arbre de Décision : Licence EDP vs Partenaire Agréé

> Skills n°19 Sector Deep Dives — Fintech & Paiements (Maroc)

**Temps de lecture : ~10 min** · **Niveau : structuration** · **Prérequis : [02_Cadre EDP](02_Cadre_Juridique_Etablissements_Paiement.md)**

**Liens croisés :** [LBCFT KYC/KYB](04_LBCFT_KYC_KYB_Obligations.md) · [Glossaire](../../../00_START_HERE/03_Glossaire_12_Concepts_Cles.md) · [Index module](00_INDEX_Fintech.md)

## Objectifs

- Trancher en rendez-vous : agrément d'établissement de paiement ou adossement à un agréé ?
- Documenter la recommandation dans un avis défendable face à un investisseur.

## Prérequis

- Fichier 02 (déclencheurs du régime Loi 103-12).
- Fichier 04 (si fonds détenus, la couche LBCFT suit).

## TL;DR

Trois questions tranchent l'essentiel des dossiers : **(1) Mon client détient-il des fonds de tiers ? (2) Émet-il des instruments de paiement ? (3) Exécute-t-il des paiements pour autrui ?** Un « oui » pousse vers l'agrément BAM (Loi 103-12) — exigeant `[process à vérifier bkam.ma]` — ou vers une restructuration pour ne plus rien détenir. Zéro détention + pass-through technique = partenariat avec un PSP/banque agréé. La liste des agréés fait foi `[à vérifier bkam.ma]`.

## Base légale

| Règle | Base | Source + date vérif |
|-------|------|---------------------|
| Agrément BAM requis pour les services de paiement | Loi 103-12 | sgg.gov.ma + bkam.ma, vérifié 23/08/2026 |
| Liste publique des agréés = référence de contrôle | Publication BAM | bkam.ma, vérifié 23/08/2026 |
| Vigilance LBCFT dès manipulation de fonds | Loi 43-05 modifiée | anrf.ma, 23/08/2026 |

## Contenu principal

### L'arbre de décision

```
Q1. Détient-il des fonds de tiers ?
|
+-- NON --> Q2. Émet-il des instruments de paiement (wallet, carte) ?
|            |
|            +-- NON --> Q3. Exécute-t-il des paiements pour autrui ?
|            |            +-- NON -> MODE PARTENAIRE (pass-through tech)
|            |            +-- OUI -> Requalifier: activité de paiement
|            |                       -> agrément OU restructuration
|            +-- OUI --> Activité réglementée -> agrément BAM
|                        OU abandon de la fonction émission
|
+-- OUI ---> Quel usage des fonds ?
             |
             +-- Transit sur compte marchand propre
             |   (il vend SES produits) -> pas de régime EDP
             |
             +-- Collecte puis reversement à des TIERS
                 (marketplace, crowdfunding) -> RESTRUCTURER via
                 un PSP/agréé : les fonds ne doivent JAMAIS
                 figurer au bilan du client
                 [ou étudier l'agrément si stratégie long terme]
```

### Table de décision par modèle

| Modèle business | Recommandation structurante |
|-----------------|------------------------------|
| Boutique e-commerce classique | Compte marchand propre ; aucun régime EDP |
| SaaS abonnements (Hicham) | PSP partenaire pour le recurring ; société jamais dépositaire |
| Marketplace (3M MAD/an) | Reversements via PSP agréé, fonds hors bilan ; KYB vendeurs (fichier 04) |
| Wallet prépayé | Agrément EDP indispensable `[exigences à vérifier bkam.ma]` |
| BNPL | Analyse hybride crédit/paiement — confrère spécialisé requis `[à vérifier]` |
| Agrégateur technique | Interface vers acquéreur agréé ; statut vérifié sur liste BAM |
| Plateforme crowdfunding | Détention de fonds de tiers quasi certaine → restructuration ou agrément |

### Coût/temps comparés (ordre de grandeur)

| Voie | Barrière | Time-to-market | Quand la choisir |
|------|----------|----------------|------------------|
| Partenariat avec agréé | Faible (contrat + conformité) | Rapide | 90% des startups, pré-levée |
| Création d'un EDP | Très élevée `[capital/gouvernance à vérifier bkam.ma]` | Longue | Stratégie long terme financée |
| Restructuration « zéro détention » | Moyenne (refonte contrats/CGU) | Quelques semaines | Marketplace/SaaS actuels |

## Cas pratique chiffré

Hicham (abonnements SaaS) envisage d'encaisser lui-même puis reverser des commissions à des partenaires affiliés. Analyse : détention de fonds de tiers = déclencheur. Recommandation écrite : conserver un PSP partenaire pour l'encaissement client, payer les affiliés par virements directs depuis le compte pro sur factures — jamais de « pot commun » interne. Mission : avis structurant inclus dans diagnostic 600–1.200 HT ; refonte CGU/CGV et contrat d'affiliation dans pack 12.000–28.000 HT selon périmètre.

## Erreurs coûteuses — Top 5 (DH)

1. ❌ Lancer une marketplace avec « pot commun » interne sans analyse : requalification EDP + DD investisseur fatale.
2. ⚠️ Choisir l'agrément EDP pour paraître sérieux alors qu'une restructuration à quelques milliers de DH suffisait : runway brûlé.
3. ❌ Signer un partenariat avec un « PSP » absent de la liste BAM `[à vérifier bkam.ma]` : flux gelés au premier contrôle.
4. ⚠️ Ne pas documenter l'avis de recommandation : en cas de litige, l'avocat devient lui-même discutable.
5. ❌ Ignorer que même en mode partenaire, la couche LBCFT contractuelle reste à cadrer (fichier 04).

## Checklist de l'avis « licence vs partenaire »

- [ ] Réponses écrites aux questions Q1/Q2/Q3 avec preuves (schéma de flux signé).
- [ ] Statut du prestataire vérifié sur la liste BAM à date `[bkam.ma]`.
- [ ] Option retenue : partenaire / restructuration / dossier d'agrément.
- [ ] Conséquences LBCFT et 09-08 listées pour l'option retenue.
- [ ] Avis daté, archivé, communicable en data room.

## QCM (3 questions)

**Q1.** Une marketplace collecte chez les acheteurs et reverse aux vendeurs. Voie par défaut recommandée :
A. Détenir les fonds sur son compte pro · B. Restructurer via un PSP agréé pour garder les fonds hors bilan · C. Payer en espèces
> **Réponse : B —** la détention de fonds de tiers déclenche le régime Loi 103-12 ; tant que l'agrément n'est pas visé stratégiquement, on restructure via un agréé identifié sur la liste BAM `[à vérifier bkam.ma]`.

**Q2.** Un wallet prépayé rechargeable :
A. Peut opérer librement · B. Nécessite un agrément d'établissement de paiement · C. Est un simple site web
> **Réponse : B —** l'émission d'instruments de paiement est une activité réglementée au titre de la Loi 103-12 ; exigences détaillées `[à vérifier bkam.ma]`.

**Q3.** Le document qui sécurise votre recommandation face aux investisseurs :
A. Un message WhatsApp · B. Un avis écrit daté : qualification + option retenue + conséquences LBCFT/data · C. Un slide
> **Réponse : B —** l'avis écrit archivé protège le client ET l'avocat ; c'est aussi le livrable qui justifie la mission chiffrée.

## Fiches révision (3 cartes)

- **Carte 1 — Les 3 questions :** fonds de tiers ? instruments émis ? paiements pour autrui ? Un oui → régime EDP ou restructuration.
- **Carte 2 — Voie par défaut startup :** partenariat avec agréé vérifié `[liste bkam.ma]`, fonds hors bilan, avis écrit archivé.
- **Carte 3 — Livrable :** arbre rempli + schéma de flux signé = avis défendable vendu 600–28.000 HT selon profondeur.

## EN - Key takeaways

The license-versus-partner decision rests on three questions: does the company hold third-party funds, issue payment instruments, or execute payments for others? Any yes triggers the Law 103-12 regime: either apply for a Bank Al-Maghrib license — demanding and slow, with requirements to verify on bkam.ma — or restructure so the company never holds funds. The default recommendation for most startups is partnering with a licensed institution verified against the official BAM list, keeping user money off the balance sheet: marketplaces settle through a licensed PSP with seller KYB in place; subscription platforms pay affiliates by direct transfer from their professional account rather than an internal pool; prepaid wallets, however, genuinely require licensing. The deliverable is a dated written opinion documenting each question's answer, the chosen route and its AML and data consequences — defensible before investors and billable across the full offer ladder.

## AR - ملخص ومصطلحات

| FR | AR |
|----|----|
| Licence / agrément | رخصة / اعتماد |
| Partenaire agréé | شريك معتمد |
| Pass-through | المرور التقني المباشر |
| Hors bilan | خارج الميزانية |
| Arbre de décision | شجرة القرار |
| Avis juridique écrit | رأي قانوني مكتوب |

**Darija :**
- Ila katjme3 flouss dyal nas okhrin, ila ma 3andekch agrément dir partnership m3a PSP agréé — mat7tajch t7bes flouss f compte dyalek.
- Ktb dima avis mktob o archivi: howa li kay7mek nta o kliantek qbel linvestisseurs.

---
**Sources primaires :** bkam.ma (Bank Al-Maghrib) · cmi.co.ma · sgg.gov.ma (Loi 103-12, Loi 43-05, Loi 09-08) · cndp.ma · oc.gov.ma (IGOC 2024). Dernière vérification : 23/08/2026 — re-vérifier liste PSP agréés sur bkam.ma.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Secteur régulé : valider toujours avec l'autorité (BAM/CNDP) et un confrère spécialisé. QCM pédagogique — aucun certificat.

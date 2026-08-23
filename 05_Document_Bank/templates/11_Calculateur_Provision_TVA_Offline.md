# Calculateur Provision + TVA — 100 % offline

**Usage :** copier ce fichier, remplir la feuille blanche en bas, calculer à la main ou avec une calculatrice. Aucune donnée client ne sort de ce document. Vérifier chaque régime avant facturation : le mauvais régime TVA est l'erreur n°1 des prestataires marocains.

## 1. Formules de base

```
TTC (régime local) = HT × 1,20        [TVA 20 % — CGI art. 98]
TTC (export)       = HT               [TVA 0 % — CGI art. 92 I-1°]
Provision          = TTC × 0,50       [encaissée AVANT tout travail]
Solde              = TTC − Provision
```

Arrondi : provision arrondie au dirham entier, vers le bas si nécessaire.

## 2. Export = TVA 0 % seulement si les 3 conditions (CGI art. 92 I-1°) sont réunies

| # | Condition | Preuve à garder au dossier |
|---|---|---|
| C1 | Client non-résident (personne morale ou physique établie hors Maroc) | Facture au nom de l'entité étrangère, adresse hors Maroc |
| C2 | Service non utilisé ni exploité au Maroc | Description du service + lieu d'exploitation du bénéficiaire |
| C3 | Règlement en devises par virement sur compte bancaire marocain (domiciliation bancaire) | Avis de crédit en devises, jamais de cash |

**Condition additionnelle IGOC :** produit du service rapatrié dans les **30 jours** via la banque (oc.gov.ma, IGOC 2024). Rapatriement tardif ou absent = régularisation, donc TVA 20 % due rétroactivement.

Si UNE SEULE condition manque → régime local 20 %. Pas de «presque export».

## 3. Six exemples travaillés

| Exemple | Pack | Montant HT (DH) | Régime | TVA (DH) | TTC (DH) | Provision 50 % (DH) | Solde (DH) |
|---|---|---|---|---|---|---|---|
| E1 | Starter — client local | 2.900 | Local 20 % | 580 | 3.480 | 1.740 | 1.740 |
| E2 | Starter — client non-résident, C1+C2+C3 réunies | 2.900 | Export 0 % | 0 | 2.900 | 1.450 | 1.450 |
| E3 | Pro — client local | 5.900 | Local 20 % | 1.180 | 7.080 | 3.540 | 3.540 |
| E4 | Pro — «export» raté : SaaS acheté par un non-résident mais utilisé par sa filiale marocaine (C2 absente) | 5.900 | Local 20 % | 1.180 | 7.080 | 3.540 | 3.540 |
| E5 | Scale — export complet, virement domicilié reçu | 12.000 | Export 0 % | 0 | 12.000 | 6.000 | 6.000 |
| E6 | Enterprise — client final local payant en devises depuis l'étranger | 28.000 | Local 20 % | 5.600 | 33.600 | 16.800 | 16.800 |

Lecture des exemples pièges :

- **E4** : le client est non-résident et paie en devises, mais le service est exploité au Maroc → condition C2 tombe, TVA 20 %. L'intitulé «international» d'un contrat ne suffit jamais.
- **E6** : cas classique de la diaspora — le client vit à l'étranger, règle en devises, mais le projet (boutique, audience, équipe) est au Maroc. La devise n'est pas un passe-droit : **client final local facturé en devises = 20 % quand même**, car C2 (et souvent C3 sans domiciliation) échouent.
- **E2 et E5** : seuls régimes où le TTC est plus doux pour le client ET où le rapatriement sous 30 jours doit être tracé.

الخدمة اللي كتنستعمل من خارج المغرب والخلاص بالعملة عبر البنك المغربي؟ غير فهاد الحالة كاين الـ 0%. حتى اللي كيخلص من داخل المغرب، ولو بالدولار = 20%.

## 4. Pièges récurrents

| Piège | Réalité |
|---|---|
| Facturer «HT export» par habitude alors que le contact est une agence marocaine intermédiaire | Le donneur d'ordre local = régime local 20 %, quel que soit le destinataire final. |
| Devises reçues mais non rapatriées dans les 30 jours (IGOC) | Régularisation + pénalités ; le bénéfice du 0 % se perd après coup. |
| Frais répercutés (publicité, licences, déplacements) noyés dans l'honoraires global | Chaque ligne a son propre régime ; isoler les frais refacturés dans l'assiette. |
| Provision calculée sur le HT «pour simplifier» | La provision porte toujours sur le TTC — c'est elle qui sécurise la trésorerie. |
| Cash remis en main propre en devises | Ni C3, ni traçabilité bancaire : régime local + risque change. |

## 5. Feuille blanche à copier

```
=== CALCUL MISSION — [Référence / Client] ===
Date : JJ/MM/AAAA

Montant HT : __________ DH
Régime ? Cocher :
  [ ] Local 20 %  -> TVA = HT × 0,20
  [ ] Export 0 %  -> vérifier C1 : ____  C2 : ____  C3 : ____
                    Rapatriement IGOC sous 30 j prévu le : JJ/MM/AAAA

TVA      : __________ DH
TTC      : HT × 1,20 (local) OU HT (export) = __________ DH
PROVISION: TTC × 0,50 = __________ DH   (arrondie vers le bas)
SOLDE    : TTC − Provision = __________ DH

Pièce à joindre : convention signée + avis de crédit devises (si export)
Prochaine action : encaisser la provision AVANT tout travail.
```

## 6. Contrôle croisé (30 secondes)

Avant d'envoyer la facture, relire : le TTC correspond-il à la formule ? La provision est-elle bien 50 % du TTC ? Si export : les trois conditions ont chacune une preuve nommée dans le dossier ? Une seule réponse «non» → on ne facture pas encore.

## EN - Key takeaways

- Offline calculator: TTC = HT × 1.20; provision = 50% of TTC; export at 0% only if the three cumulative conditions are met (CGI art.92 I-1° + 30-day repatriation, IGOC 2024).
- Pitfall: a local client billed in foreign currency still triggers 20% VAT — export treatment is not about the invoice currency alone.
- Use the blank worksheet before every invoice; if one of the three export conditions has no named proof, do not invoice at 0%.

## AR - ملخص ومصطلحات

| FR | EN | AR |
|----|----|----|
| calculatrice hors ligne | offline calculator | حاسبة دون اتصال |
| TVA 20% | VAT 20% | الضريبة على القيمة المضافة |
| export à 0% | 0% export | تصدير 0% |
| provision 50% | 50% advance | دفعة 50% |
| rapatriement 30 jours | 30-day repatriation | إعادة التحويل 30 يوم |
| pièce justificative | supporting proof | وثيقة إثبات |

**Darija :** TTC = HT × 1.20، والدفعة 50% من TTC. للتصدير ب 0%، خص الظروف الثلاثة: خدمة خارج المغرب + أداء بالعملة + إعادة التحويل خلال 30 يوم — وإلا غرامة.

---
**Sources primaires :** sgg.gov.ma (Loi 28-08, DOC, CGI) · cndp.ma · oc.gov.ma (IGOC 2024). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Mission = diagnostic + convention écrite + provision (art.30/32). Secret professionnel art.36.

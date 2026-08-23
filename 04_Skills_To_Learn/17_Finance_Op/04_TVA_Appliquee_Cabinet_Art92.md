# 04 — TVA Appliquée au Cabinet (CGI art.92)

> **Cockpit opérateur — module 04/13.** Pour un avocat, la TVA se joue sur une seule question : où le service est-il utilisé ? Le piège classique coûte 20 % du montant facturé : croire qu'une facture en devises à un client étranger exonère. Non. La devise n'a rien à voir ; le lieu d'utilisation du service décide tout.

**Liens :** [Index piste](00_INDEX.md) · [Numbers Fiscal](../07_Sharp_Legal_Mind/03a_Numbers_Fiscal.md) · [Devis/Facture/TVA](../12_Finance_Cabinet_OS/00_INDEX.md) · [03c_Change](../07_Sharp_Legal_Mind/03c_Numbers_Change.md)

## Objectifs
1. Appliquer la règle : prestations de services = TVA standard 20 % (CGI art.92-I), sauf export conforme.
2. Maîtriser les 3 conditions cumulatives de l'export de services à 0 %.
3. Construire la matrice TVA des missions types du cabinet (local, diaspora, export réel).
4. Récupérer la TVA sur les charges en restant assujetti (arbitrage avec la franchise).
5. Documenter chaque facture 0 % pour survivre à un contrôle.

## Prérequis
- Facturation structurée (module 01) avec mention du pays d'utilisation prévisible du service.
- Compte en devises ou convention de rapatriement bancaire claire.
- Matrice TVA affichée près de l'outil de facturation.
- Comptable briefé sur le régime retenu (assujetti vs franchise).

## TL;DR
Règle par défaut : 20 %. L'exonération export (0 %) exige TROIS conditions cumulatives — service utilisé hors Maroc + paiement en devises + rapatriement du produit dans les 30 jours (CGI art.92-I-1° + IGOC 2024). Une seule manque → 20 % due. Client final local payant depuis l'étranger en devises ? Service utilisé au Maroc → 20 %. Être assujetti coûte peu et permet de déduire la TVA sur loyer, SaaS et débours éligibles.

## Base légale

| Règle | Base | Source + date |
|---|---|---|
| Prestations de services : taux standard 20 % | CGI art.92-I | sgg.gov.ma |
| Export de services 0 % : 3 conditions cumulatives | CGI art.92-I-1° + IGOC 2024 | sgg.gov.ma / oc.gov.ma |
| Rapatriement du produit des services exportés sous 30 jours | IGOC 2024 | oc.gov.ma |
| Droit à déduction sur charges nécessaires à l'exploitation | CGI art.101 et sq. | sgg.gov.ma |
| Franchise de base pour petits prestataires (seuil annuel) | CGI art.93 | sgg.gov.ma — [vérifier PLF] |

## Procédure pas-à-pas

### Étape 1 — Construire la matrice TVA du cabinet
| Mission | Lieu d'utilisation | Devise | Rapatriement <30 j | TVA |
|---|---|---|---|---|
| Contrats société marocaine (client Casablanca) | Maroc | DH | — | **20 %** |
| Audit pour groupe français, rapport remis à la filiale marocaine | Maroc | EUR | oui | **20 %** ⚠️ piège n°1 |
| Client final local, payeur basé à Paris | Maroc | EUR | oui | **20 %** ⚠️ piège n°2 |
| Conseil réglementaire pour opérateur actif uniquement hors Maroc | Hors Maroc | USD/EUR | oui | **0 %** ✅ |
| Même mission mais rapatriement à J+45 | Hors Maroc | EUR | non | **20 %** ⚠️ piège n°3 |

### Étape 2 — Les 3 preuves à archiver par facture 0 %
1. Contrat/cahier des charges précisant le lieu d'utilisation hors Maroc.
2. Avis de débit SWIFT en devises (paiement effectif).
3. Attestation bancaire de rapatriement datée ≤30 jours après facturation.
Dossier par facture, nommé `AAAA-MM-client-TVA0.pdf`. Sans ces trois pièces, la 0 % ne tient pas devant l'administration.

### Étape 3 — Régime : assujetti vs franchise
Assujetti : vous reversez la TVA collectée MAIS déduisez celle de vos charges (loyer 2.500, SaaS 800/mois → récupérable ≈660 HT de TVA/mois sur ces seuls postes [taux 20 %]). Franchise (seuil annuel [vérifier CGI art.93]) : ni collecte ni déduction. Arbitrage simple : charges lourdes → assujetti souvent gagnant ; décision comptable.

### Étape 4 — Déclarer et payer
TVA exigible à l'encaissement sur les services ; dépôt de la déclaration selon votre régime (mensuel ou trimestriel selon CA [vérifier]). Discipline module 02 : chaque encaissement TVA mis de côté immédiatement (~2.400/mois dans le modèle), jamais mélangé au cash d'exploitation.

### Étape 5 — Régulariser les ratés
Rapatriement >30 jours sur une facture sortie en 0 % : la TVA devient due, régularisation spontanée + intérêts possibles [vérifier sanctions]. Une régularisation volontaire coûte toujours moins cher qu'une rectification.

## Cas pratique chiffré
Salma, niche e-commerce, signe trois missions le même mois :
- Refonte CGV marketplace marocaine : 12.000 HT + 2.400 TVA = 14.400 TTC.
- Compliance data pour plateforme opérant exclusivement en Afrique francophone : 10.000 HT en EUR, utilisée hors Maroc, payée en devises, rapatriée J+12 → **0 %**, dossier de preuves complet.
- Coaching juridique à un e-commerçant marocain qui paie depuis son compte Wise français : service consommé au Maroc → **20 %** malgré la devise. Elle avait failli sortir la facture en 0 % : le contrôle aurait coûté 2.000 DH de TVA + pénalités.

## Erreurs Top 5

| # | Erreur | Coût typique |
|---|---|---|
| ❌ | Facturer 0 % parce que « c'est en devises » | Redressement : 20 % du montant + pénalités |
| ❌ | Oublier le rapatriement sous 30 jours | TVA devenue due + intérêts de retard |
| ❌ | Preuves introuvables au contrôle | 0 % requalifiée : integralité de la TVA due |
| ❌ | Rester en franchise alors que charges lourdes | TVA non récupérée : ~7.900/an sur loyer+SaaS dans le modèle |
| ⚠️ | TVA encaissée laissée sur le compte courant | Dépôt sans provision : découvert évitable |

## Checklist 12 points

1. [ ] Matrice TVA affichée et à jour (PLF inclus).
2. [ ] Chaque contrat mentionne le lieu d'utilisation du service.
3. [ ] Question posée systématiquement : « où sera utilisé mon livrable ? »
4. [ ] Dossier de preuve complet par facture 0 % (contrat + SWIFT + rapatriement).
5. [ ] Alerte J+25 sur chaque rapatriement attendu.
6. [ ] TVA collectée mise de côté à chaque encaissement.
7. [ ] Déclarations déposées dans les délais de mon régime.
8. [ ] Choix assujetti/franchise revalidé chaque année avec le comptable.
9. [ ] TVA déductible vérifiée ligne par ligne (loyer, SaaS, débours éligibles).
10. [ ] Mentions obligatoires de facture contrôlées (numéro, ICE client, taux).
11. [ ] Régularisations spontanées documentées.
12. [ ] Historique 6 ans archivé et sauvegardé.

## QCM

**Q1. Client marocain qui paie depuis Londres en GBP pour un audit de sa filiale de Rabat. TVA ?**
A. 0 %, paiement en devises B. 20 %, service utilisé au Maroc C. 10 %

> **Réponse : B —** la devise ne détermine rien ; seul compte le lieu d'utilisation du service. Utilisé au Maroc = 20 %, même scénario diaspora. Les trois conditions cumulatives manquent dès la première.

**Q2. Combien de conditions pour la facturation export 0 % ?**
A. Une (devises) B. Deux (devises + client étranger) C. Trois cumulatives : usage hors Maroc + paiement en devises + rapatriement ≤30 jours

> **Réponse : C —** cumulatives signifie que l'échec d'une seule ramène à 20 %. C'est pourquoi chaque facture 0 % a son dossier de preuves numéroté avant l'envoi, pas après.

**Q3. Pourquoi rester assujetti alors qu'on pourrait viser la franchise ?**
A. Parce que c'est obligatoire pour tous B. Pour déduire la TVA sur charges (loyer, SaaS, débours éligibles) quand elles sont significatives C. Pour payer moins d'IS

> **Réponse : B —** avec ~3.300 HT de charges mensuelles taxables, la récupération ≈660/mois dépasse vite le coût administratif. L'arbitrage dépend du niveau de charges : calcul annuel avec le comptable.

## Fiches révision

**Carte 1 — La question magique**
« Où mon livrable sera-t-il utilisé ? » Maroc → 20 %. Hors Maroc → vérifier les 3 conditions. Jamais la devise, jamais la nationalité du client.

**Carte 2 — 3 conditions = 3 documents**
Usage hors Maroc (contrat) + devises (SWIFT) + rapatriement ≤30 j (banque). Un dossier par facture, prêt avant le contrôle, pas pendant.

**Carte 3 — La TVA n'est pas votre argent**
Encaissée → mise de côté le jour même → reversée au dépôt. Dans le modèle : ~2.400/mois isolés, zéro tentation.

## EN - Key takeaways
VAT for legal services hinges on one question: where is the service used? Standard rate is 20% (CGI art.92-I); the 0% export treatment requires three cumulative conditions — service used outside Morocco, payment in foreign currency, and repatriation of proceeds within 30 days (CGI art.92-I-1° + IGOC 2024). A Moroccan end-client paying from abroad in euros still bears 20%. Every 0% invoice gets its evidence file before sending: contract stating place of use, SWIFT debit notice, bank repatriation attestation. Staying VAT-registered usually beats the small-supplier exemption when fixed costs matter, since input VAT on rent and SaaS (~660/month in the model) becomes recoverable. Collected VAT is set aside at collection time and never treated as operating cash; late repatriations are corrected voluntarily before the administration does it for you.

## AR - ملخص ومصطلحات

| FR | العربية |
|---|---|
| Taxe sur la valeur ajoutée | الضريبة على القيمة المضافة |
| Assujetti | خاضع للضريبة |
| Exonération / export 0 % | إعفاء / تصدير الخدمات بـ 0٪ |
| Paiement en devises | الأداء بالعملة الأجنبية |
| Rapatriement des fonds | إرجاع الأموال إلى المغرب |
| Déduction de TVA | خصم الضريبة |

**Darija :**
- « Feen ghadi ysta3mel l-service ? » : had so2al wahed kay9tess 90% dyal masail TVA — machi l-devise, machi l-passeport.
- « 3 conditions » : usage kharej l-Maghrib + khalass b devise + rjou3 l-flous f 30 youm. Wahed na9sa ? TVA 20%.

---
**Sources primaires :** sgg.gov.ma (CGI, PLF, Loi 114-13) · cnss.ma · oc.gov.ma (IGOC 2024) · impôts.gouv.fr (convention FR-Maroc) · ompic.ma. Dernière vérification : 23/08/2026 — re-vérifier PLF 01/10 et IGOC 15/07.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Décisions fiscales = comptable agréé obligatoire. Secret professionnel art.36. QCM pédagogique — aucun certificat.

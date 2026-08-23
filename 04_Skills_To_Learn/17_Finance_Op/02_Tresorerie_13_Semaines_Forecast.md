# 02 — Trésorerie Prévisionnelle 13 Semaines

> **Cockpit opérateur — module 02/13.** Le P&L dit si le cabinet est rentable ; le forecast 13 semaines dit s'il survivra au trimestre. C'est le même métier, deux horloges : la rentabilité se juge au mois, la survie à la semaine. Ce module installe un forecast glissant, la discipline de la provision 50 % (art.30) et un buffer de 3 mois de charges fixes.

**Liens :** [Index piste](00_INDEX.md) · [Provision trésorerie (pricing)](../12_Finance_Cabinet_OS/00_INDEX.md) · [Numbers Sheet](../07_Sharp_Legal_Mind/03_Numbers_Sheet.md) · [Change & dotations IGOC](../07_Sharp_Legal_Mind/03c_Numbers_Change.md)

## Objectifs
1. Construire un forecast glissant de 13 semaines (encaissements / décaissements / solde cumulé).
2. Imposer la provision de 50 % à la signature (art.30) comme discipline non négociable.
3. Constituer et protéger un buffer = 3 mois de charges fixes (~21.300 DH dans le modèle).
4. Simuler le scénario -30 % d'activité et connaître son délai de survie.
5. Détecter les trous de cash 6 semaines avant qu'ils n'arrivent.

## Prérequis
- Module 01 terminé (charges fixes connues poste par poste).
- Échéancier réel des factures en cours (client, montant, date prévue d'encaissement).
- Accès banque pro quotidien (relevés importés ou saisis hebdomadairement).
- 20 minutes chaque dimanche.

## TL;DR
Le forecast 13 semaines du cabinet modèle : ouverture 75.000 DH, décaissements ~3.300/semaine en moyenne (fixes + CNSS + TVA), encaissements concentrés sur les semaines de retainers (9.000) et soldes de packs. Résultat du trimestre simulé : +7.500 DH de cash malgré un trimestre de CA plus élevé — parce que le cash arrive avec un mois de retard. Point bas : 71.200 (S8), toujours >buffer 21.300 ✅. Scénario -30 % soutenu : burn ≈7.700/trimestre → ~18 mois avant de percer le buffer, points de décision tous les 6 mois.

## Base légale

| Règle | Base | Source + date |
|---|---|---|
| Provision d'honoraires à la convention (50 % avant démarrage) | Convention d'honoraires — art.30 | Loi 28-08 / pratique barreau |
| Cotisations CNSS : majoration de retard 3 %/mois ; paiement mensuel via DAMANCOM | Code sécurité sociale | cnss.ma |
| TVA exigible sur les services à l'encaissement ; dépôt mensuel | CGI art.92 et sq. | sgg.gov.ma |
| Dotations en devises des résidents (voyage 100.000/an ; e-commerce 15.000/an) | IGOC 2024 | oc.gov.ma |

## Procédure pas-à-pas (20 min chaque dimanche)

### Étape 1 — Poser les décaissements récurrents
| Flux | Rythme | Montant |
|---|---|---|
| Charges fixes (module 01 : 7.100/mois) | Hebdo (~1.650) | 1.650/S |
| CNSS assistant(e) (4.000 brut × 1,2109 ≈ 4.844) | Mensuelle S2/S6/S10 | 4.850 |
| TVA nette à reverser | Mensuelle S4/S8/S12 | 2.400 |
| Total décaissements trimestre | | **43.200** |

### Étape 2 — Planifier les encaissements (avec provision 50 %)
Discipline art.30 : tout mandat ≥2.900 HT démarre avec 50 % encaissé. Solde à livraison. Retainers (3 × 3.000) tombent S1, S5, S9, S13.
| Semaine | Encaissement | Nature |
|---|---|---|
| S1 | +9.000 | 3 retainers |
| S3 | +2.950 | Acompte pack 5.900 |
| S6 | +2.950 | Solde pack 5.900 |
| S10 | +2.900 | Pack création |
| S11 | +5.900 | Pack audit |
| Total trimestre | **+50.700** | vs CA facturé du trimestre ~63.000 (retard normal) |

### Étape 3 — Rouler le solde semaine par semaine
| Semaine | Entrées | Sorties | Trésorerie fin |
|---|---|---|---|
| Ouverture | | | 75.000 |
| S1 | 9.000 | 1.650 | 82.350 |
| S2 | 0 | 6.500 | 75.850 |
| S3 | 2.950 | 1.650 | 77.150 |
| S4 | 0 | 4.050 | **71.200 → S8 ci-dessous = point bas** |
| S5 | 9.000 | 1.650 | 80.450 |
| S6 | 2.950 | 6.500 | 76.900 |
| S7 | 0 | 1.650 | 75.250 |
| S8 | 0 | 4.050 | **71.200 (point bas)** |
| S9 | 9.000 | 1.650 | 78.550 |
| S10 | 2.900 | 6.500 | 74.950 |
| S11 | 5.900 | 1.650 | 79.200 |
| S12 | 0 | 4.050 | 75.150 |
| S13 | 9.000 | 1.650 | **82.500** |

Lecture : CA du trimestre ≈63.000 mais encaissements 50.700 — le cash traîne un mois. Point bas 71.200 > buffer 21.300 ✅.

### Étape 4 — Stress test -30 %
Encaissements ×0,70 = 35.490 ; sorties inchangées 43.200 → burn ≈7.700/trimestre. Depuis ~67.300 fin de trimestre stressé : (67.300 − 21.300) / 7.700 ≈ 6 trimestres ≈ **18 mois** avant de percer le buffer. Points de décision imposés à T+6 et T+12 mois : gel charges, baisse prélèvement gérant, revue pricing.

### Étape 5 — Code couleur créances
Vert : encaissé ou échéance <15 j · Orange : 30 j → relance J+7 · Rouge : 60 j → mise en demeure. Une créance rouge ne repart pas en orange sans accord écrit du client (échéancier signé).

## Cas pratique chiffré
Yassine (freelance ~600k/an) découvre que son vrai problème n'est pas le CA mais le DSO (52 jours). En appliquant la discipline 50 % + code couleur : collecte passe de 88 % à 96 % en un trimestre, point bas remonté de ~18.000 à ~45.000 DH. Il finance enfin son embauche prévue sans découvert. Détail KPI : module 07.

Note change : paiements d'outils à l'étranger depuis comptes perso (SaaS, licences) encadrés par les dotations IGOC 2024 — voyage 100.000/an, e-commerce 15.000/an ; flux professionnels = passer par la société [voir 03c_Numbers_Change].

## Erreurs Top 5

| # | Erreur | Coût typique |
|---|---|---|
| ❌ | Démarrer une mission sans la provision 50 % | Financement du client par vos propres caisses : -3.000 à -14.000 immobilisés |
| ❌ | Payer la CNSS après l'échéance | Majoration 3 %/mois qui court vite : +10 % en un trimestre |
| ❌ | Forecast refait « quand on y pense » | Trous détectés à J-3 au lieu de J-45 : décisions précipitées |
| ❌ | Buffer touché pour une dépense « stratégique » | Protection disparue au premier trimestre creux |
| ⚠️ | Croire le CA du trimestre = cash du trimestre | Écart observé dans le modèle : 63.000 vs 50.700 |

## Checklist 12 points

1. [ ] Forecast 13 semaines ouvert chaque dimanche (20 min).
2. [ ] Solde bancaire réel rapproché du forecast chaque semaine.
3. [ ] Toute nouvelle mission ≥2.900 démarre avec 50 % encaissés (art.30).
4. [ ] Échéancier clients visible : montant, date prévue, statut couleur.
5. [ ] Relances programmées J+7 après échéance (pas « quand on a le temps »).
6. [ ] Mise en demeure automatique à 60 jours.
7. [ ] CNSS payée dans le délai (majoration 3 %/mois sinon).
8. [ ] TVA mise de côté à chaque encaissement (compte séparé idéalement).
9. [ ] Buffer = 3 mois de charges fixes (~21.300), intouchable sauf urgence définie.
10. [ ] Scénario -30 % rejoué chaque trimestre.
11. [ ] Points de décision T+6/T+12 planifiés si le burn stressé persiste.
12. [ ] Aucun engagement de dépense >2.900 sans vérifier le point bas prévisionnel.

## QCM

**Q1. Pourquoi le trimestre affiche-t-il 63.000 de CA mais seulement 50.700 d'encaissements ?**
A. Erreur de saisie B. Le cash arrive avec retard (acomptes, délais client) — c'est structurel C. Il faut arrêter de facturer

> **Réponse : B —** l'écart CA/encaissement est normal et mesurable ; c'est exactement ce que le forecast rend visible. La réponse n'est pas de vendre moins mais d'imposer la provision 50 % et de raccourcir le DSO.

**Q2. Buffer correct pour ce cabinet modèle ?**
A. 1 mois de charges (7.100) B. 3 mois de charges fixes (~21.300) C. Tout le cash disponible

> **Réponse : B —** 3 mois couvre un trimestre creux sans panique ni emprunt. Moins, vous vendez sous pression ; plus (tout le cash), vous stérilisez des fonds qui pourraient financer croissance ou dividendes après validation comptable.

**Q3. Au scénario -30 % soutenu, quand agir ?**
A. Quand le compte est vide B. Points de décision fixés à T+6 et T+12 mois, dès maintenant C. Jamais, ça va revenir seul

> **Réponse : B —** le forecast donne le runway (~18 mois ici). Agir trop tôt casse la croissance inutilement ; attendre la panne fait perdre 80 % des options. Les dates de décision se posent AVANT le besoin.

## Fiches révision

**Carte 1 — Deux horloges**
P&L = rentabilité au mois. Forecast 13 semaines = survie à la semaine. Un fichier chacun ; jamais fusionnés.

**Carte 2 — La chaîne anti-trou**
Provision 50 % (art.30) → relance J+7 → mise en demeure J+60 → buffer 3 mois. Chaque maillon a une date, pas une humeur.

**Carte 3 — Lire le point bas**
Le chiffre qui compte n'est pas le solde final mais le minimum de la colonne : 71.200 ici. Tant que le point bas > buffer, le cabinet respire.

## EN - Key takeaways
Cash and profit live on different clocks: the model quarter bills ~63,000 but collects only 50,700, ending at 82,500 with a low point of 71,200 — still far above the three-month buffer (~21,300). Build the rolling 13-week forecast every Sunday in 20 minutes: recurring outflows first (fixed costs weekly slice, monthly CNSS ≈4,850 with its 3%/month late penalty, VAT), then collections anchored by the 50% upfront rule at signature (art.30). Track receivables with colors: green under 15 days, orange triggers reminder at day 30, red means formal notice at day 60. Run the -30% stress test quarterly: at ≈7,700 burn per quarter the runway is about 18 months, so decision points are scheduled at months 6 and 12 — early enough to keep options, late enough not to panic.

## AR - ملخص ومصطلحات

| FR | العربية |
|---|---|
| Prévision de trésorerie | توقع السيولة النقدية |
| Encaissement | التحصيل |
| Décaissement | الأداء / الصرف |
| Découvert | السحب على المكشوف |
| Réserve de sécurité | الاحتياطي الآمن |
| Créance client | ذمّة الزبون |

**Darija :**
- « L-flous li khass ydkhlo » : ktb kol flous w feen mea3ad dyalo — ila ma ktebtiich, rak ghir katmannel.
- « Tsbiq nosse » (تسبيق نص) = provision 50% : bla tsbiq, ma kayn ta mission. Had l-qanoun f l-cabinet ma kayt3adelch.

---
**Sources primaires :** sgg.gov.ma (CGI, PLF, Loi 114-13) · cnss.ma · oc.gov.ma (IGOC 2024) · impôts.gouv.fr (convention FR-Maroc) · ompic.ma. Dernière vérification : 23/08/2026 — re-vérifier PLF 01/10 et IGOC 15/07.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Décisions fiscales = comptable agréé obligatoire. Secret professionnel art.36. QCM pédagogique — aucun certificat.

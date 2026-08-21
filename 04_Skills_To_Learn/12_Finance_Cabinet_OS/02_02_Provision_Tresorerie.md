# 02 — Provision & Trésorerie : 50% J0 qui évite 60% d'impayés

## Définition
Provision = **avance 50% HT exigée à signature avant tout travail** (Loi 28-08 art.30). Sans provision, impayé 60% → tu travailles 7h pour 0 DH → trésorerie -5900. Avec provision 50%, impayé 4% + trésorerie +1450 J0 → tu finances 0. Règle : **0 provision = 0 mission**, même pour Fatima. Délai mission 7j court à partir de provision + pièces complètes, pas signature.

## Framework complet — 3 piliers + calculateur trésorerie

| Pilier | Règle | Chiffre 2025 | Outil |
|---|---|---|---|
| ** provision 50% art.30** | 50% à signature, solde à livraison J7 | 2900→1450 J0, 5900→2950 J0 | Yousign + Stripe 48h |
| **Trésorerie 30j** | Encaisse 50% avant dépense | Provision 1450×4 deals =5800 → couvre charges 5000 | Notion trésorerie |
| **Recouvrement** | Clause pénale 10% art.264 + réserve propriété art.618 | Impayé 60% → 4% | DOC art.264/618 |

**Calculateur trésorerie solo 30j :**
- Charges fixes : 5000 DH (loyer 2000 + SaaS 500 + dotation 15k/12=1250 + 1250)
- 4 deals 2900 provision 50% =5800 J0 → trésorerie +800 (5800-5000) → sain
- Sans provision 4×2900 impayé 60% =6960 encaissé sur 11 600 → trésorerie +1960 mais 4640 perdus → non viable

## Procédure pas-à-pas chiffrée (15 min par deal)

1. **Devis 3 options (5 min)** : 01_Pricing 3 options + mention "Provision 50% à signature art.30 Loi 28-08, solde à livraison J7, délai 7j après provision + pièces complètes, TVA 20%/0% art.92, clause pénale 10% art.264, réserve propriété art.618".
2. **Yousign J0 (5 min)** : Convention honoraires (`05_Document_Bank/01_Convention_Honoraires`) signée électroniquement → facture provision 1450/2950 HT + TVA → envoie Stripe lien 48h + virement RIB. Mention "Mission démarre à encaissement provision + pièces".
3. **Encaissement J0-J2 (2 min)** : Stripe notif 48h → vérifie compte convertible (glossaire §12) si export art.92 + SWIFT 30j (oc.gov.ma IGOC). Si virement 48-72h (compte devise MRE) → OK. Si pas encaissé J2 → relance auto Brevo "provision en attente → délai décalé".
4. **Démarre J2-J7 (5 min)** : Provision encaissée → lance mission 7j (registre 5 col J1, déclaration J1, politique J3). Si pas encaissée → 0 travail (même si client presse "urgent 45j").
5. **Solde J7 (5 min)** : Livraison → facture solde 1450/2950 HT + TVA → Stripe 48h + clause pénale 10% si >15j + réserve propriété art.618 (modèle reste ta propriété jusqu'à paiement complet).
6. **Trésorerie J30 (5 min)** : Notion "Trésorerie" : encaissé provisions 4×1450=5800 + soldes 3×1450=4350 =10 150 vs charges 5000 → +5 150. Suivi MRR 03_KPI.

## Exemple Maroc 2025 — 4 deals septembre

| Deal | Prix | Provision 50% J0 | Solde J7 | Trésorerie |
|---|---|---|---|---|
| Fatima CGV 2900 | 2900 | 1450 J0 encaissé Stripe 24h → démarre J1 | 1450 J7 encaissé J8 | +2900 |
| Yassine SARL 5900 | 5900 | 2950 J0 virement 48h → démarre J2 | 2950 J7 | +5900 |
| MRE 5900 sans provision | Refusé J0 | 0 → 0 travail | 0 | 0 (évite impayé 5900) |
| Khadija 9900 | 9900 | 4950 J0 | 4950 J14 | +9900 |

Sans provision, MRE 5900 aurait été impayé 60% → -3540.

| Pack provision | Prix |
|---|---|
| **Option 2900** | Pack 2900 provision 1450 J0 + solde 1450 J7 |
| **Option 5900** | Pack 5900 provision 2950 J0 + solde 2950 J7 | Délai 7j après provision + pièces |

## Erreurs Top 3

1. **"Je fais confiance, on paie à livraison"** → impayé 60% → -1740/deal 2900 → corriger : 0 mission sans provision, art.30 = obligation déontologique, pas option.
2. **Provision 30% au lieu de 50%** → trésorerie -20% → corriger : 50% mini (30-50% barreau, prends 50% pour 7j), 30% = 870 vs 1450 → -580 trésorerie.
3. **Délai 7j dès signature sans provision** → client signe mais paie J10 → tu es en retard → corriger : délai 7j après provision + pièces complètes (écrit dans convention).

## Checklist 12 points — Provision Trésorerie (contextuelle)

- [ ] Convention art.30 signée Yousign avant travail
- [ ] Mention provision 50% + délai 7j après provision + pièces
- [ ] Facture provision 1450/2950 HT + TVA 20%/0% art.92 + ICE
- [ ] Stripe 48h + virement 48-72h notifiés J0
- [ ] Provision encaissée vérifiée (Stripe/virement) avant J1
- [ ] 0 travail si pas encaissée (même urgent 45j)
- [ ] Facture solde J7 + clause pénale 10% art.264 + réserve art.618
- [ ] Compte convertible/devise MRE 48-72h (glossaire §12) si export
- [ ] SWIFT 30j IGOC si TVA 0% art.92 (oc.gov.ma)
- [ ] Notion trésorerie J30 : encaissé provisions + soldes vs charges 5000
- [ ] Taux impayé <5% (si >10% → provision 50% non respectée)
- [ ] Interaction 11_01 BATNA : provision = BATNA temps

## Sources
- sgg.gov.ma : Loi 28-08 art.30 provision, DOC art.264 10%, art.618 réserve, art.443 preuve >10k, CGI art.92 TVA 0%, art.144 mentions
- oc.gov.ma IGOC 2024 rapatriement 30j, Bank Al-Maghrib 48-72h
- Yousign, Stripe, Notion
- Glossaire `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §10 (provision 50%), §04 (TVA art.92), §03 (30j IGOC), §11 (DOC), §12 (compte)

## Plan d'action 30 jours
- **S1 J1-7** : Convention Yousign 50% template + Stripe 48h setup, 2 deals provision 50% J0 testés, 0 impayé
- **S2 J8-21** : 4 deals 50% J0 (2×1450+2×2950=8800), trésorerie +3800 vs charges, 0 travail sans provision
- **S3 J22-30** : 100% deals provision 50%, taux impayé 4% vs 60% avant, trésorerie +5 150, template provision v2
- Tracker : Notion "Trésorerie" encaissé J0/J7, habit "0 provision =0 mission"

## Interactions avec autres dossiers
- **01_Pricing** : provision 50% de 2900/5900/9900
- **04_Devis Facture** : facture provision + solde + TVA
- **11_09 Arbre** : Q4 provision = filtre
- **03_KPI MRR** : provision = MRR J0
- **10_Atelier 01** : provision atelier 2900/5900 7j

# 09 — Arbre Prix Mission : 2900, 5900 ou 9900 en 5 secondes

## Définition
Arbre prix mission = **decision tree 4 questions binaires** qui donne prix HT en 5s sans devis 30 min. Sans arbre, tu prices à l'intuition → 2900 pour 12h → 241/h → perte 500/h. Avec arbre, 4 oui =9900, 3 oui=5900, 2 oui=2900. Temps : 5s, pas 30 min.

## Framework complet — Arbre 4 niveaux + 3 prix

```
Q1 Temps >7h ? (7h=5900 seuil) ──OUI (12h 3 boutiques) → va Q2
  └─NON (3h30 registre seul) → 2900
Q2 Ticket >10k ? (300k×3=900k / 68k AE) ──NON (ticket 2900 seul) → 2900
  └─OUI → va Q3
Q3 Risque H (300k pub) ou 3 livrables ? (registre+politique+dépôt) ──NON (1 livrable) → 5900
  └─OUI (3 livrables + pub) → va Q4
Q4 Client groupe/MRE 100k ? (dividende 10% 100k=10k) ──NON→ 5900
  └─OUI → 9900 Premium (3 registres + convention + 30j)
```

**Matrice 2025 :**
| Temps | Ticket | Risque/livrables | Client | Arbre | Prix |
|---|---|---|---|---|---|
| 3h30 | 2900 | 1 livrable, M | Solo 30k | Q1 NON | **2900** |
| 7h | 300k | 2 livrables, H | YouCan 2000 mails | Q1 OUI→Q2 OUI→Q3 NON | **5900** |
| 12h | 900k | 3 livrables, H | 3 boutiques | Q1-4 OUI | **9900** |
| 4h | 2900 | 1 livrable | 1500 budget | Q1 NON mais Q2 NON → 2900 mais BATNA 11_01 refuse 1500 | **REFUSE 1500 → 2900** |

## Procédure pas-à-pas chiffrée (5s / prix)

1. **09h00 Q1 temps 1s** : Estime temps exec+call+facture. Registre seul 3h30 → Q1 NON → **2900 direct 5s** (pas Q2-4). Si 7h+ → Q1 OUI → va Q2.
2. **Q2 ticket 1s** : Ticket évité 300k/68k/4900. Si 2900 seul → Q2 NON → **2900**. Si 300k/68k → Q2 OUI → va Q3.
3. **Q3 risque 1s** : Risque H (300k + publication) ou 3 livrables (registre+politique+dépôt) ? Si 1 livrable → **5900**. Si 3 → va Q4.
4. **Q4 groupe 1s** : Groupe 3 boutiques ou MRE 100k dividende ? Si non → **5900**. Si oui → **9900**.
5. **Vérif TVA + provision 1s** : 2900/5900/9900 HT + TVA 20% Maroc / 0% art.92 + SWIFT 30j + provision 50% art.30 + délai 7j/14j → devis 01.
6. **Log 1 min** : Notion "Arbre Prix" : temps/ticket/risque/client → prix → DH/h (08) → si <700/h → remonte 2900→5900.

## Exemple Maroc 2025 — 4 prix live

| Client | Q1 Temps | Q2 Ticket | Q3 Risque | Q4 Groupe | Prix 5s | DH/h |
|---|---|---|---|---|---|---|
| Fatima YouCan 30k 2000 mails 7h | OUI 7h | OUI 300k | NON 2 livrables | - | **5900** | 842/h |
| Yassine AE 350k 12h 3 sociétés | OUI 12h | OUI 68k | OUI 3 livrables | OUI groupe | **9900** | 825/h |
| Khadija 1 boutique registre 3h30 | NON 3h30 | - | - | - | **2900** | 725-1090/h |
| Yassine contrat 1500 4h | NON 4h → 2900 mais Q2 ticket 2900 → 2900 | **REFUSE 1500** (11_09 BATNA) → 2900 | 725/h vs 375/h |

5s vs 30 min devis à l'intuition.

| Pack arbre | Prix |
|---|---|
| **Option 2900** | Arbre A4 + devis 2900 |
| **Option 5900** | Arbre + devis 5900 7h | Délai 7j après provision 50% |

## Erreurs Top 3

1. **Prix à l'intuition 2900 pour 12h → 241/h → -500/h vs 725/h** → corriger : Q1 temps >7h → 5900 mini, 12h →9900.
2. **Ticket 300k mais prix 2900 → -3000** → corriger : Q2 ticket >10k + Q3 3 livrables → 9900.
3. **Oublier Q4 groupe → 5900 au lieu de 9900 pour 3 boutiques** → -4000 → corriger : Q4 groupe/MRE 100k →9900.

## Checklist 12 points — Arbre Prix Mission (contextuelle)

- [ ] Q1 temps 3h30/7h/12h estimé (Toggl 08)
- [ ] Q2 ticket 2900/300k/68k/900k noté
- [ ] Q3 risque H/M/B + 1/2/3 livrables comptés
- [ ] Q4 groupe 3 boutiques / MRE 100k 10% vérifié
- [ ] Prix 5s 2900/5900/9900 + HT/TVA 20%/0% art.92
- [ ] DH/h >700 vérifié (si <500 → remonte)
- [ ] Provision 50% art.30 + délai 7j/14j + ICE art.144
- [ ] Devis 3 options 01 envoyé Yousign
- [ ] Log arbre Q1-4→prix Notion 5s
- [ ] Interaction 11_01 BATNA 725/h vs 1500
- [ ] Interaction 12_08 rentabilité DH/h
- [ ] Glossaire §09 AE/SARL, §06 300k, §04 TVA

## Sources
- sgg.gov.ma : CGI IS 15%, Loi 09-08 art.52 300k, Loi 114-13 200k, art.30 50%, art.92 TVA, DOC art.264
- Cialdini, Voss, Toggl
- Glossaire `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §09, §06, §04, §10

## Plan d'action 30 jours
- **S1 J1-7** : Arbre A4 imprimé, 3 prix 2900/5900/9900 + Q1-4, test 4 prix 5s (3×OK 1× fix temps 12h)
- **S2 J8-21** : 6 deals prix 5s (2×2900 +3×5900 +1×9900), DH/h 842/h, MRR 28 600, 0 prix 241/h
- **S3 J22-30** : 100% prix 5s, log 10 cas, template arbre v2, réutilisé 11_09
- Tracker : habit "arbre 5s avant devis", Notion "Prix Log" Q1-4

## Interactions avec autres dossiers
- **12_01 Pricing** : arbre = pricing 3 options
- **11_09 Arbre Accepter/Refuser** : même 4Q, Q4 provision
- **12_08 Rentabilité** : Q1 temps → DH/h
- **09_10 Arbre MotClé** : même template 4Q
- **10_09 Arbre Sujet** : même logique

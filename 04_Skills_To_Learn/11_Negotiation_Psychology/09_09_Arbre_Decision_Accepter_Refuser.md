# 09 — Arbre Décision Accepter/Refuser : dire non à 1500 en 5 secondes

## Définition
Arbre Accepter/Refuser = **decision tree 4 questions binaires** qui donne oui/non en 5s sans rumination 3 jours. Sans arbre, tu hésites 1500 vs 2900 → acceptes 1500 par culpabilité → -1400. Avec arbre, 4 oui = accepte, 1 non = refuse BATNA. Temps : 5s, pas 30 min.

## Framework complet — Arbre 4 niveaux

```
Q1 BATNA > offre ? (725/h ×4h=2900 >1500) ──OUI→ REFUSE (BATNA gagne)
  └─NON (offre ≥ BATNA, ex: 2900)
Q2 Budget ≥2900 ? (ZOPA non vide) ──NON→ REFUSE (pas de ZOPA)
  └─OUI
Q3 Ticket ≥2900 ? (risque 300k/68k ou CGV 4900) ──NON→ REFUSE (ticket 500)
  └─OUI
Q4 Provision 50% J0 OK ? (art.30) ──NON→ REFUSE (impayé 60%)
  └─OUI → ACCEPTE 2900/5900 + Yousign 50%
```

**Matrice 2025 :**
| Offre | Q1 BATNA | Q2 Budget | Q3 Ticket | Q4 Provision | Décision | Phrase 10s |
|---|---|---|---|---|---|---|
| 1500 | 2900>1500 OUI | - | - | - | **REFUSE** | "1500 < BATNA 2900, modèle gratuit sinon 2900" |
| 2200 | 2900>2200 OUI | - | - | - | **REFUSE** | "2200 <2900, on fait 2900 sans dépôt ?" |
| 2900 provision OK | NON 2900≥2900 | OUI 2900 | OUI 300k | OUI | **ACCEPTE 2900** | "On signe 2900, provision 1450 J0" |
| 2900 sans provision | NON | OUI | OUI | NON | **REFUSE** | "Sans provision 50% art.30, je ne peux démarrer" |

## Procédure pas-à-pas chiffrée (5s / décision)

1. **09h00 calcule Q1 (2s)** : BATNA 725/h ×4h =2900. Offre 1500 → Q1 OUI (BATNA > offre) → **REFUSE direct**, pas besoin Q2-4. Phrase : "1500 < mon BATNA 2900 SEO, je ne peux. Modèle gratuit ou 2900 quand budget ?" 10s.
2. **Si Q1 NON (offre ≥2900) → Q2 1s** : Budget client ≥2900 ? Si Calendly budget 2000 → Q2 NON → REFUSE. Phrase : "Budget 2000 <2900 plancher, on se rappelle à 2900 ?"
3. **Si Q2 OUI → Q3 1s** : Ticket risque ≥2900 ? Si "définition 09-08" ticket 0 → Q3 NON → REFUSE. Phrase : "Ticket info 0 → modèle gratuit suffit, pas besoin 2900."
4. **Si Q3 OUI → Q4 1s** : Provision 50% J0 OK ? Si "paie à livraison J7" → Q4 NON → REFUSE. Phrase : "Art.30 provision 50% obligatoire J0, 1450 aujourd'hui, sinon je ne peux."
5. **Si Q1-4 NON→OUI→OUI→OUI → ACCEPTE (5s)** : "Parfait, Q1-4 passent, on signe convention Yousign + provision 1450, livraison J7." Yousign 5 min.
6. **Log 5s (1 min)** : Notion "Arbre Décision" : offre / Q1-4 / décision / phrase / temps sauvé (30 min vs 5s).

## Exemple Maroc 2025 — 4 décisions live

| Client | Offre | Arbre 5s | Décision | MRR |
|---|---|---|---|---|
| Yassine 1500 contrat | Q1 OUI 2900>1500 | REFUSE | Modèle gratuit → revient J21 2900 | +2900 J21 |
| Fatima 2900 CGV provision OK | Q1 NON→Q2 OUI→Q3 OUI 300k→Q4 OUI | **ACCEPTE 2900** | 1450 J0 + 1450 J7 | 2900 |
| MRE 5000 dividende sans provision | Q1 NON→Q2 OUI→Q3 OUI 15k→Q4 NON | **REFUSE** jusqu'à provision | "Provision 2950 J0 ou pas de mission" → accepte 5900 avec provision | 5900 |
| Ghost budget 1800 | Q1 OUI 2900>1800 | REFUSE | No deal 5s → temps sauvé 30 min | 0 mais +30 min pour SEO 725/h |

Temps sauvé : 4 décisions ×25 min =100 min/mois.

| Pack arbre | Prix |
|---|---|
| **Option 2900** | Arbre A4 + formation 30 min + Notion template |
| **Option 5900** | + 4 décisions coachées + convention Yousign | Délai 7j après provision 50% |

## Erreurs Top 3

1. **Hésiter 3 jours sur 1500 vs 2900** → rumination → accepte 1500 par lassitude → corriger : arbre 5s binaire, pas émotion.
2. **Accepter 2900 sans provision Q4** → impayé 60% → corriger : Q4 provision 50% art.30 = filtre impayé, jamais oui si Q4 NON.
3. **Refuser sans phrase BATNA** → brûle relation → corriger : phrase "BATNA 2900 + modèle gratuit + reviens quand 2900" → porte ouverte.

## Checklist 12 points — Arbre Accepter/Refuser (contextuelle)

- [ ] Q1 BATNA 725/h calculée (01) vs offre
- [ ] Q2 Budget ≥2900 vérifié (Calendly)
- [ ] Q3 Ticket ≥2900 (300k/68k/4900) vérifié
- [ ] Q4 Provision 50% art.30 OK (Yousign)
- [ ] Décision 5s (pas 30 min) chronométrée
- [ ] Phrase refuse 10s prête par Q (BATNA/ZOPA/ticket/provision)
- [ ] Phrase accepte "Yousign + 1450 J0" prête
- [ ] No deal = modèle gratuit + porte ouverte
- [ ] Log Q1-4 + décision Notion 5s
- [ ] Temps sauvé noté (30 min vs 5s)
- [ ] Interaction 01_BATNA : Q1 = BATNA, Q2 = ZOPA
- [ ] Glossaire §10 provision 50% cité Q4

## Sources
- Fisher/Ury, Voss, Kahneman (biais)
- sgg.gov.ma : art.30 provision 50%, Loi 09-08 art.52, Loi 114-13, CGI IS 15%
- Glossaire `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §10, §06, §09

## Plan d'action 30 jours
- **S1 J1-7** : Arbre A4 imprimé au mur, 4 Q + phrases 10s écrites, test 2 décisions 1500→ refuse 5s
- **S2 J8-21** : 6 décisions live 5s (2 refuse Q1, 2 accepte 2900 Q1-4, 2 refuse Q4), temps 5s vs 30 min avant, 0 hésitation 3 jours
- **S3 J22-30** : 100% décisions 5s, log 10 cas, MRR +2800 (2 refuse 1500 → 2×2900 J21), template arbre v2
- Tracker : habit "arbre 5s avant oui", Notion "Decision Log" Q1-4

## Interactions avec autres dossiers
- **01_BATNA** : Q1 BATNA, Q2 ZOPA = 01
- **09_10 Arbre MotClé** : même 4Q binaire, même template
- **10_09 Arbre Sujet** : même logique
- **12_09 Arbre Prix** : Q3 ticket = prix
- **08_Erreurs** : arbre évite erreur 1 (pas BATNA)

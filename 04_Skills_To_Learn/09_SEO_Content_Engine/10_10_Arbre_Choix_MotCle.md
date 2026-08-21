# 10 — Arbre de Choix Mot-Clé : quel keyword publier mardi ?

## Définition
Arbre de choix mot-clé = decision tree binaire qui élimine 19/20 keywords en 4 questions pour ne publier que le KW à plus fort ticket × plus faible KD. Sans arbre, on publie le KW qui nous plaît (souvent KD 35) → pos 50 à J30. Avec arbre, 1 KW/semaine = pos 12 J30. 4 questions = 5 min.

## Framework complet — Arbre 4 niveaux

```
Q1 KD ≤15 ? ──NON→ écarte (trop dur, pos 50)
  └─OUI
Q2 Volume 20-150 ? ──NON (<20 niche / >150 trop large)→ écarte
  └─OUI
Q3 Intent achat (modèle/prix/sanction/obligatoire) ? ──NON (info pure "c'est quoi")→ file "info" (pas prioritaire)
  └─OUI
Q4 Ticket ≥2900 ? ──NON (ticket 500 DH)→ basse prio
  └─OUI → PUBLIE MARDI 10h (02 + 03 + 04)
```

**Matrice ticket SEO avocat 2025 :**
| Keyword contient | Ticket | Priorité |
|---|---|---|
| sanction 300k / redressement / 09-08 | 12k | P1 |
| CGV / contrat / registre / modèle | 2900-4900 | P1 |
| AE vs SARL / Stripe / OMPIC | 2500-5000 | P2 |
| définition / qu'est-ce que | 0 | P3 (info) |

## Procédure pas-à-pas chiffrée (5 min par KW, 20 min pour choisir 1/5)

1. **Liste 5 KW candidats (2 min)** : Depuis backlog 01 (20 KW). Ex cette semaine : A "avocat Maroc" (KD78), B "registre CNDP modèle Excel" (KD8 Vol42), C "CGV YouCan Maroc" (KD10 Vol52), D "loi 09-08" (KD22), E "contrat freelance Word" (KD6 Vol38).
2. **Q1 KD (1 min)** : Ubersuggest → A KD78 → écarte. D KD22 → écarte. Restent B,C,E.
3. **Q2 Volume (1 min)** : B 42 OK, C 52 OK, E 38 OK → tous passent.
4. **Q3 Intent (1 min)** : B "modèle Excel" = achat 10/10 → oui. C "CGV" = achat 9/10 → oui. E "Word" = achat 10/10 → oui. Tous passent.
5. **Q4 Ticket (1 min)** : B ticket 2900 (registre), C ticket 4900 (CGV), E ticket 2900 (contrat). Gagnant = **C "CGV YouCan Maroc"** (ticket 4900 >2900, KD10 vs KD6 mais ticket compense). Si égalité → plus faible KD gagne (E).
6. **Décision + publish (14 min)** : Choisis C → brief 02 (2500 mots CGV YouCan) → publish mardi 10h → GSC 03 → repurposing 04.

## Exemple Maroc 2025 — Semaine 3, Fatima hésite

| KW | KD | Vol | Intent | Ticket | Arbre | Décision |
|---|---|---|---|---|---|---|
| "registre CNDP modèle" | 8 | 42 | achat | 2900 | Passe Q1-4 | #2 |
| **"CGV YouCan Maroc 09-08"** | **10** | **52** | **achat** | **4900** | **Passe Q1-4, ticket max** | **#1 PUBLIE** |
| "contrat freelance Maroc" | 6 | 38 | achat | 2900 | Passe Q1-4 | #3 |

| Pack arbre | Prix |
|---|---|
| **Option 2900 DH** | Atelier 45 min arbre + template Notion decision tree + backlog 20 KW priorisé |
| **Option 5900 DH** | + 4 articles/mois choisis via arbre + GSC suivi + rapport 06 | Délai 7j après provision 50% |

Yassine applique arbre → publie CGV → pos 11 J30 → 2 leads 4900.

## Erreurs Top 3

1. **Choisir KW volume max (150) mais KD 35** → pos 50 J30 → corriger : KD ≤15 prime sur volume (arbre Q1 avant Q2).
2. **Publier 3 KW/semaine sans arbre** → cannibalisation (07) → corriger : 1 KW/semaine max, arbre élimine 4/5.
3. **Oublier ticket** → publier "AE définition" (0 DH) au lieu de "AE vs SARL sanction" (12k) → corriger : Q4 ticket ≥2900 obligatoire.

## Checklist 12 points — Arbre Choix Mot-Clé (contextuelle)

- [ ] Backlog 20 KW avec KD/Vol/Ticket à jour (01)
- [ ] 5 KW candidats/semaine listés
- [ ] Q1 KD ≤15 vérifié (Ubersuggest screenshot)
- [ ] Q2 Volume 20-150 vérifié
- [ ] Q3 Intent achat (mot modèle/prix/sanction présent)
- [ ] Q4 Ticket ≥2900 vérifié (2900/4900/12k)
- [ ] Gagnant = ticket max puis KD min (départage)
- [ ] Losers archivés "file info P3" (pas supprimés)
- [ ] KW gagnant → brief 02 créé (H1 = KW exact)
- [ ] Publish mardi 10h respecté (calendrier 05)
- [ ] GSC pos J7 notée → si pos >45 arbre Q1 mal appliqué
- [ ] Interaction 09_05 calendrier : arbre alimente S+1

## Sources
- sgg.gov.ma : Loi 09-08 art.52 ticket 12k sanction (justifie prio)
- Ubersuggest/Ahrefs KD, GSC Performance
- Glossaire `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §06 (09-08 ticket 12k), §09 (AE/SARL), §10 (provision 2900/5900)

## Plan d'action 30 jours
- **S1 J1-7** : Arbre imprimé A4 au mur, backlog 20 KW noté, choix S1 via arbre (5 min), article S1 publié
- **S2 J8-21** : Choix S2/S3 via arbre (10 min/sem), log décisions Notion, 1 erreur Q1 corrigée (KD22 écarté)
- **S3 J22-30** : 4 choix via arbre (100% KD≤15), GSC pos moyenne 18 vs 42 avant arbre, retro arbre affiné (seuil ticket 2900 validé)
- Tracker : lundi 9h 5 min "arbre KW", Notion "KW Decision Log" avec Q1-4 cochées

## Interactions avec autres dossiers
- **09_01 LongTail** : arbre filtre backlog long-tail
- **09_05 Calendrier** : 1 KW/semaine via arbre alimente 12 semaines
- **09_06 Métriques** : pos J7 valide arbre (si pos>45 → Q1 échoué)
- **11_Negotiation 09_Arbre Accepter/Refuser** : même logique binaire, même template
- **12_Finance 09_Arbre Prix** : ticket 2900/5900 = Q4

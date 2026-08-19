# 10 — Arbre de choix de la niche pilote

Ce fichier propose un arbre de décision opérationnel pour choisir la **niche pilote** en 5 minutes, à partir du scoring composite et de l'accessibilité réseau. Il complète le scoring théorique par une décision pratique.

## 1. Le principe

Le scoring théorique (`01_Methode_Scoring_Niches.md`) classe les niches par attractivité. Mais la décision pratique tient compte de l'**accessibilité réseau** : avez-vous déjà des contacts dans la niche ?

L'arbre combine scoring et accessibilité pour produire une décision en 5 minutes.

## 2. L'arbre de décision

```
[DÉBUT] — Vous voulez choisir votre niche pilote pour 90 jours
       ↓
1. Avez-vous un réseau EXISTANT dans une niche (≥ 3 contacts réels) ?
   ├── OUI → passez à la question 2
   └── NON → commencez par construire le réseau (3 mois minimum)
       ↓
2. La niche où vous avez un réseau a-t-elle un score ≥ 25/40 ?
   ├── OUI → passez à la question 3
   └── NON → cherchez une autre niche (voir question 1)
       ↓
3. Le volume de prospects dans cette niche est-il ≥ 1 000 au Maroc ?
   ├── OUI → passez à la question 4
   └── NON → cherchez une autre niche (marché trop petit)
       ↓
4. Votre positionnement trilingue tech-savvy est-il différenciant dans la niche ?
   ├── OUI → passez à la question 5
   └── NON → cherchez un angle différenciant
       ↓
5. La niche a-t-elle un ticket moyen ≥ 2 500 DH HT ?
   ├── OUI → ✅ Niche retenue pour 90 jours
   └── NON → cherchez une niche à plus fort ticket (ou envisager de la monétiser par volume)
       ↓
[FIXATION] — Niche pilote retenue pour 90 jours
```

## 3. Le test rapide en 5 minutes

Répondez aux questions suivantes par VRAI ou FAUX :

| Question | VRAI/FAUX |
| :--- | :---: |
| 1. Je connais personnellement 3+ freelances marocains qui facturent à l'étranger | ☐ |
| 2. Je connais personnellement 3+ e-commerçants YouCan ou Shopify au Maroc | ☐ |
| 3. Je connais personnellement 3+ dirigeants de PME tech-savvy | ☐ |
| 4. Je connais personnellement 3+ créateurs de contenu monétisés | ☐ |
| 5. J'ai de la famille MRE ou des contacts MRE cadres | ☐ |
| 6. Je connais personnellement 3+ auto-entrepreneurs en croissance | ☐ |
| 7. Je connais 1+ comptable avec une clientèle dans l'une de ces niches | ☐ |
| 8. Je maîtrise l'anglais juridique | ☐ |

**Lecture :**
- Question 1 VRAI → **Niche 1 (Freelance offshore) fortement recommandée**.
- Question 2 VRAI → **Niche 2 (E-commerce YouCan) fortement recommandée**.
- Question 3 VRAI → **Niche 3 (Conformité 09-08) fortement recommandée**.
- Question 4 VRAI → **Niche 4 (Content creators) fortement recommandée**.
- Question 5 VRAI → **Niche 5 (MRE) fortement recommandée**.
- Question 6 VRAI → **Niche 6 (AE → SARL) fortement recommandée**.
- Question 7 VRAI → Toutes niches ouvertes, le comptable amène les prospects.
- Question 8 FAUX → Travailler l'anglais avant la niche 1 (freelance offshore) ou niche 5 (MRE).

## 4. La matrice de décision rapide

| Question VRAIE | Niche pilote recommandée |
| :--- | :--- |
| Q1 (freelances offshore) | Niche 1 |
| Q2 (e-com YouCan) | Niche 2 |
| Q3 (PME tech) | Niche 3 |
| Q4 (créateurs de contenu) | Niche 4 |
| Q5 (MRE) | Niche 5 |
| Q6 (AE en croissance) | Niche 6 |
| Aucune VRAIE | Construire le réseau d'abord (3 mois) |

Si plusieurs VRAI : choisir en fonction de la **force du réseau** (combien de contacts réels et utilisables).

## 5. Le cas « aucun réseau existant »

Si aucune des 7 premières questions n'est VRAIE :

1. **Construire le réseau** pendant 3 mois :
   - LinkedIn : inviter 100 prospects cibles dans chaque niche.
   - Événements : coworkings, meetups, salons.
   - Ateliers gratuits : organiser un atelier découverte.
2. **Publier du content** sur 2-3 niches candidates.
3. **Évaluer la traction** à 90 jours : où les demandes entrantes arrivent-elles ?
4. **Fixer la niche** à J90 en fonction de la traction observée.

> **Loi de traction.** Quand vous publiez sur plusieurs niches, la niche où les demandes entrantes arrivent le plus vite est la bonne. Le marché décide.

## 6. La règle des 90 jours

Une fois la niche retenue :

```
[DÉBUT NICHE PILOTE — 90 jours]
  ↓
Phase 1 (J1-J30) — Lancement du positionnement
  ↓
Phase 2 (J31-J60) — Production de content (4 articles/mois)
  ↓
Phase 3 (J61-J90) — Évaluation (KPI)
  ↓
Décision à J90 :
  ├── ≥ 3 demandes de contact entrantes → POURSUITE
  ├── 1-2 demandes → 30 jours supplémentaires
  └── 0 demande → PIVOT (changer de niche)
```

## 7. Les KPI d'évaluation à J90

| KPI | Objectif à J90 |
| :--- | :--- |
| Articles publiés | 4+ |
| Posts LinkedIn | 24+ |
| Ateliers gratuits organisés | 1+ |
| Partenaires identifiés | 3+ |
| Demandes de contact entrantes | 3+ |
| Missions signées | 0-1 (les premières arrivent à 90-180 jours) |
| Impressions LinkedIn/mois | 5 000+ |
| Trafic site (visites/mois) | 500+ |

## 8. Le pivot à J90

Si à J90 la niche ne produit pas d'inbound, **pivoter** vers une autre niche. Critères de pivot :

- 0 demande de contact entrante.
- 0 partenaire identifié.
- Aucune traction sur les posts LinkedIn.

Le pivot n'est pas un échec : c'est l'ajustement du marché à l'offre.

## 9. La persistance à J90

Si à J90 la niche produit un peu d'inbound (1-3 demandes, 1 atelier rempli, 2 partenaires identifiés), **persister** 90 jours de plus. L'autorité se construit sur 12-24 mois, pas sur 3 mois.

## 10. Le scénario-type « Yassine » — niche 1 retenue

### Profil

- Avocat trilingue tech-savvy, début de carrière.
- Connaît 5 freelances dev offshore à Casablanca.
- Connaît un comptable qui a 10 clients freelances offshore.

### Décision (J-0)

- Q1 VRAI, Q7 VRAI → Niche 1 (Freelance offshore) fortement recommandée.
- Score 27/40 (attractive).
- Volume 30 000 prospects (élevé).
- Différenciation trilingue tech-savvy pertinente.

→ Niche 1 retenue pour 90 jours.

### Exécution (J1-J90)

- Lancement du site (cf. `01_Strategy/02_Positioning_Trilingual_Tech_Lawyer/10_Plan_30_Jours.md`).
- 4 articles sur le sujet « contrat prestation freelance Maroc ».
- 24 posts LinkedIn sur la niche.
- 1 atelier gratuit en coworking (« Statut freelance offshore : SARL ou AE ? »).
- 5 comptables identifiés, 1 partenaire signé.

### Évaluation (J90)

- 5 demandes de contact entrantes via LinkedIn + site.
- 1 mission signée (Pack Freelance Contrat Offshore 2 900 DH HT).
- 1 partenaire comptable actif.

→ Persistance pour 90 jours de plus.

### J180

- 15 demandes de contact entrantes.
- 3 missions signées.
- 1 abonnement signé.

→ Niche installée, prête pour ajouter la niche 2.

## 11. La matrice de décision pour combiner les niches

Après 6-12 mois sur la niche pilote, ajouter une niche secondaire :

| Niche primaire | Niche secondaire naturelle |
| :--- | :--- |
| 1 (Freelance offshore) | 3 (Conformité 09-08) — freelances qui deviennent PME |
| 2 (E-commerce YouCan) | 6 (AE → SARL) — e-commerçants en croissance |
| 3 (Conformité 09-08) | 5 (MRE) — PME avec investisseurs étrangers |
| 4 (Content creators) | 6 (AE → SARL) — créateurs en croissance |
| 5 (MRE) | 3 (Conformité 09-08) — MRE qui investissent en PME tech |
| 6 (AE → SARL) | 1 (Freelance offshore) — AE qui facturent offshore |

## 12. La règle d'or

> **Une niche à la fois. Pas de dispersion. Le marché retient une chose, pas deux.**

## 13. FAQ

**Q : Puis-je changer de niche avant J90 ?**
R : Déconseillé. Sauf si la niche n'est vraiment pas accessible (0 traction malgré un réseau existant).

**Q : Si j'échoue sur la niche 1, est-ce que la niche 2 sera plus facile ?**
R : Pas nécessairement. L'échec sur la niche 1 est souvent lié à l'exécution (content, présence), pas à la niche. Auditer l'exécution avant de pivoter.

**Q : Puis-je avoir deux niches pilotes en parallèle ?**
R : Non. La dispersion tue le positionnement. Une niche pilote pendant 90 jours, puis décision.

**Q : Comment savoir si ma niche est « trop large » ?**
R : Si vous ne pouvez pas lister les 50 premiers prospects à contacter en 1h, la niche est trop large.

**Q : Comment savoir si ma niche est « trop étroite » ?**
R : Si vous connaissez déjà tous les prospects, le marché est saturé ou trop petit.

---

**Fin du dossier `01_Strategy/03_Unsaturated_Niches_Overview/`.**

**Suite logique :** `01_Strategy/04_Client_Acquisition_System_No_Ads/` — Le système d'acquisition sans publicité.

**Liens utiles :**
- `01_Strategy/01_Rules_Of_The_Game_No_Ads_Morocco/` — Le cadre déontologique.
- `01_Strategy/02_Positioning_Trilingual_Tech_Lawyer/` — Le positionnement.
- `02_Niches_Deep_Dive/` — Les playbooks complets par niche.
- `03_Acquisition_Without_Ads/` — Les canaux concrets d'acquisition.

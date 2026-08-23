# 19 — Sector Deep Dives : Index des Secteurs

> Skills n°19 Sector Deep Dives — Fintech & Paiements (Maroc)

**Temps de lecture : ~6 min** · **Statut track : actif — sprint 1 livré le 23/08/2026**

**Liens croisés :** [Glossaire 12 concepts clés](../../00_START_HERE/03_Glossaire_12_Concepts_Cles.md) · [Numbers Sheet](../07_Sharp_Legal_Mind/03_Numbers_Sheet.md) · [Roadmap d'apprentissage](../00_Learning_Roadmap_2Week_Sprints/)

## Objectifs

Ce dossier regroupe les **secteurs verticaux** du curriculum : pour chaque secteur régulé au Maroc, un module autonome et vendable qui transforme un généraliste en interlocuteur crédible face à un fondateur du secteur. Un module sectoriel se vend : diagnostic, audit de conformité, retainer mensuel.

## Prérequis

- Avoir lu [le glossaire](../../00_START_HERE/03_Glossaire_12_Concepts_Cles.md) (concepts SARL, contrat, responsabilité).
- Maîtriser les bases Loi 09-08 (fichier 03 de la niche data) avant tout module traitant de données.
- Savoir lire une base légale sur sgg.gov.ma et vérifier une liste d'agrément sur bkam.ma.

## TL;DR

Quatre secteurs sont planifiés. Le sprint 1 (23/08/2026) a construit **Fintech & Paiements** : 12 fichiers prêts à monétiser. Les trois suivants arrivent à raison d'**un secteur par sprint**. Ne jamais construire plusieurs secteurs dans la même session : la perte de contexte produit des modules génériques invendables.

## Roadmap des secteurs

| # | Secteur | Statut | Sprint | Angle business principal |
|---|---------|--------|--------|--------------------------|
| 1 | Fintech & Paiements | ✅ construit (23/08/2026, sprint 1) | Sprint 1 | Agréments EDP, contrats marchands, LBCFT, data 09-08, change IGOC |
| 2 | Santé (CNSS + données sensibles 09-08) | 🔜 sprint suivant | Sprint 2 | Cliniques/cabinets : CNSS, données patients, autorisations CNDP |
| 3 | Immobilier / VEFA | 🔜 planifié | Sprint 3 | Promoteurs, VEFA, garanties, séquestre |
| 4 | Éducation / EdTech | 🔜 planifié | Sprint 4 | Écoles privées, plateformes cours, contrats parents, données mineurs |

## La règle « 1 secteur = 1 sprint »

Chaque secteur est construit lors d'un **sprint dédié** (une session de travail unique). Pourquoi cette contrainte :

1. **Risque de perte de contexte** : si on construit tous les secteurs d'affilée, la fenêtre de contexte s'épuise. Résultat mesuré sur ce type de production : les derniers fichiers deviennent génériques, perdent les chiffres vérifiés, les personas et les liens croisés précis. Un module générique ne se vend pas.
2. **Vérification des sources par secteur** : chaque sprint commence par re-vérifier les sources vivantes du secteur (listes d'agréés BAM, seuils IGOC, jurisprudence). Mélanger deux secteurs dilue cette rigueur.
3. **Boucle de feedback** : un module terminé peut être testé commercial (proposition envoyée, objection collectée) avant de construire le suivant. Ce retour affine l'angle du module suivant.

Conséquence pratique : **jamais deux secteurs dans la même session**, même si le temps semble disponible.

## Anatomie d'un module sectoriel (pattern 12 fichiers)

Tout module suit exactement cette structure — c'est le gabarit à respecter pour les sprints suivants :

| Fichier | Rôle |
|---------|------|
| 00_INDEX | Sommaire, personas, ordre de lecture, quand vendre quoi |
| 01 | Paysage du secteur : acteurs, chaîne de valeur, qui paie qui |
| 02 | Cadre juridique central : loi mère, autorité, agréments |
| 03 | Volet données (presque toujours 09-08 dans les secteurs numériques) |
| 04 | Obligations spécifiques du secteur (LBCFT pour la fintech) |
| 05 | Contrat cœur du secteur (marchand/acquisition pour la fintech) |
| 06 | Litiges & contentieux type (chargebacks, consommateur) |
| 07 | Volet change/fiscal si transfrontalier |
| 08 | Cas practice complet chiffré (mission bout-en-bout) |
| 09 | Offre packagée avec tarifs (diagnostic → pack → retainer) |
| 10 | Arbre de décision structurant (licence vs partenariat) |
| 11 | Checklist audit 20 pts + QCM final |

Chaque fichier se termine par **Key takeaways EN** + **table bilingue FR↔AR** (+ darija), et porte le footer sources avec date de vérification.

## Comment demander le prochain sprint

Utilisez ce prompt tel quel :

```
Sprint 2 du track 19 — construis UNIQUEMENT le secteur Santé (CNSS + données sensibles 09-08)
dans 19_Sectors/Sante/. Respecte le pattern 12 fichiers de 00_INDEX.md, le style guide,
la règle des faits vérifiés avec marquage [à vérifier], et mets à jour la roadmap ici.
```

Avant de lancer : relire `PLAN_Next_Skills.md` et cocher que le sprint précédent est bien ✅ dans la roadmap ci-dessus.

## Suivi de progression

| Contrôle | Statut |
|----------|--------|
| Sprint 1 — Fintech & Paiements (12 fichiers + index) | ✅ 23/08/2026 |
| Sprint 2 — Santé | 🔜 à planifier |
| Sprint 3 — Immobilier/VEFA | 🔜 |
| Sprint 4 — Éducation/EdTech | 🔜 |

## Fiches révision (3 cartes)

- **Carte 1 — Rythme :** 1 secteur = 1 sprint. Jamais deux secteurs en une session (perte de contexte = module générique invendable).
- **Carte 2 — Pattern :** 12 fichiers fixes, du paysage acteurs (01) à la checklist audit (11), chaque fichier ≥5.500 caractères, chiffré et daté.
- **Carte 3 — Monétisation :** chaque module débouche sur une offre à 3 niveaux : diagnostic 600–1.200 HT, pack 12.000–28.000 HT, retainer 2.500–3.500 HT/mois.

## EN - Key takeaways

This index governs Track 19 (Sector Deep Dives) of the AVOCATO-V2 vault. Four regulated Moroccan sectors are planned: Fintech & Payments (built, sprint 1, 23/08/2026), Health (next sprint), Real Estate/VEFA, and EdTech. The iron rule is one sector per sprint: building several sectors in a single session exhausts context, producing generic, unsellable modules that lose verified figures, personas and cross-links. Every sector module follows an identical twelve-file anatomy, from actor landscape to a twenty-point audit checklist plus QCM, each file closing with English takeaways, a bilingual FR-AR terminology table and a dated source footer. Before requesting a new sprint, verify the previous status flag, then reuse the ready-made prompt. Each module monetizes through a three-tier offer ladder: diagnostic, compliance pack, monthly retainer.

## AR - ملخص ومصطلحات

| FR | AR |
|----|----|
| Secteur régulé | قطاع خاضع للتنظيم |
| Sprint | سباق عمل |
| Module sectoriel | وحدة قطاعية |
| Checklist d'audit | قائمة مراجعة التدقيق |
| Offre packagée | عرض باقة خدمات |
| Retainer mensuel | أتعاب شهرية متجددة |

**Darija :**
- Kol sekteur f sprint wa7ed, matjma3ch jouj sektourat f session wahda — kaytla3 lmodule khawi.
- Had l'index howa lkhrita: 9ra lih qbel ma tbda ay sekteur jdid.

---
**Sources primaires :** bkam.ma (Bank Al-Maghrib) · cmi.co.ma · sgg.gov.ma (Loi 103-12, Loi 43-05, Loi 09-08) · cndp.ma · oc.gov.ma (IGOC 2024). Dernière vérification : 23/08/2026 — re-vérifier liste PSP agréés sur bkam.ma.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Secteur régulé : valider toujours avec l'autorité (BAM/CNDP) et un confrère spécialisé. QCM pédagogique — aucun certificat.

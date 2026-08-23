# Roadmap Next Steps — Continuer sans perdre la vision

> **Dernière mise à jour : 23/08/2026 - fusion V1+V2 P0-P5, voir 09_PLAN_Fusion_V1_V2_Reprise.md**
> **Objectif :** Tracer ce qui est fait, ce qui reste, et le nouveau volet fiscal pour reprise en 1 fichier. Ouvrez ce fichier à chaque reprise — pas besoin de relire tout l'audit.

---

## 1. Vision (à ne pas perdre)

Avocat d'affaires niché (FR/AR/EN), sans pub, 35-60k DH/mois.
Vault = mémoire externe art.59 Loi 28-08 : chaque chiffre a sa base légale + date vérif sgg.gov.ma / oc.gov.ma / cndp.ma / ompic.ma.
Ordre diagnostic : 01 Résidence 183j → 09 AE/SARL → 02 PE 6m → 07 Convention art.27 → 03 Rapatriement 30j → 04 TVA art.92 → 12 Compte → 10 Provision → 06/05.

---

## 2. Accompli — 21/08/2026 (105 fichiers, push main 692064b)

- **Glossaire central** `00_START_HERE/03_Glossaire_12_Concepts_Cles.md:1` — 12 concepts (§01-§12) avec définition + base légale + procédure + interaction + erreur à 15-30k
- **02_Niches 01-06 dé-copiés (37 fichiers)** : 12_Fiches (12 cases spécifiques), 11_Arbre (arbre niche-spécifique), 08_Zones (5 zones grises + cas chiffré), 09_Jurisprudence (3 décisions pertinentes), 10_Comparatif (tableau Maroc/FR/BE), + 7 SEO (tableau 10 long-tail + calendrier 12 sem)
- **08_Jurisprudence 04-08 remplis (5 fichiers)** : Office/OMPIC/Fiscalité/CNSS/Clause pénale — 4 décisions chacun + grille + phrase diagnostic
- **08_Jurisprudence/00_Index.md:13** corrigé + cartographie transversale
- **04_Skills 09-12 (41 fichiers)** : SEO 11 + Public Speaking 10 + Négociation 10 + Finance 10 — tous passés de 20l à 78-89l
- **07_Sharp_Legal_Mind/03_Numbers_Sheet.md:1** source de vérité 6 colonnes + procédure MAJ 01/10 PLF + 15/07 IGOC
**Contexte Maroc 2025 :** cas d'usage illustratif de la compétence — adapter l'exemple au sujet du fichier (voir fiches pratiques du dossier).
- **webapp/data.js** rebuild 488 docs / 1956 KB

### Volet 12 — Ingénierie fiscale (fait le 21/08/2026, même jour)

- **Dossier 12 complet (13 fichiers)** `02_Niches_Deep_Dive/12_Ingenierie_Fiscale_Internationale_Shell/` — structure pratique → limite → sanction → parade. Juridictions retenues : Dubai/Estonia/US LLC. Pack 12 000 HT.
- **Glossaire étendu 12→15 concepts** : §13 Substance, §14 CRS/BO (nuance Maroc horizon 2028 vérifiée Forum mondial déc. 2025), §15 Prix transfert (seuils 50 MMAD / CbCR 8,136 MMDH vérifiés).
- **Miroir skills** `04_Skills_To_Learn/13_Ingenierie_Fiscale_Avancee/00_INDEX.md` (parcours 12 étapes, zéro duplication).
- **Cross-links** ajoutés dans 08/10/11 vers dossier 12.
- Chiffres vérifiés en ligne : registre BO (Loi 43-05/12-18, décret 2.21.708, amendes 5k-50k/10k-100k), CGI art.213 II + art.214-III LF 2021, CRS Maroc non opérationnel ≤2028.

---

## 2bis. Fusion V1+V2 - TERMINEE le 23/08/2026 (voir 09_PLAN_Fusion_V1_V2_Reprise.md)

- **Port des 178 fichiers V2-only** : tracks skills 14-19 (+Moot, Numbers splits 03a/b/c), dossiers jurisprudence x6 + veille mensuelle, fiches trilingues AR, templates 09-11, Shadow Sprint, curriculum 05-08 (Methode_Curriculum, Glossaire_Trilingue_50, Table_Matieres + atlas Mermaid, FAQ_30).
- **Corrections appliquees partout** : convention France-Maroc du **29 mai 1970** (jamais 1959), provision 50% convenue art.30 (jamais art.32 impose), personas fil rouges coherents (Yassine/Salma/Karim/Hicham/Lena).
- **08_Jurisprudence restructuree** : 8 dossiers canoniques x7 fichiers (dont 06_Source_V1_Corrige) ; flats retires.
- **Appendices dupliques dedupliques** : blocs uniques dans _Annexes.md (03_Acquisition, 02_Niches) ; QCM finaux des tracks conserves.
- **Webapp 3 modes** Base / Curriculum / Cabinet OS avec fix bindContentEvents.
- **Build : 680 docs / data.js ~3,4 MB.**

---

## 3. Reste à faire — Dette tracée (non bloquant, à reprendre sans perte)

| Priorité | Fichiers | État | Action future |
|---|---|---|---|
| P1 Moyen | `02_Niches_Deep_Dive/*/03_Offre_Productisee.md` (6) | Listes prix 2 900/5 900 sans pédagogie Yousign/provision | Enrichir avec procédure convention art.30 + débours OMPIC 1 200 DH/classe |
| P1 Moyen | `02_Niches_Deep_Dive/*.md` racine (7) : `01_Freelancers...md` etc. | Playbooks marketing 7j, pas de fond droit | Conserver ou enrichir si besoin vente |
| P2 Léger | `04_Skills/00_Learning_Roadmap/02_Roadmap_12_Sprints`, `08_Livres/*` | Footers encore génériques courts | Remplacer comme les 18 déjà faits |
| P2 Audit | `05_Document_Bank/templates/*` | Non audités cette fois | Vérifier cohérence provision art.30 / TVA art.92 / registre 09-08 |

Ces dettes ne bloquent pas le nouveau module — à traiter après le volet ingénierie fiscale.

---

## 4. Volet ingénierie fiscale — ✅ TERMINÉ (voir §2 volet 12)

> Décisions tranchées le 21/08/2026 : juridictions **Dubai / Estonia / US LLC** · Pack **12 000 HT** (note substance + KYC + co-traitance) · emplacements confirmés `02_Niches_Deep_Dive/12_...` + miroir `04_Skills_To_Learn/13_...`.
> Les 13 fichiers suivent la structure **pratique → limite légale → sanction → parade légale**. Positionnement : information doctrinale, diagnostic 45 min + comptable agréé + confrère étranger, refus des missions de dissimulation.
> Prochaines améliorations possibles (non bloquant) : ajouter UK LLP/Malte/Espagne si demande récurrente ; enrichir 06 avec un second cas >3M ; suivre l'actualisation CRS Maroc chaque année.

---

## 5. Décisions — ✅ tranchées le 21/08/2026

- [x] Juridictions prioritaires : **Dubai / Estonia / US LLC** (UK LLP/Malte/Espagne hors périmètre, à ajouter si demande)
- [x] Ticket : **Pack 12 000 HT** (note substance + KYC + co-traitance comptable/confrère) ; diagnostic 1 200 HT déductible
- [x] Emplacement confirmé : `02_Niches_Deep_Dive/12_Ingenierie_Fiscale_Internationale_Shell/` + miroir `04_Skills_To_Learn/13_Ingenierie_Fiscale_Avancee/`

---

## 6. Procédure reprise (copier-coller)

1. Ouvrir ce fichier
2. Choisir la prochaine tâche (§3 dettes ou extensions volet 12)
3. Après chaque phase : `node webapp/scripts/build.js` (488→~502 docs)
4. Commit + push : `git add -A && git commit -m "..." && git push origin main` (le cwd EST le repo avocato — pas de robocopy)

---

## 7. Sources à vérifier à chaque diagnostic

sgg.gov.ma (CGI, Loi 5-96, Loi 17-97, Loi 09-08, Loi 114-13, Loi 19-06), oc.gov.ma (IGOC 2024 juillet), cndp.ma (délib 40-22), ompic.ma (1 200 DH/classe), Bofip impôts.gouv.fr (conv. France-Maroc du 29 mai 1970 art.4 (residence)/art.5 (PE)/art.7 (benefices)/art.10-13 (dividendes)/art.27 (elimination)), OCDE BEPS.

> Devoir art.59 Loi 28-08 : information doctrinale, pas consultation. Diagnostic 45 min + comptable agréé obligatoire. Connaître les pratiques = connaître les limites pour ne pas les franchir.

---

## 8. Journal — à compléter à chaque session

| Date | Phase | Fichiers créés/modifiés | Commit | Notes |
|---|---|---|---|---|
| 21/08/2026 | Audit + Fix 105 fichiers | Glossaire + niches + jurisprudence + skills | 692064b | Salade mots-clés traitée |
| 21/08/2026 | Volet 12 complet (Phases 0-4) | Glossaire §13-15 + dossier 12 (13 fichiers) + miroir skills 13 + cross-links 08/10/11 + roadmap | (ce push) | Décisions tranchées : Dubai/Estonia/US LLC, Pack 12k HT. Chiffres vérifiés en ligne (BO, CRS ≤2028, PT 50 MMAD). Robocopy inutile : cwd = repo avocato |
| | Phase 0 prochaine | Ce roadmap | | |
| | | | | |
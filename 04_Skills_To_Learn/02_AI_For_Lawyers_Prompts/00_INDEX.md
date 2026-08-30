# 02 — IA pour Avocats : Dossier Maître (Prompts & Garde-fous)

> **Dossier maître — Skills n°2.** L'IA est un assistant de rédaction, jamais un conseiller juridique. 13 fichiers. Règle permanente : validation humaine 100 %, anonymisation 100 % avant envoi, zéro publication de sortie brute. Le détail des devoirs (secret, responsabilité) est indexé sur `08_Jurisprudence\` et la conformité sur `02_Niches_Deep_Dive\03_Loi_09-08_GDPR_Compliance\`.

## TL;DR

- **Permis (avec relecture) :** résumer un arrêt public, reformuler un article, draft de post LinkedIn, checklist de conformité, structuration de note, extraction de données pour QA.
- **Interdit :** soumettre un dossier client identifié à un LLM grand public, publier une sortie brute, citer un texte de loi sans vérification sur source primaire (sgg.gov.ma, jep.ma), rédiger seul une consultation ou une plaidoirie.
- **La règle des 3 V du vault :** **V**érifier chaque article cité sur source primaire, **V**alider par l'avocat (signature = responsabilité), **V**ocabulaire anonymisé avant tout envoi.
- Coût : 0-40 $/mois d'abonnements ; le vrai coût est le temps de vérification — toujours le budgéter.

## Table des fichiers : quand consulter

| # | Fichier | Quand le consulter |
|---|---------|--------------------|
| 00 | `00_INDEX.md` | Vue d'ensemble, règles 3 V |
| 01 | `01_Fondamentaux_LLM_Risques.md` | Comprendre l'hallucination et why ça touche les juristes |
| 02 | `02_Prompt_Library_30.md` | Les 30 prompts complets copier-coller (fusion de l'ancienne fiche « Prompts Type ») |
| 03 | `03_Anonymisation_Protocole.md` | Avant tout envoi de texte client |
| 04 | `04_Deontologie_Validation.md` | Secret, responsabilité, validation 4 yeux |
| 05 | `05_CNDP_Declaration_Modele.md` | Traiter l'usage IA comme un traitement de données |
| 06 | `06_Cas_Pratiques_Jurisprudence.md` | Cas d'école + Mata v. Avianca (le seul précédent citation sûr) |
| 07 | `07_Comparatif_Claude_ChatGPT_Mistral.md` | Quel modèle pour quelle tâche |
| 08 | `08_Zones_Grises_Secret.md` | Les questions sans réponse claire |
| 09 | `09_Metriques_Hallucination.md` | Mettre en place la QA interne (20 extractions mensuelles) |
| 10 | `10_Arbre_Decision_Usage_IA.md` | IA ou pas IA, quel outil |
| 11 | `11_Fiches_Pratiques_Checklist.md` | Checklists avant envoi / avant publication |
| 12 | `12_Workflows_IA_Par_Type_Mission.md` | Les 5 chaînes de travail bout-en-bout (diagnostic, contrat, veille, note, clôture) |

## Matrice coût / risque par usage

| Usage | Risque d'erreur factuelle | Risque 09-08/déonto | Coût caché (vérification) | Verdict |
|---|---|---|---|---|
| Résumer un arrêt public (texte collé) | Faible-moyen (contresens) | Faible si texte public | 10 min de recoupe source | Oui avec relecture |
| Reformuler un article de blog | Moyen (idées ajoutées) | Faible si anonyme | 5 min | Oui |
| Draft post LinkedIn (notes anonymes) | Moyen | Faible | 10 min + règle 3 V | Oui |
| Checklist conformité (puis vérification humaine) | Moyen | Faible | 15 min | Oui |
| Extraire des clauses d'un contrat anonymisé | Moyen | **Élevé si anonymisation douteuse** | Variable | Prudence  local uniquement |
| Rédiger une clause de contrat pour un client | Élevé | Élevé (acte engagé) | = la rédiger toi-même | Non en direct |
| « Recherche » de jurisprudence marocaine sans sources | **Très élevé (citations inventées)** | Moyen | Intégrale sur sources | Non |
| Consultation signée co-écrite sans relecture | Élevé | Élevé | — | Non |

## Plan d'adoption en 4 semaines (pour toi ou pour un confrère récalcitrant)

| Semaine | Objectif | Fichiers |
|---|---|---|
| S1 | Comprendre le mécanisme et le risque | 01 (+ test d'auto-hallucination fait à deux) |
| S2 | Sécuriser le matériau : protocole d'anonymisation appliqué sur 3 cas réels | 03, 08 |
| S3 | Travail réel : 10 prompts de la bibliothèque sur des tâches permises, tous validés 4 yeux | 02, 04, 11 |
| S4 | Institutionnaliser : registre + journal + premier tableau QA | 05, 09, 11 |

## Glossaire express

| Terme | Définition opérationnelle pour ce dossier |
|---|---|
| LLM / grand modèle de langage | Programme qui prédit le texte suivant, statistiquement — il ne consulte pas de base juridique (fiche 01) |
| Hallucination | Sortie fausse mais plausible (référence, chiffre, citation) produite sans intention de mentir — le modèle n'a pas d'intention |
| Contexte (fenêtre) | Volume de texte que le modèle « voit » d'un coup ; au-delà de la partie fournie, il nage en approximation |
| Prompt | Consigne envoyée au modèle — le format de la fiche 02 (rôle, contexte, tâche, contraintes, source) |
| Garde-fou | Instruction qui borne la sortie (P25 : « ne cite que mon texte, sinon [À VÉRIFIER] ») |
| Fine-tuning / entraînement | Utilisation de tes textes pour modifier le modèle — à refuser via les réglages, sans y voir une garantie de confidentialité |
| Open weights / local | Modèle téléchargeable et exécutable sur ta machine (Ollama) : rien ne sort de chez toi |
| Agent / automatisation IA | Chaîne de tâches en autonomie — hors périmètre de ce dossier à ce stade de maturité |

## Prompts par persona client (démarrage rapide)

- **Yassine (dev offshore)** : P3 (reformuler son contrat), P13 (email pro au client US), P15 (idées de clauses à toi de valider), P20 (FAQ post-mission) — jamais P8 sans anonymisation complète.
- **Fatima (e-commerce)** : P16 (checklist 09-08, bases légales à ajouter), P29 (résumer le texte officiel CNDP collé), P22 (cas d'école atelier) — et la question « ses propres usages IA » devient la mission fiche 05.
- **Toi, le cabinet** : P1 (post LinkedIn), P7 (arrêt public collé), P18 (compte rendu), P25 (garde-fou permanent).

## Les 3 règles du dossier (non négociables)

1. **Aucun identifiant client sans anonymisation** — protocole fiche 03 ; le secret professionnel (ex-art. 21-23 loi 28-08 ; transposition loi 66-23 à surveiller) n'est pas levé par un « prompt privé ».
2. **Aucune référence juridique publiée sans vérification source primaire** — les LLM complètent probabilistement, ils ne consultent pas de base de vérités (fiche 01 ; précédent Mata v. Avianca, fiche 06).
3. **L'usage régulier d'IA sur données clients est un traitement** — registre + information des personnes ; déclaration via cndp.ma si requis (fiche 05).

## À quoi sert ce dossier (et à quoi il ne sert pas)

**Sert à :** produire plus vite la forme (brouillons, structures, vulgarisation) sans jamais prêter sa plume au fond juridique ; documenter un usage défendable devant l'Ordre comme devant un client. **Ne sert pas à :** apprendre le droit marocain par l'IA, automatiser le conseil, ou convaincre qu'un abonnement à 20 $ remplace vingt ans de métier — l'IA fait gagner du temps à celui qui savait déjà quoi écrire.

## Les 10 commandements du dossier (version mur)

1. Aucune donnée client identifiable ne quitte le bureau sans anonymisation vérifiée.
2. Aucune référence légale ne sort du prompt sans avoir été ouverte sur sgg.gov.ma ou jep.ma.
3. Un LLM ne « connaît » pas le droit marocain : il complète.
4. Toute sortie est un brouillon ; le livrable est écrit sous ta plume.
5. Le consentement du client ne purge pas le secret.
6. Pas de « recherche jurisprudentielle » par un générateur de texte.
7. Le garde-fou P25 se colle avant la demande, jamais après l'erreur.
8. L'usage régulier de l'IA est un traitement : registre et journal avant, pas pendant le contrôle.
9. Le temps de vérification est dans le prix de la mission.
10. Mata v. Avianca : c'est l'avocat qui a signé, jamais l'outil.

## Lien avec le reste du vault

- Jurisprudence et Ordre : `08_Jurisprudence\` (dont `01_Loi_09-08_CNDP_Sanctions.md`)
- Conformité 09-08 détaillée : `02_Niches_Deep_Dive\03_Loi_09-08_GDPR_Compliance\`
- Stack des outils (dont l'accès aux modèles) : `01_Legal_Tech_Stack\`
- Production de contenu (où vivent les drafts IA) : `09_SEO_Content_Engine\`

> **Lecture pro :** garde ce dossier ouvert à côté de `01_Fondamentaux_LLM_Risques` : les 30 prompts valent ce que vaut la discipline de vérification qui les entoure. Un prompt sans la règle des 3 V est une facture de rectification en attente.

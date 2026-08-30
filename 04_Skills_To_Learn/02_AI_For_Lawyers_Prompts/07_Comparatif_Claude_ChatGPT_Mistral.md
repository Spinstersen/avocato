# 07 — Comparatif Claude / ChatGPT / Mistral / Local : Quel Modèle pour Quelle Tâche

> **Pas de pseudo-scores, des arbitrages.** Ce comparatif décrit des forces relatives observables (qualité de rédaction française, longueur de contexte, raisonnement, hébergement) sans chiffres d'hallucination inventés. Le critère qui distingue vraiment un cabinet marocain : **où vivent les données** — et Mistral a ici un argument de conformité (hébergeable en France) que les modèles purement US n'offrent pas de la même manière.

## POURQUOI comparer par tâche et pas par « meilleur modèle »

Chaque modèle a été affûté différemment : l'un brille en rédaction longue et ton posé, l'autre en écosystème d'outils, le troisième en français natif et souveraineté, le quatrième en confidentialité totale. Un cabinet n'a pas « un meilleur modèle » : il a une file de tâches, et chaque tâche a un modèle par défaut plus une garde-fou. C'est ce tableau — et l'argent se décide là, pas dans un abonnement unique.

## COMMENT — forces relatives (qualitatif, août 2026, à re-tester toi-même)

| Critère | Claude (Anthropic) | ChatGPT (OpenAI) | Mistral (France) | Local (Ollama : Llama, Qwen, Mistral open weights) |
|---|---|---|---|---|
| Rédaction FR longue, ton sobre | Très fort — souvent cité comme le plus « posé » en rédaction | Fort, parfois trop prompt à enjoliver | Fort, français natif | Variable selon modèle ; les gros modèles locaux s'en approchent |
| Raisonnement / structure juridique | Très fort ; bon sur documents longs | Fort ; écosystème d'outils (recherche web intégrée) | Moyen-fort | Moyen — insuffisant sur le droit marocain pointu |
| Fenêtre de contexte | Grande (centaines de milliers de tokens — à vérifier selon l'offre du jour) | Moyenne-grande selon version | Moyenne | Limitée par ta machine (GPU/RAM) |
| Conformité / hébergement | US (API via UE selon options) | US (selon produits) | **France/UE, API ou self-host** — argument CNDP/09-08 sérieux | **Chez toi : 0 transfert** |
| Accès | Abonnement Pro ≈20 $/mois ; API à la conso | Abonnement ≈20 $/mois ; API à la conso | Offre gratuite + payante selon produits | Gratuit (matériel à part) |
| Risque d'hallucination | Réel partout — qualifié de « modéré » par ses utilisateurs, à tester chez toi | Réel ; « confiance affichée » élevée = vigilance max | Réel ; corpus FR dense = moins d'inventions sur le droit français, prudence sur le droit marocain | Plus élevé sur les petits modèles (à tester) |

Les prix marqués « ≈ » sont des ordres de grandeur août 2026 à vérifier sur les pages officielles ; les fenêtres de contexte et modes d'hébergement évoluent à chaque version — la seule habitude qui protège : re-tester trimestriellement (cf. fiche 09).

## COMMENT — quel modèle pour quelle tâche (la table de décision)

| Tâche | Premier choix | Alternative | Garde-fou obligatoire |
|---|---|---|---|
| Post LinkedIn / article (P1, P3) | Claude (ton sobre) | ChatGPT | P25 + œil 2-3 fiche 04 |
| Structuration de note, SCQA (P14) | Claude | Mistral | Rien d'identifiant dans l'entrée |
| Résumé d'un texte COLLÉ (P7, P29) | ChatGPT ou Claude (indifférent) | Mistral | La source est le texte collé, pas la mémoire du modèle |
| Reformulation FR fine | Mistral (français natif) | Claude | Comparer les deux sur 3 cas, trancher |
| Brainstorm d'angles / carrousel (P2) | ChatGPT (rapidité, recherche intégrée) | — | Sortie = idées, jamais faits |
| Documents très longs (contrat + annexes, anonymisés) | Claude (grande fenêtre) | Local si niveau 3-4 sensible | Protocole fiche 03 intégral |
| Texte client niveau 4 (contentieux, changes pointus) | **Local (Ollama)** | abstention | Le cloud n'a pas ce dossier |
| Usage régulier, conformité assumée (barreau strict) | **Mistral API UE** ou Docuseal-style self-host | n8n + modèle open weights | Registre + journal (fiche 05) |

## COMMENT — la stack recommandée par profil

| Profil | Choix | Coût |
|---|---|---|
| Solo démarrage | Claude Pro ≈20 $/mois OU Mistral free selon tâche | ≈20 $ |
| Cabinet prudent (UE-first) | Mistral + Ollama local pour le sensible | ≈15-25 $ + matériel |
| Gros volume de rédaction | Claude Pro + ChatGPT (chaque force là où elle est) | ≈40 $ |
| Secret absolu | Ollama + GPU (une fois ≈800-1 500 $ de matériel) | amorti sur 2 ans |

Ne paye deux abonnements que si tu utilises réellement les deux : le piège est l'abonnement « assurance ».

## Le point Mistral : pourquoi ce n'est pas qu'un drapeau

1. **Hébergement France/UE** pour les offres cloud — en loi 09-08, un destinataire UE n'est pas la même discussion qu'un destinataire US ; et un **self-host** (modèles open weights Mistral) ramène tout chez toi.
2. **Corpus français dense** : moins d'à-peu-près sur le droit civil français, utile quand tes sources sont FR (le Maroc étant en partie dans cette filière doctrinale — à manier prudemment, le droit marocain reste peu représenté partout).
3. **Limites** : ce n'est pas un service « agréé » pour autant ; la conformité ne vient pas du drapeau mais du protocole (fiches 03 et 05).

## Le test que tu dois faire toi-même (1 h, une fois)

Prends 5 tâches réelles anonymisées (un résumé P29, une reformulation P3, un draft P13, une extraction P8, un cas P16) et lance-les sur tes deux candidats. Note : temps, corrections nécessaires, ton, hallucinations (comptées via P11). **Tes résultats > n'importe quel benchmark** — c'est exactement la méthode de la fiche 09, version ponctuelle.

## Le test des 5 tâches (protocole complet, 1 h — à refaire au changement de modèle)

| # | Tâche (prompt fiche 02) | Ce que tu notes |
|---|---|---|
| 1 | P29 sur un texte officiel que tu as collé | Respect de la source : a-t-il « complété » ? |
| 2 | P7 sur une décision que tu connais bien | Contresens sur les motifs / portée |
| 3 | P1 sur ton sujet de niche | Ton : promo déguisée ? superlatifs ? |
| 4 | P8 sur un contrat anonymisé long | Tient-il la longueur sans trous ? |
| 5 | P30 sur une clause FR↔EN | Terminologie stable, honnêteté sur les faux amis |

**Notation simple, sans échelle scientifique** : pour chaque tâche, trois colonnes — « exploitable tel quel / à retravailler / à jeter » et « référence inventée : oui/non ». Le score qui compte est le dernier : un seul « oui » non détecté annule le confort des trois autres. Deux modèles au coude-à-coude sur les cinq tâches → tranche par l'hébergement (fiche 05) et le prix.

## Journal de versions (4 lignes, tenu à jour)

| Date | Événement observé | Impact sur la table de décision fiche 10 |
|---|---|---|
| ex. 2026-09 | Mistral lance une région UE pour l'offre X | Client « hébergement UE strict » : alternative à tester |
| ex. 2026-10 | Claude sort un nouveau flag de contexte long | P8 passe en premier choix sur contrats >40 pages anonymisés |

Les modèles bougent tous les trimestres ; la fiche 07 sans journal devient une carte périmée six mois après son encrage.

## Décision d'abonnement en 3 questions

1. **Volume** : moins de 10 prompts utiles/semaine → l'offre gratuite d'un seul modèle suffit, l'abonnement achète du temps que tu n'as pas encore.
2. **Tâche dominante** : rédaction longue → Claude ; écosystème (recherche, outils, partage) → ChatGPT ; argument conformité UE → Mistral ; niveau 4 fréquent → matériel local, pas d'abonnement.
3. **Réversibilité** : avant de payer l'année, un mois d'essai payant avec export des fils — si tu ne peux pas emporter ton historique de prompts, ce n'est pas un abonnement, c'est un attachement.

## Ta feuille de test vierge (à remplir, à garder)

```
Date du test : ____  Version des modèles testés : ____
1  P29 texte collé   : Claude=__  ChatGPT=__  Mistral=__  Local=__
2  P7 décision connue: Claude=__  ChatGPT=__  Mistral=__  Local=__
3  P1 ton de post    : Claude=__  ChatGPT=__  Mistral=__  Local=__
4  P8 long anonymisé : Claude=__  ChatGPT=__  Mistral=__  Local=__
5  P30 clause FR-EN  : Claude=__  ChatGPT=__  Mistral=__  Local=__
Référence inventée détectée ? Claude=__  ChatGPT=__  Mistral=__  Local=__
Verdict: garder ____ / suspendre ____ / ré-essayer dans 3 mois ____
```

(__ = à noter : exploitable tel quel / à retravailler / à jeter.) Une feuille par trimestre, rangée dans le dossier QA : c'est la seule comparaison dont ton choix d'abonnement dépendra réellement dans un an.

## Erreurs classiques

1. Choisir un modèle pour son marketing (« le plus intelligent ») plutôt que pour la tâche — un modèle moyen qui sort des brouillons propres bat un champion dont les phrases doivent être réécrites.
2. Multiplier les abonnements « pour comparer » sans jamais documenter la comparaison (aucune donnée pour décider).
3. Oublier que les conditions changent : ce tableau est daté août 2026, une mise à jour trimestrielle est un devoir, pas un loisir.

> **Lecture pro :** la phrase à retenir : « je ne choisis pas un modèle, j'affecte des tâches ». Ton budget IA mensuel ne devrait jamais dépasser le prix de deux heures d'avocat — au-delà, il faut que la substitution d'honnêtes heures de travail soit démontrée dans ton journal de temps.

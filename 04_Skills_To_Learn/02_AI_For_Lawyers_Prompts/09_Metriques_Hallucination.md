# 09 — Métriques & QA Interne : Mesurer la Fiabilité de Tes Usages IA

> **Ce qui n'est pas mesuré se dégrade sans prévenir.** Cette fiche n'est PAS un catalogue de statistiques existantes (« 15 % d'hallucination » : aucun cabinet sérieux ne peut l'affirmer sans étude vérifiable — et ce vault ne le fera pas). C'est le protocole d'une **pratique à mettre en place** : la revue mensuelle des 20 extractions, le taux de citation vérifiée, le temps net gagné. Un tableau vide que tu remplis vaut mille chiffres empruntés.

## POURQUOI une QA interne (et pas des benchmarks du web)

Les taux d'hallucination publiés varient selon les tâches, les langues et les versions de modèles — et aucun ne décrit **ton** usage sur **tes** prompts en droit marocain. La seule statistique qui te protège est la tienne : sur les prompts que TU utilises, à quelle fréquence la sortie contient-elle une référence fausse, un contresens, une dérive de ton ? C'est mesurable en 45 min par mois, et ça transforme des impressions en décisions (garder, corriger ou tuer un prompt).

## COMMENT — la pratique des 20 extractions mensuelles

**Déclencheur :** premier samedi de chaque mois, 45 min calendées (c'est une ligne du rituel mensuel, pas un projet).

1. **Échantillon** : parmi les sorties IA utilisées le mois écoulé, tirer 20 extraits (si moins de 20 utilisations : toutes). Un extrait = un passage contenant au moins une affirmation vérifiable (référence légale, chiffre, citation, fait procédural).
2. **Vérification** : chaque affirmation est confrontée à sa source primaire (sgg.gov.ma pour les textes, jep.ma pour la jurisprudence, cndp.ma pour les régimes, texte officiel pour tout chiffre).
3. **Classement** de chaque affirmation : VRAIE (conforme à la source) / FAUSSE (contenu inventé ou erroné) / INTROUVABLE (impossible à confirmer = traitée comme fausse pour la suite) / IMPRÉCISE (vraie mais déformée par simplification).
4. **Calcul du taux de citation vérifiée** : vraies / total. Exemple de ce que tu peux obtenir : 18/20 = 90 %.
5. **Décision par prompt** (pas par modèle) : un prompt qui sort <80 % est suspendu jusqu'à réécriture ; >95 % = standardisé dans la bibliothèque (fiche 02).

**Le seuil de 80 % est une règle de gestion interne choisie, pas une norme scientifique —** écris-le comme tel dans tes notes.

## COMMENT — le tableau de bord (à dupliquer dans Notion)

| Mois | Prompts testés | Citations vérifiées (V/F/I/Im) | Taux V | Temps net gagné (h) | Incidents (sortie fausse exploitée) | Décisions |
|---|---|---|---|---|---|---|
| Septembre 2026 | 20 | — | — | — | — | (à remplir — le premier mois ne mesure rien, il installe la méthode) |

Deux lignes d'à-côtés indispensables :

- **Temps net gagné** : (temps que la tâche t'aurait pris sans IA) − (prompt + relecture + vérification + correction) — estimé honnêtement via ton journal de temps Notion. Si négatif pendant 3 mois : le prompt est un luxe, supprime-le.
- **Incidents** : toute sortie fausse qui a **quand même** atteint un brouillon client ou une publication. Cible : zéro ; chaque incident déclenche une révision du protocole, pas une punition.

## COMMENT — les 5 KPI de la QA IA

| KPI | Formule | Cible indicative (à ajuster par toi) |
|---|---|---|
| Taux de citation vérifiée | V / total affirmations | ≥90 % après garde-fou P25 |
| Taux d'exploitation | sorties utilisées / prompts lancés | 50-70 % en dessous = prompts mal ciblés |
| Temps net moyen / tâche | journal de temps | positif et croissant |
| Incidents publiablement atteints | compteur mensuel | **0 absolu** |
| Fraîcheur du protocole | date de dernière revue des prompts + re-test des modèles | ≤90 jours |

Les cibles sont des **réglages de pilotage** du cabinet, pas des vérités : la première revue (M+1) doit servir à les recalibrer sur tes propres números.

## COMMENT — les tests de garde-fou (trimestriels, 1 h)

1. **Test d'invention** (fiche 01) : « 3 arrêts marocains sur la clause pénale, références complètes » → vérifier l'invention ; si un modèle que tu utilises commence à « bien » répondre, méfie-toi davantage (une réponse plausible non vérifiée est plus dangereuse qu'une réponse vague).
2. **Test d'obéissance au texte collé** : coller un faux article de loi inventé + P7 « résume UNIQUEMENT le texte fourni » → le modèle doit résumer sans « corriger » ni « compléter » par de faux souvenirs.
3. **Test de garde-fou** : P1 sans P25 vs P1 avec P25 → comparer les références produites ; c'est la preuve chiffrée de l'utilité du garde-fou.
4. **Re-test des modèles** (fiche 07) : rejouer les 5 tâches types sur les versions du jour ; noter les bascules de qualité/hébergement/CGU.

## Le rapport trimestriel (5 lignes, pour toi et les ateliers)

Un paragraphe, quatre chiffres (taux V, incidents, temps net, prompts tués/créés), une décision de stack. Ce rapport est la matière première de tes contenus « IA & droit » — un post qui dit « sur nos 60 vérifications du trimestre, X références inventées détectées AVANT publication » est véridique, chiffré, et démontre ta méthode sans jargon.

## COMMENT — le protocole de vérification, pas à pas (la QA en 4 temps)

1. **Extraire** : courir P11 sur chaque sortie utilisée dans le mois (« liste toutes les références, chiffres et citations, mot à mot »). L'extraction est mécanisée ; la vérification ne l'est jamais.
2. **Sourcer** : pour chaque item — le texte officiel est-il ouvert ? Si la réponse est « je suis à peu près sûr », l'item est en échec. Les trois destinations : sgg.gov.ma, jep.ma, cndp.ma — plus les textes fiscaux et de changes pour les cas durs.
3. **Classer** : VRAIE / FAUSSE / INTROUVABLE / IMPRÉCISE. La distinction FAUSSE/IMPRÉCISE guide les corrections : l'invention tue un prompt, l'imprécision tue une formulation.
4. **Statuer** par prompt (pas par modèle) : suspendre <80 %, documenter >95 %, et partout au milieu, ré-écrire avec P25 et une source collée.

Le temps de la vérification est lui-même mesuré : si la QA mensuelle dépasse 2 h, c'est que trop de prompts produisent trop d'affirmations — la solution est de tarir la source (P29 : « ne parle que de mon texte »), pas de travailler plus vite.

## Modèle de fiche incident (une page, déclenchée par la QA)

```
Date :            Prompt concerné (n° fiche 02) :
Sortie utilisée dans : (livrable / publication / rien — détectée en relecture)
Affirmation fausse (verbatim) :
Ce qui était vrai (source + lien) :
Comment elle a été détectée : (QA mensuelle / client / confrère / relecture à chaud)
Mesure corrective : (prompt suspendu / P25 renforcé / source collée obligatoire)
Décision protocolaire :
```

Une fiche incident par trimestre minimum est le signe que la recherche fonctionne ; zéro fiche pendant un an n'est jamais « parfait », c'est « non regardé ».

## Lier la QA au temps facturé

Le temps de vérification est un temps de mission : il figure dans tes totaux (journal Notion), sinon deux dérives s'installent — le client paie une relecture invisible (sur-facturation perçue), ou l'avocat le fait gratis (relecture qui raccourcit). La ligne « validation et vérification des sources » existe dans la convention, chiffrée dans la mission, tracée dans le journal : la règle des 3 V devient économiquement soutenable.

## Ce que la QA ne mesure PAS (et qu'il faut juger autrement)

- **L'utilité stratégique** : un prompt fiable mais inutile reste un déchet — la revue mensuelle demande aussi « quel livrable ce prompt a-t-il réellement servi ? ».
- **La qualité du style** : un taux de 100 % sur des phrases que tu réécris à 80 % est un faux succès ; le « temps net » est l'indicateur qui corrige celui-là.
- **Le risque d'usage hors protocole** : la QA auditte les prompts « dans le cadre » ; ce qui sort du cadre (le coller-coller d'urgence du vendredi soir) se détecte par le journal et la culture d'équipe (fiche 08 Q7), pas par un tableau.
- **La fiabilité d'un modèle pour un autre avocat** : tes chiffres décrivent TON usage ; en atelier, cite-les comme « chez nous » — jamais comme une science.

## Le kit de la revue mensuelle (à préparer la veille)

1. La liste des sorties IA du mois (historiques de fils ou journal).
2. Le tableau de bord vierge (section plus haut) dans Notion.
3. La liste noire des références à vérifier (copiée des prompts).
4. 45 min calendées — la revue qui n'est pas dans l'agenda n'existe pas.

## Erreurs classiques

1. Mesurer pour afficher — le tableau existe, personne ne le lit : chaque revue doit finir par une DECISION (prompt suspendu, protocole modifié, abonnement coupé).
2. Arrondir les introuvables en vraies : introvable = fausse, sinon le taux ne veut plus rien dire.
3. Confondre « le modèle a bien marché ce mois-ci » et « la méthode est sûre » : un prompt qui produit des citations justes pendant 3 mois et invente le 4e jour — c'est Mata, exactement.
4. Publier tes statistiques internes sans les contextualiser (« chez nous, sur nos tâches ») — un chiffre hors contexte devient une rumeur.

> **Lecture pro :** la QA n'est pas un luxe de cabinet organisé — c'est ce qui sépare le professionnel qui dit « je vérifie » de celui qui dit « ça a l'air juste ». Ton premier tableau rempli (M+1) vaut mieux que n'importe quelle étude : c'est la preuve écrite que la règle des 3 V fonctionne réellement chez toi.

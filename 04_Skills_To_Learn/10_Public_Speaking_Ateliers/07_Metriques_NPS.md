# Métriques d'atelier : NPS et la FAQ qui va avec

> Mesurer un atelier, c'est décider s'il faut le refaire.
> Le Net Promoter Score est la métrique de référence pour la satisfaction « recommanderait-il ? » — à condition de connaître sa définition exacte (Reichheld, Harvard Business Review, 2003), sa formule, et sa limite mortelle : les petits échantillons d'ateliers de 20 personnes.

## POURQUOI mesurer (et pourquoi le NPS)

- Sans mesure, l'atelier reste une fierté personnelle ; avec mesure, il devient un canal d'acquisition pilotable comme les autres (à côté de `03_Sales_Without_Selling` et du SEO).
- Le NPS est choisi comme question unique parce qu'elle est **orientée action** : « recommanderiez-vous ? » prédit mieux la participation future et le bouche-à-oreille que « avez-vous aimé ? » (c'est l'argument de Reichheld 2003 — pas une loi naturelle, une hypothèse forte à laquelle on ajoute nos deux questions maison).
- L'autre raison est commerciale : l'atelier vit du réseau du coworking et de la chambre de commerce ; un score présentable (avec ses limites) débloque les invitations suivantes.

## COMMENT : définition et calcul du NPS

Question standard, à poser telle quelle dans le questionnaire post-atelier :

> « Sur une échelle de 0 à 10, dans quelle mesure recommanderiez-vous cet atelier à un confrère entrepreneur ? »

Classement des répondants :

| Note | Catégorie |
|---|---|
| 9–10 | Promoteurs |
| 7–8 | Passifs (ne comptent ni pour ni contre) |
| 0–6 | Détracteurs |

**Formule :** NPS = % de promoteurs − % de détracteurs. Résultat en points, de −100 à +100.

Exemple chiffré [cas illustratif] : atelier de 22 participants, 14 réponses —
6 promoteurs, 5 passifs, 3 détracteurs. % promoteurs = 42,9 % ; % détracteurs = 21,4 % ; NPS = 42,9 − 21,4 = **21,5 points**.
Interprétation prudente : correct mais pas excellent ; et surtout, avec 14 réponses, un seul détracteur de plus aurait fait plonger le score de 7 points (cf. limites).

### La limite des petits échantillons (le point critique)

- Un atelier produit 10 à 25 réponses.
Un NPS calculé là-dessus a une marge d'erreur brute : la différence entre « NPS 21 » et « NPS 35 » n'a souvent aucune signification statistique.
- Règle du vault : le NPS d'un atelier unique ne se commente jamais — seul le **NPS cumulé sur la saison** (tous ateliers, 60+ réponses) s'interprète, et même lui avec prudence.
- Ne jamais comparer son NPS d'atelier à des benchmarks de grands comptes : ce ne sont pas les mêmes publics ni le même produit (confusion récurrente que le vault proscrit — cf. `03_KPI` du dossier 12, même discipline).

### L'alternative simple : les 3 questions post-atelier

Pour un échantillon de 15 personnes, le trio de questions ouvertes est plus utile que le NPS seul :

1. « La recommanderiez-vous ? » (0–10 → alimente le NPS cumulé)
2. « La chose la plus immédiatement applicable chez vous, hier, c'était quoi ? » (mesure la valeur perçue de la méthode — le vrai produit de l'atelier)
3. « Quel sujet manquant pour un prochain atelier ? » (alimente directement [[09_Arbre_Choix_Sujet]])
Envoi : dans l'email J+1 ou J+2 (cf. [[06_Suivi_Post_Atelier]]), un lien Tally/Google Forms, trois questions, 40 secondes de remplissage maximum.
Au-delà de trois questions, le taux de réponse s'effondre (hypothèse de travail, à confirmer avec vos taux réels).

## COMMENT lire les détracteurs

Le détracteur n'est pas une insulte, c'est un gratuit qui a pris une décision.
Trois causes typiques et la conduite :

| Cause du 0–6 | Conduite |
|---|---|
| Attendait du conseil sur son dossier | Le cadrage « je ne vends rien » était trop discret — l'amplifier en ouverture ([[01_Anatomie_Atelier_60]]) |
| Contenu trop basique pour son niveau | Mieux cibler le sujet/audience ([[09_Arbre_Choix_Sujet]]) |
| Le formateur lui-même (rythme, accent mal compris, slide illisible) | Corriger l'exécution ([[03_Slides_10]], [[04_Animation_Gestion_Salle]]) |

Répondre à un détracteur : email personnel sobre, 3 lignes, « qu'est-ce qui aurait rendu l'heure utile ? » — jamais de défense.
Un détracteur écouté revient parfois promoteur à l'atelier suivant.

## EXEMPLE : le tableau de bord atelier (Notion, 6 colonnes)

| Session | Participants | Réponses | NPS partiel | Sujets manquants cités | Diagnostics générés (J+30) |
|---|---|---|---|---|---|
| Coworking Maarif 2026-06 | 19 | 12 | +25 | factures, IGOC | 3 |
| Chambre-commerce Casa 2026-07 | 31 | 16 | +19 | IGOC, 09-08 | 2 |
| Université Hassan-II 2026-07 | 45 | 14 | +36 | — (public étudiant, mission attendue : aucune) | 0 |
Lecture type d'une réunion mensuelle : les colonnes qui comptent pour la décision ne sont pas le NPS mais la dernière (diagnostics) et l'avant-dernière (sujets) — le NPS cumulé trimestriel sert au marketing et aux partenaires (le pilotage financier des KPIs du cabinet se traite dans 12_Finance_Cabinet_OS/03_KPI_Cabinet_MRR).

## FAQ

**Faut-il rémunérer le questionnaire ?** Non — cela biaise la réponse vers la politesse.
**Anonyme ou nominatif ?** Nominatif (case « répondre anonymement » cochable) : les verbatims des promoteurs alimentent les témoignages de la plaquette, avec consentement écrit (loi 09-08 — notice, cf. [[10_Checklist_Orga_15j]]).
**Combien d'ateliers avant de juger le canal ?** 3 sessions minimum et 50+ réponses — en dessous, toute conclusion est un bruit ([[06_Suivi_Post_Atelier]] porte la conversion, ce fichier la satisfaction ; les deux se croisent au trimestre).

## Le protocole de mesure en 5 étapes (à tenir chaque session)

1. **Le bon moment** : le questionnaire se soumet dans les 24 h (email J+1, lien unique) — à J+7 la mémoire de l'atelier est déjà reconstruite, pas mesurée.
2. **Le bon échantillon** : le NPS cumulé ne s'interprète qu'à partir de 60 réponses (5 sessions environ) ; en dessous, on ne publie et ne compare rien.
3. **Le bon réflexe** : chaque note ≤ 6 est suivie d'un email personnel de compréhension (jamais de défense) ; le verbatim du détracteur vaut plus que dix promoteurs polis.
4. **La bonne ventilation** : segmenter par lieu (coworking vs université vs chambre) et par sujet — un « mauvais NPS » agrégé cache souvent un excellent format raté par un seul lieu.
5. **Le bon usage** : le NPS cumulé trimestriel sert (a) à convaincre les hôtes de reprogrammer, (b) à alimenter l'arbitrage des sujets ([[09_Arbre_Choix_Sujet]]) ; jamais à « afficher un score » — un chiffre vitrine sans verbatims est une decoration, pas une mesure.

## FAQ

**Faut-il rémunérer le questionnaire ?** Non : le cadeau biaise la note vers la politesse et fausse la comparaison entre sessions.
**NPS ou satisfaction (coup de cœur) ?** Les deux questions coûtent une ligne au participant : la satisfaction mesure l'humeur, la recommandation mesure le canal ; si une seule est gardée, c'est la recommandation.
**Et les objectifs chiffrés ?** Seuil de déclenchement d'un ré-design du format : NPS cumulé sous +10 sur 60 réponses OU conversion diagnostics sous 2 par session en moyenne sur 3 sessions — deux chiffres de pilotage, hypothèses à valider, jamais des normes.

## Plan d'action 30 jours pour outiller la mesure

- Semaine 1 : créer le questionnaire Tally/Google Forms à 3 questions (recommandation 0-10, verbatim d'applicabilité, sujet manquant) ; lien unique par session pour tracer la source.
- Semaine 2 : brancher les réponses sur Notion ATELIERS > Métriques (6 colonnes du tableau du haut) et relancer une fois à J+3 les non-répondants — une seule relance.
- Semaine 3 : écrire la règle d'interprétation du cabinet (cumul 60 réponses minimum, jamais de commentaire sur un score isolé) et l'afficher dans la page Notion.
- Semaine 4 : premier débrief d'équipe sur les verbatims « ce qui manque » : la liste alimente la file de [[09_Arbre_Choix_Sujet]] — la mesure boucle sur la décision, sinon elle ne mesure rien.

## FAQ des métriques

**Le questionnaire est-il nominatif ?** Par défaut oui (case anonyme possible) : les verbatims des promoteurs alimentent la plaquette — avec consentement écrit distinct, la republique sans autorisation serait une double faute (09-08 + déonto) ([[10_Checklist_Orga_15j]]).
**Et le taux de présence (no-shows) ?** C'est un indicateur logistique (il pilote les relances J-1), pas de satisfaction — ne jamais le mélanger au NPS dans la même ligne du tableur.
**Que faire d'un score médiocre cumulé ?** Avant de toucher au contenu : vérifier la cible (le public annoncé est-il le public venu ?), puis l'exécution ([[08_Erreurs_Public_Speaking]]), puis le sujet — dans cet ordre, l'ordre inverse est l'erreur classique.

> **Lecture pro :** Le NPS d'un atelier de 20 personnes est un thermomètre tenu dans la main : il mesure d'abord votre poignée.
> N'interprétez que le cumul, et prenez les trois questions ouvertes — ce sont les verbatims « ce qui manque » qui fabriquent le prochain atelier, pas le score.
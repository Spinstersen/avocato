# 08 — Outils de gestion du temps et des missions : la vérité des durées

> Un solo TDAH ne « retient » pas : le système retient.
> Ce fichier installe les deux seules mesures qui rendent le cabinet pilotable — le chrono sur chaque mission (Clockify/Toggl gratuits) et le calendrier de garde-fous (Google Calendar, rappels J-2/J-1).
> Sans elles, le taux horaire est une opinion, les échéances sont un souvenir, et le souvenir n'est pas un outil de compliance.
>
> **Liens :** [[12_Finance_Cabinet_OS/08_Metriques_Rentabilite]] · [[06_ADHD_System/08_Tech_Stack_ADHD]] · [[09_Audit_Mensuel_Cabinet]] · [[04_Batching_Hebdo]]

## POURQUOI le chrono d'abord : on ne pilote pas ce qu'on n'a pas mesuré

- Le plancher du cabinet est calculé ailleurs : 350-450 DH HT/h, charges à 40 % du CA, calcul-type du vault ([[11_Negotiation_Psychology/01_BATNA_ZOPA_Calculateur]], [[12_Finance_Cabinet_OS/08_Metriques_Rentabilite]]).
  Mais un plancher ne se compare qu'à un **taux horaire réel** :
  CA de la mission ÷ heures réellement passées, toutes tâches confondues.
- Sans tracking, deux dérives opposées mais également fausses : la mission pénible semble avoir coûté le double de ce qu'elle a coûté, la mission fluide semble gratuite.
  Les deux erreurs finissent en décisions de prix fausses ([[09_Audit_Mensuel_Cabinet]]).
- Le time-tracking est aussi un outil TDAH de cognition : la notion de durée est précisément l'une des fonctions en déficit (Barkley, 2012) — le chrono externe remplace une horloge interne capricieuse, exactement comme la liste remplace la mémoire.
- Ce n'est pas de la comptabilité horaire client : les temps suivis servent au pilotage interne.
  La facturation du cabinet reste au forfait (packs, diagnostics, retainers) — le suivi du temps informe le prix, il ne le remplace pas ([[12_Finance_Cabinet_OS/01_Pricing_3_Options]]).

## COMMENT : le setup minimal (30 minutes, une fois)

1. **Clockify ou Toggl — version gratuite.** Les deux suffisent ; le vault ne sacralise aucun choix, Toggl est plus épuré, Clockify plus granulaire par projet.
  Le seul qui marche est celui dont le bouton « start » est à portée de pouce.
2. **Un projet par fiche mission Notion**, nommé comme la fiche (« Pack freelance — K-114 ») ; tâches types pré-créées : rédaction, RDV, relances, admin, Loom.
3. **Le geste unique à ancrer : le timer se lance AVANT d'ouvrir le dossier, pas quand « ça commence vraiment ».** La tâche invisible des solos, c'est tout ce qui précède l'ouverture du fichier — rouvrir un email, relire le contexte, chercher la pièce.
  C'est justement ça qui ronge les marges.
4. **Widget mobile sur l'écran d'accueil** ; une règle : pas de mission sans timer, même de cinq minutes — la ligne « 5 min » existe, elle n'est jamais du bruit.
5. **Export mensuel** (CSV) vers la fiche d'audit : c'est le seul moment où l'on regarde les chiffres en gros ([[09_Audit_Mensuel_Cabinet]]).

## COMMENT : la boucle de vérité — le taux horaire réel par mission

```
Pour chaque mission close du mois :
  Heures réelles (Clockify, toutes tâches)        → H
  CA HT encaissé de la mission                    → C
  Taux horaire réel = C / H

Lecture vs plancher 350-450 DH HT/h (calcul-type 12/08) :
  sous le plancher   → périmètre trop large ou temps mal maîtrisé : la SOP se corrige, ou le prix monte
  dans la fourchette → viable ; chercher le gain dans les durées par étape, pas dans le prix
  nettement au-dessus → l'écart vient peut-être d'un tracking incomplet : vérifier avant de se réjouir
```

Exemple chiffré [illustratif] : pack 2 900 HT sur 7 h 25 réelles = 396 DH/h — dans le couloir ; le même pack sur 11 h réelles = 264 DH/h — sous le plancher, et l'écart est une information que le client n'aura jamais de lui-même : il ne paye pas 11 heures, il paye un pack.
Seule la mesure interne sépare les deux mondes.

## COMMENT : le calendrier de garde-fous

Un calendrier Google dédié, nommé « GARDE-FOUS Cabinet », distinct de l'agenda des RDV :

1. **Toute échéance de mission y entre à l'instant où elle naît** — date de livraison conditionnelle, relance de solde, anniversaire de provision, dépôt, publication.
  Pas « après, quand j'aurai fini » : l'entrée fait partie de l'étape de la SOP.
2. **Double rappel systématique J-2 et J-1** :
  J-2 pour corriger le tir (pièce manquante, client à relancer), J-1 pour décider le plan B.
  Un rappel unique J-0 arrive toujours trop tard pour un cerveau qui planifie dans l'émotion.
3. **Les jalons financiers sont des événements comme les autres** : facture de solde à J+0, relance J+7, formalisation J+15 (mécanique de recouvrement amiable côté acquisition/finance).
4. **Revue du calendrier vendredi, dans le bloc relances** : ce qui saute trois semaines de suite est soit une SOP à écrire, soit un engagement à ne plus prendre ([[01_Theorie_SOP_Pour_Avocat]]).
5. **Les échéances légales ou ordinales** (délais de recours, convocations, délais Bâtonnier) entrent en double — dans le calendrier ET dans la fiche Notion, avec un tiers de marge personnelle : un délai qui court n'est jamais « la semaine prochaine » dans une tête TDAH ; il est une date avec deux alarmes.

## EXEMPLE : une semaine outillée de bout en bout

- Lundi 8 h 30, bloc rédaction : timer « K-114 / rédaction », 2 h 10 réelles.
  Le soir, la relance de la facture de solde de K-098 est partie dans le bloc de vendredi dernier — le rappel J+7 du calendrier avait sonné hier, la ligne était déjà dans la liste du bloc.
- Mercredi 14 h : rendez-vous client — 48 min (le timer démarre à l'ouverture de l'onglet, pas au « bonjour »).
- Jeudi : livraison pack K-114 :
  Loom enregistrée, 9 min 20 ; la fiche Notion passe à « livré », le rappel solde J+10 se crée dans la foulée.
- Vendredi 14 h : export Clockify de la semaine ;
  K-114 totalise 6 h 55 : sous les 7 h 25 budgétés par la SOP — étape 7 « contrôle qualité » n'a pris que 25 min.
  Note à l'audit : tester si l'étape 6 descend à 3 h.
- À chaque instant, l'agenda ne contenait que des RDV ; tout le reste du pilotage vivait dans les deux systèmes — chrono et garde-fous.
  C'est exactement le dessin cherché : la tête est libre pour le métier.

## PIEGES

- **Tracker sans jamais relire** : le temps suivi qui ne remonte jamais dans le taux horaire réel est un rituel vide.
  Un export, une lecture, un mois sur deux minimum ([[09_Audit_Mensuel_Cabinet]]).
- **L'oubli de timer « cette fois je vais vite faire »** : la mission sans tracking est une donnée manquante au pire moment de la décision de prix.
  Parade : rappel fixe du lundi « timers démarrés ? » et champ Notion « minutes suivies » qui bloque la clôture si vide.
- **Le calendrier-roi** : tout mettre dans l'agenda des RDV et finir par ne plus distinguer un client d'un garde-fou.
  Les deux calendriers sont séparés pour que les alarmes structurelles restent sacrées.
- **La pile d'outils** :
  Notion + Clockify + Google Calendar suffisent — c'est déjà la totalité du socle (cf. [[06_ADHD_System/08_Tech_Stack_ADHD]]) ; chaque outil en plus est un point de rupture et une décision de moins en banque mentale.
  Le vault interdit la veille techno compulsive en heures ouvrées.
- **Le suivi comme confession** : une mission à 240 DH/h n'est pas une faute morale, c'est une ligne à corriger dans la SOP ou le prix.
  Le chiffre ne juge pas ; il informe — et il n'entre dans aucune conversation client.

## Les quatre chiffres du lundi matin (deux minutes)

1. Heures suivies la semaine passée (toutes missions) : le plancher d'honnêteté du système — une semaine sans chiffres est une semaine à rattraper dans la revue, pas à réinventer de mémoire.
2. Nombre de timers oubliés (à estimer honnêtement) : deux ou plus = le geste de démarrage est mal ancré — ajouter un rappel physique (widget, post-it, minuteur d'entrée).
3. Nombre de missions ouvertes sans fiche : zéro toléré — la fiche précède le travail, pas l'inverse ([[05_Templates_Mission_Livrables]]).
4. Heures de garde-fous : les deux rappels J-2/J-1 ont-ils sonné et été traités ?
  Sinon, l'incident est déjà en route vers l'audit.

## Règles de paramétrage du timer et du calendrier

- Un timer ne se met jamais en pause pour « deux minutes d'email » : la pause est le trou noir du suivi ; cesser = arrêter, reprendre = nouveau timer de la tâche correspondante.
- Les catégories Clockify se limitent aux cinq de la SOP (rédaction, RDV, relances, admin, Loom) : une sixième catégorie est un aveu que la SOP a un angle mort — noter pour l'audit plutôt que de créer la catégorie.
- Le calendrier de garde-fous ne contient que des dates subies ou données (livraisons, audiences, dépôts, relances) — jamais de tâches : ce qui peut glisser n'est pas un garde-fou, c'est une intention.
- Export et lecture des chiffres en fin de mois, pas le vendredi : le taux horaire réel se juge sur un cycle de mission, pas sur une semaine de circonstances.

> **Lecture pro :** durée, taux et seuils de ce fichier sont des hypothèses de travail dérivées du calcul-type du vault (plancher 350-450 DH HT/h) — ils se recalibrent sur tes trois premiers mois de tracking réel ; le plancher lui-même est à re-paramétrer selon ton régime fiscal et tes charges réelles ([[12_Finance_Cabinet_OS/08_Metriques_Rentabilite]]).

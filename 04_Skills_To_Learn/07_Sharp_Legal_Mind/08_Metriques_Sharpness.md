# 08 — Métriques de sharpness : piloter le raisonnement comme un cabinet

> **À quoi ça sert :** transformer l'amélioration du raisonnement en chiffres suivis — volume de cas, mémorisation des nombres, vitesse de diagnostic, production de veille — avec les cibles à 90 jours et le tableau de bord Notion qui va avec. **Pour qui :** l'avocat TDAH qui ne tient aucune résolution sans tableau de bord, et qui refuse de croire « je me sens plus fort » sans mesure. Temps de lecture : 8 minutes.

## 1. POURQUOI : ce qui n'est pas mesuré ne s'entraîne pas

Le raisonnement juridique semble impossible à mesurer — c'est faux : on ne mesure pas la finesse (celle-ci vient des cas), on mesure **l'exposition répétée et la rétention**, les deux seuls leviers sous contrôle. Un cerveau TDAH apprend par la boucle de récompense : sans compteur visible, l'entraînement de 5 minutes par jour s'évapore en trois semaines ; avec compteur, la streak devient la motivation elle-même. Enfin, la mesure a une fonction commerciale : à J90, « soixante-deux cas traités » n'est pas une coquetterie interne, c'est l'argument d'autorité que le cabinet peut prouver.

## 2. COMMENT : les sept KPI du dossier

| # | KPI | Définition mesurable | Cible 90 j | Rythme de relevé |
|---|---|---|---|---|
| 1 | Cas d'entraînement | Cas de `02_Cas_Grades.md` ou réels, traités avec auto-note ≥ 8/10 | 60 (5/semaine) | Hebdo |
| 2 | Numbers Sheet | Récitation à blanc de 10 chiffres tirés au hasard dans `03_Numbers_Sheet.md` | 10/10 sans faute, 3 semaines de suite | Lundi matin |
| 3 | Deal reasoning | Cas structurés en 150 mots chrono, auto-notés à la grille de `05_Deal_Reasoning.md` | 12 (1/semaine), moyenne ≥ 8/10 | Hebdo |
| 4 | Créneaux de veille | Présence réelle aux 3 créneaux de `04_Routine_Hebdo.md` | ≥ 33/36 | Dimanche |
| 5 | Fiches de veille produites | Fiches au template (une par créneau) | 33 | Dimanche |
| 6 | Posts issus de la veille | Publications LinkedIn référence à l'appui | 12 (1/semaine) | Mensuel |
| 7 | Temps de diagnostic réel | Durée écoute → note d'une page rendue | < 40 min à J90 | Par mission |

## 3. Le tableau de bord (structure Notion)

Base « Sharpness » — colonnes :

```
Date | Type (cas/deal/veille/post/diag) | Référence (cas n°, niche, source) |
Note (x/10) | Temps (min) | Chiffre testé (10/10 ?) | Commentaire (1 ligne)
```

Trois vues : la **semaine** (les 5 cas + 1 deal + 3 veilles ont-ils été faits ?), le **mois** (les pentes, pas les perles : note moyenne, temps médian), le **trimestre** (J30/J60/J90 — le seul endroit où l'on compare aux cibles). L'enregistrement prend 30 secondes : si le template demande plus, il mourra — c'est la loi de toute mesure TDAH.

## 4. Comment mesurer sans se mentir

1. **Le volume sans la note ne compte pas :** un KPI de « cas faits » dégrade en cas bâclés ; le compteur avance uniquement si l'auto-note ≥ 8/10 est atteinte.
2. **La récitation est écrite, pas mentalement :** 10 chiffres sur papier, corrigés à la feuille ; « je les connaissais » n'existe pas.
3. **Le temps de diagnostic se mesure sur les vrais diagnostics**, minuteur réel, de l'entrée du client à la note envoyée — l'auto-évaluation « j'étais rapide » est toujours optimiste de 40 %.
4. **La veille mesurée est la fiche, pas la lecture :** cinquante onglets ouverts sans fiche = zéro.
5. **Les rechutes font partie du tableau :** une semaine à 0/5 ne casse pas la streak morale — elle se note, et le lundi suivant revient. Ce qui détruit un entraînement, ce n'est pas le raté, c'est l'abandon après le raté.

## 5. Le test de J90 ( blanc, chronométré)

Cas neuf tiré au hasard parmi les niches (`02_Niches_Deep_Dive\`), minuteur de 40 minutes :

1. **0-5 min :** écoute simulée par lecture des faits — carte des 7 catégories.
2. **5-15 min :** questions juridiques formulées + 3 risques cotés avec les chiffres de la Numbers Sheet (la feuille est ouverte — le client, lui, consultera ses factures).
3. **15-35 min :** note d'une page rédigée (gabarit `06_French_Communication_With_Clients/05_Modeles_Notes.md`).
4. **35-40 min :** relecture LanguageTool + contrôle des références.

**Réussite :** note complète, zéro référence inventée, au moins un chiffrage de risque sourcé, prochaine étape datée. Ce test n'est pas un examen : c'est le rituel d'ouverture du `11_Plan_90_Jours.md` suivant.

## 6. Signaux d'alerte et remèdes

| Signal | Lecture | Remède |
|---|---|---|
| 3 semaines sans case nouveau | La routine a perdu son créneau | Remettre les 5 min/jour à l'horaire unique du matin |
| Notes qui stagnent à 6/10 | Le risque n'est pas chiffré/sourcé | Rejouer `03_Numbers_Sheet.md` à voix haute, 5 chiffres/jour |
| Veille sans post depuis 3 semaines | Le dimanche saute | Diviser la synthèse à 15 min, un seul créneau |
| Diagnostics qui dérapent à 90 min | Le tri des catégories n'est plus fait | Rejouer l'arbre de `09_Arbre_Decision_Issue_Spotting.md` sur papier pendant 2 cas |
| Compteur à 60 cas sans un vrai client | L'entraînement devient un jeu | Deux diagnostics offerts ou bonifiés à des prospects réels (dans la limite déontologique : l'information, pas la chasse) |

## 8. Exemple de semaine réellement remplie (la semaine 6, celle qui bascule)

| Jour | Geste | Entrée au tableau de bord |
|---|---|---|
| Lun 8 h 05 | Récitation 10 chiffres sur papier | KPI 2 : 8/10 (ratés : RAS dividendes 2027, dotation e-commerce) |
| Mar 9 h | Créneau textes : circulaire DGI lue + fiche | KPI 4 fait ; KPI 5 : fiche 1 |
| Mer midi | Cas 6 (MRE) à livre fermé, 10 min | KPI 1 : cas n° 27, note 7/10 — volet change bâclé |
| Jeu 18 h | Créneau jurisprudence : arrêt NOUR DAR relu à l'envers | KPI 4 fait ; KPI 5 : fiche 2 |
| Ven 17 h | Deal reasoning Fatima, 150 mots chrono | KPI 3 : deal n° 6, note 8/10 |
| Sam 10 h | Rejouer le cas 6 (la rechute est la leçon) | KPI 1 : rattrapé à 9/10 |
| Dim 17 h | Synthèse + post programmé | KPI 4 fait ; KPI 5 : fiche 3 ; KPI 6 : post 6 sur 12 |

Semaine validée : 3/3 créneaux, 6/7 KPI en mouvement. Le rattrapage du samedi n'était pas au plan — c'est exactement ce que le plan autorise.

## 9. La revue mensuelle en cinq questions (15 minutes, le premier du mois)

1. Quelle pente sur la note moyenne des cas — monte, stagne ou triche ? (la triche se voit : notes toutes rondes et identiques)
2. Quel chiffre de la Numbers Sheet m'a été utile trois fois sans que je le sache ? (le candidate au renforcement de la récitation)
3. Quel créneau de veille a sauté le plus souvent, et à quel jour ? (reprogrammer le créneau, pas la volonté)
4. Combien de vrais diagnostics, et lequel m'a appris une catégorie que les cas ne montraient pas ?
5. Si je ne devais garder qu'un rituel au mois prochain, lequel — et que j'ose supprimer ?

## 10. Le rituel de remise en selle (après une semaine blanche)

Reprendre par le plus petit geste mesurable — pas par la plus belle intention : 10 minutes, un cas niveau 1, trois chiffres récités, fiche du jour notée. La remise en selle se juge à la reprise du compteur, pas à l'éclat de la reprise. Et la règle du `11_Plan_90_Jours.md` § 5 vaut ici : deux semaines blanches se reprogramment, une streak ne se rejoue pas à l'identique — on reprend la pente, pas le sommet.

## 11. Ce que ces métriques ne mesurent pas

La finesse du jugement, la qualité de la plaidoirie, la confiance du client : trois choses qui se constatent dans les retours et dans les dossiers gagnés — mais qui ne viennent qu'ensuite, quand les compteurs du § 2 tournent. Mesurer le moyen, vérifier la fin : c'est tout l'emploi du présent fichier.

## 12. La version minimale (la semaine qui déraille)

Quand la semaine tourne à l'audience, au déplacement et à l'urgence, le programme survit en trois gestes de vingt secondes : un chiffre récité dans le taxi, un cas relu à la sauvette (même sans l'écrire), une ligne au tableau de bord le dimanche — même pour dire « zéro ». Le compteur qui baisse reste un compteur ; le compteur qu'on ferme ne se rouvre jamais.

## 13. Le lien avec les autres dossiers (mesurer ce qui sort d'ici)

Deux KPI « exportés » à surveiller hors de ce tableau : le taux de conversion diagnostic → mission (dossier `03_Sales_Without_Selling\`, sept relances) et le nombre de posts publiés depuis la veille (dossiers `09_SEO_Content_Engine\` et `10_Public_Speaking_Ateliers\`). La sharpness n'a de sens que si elle fait bouger ces deux compteurs-là — c'est sa preuve d'utilité, pas sa cible.

## 14. Ce que ce fichier ne devient jamais

Un tableau de bord n'est pas un diplôme : les compteurs prouvent l'exposition, jamais la compétence — c'est le client qui renouvelle et le dossier qui tourne qui le prouvent. Le jour où l'on optimise le chiffre au lieu du geste, la mesure a cessé de servir le raisonnement : on arrête le compteur, on reprend les cas.

> **Lecture pro :** un cabinet qui mesure son raisonnement est un cabinet qui vend une méthode — la nôtre tient en une phrase : soixante cas, dix chiffres, trois veilles par semaine, un test à quatre-vingt-dix jours. Le client qui demande « pourquoi vous plutôt qu'un autre » entend cette phrase sans savoir qu'il l'entend.

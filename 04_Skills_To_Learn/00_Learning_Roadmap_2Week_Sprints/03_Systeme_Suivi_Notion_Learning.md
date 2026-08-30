# 03 — Système de Suivi Notion : le Learning OS du Cabinet

> **Fichier « infrastructure ».** Comment construire dans Notion la page unique qui porte les 12 sprints, la bibliothèque de ressources, les chiffres-clés du droit marocain à ne jamais oublier, et la veille — avec rappels automatiques à J+3 et J+7. C'est le système d'externalisation de la mémoire de travail prescrit par le fichier 01.
> Pour : l'avocat qui perd ses notes et ses idées. Temps de lecture : 10 minutes ; construction effective : 45 minutes chrono le J1 du plan 30 jours.

## 1. Avant : pourquoi Notion et pas Obsidian, et pourquoi UN seul endroit

Le cabinet tourne déjà sur le vault Obsidian pour le juridique ; l'apprentissage, lui, atterrit dans Notion pour trois raisons assumées.

Premièrement, Notion offre nativement ce dont un cerveau TDAH a besoin pour tenir : bases de données filtrables, dates de rappel avec notification, vues calendrier, partage d'une page à un confrère pour feedback — sans une ligne de configuration.

Deuxièmement, séparer les lieux sépare les usages : Obsidian = le droit et les dossiers (lecture-écriture longue, liens de fond) ; Notion = l'exécution et le pilotage (cases, vues, rappels, calendriers). Un outil qui veut faire les deux finit par n'en faire aucun.

Troisièmement, une seule page d'entrée élimine la question la plus coûteuse pour un TDAH : « où avais-je noté ça ? ».
Si tu es tenté par un deuxième outil de suivi, relis la règle du fichier 02 : ce n'est presque jamais la qualité de l'outil qui tue les systèmes, c'est la friction de démarrage.

## 2. COMMENT : l'architecture de la page Learning OS

```
Page : LEARNING OS
 ├─ Tableau SPRINTS      (12 lignes : Sprint | Semaines | Statut | Livrable+lien | 3 takeaways | Prochain rappel)
 ├─ Tableau BIBLIOTHEQUE (Titre | Type | Statut vu/appliqué | 3 takeaways | Où appliqué | Sprint lié)
 ├─ Tableau NUMBERS      (Le chiffre clé | Source à jour | Date de vérif | Usage client)
 ├─ Tableau VEILLE       (Date | Source | 1 fait | 1 phrase client | Idée contenu | Sprint lié)
 └─ Vue HABIT TRACKER    (matrice Sprint S1-S12 × J1-J10, cases cochables)
```

Chaque tableau a une raison d'être pédagogique :

- **SPRINTS** porte l'engagement : la colonne « Prochain rappel » est une vraie date Notion avec notification — c'est elle qui transforme l'intention de répétition espacée en événement calendrier.
- **BIBLIOTHEQUE** combat le tutorial hell : un cours n'existe que si sa ligne « Où appliqué » est remplie. Sans application, la ligne reste en statut « vu » — et une vue filtrée affiche en haut de page le nombre de « vus sans appliqué », chiffre de honte productive.
- **NUMBERS** est le réflexe avocat : les chiffres qu'un client attend en trois secondes. Hésiter dessus coûte une place de confiance au diagnostic.
- **VEILLE** alimente directement le contenu LinkedIn/SEO : chaque fait de veille est stocké AVEC sa « phrase client », ce qui divise par quatre le coût de production d'un post.

## 3. EXEMPLE : le tableau NUMBERS rempli (version 2026, à re-vérifier chaque trimestre)

| Chiffre clé | Source | Usage client |
|---|---|---|
| Plafond AE : 200 000 DH (services) / 500 000 DH (commerce et vente) | Loi 114-13 + CGI art. 42 et s. | Yassine à ~600 000 DH/an offshore a DÉPASSÉ le plafond services : montage SARL-AU (5 500 DH HT + débours) |
| IS 2026 : tranches 20 % / 35 % / 40 % | CGI 2026 | Comparatif AE vs SARL-AU au diagnostic |
| TVA : taux normal 20 % | CGI 2026 | Facturation, calcul du net à encaisser d'un pack à 2 900 DH HT |
| Facturation : mentions obligatoires, référence au texte fiscal | CGI art. 145 | Gabarit de facture du sprint S4 |
| Facture électronique : calendrier de généralisation (IGOC 2026) | Réforme 2026 | Anticiper la bascule pour les clients e-commerce |
| Signature électronique : une signature électronique simple peut lier son auteur et garantir l'intégrité de l'acte, notamment entre professionnels | Loi 53-05 (échanges électroniques de données juridiques) | Réponse au client qui doute de Yousign — distinguer signature électronique et signature électronique certifiée |
| Sanctions 09-08 : les peines d'amende sont fixées par les art. 64 (de 10 000 à 100 000 DH) et 65 (volet pénal, jusqu'à 3 ans d'emprisonnement) de la loi 09-08 ; la CNDP ne publie pas de « sanctions numérotées » | Loi 09-08 | Phrase exacte à utiliser — ne JAMAIS citer de sanction type « 300 000 DH », qui n'existe nulle part |
| Convention d'honoraires : ancrage à l'art. 30 de la loi 28-08, texte refondu par la loi 66-23 (dahir 1-26-75 du 18 août 2026, BO 7536) — mention « ex-art. 30 » tant que la transposition n'est pas stabilisée | 28-08 / 66-23 | Le sprint S4 intègre ce drapeau de transposition dans le modèle de convention |

Ces lignes ne sont pas de l'apprentissage : ce sont des balles chargées. Le test de rétention du fichier 07 passe par ce tableau avant de passer par les cours.

## 4. COMMENT : le template Sprint à dupliquer (coller tel quel dans Notion)

```markdown
# Sprint [N] — [Compétence]
**Objectif (une phrase) :** À J10, je sais [X] sans notes ouvertes.
**Ressource principale :** [UNE URL — le reste est interdit]
**Timebox :** 10 jours × 30-45 min — créneaux déjà bloqués au calendrier
**Validation :** [critère binaire emprunté au fichier 02]

## Log J1-J10
| Jour | Input (20 m max) | Output du même jour | Coché |
|---|---|---|---|
| J1 | Doc officielle, section [X] | 3 bullets reformulés à la main | [ ] |
| J2 | Chapitre/écran suivant | Réglage concret sur le livrable réel | [ ] |

## 3 Takeaways finaux (vendredi J10, écrits de mémoire d'abord)
1.
2.
3.

## Livrable
[Lien Loom / Canva / Notion / URL publique]

## Feedback reçu
[Qui, quand, verbatim de la remarque utile]

## Rappels programmés
- J+3 (relecture enrichie) : date + notification
- J+7 (réexplication orale à un humain nommé) : date
- J+30 (recyclage en post LinkedIn) : vers la base VEILLE
```

## 5. COMMENT : les automatismes qui font le système (et non l'outil)

1. **Rappels créés à la volée :** la notification J+3 se pose PENDANT la séance, dans les 30 dernières secondes (bouton de fermeture du template) — jamais « ce soir », sinon la répétition espacée n'existe plus.
2. **Dashboard en tête de page :** trois compteurs suffisent — streak courant, sprints Done /12, « vus sans appliqué ». Au-delà, la vue ne sera pas tenue (fichier 07).
3. **Revue du dimanche (30 min, sacrée) :** vider la VEILLE en idées de contenu datées, mettre à jour le board, vérifier les rappels de la semaine entrante. C'est l'équivalent apprentissage du « weekly review » que Newport recommande pour ne pas laisser le calendrier décider seul.
4. **Partage lecture seule au confrère-valideur :** le feedback se fait en commentaire direct sur la page Livrable — une boucle humaine, pas une capture d'écran envoyée sur WhatsApp et perdue.

## 6. Bonnes pratiques de structure (les erreurs qui tuent le board au sprint 4)

- **Ne pas sur-typer :** trois statuts suffisent — « Pas commencé / En cours / Done ». Une colonne par nuance d'humeur est une colonne qui ne sera pas mise à jour.
- **Une seule vue par usage :** vue « Cette semaine » (filtrée sur les dates) en haut, vue « Tout » en bas. Jamais quatre vues qui se contredisent.
- **Les notifications par e-mail et mobile, pas seulement in-app :** ce qui ne sonne pas n'existe pas — règle zéro notifiable, zéro rappel.
- **Ne pas attendre l'inspiration de mise en page :** la page doit ressembler à un tableau de bord de chantier, pas à un moodboard ; le temps esthétique se puise dans le sprint Canva, pas ici.

## 7. EXEMPLE : une page Sprint remplie (S3 — Canva)

> **Objectif :** à J10, produire un carrousel 8 slides conforme au Brand Kit sans tutoriel ouvert.
> **Validation :** carrousel posté + avis écrit d'un confrère.
> **Takeaways :** 1) deux polices maximum et une seule famille de tons — la sobriété fait barreau, la fantaisie fait flyer de promo ; 2) un carrousel se lit sur mobile en trois secondes par slide : une idée, six mots ; 3) l'export PNG garde la lisibilité, le PDF se dégrade dans LinkedIn.
> **Livrable :** carrousel « Loi 09-08 : 5 obligations que ton site e-commerce viole sans le savoir » (8 slides).
> **Feedback :** confrère — « la slide 3 est la bonne, les autres sont surchargées ».
> **Appliqué :** plaquette du cabinet v2, envoyée à trois prospects dont le dossier de création SARL-AU de la semaine suivante.

## 8. Et si tu ne fais pas Notion ?

Le système n'est pas Notion-dépendant, il est externalisation-dépendante.
À défaut (choix assumé, à documenter), l'équivalent minimal est : un dossier Obsidian « Learning » avec un fichier par sprint (mêmes rubriques que le template ci-dessus), un fichier-rappel par date ajouté à la routine du soir, et une feuille A4 de tracker au mur. Ce qui est non négociable tient en trois fonctions : un seul point d'entrée, des dates de rappel qui sonnent, un compteur de streak visible.

> **Lecture pro :** construis cette page une seule fois, en 45 minutes chrono un dimanche soir ; ensuite tu ne fais plus que dupliquer le template — c'est cette asymétrie (une fois vs tout le temps) qui rend le système supportable pour un TDAH.

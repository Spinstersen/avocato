# Suivi post-atelier : J+1, J+7, et la conversion mesurée

> L'atelier sans suivi est une conférence : sympathique et sans lendemain.
> La valeur d'acquisition de l'atelier se joue dans les 7 jours qui suivent — avec une seule règle : la sobriété.
> Le suivi informe, il ne relance pas à froid comme un commercial.

## POURQUOI le suivi est la moitié de l'atelier

- La décision d'un entrepreneur se prend rarement en salle : elle se prend le soir, dans le PDF relu à la cuisine, ou trois semaines plus tard au premier accident.
Le suivi est présent à ces deux moments. - Sans trace écrite, la participation s'évapore : le J+1 transforme « j'étais à l'atelier » en « j'ai le document de l'atelier » — l'objet reste, l'émotion non.
- Le pipeline doit être mesurable : sans tag CRM « atelier », jamais vous ne saurez si le canal produit, et vous reconduirez un atelier à perte ou à tort ([[07_Metriques_NPS]] pour la satisfaction, ce fichier pour la conversion).

## COMMENT : l'email J+1 (envoyé le lendemain avant midi)

Objet : `Votre PDF de l'atelier [sujet] — [ville, date]`

> Bonjour [Prénom],
> Merci pour votre participation à l'atelier « [sujet] » hier — vos questions ont nourri la session, notamment sur [point réellement abordé, une ligne personnalisée par destinataire si l'effectif le permet].
> Vous trouverez en pièce jointe le PDF complet (10 pages) avec la grille méthodologique en page 3 — c'est le support dont je vous ai parlé en fin de session, il est fait pour être réutilisé sans moi.
> Une ressource supplémentaire, gratuite également : notre article « [article du blog lié au sujet] », qui approfondit le point que nous n'avions pas le temps de traiter.
> Enfin, comme annoncé : le diagnostic de groupe offert aux cinq premiers retours « diagnostic » est encore ouvert à [X] places — et si votre question appelle un avis sur votre dossier, le cadre reste le même qu'hier : on en parle en privé, pas par email, et sans engagement.
>
> Bien à vous,
> [Maître X] — [Cabinet] — [téléphone]

Règles de rédaction (conformes à `06_French_Communication_With_Clients`) : pas de « cher partenaire », pas de pièce jointe de 40 Mo, un seul lien cliquable, signature sobre avec le barreau.
Le PDF est envoyé en pièce jointe (et non par lien expirant type WeTransfer : la salle est hétérogène techniquement).

## COMMENT : le passage en CRM Notion

Chaque participant ayant laissé son email est créé ou mis à jour dans la base `PROSPECTS` (cf. la structure Notion du Cabinet OS) avec :

| Champ | Valeur atelier |
|---|---|
| Source | `atelier` (+ nom et date de l'atelier en sous-tag) |
| Statut | `froid-atelier` puis `diagnostic` si réponse |
| Dernière interaction | date de J+1 |
| Consentement | opt-in newsletter coché ou non (voir plus bas) |
Collecte et usage de ces adresses = traitement de données personnelles : la notice d'information courte loi 09-08 affichée en salle à l'émargement doit couvrir l'usage « suivi de l'atelier » ; l'email commercial ultérieur (newsletter) suppose un consentement distinct, recueilli par case à cocher sur la feuille ou le formulaire ([[10_Checklist_Orga_15j]] ; rappel complet dans `02_Niches_Deep_Dive/03_Loi_09-08_GDPR_Compliance`).

## COMMENT : la relance J+7 (une seule, sobre)

Objet : `[Prénom], un complément sur [sujet précis de l'atelier]`

> Bonjour [Prénom],
>
> En préparant l'atelier de la semaine dernière, un point m'a marqué dans vos questions : [reformulation courte d'un thème réel].
> Nous avons publié entre-temps un article qui traite exactement ce cas : [lien].
>
> Pas de relance commerciale derrière ce message — si le sujet vous reprend, l'email de réponse au PDF J+1 reste ouvert.
>
> Bien à vous,
> [Maître X]

Pourquoi « une seule » : deux relances non sollicitées après un événement gratuit transforment la générosité de l'atelier en prospection — et la liste se souviendra de la sensation, pas du contenu.
Après J+7, le contact passe en nurturing long (newsletter mensuelle, article LinkedIn tagué), plus en séquence atelier.

## COMMENT mesurer la conversion

Le tunnel atelier, avec les compteurs à faire tourner par session :

```
Participants physiques
→ Emails collectés (J+0)
→ Taux d'ouverture / clics (J+1)
→ Demandes « diagnostic » (J+1 à J+30)
→ Diagnostics réalisés (900 DH HT)
→ Missions signées (2 900 / 5 900 / 12 000)
```
- Hypothèse de travail du vault (à valider, jamais un fait publié) : **1 mission signée pour 15 à 25 participants**, soit un coût d'acquisition proche de zéro en cash mais 1 à 2 jours de travail par session.
- Seuil de décision d'arrêter un format : moins de 2 demandes de diagnostic sur 3 sessions consécutives avec 20+ participants — estimation interne à discuter chaque trimestre, pas une loi.
- Tenir la feuille dans Notion `ATELIERS > Métriques` : date, lieu, sujets, participants, emails, diagnostics, missions — c'est ce tableur de 6 colonnes qui autorise l'arbitrage « on continue les chambers de commerce ou les universités ? » ([[09_Arbre_Choix_Sujet]]).

## EXEMPLE : [cas illustratif] la conversion à J+40

Atelier « contrats de prestation » dans un coworking de Casablanca, 19 participants, 14 emails.
J+1 : 11 ouvertures, 2 réponses « diagnostic » (dont une pour le diagnostic de groupe).
J+7 : 1 clic, 0 réponse.
Un participant, développeur freelance, ouvre le PDF mais ne répond jamais — il rappelle **six semaines plus tard**, au premier client qui conteste sa facture : mission pack Essential 2 900 DH HT signée en J+8 de cet appel, devenue plus tard un retainer Starter 2 500 DH HT/mois.
Ce qui est mesurable ici : la source CRM « atelier » a produit la mission ; ce qui ne l'est pas : le rôle exact du PDF.
D'où la règle : taguer la source systématiquement, ne jamais sur-attribuer un closing à un email.

## L'erreur brouillon : le SMS de groupe

Le WhatsApp/SMS de groupe « merci à tous, voici mon offre » le soir même : c'est le raccourci qui a tué plus d'un canal atelier — perçu comme une collecte de numéros pour vente, il contredit en une phrase toute la posture « je ne vends rien » construite pendant 60 minutes ([[01_Anatomie_Atelier_60]], [[08_Erreurs_Public_Speaking]]).

## COMMENT brancher l'atelier sur le calendrier éditorial

Le meilleur suivi n'est pas une relance, c'est une publication qui tombe au bon moment :

| Signal de l'atelier | Réponse éditoriale en J+3 à J+10 |
|---|---|
| Question récurrente en Q&A (ex. IGOC) | Article du mois qui traite exactement cette question, envoyé aux participants |
| Cas anonymisé réussi en salle | Version courte « cas pratique » (1-vers-5, cf. `09_SEO_Content_Engine`) |
| Public étudiant ou sectoriel spécifique | Un post LinkedIn « ce que nous avons appris de la salle » (sans données personnelles — les témoignages exigent l'écrit, cf. [[10_Checklist_Orga_15j]]) |

## FAQ du suivi

**Et si la liste d'émargement est petite (moins de 10 emails) ?** Le J+1 se personnalise : une ligne dédiée par destinataire, 10 minutes de travail, conversion attendue bien meilleure qu'en masse.
**Peut-on appeler les participants plutôt qu'écrire ?** Non le premier mois : l'appel « post-gratuit » est perçu comme de la prospection ; l'email reste, le téléphone vient en réponse à UNE demande. Exception : le participant qui a levé la main pour une vraie question technique en salle — là, l'appel J+2 est un service, et il est traçé comme tel dans le CRM.
**Le diagnostic de groupe offert aux 5 emails : comment le tenir ?** Créneau visio de 45 minutes, 5 personnes maximum, trois dossiers anonymisés choisis par le cabinet — l'objectif est de montrer la méthode en action, pas de déballer les dossiers. Tenir la promesse est le meilleur argument des ateliers suivants.

## Plan d'action 30 jours

- Semaine 1 : envoyer le J+1 de la dernière session (modèle ci-dessus) si cela n'a pas été fait — un retard de suivi se rattrape en sobriété, jamais en excuse.
- Semaine 2 : créer/mettre à jour le tag CRM `atelier` dans la base PROSPECTS et la table ATELIERS > Métriques.
- Semaine 3 : publier le recyclage article lié à la dernière Q&A la plus fréquente.
- Semaine 4 : calculer le premier taux de conversion réel (participants → diagnostics → missions) et le comparer à l'hypothèse 1/15-25 — c'est à partir de ce seul chiffre que le canal est confirmé ou re-designé.

> **Lecture pro :** J+1 sobre, J+7 une fois, ensuite la newsletter fait le travail.
> Le suivi post-atelier se juge sur un seul indicateur : est-ce que le participant a l'impression d'avoir reçu quelque chose — pas d'avoir été relancé.
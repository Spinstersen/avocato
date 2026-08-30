# 13 — Pipeline CRM hebdo : la revue de 20 minutes chaque lundi

> **À quoi ça sert :** transformer la base Notion `PROSPECTS` d'un cimetière de lignes en instrument de décision — une revue de 20 minutes chrono, chaque lundi, avec un scoring 0-10 aux barèmes écrits, cinq états de pipeline, des alertes mécaniques et une règle d'hygiène adaptée au cerveau TDAH : **le lundi matin, on ne vend pas, on nettoie.** **Pour qui :** l'avocat solo dont le chiffre d'affaires meurt moins d'objections que d'oublis — le dossier 03 a déjà les scripts (`02`, `06`, `12`) ; ici on ne parle que de la MACHINE qui fait qu'aucun prospect ne dort sans next touch daté. Temps de lecture : 12 minutes.

## POURQUOI une revue hebdomadaire fermée

Sans rituel, deux dérives symétriques apparaissent dans toutes les CRM de solos :

- le **panique-rattrapage** : un lundi sans RDV, on relance six prospects d'un coup — harcèlement potentiel, violation de la séquence 7 touches du fichier `06_Suivi_Relance_7_Touches.md` ;
- le **triage émotionnel** : on ne rappelle que les prospects sympathiques, on oublie les dossiers rentables mais froids.

La revue du lundi tranche les deux : elle décide À LA PLACE de l'humeur de la semaine, sur des critères écrits à l'avance. Vingt minutes, pas une de plus : une revue qui dure devient un hobby et le pipeline se vide quand même — l'ennemi n'est pas le manque de temps, c'est l'absence de borne.

Le cadre déontologique reste celui du dossier : pipeline = **suivi de demandes entrantes et de devis envoyés**, jamais une liste de prospection. La sollicitation individuelle est interdite (loi 66-23, dahir n° 1-26-75, BO n° 7536, 18/08/2026 — numéros d'articles en transposition).

## COMMENT — l'écran Notion `PROSPECTS` (structure minimale de la revue)

La revue ne se fait pas dans la tête ni sur un export : la base `PROSPECTS` porte exactement les champs que les 20 minutes consomment — ni plus (chacun est une case à remplir, donc une revue qui déraille).

| Champ | Type | Rôle dans la revue |
|---|---|---|
| Nom / Structure | titre | identité de la ligne |
| Source | select (article / atelier / referral / LinkedIn) | nourrit le fichier `07_Metriques_Taux_Conversion.md` |
| État | select E1-E5 | la machine à états ci-dessus |
| Score | number 0-10 | recalculé le lundi, jamais à chaud |
| Next touch | date | **le champ vital** : vide = alerte 1 |
| Prochaine action | texte 1 ligne | ce que la revue a décidé |
| Canal autorisé | select (mail / mail+WhatsApp) | règle de la fiche 06, rempli à l'entrée |
| Consentement | checkbox | 09-08, distinct de l'adresse collectée |
| Motif clos | select (prix / timing / confrère / silence / inéligible) | la matière des statistiques |

Vue de travail du lundi : filtrer `État ≠ signé/clos`, trier par `Next touch` croissant, masquer tout le reste. Vingt minutes sur CETTE vue — pas sur la base entière : ce que l'œil ne filtre pas, l'avocat le survole, et survoler un pipeline c'est ne pas le revoir.

## COMMENT — les 5 états du pipeline (une ligne = un seul état)

| État | Définition stricte | Ce qui prouve l'état |
|---|---|---|
| E1 `intake` | Demande entrante reçue (formulaire, DM, referral), pas encore qualifiée | Date + source (champ Source) |
| E2 `diagnostic réservé` | Créneau Calendly posé + diagnostic 900 DH HT annoncé | Lien de réservation + date |
| E3 `note livrée` | Appel tenu, note de risques + 2 options envoyées sous 24 h | PDF dans la ligne Notion |
| E4 `proposition envoyée` | Convention/devis envoyé, séquence 7 touches active (fichier 06) | Date d'envoi + prochaine touche due |
| E5 `signé / clos` | Provision encaissée (50 % à la signature — ex-art. 32, flag transposition) OU dossier fermé proprement | Reçu virement OU motif de clos |

Règle d'état : un prospect qui dit « plus tard » ne change PAS d'état — il passe en pause dans son état courant (fichier 06, cas 3). Et tout clos reste dans la base avec son motif : les motifs de « non » sont la matière première du fichier `07_Metriques_Taux_Conversion.md`.

## COMMENT — le scoring 0-10, barèmes écrits

Quatre critères, 0 à 2,5 points chacun — la note se calcule, elle ne se « sent » pas.

| Critère | 0 pt | 1 pt | 2 pt | 2,5 pts |
|---|---|---|---|---|
| **Urgence datée** | pas d'échéance | échéance floue (« cette année ») | échéance < 90 j (dépassement AE, opposition marque, redressement) | échéance < 30 j |
| **Risque chiffrable** | non chiffrable en RDV | fourchette lointaine | fourchette sourcée (Numbers Sheet) | risque ≥ plusieurs dizaines de kDH (ex. seuil change, requalification) |
| **Capacité à payer signalée** | aucun signal | client final étranger sans détail | CA déclaré cohérent avec un pack 2 900-5 900 | CA et structure (ex. Yassine, ~600 000 DH/an offshore : la bascule SARL-AU est un projet à 5 500 DH HT + débours, pas à 2 900) |
| **Décideur & dynamique** | injoignable, intermédiaire | joignable, décision collégiale floue | décideur direct, questions précises | décideur direct AVEC next touch daté |

**Barème d'usage :** 7-10 = priorité A (rappeler cette semaine, créer le créneau lundi matin pendant le nettoyage) ; 4-6 = nurturing (touches du fichier 06, contenu) ; 0-3 = ne consomme AUCUN temps commercial cette semaine. Le score se recale à chaque revue, pas à chaque intuition — et une ligne sans score est une ligne malade : la revue n'existe pas pour les notes, elle existe pour les trancher.

## COMMENT — les alertes mécaniques (rouges dès lundi)

1. **Aucun next touch daté** sur une ligne E2-E4 → **mort en puissance** : c'est l'alerte reine. Un prospect sans date n'est pas « en cours », il est en perdition ; soit tu poses la date (touche du fichier 06), soit tu fermes en E5 « clos » avec motif.
2. **Diagnostic réservé sans appel tenu sous 14 jours** : la date a glissé deux fois — appeler pour reprogrammer OU annuler la ligne ; un agenda qui glisse tout seul prend la place de celui qui travaille.
3. **Note livrée (E3) depuis > 7 jours sans réponse** : basculer la séquence (J+3/J+7 du fichier 06) et re-scoring — le silence est une donnée, pas un sentiment.
4. **Proposition (E4) sans nouvelle à J+21** : la touche « fermeture propre » est DUE — on classe, on annonce, on ouvre la porte ; ce n'est pas perdre le prospect, c'est arrêter de le harceler et le respecter assez pour lui rendre son dossier.
5. **Deux lignes E4 même semaine au même stade de relance** : normal ; **quatre** : tu accumules des devis que tu n'assumes pas — problème de capacité, pas de pipeline.

## COMMENT — traiter un « je réfléchis » (au-delà de la relance J+7)

« Je réfléchis » n'est jamais une objection prix — c'est un chiffon sous lequel dort une autre phrase. En revue, la règle : **une ligne « je réfléchis » ne se relance pas, elle se déconde.** Trois questions écrites sur la ligne Notion : (1) réfléchit-il sur QUOI — le prix, le timing, le besoin réel, ou un tiers (conjoint, associé) ? (2) quel chiffre n'a-t-il pas validé dans la note ? (3) quel reframe du fichier `04_Objections_15_Reframes.md` correspond (les reframes « c'est cher » et « je dois en parler » sont des objets distincts) ? Puis UNE action : appel de 10 minutes proposé, ou pièce manquante à la note (un chiffre à sourcer, une option à chiffrer) — la relance J+7 du fichier 06 est le RYTHME, le décodage est le CONTENU ; sans décodage, la septième touche est une huitième touche déguisée. Si au bout du décodage le prospect veut du temps : statut pause, date de reprise à +90 j, et on en reparle — la séquence « je garde la ligne ouverte sans rien envoyer » est la seule forme de relance qui ne coûte rien en crédibilité.

## COMMENT — ce que la revue ne fait PAS

- Elle ne rédige aucun message : la revue DÉCIDE, l'exécution a son moment (après-midi, ou vendredi pour les touches programmées).
- Elle ne crée pas de prospect : l'entrée se fait par l'intake (formulaire, referral, atelier tagué) — pas par l'achat de listes, qui n'existe pas dans ce pipeline (ni nulle part licitement en sollicitation individuelle).
- Elle ne juge pas la semaine passée : elle prépare la suivante ; les compteurs, c'est le vendredi du fichier `07_Metriques_Taux_Conversion.md`.

## COMMENT — la règle d'hygiène TDAH : le lundi n'est pas pour vendre

Le cerveau TDAH vend mal le lundi matin : il cherche la dopamine de la réponse immédiate, survend aux sympathiques, esquive les lignes froides. La règle est donc structurelle, pas motivationnelle :

1. **08h30-08h50 (20 min chrono, minuteur visible)** : revue seule. Ordre fixe : alertes 1-5 → re-scoring des lignes touchées la semaine → calcul de la liste A de la semaine. Zéro envoi de message commercial pendant ces 20 minutes — on nettoie, on ne vend pas.
2. **08h50-09h00** : les envois mécaniques dus (relances programmées fichier 06) sont exécutés SANS être modifiés ni « améliorés » — la séquence écrite bat l'humeur du matin.
3. **Les appels de vente se placent l'après-midi** (diagnostics, relances décodées) : l'énergie de conviction a un terrain, la discipline de revue a eu le sien.
4. **Vendredi (10 min, fichier 07)** : on note les motifs de clos et les conversions — la revue du lundi consomme ces données, elle ne les produit pas.

## EXEMPLE — la revue du lundi sur 6 lignes réelles du cabinet [cas illustratifs]

| Ligne | État | Score | Décision de la revue (2 min) |
|---|---|---|---|
| Yassine, dev offshore ~600 kDH | E4 proposition envoyée | 8,5 (urgence : radiation AE au 1er janvier si 2 ans de dépassement — CGI ; décideur direct) | A : appel mardi, reframe « je dois en parler à mon comptable » → option SARL-AU chiffrée |
| Fatima, e-commerce 30 k DH/mois | E3 note livrée J+9 sans réponse | 6 (risque 09-08 sourcé : art. 64, 10 000-100 000 DH ; mais pas de date) | B : J+3 touche valeur (article formalités CNDP), pas de relance prix |
| Karim, MRE Paris, SARL-AU à créer | E2 réservé, créneau glissé 2 fois | 5 (décideur direct, échéance « avant l'été » floue) | Alerte 3 : reprogrammer OU annuler la ligne vendredi |
| Ancelin (referral) « je réfléchis » | E4, J+12 | 4 | Décodage : pas de tiers identifié, pas de chiffre contesté → proposition de 10 min ; pas de 8e touche |
| prospect atelier, email seul | E1, 6 semaines sans next touch | 2 | **Mort en puissance** → J+21 fermeture propre ou classement ; la ligne dort mieux close qu'ouverte |
| agence conseil, demande « au cas où » | E1 | 1 | Aucune action cette semaine : score < 4, interdiction de temps commercial |

Six lignes, dix-huit minutes, une semaine décidée. C'est tout ce que demande le rituel.

## Erreurs d'application

1. **Revue « quand j'ai le temps »** : c'est un rendez-vous client — avec toi-même, bloqué dans le calendrier, reportable une fois par trimestre maximum.
2. **Scorer au feeling puis défendre le score** : le barème existe parce que l'intuition se trompe en faveur des prospects sympathiques et contre les dossiers urgents ; si le score dérange, on change le barème en revue mensuelle, jamais la ligne.
3. **Remonter les touches en période creuse** : le pipeline plein de « presque signés » est le meilleur indicateur du vide qui vient — en creux, on produit du contenu (dossier 09) et on déconde, on n'accélère pas la séquence.
4. **Supprimer les clos** : sans motifs de « non » dans la base, le fichier 07 ne mesure rien et la revue du lundi tourne à la décoration.

> **Lecture pro :** la CRM n'est pas un tableau de bord, c'est un contrat avec toi-même : chaque ligne a un état, un score calculé et une prochaine date — ou elle est morte proprement. Vingt minutes le lundi achètent la seule chose que l'acquisition ne peut pas fabriquer : qu'aucun dossier gagné en confiance ne se perde ensuite en oubli.

# 12 — Workflows IA par Type de Mission : cinq chaînes de travail complètes

> **À quoi ça sert :** dépasser le prompt unitaire. La bibliothèque `02_Prompt_Library_30.md` donne les briques (P1-P30) ; cette fiche donne les **chaînes** — cinq enchaînements bout-en-bout qui couvrent l'essentiel de la production du cabinet : préparation de diagnostic, première passe de contrat, veille juridique, note de synthèse, mémoire de clôture. Chaque chaîne comporte ses étapes, ses prompts de référence, un **point de contrôle humain obligatoire** (la règle des 3 V, fiche 01) et un temps gagné explicitement signalé comme estimation. **Pour qui :** l'avocat qui maîtrise déjà les prompts unitaires et veut les enchaîner sans jamais perdre la validation. Temps de lecture : 20 minutes.

## POURQUOI des chaînes et pas des prompts

Un prompt isolé accélère une phrase ; une chaîne accélère une mission. Mais une chaîne multiplie aussi les points de fuite : si chaque maillon est validé séparément, personne ne valide l'ensemble — et c'est l'enchaînement qui produit le livrable signé. D'où la loi de cette fiche : **chaque chaîne a un point de contrôle humain non négociable, placé avant la sortie du bureau**, jamais après.

Le second intérêt est documentaire : une chaîne écrite, c'est un SOP (fiche 11, cycle QA) — on sait quelle sortie vient de quel prompt, donc on sait quoi rejouer quand une référence tombe. Le troisième est formateur : un stagiaire ou un confrère n'adopte pas l'IA par des prompts, il l'adopte en voyant EN ORDRE les gestes de celui qui l'utilise déjà bien.

Rappel du socle (fiche 01) : **V1** vérifier chaque référence sur source primaire (sgg.gov.ma, jep.ma, cndp.ma), **V2** valider par l'avocat qui signe, **V3** vocabulaire anonymisé avant tout envoi (protocole fiche 03, niveaux 1-4). Les temps gagnés ci-dessous sont des **estimations internes de charge, à confronter à ton propre journal de temps (fiche 09)** — jamais des garanties.

## COMMENT — les 4 primitives de toute chaîne

Toutes les chaînes ci-dessous reviennent aux mêmes quatre briques ; les reconnaître évite d'en réinventer une cinquième :

1. **Tête de session** : P25 toujours collé en premier — le garde-fou anti-invention conditionne toute la sortie qui suit (fiche 02).
2. **Matériau anonymisé collé** : jamais « souviens-toi du dossier » — le texte source entre dans la conversation à chaque maillon (fiche 03).
3. **Un maillon de transformation par prompt** : résumer, extraire, structurer, traduire — une fonction par fil (règle d'usage fiche 02).
4. **Checkpoint de sortie** : Fiche B (dès que la sortie arrive) + Fiche C (avant publication ou remise client) de la fiche 11 — c'est le 3 V matérialisé, et il ne se délègue à aucun prompt, pas même P26.

## COMMENT — Workflow A : Préparation de diagnostic (avant l'appel à 900 DH HT)

| Étape | Action | Prompt / fiche | Sortie |
|---|---|---|---|
| A1 | Contexte de session | P25 en tête, puis coller la fiche intake **anonymisée** (protocole fiche 03) | session ouverte |
| A2 | Résumé d'entrée | P10 : résumer l'intake en 5 puces + 1 phrase | carte des faits |
| A3 | Questionnement | P6 : regrouper les questions du prospect en thèmes, puis toi : les passer dans les 7 catégories d'issue-spotting (`07_Sharp_Legal_Mind/01_Issue_Spotting.md`) | liste de questions de l'appel |

**Point de contrôle 3 V (obligatoire) :** relire la sortie A2 à la main — les puces doivent correspondre aux faits de l'intake, zéro ajout. Vérifier que le texte collé a passé le test de recoupement (fiche 03, étape 5) : « Yassine, dev offshore, 600 000 DH/an au-delà du plafond AE services » devient « [CLIENT A], freelance du numérique, CA entre 500 et 700 kDH » avant toute chose.
**Temps gagné :** [estimation signalée] 20-30 min par diagnostic préparé — à valider sur 5 diagnostics réels.

## COMMENT — Workflow B : Première passe de contrat entrant

1. **Anonymisation intégrale** du contrat reçu (fiche 03) — nom des parties, identifiants, montants exacts → fourchettes. Sans cette étape, la chaîne ne démarre pas.
2. **Extraction** : P8 (obligations, limites de responsabilité, résiliation, loi applicable — « absent » si absent, jamais de déduction), puis P17 pour la cohérence interne.
3. **Draft d'appui uniquement** : P15 pour des variantes de clauses (marquées [DRAFT]), P30 pour la traduction FR/EN d'un passage — la clause signable se rédige sous ta plume (fiche 01, liste « hostile »).
4. **Checklist de relecture avocat** : la Fiche B + la grille de scan 30 minutes (`07_Sharp_Legal_Mind/12_Lecture_Rapide_Contrats_25_Red_Flags.md`) passées sur le contrat réel, pas sur le résumé IA.
5. **Note client** : P21 (expliquer la révision en 200 mots) + P19 si une note Loom accompagne la livraison (`01_Legal_Tech_Stack/05_Loom_Video_Client.md`).

**Point de contrôle 3 V :** l'email de sortie (étape 5) est relu intégralement par toi, hors IA ; la mention « aucune garantie de résultat » et la base de facturation (CGI art. 145) sont vérifiées sur la convention — pas dans le résumé.
**Temps gagné :** [estimation signalée] 45-60 min sur un contrat de 10-15 pages (extraction + note client) ; la relecture juridique elle-même ne se délègue pas et ne gagne rien.

## COMMENT — Workflow C : Veille juridique → post LinkedIn

1. **Résumé** : coller le texte officiel depuis la source (jamais de mémoire) → P29 en 150 mots, obligations et échéances en tête.
2. **Impact niches** : à la main, une ligne par niche (`02_Niches_Deep_Dive/`) : Fatima (e-commerce 30 000 DH/mois, loi 09-08), Yassine (offshore, changes), Karim (MRE, IGOC) — ce que le texte change, ou « rien » si rien ne change.
3. **Post** : P1 sur la base de tes lignes d'impact ; le post cite le texte **sans numéro d'article précis** — les numéros, tu les ajoutes après ouverture de la source.

**Point de contrôle 3 V :** V1 sur chaque référence du post (ouvrir sgg.gov.ma/BO du jour) ; V2 = tu es l'auteur du fond, l'IA n'a que la mise en forme ; V3 = aucune donnée client même anonymisée dans un post (le test de recoupement se refait sur la sortie, Fiche C fiche 11).
**Temps gagné :** [estimation signalée] 25-40 min par cycle de veille publié. La veille non publiée (brouillon de cabinet) : ~15 min.

## COMMENT — Workflow D : Note de synthèse 2 pages

1. **Sourçage d'abord** : rassembler textes et décisions, puis P11 sur chaque source → la liste des références citées avec localisation ; P12 pour préparer la recherche jep.ma. C'est TA liste de vérification, dressée avant toute rédaction.
2. **Plan** : P14 — charpente SCQA à partir de tes notes brutes ; l'IA structure, ne rédige pas le fond juridique (garde-fou du prompt lui-même).
3. **Rédaction** sous ta plume, puis P17 (cohérence interne : renvois, dates, montants).
4. **Vérification des citations, ligne à ligne** : chaque référence de la note est retrouvée dans la liste P11, ouverte sur la source primaire, recopiée si besoin.

**Point de contrôle 3 V (double) :** V1 à l'étape 4, exhaustive ; V2 à la signature de la note ; V3 au moment de coller tes notes brutes dans P14 (protocole fiche 03). Une note livrée sans que l'étape 4 soit cochée n'est pas livrée.
**Temps gagné :** [estimation signalée] 30-45 min sur les étapes 1-2-3 ; l'étape 4 (vérification) est du temps **ajouté volontairement** — c'est le prix de la signature.

## COMMENT — Workflow E : Mémoire de clôture client

1. **Matériau** : P18 sur tes notes de réunions de mission (décisions numérotées, actions, porteurs) + inventaire des livrables remis.
2. **Suite de vie** : P20 — les 10 questions que le client se posera dans les 6 mois, chacune marquée de la mention « à vérifier avec l'avocat » (garde-fou du prompt P20 lui-même) ; P24 pour le formulaire Tally de feedback (referral sans incitation).
3. **Assemblage** : le mémoire final (facts, réponses, livrables, échéances restantes) se relit intégralement comme un acte — parce que c'en est un : c'est l'écrit qui clôt la convention (loi 66-23, ex-art. 30 ; numéros en transposition).

**Point de contrôle 3 V :** relecture complète hors IA avant envoi ; vérification que les échéances rappelées (rapatriement 90 j services, opposition marque 2 mois — `07_Sharp_Legal_Mind/03_Numbers_Sheet.md`) sont justes À LA DATE D'ENVOI, pas à la date de rédaction du brouillon.
**Temps gagné :** [estimation signalée] 40-60 min par clôture ; le mémoire bien fait est aussi la meilleure machine à referrals du cabinet (fiche 06 du dossier 03/).

## COMMENT — les chaînes qu'on n'écrit PAS (liste hostile)

Trois enchaînements tentants sont exclus par la fiche 01 (arbre fiche 10) et n'existeront jamais dans ce dossier :

- **Consultation de bout en bout** : intake → P14 → rédaction → envoi signé, sans que l'avocat n'ouvre la source primaire — la chaîne saute le checkpoint V1 ; c'est un Mata v. Avianca industrialisé (fiche 06).
- **Recherche jurisprudence automatique** : P12 sans jep.ma, c'est-à-dire demander à un générateur de texte ce que contient une base de décisions — hors périmètre, définitivement.
- **Plaidoirie ou mémoire contentieux co-rédigé** : le niveau 4 du matériau (pièces d'audience, identifiants d'audience) ne va pas en cloud, et l'écrit d'audience engage l'avocat dans un lieu où nul brouillon ne l'accompagne.

Une chaîne qui ne peut pas écrire son checkpoint en une ligne n'est pas une chaîne : c'est une habitude.

## EXEMPLE — la chaîne B sur le MSA de Yassine [cas illustratif]

Contrat EN de 14 pages d'un client US reçu un mardi. Anonymisation (10 min, fiche 03) → P8 : extraction en tableau, 4 limitations de responsabilité, « deemed assigned upon creation » signalé — P17 : 2 dates incohérentes entre corps et annexe → ta grille de scan (fiche 12 du dossier 07/, 30 min chrono) : 3 signaux rouges, dont cession des droits avant paiement (loi 2-00 mod. 34-05 : cession écrite, droit par droit) → P15 : trois variantes de clause de cession [DRAFT], que tu réécris → P21 + P19 : note client de 200 mots et Loom de 3 min. Total déclaré à Yassine : livraison sous 5 jours. Charge réelle : environ [estimation signalée] 2 h 30 dont 1 h 30 de travail humain non délégable — si la chaîne te faisait gagner là-dessus, il faudrait s'inquiéter, pas se féliciter.

## Erreurs d'application

1. **Enchaîner sans checkpoint** : trois sorties validées séparément ne valident jamais la chaîne ; le contrôle se place sur le LIVRABLE final, pas sur les intermédiaires.
2. **Réanonymiser à chaque maillon** : l'anonymisation se fait UNE fois à l'entrée (fiche 03), puis tout le chaîne travaille sur le texte anonymisé — sinon on refait le contrôle six fois, mal.
3. **Confondre vitesse de la chaîne et vitesse de la signature** : le goulot légitime est l'étape humaine ; vouloir le réduire est la faute, pas l'accélération des maillons IA.
4. **Journaliser seulement les prompts** : c'est la CHAÎNE qu'on note (quelle mission, quels maillons, quels incidents) — matière de la revue mensuelle, fiche 11 (Fiche E) et P27.

## Les cinq chaînes en une page (à épingler)

```
A DIAGNOSTIC   : P25 → intake anonymisé → P10 → P6 → [3 V]          ~25 min gagnés [est.]
B CONTRAT      : ano. → P8 + P17 → P15/P30 [DRAFT] → grille → P21+P19 → [3 V]  ~50 min [est.]
C VEILLE       : texte source collé → P29 → impact niches (main) → P1 → [V1]   ~30 min [est.]
D NOTE 2 PAGES : P11/P12 (sourçage) → P14 (plan) → plume → P17 → [3 V complet] ~35 min [est.]
E CLÔTURE      : P18 → P20 + P24 → assemblage main → [3 V à la date d'envoi]  ~50 min [est.]
```

Lecture du bloc : le crochet final est toujours humain ; les minutes « gagnées » sont toujours en amont de lui.

> **Lecture pro :** une chaîne vaut ce que vaut son maillon le moins vérifié — et dans les cinq chaînes de cette fiche, le maillon le moins vérifié est toujours celui où tu as été le plus pressé. Écris-les sur papier, place le checkpoint en gras, et refuse d'accélérer une chaîne en sautant un contrôle : c'est le seul gain que ce dossier ne t'accorde pas.

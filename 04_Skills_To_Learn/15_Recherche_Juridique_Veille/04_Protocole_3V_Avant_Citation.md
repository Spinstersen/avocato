# 04 — Protocole 3V avant citation : vérifier, valider, dativer

> **À quoi ça sert :** la règle d'or du vault formalisée en un protocole exécutable en moins de vingt minutes
> par citation : **V**érifier le texte à la source primaire, **V**alider la numérotation (abrogée ? modifiée ?),
> **V**érifier la date d'application. Avec la liste des interdits absolus issus de l'audit 2026.
> Temps de lecture : 9 minutes.

## 1. POURQUOI : trois jurisprudences fictives = un audit complet à refaire

Le coût d'une citation non vérifiée n'est pas théorique. L'audit du 28-29/08/2026 a découvert que
**trois « jurisprudences » du vault étaient inventées** (une sanction CNDP « 2023-045 »,
un arrêt « Cass. com 2022/123 », une décision « OMPIC 2023/89 HRFlow ») et qu'une dizaine de bases
légales étaient fausses ou périmées (loi 28-08 comme base vivante, CGI 144, « loi 20-19 »,
« DOC 618/258/419 », « sanction 300k », « 14 jours de rétractation »).
Tout a dû être retiré et remplacé — plusieurs jours de reprise sur 145 fichiers
(`PROGRESS_AUDIT_NICHES.md` §1). Le protocole 3V est le vaccin :
vingt minutes par citation avant, plutôt que vingt heures de correction après.

## 2. COMMENT : les trois V, l'un après l'autre

### V1 — Vérifier le texte À LA SOURCE PRIMAIRE

- La source primaire, c'est l'entrée de `[[02_Sources_Officielles_Cartographie]]` qui correspond à la matière :
  SGG pour les textes, DGI pour le CGI, CNDP / OMPIC / Office des Changes pour leurs recueils.
- Un texte lu sur un site privé, dans un mémoire, un post LinkedIn ou une sortie d'IA
  **n'est pas vérifié** : il est au mieux une piste, au pire une hallucination.
  Référence d'école (réelle) : *Mata v. Avianca* (SDNY, 2023) — des avocats sanctionnés aux
  États-Unis pour des citations d'arrêts inventées par une IA (cf. `02_AI_For_Lawyers_Prompts/01`).
- Livrable de V1 : le texte exact de l'article, recopié depuis la page/PDF officiel,
  avec l'URL et la date de consultation dans la note interne.

### V2 — Valider la NUMÉROTATION : le texte vit

C'est le V qui a tué le vault avant audit. Trois contrôles en chaîne :

1. **Le texte est-il abrogé ?** Chercher le texte abrogeant —
   ex. loi 66-23 (dahir 1-26-75, BO 7536) pour la 28-08 ; méthode : `[[03_Lire_Un_Texte_Consolide]]` § 3.1.
2. **L'article est-il modifié ou renuméroté ?** LF annuelles du CGI ;
   mentions « modifié par / abrogé par » dans le consolidé.
3. **Le numéro existe-t-il sous ce nom ?** Test d'inversibilité : une « loi 19-06 » introuvable
   au SGG = référence fictive ; « loi 20-19 » idem ; un « CGI art. 150 » pour l'AE = faux numéro.

Si le principe survit mais pas le numéro → formule de transition OBLIGATOIRE dans les écrits :

> « ex-art. 30 (loi 28-08) repris par la loi 66-23, numérotation en transposition [flag] »

### V3 — Vérifier la DATE D'APPLICATION

Quatre régimes à distinguer avant d'écrire « en vigueur » :

| Situation | Formulation correcte |
|---|---|
| Texte applicable dès publication/BO | « en vigueur depuis le [date] » |
| LF applicable à l'exercice ou au 1er janvier | « applicable aux exercices ouverts à compter du 01/01/2026 » |
| Texte attendant son décret / déploiement par phases | « voté ; calendrier d'application publié par la DGI (facturation électronique : vagues par taille) » |
| Édition d'un recueil (IGOC) | « IGOC 2026 en vigueur au 01/01/2026 — vérifier l'édition applicable à la DATE DES FAITS » |

## 3. La checklist de la note de recherche interne (à chaque mission)

```
## Note de recherche interne — [dossier] — [date]
Citation testée : [texte + numéro d'article]
V1 source primaire : URL [url] — consultation [date] — extrait collé (3 lignes max) [citation]
V2 numérotation : abrogation cherchée ? [OUI/NON + référence] — modificateurs listés [liste]
   formule retenue le cas échéant : [« ex-art. [x] (loi [y]) repris par [z] [flag transposition] »]
V3 application : [date / exercice / édition du recueil]
Verdict : [CITABLE en l'état] / [CITABLE AVEC RÉSERVE rédigée] / [NON CITABLE — retirer]
Bloc « ce que je n'ai pas pu vérifier » : [contenu obligatoire — jamais vide par confort]
```

Règle de clôture : **aucune référence ne quitte l'interne sans le verdict « citable »** —
la version client ne contient que les lignes vérifiées et les réserves assumées
(modèle entier : `[[08_Note_de_Recherche_Modele]]`).

## 4. INTERDITS ABSOLUS (liste de l'audit — valable pour tout le vault)

| Interdit | Pourquoi (vérifié) | Par quoi remplacer |
|---|---|---|
| **Jurisprudence citée au numéro sans l'avoir lue** | Les trois fictions de l'audit partaient toutes d'un numéro « plausible » recopié | Arrêts réellement ouverts (`[[05_Recherche_Jurisprudence]]`) ou silence |
| **« Sanctions CNDP numérotées »** (délibérations, « décision 2023-045 ») | La CNDP ne publie PAS de sanctions numérotées accessibles | Art. **64** (10 000-100 000 DH par manquement aux formalités) et art. **65** (pénal, jusqu'à 3 ans) de la loi 09-08 + grille PDF cndp.ma |
| « CGI art. 144 / 150 » | Faux numéros (facture ; régime AE) | Facture : **art. 145** ; AE : statut **loi 114-13** + CGI **art. 42 et s.** |
| « DOC art. 618 / 258 / 419 » | Références fausses (réserv. de propriété ; clause pénale ; contrat électronique) | Écrit convenu au plus tard à la livraison (sans 618) ; clause pénale **art. 263-264** ; contrat électronique **loi 53-05** |
| « loi 19-06 » (changes) ; « loi 20-19 » (SARL) ; « sanction 300 k » ; « 14 jours de rétractation » ; « IS 15 %/31 % » ; « délibération 40-22 » | Références fictives ou périmées, toutes retirées par l'audit | Voir le cheat sheet `PROGRESS_AUDIT_NICHES.md` §1, table de droite |
| Rétractation « 14 jours » (import du droit européen) | Réalité vérifiée : **7 jours**, art. 36 de la loi 31-08 (30 si info non confirmée par écrit ; exceptions art. 38) | Écrire 7 jours, base 31-08 |

**Note d'usage :** les références « interdites » de ce tableau n'ont droit de cité que dans ce contexte
de démystification — jamais dans un support client ou publié (convention du vault, cf. § 3 du fichier maître).

## 5. Cas chiffrés [illustratif]

**Cas 1 — l'aggregator de Fatima (e-commerce, pack 5 900 DH HT) brandit « une délibération CNDP 2024-12 »
pour lui faire signer sa charte de conformité.**
Yassine applique le protocole : V1 — aucune base ouverte de sanctions CNDP numérotées (interdit listé) ;
V2 — la « délibération » mentionnée n'existe sous ce format nulle part ;
verdict **NON CITABLE**. La charte réécrite vise l'art. 64/65 de la 09-08 et la grille officielle.
Résultat : une clause qui résiste à un contrôle, plus une cliente qui a appris à se méfier des
prestataires citant des textes fantômes.

**Cas 2 — Karim (MRE, SARL-AU 5 500 DH HT + débours) demande la clause « provision » de sa convention.**
V2 obligatoire : la convention d'honoraires et la provision vivaient aux ex-art. 30/32 de la 28-08 ;
la loi 66-23 est en vigueur (BO 7536) ; les numéros ne sont pas encore consolidés à la date →
la clause est rédigée **sans numéro d'article**, avec la mention « loi n° 66-23 relative à l'organisation
de la profession d'avocat » et le flag interne de renumérotation.
Le prix (provision 50 % = 2 750 HT + débours) et le calendrier, eux, ne dépendent d'aucun article :
rien à retirer de la clause commerciale (cf. `12_Finance_Cabinet_OS/02_Provision_Tresorerie`).

## 6. Les trois phrases qui sauvent pendant l'application du protocole

1. En réunion : « Je confirme ce point par écrit après vérification à la source — réponse avant jeudi. »
2. Par écrit (interne) : « Référence à authentifier — ne pas sortir en client en l'état. »
3. Chez le client qui cite lui-même une source douteuse : « Belle piste ; laissez-moi ouvrir le texte,
   ça change parfois la conclusion. »

Ces trois phrases achètent le seul actif que la citation improvisée détruit : le temps de vérifier.

> **Lecture pro :** le protocole 3V ne rend pas la recherche plus lente — il déplace la lenteur du tribunal
> vers le bureau. Vingt minutes par citation aujourd'hui ; ou un retrait massif, des fichiers à rouvrir
> et une réputation à reconstruire le jour où le client découvre que l'arrêt cité n'existe pas.

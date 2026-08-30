# Arbre de prix d'une mission : de la demande au devis

> « Combien je facture ça ? » est la question la plus fréquente du cabinet — et celle qu'on traite le plus mal, en la posant dans le mauvais ordre.
> Cet arbre répond par une séquence : estimer les heures, passer au taux plancher, confronter au catalogue, et seulement alors décider du devis.

## POURQUOI un arbre de prix (et pas une intuition)

- Le prix posé d'intuition dérive dans trois directions : trop bas par peur (le réflexe débutant), trop haut par ego (le réflexe confirmé), ou rond par paresse (le réflexe catalogue) — les trois coûtent des marges ou des clients.
- L'ordre des questions compte plus que les réponses : **heures d'abord, plancher ensuite, catalogue en confrontation** — jamais l'inverse (le catalogue n'est pas un plafond, c'est un point de contrôle).
- L'arbre produit aussi la pièce maîtresse du devis : un chiffrage que l'avocat peut défendre au téléphone sans broncher, parce qu'il a été calculé avant d'être annoncé ([[11_Negotiation_Psychology/05_Psychologie_Prix]]).

## COMMENT : le flowchart de chiffrage

```
DEMANDE CLIENT REÇUE (« pouvez-vous faire X ? »)
│
├─ 1. DÉCOMPOSER LA MISSION EN TÂCHES
│     découverte/collecte : [__] h
│     rédaction/analyse    : [__] h
│     révisions (x N)      : [__] h
│     note + remise + admin: [__] h
│     ─────────────────────────────
│     TOTAL estimé         : [__] h   ← toujours fourchette basse + marge +25 %
│
├─ 2. PASSER AU PLANCHER
│     heures × taux plancher (350-450 DH HT — [[11_Negotiation_Psychology/01_BATNA_ZOPA_Calculateur]])
│     = PRIX PLANCHER de la mission [____] DH HT
│     heures × taux cible (450-800 selon séniorité/niche)
│     = PRIX NORMAL                     [____] DH HT
│
├─ 3. CONFRONTER AU CATALOGUE
│     │
│     ├─ La mission EST un pack du catalogue (Essential 2 900 /
│     │  Business 5 900 / Premium 12 000, ou diagnostic 900) ?
│     │    ├─ OUI, périmètre conforme  → prix catalogue, sans discuter.
│     │    │     (le catalogue a été calculé sur ces plages d'heures :
│     │    │      cf. [[01_Pricing_3_Options]] — cohérence des gammes)
│     │    └─ Quasi-conforme → option proche + écart chiffré à la ligne :
│     │          « Business + 1 annexe technique : 5 900 + 800 »
│     │
│     └─ HORS CATALOGUE ?
│          ├─ Prix normal ≤ 1,5 × plancher ? → DEVIS SIMPLE, une option :
│          │    [prix arrondi au demi-cent supérieur — jamais rond bas]
│          └─ Sinon (mission longue, sur-mesure) → DEVIS À 2 OPTIONS :
│               a) périmètre complet           : [prix normal]
│               b) périmètre réduit essentiel  : [prix plancher]
│               → JAMAIS une seule ligne sous la contrainte du budget :
│                 c'est le périmètre qui descend, pas le taux
│
├─ 4. LE CLIENT A ANNONCÉ UN BUDGET AVANT LA FIN DU 2 ?
│     ├─ budget ≥ prix plancher  → on propose au-dessus (options), pas au budget
│     ├─ budget entre plancher et prix normal → l'option réduite fait le pont
│     └─ budget < plancher → [[11_Negotiation_Psychology/09_Arbre_Decision_Accepter_Refuser]]
│          : version réduite, diagnostic d'abord (900), ou refus orienté
│
└─ 5. CONDITIONS DE SÉCURITÉ (avant envoi du devis)
      provision 50 % (ou 100 % / jalons si > 20 000)  : [[02_Provision_Tresorerie]]
      validité écrite 15 jours                        : [[04_Devis_Facture_TVA]]
      hors-périmètre listé                            : [[01_Pricing_3_Options]]
      vérification conflit d'intérêts                 : Notion dossiers
```

## COMMENT : lire l'arbre en 90 secondes (les cas fréquents)

| Demande | Décomposition | Sortie d'arbre |
|---|---|---|
| « Relecture d'un bail commercial de 12 pages » | 2,5 h + marge 25 % ≈ 3 h → plancher 1 050-1 350 | Hors catalogue, prix ≤ 1,5 × plancher → devis simple 1 400 DH HT, une option, provision 50 % |
| « Refonte CGV + politique de retours + mentions 09-08 » | ≈ 13 h → plancher 4 550 | Quasi-conforme Business (5 900) — écart chiffré si hors périmètre → proposition catalogue d'abord |
| « Pacte d'associés, deux familles, 30 ans de boîte » | 30 h + incertitude forte | Hors catalogue, prix normal > 1,5 × plancher → devis à 2 options : audit préalable à 900, puis mission complète — ou forfait complet avec jalons 100 % d'avance (> 20 k) |
| « On a 800 DH pour un NDA » | plancher 3 h ≈ 1 050 minimum | Sous plancher → version réduite (relecture seule 1 h = 800) OU refus orienté — jamais le NDA complet à 800 |

## COMMENT : les erreurs de chiffrage que l'arbre prévient

- **L'oubli de la marge +25 %** : l'estimation naïve est toujours la basse — l'imprévu client (pièces manquantes, troisième relecture, appel du comptable) consomme exactement cette marge.
- **Le prix rond bas par défaut** : arrondir à la baisse « pour rassurer » est une remise anticipée non demandée ([[11_Negotiation_Psychology/08_Erreurs_Negociation]] erreur 8).
- **Confondre devis et contrat** : le devis accepté + la convention signée forment le dossier — le devis seul ne protège ni le périmètre ni la provision ([[04_Devis_Facture_TVA]]).
- **Chiffrer les heures d'un associé au taux d'un stagiaire** : le taux cible dépend de QUI fait la tâche — une mission faite à 70 % par l'associé se calcule au taux de l'associé, même si « ça aurait pu être fait moins cher » (le client achète ce qui est fait, pas ce qui aurait pu l'être).

## EXEMPLE : [cas illustratif] le devis à deux options qui a clos tout seul

Demande : « contrat de distribution + accompagnement sur la négociation avec le fournisseur » —
22 h estimées, plancher 7 700, prix normal 9 900.
Budget client jamais annoncé, mais le client est celui qui négociait le pack Essential à 1 800 il y a six mois (dossier 11, [[11_Negotiation_Psychology/07_Cas_Honoraires_5000]] — devenu depuis retainer Starter).
L'arbre envoie : devis à 2 options — (a) complet 9 900, (b) contrat seul 7 200, négociation facturée à l'heure ensuite.
Le client répond en 4 heures : « option a, et on cale la réunion avec le fournisseur la semaine prochaine » — choisi plus cher que le réduit sans une ligne d'argumentaire de prix : la structure de deux options a fait le travail de vente à la place de l'avocat (Goldilocks en devis — [[01_Pricing_3_Options]]).

## Le rituel de calibration

À chaque fin de mission hors catalogue : consigner dans Notion `MISSIONS > chiffrage` — heures estimées vs heures réelles vs prix facturé.
Après vingt missions, l'arbre se recalibre tout seul : la marge +25 % devient un pourcentage réel (mesuré), et les zones récurrentes de sous-estimation apparaissent (la collecte de pièces et les révisions, presque toujours).

## Les 6 questions de contrôle avant d'envoyer un devis

1. L'estimation d'heures inclut-elle la collecte de pièces et la note explicative (les deux heures que tout le monde oublie) ?
2. Le prix annoncé est-il supérieur au plancher (heures × taux plancher) et justifié par le NORMAL, pas par le « au feeling » ?
3. Les 2 ou 3 options de périmètre sont-elles écrites — jamais une ligne unique quand un budget s'exprime ?
4. Le hors-périmètre est-il listé (contentieux, annexes, révisions au-delà de N) ?
5. Les conditions sont-elles posées : provision (50 % ; 100 % ou jalons si > 20 000 DH), validité 15 jours, pénalités de la convention rappelées ?
6. La mission a-t-elle sa place dans le calendrier RÉEL (la prochaine semaine libre, pas la promesse du prochain creux) ?

## Plan d'action 30 jours

- Semaine 1 : appliquer l'arbre aux 5 demandes en cours, y compris celles déjà « évaluées dans la tête ».
- Semaine 2 : chiffrer en heures la dernière mission livrée (temps réel vs estimé) et corriger la marge d'estimation du mois.
- Semaine 3 : standardiser la fiche de chiffrage (les 6 questions au dos du mémo BATNA, [[11_Negotiation_Psychology/10_Fiches_Scripts_Negociation]]).
- Semaine 4 : revue des devis envoyés/perdus du trimestre : les pertes sont-elles un problème de prix, de périmètre mal chiffré, ou de délai mal vendu — l'arbre le dit, l'intuition jamais.

> **Lecture pro :** Si vous ne descendez qu'une seule branche de cet arbre, c'est celle-là : heures → plancher → confrontation catalogue.
> Les devis construits à l'envers (prix d'abord, justification ensuite) se reconnaissent au téléphone : l'avocat y défend un chiffre — alors qu'un chiffre calculé se contente de le dire.
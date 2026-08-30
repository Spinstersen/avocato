# Arbre de décision : accepter, réduire ou décliner

> « Non » est une phrase, pas une émotion.
> Ce fichier transforme la décision d'accepter ou de refuser une mission en flowchart : plancher de rentabilité, ZOPA, périmètre, conditions de paiement.
> L'objectif n'est pas de refuser plus — c'est de refuser plus vite, et mieux.

## POURQUOI formaliser l'acceptation

- Le cabinet jeune dit oui à tout par peur de la disette ; le cabinet qui meurt doucement dit oui à tout par habitude.
Les deux refuseront trop tard, quand le dossier impayé aura consommé la trésorerie des bons ([[12_Finance_Cabinet_OS/07_Erreurs_Finance]]).
- Une règle de refus écrite protège la relation : ce n'est plus l'avocat qui trouve le client cher, c'est le plancher du cabinet — une structure impersonnelle se discute sans abîmer personne ([[04_Gestion_Client_Difficile]]).
- Le refus bien fait est un acte commercial : le client décliné avec méthode revient souvent (budget mûri, accident survenu) — et recommande.

## COMMENT : le flowchart texte

```
DEMANDE D'HONORAIRES REÇUE (prix ou budget annoncé par le client)
│
├─ 1. Calculer le taux horaire implicite
│     prix proposé ÷ heures estimées = [___] DH HT/h
│     │
│     ├─ SOUS le plancher (ex. < 350 DH HT/h, cf. [[01_BATNA_ZOPA_Calculateur]])
│     │    │
│     │    ├─ Périmètre réductible à budget constant ?
│     │    │    ├─ OUI → proposer la version réduite à prix réduit
│     │    │    │        (ex. 1 800 annoncés → contrat seul 2 200,
│     │    │    │         ou diagnostic 900 d'abord) → retour à l'étape 1
│     │    │    └─ NON → décliner avec classe (voir encadré « refus »)
│     │    └─ …
│     └─ AU-DESSUS du plancher → 2.
│
├─ 2. Le prix est-il dans la ZOPA (entre les deux points de retrait) ?
│     ├─ OUI → 3.
│     └─ NON, mais proche → créer l'option : échéancier, périmètre par étapes,
│          retainer plutôt que one-shot ([[12_Finance_Cabinet_OS/06_Abonnement_Retainer]])
│          → le client garde-t-il une issue ? oui → 3 / non → refus.
│
├─ 3. Les conditions de sécurité sont-elles remplies ?
│     ├─ Convention d'honoraires signée                 : obligatoire
│     ├─ Provision ≥ 50 % encaissée avant démarrage     : obligatoire
│     ├─ Mission > 20 000 DH ? → paiement 100 % d'avance
│     │     ou jalons de paiement (50 % à la signature,
│     │     50 % avant livraison du dernier livrable)    : obligatoire
│     ├─ Antécédent client (a-t-il payé ses 2 premières factures passées ?)
│     │     ├─ NON → refus ou petit test (diagnostic 900, d'abord)
│     │     └─ OUI → 4.
│     └─ Conflit d'intérêts écarté (vérification Notion dossiers) : obligatoire
│
└─ 4. Décision : ACCEPTER — au prix catalogue ou à l'option choisie,
      provision encaissée, convention signée, email de cadrage envoyé.
```

## COMMENT : décliner avec classe (l'encadré « refus »)

Trois formules selon le motif — toujours courtes, jamais justificatives :

### Refus pour prix sous plancher

> « Merci de votre franchise sur le budget — c'est elle qui rend la réponse facile. À 1 800 DH sur ce périmètre, nous devrions soit bâcler, soit mentir sur ce que nous vendons, et je ne fais ni l'un ni l'autre.
> Ce que je peux vous proposer sans bouger le prix du pack complet : soit le contrat seul à 2 200, soit le diagnostic à 900 pour prioriser, soit — et je vous le dis en toute confraternité — un confrère jeune qui traite ce type de mission sous ce seuil ; je peux vous orienter vers des cabinets que je connais sans les dénigrer ni vous promettre leur tarif. »

### Refus pour risque de paiement

> « Nous ne pourrons pas démarrer cette mission dans de bonnes conditions, et je préfère vous le dire avant que vous n'engagiez votre confiance.
> Votre dossier reste chez nous : quand la trésorerie sera revenue, les tarifs et moi serons là. »

### Refus de cadrage (client non convenable)

Le cas où le « non » est un service rendu au client — attentes hors sol, demandes illégales, pression sur délai impossible :

> « En l'état, je ne suis pas le bon cabinet pour ce dossier : vous méritez [ce que le client cherche vraiment — un négocieur pur, un cabinet spécialisé X, des délais industriels]. Je vous le dis franchement pour ne pas vous faire perdre un mois.
> Si vous changez de cadrage, ma porte est ouverte. »

La redirection vers un confrère est autorisée et recommandée (c'est de l'orientation, pas du dénigrement — déontologie de la confraternité ; cadre à confirmer dans le RIO en vigueur, cf. [[08_Erreurs_Negociation]] erreur 7).

## COMMENT : les conditionnalités qui changent tout

Le « prix » n'est presque jamais la seule variable ; ces conditions-là sont acceptables sans être des remises :

| Variable | Ce que ça donne au client | Coût pour le cabinet |
|---|---|---|
| Paiement en 2 fois (50/50 jalon) | Trésorerie lissée | Quasi nul si jalons écrits |
| Périmètre réduit annoncé | Choix, contrôle | Zéro — c'est l'option [[07_Cas_Honoraires_5000]] |
| Délai rallongé (« hors urgence ») | Prix normal sans prime | Charge mentale — mais planifié |
| Le client fournit les briques (éléments, templates à partir desquels travailler) | Moins d'heures facturées = prix réduit possible | Transfert de travail réel — le vrai levier de réduction |
| Engagement de volume (retainer) | Baisse du prix unitaire par le forfait mensuel | Compensé par la récurrence ([[12_Finance_Cabinet_OS/06_Abonnement_Retainer]]) |

## EXEMPLE : [cas illustratif] le refus qui est devenu un retainer

Novembre, demande entrante d'une SARL de distribution : « litige fournisseur, 20 pages de pièces, votre confrère facture ça 8 000, faites-le à 3 000 ».
Étape 1 : 3 000 ÷ 14 h estimées ≈ 214 DH/h → sous plancher.
Étape « périmètre réductible » : non, le dossier est entier ou nul.
Déclinaison avec la formule n°1 + orientation possible.
Le gérant rappelle en février, après assignation : budget 9 500 — mission signée en 48 h, et en avril, la SARL prend le retainer Business 4 500 HT/mois pour ses contrats courants.
Le refus de novembre a produit plus de valeur que le oui n'aurait jamais pu : il a installé la règle du cabinet dans la tête du client avant la première facture.

## Le rituel d'application

- Imprimer le flowchart en une page (version fiche dans [[10_Fiches_Scripts_Negociation]]).
- Le taux horaire implicite se calcule AVANT chaque RDV d'honoraires, à la main, sur le carton de notes.
- Notion : chaque décision « décliner » est tracée (client, motif, date) —
6 mois après, ce tableur révèle si le pipeline est assez solide pour remonter les planchers ou s'il faut d'abord le remplir.

> **Lecture pro :** Le bon plancher n'est pas celui qui fait gagner plus — c'est celui qui rend le oui plus fort : un client accepté à un prix défendable est un client qui respectera la facture.
> Un client accepté par peur de le perdre est une impayée en formation.
# 09 — Arbre de décision de l'issue-spotting : balayer, trancher, orienter

> **À quoi ça sert :** l'arbre opératoire qui transforme la checklist de `01_Issue_Spotting.md` en enchaînement de décisions — dans quel ordre balayer les 7 catégories, quelles questions-contrôles à chaque nœud, quels drapeaux rouges qui forcent l'arrêt sur place, et quand orienter vers un partenaire. **Pour qui :** l'avocat qui, en diagnostic, oublie systématiquement une catégorie sous la pression du récit du client. Temps de lecture : 9 minutes.

## 1. POURQUOI : le balayage se pilote, il ne s'improvise pas

L'erreur classique de l'issue-spotting sous pression n'est pas de mal analyser — c'est de **ne pas voir** une catégorie entière parce que le client a parlé vingt minutes d'un seul sujet. L'arbre est une protection contre le vol d'attention : chaque nœud impose une question de passage, chaque branche une issue ou un OK daté. On l'imprime au format carte, on le garde sous la main pendant le diagnostic, et on coche en silence.

## 2. COMMENT : l'arbre complet

```
DÉMARRER (min 0)
│
├─ N0. Quelle activité réelle ? (pas celle déclarée)
│    └─ Écarts activité déclarée / activité exercée → drapeau rouge R1
│
├─ N1. STATUT — l'existence légale du moteur
│    ├─ AE : CA des 2 dernières années > plafond (200 k services / 500 k commerce) ?
│    │    ├─ OUI 2 ans consécutifs → radiation au 1er janvier → question de SURVIE → branche A
│    │    ├─ OUI 1 an seul → dernière année de grâce → plan de bascule → branche A
│    │    └─ NON → vérifier la pente de l'année en cours → surveiller
│    ├─ Société : forme adaptée au nombre d'associés et au besoin de lever ?
│    │    └─ Besoin de tour de table → SAS (19-20) ; mono-associé simple → SARL-AU (5-96)
│    └─ Aucun statut (activité grise) → régularisation avant tout le reste → branche A
│
├─ N2. CONTRATS — la preuve des relations
│    ├─ Existe-t-il UN écrit par relation monnayée (client, fournisseur, partenaire) ?
│    │    └─ NON + montants > 10 000 DH → DOC, art. 443 : pas de preuve → risque H
│    ├─ Les clauses vitales sont-elles là ? (paiement/échéance, cession IP écrite
│    │    droit par droit, résiliation et inexécution DOC 230 s., clause pénale
│    │    DOC 263-264, juridiction)
│    └─ Bilingue si partie étrangère ? clause de langue faisant foi ?
│
├─ N3. FISCALITÉ + CHANGE — l'argent qui entre et sort
│    ├─ Factures conformes (CGI, art. 145) ? Mentions, numéros, devise ?
│    ├─ Export de services : hors champ TVA justifié (art. 91-II-3°) ?
│    ├─ Devises encaissées hors circuit ou non rapatriées (> 90 j services /
│    │   150 j biens, IGOC 2026) → drapeau rouge R2 (dahirs 1939/1949, infraction continue)
│    └─ Confusion compte perso/compte pro → drapeau rouge R3
│
├─ N4. SOCIAL — les gens
│    ├─ AE qui « a de l'aide » → impossible en droit (AE n'embauche pas) → régulariser
│    ├─ Salariés : contrats, CNSS, visite médicale ?
│    └─ Freelances permanents → risque de requalification en sousordination
│
├─ N5. CONFORMITÉ NUMÉRIQUE — les données
│    ├─ Toute collecte (formulaire, newsletter, pixel, CVthèque) → déclarée CNDP ?
│    ├─ Hébergeur/SaaS étranger → transfert hors Maroc → autorisation PRÉALABLE CNDP
│    ├─ B2C → CGV loi 31-08 (rétractation 7 j, art. 36 ; exceptions art. 38) ?
│    └─ Registre des traitements tenu ?
│
├─ N6. PI — l'actif immatériel
│    ├─ La marque du client est-elle déposée ? classes couvertes ?
│    │    └─ NON → ROMARIN (gratuite) AUJOURD'HUI, dépôt (≈ 1 800 DH/classe + 400 publ.)
│    ├─ Les créations sortent-elles avec cession écrite (2-00 mod. 34-05) ?
│    └─ Le client exploite-t-il des droits d'autrui (images, polices, musiques d'ads) ?
│
├─ N7. CONTENTIEUX — l'existant et le latent
│    ├─ Litige ouvert : délais, pièces, stratégie → hors arbre, traitement dédié
│    └─ Litige latent (impayés, colis perdus, concurrent copieur) → lister pour la note
│
└─ Trancher (min 8-10) : matrice gravité × probabilité
     ├─ H×H : tête de note + action immédiate + RDV de décision
     ├─ H×basse : signal daté (« à rouvrir si… »)
     ├─ basse×H : lotir en seconde vague
     └─ basse×basse : une ligne en annexe — jamais oublié, jamais dramatisé
```

## 3. Les drapeaux rouges (arrêt sur place, on ne sort pas du rendez-vous sans les avoir nommés)

| Drapeau | Signe d'alerte | Conséquence immédiate |
|---|---|---|
| R1 | Activité réelle ≠ régime déclaré (commerce sous plafond services, société dormante qui encaisse via l'AE du gérant) | Encaissements détournés = cas 10 de `02_Cas_Grades.md` : gel + régularisation prioritaire |
| R2 | Compte PayPal/étranger non rapatrié, encaissements d'export « en attente » | Délit de change continu : plus ça dure, plus ça coûte (amende ≥ 5× la valeur, jusqu'à 1 000 000 DH ; 1 mois-5 ans) |
| R3 | Compte personnel qui encaisse des factures de la société | Abus de biens sociaux + distributions occultes : renvoi comptable immédiat |
| R4 | Base de clients exportée à l'étranger sans titre | Transfert illicite 09-08 : suspension des envois le temps de l'autorisation |
| R5 | Le client demande « de garder ça pour nous » sans que la question soit posée | La demande de dissimulation d'un risque à un tiers (banque, acheteur) se consigne et se refuse |

## 4. Les questions-contrôles de fin de balayage (90 secondes)

1. Si le client perdait son plus gros client demain, quel papier le protège ? (réponse = vide → N2)
2. Que répondrait un inspecteur à qui il montrerait ses trois dernières factures ? (N3)
3. Où dort l'argent de ses clients étrangers en ce moment, depuis combien de jours ? (N3/change)
4. Que contient son fichier « clients.xlsx », et qui d'autre y a accès ? (N5)
5. Si sa marque était déposée par un concurrent la semaine prochaine, que ferait-il ? (N6)

## 5. Orientations et referts (les limites de l'arbre)

L'arbre est un outil de diagnostic, pas une promesse de tout traiter au cabinet :

- **Comptable partenaire :** régularisations IS/TVA/chiffres, plans de financement, liasses.
- **Fiscaliste / avocat étranger :** volet fiscal d'un pays tiers (on ne rédige jamais le droit canadien, américain ou français — on l'oriente et on coordonne ; convention France-Maroc du 29 mai 1970, aucune convention avec les États-Unis).
- **Huissier de justice :** constat avant toute contestation (page web, profil, messages).
- **Notaire :** immobilier, certaines sûretés.
- **Correspondant européen :** RGPD fin quand le client vend dans l'UE (cas 7 de `02_Cas_Grades.md`).

Se dire « ceci n'est pas pour moi, voici pour qui » fait partie de la méthode — c'est aussi la forme la plus sûre du devoir de conseil (loi 66-23, ex-art. 59 ; numéros en transposition).

## 6. Utilisation : le protocole papier du diagnostic

1. Imprimer l'arbre § 2 au format A5, 50 exemplaires au tiroir.
2. Pendant les 5-10 minutes d'écoute : aucune case cochée — on écoute.
3. À partir de la minute 10, balayage silencieux N0→N7, questions-contrôles § 4.
4. Note d'une page rédigée le soir même (gabarit `06_French_Communication_With_Clients/05_Modeles_Notes.md`).
5. Les cas nouveaux rencontrés en vrai diagnostic viennent enrichir les questions-contrôles § 4 — l'arbre vit.

> **Lecture pro :** la valeur d'un arbre de diagnostic ne se voit pas le jour où tout va bien — elle se voit le jour où un client de confiance, que l'on croyait connaître, expose quarante minutes de vie d'entreprise et où la case R2, seule, change la couleur du dossier. On ne coche pas l'arbre pour remplir une fiche : on le coche pour ne rien trahir.

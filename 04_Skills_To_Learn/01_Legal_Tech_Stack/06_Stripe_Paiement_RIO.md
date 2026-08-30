# 06 — Payer et Encaisser sans Stripe depuis le Maroc

> **La réalité d'abord :** Stripe ne fournit pas de compte marchand à un professionnel domicilié au Maroc. Ni en 2024, ni en août 2026. Les pages « Stripe au Maroc » vendues sur YouTube sont des contournements à risque (compte au noir des changes =Office des changes, pas une astuce de growth). Cette fiche remplace la question impossible (« comment Stripe ? ») par la question utile : « comment mes clients me paient-ils, et comment je facture mes fournisseurs ? ».

## POURQUOI cette fiche a été réorientée

L'ancienne version partait d'un faux : marchands Stripe marocains, « 1,4 % + 2 DH » (tarif inventé — ne jamais l'écrire). Réalité vérifiable : Stripe est disponible pour les entreprises **enregistrées dans les pays couverts par Stripe** ; le Maroc n'en fait pas partie. Tout le reste en découle : pour le dev freelance qui encaisse des clients US, pour l'e-commerçante qui paie ses apps, et pour ton propre cabinet, les voies réelles sont ci-dessous — et l'une d'elles est une mission que tu vends, pas un réglage.

## COMMENT — les voies d'encaissement réelles

### Voie 1 — Virement local RIB (le standard, 80 % de ton CA)

- Client marocain → virement sur ton compte professionnel (RIB communiqué sur la facture et dans la convention).
- Friction : 1 jour bancaire. Solution : le reçu de provision (modèle `05_Document_Bank/templates/06_Recu_Provision_Facture.md`) + capture du virement partagée dans la page Notion de mission.
- Coût : 0 à quelques DH de frais bancaires selon convention de compte.

### Voie 2 — Virement international SWIFT (le client étranger qui te paie)

- Yassine a un client à San Francisco : le client émet un **virement SWIFT** vers le compte de Yassine. Deux présentations :
  - **compte en dirhams** : la banque convertit à réception — Yassine doit se conformer à la réglementation des changes (domiciliation bancaire de la créance d'exportation de services, justification facture/contrat).
  - **compte en devises / compte convertible** : les revenus d'exportation de services peuvent être crédités en devises selon les Instruction générale de l'Office des changes en vigueur et régimes applicables — à vérifier avec la banque du client au cas par cas, les règles évoluent et ton rôle est justement de ne pas promettre un régime figé.
- Délai : 2-5 jours. Frais : 15-50 $ côté émetteur + commission bancaires réception — chiffres indicatifs, à faire confirmer par la banque.

### Voie 3 — Wise / Payoneer pour les RECEVEURS étrangers

- Clarification essentielle : **Wise et Payoneer ne rendent pas le Maroc « encaissable » pour un résident marocain standard** — un particulier/freelance marocain résident n'ouvre pas un compte Wise business marocain magique qui réglerait tout. Ce qui est vrai :
  - le client étranger de Yassine, lui, paie par ACH/SEPA via son Wise/Payoneer — toi tu reçois un SWIFT ou l'équivalent ;
  - un prestataire étranger que tu rémunères (ton freelance designer à Lisbonne) encaisse via son compte Wise/Payoneur — à lui, pas à toi.
- Point de vigilance Office des changes : un résident marocain qui encaisse via un compte étranger sans domicile la créance = infraction de change. Cette phrase, tu la dis à chaque freelance offshore qui te consulte — c'est le cœur du pack 2 900 DH HT.

### Voie 4 — La plateforme paie par ses moyens, toi tu factures

- YouCan, Shopify, Google Workspace, AWS : tes clients e-commerce paient leur abonnement avec leur carte ; si Fatima veut payer depuis le Maroc, la limite n'est pas la plateforme mais **la carte et la réglementation des changes** (plafonds cartes pour paiements vers l'étranger). Rôle du cabinet : aider le client à structurer (carte dédiée, justificatifs, comptabilisation), pas promettre un contournement.
- Le client étranger facture via SA structure (sa société US/UK émet la facture, son Stripe à lui) : c'est légal et courant — Stripe est alors celui du client, pas le tien.

### Voie 5 — La structure étrangère : la seule voie « Stripe réelle » (et c'est une mission)

Yassine veut Stripe parce que « tous les devs freelances américains l'ont » → la vraie réponse est une **structure étrangère** (US LLC au Wyoming/Delaware, UK Ltd) :

1. **C'est légal sous conditions** : immatriculation réelle, substance (compte bancaire au nom de la structure, filings), et côté marocain : déclaration fiscale du résident (revenus mondiaux, régime d'imposition marocain à vérifier), respect de la réglementation des changes (détenir un compte à l'étranger quand on est résident = cadre restrictif — l'argument « tout le monde le fait » ne vaut rien devant l'Office des changes).
2. **C'est une mission de structuration payante** : diagnostic personnel de Yassine (résidence fiscale, volume, clients), choix US vs UK, coordination avec un partenaire (registered agent, comptable), puis mise en conformité marocaine. Tarife-la comme une mission complète, pas comme un abonnement Notion.
3. **Le pitch honnête** : « Stripe n'est pas la raison pour laquelle tu veux une LLC américaine ; la raison est la crédibilité, la concentration de tes revenus et l'exit possible — Stripe suit. »

## Le RIO et la déontologie (zone à confirmer, jamais à inventer)

Encaisser l'honneur d'un avocat par virement est la norme ; l'affichage public de pages de paiement « acheter maintenant » peut être regardé par certains barreaux comme du démarchage. **Les tolérances varient selon les barreaux et ne sont pas publiées en liste claire : pratique courante à confirmer auprès du RIO de ton barreau** (ou la commission de déontologie), jamais une règle affirmée. D'ici là :

- factures + RIB, jamais de bouton « Payer 900 DH maintenant » sur le site public ;
- le paiement arrive par virement après convention signée — c'est la chaîne complète et sobre.

## Tableau de décision (à afficher au mur)

| Situation | Solution | Piège à ne pas vendre au client |
|---|---|---|
| Client marocain règle une facture | Virement RIB | — |
| Client US paie un freelance marocain | SWIFT → compte MAD ou compte en devises selon régime des changes | Compte Wise « magique » en tant que résident |
| Le cabinet paie un sous-traitant UE | Virement SWIFT/SEPA avec facture | Payer « en crypto » sans trace |
| Freelance veut Stripe « comme aux US » | Mission de structuration (LLC/Ltd) + conformité changes/fiscale | « Un LLC et tout est réglé » |
| E-commerçante accepte des cartes étrangères | Passerelle proposée par sa banque au Maroc (CIH/payzone etc.) + 09-08 | Brancher Stripe directement |

## Ce qu'on ne dit plus jamais

- « Stripe 1,4 % + 2 DH » — tarif inventé. Les frais réels dépendent du pays du compte marchand : **à vérifier sur stripe.com/pricing selon pays**.
- « Casablanca tolère, Rabat interdit » — généralisation non sourcée. La réponse est : RIO de ton barreau.
- « Le compte étranger est une zone grise » — c'est une zone **rouge** pour un résident tant que la réglementation des changes n'est pas respectée.

## Exemple : la réponse-type à Yassine

« Ton client US peut te payer par virement SWIFT dès demain, et on domicilie la créance comme il faut. Stripe, lui, exige une entité dans un pays couvert : si tu vises 80-100 k$/an de clients américains, on construit une structure US — je te chifffre le diagnostic de structuration à part. Ce que je ne ferai pas : te dire qu'un compte étranger sans domicile de la créance est une astuce. »

## Timeline type d'un encaissement propre (persona Yassine, client US)

```
J0   Facture émise (montant, devise, RIB, mention « virement SWIFT »)
J+1  Le client déclenche le paiement depuis SON compte US
J+3-5 Réception : la banque demande les justificatifs (facture + contrat)
J+5  Domiciliation / crédit en devises ou conversion selon le régime applicable
J+5  Reçu + affectation comptable + copie dans la page Notion de mission
```

La règle de conduite à répéter aux clients exportateurs : **aucune réception sans justification documentée** — facture, contrat, et si besoin attestation bancaire. C'est la ligne qui sépare un freelance bien conseillé d'un dossier qui sent le problème de changes.

## Le reçu de provision : la pièce maîtresse de l'encaissement cabinet

Template : `05_Document_Bank/templates/06_Recu_Provision_Facture.md`. Contenu minimal : référence mission, montant HT/TVA, mode de réception (virement), date d'encaissement, numéro d'ordre, mention « provision imputable sur les honoraires dus ». Un reçu numéroté sans trou dans la séquence = une comptabilité défendable ; la provision non encaissée ne fait pas courir le délai contractuel (rappel : J0 = encaissement, fiche 04).

## Les 6 erreurs changes que les clients Freelance/Ecom font (et que tu corriges)

| Erreur | Pourquoi c'est grave | Ta réponse de cabinet |
|---|---|---|
| Encaisser un revenu d'export via un compte étranger non déclaré | Infraction de change + risque fiscal | Régulariser d'abord, structurer ensuite |
| Confondre « recevoir » et « détenir » : les plafonds et délais de rapatriement suivent l'Instruction générale en vigueur | Chiffre mouvant = jamais d'affirmation sans texte | « On vérifie le régime applicable à TA situation, écrit dans la note » |
| Payer un sous-traitant étranger « en PayPal entre amis » | Trace inexistante, comptabilité invérifiable | Facture + virement, ou la dépense n'existe pas |
| Croire que crypto = hors champ | Le résident marocain reste résident marocain | Expliquer le cadre, ne jamais accompagner le flou |
| Signer un contrat de travail déguisé (client US qui « salarie » via une plateforme) | Confusion statut + changes + social | Le pack 2 900 DH HT tranche : prestation, pas salariat implicite |
| Ne jamais documenter la créance | Le jour du contrôle, tout se reconstruit — mal | La domiciliation de créance, dès le premier encaissement |

## FAQ encaissement (verbatim client-facing)

**« Mes clients US veulent payer par carte via Stripe. »** — « Stripe traite les paiements pour des marchands établis dans les pays qu'il couvre ; le Maroc n'en fait pas partie à ce jour. Ton client peut payer par virement SWIFT ; si ton volume l'exige, on étudie une structure étrangère — avec ses obligations fiscales et de change, pas ses fantasmes. »

**« Et PayPal ? »** — « Utile pour payer certains fournisseurs ; pour encaisser professionnellement depuis le Maroc, la conformité des flux dépend de ton régime de change — on ne construit pas une activité sur un flou. »

**« Un collègue a un compte Wise marocain. »** — « Un compte, une domiciliation de créance et une situation fiscale sont trois choses différentes. Ce qui existe techniquement n'est pas ce qui est régulier. »

**« Je facture depuis le Maroc une société française : TVA ? »** — question fiscale (autoliquidation, services exportables, régime de l'AE) qui se répond avec les textes et le comptable, pas par ouï-dire de blog — et c'est une ligne de ta mission.

> **Lecture pro :** la valeur du cabinet sur ce sujet n'est pas « trouver le biais » mais « nommer la contrainte » : réglementation des changes + fiscalité de résidence + crédibilité commerciale. Chaque client qui te demande Stripe te dit en réalité où il bloque — note-le dans la BDD VEILLE, c'est ta meilleure étude de marché.

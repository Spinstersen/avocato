# 03 — Les 8 templates : spécifications complètes

> Huit gabarits couvrent 100 % des besoins visuels du cabinet : sept internes/client, un social. Chacun a une fiche : format px/mm, grille, zones, contenu obligatoire, interdit. Tous partent du Brand Kit (fichier 02) — un template sans Brand Kit n'est qu'un dessin.

## POURQUOI huit et pas trente

Le solo-cabinet qui collectionne les gabarits finit par en utiliser trois et par incohérence le reste du temps. Huit surfaces, répétées des centaines de fois, deviennent une signature reconnaissable (fichier 01, principe 3). Chaque template ci-dessous répond à un événement réel du parcours client (`01_Strategy/04_Client_Acquisition_System_No_Ads/`) : demande entrante → devis → convention → livraison → publication.

## COMMENT — les 8 spécifications

### T1 — Convention d'honoraires

- **Format** : A4 portrait, marges 20 mm ; en-tête wordmark + filet laiton 1 px `#c5a46a`.
- **Structure** : parties, objet, périmètre (livrables listés), honoraires indicatifs HT + **provision 50 % à la signature**, délais, modalités, signature.
- **Chiffres** : Cascadia/JetBrains Mono, « 2 900 DH HT » avec espace fine ; jamais de TTC sans HT visible (facturation : CGI art. 145).
- **Pied** : « Me [Nom], Avocat — barreau de [Ville] — RIO [n°] » + pagination « page X sur Y ».
- **Export** : PDF pour Yousign ; base Word/Google Doc pour le texte juridiquement éditable.

### T2 — Contrat de prestation bilingue FR/EN

- **Format** : A4 portrait, **deux colonnes** (FR à gauche, EN à droite, foi FR signalée), gouttière 8 mm.
- **Structure** : 12 articles numérotés, cession de droits et juridiction en caractères visibles (lois 2-00 mod. 34-05 / 17-97 selon objet), cases à cocher pour les options.
- **Typo** : Public Sans 10,5 pt corps ; titres d'articles en EB Garamond 14 pt encrier `#0f2a44`.
- **Interdit** : surlignage, astérisques rouges, « IMPORTANT!! » — le gras et l'encadré surface `#fffcf5` suffisent.

### T3 — Note de risques (livrable du diagnostic 900 DH HT)

- **Format** : A4 portrait, 1 page maximum (le « trop long » est une faute de diagnostic, pas de design).
- **Structure** : en-tête standard ; 3 blocs H/M/B avec libellé en label Public Sans 600 13 pt et terracotta `#9c3a1a` réservé au bloc H ; une phrase de conclusion ; bas de page : les 2 options en mini-tableau.
- **Ton visuel** : dense mais aéré, zéro image.

### T4 — Devis / facture

- **Format** : A4 portrait, en-tête T1, tableau : prestation | ht | tva | total.
- **Mentions obligatoires** : date, référence, ICE, RIB du cabinet, « provision 50 % à la signature, solde à livraison », virement uniquement (pas de paiement en ligne grand public : Stripe n'existe pas pour un résident marocain).
- **Chiffres** : mono tabulaire alignés à droite, totaux en gras.

### T5 — Plaquette cabinet

- **Format** : A4 paysage, 6 pages (détail fichier 05). Couverture fond encrier `#070e1c`, titre EB Garamond laiton `#e8d9b0`.
- **Interdit** : prix affichés comme d'une boutique (les honoraires sont indicatifs, présentés en convention, pas en catalogue publicitaire).

### T6 — Carte de visite numérique / QR

- **Format** : 1080×1080 px (et version 1080×1920 pour story) ; recto : wordmark + nom + barreau + RIO ; verso (slide 2) : QR vers page de réservation du diagnostic.
- **Règle** : un QR, un lien, zéro track marketing intrusif ; la page de destination contient la mention loi 09-08.

### T7 — Carrousel LinkedIn / réseaux

- **Format** : **1080×1350 px recommandé** (le 4:5 gagne la lecture mobile) ; 8 à 10 slides ; export PDF natif LinkedIn (le format document est mieux lu que l'image).
- Spécifications complètes slide par slide : fichier `04_Carrousel_LinkedIn_1080.md`.

### T8 — Miniature YouTube / visuel d'article

- **Format** : 1280×720 px ; titre 3-4 mots EB Garamond 700, fond parchemin ou encrier, filet laiton, 0 visage hurlant, 0 flèche rouge, 0 cercle rouge.
- Test : lisible à 120 px de large (miniature de la sidebar mobile).

## COMMENT — les règles communes (header/footer) de T1 à T8

1. En-tête : wordmark (version claire/sombre selon fond) + filet laiton pleine largeur, jamais de logo client, jamais d'« œil » décoratif.
2. Pied : barreau + ville + site + RIO (documents) ou « [site]/ressources » (supports publics) ; mention loi 09-08 sur TOUT support publié (T6, T7, T8 et site) : « Les données collectées via ce support font l'objet d'un traitement déclaré à la CNDP (loi 09-08)… » — modèle dans `02_Niches_Deep_Dive/03_Loi_09-08_GDPR_Compliance/`.
3. Grille : marges intérieures 8 % de la largeur, alignements au filet, jamais au jugé.
4. Numérotation des livrables clients : « Article 1/12 » en label mono.

## EXEMPLE — le tableau T4 tel qu'il sort de Canva

| Prestation | HT |
|---|---|
| Pack Freelance Contrat Offshore (contrat FR/EN + CGV + modèles devis/facture) | 2 900 DH HT |
| Provision à la signature (50 %) | 1 450 DH HT |
| Solde à livraison (7 jours) | 1 450 DH HT |

Pied de page mono : « Virement — RIB [xx XX ...] — Facture CGI art. 145 — Me [Nom], barreau de [Ville], RIO [n°] ». Cinq lignes, un tableau, zéro adjectif — et le client vire sans négocier : le document ne laisse aucun flou où logerait l'hésitation.

## Erreurs d'application

1. **Créer « pour l'occasion »** un T9 le mardi soir : toute nouvelle surface est d'abord un besoin validé deux fois avant de devenir un gabarit.
2. **Éditer le texte du livrable dans Canva puis le renvoyer en PDF sans version éditable** : la convention signée et l'exemplaire de travail doivent rester cohérents (Canva pour la forme, traitement de texte pour le fond).
3. **Oublier la mention 09-08** sur un visuel public : c'est un manquement à la loi 09-08 — rappel : art. 64, amendes de 10 000 à 100 000 DH ; l'art. 65 relève du pénal (jusqu'à 3 ans) — le risque « 300k » qu'on lit parfois dans les blogs est une légende, pas une raison de dormir tranquille.
4. **Publier un carrousel avec les prix des packs** : l'affichage tarifaire public relève de la réclame ; les prix circulent dans le devis et la convention, pas sur LinkedIn.

## COMMENT — les 6 zones d'un gabarit (la même carte pour T1-T8)

Chaque template se décompose en six zones verrouillées — c'est ce qui permet de « remplir » sans jamais « re-designer » :

1. **En-tête** (8-10 % de la hauteur) : wordmark à gauche, référence mono à droite.
2. **Zone titre** : EB Garamond + filet laiton ; un seul niveau par page.
3. **Zone corps** : Public Sans, grille interne, 65-75 caractères de mesure.
4. **Zone données** : le tableau (prix, délais, risques) — chiffres mono, zebra parchemin-alt.
5. **Zone pied** : barreau + RIO + pagination (documents) ou mentions 09-08 (public).
6. **Zone vide** : les 20 mm de silence — une zone À PART ENTIÈRE, verrouillée comme les autres.

Un template se juge (et se corrige) zone par zone : quand un livrable « cloche », c'est presque toujours la zone 4 qui a mangé la zone 3 (le tableau est devenu l'affiche) ou la zone 6 qui a disparu sous les ajouts « juste pour cette fois ».

## COMMENT — déclinaisons (le kit ne fait pas huit, il fait vingt-quatre)

Chaque template se duplique en trois variantes, préparées une fois pour toutes :

| Variante | Changement | Usage |
|----------|-----------|-------|
| Clair | fond parchemin (par défaut) | documents courants, factures |
| Sombre | fond encrier, texte `#e8d9b0`/`#9fc2e8` | couverture plaquette, slide 1/8 |
| Mobile | ratio 1080×1350, typos ×2 | version lisible-téléphone des docs qui comptent (note de risques !) |

La variante mobile de la note de risques n'est pas un gadget : c'est le document que le prospect relit dans le taxi avant de rappeler — s'il est illisible sur 6 pouces, la vente est perdue à l'export, pas au contenu.

## COMMENT — ce que chaque template rend OBLIGATOIRE dans le fond (rappel croisé)

- T1/T2 : périmètre de livrables + délais chiffrés + « aucune garantie de résultat » → cf. `01_Strategy/06_Deontologie_Pratique_Avocat_Maroc/`.
- T3 : les 3 risques hiérarchisés avec la FOURCHETTE VRAIE quand la data est en jeu (art. 64 loi 09-08 : 10 000-100 000 DH).
- T4 : base légale de la provision (convention écrite — loi 28-08 → 66-23) + virement + reçu.
- T5 : mention « honoraires indicatifs HT, présentés sur convention » (jamais de catalogue).
- T7/T8 : mentions 09-08 si le visuel renvoie vers un formulaire.

## Erreurs d'application (la suite)

5. **Remplir un template sans relire les crochets `[]` restants** : un devis exporté avec « [Ville] » en pied est un devis qui part avec une faute visible ; la checklist qualité (fichier 10) l'attrape — mais le réflexe « chercher les crochets » coûte trois secondes.
6. **Créer une variante mobile « à la volée » le jour J** : les trois variantes de chaque template se construisent le soir de la création du template, jamais la veille de l'envoi.

> **Lecture pro :** construit les huit gabarits un soir, en ordre T1→T8, sans publier quoi que ce soit. Le jour où un prospect le demande, tu ouvres le bon fichier, tu changes trois mots, tu exports — la vente n'attend pas le design, mais elle le remarque.

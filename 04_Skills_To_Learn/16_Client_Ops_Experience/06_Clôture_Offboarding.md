# 06 — Clôture et offboarding : finir la mission proprement, sans fuite ni fantôme

> **À quoi ça sert :** la cérémonie de fin — PV de remise, facture de solde, archivage à l'heure
> (09-08 et secret professionnel), purge des brouillons sensibles, droit à l'oubli du dossier.
> Une mission non clôturée est une charge fiscale et mentale qui continue de courir.
> Temps de lecture : 9 minutes.

## 1. POURQUOI : la clôture est un acte juridique, pas un polissage administratif

Quatre raisons de fermer une mission avec le même soin qu'on l'ouvre :

1. **Preuve.** Le PV de remise arrête la discussion « je n'ai jamais reçu / ce n'est pas ce que
   je voulais » — il clôt le litige d'honoraires AVANT qu'il ne naisse
   (mention du template `05_Document_Bank/templates/08_PV_Remise_Cloture.md` :
   « preuve de remise, utile en cas de litige d'honoraires »).
2. **Trésorerie.** Sans facture de solde émise et datée, l'encaissement final devient optionnel
   dans la tête du client ; or la clôture est le seul moment où le client est satisfait ET disponible
   pour payer.
3. **Données.** Chaque dossier non purgé est un gisement de données personnelles conservées
   sans finalité — exactement le défaut que l'on vend aux clients de ne plus avoir
   (loi 09-08 ; la CNDP attend le registre — `02_Niches_Deep_Dive/03_Loi_09-08_GDPR_Compliance`).
4. **Charge mentale.** Dossier ouvert = boucle non close — l'ennemi du système
   (`06_ADHD_System/07_Recovery_Protocols`) ; clôturer rend de l'attention au cabinet.

## 2. COMMENT : la séquence de clôture (C0 → C+15)

| Temps | Geste | Outil / base |
|---|---|---|
| C0 | Vérifier que les livrables sont « FINAL-signer » + Loom envoyé (`05_Livrable_Qualite.md`) | `03_livrables/` |
| C0 | **PV de remise** signé (ou contresigné par email) : pièces remises, observations du client, statut du solde | template `[[08_PV_Remise_Cloture]]` — l'utiliser et le dater, pas le réécrire |
| C0 | **Facture de solde** : mentions **CGI art. 145** (numéro vérifié par l'audit — jamais « 144 »), ICE, TVA ; formule « solde de tout compte de la mission [réf], hors avenants » | `12_Finance_Cabinet_OS/04_Devis_Facture_TVA` |
| C0+ | **Note de clôture interne** : ce qui a marché / ce qui a coûté trop cher / délai réel vs promis — 5 lignes | base Notion Missions |
| C+7 | **Mesure NPS** (une question — `10_NPS_Fidelisation_Retainer.md`) | Notion |
| C+2 à C+7 | **Referral** au moment choisi (`07_Demander_le_Referral.md` — la fenêtre des 48 h) | Notion |
| C+15 | **Archivage + purge** (§ 3-4) — la clôture n'est PAS finie sans cette ligne cochée | Drive/Notion |

## 3. Archivage : quoi garder, combien de temps (avec la prudence qui s'impose)

**La règle de fond : on archive pour la défense, pas pour l'archive.** Trois corbeilles :

| Corbeille | Contenu | Durée | Logique |
|---|---|---|---|
| **Socle de preuve** (ne se purge jamais) | Convention signée, PV de remise, factures et reçus, lettres de mission, versions signées des livrables, KYC strictement nécessaire | **[prudence] « selon la nature des actes et les délais de prescription applicables : à fixer dans TA politique d'archivage, datée et validée »** — ne pas copier une durée de cabinet français ; le choix se sourcera au texte (prescription civile/fiscale, obligations professionnelles) le jour où on l'écrit | Traçabilité et défense |
| **Dossier de travail** | Notes de recherche, versions v1-vN, échanges utiles à la compréhension du dossier | Plus court que le socle (repère de travail : 2-3 ans — [hypothèse à trancher dans la politique]) | Utilité de défense dégressive |
| **Purge à C+15** | Brouillons sans valeur de preuve : notes « au brouillon » où le client écrivait ses peurs, captures non nécessaires, doublons de la corbeille Drive | Suppression immédiate | Finalité dépassée — minimisation 09-08 [flag : numéros internes 09-08 en attente de consolidation — convention du vault] |

Trois gestes techniques à la clôture :

1. Le socle de preuve déménage **hors du Drive de travail** : dossier d'archivage chiffré,
   accès restreint, sauvegarde distincte (règle 3-2-1 backup : `01_Legal_Tech_Stack/09`).
2. La ligne Notion passe à « clôturée » avec la date — elle déclenche les tâches NPS/referral (10, 07).
3. Les liens partagés Drive « connus de tous avec lien » sont révoqués ou restreints à la clôture —
   la fuite la plus courante du cabinet solo est un lien public oublié.

## 4. Le droit à l'oubli du dossier (et ses limites, écrites)

Quand un client demande la suppression de ses données après clôture :

1. **Vérifier ce qui doit survivre** : les obligations de conservation (preuve contractuelle,
   fiscale, déontologique) priment la demande — la réponse n'est JAMAIS un « oui » nu.
2. **Purger ce qui peut l'être** : notes sans finalité, doublons, brouillons — et notifier par écrit
   au client : la notification EST le livrable.
3. **Modèle de réponse (extrait) :**

> « Votre demande du [date] a été traitée le [date] : les données sans finalité de conservation ont
> été supprimées ; sont conservés, pour la durée prévue par ma politique d'archivage, les seuls
> documents nécessaires à la preuve de notre relation contractuelle (convention, livrables signés,
> factures) et au respect de mes obligations professionnelles. Le détail par catégorie vous sera
> communiqué sur demande. »

Formules à ne pas promettre : le « nous supprimons tout » (faux) comme le « nous gardons tout »
(provocateur). [flag : l'articulation exacte des droits d'opposition/effacement au texte de la 09-08
est à ouvrir avant d'en faire une clause type — culture du vault : la réserve avant le chiffre.]

## 5. La clôture côté humain (deux lignes qui pèsent lourd)

- **Le mot de fin personnalisé** : une phrase sur ce que LE CLIENT a bien fait — un fait, pas un
  compliment commercial : « votre réactivité sur les pièces a tenu le planning de dix jours ».
  La clôture est le dernier souvenir qui reste ; elle se rédige comme une signature.
- **L'héritage** : si le client part vers un confrère ou une structure interne, la transmission se
  fait par écrit (liste des échéances connues, dossiers en cours, accès restitués) —
  un client bien « remis » revient un jour, souvent avec un budget plus grand.
- **La facture de solde n'excuse pas la courtoisie** : l'envoi du PV + facture se fait dans le MÊME
  email que le mot de fin — séparer les deux donne l'impression d'un piège administratif.

## 6. Cas chiffrés [illustratif]

**Cas 1 — Fatima (e-commerce 5 900 DH HT ; solde 2 950).**
C0 : PV signé le 12/09, facture émise le 12/09, Loom de clôture visionné deux fois par son équipe.
C+15 : purge des brouillons — dont les notes où Fatima écrivait ses doutes sur son associé
(la catégorie la plus sensible, partie en premier). Le solde rentre à J+6 au lieu des J+20 habituels
[à calibrer sur vos réels] : une facture adossée à un PV ne se discute pas, elle s'acquitte.
**Cas 2 — Yassine (pack 2 900) demande « supprimez tout ce que vous avez sur moi » trois mois après.**
Application § 4 : brouillons purgés, socle gardé (convention, facture, versions signées),
notification écrite envoyée. Yassine, qui testait, devient le meilleur prescripteur du cabinet —
un client qu'on a su désarchiver proprement recommande un cabinet dont il n'aura plus besoin.

## 7. La checklist de clôture (le « C0 validé »)

```
[ ] Paquet de quatre livré et horodaté (05) — versions « FINAL-signer » dans 03_livrables
[ ] PV de remise signé/écrit, observations du client notées mot pour mot
[ ] Facture de solde émise : art. 145, ICE, TVA, référence mission
[ ] Ligne Notion « clôturée [date] » + tâches NPS (J+7) et referral (J+2) créées
[ ] Note de clôture interne (5 lignes : marché/coûté/retard)
[ ] Socle de preuve déplacé dans l'archive chiffrée ; liens Drive externes révoqués
[ ] Brouillons sensibles purgés (corbeille Drive vidée comprise)
[ ] Mot de fin envoyé dans le même email que la facture
```

> **Lecture pro :** presque tous les cabinets ouvrent des missions ; très peu les ferment.
> La clôture est pourtant le seul moment où le cabinet CHOISIT sa trace : les documents qui restent,
> les données qui partent, la facture qui s'impose et le dernier mot que le client garde.
> Un dossier clôturé proprement ne coûte plus rien — et rapporte encore : referrals, retainers,
> litiges qui n'arrivent jamais.

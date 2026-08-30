# 01 — Onboarding et KYC : les 72 heures qui précèdent J0

> **À quoi ça sert :** tout ce qui se passe entre la signature (« 03 » a vendu) et le premier jour de travail
> effectif : vérifier l'identité et les pouvoirs, collecter les pièces, cadrer la convention avec le flag 66-23,
> encaisser la provision de 50 %, ouvrir le dossier proprement.
> L'onboarding mal fait se paie en impayés, en nullité de pouvoir et en missions sans piste d'audit.
> Temps de lecture : 10 minutes.

## 1. POURQUOI : l'onboarding n'est pas de l'accueil, c'est de la prévention

Trois sinistres classiques du cabinet solo, tous évitables en 72 heures :

1. **Le signataire sans pouvoir** : la convention est signée par « le cofondateur » qui n'est ni gérant
   ni mandataire — encaisser une provision sans vérifier les pouvoirs, c'est travailler sur un contrat
   qu'on pourra faire tomber.
2. **Le client non identifié** : mission livrée, ICE incohérent, société immatriculée sous un autre nom —
   la facture devient irrécouvrable et la traçabilité 09-08 est absente.
3. **La mission sans dossier** : trois semaines plus tard, plus de version finale, plus de pièce d'origine,
   plus de trace de qui a demandé quoi.

La règle du vault, posée côté finance (`12_Finance_Cabinet_OS/02_Provision_Tresorerie.md`) :
**aucune rédaction avant encaissement effectif de la provision**.
Ce fichier est le reste de la chaîne : avant de démarrer, on vérifie QUI, on collecte QUOI, on structure OÙ.

## 2. COMMENT : la séquence J-3 → J0

| Étape | Quand | Geste | Point de blocage |
|---|---|---|---|
| 1. Ouverture du dossier | à la signature acceptée | Créer `00_CLIENTS/[Client]/[Mission]/` (§ 5) | — |
| 2. Vérification identité/pouvoirs | J-3 à J-1 | La table KYC (§ 3) | **Aucun travail sans les pièces minimum** |
| 3. Lettre de mission + convention | J-3 | Templates `05_Document_Bank` (01 et 07) ; mentions § 4 | Signé par le gérant en titre ou mandataire justifié |
| 4. Provision 50 % | envoyée J-3, **encaissée = J0** | Virement sur compte pro ; reçu (`05_Document_Bank/templates/06_Recu_Provision_Facture`) | **J0 n'existe pas avant l'avis de crédit** |
| 5. Kickoff | J0 | Email de confirmation + calendrier + canal officiel (§ 6) | — |

## 3. Le KYC du cabinet solo : les pièces, par type de client

**ICE — la colonne vertébrale de l'identification.**
L'Identifiant Commun de l'Entreprise est le numéro **à 15 chiffres** qui identifie l'entreprise marocaine
auprès de toutes les administrations (registre du commerce, fiscal, social) — un identifiant COMMUN,
d'où son intérêt : une seule ligne traverse le RC, la DGI et la CNSS.
[flag : la loi instituant l'ICE n'a pas été citée au numéro vérifié dans ce vault — l'écrire « l'ICE,
identifiant commun à 15 chiffres » sans numéro de loi tant que le consolidé n'est pas ouvert.]
Il se vérifie sur l'extrait de registre de commerce ; un client sans ICE = un client à immatriculer
AVANT toute facturation B2B (cf. `02_Niches_Deep_Dive/06_Autoentrepreneur_to_SARL_Scaling`).

| Client personne physique | Client société marocaine | Client étranger / MRE |
|---|---|---|
| CIN ou passeport (copie lisible) | Statuts à jour | Passeport du signataire |
| Justificatif de domicile récent | Extrait de RC de moins de 3 mois + **ICE (15 chiffres)** | Immatriculation étrangère (extrait Kbis ou équivalent) + ICE si entité immatriculée au Maroc |
| RIB au nom (remboursements, débours) | Procès-verbal de l'organe autorisant la mission OU procuration | Certificat d'imposition de l'autre État si une convention fiscale intervient (cf. `15_Recherche_Juridique_Veille/06_Recherche_Conventions_Fiscales_TBI`) |
| — | Attestations fiscales et CNSS [flag : exigées selon la mission, jamais par automatisme] | Pouvoirs du signataire, traduits et certifiés le cas échéant (apostille OU légalisation consulaire **par pays** — l'objection allemande est le cas réel rappelé en 15/06) |

**Deux règles de proportionnalité :**

1. Le diagnostic à 900 DH HT ne demande pas le dossier de la SARL à 5 500 + débours —
   mais l'identité et l'ICE (ou son absence) sont exigibles **dès le premier dirham encaissé** :
   le diagnostic EST déjà une mission.
2. Les pièces collectées sont des données personnelles : **minimum, chiffrées, durée définie**
   (renvoi `06_Clôture_Offboarding.md` § 3 et `02_Niches_Deep_Dive/03_Loi_09-08_GDPR_Compliance`).

## 4. Lettre de mission et convention : les mentions qui tiennent en 2026

- **La convention d'honoraires** (base `05_Document_Bank/templates/01_Convention_Honoraires_Modele`) :
  périmètre, prix HT + TVA, modalités de provision, durée et renouvellement,
  canal et délais de réponse (cf. `04_Boundary_Communication.md`), livrables NOMMÉS.
- **Base légale professionnelle — le flag s'écrit, il ne se subit pas.**
  L'ex-article 30 (convention) et l'ex-article 32 (provision) de la **loi 28-08** sont repris par la
  **loi 66-23** (dahir 1-26-75 du 18/08/2026, BO 7536) dont la numérotation est **en transposition**.
  Formule de la clause : « la présente convention est établie conformément à la loi n° 66-23 relative
  à l'organisation de la profession d'avocat » — sans numéro d'article, avec le flag interne
  [renvoi à la méthode : `15_Recherche_Juridique_Veille/03_Lire_Un_Texte_Consolide` § 3.1].
- **La lettre de mission** (`05_Document_Bank/templates/07_Lettre_Mission_Planning`) :
  planning J0-J2-J5-J7, nom des livrables, nom des checkpoints (cf. `03_Rythme_Reporting.md`),
  et la phrase de cadencement : « la mission démarre à l'encaissement effectif de la provision ».
- **Prix cohérents (règle vault)** : diagnostic 900 · pack 2 900 · e-commerce 5 900 ·
  SARL-AU 5 500 + débours · retainer 2 500-4 500 HT/mois —
  provisions dues avant J0 : **450 / 1 450 / 2 950 / 2 750 + débours** selon la mission.

## 5. Structurer le dossier : `00_CLIENTS/[Client]/[Mission]/` (Drive ET Notion, mêmes noms)

```
00_CLIENTS/
  Yassine_ElAmrani/                        (raison sociale + ICE en fiche client)
    2026-09_pack_freelance_2900/
      00_admin/      convention signée, reçu provision + avis de crédit, KYC (chiffré)
      01_entree/     brief, notes des échanges, documents reçus du client
      02_travail/    brouillons (dossier QUI SERA PURGÉ À LA CLÔTURE — cf. 06 § 3)
      03_livrables/  versions envoyées (jamais modifiées après envoi) + note de risques + Loom
      04_sortie/     PV de remise, facture de solde, NPS, referral le cas échéant
```

Côté Notion, la base « Missions » (`01_Legal_Tech_Stack/02_Notion_Cabinet_OS_Detaille`) porte les mêmes
lignes : statut (provision attendue / en cours / à livrer / clôturée), client, checkpoints J2/J5 au calendrier.
Le Drive est la **preuve**, Notion est le **rythme** ; l'un sans l'autre produit des dossiers morts.

## 6. EXEMPLE : kickoff rédigé entier + cas chiffrés

**Email de kickoff (J0, provision encaissée) :**

> Objet — Votre mission est lancée — pack freelance (CH-2026-052)
> Bonjour Yassine,
> La provision de 1 450 DH HT est bien encaissée : votre dossier démarre officiellement aujourd'hui.
> Ce que vous recevrez : un premier point d'avancement mercredi (J2), puis les livrables — contrat de
> prestation, CGV, registre 09-08 et leur mode d'emploi — vendredi de la semaine prochaine (J7),
> avec une vidéo de 3 minutes qui vous explique comment les utiliser.
> Me joindre : par email ou WhatsApp sur le numéro de la convention ; réponse sous 24 heures ouvrées.
> Les urgences réelles (mise en demeure reçue, compte bloqué) se signalent par le mot « URGENT »
> dans le premier message.
> Pièce à compléter de votre côté : l'extrait de registre de commerce de moins de trois mois.
> À mercredi.

**Cas 1 [illustratif] — Fatima (e-commerce, 5 900 DH HT).** Provision 2 950 exigée avant J0 ;
à la signature, le « gérant » présenté n'a aucune qualité au registre : la convention repart pour
signature par le gérant immatriculé — trois jours de retard, zéro litige.
Encaisser sans vérifier les pouvoirs aurait signé le premier.
**Cas 2 [illustratif] — Karim (MRE France, SARL-AU 5 500 + débours).** KYC « par pays » :
pouvoir du signataire + certificat de résidence fiscale — la règle ne présume jamais rien
(l'objection allemande à l'apostille l'a démontré au vault : 15/06 § 4) ; la liste de pièces est
envoyée datée du jour, et les délais d'autorité sont écrits selon la règle des deux phrases
(15/09 § 2).

## 7. Checklist de clôture d'onboarding (le « J0 validé »)

```
[ ] Identité + pouvoirs vérifiés (pièce dans 00_admin, datée)
[ ] ICE noté (15 chiffres) / immatriculation étrangère documentée
[ ] Convention signée : formule 66-23 [flag] + horaires de réponse + canal + mot « URGENT »
[ ] Provision 50 % ENCAISSÉE (avis de crédit dans le dossier) — sinon la mission n'a pas commencé
[ ] Dossier Drive + ligne Notion ouverts, nommés, reliés
[ ] Email de kickoff envoyé (calendrier J2/J5/J7 + canal + urgence définie)
[ ] Pièces manquantes listées, avec date de relance au calendrier
```

> **Lecture pro :** l'onboarding est le seul moment de la mission où le client est encore impressionné
> par vous et où vous pouvez tout exiger sans fâcher personne : identité, pouvoirs, provision, calendrier.
> Ce qui n'est pas cadré dans les 72 heures se négocie pendant les cinq semaines suivantes —
> et se plaide parfois pendant cinq ans.

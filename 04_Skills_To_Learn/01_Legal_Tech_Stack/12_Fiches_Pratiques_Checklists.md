# 12 — Fiches Pratiques & Checklists de la Stack

> **Le fichier qu'on ouvre les mains dans le clavier.** Setup J1, rituels hebdo/mensuels, checklist preuve électronique, modèles de texte verbatim. Tout est conçu pour être coché sans relire les fiches 01-11 — les références de fiche sont rappelées en fin de chaque bloc.

## FICHE 1 — Setup J1 (90 min chrono)

- [ ] **Domaine + email (25 min)** — domaine actif ; Workspace Business Starter ; SPF/DKIM/DMARC posés ; test mail-tester.com ≥8/10 ; signature sobre (fiche 03)
- [ ] **Notion (30 min)** — workspace créé ; 8 BDD vides + 1 entrée test chacune ; Relations CLIENTS↔MISSIONS câblées ; dashboard avec 4 vues ; Yassine + Fatima en entrées fictives (fiche 02)
- [ ] **RDV (10 min)** — Cal.com ou Calendly : Diagnostic 45 / Suivi 30 / Atelier 60 ; buffer 15 min ; rappel 24 h + 1 h ; confirmation sobre (fiche 03)
- [ ] **Intake (15 min)** — Tally 12 questions + consent 09-08 + page merci ; une soumission test reçue (fiche 03)
- [ ] **Signature (10 min)** — Yousign ou Docuseal : template convention importé (avec clause signature électronique — fiche 04) ; un envoi test vers ton propre email
- [ ] **Vidéo (5 min)** — Loom test 1 min, lien restreint à ton email, rangé dans `Clients/TEST/` (fiche 05)
- [ ] **Analytics (5 min)** — script Plausible collé ; événement temps réel visible (fiche 07)

Première fin de journée : export Notion chiffré → disque (fiche 09). Le backup démarre le jour 1, pas le jour où tu as peur.

## FICHE 2 — Rituels

**Hebdo (dimanche, 15 min)**
- [ ] Export Notion → coffre local
- [ ] Plausible : top 3 articles, objectif `diagnostic_booked` noté dans KPI
- [ ] Make/Zapier : 0 erreur dans les runs de la semaine
- [ ] Missions « Prod » dormant >7 jours → NextAction écrite

**Mensuel (20 min)**
- [ ] Copie Drive → disque externe
- [ ] Registre 09-08 : un nouvel outil ou flux ce mois-ci ? (IA comprise)
- [ ] Revue des liens Drive « tout le monde avec le lien » → restreindre
- [ ] Abos : un outil inutilisé 60 jours → export + désabonnement (fiche 11)

**Trimestriel (1 h)**
- [ ] Test restauration (1 page Notion + 1 dossier Drive)
- [ ] Rotation mots de passe critiques : domaine, admin Google, CNDP, 1Password
- [ ] Vérification pricing des outils clés (les prix de ce dossier sont « ≈ août 2026 »)
- [ ] Déclaration CNDP à compléter/actualiser si nouveaux traitements

## FICHE 3 — Checklist preuve électronique d'une convention (avant de clore un dossier)

- [ ] PDF signé + **certificat de signature** (piste d'audit Yousign/Docuseal : horodatage, email, IP, OTP) archivés ensemble
- [ ] Email de transmission depuis l'adresse connue du client conservé (pas seulement la notif de l'outil)
- [ ] Mention « lu et approuvé » visible sur le document
- [ ] Copie client envoyée + accusé de réception (même « bien reçu » en réponse suffit)
- [ ] Provision encaissée tracée (reçu, fiche 06)
- [ ] Rappel : pour un client marocain, la valeur = **faisceau de preuves** sous loi 53-05 ; pour un acte à fort enjeu, vérifier si un original papier légalisé a été échangé (fiche 04)

## FICHE 4 — Modèles de texte verbatim

**Accusé intake (J0, 24 h max)**
```
Objet : Votre demande a bien été reçue
Bonjour [Prénom],
J'ai bien reçu votre message et je reviens vers vous sous 24 h
avec un lien de réservation pour un diagnostic de 45 minutes.
Bien à vous,
[Nom] — Avocat, barreau de [Ville]
```

**Relance provision (J+3 après convention signée)**
```
Objet : Votre mission démarre à réception de la provision
Bonjour [Prénom],
La convention est signée. Pour rappel, le délai de 7 jours ouvrés
court à compter de l'encaissement de la provision de [montant] DH HT
(RIB ci-joint). Dès réception, je vous envoie la vidéo de lancement.
Bien à vous,
[Nom]
```

**Refus poli d'un paiement « par Stripe »**
```
Bonjour [Prénom],
Le virement est la voie la plus simple et la plus sûre pour un
cabinet marocain — RIB sur la facture, reçu de provision sous 24 h.
Si votre question porte sur l'encaissement de VOS revenus à
l'international, c'est un autre sujet (structuration) : on le note
pour le diagnostic.
Bien à vous,
[Nom]
```

## FICHE 5 — Les 5 erreurs stack (et leur antidote)

| Erreur | Conséquence réelle | Antidote |
|---|---|---|
| Acheter 10 outils le jour 1 | Overwhelm + ≈150 $/mois de dettes d'abonnements | Arbre fiche 11 : douleur ≥2 h d'abord |
| GA4 « en attendant » | Transfert hors Maroc non autorisé + bandeau = double risque loi 09-08 | Plausible ou Matomo, fiche 07 |
| Page de paiement promotionnelle | Risque déontologique (démarchage) selon RIO | Virement + convention, fiche 06 |
| Notion sans backup | Perte de preuves et de livrables | 3-2-1 + test de restauration, fiche 09 |
| Automatiser avant 10 répétitions | Tu maintiens un flux que tu changes chaque semaine | Règle fiche 08 |

## FICHE 6 — Où trouver quoi

| Besoin | Fichier |
|---|---|
| Catalogue + workflow mission | `01_Stack_Complete_Catalogue.md` |
| Colonnes Notion | `02_Notion_Cabinet_OS_Detaille.md` |
| DKIM, formulaires, RDV | `03_Google_Workspace_Calendly_Tally.md` |
| Loi 53-05, clause signature, faisceau | `04_Yousign_Signature_Conforme.md` |
| Scripts Loom | `05_Loom_Video_Client.md` |
| SWIFT, devises, structure étrangère | `06_Stripe_Paiement_RIO.md` |
| Sanctions art. 64/65, registre | `07_...` puis `09_Securite_Backup_09-08.md` |
| Webhooks | `08_Workflow_Integration_Zapier_Make.md` |
| Prix et alternatives UE | `10_Comparatif_Outils_Alternatives.md` |

> **Lecture pro :** imprime les fiches 1 et 3 une fois — la première est ton jour d'ouverture de cabinet numérique, la seconde est celle qui te sauve le jour où un client conteste une signature. Le reste se relit en contexte, pas en stock.

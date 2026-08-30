# 01 — Stack Complète : Catalogue 15 Outils + Workflow de Mission

> **Le fichier de référence du dossier.** Catalogue (3 couches, coûts réels août 2026), configuration de chaque outil, et workflow type d'une mission de l'intake au suivi. Règle mère : un outil = un job = un workflow = un template. Prix marquees « ≈ » car ils bougent — vérifier avant d'acheter.

## POURQUOI ce fichier

Trois dérives tuent la stack d'un jeune cabinet : acheter avant d'avoir le besoin (dette d'abonnements), stocker des données clients identifiantes n'importe où (risque 09-08 et secret professionnel), et afficher des pratiques que le RIO du barreau peut voir comme du démarchage. Ce catalogue répond aux trois : chaque outil est choisi pour un job précis, classé par risque de transfert de données, et branché sur un workflow de mission unique.

## COMMENT : la stack en 3 couches

### Couche 1 — Cœur (jour 1 obligatoire)

- **Notion Plus ≈10-12 $/mois** — second brain, CRM, missions, content. Anonymiser ce qui touche au client (voir `02_Notion_Cabinet_OS_Detaille.md` et `09_Securite_Backup_09-08.md`).
- **Google Workspace ≈6 $/user/mois** — email pro `prenom@cabinet.ma`, Drive, Meet. SPF/DKIM/DMARC obligatoires (voir `03_Google_Workspace_Calendly_Tally.md`).
- **Cal.com (gratuit/self-host UE) ou Calendly ≈10 $/mois** — 3 types d'événements : Diagnostic 45 min, Suivi 30 min, Atelier 60 min. Buffer 15 min, confirmation auto, annulation 24 h.

### Couche 2 — Production (semaine 2)

- **Tally gratuit (Plus ≈24 $/mois)** — intake prospect 12 questions. Alternative UE : Fillout.
- **Yousign ≈19-25 €/mois** — conventions dématérialisées, hébergement France. Cadre juridique : loi 53-05, pas de « reconnaissance automatique » (voir `04_Yousign_Signature_Conforme.md`). Alternative open source auto-hébergeable : Docuseal.
- **Loom Business ≈12-15 $/user/mois** — 3 templates vidéo seulement (voir `05_Loom_Video_Client.md`).
- **Canva Pro ≈12-15 $/mois** — brand kit sobre aligné sur `DESIGN.md` du vault (encrier #070e1c / #0f2a44, parchemin #f6f0e3, laiton #c5a46a, teal #1a8a7f en accent ≤10 %).
- **Plausible ≈9-14 $/mois** — analytics sans cookie, hébergé UE. Jamais Google Analytics (transfert US + consent = double risque, voir `07_Plausible_Analytics_CNDP.md`).

### Couche 3 — Optimisation (mois 2+)

- **Encaissement** — Stripe ne fournit PAS de compte marchand à un professionnel domicilié au Maroc. Voies réelles : virement RIB local, SWIFT, compte en devises, structure étrangère. Voir `06_Stripe_Paiement_RIO.md` — c'est un sujet de mission, pas un plug-in.
- **Make ≈9 $/mois (UE) ou Zapier ≈20-30 $/mois** — Tally→Notion, Calendly→Google→Notion, Yousign→Drive (voir `08_Workflow_Integration_Zapier_Make.md`).
- **Freedom ≈3-4 $/mois** — blocage LinkedIn/YouTube en deep work.
- **Brain.fm ≈7 $/mois** — focus music.
- **Whisper / Notion AI** — transcription de voice notes (jamais de dictée de dossier client identifié).

## Coût total par phase

| Phase | Outils | Coût/mois |
|---|---|---|
| M0 bootstrap | Notion + Workspace + Cal.com + Tally + Canva | ≈35-45 $ |
| M1 production | + Yousign + Plausible + Loom | ≈75-95 $ |
| M3 scale | + Make ou Zapier | ≈90-125 $ |

## Configuration de chaque outil (synthèse cliquable)

1. **Notion** — dashboard 3 MITs + 8 bases (CLIENTS, MISSIONS, CONTENT, PROSPECTS, PARTENAIRES, TEMPLATES, VEILLE, KPI). Détail schéma colonnes dans `02_Notion_Cabinet_OS_Detaille.md`.
2. **Workspace** — domaine `.ma` ou `.com`, alias `contact@`, arborescence Drive `00_CLIENTS/[Client]/[Mission]/`, `01_TEMPLATES/`, `02_COMPTA/`.
3. **Cal.com / Calendly** — types et créneaux :

| Type | Durée | Créneaux | Paiement | Buffer |
|---|---|---|---|---|
| Diagnostic | 45 min | Lun-Jeu 10-12 / 14-17 | 900 DH HT, virement avant RDV | 15 min |
| Suivi mission | 30 min | Mar/Jeu 14-16 | Inclus dans la mission | 15 min |
| Atelier | 60 min | 1 mercredi/mois 18h | Gratuit | — |

4. **Yousign** — 3 templates : convention d'honoraires (ex-art. 30 loi 28-08 ; loi 66-23 promulguée 18/08/2026, dahir 1-26-75, BO 7536, nouveaux numéros en cours de transposition), lettre de mission, PV de clôture.
5. **Loom** — dossier partagé par client, 3 scripts (intro 3 min, clause 5 min, clôture 10-15 min).
6. **Plausible** — script 1 kb collé sur le site, 0 bandeau cookie, registre à jour.

## Le workflow type d'une mission (de l'intake au suivi)

```
Intake Tally (12 questions)
  ↓
Diagnostic Calendly/Cal.com + Visio Meet  —  900 DH HT
  ↓
Convention Yousign (faisceau de preuves 53-05) + Provision virement RIB
  ↓
Page Notion Mission créée (statut : Convention signée)
  ↓
Production + Looms ponctuels (mi-mission)
  ↓
Livraison : Notion + PDF + Loom clôture
  ↓
Facture de solde + encaissement virement
  ↓
Suivi email J+15 + proposition retainer 2 500-4 500 DH HT/mois
```

### Les 6 étapes expliquées

1. **Intake** — le prospect remplit le Tally ; Make/Zapier crée la fiche PROSPECTS ; email de réponse sous 24 h.
2. **Diagnostic** — 45 min structurées (voir `03_Sales_Without_Selling/02_Script_Diagnostic_40min.md` du dossier voisin). Le diagnostic est payé 900 DH HT par virement, déductible si mission.
3. **Convention + provision** — Yousign pour clients UE ; pour clients marocains, signature électronique + mention « lu et approuvé » + email de transmission + conservations = faisceau de preuves (loi 53-05, DOC art. 443 pour la preuve écrite au-delà de 10 000 DH). Provision encaissée sur RIB = J0 du planning.
4. **Production** — la page MISSION est le seul endroit où la mission existe : pièces, notes, livrables, Looms.
5. **Livraison** — Loom clôture + PDF + mail sobre : « Votre mission est livrée. La facture de solde suit. Je reste disponible 15 jours pour questions. »
6. **Suivi** — J+15 : « Tout va bien sur les documents livrés ? » ; J+60 : proposition d'abonnement si l'activité du client évolue.

## Grille de prix internes alignée vault

| Prestation | Prix |
|---|---|
| Diagnostic 45 min | 900 DH HT |
| Pack Freelance Contrat Offshore | 2 900 DH HT |
| Pack SARL-AU (constitution) | 5 500 DH HT + débours |
| Retainer | 2 500-4 500 DH HT/mois |

## Règle d'achat

> N'achète un outil que quand tu as perdu 2 h à faire manuellement ce qu'il fait en 5 min. Pas avant. Et avant d'héberger des données client identifiables hors Maroc : autorisation préalable CNDP (loi 09-08) — dans le doute, anonymiser + classer le traitement sur cndp.ma.

## Les 4 affirmations fausses à ne jamais répéter

| Phrase à bannir | Réalité |
|---|---|
| « QES eIDAS = reconnu automatiquement au tribunal marocain » | Force probante appréciée par le juge marocain ; présomption de fiabilité seulement via prestataire agréé ANRT (loi 53-05) |
| « Stripe encaisse au Maroc » | Pas de compte marchand Stripe pour professionnel domicilié au Maroc |
| « Google Analytics, délib 40-22 » | Référence inventée ; le risque réel = transfert hors Maroc soumis à autorisation CNDP |
| « Diagnostic 600 DH » | Standard du vault : 900 DH HT |

> **Lecture pro :** ce fichier est le panneau de contrôle du dossier. Avant tout achat d'outil, redescends dans la fiche dédiée (02-09) plutôt que de configurer à l'instinct : chaque fiche contient les étapes cliquables et le point de conformité associé.

# 02 — Notion Cabinet OS Détaillé (Cœur du Système)

> **Pourquoi Notion plutôt qu'un logiciel métier d'avocat :** à 10 clients, un tableur CRM suffit ; à 30, tu ne retrouves plus la convention de Yassine. Notion centralise clients, missions, contenu et veille dans un seul outil à ≈10-12 $/mois, partageable avec le client sans lui installer quoi que ce soit. Le prix à payer : des données hébergées hors Maroc → protocole d'anonymisation strict (fiche 09). Inspire de `01_Strategy/05_ADHD_Operating_System_Overview/04_Second_Brain_Notion.md`, spécialisé avocat d'affaires.

## POURQUOI une seule base par objet

Trois règles structurelles évitent le chaos : (1) un objet = une base (les clients ne vivent pas dans les missions) ; (2) les liens se font par **Relations**, pas par copier-coller — la mission « Pack Yassine » pointe vers la fiche client, pas une copie du nom ; (3) le dashboard n'affiche que des **vues filtrées** des bases, jamais des doublons. Résultat : modifier le statut d'une mission met à jour le pipeline commercial automatiquement.

## COMMENT : le dashboard

```
┌─ 3 MITs du jour (checkbox) ──────────────────────┐
│ [ ] Finaliser convention Yassine  [ ] Publier post│
├─ Calendrier semaine (vue Calendar de MISSIONS) ───┤
├─ Vues utiles ─────────────────────────────────────┤
│ MISSIONS en cours (Kanban)  PROSPECTS à relancer  │
│ CONTENT cette semaine       KPI du mois           │
├─ Liens rapides : Tally stats · Yousign · Plausible┤
└──────────────────────────────────────────────────┘
```

## Schéma détaillé des bases de données

### BDD CLIENTS (12 propriétés)

| Colonne | Type | Usage / options |
|---|---|---|
| CodeClient | Title | « CL-012 » + pseudonyme, jamais la raison sociale complète brute |
| StatutJuridique | Select | AE / SARL-AU / SARL / SNDFR / foreign co |
| Niche | Multi-select | Freelance-offshore / Ecom / 09-08 / Creators / MRE |
| CA_Declaré | Text | Fourchette (« 400-600k DH/an »), pas le chiffre exact |
| DateEntrée | Date | Premier dossier |
| Missions | Relation → MISSIONS | Historique complet |
| ContactEmail | Email | Réel, mais la fiche est en page restreinte |
| ContactTel | Phone | Optionnel |
| NextStep | Text + date | Une action claire par client |
| HonorairesCumules | Formula (rollup) | Somme des MISSIONS |
| Retainer | Checkbox | Abonnement actif ? |
| Notes | Text | Jamais de fait judiciaire sensible en clair |

### BDD MISSIONS (15 propriétés)

| Colonne | Type | Options / notes |
|---|---|---|
| Mission | Title | « M-2026-014 Pack Freelance — CL-012 » |
| Client | Relation CLIENTS | Obligatoire |
| Type | Select | Diagnostic 900 · Pack Freelance 2 900 · Pack SARL-AU 5 500 + débours · Retainer 2 500-4 500/mois · Ad hoc |
| Statut | Select | Intake / Diag / Convention / Prod / Livré / Facturé / Clos |
| Echeance | Date | Négociée à la convention |
| HonorairesHT | Number | Standard vault (pas de prix inventés à la tête du client) |
| ProvisionPct | Number | 50 % par défaut |
| ConventionSignee | Checkbox + date | Référence du PDF Yousign/Docuseal |
| DossierDrive | URL | `00_CLIENTS/CL-012/M-2026-014/` |
| Livrables | Checklist | PDF, Notion share, Loom |
| LoomLivraison | URL | — |
| TempsPasse | Number | Rentabilité horaire |
| RisquesIdentifies | Relation VEILLE ou texte | — |
| NextAction | Text | Ce qui débloque la prod |
| FactureSolde | Checkbox | — |

**Vues MISSIONS :** Kanban par Statut (ta vue de travail quotidienne) · Timeline par Echeance (semaine) · Table triée HonorairesHT (clôture mensuelle) · Vue filtrée « Statut ≠ Clos » sur le dashboard.

### BDD CONTENT (8 props)

Statut (Idée / Brouillon / Publié / Recyclé), Canal (Blog / LinkedIn / Carrousel / Atelier), Niche, MotCleSEO, LienPub, DatePub, Perfs (number), SourceMission (relation — un dossier client bien géré devient un article anonymisé).

### BDD PROSPECTS (7 props)

Source (LinkedIn / Bouche-à-oreille / Coworking / Atelier), Score 0-10, DiagnosticBooké (checkbox + date), OffreProposee, ObjectionPrincipale, NextTouch (date), EntréeTally (URL). Règle : tout DM entrant → fiche PROSPECT en moins de 2 minutes.

### BDD TEMPLATES, PARTENAIRES, VEILLE, KPI

- **TEMPLATES** : modèles de pages mission, note, post (listés plus bas).
- **PARTENAIRES** : comptables, agences YouCan, coworkings — 1 fiche, 1 contact, commission jamais écrite noir sur blanc si le RIO l'interdit.
- **VEILLE** : source, phrase entendue en réunion (« mon client US veut payer via Stripe »), idée de contenu.
- **KPI** : board hebdo — diagnostics, signatures, CA HT, taux de conversion.

## Les 5 templates de page à créer

1. **Mission Pack Freelance** — sections : Contexte (3 lignes) / Risques identifiés / Livrables (contrat FR-EN, CGV, annexe IP) / Planning J1-J7 / Relances.
2. **Note de risques** — checklist 7 catégories (contractuel, fiscal, changes, données, PI, social, contentieux) — méthode dans `07_Sharp_Legal_Mind` du même niveau.
3. **Post LinkedIn** — Hook / corps SCQA / signature sobre. Alimenté par la BDD CONTENT.
4. **Veille** — Source, citation client anonymisée, angle possible.
5. **Atelier** — agenda 60 min, liste slides (10), lien formulaire feedback Tally.

## Exemple : workflow d'une mission dans Notion

`Intake Tally` crée PROSPECT (via Make/Zapier, fiche 08) → diagnostic booké → conversion en MISSION statut « Convention » → la page mission hérite du template 1 → prod → cases cochées → statut « Livré » → facture → « Clos ». Le dossier Yassine (freelance dev offshore, client US payant par SWIFT) et celui de Fatima (e-commerce YouCan, politique de confidentialité 09-08) sont les deux entrées fictives de test.

## Checklist setup J1 (45 min, cronométrée)

- [ ] Créer le workspace « Cabinet [Nom] », activer l'authentification à deux facteurs
- [ ] Créer les 8 BDD vides + 1 entrée de test chacune
- [ ] Câbler les Relations CLIENTS↔MISSIONS et le Rollup HonorairesCumules
- [ ] Dashboard : lier les 4 vues (MITs, Kanban, Prospects, KPI)
- [ ] Importer Yassine (CL-001) et Fatima (CL-002) en fictifs
- [ ] Tester le flow complet : prospect → mission → clos → archiver
- [ ] Export Notion initial (Settings → Export all workspace content → Markdown & CSV) et le stocker sur disque chiffré

## Les 3 règles anti-dérive

1. **Pseudonymes** : CodeClient partout, identité réelle dans un champ restreint ou mieux : hors du cloud US (coffre local chiffré, fiche 09).
2. **Une vérité par champ** : la date d'échéance n'existe que dans MISSIONS.
3. **Revue hebdo 15 min** : dimanche, statut « Prod » qui dort depuis 7 jours → NextAction obligatoire.

> **Lecture pro :** Notion est un excellent serveur, un mauvais coffre. Tout ce qui est pièce d'identité, dossier pénal ou contrat signé en clair vit chiffré côté UE/local ; Notion ne garde que les index et les brouillons pseudonymisés.

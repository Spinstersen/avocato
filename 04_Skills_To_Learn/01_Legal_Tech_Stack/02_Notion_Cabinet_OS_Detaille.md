# 02 — Notion Cabinet OS Détaillé (Cœur du Système)

> Inspire de `01_Strategy/05_ADHD_Operating_System_Overview/04_Second_Brain_Notion.md` mais spécialisé avocat d'affaires.

## Dashboard (page d'accueil Notion)

```
┌─ 3 MITs du jour (checkbox) ─────────────────┐
│ [ ] Rédiger contrat Yassine [ ] Publier post │
├─ Calendrier semaine (vue Calendar) ──────────┤
├─ Bases de données ───────────────────────────┤
│ CLIENTS (12 props)  MISSIONS (15) CONTENT (8)│
│ PROSPECTS  PARTENAIRES  TEMPLATES  VEILLE KPI│
└─────────────────────────────────────────────┘
```

## Schéma BDD CLIENTS (exemple 1 page)

- Props: Nom, Statut (AE/SARL), Niche (Freelance/Ecom/09-08), CA, Date entrée, Missions liées (relation), Contact (email/tél), Notes, Next step + date.
- Template: page client avec sous-pages missions.

## BDD MISSIONS

Props: Client (relation), Type (Pack Freelance 2900DH), Statut (Intake/Diag/Convention/Prod/Livré/Facturé), Échéance, Honoraires HT, Provision %, Lien Drive, Loom livraison.
Vues: Kanban par Statut, Timeline par Échéance, Table par CA.

## BDD CONTENT

Idées → Brouillon → Publié → Recyclé. Props: Canal (Blog/LinkedIn/Carrousel), Niche, Mot-clé SEO, Lien, Date pub, Perf (vues).
Automatisation: bouton "Dupliquer en post LinkedIn" (Zapier).

## BDD PROSPECTS

Source (LinkedIn/Bouche/Coworking), Score (0-10), Diagnostic fait? (checkbox), Offre proposée, Objection, Next touch date.
Règle: tout DM entrant → créer prospect en <2 min (Tally intake).

## Templates à créer (5)

1. Template Mission Pack Freelance (sections: Contexte, Risques, Livrables, Planning)
2. Template Note de risques (7 catégories checklist `07_Sharp_Legal_Mind`)
3. Template Post LinkedIn (Hook, Corps SCQA, Signature)
4. Template Veille (source, phrase client, idée content)
5. Template Atelier (agenda 60m, slides 10, feedback form)

## Workflow type (détaillé `08_Workflow_Integration_Zapier_Make.md`)

Tally intake → Zapier crée Notion Prospect → Calendly book → Meet → Notion Mission → Yousign envoi → Stripe provision → Prod Notion → Loom → PDF → Facture solde

## Checklist setup J1 (45 min)

- [ ] Créer workspace `Cabinet [Nom]`
- [ ] Créer 6 BDD vides + 1 entrée test par BDD
- [ ] Créer Dashboard + lier vues
- [ ] Importer 2 clients fictifs (Yassine dev, Fatima ecom)
- [ ] Tester flow: créer prospect → mission → archiver

---

## À retenir + checklist + suite — Notion Cabinet OS

**3 points clés de ce fichier :**
- Dashboard Notion = 3 MITs + calendrier + 6 BDD (Clients 12 props / Missions 15 / Content / Prospects / Templates / Veille KPI).
- BDD MISSIONS Kanban (Intake→Facturé) + vues Timeline/Table CA ; BDD Content = Idées→Recyclé.
- 5 templates cœur : Mission Pack Freelance, Note risques 7 catégories, Post SCQA, Veille, Atelier 60m.

**Checklist 6 points — Notion prêt à l'emploi :**
- [ ] Workspace `Cabinet [Nom]` créé + Dashboard lié aux 6 BDD
- [ ] 2 clients fictifs importés (Yassine dev offshore / Fatima ecom) + 1 entrée test/BDD
- [ ] Templates 5 créés + bouton "Dupliquer en post LinkedIn" (Zapier)
- [ ] Workflow Tally → Prospect Notion → Calendly → Mission → Yousign testé
- [ ] Vues Kanban/Timeline/Table configurées + filtre échéances
- [ ] Archivage Notion + backup export hebdo activé

**Renvoi glossaire :** `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §09 AE/SARL (props Statut/CA) + §10 Provision 50% (prop Honoraires) + §06 09-08 (anonymisation BDD).

**Interaction dossier :** Alimente `01_Legal_Tech_Stack/08_Workflow_Integration_Zapier_Make.md` (automatisation) et `03_Sales_Without_Selling/07_Metriques_Taux_Conversion.md` (KPI Notion).

**Sources spécifiques :** notion.so/templates, notion.so/help/database-relations, Zapier Notion guide — vérif 20/08/2026.
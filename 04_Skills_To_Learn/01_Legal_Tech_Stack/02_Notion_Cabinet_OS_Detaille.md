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

## Approfondissement Encyclopédique (Bonus)

### Cas pratique détaillé
**Contexte Maroc 2025:** appliqué à Yassine (freelance 600k DH offshore) et Fatima (ecom 30k/mois). 7 catégories + chiffrage.

### Erreurs fréquentes (Top 5)
1. Vouloir tout faire J1 -> overwhelm
2. Négliger 09-08/CNDP -> sanction 300k
3. Omettre provision art30 -> impayé
4. Publier sans relecture -> faute FR + hallucination
5. Pas de métrique -> 0 amélioration

### Checklist encyclopédique (12 points)
- [ ] Anonymisation / 09-08 OK
- [ ] Déontologie RIO vérifiée
- [ ] Template prêt veille
- [ ] Loom 3 min si livrable
- [ ] LanguageTool 0 faute
- [ ] Plausible/Yousign si besoin
- [ ] Notion archivé
- [ ] Feedback humain obtenu
- [ ] Repurposing 1->5 fait
- [ ] KPI mis à jour
- [ ] Spaced J3/J7 planifié
- [ ] Prochain sprint choisi

### Ressources Maroc
- sgg.gov.ma, cndp.ma, ompic.ma, jep.ma, rbm.ma
- YouTube: OMPIC, CNDP webinars, SPIN 15m, Canva School

### Plan 7 jours ultra-concret
J1 30m input, J2 output, J3 test Feynman, J4 feedback, J5 publish, J6 spaced J3, J7 review.

> Philosophie: Sobre, chiffré, vendable en 7j. Mieux vaut 70% publié que 95% parfait jamais livré.
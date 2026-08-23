# 03 — Notion : le schéma de base Pipeline Clients

> Votre CRM n'a pas besoin de 40 champs. Il a besoin de 12 propriétés bien typées, 5 vues qui répondent chacune à une question précise, et 3 rollups qui affichent vos KPI sans aucune saisie supplémentaire.

**Temps de lecture : 10 min · Niveau : intermédiaire · Piste : 04_Skills_To_Learn/18_AI_Auto**

**Liens :** Zaps `02_Zaps_15_Automatisations_Ready.md` · Chiffres du cabinet `../07_Sharp_Legal_Mind/03_Numbers_Sheet.md` · Registre `../../05_Document_Bank/templates/05_Registre_09-08_Modele.md`

## Objectifs

- Construire la base « Clients » en moins d'une heure avec exactement les propriétés listées ci-dessous.
- Créer 4 vues opérationnelles + 1 vue KPI pilotée par rollups.
- Garantir que la base respecte la minimisation Loi 09-08 (pas de donnée inutile, pas de pièce stockée).

## Prérequis

- Compte Notion actif ; notions de bases de données Notion (vue table/board — voir `../01_Legal_Tech_Stack/02_Notion_Cabinet_OS_Detaille.md`).
- Carte architecture validée (fichier 01).
- Décision notée dans le registre : finalité « gestion clients et prospects », catégories de données limitées au tableau ci-dessous.

## TL;DR

**1 base Clients, 12 propriétés, 4 relations, 5 vues, 3 rollups KPI.** Les statuts du pipeline : Prospect → Diag planifié → Diag fait → Convention envoyée → Signé → Actif → En cours → Clos → Archivé. Le principe ADHD-friendly : chaque vue répond à UNE question (« Qui dois-je rappeler aujourd'hui ? », « Quels impayés ? »), jamais deux à la fois.

## Contenu principal

### Propriétés de la base Clients

| # | Propriété | Type | Détail / options |
|---|---|---|---|
| 1 | Nom client | Title | Personne physique ou raison sociale |
| 2 | Statut | Status | Prospect / Diag planifié / Diag fait / Convention envoyée / Signé / Actif / En cours / Clos / Archivé |
| 3 | Matière | Select | Droit des sociétés, social, famille, immobilier, commercial, pénal, autre |
| 4 | Source d'acquisition | Select | Recommandation, Google, LinkedIn, site web, bouche-à-oreille |
| 5 | Email / Téléphone | Email + Phone | Coordonnées de contact uniquement |
| 6 | Date d'entrée | Date | Remplie automatiquement par Zap Z1 |
| 7 | Date diag | Date | Écrite par Zap Z3 depuis Calendly |
| 8 | Honoraires estimés | Number (DH) | Saisi après diagnostic |
| 9 | Provision requise | Number (DH) | Généralement 50 % des honoraires |
| 10 | Prochaine action | Texte + Date | « Relancer convention », « Envoyer Loom hebdo »… |
| 11 | Lien dossier Drive | URL | AAAA-MMJJ_Client-Matiere (fichier 08) |
| 12 | Notes conformité | Texte | Consentements recueillis, date déclaration CNDP applicables |

Relations (type Relation) : **Échéances** (dates procédurales), **Factures**, **Vidéos Loom**, **Documents signés**. Ces relations alimentent les rollups — c'est là que la magie KPI opère sans double saisie.

### Les 5 vues

| Vue | Format | Question à laquelle elle répond | Filtre / tri |
|---|---|---|---|
| Pipeline | Board par Statut | Où en est chaque dossier ? | Tous statuts sauf Archivé |
| Aujourd'hui | Table | Qui appeler/relancer aujourd'hui ? | Prochaine action ≤ aujourd'hui, tri date |
| Échéances 7 j | Calendrier | Quel délai procédural approche ? | Date échéance entre J-0 et J+7 ⚠️ |
| Impayés | Table | Qui doit quoi ? | Facture échue ET non payée |
| KPI Cabinet | Table + rollups | Combien j'ai gagné, converti, encaissé ce mois ? | Agrégats mensuels |

⚠️ Règle : la vue Échéances 7 j est épinglée en tête de votre espace de travail. Un délai procédural manqué est l'erreur la plus chère de toute cette piste — bien plus que tout gain d'automatisation.

### Rollups et KPI

Trois rollups suffisent au démarrage :

```text
ROLLUP 1  CA encaissé (mois)
   Source : relation Factures → propriété Montant payé
   Calcul : Somme, filtre "payé = oui" + mois en cours

ROLLUP 2  Taux de conversion prospect → mandat
   Formule : Count(Statut = Actif ou au-delà) / Count(Date entrée = mois)
   Lecture : 25 % = 3 mandats pour 12 prospects (référence solo)

ROLLUP 3  Délai moyen onboarding
   Source : relation Dates clés (entrée → signature)
   Calcul : Moyenne en jours ; cible interne : ≤ 5 jours
```

Ces trois chiffres se retrouvent chaque mois dans votre Numbers Sheet (`../07_Sharp_Legal_Mind/03_Numbers_Sheet.md`) — le rollup donne la valeur brute, vous y ajoutez source et date avant toute communication externe (protocole hallucination, fichier 06).

### Conformité 09-08 appliquée à la base

La base contient des données personnelles : elle figure donc dans votre registre des traitements (finalité « gestion de clientèle », destinataires : cabinet seul, durée de conservation définie, mesures : accès restreint, export hebdo). Trois interdits : pas de copie de CIN/passeport dans un champ fichier ; pas de données de santé ou d'infractions dans les notes libres sauf nécessité du mandat ; pas de partage de la base avec un sous-traitant hors Maroc sans analyse transfert CNDP. Export hebdomadaire CSV vers `_Backup` (Zap Z14) — la base Notion n'est pas un archivage légal, Drive reste le coffre.

## Cas pratique chiffré

Cabinet 2 avocats, Marrakech. Avant : suivi sur WhatsApp + carnet ; 30 % des prospects sans réponse structurée, conversion ≈ 15 %, temps de recherche « où en est X ? » ≈ 8 min/dossier/jour. Mise en place : base construite en 1 h, vues configurées en 45 min, Zaps Z1-Z3 branchés la même semaine. Après 60 jours : conversion 15 % → 22 % (aucun nouveau lead en plus — simplement zéro oubli de relance), temps de recherche < 30 s grâce à la vue Pipeline, rollup CA encaissé consulté en 10 s au lieu d'une demi-journée de comptabilité manuelle fin de mois. Gain consolidé ≈ 6 h/mois (estimation) + revenus additionnels liés aux relances récupérées.

## Erreurs Top 5 (avec coût)

| # | Erreur | Coût |
|---|---|---|
| 1 | 30+ propriétés dès le départ | Base illisible, abandon en 2 semaines ; reprise ≈ 3 h |
| 2 | Stocker les pièces d'identité dans la fiche | Non-conformité minimisation 09-08 ; exposition si compte compromis |
| 3 | Statuts libres au texte (« à suivre peut-être ») | Pipeline inexploitable, rollups faux ; nettoyage ≈ 2 h |
| 4 | Pas de vue Échéances épinglée | Un délai procédural manqué = responsabilité professionnelle engagée |
| 5 | Croire que Notion remplace l'archivage légal | Perte de traçabilité documentaire ; Drive doit rester le coffre |

## Checklist 12 points

- [ ] Base créée avec exactement les 12 propriétés
- [ ] Les 9 statuts configurés dans l'ordre du pipeline
- [ ] 4 relations posées (Échéances, Factures, Vidéos, Documents)
- [ ] Vue Pipeline par défaut à l'ouverture
- [ ] Vue Échéances 7 j épinglée ⚠️
- [ ] 3 rollups calculés et testés sur données fictives
- [ ] Aucune pièce d'identité dans un champ fichier
- [ ] Notes conformité renseignées (consentement, références registre)
- [ ] Entrée du registre 09-08 mise à jour pour cette finalité
- [ ] Zap Z1 écrit bien les champs Nom/Email/Téléphone/Matière
- [ ] Export CSV hebdomadaire vérifié une fois
- [ ] Rollups recopiés dans Numbers Sheet avec date de relevé

## QCM

**Q1.** Combien de propriétés au lancement ?
- A. Autant que possible pour tout tracer
- B. 12, dont 9 visibles au quotidien
- C. 5 seulement
- D. Peu importe

> **Réponse : B —** 12 propriétés couvrent pipeline, contact, financier et conformité sans noyer l'utilisateur. Chaque champ supplémentaire réduit le taux de remplissage réel — une base mal remplie est pire qu'un carnet papier honnête.

**Q2.** Quelle vue est épinglée en priorité et pourquoi ?
- A. Pipeline, pour la beauté du board
- B. Échéances 7 j, car un délai procédural manqué est l'erreur la plus coûteuse
- C. Impayés, pour presser les clients
- D. KPI, pour se motiver

> **Réponse : B —** le coût d'une échéance manquée dépasse largement tout gain d'efficacité de la piste : responsabilité disciplinaire et civile possible. La vue calendrier filtrée J-0/J+7 rend l'urgence visible sans effort de mémoire.

**Q3.** Que contient le rollup « Taux de conversion » ?
- A. Le nombre total de clients historiques
- B. Mandats actifs du mois divisés par prospects entrants du mois
- C. Le chiffre d'affaires annuel
- D. Le nombre de RDV honorés

> **Réponse : B —** mandats actifs ÷ prospects entrants du mois. Référence solo ≈ 25 % ; en dessous de 15 %, cherchez d'abord les relances oubliées avant de changer de stratégie marketing.

## Fiches révision

**Carte 1 — Pipeline.** Recto : les 9 statuts ? Verso : Prospect → Diag planifié → Diag fait → Convention envoyée → Signé → Actif → En cours → Clos → Archivé.

**Carte 2 — Rollups.** Recto : les 3 KPI natifs ? Verso : CA encaissé du mois, taux de conversion (cible ~25 %), délai moyen onboarding (cible ≤ 5 j).

**Carte 3 — Frontières 09-08.** Recto : 3 interdits dans la base ? Verso : pas de pièce d'identité, pas de données sensibles inutiles, pas de partage hors Maroc sans analyse transfert CNDP.

## EN - Key takeaways

One database, twelve properties, four relations, five views, three rollups — that is the entire CRM a solo or two-lawyer Moroccan practice needs. The nine-status pipeline tracks everything from Prospect to Archived; each view answers exactly one daily question, with the seven-day deadline calendar pinned first because a missed procedural deadline is the costliest error in this whole track. The three rollups compute cash collected, lead-to-mandate conversion (target around 25%), and average onboarding delay (target five days or less), then feed your Numbers Sheet with source and date before any external use. Compliance is built in: the base appears in your Loi 09-08 register, holds no identity documents, stores no unnecessary sensitive data, and never shares with processors outside Morocco without transfer analysis. Remember Notion is the cockpit, not the vault — Drive remains the legal archive with weekly CSV exports as safety net.

## AR - ملخص ومصطلحات

| FR | AR |
|---|---|
| Base de données CRM | قاعدة بيانات إدارة العملاء |
| Propriété (champ) | خاصية (حقل) |
| Vue filtrée | عرض مُصفّى |
| Rollup (agrégat) | تجميع البيانات |
| Échéance procédurale | أجل إجرائي |
| Taux de conversion | نسبة التحويل |

- Darija : "Kol vue jawab 3la so'al wa7ed safi — hakka kat-bqa l-base nadia."
- Darija : "L-ajal l-ijra'i maqbolch yfutek — khalli vue 'Échéances' foq dyal kolchi."

---
**Sources primaires :** cndp.ma (Loi 09-08, délib. 40-22) · sgg.gov.ma · CNIL.fr (référence RGPD comparative). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Aucune donnée client dans une IA sans anonymisation préalable (secret art.36). QCM pédagogique — aucun certificat.

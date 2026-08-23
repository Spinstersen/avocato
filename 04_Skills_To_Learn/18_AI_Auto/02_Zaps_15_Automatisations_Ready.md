# 02 — Zaps : 15 automatisations prêtes à installer

> Chaque scénario ci-dessous est écrit en trois blocs : Trigger (déclencheur) → Filter (condition) → Action. Copiez, adaptez les noms de champs à votre base Notion, testez avec des données fictives. Les gains sont des estimations honnêtes, pas des promesses.

**Temps de lecture : 11 min · Niveau : intermédiaire · Piste : 04_Skills_To_Learn/18_AI_Auto**

**Liens :** Basique Zapier/Make `../01_Legal_Tech_Stack/08_Workflow_Integration_Zapier_Make.md` (basique — ici on approfondit) · Schéma Notion `03_Notion_Pipeline_Clients_DB_Schema.md` · Anonymisation `05_Anonymisation_Pipeline_IA_Loi0908.md`

## Objectifs

- Installer 2 automatisations par semaine pendant 8 semaines au lieu de tout brancher en un week-end.
- Comprendre la grammaire commune Trigger → Filter → Action applicable à n'importe quel outil futur.
- Estimer le gain horaire réel de votre stack et l'inscrire dans vos chiffres (`../07_Sharp_Legal_Mind/03_Numbers_Sheet.md`).

## Prérequis

- Carte d'architecture validée (fichier 01) — chaque Zap doit correspondre à une flèche du schéma.
- Base Notion créée avec les statuts du fichier 03.
- Un compte de test : JAMAIS de données client réelles dans un Zap en cours de test.

## TL;DR

15 scénarios classés en 4 familles : **Capture (1-3), Contractualisation & paiement (4-7), Suivi client (8-11), Gouvernance interne (12-15).** Gain total estimé ≈ 13 h/mois pour un cabinet solo à 12 contacts/mois (estimation). Règle absolue : aucun Zap ne pousse une donnée identifiante vers un service IA — la seule exception passe par le pipeline d'anonymisation du fichier 05.

## Contenu principal

### Tableau maître des 15 Zaps

| N° | Nom | Trigger | Filter | Action | Gain/mois |
|---|---|---|---|---|---|
| Z1 | Capture prospect | Tally : nouvelle réponse | — | Créer fiche Notion statut « Prospect » + email accueil auto | ~90 min |
| Z2 | Anti-doublon | Tally : nouvelle réponse | Email déjà présent dans Notion ? | Si oui : notifier « doublon » sans créer de fiche | ~20 min |
| Z3 | RDV posé | Calendly : invitation créée | Statut fiche = Prospect | Notion → statut « Diag planifié » + date enregistrée | ~30 min |
| Z4 | Rappel diag | Calendly : invitation créée | — | Email rappel J-1 automatique au prospect | ~60 min |
| Z5 | Convention signée | Yousign : signature complétée | — | PDF signé → dossier Drive ; Notion → statut « Signé » | ~45 min |
| Z6 | Provision reçue | Stripe : paiement réussi | Montant ≥ provision définie | Notion → statut « Actif » ; reçu envoyé automatiquement | ~40 min |
| Z7 | Relance devis | Yousign : enveloppe vue non signée depuis 7 j | Relances < 2 | Email relance poli avec nouveau lien de signature | ~50 min |
| Z8 | Vidéo publiée | Loom : nouvelle vidéo dans dossier client | Dossier actif | Lien vidéo ajouté à la fiche Notion + email client | ~35 min |
| Z9 | Échéance proche | Notion : date d'échéance = J-7 | Statut dossier = Actif | Tâche prioritaire créée + email récapitulatif à soi-même | ~120 min |
| Z10 | Facture impayée | Notion : facture échue depuis 7 j | Paiement non reçu | Séquence relance J+7 / J+15 / J+30 (emails pré-rédigés) | ~60 min |
| Z11 | Satisfaction fin de mission | Stripe : solde soldé 100 % | — | Envoi formulaire satisfaction Tally ; réponse → fiche Notion | ~25 min |
| Z12 | Archivage déclenché | Notion : statut passé à « Clos » | — | Checklist archivage Drive générée + rappel purge à la date limite du registre | ~30 min |
| Z13 | Veille hebdo | Planificateur : lundi 7 h | — | Récapitulatif email : nouveaux prospects, échéances 7 j, impayés | ~90 min |
| Z14 | Backup hebdo | Planificateur : vendredi 18 h | — | Export CSV Notion → dossier Drive `_Backup` (hors ligne ensuite) | ~20 min |
| Z15 | Contrôle conformité mensuel | Planificateur : 1er du mois | — | Rappel : vérifier registre 09-08, accès Drive, vidéos Loom expirées | ~15 min |

Gain total estimé : ≈ 13 h/mois (estimation fondée sur 12 contacts entrants et 5 dossiers actifs/mois ; recalibrez après 30 jours d'usage réel).

### Grammaire d'un Zap bien écrit

Chaque scénario suit la même grille — imposez-la aussi à vos futurs Zaps :

```text
TRIGGER  : [Outil A] — événement précis (nouvelle réponse, paiement, date atteinte)
FILTER   : [Condition] — évite le bruit (statut, montant, nombre de relances)
ACTION 1 : [Outil B] — écriture de données
ACTION 2 : [Notification] — email/tâche si action humaine requise ensuite
TEST     : données fictives "ZZZ Test" uniquement
```

La ligne FILTER est celle que les débutants sautent et qui remplit votre boîte mail de bruit. Sans filtre, Z9 vous alerterait aussi sur les dossiers clos ; sans filtre, Z10 relancerait un client qui a payé ce matin.

### Ordre d'installation conseillé (2 par semaine)

Semaine 1 : Z1 + Z4 (capture et no-show — les gains les plus rapides). Semaine 2 : Z3 + Z6. Semaine 3 : Z5 + Z7. Semaine 4 : Z9 + Z14. Semaines suivantes : le reste selon votre douleur réelle, pas selon l'ordre du tableau. ⚠️ Ne jamais installer Z8 ou tout autre Zap sortant vers une IA sans avoir validé le fichier 05.

### Ce que ces Zaps ne font pas

Ils ne qualifient pas juridiquement le prospect, ne rédigent pas la convention (elle part d'un template que VOUS validez), ne décident pas d'une relance contentieuse et ne communiquent jamais seul un chiffre ou une date d'audience au client — l'email final reste relu avant envoi ou part avec mention « sous réserve de confirmation ».

## Cas pratique chiffré

Cabinet solo, Rabat, droit social. Avant Zaps : 12 prospects/mois, taux de no-show diagnostic ≈ 30 % (4 RDV perdus × 45 min = 3 h perdues), 2 relances devis oubliées/mois (≈ 2 mandats perdus/an), veille administrative 45 min/lundi. Installation sur 8 semaines : Z1 fait gagner ~90 min/mois de saisie, Z4 ramène le no-show à ~10 % (économie ≈ 2 h/mois), Z7 récupère 1 mandat sur 2 par an (valeur >> temps), Z13 condense la veille à 15 min (gain ≈ 2 h/mois). Total réaliste constaté après recalibrage : ≈ 11-13 h/mois (estimation). Coût de mise en place : ≈ 20 h réparties sur 2 mois, amorti dès le 3e mois.

## Erreurs Top 5 (avec coût)

| # | Erreur | Coût |
|---|---|---|
| 1 | Tester un Zap avec un vrai client en base | Données réelles parties vers un service tiers non déclaré — risque art. 52 : 300 000–500 000 DH + 6 mois prison |
| 2 | Oublier le Filter | Boîte mail saturée d'alertes inutiles, abandon du système en 3 semaines (~2 h/semaine gaspillées) |
| 3 | 15 Zaps le même week-end | Zaps mal nommés, indéboguables ; dette technique ≈ 1 semaine de nettoyage |
| 4 | Zap IA branché direct CRM → modèle IA | Transfert hors Maroc sans autorisation CNDP + secret art. 36 violé |
| 5 | Aucun nommage standard des Zaps (« Mon Zap 27 ») | Impossibilité d'auditer ce qui tourne ; incident non détectable |

## Checklist 12 points

- [ ] Chaque Zap correspond à une flèche de la carte architecture (fichier 01)
- [ ] Grille Trigger→Filter→Action respectée pour les 15
- [ ] Filtre présent sur tous les Zaps de notification
- [ ] Tests effectués exclusivement avec des données « ZZZ Test »
- [ ] Z1 et Z4 installés en premier
- [ ] Emails automatiques relus par un humain avant activation
- [ ] Aucun Zap ne pousse de donnée identifiante vers une IA
- [ ] Convention de nommage : `Z{n°}_{outil-source}_{action}` 
- [ ] Journal des Zaps activés tenu dans Notion (page « Stack »)
- [ ] Revue mensuelle : désactiver tout Zap déclenché 0 fois sur 60 jours
- [ ] Export CSV hebdomadaire fonctionnel (Z14) et copié hors ligne
- [ ] Gains mesurés à 30 jours et consignés dans `../07_Sharp_Legal_Mind/03_Numbers_Sheet.md`

## QCM

**Q1.** Quel élément d'un Zap évite le bruit de notifications ?
- A. Le trigger, s'il est bien choisi
- B. Le filter, qui pose une condition avant l'action
- C. L'action secondaire
- D. Le planificateur

> **Réponse : B —** le filter est la condition d'entrée (statut, montant, compteur). Sans lui, chaque événement déclenche l'action, y compris les inutiles — c'est la cause n° 1 d'abandon des systèmes d'automatisation.

**Q2.** Vous voulez qu'une IA résume les nouvelles demandes entrantes. Quelle configuration est conforme ?
- A. Zap Tally → API IA directement
- B. Zap Tally → pipeline d'anonymisation (pseudo-ID, suppression identifiants) → IA
- C. Copier-coller manuel depuis Notion vers l'IA
- D. Aucune, quelle que soit la méthode

> **Réponse : B —** l'anonymisation AVANT envoi est obligatoire : elle retire le régime du transfert hors Maroc soumis à autorisation CNDP et protège le secret professionnel art. 36 Loi 28-08. Le copier-coller manuel (C) viole la même règle.

**Q3.** Combien de Zaps installer par semaine au démarrage ?
- A. Tous les 15, pour rentabiliser vite
- B. 2 par semaine, en commençant par capture et no-show
- C. 1 par mois
- D. Peu importe l'ordre

> **Réponse : B —** deux par semaine permet de tester chacun en conditions réelles avant d'en ajouter un suivant, et couvre les gains majeurs (capture, no-show) dès la première semaine.

## Fiches révision

**Carte 1 — Les 4 familles.** Recto : les 4 familles de Zaps ? Verso : Capture (Z1-Z3), Contractualisation/paiement (Z4-Z7), Suivi client (Z8-Z11), Gouvernance interne (Z12-Z15).

**Carte 2 — La grille.** Recto : les 5 lignes d'un Zap bien écrit ? Verso : Trigger, Filter, Action 1, Notification, Test « ZZZ ».

**Carte 3 — La règle IA.** Recto : quel est le seul chemin légal vers une IA ? Verso : anonymisation préalable (pseudo-ID + suppression identifiants), jamais de pont direct CRM → IA.

## EN - Key takeaways

Fifteen ready-made scenarios follow one grammar: Trigger, Filter, Action, optional notification, test with fake data only. Four families organize them: capture (Tally to Notion, deduplication, booking), contractualization and payment (signature status, provision received, unpaid-quote and unpaid-invoice reminders), client follow-up (Loom links, deadline alerts at J-7, closing survey), and internal governance (weekly digest, Friday CSV backup, monthly compliance check). Total estimated saving: roughly 13 hours per month for a solo practice handling twelve leads — an honest estimate to recalibrate after thirty days. Install two zaps per week starting with capture and no-show reduction. Never skip the filter line, never test with real client data, and never connect a CRM directly to an AI model: the anonymization pipeline of file 05 is the only lawful route, protecting both the professional secrecy duty and the cross-border transfer rules.

## AR - ملخص ومصطلحات

| FR | AR |
|---|---|
| Déclencheur (trigger) | مُحفِّز |
| Filtre (condition) | مُرشِّح (شرط) |
| Automatisation | الأتمتة |
| Relance automatique | تذكير آلي |
| Export CSV | تصدير بصيغة CSV |
| No-show | عدم الحضور للموعد |

- Darija : "Kol Zap 3ando 3 dyal l-horuf: trigger kaybda, filter kay-salli ghir li mzyan, action kat-khdem."
- Darija : "Ma-t-testi-ch Zap b data dyal client bhaqqo — dir 'ZZZ Test' w safi."

---
**Sources primaires :** cndp.ma (Loi 09-08, délib. 40-22) · sgg.gov.ma · CNIL.fr (référence RGPD comparative). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Aucune donnée client dans une IA sans anonymisation préalable (secret art.36). QCM pédagogique — aucun certificat.

# 03 — Conformité Loi 09-08 & GDPR : Dossier Maître Encyclopédique

> **Dossier maître — Niche 3.** Playbook complet pour servir les PME tech, SaaS et startups marocaines qui collectent des données clients et doivent se mettre en conformité **Loi 09-08 (CNDP)** tout en s'alignant sur le **GDPR (règlement UE 2016/679)** pour signer des clients européens. S'appuie sur `01_Strategy/03_Unsaturated_Niches_Overview/05_Niche3_Conformite_09-08.md` + `08_Jurisprudence/01_Loi_09-08_CNDP_Sanctions.md`.

## TL;DR

*   **Volume:** ~2 500 PME tech/SaaS au Maroc déclarent ou devraient déclarer des traitements à la CNDP ; concurrence avocat quasi nulle hors Casa/Rabat sur ce créneau data. Douleur vive : le client UE envoie un DPA (Data Processing Agreement) de 12 pages que personne ne sait lire.
*   **Persona:** Hicham, 38 ans, cofondateur SaaS B2B (10 employés), 200 clients Maroc + 30 UE. Pas de registre, mentions absentes, données en clair dans HubSpot hébergé UE/US.
*   **Cadre:** Loi 09-08 (dahir 1-09-15, BO 5714) + décret 2-10-450 : formalités préalables (déclaration ; **autorisation** pour données sensibles), registre des traitements, information, sécurité, transferts hors Maroc encadrés ; volet pénal art. 52-65 — citables en diagnostic : **art. 64 (défaut de formalités : 10 000-100 000 DH)**, art. 65 (collecte frauduleuse : jusqu'à 3 ans de prison). + GDPR (règlement UE 2016/679) : art. 3(2) (application extraterritoriale), art. 27 (représentant UE), art. 28 (sous-traitants), art. 44-49 (transferts). *(Note 28/08/2026 : les numéros internes du vault « art. 12-14 / 23 / 43-44 » pour le droit marocain ne sont pas vérifiés au texte consolidé — transposer depuis `sgg.gov.ma` avant citation publique.)*
*   **Règle:** Le Maroc n'a **pas** de décision d'adéquation UE. Un SaaS marocain qui sert l'UE doit satisfaire **aux deux** — 09-08 et GDPR — via clauses contractuelles types, pas l'un ou l'autre.
*   **Offre:** Diagnostic 1 200 HT → Pack Conformité 09-08 PME 8 000-12 000 HT → Alignment GDPR 5 000-8 000 HT → Abonnement veille conformité 4 500 HT/mois.
*   **Canal #1:** LinkedIn tech + SEO « loi 09-08 » + partenariats DSI/agences web qui livrent des sites non conformes sans le savoir.

## Comment lire ce dossier (14 fichiers)

| # | Fichier | Quand le consulter |
| :--- | :--- | :--- |
| 00 | `00_INDEX.md` | Plan du dossier — vous y êtes |
| 01 | `01_Persona_Hicham.md` | Profil détaillé du dirigeant SaaS/PME tech |
| 02 | `02_Douleurs_Juridiques.md` | Les 11 douleurs 09-08/GDPR, article par article |
| 03 | `03_Offre_Productisee.md` | Les 5 missions packagées + workflow |
| 04 | `04_Mots_Cles_SEO.md` | 9 mots-clés + calendrier 12 semaines |
| 05 | `05_Canaux_Acquisition.md` | 6 canaux concrets + KPI |
| 06 | `06_Scripts_DM_WhatsApp.md` | 9 scripts de réponse conformes déontologie |
| 07 | `07_Cas_Pratique_Complet.md` | Mission type Hicham de A à Z, chiffrée |
| 08 | `08_Zones_Grises_Cas_Limites.md` | 5 zones grises data + cas limite extraterritorialité |
| 09 | `09_Jurisprudence_Niche.md` | Bases CNDP vérifiables + cas types étiquetés + Schrems II/Planet49 |
| 10 | `10_Comparatif_International.md` | 09-08 vs GDPR vs CNIL — comparer pour expliquer |
| 11 | `11_Arbre_Decision_Niche.md` | Déclarer, autoriser, s'aligner : l'arbre en 2 min |
| 12 | `12_Fiches_Pratiques_Niche.md` | Checklist 15 points + modèles Document Bank |
| 13 | `13_Solutions_Juridiques.md` | **Le playbook douleur → parade** : solution juridique détaillée de chaque douleur (registre, clause rédigée, procédure, piège) |

## Matrice risque (à afficher en diagnostic)

| Situation | Risque | Coût si non résolu | Verdict |
|---|---|---|---|
| Registre absent | Mise en demeure CNDP + amende | 10k-100k DH (art. 64) + blocage client UE | 🔴 Registre en 10 jours |
| Données de santé/biométrie sans autorisation | Traitement illicite (art. 12-14) | Injonction + pénal | 🔴 Autorisation préalable |
| AWS/GCP/HubSpot sans contrat sous-traitant | Art. 24/25 09-08 + art. 28 GDPR | Responsabilité en cascade sur fuite | 🟠 Contrats clauses types |
| 30 clients UE sans DPA signé | GDPR art. 3(2) + art. 28 | Perte du contrat UE, DPA bloqué en legal review | 🟠 Pack alignment GDPR |
| Prospection SMS/WhatsApp sans opt-in | Art. relatifs aux droits + pratique CNDP (prospection = 1ᵉʳ motif de plainte) | Amende + purge de base | 🔴 Consentement prouvé |

## Offre cœur

**Pack Conformité 09-08 PME** — 8 000-12 000 DH HT : audit, registre 5 colonnes, politique de confidentialité FR/EN, mentions + bannière cookies, plan d'action 90 jours, Loom 20 min. Voir `03_Offre_Productisee.md`.

## Liens utiles

- Vue d'ensemble : `01_Strategy/03_Unsaturated_Niches_Overview/05_Niche3_Conformite_09-08.md`.
- Jurisprudence : `08_Jurisprudence/01_Loi_09-08_CNDP_Sanctions.md` (cas types étiquetés + grille sanctions réelle art. 64/65).
- Templates : `05_Document_Bank/templates/05_Registre_09-08_Modele.md`.
- Tech & conformité du cabinet lui-même : `04_Skills_To_Learn/01_Legal_Tech_Stack/09_Securite_Backup_09-08.md` + `04_Skills_To_Learn/02_AI_For_Lawyers_Prompts/05_CNDP_Declaration_Modele.md`.
- Déontologie : `01_Strategy/01_Rules_Of_The_Game_No_Ads_Morocco/`.

---

## Note de méthode professionnelle

Ce document s'inscrit dans la démarche `01_Strategy/01_Rules_Of_The_Game_No_Ads_Morocco/` : information sobre, références primaires (`sgg.gov.ma`, `oc.gov.ma`, `cndp.ma`), devoir d'information art. 59, secret art. 36, convention art. 30. Le chiffre n'est jamais jeté sans sa base légale et sa date de vérification. Barème et pratiques CNDP à revérifier chaque année sur `cndp.ma` (dernière vérification : 20/08/2026).

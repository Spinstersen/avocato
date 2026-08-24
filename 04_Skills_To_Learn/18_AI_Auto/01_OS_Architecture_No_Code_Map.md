# 01 — OS Architecture : la carte no-code du cabinet

> Avant de brancher un seul Zap, dessinez la ville. Cette carte fixe où entre la donnée, où elle vit, qui la déplace et où elle dort. Un système sans carte devient un cimetière d'outils abandonnés en 3 mois.

**Temps de lecture : 9 min · Niveau : intermédiaire · Piste : 04_Skills_To_Learn/18_AI_Auto**

**Liens :** Intégrations basiques `../01_Legal_Tech_Stack/08_Workflow_Integration_Zapier_Make.md` (basique — ici on approfondit) · Prompts `../02_AI_For_Lawyers_Prompts/00_INDEX.md` · Conformité `../../02_Niches_Deep_Dive/03_Loi_09-08_GDPR_Compliance/00_INDEX.md`

## Objectifs

- Mémoriser le flux complet prospect → dossier archivé en moins de 60 secondes (test de récitation).
- Identifier, pour chaque étage de l'architecture, l'outil responsable, la donnée collectée et son statut au sens de la Loi 09-08.
- Poser les 3 règles structurelles : source unique de vérité, minimisation à la capture, séparation données brutes / données diffusées.

## Prérequis

- Avoir lu `../01_Legal_Tech_Stack/00_INDEX.md` (connaissance des outils de base).
- Un registre des traitements ouvert (modèle : `../../05_Document_Bank/templates/05_Registre_09-08_Modele.md`) — 5 colonnes minimum : finalité, catégories de données, destinataires, durée de conservation, mesures de sécurité.
- Une adresse email métier dédiée (pas l'email personnel).

## TL;DR

Sept étages : **Tally capte → Notion centralise → Calendly qualifie (diag 45 min) → Yousign contractualise → Stripe finance (provision 50 %) → Loom informe → Drive archive.** Notion est la source unique de vérité ; tout outil périphérique écrit dans Notion et nulle part ailleurs. Toute donnée identifiante qui doit sortir vers une IA passe d'abord par le pipeline d'anonymisation (fichier 05).

## Contenu principal

### Le schéma maître

```text
                    [ VISITEUR / PROSPECT ]
                              │
              ┌───────────────▼───────────────Ŀ
   ÉTAGE 1    │ TALLY — formulaire intake      │  consentement + finalité affichés
              └───────────────┬────────────────┘
                              │ Zap 1 : création fiche
              ┌───────────────▼───────────────Ŀ
   ÉTAGE 2    │ NOTION CRM — source unique     │  statut : Prospect
              └───────┬───────────────┬────────┘
                      │ Zap : lien Calendly    │ email auto
              ┌───────▼───────Ŀ               │
   ÉTAGE 3    │ CALENDLY       │◄──────────────┘
              │ diag 45 min    │  rappels J-2 / J-1 automatiques
              └───────┬────────┘
                      │ diagnostic OK
              ┌───────▼───────Ŀ
   ÉTAGE 4    │ YOUSIGN        │  convention d'honoraires signée électroniquement
              └───────┬────────┘  PDF signé → archivé Drive + statut Notion "Signé"
                      │
              ┌───────▼───────Ŀ
   ÉTAGE 5    │ STRIPE         │  provision 50 % — commission ~2,9%+3 DH carte
              └───────┬────────┘  internationale [vérifier tarifs Stripe Maroc]
                      │ paiement confirmé
              ┌───────▼───────Ŀ
   ÉTAGE 6    │ LOOM           │  vidéos de suivi hebdo, lien posé dans Notion
              └───────┬────────┘
                      │ clôture mission
              ┌───────▼───────Ŀ
   ÉTAGE 7    │ GOOGLE DRIVE   │  AAAA-MMJJ_Client-Matiere — purge planifiée
              └────────────────┘  selon durées du registre 09-08
```

### Tableau des étages

| Étage | Outil | Donnée captée | Statut 09-08 | Garde-fou obligatoire |
|---|---|---|---|---|
| 1 | Tally | Nom, email, téléphone, matière, résumé du litige | Collecte déclarée à la CNDP (déclaration préalable, délai 30 j avant mise en service — délib. 40-22) | Mention finalité + droits sur le formulaire |
| 2 | Notion | Fiche complète client/dossier | Traitement interne cabinet | Registre à jour ; pas de pièce d'identité stockée |
| 3 | Calendly | Créneaux, présence au RDV | Traitement interne | Rappels automatisés, pas de données santé |
| 4 | Yousign | Convention signée, preuve de signature | Document contractuel | Archivage immédiat dans le dossier client |
| 5 | Stripe | Montants, statut paiement | Traitement paiement — Stripe détient les données carte, pas vous | Jamais de capture manuelle de numéro de carte |
| 6 | Loom | Vidéos de suivi (visage/voix avocat) | Diffusion client contrôlée | Lien non listé, accès limité au client |
| 7 | Drive | Pièces du dossier | Conservation selon durées définies | Permissions par dossier + purge annuelle |

### Les 3 règles structurelles

1. **Source unique de vérité = Notion.** Si une information n'est pas dans la fiche client Notion, elle n'existe pas juridiquement pour le cabinet. Les autres outils sont des satellites : ils écrivent dans Notion via Zap, jamais l'inverse en double.
2. **Minimisation à la capture.** Le formulaire Tally ne demande que ce que le diagnostic exige : identité de contact, matière, description libre du besoin. Pas de copie de CIN demandée au stade prospect — c'est au stade dossier que les pièces entrent, directement dans Drive.
3. **Deux circuits de données.** Circuit interne (identifié) : Tally → Notion → Drive. Circuit IA (anonymisé) : extraction manuelle ou Zap de préparation → pipeline d'anonymisation (pseudo-ID, suppression des identifiants) → outil IA. Aucun pont direct Notion → IA n'est autorisé.

### Ce que l'automatisation ne fait JAMAIS

⚠️ Trois actes restent humains et non déléguables : le conseil juridique lui-même, la décision d'accepter ou refuser un mandat, et toute communication de chiffre ou d'échéance au client (contrôle hallucination, fichier 06). L'architecture déplace l'administratif ; elle ne déplace pas la responsabilité.

### Points de défaillance prévus

Chaque flèche du schéma peut tomber. Prévoir le mode dégradé dès le jour 1 : si Stripe échoue, virement bancaire classique avec mention du référencement client ; si Yousign est indisponible, signature manuscrite scannée même jour dans le dossier ; si Notion est inaccessible, export CSV hebdomadaire conservé hors ligne (fichier 10).

## Cas pratique chiffré

Cabinet solo, Casablanca, 12 contacts entrants/mois. Avant architecture : chaque contact traité manuellement — recopie carnet (10 min), email aller-retour créneaux (25 min), rédaction convention (20 min), vérification virement (8 min), relances oubliées estimées 15 min. Total ≈ 78 min/contact × 12 = 15,6 h/mois d'administratif. Après architecture : contrôle de fiche auto-créée (4 min), clic sur lien Calendly reçu (1 min), envoi convention depuis template Yousign (6 min), consultation notification Stripe (2 min). Total ≈ 13 min/contact × 12 = 2,6 h/mois. Gain ≈ 13 h/mois (estimation), soit ~156 h/an — plus de 4 semaines de travail administratif récupérées.

## Erreurs Top 5 (avec coût)

| # | Erreur | Coût |
|---|---|---|
| 1 | Brancher les Zaps avant d'avoir dessiné la carte | 2-3 jours de reconfiguration + scénarios incohérents |
| 2 | Deux sources de vérité (Notion + carnet papier) | Divergence de statuts, rendez-vous manqués ~2 h/semaine |
| 3 | Demander la CIN au formulaire prospect | Non-conformité minimisation 09-08, risque sanction art. 52 : amende 300 000–500 000 DH + emprisonnement dès 6 mois |
| 4 | Pont direct Notion → outil IA sans anonymisation | Transfert hors Maroc sans autorisation CNDP + violation secret art. 36 Loi 28-08 |
| 5 | Aucun mode dégradé prévu | Panne outil = cabinet bloqué une journée entière |

## Checklist 12 points

- [ ] Schéma dessiné sur une page (papier ou outil) et affiché
- [ ] Chaque étage a UN outil désigné, pas deux candidats
- [ ] Formulaire Tally : finalité, base de traitement et droits affichés
- [ ] Déclaration préalable CNDP déposée ou calendrier de dépôt noté (30 j)
- [ ] Registre des traitements créé avec les 5 colonnes
- [ ] Notion désigné comme source unique de vérité, écrit dans le règlement intérieur
- [ ] Aucune pièce CIN/passeport demandée au stade prospect
- [ ] Circuit IA séparé du circuit interne (pas de Zap direct CRM → IA)
- [ ] Mode dégradé documenté pour Stripe, Yousign et Notion
- [ ] Convention type prête dans Yousign avec variables
- [ ] Convention de nommage Drive validée avant le premier dossier
- [ ] Test de récitation du flux réussi en moins de 60 secondes

## QCM

**Q1.** Un ami avocat veut envoyer les pièces de son dossier depuis Notion directement vers une IA de synthèse. Que dit la carte ?
- A. C'est autorisé si le dossier est ancien
- B. C'est interdit sans passage préalable par le circuit d'anonymisation
- C. C'est autorisé si l'IA promet la confidentialité
- D. C'est autorisé avec l'accord oral du client

> **Réponse : B —** la règle structurelle n° 3 impose deux circuits séparés. Toute donnée identifiante envoyée hors du Maroc vers une IA relève du transfert soumis à autorisation CNDP et touche au secret professionnel art. 36 Loi 28-08. L'anonymisation AVANT envoi est la seule voie praticable au quotidien.

**Q2.** Pourquoi Notion plutôt que « partout » comme référentiel ?
- A. Parce que Notion est gratuit
- B. Parce qu'une source unique de vérité évite la divergence des statuts et des relances
- C. Parce que la loi impose Notion
- D. Parce que les clients préfèrent Notion

> **Réponse : B —** la divergence de statuts est la première cause de rendez-vous manqués et d'oublis de relance. Un seul référentiel écrit par tous les satellites rend l'état du dossier consultable en 5 secondes.

**Q3.** À quel moment les pièces d'identité du client doivent-elles entrer dans le système ?
- A. Au stade prospect, pour vérifier l'identité
- B. Au stade dossier, directement dans le dossier Drive dédié
- C. Dans la fiche Notion, champ « CIN »
- D. Jamais

> **Réponse : B —** la minimisation impose de ne collecter les pièces qu'au moment où elles sont nécessaires au mandat, au stade dossier, dans l'espace d'archivage dédié — jamais dans le formulaire public ni dans le CRM.

## Fiches révision

**Carte 1 — Les 7 étages.** Recto : citez les 7 étages dans l'ordre. Verso : Tally → Notion → Calendly → Yousign → Stripe → Loom → Drive.

**Carte 2 — Source unique.** Recto : quel outil centralise tout ? Verso : Notion ; les satellites écrivent dedans, jamais en parallèle ailleurs.

**Carte 3 — Deux circuits.** Recto : quelle différence entre circuit interne et circuit IA ? Verso : interne = données identifiées (Tally→Notion→Drive) ; IA = données anonymisées uniquement, pseudo-ID, zéro identifiant.

## EN - Key takeaways

The architecture map is drawn before any zap is built: seven layers — Tally captures with displayed consent, Notion serves as the single source of truth, Calendly runs the 45-minute diagnostic with automatic reminders, Yousign signs the fee agreement, Stripe collects the 50% provision (~2.9%+3 DH international card commission, verify Stripe Morocco pricing), Loom delivers weekly video updates, and Drive archives under the dated naming rule. Three structural rules govern it: one source of truth, data minimization at capture (no ID copies at prospect stage), and two separate data circuits — identified data stays internal, AI-bound data must pass through anonymization first. Legal rails: prior CNDP declaration within 30 days before go-live, transfer outside Morocco requires CNDP authorization, and article 52 sanctions reach 300,000–500,000 DH plus at least six months imprisonment. Plan degraded modes for every arrow in the diagram.

## AR - ملخص ومصطلحات

| FR | AR |
|---|---|
| Architecture no-code | هندسة بدون برمجة |
| Source unique de vérité | مصدر وحيد للحقيقة |
| Minimisation des données | تقليص المعطيات إلى الحد الأدنى |
| Consentement affiché | الموافقة المعروضة |
| Mode dégradé | وضع العمل الاحتياطي عند العطب |
| Étage du système | طابق من طبقات النظام |

- Darija : "Notion howa l-qelb — kolchi kaykteb fih, w ila machi fih rah ma-keynch."
- Darija : "Ma-tleqqa-ch Notion m3a IA bla anonymisation — rah transfert khassou autorisation mn CNDP."

---
**Sources primaires :** cndp.ma (Loi 09-08, délib. 40-22) · sgg.gov.ma · CNIL.fr (référence RGPD comparative). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Aucune donnée client dans une IA sans anonymisation préalable (secret art.36). QCM pédagogique — aucun certificat.

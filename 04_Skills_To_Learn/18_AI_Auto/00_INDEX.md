# 00 — Index piste 18 : AI Auto, le système opérant no-code du cabinet

> La piste 02 vous a appris à parler aux IA avec des prompts. Cette piste bâtit l'usine autour des prompts : un système d'exploitation no-code où les outils se parlent entre eux, où le prospect avance seul jusqu'à la convention signée, et où l'avocat ne touche que le travail juridique et la relation humaine.

**Temps de lecture : 7 min · Piste : 04_Skills_To_Learn/18_AI_Auto · Public : avocat solo ou petit cabinet au Maroc**

## Liens vers les pistes sœurs

- Prompts IA et protocole d'anonymisation : `../02_AI_For_Lawyers_Prompts/00_INDEX.md` (les prompts vivent là ; ici on construit la tuyauterie)
- Protocole d'anonymisation détaillé : `../02_AI_For_Lawyers_Prompts/03_Anonymisation_Protocole.md`
- Intégrations Zapier/Make niveau basique : `../01_Legal_Tech_Stack/08_Workflow_Integration_Zapier_Make.md` (basique — ici on approfondit)
- Sécurité, backup et Loi 09-08 niveau basique : `../01_Legal_Tech_Stack/09_Securite_Backup_09-08.md`
- Conformité 09-08 approfondie : `../../02_Niches_Deep_Dive/03_Loi_09-08_GDPR_Compliance/00_INDEX.md`
- Modèle de registre des traitements : `../../05_Document_Bank/templates/05_Registre_09-08_Modele.md`
- Chiffres de référence du cabinet : `../07_Sharp_Legal_Mind/03_Numbers_Sheet.md`

## Le problème que cette piste résout

Un avocat solo marocain gère en moyenne 40 à 80 contacts entrants par mois dont 10 à 20 deviennent des dossiers (estimation terrain). Sans automatisation, chaque contact coûte 60 à 120 minutes de tâches administratives : recopier l'email dans un carnet, créer le dossier Drive, rédiger la convention, relancer pour la signature, vérifier le virement de la provision, informer le client. Soit 12 à 25 heures par mois d'administratif pur — du temps facturable perdu.

L'automatisation no-code ne remplace ni le conseil juridique ni le jugement professionnel. Elle supprime la double saisie, les oublis de relance et les retards d'onboarding. La règle de cette piste tient en une phrase : **l'humain décide, le système exécute la répétition.**

## Carte des 13 fichiers

| Fichier | Ce que vous saurez faire | Lecture |
|---|---|---|
| 01 — OS Architecture No Code Map | Dessiner la cartographie complète du flux prospect → dossier archivé | 9 min |
| 02 — Zaps : 15 Automatisations Ready | Installer 15 scénarios Trigger→Filter→Action prêts à copier | 11 min |
| 03 — Notion Pipeline Clients DB Schema | Construire le CRM Notion avec rollups KPI | 10 min |
| 04 — Make vs Zapier Comparatif | Choisir l'orchestrateur adapté à votre volume | 8 min |
| 05 — Anonymisation Pipeline IA (Loi 09-08) | Envoyer des données vers une IA sans violer la loi | 9 min |
| 06 — Hallucination Guard Protocol | Bloquer tout chiffre non sourcé avant qu'il sorte du cabinet | 8 min |
| 07 — Loom SOP Vidéos Templates | Produire des vidéos SOP réutilisables en moins de 15 min chacune | 8 min |
| 08 — Google Drive Structure Conformité 09-08 | Nommer, partager et purger les dossiers conformément | 9 min |
| 09 — Stack Costs & ROI Chiffré | Calculer le ROI réel de votre stack en heures × valeur heure | 9 min |
| 10 — Sécurité, Backup, Continuité | Appliquer 2FA, gestionnaire de mots de passe, 3-2-1 | 10 min |
| 11 — Cas Practice : Onboarding Automatisé | Reproduire un onboarding client complet en timeline | 9 min |
| 12 — Arbre QCM & Fiches AI Auto | Réviser toute la piste en arbre décisionnel + QCM | 6 min |

Ordre conseillé : 01 → 03 → 02 → 04 → 05 → 06 → 07 → 08 → 09 → 10 → 11 → 12. Les fichiers 05, 06 et 08 sont **obligatoires avant tout envoi de données vers une IA** : ils portent les ancrages légaux (Loi 09-08, secret professionnel art. 36 Loi 28-08).

## Le système en une image

```text
PROSPECT
   │ Tally (formulaire intake, consentement affiché)
   ▼
NOTION CRM ──► Calendly diag 45 min ──► Yousign convention ──► Stripe provision 50%
   │                                                                      │
   ├── Loom vidéos de suivi hebdo ◄──────────────────────────────────────┘
   ▼
DRIVE archive AAAA-MMJJ_Client-Matiere ──► purge planifiée (durées 09-08)
```

Trois garde-fous transversaux traversent tout le schéma : (1) registre des traitements à jour — 5 colonnes minimum, modèle disponible dans la Document Bank ; (2) anonymisation AVANT tout envoi vers une IA ; (3) aucun chiffre ne sort du cabinet sans base + source + date (Numbers Sheet).

## Budget qualitatif de départ

Aucun prix fixe inventé : les éditeurs changent leurs grilles trop souvent. Règle de lecture : « freemium » = utilisable gratuitement jusqu'à un seuil ; « [prix éditeur, vérifier] » = abonnement mensuel dont vous vérifiez le tarif sur le site de l'éditeur avant achat.

| Outil | Rôle dans l'OS | Coût indicatif |
|---|---|---|
| Tally | Formulaire intake | Freemium [prix éditeur, vérifier] |
| Notion | CRM + base de connaissance | Freemium puis abonnement [prix éditeur, vérifier] |
| Calendly | Prise de RDV diagnostic 45 min | Freemium puis abonnement [prix éditeur, vérifier] |
| Yousign | Signature électronique convention | Abonnement mensuel [prix éditeur, vérifier] |
| Stripe | Provision 50 % par carte | Commission ~2,9 % + 3 DH carte internationale [vérifier tarifs Stripe Maroc] |
| Loom | Vidéos SOP et suivi client | Freemium puis abonnement [prix éditeur, vérifier] |
| Zapier ou Make | Orchestration des Zaps | Paliers selon nombre d'opérations/mois [prix éditeur, vérifier] |
| Google Workspace | Drive + email métier | Abonnement par utilisateur [prix éditeur, vérifier] |

Seuil de rentabilité type : si le système vous rend ne serait-ce que 4 heures par mois, il est amorti dès lors que votre valeur horaire dépasse le coût total de la pile — démonstration chiffrée au fichier 09.

## Comment travailler cette piste

Format ADHD-friendly assumé : un fichier = une session de 30 à 45 minutes maximum. Lisez le TL;DR, faites la checklist, installez UN seul Zap, testez-le avec vos propres données de test (jamais celles d'un client réel), passez au fichier suivant. Ne cherchez pas à installer les 15 automatisations en un week-end : deux par semaine suffisent pour tenir 90 jours sans abandonner.

## EN - Key takeaways

This track builds the no-code operating system around your AI prompts: Tally captures leads into a Notion CRM, Calendly books the 45-minute diagnostic, Yousign signs the fee agreement, Stripe collects the 50% provision, Loom delivers video updates, and Drive archives under the AAAA-MMJJ_Client-Matiere naming rule. Three compliance rails cross everything: keep your Loi 09-08 processing register current, anonymize BEFORE any data reaches an AI tool, and never release a number without its Numbers Sheet basis, source, and date. Moroccan law adds hard constraints: prior CNDP declaration within the 30-day window, authorization for any transfer outside Morocco, and criminal sanctions up to 300,000–500,000 DH plus imprisonment under article 52. Read files 05, 06, and 08 before connecting anything. Install two zaps weekly, not fifteen in one weekend — consistency beats intensity.

## AR - ملخص ومصطلحات

| FR | AR |
|---|---|
| Système d'exploitation no-code | نظام تشغيل بدون برمجة |
| Registre des traitements | سجل معالجة المعطيات |
| Anonymisation préalable | إخفاء الهوية المسبق |
| Provision de 50 % | تسبيق بنسبة 50 في المائة |
| Déclaration préalable CNDP | التصريح المسبق لدى اللجنة الوطنية |
| Secret professionnel | السر المهني |

- Darija : "Had l-système kaykhelli l-outils y-hedrou m3a b3dyathom — nta kat-focus ghir 3la l-khedma l-qanouniya."
- Darija : "Qbel ma-tsift ay data l AI, khassha tkoun m-anonymisée — hadi qanoun, machi ikhtiyar."

---
**Sources primaires :** cndp.ma (Loi 09-08, délib. 40-22) · sgg.gov.ma · CNIL.fr (référence RGPD comparative). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Aucune donnée client dans une IA sans anonymisation préalable (secret art.36). QCM pédagogique — aucun certificat.

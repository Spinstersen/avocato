# 08 — Google Drive : structure, nommage et conformité 09-08

> Le Drive du cabinet n'est pas un tiroir : c'est un coffre léger. Une arborescence fixe, une convention de nommage datée, des permissions par dossier et des durées de conservation alignées sur votre registre 09-08. Tout le reste est du désordre futur.

**Temps de lecture : 9 min · Niveau : obligatoire · Piste : 04_Skills_To_Learn/18_AI_Auto**

**Liens :** Registre type `../../05_Document_Bank/templates/05_Registre_09-08_Modele.md` · Niche conformité `../../02_Niches_Deep_Dive/03_Loi_09-08_GDPR_Compliance/00_INDEX.md` · Sécurité basique `../01_Legal_Tech_Stack/09_Securite_Backup_09-08.md`

## Objectifs

- Déployer l'arborescence standard en moins d'une heure.
- Appliquer la convention `AAAA-MMJJ_Client-Matiere_Objet_V{n}` sans exception.
- Poser permissions et purges documentées — la conservation « à l'infini » est une non-conformité silencieuse.

## Prérequis

- Google Workspace actif avec domaine métier [prix éditeur, vérifier].
- Registre 09-08 ouvert : les durées de conservation y sont définies PAR TYPE de document.
- Décision Shared Drive (drive partagé) vs My Drive prise — recommandée : Shared Drive dès 2 utilisateurs.

## TL;DR

**Arbre en 4 racines : `_Templates`, `_Registre_09-08`, `AAAA_Annee` (dossiers clients), `_Backup`.** Nommage `AAAA-MMJJ_Client-Matiere_Objet_V1`. Permissions : associé = éditeur partout ; collaborateur = éditeur sur ses dossiers assignés seulement ; client = lecteur via dossier dédié. Purge annuelle documentée selon les durées du registre — jamais pendant un litige en cours.

## Contenu principal

### L'arborescence standard

```text
CABINET (Shared Drive)
│
├── _Templates                  modèles : conventions, courriers, checklists
├── _Registre_09-08             registre, déclarations CNDP, journal anonymisation
├── _Backup                     exports CSV Notion, configurations Zaps, clés de secours chiffrées
│
└── 2026
    ├── 2026-0312_Benali-Social_Convention-honoraires_V2.pdf
    ├── _CLI-2026-014_Benali-Social/
    │   ├── 01_Convention
    │   ├── 02_Pieces-client        (accès restreint)
    │   ├── 03_Correspondances
    │   ├── 04_Pieces-procedure
    │   └── 05_Facturation
    └── _CLI-2026-015_Amzil-Commercial/
        └── ...
```

Règle : UN dossier par client-mandat, préfixe pseudo-ID (`_CLI-...`) pour trier au-dessus de l'ordre alphabétique des fichiers datés. Les sous-dossiers 01→05 ne changent JAMAIS de nom : c'est ce qui permet aux Zaps (Z5 archivage convention, Z12 checklist de clôture) d'écrire au bon endroit.

### La convention de nommage

```text
AAAA-MMJJ_Client-Matiere_Objet_V{n}
     │        │        │      │      └─ version : V1, V2… ou FINAL pour l'envoyée
     │        │        │      └──────── objet court : Convention, Requete, LRAR...
     │        │        └─────────────── matière : Social, Commercial, Famille...
     │        └──────────────────────── client : nom abrégé (pas de prénoms complets)
     └───────────────────────────────── date du jour de création
```

Exemples corrects : `2026-08-23_Benali-Social_Mise-a-demeure_V1.docx`, `2026-08-23_Amzil-Commercial_Convention_FINAL.pdf`. Exemples refusés : « doc final vrai dernier (3).docx », « scan0007.pdf ». La date en tête fait trier chronologiquement tout listing — c'est la propriété la plus utile du système.

### Matrice des permissions

| Rôle | Accès | Détail |
|---|---|---|
| Avocat associé | Éditeur | Toute la Shared Drive |
| Collaborateur | Éditeur | Uniquement ses dossiers assignés ; lecture `_Templates` |
| Assistant(e) | Éditeur | Sauf `02_Pieces-client` sensibles (liste définie au registre) |
| Client | Lecteur | Via dossier dédié « Espace client » ou lien spécifique, jamais sur la racine |
| Comptable | Lecteur | `05_Facturation` uniquement |

⚠️ Revue trimestrielle des partages obligatoire (Zap Z15) : qui a accès à quoi, pourquoi. Les liens « toute personne avec le lien » sont interdits sur les pièces identifiantes.

### Conservation et purge alignées 09-08

La Loi 09-08 impose de ne pas conserver les données personnelles au-delà de la durée nécessaire — c'est votre registre qui fixe ces durées PAR TYPE (modèle : `../../05_Document_Bank/templates/05_Registre_09-08_Modele.md`). Fonctionnement annuel :

```text
PURGE ANNUELLE (date fixe, ex. janvier)
1. Exporter la liste des dossiers "Clos" depuis Notion.
2. Croiser avec les durées du registre → liste "à purger".
3. Exclure tout dossier concerné par un litige / contrôle / délai en cours.
4. Supprimer + consigner dans le journal de purge (date, dossier, fondement).
5. Ne JAMAIS purger manuellement "au feeling" — la trace écrite protège.
```

Deux garde-fous : la purge est suspendue sur tout dossier contentieux ou susceptible de l'être ; les archives pérennes (conventions signées, décisions définitives) suivent les règles déontologiques de conservation propres à la profession — en cas de doute, on conserve et on documente la décision.

### Drive comme coffre, pas comme CRM

Le Drive stocke des DOCUMENTS ; l'état du dossier vit dans Notion (fichier 03) ; les dates vivent dans la base Échéances. Cette séparation évite le syndrome « je cherche dans mes mails » : recherche par nommage = résultat en secondes, car la convention rend chaque fichier trouvable par date, client, matière ou objet.

## Cas pratique chiffré

Cabinet 2 avocats, Fès, ~40 dossiers/an. Avant : arborescence libre, temps moyen de retrouvaille d'un document ≈ 6 min, doublons ≈ 15 % du volume, aucune purge jamais faite (disque plein après 3 ans, migration pénible), un partage « public lien » découvert sur un dossier ancien. Mise en place : arbre + convention déployés en 1 h, règle appliquée aux nouveaux dossiers, migration des 10 dossiers actifs seulement (les anciens gelés dans un sous-dossier `_ARCHIVE-FROIDE`). Après 90 jours : retrouvailles < 30 s, doublons quasi nuls sur nouveaux dossiers, première purge documentée réalisée (12 dossiers clos sortis conformément au registre), partage public supprimé lors de la revue trimestrielle. Gain ≈ 4 h/mois de recherche évitée (estimation) + risque d'exposition fermé.

## Erreurs Top 5 (avec coût)

| # | Erreur | Coût |
|---|---|---|
| 1 | Nommage libre (« doc final (3) ») | 6 min × 20 recherches/semaine perdues ≈ 2 h/semaine |
| 2 | Partage par lien ouvert sur pièces identifiantes | Diffusion incontrôlable — exposition 09-08 et secret art. 36 |
| 3 | Aucune purge pendant des années | Stockage saturé + conservation excessive contraire à la discipline 09-08 ; nettoyage ≈ 2 jours |
| 4 | My Drive personnel pour les dossiers clients | Continuité rompue si compte perso ; accès impossible en cas d'absence |
| 5 | Purge « au feeling » sans journal | Impossibilité de justifier ; suppression d'une pièce utile = catastrophe |

## Checklist 12 points

- [ ] Shared Drive cabinet créé (pas de My Drive pour les clients)
- [ ] Arbre 4 racines déployé (`_Templates`, `_Registre_09-08`, année, `_Backup`)
- [ ] Sous-dossiers 01→05 standardisés par mandat
- [ ] Convention de nommage affichée et appliquée au premier fichier
- [ ] Pseudo-ID en préfixe de dossier (`_CLI-AAAA-NNN_...`)
- [ ] Matrice permissions posée et testée avec un compte collaborateur
- [ ] Liens publics interdits sur pièces identifiantes ⚠️
- [ ] Durées de conservation notées par type au registre
- [ ] Date annuelle de purge posée au calendrier
- [ ] Journal de purge créé dans `_Registre_09-08`
- [ ] Revue trimestrielle des partages intégrée à Z15
- [ ] Sauvegarde hors ligne hebdomadaire du Drive essentiel (fichier 10)

## QCM

**Q1.** Pourquoi la date en tête de chaque fichier ?
- A. Esthétique
- B. Tri chronologique automatique de tout listing — retrouvaille instantanée
- C. Obligation légale expresse
- D. Pour les sauvegardes

> **Réponse : B —** `AAAA-MMJJ` trie naturellement tous les listings, indépendamment de l'outil. C'est la moitié de la valeur de la convention ; le reste vient des champs fixes client/matière/objet/version.

**Q2.** Quand purge-t-on un dossier client ?
- A. Dès la fin du mandat
- B. À la date annuelle planifiée, selon les durées du registre, hors litiges en cours, avec journal
- C. Jamais
- D. Quand le disque est plein

> **Réponse : B —** la conservation excessive n'est pas une prudence mais une non-conformité 09-08 ; la purge se fait sur planning, critères écrits, exclusion des litiges, et trace documentaire. Jamais au feeling (D).

**Q3.** Qui peut accéder à `02_Pieces-client` ?
- A. Tous les membres de la Shared Drive
- B. Rôle restreint défini à la matrice, revu trimestriellement
- C. Toute personne avec le lien
- D. Le client lui-même en éditeur

> **Réponse : B —** les pièces identifiantes suivent le besoin d'y accéder : matrice explicite, revue trimestrielle, liens ouverts prohibés. Le client reste en lecteur de son espace dédié, pas éditeur des pièces du dossier.

## Fiches révision

**Carte 1 — L'arbre.** Recto : les 4 racines ? Verso : `_Templates`, `_Registre_09-08`, `AAAA_Annee`, `_Backup`.

**Carte 2 — Le nommage.** Recto : la formule ? Verso : `AAAA-MMJJ_Client-Matiere_Objet_V{n}` — FINAL réservé à la version envoyée.

**Carte 3 — La purge.** Recto : les 5 étapes annuelles ? Verso : exporter clos → croiser registre → exclure litiges → supprimer + journaliser → jamais au feeling.

## EN - Key takeaways

Drive is the vault, Notion is the cockpit: documents live here, status lives there. Deploy four roots — Templates, the 09-08 register folder, year folders for client mandates, and Backup — then enforce one naming rule without exception: AAAA-MMJJ_Client-Matiere_Object_Vn, with FINAL reserved for the sent version; the leading date makes every listing chronological automatically. One folder per mandate with fixed subfolders 01–05 so zaps always write to the right place. Permissions follow a written matrix: partners edit everything, associates edit only assigned mandates, accountants see invoicing only, clients get a dedicated read-only space, and open link sharing is banned for identity documents. Retention is defined per document type in your Loi 09-08 register and executed as an annual documented purge — never ad hoc, never during live litigation. Expect retrieval under thirty seconds instead of six minutes and roughly four hours recovered monthly.

## AR - ملخص ومصطلحات

| FR | AR |
|---|---|
| Arborescence | شجرة الملفات |
| Convention de nommage | اتفاقية تسمية الملفات |
| Permissions d'accès | صلاحيات النفاذ |
| Durée de conservation | مدة الحفظ |
| Purge documentée | حذف موثق |
| Coffre documentaire | الخزنة الوثائقية |

- Darija : "Kol fichier b tarikh foq — hakka kat-lqah f 30 seconde machi f 6 dqayq."
- Darija : "L-purge dirha mera f l3am b jurnal — machi bla waqt w machi 'au feeling'."

---
**Sources primaires :** cndp.ma (Loi 09-08, délib. 40-22) · sgg.gov.ma · CNIL.fr (référence RGPD comparative). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Aucune donnée client dans une IA sans anonymisation préalable (secret art.36). QCM pédagogique — aucun certificat.

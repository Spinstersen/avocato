# 02 — Cartographie des sources officielles : où vérifier chaque matière, URL par URL

> **À quoi ça sert :** la table de correspondance matière → source primaire du droit marocain des affaires,
> avec le niveau de confiance de chaque URL. Règle du vault : une URL non certaine n'est PAS écrite —
> on décrit l'institution et on laisse le drapeau. Temps de lecture : 9 minutes.

## 1. POURQUOI : la veille sans carte, c'est Google au jugé

L'audit du 28-29/08/2026 (`PROGRESS_AUDIT_NICHES.md` §1) a été mené contre une liste fermée de sources :
sgg.gov.ma, cndp.ma, ompic.ma, oc.gov.ma, tax.gov.ma, plus la presse éco documentée.
Cette liste est la colonne vertébrale du vault ; ce fichier l'étend matière par matière.
Le danger inverse existe : collectionner des « annuaires juridiques » privés qui consolident sans date
et sans mention de leur propre retard. Une cartographie n'a de valeur que si chaque entrée précise :

1. **ce qu'on y vérifie** (la matière) ;
2. **ce qu'on n'y trouvera jamais** (le trou connu) ;
3. **le niveau de confiance de l'URL** (certaine / à confirmer).

## 2. COMMENT : la table maîtresse

### 2.1 Sources certaines (utilisées et vérifiées par l'audit du vault)

| Institution | URL | Matière | Ce qu'on y cherche concrètement |
|---|---|---|---|
| Secrétariat général du gouvernement (SGG) | **sgg.gov.ma** | Tout texte officiel | **Textes consolidés** (versions en vigueur article par article) ; **BO** en PDF par numéro ; dates de promulgation |
| Direction générale des impôts (DGI) | **tax.gov.ma** | Fiscalité | **CGI** consolidé ; lois de finances ; instructions ; actualité et calendrier de la **facturation électronique** |
| CNDP | **cndp.ma** | Données personnelles (loi 09-08) | Guides officiels (registre, grilles) ; décisions et avis **tels que publiés** — la CNDP ne publie PAS de sanctions numérotées accessibles : ne jamais inventer de « décision n° » |
| OMPIC | **ompic.ma** | Marques, brevets, registre du commerce | **ROMARIN** (recherche de marques, consultation gratuite) ; dépôt et état des enregistrements ; oppositions ; tarifs publiés |
| Office des Changes | **oc.gov.ma** | Réglementation des changes | **IGOC édition courante (2026, en vigueur au 01/01/2026 ; l'édition 2024 est archivée)** ; communiqués ; circulaires — dont communiqué du 31/12/2025 et circulaire ADII n° 6708/311 du 19/01/2026 (vérifiés audit) |
| Ministère de la Justice | **justice.gov.ma** | Organisation judiciaire ; apostille | Communications officielles ; pour l'apostille (Convention de La Haye 1961 ; Maroc membre depuis le 14/08/2016 — `[[06_Recherche_Conventions_Fiscales_TBI]]`) : portails dédiés [flag : URL exacte du portail apostille à confirmer avant de la donner à un client] |
| Ministère de l'Économie et des Finances | **mpfinance.gov.ma** | Politique financière | Projets de loi de finances (dépôt d'automne) ; rapports du budget |

### 2.2 Institutions à décrire SANS URL affirmée (état de confiance au 30/08/2026)

| Institution / acteur | Matière | Conduite à tenir |
|---|---|---|
| **Administration des douanes et taxes indirectes (ADII)** | Douane ; contrôle des changes ; recouvrement des amendes | Circulaire d'application de l'IGOC documentée (6708/311 du 19/01/2026 — citée via oc.gov.ma et presse éco) ; portail propre [flag : URL à confirmer avant citation] |
| **Conservation foncière (ANCF)** — CFI, mainlevées, certificats de propriété | Foncier | Décrire : « conservation foncière — portail [à confirmer, du type foncier.ma] » ; pour tout acte client, la source qui fait foi est la **conservation régionale**, pas le site |
| **Plateforme de paiement des impôts (« houcheki »)** | Paiement DGI | « paiement en ligne via le portail des impôts, accessible depuis tax.gov.ma » — ne pas donner d'URL tierce |
| **Ministère de l'Éducation nationale** | Scolarisation MRE, équivalences | Le vault n'a vérifié AUCUN texte scolaire : rediriger vers l'académie régionale ; portal [à confirmer] |
| **CNSS / AMO** | Social | Décret 2-21.477 (régime TNS des AE) documenté par l'audit via sources concordantes ; portail [à confirmer] ; tout chiffrage social se fait sur simulation officielle du JOUR de la note |
| **Ordres / barreaux (Casablanca, Rabat…)** | RIO, déontologie locale | Les règlements intérieurs ne sont pas tous en ligne : écrit au secrétariat du barreau ; citation = « RIO de l'Ordre de [ville], art. [relevé sur place] » [flag permanent] |
| **Plateformes de jurisprudence** (jurisprudence.ma, jep.ma) | Décisions | Pistes documentées par l'audit, JAMAIS preuves : ouvrir la décision ou écrire « via [plateforme], référence à authentifier » — méthode `[[05_Recherche_Jurisprudence]]` |

### 2.3 Sources internationales certaines (matières transfrontalières)

| Source | URL | Usage au cabinet |
|---|---|---|
| Cour de justice UE / EUR-Lex | curia.europa.eu ; eur-lex.europa.eu | Arrêts data citables en persuasion : **C-311/18 Schrems II**, **C-673/17 Planet49** |
| OMPI (WIPO) | wipo.int | Madrid (Maroc partie au Protocole depuis le 08/10/1999 — vérifié) ; Lex ; calculateur de taxes |
| CNUCED — Investment Policy Hub | investmentpolicyhub.unctad.org | Base des TBI : point de départ, JAMAIS d'arrivée — on remonte au texte publié au BO |
| CIRDI | icsid.worldbank.org | Statut des États (Maroc contractant depuis le 11/10/1967) ; sentences publiées (Malicorp ARB/08/4) |
| Conférence de La Haye (HCCH) | hcch.net | État de l'apostille et **objections entre États** — dont l'objection allemande à l'adhésion du Maroc (trouvaille d'audit 30/08) |

## 3. EXEMPLE : le trajet d'une question client en trois sources

[cas illustratif] Yassine (diagnostic 900 DH HT) : « mon client français me retient-il quelque chose sur la facture ? »

```
1. tax.gov.ma → CGI : régime des services rendus depuis le Maroc par un résident ;
   art. 42 s. si AE (numéro relevé au consolidé du jour) — on note URL + date.
2. Banque du vault : 08_Jurisprudence/06 → liste des conventions vérifiées ;
   convention FR du 29/05/1970 (avenant 18/08/1989) → lire l'article AU TEXTE
   (méthode 6 étapes de 06), jamais de mémoire.
3. oc.gov.ma → IGOC 2026 : rapatriement du produit des EXPORTATIONS DE SERVICES
   sous 90 jours (délai vérifié par l'audit) → la note intègre le change aussi.
Sortie : note de recherche (modèle [[08_Note_de_Recherche_Modele]]) — chaque brique
avec sa source et sa date ; ce qui flotte reste dans le bloc « non vérifié ».
```

## 4. Les trous connus de la carte (à assumer devant le client)

- **Consolidations en retard** : certains textes sectoriels ne sont pas consolidés — on retombe alors
  sur la succession des BO : plus long, mais seul chemin fiable.
- **Jurisprudence** : pas de base open data consolidée (état de l'art 2026 — `[[05_Recherche_Jurisprudence]]`) ;
  la carte s'arrête là où le ministère ne publie pas.
- **RIO par Ordre** : non cartographiable de l'extérieur — flag permanent du dossier déontologie.
- **Les dates « de mémoire »** : le vault a porté une convention France-Maroc « de 1959 » pendant des mois ;
  la mémoire et la carte ne se mélangent pas (leçon développée en `[[06_Recherche_Conventions_Fiscales_TBI]]`).

## 5. Lire le BO sans se noyer (quatre réflexes)

1. **Le numéro ne suffit pas** : un BO se cite « n° [x] du [date] » — le n° 7536 de la loi 66-23
   prend sa valeur de sa date d'existence, pas de son chiffre.
2. **La table du BO d'abord** : un même numéro porte lois, décrets, arrêtés et conventions ;
   chercher la MATIÈRE dans la table, pas la première page qui ressemble.
3. **Version numérique et date** : le SGG archive les PDF par numéro — si la version en ligne
   n'affiche pas de date lisible, on la note « date non affichée à la consultation [date] ».
4. **Un BO n'est pas un consolidé** : la loi y apparaît dans son état du jour de publication ;
   l'état du droit se prend au consolidé (`[[03_Lire_Un_Texte_Consolide]]` § 2.1).

## 6. Rituel de mise à jour de la carte (une ligne par séance mensuelle)

1. Un acteur « [à confirmer] » par mois reçoit un appel ou une capture d'écran datée → la ligne passe
   en « vérifié le [date] » ou reste flaguée avec sa date de test.
2. Toute URL donnée à un client est recopiée DEPUIS la table § 2.1 — pas depuis l'historique d'un navigateur.
3. La carte vit aussi dans le champ « sources » de la base Notion (`01_Legal_Tech_Stack/02_Notion_Cabinet_OS_Detaille`) :
   la table markdown du vault est la référence ; Notion en est l'index de travail.

> **Lecture pro :** une carte des sources vaut par ses zones blanches autant que par ses URL sûres.
> Le jeune avocat qui écrit « cette donnée n'existe pas en ligne : j'appelle le guichet et je date l'appel »
> dans une note de recherche est celui qu'on rappelle pour les dossiers sérieux.

# 12 — Arbre de décision, QCM et fiches de révision de la piste AI Auto

> Le fichier de consolidation : trois arbres décisionnels à mémoriser (donnée → destination ; Zapier vs Make ; incident), une banque de QCM de révision, et les fiches finales. Objectif : tenir tout le système en tête en 6 minutes.

**Temps de lecture : 6 min · Niveau : révision · Piste : 04_Skills_To_Learn/18_AI_Auto**

**Liens :** Index piste `00_INDEX.md` · Prompts `../02_AI_For_Lawyers_Prompts/00_INDEX.md` · Anonymisation `05_Anonymisation_Pipeline_IA_Loi0908.md` · Guard chiffres `06_Hallucination_Guard_Protocol.md` · Sécurité `10_Securite_Backup_Continuite.md`

## Objectifs

- Répondre correctement aux 3 arbres en situation réelle, sans rouvrir les fichiers.
- Valider la piste par un QCM de synthèse (12 questions).
- Disposer des 3 fiches finales imprimables pour le bureau.

## Prérequis

- Avoir parcouru les fichiers 01 à 11.
- Idéalement : avoir installé au moins Z1 et Z4 en conditions réelles.

## TL;DR

Trois réflexes résument la piste : **(1) une donnée identifiante va vers une IA ? → NON, anonymisation d'abord ; (2) quel orchestrateur ? → celui que votre volume justifie, vérifié chez l'éditeur ; (3) un incident ? → détecter-couper-évaluer-documenter-informer, plan papier.** Tout le reste se déduit de ces réflexes.

## Contenu principal

### Arbre 1 — Où va cette donnée ?

```text
DONNÉE À TRAITER
│
├─ Est-elle identifiante (directement ou par combinaison) ?
│   │
│   ├─ OUI ──► Destination = circuit interne uniquement
│   │           Tally → Notion → Drive (registre à jour)
│   │           IA ? → STOP → pipeline anonymisation (fichier 05)
│   │                     puis pseudo-ID + nettoyage + journal
│   │
│   └─ NON (déjà anonymisée / générique)
│       └─ IA autorisée avec prompt template + guard sortie
│           (aucun chiffre sans base+source+date — fichier 06)
│
└─ Est-ce une pièce sensible (CIN, santé, contrat signé) ?
    └─ OUI → reste LOCAL, jamais copié hors cabinet ❌
```

### Arbre 2 — Quel orchestrateur ?

```text
VOLUME D'OPÉRATIONS/MOIS ?
│
├─ < ~500 ............ Zapier (gratuit/premier palier) [vérifier]
├─ ~500–1 000 ........ Testez les deux gratuits sur Z1 + Z14 → gardez le plus lisible pour vous
└─ > ~1 000 ou flux multi-branches ......... Make (routes + volume) [prix éditeur, vérifier]

DANS TOUS LES CAS : nommage standard · journal Notion · revue mensuelle · export config
```

### Arbre 3 — Incident en cours ?

```text
SIGNAL ANORMAL (connexion étrange / Zap en erreur massif / fichier manquant)
│
├─ DÉTECTER  : constater, horodater, ne pas supprimer de preuve
├─ COUPER    : sessions révoquées, mots de passe changés, Zaps suspendus
├─ ÉVALUER   : quelles données ? quels clients ? quelle gravité ?
├─ DOCUMENTER: rapport écrit immédiat (papier si besoin)
└─ INFORMER  : personnes concernées · CNDP si traitement touché · conseil si doute

APRÈS : post-mortem 30 min + mise à jour du plan (fichier 10)
```

### Banque de QCM de synthèse

**Q1.** Premier étage du système et sa fonction ?
- A. Stripe — encaisser vite
- B. Tally — capturer avec consentement affiché
- C. Loom — séduire en vidéo
- D. Notion — tout stocker

> **Réponse : B —** Tally capture avec finalité et droits affichés, alimentant Z1 vers le CRM. Sans capture propre et déclarée, tous les étages suivants reposent sur une base non conforme.

**Q2.** La source unique de vérité du cabinet est…
- A. Le carnet papier
- B. La boîte mail
- C. La fiche Notion
- D. WhatsApp Business

> **Réponse : C —** ce qui n'est pas dans la fiche n'existe pas pour le cabinet. Les satellites écrivent dans Notion via Zaps ; aucune divergence de statuts possible.

**Q3.** Un prospect vous envoie une pièce CIN par email avant même le diagnostic.
- A. Vous la collez dans sa fiche Notion
- B. Vous ne la demandiez pas encore ; elle attendra le stade dossier dans Drive `02_Pieces-client`
- C. Vous l'envoyez à une IA pour vérification
- D. Vous la stockez sur votre bureau

> **Réponse : B —** minimisation 09-08 : on ne collecte pas avant nécessité, et une pièce identifiante vit dans le coffre documentaire au stade dossier — jamais dans le CRM public ni dans une IA.

**Q4.** Le filtre (Filter) d'un Zap sert à…
- A. Accélérer Internet
- B. Poser une condition avant l'action pour éviter le bruit
- C. Chiffrer les données
- D. Rien, c'est décoratif

> **Réponse : B —** statut, montant, compteur de relances : le filtre décide si l'action vaut la peine. Sans lui, notifications inutiles → abandon du système.

**Q5.** Trois rollups KPI de la base Clients ?
- A. CA encaissé, taux conversion, délai onboarding
- B. Nombre de cafés, pages lues, appels passés
- C. Followers, likes, partages
- D. Aucun

> **Réponse : A —** les trois indicateurs pilotent le cabinet et alimentent la Numbers Sheet avec date de relevé avant toute communication externe.

**Q6.** Make devient généralement pertinent à partir de…
- A. 10 opérations/mois
- B. ~1 000 opérations/mois ou flux multi-branches [prix éditeur, vérifier]
- C. Jamais
- D. 100 000 opérations/mois
- D. 100 000 opérations/mois

> **Réponse : B —** en dessous, Zapier suffit et s'apprend plus vite ; au-delà, l'inclusion d'opérations et les routes conditionnelles de Make prennent l'avantage économique et technique — tarifs à re-vérifier chez l'éditeur avant décision.

**Q7.** Avant d'envoyer quoi que ce soit à une IA…
- A. On prie
- B. On exécute le pipeline : tri, pseudo-ID, nettoyage, local, prompt placeholders, journal
- C. On demande au client oralement
- D. On choisit l'IA la plus chère

> **Réponse : B —** six étapes, ~4 minutes, preuve conservée au journal. Le transfert hors Maroc non maîtrisé expose à l'art. 52 (300 000–500 000 DH + emprisonnement dès 6 mois) et touche le secret art. 36.

**Q8.** Un chiffre sort du cabinet si…
- A. Il sonne juste
- B. Il a base + source + date (Numbers Sheet) ou double source officielle datée
- C. L'IA l'a affirmé deux fois
- D. Le client presse

> **Réponse : B —** règle d'or du guard : interne = Numbers Sheet ; référence juridique = texte officiel ouvert + version notée. « Sonne juste » est le début de tous les incidents de crédibilité.

**Q9.** Convention de nommage Drive…
- A. `AAAA-MMJJ_Client-Matiere_Objet_V{n}`
- B. `doc final vrai dernier (3)`
- C. Nom du client seul
- D. Date de naissance du client

> **Réponse : A —** date en tête = tri chronologique universel ; champs fixes = recherche instantanée par client, matière, objet, version.

**Q10.** La purge annuelle se fait…
- A. Au feeling un soir de fatigue
- B. Sur planning fixe, selon durées du registre, hors litiges, avec journal
- C. Jamais
- D. Quand le disque est plein

> **Réponse : B —** conserver indéfiniment n'est pas de la prudence mais un manquement à la discipline 09-08. Planning + critères écrits + trace documentaire.

**Q11.** ROI mensuel du stack =
- A. (heures économisées × valeur heure) − coût stack
- B. Nombre de Zaps × 100 DH
- C. Prix des outils ÷ 12
- D. Incalculable

> **Réponse : A —** point mort ≈ 2-3 h rendues/mois. Commission Stripe traitée comme coût de recouvrement intégré à la marge [vérifier tarifs Stripe Maroc].

**Q12.** Séquence d'incident correcte ?
- A. Paniquer → supprimer tout → nier
- B. Détecter → couper → évaluer → documenter → informer
- C. Attendre le lendemain
- D. Poster sur les réseaux

> **Réponse : B —** cinq temps, plan imprimé au coffre, post-mortem ensuite. L'improvisation sous stress est le pire conseiller.

### Fiches finales du bureau

**Fiche murale 1 — Les réflexes.** Donnée identifiante → circuit interne. IA → anonymisation d'abord. Chiffre sortant → base+source+date. Signature+provision → alors seulement travail.

**Fiche murale 2 — Les rituels.** Vendredi : backup + vidéos hebdo. Lundi : revue pipeline + récap auto. Mensuel : Z15 conformité (registre, accès, journal IA). Trimestriel : test restauration + revue partages.

**Fiche murale 3 — Les interdits.** Pas d'IA sur données brutes. Pas de lien public sur pièces. Pas de travail sans provision. Pas de Zap testé sur client réel. Pas de purge au feeling.

## Cas pratique chiffré

Test de consolidation mené après 90 jours d'application de la piste (profil solo type, 12 prospects/mois) : les 3 arbres restitués sans erreur, score QCM ≥ 11/12, Z1-Z14 actifs sauf 2 jugés inutiles au réel, gains recalibrés ≈ 11 h/mois × 600 DH ≈ 6 600 DH contre ≈ 1 200 DH d'abonnements [prix éditeur, vérifier] — ROI net positif dès le mois 2 (estimations). Le marqueur de réussite n'est pas la perfection technique : c'est la capacité à répondre aux 12 questions SANS rouvrir un seul fichier. Si un échec persiste, retour ciblé au fichier correspondant — 10 minutes, pas une relecture complète.

## Erreurs Top 5 (avec coût)

| # | Erreur | Coût |
|---|---|---|
| 1 | Lire la piste sans installer (théorie pure) | Zéro gain ; relecture complète nécessaire (~4 h perdues) |
| 2 | Sautez les fichiers 05/06/08 « plus tard » | Non-conformité active : risque art. 52 + secret art. 36 |
| 3 | Considérer le QCM comme formel | Lacunes révélées par un client plutôt qu'en révision |
| 4 | Ne pas recalibrer les gains à J+30 | ROI fantasmé, décisions faussées sur les outils |
| 5 | Ne pas imprimer les fiches murales | Dépendance à la mémoire dans l'urgence ; réflexes perdus |

## Checklist 12 points

- [ ] Arbre 1 (donnée→destination) restitué sans erreur
- [ ] Arbre 2 (orchestrateur) décidé avec volume réel noté
- [ ] Arbre 3 (incident) plan imprimé au coffre
- [ ] Score QCM ≥ 11/12 obtenu
- [ ] Questions ratées → fichier source relu
- [ ] Fiche murale 1 (réflexes) affichée
- [ ] Fiche murale 2 (rituels) intégrée au calendrier
- [ ] Fiche murale 3 (interdits) partagée aux collaborateurs
- [ ] Gains recalibrés à J+30 consignés dans Numbers Sheet
- [ ] Registre 09-08 complet après lecture piste
- [ ] Journal d'anonymisation utilisé au moins une fois
- [ ] Prochaine étape planifiée : piste `../02_AI_For_Lawyers_Prompts/00_INDEX.md` pour les prompts

## QCM

**Q1.** Quelle combinaison résume les 3 réflexes de la piste ?
- A. Acheter, brancher, facturer
- B. Anonymisation avant IA · orchestrateur selon volume · plan d'incident papier
- C. Publier, promouvoir, prospérer
- D. Déléguer, oublier, espérer

> **Réponse : B —** conformité (05), choix outillé (04), résilience (10). Tous les autres fichiers détaillent ces trois réflexes.

**Q2.** Le marqueur de réussite de la piste est…
- A. Le nombre d'outils achetés
- B. Répondre aux 12 questions de synthèse sans rouvrir les fichiers
- C. Le nombre de followers LinkedIn
- D. La longueur du registre

> **Réponse : B —** le système doit vivre dans vos réflexes, pas dans vos favoris. Un score < 11 indique le fichier à retravailler — dix minutes suffisent.

**Q3.** Que fait-on des Zaps jamais déclenchés depuis 60 jours ?
- A. On les garde « au cas où »
- B. Revue mensuelle : on les désactive et note la raison
- C. On les duplique
- D. On les vend

> **Réponse : B —** un scénario mort est du bruit de maintenance et un risque silencieux (il peut se réveiller mal). La revue mensuelle garde le système vivant et auditable.

## Fiches révision

**Carte 1 — Les 3 arbres.** Recto : lesquels ? Verso : donnée→destination · orchestrateur selon volume · incident en 5 temps.

**Carte 2 — Le score.** Recto : seuil de validation ? Verso : ≥ 11/12 sans documentation ; chaque erreur renvoie à son fichier source pour 10 minutes.

**Carte 3 — La suite logique.** Recto : après cette piste ? Verso : `../02_AI_For_Lawyers_Prompts/00_INDEX.md` pour armer les prompts qui circuleront dans le système — toujours derrière le pipeline d'anonymisation.

## EN - Key takeaways

Consolidation happens through three decision trees and twelve questions. Tree one governs data destinations: identifying information stays on the internal circuit (Tally, Notion, Drive), sensitive documents stay strictly local, and anything AI-bound passes the six-step anonymization pipeline first. Tree two picks the orchestrator by real monthly volume — Zapier below roughly five hundred operations, tested head-to-head in the middle band, Make beyond a thousand or for branching flows, pricing verified with editors. Tree three runs the incident sequence: detect, cut, evaluate, document, inform, then post-mortem. The validation marker is answering all twelve synthesis questions without reopening files; anything below eleven sends you back to one targeted chapter for ten minutes. Print the three wall cards — reflexes, rituals, prohibitions — because systems survive only when their rules are visible at the desk, not buried in bookmarks. Next step: arm your prompts behind the anonymization gate.

## AR - ملخص ومصطلحات

| FR | AR |
|---|---|
| Arbre de décision | شجرة القرار |
| QCM de synthèse | اختبار اختيار من متعدد شامل |
| Réflexe opérationnel | مُنعكس تشغيلي |
| Fiche de révision | بطاقة مراجعة |
| Score de validation | عتبة النجاح |
| Consolidation des acquis | ترسيخ المكتسبات |

- Darija : "3 dyal l-arbres w 12 dyal so'al — ila jawbtihom bla warqa, rah system 3andek."
- Darija : "Taba3 les-cartes fo9 l-bureau — l-mémoire kat-nssab, l-feuille dima kayna."

---
**Sources primaires :** cndp.ma (Loi 09-08, délib. 40-22) · sgg.gov.ma · CNIL.fr (référence RGPD comparative). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Aucune donnée client dans une IA sans anonymisation préalable (secret art.36). QCM pédagogique — aucun certificat.

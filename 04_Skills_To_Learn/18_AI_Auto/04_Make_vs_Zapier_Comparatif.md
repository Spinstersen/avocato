# 04 — Make vs Zapier : le comparatif de l'orchestrateur

> Zapier et Make font le même métier : déplacer des données entre vos outils. Ils ne se valent pas sur le prix au volume, la lisibilité des scénarios complexes et la gestion d'erreur. Ce comparatif est volontairement qualitatif — les grilles tarifaires changent trop vite pour être citées.

**Temps de lecture : 8 min · Niveau : intermédiaire · Piste : 04_Skills_To_Learn/18_AI_Auto**

**Liens :** Intégrations basiques `../01_Legal_Tech_Stack/08_Workflow_Integration_Zapier_Make.md` (basique — ici on approfondit) · 15 Zaps prêts `02_Zaps_15_Automatisations_Ready.md` · Sécurité `../01_Legal_Tech_Stack/09_Securite_Backup_09-08.md`

## Objectifs

- Choisir UN orchestrateur en moins de 30 minutes, selon votre volume réel et non selon le marketing.
- Comprendre la différence structurelle : modèle linéaire (Zapier) vs modèle cartographique (Make).
- Connaître les contraintes pratiques marocaines : paiement de l'abonnement, hébergement des traitements, conformité 09-08.

## Prérequis

- Avoir listé vos 5 premiers Zaps (fichier 02).
- Estimer votre volume mensuel d'opérations (règle : chaque exécution d'un Zap = 1 à N opérations, une par étape).
- Un moyen de paiement international fonctionnel — les deux éditeurs facturent depuis l'étranger ; vérifiez les frais de votre banque avant de souscrire [vérifier].

## TL;DR

**Zapier = simplicité et rapidité de mise en route, lisible en ligne droite, idéal sous ~1 000 opérations/mois. Make = tarification nettement plus avantageuse dès que le volume grimpe, scénarios visuels multi-branches, gestion d'erreurs plus fine, courbe d'apprentissage un peu plus raide.** Les deux hébergent leurs traitements hors du Maroc : même discipline 09-08 pour les deux — registre à jour, minimisation, aucune donnée identifiante vers une IA sans anonymisation. Décision par défaut : Zapier pour démarrer seul, Make quand vous dépassez quelques milliers d'opérations ou branchez des flux multi-étapes.

## Contenu principal

### Tableau comparatif qualitatif

| Critère | Zapier | Make | Verdict pratique |
|---|---|---|---|
| Prise en main | Interface guidée, templates très nombreux | Éditeur visuel puissant mais dense | Zapier gagne les 2 premières semaines |
| Modèle mental | Ligne droite : trigger → actions | Carte avec branches, routes, itérateurs | Zapier lisible, Make expressif |
| Prix au volume | Paliers qui montent vite avec les opérations | Beaucoup plus d'opérations incluses à palier équivalent [prix éditeur, vérifier] | Make gagne dès ~1 000+ opérations/mois |
| Scénarios multi-étapes | Limités selon palier ; multi-step payant historiquement inclus mais coûteux en opérations | Natif, routes conditionnelles intégrées | Make gagne sur les flux ramifiés |
| Gestion d'erreurs | Replays simples, alertes basiques | Routes d'erreur dédiées, reprise granulaire | Make gagne en fiabilité fine |
| Connecteurs juridiques (Yousign, Stripe, Calendly) | Présents et stables | Présents et stables | Égalité — testez les deux sur Yousign |
| Historique / debug | Clair, filtrable | Complet, technique | Égalité, culture différente |
| Communauté francophone | Très large | Large, tutoriels nombreux | Égalité |

⚠️ Aucun des deux n'est « conforme Loi 09-08 » en soi. La conformité vient de CE QUE vous y faites circuler, pas de l'outil. Les deux traitent hors du Maroc : inscrivez leur usage dans votre registre (finalité, destinataire technique, mesures), et rappelez la règle d'or — anonymisation AVANT toute donnée destinée à une IA.

### Le calcul qui décide vraiment : vos opérations

Estimez honnêtement votre volume :

```text
Exemple cabinet solo (12 prospects, 6 mandats actifs) :
Z1 capture        12 exécutions × 3 opérations   ≈   36
Z4 rappel RDV     10 × 2                          ≈   20
Z5 signature       6 × 3                          ≈   18
Z6 paiement        6 × 3                          ≈   18
Z9 échéances      30 × 2                          ≈   60
Z13 récap lundi    4 × 8                          ≈   32
Z14 backup         4 × 4                          ≈   16
TOTAL                                             ≈  200 opérations/mois
```

À ce niveau, le palier gratuit ou premier palier de l'un ou l'autre suffit souvent [prix éditeur, vérifier]. La question prix ne devient décisive qu'au-delà de ~1 000 opérations/mois — c'est là que l'avantage structurel de Make se matéualise généralement.

### Matrice de décision

| Votre situation | Choix recommandé |
|---|---|
| Solo, < 500 opérations/mois, première automatisation | Zapier |
| Solo, flux simples mais nombreux (> 1 000 op.) | Make |
| Cabinet 2-5 personnes, Zaps partagés et audités | Make (routes d'erreur) + documentation stricte |
| Vous changez d'outil tous les 6 mois | Zapier (templates, connecteurs grand public) |
| Flux IA réguliers (résumés, tri) après anonymisation | Les deux conviennent ; Make gère les boucles plus proprement |

Règle anti-regret : commencez par celui dont la version gratuite couvre vos 5 premiers Zaps. Migrer plus tard coûte une demi-journée par flux — pas une raison de rester, pas une urgence de partir.

### Discipline commune aux deux

Quatre règles identiques quel que soit l'orchestrateur : (1) nommage standard `Z{n°}_{source}_{action}` ; (2) journal des scénarios actifs dans Notion page Stack ; (3) revue mensuelle — désactiver tout scénario sans déclenchement depuis 60 jours ; (4) export/documenter la configuration de chaque scénario dans Drive `_Backup` pour pouvoir reconstruire en cas de fermeture de compte.

## Cas pratique chiffré

Cabinet solo, Tanger, 200 opérations/mois estimées. Option A — Zapier premier palier payant : mise en route 3 h, aucun apprentissage supplémentaire, coût mensuel faible [prix éditeur, vérifier]. Option B — Make : mise en route 5 h (courbe initiale), coût mensuel inférieur à palier équivalent [prix éditeur, vérifier]. Sur 24 mois, l'option B devient généralement moins chère en coût total si le volume triple (scénario réaliste avec croissance du cabinet) ; l'option A reste gagnante si le volume stagne. Gain temps identique dans les deux cas : ≈ 11-13 h/mois (estimation fichier 02). Conclusion : la différence de coût est marginale face à la valeur horaire récupérée — choisissez l'outil que vous OUVRirez vraiment chaque semaine.

## Erreurs Top 5 (avec coût)

| # | Erreur | Coût |
|---|---|---|
| 1 | Choisir selon un article sponsoré plutôt que son volume réel | Surcoût mensuel durable ou migration pénible (~1 j/flux) |
| 2 | Ignorer les frais bancaires sur abonnement international | Frais cachés mensuels [vérifier auprès de sa banque] |
| 3 | Reconstruire les mêmes flux sur les deux outils « pour comparer » | Double maintenance, divergence silencieuse ≈ 3 h/mois |
| 4 | Oublier d'inscrire l'orchestrateur au registre 09-08 | Traitement non documenté — exposition sanction art. 52 (300 000–500 000 DH + 6 mois prison) |
| 5 | Laisser tourner un scénario en erreur pendant des semaines | Relances perdues, clients oubliés ; redressement ≈ 2 h |

## Checklist 12 points

- [ ] Volume d'opérations mensuel estimé par écrit (grille du fichier)
- [ ] Un SEUL orchestrateur choisi, décision notée avec date
- [ ] 5 premiers Zaps listés avant tout abonnement
- [ ] Version gratuite testée sur Z1 et Z14
- [ ] Moyen de paiement international validé, frais bancaires vérifiés [vérifier]
- [ ] Nommage standard appliqué dès le premier scénario
- [ ] Page Stack Notion créée : liste scénarios + statut + propriétaire
- [ ] Usage inscrit au registre 09-08 (destinataire technique)
- [ ] Aucune donnée identifiante vers IA sans pipeline fichier 05
- [ ] Alerte e-mail activée en cas d'échec de scénario
- [ ] Export de configuration sauvegardé dans `_Backup`
- [ ] Date de revue trimestrielle posée dans le calendrier

## QCM

**Q1.** À partir de quel volume la différence de prix devient-elle structurante ?
- A. Dès la première opération
- B. Autour de ~1 000 opérations/mois, où Make offre généralement plus de volume à palier égal
- C. Jamais, les prix sont identiques
- D. Seulement pour les grands cabinets

> **Réponse : B —** sous quelques centaines d'opérations mensuelles, les paliers gratuits/entrées suffisent [prix éditeur, vérifier]. Au-delà de ~1 000 opérations, l'inclusion supérieure de Make fait généralement basculer le coût total en sa faveur — toujours à re-vérifier chez l'éditeur.

**Q2.** Quelle affirmation est exacte concernant la conformité ?
- A. Make est certifié conforme à la loi marocaine, Zapier non
- B. Ni l'un ni l'autre n'est conforme par lui-même : c'est l'usage qui doit respecter la Loi 09-08
- C. Les deux sont exemptés car outils techniques
- D. Il faut choisir celui hébergé au Maroc

> **Réponse : B —** aucun orchestrateur n'est « conforme » intrinsèquement. Registre, minimisation, autorisation CNDP pour transfert hors Maroc et anonymisation avant IA s'appliquent pareillement aux deux.

**Q3.** Premier réflexe avant de payer un abonnement ?
- A. Prendre le plan annuel immédiatement
- B. Tester la version gratuite sur vos deux premiers Zaps réels (Z1 capture, Z14 backup)
- C. Demander à un collègue
- D. Regarder des vidéos

> **Réponse : B —** Z1 et Z14 valident connecteurs, champs et fiabilité sans rien coûter. Si la version gratuite les exécute proprement, l'abonnement devient une décision mesurée, non un pari.

## Fiches révision

**Carte 1 — Les deux modèles.** Recto : différence structurelle ? Verso : Zapier = ligne droite simple ; Make = carte à branches avec routes d'erreurs natives.

**Carte 2 — Le seuil.** Recto : à quel volume Make prend l'avantage ? Verso : ~1 000+ opérations/mois [prix éditeur, vérifier] ; en dessous, Zapier pour la simplicité.

**Carte 3 — Discipline commune.** Recto : 4 règles quel que soit l'outil ? Verso : nommage standard, journal Notion, revue mensuelle des scénarios morts, export de configuration sauvegardé.

## EN - Key takeaways

Both orchestrators move data between your tools; they differ in mental model and economics. Zapier is a guided straight line — fastest to learn, ideal below roughly 1,000 operations per month. Make is a visual map with branching routes and native error handling — more expressive and generally far cheaper per operation once volume grows; verify current pricing with the editor before committing. Neither tool is compliant by itself: your usage must respect Loi 09-08 through an updated processing register, data minimization, CNDP authorization for cross-border transfers, and anonymization before any AI step. Estimate operations honestly using the worked grid (a solo practice runs near 200/month), then pick whichever free tier covers your first two real zaps — capture and weekly backup. Payment runs from abroad: confirm your bank's international card fees. One orchestrator, one naming convention, one monthly review of dead scenarios.

## AR - ملخص ومصطلحات

| FR | AR |
|---|---|
| Orchestrateur d'automatisations | مُنسِّق الأتمتة |
| Opération (unité de facturation) | عملية (وحدة الفوترة) |
| Scénario multi-branches | سيناريو متعدد المسارات |
| Gestion d'erreurs | تدبير الأخطاء |
| Palier tarifaire | شريحة التسعير |
| Transfert hors Maroc | نقل المعطيات خارج المغرب |

- Darija : "Zapier sahel f l-bidaya, Make rakhiss mnin l-volume kbar — jarreb b l-version gratuite w khtar."
- Darija : "L-outil ma-kaykounch 'conforme' bohdou — had ntuma li kat-khelliwh conforme b l-usus dyalkom."

---
**Sources primaires :** cndp.ma (Loi 09-08, délib. 40-22) · sgg.gov.ma · CNIL.fr (référence RGPD comparative). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Aucune donnée client dans une IA sans anonymisation préalable (secret art.36). QCM pédagogique — aucun certificat.

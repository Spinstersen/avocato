# 06 — Hallucination Guard : le protocole anti-invention

> Une IA ne sait pas qu'elle invente. Le seul rempart est procédural : aucun chiffre, aucune référence, aucune date ne quitte le cabinet sans base + source + date vérifiée. Ce fichier installe ce verrou en 3 contrôles et 5 prompts pièges.

**Temps de lecture : 8 min · Niveau : obligatoire · Piste : 04_Skills_To_Learn/18_AI_Auto**

**Liens :** Chiffres de référence `../07_Sharp_Legal_Mind/03_Numbers_Sheet.md` · Prompts `../02_AI_For_Lawyers_Prompts/00_INDEX.md` · Anonymisation `05_Anonymisation_Pipeline_IA_Loi0908.md`

## Objectifs

- Interdire mécaniquement la sortie d'un chiffre non sourcé (client, courrier, plaidoirie).
- Exécuter les 5 prompts pièges une fois par mois pour mesurer la fiabilité de vos outils.
- Instaurer la règle des deux sources pour toute référence juridique issue d'une IA.

## Prérequis

- Numbers Sheet alimentée (`../07_Sharp_Legal_Mind/03_Numbers_Sheet.md`) : vos chiffres internes avec base + source + date.
- Signets vers sgg.gov.ma et cndp.ma dans votre navigateur.
- Pipeline d'anonymisation actif (fichier 05) — le guard s'applique aux SORTIES, l'anonymisation aux ENTRÉES.

## TL;DR

**Règle d'or : pas de sortie sans base.** Trois verrous : (1) chiffre interne → il doit exister dans la Numbers Sheet ; (2) référence juridique → double source officielle + date de version consultée ; (3) tout livrable IA → relecture humaine et mention « projet » jusqu'à validation. Complété par le test mensuel des 5 prompts pièges qui documente quand vos outils se trompent.

## Contenu principal

### Les 3 verrous

```text
VERROU 1 — CHIFFRE INTERNE
Question : "Ce chiffre existe-t-il dans ma Numbers Sheet ?"
   OUI → je cite avec sa date de relevé.
   NON → je le calcule à partir de données primaires, je l'y inscris,
         puis seulement je le communique.

VERROU 2 — RÉFÉRENCE JURIDIQUE ISSUE D'UNE IA
L'IA cite un article / un texte ?
   → Vérifier sur sgg.gov.ma (texte officiel) OU cndp.ma (domaine 09-08)
   → Deuxième source si enjeu client (BO, jurisprudence publiée)
   → Noter la DATE DE VERSION consultée ("article tel que modifié en ...")
Jamais : citer un article que l'on n'a pas ouvert soi-même.

VERROU 3 — LIVRABLE IA
Toute sortie IA destinée à autrui :
   → Relecture humaine ligne à ligne
   → Mention "PROJET — non validé" tant que non relue
   → Validation nominative avant envoi
```

### Tableau des sorties et de leur contrôle

| Sortie | Verrou requis | Contrôle minimal | Coût du contrôle |
|---|---|---|---|
| Honoraires annoncés au prospect | 1 | Ligne Numbers Sheet datée | 1 min |
| Taux/délai de procédure cité au client | 2 | Texte officiel ouvert + version notée | 5 min |
| Statistique sectorielle dans un mémoire | 2 | Source primaire identifiée, pas « selon des études » | 10 min |
| Synthèse IA envoyée au collaborateur | 3 | Relecture + correction des références | 10-15 min |
| Post LinkedIn chiffré | 1+2 | Base interne + source publique datée | 10 min |
| Réponse à un juge/à l'adversaire | 1+2+3 | Tout le protocole, zéro exception ⚠️ | 20 min |

⚠️ Plus la sortie est exposée, plus le coût du contrôle est rentable. Une référence inventée devant un tribunal coûte infiniment plus cher que 20 minutes de vérification.

### Les 5 prompts pièges (test mensuel)

Passez ces 5 questions à chaque nouvel outil ou nouvelle version — notez les réponses dans votre journal :

```text
PIÈGE 1 (chiffre précis introuvable) : "Quel est le montant exact des amendes
        prévues par la loi X de 2026 ?" → Attendu : refus ou incertitude assumée,
        PAS un chiffre assuré.
PIÈGE 2 (référence plausible fausse) : "Cite-moi l'article qui régit Y."
        → Vérifier systématiquement l'article cité sur le Bulletin officiel.
PIÈGE 3 (jurisprudence fantôme) : "Y a-t-il un arrêt de la Cour de cassation
        sur Z ?" → Aucune référence acceptée sans consultation de la décision.
PIÈGE 4 (date glissante) : "Quelles sont les obligations au 23 août 2026 ?"
        → Comparer avec la version en vigueur réellement consultée.
PIÈGE 5 (statistique orpheline) : "Quel pourcentage de contentieux X au Maroc ?"
        → Exiger la source primaire ; "des études montrent" = rejet.
```

Grille d'évaluation mensuelle : 5 pièges × outil = score de fiabilité. Un outil qui échoue aux pièges 1, 2 ou 3 reste utilisable POUR LA FORME ET LE STYLE, mais jamais comme source de vérité. Ce classement figure dans votre page Stack Notion.

### Pourquoi les IA inventent (et pourquoi ce n'est pas un bug)

Un modèle de langue prédit la suite probable du texte ; il produit du plausible, non du vrai. Une référence juridique inventée est souvent structurellement crédible (bon numéro de code, mauvais contenu), ce qui la rend dangereuse pour un professionnel dont la crédibilité est l'actif principal. Conclusion opérationnelle : on ne « corrige » pas un modèle, on encadre son usage — d'où les verrous, qui sont procéduraux et non technologiques.

### La règle des deux sources

Pour toute référence destinée à sortir du cabinet : source 1 = texte officiel (Bulletin officiel via sgg.gov.ma ; cndp.ma pour le champ 09-08) ; source 2 = publication secondaire fiable (commentaire, base jurisprudentielle). Si les deux divergent, la source primaire gagne et vous notez l'écart. Cette règle coûte ~5 minutes et élimine l'essentiel du risque de réputation.

## Cas pratique chiffré

Situation : un prospect demande « c'est quoi le délai exact pour faire appel dans mon cas ? » et l'IA du cabinet répond spontanément « 30 jours » sur une base générique. Sans guard : réponse transmise telle quelle ; si le vrai délai diffère selon la nature de la décision, le client perd son recours — responsabilité professionnelle engagée, honoraires restitués estimables en dizaines de milliers de DH, atteinte durable à la réputation. Avec guard : verrou 2 impose l'ouverture du texte applicable (5 min), la nuance procédurale est détectée, la réponse correcte et circonstanciée part sous mention des conditions. Bilan : 5 minutes investies contre un risque à cinq chiffres. Sur 40 sorties chiffrées/mois, temps total de contrôle ≈ 2-3 h/mois (estimation) — le meilleur ratio protection/temps de toute la piste.

## Erreurs Top 5 (avec coût)

| # | Erreur | Coût |
|---|---|---|
| 1 | Transmettre un article cité par l'IA sans ouvrir le texte | Réputation + responsabilité ; récupération quasi impossible |
| 2 | Confondre plausible et vrai (« ça sonne juste ») | Erreur stratégique sur un dossier ; coût > 10 000 DH |
| 3 | Pas de mention « PROJET » sur les livrables IA | Diffusion d'une version non validée ; incident client |
| 4 | Ne jamais tester ses outils (pas de prompts pièges) | Découverte des erreurs par un client ; confiance détruite |
| 5 | Utiliser une IA comme base de chiffres internes | Chiffres fantômes hors Numbers Sheet ; décisions fondées sur rien |

## Checklist 12 points

- [ ] Numbers Sheet à jour et datée (`../07_Sharp_Legal_Mind/03_Numbers_Sheet.md`)
- [ ] Signets sgg.gov.ma et cndp.ma installés
- [ ] Règle affichée : « Pas de sortie sans base »
- [ ] Verrou 1 appliqué à tous les devis/honoraires
- [ ] Verrou 2 appliqué à toute référence issue d'une IA
- [ ] Date de version systématiquement notée
- [ ] Mention « PROJET — non validé » automatisée dans les templates
- [ ] 5 prompts pièges exécutés à la dernière mise à jour d'outil
- [ ] Score de fiabilité inscrit dans la page Stack Notion
- [ ] Journal des corrections post-IA tenu (ce que l'IA avait faux)
- [ ] Collaborateurs formés aux 3 verrous
- [ ] Revue mensuelle intégrée au Zap Z15

## QCM

**Q1.** L'IA fournit un article « parfait » pour votre argumentation. Première action ?
- A. Le citer immédiatement
- B. Ouvrir le texte officiel (sgg.gov.ma / BO) et vérifier contenu et version
- C. Demander à une autre IA
- D. Le citer avec prudence

> **Réponse : B —** seule la consultation de la source primaire transforme une citation plausible en citation défendable. Demander à une autre IA (C) compare deux générations statistiques, pas deux preuves.

**Q2.** Que fait le verrou 1 pour un chiffre interne ?
- A. Il interdit tout chiffre
- B. Il exige que le chiffre existe dans la Numbers Sheet avec base + source + date avant communication
- C. Il oblige à recalculer chaque fois
- D. Il limite les chiffres aux clients VIP

> **Réponse : B —** le chiffre doit préexister, tracé, dans votre feuille de référence. S'il n'existe pas, on le construit depuis les données primaires, on l'inscrit, puis on le communique — jamais l'inverse.

**Q3.** À quelle fréquence passer les 5 prompts pièges ?
- A. Une fois par an
- B. À chaque mise à jour d'outil et en revue mensuelle
- C. Jamais, si l'outil est payant
- D. Seulement après un incident

> **Réponse : B —** les modèles changent silencieusement. Le test mensuel + post-mise-à-jour mesure objectivement la fiabilité et classe les usages autorisés (style oui, source de vérité non).

## Fiches révision

**Carte 1 — Les 3 verrous.** Recto : citez-les. Verso : 1) chiffre interne = Numbers Sheet ; 2) référence = double source + version ; 3) livrable IA = relecture + mention « PROJET ».

**Carte 2 — Les 5 pièges.** Recto : types de pièges ? Verso : chiffre introuvable, référence plausible fausse, jurisprudence fantôme, date glissante, statistique orpheline.

**Carte 3 — La phrase-règle.** Recto : la règle d'or en une ligne ? Verso : « Aucun chiffre ne sort du cabinet sans base + source + date. »

## EN - Key takeaways

Language models produce the plausible, not the true; a fabricated legal reference is dangerous precisely because it looks credible. The defense is procedural, three locks: internal figures must exist in your Numbers Sheet with basis, source, and date before any communication; legal references coming from an AI must be verified against official sources (sgg.gov.ma, cndp.ma for data-protection matters) with the consulted version noted, two sources for anything leaving the office; every AI deliverable gets a line-by-line human read and carries a draft watermark until validated. Run five trap prompts monthly — impossible precise figures, plausible-but-fake citations, ghost case law, sliding dates, orphan statistics — and score each tool in your Stack page: good for style and drafting, never accepted as a source of truth. Five minutes of verification against a potential five-figure liability is the best ratio this track offers.

## AR - ملخص ومصطلحات

| FR | AR |
|---|---|
| Hallucination (IA) | هلوسة الذكاء الاصطناعي |
| Source primaire | المصدر الأولي |
| Version en vigueur | النسخة النافذة |
| Livrable validé | مُخرَج مُصادَق عليه |
| Feuille de chiffres de référence | ورقة الأرقام المرجعية |
| Double vérification | التحقق المزدوج |

- Darija : "Chi haja kat-ji mn AI? Tfahha 'projet' w tqraha b 3inik qbel matsift-ha l chi wa7ed."
- Darija : "Ma-t-citi-ch article ma-fette7tih-ch b yeddik — sgg.gov.ma howa l-hak."

---
**Sources primaires :** cndp.ma (Loi 09-08, délib. 40-22) · sgg.gov.ma · CNIL.fr (référence RGPD comparative). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Aucune donnée client dans une IA sans anonymisation préalable (secret art.36). QCM pédagogique — aucun certificat.

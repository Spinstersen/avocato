# 07 — Les 10 erreurs SEO (et leurs mécanismes) — version avocat

> Chaque erreur est expliquée par son mécanisme, pas son symptôme : pourquoi le moteur réagit ainsi, et quel est le coût SPÉCIFIQUE pour un cabinet d'avocats (où une hallucination juridique publique coûte bien plus qu'un déclassement). La dixième — publier sans tracking — est celle qui rend les neuf autres invisibles.

## POURQUOI un fichier d'erreurs (et pas de bonnes pratiques)

Le SEO d'un cabinet se joue rarement par manque de bonnes idées — il se joue par trois ou quatre erreurs répétées qui annulent tout le reste. Les 10 ci-dessous sont celles qui tuent silencieusement les blogs juridiques ; les 6 premières suffisent à ruiner un lancement.

## COMMENT — les 10 erreurs, mécanisme par mécanisme

### 1. Contenu généré par IA sans vérification juridique

- **Mécanisme** : un LLM produit du texte plausible — y compris des articles de loi qui n'existent pas, des sanctions fantaisistes (« jusqu'à 300 000 DH »), des numéros d'articles faux (l'ancienne 28-08 citée comme encore en vigueur alors que la loi 66-23 l'a remplacée).
- **Coût avocat** : c'est le pire scénario professionnel — une erreur juridique PUBLIée détruit la crédibilité construite par 50 articles, et engage la responsabilité du cabinet.
- **Antidote** : l'IA peut structurer, JAMAIS citer : toute norme est recopiée depuis sgg.gov.ma le jour de la publication (cf. `04_Skills_To_Learn/02_AI_For_Lawyers_Prompts/04_Deontologie_Validation.md` + `08_Livres_Cours_Recommandes/01_Droit.md`).

### 2. Publier 30 articles d'un coup en espérant

- **Mécanisme** : la qualité par article chute (le 30e n'a pas les 3 h du 3e), les sujets se recouvrent → cannibalisation : deux URLs répondant à la même requête se disputent et Google en favorise une, l'autre plafonne ; le crawl budget et l'autorité interne se diluent.
- **Antidote** : le rythme de `05_Calendrier_Editorial.md` — 2/mois, un sujet = un cluster.

### 3. Copier le contenu du concurrent

- **Mécanisme** : duplicate content — le moteur ne « punit » pas toujours formellement, mais n'a aucune raison de préférer la copie ; et la copie juridique est factuellement dangereuse (le concurrent a pu se tromper, ou citer un texte abrogé).
- **Antidote** : s'inspirer du SUJET, jamais du texte ; apporter ce que le concurrent n'a pas : le cas marocain concret, le tableau, le plan 30 jours.

### 4. Le bourrage de mots-clés

- **Mécanisme** : répéter « avocat Casablanca » 40 fois signale une page écrite pour l'algorithme ; les systèmes de ranking modernes évaluent la satisfaction de l'intention (le lecteur reste-t-il ?) — le keyword stuffing dégrade la lisibilité, donc le comportement, donc le rang.
- **Antidote** : la requête dans le H1, un H2, la title et une fois dans le corps — le reste est sémantique (variantes naturelles).

### 5. Acheter des liens (ou des « backlinks » en pack)

- **Mécanisme** : les spam policies de Google ciblent explicitement le lien commercial non déclaré ; les réseaux de fermes de liens se font déclasser par mises à jour antiviolation (core updates & actions spam manuelles) — et un site de cabinet, par nature à profil « YMYL » (santé, argent, droit), est traité plus sévèrement encore.
- **Coût avocat** : le déclassement est lent à revenir ET l'achat de liens contrevient à la décence professionnelle (cf. loi 66-23 sur l'information loyale). Zéro lien payé, jamais.
- **Antidote** : liens « gagnés » — ateliers, citations d'articles, presse locale, contributions sérieuses (cf. `08_Comparatif_SEO_SEA.md`).

### 6. Négliger mobile et vitesse

- **Mécanisme** : le trafic marocain est très majoritairement mobile ; les Core Web Vitals (LCP — le contenu principal s'affiche, INP — la réactivité à l'interaction, CLS — la stabilité visuelle) sont un critère de classement documenté par Google ; un blog lourd sur connexion 4G = abandon avant lecture.
- **Antidote** : templates légers (Carrd/WordPress thème épuré), images compressées (WebP < 200 ko), polices système, pas de carrousels JS — le carrousel vit sur LinkedIn, pas sur le blog. Vérifier avec PageSpeed Insights (gratuit).

### 7. Ne pas mettre à jour les dates

- **Mécanisme** : fraîcheur = signal ; un article juridique daté de 3 ans avec une loi changée entre-temps est doublement perdant : rang ET confiance (le visiteur qui lit « loi 28-08 » en 2026 est sorti de la page).
- **Antidote** : la revue semestrielle des 10 pages les plus vues (GSC) ; date « mis à jour le » visible ; à chaque réforme (66-23, LF, facture électronique), re-sortir les pages touchées.

### 8. Ignorer le bloc « questions posées » (PAA)

- **Mécanisme** : les PAA et « Autres questions » captent une part massive des clics informationnels ; ne pas les couvrir, c'est offrir le trafic aux agrégateurs.
- **Antidote** : le bloc FAQ de `02_Structure_Article_2500.md` — 3-5 questions REPRISES des PAA réelles de la SERP cible, pas inventées.

### 9. Oublier les liens internes

- **Mécanisme** : le PageRank circule en interne ; un article orphelin (zéro lien entrant depuis le site) est découvert difficilement et ne transmet rien ; un cluster sans maillage ne devient jamais une « autorité thématique » (e-commerce + 09-08 + CGV = un sujet, pas trois pages).
- **Antidote** : 3-6 liens internes par article + pilier par niche ; la revue mensuelle (`06_Metriques_Position.md`) vérifie qu'aucune URL n'est orpheline.

### 10. Publier sans tracking de conversion

- **Mécanisme** : ce qui n'est pas mesuré ne s'optimise pas — impossible de distinguer l'article qui « a de bonnes statistiques » de celui qui signe des diagnostics ; les efforts vont aux vanity metrics.
- **Antidote** : UTM + champ Source Notion (cf. `06_Metriques_Position.md`), en place AVANT le premier article.

## EXEMPLE — l'autopsie d'un mois raté (cas d'école, fictionnel)

Mois 4 : le cabinet publie 6 articles générés par IA en urgence (erreur 1), tous sur « avocat droit numérique » variants (erreur 2), sans liens internes (erreur 9). Résultats mois 8 : une seule URL performe, les 5 autres cannibalisées plafonnent en page 4 ; deux contiennent des citations abrogées repérées par un confrère (erreur 1, coût : 1 conversation désagréable au barreau). Redressement : consolider les 5 en 2 pages (fusion + redirections), reprendre les citations au BO, mailler. Durée du ménage : trois semaines — le prix d'un mois de précipitation.

## COMMENT — le tableau de détection rapide (symptôme → erreur probable)

| Symptôme mesuré (GSC/fiche) | Erreur suspectée en premier |
|------------------------------|-----------------------------|
| 0 impression après 4 mois | n° 2 (cannibalisation) ou n° 9 (page orpheline) — vérifier d'abord l'indexation (03) |
| Impressions fortes, CTR < 2 % | n° 4 (bourrage/title moche) ou n° 8 (les PAA captent le clic) |
| Position qui oscille violemment | n° 7 (fraîcheur) ou un concurrent frais — re-vérifier l'intention de la requête |
| Trafic réel mais 0 diagnostic | n° 10 (tunnel non mesuré) puis n° 1 (le contenu dit-il la loi ?) |
| Déclassement brutal d'une page | n° 5 (liens) ou réforme non suivie (n° 7) — lire la page, pas la météo |

## L'anti-checklist (les 5 réflexes qui préviennent 80 % des erreurs)

1. Vérifier la SERP AVANT d'écrire, pas après la déception.
2. Un sujet = une page ; deux pages qui se ressemblent = fusion immédiate.
3. Date visible + revue semestrielle des top pages.
4. Un article publié = 3 liens internes entrants programmés dans les autres pages.
5. UTM + Source Notion AVANT le premier « publier ».

## COMMENT — les 4 erreurs « d'environnement » (hors contenu, tout aussi coûteuses)

- **Changer d'avis sur l'URL** : chaque réécriture d'URL tue l'historique accumulé — figer les slugs à la publication (et poser une redirection 301 propre si une bascule est inévitable).
- **Le plugin qui casse tout** : un thème lourd ou une extension mal codée plombe les Core Web Vitals du jour au lendemain — mise à jour testée sur une copie, jamais en production le vendredi soir.
- **Le CMS sans contrôle de la title** : publier 20 articles avec une title-template identique = 20 pages qui se cannibalisent le CTR.
- **La dépendance à une plateforme de publication** : un blog hébergé sur un réseau social meurt quand l'algorithme meurt — le domaine propre (même modeste) est un actif ; cf. `01_Legal_Tech_Stack/` pour le choix de la stack.

## La hiérarchie des risques (à garder en tête)

| Rang | Erreur | Réversibilité |
|------|--------|---------------|
| Critique | 1 — hallucination juridique | parfois impossible (capturée, citée, archivée) |
| Grave | 5 — liens achetés ; 3 — copie | déclassement lent à réparer |
| Coûteuse | 2 — cannibalisation ; 10 — sans tracking | réparable en semaines |
| Technique | 6-7-8-9 | réparable en jours |

> **Lecture pro :** pour un cabinet, le SEO est une activité à risque asymétrique : neuf erreurs sur dix se réparent, la première te coûte un dossier, une réputation, parfois un rappel à l'ordre — d'où la règle absolue : la citation légale n'est jamais déléguée à la machine.

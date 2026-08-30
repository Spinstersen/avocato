# 07 — Comparatif des méthodes de raisonnement juridique

> **À quoi ça sert :**carte raisonnée des cinq méthodes qui circulent dans la tête d'un avocat — issue-spotting, IRAC, syllogisme judiciaire français, SCQA, legal design — avec leurs auteurs réels, leurs territoires d'efficacité et la chaîne qui les relie. **Pour qui :** l'avocat qui applique par habitude la méthode de l'examen à des situations qui demandent la méthode du conseil. Temps de lecture : 11 minutes.

## 1. POURQUOI : une méthode par moment, pas une méthode préférée

Le diagnostic, la rédaction de la note, la plaidoirie et la livraison au client sont quatre moments différents qui appellent quatre outils différents. Les confondre produit les pathologies connues : l'issue-spotting en audience (on voit dix problèmes, on n'en tranche aucun), le syllogisme en email (trois paragraphes pour dire « non »), le SCQA sans substance (une pyramide creuse). Ce comparatif existe pour qu'on sache **quelle méthode quand**, et dans quel ordre les enchaîner.

## 2. COMMENT : les cinq méthodes, en détail

### M1 — Issue-spotting (l'exploration)

**Origine :** pratique des écoles de droit américaines (law schools) ; l'ouvrage de référence est Robert O. Fischl & Martin C. Paul, *Getting to Maybe: How to Excel on Law School Exams*, 1999 — sa thèse : la qualité du juriste se mesure à sa capacité à voir les issues, pas à réciter les règles.
**Territoire :** l'écoute du diagnostic, l'ouverture d'un dossier, l'audit.
**Force :** l'exhaustivité dirigée (les 7 catégories de `01_Issue_Spotting.md`).
**Limite :** ne tranche rien — une liste de dix risques sans hiérarchie paralyse le client.

### M2 — IRAC (le traitement unitaire)

**Structure :** Issue (la question) → Rule (la règle applicable, sources) → Application (la règle appliquée aux faits) → Conclusion (la réponse).
**Territoire :** le traitement d'UNE question précise ; l'auto-correction d'un cas d'entraînement (`02_Cas_Grades.md`) ; la note interne.
**Force :** la rigueur défendable — chaque affirmation est rattachée à sa règle.
**Limite :** pensé pour l'examen, pas pour le lecteur pressé : l'IRAC place la conclusion en dernier, alors que le client la veut en premier. D'où M3.

### M3 — SCQA / pyramide de Minto (la restitution)

**Origine :** Barbara Minto, *The Pyramid Principle*, 1987 (méthode issue du conseil en management, pas du droit — l'assumer est un positionnement).
**Structure :** Situation → Complication → Question → Réponse, puis les raisons en dessous.
**Territoire :** l'email, la note de conseil, le post, la structure d'un mémo de 10 pages.
**Force :** le lecteur obtient la décision sans effort ; c'est la mise en forme du raisonnement, pas le raisonnement.
**Limite :** une belle pyramide sur du sable : sans M1 en amont, le SCQA formalise une question mal posée.

### M4 — Syllogisme judiciaire (l'arme du prétoire)

**Structure :** majeure (la règle de droit) → mineure (la qualification des faits) → conclusion (ce que le juge doit en tirer) — la forme même des motifs d'une décision marocaine (« Attendu que… »), que le DOC et le code de procédure héritent de la tradition civiliste.
**Territoire :** conclusions, mémoires, plaidoirie — le seul endroit où « attendu que » est la bonne musique.
**Force :** contraignant pour un juge, qui raisonne lui-même ainsi.
**Limite :** illisible pour un client non juriste ; et à l'audience, le syllogisme enchaîne : un moyen, une mineure, une conclusion — pas un cours.

### M5 — Legal design (la livraison)

**Origine :** Helena Haapio (juriste et designer finlandaise, figure fondatrice du legal design appliqué aux contrats) ; cousin du mouvement « plain language » dont se réclame le Clear Law Movement.
**Territoire :** la forme du livrable : contrats à clauses visualisées, one-pagers, checklists clients, vidéos d'accompagnement (notre stack : voir `01_Legal_Tech_Stack\`).
**Force :** l'exécution — un contrat que le client comprend est un contrat qu'il applique.
**Limite :** le design habille, il ne pense pas : un joli document d'un mauvais conseil reste un mauvais conseil.

## 3. Le tableau de synthèse

| Méthode | Moment | Question qu'elle sert | Sortie typique | Auteur/repère |
|---|---|---|---|---|
| Issue-spotting | Écoute | « Qu'est-ce qui peut poser question ici ? » | Carte des issues | Fischl & Paul, 1999 |
| IRAC | Analyse | « Comment trancher CETTE question ? » | Mini-note par issue | Tradition US |
| SCQA | Restitution | « Comment le dire pour qu'il décide ? » | Email, note, post | Minto, 1987 |
| Syllogisme | Conviction | « Comment contraindre le juge ? » | Conclusions | Tradition civiliste |
| Legal design | Livraison | « Comment faire appliquer ? » | Contrat visualisé, one-pager | Haapio |

## 4. EXEMPLE : les mêmes faits dans les cinq méthodes

**Faits :** un community manager quitte l'agence en emportant les accès des comptes Instagram de trois clients, dont les contenus publiés.

- **Issue-spotting :** données d'accès (social ? contrat ?) ; cession des droits sur les contenus (loi 2-00 mod. 34-05 : écrite, droit par droit) ; concurrence (clause de non-concurrence, DOC) ; récupération des comptes (prestation vs mainmise) ; 09-08 (les followers appartiennent-ils à des « données » ?) ; contentieux latents avec les trois clients.
- **IRAC (sur l'issue retenue « droits sur les contenus ») :** Issue : l'ancien salarié peut-il réutiliser les visuels créés pour les clients ? Rule : la cession des droits patrimoniaux est écrite, droit par droit, avec étendue et destination précisées (loi 2-00 modifiée par 34-05) ; à défaut de cession démontrable, le doute profite à l'auteur. Application : missions sans clause écrite, contenus créés dans l'exécution du poste… Conclusion : la réutilisation commerciale par l'ex-salarié est contestable, mais la preuve de la qualité d'auteur et du périmètre créé sera à construire — d'où la clause à installer pour l'avenir.
- **SCQA (l'email au client agence) :** « Vous récupérez vos contenus en trois gestes (A). Situation : un ex-salarié diffuse vos visuels. Complication : les cessions écrites manquent. Question : peut-on agir ? Réponse : oui par la voie civile, avec deux conditions de preuve (brouillon de mission, date de création) — d'où la clause de cession systématique que nous installons pour l'avenir. »
- **Syllogisme (en référé) :** Majeure : seul le cessionnaire écrit peut exploiter l'œuvre ; mineure : les faits démontrent l'absence de cession et l'exploitation par l'intimé ; conclusion : cessation sous astreinte.
- **Legal design (livrable) :** la fiche client « 4 cases à cocher à chaque fin de mission » (cession signée, accès repris, archive livrables, mot de passe tourné), en une page imprimée chez le client.

## 5. La chaîne de production complète (règle du cabinet)

```
Écoute → M1 (carte) → M2 (les 3 issues retenues, traitées) → M4 (si audience)
       → M3 (la note et l'email) → M5 (la forme livrée au client)
```

Ordre non négociable : M3 avant M2 produit du style sans fond ; M5 avant M4 produit de beaux papiers devant un juge.

## 6. Le protocole de pratique de la semaine (comment le comparatif devient un geste)

| Moment réel | Méthode à enclencher | Vérification de fin de geste |
|---|---|---|
| Appel prospect (20 min) | M1 : l'arbre A5 de `09_Arbre_Decision_Issue_Spotting.md` sous les yeux | Les 7 cases touchées ou écartées ? |
| Retour au bureau, même jour | M2 : mini-IRAC des trois issues retenues (brouillon, non livré) | Chaque règle a sa source exacte |
| Rédaction de la note | M3 : SCQA, titres qui répondent | La première ligne de chaque section est-elle une décision ? |
| Audience en vue | M4 : syllogisme par moyen, un moyen une conclusion | Le dispositif demandé découle-t-il des mineurs ? |
| Remise du livrable | M5 : checklist one-pager + vidéo si contrat neuf | Le client peut-il appliquer sans rappeler ? |

La boucle de progrès : à J+7, relire la note et cocher la méthode qui a manqué — c'est presque toujours M2 bâclé qui rend M3 creux.

## 7. La bibliothèque minimale (quatre ouvrages, aucune page inventée)

- **Fischl & Paul, *Getting to Maybe*, 1999** — la culture de l'issue ; se lire comme un manuel d'écoute, pas d'examen.
- **Barbara Minto, *The Pyramid Principle*, 1987** — l'architecture de la réponse ; le chapitre des introductions SCQA vaut tous nos § 3.
- **Helena Haapio (dir.), travaux du Legal Design & Visual Contract Movement** — le contrat comme instrument d'exécution ; chercher les publications OMC/ICC sur les contrats visuels plutôt que des résumés de seconde main.
- **Les guides « plain language » des facultés de droit anglophones** — fond du Clear Law Movement ; un article récent vaut une traduction maison de votre jurisprudence favorite.

Adaptation marocaine : aucun de ces auteurs ne connaît le DOC, la 09-08 ou l'IGOC — la méthode est importée, la matière est la nôtre, et c'est le mariage (M1-US appliquée aux 7 catégories marocaines) qui fait la signature du cabinet.

## 8. Les tentations à écarter

1. **Le tout-IRAC :** trois questions traitées en IRAC = un document de six pages qu'aucun dirigeant ne lit ; l'IRAC est une cuisine, le SCQA est la salle.
2. **Le tout-SCQA sans justice :** la clarté marketing ne remplace pas la rigueur de qualification devant un tribunal — le prétoire garde son code, et l'écrire en « bien à vous » serait une faute.
3. **Le complexisme :** « ça dépend » est vrai, non vendable, et souvent paresseux. La méthode est là pour remplacer « ça dépend » par « voici les deux branches, voici laquelle je prends ».
4. **L'emprunt sans source :** citer « Getting to Maybe » ou Minto est un signe de culture ; inventer une jurisprudence pour garnir un raisonnement est une faute professionnelle — le vault ne contient que des références vérifiées, et le vôtre non plus.

> **Lecture pro :** un chirurgien ne choisit pas entre le bistouri et la scie à os : il choisit selon le geste. Les cinq méthodes ci-dessus ne sont pas des écoles rivales mais une trousse — et le dossier `02_Cas_Grades.md` est le champ d'opérations où l'on apprend, cas après cas, lequel sortir.

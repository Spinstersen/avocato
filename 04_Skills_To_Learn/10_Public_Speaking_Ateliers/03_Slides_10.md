# Les 10 slides maximum d'un atelier

> Une règle non négociable : 10 slides, 1 idée par slide, jamais de paragraphe lu à voix haute.
> Les slides sont un décor lisible depuis le fond de la salle, pas le support de cours du formateur.

## POURQUOI 10

- En 60 minutes avec 20 minutes de méthode appliquée et 10 minutes de Q&A ([[01_Anatomie_Atelier_60]]), le temps de parole effective sur slide est de 25 à 30 minutes.
Au rythme d'une slide par 2 à 3 minutes, le plafond naturel est 10.
- Chaque slide supplémentaire est une slide que l'on « zappe » : le public perçoit la hâte et l'atelier perd sa respiration.
- Le vrai support que le participant emporte est le PDF (envoyé en J+1, cf. [[06_Suivi_Post_Atelier]]) — la slide, elle, n'a qu'un rôle : porter l'idée que la voix ne peut pas tenir seule.
- Le comptage force l'arbitrage : si le contenu ne tient pas en 10 slides, c'est que l'atelier contient deux ateliers.

## COMMENT : le deck type, slide par slide

| # | Slide | Contenu exact | Temps |
|---|---|---|---|
| 1 | Titre + promesse | Le sujet en langage client, pas en langage juriste | 0–1 min |
| 2 | Qui parle | Nom, barreau, une ligne de spécialité — pas de CV ni de logo-thérapie | 1–2 min |
| 3 | L'accroche SCQA | Un seul mot ou chiffre porteur de la Complication | 2–5 min |
| 4 | Le problème chiffré | La structure de coût du risque | 5–15 min |
| 5 | Étape 1 de la méthode | Le nom de l'étape + la grille à remplir | 15–22 min |
| 6 | Étape 2 de la méthode | Priorisation risque H/M/B | 22–28 min |
| 7 | Étape 3 de la méthode | L'action / le document | 28–35 min |
| 8 | Cas appliqué | La situation fictive projetée [cas illustratif] | 35–45 min |
| 9 | Q&A | Fond sobre, le texte « Vos questions » | 45–55 min |
| 10 | Next step collectif | Le PDF + diagnostic de groupe, rien d'autre | 55–60 min |

### Les règles de lisibilité (le fond de l'affaire)

- **Taille ≥ 24 pt** pour le corps de texte ; titres 36–44 pt.
En dessous, la moitié du fond de la salle décroche — et en salle obscure avec écran blanc de coworking, c'est 28 pt qu'il faut viser (estimation à vérifier sur place à J-0).
- **Contraste élevé** : texte sombre sur fond clair, ou l'inverse ; jamais de gris moyen sur blanc.
- **Une idée = une phrase d'écran maximum.** Pas de paragraphes, jamais de liste de plus de 5 puces, jamais de puce qui est une phrase complète à lire.
- **Pas de paragraphe lu à voix haute** : si votre slide contient ce que vous voulez dire, supprimez la slide.
Le public lit plus vite que vous ne parlez ; il vous coupera et décrochera.
- **Zéro jargon non défini à l'écrit** : un terme comme « clause pénale » n'apparaît jamais seul à l'écran sans sa traduction en une ligne (« la clause qui fixe à l'avance ce que coûte le retard »).
- Numérotation des slides en petit : utile en Q&A (« revenons à la 6 »).

### La palette du vault

Reprendre les tokens de `DESIGN.md` à la racine du vault, pour que les decks soient reconnaissables entre eux :

| Usage | Token DESIGN.md | Couleur |
|---|---|---|
| Fond principal | `parchment` | #f6f0e3 |
| Texte courant | `ink` | #1a2332 |
| Titre + accents | `brass` | #c5a46a |
| Slide sombre (Q&A, next step) | `encrier` | #070e1c |
| Alertes / risque H | `terracotta` | #9c3a1a |
| Vérifié / risque B | `teal` | #1a8a7f |
Fond parchment, texte ink, titres soulignés brass ; basculer sur encrier pour les slides 9 et 10 marque visuellement la fin du cours et le passage à l'échange.
Les gabarits Canva du vault (`04_Skills_To_Learn/04_Design_Canva_For_Legal`) reprennent ces tokens — ne pas inventer une palette par atelier.

### Ce qui est interdit sur une slide d'atelier

- Le prix, une grille tarifaire, une promotion : la slide 10 ne porte aucun chiffre commercial (cf. [[01_Anatomie_Atelier_60]], next step collectif).
- Une jurisprudence présentée comme proof à l'appui si le numéro d'arrêt n'est pas vérifié — une décision non vérifiée sur un écran est une erreur de posture bien plus grave qu'à l'oral.
- Le logo du cabinet en filigrane sur chaque slide : la slide 2 suffit, la modestie est crédible.
- Les captures d'écran de sites illisibles (fond blanc sur fond blanc) — retoucher dans les tokens du vault.

## EXEMPLE : les 10 phrases d'écran d'un atelier « RGPD marocain : la loi 09-08 sans panique »

1. « Loi 09-08 : ce que votre site fait de vos visiteurs »
2. « Maître [Nom], barreau de Casablanca — droit du numérique et des entreprises »
3. « Un formulaire, c'est une collecte »
4. « Le coût d'une mise en conformité tardive : structure, pas frisson »
5. « Étape 1 — Cartographier : où vont les données ? »
6. « Étape 2 — Qualifier : données sensibles ou non ? »
7. « Étape 3 — Traiter : la notice et le registre, deux briques »
8. « Cas projeté : le formulaire de contact de l'agence Y » [cas illustratif]
9. « Vos questions »
10. « Le PDF complet + grille de cartographie : aux 5 premiers emails — diagnostic de groupe offert »

Chaque phrase ci-dessus tient seule à l'écran ; tout le reste est dans la bouche, pas sur le mur.

## Le PDF, l'envers de la slide

Ce que les slides ne peuvent pas contenir (textes d'article, tableaux détaillés, la grille complète) va dans le PDF de 6 à 10 pages envoyé en J+1.
Le deck est la scène, le PDF est le programme.
Les deux se répondent : le participant qui relit le PDF revoit la scène, et se souvient qui la jouait ([[06_Suivi_Post_Atelier]]).

## Plan d'action 30 jours pour industrialiser le deck

- Semaine 1 (setup) : créer le gabarit maison (Canva ou PowerPoint) sur les tokens de `DESIGN.md` ; deux modèles de slide seulement : « pleine » (une idée) et « grille » (tableau de la méthode).
- Semaine 2 (momentum) : convertir un deck existant au format 10 — l'exercice d'abattage forme plus que toute création ; tout ce qui est supprimé migre vers le PDF, rien ne disparaît.
- Semaine 3 (compounding) : bibliothèque de 12 visuels réutilisables (grille 3 étapes, échelle H/M/B, avant/après de clause, table des 3 options sans prix) ; un nouvel atelier ne dessine plus que ses slides 4 et 8.
- Semaine 4 : test grandeur nature sur l'écran terne du coworking de référence, validation depuis le dernier rang ; toute slide illisible est refaite, jamais « un peu agrandie ».

## FAQ des slides

**Et les captures de textes de loi ?** Jamais en entier : ligne citée + référence ; le texte intégral va au PDF — la salle n'a pas besoin de lire un article projeté, elle a besoin de savoir qu'il existe et ce qu'il pose.
**Fond parchemin ou fond blanc ?** Les deux se défendent ; le parchemin (#f6f0e3) du vault limite l'éblouissement sur vidéoprojecteur en salle claire, à condition de tester le contraste réel sur LE matériel de l'hôte (cf. `10_Checklist_Orga_15j`).
**Animations ?** Aucune : en atelier de 60 minutes, chaque animation est une seconde d'attention volée à la méthode.

## Les 8 contrôles qualité avant projection

- [ ] 10 slides exactement — le onzième est toujours une slide qui mange le Q&A
- [ ] Chaque slide = une phrase d'écran maximum
- [ ] Corps de texte ≥ 24 pt, titres 36-44 pt
- [ ] Contraste testé depuis le FOND de la salle de référence (pas depuis le bureau)
- [ ] Palette du vault (tokens `DESIGN.md` : parchment, ink, brass, encrier)
- [ ] Zéro jargon sans traduction en dessous
- [ ] Zéro prix, zéro promotion — aucune exception, même « juste le nom du cabinet »
- [ ] Slides 9-10 en fond sombre (encrier) : la salle doit VOIR la fin du cours commencer

## FAQ des slides

**Et le texte de loi en citation ?** Une ligne + la référence, jamais le paragraphe : la salle ne lit pas, elle écoute.
**Animations ?** Aucune ; le seul effet utile est la numérotation en bas à droite, pour les renvois du Q&A (« revenons à la 6 »).
**Le deck se recycle-t-il tel quel ?** Les structures 1-2-9-10 se gardent ; les slides 3 à 8 se réécrivent par sujet — un atelier par mois coûte alors deux heures de design, pas deux jours.

> **Lecture pro :** Relisez votre deck muet, slide par slide, sans la voix : si une slide se suffit à elle-même, elle est lue et inutile ; si elle ne dit rien sans vous, elle est décor — et c'est exactement ce qu'on lui demande.
> Une bonne slide est un repère, pas un document.
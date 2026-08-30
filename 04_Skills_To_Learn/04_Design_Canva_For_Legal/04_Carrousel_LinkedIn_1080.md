# 04 — Carrousel LinkedIn : le format 1080×1350, 8 à 10 slides

> Le carrousel « document » est le support public n° 1 du cabinet no-ads : ni pub, ni démarchage, mais de l'enseignement — le geste Challenger (fichier 01 de 03/) porté par le design encrier/parchemin. Cette fiche donne la structure slide par slide, les specs 2026 (1080×1350 recommandé), les règles de densité, et le workflow article → carrousel.

## POURQUOI le carrousel plutôt que le post texte ou l'image seule

Un post texte se lit ou se scrolle ; une image se consume ; le carrousel, lui, se **feuillette** : chaque swipe est un micro-engagement, et la structure « une idée par slide » correspond exactement à la façon dont un juriste démontre — thèse, articles, conséquences, action. Pour le LinkedIn marocain 2026, le format document (PDF importé) offre une meilleure durée de lecture que l'image, et le ratio **1080×1350 px (4:5)** occupe plus de hauteur d'écran mobile que le carré 1080×1080 — à l'ère du scroll au pouce, la verticalité est le vrai 16:9. Le carré reste la fallback pour les autres réseaux (Instagram feed).

## COMMENT — 1. Les specs techniques

- **Dimensions** : 1080 × 1350 px, marges de sécurité 60 px sur tous les bords (aucun texte dans les 60 px — l'UI de LinkedIn rogne).
- **Volume** : 8 slides minimum, 10 maximum ; en dessous, pas de thèse ; au-dessus, pas de fin.
- **Typo** : accroche EB Garamond 700, 60-72 pt ; corps Public Sans 32-36 pt, 20-28 mots par slide max ; labels (numéro de slide « 03/08 ») Public Sans 600, 24 pt, encre dim `#6b6a63`.
- **Palette** : alternance fond parchemin `#f6f0e3` (slides de contenu) et fond encrier `#070e1c` (slide 1, slide finale) ; texte encre `#1a2332` sur clair, laiton light `#e8d9b0` sur sombre ; un seul filet laiton `#c5a46a` par slide ; teal `#1a8a7f` uniquement sur le mot-clé juridique ou le lien de la dernière slide.
- **Export** : PDF (pas PNG) pour l'import « document » LinkedIn ; PNG 1080×1350 séparés pour Instagram.

## COMMENT — 2. La structure en 8 slides (patron universel)

| Slide | Fond | Rôle | Contenu |
|-------|------|------|---------|
| 1 — Hook | encrier | la douleur nommée | 1 phrase, 12 mots max, Garamond, filet laiton ; ex. « 5 clauses qui manquent dans tes contrats freelance » |
| 2 — Contexte | parchemin | POURQUOI ça coûte | la phrase « ce que tu crois » + « ce que dit la règle » |
| 3-6 — Les points | parchemin | une idée par slide | titre 4 mots + 2 phrases corps + réf exacte (art. 36 loi 31-08 ; loi 2-00 mod. 34-05 ; art. 64 loi 09-08 — 10 000-100 000 DH) |
| 7 — Checklist | parchemin | le « comment » | 5 cases à cocher visuelles, verbes à l'infinitif |
| 8 — CTA sobre | encrier | la porte | 1 phrase : « Article complet : [site]/ressources » + wordmark + RIO en 13 pt ; JAMAIS « réserve ton audit gratuit » |

Le chiffre d'accroche dans le hook (« 5 clauses… ») n'est pas du clickbait s'il est tenu : les slides 3-7 livrent exactement cinq points.

## COMMENT — 3. Les règles de densité et de lisibilité

1. **Une idée = une slide** : deux idées = deux slides, quitte à monter à 10.
2. **Hiérarchie stricte** : accroche (display) > preuve (corps) > réf juridique (label mono) — jamais la réf en plus gros que la règle qu'elle cite.
3. **Respiration** : ≥40 % de fond vide par slide de contenu ; le vide est la signature du bureau, pas un oubli.
4. **Contraste** : jamais `#6b6a63` sur `#070e1c` (illisible) ; sur encrier, texte = `#e8d9b0` ou `#9fc2e8`.
5. **Zéro image cliché** : ni balance, ni marteau, ni poignée de main, ni skyline ; si visuel, texture parchemin ou géométrie laiton abstraite.
6. **Légalité du contenu** : aucun logo ni nom de client, aucune donnée personnelle visible (captures de formulaires anonymisées), mentions 09-08 en légende de la dernière slide si le post renvoie vers un formulaire.

## EXEMPLE — carrousel complet prêt à publier : « Un impayé à 15 000 DH : ce que ton devis ne dit pas »

> **S1 (encrier)** : « Ton devis accepté par "OK" ne vaut presque rien. » — filet laiton.
> **S2 (parchemin)** : « Ce que tu crois : devis + facture = protection. Ce que dit la règle : sans clauses écrites, la charge de la preuve est la tienne. »
> **S3** : « Clause 1 — la propriété du code. » 2 phrases + « loi 2-00 mod. 34-05 : la cession s'écrit, précisement. »
> **S4** : « Clause 2 — l'échéance et les pénalités. » réf DOC (retard, taux librement fixé, pas d'abus).
> **S5** : « Clause 3 — la juridiction. » « Sans elle, poursuire un client US = coût > créance. »
> **S6** : « Clause 4 — la livraison acceptée. » « Le "cahier de recette" est ton vrai avocat. »
> **S7** : « Clause 5 — la réversibilité. » + checklist 5 points.
> **S8 (encrier)** : « Pack Freelance Contrat Offshore : note et périmètre sur demande, après diagnostic (900 DH HT). » + [site]/ressources + wordmark + RIO + mention 09-08 en 13 pt.

Note : la slide 8 ne « vend » pas — elle décrit le service, le prix du diagnostic est public car c'est une information tarifaire sobre, pas une promo (aucune urgence, aucun « offre limitée »).

## COMMENT — 4. Le workflow (20 minutes par carrousel)

1. Choisis un article déjà écrit (`09_SEO_Content_Engine/`) — jamais de carrousel à écrire de zéro.
2. Extrais 5 points + 1 accroche (prompt : « liste les 5 affirmations les plus utiles et une phrase-douleur » — `02_AI_For_Lawyers_Prompts/`).
3. Applique le patron S1-S8 dans le template T7 (fichier 03), 12 min.
4. **Relecture déonto** avant export : 0 promesse de résultat, 0 nom de client, 0 promo, mentions 09-08 si formulaire lié, prix cités exacts (900, 2 900 — jamais 600/1200).
5. Publie le PDF en « document », l'heure de post importe moins que la régularité (calendrier éditorial `09_SEO_Content_Engine/05_`).

## Erreurs d'application

1. **Le mur de texte** : plus de 28 mots par slide = le lecteur swipe au large ; le carrousel est un appétit, l'article est le repas.
2. **Le hook qui trahit** : « 7 erreurs » avec 5 slides → la confiance se perd une fois, elle ne se récupère pas en likes.
3. **Changer de design à chaque post** : l'alternance encrier/parchemin + filet laiton DOIT être prévisible — c'est le « vu » qui construit la reconnaissance (« ah, c'est encore son carrousel »).
4. **Le CTA « DM-moi pour un audit gratuit »** : c'est une sollicitation incitative doublée d'un contresens tarifaire ; « article complet » ou « diagnostic sur demande » — rien de plus.
5. **Publier sans relire les chiffres** : un « amende 300k » recopié d'un blog fait rire les pairs et perdre le prospect averti.

## COMMENT — la légende qui accompagne le PDF (elle compte pour moitié)

Le post LinkedIn autour du carrousel obéit aux mêmes lois que les slides :

- **Ligne 1** : la douleur en une phrase (c'est elle qui arrête le scroll — pas « nouveau carrousel ! »).
- **Lignes 2-3** : la promesse de contenu (« ce que le carrousel enseigne, sans les 5 points »).
- **Dernière ligne** : la porte sobre (« article complet : [site]/ressources ») — jamais un lien Calendly dans un post public : le formulaire se trouve sur le site, pas dans le fil.
- **3 hashtags maximum**, de niche (#freelancecasablanca #eCommerceMaroc #09-08) — le hashtag large (#droit) n'amène que des confrères.
- Zéro « P.S. », zéro emoji, zéro « je tague 5 personnes » (démarchage déguisé) ; les réponses en commentaire se font en mode conseil, avec la phrase garde-fou : « ceci est de l'information générale, pas un conseil sur votre espèce. »

## COMMENT — le carrousel Instagram (le même, décliné)

- 1080×1080 (le feed ne prend pas le 4:5 complet ; en stories, repartir du 1080×1920 avec les mêmes patrons).
- Slide 1 re-titrée pour l'aperçu carré ; la slide finale « article complet » devient « lien en bio ».
- La mention 09-08 doit tenir lisible en 13 px — sinon, la légende la porte, pas le pixel.

## COMMENT — le rythme réaliste (no-ads oblige à la régularité, pas à la performance)

| Quinzaine | Livrables |
|-----------|-----------|
| S1 | 1 carrousel (article déjà écrit) + 1 T8 miniature |
| S2 | 1 carrousel recyclé en post texte LinkedIn (même thèse, 5 phrases) |

Deux carrousels par mois suffisent à être « celui dont on reconnaît les pages » dans une niche — l'objectif n'est pas l'algorithme (variable, non mesurable, jamais une cible), c'est la reconnaissance, qui, elle, se mesure aux demandes entrantes nommant le sujet du carrousel (champ Notion « comment nous avez-vous connus ? », à compter au trimestre).

## COMMENT — la checklist spécifique carrousel (avant export)

- [ ] Slide 1 : ≤12 mots, fond encrier, hook tenu par les slides (pas de « 7 » dans le titre si 5 points suivent).
- [ ] Chaque slide de contenu : une idée, 20-28 mots, filet laiton, numéro « X/8 » en mono.
- [ ] Chaque réf juridique citée vérifiée dans le texte (art. 36 = 7 jours consommateur ; art. 64 = 10 000-100 000 DH).
- [ ] Dernière slide : porte sobre + wordmark + RIO + mentions 09-08 si destination collecte des données.
- [ ] Aucun nom, logo ou capture de client ; aucune promesse de résultat (« protège » oui, « vous fera gagner » non).
- [ ] Test mobile : ouvert sur téléphone, le corps de texte se lit sans zoom.

> **Lecture pro :** publie deux carrousels avec ce patron avant de lire la suite du dossier. Le design appris sans publication est de la théorie ; la première version qui « ne te ressemble pas encore » est le prix normal de l'apprentissage.

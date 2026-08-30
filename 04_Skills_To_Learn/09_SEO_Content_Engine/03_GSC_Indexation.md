# 03 — Search Console & indexation : le tableau de bord honnête (2026)

> Google Search Console étape par étape pour un blog de cabinet : propriété domaine via DNS, sitemap selon la plateforme, les QUATRE vraies métriques GSC (clics, impressions, CTR, position moyenne), séparer la marque de la longue traîne, demander l'indexation — et les délais réalistes qu'aucun tutoriel ne dit. GSC ne couvre que la recherche Google : le reste du trafic se mesure avec Plausible (`04_Skills_To_Learn/01_Legal_Tech_Stack/07_Plausible_Analytics_CNDP.md`).

## POURQUOI GSC est le seul outil de pilotage du SEO du vault

Pas d'achat de liens, pas de campagne Ads, pas de budget : GSC est la seule fenêtre directe sur ce que Google voit de toi — et les données qu'il donne sont des faits (requêtes réellement tapées), pas des estimations d'outiers tiers. C'est lui qui remplace tous les scores de difficulté des outils freemium : dans six mois, VOTRE position réelle vaudra plus que n'importe quel indice.

## COMMENT — 1. Installer la propriété (10 min)

1. search.google.com/search-console → « Ajouter une propriété ».
2. **Privilégier « Domaine »** (couvre sous-domaines et http/https) : la vérification passe par un enregistrement DNS TXT — à faire chez le registrar (Nomzilla, OVH Maroc, Cloudflare…), propagation en quelques minutes à quelques heures.
3. L'alternative « Préfixe d'URL » (upload d'un fichier HTML) marche sans DNS — utile si le domaine est géré par un prestataire, mais moins pérenne.
4. Inviter le stagiaire/future collaboratrice en permission limitée (« Full user » seulement aux décideurs) — même règle d'accès que le reste du Notion.

## COMMENT — 2. Le sitemap XML selon ta plateforme

| Plateforme | Sitemap | Note |
|------------|---------|------|
| WordPress | natif (`/sitemap.xml` ou via extension SEO) | le plus simple à suivre |
| Carrd | génère un sitemap automatiquement si pages indexables | vérifier dans les réglages SEO de la page |
| Notion + Super | Super gère un sitemap de base | `[flag : les capacités exactes de Super évoluent avec l'outil — vérifier dans la doc Super le jour du choix]` |
| Webflow / Framer | sitemap natif | idem |

Soumettre dans GSC → Pages → Sitemaps → `https://tondomaine/sitemap.xml`. Le sitemap n'accélère pas le classement — il accélère la découverture, c'est différent et utile à comprendre.

## COMMENT — 3. Les QUATRE métriques réelles du rapport Performance

GSC ne rapporte que des données de recherche Google ; les rapports sont conservés sur une fenêtre longue (≈ 16 mois — vérifier la portée exacte dans l'interface le jour de l'export, l'export CSV mensuel reste la bonne habitude) :

1. **Clics** — visites depuis la recherche. Seule donnée business.
2. **Impressions** — combien de fois ton URL est apparue. Indicateur de couverture de requêtes : sans impressions, pas de clics possibles.
3. **CTR** — clics/impressions. Faible avec de bonnes impressions = titre/extra à retravailler (cf. `07_Erreurs_SEO.md`, erreur n° 9).
4. **Position moyenne** — MOYENNE pondérée, pas ton rang par requête : à lire par requête (onglet Requêtes), jamais en globule.

Les filtres qui comptent : par page (quel article performe), par requête (laquelle amène), par pays (Maroc vs France vs diaspora MRE), par appareil (mobile d'abord — le trafic marocain est très majoritairement mobile).

## COMMENT — 4. Séparer marque et longue traîne (le geste de lecture)

Dans le rapport Requêtes, filtre d'exclusion `site:tondomaine` ne marche pas — filtrer par regex de la marque : `(votre|cabinet|nomducabinet|domaine)` et COMPARER deux rapports :

- **Marque** : « cabinet [nom] », « [nom] avocat » — attend la présence de ton nom sur les annuaires, les cartes ; sans notoriété, ~0 en M1-M6, et c'est NORMAL.
- **Longue traîne** : tout le reste = la seule donnée qui jugera le contenu. Objectif honnête : des requêtes qui apparaissent (impressions) avant les clics, des clics qui arrivent sur 2-3 articles avant les autres.

## COMMENT — 5. Indexation : la procédure 2026 et les délais qu'on ne dit pas

1. GSC → Pages (rapport d'indexation) → « Inspection d'URL » : coller l'URL → « Demander l'indexation » — la file de demande ponctuelle a remplacé l'ancien bouton de l'inspecteur ; la logique (signaler individuellement une URL) reste.
2. Demander pour CHAQUE nouvel article le jour de publication (quota implicite raisonnable : quelques dizaines/jour ; ne pas inonder).
3. **Délais réalistes** : site neuf sans notoriété = semaines, parfois 1-3 mois avant indexation stable ; site établi = heures à jours. L'indexation précède le classement : un article indexé en M1 peut ne cliquer qu'en M4-M6.
4. « Découverte lente » / « Explorée — non indexée » : vérifier contenu mince, doublons, canonical ; « Suivi sans intérêt » : Google juge la page peu utile — réécrire plutôt que re-soumettre en boucle.

## COMMENT — 6. Ce que GSC NE mesure pas (et où le chercher)

| Donnée hors GSC | Outil du vault |
|-----------------|----------------|
| Visites depuis LinkedIn, directs, referrals | Plausible (sans cookies, voir dossier Legal Tech) |
| Emails, appels, formulaires | Champs de conversion Notion + Calendly |
| Clics Ads | aucun (choix no-ads) |
| Positions sur Bing/Yandex/DuckDuckGo | ignorés volontairement à ce stade — Google domine le marché marocain, les autres restent un bonus gratuit |

## COMMENT — 7. Lire les rapports sans se raconter d'histoires

- **Requêtes** : trier par impressions décroissantes et ignorer les 5 premières (souvent marque/bruit) ; chercher les « queries non exploitées » — une requête à 300 impressions et 0 clic = un title à réécrire, pas un échec de contenu.
- **Pages** : la page qui imprime sur une requête d'un AUTRE article = cannibalisation naissante (cf. `07_Erreurs_SEO.md` n° 2) — consolider, pas publier.
- **Positions** : la « moyenne » masque la distribution ; sur une requête, regarder le MIN/MAX du mois pour juger la stabilité.
- **Appareils** : au Maroc, > 75 % du trafic de recherche est mobile (ordre de grandeur à confirmer dans tes propres données — la seule source qui compte) ; si le CTR mobile est bas et le desktop correct, le problème est d'affichage, pas de texte.

## COMMENT — 8. Les alertes utiles (à activer ou à simuler)

1. Chute d'impressions > 50 % sur 7 jours glissants sur un article suivi → vérifier indexation + concurrent frais.
2. Nouvelle requête à > 200 impressions → l'ajouter au panier de `01_SEO_LongTail.md` et de l'arbre `10_Arbre_Choix_MotCle.md`.
3. Erreur d'exploration répétée sur le sitemap → la plateforme a changé de génération d'URL.
L'email-summary hebdomadaire de GSC couvre l'essentiel : inutile de se connecter tous les jours (le reflexe « rank check » est l'ennemi n° 1 du CTR, cf. `06_Metriques_Position.md`).

## COMMENT — 9. GSC et RGPD/09-08 du côté du cabinet (l'ironie à éviter)

Un cabinet qui conseille la conformité ne peut pas avoir un blog non conforme : GSC traite des données de recherche de l'opérateur de service — la déclaration au titre de la loi 09-08 est documentée par la CNDP (guides cndp.ma, section « données de mesure d'audience » : le suivi statistique sans cookies exempté de consentement est documenté par la CNIL française côté UE et les guides CNDP côté Maroc — re-vérifier le dernier guide disponible le jour de la mise en ligne du blog, `[flag : texte CNDP exact sur l'exemption cookies à recopier depuis cndp.ma avant toute publication de bandeau cookies sur le propre site du cabinet]`). Le blog du cabinet applique ses propres packs : mentions légales, politique de confidentialité, bandeau — l'auto-conformité est le premier article non écrit.

## FAQ du fichier

**Q. Combien de temps pour être indexé la première fois ?**
R. De quelques heures à plusieurs semaines pour un site neuf sans notoriété ; la demande d'indexation accélère la découverte, pas le classement (cf. § 5).
**Q. Peut-on voir EXACTEMENT ses positions ?**
R. Non en direct ; GSC donne des moyennes et des plages. Un suivi fiable = le panier de 10 requêtes revu mensuellement (`06_Metriques_Position.md`), pas une vérification quotidienne.
**Q. Faut-il un sitemap si le site a 10 pages ?**
R. Oui, c'est gratuit et indolore — mais sur un site petit, les liens internes font le même travail ; le sitemap devient vital au-delà de 30 pages.

## Les 6 erreurs GSC du lancement (les miennes ou celles d'un autre)

1. Installer la propriété sur le mauvais préfixe (http vs https) et diviser les données en deux propriétés sans lien.
2. Oublier de soumettre le sitemap — la page d'accueil se trouve seule, les pages profondes non.
3. Supprimer des « requêtes fantômes » du rapport pour faire propre — GSC agrège, le bruit est normal et instructif.
4. Paniquer sur l'écart GSC/Plausible (les deux ne mesurent pas la même chose — cf. § 6).
5. Utiliser le compte Google personnel quotidien comme navigateur de vérification (le piège n° 2 de `06_Metriques_Position.md`).
6. Attendre que l'indexation = le classement : ce sont deux files différentes, et seule la seconde paye.

## EXEMPLE — la revue mensuelle GSC en 20 minutes (un dimanche)

1. Période : 28 derniers jours, comparaison au mois précédent (les courbes GSC sont lissées sur 16 mois — les variations mensuelles restent exploitables).
2. Onglet Requêtes : quelles nouvelles requêtes LONGUE TRAÎNE apparaissent (impressions > 0, position 8-30) → candidates à un renforcement de contenu.
3. CTR par page : une page en position 4-10 avec CTR < 2 % → retravailler le title (cf. `06_Metriques_Position.md`).
4. Pages : nouvelles URLs non indexées → demande d'indexation.
5. Noter les 3 décisions dans le fichier métriques. Total : 20 min/mois, 0 DH.

> **Lecture pro :** GSC est un instrument de patience : pendant les trois premiers mois, sa seule utilité est de confirmer que tu es INDEXÉ — et ce n'est déjà pas si mal pour un cabinet sans notoriété.

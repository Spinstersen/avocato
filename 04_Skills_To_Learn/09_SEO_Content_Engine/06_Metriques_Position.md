# 06 — Métriques & position : mesurer ce qui décide, pas ce qui flatte

> Le tableau de bord mensuel du SEO du cabinet en 30 minutes : positions sur 10 requêtes cibles, impressions, CTR, et la seule métrie qui compte vraiment — articles → diagnostics (UTM + champ source dans la base PROSPECTS Notion). Plus : les pièges de vanité, le biais du « je vérifie mon ranking » qui pollue le CTR, et des cibles honnêtes, pas des promesses.

## POURQUOI une feuille de métriques si petite

Un solo ne pilote pas un département marketing : il pilote DEUX questions — « est-ce que des inconnus trouvent mes réponses ? » (GSC) et « est-ce que ça devient des diagnostics ? » (Notion). Tout le reste (dashboards, crawl rank, authority scores d'outils tiers) est décoratif : c'est mesuré pour être lu, et lu, c'est déjà trop. 30 minutes/mois, un fichier, deux tableaux.

## COMMENT — 1. Les 10 requêtes cibles (le panier fixe)

À chaque trimestre, figer 10 requêtes issues de `01_SEO_LongTail.md` et des winners GSC du trimestre précédent. Colonnes : requête | position moyenne du MOIS (GSC, filtre exact) | URL qui répond | mouvement vs M-1 | décision.

Comment lire une position GSC sans se mentir :

- C'est une MOYENNE pondérée par les impressions : une requête en position 4 avec 90 % d'impressions en position 3-5 se lit ~4,5. Regarder la DISTRIBUTION par requête, pas le chiffre global.
- Une position > 20 = invisibilité statistique ; entre 5 et 20 = « presque » : quelques lignes de contenu ou un title retravaillé font bouger ; < 5 = renforcer la page, pas en créer une autre (cannibalisation, cf. `07_Erreurs_SEO.md`).

## COMMENT — 2. Les trois indicateurs de GSC (rappel : fenêtre glissante ≈ 16 mois)

1. **Impressions mensuelles** (longue traîne, marque exclue) : la couverture. Elle monte AVANT les clics de plusieurs semaines.
2. **CTR par requête** : la santé du title. Une position 3-10 avec CTR < 2 % = problème de formulation, pas de contenu.
3. **Clics mensuels** : la seule ligne qui va au tableau de bord business.

## COMMENT — 3. Articles → diagnostics : le chaînon qui prouve le ROI

- Chaque lien d'article vers la page diagnostic porte un UTM : `?utm_source=blog&utm_medium=article&utm_campaign=id-article` (Plausible lit les sources UTM sans cookies).
- La base PROSPECTS Notion a un champ « Source » select : article (avec lien), LinkedIn, referral, atelier, annuaire.
- Au diagnostic payé, on demande systématiquement, en une phrase : « Comment m'avez-vous trouvé ? » — la réponse est recopiée telle quelle.
- Le tableau mensuel : **visites depuis le blog → contacts entrants → diagnostics signés**, avec les taux de passage en regard. C'est la seule conversion qui parle au cabinet.

## COMMENT — 4. Le tableau de bord mensuel (30 min, le premier dimanche du mois)

| Bloc | Source | Durée | Livrable |
|------|--------|-------|----------|
| Positions des 10 requêtes | GSC, filtre par requête | 10 min | table à jour |
| Impressions/clics/CTR longue traîne | GSC, exclure regex marque | 5 min | 3 chiffres vs M-1 |
| Articles → diagnostics | Plausible (UTM) + Notion (Source) | 10 min | tunnel du mois |
| Décisions | les trois ci-dessus | 5 min | 1-3 actions pour le calendrier (`05_Calendrier_Editorial.md`) |

Les décisions type : « renforcer l'article X (position 7, CTR 1,8 % → retravailler le title) », « écrire l'article Y (2 diagnostics ce mois via cette requête) », « tuer le sujet Z (6 mois, 0 impression) ».

## COMMENT — 5. Les pièges (et pourquoi chacun coûte)

1. **Vanity metrics** : « +300 % d'impressions » ne paie rien. Une seule ligne va au bilan : diagnostics signés depuis le blog.
2. **Vérifier son ranking à la main** : chercher « mentions légales maroc » 4 fois/jour sur son compte Google personnel fausse TOUT — les impressions/clics se comptent depuis les données de l'utilisateur connecté, ton CTR s'effondre et tes décisions deviennent fausses. Parade : GSC uniquement, ou navigation privée, ou un second profil vierge (jamais le compte principal).
3. **Comparer des périodes inégales** : GSC raisonne en fenêtres glissantes ; comparer mois glissant vs mois glissant, ou semaine vs semaine.
4. **Réagir à 30 données** : une requête qui « baisse » de 4 à 7 peut être un artefact de saison ou de consolidation de requêtes (GSC regroupe/varie les termes) ; attendre deux lectures mensuelles avant toute décision.
5. **Le clic n'est pas le client** : une page à fort CTR qui n'apporte aucun diagnostic n'est pas un succès — vérifier le champ Source Notion avant de féliciter un article.

## COMMENT — 6. Les cibles honnêtes (ordre de grandeur, pas promesses)

Sur un blog de niche qui publie 2 articles/mois depuis un domaine peu connu :

- **M1-M3** : indexation, premières impressions, quasi zéro clic — c'est le programme normal, pas un échec (cf. les délais de `03_GSC_Indexation.md`).
- **M4-M6** : premières requêtes en page 2-3 ; un ordre de grandeur raisonnable pour un contenu de niche bien exécuté : **~100-300 visites mensuelles issues de la recherche vers M6** — une ESTIMATION prudente, pas une norme : les variances sont énormes selon SERP, actualité et concurrence.
- **La seule cible qui tienne** : 1er diagnostic issu d'un article avant M6 ; à M6, si le tunnel existe même à petite échelle, le moteur est validé — le volume viendra avec les 40 articles, pas les 8 premiers.

## COMMENT — 7. Le journal du moteur (l'unique fichier de suivi)

Un fichier (Notion ou .md), quatre sections par mois :

```
MOIS : ___
1) Panier 10 requêtes (positions) : [table]
2) GSC longue traîne : impressions ___ clics ___ CTR ___
3) Tunnel : articles vus (Plausible/UTM) ___ contacts source-article ___ diagnostics signés source-article ___
4) Décisions du mois : 1-3 lignes max, avec la revue suivante en échéance.
```

Ce journal est ce que le stagiaire relit, ce que la revue mensuelle alimente, et ce que l'arbre de l'article suivant consulte. Tout le reste (captures d'écran, rapports PDF) meurt dans un dossier ; le journal, non.

## COMMENT — 8. Les 5 seuils qui déclenchent une action (règles du vault)

| Signal | Seuil (ordre de grandeur interne) | Action |
|--------|-----------------------------------|--------|
| Position 5-15 + CTR < 2 % | requête transactionnelle | réécrire le title (`07_Erreurs_SEO.md` n° 9 : liens internes aussi) |
| 2 articles qui impriment la même requête | mois consécutifs | fusion + redirections |
| 0 impression après 6 mois | tout sujet | parking de l'arbre (`10_Arbre_Choix_MotCle.md`) |
| 1 diagnostic signé depuis un article | n'importe quand | FÉLICITER le sujet : il devient pilier |
| Citation légale suspecte repérée | immédiatement | correction + note « mis à jour le » le jour même |

## FAQ du fichier

**Q. Pourquoi pas Ahrefs/Semrush ou équivalents payants ?**
R. Parce que leurs scores ne sont que des estimations comparatives (cf. `01_SEO_LongTail.md` sur les chiffres magic) et qu'un abonnement à tarif élevé par rapport au budget d'un solo ne se justifie que quand les 10 requêtes cibles sont déjà pilotées avec GSC — pas avant.
**Q. Le panier change-t-il en cours de trimestre ?**
R. Non, il est figé au début du trimestre — sinon la comparaison mensuelle devient impossible et les décisions se prennent sur du sable.
**Q. Et si GSC et Plausible se contredisent ?**
R. C'est normal (GSC = recherche Google uniquement, échantillonné et arrondi ; Plausible = visites réelles sans cookies) — on ne les additionne jamais, on les croise.

## EXEMPLE — un dimanche de revue réel (mois 5 du blog)

GSC : impressions longue traîne 2 400 (+60 % M/M), clics 130, CTR 5,4 %. Panier : « mentions légales ecommerce maroc » 8,4→6,2 (renforcer title ✓) ; « registre cndp template » 12→11 (patience) ; « loi 09-08 sanctions » 5→9 (que s'est-il passé ? → l'annuaire concurrent a publié une page fraîche — vérifier vs `07_Erreurs_SEO.md` n° 8). Notion : 2 diagnostics taggés « article », dont un pack 5 900 signé. Décisions : actualiser l'article sanctions (date + PAA), ne PAS écrire un nouvel article sur ce sujet. 31 minutes.

## COMMENT — 9. La revue trimestrielle (60 min, le premier du trimestre)

1. Refaire le panier des 10 requêtes : sortie des mourantes (> 2 trimestres sans impression), entrée des winners GSC.
2. Audit des 5 articles top impressions : un seul a-t-il produit un contact ? (sinon : revoir le CTA, pas le SEO).
3. Vérifier les seuils d'action du § 8 sur les 3 derniers mois.
4. Ouvrir `10_Arbre_Choix_MotCle.md` : les trois prochains articles sont-ils cohérents avec ce que le journal dit, ou avec ce que l'humeur dit ?
5. Décider un seul expérimenté par trimestre (ex. un article arabe, un format interview) — le reste du temps, exécuter le plan.

> **Lecture pro :** ce tableau de bord ne sert pas à prouver que le SEO marche — il sert à savoir quelle page améliorer la semaine prochaine, et à arrêter d'écrire ce qui ne marche pas. Le reste est du bruit que les concurrents mesurent pour les conférences.

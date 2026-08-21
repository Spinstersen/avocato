# 03 — GSC Indexation : de "Découverte" à "Indexée" en 48h (pas 3 semaines)

## Définition
Google Search Console (GSC) = tableau de bord gratuit qui dit si Google a **découvert, crawlé et indexé** ton article. Sans indexation = 0 impression, même avec 2500 mots parfaits. Statuts GSC : `Découverte → Crawlé → Indexée` (succès) vs `Crawlé non indexée` / `Découverte non indexée` (échec = à corriger). Objectif avocat Maroc : 100% des articles indexés en <48h.

## Framework complet — 3 piliers Indexation

| Pilier | Action | KPI | Outil |
|---|---|---|---|
| **Technique** | Sitemap + robots.txt + canonical | 0 erreur couverture | GSC > Indexation > Pages |
| **Signal** | Inspection URL + sitemap ping | <48h indexation | GSC Inspection + /sitemap.xml |
| **Surveillance** | Impressions / position / CTR | >5 impressions J7 | GSC Performance |

**7 causes "non indexée" en cabinet avocat (et fix) :**
1. Noindex oublié (Yoast/RankMath) → retire balise
2. Canonical vers autre page → corrige
3. Contenu dupliqué (CGV copiée) → réécris 30% + canonical
4. Orphan page (0 internal link) → ajoute 3 liens (voir 02)
5. Sitemap non soumis → soumets /sitemap.xml
6. Qualité faible <800 mots → passe à 2500 (02)
7. Site neuf <3 mois → patience + 1 backlink LinkedIn

## Procédure pas-à-pas chiffrée (30 min par article)

1. **Pré-publish check (5 min)** : Vérifie robots.txt autorise `/` et sitemap présent `votresite.ma/sitemap.xml` (Yoast génère auto). Vérifie meta robots = index,follow.
2. **Publish + Inspection (5 min)** : Publie article. Copie URL → GSC > Inspection URL → colle → Entrée → "URL non indexée" normal J0 → clique **Demander l'indexation** → délai file 5 min.
3. **Sitemap ping (5 min)** : GSC > Sitemaps → si sitemap déjà soumis, clique "Actualiser". Sinon ajoute `sitemap.xml` → Envoyer. Google recrawl en 24-48h.
4. **Internal links (5 min)** : Ajoute 3 liens entrants vers nouvel article depuis articles existants (ou page d'accueil si 1er article). Orphan = non indexé.
5. **J+2 vérif (5 min)** : Re-inspecte URL. Statut attendu : "URL indexée sur Google". Si "Crawlé non indexée" → ouvre détail → lit raison → corrige (thin content ? duplique ?).
6. **J+7 performance (5 min)** : GSC > Performance > filtre URL → vérifie impressions >5 et position <50. Si 0 impression → re-inspection + partage LinkedIn pour signal crawl.

## Exemple Maroc 2025 — Article "Registre CNDP 09-08 modèle"

| Étape | Action | Résultat |
|---|---|---|
| **J0 10h** | Fatima publie "registre-cndp-modele" 2500 mots (02) → inspection + demande indexation | File 48h |
| **J2 10h** | GSC affiche "Indexée" → Performance : 8 impressions, pos. 34, CTR 2.1% | OK |
| **Option 2900 DH** | Pack SEO Starter : 4 articles/mois + GSC setup + sitemap + 48h indexation garantie | 2900/mois, 7j setup |
| **Option 5900 DH** | Pack SEO Accéléré : 8 articles + GSC + repurposing 1→5 + rapport mensuel position (06) + 1 backlink invité | 5900/mois |

Si non indexé à J7 → audit technique inclus (robots, canonical, dupliqué) sans frais.

## Erreurs Top 3

1. **Publier 10 articles d'un coup sans inspection** → 6/10 restent "Découverte non indexée" 3 semaines → corriger : 1 article → inspection immédiate → J+2 vérif → suivant.
2. **Sitemap non soumis + 0 internal link** → Google ne découvre jamais → corriger : sitemap auto + 3 liens internes systématiques + lien depuis LinkedIn/newsletter.
3. **Demander indexation 5×/jour (spam)** → quota GSC bloqué 10 requêtes/jour → corriger : 1 demande J0, 1 vérif J2, pas plus.

## Checklist 12 points — GSC Indexation (contextuelle)

- [ ] GSC propriété vérifiée (DNS ou balise HTML)
- [ ] Sitemap.xml soumis et statut "Succès" (0 erreur)
- [ ] Robots.txt n'exclut pas l'article
- [ ] Meta robots = index,follow (pas noindex)
- [ ] Canonical = URL elle-même (pas vers autre page)
- [ ] Inspection J0 faite + "Demande d'indexation" cliquée
- [ ] 3 internal links vers nouvel article ajoutés
- [ ] J+2 statut "Indexée" vérifié (capture)
- [ ] J+7 impressions >5 dans Performance
- [ ] Aucune erreur "Crawlé non indexée" en attente
- [ ] Partage LinkedIn/newsletter fait (signal crawl externe)
- [ ] Log daté : URL / date demande / date indexation / pos J7

## Sources
- Google Search Central : docs indexation, inspection URL, sitemap protocol
- sgg.gov.ma : Loi 09-08 art.14 (si article 09-08, justifie indexation rapide pour conformité)
- cndp.ma : registre exemple qui doit être indexable
- Glossaire `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §06 (09-08), §04 (TVA art.92 pour facturation SEO export)

## Plan d'action 30 jours
- **S1 J1-7** : GSC installé + sitemap soumis, article #1 indexé <48h, template log indexation créé
- **S2 J8-21** : Articles #2-3 indexés, suivi tableau "URL | demande | indexée | pos J7", correction orphans
- **S3 J22-30** : 4 articles indexés (100%), rapport GSC mensuel (impressions, position moyenne), 1 erreur "non indexée" résolue et documentée
- Tracker : check GSC 10 min chaque mardi/vendredi, Notion "GSC Log"

## Interactions avec autres dossiers
- **09_02 Structure 2500** : sans 2500 mots + H2, GSC classe "Crawlé non indexée - faible qualité"
- **09_04 Repurposing** : partage LinkedIn = backlink social → accélère crawl
- **09_06 Métriques** : Performance GSC alimente KPI position/CTR
- **12_Finance 04_Devis** : facturation SEO 2900/5900 TVA 0% si client export (art.92 + rapatriement 30j)
- **11_Negotiation 01_BATNA** : si GSC bloque (quota 10/j), BATNA = Bing Webmaster + indexation via newsletter

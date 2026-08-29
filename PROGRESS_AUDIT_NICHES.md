# PROGRESS — Audit & redo des niches deep-dive (état : 29/08/2026, fin de session)

> Document de reprise. À lire en entier avant de continuer — il contient les **règles vérifiées** (ne plus jamais réintroduire les erreurs corrigées) et le **restant à faire niche par niche**.

## 1. Ce qui est FAIT et COMMITEM ce soir

### Vérité juridique (le travail le plus important)
Audit complet des références légales/jurisprudentielles du vault contre les sources officielles (`sgg.gov.ma`, `cndp.ma`, `ompic.ma`, `oc.gov.ma`, `tax.gov.ma`, `dgssi.gov.ma`, `jurisprudence.ma`, presse eco documentée). Résultat : **3 « jurisprudences » du vault étaient fictives** (CNDP 2023-045, Cass. com 2022/123, OMPIC 2023/89 HRFlow) → retirées partout, remplacées par des bases réelles.

### Les règles vérifiées — CHEAT SHEET (applicable à TOUTES les niches restantes)

| ❌ Ce que le vault disait | ✅ Réalité (vérifiée 28-29/08/2026) |
|---|---|
| « loi 28-08 » comme base | **Loi 66-23 promulguée** (dahir 1-26-75, 18/08/2026, BO 7536) remplace 28-08 ; principes inchangés, **nouveaux numéros d'articles à transposer** (note de transition dans les textes, pas de faux numéros) |
| « CNDP décide n° 2023-045 » etc. | La CNDP ne publie PAS de sanctions numérotées → citer : art. **64** (défaut formalités 10k-100k), art. **65** (pénal jusqu'à 3 ans), grille PDF officielle cndp.ma, stats plaintes (1→508, 2011→2017) |
| « Cass. com 2022/123 clause pénale 30% » | Arrêt inexistant → DOC **art. 263-264** + « modération admise en pratique », jamais de numéro inventé |
| « OMPIC 2023/89 HRFlow » | Marque de test interne ! → remplacer par l'arrêt RÉEL : **CA com Casablanca 2024 « NOUR DAR / ALNOUR »** (marque 231440 ; annulation décision OMPIC pour dépassement délai art. 148-3 ; opposition 2 mois art. 148.2 ; ≈2 400 DH/classe ; dépôt ≈1 800 DH/classe + 400 publication ; 10 ans renouvelables) |
| « loi 20-19 SARL » | N'existe pas → **loi 5-96** (SARL/SARL-AU ; SAS/SASU via loi 19-20) |
| « loi 34-05 droit d'auteur » | Confusion → base = **loi 2-00 modifiée/complétée par 34-05** (cession écrite droit par droit, art. 9) |
| « CGI art. 150 régime AE » | Faux → **loi 114-13** (statut) + CGI **art. 42 et s.** ; plafonds 200k services (IR 1%) / 500k commerce (0,5%) ; **1ʳᵉ année dépassement tolérée, 2ᵉ = radiation RNAE** (pas « redressement 30% ») ; RAS 30% sur >80k/client (art. 42 bis, LF2023) ; RNAE = 1 seule activité |
| « IS 15% <300k / 31% » | Périmé → **IS 2026 : 20% (BNF<100M) / 35% (≥100M) / 40% finance** (réforme LF2023 NC 733, convergence close, CGI art. 247-XXXVII) ; RAS dividendes **11,25% 2026 → 10% 2027** |
| « CGI art. 144 facture » | → **art. 145** ; + facturation électronique en déploiement (LF2025-2026, calendrier DGI par taille) |
| « TVA art. 92 export » | ✅ Correct (92) ; AE hors champ TVA = **art. 91-II** ✅ ; convergence TVA 2026 = **20/10/0** |
| « DOC art. 618 réserve de propriété » | Faux → **écrit convenu au plus tard à la livraison** (ne pas citer 618 ; vérifier base exacte CC/DOC si besoin) |
| « DOC art. 258 clause pénale » | Faux → **263-264** |
| « loi 19-06 Office des changes » | N'existe pas → **IGOC édition courante = IGOC 2026** (en vigueur 01/01/2026, oc.gov.ma — l'édition 2024 est archivée) + lois réelles : 63-14, art. 4 ter LF 110-13, art. 8 LF 70-19 et LF 55-23 (rapatriement/campagnes) |
| « loi 17-97 = copyright » (et « art. 133 premier déposant ») | 17-97 = **propriété industrielle** ✅ (mod. 31-05 et 23-13) ; le mécanisme citationnel propre : premier déposant via enregistrement + opposition art. 148.2-3 — éviter « art. 133 » |
| « rétractation 14 jours » | **7 jours — art. 36 loi 31-08** (30 si info non confirmée par écrit ; remboursement 15j art. 37 ; exceptions liste fermée art. 38 ; preuve au vendeur art. 34 ; clauses abusives art. 15-19 = protégent le CONSOMMATEUR, pas le pro en B2B !) |
| « loi 53-05 e-commerce / DOC 419 » | Contrat électronique = **loi 53-05** (jamais « DOC 419 ») |
| numéros internes 09-08 (art. 12-14/23/43-44/7-9) | ⚠️ Non vérifiés au texte consolidé → écrits comme raccourcis avec flag « transposer depuis sgg.gov.ma » ; ne pas les propager ailleurs sans flag |

### Niche par niche — état
| Niche | État | Lignes |
| :--- | :--- | :--- |
| **01 Freelancers** | ✅ Refaite : index 14 fichiers + watch, 09 réécrit (réel), citations corrigées, prix unifiés (diag **900 HT**), + `13_Solutions_Juridiques.md` | ~1 400 |
| **02 E-commerce** | ✅ Idem + 08/09/10/11/12 dé-cloneés e-commerce (7j, 53-05, 500k…), 06 renommé canonique, banque 31-08 clarifiée + `13_Solutions_Juridiques.md` | ~1 150 |
| **03 09-08/GDPR** | ✅ Rebuild complet (663→1 300 l.) : 13 fichiers + `13_Solutions_Juridiques.md`, index 14, CNDP dé-fiction | ~1 300 |
| **04 Créateurs** | ✅ Rebuild complet (573→1 200 l.) : split SEO/Canaux, création 06, 07 cas enrichi, 08-12 dé-cloneés, + `13_Solutions_Juridiques.md` ; erreurs juridiques corrigées (31-08 B2B ≠ protège le créateur ; loi 2-00 ; vide juridique sponsoring documenté : plainte ministère vs 36 créateurs déc. 2025 + loi FR 09/06/2023 n° 2023-451) | ~1 200 |
| **05 MRE/Investisseurs** | ✅ Rebuild complet (29/08 → reprise 30/08) : 11 fichiers 600 l. → **14 fichiers canon ~1 250 l.** ; split `04_Canaux_Acquisition_EN` → 04 SEO + 05 Canaux ; `05_Cas_Pratique` → `07_Cas_Pratique_Complet` ; création `06_Scripts` (FR+EN) + `13_Solutions_Juridiques` ; 08-12 dé-cloneés MRE ; citations réelles vérifiées 29-30/08 : **conv. fiscale France-Maroc = 29/05/1970 (avenant 18/08/1989), PAS 1959** (art. 13 dividends ≤15 %, art. 25 crédit FR 25 %) ; SARL = loi 5-96 (20-19 retiré) ; charte = **loi-cadre 03-22** (dahir 1-22-76, BO 7152 ; décret 2-23-1 : ≥50 M DH/50 emplois ; art. 9 conventions, art. 37-38 arbitrage) ; **AMDI = loi 60-16** (pas « AMI 65-16 », pas « ONIGA ») ; « loi 18-18 » n'existe pas (confusion avec 18-95 abrogée) ; TBI Maroc-France 13/01/1996 v. 31/05/1999 ; CIRDI Maroc 11/10/1967 + affaire réelle Malicorp ARB/08/4 (25/02/2011) ; CE 19/11/2014 n° 362800 Thollon ; CCISM corrigée (espagnole, pas « slovaque ») → réseau réel = **CFCIM/MEIF** ; diag unifié **900 HT** | ~1 250 |
| **Banque `08_Jurisprudence/`** | ✅ 00_Index (règle vérifiabilité + vrais exemples), 01_Loi_09-08 (cas types étiquetés + art. 64/65), 02_Loi_31-08 (7j), 03_Contrats (Cass. com retiré), 05_PI_OMPIC (rempli — était vide : barèmes ROMARIN + arrêt NOUR DAR) | — |
| **`05_Document_Bank/templates/03 & 04`** | ✅ Références fictives « Cass. com 2022/123 » retirées | — |

### Le NOUVEAU standard canon : 14 fichiers par niche
`00_INDEX` (13 lignes table + watch) · `01_Persona` · `02_Douleurs` · `03_Offre` · `04_Mots_Cles_SEO` · `05_Canaux_Acquisition` · `06_Scripts_DM_WhatsApp` · `07_Cas_Pratique_Complet` · `08_Zones_Grises_Cas_Limites` · `09_Jurisprudence_Niche` (réel uniquement) · `10_Comparatif_International` · `11_Arbre_Decision_Niche` · `12_Fiches_Pratiques_Niche` · **`13_Solutions_Juridiques.md`** (nouveau : mapping douleur→parade, clauses réellement rédigées, matrice de priorisation, stack par persona — modèle : le fichier 13 de la niche 01).

---

### Webapp (`webapp/`) — réparée 29/08 soir
- `data.js` reconstruit (`node scripts/build.js` depuis `webapp/`) : 491 documents, les **11 niches présentes** dont 01-04 à 14 fichiers (13_Solutions inclus). **Rappel : relancer le build après chaque modif .md, sinon l'app « ne contient pas les niches ».**
- `app.js` : labels propres pour les 11 niches dans la sidebar (avant : noms bruts `02_Niches_Deep_Dive/05_...`), fallback formaté pour tout nouveau dossier, recherche avec minuscules pré-calculées + debounce (fix lag sur 1,8 Mo de contenu).
- 7 fichiers legacy `02_Niches_Deep_Dive/0X_*.md` archivés dans `_archive/02_niches_legacy/` (hors build via IGNORE_DIRS).
- Plaque latérale : mention loi professionnelle mise à jour (66-23 ex-28-08).
- À tester dans le navigateur (Ctrl+F5) : `webapp/index.html` en file:// fonctionne (offline). Si un souci visuel subsiste, préciser l'écran/la niche concerné.

## 2. RESTE À FAIRE (ordre confirmé : ~~05~~ → 06 → 07 → 09 → 10 → 11)

### Routine de redo (identique pour chaque niche)
1. **Lire** les fichiers existants ; lister les citations légales à vérifier (utiliser le cheat sheet §1 — ne rien réinventer).
2. **Structure canon 14 fichiers** : renommer/fusionner vers les noms canoniques (`06_Scripts_DM_WhatsApp.md`, `07_Cas_Pratique_Complet.md`) ; scinder les fichiers fusionnés (`04_Canaux_SEO_*` → 04 SEO + 05 Canaux) ; créer les fichiers manquants.
3. **Deepen** 01 (~125 l.), 02 (~180-200 l.), 03 (~120 l.) si squelettes ; footer `Lecture professionnelle` customisé par niche (jamais le clone « statut/DOC/IGOC/7 axes »).
4. **Dé-cloner** 08/09/10/11/12 : chaque back-office doit parler la langue de SA niche (voir 04 pour l'exemple).
5. **Créer `13_Solutions_Juridiques.md`** : table douleur→solution, 8-11 solutions avec clause rédigée, matrice priorité, stack par sous-persona.
6. **00_INDEX** : table 14 fichiers + TL;DR chiffré + matrice risque + liens + (si niche fiscale/change) rappel watch.
7. **Vérifier** : `grep` = 0 marqueur fictif (`2023-045`, `2022/123`, `HRFlow`, `20-19`, `144`, `150`, `618`, `IGOC 2024`, `1-3%`, `15%/31%`) ; prix cohérents (diag 900) ; zéro placeholder `...`.

### À faire par niche (détails à traiter)

**~~05_MRE_Foreign_Investors~~ ✅ FAIT (2ᵉ pass du 29/08)** — 11 fichiers/600 l. → **14 fichiers canon ~1 250 l.** : split 04_EN → 04 SEO + 05 Canaux ; 05_Cas → `07_Cas_Pratique_Complet` ; création `06_Scripts` (FR+EN) + `13_Solutions_Juridiques` ; 08-12 dé-cloneés 100 % MRE ; diag 900 HT partout ; pack 4 900-6 900 conservé. **Vérifications faites (ne pas regresser)** : « loi 18-18 » **n'existe pas** (confusion avec la loi-cadre 18-95 abrogée) ; charte = **loi-cadre 03-22** (dahir 1-22-76, BO 7152 ; décret 2-23-1 : projet ≥ 50 M DH + 50 emplois, arrêté 3-13-23 ; art. 9 conventions d'investissement ; art. 37-38 amiable/arbitrage) ; agence = **AMDI, loi 60-16** (dahir 1-17-49 du 30/08/2017) — pas « AMI 65-16 », pas ONIGA ; **convention fiscale France-Maroc = 29/05/1970 (avenant 18/08/1989), PAS « 1959 »** — art. 13 (RAS source ≤ 15 %), art. 25 (crédit FR forfaitaire 25 %, barème) ; TBI Maroc-France 13/01/1996 (vigueur 31/05/1999) ; CIRDI : Maroc contractant depuis 11/10/1967, affaire réelle citable **Malicorp c. Maroc ARB/08/4 (25/02/2011)** ; jurisprudence fiscale française réelle : **CE 19/11/2014 n° 362800 Thollon** (+ CAA Paris 2026 « holding de Tanger » référencée via commentaire Deloitte — ouvrir l'arrêt avant citation) ; réseau consulaire corrigé : « CCISM slovaque » était faux → **CFCIM/MEIF** (la CCISM est espagnole) ; AE réservé aux personnes physiques **résidentes** (flag à confirmer au consolidé, écrit avec réserve). Reste épinglable : taux BE/ES/EAU du tableau 10 (lignes « à vérifier » assumées), n° articles consolidés loi 5-96 (AG/cession) — drapeaux en place, ne pas affirmer sans sgg.gov.ma.

**06_Autoentrepreneur_to_SARL_Scaling** (11 fichiers, 503 l.) — incohérence IS 10/20/30 vs 15/31 à trancher par le cheat sheet (barème 2026 : 20/35/40 ; transition NC 733) ; seuils AE → 42 s. ; créer 04/05/06 canon + 13 solutions (le cœur de cette niche EST une solution : la bascule — plan 30j, kit radiation/IMMAT, RAS 80k, TVA, CNSS) ; 08-12 customisés.

**07_Propriete_Intellectuelle** (8 fichiers, front riche) — créer **08, 09, 10, 11, 12, 13** manquants. 09 : utiliser banque `05_PI_OMPIC` (NOUR DAR réel + cadre opposition) ; 10 : OMPIC/Madrid/EUIPO/USPTO comparer (vérifier tarif Madrid réel si cité) ; 13 solutions : dépôt, classes Nice, recherche ROMARIN, contrat cession 2-00, accord NDA, opposition, veille, contrefaçon (action 17-97).

**09_Office_Changes_Dotation_IGOC2024** (13 fichiers squelettes, 583 l.) — **changer le nom du dossier en `09_Office_Changes_Dotation_IGOC` (2026 !)** ; chaque fichier : vérifier plafonds/délais dans IGOC **2026** (le PDF est sur oc.gov.ma — à charger et épingler ; ne pas recopier les chiffres 2024 sans contrôle) ; retirer « loi 19-06 » partout ; étoffer 02/05/10 (27-34 l.) → 60-80 ; créer 13 solutions (RC1/RC2 formulaires, justificatifs banque, dossier rapatriement, comptes devises, sanctions = négociation avec banque, demandes d'autorisation).

**10_MRE_Entrepreneurs** (13 placeholders, 496 l.) — rewrite lourd : persona Karim 36→125, douleurs→~160, SEO 28→60 (tuer les `8-20 | ...` placeholders), canaux, scripts 41→~150, cas 27→100, créer **vrai 09 (aucune décision inventée : contrats d'établissement, régime change, jurisprudence 5-96 à chercher réel) + vrai 10 comparatif + zones grises propres au MRE (résidence 183j/foyer, compte convertible, apostille/1961 = réel, procuration)** ; 13 solutions = le pack SARL distance de bout en bout (apostille, procuration notaire, compte, RC, CNDP si data, change dividende) avec étapes J et coûts réels ; supprimer le boilerplate déonto 40%.

**11_Nomads_Digital** (13 minces, 444 l.) — dupliquer intelligemment 10 puis adapter (carte séjour 1 an ~30j procédure réelle, 90j vs carte, 183j conventionnel, change) ; SEO 19 l. → 60 ; ⚠️ « carte nomad 1 an 30j » : vérifier la circulaire/procédure réelle d'acquisition du titre de séjour (source sgg/annex.net — les fiches du vault ne sont pas toutes sûres).

**Transverse (toutes niches)**
- Prix diagnostics harmonisés à **900 HT** partout (03 dit 1 200 → à trancher : soit niche premium = cohérent, soit 900 ; à ce jour 03/12 gardent 1 200 HT — décider au prochain passage).
- ~~Les fichiers legacy racine `02_Niches_Deep_Dive/0X_*.md`~~ ✅ FAIT 29/08 soir : archivés dans `_archive/02_niches_legacy/` (exclus du build webapp).
- Références « 01_Rules/ » (raccourci de `01_Rules_Of_The_Game_No_Ads_Morocco/`) = convention du vault, OK.

## 3. Notes de session
- N'ai PAS touché aux autres sections (01_Strategy, 04_Skills, webapp…) hormis : banques jurisprudence (`08_Jurisprudence/00,01,02,03,05`) et `05_Document_Bank/templates/03,04` (retraits des citations fictives) — nécessaires car citées par les niches.
- Éléments non vérifiés restés prudents dans le vault (ne jamais les affirmer sans source) : numéros internes 09-08, articles des conventions fiscales (**FR tranché 29/08 : convention du 29/05/1970, avenant 18/08/1989 — le « 1959 » du vault était une erreur de date, corrigée dans 05 et 08 ; BE/ES/EAU restent à vérifier**), nouveaux articles 66-23, TVA TikTok Ads 08/2026 (une seule source presse — à confirmer), durée droit d'auteur 50 vs 70 selon catégorie, résidence AE (réservée aux résidents — à confirmer au consolidé, écrit avec réserve dans 05/11).
- Vérification quotidienne recommandée au démarrage : `git log -1` + lire §2 cheat sheet avant d'écrire du droit.

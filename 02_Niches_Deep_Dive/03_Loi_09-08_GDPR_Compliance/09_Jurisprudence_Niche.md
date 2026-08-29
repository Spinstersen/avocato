# 09 — Jurisprudence & Doctrine (03_Loi_09-08_GDPR_Compliance)

> Réplique `08_Jurisprudence/00_Index.md` + source directe : `08_Jurisprudence/01_Loi_09-08_CNDP_Sanctions.md`. **Règle de vérifiabilité (28/08/2026) : la CNDP ne publie pas de décisions de sanction individuelles numérotées** (les « décisions CNDP 2022/2023/2024 » qui circulaient dans le vault sont des **cas types illustratifs**, pas des précédents — elles sont étiquetées comme telles ci-dessous). Les seules « décisions » citables pour cette niche : le **texte de la loi**, la **grille officielle CNDP**, la **jurisprudence CJUE publiée** (curia.europa.eu) et les **délibérations/communications** publiées sur `cndp.ma`.

## 1. Les bases marocaines réellement citables

*   **Loi 09-08** (dahir 1-09-15 du 18/02/2009, BO 5714 du 23/04/2009) + **décret 2-10-450** : formalités préalables (déclaration ; **autorisation** pour les données sensibles), registre, information des personnes, sécurité, transferts hors Maroc encadrés.
*   **Volet pénal (chap. art. 52-65)** — les deux articles qui servent en diagnostic :
    *   **Art. 64** : mettre en œuvre un traitement **sans avoir effectué les formalités préalables** → amende **10 000 à 100 000 DH**.
    *   **Art. 65** : collecte par moyen **frauduleux, déloyal ou illicite** → **emprisonnement jusqu'à 3 ans** + amende.
*   **Document officiel à bookmarker** : « Liste des infractions à la loi n°09-08 et des sanctions prévues » (`cndp.ma`, PDF) — c'est LA grille à afficher, pas un numéro de décision inventé.
*   **Tendance vérifiable (chiffre réel)** : plaintes reçues par la CNDP : 1 (2011) → 7 (2012) → 43 (2013) → 162 (2014) → 396 (2015) → 584 (2016) → 508 (2017) — source : secrétaire général CNDP, Finances News Hebdo (2018). L'argument de risque est là, sourçable, pas dans un chiffre d'amende sensationnaliste.
*   **Registre national CNDP** : la CNDP publie le registre national des traitements déclarés/autorisés (numéros type « D-M-XX/AAAA ») — vérifiable publiquement, utile en diagnostic (« êtes-vous dans le registre national ? »).

## 2. Les cas types de la banque (à raconter comme « le cas que la CNDP contrôle », jamais comme un arrêt)

1.  **Cas type registre** — e-commerçant, 50 commandes/jour, aucune formalité, WhatsApp sans opt-in → mise en demeure + registre sous délai. Takeaway : *« Le registre est la première pièce demandée en contrôle. »* (base : `08_Jurisprudence/01_...` §1 — illustration de travail).
2.  **Cas type données sensibles** — clinique sans autorisation → injonction + dépôt d'autorisation. Takeaway : *« Santé/biométrie = autorisation, la déclaration ne suffit pas. »* (§2, illustration).
3.  **Cas type transfert** — SaaS hébergé AWS sans clause → régularisation clauses + information. Takeaway : *« Vos serveurs à l'étranger sont un transfert. »* (§3, illustration).
4.  **Cas type prospection** — SMS sur base achetée, pas de preuve de consentement, STOP inopérant → amende + purge. Takeaway : *« Celui qui utilise la base répond. »* (§4, illustration).

## 3. Les décisions CJUE réellement publiées (le volet UE)

5.  **CJUE C-311/18 « Schrems II » (16/07/2020)** — invalidation du Privacy Shield ; transfert vers les US = clauses contractuelles types + mesures complémentaires si le droit d'accès local menace la protection. → Pour le SaaS marocain sur cloud US : la question n'est pas « où est le serveur » mais « qui peut y accéder ». Source : curia.europa.eu.
6.  **CJUE C-673/17 « Planet49 » (01/10/2019)** — case pré-cochée ≠ consentement ; information sur durée et catégories d'accès requise. → La bannière « continuer = accepter » ne se défend pas ; la doctrine cookies CNDP suit la même ligne. Source : curia.europa.eu.

## Fiche Notion modèle (référence sourcée)

```
Réf: Loi 09-08 art. 64 (+ grille officielle cndp.ma « infractions-sanctions »)
Faits: type — traitement de données clients sans formalité préalable
Solution: amende 10 000-100 000 DH ; mise en demeure + régularisation en pratique
Article: art. 64 (formalités) ; art. 65 (collecte frauduleuse, pénal)
Takeaway client: "Le registre est la première pièce du contrôle — on le constitue en 10 jours"
Source: cndp.ma PDF liste infractions ; sgg.gov.ma texte consolidé
```

## Sources

*   `cndp.ma` (grille infractions/sanctions, formulaires, registre national, communiqués) ; `sgg.gov.ma` (09-08 + décret consolidés) ; `eur-lex.europa.eu` (GDPR, SCC 2021/914) ; `curia.europa.eu` (CJUE).
*   **Interdits :** toute « décision CNDP n° … » sans PDF ouvert ; tout numéro d'amende sans article.

---

## Lecture doctrinale — comment citer sans travestir (règle renforcée 28/08/2026)

**Principe 1 — pas de source, pas de citation.** La CNDP publie des lignes directrices, un registre national et des communiqués, pas un reporting de sanctions nominatives comme la CNIL. Construire un argument de vente sur une sanction « 300 000 DH » jamais publiée = travestir le droit ET fragiliser l'avocat qui la cite (le client tech vérifiera).

**Principe 2 — l'argument qui tient est structurel** : (1) le texte impose formalités + registre (09-08) ; (2) la grille attache une amende étagérée (art. 64 : 10k-100k ; pénal art. 65) ; (3) le régulateur est saisi — le volume de plaintes (508 en 2017) prouve que la machine est lancée ; (4) côté UE, ce n'est pas la CNIL qui viendra à Casa : c'est le DPA du client. La séquence est réelle et vérifiable sans invented case.

**Principe 3 — les cas types gardent leur valeur** : ils enseignent le pattern de contrôle (registre, autorisation, transfert, opt-in) et préparent l'audition comme un médecin prépare le tableau clinique. Mais on les annonce comme « typiquement », jamais comme « la CNDP a décidé le… ».

**Exemple de bonne citation en diagnostic** : « Le texte est clair : traitement sans formalités préalables, c'est 10 000 à 100 000 DH (art. 64), et la collecte par moyen déloyal est pénale (art. 65). La CNDP reçoit des centaines de plaintes par an et le registre est la première pièce demandée. On le constitue en 10 jours. »

---

## Méthode de lecture d'une décision

**Ne jamais citer le dispositif sans les faits — et les faits sans la source.** La fiche Notion (`08_Jurisprudence/00_Index.md`) force : Réf (texte ou arrêt ouvert), Faits 1 phrase, Solution 1 phrase, Article visé, Takeaway chiffré et sourcé, Mission liée. Côté GDPR, lire l'arrêt CJUE (curia), pas le résumé de blog ; les SCC 2021/914 et la recommandation EDPB 01/2020 (mesures complémentaires post-Schrems) sont les textes qui font le travail.

**Doctrine** : `sgg.gov.ma` (textes), `cndp.ma` (grilles, registre, actualité), `eur-lex`/`curia` (UE). Vérifier annuellement : les pratiques de contrôle CNDP évoluent plus vite que le texte de 2009, et la réforme du régime (alignement GDPR) est dans l'agenda des acteurs marocains depuis 2018 (interviews CNDP) — anticiper une modernisation du cadre.

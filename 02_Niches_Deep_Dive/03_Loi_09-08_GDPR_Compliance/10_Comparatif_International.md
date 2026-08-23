# 10 — Comparatif International Loi 09-08 vs RGPD / GDPR (Maroc / France / Espagne-Belgique)

> **Sources primaires :** `sgg.gov.ma` Loi 09-08 art.7/12/14/20/24/43/52, `cndp.ma` guide registre + délib.40-22, `cnil.fr` RGPD art.5/6/28/35/44/46/83, Bofip Conv. 29 mai 1970 art.27, `oc.gov.ma` IGOC si transfert financier. **Glossaire :** `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §01-§12 (central §06).

## Tableau comparatif conformité données — 5 colonnes

| Critère | Maroc Loi 09-08 | France RGPD / CNIL | Belgique / Espagne (RGPD) | Verdict + base légale + renvoi glossaire |
|---|---|---|---|---|
| **Registre & déclaration** | Registre **5 colonnes art.14** obligatoire dès **1 email** + **déclaration en ligne cndp.ma 30j** (récépissé) ou autorisation 45j si données sensibles | Registre art.30 RGPD interne (pas de dépôt CNIL) — déclaration supprimée depuis 2018 ; contrôle a posteriori | Même RGPD : registre obligatoire, DPA BE/ES contrôle | **Maroc = démarche active 30j** vs FR = registre interne : boutique YouCan 50 cmd/j sans déclaration = mise en demeure CNDP 45j (cas 2023-045). Verdict : déclarer avant de collecter. → §06 §11 |
| **Sanctions** | **10 000-300 000 DH + 6 mois prison** art.52 Loi 09-08 ; mise en demeure **45j** CNDP | **Jusqu'à 20M€ ou 4% CA mondial** art.83 RGPD ; CNIL 2023 : 746M€ cumulés | BE DPA 600k€ max ; ES AEPD 10M€ | **Facteur ×66** : 300k DH ≈27k€ vs 20M€ FR, mais **risque pénal 6 mois au Maroc** inexistant FR. Pour PME 2M DH CA, amende CNDP 100k DH = 5% CA — dissuasif. → §06 |
| **Transfert hors pays** | **Art.43-44** : héberger sur **AWS US / Shopify / GCP / Mailchimp** = transfert → **clauses contractuelles types (CTT) CNDP + info personnes + autorisation CNDP si pays non adéquat** | **RGPD art.44-46** : transfert hors UE → **SCC (Standard Contractual Clauses) UE + TIA + info** ; US = cadre DPF | Même art.46 RGPD | **Même mur, guichet différent** : Shopify US = CTT CNDP 30j au Maroc vs SCC UE en France. Oublier = 10k-300k DH Maroc vs 20M€ FR. Pack avocat 09-08 12k-28k DH = assurance. → §06 §12 §03 |
| **DPO / DPIA / droits** | **DPO** désignation notifiée CNDP (facultatif mais recommandé) ; **DPIA art.20** si risque (profilage, biométrie, géolocalisation) ; **droits art.7-11** réponse **30j** | **DPO obligatoire** si >250 pers ou données sensibles ; DPIA art.35 obligatoire ; droits 1 mois | Même RGPD | **Maroc DPO = atout concurrentiel** : peu de PME en ont → argument commercial. DPIA même seuil. Verdict : proposer DPO externe 2 500 DH/mois. → §06 §10 |
| **Fiscal & séjour lié** | TVA **art.92 0%** si service conformité facturé hors MA + devises + rapatriement 30j ; IS **15% <300k** (CGI art.19) | TVA 20% seuil **36 800€** ; IS 15% <42,5k€ puis 25% | IS BE 20% <100k€ ; ES 15% startup | **Service 09-08 exportable 0% TVA** si client Paris paye EUR + SWIFT 30j → §04/§03. Dividende si cabinet groupe : retenue **10% FR /15% BE** via art.27 + 5000-F économise 15k/100k. → §04 §07 §09 |

## 3 cas chiffrés comparatifs — conformité 09-08

**Cas A — SaaS Casa 80k users, 15k emails prospects, hébergé Vercel US + MongoDB US, sans registre ni CTT :**
Maroc : registre 5 colonnes (1 ligne = prospection / 1 ligne = users) + déclaration cndp.ma 30j gratuit + **CTT Vercel art.43** (modèle CNDP) + bannière cookies délib.40-22 (Accepter/Refuser, 13 mois) → coût mise en conformité **18k DH HT** (audit+registre+CTT). Sans = amende **10k-300k + 6 mois** + blocage transfert. France même SaaS : registre RGPD + SCC Vercel art.46 + CNIL pas de déclaration → coût 5k€ mais amende 20M€ si fuite. **Économie de l'anticipation : 18k vs 100k amende moyenne.**

**Cas B — E-commerce YouCan 120k DH CA/mois, pixel Meta + Mailchimp US, 30k contacts, pas de base légale documentée :**
Maroc : base = **consentement case non pré-cochée + log horodaté** art.4, sinon base contrat/intérêt légitime documentée ; contrat sous-traitant Mailchimp **art.24** (instructions+ sécurité+ sous-traitance) obligatoire → régularisation 12k DH. France : même consentement RGPD art.6 + contrat art.28. **Différence : CNDP exige autorisation préalable art.43 pour Mailchimp US** (30j), CNIL exige SCC mais pas d'autorisation si SCC. Sans contrat art.24 = **responsabilité solidaire**.

**Cas C — Groupe SARL Casa (bénéfice 250k DH) filiale service conformité Paris, dividende 100k DH vers associé BE :**
IS Maroc 15% = **37,5k DH** sur 250k. Dividende 100k → BE : sans convention **30% PFU FR/BE =30k**, avec **Conv. BE-MA 1972 art.10 retenue 15% =15k** + attestation DGI 30j + **5000-F** + compte devise MRE 72h → **économie 15k DH** (37,5k crédité via art.27 sur déclaration BE). Procédure : DGI attestation résidence art.4 → banque → 5000-F avant virement → crédit IR BE ligne 2047.

## Verdict Loi 09-08 vs GDPR

*   **Ne pas vendre RGPD pour le Maroc** : Loi 09-08 ≠ RGPD — registre 5 colonnes art.14 + déclaration 30j active vs registre interne FR ; transfert art.43-44 = CTT CNDP vs SCC UE ; sanction 10k-300k + pénal vs 20M€ administratif.
*   **Argument commercial :** CNDP contrôle 45j mise en demeure rapide (cas 2023-045) — proposer **audit 09-08 12k-28k DH HT** (registre + déclaration + CTT + DPIA + politique) = 10× moins cher que l'amende + blocage CMI/Stripe.
*   **Exportabilité :** Mission conformité facturée à client Paris = **TVA 0% art.92** si paiement devises + SWIFT 30j → marge +15% vs facturation TTC France.
*   **Procédure crédit art.27 :** Si holding conformité avec associé FR/BE/ES, dividende 100k → retenue **10% FR / 15% BE / 10% ES** via 5000-F vs 30% sans → **15-20k économisés** à flécher sur DPO. Étapes : 1) attestation DGI 30j 2) 5000-F Bofip 3) compte devise/MRE §12 → crédit art.27. → §06 §07 §04

## Interactions (chaîne §06 centrale)

*   §06 → §04 TVA : facturer conformité sans registre = banque refuse rapatriement 30j car facture non conforme 09-08.
*   §06 → §05 OMPIC : dépôt marque avec logo visage = donnée personnelle → registre avant dépôt 1 200 DH/classe.
*   §06 → §11 DOC : contrat sous-traitant art.24 = contrat art.230 + preuve >10k art.443 + clause pénale 10% art.264.
*   §06 → §10 Provision : convention honoraires doit inclure clause 09-08 (traitement données client) + provision 50% art.30 avant audit — sinon sanction disciplinaire + CNDP.
*   §01 Résidence + §07 Convention : DPO étranger 210j Casa = résident 183j → carte 1 an 200 DH §08 + IS mondial §09.

## Procédure crédit art.27 + 5000-F (détail conformité)

1. **Registre 09-08** : 5 colonnes art.14 + déclaration 30j cndp.ma + CTT art.43 avant de facturer conformité (§06) — sinon CNDP sanction vs TVA art.92 non tracée.
2. **Facture export** : si audit facturé à client Paris → mention art.92 + devises + SWIFT 30j → TVA 0% (§04 §03).
3. **Attestation DGI 30j** (art.4 résidence 183j/foyer §01) pour holding conformité avec associé FR/BE.
4. **5000-F Bofip** visé DGI → banque FR/BE avant dividende 100k → retenue **10% FR /15% BE** vs 30% PFU → **15k économisés /100k** crédités IR étranger art.27 (§07).
5. **Compte** : devise MRE 72h si MRE 40j vs convertible 48h si résident 210j + carte 1 an 200 DH §08 §12.

## Checklist comparatif

*   [ ] Registre 5 colonnes art.14 (1 ligne/traitement) à jour avant 1er email §06
*   [ ] Déclaration cndp.ma 30j récépissé vs autorisation 45j si sensible §06
*   [ ] Transfert US art.43 CTT CNDP + info personnes + contrat art.24 sous-traitant §06 §11
*   [ ] Bannière cookies délib.40-22 Accepter/Refuser + 13 mois + DPIA art.20 si risque §06
*   [ ] Facture art.144 + mention art.92 si client FR + SWIFT 30j → convertible §04 §03
*   [ ] Attestation DGI 30j + 5000-F + crédit art.27 vérifié comptable §07 §01
*   [ ] Convention honoraires provision 50% art.30 + clause 09-08 §10 §11

## Lecture comparative — pourquoi comparer sans copier

Loi 09-08 ≠ RGPD : registre 5 colonnes + déclaration 30j active Maroc vs registre interne France depuis 2018. Transfert art.43 CNDP (CTT + autorisation) ≠ RGPD art.46 SCC (TIA). Sanction 10k-300k + 6 mois pénal Maroc n'est pas amende 20M€ administrative FR — échelle et procédure diffèrent. Le comparatif sert à expliquer au DSI MRE pourquoi sa conformité CNIL ne vaut pas CNDP et à justifier audit 18k vs risque 300k + blocage CMI.

---
> Comparer pour expliquer : CNDP 10k-300k + 6 mois n'est pas CNIL 20M€, mais le client risque plus vite 45j mise en demeure au Maroc. Le 30j déclaration CNDP n'existe plus en France depuis 2018. Vérifiez `cndp.ma` + `sgg.gov.ma` Loi 09-08 à chaque audit — PLF ne change pas 09-08 mais délib.40-22 évolue.

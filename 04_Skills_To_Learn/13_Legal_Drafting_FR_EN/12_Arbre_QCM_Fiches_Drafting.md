# 12 — Arbre de décision, QCM de synthèse & fiches drafting

> **À quoi ça sert :** la clôture du module — un arbre de décision pour choisir la clause de règlement des litiges, un QCM de synthèse en 5 questions, et 8 fiches flash à relire en 10 minutes avant toute mission EN. **Pour qui :** l'avocat qui a parcouru les fichiers 01 à 11 et veut un rituel de révision avant d'ouvrir un contrat client. Temps de lecture : 12 minutes.

**Liens :** [Style guide](01_Style_Guide_Legal_English_vs_Francais.md) · [Red flags](07_Red_Flags_25_Contrats_EN.md) · [Cas MSA 600k](11_Cas_MSA_Offshore_600k.md) · [Arbre décisionnel issue spotting](../07_Sharp_Legal_Mind/09_Arbre_Decision_Issue_Spotting.md)

## 1. POURQUOI : un module sans rituel de fin se délite

La différence entre lire un module et l'installer dans sa pratique tient au rituel de relecture : avant chaque mission EN, 10 minutes sur les fiches ci-dessous neutralisent l'essentiel des erreurs classiques (rappel : la clause de litige se choisit AVANT d'écrire les clauses commerciales, pas après).

## 2. COMMENT : l'arbre de décision — quelle clause de résolution des litiges ?

```
CONTRAT EN PRÉPARATION / REÇU
|
+- Montant en jeu < 100 000 DH ?
|   +- OUI -> Juridiction marocaine (TPI / tribunal de commerce) + langue FR
|   |        (coût faible, procédure locale connue, écrit DOC art. 443 tenu)
|   +- NON -> Partie adverse étrangère ?
|            +- OUI -> Confidentialité forte exigée ?
|            |        +- OUI -> Arbitrage ICC (Paris/Londres) si le budget
|            |        |        le justifie (coût plusieurs fois CIMAC),
|            |        |        sinon CIMAC Casablanca
|            |        +- NON -> Arbitrage CIMAC Casablanca (loi 08-05)
|            |                 + langue anglaise possible (confort counsel US)
|            +- NON -> Transaction / médiation d'abord, juridiction en secours
|
+- Litige déjà né ?
    +- Urgence (conservatoire, provision) -> référé
    +- Créance contractuelle certaine, écrite -> injonction de payer (trib. com.)
    +- Relation à préserver -> séquence amiable avant toute mise en demeure
```

**Lecture :** pour un deal international > 100 000 DH centré Maroc, le réflexe par défaut est **CIMAC Casablanca, éventuellement en langue anglaise**. On ne monte vers l'ICC que si le budget et la confidentialité l'exigent — ce choix s'écrit à la clause 21 (fichier 06), jamais devant le juge.

## 3. EXEMPLE : l'application de l'arbre en trois secondes

Le MSA de la LLC (fichier 11) : montant 72 000 DH HT sur le premier SOW mais cadre annuel ~600 000 DH, partie adverse étrangère, confidentialité de produit. Branche : NON / OUI / NON → CIMAC, langue anglaise négociable. Réponse en 3 secondes au lieu d'une demi-journée de doute — c'est tout l'objet de l'arbre.

## 4. QCM de synthèse (5 questions)

**Q1.** Quelle est la première chose à vérifier dans un contrat EN reçu ?
A. la clause de paiement · B. la loi applicable + l'arbitrage + le cap de responsabilité · C. les définitions

> **Réponse : B.** L'ordre de scan imposé (fichier 07) commence par le terrain du litige et l'exposition maximale.

**Q2.** Comment rédiger une clause IP sûre pour un prestataire marocain face à un client US ?
A. "work made for hire" · B. cession écrite droit par droit (loi 2-00 mod. 34-05, art. 9) au paiement intégral + licence pré-paiement + préexistances exclues · C. aucune clause

> **Réponse : B.** Le WMFH n'a pas d'équivalent automatique au Maroc ; la cession formalisée donne un titre meilleur que l'étiquette US.

**Q3.** Une pénalité de retard à écrire aujourd'hui :
A. 30 % « pour faire peur », base art. 258 DOC · B. ~10 % + intérêts légaux, base DOC art. 263-264 (modération judiciaire admise en pratique) · C. aucune pénalité

> **Réponse : B.** « 258 » est une erreur de l'ancienne version du module ; une pénalité excessive est réduite et décrédibilise tout le texte.

**Q4.** Transfert de données personnelles hors du Maroc dans un projet avec client UE :
A. le RGPD absorbe tout · B. autorisation préalable CNDP (09-08, sanctions art. 64-65) + RGPD seulement pour les personnes visées dans l'UE · C. aucune formalité dans le cloud

> **Réponse : B.** Deux régimes cumulatifs selon les personnes, jamais fusionnés ; plafond 09-08 : 10 000-100 000 DH (art. 64).

**Q5.** La signature Yousign d'un contrat avec une LLC, devant un juge marocain :
A. nulle sans papier · B. preuve électronique au sens de la loi 53-05, valeur appréciée par le juge — l'eIDAS n'est pas « automatiquement reconnue » · C. parfaite grâce à l'eIDAS

> **Réponse : B.** Le faisceau (OTP, IP, horodatage, piste d'audit) fait la force probante ; les promesses de reconnaissance automatique sont une faute de conseil.

## 5. Fiches de révision flash — 8 cartes

**Carte 1 — Langue fait foi :** toute signature bilingue porte la clause « version française fait foi » (fichier 10).

**Carte 2 — Ordre de scan :** loi/arbitrage → cap/indemnité → IP → paiement → sortie ; 0 rouge = signer, 1-3 = redline, > 3 = appel.

**Carte 3 — Cap :** 1x fees sur 12 mois, carve-outs bornés (confidentialité, faute intentionnelle, indemnité IP) ; standard de marché, pas règle légale — le dire.

**Carte 4 — IP :** cession écrite droit par droit (loi 2-00 mod. 34-05, art. 9) au PAIEMENT intégral ; licences d'usage avant ; jamais « upon creation » ; préexistances exclues ; marques/brevets du client = loi 17-97, droit d'usage seulement.

**Carte 5 — Argent :** net-30 sans set-off ; pénalité ~10 % + intérêts (DOC art. 263-264) ; écrit au-delà de 10 000 DH (DOC art. 443) ; SWIFT jamais Stripe (résident MA) ; rapatriement IGOC 2026 sous 90 jours.

**Carte 6 — Fiscalité croisée :** export services = exonération CGI art. 92 sur justificatifs, facture art. 145 ; FR-MA : convention du 29/05/1970 (avenant 18/08/1989), art. 13 (dividendes ≤ 15 %), art. 25 (crédit d'impôt) ; MA-US : AUCUNE convention → W-8BEN + CPA US.

**Carte 7 — Données :** miroir 09-08 (registre, autorisation CNDP de transfert, art. 64 : 10 000-100 000 DH, art. 65 : pénal jusqu'à 3 ans) ; RGPD uniquement si personnes UE ; ne jamais mélanger les deux ni citer « 300 000 DH ».

**Carte 8 — Signature & carrière :** loi 53-05, faisceau de preuve, QES eIDAS = preuve forte appréciée par le juge ; pour le cabinet lui-même : convention d'honoraires loi 66-23 (ex-art. 30), provision ex-art. 32 (~50 %), engagement de moyens — jamais de promesse de résultat (interdits ex-art. 31-32).

## 6. Erreurs d'application du rituel (Top 3)

| # | Erreur | Conséquence |
|---|---|---|
| 1 | Relire les fiches après avoir envoyé la redline | le rituel ne sert qu'AVANT |
| 2 | Confondre standard de marché (cap 1x) et règle légale | argument faux, crédibilité perdue |
| 3 | Réutiliser une clause sans vérifier son ancrage (263-264 ? 2-00 ? 53-05 ?) | la contamination de l'ancienne version du module, corrigée ici |

## 7. Plan d'intégration 30 jours

- **J1-J7 :** style guide (01) + faux amis (08), 30 min/jour.
- **J8-J21 :** assembler son MSA maître bilingue avec les libraries (02-06).
- **J22-J30 :** refaire le cas illustratif (11) sans regarder les réponses + scanner 5 contrats réels avec la grille (07).

> **Lecture pro :** les fiches flash ne remplacent pas la clause library — elles en sont le sommaire actionnable ; un drafter qui récite ses huit cartes avant d'ouvrir un dossier est un drafter qui ne découvrira pas ses erreurs devant le juge de l'adversaire.

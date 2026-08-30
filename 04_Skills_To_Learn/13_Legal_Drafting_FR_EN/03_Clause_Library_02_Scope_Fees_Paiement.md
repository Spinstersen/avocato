# 03 — Clause library 02 : Scope, Fees & Payment (clauses 4-9)

> **À quoi ça sert :** le moteur commercial du MSA bilingue — périmètre, change orders, honoraires, paiement net-30, retard de paiement ancré DOC art. 263-264, devise et fiscalité internationale. **Pour qui :** l'avocat dont la trésorerie du client (et la sienne) se joue ici : c'est dans ce bloc que les contrats reçus des clients US sont les plus agressifs (net-60, devise floue, set-off). Temps de lecture : 20 minutes.

**Liens :** [Clause library 01](02_Clause_Library_01_Definitions_Interpretation.md) · [Numbers sheet](../07_Sharp_Legal_Mind/03_Numbers_Sheet.md) · [Niche Office des Changes / IGOC](../../02_Niches_Deep_Dive/09_Office_Changes_Dotation_IGOC/00_INDEX.md)

## 1. POURQUOI : le scope-creep meurt ici, la trésorerie aussi

La plaie n° 1 du freelance offshore est de dire oui oralement à « juste un petit ajustement » et de ne jamais facturer ; la plaie n° 2 est d'encaisser à 60 jours une créance en devise floue amputée d'une retenue à la source improvisée. Les clauses 4 à 9 traitent les deux : elles rendent l'extra facturable, le paiement exigible à date fixe, et la fiscalité transfrontalière prévisible. Rappel de preuve : au-delà de 10 000 DH, la preuve du contrat se fait par écrit (DOC, art. 443) — tout SOW, tout change order, tout accord de prix est un document, jamais une poignée de main.

## 2. COMMENT : les six clauses miroir FR/EN

### Clause 4 — Scope of Services · Périmètre des Services

> **FR :**
> **4.1** Les Services sont décrits dans chaque Bon de Commande (« **SOW** ») conclu par écrit entre les Parties.
> **4.2** En cas de contradiction entre le Contrat et un SOW, le SOW prévaut pour la mission qu'il concerne.
> **4.3** Tout travail excédant le périmètre d'un SOW fait l'objet d'un nouveau SOW ou d'un avenant préalable.

> **EN :**
> **4.1** The Services are described in each Statement of Work ("**SOW**") agreed in writing by the Parties.
> **4.2** In the event of any conflict between this Agreement and a Statement of Work, the Statement of Work prevails for the relevant engagement only.
> **4.3** Any work exceeding the scope of a Statement of Work shall be subject to a new or amended SOW agreed in advance in writing.

*Note de drafting —* « for the relevant engagement only » évite qu'un SOW écrase tout le cadre. Le 4.3 est le bouclier anti-scope-creep, et le 4.1 est votre preuve DOC art. 443 : un SOW signé vaut écrit, une thread Slack ne vaut rien.

### Clause 5 — Change Orders · Ordres de changement

> **FR :**
> **5.1** Toute modification du périmètre, des délais ou des prix fait l'objet d'un ordre de changement écrit, signé par les deux Parties, précisant son impact en délai et en prix.
> **5.2** Aucun travail supplémentaire n'est dû sans ordre de changement accepté par écrit.

> **EN :**
> **5.1** Any change to the scope, timeline or fees shall be documented in a written change order signed by both Parties, stating its impact on time and price.
> **5.2** No additional work is owed without a change order accepted in writing.

*Note de drafting —* "Change order" est le terme US ; un counsel UK dira "variation order". Cette clause transforme les « petites faveurs » cumulées en revenus facturés. Collision à connaître côté US : entre marchands, l'*UCC §2-207* (« battle of forms ») peut donner raison au dernier formulaire échangé — d'où l'exigence d'un change order signé, pas d'un simple e-mail de confirmation.

### Clause 6 — Fees & Expenses · Honoraires et frais

> **FR :**
> **6.1** Les honoraires sont ceux indiqués dans chaque SOW, exprimés hors taxes.
> **6.2** Les frais accessoires raisonnables, approuvés par écrit au préalable par le Client, sont remboursables sur justificatifs.

> **EN :**
> **6.1** The fees are those stated in each Statement of Work and are exclusive of taxes.
> **6.2** Reasonable expenses approved in advance in writing by the Client are reimbursable against receipts.

*Note de drafting —* "Exclusive of taxes" empêche de devenir collecteur d'impôts étrangers. Si c'est le cabinet qui rédige ce bloc pour son propre client, la convention d'honoraires obéit à un autre régime : loi 66-23 portant organisation de la profession d'avocat (dahir n° 1-26-75, BO n° 7536, 18 août 2026 — ex-art. 30, numérotation en transposition), avec provision d'usage (ex-art. 32, environ 50 %) et engagement de moyens, jamais de résultat.

### Clause 7 — Payment Terms · Conditions de paiement

> **FR :**
> **7.1** Les factures sont payables dans les trente (30) jours suivant leur réception, sans escompte ni compensation.
> **7.2** Le Client paie par virement bancaire sur le compte indiqué sur la facture.

> **EN :**
> **7.1** Invoices are payable within thirty (30) days of receipt, without discount, set-off or deduction.
> **7.2** The Client shall pay by bank transfer to the account indicated on the invoice.

*Note de drafting —* "Without set-off or deduction" bloque la retenue arbitraire (« on compense avec notre litige »). Net-30 est négociable depuis net-45/net-60 US : négociez le délai si besoin, jamais la clause. Le compte indiqué est un compte en dirhams ou un compte en devises ouvert au Maroc (IGOC 2026) ; Stripe n'étant pas disponible pour un résident marocain, l'encaissement international passe par virement SWIFT — voir [Stripe & paiement](../01_Legal_Tech_Stack/06_Stripe_Paiement_RIO.md).

### Clause 8 — Late Payment · Retard de paiement

> **FR :**
> **8.1** Tout retard de paiement produit de plein droit des intérêts au taux légal marocain, majorés d'une indemnité forfaitaire de dix pour cent (10 %) du montant impayé, sans préjudice de toute autre voie de droit.

> **EN :**
> **8.1** Any late payment shall automatically bear interest at the Moroccan statutory rate, plus a flat recovery fee of ten percent (10%) of the unpaid amount, without prejudice to any other remedy.

*Note de drafting —* Ancrage : DOC, art. 263-264 (dommages-intérêts, évaluation ; la modération judiciaire des clauses excessives est admise en pratique marocaine). Un forfait autour de 10 % passe comme plafond crédible devant un juge ; 40 % serait réduit et discréditerait le contrat entier. Ne jamais citer « art. 258 » : c'est une erreur de l'ancienne version de ce module, corrigée ici. En face, l'inexécution ouvre les art. 230 et s. DOC (exception d'inexécution, résolution, dommages-intérêts) — la clause 8 n'est que l'application contractuelle de ce socle.

### Clause 9 — Currency & Taxes · Devise et fiscalité

> **FR :**
> **9.1** Sauf convention contraire dans le SOW, les montants sont libellés et payables en dirhams marocains (MAD).
> **9.2** Si le SOW exprime les prix en euros (EUR) ou en dollars des États-Unis (USD), le paiement s'effectue dans cette devise au taux applicable à la date de facturation, avec rapatriement des recettes d'exportation dans les délais de l'IGOC en vigueur (2026).
> **9.3** Chaque Partie supporte ses propres impôts. Si une retenue à la source devait s'appliquer, le Client la supporte afin que le Prestataire perçoive le montant net convenu.

> **EN :**
> **9.1** Unless otherwise stated in the Statement of Work, amounts are denominated and payable in Moroccan Dirhams (MAD).
> **9.2** Where the Statement of Work expresses prices in Euros (EUR) or United States Dollars (USD), payment is made in that currency at the rate applicable on the invoice date, with repatriation of export proceeds within the time limits under the applicable Foreign Exchange Regulations (IGOC 2026).
> **9.3** Each Party bears its own taxes. If any withholding tax applies, the Client shall bear it so that the Provider receives the agreed net amount.

*Note de drafting —* Trois couches de fiscalité à ne pas mélanger : (1) TVA — les services exportés sont exonérés sous conditions de justificatifs (CGI, art. 92) et la facture obéit aux obligations de l'art. 145 ; la facturation électronique est en déploiement, calendrier à confirmer sur tax.gov.ma ; un prestataire auto-entrepreneur est hors champ (CGI, art. 91-II-3°). (2) Changes — IGOC 2026 : rapatriement des recettes de services sous 90 jours, compte en devises possible ; jamais « loi 19-06 », qui n'existe pas. (3) Retenues à la source — MAROC/US : AUCUNE convention fiscale, la structure se fait en droit interne (formulaire W-8BEN côté client US pour justifier l'absence de retenue sur certaines prestations ; pratique courante à faire valider par un CPA US). MAROC/FR : convention du 29 mai 1970 (avenant du 18 août 1989) — pour des dividendes remontés de France, retenue plafonnée à 15 % (art. 13) avec crédit d'impôt côté français (art. 25).

## 3. EXEMPLE : le cas Salma

Salma facture 8 000 EUR net-60 à un importateur allemand ; retards répétés. Au renouvellement, elle renégocie : net-30 sans set-off (cl. 7), indemnité 10 % + intérêts (cl. 8, logique DOC art. 263-264), EUR fixé à la date de facturation (cl. 9). Premier retard ensuite : une relance citant les clauses 7 et 8 suffit — virement reçu à J+32, pénalité renoncée contre paiement immédiat. La clause n'a pas servi à enrichir : elle a servi à être payée.

## 4. Erreurs d'application (Top 5)

| # | Erreur | Conséquence |
|---|---|---|
| 1 | Accepter net-60 « car leur compta fonctionne ainsi » | avance de trésorerie permanente |
| 2 | Devise non définie ou "equivalent USD" | perte au change arbitraire |
| 3 | Extras traités oralement | travail gratuit cumulé, sans preuve (DOC art. 443) |
| 4 | Pénalité de retard disproportionnée (30-40 %) | réduction judiciaire, clause décrédibilisée |
| 5 | Ligne withholding tax absente | virement amputé surprise, sans convention pour se défendre |

## 5. Checklist

- [ ] Tout livrable rattaché à un SOW écrit signé
- [ ] Modèle de change order prêt à l'emploi
- [ ] Net-30 + "without set-off or deduction"
- [ ] Intérêts légaux + indemnité ~10 % cohérente avec DOC art. 263-264
- [ ] Devises : MAD par défaut, EUR/USD en toutes lettres puis ISO
- [ ] Canal d'encaissement : virement SWIFT vers compte en dirhams ou en devises (pas Stripe)
- [ ] Rapatriement IGOC 2026 (90 jours services) planifié
- [ ] Ligne taxes/retenue à la source présente ; convention FR-MA ou droit interne US identifié

## 6. QCM express

**Q1.** Un client demande « juste un petit ajustement » hors SOW :
A. accepter · B. refuser tout · C. formaliser un change order même symbolique

> **Réponse : C.** Un change order d'une page garde la relation ET le revenu ; l'accord oral ne se prouve pas au-delà de 10 000 DH (DOC art. 443).

**Q2.** Pourquoi limiter l'indemnité de retard à ~10 % ?
A. pour être gentil · B. parce qu'un plafond crédible tient devant le juge marocain (DOC art. 263-264, modération admise en pratique) · C. parce que c'est interdit au-delà

> **Réponse : B.** Une pénalité excessive sera réduite et discréditera le reste du contrat.

**Q3.** Client US qui demande « appliquez la convention fiscale pour réduire ma retenue » :
A. produire l'article de convention · B. expliquer qu'il n'existe aucune convention MAROC-US et documenter en W-8BEN · C. facturer moins cher

> **Réponse : B.** C'est le piège classique : la convention de 1970 est franco-marocaine, pas américano-marocaine. Structure en droit interne, validation par un CPA US.

> **Lecture pro :** ce bloc est celui que les clients relisent avant de signer — parce que c'est celui qui dit quand l'argent bouge. Un net-30 sans set-off avec pénalité mesurée DOC 263-264 vaut mieux qu'un net-45 à 40 % de pénalité que le juge rayera : en drafting de paiement, la crédibilité devant le juge prime sur l'agressivité devant le client.

# 13 — Solutions Juridiques : le playbook douleur → parade (01_Freelancers_Agencies_Offshore)

> **Le chaînon du dossier** : `02` dit ce qui fait mal, `03` dit ce qui se vend — **ce fichier dit comment on règle, juridiquement, chaque douleur**, avec la clause réellement rédigée, la formalité, le délai et le piège à éviter. Chaque solution est numérotée comme la douleur correspondante dans `02_Douleurs_Juridiques.md`. Base : `08_Jurisprudence/` corrigée + watch 28/08/2026 (`00_INDEX.md`) — aucun numéro d'article fantaisiste.

## Table de correspondance immédiate

| Douleur (02) | Solution (ici) | Livrable / Document Bank | Mission qui la vend (03) |
| :--- | :--- | :--- | :--- |
| 1. Statut AE vs SARL | S1 — note de choix + plan de bascule | `templates/21_Devis_Pack_Modele` | M1/M3 |
| 2. Contrat offshore absent | S2 — contrat 12 clauses (trame ci-dessous) | `templates/03_Pack_Freelance_Contrat.md` | M2 |
| 3. TVA export mal facturée | S3 — mention art. 92 + état des prestations | — | M2 |
| 4. Stripe/PayPal bloqués | S4 — montage déclarable en 3 options | note de choix | M4 |
| 5. Revenus offshore non déclarés | S5 — dossier justificatif banque + régularisation | — | M4 |
| 6. Double imposition | S6 — attestation de résidence + méthode conventionnelle | `11_Modele_Attestation_Residence_Fiscale.md` | M1 |
| 7. IP non encadrée | S7 — cession individualisée + réserve au paiement | clause dans contrat | M2 |
| 8. Résiliation subie | S8 — préavis + sortie propre | clauses 8-9 | M2 |
| 9. Litige client étranger | S9 — échelle contentieuse 4 barreaux | mise en demeure → injonction | hors pack (mission) |
| 10. Preuves/paiements | S10 — archive 10 ans + numérotation | — | M5 abo |

---

## S1 — Le statut : choisir avec la tête du client, pas celle du fisc

**Le mécanisme.** La question n'est pas « AE ou SARL » mais « où est le seuil et quand est-il franchi » : AE = plafonds CA encaissé **200 k services / 500 k commerce-industrie-artisanat** (statut loi 114-13, régime CGI art. 42 s.), IR libératoire 1%/0,5% sans charges déductibles. SARL = IS **20%** sur bénéfice (BNF <100M, taux 2026) + déduction des charges + TVA (exonérable export art. 92).

**La solution rédigée (note de choix, 2 pages).** 1) CA encaissé réel des 24 derniers mois par nature (un freelance multi-sources n'a souvent pas « une » activité — le RNAE n'en accepte qu'une) ; 2) comparaison chiffrée sur 3 scenarios avec le comptable : IR libératoire vs IS 20% + dividendes (RAS interne 11,25% 2026 → 10% 2027) + CNSS ; 3) calendrier : si dépassement constaté, anticiper la radiation RNAE (2 années consécutives) — bascule au 1ᵉʳ janvier, pas dans l'urgence.

**Piège.** Le « deux AE au nom du conjoint » pour fractionner = requalification + complicité ; la parade n'est pas structurelle-fictive, elle est réelle (SARL-AU).

## S2 — Le contrat de prestation internationale : la trame qui tient

**Le mécanisme.** DOC droit commun (formation, effet, inexécution art. 230 s.) ; la forme écrite protège la preuve (**art. 443 : au-delà de 10 000 DH, la preuve littérale est exigée**) — un DM WhatsApp « c'est bon on part dessus » vaut rarement 30 000 DH au tribunal.

**La rédaction — les 8 clauses qui font la différence (trame complète : `templates/03_Pack_Freelance_Contrat.md`) :**
1.  **Objet & périmètre** : liste des livrables + ce qui est explicitement hors périmètre (la clause anti-scope-creep) ;
2.  **Acceptation** : critères objectifs + délai de validation du client (10 j, **le silence vaut validation au-delà** — la clause la plus rentable du prestataire) ;
3.  **Prix & paiement** : devise, modalité (virement SWIFT/compte devise), acompte 30-50%, échéances, pénalités retard symétriques (taux + intérêts) ;
4.  **Propriété intellectuelle** : voir S7 (cession individualisée + réserve au paiement complet) ;
5.  **Confidentialité + données personnelles** : le freelance traite des données du client → clause « agira en sous-traitant selon la loi 09-08 et, le cas échéant, le GDPR (art. 28) ; notifiera tout incident de sécurité sans délai » ;
6.  **Responsabilité** : plafond = montant des sommes perçues (usage), exclusion du préjudice indirect — à négocier, pas à imposer ;
7.  **Résiliation** : préavis 30 j réciproque + résiliation pour faute sans préavis + conditions de reprise des travaux ;
8.  **Loi applicable & juridiction** : loi marocaine + tribunal de commerce de Casablanca pour les clients hors UE ; pour les clients UE, envisager la médiation/CCI avant procès (S9).

**Formalité.** Signature (électronique qualifiée type Yousign = preuve), échange des versions datées, annexe devis = prix ferme.

## S3 — La TVA export : l'exonération qui ne s'improvise pas

**Le mécanisme.** CGI art. 92 : exonération de TVA des prestations exportées — sous conditions : client établi hors Maroc, prestation utilisée à l'étranger, paiement en devises rapatrié (IGOC), **mention sur la facture**.

**La solution rédigée.**
- Facture : mention littérale `Exonération TVA — art. 92 CGI — prestation de service export`.
- Pièces du dossier d'exonération à archiver par prestation : contrat, facture, preuve de livraison/réalisation (PV recette, livrable, e-mail d'acceptation), preuve de paiement en devise (SWIFT).
- Déclarations : état des prestations exportées selon le calendrier DGI (`tax.gov.ma`) ; l'AE non-assujetti (CGI art. 91-II) reste hors champ mais doit pouvoir **justifier la nature de ses revenus** en banque — facture quand même.
- **Piège.** Le client UE qui paie 0% en pensant que « c'est pareil qu'une intracommunautaire » : la facture marocaine export ne se déclare pas sur son VIES — mention explicite dans le contrat pour éviter le litige de 20% (le client retient la TVA « par sécurité »).

## S4 — Paiements internationaux : les 3 montages déclarables

**Le principe non négociable.** Tout montage qui contourne la réglementation des changes ou la résidence fiscale est une faute, pas une optimisation. Les trois options licites :
1.  **SARL marocaine + compte en devises/convertible** (banque marocaine) — encaissement légal des revenus export, justificatifs = contrat + facture (S3) ;
2.  **Entité étrangère réelle** (LLC US, SASU FR…) — ne devient licite que si la **substance** suit (bureau, gestion effective, direction) et que la résidence fiscale du contrôlant marocain est déclarée (conventions + CGI ; avoirs étrangers : les campagnes de régularisation loi 63-14 / art. 4 ter LF 2014 / art. 8 LF 2020 et LF 2024 existent — les avoirs non déclarés se régularisent, ils ne s'oublient pas) ; co-intervention avocat fiscaliste du pays d'accueil ;
3.  **Portage salarial/umbrella** pour le freelance qui refuse la structure — l'entité de portage facture, salarie, gère le change ; coût 5-10%, zéro paperasse.
**Stripe en pratique.** Stripe ne s'ouvre pas depuis le Maroc sans entité étrangère **réelle** ; un compte « via un proche français » = utilisation du compte d'autrui + fraude — la vraie solution est le compte Stripe au nom de l'entité étrangère déclarée, ou les alternatives locales (CMI pour le Maroc, Wise/Payoneer pro + contrat marocain pour l'international).

## S5 — Revenus offshore : le dossier qui fait passer le contrôle

**La solution.** Un classeur (physique + Notion) par client étranger : contrat → facture → preuve de livraison → relevé du virement (SWIFT) → rapprochement banque/déclarations. Conservation **10 ans** (prescription fiscale/droit commercial — le dossier vit aussi longtemps que le risque). En banque : produire ce dossier **avant** qu'on ne le demande (blocage de compte = soupçon de blanchiment, pas d'amende — c'est la banque qui gèle, pas le fisc).

## S6 — Double imposition : le réflexe attestation

**La solution en 3 mouvements :** 1) identifier sa résidence fiscale (foyer/183j — CGI art. 23) **avant** de déclarer l'impôt ; 2) demander au client étranger d'appliquer le taux conventionnel de retenue (ex. intérêts/dividendes) via **attestation de résidence** (modèle `11_Modele_Attestation_Residence_Fiscale.md`, procédure DGI) ; 3) côté marocain, imputer la retenue étrangère selon la méthode de la convention applicable (numéro d'article à vérifier au texte consolidé — ne jamais citer un article de convention de mémoire).

## S7 — L'IP : cession individualisée + réserve au paiement

**Le mécanisme.** Loi 2-00 (mod. 34-05), art. 9 : chaque droit cédé (reproduction, représentation, adaptation, support, territoire, durée) doit être **individualisé** — et la cession se **conditionne**.

**La clause qui protège le freelance (à copier dans le contrat) :**
> « Le transfert des droits patrimoniaux d'exploitation décrits à l'Annexe (droit par droit, support, territoire et durée) n'intervient qu'à complet encaissement du prix. À défaut de paiement, le Cessionnaire reconnaît que l'exploitation des livrables est non autorisée et engage sa responsabilité pour contrefaçon. Avant ce transfert, le Client dispose d'une licence d'évaluation personnelle et non exclusive. »

**Piège.** Le client US qui envoie son « MSA » disant « all right title interest, perpetuity, worldwide » : ce n'est pas la loi marocaine qui l'arrêtera — c'est la ligne de prix (« cession totale = +150% fees ») inscrite dans le contrat-cadre. Le droit rend l'option chiffrable ; la négociation la vend.

## S8 — Résiliation : sortir propre

**Clauses-type.** Préavis 30 j réciproque ; en cas de résiliation anticipée imputable au client : facturation des travaux réalisés + pourcentage des tranches entamées ; en cas de résiliation du freelance pour manquement au paiement : droit de suspendre les travaux après mise en demeure restée vaine 15 j (DOC art. 230 s. — exception d'inexécution). Le code du client n'est pas retenu en otage : dépôt convenu d'avance (escrow, repo privé avec clause de restitution) — un otage = un procès.

## S9 — Litige avec le client étranger : l'échelle de 4 barreaux

1.  **Preuve d'abord** : mise en demeure AR/émail tracé (modèle `05_Document_Bank` recouvrement) avec détail des créances — 30% des impayés se règlent là, facture propre à l'appui (celle que l'on n'a pas émise selon S3, on ne la réclame pas).
2.  **Injonction de payer** : pour les créances documentées, la procédure d'injonction devant le tribunal de commerce marocain (demande + facture + mise en demeure) est le recours rapide ; contre un débiteur **étranger**, l'exécution suppose un exequatur — là, la clause de juridiction marocaine seule ne suffit pas ;
3.  **Médiation/arbitrage CCI** si la clause l'a prévue (choix à faire à la rédaction, pas au litige) ;
4.  **Contentieux local** via confrère du pays du client (co-intervention, honoraires partagés par convention, pas de commission).
**La vraie solution est donc préventive** : un contrat-cadre avec clause de juridiction adaptée à la clientèle réelle + une politique d'acompte (S2 clause 3) — 50% d'acompte n'a jamais perdu un vrai client, il a éliminé les mauvais.

## S10 — L'archive de preuve : le réflexe à 3 euros

Dossier par client, numérotation séquentielle des factures, double archive (cloud chiffré + export trimestriel), accusé de réception client systématique. En cas de contrôle (DGI **ou** banque **ou** Office des changes), l'avocat qui produit un dossier chronologique règle en une note ce qui, sinon, devient un redressement reconstructif. L'abonnement M5 inclut l'audit d'archive annuel — c'est la vente la plus facile de la niche (« combien vaut votre dernier dossier sans facture propre ? »).

---

## Matrice de priorisation (que faire en premier chez un nouveau client)

| Action | Fréquence du problème | Coût si absent | Délai |
| :--- | :--- | :--- | :--- |
| Contrat-cadre (S2+S7) | Toujours | Litige + perte IP | 7 j |
| Facture conforme (S3/S5) | Toujours | Retenue client, blocage banque | 2 j |
| Choix de statut documenté (S1) | Au-delà de 150k DH/an | Radiation/réévaluation | 1 cycle fiscal |
| Attestation résidence (S6) | Client UE qui retient l'impôt | Double imposition | 10 j |
| Montage change propre (S4) | Stripe/bloqué ou devises qui dorment | Blocage compte, pénalités | 1-3 mois |

## Le « stack » par sous-persona

* **Solo AE 100-200k** : S2 + S3 + S7 (pack contrat 3 500 HT) — et la note S1 pour ne pas être surpris.
* **Agence 2-10 personnes** : le tout + S8 + contrats de sous-traitance de ses propres freelances (la niche qui recrute → `07_Droit_Social` de la banque).
* **Créateur de start-up avec entité US/FR** : S4 + S6 + co-confrère local — mission sur devis, jamais un conseil improvisé sur un droit qu'on ne pratique pas.

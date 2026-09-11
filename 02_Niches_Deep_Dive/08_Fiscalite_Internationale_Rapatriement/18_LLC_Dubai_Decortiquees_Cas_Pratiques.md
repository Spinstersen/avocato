# 18 — Encyclopédie des montages LLC US & Dubai vus du Maroc (mécaniques complètes)

> Fichier encyclopédique : chaque montage est expliqué de bout en bout — promesse, acteurs, schéma des flux, mécanique juridique / fiscale / change / bancaire / comptable, calendrier, coûts, variantes, points de rupture, voie licite et cas chiffré. Objectif avocat : comprendre pour détecter, chiffrer, refuser le rouge et régulariser. L'avocat ne monte pas d'écran opaque (`15`, `17`).
> Vérifié 07/09/2026. Bases `00_INDEX.md` : **pas de convention fiscale Maroc-US**, IS MA 20% (<100M) / 35% / 40% financier, RAS 11,25% 2026 → 10% 2027, change dahirs 10/09/1939 + 30/08/1949 (90j services / 150j biens), AE 200k services / 500k commerce. Tout point de droit US / émirati = mécanisme général à faire confirmer par écrit par CPA / conseil émirati au jour du dossier — ici on n'invente aucun taux ni formulaire étranger « de mémoire ». Tout point Maroc = texte à ouvrir (CGI/LPF/LF année, IGOC 2026, `09`).

## Mode d'emploi de cette encyclopédie

Chaque montage suit la même grille en 9 rubriques :

1. **Promesse** (ce que TikTok/vendeur dit) — 2. **Acteurs et schéma** — 3. **Mécanique pas à pas** (qui signe quoi, qui paie qui, quand) — 4. **Miroir marocain** (résidence, IS/IR, TVA, CNSS, change) — 5. **Miroir étranger** (obligations US/AE) — 6. **Banque** (où ça bloque) — 7. **Coûts et calendrier réels** — 8. **Points de rupture** (les 5 contrôles qui le démontent) — 9. **Voie licite + cas chiffré**.

Les montants étrangers sont des ordres de grandeur pour décider, pas des taux opposables — seule la confirmation écrite du correspondant local fait foi au dossier.

---

## MONTAGE 1 — La LLC américaine à associé unique résidant à Casablanca (Wyoming / New Mexico / Delaware)

### 1.1 Promesse
« 200 $ de création, 0 impôt, Stripe US, Mercury, anonymat, pas besoin de SARL au Maroc. Tu factures tes clients US/UE avec ta LLC, tu laisses l'argent sur Mercury/Wise, tu te vires ce dont tu as besoin. » C'est le montage le plus vendu aux freelances 25-35 ans.

### 1.2 Acteurs et schéma

Acteurs : (a) personne physique résidente à Casa (jours + foyer + travail effectif au Maroc), (b) LLC US à 100% (registered agent + Articles of Organization de l'État), (c) EIN (numéro fiscal US de l'entité), (d) compte US (Mercury / Wise US / banque), Stripe US, (e) clients US/UE, (f) banque marocaine + DGI + Office des Changes côté Maroc, (g) CPA US + comptable MA + avocat MA.

Schéma des flux en version écran (celle qu'on démonte) :

```
Client US/UE --facture LLC--> LLC US --encaisse--> Mercury/Wise US (solde qui grossit)
      |                                                              |
      |                                                              +--petits virements "perso"--> compte perso MA (sans dossier)
      |
      +--aucune facture SARL MA, aucun rapatriement 90j, aucune liasse MA/US complète
Travail réel : laptop à Casa, décisions à Casa, aucune présence US.
```

Schéma en version substantielle déclarée (la seule défendable, voir 1.9) :

```
Client US --contrat LLC + W-8BEN-E--> LLC US (EIN, CPA, compte US)
   LLC US --convention sous-traitance prix marché--> SARL MA (production à Casa)
   SARL MA --facture + registre 90j--> rapatriement marge MA via compte devise
   Double liasse : US (1120/5472/BOI via CPA) + MA (IS/IR/TVA via comptable) + autorisation Office qualifiée
```

### 1.3 Mécanique pas à pas — ce qui se passe vraiment

**Côté US, création.** Choix d'État (Wyoming/NM/Delaware pour la simplicité et l'agent enregistré), dépôt des Articles, Operating Agreement d'associé unique, désignation d'un registered agent payé chaque année, obtention de l'EIN auprès de l'IRS (délai et procédure à confirmer au CPA — pièces d'identité, bénéficiaire effectif déclaré), déclaration du bénéficiaire effectif au FinCEN (BOI — existence, contenu et délais à confirmer au CPA du jour, car le régime a bougé), ouverture du compte (KYC : passeport, EIN, Operating Agreement, preuve d'activité, parfois adresse US et visioconférence). Stripe US demande EIN + compte + site + KYC du représentant. Chaque étape laisse une trace (agent, IRS, FinCEN, banque) — l'anonymat promis n'existe plus.

**Côté exploitation.** Le freelance signe depuis Casa au nom de la LLC, facture en USD, encaisse sur Mercury. S'il n'y a pas de SARL MA, il n'y a ni contrat de production marocain, ni facture art. 92, ni registre 90j, ni bulletin ni PV. Les petits virements vers le Maroc arrivent en « personal transfer / family support » sans facture ni attestation — la banque marocaine les voit et les classe.

**Côté US récurrent.** Même à impôt US nul dans le cas simple, l'entité reste déclarante chaque année : liasse fédérale (formes 1120 + 5472 dans le cas d'une foreign-owned single-member — intitulés et contenu à confirmer au CPA), déclarations d'État (annual report + franchise/taxe d'État selon l'État), tenue BOI à jour, renouvellement d'agent. Oublier une année = pénalités automatiques (montants à confirmer au CPA — on ne les chiffre pas ici parce qu'elles ont changé et dépassent vite le coût de création), plus gel bancaire pour non-conformité.

**Côté clients US.** Un client US sérieux demande un formulaire fiscal (W-9 si US person, W-8BEN-E si étrangère — qualification à confirmer au CPA) et applique ses retenues selon son droit interne. Sans CPA, le freelance coche au hasard et crée une incohérence durable entre ce que le client déclare avoir payé et ce que la LLC déclare avoir reçu.

### 1.4 Miroir marocain — pourquoi la LLC ne purge rien

**Résidence fiscale.** La personne vit et travaille à Casa : jours + foyer + centre d'intérêts = résidente fiscale marocaine, imposable sur revenus mondiaux (CGI art. résidence à ouvrir). La LLC, pilotée depuis Casa sans bureau ni décision US, a sa direction effective au Maroc : imposable au Maroc sur son activité réelle, sans bouclier d'aucune convention (il n'y en a pas avec les US). Sans attestation de résidence US (impossible si on n'y vit pas), aucun taux conventionnel à invoquer.

**IS/IR + TVA + social.** Freelance sans SARL : IR mondial non déclaré. Avec SARL MA écran passif : IS sur marge non déclarée, TVA art. 92 non appliquée (pas de facture MA), CNSS si travail salarié déguisé. Chaque année non déclarée = année de rectification LPF distincte.

**Change.** Deux couches cumulatives : (a) recettes d'export de services rendus depuis le Maroc = rapatriement 90j via compte marocain avec registre et SWIFT — garder le solde sur Mercury « en attente » = infraction continue qui ne se prescrit pas ; (b) création/détention d'entité étrangère et conservation de fonds dehors = régime d'investissement extérieur (autorisation ou déclaration selon montant et nature — qualification précise à l'IGOC 2026 et au dossier `09`/`04`, à ouvrir avant tout avis). La LLC ne remplace ni le registre ni l'autorisation.

### 1.5 Miroir américain — ce que le CPA dira (et facturera)

Le CPA confirmera par écrit : statut disregarded vs corporate dans le cas du client, formulaires dus, délais, retenues clients, besoin d'ITIN, conséquences BOI, tenue comptable US, risque d'établissement stable inversé si signataire/stock aux US. Budgéter 800-2 000 $/an de CPA hors création, plus agent + État. Sans lettre CPA annuelle, aucun avis « LLC à 0 » n'est signable par l'avocat marocain.

### 1.6 Banque — où ça bloque concrètement

Côté US : gel Mercury/Wise/Stripe pour KYC périmé, incohérence volume/activité, absence de déclarations, virements perso répétés, IP marocaine exclusive avec clients US. Déblocage = pile documentaire (EIN letter, Operating Agreement, factures, contrats, compta, déclarations, preuve d'adresse) en anglais, en 2-6 semaines, fonds immobilisés.

Côté Maroc : la banque demande l'origine des virements entrants (contrat, facture, attestation), signale l'absence de dossier d'export, refuse les transferts sortants vers la LLC sans régime (apport/investissement), interroge sur le compte extérieur non déclaré. Chaque réponse orale non documentée aggrave le dossier de change.

### 1.7 Coûts et calendrier réels (ordres de grandeur décisionnels)

Année 1 écran : création 200-500 $ + agent 100-300 $ + EIN/CPA 500-1 500 $ + compte + transferts + temps — puis pénalités et gel. Année 1 substantielle déclarée : ajouter CPA annuel + comptable MA + avocat MA + autorisation Office + conventions + double liasse = 2 000-4 000 $/an minimum avant tout impôt. Délais : EIN en semaines, compte en semaines, autorisation Office en semaines/mois, mise en conformité MA en 2-3 semaines si pièces prêtes. Comparer toujours à la voie A (SARL MA + devise, voir 1.9) qui tient en 2-3 semaines pour un coût prévisible en dirhams.

### 1.8 Points de rupture — les 5 contrôles qui démontent l'écran

1. Banque MA (origine des fonds) ; 2. DGI (recoupement train de vie / virements / absence de liasse) ; 3. Office/ADII (non-rapatriement continu + détention étrangère sans régime) ; 4. Banque US (KYC/déclarations) ; 5. Échange automatique (CRS/FATCA : la banque US déclare la résidence marocaine, la banque MA voit le compte US). Il suffit qu'un seul parle pour que les quatre autres suivent.

### 1.9 Voie licite + cas chiffré en mécanismes

**Cas Mehdi, 29 ans, Casa, 500k DH/an clients US/UE.** Voie C (écran, à fermer) : 500k sur Mercury 2 ans, 0 rapatrié, 0 déclaré → change continu sur ~1M cumulé + IR mondial 2 ans + pénalités US automatiques + gel. Régularisation `11` : gel, inventaire 3 ans, rapatriement soldé via banque, rectificatives avec comptable, liquidation documentée de la LLC si inutile, transaction spontanée.

Voie A (recommandée ici, 90% des cas) : SARL MA + compte devise + contrats avec clause compte marocain et date d'exigibilité + factures mention art. 92 + registre 90j + mix salaire/dividende simulé avec comptable + crédit TVA récupéré. Effet : banque fluide, crédit bancaire possible, coût prévisible, fermeture LLC documentée (résiliation agent, clôture EIN/compte avec preuves).

Voie B (si besoin US réel : clients qui exigent entité US, volume USD, projet d'expatriation) : SARL MA productrice + LLC facturante avec EIN/CPA/compte + convention de sous-traitance au prix de marché (méthode + livrables + timesheets) + rapatriement marge en 90j + double liasse + autorisation/déclaration Office écrite + revue annuelle 2 pays en abonnement. Ne se vend que budgétée (CPA + substance) et avec lettre CPA jointe.

---

## MONTAGE 2 — La société free-zone à Dubai (IFZA / Meydan / DMCC et sœurs)

### 2.1 Promesse
« 0% d'impôt, visa, compte émirati, image premium, Stripe MENA. Tu factures depuis Dubai, tu vis où tu veux. » Le ticket d'entrée réel est 5 à 10 fois le prix annoncé, et le « 0% » est conditionnel et temporaire.

### 2.2 Acteurs et schéma

Acteurs : (a) résident à Casa, (b) société FZ (licence + lease flexi/bureau + establishment card), (c) visa + Emirates ID + assurance, (d) compte EAU (banque + WPS), (e) clients GCC/UE/US, (f) banque MA + DGI + Office côté Maroc, (g) conseil émirati (compta/audit) + comptable MA + avocat MA.

Schéma écran :

```
Client --facture FZ--> FZ Dubai (licence seule, sans visa/bureau/compte actif ou compte peu mouvementé)
   FZ --encaisse--> compte EAU ou Wise (solde conservé hors Maroc)
   Travail réel : Casa. Transferts : petits virements perso vers MA sans dossier.
   Déclarations : ni liasse EAU suivie, ni liasse MA, ni autorisation Office.
```

Schéma substantiel déclaré :

```
Client GCC --contrat FZ--> FZ Dubai (licence + visa + bail + compte + salarié/présence partielle)
   FZ --convention intragroupe prix marché--> SARL MA (production Casa, si groupe)
   Double liasse EAU (IS/TVA/audit via conseil) + MA (IS/IR/TVA/change) + autorisation Office + attestations résidence
```

### 2.3 Mécanique pas à pas

**Création.** Choix de zone (coût, activité autorisée, visa inclus, audit exigé, banque partenaire), licence annuelle renouvelable, lease (flexi-desk vs bureau — la banque exige souvent plus que la zone), establishment card, visas + statuts médicaux + Emirates ID + assurance, ouverture compte (présence physique, KYC lourd : CV, contrats, business plan, relevés, substance). Sans présence, pas de compte — sans compte, pas de Stripe EAU utilisable. Chaque renouvellement annuel re-vérifie.

**Exploitation.** Facturation en AED/USD, encaissement EAU, dépenses EAU (loyer, salaires, audit). Si la production reste à Casa sans convention, la marge est artificiellement logée à Dubai : acte anormal + abus + prix de transfert. Si le dirigeant vit à Casa, la direction effective reste marocaine.

**Récurrent EAU.** Comptabilité tenue en anglais, audit annuel selon zone/seuil, déclarations IS (taux fédéral 9% au-delà du seuil, régime personne qualifiée de zone franche à conditions — périmètre exact à confirmer par écrit par le conseil émirati du jour, jamais de mémoire ici) et TVA EAU si seuil dépassé, renouvellement licence/lease/visas, UBO tenu. Oublier = amendes EAU + gel bancaire + non-renouvellement.

### 2.4 Miroir marocain

Identique à la LLC pour l'essentiel : résidence mondiale tant que vie/travail à Casa, rapatriement 90j/150j si services rendus depuis le Maroc, autorisation/déclaration Office pour la prise de participation et les transferts, TVA/IR/IS/CNSS selon faits. Le cadre conventionnel Maroc-EAU (existence, date, articles, taux — **à ouvrir au texte avant tout usage**, on ne cite rien de mémoire) ne joue que si résidence émiratie réelle prouvée par attestation + substance. FZ vide + vie à Casa = pas de bénéfice conventionnel, risque de double charge (impôt EAU selon conditions + impôt MA mondial + change).

### 2.5 Banque, coûts, calendrier

Compte EAU : présence + KYC + substance + activité démontrée, délais en semaines, frais et minimums élevés. Virements Dubai → Casa sans dossier (PV/contrat/facture/attestation) = blocage ou déclaration. Coûts récurrents : licence 12 000-30 000 AED + visas/assurance + bail + compta/audit + voyages + conseil EAU + comptable/avocat MA = 40 000-90 000 DH/an. Délais : 3-8 semaines pour être opérationnel avec compte si présent, 2-3 mois avec autorisation Office côté MA si montage de groupe.

### 2.6 Points de rupture et voie licite + cas

Mêmes 5 contrôles que la LLC, plus non-renouvellement FZ et audit EAU. **Cas Salma, e-com 1,2M DH/an.** Voie C : FZ sans visa/bureau, Stripe sur compte EAU, 0 rapatrié → cumul change + fiscal MA + IS/TVA EAU quand même dus selon conditions + licence perdue. Voie A : SARL MA + dotation e-commerce pour ads/SaaS (charges déductibles) + registre + TVA 92 + calendrier dividendes — économie immédiate sans risque. Voie B : FZ + visa + bail + compte + logistique/stock partiel GCC + prix documenté + double liasse + autorisation Office — justifiée par le marché GCC réel, pas par « le taux ».

---

## MONTAGE 3 — La holding interposée qui facture la SARL marocaine (management fees / redevances)

### 3.1 Promesse et mécanique
« Ta holding (FR/BE/LU/AE/US) te facture du management ou une licence, ça fait du charge à Casa et ça sort la marge à faible taux. » Mécanique : convention de services ou de licence + factures mensuelles/trimestrielles calibrées au bénéfice + paiement sortant via banque MA. Sans service réel, c'est une pompe à résultat.

### 3.2 Explication complète — pourquoi ça tombe ou ça tient

**Ce qui fait tenir (rare, cher, documenté).** Service réel et distinctif (direction, finance, tech, marque) rendu par des personnes identifiées, avec livrables datés, temps passé, compétence que la SARL n'a pas ; prix de marché démontré (méthode + comparables avec comptable/counsel : coût majoré, prix comparable, marge — choix motivé) ; convention signée (objet, SLA, prix, révision annuelle, propriété intellectuelle si redevance) ; TVA et retenue selon nature exacte du flux et convention applicable ouverte (prestation ≠ redevance ≠ dividende — chaque nature a son régime) ; comptabilisation et paiement tracés ; revue annuelle.

**Ce qui fait tomber (fréquent).** Fee rond calibré au résultat (« 30k/mois pile le bénéfice »), sans timesheet ni livrable, par une holding sans salarié ; licence de marque sans dépôt ni valeur ; convention d'une page signée après contrôle ; prix jamais révisé ; paiement par compte courant sans facture. Le vérificateur demande : « Montrez-moi le travail » — silence = réintégration (acte anormal) + abus + prix de transfert + RAS/convention mal appliquée.

**Documents exigés avant tout avis favorable.** Cartographie des flux, politique de prix écrite, conventions signées, timesheets/livrables/PV, comparables, liasses des deux côtés, attestations si convention invoquée. Sans ce dossier, l'avocat refuse par écrit (`15` §5) et propose le dividende daté (`13` S4) : moins « malin », 100% défendable.

---

## MONTAGE 4 — Le rebond par plateformes et comptes personnels (Wise / Payoneer / Mercury / compte EAU en nom propre)

### 4.1 Mécanique détaillée — le tuyau qui fuit de partout
Client paie sur compte plateforme au nom perso ou de l'écran → solde conservé dehors (« en attente de régime / de meilleur taux ») → petits virements fractionnés vers compte perso MA avec motifs vagues → dépenses pro/perso mélangées, aucune facture MA, aucun registre. Chaque boucle ajoute une couche : change (non-rapatriement continu), fiscal (recette non déclarée), social (salaire déguisé si travail), blanchiment si réinjection (immobilier/voiture sans origine).

### 4.2 Pourquoi c'est le pire montage (et le plus facile à prouver)
Plateformes = relevés horodatés parfaits pour le vérificateur (montants, dates, contreparties, IP). Fractionnement = faisceau d'intention. Motifs vagues = absence de pièce. Mélange pro/perso = rejet de comptabilité. C'est le dossier où le redressement se chiffre en une après-midi. Protocole : gel immédiat, inventaire 3 ans des relevés, rapatriement soldé via banque avec dossier, rectificatives avec comptable, clôture des comptes rebond avec preuves, transaction spontanée (`11`, `15` §5). Jamais de « dernier petit virement avant de régulariser ».

---

## MONTAGE 5 — Le cumul LLC + FZ + résidence flottante (le « pack nomade » vendu clé en main)

### 5.1 Mécanique et pourquoi c'est une double exposition sans protection
Résidence non tranchée (180j ici, 185j là, foyer au Maroc, attestations arrangées) + deux écrans (LLC + FZ) qui se facturent entre eux sans substance + comptes rebond. Résultat : deux juridictions qui peuvent revendiquer l'imposition (sans convention US pour protéger, avec convention EAU inutilisable sans substance), deux jeux de pénalités automatiques (US + EAU), change marocain continu, banques des deux côtés qui gèlent. Le client paie trois structures pour être protégé nulle part.

### 5.2 Voie licite — une résidence, une entité utile
Trancher **une** résidence par année (jours + foyer + intérêts vitaux + attestation + double déclaration avec confrères), ne garder qu'**une** entité utile et substantielle (celle où sont clients/présence/banque), fermer l'autre proprement (liquidation, solde rapatrié et déclaré, attestations de clôture, résiliation agent/comptes avec preuves). Dossier de résidence annuel `13` S1 + revue à chaque déplacement. Cas Lena-type : 180j MA / 185j ailleurs = on écrit l'année, on ne l'efface pas.

---

## Protocole cabinet — arbre 10 minutes, fermeture, offre (à donner tel quel)

**Arbre.** 1) Où vis-tu vraiment (jours/foyer/travail) ? → résidence écrite. 2) Où tes clients paient-ils mieux une entité locale (US ? GCC ? UE ?) ? → besoin réel ou fantasme. 3) As-tu le budget récurrent (CPA/conseil étranger + comptable MA + substance : bureau/visa/salariés) ? → sinon voie 100% MA. 4) Peux-tu décrire le montage par écrit à la banque/DGI/Office ? → sinon on ne le fait pas.

**Fermeture propre.** Gel → inventaire comptes/flux 3 ans → solde rapatrié via banque avec dossier → rectificatives avec comptable → liquidation/radiation étrangère avec preuve → clôture comptes rebond → attestations classées → procédure corrigée (registre 90j, AG, compte devise). Puis transaction spontanée si besoin. Jamais d'antidatage, jamais de nominee de sortie.

**Offre.** Diagnostic international 900 HT (voies A/B/C chiffrées avec comptable + besoin CPA/conseil EAU par écrit) → mise en conformité au forfait → revue annuelle 2 pays en abonnement. Phrase : « Pour 900 DH, je te dis combien ta LLC/Dubai te coûte vraiment — et je te rends un dossier que ta banque accepte. »

---
> Références : IGOC 2026 + dahirs (`oc.gov.ma`), CGI/LPF/LF (`tax.gov.ma`), conventions par texte (cadre Maroc-EAU à ouvrir ; rien avec les US), IRS/CPA pour tout point US, conseil émirati agréé pour IS/TVA/audit/UBO EAU. Aucun taux étranger opposable sans confirmation écrite du correspondant local jointe au dossier. L'avocat structure, contractualise et sécurise le change et la preuve ; le chiffrage et les liasses restent au comptable (+ CPA/conseil étranger), en co-traitance lettrée.

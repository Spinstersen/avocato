# 04 — Conventions fiscales : la grille de lecture de l'avocat

> **La fiche « texte ouvert » :** comment LIRE une convention bilatérale — dans quel ordre, avec
> quel piège de numérotation, et que dit exactement chacune des six conventions vérifiées par
> l'audit du vault. Ce fichier ne remplace pas la méthode de recherche
> (`15_Recherche_Juridique_Veille/06`) : il en est l'application au montage transfrontalier.
> Règle absolue : aucun pourcentage sort d'ici s'il n'est pas dans la colonne « vérifié »
> ci-dessous — le reste est flag.

## 1. POURQUOI : la numérotation OCDE est un piège pour les conventions anciennes

Les conventions marocaines utiles datent de 1970 à 2006 — **toutes antérieures aux alignements
OCDE récents**. Réflexe mortel du praticien formé au modèle : raisonner « article 7
bénéfices, article 10 dividendes, article 12 redevances » alors que la France 1970 numérote
autrement (dividendes = **art. 13**, résidence = art. 2, élimination double imposition =
art. 25) et que l'Espagne 1978 a sa propre carte (dividendes/intérêts/redevances =
**art. 10-11-12**). Un article « retenu » sous le mauvais numéro, c'est un texte fantôme cité
en consultation — exactement la classe d'erreurs que l'audit a retirées du vault.

Deuxième raison de la grille : la convention n'est pas un bouclier, c'est une **répartition de
compétence**. Elle plafonne la RAS à la source et attribue l'imposition ; elle n'exonère jamais
automatiquement dans l'État de résidence (crédit, exonération-réservation, barème — art. 25
France : crédit forfaitaire 25 % sous limites du barème). Annoncer « exonéré grâce à la
convention » sans lire l'article « élimination de la double imposition » est la seconde faute
nationale du conseil international.

## 2. COMMENT : l'ordre de lecture en sept passages

```
1. CHAMP       Personnes couvertes (résidents d'un et/ou des deux État) + impôts couverts
               (liste taxative : IS, IR, CSS? — vérifier que l'impôt visé Y EST).
2. RÉSIDENCE   Art. « personnes résidentes » (FR 1970 : art. 2) + tie-breaker → fiche 02.
3. QUALIFICATION Du revenu : le même flux est-il dividende, intérêt, redevance, bénéfice
               d'entreprise, plus-value ? (la qualification décide de l'article, donc du taux).
4. SOURCE      L'article attributif : taux plafonné à la source ? exonération à la source ?
               conditions (participation, bénéficiaire effectif).
5. RÉSIDENCE   L'article « élimination » : crédit ordinaire / forfaitaire / exonération-
               réservation. C'est LÀ que se joue le taux effectif du client, pas au 4.
6. PROCÉDURE   Comment on obtient le taux réduit en pratique : attestation de résidence,
               formulaire de l'État source, régime déclaratif (niche 08/05 ; 09/13 S9).
7. ASSISTANCE  Procédure amiable / échange de renseignements : la porte de sortie en cas de
               double imposition survivante — à citer au client inquiet, à ne jamais promettre
               comme recours rapide [flag : délais non chiffrés].
```

**Règle de rédaction des notes :** référence complète à chaque citation — « convention
[États] du [date], [avenant], art. [n° du TEXTE], lu le [date] » (méthode `15/06` §2 étape 6).

## 3. La carte des six + du néant (état vérifié par l'audit 29-30/08/2026)

| Convention | Date / vigueur | Particularités VÉRIFIÉES | Ce qui reste flag |
| :--- | :--- | :--- | :--- |
| **France** | **29/05/1970** + avenant **18/08/1989** | art. 2 résidence ; art. 13 dividendes source ≤ **15 %** ; art. 25 élimination FR : **crédit forfaitaire 25 %** sous limites du barème | Numérotation complète ≠ OCDE : toujours lire au texte ; intérêts/redevances/pensions non relus ici [flag] |
| **Belgique** | **31/05/2006**, vigueur **2009** (remplace 1972 + avenant 1983) | Date et substitution vérifiées — la « convention de 1972 » qui circule est périmée | Taux par revenu : à ouvrir [flag] |
| **Espagne** | **10/07/1978**, vigueur **1985** | dividendes **10/15 %**, intérêts **10 %**, redevances **5/10 %** — **art. 10-11-12** (numérotation PROPRE, pas OCDE) | Conditions de participation et régimes particuliers [flag] |
| **Canada** | **22/12/1975** | Existence + date vérifiées | Articles entiers non relus au texte : AUCUN taux ne sort d'ici sans ouverture [flag — cas Karim fiche 09] |
| **Italie** | **07/06/1972** | Existence + date vérifiées | idem [flag] |
| **Pays-Bas** | **12/08/1977** | Existence + date vérifiées | idem [flag] ; toute structure NL se juge AU TEXTE + substance |
| **États-Unis** | **AUCUNE CONVENTION** — la « 1977 » du vault était une fiction, retirée partout | Conséquences en tableau § 4 | rien à flaguer : le néant est le fait vérifié |

## 4. Le néant Maroc-USA : le tableau réel des conséquences

| Ce que la convention n'est pas là pour faire | Ce qui s'applique vraiment | Qui le fait |
| :--- | :--- | :--- |
| Plafonner la RAS marocaine sur dividendes payés à un US person | Taux interne marocain, sans garde-fou conventionnel [flag : taux applicable à confirmer au CGI au jour du paiement] | Cabinet MA + confirmation DGI |
| Éviter la double imposition côté US | **1040 revenu mondial** + crédit d'impôt étranger (FTC) du droit interne US — mécanique différente, limites différentes | **CPA US obligatoire** |
| Dispenser de déclarer | **FBAR (FinCEN 114) + Form 8938** sur les comptes financiers à l'étranger, y compris marocains | CPA US ; sanctions US propres |
| Protéger l'investissement | Pas de TBI US-MA en vigueur utile à ce dossier [flag : vérifier un état à jour USTR/UNCTAD avant de l'affirmer par écrit] | Fiche 07 |

**Formule de la note client :** « entre le Maroc et les États-Unis, il n'y a pas de convention
fiscale : chacun applique son droit interne, et la cohérence des deux se paie deux fois si on ne
la construit pas. » C'est exactement la phrase que la niche `08/13` S10 appelle « le je ne sais
pas sans texte ni confrère » — la compétence qui se prouve par ses limites.

## 5. EXEMPLE : le même dividende, trois lectures

Dividende de 100 000 DH d'une SARL marocaine, distributeur en 2026 (RAS interne **11,25 %**,
taux de la date de mise en distribution — chaîne `08/13` S4) :

1. **Bénéficiaire résidant en France** : art. 13 conv. 1970 plafonne la source à 15 % ; le taux
   interne (11,25 %) étant inférieur, il s'applique tel quel ; côté France, crédit forfaitaire
   25 % (art. 25) dans les limites du barème — la suite se joue chez le confrère. La convention
   sert ici de **garde-fou**, pas d'allègement.
2. **Bénéficiaire résident des Émirats** : aucune des six conventions ne couvre ce résident —
   reste le droit interne marocain ; toute promesse de « 0 % aux EAU donc 0 % au Maroc » est un
   mythe (fiche `03` §4) ; [flag : vérifier l'existence d'éventuels textes marocains particuliers
   applicables aux résidents Golfe via la DGI avant toute note — ne rien présumer].
3. **Bénéficiaire citoyen US résident US** : § 4 s'applique intégralement — pas de plafond, pas
   de crédit croisé conventionnel, 1040 + FBAR en face.

Même flux, trois conseils distincts : c'est la démonstration que le montage se pilote à la
convention **lue**, pas au taux « de la profession ».

## 6. Le rituel de l'article ouvert (procédure interne du cabinet)

1. **Fiche de lecture** pour chaque convention active dans un dossier : référence complète,
   article lu, date de lecture, ce qui en découle, ce qui reste flag — rangée dans
   `08_Jurisprudence/06_Fiscalite_Internationale_Conventions` (l'archive de la matière,
   `15/06` §6).
2. **Règle des deux fenêtres** : aucune note client ne se rédige avec la seule fiche — le texte
   est ROUVERT à chaque consultation ; la fiche évite de re-rechercher, elle ne remplace jamais
   de re-LIRE.
3. **Validation croisée du taux** : tout pourcentage cité dans un écrit sort d'une des cases
   « vérifié » du § 3, ou porte le flag d'une ouverture faite depuis (date + article) ; la
   troisième voie — le chiffre « connu » — n'existe pas dans ce dossier.
4. **Révision annuelle à la LF et à l'IGOC** (calendrier `15/07`) : une convention ne change pas
   seule — c'est le taux interne qu'elle plafonne, et le régime de change qui encaisse, qui
   bougent ; la carte § 3 se re-date à chaque passage.

## 7. Les cinq phrases que cette fiche autorise (et leurs limites)

- « Votre dividende marocain sera retenu à la source marocaine au taux interne (11,25 % en 2026,
  10 % en 2027) ; la convention française ne le réduit pas davantage car le plafond de l'art. 13
  (15 %) n'est pas atteint. » — exact, convention ouverte.
- « Côté français, l'art. 25 prévoit un crédit forfaitaire de 25 % dans les limites du barème :
  le calcul final de votre foyer fiscal se fait avec votre conseil français. » — périmètre posé.
- « Entre le Maroc et les États-Unis, il n'existe aucune convention fiscale : c'est un fait, pas
  une attente. » — la phrase la plus rentable du dossier US.
- « La convention du pays de votre holding n'a pas encore été LUE : avant tout chiffrage,
  l'article dividende sera ouvert — aucune promesse de taux ne sortira d'un texte refermé. » —
  la phrase qui retarde un devis et empêche un contentieux.
- « La convention ne dispense AUCUNE des deux déclarations : elle répartit l'imposition, elle
  n'abolit pas les formalités déclaratives. » — la phrase que tout client « exonéré par traité »
  doit entendre avant de signer quoi que ce soit.

> **Lecture pro :** une convention est un texte de 30 articles dont le montage en active quatre ;
> les lire dans l'ordre § 2 et citer le numéro QUI FIGURE SUR LE PAPIER (pas le numéro OCDE rêvé)
> est la seule discipline qui distingue le conseil transfrontalier du colporteur de pourcentages.

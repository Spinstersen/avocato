# 06 — Rechercher une convention fiscale ou un TBI applicable : méthode et liste vérifiée

> **À quoi ça sert :** la matière où l'erreur de date coûte le plus cher — un client retient à 15 %
> parce qu'on a cité la mauvaise convention. Ce fichier donne la méthode de recherche
> (DGI + Journal de l'Enregistrement, jamais « de mémoire ») et la liste des textes réellement
> vérifiés par l'audit du vault, avec l'apostille de La Haye 1961 et son piège allemand.
> Temps de lecture : 10 minutes.

## 1. POURQUOI : « 1959 » a voyagé dans le vault pendant des mois

L'exemple fondateur : le dossier MRE citait la convention fiscale France-Maroc de « 1959,
art. 4-7-13-15-27 ». L'audit du 29/08/2026 est remonté aux textes : la convention applicable est
celle du **29 mai 1970**, modifiée par l'**avenant du 18 août 1989**.
Le « 1959 » était une erreur de date propagée sans source, avec des numéros d'articles qui ne
correspondaient plus — la réalité vérifiée : **art. 2** (résidence), **art. 13** (dividendes :
retenue à la source plafonnée à **15 %**), **art. 25** (élimination de la double imposition en
France par crédit d'impôt forfaitaire de **25 %**, dans les limites du barème).
Et pendant ce temps, le vault citait une « convention Maroc-USA 1977 » qui, elle,
**n'existe pas du tout** : zéro convention fiscale entre le Maroc et les États-Unis.

Faute de méthode, une erreur de date devient un conseil fiscal faux — et un chiffre « plausible »
circule d'un écrit à l'autre sans plus jamais être ouvert.

## 2. COMMENT : la méthode en six étapes

```
1. RÉSIDENCE   Identifier la résidence FISCALE du bénéficiaire (critères de l'art. 2-type :
               foyer, séjour > 183 jours, centre des intérêts vitaux).
               La nationalité ne compte pas. Sans certificat d'imposition de l'autre État,
               la convention ne s'applique pas « en principe ».
2. EXISTENCE   Chercher la convention : base/liste de la DGI (tax.gov.ma) ; points de départ
               internationaux : UNCTAD Investment Policy Hub (TBI), WIPO Lex, bases des
               traités de l'État partenaire (ex. base « conventions internationales » de
               Légifrance pour la France) — puis remonter TOUJOURS au texte publié.
3. OPPOSABILITÉ Au Maroc, la convention n'existe juridiquement qu'après autorisation par la
               loi et publication (BO) : chercher la loi d'autorisation + le n° de BO.
               Recueil de référence pour dater vigueur et publication : la DGI et le
               Journal de l'Enregistrement (JET).
4. DATATION    Distinguer les trois moments : signature ≠ approbation/ratification ≠
               entrée en vigueur (ex. Belgique signée le 31/05/2006, en vigueur en 2009).
5. LECTURE     Lire l'ARTICLE PRÉCIS AU TEXTE (dividendes ? intérêts ? redevances ?
               établissement stable ?) — jamais transporter un pourcentage connu pour
               UN pays sur un AUTRE pays.
6. ÉCRITURE    Référence complète ou rien : « convention entre [A] et [B] du [date],
               [loi d'autorisation], BO [n°], en vigueur le [date], art. [n°] ».
               Tout ce qui n'est pas sous les yeux reste un FLAG.
```

**La règle-mère de ce fichier : ne jamais retenir une date « de mémoire ».**
Elle a coûté au vault deux corrections majeures (la date de 1959 ; la convention USA fantôme) —
toutes deux documentées dans `PROGRESS_AUDIT_NICHES.md` §1-2.

## 3. LA LISTE VÉRIFIÉE PAR L'AUDIT DU VAULT (29-30/08/2026)

### 3.1 Conventions fiscales internationales

| Partenaire | Date du texte | Ce que l'audit a vérifié | Usage typique au cabinet |
|---|---|---|---|
| **France** | **29/05/1970** + avenant **18/08/1989** | art. 2 résidence ; art. 13 dividendes ≤ **15 %** ; art. 25 crédit FR forfaitaire **25 %** (limites du barème) | Dividendes de Karim ; Yassine facturant un client FR |
| **Belgique** | **31/05/2006** | en vigueur **2009** ; remplace la convention 1972 + avenant 1983 | MRE Belgique ; holdings |
| **Espagne** | **10/07/1978** | en vigueur **1985** ; dividendes 10/15 %, intérêts 10 %, redevances 5/10 % (art. 10-11-12) ; pensions : règle de la résidence | Créateurs et clients espagnols ; CCISM (réseau CFCIM/MEIF) |
| **Canada** | **22/12/1975** | existence et date vérifiées ; articles non lus au texte [flag] | MRE Québec ; studios offshore |
| **Italie** | **07/06/1972** | existence et date vérifiées [flag articles] | Investisseurs italiens |
| **Pays-Bas** | **12/08/1977** | existence et date vérifiées [flag articles] | Structures néerlandaises |
| **États-Unis** | **AUCUNE CONVENTION** | Vérifié : zéro convention Maroc-US ; le vault citait « 1977 » — retirée partout (niches 05/08/09/11) | US persons : droit interne (1040 mondial, FBAR/Form 8938, crédit d'impôt interne) + CGI ; CPA US obligatoire |

**[flag permanent]** : pour CA / IT / NL, seuls l'existence et la date ont été vérifiées ;
aucun pourcentage n'a été lu au texte — la méthode § 2 s'applique intégralement avant tout conseil chiffré.
Pour la sécurité sociale France-Maroc, l'audit a documenté la convention du **22/10/2007**
(en vigueur au 01/06/2011 ; détachement de **3 ans** + certificat d'assujettissement — formulaire à vérifier).

### 3.2 Protection de l'investissement : TBI et CIRDI

| Texte | État vérifié | Ce qu'il apporte |
|---|---|---|
| **TBI Maroc-France du 13/01/1996** | Entrée en vigueur le **31/05/1999** (vérifié) | Protection des investissements FR→MA : traitement, expropriation indemnisée, règlement des différends |
| **CIRDI** | Maroc contractant depuis le **11/10/1967** ; sentence réellement citable : **Malicorp AG c. Maroc, ARB/08/4, 25/02/2011** (icsid.worldbank.org) | Arbitrage investissement-État ; la clause de compromis se rédige en amont dans les conventions d'investissement |
| À ne pas confondre : charte de l'investissement | **Loi-cadre 03-22** (dahir 1-22-76, BO 7152 ; décret 2-23-1 : seuils 50 M DH / 50 emplois ; art. 9 conventions d'investissement ; art. 37-38 amiable/arbitrage) | Voie CONTRACTUELLE interne pour les grands projets — pas un TBI |

## 4. Apostille et légalisation : la trouvaille qui change un kit documentaire

**Fait vérifié par l'audit (30/08/2026), source Conférence de La Haye (hcch.net) :**
le Maroc est partie à la **Convention de La Haye du 5 octobre 1961** supprimant la condition de
légalisation des actes publics étrangers — adhésion le 27/11/2015, **entrée en vigueur le 14/08/2016**
(dahir n° 1-15-149, BO 6440). L'apostille remplace la chaîne « légalisation MAE + consulat ».

**Le piège, documenté via hcch.net : l'ALLEMAGNE a formulé une OBJECTION à l'adhésion du Maroc.**
Conséquence pratique reprise dans les kits MRE (niches 05 et 10) :
pour les documents **Maroc ⇄ Allemagne**, pas d'effet apostille → **légalisation consulaire**.

D'où la règle d'ops qui en découle : le kit « documents à légaliser » se construit **pays par pays** ;
l'apostille n'est jamais un réflexe « partout ». Les délais de traitement par les autorités
(consulats, tribunal d'apostille) sont une pratique variable [flag : source du jour — cf.
`[[09_Zones_Grises_Sources]]`], jamais une promesse contractuelle.

## 5. Cas chiffrés [illustratif]

**Cas 1 — Karim (MRE France ; SARL de détention) encaisse 100 000 DH de dividendes en 2026.**
Chaîne complète : RAS interne marocaine sur dividendes **11,25 % en 2026 → 10 % en 2027**
(LF 2026, vérifié ; date déterminante : la mise en distribution par l'AG) ;
l'art. 13 de la convention de 1970 plafonne la RAS à la source à 15 % — le taux interne,
inférieur, s'applique tel quel ; côté français, crédit d'impôt de 25 % du revenu perçu (art. 25),
imputation dans les limites du barème [flag : la suite française — calcul d'IR du ménage —
est hors de cette note, à chiffrer par le conseil fiscal FR de Karim].
Ce que la « convention de 1959 » aurait produit : un conseil faux dès le premier chiffre.

**Cas 2 — Yassine (freelance, diagnostic 900 DH HT) facture une agence de Montréal 40 000 DH.**
Avant toute mention « exempt de retenue » sur la facture : lire l'article « bénéfices » de la
**convention Canada-Maroc du 22/12/1975** AU TEXTE (étape 5) — existence seule ne suffit pas.
Et dans la même note, la brique change : IGOC 2026, rapatriement du produit des exportations de
**services sous 90 jours** (délai vérifié — le vault écrivait « 30 jours » par confusion avec le
recès voyage : corrigé partout le 29/08). Conseil complet = convention + change, jamais l'un sans l'autre.

## 6. L'archive de la matière (pour ne jamais refaire l'audit deux fois)

1. Chaque convention ouverte au texte produit une **fiche** dans `08_Jurisprudence/06_Fiscalite_Internationale_Conventions` :
   référence complète § 2-étape 6 + article cité + date de lecture.
2. La liste § 3.1 est l'actif du cabinet — elle se date : « vérifiée le [date] ; à re-vérifier à chaque
   LF et à chaque nouveau partenaire évoqué par un client ».
3. Toute nouvelle date « de mémoire » qui entre dans une conversation déclenche la recherche immédiate —
   la mémoire est un signal d'alarme, pas une source.

> **Lecture pro :** en fiscalité internationale, la date d'une convention est un fait, pas une opinion —
> et un fait qui se vérifie au Journal de l'Enregistrement, pas dans la tête d'un associé.
> Le vault l'a appris deux fois : une date fausse (France « 1959 ») et une convention fantôme (Maroc-USA) ;
> la méthode ci-dessus est la cicatrice utile.

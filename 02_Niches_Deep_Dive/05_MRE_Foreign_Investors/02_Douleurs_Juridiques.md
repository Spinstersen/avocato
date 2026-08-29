# 02 — Douleurs juridiques des MRE et investisseurs étrangers

> Huit douleurs, chacune avec sa base légale **réelle** (vérifiée 29/08/2026, sources `sgg.gov.ma`, `oc.gov.ma`, `impots.gouv.fr`/BOFiP, `icsid.worldbank.org`, `unctad.org`, BOM n° 7152/7177/7184). Le playbook douleur → parade est dans `13_Solutions_Juridiques.md`.

## 1. Créer une société « d'en haut » sans se déplacer

### Cadre réel

- **Loi 5-96** (telle que modifiée) : SARL et SARL à associé unique (SARL-AU). La SAS/SASU relève de la loi 17-95 modifiée par la **loi 19-20**. Les « art. 50-100 » cités par les anciens fichiers du vault étaient fictifs.
- Chainon formel : certificat négatif (OMPIC) → statuts → **dépôt des fonds** (banque marocaine, certificat de dépôt) → enregistrement → immatriculation au **registre du commerce** (OMPIC) → commencement d'activité (DGI) → publication légale.

### Pourquoi ça fait mal à distance

- Le **dépôt des fonds** et l'**ouverture du compte** sont les deux goulots : la banque marocaine veut voir le bénéficiaire effectif (KYC renforcé pour non-résidents), souvent en présence — ou exige une procuration **spéciale, notariée et apostillée** (Maroc et France sont tous deux parties à la Convention de La Haye du 05/10/1961 ; éligibilité des documents à vérifier au cas par cas).
- Les statuts « downloadés » ne survivent pas à l'absence : sans clauses de gouvernance adaptées à l'associé à 4 000 km (décisions réservées, comptes rendus trimestriels, mandat de gérant borné), Karim découvre la dépossession un an plus tard.
- Délais : les « 72 h » des blogs commerciaux ne sont pas des délais légaux ; un planning réaliste (2 à 4 semaines formalités hors blocage bancaire) est un argument de vente en soi.

**Coût si non traité** : capital bloqué des semaines, société immatriculée mais compte inexistant, gérance de fait prise par l'« associé local ».

## 2. La résidence fiscale : la question que personne n'a posée

### Cadre réel

- Côté marocain : **CGI art. 23 et s.** — résident fiscal celui qui a au Maroc son foyer d'habitation permanente, le lieu de séjour principal (**183 jours** sur 12 mois), ou le centre des intérêts professionnels/financiers (sauf preuve contraire pour les salariés de sociétés étrangères de services à l'étranger).
- Côté conventionnel : **convention France-Maroc du 29 mai 1970** (modifiée par l'avenant du 18/08/1989), **art. 2** : critères de « personne domiciliée » (foyer d'habitation permanent → centre des intérêts vitaux → séjour habituel).

### Le nœud Karim

- Il est **résident fiscal français** (foyer + 183 j en France) → le Maroc ne taxe que ses revenus **de source marocaine** ; la France impose le monde mais élimine la double imposition par les mécanismes de l'art. 25.
- L'inverse est vrai : six mois par an à Casablanca + famille qui rentre = bascule possible vers la résidence marocaine (IS/IR mondial) — sans que personne ne l'ait calculé.
- La douleur n'est pas fiscale, elle est **temporelle** : la structure choisie à l'année N coûte à la bascule N+3 (retour au Maroc = requalification de tout l'édifice).

**Coût si non traité** : mauvaise application des retenues à la source, redressement, ou structure à refaire payer une deuxième fois.

## 3. Les dividendes : deux impôts, un plafond, un crédit

### Cadre réel (France-Maroc)

- Maroc : distribution → **RAS dividendes 11,25 % en 2026 (10 % à partir de 2027**, trajectoire LF2023) pour Karim comme pour un associé marocain (taux interne applicable sous réserve du plafond conventionnel — ici le taux interne est **inférieur** au plafond de 15 % de la convention : c'est le taux interne qui s'applique).
- Convention de 1970, **art. 13-3** : l'État de la source ne peut retenir plus de **15 % du brut** (bénéficiaire effectif).
- France : les dividendes marocains sont imposables en France, avec (régime du barème) un **crédit d'impôt égal à 25 % du revenu brut** attaché aux dividendes de sociétés domiciliées au Maroc (**art. 25-2 et 25-3-a**, crédit **forfaitaire** — ne pas confondre avec un simple crédit de la retenue marocaine) ; interaction avec le PFU à faire valider par le **confrère français** (le crédit forfaitaire conventionnel ne survit pas au prélèvement forfaitaire non libératoire sans option pour le barème).

### La douleur

- Karim a peur de « payer deux fois » ; la réponse chiffrée exacte (IS 20 % société + 11,25 % RAS + France barème/crédit 25 %) est un tableau, pas une phrase.
- Le versement du dividende lui-même est une **opération de change** quand il sort du Maroc : voir §4.

**Coût si non traité** : trésorerie qui dort au Maroc faute de dossier de transfert, ou dividende versé « en net » sans justificatif → blocage banque + question DGI.

## 4. Le change : faire sortir l'argent légalement

### Cadre réel

- **IGOC édition 2026** (en vigueur depuis le 01/01/2026, `oc.gov.ma`) — l'édition 2024 est archivée ; toute référence chiffrée doit être épinglée dans la 2026 au moment du dossier.
- Principe structurant (rappelé par les lois de finances successives et l'IGOC) : l'investissement **financé en devises** par un non-résident (ou par un MRE en devises) ouvre droit au **rapatriement** des revenus, dividendes, produits de cession ou liquidation, via banque, sur justification (attestation fiscale, PV d'approbation des comptes, virement d'origine en devises).
- **Comptes du MRE** : compte en devises ou compte convertible en dirhams (transferts autorisés) — régime propre, documents propres ; le MRE investisseur qui prend la résidence marocaine perd l'éligibilité à certains comptes (point de bascule — §2, et `10_MRE_Entrepreneurs`).
- Investissement étranger en dirhams (argent déjà au Maroc, héritage, compte local) : le rapatriement en devises **n'est pas le même régime** — ne jamais promettre la convertibilité sans tracer l'origine des fonds.

### La douleur

- La banque demande un **dossier** (contrat de société, statuts, preuve de l'apport initial en devises, relevés de l'investissement, attestation de dépôt, PV d'AGM de distribution, justificatif fiscal) que personne ne constitue **avant** le jour où l'argent doit sortir.- Délais de traitement bancaire ≠ délais légaux : la douleur est processuelle.

**Coût si non traité** : dividendes coincés, cession impossible à rapatrier, relation bancaire dégradée.

## 5. L'établissement stable : la société marocaine qui « déborde » en France

### Cadre réel

- Convention de 1970 : l'activité industrielle/commerciale n'est imposable en France que si elle y a un **établissement stable** (installation durable, pouvoir d'engager, salariés agissant pour l'entreprise — définition art. 10 s. ; seuil de durée des chantiers à vérifier au texte).
- SARL marocaine dont le seul bureau est chez Karim à Paris, avec un salarié qui signe des contrats français 7 mois par an → ES caractérisable en France → **IS français sur le bénéfice attribué** en plus de l'IS marocain (et crédit/déductibilité à gérer par le confrère).

### La douleur

- Le projet « je dirige tout depuis Paris » est **exactement** le montage qui crée l'ES. La parade n'est pas de le cacher mais de l'organiser (mandats de gestion au Maroc, pouvoirs limités du salarié français, substance marocaine réelle).

**Coût si non traité** : imposition française rétroactive + pénalités, double dossier de régularisation.

## 6. Protéger l'investissement face à l'État (l'angle « investisseur étranger »)

### Cadre réel

- **Réseau de TBI** : le Maroc a signé ~60 accords bilatéraux d'investissement, ~47 en vigueur (CNUCED Investment Policy Hub) — dont **Maroc-France du 13/01/1996, entré en vigueur le 31/05/1999**. Ouvrir le traité applicable **avant** de structurer : la protection suit la nationalité de l'entité qui investit (structurer via l'entité du bon pays **avant** le litige, pas après).
- **CIRDI** : Maroc partie à la Convention de Washington depuis le 11/10/1967 ; le consentement écrit à l'arbitrage se donne dans le contrat ou par le TBI — jamais « automatiquement ».
- **Charte 03-22, art. 37-38** : les **conventions d'investissement** avec l'État peuvent prévoir un règlement amiable préalable puis l'arbitrage selon les conventions internationales ratifiées — le bon réflexe contractuel pour les gros projets.

### La douleur

- Le petit MRE (projet < 50 M DH) n'est **pas** concerné par les conventions d'investissement de la charte : le lui dire, c'est le protéger contre les vendeurs de « convention État-Maroc » sur les salons. Sa protection à lui : un bon contrat interne (§1), la traçabilité devises (§4), et l'option TBI/CIRDI seulement s'il investit **en devises via une entité du bon pays**.

**Coût si non traité** : une nationalité d'investissement mal choisie = zéro protection conventionnelle au jour du litige.

## 7. La charte de l'investissement : ce qui est vrai, ce qui est vendu

### Cadre réel

- **Loi-cadre 03-22** (dahir 1-22-76, BO 7152 du 15/12/2022) abroge la loi-cadre 18-95 ; dispositifs : soutien **principal** (projet ≥ **50 M DH** et ≥ **50 emplois stables** — décret n° 2-23-1 + arrêté du Chef du gouvernement n° 3-13-23, BO 7184 : prime commune ≤ 30 % du primable, + prime territoriale + prime sectorielle), dispositif **stratégique** (grands projets), dispositif **TPME** et dispositif **rayonnement international** (décrets spécifiques).
- Gouvernance : CRI guichet unique ; AMDI (**loi 60-16**) prospection/promotion ; Commission nationale de l'investissement (conventions, caractère stratégique).

### La douleur

- « L'État finance mon projet de 300 000 DH » : non. Les 30 % de prime dont parlent les posts LinkedIn ont un ticket d'entrée à deux chiffres en millions. Le MRE déçu du salon devient le client du conseil **honnête** qui a dit non au moment où les autres vendaient.
- Le TPME et les aides sectorielles existent (fonds Maroc PME etc.) — à instruire dossier par dossier, jamais promis au diagnostic.

**Coût si non traité** : business plan surévalué, structuration inutile (holding offshore « pour toucher les aides ») qui crée du change et de la fiscalité pour rien.

## 8. La gouvernance à distance : l'associé fantôme

### Cadre réel

- Loi 5-96 : liberté statutaire large pour la SARL (decisions collectives, gérance, cessions de parts entre vifs soumises à agrément sauf exceptions — point à vérifier au texte consolidé et à rédiger en conséquence).
- La clause qui compte : **liste d'actes réservés à l'assemblée** (emprunt, garantie, cession d'actif, rémunération du gérant), **information périodique contractuelle** (trimestrielle, sur support numérique), **agrément des cessions**, **cession forcée / sortie** en cas de décès ou de désaccord, **comptes rendus d'AG annuels** — la même que celle qui débloque les dividendes (§3 : pas d'AG, pas de PV, pas de transfert).

### La douleur

- Le cousin-gérant qui « tient la société » pendant six ans sans AG = comptabilité invérifiable + dividendes jamais déclarés + parts cédées « d'un accord oral » (DOC art. 443 : au-delà de 10 000 DH, la preuve est littérale).

**Coût si non traité** : la société existe, le contrôle a disparu — et la reprise de contrôle est une mission contentieuse à 5 chiffres.

## 9. Synthèse

| # | Douleur | Base réelle | Le produit qui la règle (`03`/`13`) |
| :--- | :--- | :--- | :--- |
| 1 | Création à distance | Loi 5-96 ; apostille La Haye 1961 | Pack M1 (création) + kit procuration S1/S2 |
| 2 | Résidence fiscale | CGI art. 23 s. ; conv. 1970 art. 2 | Note résidence (dans M1) ou mission M2 |
| 3 | Dividendes double imposition | Conv. 1970 art. 13/25 ; CGI (RAS 11,25 % → 10 %) | M2 + tableau S5 |
| 4 | Change / rapatriement | IGOC 2026 (`oc.gov.ma`) | M3 dossier devises (S4) |
| 5 | Établissement stable | Conv. 1970 art. 10 s. | M2 + relecture organisation (S6) |
| 6 | Protection investissement | TBI 1996 FR ; CIRDI (Washington 1965, Maroc 1967) ; 03-22 art. 37-38 | M2 structuration amont (S7) |
| 7 | Charte : mythes vs seuils | Loi-cadre 03-22 ; décret 2-23-1 ; arrêté 3-13-23 | Diagnostic honnête (S3) |
| 8 | Gouvernance à distance | Loi 5-96 (rédaction statutaire) | Clauses M1 + refonte M4 (S8) |

---

## Lecture professionnelle — d'où viennent ces douleurs (spécifique MRE)

Contrairement aux niches 1-4 où la douleur naît d'un **choix de statut sans projet**, ici elle naît d'un **délai** : la résidence fiscale se joue sur l'année, le TBI sur la date de l'investissement, la convertibilité sur la trace bancaire de l'apport, la gouvernance sur l'absence annuelle d'AG. Le client MRE arrive toujours **après** le point de non-retour partiel — d'où deux postures : (1) vendre l'audit d'amont (M2) aux futurs, (2) vendre la reprise de contrôle (M4) aux arrivants, sans jamais faire semblant que l'un vaut l'autre.

**Méthode de qualification** (avant toute mission) : 1) Où est le foyer, où sont les 183 jours, où sont les intérêts vitaux (CGI art. 23 s. ; conv. 1970 art. 2) ? 2) L'argent de l'apport vient-il de devises traçables ? 3) Qui signe quoi, où, quand ? 4) Qui détient quoi (parts, comptes, mots de passe bancaires) ? Les réponses déterminent la mission — pas l'inverse.

**Ce que le vault a retiré de cette page** : « loi 20-19 », « convention 1959 », « redressement 30 % » automatique, toute « décision CNDP/Cass./OMPIC » non sourcée — et l'idée que la charte finance les petits projets.

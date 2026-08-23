# 02 — Clause Library 01 · Definitions & Interpretation (Clauses 1–3)

> Premier bloc du MSA bilingue. Les clauses 1 à 3 sur 24 posent le vocabulaire du contrat (definitions), les règles de lecture (interpretation) et votre statut (independent contractor). Mal rédigées, elles contaminent tout le reste : un "Deliverables" flou vaut dix disputes de périmètre. Chaque clause est donnée en miroir FR/EN avec une note de drafting.

**Liens utiles :** [Style guide](01_Style_Guide_Legal_English_vs_Francais_Juridique.md) · [Clause library 02](03_Clause_Library_02_Scope_Fees_Payment_FR_EN.md) · [Freelancers & Agences Offshore](../../02_Niches_Deep_Dive/01_Freelancers_Agencies_Offshore/00_INDEX.md)

## Objectifs

- Verrouiller le vocabulaire contractuel par des defined terms propres.
- Neutraliser à l'avance les disputes d'interprétation (listes exhaustives, titres d'articles).
- Sécuriser votre statut d'indépendant face à un client US : le risque de requalification concerne LE CLIENT autant que vous — c'est votre argument de négo.

## Prérequis

- Fichier 01 acquis (shall/must/may, majuscules, devises).
- Savoir distinguer MSA (contrat-cadre) et SOW (bon de commande de mission) — voir la niche offshore.

## TL;DR

- Definitions = dictionnaire privé du contrat ; tout mot capitalisé doit y figurer, un sens unique par terme.
- Interpretation = clause courte qui coupe l'herbe sous le pied des arguments d'interprétation restrictive.
- Independent contractor = indispensable avec un client US ; elle protège aussi le client contre son propre risque fiscal et social.

## Position dans les 24 clauses

| Clauses | Bloc | Rôle dans l'architecture |
|---|---|---|
| 1 | Definitions | vocabulaire verrouillé |
| 2 | Interpretation | règles de lecture |
| 3 | Independent Contractor Status | statut des parties |
| → 4–9 | fichier 03 | moteur commercial |

---

### Clause 1 — Definitions · Définitions

> **FR :**
> **1.1** Dans le présent Contrat, on entend par :
> – **« Contrat »** : le présent contrat, ses annexes et chaque Bon de Commande ;
> – **« Services »** : les prestations de développement logiciel décrites dans chaque Bon de Commande ;
> – **« Livrables »** : tout code source compilé et documentation d'utilisation remis par le Prestataire au titre des Services, à l'exclusion des dépôts sources, outils internes et préexistances du Prestataire ;
> – **« Bon de Commande » ou « SOW »** : tout document référencé au Contrat décrivant périmètre, délais et prix d'une mission ;
> – **« Informations Confidentielles »** : toute information non publique divulguée par une Partie ;
> – **« Partie »** : le Client ou le Prestataire ; « Parties » : les deux ensemble.

> **EN :**
> **1.1** In this Agreement, the following terms shall have the meanings set out below:
> – "**Agreement**": this agreement, including its schedules and each Statement of Work;
> – "**Services**": the software development services described in each Statement of Work;
> – "**Deliverables**": the compiled code and user documentation delivered by the Provider under the Services, excluding source repositories, internal tools and the Provider's pre-existing materials;
> – "**Statement of Work**" or "**SOW**": any document referenced in the Agreement describing the scope, timeline and fees of an engagement;
> – "**Confidential Information**": any non-public information disclosed by either Party;
> – "**Party**": the Client or the Provider; "**Parties**" means both of them.

*Note de drafting —* La définition des Deliverables EXCLUT explicitement les préexistances : sans cette réserve, un client US considérera que le dépôt Git entier lui appartient. En EN, ordre alphabétique dès que la liste dépasse huit termes.

---

### Clause 2 — Interpretation · Interprétation

> **FR :**
> **2.1** Les intitulés des articles sont donnés pour faciliter la lecture et ne sauraient en affecter l'interprétation.
> **2.2** Le singulier comprend le pluriel et réciproquement.
> **2.3** Toute référence à une disposition légale vise cette disposition telle que modifiée ou remplacée.
> **2.4** Les mentions « y compris », « notamment » et « en particulier » s'entendent sans caractère limitatif.

> **EN :**
> **2.1** Headings are for convenience only and shall not affect interpretation.
> **2.2** Words importing the singular include the plural and vice versa.
> **2.3** Any reference to a statute or statutory provision includes that provision as amended or re-enacted from time to time.
> **2.4** The words "including", "in particular" and "for example" mean "including without limitation".

*Note de drafting —* Le 2.4 neutralise l'ejusdem generis common law : sans lui, une liste devient limitative devant un juge US. Quatre phrases, zéro dispute d'interprétation — le meilleur ratio valeur/poids du contrat.

---

### Clause 3 — Independent Contractor Status · Statut de prestataire indépendant

> **FR :**
> **3.1** Le Prestataire exécute les Services en qualité de prestataire indépendant, et non en qualité de salarié, agent ou représentant du Client.
> **3.2** Le Prestataire détermine librement ses horaires et ses moyens d'exécution, sous réserve des délais et des Livrables convenus.
> **3.3** Chaque Partie supporte ses propres cotisations sociales et ses propres impôts. Le présent Contrat ne crée ni société de fait, ni coentreprise entre les Parties.

> **EN :**
> **3.1** The Provider performs the Services as an independent contractor, and not as an employee, agent or representative of the Client.
> **3.2** The Provider determines freely its working hours and methods of performance, subject to the deadlines and Deliverables agreed.
> **3.3** Each Party bears its own social contributions and taxes. Nothing in this Agreement creates a partnership or joint venture between the Parties.

*Note de drafting —* Avec une LLC américaine, cette clause protège surtout LE CLIENT : elle éloigne son risque de requalification salariale (IRS) et de cotisations rétroactives. C'est pourquoi elle passe presque toujours en négo — présentez-la comme un service rendu au client, pas comme une exigence.

## Cas pratique

Hicham (SaaS B2B) signe avec une scale-up berlinoise un contrat SANS définition de "Deliverables". À la livraison, le client réclame le dépôt Git complet, les pipelines CI et la documentation interne ; Hicham pensait livrer l'application conteneurisée et sa doc utilisateur. Deux semaines de blocage, un avenant imposé à prix cassé pour récupérer les sources. Avec la clause 1 ci-dessus (exclusion des dépôts sources) et un SOW précis (clause 4), le périmètre tient en deux lignes et le litige n'existe pas.

## Erreurs Top 5

| # | Erreur | Conséquence | Coût |
|---|--------|-------------|------|
| 1 | Traduire « il est stipulé que » par "it is stipulated that" | style archaïque repéré immédiatement | crédibilité −50 % |
| 2 | Un terme capitalisé utilisé mais non défini | ambiguïté exploitable en litige | clause attaquable |
| 3 | Deux définitions concurrentes du même terme | interprétation contra proferentem contre VOUS | ⚠️ avenant à prix cassé |
| 4 | Absence de clause Interpretation | listes transformées en limitatives | périmètre rogné |
| 5 | Statut indépendant omis avec LLC US | client panique sur son exposition IRS | ❌ deal perdu net |

## Checklist

- [ ] Chaque mot capitalisé du contrat figure dans la clause 1
- [ ] Un seul sens par defined term, aucune contradiction
- [ ] Interpretation couvre titres, singulier/pluriel, lois as amended, including without limitation
- [ ] Statut indépendant présent dès qu'il y a prestation de services
- [ ] Cohérence avec votre régime réel (auto-entrepreneur, société) côté CNSS/impôts

## QCM

**Q1.** Un terme apparaît capitalisé ("Deliverables") mais ne figure pas dans la clause Definitions :
A. effet automatiquement nul
B. sens commun applicable, mais zone grise exploitable par l'adversaire
C. le contrat est invalide

> **Réponse : B —** aucun effet automatique, mais chaque zone grise est une dispute potentielle. Règle : tout mot capitalisé = défini, tout mot défini = capitalisé.

**Q2.** À quoi sert le "including without limitation" posé par la clause 2 ?
A. à faire joli
B. à empêcher que vos listes soient lues comme exhaustives
C. à limiter les obligations

> **Réponse : B —** c'est l'antidote contractuel à l'ejusdem generis : la liste illustre, elle ne borne pas.

**Q3.** Votre client US résiste à la clause Independent Contractor :
A. abandonnez, c'est secondaire
B. expliquez qu'elle protège AUSSI son exposition IRS/CNSS
C. acceptez un lien de subordination

> **Réponse : B —** argument gagnant dans 9 cas sur 10 : la clause sécurise le client d'abord, vous ensuite.

## Fiches révision — 3 cartes

**Carte 1 — Definitions :** dictionnaire privé ; tout capitalisé défini, tout défini capitalisé ; exclure explicitement vos préexistances des Livrables.

**Carte 2 — Interpretation :** 4 lignes qui valent une assurance : titres neutres, singulier/pluriel, lois as amended, listes non limitatives.

**Carte 3 — Statut indépendant :** horaires/moyens libres, impôts séparés, ni société ni agence ; argument de vente : protège le client US de son propre risque.

## AR - ملخص ومصطلحات

| FR | EN | AR |
|----|----|----|
| définitions contractuelles | definitions clause | تعريفات العقد |
| interprétation des clauses | interpretation | تفسير البنود |
| prestataire indépendant | independent contractor | متعاقد مستقل |
| livrables | deliverables | التسليمات |
| requalification salariale | employee misclassification | إعادة التكييف القانوني |
| contrat-cadre | master services agreement (MSA) | عقد إطاري |

**Darija :**
- L'definitions hiya l'qamous dyal l'kontra : kol kelma kbira khassha ma3na wa7ed b7alha — ila kan shi ghmam, ghadi ytkellfo 3lik nta.
- Mli kat9ol l'client l'americain "hadi clause kathmik nta mn l'IRS", kaywe9ef l'ni9ach w kayseftlek signature f nhar.

---
**Sources primaires :** impôts.gouv.fr (convention FR-Maroc) · sgg.gov.ma (DOC, Loi 09-08) · cndp.ma · ICC-arbitration.org / CIMAC (arbitrage). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Modèles = points de départ à adapter au dossier ; convention écrite + provision art.30 avant mission. Secret professionnel art.36. QCM pédagogique — aucun certificat.

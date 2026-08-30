# 02 — Clause library 01 : Definitions & Interpretation (clauses 1-3)

> **À quoi ça sert :** le premier bloc du MSA bilingue — le dictionnaire privé du contrat (definitions), les règles de lecture (interpretation) et le statut des parties (independent contractor). **Pour qui :** l'avocat qui assemble sa clauselibrary maîtresse FR/EN ou qui démonte un contrat client : mal rédigées, ces trois clauses contaminent tout le reste. Temps de lecture : 15 minutes.

**Liens :** [Style guide](01_Style_Guide_Legal_English_vs_Francais.md) · [Clause library 02](03_Clause_Library_02_Scope_Fees_Paiement.md) · [Niche Freelancers & Agences Offshore](../../02_Niches_Deep_Dive/01_Freelancers_Agencies_Offshore/00_INDEX.md)

## 1. POURQUOI : verrouiller le vocabulaire avant de négocier le prix

Un "Deliverables" flou vaut dix disputes de périmètre. Les clauses 1 à 3 ne coûtent rien à rédiger et économisent des mois de blocage : elles décident à l'avance qui possède quel mot, comment se lit une liste, et quel lien (ou absence de lien) unit les parties. Avec un client US, la clause de statut indépendant protège AUSSI le client contre son propre risque de requalification (IRS) — c'est votre argument de négociation.

## 2. COMMENT : les trois clauses miroir FR/EN

### Clause 1 — Definitions · Définitions

> **FR :**
> **1.1** Dans le présent Contrat, on entend par :
> – **« Contrat »** : le présent contrat, ses annexes et chaque Bon de Commande ;
> – **« Services »** : les prestations de développement logiciel décrites dans chaque Bon de Commande ;
> – **« Livrables »** : tout code source compilé et documentation d'utilisation remis par le Prestataire au titre des Services, à l'exclusion des dépôts sources, outils internes et préexistances du Prestataire ;
> – **« Bon de Commande »** ou **« SOW »** : tout document référencé au Contrat décrivant périmètre, délais et prix d'une mission ;
> – **« Informations Confidentielles »** : toute information non publique divulguée par une Partie ;
> – **« Partie »** : le Client ou le Prestataire ; **« Parties »** : les deux ensemble.

> **EN :**
> **1.1** In this Agreement, the following terms shall have the meanings set out below:
> – "**Agreement**": this agreement, including its schedules and each Statement of Work;
> – "**Services**": the software development services described in each Statement of Work;
> – "**Deliverables**": the compiled code and user documentation delivered by the Provider under the Services, excluding source repositories, internal tools and the Provider's pre-existing materials;
> – "**Statement of Work**" or "**SOW**": any document referenced in the Agreement describing the scope, timeline and fees of an engagement;
> – "**Confidential Information**": any non-public information disclosed by either Party;
> – "**Party**": the Client or the Provider; "**Parties**" means both of them.

*Note de drafting —* La définition des Livrables EXCLUT explicitement les préexistances : sans cette réserve, un client US considérera que le dépôt Git entier lui appartient. En EN, ordre alphabétique dès que la liste dépasse huit termes.

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

*Note de drafting —* Le 2.4 neutralise l'*ejusdem generis* de common law : sans lui, une liste devient limitative devant un juge US. Le 2.3 est votre assurance-vie dans un paysage légal marocain en mouvement (loi 66-23 en transposition, facturation électronique en déploiement) : le contrat suit la réforme sans être rouvert. Quatre phrases, zéro dispute d'interprétation — le meilleur ratio valeur/poids du contrat.

### Clause 3 — Independent Contractor Status · Statut de prestataire indépendant

> **FR :**
> **3.1** Le Prestataire exécute les Services en qualité de prestataire indépendant, et non en qualité de salarié, agent ou représentant du Client.
> **3.2** Le Prestataire détermine librement ses horaires et ses moyens d'exécution, sous réserve des délais et des Livrables convenus.
> **3.3** Chaque Partie supporte ses propres cotisations sociales et ses propres impôts. Le présent Contrat ne crée ni société de fait, ni coentreprise entre les Parties.

> **EN :**
> **3.1** The Provider performs the Services as an independent contractor, and not as an employee, agent or representative of the Client.
> **3.2** The Provider determines freely its working hours and methods of performance, subject to the deadlines and Deliverables agreed.
> **3.3** Each Party bears its own social contributions and taxes. Nothing in this Agreement creates a partnership or joint venture between the Parties.

*Note de drafting —* Collision civil/common law : en droit marocain du travail, la requalification s'attache aux faits (lien de subordination), pas aux mots — la clause 3 ne suffit jamais seule si le client impose horaires et lieu. Du côté US, elle éloigne le risque de *misclassification* et de cotisations rétroactives du client : présentez-la comme un service rendu au client, pas comme une exigence. Elle passe presque toujours en négociation pour cette raison.

## 3. EXEMPLE : le cas Hicham

Hicham (SaaS B2B) signe avec une scale-up berlinoise un contrat SANS définition de "Deliverables". À la livraison, le client réclame le dépôt Git complet, les pipelines CI et la documentation interne ; Hicham pensait livrer l'application conteneurisée et sa doc utilisateur. Deux semaines de blocage, un avenant imposé à prix cassé pour récupérer les sources. Avec la clause 1 ci-dessus (exclusion des dépôts sources) et un SOW précis (clause 4, fichier 03), le périmètre tient en deux lignes et le litige n'existe pas.

## 4. Erreurs d'application (Top 5)

| # | Erreur | Conséquence |
|---|---|---|
| 1 | Traduire « il est stipulé que » par "it is stipulated that" | style archaïque repéré immédiatement |
| 2 | Un terme capitalisé utilisé mais non défini | ambiguïté exploitable en litige |
| 3 | Deux définitions concurrentes du même terme | interprétation contre le rédacteur |
| 4 | Absence de clause Interpretation | listes transformées en exhaustives, périmètre rogné |
| 5 | Statut indépendant omis avec une LLC US | le client panique sur son exposition fiscale, deal perdu |

## 5. Checklist

- [ ] Chaque mot capitalisé du contrat figure dans la clause 1
- [ ] Un seul sens par defined term, aucune contradiction
- [ ] Interpretation couvre titres, singulier/pluriel, lois as amended, including without limitation
- [ ] Statut indépendant présent dès qu'il y a prestation de services
- [ ] Cohérence avec le régime réel du prestataire (auto-entrepreneur, société) côté CNSS/impôts
- [ ] Miroir FR/EN relu : aucun sens divergent entre les deux versions

## 6. QCM express

**Q1.** Un terme apparaît capitalisé ("Deliverables") mais ne figure pas dans la clause Definitions :
A. effet automatiquement nul · B. sens commun applicable, mais zone grise exploitable · C. contrat invalide

> **Réponse : B.** Aucun effet automatique, mais chaque zone grise est une dispute potentielle. Règle : tout mot capitalisé = défini.

**Q2.** À quoi sert le "including without limitation" posé par la clause 2 ?
A. à faire joli · B. à empêcher que vos listes soient lues comme exhaustives · C. à limiter les obligations

> **Réponse : B.** C'est l'antidote contractuel à l'*ejusdem generis* : la liste illustre, elle ne borne pas.

**Q3.** Votre client US résiste à la clause Independent Contractor :
A. abandonnez · B. expliquez qu'elle protège AUSSI son exposition IRS · C. acceptez un lien de subordination

> **Réponse : B.** Argument gagnant dans la quasi-totalité des cas : la clause sécurise le client d'abord, vous ensuite.

> **Lecture pro :** les grands MSA américains ouvrent sur vingt pages de définitions alphabétiques — ce n'est pas de la verbosité, c'est la trace des litiges passés. Chaque defined term que vous négligez aujourd'hui sera l'argument de l'adversaire demain ; la clause 1 est votre assurance à prime nulle.

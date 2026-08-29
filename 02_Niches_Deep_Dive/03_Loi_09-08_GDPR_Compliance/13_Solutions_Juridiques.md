# 13 — Solutions Juridiques : le playbook douleur → parade (03_Loi_09-08_GDPR_Compliance)

> **Le chaînon** : `02` liste les 11 douleurs data, `03` vend les missions — ici, **la solution juridique elle-même** : formalité, registre, clause rédigée, procédure, délai, piège. Douleurs numérotées comme dans `02_Douleurs_Juridiques.md`. Base vérifiée 28/08/2026 : sanctions réelles **art. 64 (10k-100k défaut formalités) / art. 65 (pénal)** — pas les « 50k/300k » fantaisistes ; CJUE **C-311/18 Schrems II** et **C-673/17 Planet49** (réels) ; la CNDP ne publie pas de décisions de sanction numérotées (voir `09_Jurisprudence_Niche.md`).

## Table de correspondance

| Douleur (02) | Solution | Livrable | Mission (03) |
| :--- | :--- | :--- | :--- |
| 1. Registre absent | S1 — registre 7 colonnes + cartographie | `05_Document_Bank/templates/05_Registre_09-08_Modele.md` | Pack PME |
| 2. Déclaration vs autorisation | S2 — tableau de régime + dépôt CNDP | dossier type | Pack PME + additionnel |
| 3. Mentions absentes | S3 — politique par couches (9 rubriques) | modèle | Pack / mission light |
| 4. Cookies | S4 — bandeau refus = acceptation + GTM | script + annexe cookies | Pack PME |
| 5. Sécurité | S5 — plan de mesures techniques/organisationnelles | annexe sécurité | Audit + plan 90j |
| 6. Transferts hors Maroc | S6 — clauses de transfert + TRA + autorisation si requis | clause type + SCC 2021/914 | Mission 3 |
| 7. Sous-traitants | S7 — avenant data 8 clauses | bibliothèque de clauses | Mission 3 |
| 8. Droits des personnes | S8 — procédure + registre des demandes | formulaire + SLA | inclus + abo |
| 9. Prospection | S9 — opt-in prouvé + registre des consentements + purge | case type | inclus |
| 10. Double régime UE | S10 — alignment : registre art. 30, breach 72h, DPA, représentant | pack UE | Mission 4 |
| 11. Levée de fonds | S11 — memo data + index datas room | dossier conformité | abo + ponctuel |

---

## S1 — Le registre : une cartographie vivante, pas un PDF mort

**Le mécanisme.** Le registre (obligation du régime des formalités — numéro d'article à prendre au texte consolidé `sgg.gov.ma`) est la **clé de voûte** : sans lui, chaque autre obligation (information, durée, sécurité, transfert, droits) est indémontrable, et c'est la première pièce demandée en contrôle.
**La solution.** Un tableau à 7 colonnes par traitement : `identification du traitement` | `finalité(s)` | `base légale (consentement, contrat, intérêt légitime — notion GDPR introduite même en 09-08)` | `catégories de données & personnes` | `durées de conservation (par finalité, pas « au mieux »)` | `destinataires (dont sous-traitants §S7 + pays)` | `mesures de sécurité (§S5) + transfert (§S6)`.
**Méthode de production.** Atelier 2h avec les métiers (RH : « on garde les CV 5 ans » = une ligne du registre) ; version unique Notion/Excel, export PDF **daté** — un registre sans date d'audit n'est pas un registre.
**Piège.** Les données oubliées : le Drive partagé avec les exports clients, les backups non chiffrés, le tableur RH sur le laptop perso du dirigeant — la cartographie les révèle, c'est son utilité (et sa friction commerciale).

## S2 — Le tableau de régime : déclarer ou demander une autorisation ?

**Le mécanisme.** Données « ordinaires » → formalité déclarative ; données **sensibles** (santé, biométrie, génétique, opinions, vie sexuelle, origines, adhésion syndicale, données bancaires selon nature) → **autorisation préalable CNDP**. Confondre les deux, c'est payer deux fois : dépôt tardif + reprise du dossier.
**La solution.** Un tableau à 4 questions par traitement : (1) contient-il une catégorie sensible — vérifier **le module produit**, pas seulement le fichier (un SaaS RH avec suivi des arrêts maladie = données santé) ; (2) finalité et base légale ; (3) transfert hors Maroc ? ; (4) régime applicable (déclaration / autorisation / régime allégé le cas échéant). Puis **dossier de dépôt** : formulaires CNDP (`cndp.ma`), description complète, récépissé archivé — le numéro de déclaration figurera dans la politique (« traitement déclaré à la CNDP sous le n° D-M-XX/AAAA » — format réel, preuve vérifiable).
**Piège.** Le « mais ce n'est pas médical » du dirigeant : un questionnaire d'assurance avec état de santé est un traitement de données sensibles — la qualification suit la finalité et le risque de discrimination, pas l'intitulé du module.

## S3 — La politique de confidentialité par couches (les 9 rubriques)

1. Identité + contact du responsable (et du délégué le cas échéant) ; 2. Finalités par traitement + bases légales ; 3. Catégories de données ; 4. Destinataires (sous-traitants nommés) + **pays de destination** (transferts §S6) ; 5. Durées de conservation par finalité ; 6. Droits (accès, rectification, opposition — + effacement/portabilité si UE) **et comment les exercer** : email dédié, délai annoncé (15 jours côté CNDP / 1 mois GDPR), réclamation CNDP ; 7. Mineurs (si audience concernée — concours, apps) ; 8. Cookies (§S4) ; 9. Versions FR/AR/EN selon audience (le FR fait foi). Modèle par rubriques dans `05_Document_Bank` — **jamais de politique « générée »** : le générateur ne connaît ni vos sous-traitants ni vos durées.

## S4 — Cookies : le bandeau qui résiste (Planet49)

**La solution.** Bandeau avec **« Tout refuser » au même niveau visuel que « Tout accepter »** ; case pré-cochée = refus (CJUE C-673/17) ; consentement enregistré (horodatage + version du bandeau) ; le refus ne dégrade pas le service (seuls destraceurs essentiels exemptés) ; alternative technique : mesure d'audience auto-hébergée (Matomo/Plausible configurés) = dépendance au bandeau fortement réduite. Livrable au dev : configuration GTM + **liste des cookies tiers (finalité, durée, pays)** — cette liste est l'annexe de la politique §S3.

## S5 — Sécurité : les deux listes qui rendent l'obligation démontrable

**La solution.** Annexe au plan d'action, à la portée du CTO : (1) **techniques** — chiffrement au repos et en transit, cloisonnement des environnements (les données clients ne vont pas en dév), MFA sur l'admin, sauvegardes chiffrées, journalisation des accès ; (2) **organisationnelles** — habilitations par rôle (qui voit quoi dans HubSpot), onboarding/offboarding avec retrait des accès à J+0, procédure incident (§S10), revue annuelle, clauses sous-traitants (§S7). La loi 09-08 impose des mesures « appropriées » ; l'appropriation se prouve par ce document daté — c'est le bouclier de l'auditeur comme du juge.

## S6 — Transferts hors Maroc : la clause + l'analyse (TRA), l'autorisation quand requis

**Le mécanisme.** Tout hébergeur/SaaS étranger (AWS, HubSpot, Zendesk) = transfert. Le régime marocain : pays reconnus / garanties contractuelles / autorisation CNDP — numérotation au texte consolidé, mécanique inchangée : **une clause + une mention dans la politique + la demande quand il le faut.**
**La clause type (à insérer au contrat fournisseur ou à vérifier dans son DPA en ligne) :**
> « Le Sous-Traitant ne procède à aucun transfert de Données en dehors du Royaume du Maroc, sauf vers un pays bénéficiant d'une décision de la CNDP ou sous garanties contractuelles appropriées, après information préalable du Responsable de traitement. En cas de demande d'accès émanant d'une autorité publique locale, le Sous-Traitant notifie sans délai le Responsable (sauf interdiction légale) et limite la communication au strict minimum requis. »
**Le dossier « cloud US ».** Activer les **SCC 2021/914** (les grands fournisseurs les proposent) + **TRA** (Transfer Risk Assessment : qui accède depuis où, chiffrement, porteur des clés) — l'architecture post-Schrems II est la même côté marocain (les garanties demandées sont comparables). Livrable de fin de mission : matrice `outil → pays → clause → date` — c'est ce tableau qu'un client UE ou un investisseur réclame.

## S7 — Sous-traitants : l'avenant data en 8 clauses (09-08 / GDPR art. 28)

Tout prestataire touchant des données personnelles (SaaS, centre d'appels, community manager, agence avec accès analytics) reçoit un **avenant ou DPA** : 1. instructions documentées du responsable ; 2. confidentialité nominative des habilités ; 3. mesures de sécurité (renvoi §S5) ; 4. **pas de sous-traitance en cascade sans accord écrit** + liste annexée ; 5. notification des incidents **sous 24-48h** ; 6. assistance aux demandes de droits (§S8) ; 7. audit documentaire sur demande (bornée : 1/an, sur rendez-vous) ; 8. restitution ou destruction en fin de contrat, avec preuve. Pour les grands SaaS, l'avocat ne renégocie pas le DPA en ligne : il le **lit, l'archive et le connecte au registre**. Le vrai chantier : l'appel center de Casa et la freelance qui détient le fichier — ceux qui n'ont rien signé.

## S8 — Droits des personnes : la procédure qui désamorce le contrôle

Email dédié (`privacy@`), registre des demandes (entrée : date, identité, droit demandé ; sortie : réponse + délai — 15 jours Maroc / 1 mois UE), lettre-type d'accusé + de réponse (accueil, vérification d'identité, périmètre, recours CNDP). Une demande d'accès ignorée est la porte d'entrée du contrôle complet — une procédure écrite de 5 lignes coûte 30 minutes de paramétrage et clôt 90% des demandes. Suivi dans l'abonnement (Mission 5).

## S9 — Prospection : l'opt-in archivé, pas l'excuse

**Le mécanisme.** Marketing direct SMS/WhatsApp/email = consentement préalable **prouvé** (case non pré-cochée distincte de la case conditions, mention, STOP fonctionnel testé). Participer à un concours ≠ consentir au marketing : deux cases, deux finalités.
**La solution.** Refonte des formulaires (case marketing séparée + durée), **purge documentée** de l'existant (contacts sans preuve = base gelée, jamais revendue — l'effacement fait partie de la parade), registre des consentements (contact, date, source, preuve), contrôle trimestriel du STOP (message de désabonnement testé). Le gain commercial à vendre : la base purgée convertit mieux que la base gonflée.

## S10 — Alignment UE : un seul registre, deux vues

Pour servir des clients UE : registre **enrichi art. 30 GDPR** ; **procédure de violation 72h** (détection → qualification → notification : via le client responsable de traitement ou directe selon le rôle, registre des incidents) ; **DPA de réponse** (quand le client envoie le sien : analyse clause par clause, contre-propositions — audit documentaire, plafonnement de responsabilité, notification 48h, sous-traitance ultérieure) ; avis art. 27 (représentant UE) selon volumes ; SCC pour les flux UE↔Maroc ; politique en couches (droits GDPR + réclamation CNIL/CNDP). La bascule se fait **sans second registre** — un seul tableau, deux formats : c'est l'argument qui fait vendre la Mission 4 par-dessus le Pack PME.

## S11 — Data room de levée : le memo qui répond avant les questions

L'investisseur demandera : registre ? récépissés CNDP ? DPA signés ? incidents ? transferts ? politique ? — un **memo de conformité data (3-5 pages)** + index des preuves répond aux 4/5 questions, la datas room au reste. Livrable de fin de Pack PME, maintenu à l'abonnement. (Le cas Hicham, `07_Cas_Pratique_Complet.md`, se termine par un contrat UE signé précisément parce que ce dossier existait.)

---

## Matrice de priorisation (le plan 90 jours en un coup d'œil)

| Action | Déclencheur qui rend la solution urgente | Délai réaliste |
| :--- | :--- | :--- |
| S1+S2 (cartographie + régime) | Toujours — fondation du dossier | 10 jours |
| S3+S4 (politique + bandeau) | Site en ligne, trafic, pixels | 10-14 jours |
| S6+S7 (transferts + sous-traitants) | SaaS hébergés hors Maroc / centre d'appels | 10 jours |
| S9 (opt-in) | Campagne SMS en cours | 7 jours (gel + refonte) |
| S10 (UE) | Un DPA reçu | 14 jours |
| S5 (sécurité) | Toujours — mais plan d'action client (l'avocat spécifie, le client implémente) | continu |

## Le « stack » par persona

* **Hicham (SaaS B2B, clients UE)** : S1→S2→S7→S6→S10 — pack complet + alignment + abonnement (20-25k HT sur 5 semaines).
* **Nadia (e-commerce structurée)** : S1+S3+S4+S9 — le Pack PME 8-12k.
* **Omar (healthtech/fintech)** : S2 d'abord — le produit entier est sous régime **autorisation** : dossier long, à forte valeur (15-25k), et c'est le diagnostic qui l'explique avant que la CNDP ne le rappelle.

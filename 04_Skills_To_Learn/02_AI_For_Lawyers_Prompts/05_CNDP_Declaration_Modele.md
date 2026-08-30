# 05 — CNDP : L'Usage de l'IA comme Traitement (Registre & Déclaration)

> **Le point mort que personne ne documente :** dès qu'un texte client (même anonymisé) traverse un service d'IA étranger, tu as un **traitement de données** avec un sous-traitant et souvent un **transfert hors Maroc** — deux notions de la loi 09-08. Cette fiche explique quoi déclarer, quoi journaliser, et comment le faire proprement sur cndp.ma.

## POURQUOI c'est un traitement

La loi 09-08 protège toute personne **identifiable**. Après le protocole fiche 03, la question n'est plus « est-ce des données personnelles ? » mais : (a) l'anonymisation est-elle **réellement** réussie (recoupement impossible) ? (b) si elle ne l'est pas parfaitement, le traitement est soumis aux formalités ; (c) le destinataire est hors Maroc → l'**autorisation préalable** de la CNDP s'applique aux transferts de données personnelles hors du royaume (art. 31 et suivants). Un cabinet qui utilise l'IA chaque semaine ne peut pas raisonner « cas par cas » sans trace : il documente un **système**.

## COMMENT — le tri en 3 questions (avant de déclarer quoi que ce soit)

```
1. Le texte envoyé contient-il une personne identifiable
   (même indirectement, par recoupement) ?
   ├─ NON (anonymisation niveau 3 vérifiée) → pas de données
   │   personnelles → PAS de formalité IA, MAIS ligne au registre
   │   de méthode ("journal des usages IA")
   └─ OUI → 2.
2. Le destinataire est-il hors Maroc ?
   ├─ OUI → transfert = autorisation préalable CNDP (art. 31).
   │   En pratique jeune cabinet : NE PAS envoyer. Revenir à
   │   l'anonymisation (fiche 03) ou au local (fiche 07).
   └─ NON (prestataire marocain agréé / auto-hébergé) → 3.
3. Déclaration du traitement au registre + formalité CNDP
   adaptée (voir modèle ci-dessous).
```

Le message opérationnel : la voie « conforme » d'un usage d'IA régulier n'est pas d'autoriser des transferts vers OpenAI/Anthropic US — elle est **l'anonymisation stricte** (alors la question du transfert se pose moins) et/ou **l'auto-hébergement**.

## COMMENT — le journal des usages IA (à minima)

Un onglet Notion ou un CSV, 5 colonnes, tenu à jour à chaque nouvel usage :

| Colonne | Exemple |
|---|---|
| Date / outil | 2026-09-02 / Claude (UE accès via API) |
| Nature des données | Textes de loi publics / brouillons anonymisés |
| Finalité | Assistance rédactionnelle interne |
| Mesure prise | Protocole fiche 03 appliqué, opt-out entraînement activé |
| Sortie validée ? | Oui — avocat signataire [initiales] |

Ce journal ne remplace pas le **registre des traitements** (fiche 09 du dossier Legal Tech Stack), il s'y relie : le registre dit « il y a un usage IA » ; le journal dit « lequel, avec quoi, validé par qui ».

## Modèle de fiche de déclaration (extrait, à adapter)

La déclaration se fait par le **formulaire en ligne sur cndp.ma** (gratuit ; la CNDP publie formulaires et notices — ne cite jamais un numéro de délibération que tu n'as pas sous les yeux). Pour un traitement « assistance IA interne » :

```
Responsable : Cabinet [Nom], avocat, barreau de [Ville]
Finalité : assistance rédactionnelle interne — brouillons,
  reformulations, extractions ; sorties validées par l'avocat
  avant tout usage externe
Catégories de données : textes anonymisés ou publics ; AUCUNE
  donnée d'identification directe des clients (protocole interne
  d'anonymisation annexé au registre)
Base légale : intérêt légitime au fonctionnement du cabinet ;
  exécution de mission pour les documents clients (à manier avec
  prudence : préférer l'anonymisation qui fait sortir du champ)
Destinataires : prestataire technique d'IA [nom, pays] —
  engagement contractuel de non-utilisation pour l'entraînement
Transferts hors Maroc : [si transferts résiduels : mentionner
  qu'une autorisation préalable est requise (art. 31) et décrire
  les mesures : minimisation, anonymisation, ou auto-hébergement]
Durées : prompts non conservés au-delà de la session (paramétré) ;
  brouillons validés : durée du dossier
Droits : contact@cabinet.ma — accès, rectification, opposition
Sécurité : 2FA, opt-out entraînement, journal des usages
```

## COMMENT — l'information des personnes

Dans la politique de confidentialité du site, une phrase sobre suffit si l'usage est interne sur données anonymisées : « Le cabinet peut utiliser des outils d'assistance à la rédaction ; les textes soumis au sont préalablement anonymisés, aucune donnée client identifiable n'est transmise. » Si un jour tu traites des données identifiables via un outil IA (cas extrême, autorisé) : la finalité et les destinataires doivent figurer dans l'information du client, et l'autorisation de transfert suivre.

## Opt-out d'entraînement : ce que ça règle et ne règle pas

| Régle | Ne règle PAS |
|---|---|
| Ton texte ne sert pas (ou moins) à entraîner le modèle | La confidentialité de la session (le texte transite et peut être journalisé temporairement) |
| Claude (API/enterprise) : pas d'entraînement par défaut selon les conditions du fournisseur — à vérifier dans les CGU du jour | La valeur légale d'un envoi hors Maroc non autorisé |
| OpenAI : « Training on your business data is off by default » selon la documentation — à vérifier au moment du choix | Le secret professionnel : l'opt-out n'est pas un agrément |

Formulation prudente dans tes fiches internes : « selon les conditions du fournisseur à la date d'usage, à revérifier » — pas de promesse éternelle.

## Cas concret : Fatima demande « puis-je mettre les emails de mes clients dans ChatGPT pour répondre plus vite ? »

C'est un traitement de données personnelles par un sous-traitant hors Maroc, pour une finalité commerciale — et la réponse pro du cabinet est exactement la matière de cette fiche : (1) interdiction en l'état (transfert non autorisé + base légale faible) ; (2) alternative documentée : auto-hébergement d'un modèle open source sur un serveur marocain/UE + base de réponses validée ; (3) mission de conformité qui va avec (registre, information clients, durées). Voilà l'IA devenue un objet de mission, pas un gadget — et chiffrable (retainer 2 500-4 500 DH HT/mois ou mission ponctuelle).

## FAQ formalités (les 4 questions qui reviennent)

**« Usage occasionnel (5 prompts/mois sur du public), je déclare ? »** — Pas de traitement de données personnelles : pas de formalité IA ; le journal des usages, si, et une ligne au registre sur la méthode. L'exception n'existe que si elle est écrite dans le journal.

**« Et si tout est local (Ollama) ? »** — Rien ne sort du cabinet, pas de destinataire étranger : la discussion de transfert tombe, le registre garde la ligne « outil interne ».

**« Les brouillons stockés dans mon compte Claude, ce sont des données ? »** — Si l'anonymisation a été appliquée, non. C'est précisément pour ça que le protocole fiche 03 existe AVANT l'envoi, pas après.

**« Un client me demande ce que je déclare, à lui ? »** — Sa donnée n'est pas la tienne : information dans la convention/lettre de mission (« assistance technique sur données anonymisées, aucune transmission identifiable »), c'est plus propre qu'un long discours et ça protège les deux.

## Renouvellement et revue

- **Annuel** : relire la fiche de déclaration si un usage nouveau est apparu (un agent, une transcription automatique, un outil d'e-discovery) — les traitements évoluent plus vite que les formulaires.
- **À chaque incident** (fuite, envoi non anonymisé découvert après coup) : ligne d'incident au journal + évaluation « y a-t-il eu divulgation de données personnelles » — la réponse conditionne la formalité, pas l'inverse.

## Erreurs classiques

1. Croire que l'anonymisation « rend la déclaration impossible à contester » : elle rend surtout le transfert inutile. Documente les deux.
2. Ne jamais consulter cndp.ma (« de toute façon on ne me demandera rien ») : le jour où un client se plaint, l'absence de formalité devient le sujet du dossier.
3. Confondre RGPD et 09-08 dans les écrits clients : une boutique qui vend à l'UE cumule les deux régimes (RGPD pour les personnes UE, 09-08 pour le responsable marocain et ses transferts) — détaillé `02_Niches_Deep_Dive\03_Loi_09-08_GDPR_Compliance\`.
4. Inventer des références : pas de « délibération n° XX-YY » sans le PDF sous les yeux — une seule fois suffit à griller un cabinet en public.

> **Lecture pro :** l'objectif n'est pas de « se mettre en règle pour l'IA » mais de rendre l'usage de l'IA **prouvable comme sobre** : journal tenu, protocole appliqué, transferts évités. C'est ce dossier-là que tu montres, le jour où la question t'est posée — et c'est aussi ce que tu vendras à tes clients e-commerce.

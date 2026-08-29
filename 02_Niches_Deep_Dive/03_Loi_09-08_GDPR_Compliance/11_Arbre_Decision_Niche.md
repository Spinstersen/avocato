# 11 — Arbre Décision (03_Loi_09-08_GDPR_Compliance)

> Version data de `01/11_Arbre_Decision_Niche.md` : l'arbre ne parle plus statut/chiffre d'affaires, mais flux de données.

## L'arbre : mon entreprise est-elle dans le périmètre, et sous quel régime ?

```
Collectez-vous des données personnelles ? (clients, employés, prospects,
cookies, caméras, même un simple formulaire de contact)
├─ NON → (n'existe pas en pratique) → retour case questions 02_Douleurs §1
└─ OUI → Ces données incluent-elles du SENSIBLE ?
    (santé, biométrie, géolocalisation temps réel, opinions, données bancaires
    selon nature, vie sexuelle, syndical, religion)
    ├─ OUI → AUTORISATION CNDP préalable (art. 12-14) — le régime déclaration
    │   ne suffit PAS. Mission : audit régime + dossier d'autorisation.
    │   Ex. Omar healthtech → 15 000-25 000 HT, délai long.
    └─ NON → Traitez-vous des personnes dans l'UE ? (clients UE, ciblage
        actif : site EUR/langue UE, marketing UE, monitoring)
        ├─ OUI → DOUBLE RÉGIME : 09-08 (Maroc) + GDPR (art. 3(2))
        │   ├─ Un DPA client à signer/négocier ? → Mission 4 (5-8k HT)
        │   ├─ Représentant UE ? avis art. 27 selon volumes
        │   └─ Registre au format art. 30 + procédure breach 72h
        └─ NON → Régime 09-08 seul :
            ├─ Pas de registre → Mission 2 Pack PME (8-12k HT) — en urgence
            │   relative : première pièce du contrôle
            └─ Registre existe → revue annuelle + Missions 3/5 selon
                sous-traitants/transferts

HORS BRANCHES MAIS TOUJOURS VÉRIFIÉ :
• Hébergement ou SaaS hors Maroc ? → art. 43-44 transferts (Mission 3)
• Prospection SMS/WhatsApp/base achetée ? → preuve de consentement (1ᵉʳ contentieux CNDP en volume — chiffres publiés)
• Levée de fonds en vue ? → la datas room posera toutes ces questions —
  faire l'arbre maintenant, pas pendant la due diligence
```

## Filtre 5 questions (pré-qualif téléphonique, 3 min)

*   [ ] Combien de bases de données contiennent des noms/emails/téléphones ? (client, employés, prospects, candidats)
*   [ ] Quelque chose touche-t-il la santé, la biométrie, la géolocalisation ? (sinon déclaration, pas autorisation)
*   [ ] Hébergez-vous ou faites-vous traiter hors Maroc ? (AWS, HubSpot, Zendesk, appel center)
*   [ ] Avez-vous des clients/partenaires UE, ou un DPA en négociation ?
*   [ ] Une personne sait-elle répondre à une demande d'accès cliente en moins de 15 jours ?

3+ réponses « non/je ne sais pas » → diagnostic 1 200 HT le mois même. Uniquement des « oui » → prospect mûr pour l'abonnement, pas le pack.

## Traduire l'arbre en mission (vendeur vs déontologique)

| Réponse dominante | Mission à proposer | Ce qu'on ne dit PAS |
| :--- | :--- | :--- |
| « On n'a jamais entendu parler de la CNDP » | Diagnostic → Pack 09-08 PME | « Vous risquez 300 000 DH » |
| « On a un module santé » | Audit régime + autorisation (délai long) | « C'est pareil qu'une déclaration » |
| « Notre client UE envoie un DPA » | Alignment GDPR + réponse DPA clause par clause | « Signez, c'est standard » |
| « On est sur AWS mais en Irlande » | Transferts (art. 43-44 + Schrems II, accès US) | « Serveur Europe = conforme » |
| « On fait des campagnes WhatsApp » | Consentement + registre des preuves + purge | « Tout le monde le fait » |

---

## Comment lire l'arbre sans le subir

L'arbre n'est pas un automate qui décide à la place du client. Il hiérarchise les questions préalables : 1) y a-t-il des données personnelles (oui, toujours) ; 2) sensibles ou non (le régime se joue là : autorisation vs déclaration) ; 3) des personnes UE ou non (le second régime se joue là : applicabilité extraterritoriale art. 3(2)) ; 4) des flux hors Maroc ou non (le troisième chantier : transferts). Chaque branche renvoie à une mission avec convention — pas à un produit panier.

**Pour la conformité data** : l'arbre évite l'erreur la plus coûteuse — choisir le remède avant le diagnostic. Le client qui demande « un registre » sans savoir qu'un module santé exige une autorisation paiera deux fois ; celui qui demande « le pack GDPR » sans traitement UE achète du vent. La première question n'est jamais le prix, jamais le document — c'est : **quelles données, chez qui, où, pourquoi, combien de temps ?**

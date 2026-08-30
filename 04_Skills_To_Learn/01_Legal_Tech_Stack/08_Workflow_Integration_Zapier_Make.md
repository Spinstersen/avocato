# 08 — Workflow & Intégration Zapier / Make (No-Code)

> **Le deal :** trois scénarios automatisés (intake → CRM, RDV → agenda, signature → archivage) suppriment ≈5 h/semaine de copier-coller. Make (ex-Integromat, ≈9 $/mois, hébergé UE) est le premier choix pour un cabinet marocain soucieux de la loi 09-08 ; Zapier (≈20-30 $/mois, US) si l'ergonomie prime. Et un budget 0 reste possible : batch manuel de 10 min chaque matin.

## POURQUOI automatiser précisément ces trois flux

Ces trois flux sont les seuls où le manuel coûte cher et où l'erreur est grave : un prospect Tally non recopié = un lead mort ; une convention signée non archivée = une preuve perdue ; un RDV non posé dans l'agenda = un double-booking devant client. Tout le reste (factures, relances) reste manuel tant que tu fais moins de 10 opérations identiques par semaine. Règle d'or en bas de fiche.

## COMMENT — Scénario 1 : Tally → Notion + email (le lead vivant)

**Make :** module « Tally — Watch Responses » → filtre (score >5 ?) → « Notion — Create Database Item » (BDD PROSPECTS : Nom→Title, Email, Source, Problème→Notes) → « Gmail — Send » au prospect.

Email verbatim (réponse humaine assistée, pas un robomail) :

```
Objet : Votre demande a bien été reçue
Bonjour [Prénom],
J'ai bien reçu votre message et je reviens vers vous sous 24 h
avec un lien de réservation pour un diagnostic de 45 minutes.
Bien à vous,
[Nom] — Avocat, barreau de [Ville]
```

Points de vigilance : le module Notion attend les **noms exacts de propriétés** (fiche 02) ; teste avec une soumission fictive portant le nom « TEST-NE-PAS-CONTACTER » ; active « Data-loss prevention » Make (ne plante pas si Notion rate l'appel).

## COMMENT — Scénario 2 : Calendly/Cal.com → Google Calendar + Notion + notification

**Make :** « Calendly — Watch Event Created » → « Google Calendar — Create Event » (lieu Meet auto) → « Notion — Update Item » (PROSPECT : DiagnosticBooké = date, NextTouch = J+1 post-diagnostic) → notif Slack ou email `contact@`.

Cal.com (self-host ou cloud) expose les mêmes webhooks — si tu pars sur Cal.com pour l'UE, ce scénario se branche à l'identique. Si le prospect n'existe pas encore dans Notion (RDV pris sans intake), le scénario crée un PROSPECT minimal : l'automatisation ne doit jamais *perdre* une entrée.

## COMMENT — Scénario 3 : Yousign/Docuseal → Drive + Notion + mail

**Make :** « Yousign — Watch Envelope Completed » (webhook) → « Google Drive — Upload File » (le PDF signé) dans `00_CLIENTS/[CodeClient]/00_CONVENTIONS/` → « Notion — Update Item » (MISSION : ConventionSignée = true, statut → « Prod ») → « Gmail — Send » au client :

```
Objet : Convention signée — votre mission démarre
Bonjour [Prénom],
La convention est signée de part et d'autre — la version PDF est
archivée et je vous en joins une copie.
La mission démarre à réception de la provision de 50 %
(2 900 DH HT de mission → 1 450 DH de provision — RIB ci-joint).
Dès validation du virement, je vous envoie le planning détaillé
par une première vidéo.
Bien à vous,
[Nom]
```

(Le message rappelle la provision parce que J0 du délai contractuel = encaissement, pas signature — la phrase évite trois relances.)

Docuseal auto-hébergé expose les mêmes webhooks (payload `signature` avec URL du document) — le scénario 3 se transpose module par module.

## Make vs Zapier (le choix expliqué)

| Critère | Make | Zapier |
|---|---|---|
| Prix entrée | ≈9 $/mois (≈10 k opérations) | ≈20-30 $/mois |
| Hébergement | UE (Prague) → argument 09-08 | US |
| Courbe d'apprentissage | Visuelle mais dense | La plus simple du marché |
| Connecteurs Notion/Yousign | Les deux existent | Les deux existent |
| Verdict cabinet | Oui par défaut | Oui si équipe non technique |

## Sans Make ni Zapier : le batch manuel (budget 0)

Chaque matin, 10 min chronométrées : (1) notifications Tally/Calendly/Yousign traitées dans l'ordre ; (2) recopie dans Notion avec le raccourci « New prospect » du dashboard ; (3) la règle « réponse sous 24 h » tient sans automation. Tolérable jusqu'à ~10 prospects/mois ; au-delà, le scénario 1 se paie tout seul.

## Débogage (les 5 pannes classiques)

1. **Webhook non reçu** : le destinataire (Make/Zapier) a changé d'URL → re-tester l'envoi depuis Yousign « Resend webhook ».
2. **Doublons Notion** : le scénario tourne deux fois (trigger « Watch » + bouton Run once) → vérifier les runs dans l'historique Make.
3. **Échec silencieux Tally** : formulaire dupliqué en version brouillon → brancher la bonne version.
4. **Drive permissions** : le compte de service (OAuth) doit être membre du Drive partagé, pas seulement du My Drive.
5. **Les données de test** : toute soumission test est taguée `TEST` — et le scénario Notion ignore `TEST`, sinon tes KPI PROSPECTS sont faux dès le premier jour.

## Scénario 4 (seulement quand les autres tournent) : relance provision J+3

**Make :** « Notion — Search Items » (missions statut « Convention signée » ET provision non cochée ET date convention ≤ aujourd'hui-3) → « Gmail — Send » (relance template fiche 12) → « Notion — Update Item » (NextAction = « relance provision J+3 envoyée »). Un seul envoi par case : la case « relancée » empêche le doublon — une relance automatique répétée est une faute commerciale.

## Ordre d'adoption des scénarios (et leur preuve de rentabilité)

| Étape | Scénario | Preuve que ça marche (2 semaines) |
|---|---|---|
| 1 | Tally → Notion | 100 % des submissions créent une fiche (audit manuel vs automatisé) |
| 2 | Calendly → agenda + Notion | Zéro RDV non tracé |
| 3 | Yousign → Drive + Notion | 100 % conventions archivées sans intervention |
| 4 | Relance provision | +X provisions encaissées à J+7 — à compter |

Si une étape échoue 3 fois de suite (webhook mort, champs renommés), on revient au manuel et on ne « corrige pas en production » un flux de preuve.

## Sécurité et hygiène des scénarios

1. **Moindre privilège** : le connecteur Notion de Make n'accède qu'aux pages BDD nécessaires (pas tout le workspace) ; même logique Drive (dossier `00_CLIENTS` seulement).
2. **Webhooks = secrets** : l'URL de webhook Make est un identifiant confidentiel — jamais dans un post LinkedIn, jamais dans le code public du site.
3. **Données en transit** : les scénarios qui touchent des prospects passent par Make (UE) plutôt que Zapier (US) ; le payload ne contient que les champs du Tally, jamais une pièce jointe client.
4. **Journal** : chaque scénario a une ligne au registre 09-08 (fiche 09) — un automatisation est un traitement.
5. **Nommage** : `S1_tally_notion`, `S3_yousign_drive_notion` — si un scénario meurt dans 8 mois, son nom doit dire ce qu'il faisait.

## Règle d'or

> **Automatise après 10 répétitions manuelles, pas avant.** Automatiser un processus que tu changes encore (ton texte d'email de relance, tes questions d'intake) = payer pour detruire ton propre template chaque semaine. D'abord la routine humaine stable, ensuite le scénario.

## Maintenance mensuelle (15 min)

- [ ] Historique des runs Make/Zapier : 0 erreur
- [ ] Un test de bout en bout : soumettre Tally « TEST » → vérifier Drive + email reçu
- [ ] Les 3 scénarios notés au registre 09-08 (fiche 09) : chaque scénario qui touche des données prospect = un traitement documenté

> **Lecture pro :** l'intégration no-code n'est pas de la technique, c'est de la comptabilité de temps : chaque scénario a un coût d'abonnement fixe et un gain horaire à estimer honnêtement — si le scénario 1 ne débloque que 2 h/mois et coûte 9 $, il est rentable ; si c'est 15 minutes, garde le batch manuel.

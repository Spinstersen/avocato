# 09 — Workflow livrable client : du brief Notion à la signature Yousign

> La chaîne de production d'un livrable designé — convention, devis, note, contrat — est un pipeline, pas un artisanat d'inspiration. Cinq étapes, une nomenclature de fichiers, deux contrôles qualité, et des règles de confidentialité intégrées : c'est ce qui permet de livrer en 7 jours sans sacrifier ni le droit ni la forme.

## POURQUOI un workflow écrit (encore un)

Parce que le livrable est la preuve physique de la vente : le client qui a payé 2 900 DH HT un pack juge la mission sur le fichier qu'il reçoit. Parce que l'ADHD du solo-cabinet improvise magnifiquement et archive catastrophiquement — sans nomenclature, un dossier client devient une archéologie de `CONTRAT_final_v3(2).pdf`. Et parce qu'un pipeline connu permet de déléguer le jour où une assistante arrive, sans refaire le monde.

## COMMENT — les 5 étapes de la chaîne

```
1. BRIEF (Notion)          → 2. GABARIT (Canva T1-T4)   → 3. CONTRÔLE (fichier 10)
   contenu juridique           duplication + remplissage    checklist 10 points
   périmètre, livrables        NEVER from scratch            + relecture LanguageTool
                                                                      ↓
5. SIGNATURE & ARCHIVE  ← 4. LIVRAISON (Drive + restitution) ←   export PDF impression
   Yousign, provision           lien + email sobre           + version éditable
   reçu, statut Notion
```

1. **Brief** — la page Notion de la mission porte déjà tout : le périmètre signé (ce que la convention liste), le vocabulaire du client (SES mots relevés au diagnostic), les montants exacts. Le design n'invente rien : il met en forme un contenu validé.
2. **Gabarit** — dupliquer T1/T2/T3/T4 (fichier 03 du dossier), remplir, respecter la grille ; les crochets `[]` sont des champs obligatoires (nom, barreau, RIO, dates). Durée cible : 15-25 min pour une convention de 8 pages.
3. **Contrôle qualité** — la checklist du fichier 10, exécutée AVANT export ; c'est un contrôle à deux yeux : l'export PDF relu sur mobile (le client lira peut-être là), puis sur écran.
4. **Livraison** — Drive (`Clients/[Réf]/Livrables/`) + email sobre (objet : « Vos livrables — [Réf] ») + une restitution qui explique COMMENT lire le document : Loom 3-5 min si le client est autonome, visio Zoom ou cabinet 20-30 min si les questions sont attendues (une page par minute ; c'est le livrable qui fait la différence perçue, pas l'effet).
5. **Signature & archive** — Yousign si signature ; provision 50 % encaissée (virement contre reçu) avant kickoff ; statut Notion passe à « Livré » ; nommage final archivé.

## COMMENT — la nomenclature (une règle, zéro exception)

```
[Réf mission]_[Type]_[Client]_[version].[ext]
CH-2026-014_Convention_Yassine_v1.pdf
CT-2026-014_ContratPrestation_Yassine_FR-EN_v2.pdf
NR-2026-009_NoteRisques_Fatima_v1.pdf
Carousel_09-08_2026-05_v1.pdf
```

- `v1`, `v2` : JAMAIS « final », « FINAL2 », « bis » — la version finale est celle du dossier Notion, pas du nom de fichier.
- Les exports intermédiaires (brouillons, PNG de test) vivent dans un dossier `_scratch/` purgé chaque vendredi (rituel ADHD `06_ADHD_System/06_Weekly_Review_Planning.md`).
- Les visuels clients archivés avec le dossier : convention + version Canva liée (lien) pour éviter les dérives post-signature.

## COMMENT — les garde-fous de confidentialité dans la chaîne

1. **Jamais un livrable d'un client A comme « exemple » du client B** sans accord écrit — et dans le doute, jamais.
2. **Aucun logo, nom ou capture identifiable** dans un portfolio, un carrousel ou une plaquette (rappel fichier 02).
3. **Données personnelles dans les livrables** (pièces d'identité, bases clients) : stockage Drive à accès restreint, partage par lien expirant, mention de traitement 09-08 dans la collecte (art. 64 loi 09-08 : 10 000-100 000 DH d'amende en cas de manquement — la vraie fourchette, pas les légendes).
4. **Anonymisation avant IA** : si un prompt sert à une relecture de forme, le texte passe d'abord par le protocole d'anonymisation (`02_AI_For_Lawyers_Prompts/03_Anonymisation_Protocole.md`) — jamais de données clients brutes dans un outil externe.
5. **Secrétisme professionnel** : le dossier Drive du cabinet est classé par mission, pas par « marketing » — un livrable client n'est PAS un asset de communication.

## EXEMPLE — le cas Karim (MRE, chaîne complète)

> J0 : diagnostic 45 min visio → convention d'honoraires (T1 dupliqué, 12 min) envoyée par Yousign dans la foulée ; provision 50 % virement reçu J+2 contre reçu PDF (T4).
> J+3 à J+18 : pack création SARL-AU — statuts, PV, bordereaux OMPIC (débours chiffrés au bordereau du jour, jamais « tout compris ») ; chaque pièce nommée `CH-2026-021_Statuts_Karim_v1.pdf` etc.
> J+18 : livraison par Drive + restitution « comment lire vos statuts et quoi faire à la banque » (Loom 5 min, ou session Zoom / au cabinet).
> J+20 : statut Notion « Livré » ; le dossier `_scratch/` purgé au vendredi ; aucune des pièces n'est réutilisable en communication — la confidentialité n'a pas de case « sauf pour un bon post ».

## Erreurs d'application

1. **Designer avant de rédiger** : ouvrir Canva avant que le contenu ne soit validé produit des allers-retours infinis ; la chaîne est BRIEF→FORME, jamais l'inverse.
2. **Sauter le contrôle mobile** : un tableau de périmètre illisible sur téléphone est un tableau que le client ne verra jamais — le client décide sur mobile, l'avocat relit sur 27 pouces.
3. **Livrer sans restitution** : le document sans explication se surinterprète ; 3 minutes de voix (ou 30 minutes de live) évitent 30 minutes de questions (et installent l'autorité pédagogique).
4. **Nommager « à la main » à chaque fois** : la nomenclature est un copier-coller de modèle Notion ; ce qui n'est pas automatisé n'est pas appliqué.

## COMMENT — les délais cibles par livrable (ce que le pipeline doit tenir)

| Livrable | Fabrique Canva | Contrôle + envoi | Engagement client (convention type) |
|----------|----------------|------------------|--------------------------------------|
| Note de risques | 20 min | 15 min | 24 h après diagnostic |
| Devis / facture | 10 min | 10 min | 24-48 h |
| Convention d'honoraires | 25 min | 15 min + lecture lente des montants | le jour de l'accord |
| Contrat FR/EN (pack 2 900) | 1 h (dont rédaction) | 30 min | 7 jours |
| Pack e-commerce (5 900) | 1 h 30 | 30 min | 14 jours |
| Bascule SARL-AU | rédaction hors gabarit | checklist 10 | 30 jours + débours |

Ces temps sont des PLAFONDS de production, pas des objectifs de rentabilité : si un livrable dépasse son plafond deux fois de suite, ce n'est pas une question de design — c'est le gabarit (zone mal pensée) ou le brief (contenu non figé) qui est en cause ; on corrige la chaîne, pas l'horloge.

## COMMENT — la page Notion « production » de chaque mission (les 6 champs)

1. **Statut du pipeline** : brief → gabarit → contrôle → livraison → signature → archive (un seul actif).
2. **Gabarit source** : lien vers la page Canva (le « où est le fichier » ne doit JAMAIS être une question).
3. **Checklist qualité** : le bloc A-D du fichier 10, copié en cases, avec la date de passation.
4. **Exports** : les deux liens (PDF signature + PDF archive) et la version éditable du fond.
5. **Preuve d'envoi** : l'email ou le message de livraison (le client qui dit « je n'ai rien reçu » se fait répondre par un lien, pas par une fouille).
6. **Chiffres livrés** : les montants exacts qui figurent dans les pièces, croisés avec la convention — l'erreur de transcription entre devis et convention est l'erreur bête n° 1, et elle est juridique, pas cosmétique.

## COMMENT — l'archive et la reprise (le jour où le client revient)

À la clôture de mission : le dossier Canva est **dupliqué, jamais verrouillé** — la reprise (avenant, nouvelle version du contrat, refonte) repart d'une copie propre au nom de la nouvelle référence. La version signée reste intouchable, nommée `_SIGNATIVE`, avec la preuve Yousign jointe. Le `_scratch/` de la mission est purgé ; la page Notion passe en « archivée » avec la mention du kit de reprise : « gabarit T2, variante client, dernière mise à jour [date] » — c'est ce qui transforme un dossier mort en point de départ à 15 minutes.

## COMMENT — les trois exceptions au pipeline (et leur procédure propre)

**Exception 1 — l'urgence client (« il me faut ça ce soir »).** Le pipeline se plie, jamais ne saute : version express = T3 seul (la note) + « le contractuel suit demain ». La provision est déjà acquise (convention signée au diagnostic) : la livraison anticipée ne se paye pas, elle se limite — ce soir, la note ; la semaine, les pièces.

**Exception 2 — la pièce non designable (acte notarié, bordereau OMPIC, courrier du greffe).** Elle sort du pipeline et entre dans le dossier « pièces brutes » avec une seule règle de mise en forme : PDF scanné net, nommé, joint à la livraison. Le template ne s'applique pas à un document qu'on ne rédige pas — plaquer une identité sur un acte d'un tiers est un faux visuel.

**Exception 3 — la collaboration à distance (client qui « retouche »).** Sur un contrat FR/EN bilingue, le client envoie des commentaires Word : la navette se fait dans le texte (Google Docs / Word), et la FIN de navette (dernière version validée) se remet en forme Canva — jamais l'inverse. Un avocat ne signe pas un PDF dont l'historique est opaque : la chaîne de version NOTION est la preuve.

## COMMENT — le standard de livraison en trois lignes (à coller dans les emails d'envoi)

> « Vos livrables sont dans le dossier Drive [lien] : version PDF pour l'usage, version éditable pour l'archive, note de lecture de 4 minutes. Le dossier reste votre propriété juridique ; la copie du cabinet est classée sous [réf], accessible sur demande. »

Trois lignes qui font le travail de dix : elles disent QUOI, OÙ, À QUI — et elles posent le cadre de confidentialité sans que le client ait à le demander (rappel discret du secret professionnel, sans le dramatiser).

## COMMENT — la revue de pipeline (mensuelle, 15 minutes)

Une fois par mois, sur les missions closes du mois écoulé :

1. Où ai-je cassé le pipeline ? (urgence, paresse, oubli — les trois causes) ; chaque cassure a une case dans la page Notion de la mission.
2. Quel template n'a pas été réutilisé alors qu'il aurait dû ? (le template qui meurt est un template qu'on n'a pas fini de garnir).
3. Quel fichier a demandé plus de temps que son plafond (tableau ci-dessus) — et pourquoi : le brief, la forme, ou le fond ?
4. Les chiffres livrés ont-ils été revus contre la convention ? (la case 6 de la page production ; cette question, posée deux fois, ne se pose plus).

Le pipeline se corrige comme une méthode de vente : un point de friction identifié → un réglage d'écritures (template, nomenclature, case de checklist), pas une promesse de vigilance.

> **Lecture pro :** construis le squelette de pipeline dans Notion une fois (statuts : brief → gabarit → contrôle → livraison → signature → archive) et fais tourner tous tes livrables dedans pendant trois missions. À la troisième, le workflow est invisible — et c'est là qu'il vaut quelque chose.

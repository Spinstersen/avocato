# 09 — Sécurité, Backup & Conformité 09-08 de la Stack

> **La stack est conforme si les données le sont.** Backup 3-2-1, chiffrement des pièces sensibles, registre à jour, transferts hors Maroc maîtrisés. Cette fiche est le point d'ancrage « sécurité » du dossier ; le détail juridique 09-08 vit dans `02_Niches_Deep_Dive\03_Loi_09-08_GDPR_Compliance\`.

## POURQUOI un plan de sauvegarde avant le premier client

Un cabinet sans papier perd trois choses en un incident : les conventions signées (la preuve), les livrables en cours (la mission), et les brouillons d'articles (l'acquisition). Un crash de disque ou une perte de compte Notion sans export = reconstruction impossible. Le backup n'est pas de l'hygiène informatique, c'est de la continuité professionnelle — et l'assurance de ne jamais dire à un client « je rouvre le dossier la semaine prochaine ».

## COMMENT — la règle 3-2-1 appliquée au cabinet

**3 copies, 2 supports, 1 hors-site :**

| Copie | Support | Fréquence | Outil |
|---|---|---|---|
| 1. Production courante | Cloud (Drive + Notion) | Continu | — |
| 2. Export Notion | Fichier local chiffré | Hebdo (dimanche, 5 min) | Settings → Export → Markdown & CSV → Cryptomator |
| 3. Disque externe | Local + coffre/confrère (hors-site) | Mensuel | SSD + Cryptomator ; double chez un confrère ou coffre banque |

- **Drive** : versioning natif 30 jours (suffisant) ; les PDF de factures et conventions signées partent aussi sur le disque (ce sont des originaux de preuve).
- **Test de restauration** (le backup non testé n'existe pas) : premier dimanche du trimestre, restaurer 1 page Notion et 1 dossier Drive depuis le disque → 20 min chronométrées.

## COMMENT — chiffrement et compartiments

1. **Cryptomator** (gratuit/open source) : un coffre `CLIENTS_SENSIBLES.chiffré` qui vit dans Drive mais que le cloud ne lit jamais — pièces d'identité, contrats signés, correspondance contentieuse.
2. **Le triptyque Notion (US)** : dans Notion, CodeClient + fourchettes + brouillons pseudonymisés. Identifiants réels = coffre chiffré ou Nextcloud/Proton Drive (UE/local). « Données client identifiables = UE ou local » est la ligne rouge du vault.
3. **1Password (≈3-5 $/mois/pers.) ou Bitwarden (≈10 $/an)** : tous les mots de passe de la stack, TOTP dedans, jamais dans Notion.
4. **2FA systématique** : Google, Notion, Yousign, Make, nom de domaine. Le domaine est le compte le plus dangereux (récupération de domaine = récupération des emails clients).
5. **Nextcloud (OVH UE, ≈5-25 €/mois selon offre)** ou **Proton Drive** : le coffre-fort alternatif à Google Drive pour les dossiers sensibles, si tu veux un hébergement UE par principe.

## COMMENT — les formalités 09-08 de la stack

### 1. Registre des traitements (obligatoire, 1 page suffit)

Modèle : `05_Document_Bank/templates/05_Registre_09-08_Modele.md`. Une ligne par traitement, 8 colonnes : finalité, base légale, catégories de données, destinataires, durées, transferts hors Maroc (oui/non + régime), mesures de sécurité, contact.

Traitements types d'un jeune cabinet : `Gestion des prospects (Tally/Calendly)` — `Exécution des missions (Drive/Notion/Yousign)` — `Facturation et comptabilité` — `Mesure d'audience (Plausible)` — `Automatisations (Make)`. Chaque outil ajouté = une ligne mise à jour (réflexe de la checklist fiche 12).

### 2. Déclarations et autorisations CNDP

- Les traitements de données à caractère personnel se **déclarent** à la CNDP via les formulaires en ligne sur **cndp.ma** (gratuit, ~30 min) ; la déclaration doit précéder la mise en œuvre.
- Les **transferts hors Maroc** (art. 31 et s.) sont soumis à **autorisation préalable** de la CNDP : c'est le cas structurel de Notion/Google/Zapier/Tally dès qu'ils reçoivent des données identifiables. Pratique défendable pour un jeune cabinet : minimisation + pseudonymisation (cf. coffre) et préparation d'une demande d'autorisation pour les traitements qui exportent vraiment — la CNDP instruit au cas par cas, ne jamais écrire « c'est autorisé » sans numéro de récépissé.
- Sanctions du défaut de formalités : **art. 64** (amende 10 000-100 000 DH) et **art. 65** (jusqu'à 3 ans d'emprisonnement pour les infractions pénales les plus graves). Jamais de montant inventé dans tes posts — la précision fait l'autorité.

### 3. Information des personnes

Page « Confidentialité » du site : qui collecte (le cabinet), pourquoi, durées (prospects : 2 ans sans nouvelle), destinataires (sous-traitants listés), droits (contact@cabinet.ma), et mention des transferts hors Maroc le cas échéant.

## Secret professionnel et cloud : la synthèse pratique

| Donnée | Où elle a le droit de vivre |
|---|---|
| Index, planning, brouillon anonymisé | Notion / Google |
| Pièce d'identité, dossier pénal, contentieux sensible | Coffre chiffré (Cryptomator) ou Nextcloud UE — pas de cloud US en clair |
| Convention signée | Drive (client + toi) + disque de backup ; copie PDF au dossier |
| Échange client « chaud » (menaces, litige) | Pas en DM LinkedIn ; email chiffré ou téléphone |

## Exemple : le rituel de sécurité en 4 moments

- **Quotidien (10 s)** : aucune pièce d'identité glissée dans une page Notion partagée.
- **Hebdo (5 min)** : export Notion chiffré sur disque.
- **Mensuel (20 min)** : copie Drive→disque, revue des partages de liens (Drive « n'importe qui avec le lien » → restreindre).
- **Trimestriel (1 h)** : test de restauration, rotation des mots de passe critiques (domaine, Google admin, CNDP), mise à jour du registre (nouvel outil ? IA ?), audit des accès (le stagiaire parti a-t-il perdu son accès Notion le jour même ?).

## Plan d'intervention en cas d'incident (le jour où, pas le si)

| Incident | Immédiat (1 h) | Ensuite \(48 h\) | Client |
|---|---|---|---|
| Téléphone perdu/volé | Effacer à distance (Find my / MDM) ; changer les mots de passe mobile-first (email, app 2FA) | Vérifier et fermer les sessions actives (Google, Notion) | Si données locales non chiffrées : évaluer l'exposition, formalité CNDP si données personnelles |
| Compte Notion/Google piraté | Réinitialisation + 2FA renforcée + sessions révoquées | Logs de connexion ; restauration depuis le backup si modification suspecte | Information si un document client était accessible |
| Rançongiciel / Drive corrompu | Isoler (couper la synchronisation) | Restauration depuis le disque 3-2-1 ; vérifier la date du dernier export | Priorité aux dossiers en cours |
| Envoi au mauvais destinataire | Retrait si fenêtre encore ouverte, sinon assumption | Qui a vu quoi, donnée sensible ou non | Transparence mesurée : informer le client concerné, c'est la confiance qui survit |
| Fuite via lien public oublié | Restreindre le lien | Audit complet des partages Drive/Loom | Si une convention exposée : consigner, en tirer la leçon |

Ce tableau vit dans le registre de sécurité du cabinet, avec une simulation par an (une après-midi, dossier fictif).

## Phishing : les trois emails qui font mal à un cabinet

1. **« Votre compte Notion va expirer »** (fausse URL notion-security) : seul le portail administré compte, la souris sur le lien répond en deux secondes.
2. **« Facture à régler » au nom du cabinet** : règle commune avec ton comptable — aucun paiement sans vérification du RIB déjà connu.
3. **« Message judiciaire sécurisé » avec pièce à ouvrir** : les notifications de juridiction ne passent pas par un lien mail non sollicité ; on appelle le greffe.

Réflexe universel : l'attaque qui réussit chez les cabinets n'exploite pas une faille technique, elle exploite l'urgence d'un humain.

## Partager avec le client : la bonne manière

- Dossier Drive nommé au **code client** (`CL-012`) — les noms de dossiers fuient dans les captures et les recherches partagées.
- Partage par email nominatif du client, limité au dossier de sa mission, expiration d'accès quand l'outil la permet.
- Pièce signée sensible : lien restreint + code d'accès envoyé par un second canal ; le WhatsApp n'est pas un canal d'archive.
- Après clôture : les accès du client sont révoqués, les PDF restent dans ton archive — le client garde sa copie, toi la tienne.

## Erreurs classiques

1. Backup = « je fais confiance à Google » → un compte suspendu (signalement algorithmique) = tout perdu ; la copie 3 existe pour ça.
2. Chiffrer « pour plus tard » et stocker 40 conventions brutes sur Notion dès le client n°3.
3. Oublier le **registre** : en cas de contrôle CNDP, c'est le premier document demandé — une ligne par outil, 15 min à tenir à jour.
4. Mots de passe dans un fichier `mdp.txt` sur le Drive (oui, ça arrive chaque année).
5. Tout externaliser à l'outil et ne plus savoir où est la **seule copie de preuve** de la convention — l'original compte, les copies vivent ailleurs.

## La sauvegarde en une phrase de protocole client

« Les documents de votre dossier existent en trois copies, dont une hors de nos locaux ; en cas d'incident, votre convention signée et vos livrables sont restaurables sous 48 heures. » — Cette phrase va dans la lettre de mission : la sécurité devient un argument de réassurance, chiffré en engagement, vérifiable par tous.

> **Lecture pro :** la sécurité du cabinet se juge au pire jour — celui où tu perds ton téléphone, ton compte et ton disque en même temps. Si après ça il te reste le coffre chiffré chez le confrère et le registre à jour, tu as un système ; sinon tu as une habitude. Les deux dossiers IA (fiche 03 du dossier `02_AI_For_Lawyers_Prompts`) appliquent exactement le même triptyque : pseudonyme, coffre, registre.

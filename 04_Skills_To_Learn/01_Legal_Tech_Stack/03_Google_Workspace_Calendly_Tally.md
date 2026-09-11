# 03 — Google Workspace + Calendly/Cal.com + Tally

> **Trois briques, un objectif :** être joignable, bookable et renseignable en moins de 24 h. L'email pro (`prenom@cabinet.ma`) porte la crédibilité, le lien de RDV porte la conversion, le formulaire d'intake porte la qualification. Setup complet en 1 h 30, étapes cliquables ci-dessous.

## POURQUOI cet ordre

Un jeune cabinet perd des prospects à trois endroits : mail parti en spam (deliverability mal réglée), échange de 6 SMS pour caler un RDV (friction), et discovery non qualifiée qui « manquait de budget » (intake absent). Chaque brique ci-dessous ferme une de ces fuites.

## COMMENT — 1. Google Workspace (30 min)

1. Acheter le domaine `cabinet.ma` (registraire marocain ou OVH) ou `.com` si disponibilité — Namecheap/OVH ≈10-15 $/an.
2. Workspace → Business Starter ≈6 $/user/mois → vérifier le domaine (enregistrement TXT Google Site Verification).
3. Configurer les **MX Google** (ASP.L.X.GOOGLE.COM etc., indiqués dans l'admin Console).
4. Créer `prenom@cabinet.ma` + alias génériques `contact@` et `facturation@` (alias, pas des boîtes payantes).
5. **SPF** : TXT `v=spf1 include:_spf.google.com ~all`. **DKIM** : admin Console → Application → Google Workspace → Settings for Gmail → Authenticate email → activer (clé 2048 bits). **DMARC** : TXT `_dmarc` → `v=DMARC1; p=none; rua=mailto:dmarc@cabinet.ma`.
6. Tester : envoyer un mail à un compte Gmail, « Afficher l'original » → `DKIM: PASS` + `SPF: PASS`. Ou mail-tester.com → score ≥8/10.
7. Drive : arborescence `00_CLIENTS/[CodeClient]/[Mission]/` , `01_TEMPLATES/` , `02_COMPTA/` , `03_VIDEOS_LOOM/`.
8. Signature sobre (nom, barreau, adresse, tél, site) — pas de slogan, pas de « meilleure cabinet » ; modèle dans `01_Strategy/01_Rules_Of_The_Game_No_Ads_Morocco/12_Fiches_Pratiques_Avocat.md`.

**Pourquoi c'est critique :** sans DKIM, les confirmations de RDV tombent en spam chez Gmail — ton client ne reçoit pas le lien Meet et te croit désorganisé.

## COMMENT — 2. Calendly / Cal.com (20 min)

Cal.com est recommandé (open source, hébergeable UE, gratuit) ; Calendly ≈10 $/mois si tu veux le zéro-maintenance US.

### Les 3 types d'événements

| Type | Durée | Créneaux | Paiement | Buffer |
|---|---|---|---|---|
| Diagnostic | 45 min | Lun-Jeu 10-12 / 14-17 (Casa Rabat) | 900 DH HT, virement avant le RDV | 15 min avant/après |
| Suivi mission | 30 min | Mar/Jeu 14-16 | Inclus mission | 15 min |
| Atelier | 60 min | 1 mercredi/mois 18h-19h | Gratuit | 30 min (installation) |

### Config pas à pas

1. Connexion Google Calendar → synchronisation aller-retour.
2. Créer les 3 événements ci-dessus, fuseau `Africa/Casablanca`.
3. Lieux : Google Meet (lien auto Calendly/Cal.com → Google Meet).
4. Formulaire de réservation : Nom, Email, **3 questions** (activité, statut juridique, problème principal) — le reste se passe dans Tally.
5. Confirmation auto, sobriété : objet « Votre diagnostic du [date] » ; corps verbatim : « Merci pour votre réservation. Vous recevrez le lien de visio 10 min avant. Préparez vos 3 questions : je vous dirai franchement si je peux vous aider. »
6. Rappels : 24 h et 1 h. Politique annulation : « merci de prévenir 24 h avant ».

**Pourquoi :** le buffer de 15 min est un outil ADHD — il absorbe le dérapage d'une visio sans casser la suivante.

## COMMENT — 3. Tally, formulaire d'intake (20 min)

Tally gratuit (Plus ≈24 $/mois si form avancés) ; alternative UE : Fillout.

### Les 12 questions verbatim

```
1. Prénom et nom
2. Email professionnel
3. Téléphone (WhatsApp si plus pratique)
4. Votre activité ? (dev freelance / e-commerce / créateur de contenu / MRE-investisseur / autre)
5. Statut juridique actuel ? (AE / SARL-AU / SARL / en cours / aucun)
6. CA approximatif ? (<100k / 100-300k / 300-500k / >500k DH ou fourchette devise)
7. Votre problème principal, en 3 lignes ? (libre)
8. Depuis quand ce problème ?
9. Avez-vous déjà un comptable ? un avocat ? (oui/non/les deux)
10. Budget envisagé ? (<1k / 1-3k / 3-10k / >10k DH HT)
11. Comment nous avez-vous trouvé ? (LinkedIn / bouche-à-oreille / atelier / Google)
12. Disponibilités pour un échange 45 min cette semaine ? (libre)
+ consent : "J'accepte que ces données soient utilisées pour répondre à ma demande, conformément à la politique de confidentialité (loi 09-08)."
```

1. **Logique conditionnelle** : CA >400k + statut AE → tag « passage SARL-AU urgent » → dans Notion, Score +2 et NextTouch J+1.
2. Page de merci : « Reçu. Je reviens vers vous sous 24 h avec un lien de réservation. » (Ne mets pas le lien Calendly public : le diagnostic se mérite en 24 h, tu qualifies d'abord.)
3. Intégration : Tally → Make/Zapier → BDD PROSPECTS Notion + email de notif `contact@` (fiche 08).

## Exemple : le pipeline des 3 briques (persona Yassine)

Yassine (dev freelance, client US) trouve ton post LinkedIn → clique lien bio → Tally (12 questions, 2 min) → notif `contact@` → tu crées la fiche PROSPECT, Score 8 → tu réserves via ton lien Calendly « Diagnostic 45 min » → confirmation Meet auto → le diagnostic conclut Pack Freelance 2 900 DH HT → convention (fiche 04) → provision (fiche 06 : virement, pas Stripe). Fatima (e-commerce YouCan) : même pipeline, mais sa question 7 dit « ma boutique collecte des emails de clients espagnols » → tag 09-08 → orientation vers la niche GDPR.

## Conformité 09-08 sur ces trois briques

1. Mention sous le form + lien page « Confidentialité » du site : finalité, durée de conservation, contact `contact@cabinet.ma`.
2. **Transferts hors Maroc** : les données passent par des serveurs US (Google, Calendly, Tally). La loi 09-08 (art. 31) soumet les transferts hors Maroc à **autorisation préalable CNDP** ; en pratique : minimiser les données (le Tally ne demande pas la CIN), ou basculer sur Fillout/Cal.com self-host si le volume de prospects justifie la démarche. Détail : `02_Niches_Deep_Dive\03_Loi_09-08_GDPR_Compliance\`.
3. Registre : 3 lignes « gestion prospects », « prise de RDV », « suivi de mission » (modèle fiche 09).

## Admin Workspace : les 6 réglages qui comptent (20 min, une fois)

1. **2FA obligatoire** pour tous les comptes (admin Console → Sécurité) — le compte admin Google est le compte le plus critique du cabinet avec le domaine.
2. **Récupération verrouillée** : numéro de téléphone de récupération personnel + email de secours hors Google.
3. **Alias de groupe** : `contact@` et `facturation@` comme aliases vers ta boîte — un seul être humain derrière, mais une adresse stable si tu recrutes.
4. **Réponse automatique hors congé** sobre (dates + « réponses différées ») — jamais un motif commercial.
5. **Partage Drive par défaut** : « personnes avec qui le lien est partagé » (pas « tout le monde ») ; les dossiers clients en partage nommé.
6. **Filtre anti-phishing** : règle « si expéditeur extérieur + lien vers domaine inconnu → étiquette VERIFIE » — l'œil humain tranche, le filtre signale.

## Meet : l'usage pro du diagnostic à la clôture

- **Salle d'attente activée** pour les RDV prospects : tu contrôles l'entrée (et tu vois qui arrive à 3).
- **Enregistrement** : accord explicite demandé à l'oral ET mention dans la confirmation ; si le client refuse, pas d'archive — le compte rendu écrit suffit (et le Loom de clôture de ton côté est un autre document, sans image du client).
- **Fond neutre** ou flou : le désordre du bureau ne vend rien.
- Diagnostic : ton écran partage le planning type de mission (un PDF, pas ton bureau Notion complet — les autres clients ne doivent pas exister à l'écran).

## Dépannage express

| Symptôme | Cause probable | Fix |
|---|---|---|
| Tes emails partent en spam Gmail | DKIM absent ou SPF trop permissif | Recréer la clé DKIM 2048, test mail-tester |
| Le client ne reçoit pas le lien Meet | Confirmation partie en spam, ou email d'intake erroné | Rappeler, renvoyer depuis `contact@`, vérifier l'orthographe du mail collecté par Tally |
| Double-booking Calendar | Compte Cal.com non synchronisé avec l'agenda réel | Ne connecter QUE le calendrier de travail |
| Le Tally ne notifie plus | Adresse de notification modifiée | Remettre `contact@`, tester une soumission |
| Lien Calendly partagé « public » qui circule | Le lien de diagnostic mis dans la bio du site | Créer un lien privé par lead ou assumer un lien public sobre sans promo |

## Checks de bon fonctionnement (mensuel 10 min)

- [ ] Envoi de test vers Gmail → DKIM/SPF PASS
- [ ] Réservation test Calendly → événement + email + notif Notion
- [ ] Soumission test Tally → fiche PROSPECT créée avec Score
- [ ] Aucun identifiant client réel dans un lien Drive public (partage = personnes précises)

> **Lecture pro :** ces trois briques ne servent à rien sans la règle des 24 h : tout intake Tally reçoit une vraie réponse humaine sous un jour ouvré. L'automatisation habille la réactivité, elle ne la remplace pas.

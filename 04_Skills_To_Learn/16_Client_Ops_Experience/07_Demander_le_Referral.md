# 07 — Demander le referral : l'exécution côté ops, au bon moment

> **À quoi ça sert :** les scripts et la psychologie de la demande de parrainage vivent dans
> `03_Acquisition_Without_Ads/06_Referral_Engine` — ne pas dupliquer. Ce fichier est la face OPS :
> le QUAND dans la séquence de clôture (restitution + 48 h), le COMMENT process (Notion, relances, attribution),
> et l'interdit qui cadre tout : la rémunération d'apport d'affaires n'est pas un automatisme —
> encadrement déontologique à vérifier [flag]. Temps de lecture : 8 minutes.

## 1. POURQUOI : le referral se rate au moment où la mission réussit

Le pic de satisfaction d'un client n'est pas la livraison — c'est le moment où il a compris, grâce à la
restitution (Loom, visio Zoom ou cabinet), que son problème est réglé. Passée cette fenêtre, la satisfaction retombe en « normal »
et la demande devient une relance commerciale.

Le vault a déjà écrit le pourquoi et les mots (dossier 03) ; ce qui manquait était le process :

- sans date automatique dans Notion, le meilleur script du monde ne part jamais ;
- sans cadre déontologique posé en amont, l'exécution expose plus qu'elle ne rapporte.

**Le cadre (à lire avant les scripts).** La loi 66-23 (ex-28-08) et les usages de la profession
encadrent le commerce de l'avocat : la SOLICITATION est prohibée ; la clientèle naît du mérite et de
l'information sobre (principe posé dans `01_Strategy/01_Rules_Of_The_Game_No_Ads_Morocco`).
Demander un remerciement, un témoignage sobre ou une mise en relation AU CLIENT SATISFAIT est dans
le cadre ; **rémunérer l'apport d'affaires — commission versée au parrain, pourcentage sur mission
amenée — est un montage qui doit être vérifié avant tout usage** [flag : fondement exact à confirmer
— textes 66-23 en transposition + RIO de l'Ordre [flag : article applicable à vérifier au texte]. En attendant cette vérification écrite :
**AUCUNE commission d'apport ne sort du cabinet.**] Le process de ce fichier est donc construit sur le
lien social (remerciement, reconnaissance, réciprocité différée), jamais sur le contrat d'apporteur.

## 2. COMMENT : la timeline d'exécution (l'automate)

```
C0      Clôture : PV + facture solde + restitution faite (06)
C0+48h  LE MOMENT : demande de referral (message A § 3) — le client a eu deux jours
        d'utiliser le livrable et de le montrer à son équipe.
        → tâche NOTION créée automatiquement au passage du statut « clôturé »
C0+7j   NPS, une question (10) :
   ├─ 9-10 → relance DOUCE possible si le message A est resté sans réponse (message B)
   ├─ 7-8  → pas de relance referral : la question ouverte d'abord (« quoi améliorer ? »)
   └─ 0-6  → silence sur le referral ; l'appel de désamorçage passe avant tout (09)
C0+30j  Fenêtre retainer (10) — les deux se parlent : un promoteur sans retainer
        est le candidat prioritaire du parrainage ; un promoteur avec retainer
        devient une machine à referrals « en poste ».
+90j    Attribution notée dans la base (qui a amené qui) — SANS compensation financière ;
        les gestes permis font le reste : remerciement personnalisé, mise en relation
        en retour, dîner annuel sobre [flag : seuils d'hospitalité à confirmer au RIO].
```

**Pourquoi 48 h après la restitution, et pas 5 minutes ou 5 semaines :**
à J+0, la mission est une promesse ; à J+2, elle est un souvenir récent ET un usage commencé —
le client a pu REALISER ce qui a été réglé. Trop tôt, le referral porte sur la promesse ;
trop tard, sur un souvenir tiède. Et « 48 h » n'est jamais « quand je pense à lui » :
c'est un rappel Notion à 10 h le surlendemain.

## 3. Les deux messages d'exécution (modèles entiers — la version ops des scripts 03)

**Message A — J+2 après la restitution de clôture [illustratif : Fatima, dossier 5 900 DH HT] :**

> Objet — Une question de méthode (30 secondes de réponse si vous n'avez rien)
> Bonjour Fatima,
> Deux jours que vos CGV et votre registre sont en ligne — j'espère qu'ils travaillent aussi bien
> que prévu.
> Une question simple, qui n'implique rien de commercial pour vous : parmi les personnes que vous
> croisez cette semaine — les autres vendeurs de votre plateforme, votre comptable, une amie qui
> lance sa boutique — y a-t-il quelqu'un à qui vous raconteriez notre façon de faire ?
> Si oui : un prénom et « je lui en parle » me suffisent ; c'est vous qui choisissez le moment.
> Si non : aucun souci — la mission est close et votre dossier reste propre.
> Merci encore pour votre réactivité sur les pièces : c'est elle qui a tenu le calendrier.

**Message B — J+9, si silence ET score NPS ≥ 9 (une ligne, jamais deux) :**

> Oubliez mon message de la semaine — juste : si un nom vous vient d'ici la fin du mois,
> il suffira de me l'écrire. Bonne semaine.

**Les interdits d'exécution** (la ligne déonto revue côté ops) :

1. pas de liste de contacts pré-remplie soumise au client — on n'instrumentalise pas son carnet ;
2. pas de récompense chiffrée (« 500 DH par ami ») : montage à valider (§ 1) et, déjà, laideur commerciale ;
3. pas de relance au-delà du message B — deux demandes = une pression = un client qui se sent exploité ;
4. pas de témoignage publié sans accord ÉCRIT (publication = données + image —
   `02_Niches_Deep_Dive/03_Loi_09-08_GDPR_Compliance` + conventions 09/SEO du vault) ;
5. pas de mise en relation « offerte » sans le dire aux deux parties.

## 4. Le process Notion : la base « Referrals », cinq propriétés

| Propriété | Type | Règle |
|---|---|---|
| Client source | relation Clients | qui a dit « je connais quelqu'un » |
| Prospect amené | texte / lien | nom + qualité du lien |
| Date demande / date réponse | dates | la métrique centrale : délai C0+48h → réponse |
| Mission issue | lien Missions | la conversion : 1 mission née = 1 attribution |
| Remerciement rendu | sélection « email personnalisé / témoignage (avec accord) / rencontre / rien » | **aucune valeur monétaire** tant que le flag § 1 n'est pas clos |

Une vue « en attente > 14 j » fait le reste : la relance n'est pas un feeling, c'est un filtre.
L'attribution se fête aussi en interne — le stagiaire qui a tenu le dossier doit voir d'où vient
la mission suivante. Le referral est le seul canal d'acquisition dont le coût marginal est une phrase ;
il ne s'auto-exécute que **daté, tracé — et non payé** tant que le cadre n'est pas vérifié.

## 5. Cas chiffrés [illustratif]

**Cas 1 — la chaîne Fatima.** Message A à J+2 (sans réponse) ; NPS 10 à J+7 ; message B à J+9 :
« parle-en à Sofiane, il galère avec ses CGV depuis des mois ». Sofiane signe à 60 jours
(diagnostic 900 + pack 2 900). Un email de soixante mots : 2 900 DH HT de CA —
le ratio du canal est imbattable, et il ne doit rien à personne [ordre de grandeur à confronter à vos réels].
**Cas 2 — la chaîne cassée.** Yassine (pack 2 900) reçoit une relance à J+40 parce que le rappel Notion
avait été supprimé en pleine semaine de charge : la demande, déjà reçue à J+2, devient une relance de
vendeur. Réparation : une ligne (« je vous ai relancé trop tôt — c'est ma faute ; la porte reste
ouverte ») + le filtre est verrouillé (la tâche referral ne se supprime plus, elle se re-date).
Le process ne protège pas que le prospect : il protège le client.

> **Lecture pro :** le dossier 03 vend le rêve — le referral comme canal roi ; ce fichier en est la
> plomberie : une tâche à J+2, un filtre à J+90, deux messages, zéro commission tant que le cadre
> n'est pas vérifié. Un cabinet qui « rate ses referrals » ne manque pas de clients satisfaits :
> il manque de cases cochées dans Notion.

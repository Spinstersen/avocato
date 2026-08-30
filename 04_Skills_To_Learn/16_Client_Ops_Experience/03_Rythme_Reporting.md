# 03 — Rythme de reporting : le milieu de mission qui tue l'anxiété client

> **À quoi ça sert :** la traversée du désert entre le kickoff (J0) et la livraison — là où le client
> imagine le pire. Checkpoints fixes J2/J5, Loom court, email d'avancement template,
> règle « pas de nouvelle = mauvaise nouvelle », et le paramétrage ADHD-friendly :
> le reporting est une case calendrier, pas une décision à prendre. Temps de lecture : 9 minutes.

## 1. POURQUOI : le silence n'est jamais neutre pour qui a payé une provision

Un client qui a versé 1 450 ou 2 950 DH de provision et n'a rien entendu pendant dix jours
ne pense pas « il travaille » — il pense « il m'a oublié » ou « je me suis fait avoir ».
Le point de rupture de la satisfaction n'est presque jamais la qualité du livrable
(elle est standardisée par le fichier 05) : c'est le **trou de signalisation** au milieu de la mission.

Trois coûts du silence :

1. l'appel paniqué à J+4 — 20 minutes et un crédit de confiance entamé ;
2. le « vous avez avancé ? » qui oblige à se justifier — posture basse à la livraison,
   celle qui fait accepter une remise (cf. `11_Negotiation_Psychology/04_Gestion_Client_Difficile`) ;
3. le dossier jamais vraiment relancé — et la recommandation perdue d'avance
   (cf. `07_Demander_le_Referral.md`).

**La règle inversée du vault : pas de nouvelle = mauvaise nouvelle.**
Le cabinet qui n'a rien à dire DIT quelque chose — il dit que le dossier n'est pas prioritaire.
La solution n'est pas de mieux communiquer quand ça coince : c'est de communiquer quand ça ne bouge pas,
parce que c'est exactement là que le client, lui, croit que ça coince.

## 2. COMMENT : le métronome J0-J2-J5-J7 (et son extension 14/30 jours)

| Temps | Rituel | Production | Canal | Contenu |
|---|---|---|---|---|
| **J0** | Kickoff (modèle entier : `01_Onboarding_KYC.md` § 6) | 5 min (template) | Email | Périmètre, calendrier annoncé, canal, mot « URGENT » défini |
| **J2** | Checkpoint « en mouvement » | 3 min | Email court | Une brique faite ; la prochaine nommée ; la pièce qui manque avec sa date de grâce |
| **J5** (ou J-2 avant livraison) | Checkpoint « presque fini » | 5 min | Email | Ce qui est prêt ; LA question ouverte unique ; la date de livraison re-confirmée |
| **J7 / livraison** | Paquet de quatre : livrables + note de risques + Loom 3 min + mode d'emploi | 30-45 min | Drive + Loom + email | Workflow complet : `05_Livrable_Qualite.md` ; le Loom se filme UNE fois (`01_Legal_Tech_Stack/05_Loom_Video_Client`) |
| **J+30 / J+90** (missions longues, retainers) | Point de rappel mensuel | 5 min | Email | Une ligne d'état + une question ; même à vide, on sonne |

**Les deux lois du rythme :**

1. **La date annonce la date.** J0 annonce J2 et J7 ; J2 rappelle J7.
   Le client n'attend jamais une nouvelle qu'on ne lui a pas annoncée :
   l'attente non datée est la matrice de l'anxiété.
2. **Un checkpoint annoncé a lieu, vide ou plein.** Le J2 « rien de neuf, la rédaction avance,
   à jeudi » EST un checkpoint réussi. Ce qui casse la confiance n'est pas l'absence de progrès :
   c'est l'absence de signal.

## 3. Templates rédigés entiers

**Email J2 — « en mouvement » [illustratif : Fatima, pack e-commerce 5 900 DH HT] :**

> Objet — Avancement J2 — votre dossier e-commerce (CH-2026-047)
> Bonjour Fatima,
> Point d'étape comme convenu, deux jours après le démarrage.
> Fait depuis lundi : la cartographie de vos traitements (ce que vous collectez, où, pourquoi) —
> la base du registre 09-08 est prête.
> En cours cette semaine : la reprise de vos CGV, dont la partie rétractation — rappel utile :
> sept jours en vente à distance (loi 31-08, art. 36), pas quatorze comme sur beaucoup de modèles étrangers.
> Une seule chose me manque : la capture de votre tunnel de paiement actuel. D'ici jeudi ; sinon le rendu
> de vendredi glisse en début de semaine suivante — dites-moi simplement ce qui arrange votre calendrier.
> Vendredi, vous recevrez le livrable complet avec une vidéo de 3 minutes pour tout comprendre.

**Email J5 — « presque fini » :**

> Objet — J5 — livraison vendredi 14 h ; une question avant
> Bonjour Fatima, tout est prêt sauf la clause de règlement des différends, que je vous propose de
> calibrer ensemble : cherchez-vous la voie la plus rapide (médiation conventionnelle) ou celle qui
> garde la main (juridiction de votre choix) ? Répondez en une ligne — vendredi ne bouge pas.

**Le Loom J2 d'une minute** (quand l'avancement mérite de se voir) : écran partagé du registre en cours —
le client VOIT que le travail existe. Coût : 90 secondes de tournage.
Effet : le « vous travaillez bien sur mon dossier ? » meurt définitivement pour ce client.

## 4. ADHD-friendly : le reporting est une case, pas une décision

Pour un cerveau TDAH (cf. `06_ADHD_System/01_Daily_Operating_System` et `06_Weekly_Review_Planning`),
le piège du reporting n'est pas la charge — c'est la **décision récurrente**
« est-ce que je lui écris aujourd'hui ? ». Chaque décision consommée est une occasion d'évitement ;
l'évitement produit le silence ; le silence produit le client en panique.
La boucle entière est un problème d'exécution, pas de compétence. Le démontage en trois vis :

1. **Récurrence calendaire, jamais « quand j'avance »** : deux récurrences créées automatiquement
   à l'ouverture de chaque dossier Notion — « Checkpoint J2 » et « Checkpoint J5 »
   (Google Calendar ; automatisation possible via l'intégration décrite dans
   `01_Legal_Tech_Stack/08_Workflow_Integration_Zapier_Make` [flag : le branchement exact à installer]).
   Deux alarmes, zéro arbitrage.
2. **Gabarits à trois variables** : les deux emails du § 3 vivent dans Notion avec
   {{client}}, {{brique_faite}}, {{pièce_manquante}} — rédiger un checkpoint = remplir trois cases,
   pas écrire une lettre.
3. **La règle du plancher** : un checkpoint = 3 lignes minimum.
   Trois lignes s'écrivent en 4 minutes d'énergie basse ;
   c'est l'ABSENCE de plancher (« il faut un vrai point complet ») qui fait procrastiner.

## 5. Les trois glissements à surveiller (auto-diagnostic hebdo)

| Symptôme | Diagnostic | Correction |
|---|---|---|
| J2 devient « je le ferai quand j'aurai quelque chose à dire » | la loi n° 2 est cassée — le checkpoint attend le progrès au lieu d'annoncer le plan | réécrire le template en mode « plan + pièce manquante », sans case « résultat » |
| Quatre messages dans la journée à un client anxieux | sur-signalement : vous achetez votre propre tranquillité | un seul point daté vaut mieux que cinq réactions — la date calme, l'agitation nourrit l'angoisse |
| Le reporting disparaît dès que DEUX missions tournent en parallèle | le système est mono-dossier | les récurrences sont créées à l'OUVERTURE, pas à la charge : c'est le fichier 01 § 7 qui le garantit |

## 6. Mesurer et recadrer

- **Taux de checkpoints tenus** (Notion prévu/fait) : cible ≥ 90 % ;
  sous 80 % deux semaines de suite, le template est trop lourd — raccourcir d'un tiers.
- **Le test du « où on en est ? »** : le nombre de messages clients « avez-vous avancé ? » par trimestre
  est l'indicateur inverse direct de la qualité du reporting — il doit tendre vers zéro.
- **Trop, c'est trop** : un checkpoint par palier ANNONCÉ, pas cinq — le client qui reçoit trois signaux
  par jour pour un pack à 2 900 DH comprend que le cabinet n'a rien d'autre à faire ;
  le rythme crée la confiance, l'agitation crée le doute
  (convention de sobriété : `01_Strategy/01_Rules_Of_The_Game_No_Ads_Morocco`).

> **Lecture pro :** le livrable est évalué à la livraison ; la relation est évaluée PENDANT.
> Un client à qui l'on a donné trois signaux datés ne demandera jamais de remise sur un travail
> qu'il a vu naître — le reporting est la seule ligne de chiffre d'affaires du cabinet qui ne coûte
> aucune heure de droit, et qui en sauve des dizaines de litiges.

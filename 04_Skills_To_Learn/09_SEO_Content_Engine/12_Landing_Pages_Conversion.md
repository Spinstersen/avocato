# 12 — Landing pages de conversion : de l'article qui se positionne à la page qui prend le RDV

> **À quoi ça sert :** l'article du dossier 09 attire le lecteur ; la **landing** transforme le lecteur en demande de diagnostic 900 DH HT — sans compte à rebours, sans promo, sans promesse, avec un formulaire Tally de 4 champs, la mention loi 09-08, le consentement distinct et le tracking de source vers Notion `PROSPECTS`. Cette fiche donne l'anatomie conforme, la règle d'un A/B honnête, et le template complet d'une landing « diagnostic freelance offshore ». **Pour qui :** l'avocat dont le tunnel s'appelle article → landing → diagnostic → pack (fichier 02) et qui découvre qu'une page de conversion licite est une page de CLARTÉ, pas de pression. Temps de lecture : 15 minutes.

## POURQUOI une page dédiée entre l'article et le RDV

L'article répond à la question Google ; il ne répond pas à la question du visiteur : « et pour MON cas, concrètement, ça se passe comment ? ». Envoyer ce visiteur sur une page d'accueil, c'est le perdre dans la navigation ; l'envoyer sur un formulaire nu, c'est lui demander une décision sans lui avoir rendu la décision facile. La landing est le troisième objet : une page mono-intention (le diagnostic), mono-sujet (la niche de l'article), qui fait une chose que l'article ne fait pas — décrire le déroulé : ce qui se passe pendant les 45 minutes, ce que le client reçoit (note de risques + 2 options), ce que ça coûte (900 DH HT, déductible si mission suit), ce que ça ne garantit pas (jamais un résultat). 

Le reste est déontologique : la landing est une page du cabinet, donc un support public — ni sollicitation individuelle ni publicité commerciale (loi 66-23, dahir n° 1-26-75, BO n° 7536, 18/08/2026 ; numéros en transposition), et un traitement de données personnelles dès le premier champ de formulaire : mention 09-08 et consentement avant collecte, pas après (rappel du dossier : art. 64, amende de 10 000 à 100 000 DH pour les manquements aux obligations ; art. 65, volet pénal jusqu'à 3 ans ; les transferts hors Maroc des outils cloud relèvent de l'autorisation CNDP — la pratique du vault est la minimisation, cf. `04_Skills_To_Learn/01_Legal_Tech_Stack/09_Securite_Backup_09-08.md`).

## COMMENT — l'anatomie en 9 blocs (dans l'ordre de lecture)

| Bloc | Nom | Contenu | Densité |
|---|---|---|---|
| 1 | H1 réponse | La promesse D'INFORMATION : « Le diagnostic juridique de votre activité offshore — 45 min, une note écrite, deux options » | 1 ligne |
| 2 | Pour qui / pas pour qui | 3 puces « c'est pour vous si » + 1 puce « ce n'est pas pour vous si » (filtrer = convertir mieux) | 60 mots |
| 3 | CE QUE DIT LA LOI | Le module-proof : citation exacte recopiée du jour (ex. plafond AE services 200 000 DH — loi 114-13 ; CGI art. 42 s. ; radiation au 1er janvier après 2 ans de dépassement), source liée, date de vérification affichée | 80 mots |
| 4 | Le déroulé | 4 étapes numérotées : réservation → appel 45 min → note de risques sous 24 h → les 2 options | 70 mots |
| 5 | Le livrable | Capture sobre de la note de risques TYPE (document fictif clairement générique, jamais un vrai dossier client) | visuel + 20 mots |
| 6 | Prix et conditions | « 900 DH HT — payable à la commande — intégralement déduit d'une mission dans les 3 mois — facture CGI art. 145 — virement » + la phrase d'honnêteté : « aucun résultat n'est garanti ; sont garantis une méthode, une note écrite et des délais » | 50 mots |
| 7 | L'auteur | Photo sobre (licence vérifiée), barreau, RIO, une ligne de spécialité — l'E-E-A-T de la fiche 02 version page | 40 mots |
| 8 | Formulaire Tally | 4 champs max : nom, email, activité (select), contexte en 2 lignes (optionnel) + case consentement distincte + mention 09-08 + champ caché `source` (UTM) | 0 pression |
| 9 | FAQ 3 questions | Les PAA réelles : « dois-je préparer des documents ? », « et si je ne signe rien après ? », « en visio ou au cabinet ? » | 120 mots |

**Interdits absolus de la page** (checklist qualité `04_Design_Canva_For_Legal/10_Checklist_Qualite.md`, cases D2/D3) : compte à rebours, « places limitées », promo ou remise, témoignages chiffrés non mesurés, pop-up sortant, promesse de résultat (« évitez le redressement »), logo client sans accord, prix TTC sans HT. Le design suit les tokens du vault : fond parchemin, cartes surface, teal ≤10 % sur les liens et le bouton — la landing d'un cabinet ressemble à son papier à en-tête, pas à une page de vente.

**Le formulaire, exactement :**

- 4 champs parce que chaque champ supplémentaire est une décision volée au prospect (la règle tunnel du dossier 03 : la demande entrante doit coûter moins de 60 secondes) ;
- le consentement newsletter est une case DISTINCTE, non pré-cochée (la finalité « réponse à votre demande » ne couvre pas « marketing » — 09-08) ;
- la mention sous le bouton, en deux lignes : « Les données de ce formulaire sont collectées aux fins de traitement de votre demande, hébergées hors Maroc et déclarées auprès de la CNDP (loi 09-08) ; vous disposez d'un droit d'accès, de rectification et d'opposition : [email du cabinet]. » ;
- le champ caché `source` reçoit l'UTM (`?utm_source=article&utm_campaign=plafond-ae`) et part tel quel dans la ligne Notion — sans lui, la landing est un angle mort ;
- la fiche de conformité du formulaire vit côté stack : `04_Skills_To_Learn/01_Legal_Tech_Stack/09_Securite_Backup_09-08.md` (ligne « Gestion des prospects (Tally/Calendly) » du registre, durées écrites).

## COMMENT — landing, article, formulaire nu, plaquette : qui fait quoi

| Objet | Répond à | KPI unique | Ne fait PAS |
|---|---|---|---|
| Article (fichier 02) | « quelle est la règle ? » | impressions/clics GSC | vendre |
| Landing (cette fiche) | « et pour mon cas, comment ? » | demandes qualifiées / visiteurs | informer longuement |
| Formulaire nu (Tally seul) | « je sais déjà ce que je veux » | soumissions | expliquer — sans page amont, il ne convertit que les convaincus |
| Plaquette (Design 05) | « qui êtes-vous ? » | usage en RDV/atelier | remplacer la landing (personne ne la « trouve » sur Google) |

## COMMENT — la carte des landings du cabinet (3, pas trente)

| Landing | Intention servie | Exemples d'articles du cluster qui y pointent |
|---|---|---|
| `/diagnostic-freelance-offshore` | Yassine : plafond AE 200 000 DH (services), contrat EN, rapatriement 90 j | plafonds AE, contrat de prestation offshore, encaissement hors Stripe (SWIFT), TVA art. 91-II-3° |
| `/diagnostic-ecommerce-conformite` | Fatima : mentions, CGV, CNDP, rétractation 7 j (art. 36 loi 31-08) | mentions légales e-commerce, cookies, YouCan, sanctions 09-08 (art. 64 : 10 000-100 000 DH) |
| `/diagnostic-mre-societe` | Karim : SARL-AU à distance, chaîne du dividende | guides EN (procuration/apostille), RAS 11,25 % (2026) → 10 % (2027), IGOC |

Une landing par intention de mission ; chaque cluster converge vers elle ; aucune landing ne naît d'un article isolé — une page sans cluster est une page orpheline (erreur `07_Erreurs_SEO.md`).

## COMMENT — tracking : de l'UTM à la ligne PROSPECTS

1. Chaque article qui pointe vers la landing porte des UTM distincts (l'URL de la landing ne change jamais — cf. `07_Erreurs_SEO.md` : on ne touche pas une URL publiée).
2. Tally → Make/intégration Notion (fichier `01_Legal_Tech_Stack/08_Workflow_Integration_Zapier_Make.md`) : une soumission = une ligne `PROSPECTS` état `intake`, source = UTM, consentement newsletter = O/N.
3. La revue du lundi (`04_Skills_To_Learn/03_Sales_Without_Selling/13_Pipeline_CRM_Hebdo.md`, fichier en création au moment de cette fiche — référencé par son chemin) lit ces lignes : la landing ne se juge PAS au trafic, elle se juge au taux demande → diagnostic réservé, calculé sur les lignes source « landing-[nom] ».

## COMMENT — l'A/B test honnête (une variable, un seuil, pas de pourcentages fabriqués)

- **Une seule variable par test** : H1 OU bloc 3 OU formulaire — jamais la page entière ; deux variables modifiées ensemble = un résultat indéchiffrable.
- **Seuil de décision :** ne conclure qu'avec **au moins 100 visiteurs par variante** — c'est une règle d'ordre de grandeur [estimation signalée, pas une norme statistique : en dessous, la variabilité naturelle du trafic écrase tout écart crédible sur un objectif à quelques demandes], et comparer le NOMBRE de demandes qualificatives, pas des taux quand les totaux sont petits.
- **Durée minimale :** 2 semaines complètes (semaine/week-end, effectifs de niche) — arrêter un test au premier écart est la façon la plus sûre de conclure sur du bruit.
- **Jamais** : faux compteur « 3 places restantes », faux avis, « garantie satisfait ou remboursé » sur un acte juridique, dark pattern de case pré-cochée. Non seulement c'est déonto-interdit (démarche commerciale, loi 66-23), c'est aussi le meilleur moyen de fabriquer du faux signal dans tes données.
- Le gagnant devient le défaut de la page ; la variante perdante reste documentée dans Notion avec sa date — un test non archivé recommencera dans six mois.

## COMMENT — l'entretien semestriel d'une landing (30 min par page)

1. **Recopier le bloc 3** depuis la source primaire du jour : seuils AE, délais de change, taux et articles ont-ils bougé avec la LF ou une réforme (la 66-23 a remplacé la 28-08 — tout écrit antérieur se suspecte) ?
2. **Re-tester les 4 champs du formulaire** : un champ ajouté « vite » en cours de route est un champ qui doit mourir.
3. **Vérifier le pipeline des soumissions** : Tally → Notion → notification email — une landing dont la dernière demande date de trois semaines sans qu'on s'en aperçoive est une porte condamnée sans panneau.
4. **Lire les 20 dernières requêtes GSC** qui atteignent la landing : la requête inattendue qui converge est soit un nouveau cluster (dossier 01), soit un signal que le H1 ment sur le périmètre.
5. **Re-cocher la checklist Design 10 (blocs C-D)** sur la page en ligne : un prix oublié dans un coin, une mention 09-08 disparue après refonte — tout cela arrive silencieusement.

## EXEMPLE — template complet de la landing « diagnostic freelance offshore »

> **[H1]** Vous facturez des clients à l'étranger ? Mettez votre structure à plat en 45 minutes.
>
> **[Bloc 2]** C'est pour vous si : vous encaissez en devises via virement ou plateforme ; votre CA dépasse (ou frôle) 200 000 DH/an de services ; vos contrats clients sont des échanges d'emails. Ce n'est pas pour vous si : vous cherchez une garantie de résultat — ce n'est pas ce qu'un avocat peut offrir.
>
> **[Bloc 3 — CE QUE DIT LA LOI]** « Le régime de l'auto-entrepreneur [plafond des prestations de services : 200 000 DH HT de recettes annuelles — loi n° 114-13 ; CGI, art. 42 et suivants ; citation consolidée le [date], source : sgg.gov.ma / dgi.gov.ma. Le dépassement sur deux années consécutives entraîne la radiation au 1er janvier. » En dessous, une ligne : « Et si vous facturez à l'étranger : services consommés hors Maroc = hors champ TVA (CGI, art. 91-II-3°), mais rapatriement des recettes dans les 90 jours (IGOC 2026). »
>
> **[Bloc 4]** Comment ça se passe : (1) vous réservez un créneau ; (2) 45 min d'appel — vous parlez, je pose les questions ; (3) sous 24 h, une note écrite : risques classés, chacun chiffré avec sa source ; (4) deux options de traitement, avec délais et honoraires. Le diagnostic est déductible si une mission suit dans les trois mois.
>
> **[Bloc 6]** 900 DH HT — virement au RIB du cabinet — facture conforme CGI art. 145. Aucun résultat n'est promis : ce qui est garanti, c'est la méthode, l'écrit et les délais.
>
> **[Bloc 8 — formulaire]** Nom · Email · Votre activité (select : dev / design / conseil / autre) · Une ou deux lignes sur votre situation (optionnel) · [ ] J'accepte que ces données soient utilisées pour traiter ma demande (loi 09-08) · [ ] (case distincte) Je souhaite recevoir la veille juridique mensuelle. → [Réserver mon diagnostic]
>
> **[Pied]** Me [Nom] — Avocat au barreau de [Ville] — RIO [n°] — mentions légales & politique de confidentialité.

[Note de conformité du template : le bloc 3 est à recopier le jour de la publication et à re-vérifier à chaque LF — la citation ne se délègue jamais (règle 2 du dossier) ; la landing qui dort six mois avec une référence périmée est une landing qui travaille contre toi.]

## Erreurs d'application

1. **Une landing par article** : non — une landing par intention de mission (offshore, e-commerce conformité, MRE/société), les articles du même cluster pointent toutes vers elle ; trente pages mono-article = trente pages minces et une maintenance impossible.
2. **Renvoyer le visiteur de la landing vers l'article pour « se documenter »** : le visiteur qui a cliqué sur « réserver » doit trouver le formulaire, pas une autre lecture — la page mono-intention l'est des deux côtés.
3. **Oublier le champ source** : sans UTM, tu ne sauras jamais quelle landing vit grâce à quel article — et le fichier 06 du dossier ne mesure plus rien.
4. **Faire « agressif » pour tester** : la landing d'un avocat convertit par la précision, pas par l'urgence ; chaque couche de pression ajoutée est une couche de déonto entamée.
5. **Publier sans demande d'indexation ni UTM dans les liens sortants** : la landing est une page du moteur éditorial —rituel fiche 11 : indexation demandée, liens marqués, fiche Notion créée.

> **Lecture pro :** une landing conforme est une page qui dit la vérité plus vite que le visiteur ne la cherche : pour qui, ce que dit la loi, ce qui se passe en 45 minutes, ce que ça coûte, ce que personne ne promet. C'est exactement le pitch d'un bon diagnostic — mis en page. Les compteurs et les promos conviennent aux ventes flash ; le diagnostic 900 DH HT se vend avec une note d'exemple et un article de loi bien cité.

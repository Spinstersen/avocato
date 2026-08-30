# 11 — Arbre de Décision : Quel Outil Ajouter, Quand

> **La question n'est pas « quel outil ? » mais « où perds-tu du temps ? ».** Cet arbre part de la douleur mesurée, pas du produit. Une règle filtre tout : tu n'achètes que ce qui te rend ≥1 h par mois qu'il ne te volera pas ailleurs (maintenance, context-switching).

## POURQUOI un arbre plutôt qu'une wishlist

Le jeune avocat suréquipé souffre d'un vrai problème : chaque outil ajoute une surface de décision (« où je note ça ? ») qui coûte plus cher en attention qu'elle ne rend en minutes. L'arbre force la séquence : douleur → catégorie → outil déjà recommandé dans le catalogue (fiche 01) → coût. Et il impose le non-achat quand la douleur n'existe pas encore.

## COMMENT — l'arbre

```
As-tu perdu ≥2 h CE MOIS à faire manuellement X ?
 ├─ NON → n'ajoute rien. Recommence dans 3 mois.
 └─ OUI → X est-il déjà faisable dans un outil que tu paies ?
       ├─ OUI (ex: RDV dans email) → forme l'usage avant l'achat
       └─ NON → quelle catégorie ?
             ├─ Prise de RDV            → Cal.com (gratuit/self-host) ou Calendly ≈10 $
             ├─ Formulaire / intake     → Tally (gratuit) ; UE → Fillout
             ├─ Signature dématérialisée→ Yousign ≈19-25 €/mois ; souverain → Docuseal
             ├─ Vidéo explicative       → Loom ≈12-15 $ ; 0 budget → OBS + Drive
             ├─ Design / carrousels     → Canva Pro ≈12-15 $ ; 0 budget → Penpot
             ├─ Analytics               → Plausible ≈9-14 $ ; self-host → Matomo
             ├─ Automatisation repetitive→ Make ≈9 $ ; >5 scénarios → n8n
             ├─ Paiement encaissé       → virement RIB d'abord ; la question « Stripe »
             │                            → fiche 06 (mission de structuration, pas un achat)
             ├─ Emailing sobre          → Brevo (UE, palier gratuit)
             └─ Focus / blocage de sites→ Freedom ≈3-4 $ (optionnel, jamais prioritaire)
```

**Lecture du nœud « Paiement »** : c'est le seul où la réponse n'est jamais un abonnement. Un client qui te demande « un outil pour encaisser » est un signal de mission (structuration ou conformité), pas un signal d'achat.

## COMMENT — priorité par palier de CA

| CA mensuel | Stack | Coût/mois | Ce que l'argent achète |
|---|---|---|---|
| <10 k DH | Notion + Workspace + Cal.com + Tally | ≈20-30 $ | Ne rien rater |
| 10-30 k DH | + Yousign + Loom + Canva + Plausible | ≈60-80 $ | Signer vite, expliquer sans téléphonique, voir d'où viennent les clients |
| 30-60 k DH | + Make/Zapier + Brevo + 1Password | ≈90-125 $ | Du temps rendu à la production |
| >60 k DH | + assistant(e) ou VA (≈2 500-4 000 DH/mois à un partenaire) | la stack n'est plus le sujet | La délégation humaine avant l'outil n°12 |

Au-delà de 60 k DH/mois, la question « quel outil » est presque toujours une mauvaise question : l'ergonomie dont tu manques est celle d'une personne qui tient le CRM pendant que tu rédiges.

## Les 4 questions filtres avant tout achat (30 secondes)

1. **Douleur mesurée** : « combien d'heures le mois dernier ? » (pas « ça serait quand même plus pratique »)
2. **Sortie** : « puis-je exporter mes données si je pars ? »
3. **Données** : « quelles données clients identifiables ça touche ? » → si réponse « beaucoup », vérifier hébergement UE/local et ligne de registre (fiche 09)
4. **Maintenance** : « qui s'en occupe quand ça casse ? » — si réponse « moi », compter 1 h/mois dans le vrai prix

## EXEMPLE : trois décisions réelles (personas)

- **Yassine (le dev freelance est ton client, pas toi — mais toi, tu es comme lui) :** tu passes 6 h/mois à recopier Tally et Yousign dans Notion → douleur ≥2 h, catégorie automatisation, Make 9 $, rentable dès le premier mois. Achat validé par l'arbre.
- **Question « un outil de facturation marocain ? »** : pas dans l'arbre — la facturation se fait avec le template Notion/Drive + facture PDF (le métier est couvert par `12_Finance_Cabinet_OS` du même niveau). L'arbre t'interdit d'ouvrir un 12e front non mesuré.
- **Fatima te demande une « page de paiement » pour sa boutique** : toi tu n'achètes rien — c'est une mission (passerelle bancaire + 09-08 de la boutique), et l'argent entre côté client, pas côté stack.

## Diagnostic de panne de stack (symptôme → remède, pas nouvel outil)

| Symptôme | Cause fréquente | Remède sans achat |
|---|---|---|
| « Il me manque un outil pour suivre les échéances » | La vue Timeline de MISSIONS (fiche 02) est créée mais pas ouverte | Ouvrir la vue chaque lundi — 0 $ |
| « Je perds les infos LinkedIn » | Pas de PROSPECTS côté Notion ou intake jamais expliqué | Réflexe fiche 03 : 12 questions en 2 min |
| « La facturation est en retard » | Personne ne sait que la mission est livrée | Case Livrables cochée + scénario 3 fiche 08 |
| « Je ne relis jamais mes notes » | Notes éparpillées hors des BDD | Un seul endroit : la page Notion de la mission |
| « Mes emails finissent en spam » | DKIM non vérifié (fiche 03) | Le problème est technique, pas d'abonnement |

Avant d'acheter : une colonne « remède sans achat » remplit trois lignes d'arbre — la plupart des « besoins d'outils » sont des besoins d'usage.

## Les 3 anti-patterns d'achat (à afficher)

1. **L'achat-spéculation** : « je prends l'année, c'est moins cher » pour un outil dont tu n'as pas encore éprouvé le flux mensuel. Règle : un mois d'essai facturé, puis l'année — jamais l'inverse.
2. **Le complément qui crée le problème** : l'outil de prise de notes qui génère « où je mets mes notes ? ». Si l'achat ouvre une question d'organisation au lieu d'en fermer une, l'arbre répond : non.
3. **Le remplacement d'une compétence par un abonnement** : l'IA de rédaction juridique à 30 $ qui remplace la relecture, ou le CRM qui remplace la relance. Un outil qui ne fait que stocker ta discipline ne produira que le vide de ta discipline — multiplié par le nombre d'onglets.

## Le calendrier annuel de la stack

| Quand | Rituel | Fiche |
|---|---|---|
| Chaque dimanche | Export Notion + top KPI + missions dormantes | 02, 07, 09 |
| Chaque mois | Copie Drive → disque ; registre ; prix des outils | 09, 10 |
| Chaque trimestre | Test de restauration ; revue des scénarios ; mise à jour de ce dossier si un prix/une règle a bougé | 08, 09, 12 |
| Chaque année (janvier) | Revue complète de la matrice CA (ci-dessus) + budget stack prévisionnel + désabonnement de l'année | 01, 10, 11 |

## Deux simulations de coût annuel (ordres de grandeur août 2026)

**Solo démarrage (<10 k DH/mois)** : Notion ≈145 $/an + Workspace ≈72 $ + Cal.com 0 + Tally 0 + Canva ≈150 $ ≈ **370 $/an**. Contrepartie : signature et vidéo non couvertes — acceptables tant que le pipeline est un fichier CSV et les conventions du papier.

**Rythme de croisière (30-60 k DH/mois)** : cœur + Yousign ≈270 € + Loom ≈160 $ + Plausible ≈130 $ + Make ≈110 $ ≈ **850-950 $/an**. Message interne : ce montant doit rester <1 % du CA — au-delà, tu ne pilotes plus une stack, tu entretiens un hobby.

## Trois cas particuliers fréquents

**« Un confrère me dit que X est génial. »** La douleur d'un autre n'est pas la tienne : passe X dans l'arbre comme si tu le découvrais seul — la question « as-tu perdu 2 h ce mois ? » reste la seule porte d'entrée.

**« Un client exige un outil précis (Docusign, Outlook, tel CRM). »** L'interopérabilité client prime sur ta préférence : accepte l'outil imposé pour CE dossier, note-le dans VEILLE ; si l'exigence se répète 3 fois, l'arbre valide l'achat comme standard.

**« L'outil gratuit me suffit mais je culpabilise. »** La version gratuite d'un outil conforme bat la version payante d'un outil que tu n'utiliseras pas : la culpabilité n'est pas un critère d'achat, la douleur mesurée l'est.

## Le corollaire : le désabonnement

Le même arbre s'applique à la suppression : un outil non utilisé dans les 60 derniers jours (hors saisonnalité atelier) → export → annulation → la ligne disparaît du registre si elle touchait des données. Une stack qui ne se réduit jamais est une stack qui ne sert plus.

> **Lecture pro :** garde une règle de cadence : un seul nouvel outil par mois maximum, jamais deux le même mois. Chaque intégration est un chantier (comptes, données, habitudes, registre) — et ton vrai produit, ce sont des missions livrées, pas une collection d'abonnements actifs.

# 05 — Templates : le kit de démarrage par type de mission

> Une SOP sans templates, c'est une procédure qui te demande encore de rédiger.
> Le kit de démarrage transforme chaque type de mission en dossier Notion pré-peuplé : les documents existent déjà dans la Document Bank, la fiche contient déjà les jalons, les délais de garde-fous sont déjà posés.
> Ouvrir une mission doit prendre deux minutes, pas une soirée.
>
> **Liens :** [[02_Bibliotheque_SOP_Pack_Freelance]] · `../../05_Document_Bank/templates/` · [[08_Outils_Gestion_Temps_Missions]] · [[06_ADHD_System/02_Notion_Second_Brain]]

## POURQUOI « pré-peuplé » plutôt que « modèle vierge »

- Un modèle vierge reporte la décision au moment de l'ouverture — et reporter une décision quand on est TDAH, c'est ouvrir la mission sans kit, donc improviser la structure, donc oublier le jalon qui fait mal trois semaines plus tard.
- Le kit pré-peuplé prend la décision à ta place **à froid, une seule fois**, quand tu as le temps d'y penser : les jalons sont déjà écrits, les champs déjà nommés, les documents déjà joints en copie.
- Le vault contient déjà les huit documents maîtres (`05_Document_Bank/templates/`) : ce fichier ne les reduplique pas, il les **route** vers les types de mission.

## Les huit briques réelles de la Document Bank

| Fichier (nom réel) | Rôle dans un kit |
|---|---|
| `01_Convention_Honoraires_Modele.md` | Brique universelle : toute mission l'ouvre, adaptée au périmètre et aux jalons du type |
| `02_Scripts_DM_WhatsApp.md` | Trames d'entrée en relation et de relance légère — le ton cabinet prêt à l'emploi |
| `03_Pack_Freelance_Contrat.md` | Périmètre du pack freelance 2 900 DH HT — cœur du kit n° 1 |
| `04_Pack_Ecommerce_CGV.md` | CGV et clauses e-commerce — base du kit e-commerçant (persona Salma) |
| `05_Registre_09-08_Modele.md` | Registre de traitement loi 09-08 — brique de conformité pour tout client traitant des données personnelles |
| `06_Recu_Provision_Facture.md` | Reçu de provision et facturation — accompagne chaque jalon de paiement |
| `07_Lettre_Mission_Planning.md` | Lettre de mission + planning conditionnel — colonne vertébrale des dossiers à étapes |
| `08_PV_Remise_Cloture.md` | Procès-verbal de remise — clôture propre de toute mission livrée |

## COMMENT : la structure de toute fiche Notion « mission »

Chaque modèle de mission dans Notion porte les mêmes champs — la standardisation des CONTENANTS laisse toute la liberté sur les FONDS :

1. **Client** (relié à la fiche prospect → diagnostic → mission : une seule fiche de vie).
2. **Type & prix** — pack freelance 2 900 HT / transformation SARL-AU 5 500 HT + débours / retainer 2 500-4 500 HT/mois / diagnostic seul 900 HT.
3. **Statut** — pipeline, signé, en rédaction, livré, clos.
4. **Provision** — 50 % facturé / encaissé (date) ; sans encaissé, le statut ne peut PAS passer à « en rédaction ».
5. **Jalons** (répliqués depuis le kit, dates conditionnelles : « vers [date], sous réserve de réception de [pièce] »).
6. **Jours de garde-fous** — chaque date-clé dupliquée en Google Calendar avec rappel J-2/J-1 depuis la fiche ([[08_Outils_Gestion_Temps_Missions]]).
7. **Durée réelle** — champ alimenté par Clockify à la clôture ([[12_Finance_Cabinet_OS/08_Metriques_Rentabilite]]).
8. **Incidents** — liste vide par défaut, remplie à chaud, exploitée à l'audit ([[09_Audit_Mensuel_Cabinet]]).

## Les quatre kits de démarrage du cabinet

### Kit 1 — Pack freelance (2 900 DH HT)
Documents joints dès l'ouverture : `01_Convention_Honoraires_Modele.md` + `03_Pack_Freelance_Contrat.md` + `06_Recu_Provision_Facture.md`.
Jalons pré-écrits = les 10 étapes de [[02_Bibliotheque_SOP_Pack_Freelance]].
Piège de garde : le champ provision verrouille le passage en rédaction.

### Kit 2 — Transformation AE → SARL-AU (5 500 DH HT + débours)
Documents : `01` + `07_Lettre_Mission_Planning.md` (le planning de transformation est fait de dépendances :
RC, statuts, banque, fiscal — la lettre de mission conditionnelle est indispensable ici plus qu'ailleurs).
Jalons types : documents d'associé unique / statuts / dépôt RC / publication / enregistrement-classements fiscaux / kits post-immatriculation.
Débours (frais de greffe, publicité légale, honoraires intermédiaires) suivis dans un tableau dédié, jamais absorbés dans les honoraires.
Références niches : `01_Strategy/03_Unsaturated_Niches_Overview/08_Niche6_AE_vers_SARL.md`.

### Kit 3 — Retainer mensuel (2 500-4 500 DH HT/mois)
Documents : `01` + trame de revue hebdo (Loom) + `06` (mensualité facturée d'avance).
Particularité : les jalons ne sont pas une fin mais un cycle — la fiche pré-peuple la revue hebdo récurrente ET l'alerte churn : deux signaux = alerte, trois = entretien de sauvetage (mécanique héritée de l'ancien dossier client-psychologie, désormais dans [[09_Audit_Mensuel_Cabinet]] et [[18_Intelligence_Emotionnelle_Desescalade/06_Clients_Hypervigilants]]).
Référence prix et contrat : [[12_Finance_Cabinet_OS/06_Abonnement_Retainer]].

### Kit 4 — Conformité 09-08 (mission ponctuelle ou entrée de retainer)
Documents : `05_Registre_09-08_Modele.md` + `01` + `08`.
Jalons : inventaire des traitements / registre / mentions et politiques / désignations si requis.
Base légale réelle : la loi 09-08 est le texte marocain en vigueur sur la protection des données — c'est le seul dossier où l'on n'a pas le droit d'écrire « on verra plus tard », d'où son kit dédié (niche : `01_Strategy/03_Unsaturated_Niches_Overview/05_Niche3_Conformite_09-08.md` ; liens `02_Niches_Deep_Dive`).

## EXEMPLE : ouvrir la mission de Yassine en 90 secondes

Lundi, bloc admin.
Le pack de Yassine est signé, provision encaissée dimanche soir.
Dans Notion : « Nouveau dossier → Kit Pack freelance ».
La fiche arrive avec : convention et contrat du pack déjà copiés en brouillons liés, provision marquée encaissée (sinon le statut se refuse à « en rédaction »), dix jalons prédatés en conditionnel, trois calendriers rappels J-2/J-1 créés, timer Clockify prêt à démarrer.
Tu ne décides plus que du métier : quelles clauses du kit 3 méritent adaptation à SON activité de sous-traitance offshore.
Vingt minutes plus tard, dans le bloc rédaction du mardi, l'adaptation est faite.

## PIÈGES

- **Le kit qui pourrit** : un template non révisé devient faux (clause abrogée, prix périmé, référence légale dépassée).
  La revue mensuelle ([[09_Audit_Mensuel_Cabinet]]) tire au sort un kit et le vérifie de bout en bout — un par mois, les quatre sont revus par trimestre.
- **Le kit qui dérive en usine à gaz** : toute nouvelle brique proposée doit avoir servi trois fois à la main d'abord (règle des trois fois, version templates).
- **Copier-coller d'un dossier à l'autre sans passer par le kit** : c'est ainsi qu'un nom de client précédent voyage dans une convention — incident classé, checklist contrôle qualité (étape « zéro donnée d'un autre client » de [[02_Bibliotheque_SOP_Pack_Freelance]]).
- **Créer un kit pour une mission rare** : deux occurrences ne valent pas un kit ; une occurrence = une fiche manuelle.
  Les kits ne se justifient que pour les flux : pack freelance, SARL-AU, retainer, 09-08.

## Raccord avec le reste du dossier

Le kit est le bras armé de la SOP : la SOP dit l'ordre des étapes, le kit fournit la matière de chaque étape, le calendrier retient les dates, l'audit corrige les deux.
La bibliothèque se construit donc dans cet ordre — SOP d'abord, kit ensuite — et jamais l'inverse ([[01_Theorie_SOP_Pour_Avocat]]).

## COMMENT créer un kit en une heure (procédure)

1. Prendre la dernière mission réelle du type, documents en main (30 min) : tout ce qui a été produit, dans l'ordre où ça a été produit.
2. Écrire la liste des étapes — c'est la SOP ; si elle n'existe pas encore, le kit attendra une semaine ([[01_Theorie_SOP_Pour_Avocat]]).
3. Pour chaque étape, associer le document maître existant de la Document Bank : si aucun n'existe, c'est une nouvelle brique — elle entre dans la Document Bank d'abord, dans le kit ensuite.
4. Créer le modèle Notion avec les huit champs standards ; pré-écrire les jalons en conditionnel avec leurs rappels J-2/J-1.
5. Verrouiller : le champ « provision encaissée » conditionne le passage au statut rédaction — une règle, pas une prière.
6. Tester sur la prochaine mission du type sans rien changer pendant l'exécution ; les corrections se notent, elles s'appliquent à l'audit.

## Règles d'hygiène des kits (revue trimestrielle)

- Un fichier de template modifié porte sa date de révision en tête + une ligne de motif dans la fiche d'audit ; sans motif écrit, la modification est annulée.
- Un kit sans mission dans les six mois est archivé, pas supprimé — il reviendra avec la niche qui le ressuscite.
- Les montants d'un kit ne se lisent jamais seuls : ils se recalent à l'arbre de prix ([[12_Finance_Cabinet_OS/09_Arbre_Prix_Mission]]) lors de la révision.
- Deux kits concurrents pour le même type de mission = l'un des deux meurt à l'audit ; la bibliothèque se réduit plus souvent qu'elle ne grossit.
- Le contenu juridique d'un kit engage le cabinet : toute clause des templates est à re-vérifier à chaque évolution du RC, de la fiscalité ou de la loi 66-23 [flag transposition en cours].

> **Lecture pro :** les kits décrivent l'organisation interne du cabinet fictif — les prix, jalons et champs Notion sont des hypothèses de travail à valider ; les débours, délais RC et formalités d'immatriculation évoluent et se vérifient à la source officielle avant chaque mission réelle.

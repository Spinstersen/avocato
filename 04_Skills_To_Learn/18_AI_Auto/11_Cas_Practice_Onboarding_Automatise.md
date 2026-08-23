# 11 — Cas pratique : un onboarding 100 % automatisé, minute par minute

> Le meilleur test d'un système est une chronologie réelle. Voici le parcours complet de « Karim B. », prospect du mardi 22 h, devenu dossier actif signé et financé en 4 jours — avec, pour chaque étape, ce que le système fait et ce que l'avocat garde sous contrôle.

**Temps de lecture : 9 min · Niveau : synthèse · Piste : 04_Skills_To_Learn/18_AI_Auto**

**Liens :** Carte architecture `01_OS_Architecture_No_Code_Map.md` · Zaps `02_Zaps_15_Automatisations_Ready.md` · Notion `03_Notion_Pipeline_Clients_DB_Schema.md` · Anonymisation `05_Anonymisation_Pipeline_IA_Loi0908.md` · Drive `08_GoogleDrive_Structure_Conformite_0908.md`

## Objectifs

- Visualiser le système complet à travers un cas unique de bout en bout.
- Identifier les points où l'humain doit intervenir (et pourquoi ils sont non négociables).
- Reproduire ce scénario dans votre cabinet avec vos propres durées.

## Prérequis

- Architecture installée : Tally → Notion → Calendly → Yousign → Stripe → Loom → Drive (fichiers 01 à 08).
- Z1, Z3, Z4, Z5, Z6 actifs et testés.
- Convention type prête dans Yousign ; template V1 Loom enregistré.

## TL;DR

**Mardi 22 h : formulaire rempli. Mercredi 7 h : fiche créée, email parti. Jeudi 11 h : diagnostic 45 min. Vendredi 9 h : convention envoyée, signée à 14 h, provision Stripe reçue à 16 h, dossier Drive créé, vidéo d'accueil livrée. Délai total : 66 heures dont ~50 minutes de temps avocat (estimation).** Avant automatisation, le même parcours prenait 6-10 jours et ≈ 78 minutes administratives par contact.

## Contenu principal

### La chronologie complète

| Moment | Ce qui se passe | Acteur | Zap | Temps avocat |
|---|---|---|---|---|
| Mar 22 h 07 | Karim remplit le Tally : identité contact, matière (social), description libre | Client | — | 0 |
| Mar 22 h 07 | Consentement finalité affiché et coché sur le formulaire ; donnée inscrite au registre | Système | — | 0 |
| Mar 22 h 08 | Fiche Notion créée, statut « Prospect », source tracée | Système | Z1+Z2 | 0 |
| Mar 22 h 08 | Email accueil automatique : accusé + lien Calendly personnalisé | Système | Z1 | 0 |
| Mer 7 h 15 | Revue matinale des nouvelles fiches : qualification juridique rapide, matière confirmée | Avocat | — | **6 min** |
| Mer 9 h 30 | Karim réserve le diag de jeudi 11 h via Calendly | Client | Z3 | 0 |
| Mer 9 h 30 | Statut → « Diag planifié » ; date posée dans la base Échéances | Système | Z3 | 0 |
| Mer 19 h | Rappel J-1 automatique envoyé | Système | Z4 | 0 |
| Jeu 10 h 55 | Rappel final ; Karim connecté | Système | Calendly | 0 |
| Jeu 11 h-11 h 45 | Diagnostic : faisabilité, stratégie, fourchette honoraires, provision 50 % annoncée | Avocat | — | **45 min** |
| Jeu 12 h 10 | Décision GO ; convention générée depuis template, variables remplies, envoi Yousign | Avocat | — | **7 min** |
| Ven 8 h 40 | Relance douce auto car enveloppe vue non signée | Système | Z7 | 0 |
| Ven 13 h 58 | Karim signe électroniquement ; PDF signé archivé Drive `01_Convention` ; statut « Signé » | Client+Système | Z5 | 0 |
| Ven 14 h 05 | Lien Stripe de provision (50 %) envoyé depuis la fiche | Avocat | — | **2 min** |
| Ven 16 h 22 | Paiement reçu ; reçu automatique ; statut → « Actif » | Système | Z6 | 0 |
| Ven 16 h 25 | Dossier Drive créé depuis arborescence standard `_CLI-2026-021_...` | Système | Z12 | 0 |
| Ven 16 h 30 | Vidéo accueil V1 personnalisée (prénom + matière) et envoyée | Avocat | — | **5 min** ⚠️ vérif vignette |
| Lun 8 h | Première tâche du mandat dans la base Échéances ; rituel hebdo Loom programmé | Avocat | — | **5 min** |

Total temps avocat ≈ **70 minutes**, dont 45 min de diagnostic facturable intellectuellement — le reste est du contrôle humain aux points de décision. Le système a exécuté ~15 actions sans intervention.

### Les 5 points de contrôle humain (non négociables)

1. **Qualification du mercredi matin (6 min) :** le système ne juge pas si le dossier vaut un mandat. Un spam ou un conflit d'intérêts est écarté ici.
2. **Le diagnostic lui-même :** c'est le cœur juridique — aucune IA ni Zap n'y participe.
3. **La décision GO + envoi convention (7 min) :** variables vérifiées, honoraires cohérents avec la Numbers Sheet.
4. **Le lien de paiement (2 min) :** montant exact de la provision, mention des frais carte le cas échéant [vérifier tarifs Stripe Maroc].
5. **La vidéo d'accueil (5 min) :** personnalisation nominative + vérification qu'aucune donnée d'un autre client n'apparaît à l'écran (fichier 07).

⚠️ Tout le reste est délégué à la mécanique. Cette frontière — décider = humain, répéter = machine — est la ligne éthique ET commerciale du cabinet automatisé.

### Ce que le système garantit (et pas l'avocat fatigué)

Aucun prospect sans réponse structurée en moins de 12 h. Aucun no-show sans rappel préalable. Aucune convention perdue dans les spams (relance auto). Aucun démarrage de mandat sans provision encaissée. Aucun document signé hors du dossier Drive. Chaque étape horodatée : en cas de litige sur les délais ou les honoraires, la chronologie ci-dessus EST votre preuve.

### Variantes selon la situation

Prospect urgent (garde à vue, référé) : le parcours se compresse manuellement — appel direct, convention express Yousign mobile, provision par lien avant raccrocher. Le système n'empêche jamais l'urgence ; il rattrape ensuite la paperasse (fiche complétée à chaud, 3 min). Prospect non qualifié : statut « Écarté » avec motif — alimente vos statistiques de conversion sans polluer le pipeline.

## Cas pratique chiffré

Comparaison sur 12 contacts entrants/mois. Parcours AVANT (tout manuel) : premier retour sous 24-48 h, RDV fixé après 3 emails aller-retour (~25 min), convention rédigée à zéro chaque fois (~20 min), signature papier sous 5-10 jours, provision vérifiée manuellement au relevé (~8 min), démarrage réel moyen J+8. Parcours APRÈS (chronologie ci-dessus) : premier retour < 12 h, convention depuis template (7 min), signature électronique moyenne J+3, provision encaissée avant tout travail, démarrage réel J+4. Effets cumulés mensuels : ≈ 13 h administratives économisées (estimation fichier 02), taux de conversion 20 % → 28 % (relances systématisées), trésorerie améliorée d'environ 2 semaines de délai d'encaissement. Sur 12 prospects : +1 mandat gagné/mois en moyenne (estimation prudente) — c'est là que se joue le vrai ROI, bien au-delà des heures.

## Erreurs Top 5 (avec coût)

| # | Erreur | Coût |
|---|---|---|
| 1 | Laisser le système qualifier seul (« réponse automatique = mandat accepté ») | Engagements impossibles tenus par écrit ; responsabilité professionnelle |
| 2 | Démarrer le travail avant provision encaissée | Impayés structurels ; recouvrement ≈ 3 h/dossier |
| 3 | Envoyer la convention sans relire les variables | Mauvais nom/montant chez le client ; crédibilité entamée |
| 4 | Oublier de créer le dossier Drive après signature | Documents dispersés ; retrouvailles × 10 lors du procès |
| 5 | Vidéo d'accueil avec données d'un autre client visibles | Violation secret art. 36 + exposition 09-08 |

## Checklist 12 points

- [ ] Chronologie reproduite avec vos durées réelles sur UN prospect test
- [ ] Les 5 points de contrôle humain identifiés dans votre process
- [ ] Email accueil relu et validé avant activation
- [ ] Lien Calendly personnalisé fonctionnel depuis l'email auto
- [ ] Rappels J-1/J-0 testés (no-show mesuré avant/après)
- [ ] Convention template avec variables vérifiées
- [ ] Provision exigée AVANT tout travail — règle affichée
- [ ] Archivage automatique du PDF signé vérifié
- [ ] Statut « Actif » déclenché uniquement par paiement reçu
- [ ] Dossier Drive créé selon arborescence standard
- [ ] Vidéo V1 personnalisée + vignette contrôlée ⚠️
- [ ] Chronologies horodatées conservées comme preuve de diligence

## QCM

**Q1.** Quel est le délai cible entre formulaire rempli et première réponse structurée ?
- A. 72 heures
- B. Moins de 12 heures (email automatique immédiat + revue matinale)
- C. Une semaine
- D. Peu importe

> **Réponse : B —** l'email part en 60 secondes et votre revue matinale qualifie en 6 minutes. Au-delà de 12 h, le prospect consulte un concurrent — la réactivité est la moitié de la conversion.

**Q2.** Quand démarre-t-on le travail sur le dossier ?
- A. Dès la promesse verbale
- B. Après signature ET provision encaissée
- C. Dès l'envoi de la convention
- D. Selon la sympathie du client

> **Réponse : B —** signature + provision : deux faits horodatés par le système. Cette règle unique élimine la majorité des impayés structurels et rend la chronologie opposable en cas de désaccord.

**Q3.** Pourquoi la chronologie horodatée est-elle un actif ?
- A. Pour décorer le CRM
- B. Elle constitue la preuve de diligence (délais respectés, rappels envoyés, provisions demandées) en cas de litige
- C. Pour facturer plus
- D. Elle ne sert qu'au marketing

> **Réponse : B —** chaque action automatique laisse une trace datée : c'est votre défense documentée face à un client mécontent ou un désaccord sur les délais — preuve construite à froid, utilisable à chaud.

## Fiches révision

**Carte 1 — Le délai global.** Recto : formulaire → dossier actif ? Verso : ≈ 66 h (mardi soir → vendredi après-midi) dont ~70 min de temps avocat (estimation).

**Carte 2 — Les 5 points humains.** Recto : lesquels ? Verso : qualification matinale · diagnostic · GO + convention · lien provision · vidéo d'accueil contrôlée.

**Carte 3 — La double clé de démarrage.** Recto : condition de démarrage du mandat ? Verso : signature électronique reçue ET provision encaissée — sinon rien ne commence.

## EN - Key takeaways

One real timeline beats theory: a lead fills the form Tuesday at 22:07; the system creates the Notion card and sends the welcome email within sixty seconds; your six-minute morning review qualifies it; Calendly books Thursday's forty-five-minute diagnostic with automatic J-1 reminders; the fee agreement goes out from a Yousign template seven minutes after the call; Friday afternoon brings the e-signature, the archived PDF, the fifty percent Stripe provision, the auto-created Drive folder, and a personalized welcome video — total elapsed time about sixty-six hours, total lawyer time roughly seventy minutes including the billable diagnostic. Five human checkpoints remain non-negotiable: qualification, diagnosis, the go decision, payment link accuracy, and video privacy check. Nothing starts without signature AND collected provision. The timestamped chronology doubles as documentary evidence of diligence, while conversion climbs from twenty to twenty-eight percent purely through systematic follow-ups — an honest estimate worth more than the thirteen hours saved monthly.

## AR - ملخص ومصطلحات

| FR | AR |
|---|---|
| Onboarding (accueil client) | استقبال ودمج العميل |
| Chronologie horodatée | سلسلة زمنية موثقة بالتوقيت |
| Provision encaissée | تسبيق محصَّل |
| Point de contrôle humain | نقطة تدخل بشري |
| Qualification du prospect | تأهيل المستفيد المحتمل |
| Convention d'honoraires | اتفاقية الأتعاب |

- Darija : "Mn formulaire l dossier actif f 3 iyam — w nta khdemti ghir sa3a w nos."
- "Ma-kayn khedma bla signature w tasbiq — hadi qanoun dyar, machi ikhtiyar."

---
**Sources primaires :** cndp.ma (Loi 09-08, délib. 40-22) · sgg.gov.ma · CNIL.fr (référence RGPD comparative). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Aucune donnée client dans une IA sans anonymisation préalable (secret art.36). QCM pédagogique — aucun certificat.

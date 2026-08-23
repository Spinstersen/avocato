# 09 — Coûts du stack et ROI chiffré

> Le ROI d'une automatisation ne se débat pas : il se calcule. Heures rendues × valeur horaire − coût du stack = résultat net mensuel. Cette démonstration utilise des fourchettes qualitatives pour les abonnements [prix éditeur, vérifier] et un seul chiffre ferme assumé : la commission Stripe ~2,9 % + 3 DH sur carte internationale.

**Temps de lecture : 9 min · Niveau : intermédiaire · Piste : 04_Skills_To_Learn/18_AI_Auto**

**Liens :** Gains par Zap `02_Zaps_15_Automatisations_Ready.md` · Chiffres de référence `../07_Sharp_Legal_Mind/03_Numbers_Sheet.md` · Finance cabinet `../12_Finance_Cabinet_OS/00_INDEX.md`

## Objectifs

- Construire votre propre tableau de coûts en 30 minutes, avec des fourchettes honnêtes.
- Calculer le ROI selon 3 scénarios (prudent, central, ambitieux).
- Décider objectivement : où automatiser ensuite, et où s'arrêter.

## Prérequis

- Gains estimés par Zap (fichier 02) recalibrés après 30 jours d'usage réel.
- Votre valeur horaire connue (voir `../07_Sharp_Legal_Mind/03_Numbers_Sheet.md`) — hypothèse de travail dans ce fichier : 600 DH/h, à remplacer par la vôtre.
- Accès aux pages tarifaires des éditeurs pour relever les paliers actuels.

## TL;DR

**ROI = (heures économisées × valeur heure) − coût stack.** Scénario central solo : ≈ 11 h/mois × 600 DH ≈ 6 600 DH de valeur rendue contre un coût d'abonnements de l'ordre de quelques centaines à ~1 500 DH/mois selon les paliers retenus [prix éditeur, vérifier] → le système s'amortit dès qu'il rend ~2-3 heures/mois. Le vrai risque n'est pas le prix des outils ; c'est le temps perdu à sur-outiller.

## Contenu principal

### Tableau des coûts (qualitatif assumé)

| Outil | Rôle | Modèle de coût | Fourchette indicative |
|---|---|---|---|
| Tally | Capture prospects | Freemium | Gratuit au départ ; palier si champs avancés [prix éditeur, vérifier] |
| Notion | CRM + SOP | Freemium | Palier payant utile dès plusieurs utilisateurs [prix éditeur, vérifier] |
| Calendly | Diag 45 min | Freemium | Palier nécessaire aux rappels automatiques avancés [prix éditeur, vérifier] |
| Yousign | Signatures | Abonnement mensuel | Par paquets de signatures [prix éditeur, vérifier] |
| Stripe | Provision 50 % | À l'usage | Commission ~2,9 % + 3 DH carte internationale [vérifier tarifs Stripe Maroc] |
| Loom | Vidéos SOP/suivi | Freemium | Palier pour durée/bibliothèque étendue [prix éditeur, vérifier] |
| Zapier ou Make | Orchestration | Paliers opérations | Croissance avec volume ; Make souvent plus dense à palier égal [prix éditeur, vérifier] |
| Google Workspace | Email + Drive | Par utilisateur | Palier business standard [prix éditeur, vérifier] |

Règle anti-inflation : chaque abonnement doit être rattaché à un Zap ou à une fonction de la carte architecture (fichier 01). Un outil sans flèche assignée se résilie au prochain cycle.

### Le calcul de ROI pas à pas

```text
ÉTAPE 1 — Heures rendues (issues du fichier 02, recalibrées)
   Z1 capture ............ 1,5 h     Z5 signature ....... 0,75 h
   Z4 no-show ............ 1,0 h     Z9 échéances ....... 2,0 h
   Z13 récap ............. 1,5 h     Autres ............. 4,25 h
   TOTAL CENTRAL ≈ 11 h/mois   (fourchettes : prudent 7 h / ambitieux 14 h)

ÉTAPE 2 — Valeur horaire (hypothèse de travail : 600 DH/h)
   Prudent    7 h × 600  = 4 200 DH/mois
   Central   11 h × 600  = 6 600 DH/mois
   Ambitieux 14 h × 700  = 9 800 DH/mois

ÉTAPE 3 — Coût stack (fourchettes [prix éditeur, vérifier])
   Démarrage frugal (freemiums + orchestrateur entrée) :
      ≈ quelques centaines de DH/mois
   Stack confort (paliers payants partout) :
      ≈ 800 à 1 500 DH/mois selon options signatures/volume

ÉTAPE 4 — ROI mensuel
   Prudent   : 4 200 − ~800  ≈ +3 400 DH
   Central   : 6 600 − ~1200 ≈ +5 400 DH
   Ambitieux : 9 800 − ~1500 ≈ +8 300 DH
   → Point mort : le système est rentable dès ~2 h rendues/mois.
```

⚠️ Deux corrections d'honnêteté : (1) la commission Stripe n'est pas un « coût du stack » à supprimer mais un coût de recouvrement qui réduit vos impayés — comparez-la au coût réel d'un virement non reçu puis relancé manuellement (~20 min + friction client) ; (2) les heures « rendues » ne deviennent du revenu que si vous les remplacez par du facturable ou du développement commercial — sinon elles deviennent du sommeil, ce qui est aussi un investissement, mais mesurons-le autrement.

### Où le ROI est le plus rapide

Classement par ratio gain/effort constaté : 1) rappels RDV automatiques (Z4) — tue les no-shows sans compétence technique ; 2) capture CRM (Z1) — supprime la double saisie ; 3) relances impayés (Z10) — récupère du cash pur ; 4) backup hebdo (Z14) — assurance quasi gratuite ; 5) tout le reste. Les scénarios exotiques (IA vocale, chatbots) viennent APRÈS que ces cinq-là tournent depuis 90 jours.

### Le coût caché n° 1 : le temps de maintenance

Comptez ~1 % de votre temps sur la maintenance du système (revoir un Zap cassé, mettre à jour un template) soit ≈ 30 min/mois au régime de croisière, plus ~2 h lors des changements d'outil éditeur. Intégrez-le au calcul : c'est la raison pour laquelle « moins d'outils, mieux branchés » bat toujours « tous les outils, mal câblés ».

## Cas pratique chiffré

Cabinet solo, Casa-Anfa, démarrage stack complet en janvier. Investissement temps : 20 h de mise en place réparties sur 8 semaines (fichier 02). Coûts mensuels relevés : orchestrateur premier palier + Workspace + Yousign petit paquet + Loom palier bas, total ≈ 900-1 200 DH/mois [prix éditeur, vérifier]. Gains recalibrés à J+60 : 10,5 h/mois × 600 DH = 6 300 DH. Effet cash additionnel : Z10 a raccourci le délai moyen d'encaissement de ~38 à ~21 jours sur 4 factures (estimation), amélioration de trésorerie sensible sans un dirham de chiffre supplémentaire. Bilan mois 3 : ROI net ≈ +5 000 DH/mois, point mort atteint dès la semaine 5. Décision consécutive : résiliation de deux outils non assignés (une app de notes payante, un plan Calendly supérieur au besoin) → −260 DH/mois retrouvés.

## Erreurs Top 5 (avec coût)

| # | Erreur | Coût |
|---|---|---|
| 1 | Empiler les outils sans flèche assignée sur la carte | 200-500 DH/mois brûlés + complexité ; audit annuel pénible |
| 2 | Prendre les paliers max « au cas où » | Surcoût immédiat ; downgrade possible chez la plupart des éditeurs [vérifier] |
| 3 | Ignorer les frais bancaires internationaux sur abonnements | Frais cachés mensuels [vérifier auprès de sa banque] |
| 4 | Confondre heures libérées et revenu créé | ROI fantasmé ; frustration et abandon injustifié |
| 5 | Oublier la commission Stripe dans le prix affiché au client | Marge rognée sur chaque provision ; prévoir la ligne « frais de paiement » |

## Checklist 12 points

- [ ] Valeur horaire personnelle notée (Numbers Sheet)
- [ ] Heures rendues mesurées à J+30 (pas seulement estimées)
- [ ] Tableau des abonnements à jour avec date de renouvellement
- [ ] Chaque outil rattaché à une flèche de la carte architecture
- [ ] Outils non assignés identifiés et programmés pour résiliation
- [ ] Tarifs re-vérifiés chez les éditeurs avant renouvellement annuel [vérifier]
- [ ] Frais bancaires internationaux connus et notés
- [ ] Commission Stripe intégrée dans le calcul de marge des honoraires
- [ ] ROI calculé selon les 3 scénarios (prudent/central/ambitieux)
- [ ] Temps de maintenance comptabilisé (~30 min/mois)
- [ ] Décision « outil suivant » fondée sur le classement gain/effort
- [ ] Revue trimestrielle coûts/gains posée au calendrier

## QCM

**Q1.** Quelle formule donne le ROI mensuel du stack ?
- A. CA total ÷ nombre d'outils
- B. (Heures économisées × valeur heure) − coût du stack
- C. Coût du stack × 12
- D. Nombre de Zaps × valeur heure

> **Réponse : B —** heures rendues valorisées moins coûts d'abonnements. Le nombre de Zaps (D) ne mesure rien en soi ; seul le temps réellement rendu crée de la valeur.

**Q2.** Comment traiter la commission Stripe ?
- A. Comme un coût inutile à éviter absolument
- B. Comme un coût de recouvrement à intégrer dans la marge, comparé au coût des impayés et relances manuelles
- C. Comme un investissement amortissable
- D. On ne peut pas payer par carte au Maroc

> **Réponse : B —** ~2,9 % + 3 DH sur carte internationale [vérifier tarifs Stripe Maroc] achète un encaissement immédiat et traçable de la provision. Comparé à un virement oublié puis relancé manuellement, le rapport coût/service est généralement favorable — à intégrer dans le barème des honoraires.

**Q3.** Quel est le meilleur indicateur pour choisir le prochain Zap à installer ?
- A. Le plus spectaculaire technologiquement
- B. Le ratio gain de temps / effort de mise en place, en commençant par rappels RDV et capture
- C. Celui que fait le concurrent
- D. Un tirage au sort

> **Réponse : B —** le classement gain/effort met Z4 (no-shows) et Z1 (capture) en tête : gains immédiats, mise en place d'une demi-journée. La technologie impressionnante vient après que les fondamentaux tournent depuis 90 jours.

## Fiches révision

**Carte 1 — La formule.** Recto : ROI mensuel ? Verso : (heures économisées × valeur heure) − coût stack ; point mort ≈ 2-3 h rendues/mois.

**Carte 2 — Le top gain/effort.** Recto : les 5 premiers ? Verso : Z4 rappels RDV → Z1 capture → Z10 impayés → Z14 backup → le reste après 90 jours.

**Carte 3 — Les coûts cachés.** Recto : les 3 à ne jamais oublier ? Verso : commission Stripe dans la marge, frais bancaires internationaux, ~30 min/mois de maintenance.

## EN - Key takeaways

Return on investment is arithmetic, not opinion: hours returned multiplied by your hourly value minus the stack's monthly cost. Using the calibrated estimates from the zap catalog (central scenario: eleven hours monthly at an assumed 600 DH/hour ≈ 6,600 DH of value) against subscription ranges of roughly several hundred to 1,500 DH monthly — always verified with each editor before renewal — the system breaks even once it returns two to three hours per month. Treat Stripe's ~2.9% + 3 DH international card commission as a collection cost to price into your fees, weighed against manual recovery of unpaid provisions; verify current Morocco pricing directly with Stripe. Rank next installations by time-saved-over-setup-effort: appointment reminders first, then CRM capture, then unpaid-invoice sequences. Account for hidden costs — international card bank fees and about thirty minutes of monthly maintenance — and kill any tool that no longer maps to an arrow on your architecture diagram.

## AR - ملخص ومصطلحات

| FR | AR |
|---|---|
| Retour sur investissement (ROI) | العائد على الاستثمار |
| Valeur horaire | القيمة الساعية |
| Abonnement mensuel | اشتراك شهري |
| Commission de paiement | عمولة الدفع |
| Point mort | نقطة التعادل |
| Frais cachés | التكاليف الخفية |

- Darija : "L-ROI howa hissa: sa3at mrta7bin × qimat sa3tek − taman dyal l-abonnements."
- Darija : "Kol 3am wajed les-tarifs dyal les-editeurs — kaybedlohom bezzaf."

---
**Sources primaires :** cndp.ma (Loi 09-08, délib. 40-22) · sgg.gov.ma · CNIL.fr (référence RGPD comparative). Dernière vérification : 23/08/2026.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Aucune donnée client dans une IA sans anonymisation préalable (secret art.36). QCM pédagogique — aucun certificat.

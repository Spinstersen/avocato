# Métriques de rentabilité : le taux horaire réel et le seuil de survie

> Combien gagne réellement une heure du cabinet ?
> La réponse n'est pas le tarif catalogue : c'est le tarif multiplié par le taux de réalisation, moins les charges, moins les impôts.
> Ce fichier donne les deux calculs que tout le reste du dossier 12 suppose — le taux horaire post-charges et le seuil de rentabilité annuel — plus les quatre chiffres du lundi.

## POURQUOI le taux horaire « apparent » est un mensonge

- Le client voit 450 DH HT/heure ; la structure voit, sur cette heure : 450 × taux de réalisation (les heures non facturées existent) − part de charges − part d'impôt.
Selon les hypothèses du calcul-type du vault, une heure « vendue » à 450 peut rendre, net de tout, moins qu'une heure de n'importe quoi d'autre — et c'est réparable, mais seulement une fois chiffré.
- Sans ces deux nombres, le pricing est une opinion ([[01_Pricing_3_Options]]) et la négociation n'a pas de plancher ([[11_Negotiation_Psychology/01_BATNA_ZOPA_Calculateur]]) : tout ce dossier 12 est construit sur eux.

## COMMENT : calcul 1 — le vrai taux horaire post-charges

```
Ingrédients (à relever sur 3 mois réels) :
A. Heures travaillées (time tracking : Clockify/Toggl — erreur 2 de [[07_Erreurs_Finance]])
B. Heures facturées (sur la même période)
C. CA facturé HT encaissé
D. Charges totales de la période (fixes + variables non facturées)
E. Impôts sur le revenu société (IR ou IS, à votre régime — [[05_Comparatif_Statuts_Fiscal]])

Étapes :
1. Taux de réalisation   = B ÷ A                       (ex. 260 h ÷ 520 h = 50 %)
2. Recette brute horaire = C ÷ B                        (ex. 90 000 ÷ 260 = 346 DH)
3. Taux chargé           = (C − D) ÷ B                  (ex. (90 000 − 25 000) ÷ 260 ≈ 250 DH)
4. Taux horaire NET      = (C − D − E) ÷ B              (ex. (90 000 − 25 000 − 12 000) ÷ 260 ≈ 204 DH)
```
Lecture : si l'étape 1 vaut 50 %, chaque heure travaillée doit porter deux heures de survie — le tarif catalogue se lit TOUJOURS au travers de la réalisation.
Et c'est le taux NET (étape 4), pas le tarif, qui doit être comparé à l'alternative de votre heure ailleurs (salaire net d'un équivalent, rendement d'un autre projet) : le vrai coût d'opportunité est là.

Les trois leviers de progression, par ordre d'effort :

| Levier | Gisement typique (hypothèse à valider) | Comment |
|---|---|---|
| Réalisation rate | + 10 à + 20 pts | Suivi du temps → suppression des fuites admin, relances automatisées, modèles internes |
| Panier moyen | + 5 à + 15 % | Options plutôt que remises, upsell retainer ([[06_Abonnement_Retainer]]) |
| Charges | − 5 à − 10 % | Outils payants non lus, locaux surdimensionnés, temps non facturé — pas l'assurance RC ni la formation |

## COMMENT : calcul 2 — le seuil de rentabilité annuel

Le point mort du cabinet : le CA encaissé qui couvre exactement charges + rémunération de l'associé.

```
F = charges fixes annuelles                       (ex. 7 800 × 12 = 93 600 DH)
R = rémunération cible de l'associé (avant IR)    (ex. 180 000 DH)
T = taux de charges sur CA (ex. 0,40)             (cf. calcul-type dossier 11)

CA seuil (HT) = (F + R) ÷ (1 − T)
              = (93 600 + 180 000) ÷ 0,60 ≈ 456 000 DH HT/an

En missions : 456 000 ÷ 2 900 ≈ 157 packs Essential
           ou ÷ 5 900 ≈  77 packs Business
           ou en mix réaliste (ex. 60 % Essential / 25 % Business /
             15 % Premium, panier moyen ≈ 4 300) ≈ 106 missions
           + le socle retainer qui baisse d'autant la partie one-shot :
             6 retainers Starter = 180 000 DH HT/an ≈ 40 % du seuil déjà couvert.
```

Trois enseignements mécaniques : (a) le seuil se pilote mieux en baissant F qu'en montant le tarif —
F est le seul levier sous contrôle unilatéral ; (b) chaque DH de MRR retranche un DH au risque annuel — le socle récurrent est une assurance ([[06_Abonnement_Retainer]]) ; (c) la rémunération de l'associé N'EST PAS un bénéfice : un cabinet qui « ne se paie pas » n'est pas rentable, il est en auto-exploitation comptée comme marge.

## COMMENT : les 4 chiffres du lundi

Le tableau de bord minimal de l'associé qui ne veut pas devenir analyste — quatre nombres, relevés en 5 minutes ([[03_KPI_Cabinet_MRR]] pour les sept complets) :

| # | Chiffre | Où le lire | Question qu'il autorise |
|---|---|---|---|
| 1 | Solde compte pro | Banque | Peut-on accepter un dossier à paiement lent cette semaine ? |
| 2 | Somme des provisions attendues à J+15 | Notion devis signés | Le plan de trésorerie de la semaine tient-il ? |
| 3 | Missions closes non soldées (nb × montant) | CRM | Le recouvrement est-il le vrai chantier de la semaine ? |
| 4 | Heures facturées / travaillées (semaine) | Time tracker | La réalisation monte ou descend — et pourquoi ? |
La règle du lundi : si le chiffre 1 est sous le seuil de 3 mois de charges ([[02_Provision_Tresorerie]]), la semaine est dédiée au recouvrement et à la signature de provisions — pas à la rédaction.

## EXEMPLE : [cas illustratif] le cabinet qui travaillait beaucoup et gagnait peu

Six mois de pratique, 1 800 heures travaillées relevées au tracker, CA facturé 400 000 DH HT, charges 55 000.
Calcul de l'étape 1 : 1 800 heures ÷ 26 semaines ≈ 69 h/semaine travaillées pour 55 % de réalisation seulement — le taux horaire apparent était d'environ 400 DH par heure facturée, et le taux chargé retombait autour de 350 — à peine au-dessus du plancher de survie malgré 69 heures travaillées par semaine.
L'associé gagnait moins que ce qu'il aurait facturé en collaboration chez un confrère.
Les trois corrections du trimestre suivant : (1) devis systématiquement en trois options, fin des missions « à l'œil » non cadrées ([[01_Pricing_3_Options]]) ; (2) la hot line gratuite des anciens clients — les 20 % d'heures les plus noires — passée en forfait de conseil horaire ; (3) la rédaction de contrats standardisés en modèles internes : 14 h → 9 h par pack.
Réalisation au bout de six mois : 68 %, taux chargé remonté d'un tiers, MRR de 7 500 DH ajouté — sans avoir augmenté le catalogue d'un dirham.
Ce que le cas enseigne : quand le tarif semble bloqué, la rentabilité est presque toujours dans le dénominateur.

## Ce que ces chiffres ne disent pas

Le seuil de rentabilité ne dit pas la croissance ; la réalisation ne dit pas la qualité ; le MRR ne dit pas la satisfaction ([[10_Public_Speaking_Ateliers/07_Metriques_NPS]] la mesure).
Le pilotage financier est une condition, pas une finalité : la case du lundi suivante — celle qu'aucun tableau ne remplit — est « est-ce que je veux encore faire ce métier dans un an ? » (la lecture ADHD/énergie du vault : `00_Learning_Roadmap_2Week_Sprints/05_Gestion_Energie_Dopamine_Menu`).

## FAQ des métriques

**Faut-il payer un comptable pour ça ?** Le comptable produit et contrôle les chiffres légaux ; le pilotage (les 4 chiffres du lundi, le taux net trimestriel) est du ressort de l'associé — déléguer l'un n'exempte pas de tenir l'autre.
**Mon cabinet a deux associés : taux horaire individuel ou global ?** Les deux : le calcul-type se fait PAR associé (les heures facturables ne sont pas mutualisables), le seuil de rentabilité est GLOBAL (charges fixes + les deux rémunérations) ; c'est l'écart des deux taux qui arbitre qui prend quoi.
**Et les charges non prévisibles (redressement, grosse année d'IR) ?** Elles entrent au budget par provision de risque (ordre de grandeur à définir avec le comptable, ex. 5 % du CA — hypothèse, pas une norme) : un seuil qui n'a pas de marge d'erreur n'est pas un seuil, c'est une date de faillite.

## Plan d'action 30 jours

- Semaine 1 : mettre en place le time tracking s'il n'existe pas ([[07_Erreurs_Finance]], erreur 2) — sans heures, tous les calculs de ce fichier sont des opinions.
- Semaine 2 : premier calcul complet du taux horaire net (les 5 ingrédients relevés sur le trimestre clos).
- Semaine 3 : premier calcul du seuil de rentabilité ; identifier la semaine de l'année où le creux surviendra ([[02_Provision_Tresorerie]]).
- Semaine 4 : fixer les 4 chiffres du lundi et leur heure d'inscription dans l'agenda — non négociable, comme une audience.

> **Lecture pro :** Calculez le taux horaire net une fois par trimestre, à la main, avec vos trois chiffres réels — pas avec ceux de ce fichier.
> Un taux qui baisse trois trimestres de suite alors que le CA monte annonce un problème de structure, et un taux qui monte alors que le CA stagne annonce qu'il est temps d'augmenter les prix ou de refuser des dossiers.
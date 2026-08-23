# 03 — Holding / Filiale / Succursale : Comparatif 5 Colonnes

> **Pratique → limite → sanction → parade.** Trois structures, trois régimes. Le mauvais choix coûte plus que le mauvais pays. Sources : sgg.gov.ma Loi 5-96/17-95, conventions Maroc-France (29 mai 1970 art.10, Maroc-UAE 2022, Bofip, oc.gov.ma IGOC 2024.

## TL;DR

*   **Holding** = société mère qui détient des participations. Intérêt : régime mère-fille + consolidation. Exige substance (fichier 02).
*   **Filiale** = société distincte dans le pays cible, IS local plein. Intérêt : activité commerciale réelle sur place.
*   **Succursale (PE)** = extension sans personnalité juridique : bénéfice imposable dans les DEUX États dès qu'elle existe.
*   **Règle vault :** pas de holding sans substance payée ; pas de succursale sans avoir chiffré la double imposition.

## Tableau comparatif

| Critère | Holding Dubai | Filiale France | Succursale France | Estonia OÜ | US LLC Wyoming |
|---|---|---|---|---|---|
| Personnalité juridique | Oui (société UAE) | Oui (SAS/SARL FR) | Non (même personne) | Oui (OÜ) | Oui (LLC) |
| IS local | 9% >375k AED | 25% (+ impôts locaux) | IS France 25% sur bénéfice PE | 20% à distribution seulement | Pass-through : 0 fédéral si non-résident |
| Dividende vers Maroc | Convention MA-UAE 2022 art.10 | Conv. FR-MA du 29 mai 1970 art.10 : 10% | N/A (pas de dividende) | Pas de convention Maroc → droit commun | Conv. US-MA 1977 art.10 : 15% |
| Substance exigée pour taux réduit | Bureau + 2 salariés réels | N/A (activité réelle) | N/A | Conseil local réel | Activité + EIN + banque US |
| CRS | Actif (données depuis 2019) | Actif UE | Actif UE | Actif UE | FATCA + CRS partiel |
| Risque principal | Shell requalifié (PPT) | Coût total 25%+ | Double imposition immédiate | Pas de convention = pas de crédit Maroc | Qualification fiscale FR/Maroc incertaine |

## Quand choisir quoi (arbre simplifié)

```
Activité commerciale RÉELLE dans le pays cible ?
├─ OUI → Filiale (IS local assumé, crédibilité banque/client maximale)
└─ NON, juste détention de participations
    ├─ Flux dividendes >300k/an ET budget substance 60-100k/an OK ?
    │   ├─ OUI → Holding Dubai AVEC substance (fichier 06 cas chiffré)
    │   └─ NON → SARL Casa seule — l'arbitrage ne vaut pas le risque
    └─ Test de marché temporaire <12 mois ? → Succursale en connaissance de cause
        (chiffrer d'abord : bénéfice PE taxé France 25% SANS crédit automatique)
```

## La succursale : le piège du « simple bureau de liaison »

*   **Pratique observée :** ouvrir une succursale Paris « juste pour la présence commerciale ».
*   **Limite :** la succursale EST un établissement stable — son bénéfice attribuable est taxé en France (conv. art.7), et les pertes/initiales se consolident côté français.
*   **Sanction :** non-déclaration de la succursale = redressement France 5 ans + majoration 40% (Bofip) + blocage TVA intracommunautaire.
*   **Parade :** si présence nécessaire >6 mois → filiale SAS avec contrat de prestation écrit vers la SARL Casa (prix transfert benchmarkés, fichier 07).

## Chiffres à vérifier à chaque diagnostic

*   IS France 25% (PLF annuelle), IS Maroc 15% <300k bénéfice (CGI art.19, PLF).
   *   Retenue dividende : FR→MA 10% (conv. 29 mai 1970 art.10), UAE→MA selon conv. 2022, US→MA 15% (conv. 1977) — vérifier protocoles en vigueur.
*   UAE corporate tax 9% au-delà de 375k AED (décret-loi 47/2022) — vérifier FTA.
*   Estonia : 20/80 à distribution (0 tant que réinvesti) — vérifier eesti.ee.

## Sanctions transversales

Choisir la structure n'annule jamais : rapatriement 30j IGOC (flux vers Maroc), déclaration BO OMPIC (chaque maillon ≥25%), prix transfert CGI art.213 (chaque facture intragroupe), CRS/FATCA (chaque compte).

---

## Note de méthode professionnelle

Information doctrinale — art.59 Loi 28-08, secret art.36, convention art.30. Co-traitance comptable agréé + confrère juridiction cible obligatoires avant tout montage. Références primaires : `sgg.gov.ma`, `impots.gouv.fr` Bofip, `tax.gov.ae`, `emta.ee`, `irs.gov`, `oecd.org`.

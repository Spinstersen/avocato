# 03 — Format UBL et mentions obligatoires : la facture conforme

> **Vérifié le 23/08/2026** — format cité publiquement par la DGI : **UBL 2.1** (ou CII). Les mentions reprises = socle art.144/145 CGI + exigences Clearance.

## La double exigence

1. **Fond** : mentions obligatoires classiques (déjà obligatoires aujourd'hui — art.144 CGI, DOC preuve art.443).
2. **Forme électronique** : donnée structurée UBL/CII transmise à la plateforme DGI, validée (numéro unique + QR code).

Un PDF signé ≠ facture électronique conforme.

## Checklist mentions (à faire figurer dès maintenant)

| Bloc | Mentions | Base |
|---|---|---|
| Vendeur | Dénomination · **ICE** · IF · RC · adresse · contact | CGI art.144 / loi 31-08 |
| Client | Dénomination · ICE (si pro) · adresse livraison si ≠ | idem |
| Facture | Numérotation **séquentielle sans trou** · date | art.144 |
| Prestations | Désignation précise · quantité · prix unitaire | art.145 |
| Montants | HT · taux TVA (20 %/0 % export art.92) · TTC · conditions paiement | CGI |
| Export art.92 | Mention exonération + référence contrat + SWIFT/rapatriement 30j conservé | art.92 §04 |
| Électronique (à venir) | Numéro de validation DGI + QR code | art.145-IX [modalités décret] |

## Structure UBL en une ligne (pour comprendre, pas pour coder)

`UBL = XML standardisé : En-tête (parties, références) → Lignes (items, TVA par ligne) → Totaux → Référence validation DGI.` Votre rôle d'avocat : garantir que les **mentions légales** y figurent et que le contrat logiciel prévoit conformité + mise à jour réglementaire.

## Clause contractuelle à ajouter dans vos CGV/packs clients (modèle)

> « Le Prestataire mettra en œuvre les adaptations nécessaires à la conformité de la facturation aux obligations de facturation électronique (CGI art.145-IX et textes d'application), incluant mise à jour des mentions, du format et des flux, à mesure de leur publication. Toute évolution majeure de format fera l'objet d'un devis complémentaire. »

---

> Devoir art.59 — information doctrinale. Format définitif = norme/arrêté DGI. Vérifié le 23/08/2026.

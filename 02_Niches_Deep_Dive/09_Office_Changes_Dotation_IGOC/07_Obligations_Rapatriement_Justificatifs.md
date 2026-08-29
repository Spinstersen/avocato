# 07 — Le dossier de justificatifs export (l'écrit qui fait passer le contrôle)

> Le rapatriement (`05`) ne prouve pas seulement que l'argent est **rentré** — il prouve **pourquoi il était dû**. Vérifié 29/08/2026 : IGOC 2026 (délais, délégation bancaire), CGI (TVA export art. 92 ; facture art. 145).

## 1. Les trois pièces (et ce que chacune répond)

| Pièce | Question à laquelle elle répond | Exigence |
| :--- | :--- | :--- |
| **Contrat de prestation** (FR/EN) | « Cette somme est-elle une contrepartie réelle ? » | Objet, prix et devise, mode/lieu de paiement, loi applicable — **signé avant l'encaissement** ; un prix de marché explicite protège contre la qualification de mouvement de capital déguisé |
| **Facture** | « Le fait générateur est-il marocain-export ? » | Mentions légales CGI art. 145 (ICE/RC…), **mention d'exonération TVA art. 92 CGI** (« prestation de service exportée »), rapprochable du contrat |
| **Avis de crédit / SWIFT** | « La monnaie est-elle entrée par la banque ? » | Piste d'audit du virement (donneur → compte marocain) ; si encaissement via plateforme/intermédiaire : relevé + trail |

La banque (délégataire) tamponne et archive ; l'Office, lui, se satisfait du **dossier cohérent** — la cohérence = dates alignées (contrat → facture → crédit), montants identiques, tiers identiques.

## 2. Le calendrier du dossier (à tenir dans la fiche client)

```
J-30 : contrat signé ; nature « services » qualifiée ; prix de marché acté
J0   : facture émise (mention 92) ; échéance de paiement = point de départ
J0-90: RAPATRIEMENT EFFECTIF (encaissement compte marocain — `05` §1)
       → alerte interne J-15 avant échéance
J+90 : dossier archivé (contrat+facture+avis) ; registre des exportations à jour
Fin semestre : compte rendu / apurement selon profil (dématérialisé — `05`)
```

## 3. Modèle de facture (export services)

```
[SARL X — ICE ____ RC ____]        Facture n° 2026-012   Date: 15/03/2026
Client: ABC LLC (US) — adresse
Objet : développement logiciel — 40 h × 125 USD (réf. contrat du 10/01/2026)
Montant : 5 000,00 USD
TVA : exonération — art. 92 du CGI (prestation de service exportée, utilisée à l'étranger)
Paiement : virement USD — compte [banque — devise ____] ; SWIFT attendu ≤ 90 j (IGOC — délai services)
RIB: __________________
```

> La mention « IGOC délai services » n'est pas obligatoire sur la facture : elle **discipline** l'équipe. La ligne TVA, elle, protège le droit à exonération.

## 4. Quand le client ne paie pas (le retard qui ne vient pas de vous)

La réglementation n'exonère pas le retardataire « malgré lui » : l'exportateur doit **agir et prouver** ses diligences (relances écrites, mises en demeure, action contentieuse le cas échéant) **avant l'échéance des 90/150 j**, et informer la banque/Office — la parade procédurale est décrite en `08` (protocole en cas d'infraction) et se prépare en clause : tout contrat de prestation export utile contient une **clause « paiement et rapatriement »** (devises, modalités, date d'exigibilité claire — `13` S7).

## 5. Cas pratiques

**A. Le freelance qui encaisse via Payoneer/Wise** → la recette est « à l'étranger » tant qu'elle ne touche pas un compte marocain : le transfert Wise → compte marocain **est** le rapatriement — il doit intervenir dans les 90 j de l'exigibilité et non « quand le change est bon ». La fiche `13` S8 donne le réflexe : le solde de la plateforme est une position de change, pas une épargne.

**B. La SARL qui facture en dirhams à un client étranger** → la facture DH ne change pas la nature export du service, mais **complique la preuve de la contre-valeur reçue** et renforce le risque de taux de conversion appliqué unilatéralement : facturer **en devise** l'export, c'est aligner la monnaie du contrat, de la facture et du SWIFT.

**C. La plateforme étrangère qui retient déjà ses frais** (marketplace, ad network) → la pièce maîtresse est le **rapprochement** (état de compte plateforme + avis net + factures brutes) : c'est ce qui rend l'écart explicatif en banque.

## 6. Checklist du dossier export (10 points)

*   [ ] Contrat écrit, antérieur au premier euro encaissé
*   [ ] Prix de marché documenté (comparables/facturation horaire)
*   [ ] Factures conformes art. 145 + mention exonération art. 92
*   [ ] Devises : encaissement **compte marocain** (ou rapatriement tracé) ≤ 90 j
*   [ ] Alertes d'échéance paramétrées (J-15)
*   [ ] Registre des recettes export (mois, client, montant, date crédit)
*   [ ] Pièces d'identité du créancier étranger si paiement fractionné
*   [ ] En cas d'impayé : preuve des diligences **datée avant échéance**
*   [ ] Comptes rendus / apurement : profil et périodicité du client
*   [ ] Archivage 10 ans (prescription fiscale — `01/13`)

---

## Note de méthode professionnelle

Ce document s'inscrit dans la démarche `01_Strategy/01_Rules_Of_The_Game_No_Ads_Morocco/` : information sobre, références primaires (`oc.gov.ma`, `tax.gov.ma`), devoir d'information, secret professionnel, convention d'honoraires (loi 28-08 → loi 66-23, watch `01/00_INDEX.md`). Le chiffre n'est jamais jeté sans sa base légale et sa date de vérification.

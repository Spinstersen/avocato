# 02 — Honoraires, traçabilité, fonds clients

> Loi 66.23 (BO n°7536 du 20/08/2026) · vérifié 23/08/2026. **Le volet qui change ton quotidien immédiat.**

## Les 5 nouvelles règles d'argent

| Règle | Détail | Impact cabinet |
|---|---|---|
| **Cash interdit > 10 000 DH** | Honoraires au-delà de ce seuil : chèque ou moyen de paiement électronique obligatoire | Tes packs 12k-28k : plus jamais en espèces |
| **Reçu obligatoire** | Daté, **signé, numéroté** pour toute somme/valeur/titre reçue | Ton template `06_Recu_Provision_Facture` doit avoir une numérotation séquentielle |
| **Fonds clients centralisés** | Sommes reçues pour compte de tiers → compte dédié sous contrôle de l'Ordre ; déblocage validé par le barreau | Fin des provisions dormantes sur ton compte perso — structure à mettre en place dès textes d'application |
| **Comptabilité exigeante** | Encadrement renforcé (détail dans les textes réglementaires attendus) | Coordination comptable agréé renforcée |
| **Pas de rémunération en nature** | Interdiction de prendre une part du bien litigieux comme honoraire ; honoraires supplémentaires possibles selon efforts | Clause « résultat » à proscrire dans tes conventions |

## Ce que ça change dans TES templates (vault)

1. `templates/01_Convention_Honoraires_Modele.md` :
   * Ajouter : « Conformément à la loi n° 66.23, tout paiement supérieur à 10 000 DH est effectué par chèque ou virement électronique »
   * Supprimer toute formulation « honoraires au résultat »
2. `templates/06_Recu_Provision_Facture.md` :
   * Vérifier : champ N° séquentiel + signature + date présents
3. `templates/11_Calculateur_Provision_TVA_Offline.md` :
   * Ajouter une ligne « mode de paiement » avec alerte si > 10 000 DH et = espèces

## Script client (annonce du nouveau cadre)

> « Depuis août 2026, la nouvelle loi sur notre profession impose que les honoraires supérieurs à 10 000 dirhams soient réglés par virement ou chèque — c'est aussi une protection pour vous : chaque paiement est tracé et vous recevez un reçu numéroté. »

Ton : pas une contrainte, un gage de sérieux. Ça valorise ton positionnement « transparent, bancarisé, moderne ».

## À suivre

* Décret/textes réglementaires sur les comptes dédiés et le déblocage (arts différés : 12, 39, §11 art.121 — probablement liés aux caisses de l'Ordre [vérifier])
* Circulaires barreaux sur les registres de reçus
* Veille ABM 05/09/2026 : les revendications portent notamment sur ces dispositions financières

---

> ⚖️ Sources : Medias24 21/08/2026 (texte définitif), Hespress. Numéros d'articles exacts : à confirmer BO n°7536 avant citation.

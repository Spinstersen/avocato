# 10 — Arbre Décision Statut International (2 min)

```
START: Es-tu salarié hors Maroc ?
├─ OUI → Besoin >12m ?
│   ├─ NON (<12m) → Détachement 12m CNSS Maroc (rapide, 5,900)
│   └─ OUI (>12m) → 1 salarié ? → OUI Portage 8% (illimité) / NON Filiale SARL
└─ NON (freelance/ecom) → CA >200k (service) /500k (commerce) ?
    ├─ NON → AE suffit (1j, IR 1 % / 0,5 %) → diag 900 d'abord
    └─ OUI → Résident 183j ?
        ├─ OUI (nomad >183j) → SARL (IS 20 % taux 2026) + carte séjour 1 an `04_Statut_Juridique_Nomad_Carte_Sejour.md` → Pack 7,500
        └─ NON (MRE non-résident) → SARL non-résident + convention (crédit/crédit d'impôt — art. 25 France) → Pack 7,500
            └─ Client US ? → TVA art.92 exon + IGOC delais (90j services / 150j biens) `06_Rapatriement...`
```

## Raccourci rapatriement

*   <200k → AE
*   200k-1M + 1 client EU → SARL 5,900
*   >1M ou 3 pays → SARL + veille PE `07_Etablissement_Stable`

## Question filtre avant pack

*   [ ] 183j compté ? (01)
*   [ ] Salarié hors Maroc ? (02)
*   [ ] CA > plafond ? (03)
*   [ ] Convention pays client ? (05)
*   [ ] PE risque >6m ? (07)

Si 1 non → faire Diagnostic 900 d'abord.

---

## L'arbre comme outil d'entretien, pas comme automate

L'arbre hiérarchise les questions préalables — il ne décide pas. La première question n'est jamais le prix, mais : `Suis-je au-dessus du seuil légal ?` (200k/500k), puis `Suis-je résident 183j ?` (`08_Fiscalite_Internationale_Rapatriement/01_Residence_Fiscale_183j_Foyer.md`), puis `Ai-je un établissement stable 6 mois ?`. Chaque réponse renvoie à une mission avec convention, pas à un panier.

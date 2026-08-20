# 07 — Obligations Rapatriement & Justificatifs 30j (Cœur)

## Règle IGOC 2024 art.III.2

*   **100% recettes export en devises doivent être rapatriées et cédées 30j** sur marché change (ou versées compte convertible 30j).

## 3 Justificatifs banque exige 30j (sinon blocage)

1.  **Contrat** FR/EN `05_Document_Bank/templates/03_Pack_Freelance_Contrat.md` (objet, prix devises, loi marocaine, juridiction Casa).
2.  **Facture** ICE/RC/IF + `Exonération TVA art.92 CGI — Prestation export — Paiement devises via [Wise] le [date] — Rapatriement 30j IGOC`.
3.  **Avis virement SWIFT** (Wise/Revolut → Attijari).

## Procédure 30j (timeline)

*   J0: Client US paie $5k Wise.
*   J2: Wise → Attijari convertible 50k DH (avis SWIFT).
*   J2-30: Déposer banque: contrat+facture+avis → banque tamponne.
*   J30: Si 0 dépôt → alerte Office + blocage compte → `08_Infractions_Sanctions_Loi1906.md`.

## Cas Yassine 600k (12 virements 50k/an)

*   12× justif 30j → dossier mensuel Notion `01_Legal_Tech_Stack/02_Notion_Cabinet_OS_Detaille.md` (table virements).

## Checklist 30j

*   [ ] Contrat signé AVANT paiement (J-7)
*   [ ] Facture ICE/RC + art.92
*   [ ] Avis SWIFT gardé
*   [ ] Dépôt banque J+30 (calendrier rappel)
*   [ ] Copie Notion
*   [ ] Déclaration IS/IR comptable

## Modèle facture 30j

```
Facture 2025-012 — Yassine SARL (ICE 123) → Client US LLC
Objet: Dev 40h × $125
Montant: $5,000 → 50,000 DH (cours 10)
TVA: Exonération art.92 CGI — paiement devises via Wise le 15/05/2025 — Rapatriement 30j IGOC 2024 art.III.2
Échéance: 30j
```

---

## Note de méthode professionnelle

Ce document s'inscrit dans la démarche `01_Strategy/01_Rules_Of_The_Game_No_Ads_Morocco/` : information sobre, références primaires (`sgg.gov.ma`, `oc.gov.ma`, `cndp.ma`), devoir d'information art. 59, secret art. 36, convention art. 30. Le chiffre n'est jamais jeté sans sa base légale et sa date de vérification.

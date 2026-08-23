# 03 — Arbre statutaire 2026 : AE › CPU › SARL › SAS

> **Vérifié le 23/08/2026.** Intègre : plafonds AE (500k/200k), IR libératoire (0,5 %/1 %), CPU (CGI art.40-I), IS unifié 20 % (LF 2026), SAS (loi 19-20), facturation électronique horizon 2027.

## L'arbre de décision complet

```
DÉPART — activité solo / petite équipe, Maroc
│
├─ Q1. Levée de fonds, investisseur ou pacte d'actionnaires prévu ?
│     └─ OUI → **SAS/SASU** (loi 19-20) — capital libre, BSA/OCA, pactes sur mesure
│
├─ Q2. Nature + volume de CA ?
│     ├─ Services <200k → **AE** (IR 1 %) · Commerce <500k → **AE** (IR 0,5 %)
│     │     ⚠️ règle client unique >80 000 MAD → fraction à 30 %
│     ├─ Services 200k-500k, charges faibles → **CPU** (coeff 20-30 % ≈ 2-3 % du CA)
│     ├─ Commerce 500k-2M, charges faibles → **CPU** (coeff 8-12 % ≈ 0,8-1,2 %)
│     └─ Charges réelles élevées (>50 % CA), TVA-crédit nécessaire,
│        salariat, appels d'offres, multi-associés
│           → **SARL** (IS 20 % LF 2026 ; capital 10k ; CRI 7-14j)
│                └─ croissance + investisseurs ensuite ? → transformation SAS
│
├─ Q3. Équipe ?
│     ├─ >1 salarié → AE exclu → CPU si charges faibles sinon SARL/SAS
│     └─ Solo → paliers ci-dessus
│
├─ Q4. Clientèle étrangère export ?
│     ├─ Toutes formes OK pour l'export de SERVICES (TVA art.92 0 % si tracé :
│     │   contrat + SWIFT + rapatriement 30j IGOC)
│     └─ Import-export de MARCHANDISES : AE interdit → SARL/SAS (+ Office)
│
└─ Q5. Horizon facturation électronique (CGI art.145-IX)
      └─ CA >500k visé dès 2027 → dès maintenant : outil conforme UBL/CII
         (argument pack conformité — voir 21_Facturation_Electronique)
```

## Règles de sortie de palier (à surveiller en diagnostic)

| Situation | Signal | Action |
|---|---|---|
| AE services | 12m glissants >160-180k | Préparer bascule CPU/SARL (prévisionnel 6 mois) |
| AE commerce | 12m glissants >400-450k | Idem |
| Dépassement 2 années consécutives | Radiation automatique | Basculer AVANT (résultat réel + pénalités sinon) |
| CPU services | Approche 500k | SARL/SAS |
| CPU commerce | Approche 2M | SARL/SAS |
| Entrée investisseur | Term sheet imminent | Transformation SARL→SAS ou création SAS holding |

## Les 5 erreurs qui coûtent

1. **Créer une SARL par réflexe** à 250k services alors que la CPU coûte ~6k vs IS+CNSS+comptable ~25-35k.
2. **Rester AE au-delà des plafonds** → radiation + résultat réel rétroactif + pénalité 30 %.
3. **Ignorer la règle des 80 000 DH/client unique** en AE.
4. **Choisir la SAS « parce que c'est moderne »** sans besoin de pacte/investisseur → friction administrative inutile aujourd'hui.
5. **Oublier la facturation électronique 2027** dans tout conseil statutaire 2026.

---

> **Devoir art.59 :** information doctrinale — chaque bascule = diagnostic chiffré + comptable agréé. Vérifié le 23/08/2026.

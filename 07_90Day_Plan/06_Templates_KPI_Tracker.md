# 06 — Templates & KPI Tracker : mesurer pour ne pas abandonner (anti-TDAH)

> **Pourquoi ce fichier existe :** le TDAH abandonne ce qu'il ne mesure pas. Ce tracker Notion + Dopamine Board remplace la motivation par des chiffres visibles. 5 min/jour, pas 1h/semaine.

## TL;DR

- **1 Notion** : base KPI (1 ligne = 1 jour) + vue Dopamine Board (jauge visuelle).
- **4 KPIs qui comptent :** partenaires contactés, diagnostics réalisés, packs signés, CA encaissé (provision).
- **Cibles M1 réalistes :** 3 partenaires (comptables/fiduciaires), 5 diagnostics (600–1 200 DH HT chacun), 2 packs signés (3 500–4 900 DH HT), ~15k DH HT encaissé.
- Ne trackez pas 10 métriques. 4 suffisent.

---

## 1. Structure Notion (à créer en 30 min — modèle prêt `04_Skills_To_Learn/01_Legal_Tech_Stack/02_Notion_Cabinet_OS_Detaille.md`)

### Base « KPI Quotidien » (1 ligne = 1 jour)

| Colonne | Type | Exemple J1 | Pourquoi |
|---|---|---|---|
| Date | Date | 01/09/2026 | Filtre semaine/mois |
| Partenaires contactés | Number | 1 | Input qui contrôle tout (cf. `03_Acquisition_Without_Ads/03_Partnerships_Comptables_Fiduciaires`) |
| Diagnostics réalisés | Number | 0 | 45 min chacun, 600–1 200 DH HT, déductible |
| Packs signés | Number | 0 | Provision 50% encaissée = seul CA qui compte |
| CA encaissé HT | Number | 0 | Provision encaissée (pas devis envoyé) |
| Contenu publié | Checkbox | ☐ | 1 post LinkedIn / article (dopamine visuelle) |
| Énergie (1–5) | Select | 3 | Pour le Dopamine Menu (`06_ADHD_System/05_Dopamine_Menu_Body_Double.md`) |
| Note | Text | « DM comptable Casa OK » | Mémoire externe |

### Vues à créer

1. **Vue Table** : tous les jours, tri Date desc.
2. **Vue Board Dopamine** : par semaine, avec formules :
   - `Partenaires semaine = sum(Partenaires)`
   - `Taux transfo = Packs / Diagnostics` (cible 30–40%)
3. **Vue Calendar** : pour voir les trous (jours sans action = alerte TDAH).

---

## 2. Cibles par phase (à ajuster selon niche)

| Phase | Semaines | Cible partenaires | Cible diagnostics | Cible packs | CA visé HT | Si en retard |
|---|---|---|---|---|---|---|
| **Foundation** | S1–S2 | 3 contactés | 2 | 0–1 | 0–5k | Normal — on installe Notion/Calendly/Yousign |
| **Traction** | S3–S6 | +3 (total 6) | 5 | 2 | ~15k M1 | Doubler les DM comptables, pas le contenu |
| **Systemize** | S7–S10 | 6 actifs | 8–10/mois | 4/mois | 25–35k/mois | Passer en retainer 2 500–4 500/mois |
| **Scale** | S11–S13 | 10 actifs | 10–15/mois | 5–7/mois | 35–60k/mois | Recruter comptable dédié ou assistante |

**Règle anti-TDAH :** si vous n'avez pas atteint 3 partenaires S2, ne passez PAS à S3 (contenu). Le canal qui convertit le plus vite pour ce profil est le partenariat comptable, pas LinkedIn.

---

## 3. Dopamine Board (le secret TDAH)

Dans `01_Strategy/04_Client_Acquisition_System_No_Ads/08_Metrics_Dopamine_Board.md` : chaque jour où vous cochez 1 partenaire contacté = 1 case verte. 5 cases vertes = récompense (café, marche, 30 min loisir). Le cerveau TDAH a besoin de voir le progrès, pas de l'imaginer.

**Formule Notion (à copier) :**
```
if(prop("Packs signés") > 0, "🟢", if(prop("Diagnostics réalisés") > 0, "🟡", if(prop("Partenaires contactés") > 0, "🔵", "⚪")))
```

---

## 4. Templates prêts (Canva/Tally/Yousign — à dupliquer, pas à créer)

| Template | Où | Quand |
|---|---|---|
| Convention d'honoraires | `05_Document_Bank/templates/01_Convention_Honoraires_Modele.md` | Avant chaque mission |
| Reçu provision + facture | `05_Document_Bank/templates/06_Recu_Provision_Facture.md` | À chaque encaissement |
| Intake Tally | Tally (lien dans `04_Skills_To_Learn/01_Legal_Tech_Stack/03_Google_Workspace_Calendly_Tally.md`) | Après provision |
| PV remise | `05_Document_Bank/templates/08_PV_Remise_Cloture.md` | À chaque livraison |

---

## 5. Erreurs fréquentes

1. Tracker le CA « devisé » au lieu d'« encaissé » → illusion, puis démotivation à J+30 quand rien n'arrive.
2. 10 KPIs → 0 KPI suivi. Gardez 4.
3. Pas de revue hebdo (dimanche 20 min) → dérive. Bloquez `06_ADHD_System/06_Weekly_Review_Planning.md`.

---

## Sources

- `01_Strategy/04_Client_Acquisition_System_No_Ads/08_Metrics_Dopamine_Board.md` (théorie)
- `04_Skills_To_Learn/01_Legal_Tech_Stack/02_Notion_Cabinet_OS_Detaille.md` (tuto Notion)
- `04_Skills_To_Learn/12_Finance_Cabinet_OS/03_KPI_Cabinet_MRR.md` (MRR, panier moyen)

---

## Note de méthode professionnelle

Ce document s'inscrit dans la démarche `01_Strategy/01_Rules_Of_The_Game_No_Ads_Morocco/` : information sobre, références primaires (`sgg.gov.ma`, `oc.gov.ma`, `cndp.ma`), devoir d'information art. 59, secret art. 36, convention art. 30. Le chiffre n'est jamais jeté sans sa base légale et sa date de vérification.

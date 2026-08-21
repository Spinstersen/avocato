# 08 — Métriques Rentabilité : 725/h vs 1500 = 375/h, le vrai coût

## Définition
Rentabilité cabinet = **3 métriques qui disent si 2900 vaut 3h30** : **taux horaire réel (DH/h), marge par deal, MRR 90j**. Sans métriques, tu crois "1500 c'est mieux que 0" → 1500/4h=375/h < BATNA 725/h → tu perds 350/h. Avec métriques, tu refuses 1500 → SEO 725/h → +350/h. Objectif : **>700/h, marge >60%, MRR 23 400 J90**.

## Framework complet — 3 métriques + 3 seuils

| Métrique | Formule | Seuil bon | Seuil alerte | Action |
|---|---|---|---|---|
| **DH/h réel** | Prix HT / heures réelles (incl. call+facture) | >700/h | <500/h | Refuse <2900, monte 5900 (01) |
| **Marge deal** | (Prix - coût 0 si solo) / Prix | >60% | <40% | Passe 2900→5900, 0 provision→50% (02) |
| **MRR 90j** | Retainers 2900×4 + ponctuels 2×5900 | 23 400 | <10k | +1 SEO/semaine (09) +1 retainer (06) |

**Coûts cachés 2025 :** 3h30 deal 2900 = 30 min call + 90 min exec + 30 min facture/Yousign + 30 min suivi = 4h → 2900/4=725/h. 1500/4=375/h → -350/h.

## Procédure pas-à-pas chiffrée (10 min / semaine)

1. **Setup Notion rentabilité (5 min J0)** : Colonnes : deal / prix HT / heures (call+exec+facture+suivi) / DH/h / marge / MRR cumul. Formule DH/h = prix/heures.
2. **Chrono deal (1 min/deal)** : Lance timer Toggl. Ex Fatima CGV 2900 : call 30m + exec 90m (registre 5 col) + facture 20m + suivi 20m = 2h40 → 2900/2.66=1090/h → excellent. Si exec 4h → 725/h → OK. Si 6h → 483/h → alerte → template.
3. **Relevé hebdo vendredi (3 min)** : 2 deals 2900 (4h×2=8h) +1×5900 (7h) =15h → CA 11 700 → 780/h → OK. Si 1×1500 4h +1×2900 4h =8h → 4400/8=550/h → alerte → refuse 1500.
4. **Marge (1 min)** : Solo coût 0 + Stripe 2% (58 DH sur 2900) → marge 2842/2900=98%. Si agence 1500 sous-traitance → marge 1400/2900=48% → alerte.
5. **MRR 90j (2 min)** : 03_KPI MRR + DH/h → runway. Si DH/h <500 et MRR <10k → +1 retainer 2900 (06) + SEO 09.
6. **Rapport J30 (5 min)** : Graph DH/h + MRR → décision pricing 01 (monte 5900 si DH/h <700).

## Exemple Maroc 2025 — 3 deals comparés

| Deal | Prix HT | Heures | DH/h | Marge | MRR 90j | Décision |
|---|---|---|---|---|---|---|
| **Fatima CGV 2900** 2h40 | 2900 | 2.66h | **1090/h** | 98% | +2900 MRR si retainer | Garde 2900, template 90 min |
| **Yassine SARL 5900** 7h | 5900 | 7h | **842/h** | 98% | +5900 | Cible 5900 60% |
| **Deal 1500** 4h | 1500 | 4h | **375/h** | 98% mais -350/h vs BATNA | +0 (no retainer) | **REFUSE** → SEO 725/h |

Sans métriques, 1500 semble "mieux que 0". Avec, 375/h <725/h BATNA → refuse.

| Pack métriques | Prix |
|---|---|
| **Option 2900** | Setup Notion DH/h + marge + MRR + rapport J30 |
| **Option 5900** | + 3 mois suivi hebdo + optimisation 1500→5900 + retainer | Délai 7j après provision 50% |

## Erreurs Top 3

1. **Compter 2900/3h30 =829/h mais oublier call+facture 1h → 725/h réel** → surestime 100/h → corriger : compte 4h totales, pas 3h30 exec seule.
2. **MRR non corrélé DH/h → tu acceptes 1500 pour MRR** → 375/h → MRR faible → corriger : MRR seulement si DH/h >700 (5900/7h=842/h).
3. **0 chrono → "je passe 2h" mais réel 5h → 580/h vs 725/h** → corriger : Toggl 1 min/deal, pas estimation.

## Checklist 12 points — Métriques Rentabilité (contextuelle)

- [ ] Notion DH/h + marge + MRR créé + formules
- [ ] Toggl chrono par deal (call+exec+facture+suivi) 1 min
- [ ] DH/h >700 vérifié (si <500 → refuse <2900, monte 5900)
- [ ] Marge >60% (si <40% → 0 sous-traitance 1500)
- [ ] MRR 23 400 J90 tracé 03_KPI (4 retainers 2900 +2×5900)
- [ ] Coût Stripe 2% déduit marge
- [ ] Comparatif 1500 375/h vs BATNA 725/h noté
- [ ] Rapport J30 DH/h + MRR graph
- [ ] 0 deal <700/h depuis J30 (si oui → arbre 09 refuse)
- [ ] Interaction 11_01 BATNA 725/h = plancher DH/h
- [ ] Interaction 12_01 9900→5900 si DH/h <700
- [ ] Glossaire §10 provision 50% (DH/h après provision)

## Sources
- sgg.gov.ma : art.30 provision 50% (trésorerie DH/h), CGI IS 15%, Loi 09-08 300k (MRR vs risque)
- Toggl, Stripe 2%, Notion, Plausible
- 11_01 BATNA 725/h, 12_01 Pricing, 03_KPI
- Glossaire `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §10, §04, §06

## Plan d'action 30 jours
- **S1 J1-7** : Notion DH/h + Toggl setup, 2 deals chronos 725/h et 1090/h, 1 deal 1500 375/h → refusé
- **S2 J8-21** : 4 deals 780/h moyenne, MRR 14 600, marge 98%, rapport DH/h >700 OK
- **S3 J22-30** : 100% deals >700/h, MRR 23 400 J60, 0 deal 1500, template 90 min exec (vs 4h), v2
- Tracker : Toggl quotidien, vendredi 10 min DH/h, Notion "Rentabilité" habit

## Interactions avec autres dossiers
- **03_KPI MRR** : DH/h → MRR
- **02_Provision** : provision 50% → DH/h (pas 0)
- **01_Pricing** : 5900 842/h vs 2900 725/h vs 1500 375/h
- **11_01 BATNA** : 725/h = BATNA SEO
- **09_06 GSC** : 1 article 725/h BATNA

# 05 — Comparatif Statuts Fiscal : AE 200k vs SARL IS 15% (7-14j, 10k)

> 🟡 **FISCALITÉ 2026 — vérifié le 23/08/2026** : la **LF 2026 (loi 50-25, BO n°7465 bis du 16/12/2025)** a unifié l'IS au taux de **20 %** pour tout bénéfice net <100M MAD (35 % au-delà ; financier 40 %). L'ancien barème transitoire «15 % <300k / 20 % / 31-32 %» cité ci-dessous est **obsolète depuis le 01/01/2026** — chiffres conservés pour historique/comparatif, à requalifier en diagnostic. Détail : `12_VEILLE_LEGALE_2025_2026.md` §B1.

## Définition
Comparatif statuts = **tableau AE vs SARL vs Portage** pour choisir statut selon CA 2025, avec chiffres PLF à vérifier juillet. AE plafond **500k commerce / 200k service HT 12 mois glissants** (Loi 114-13), IR libératoire **0,5 % commerce / 1 % servicesice** (decret 114-13). SARL **capital 10k min, IS 20 % unique (LF 2026 : benefice net <100M MAD ; 35 % au-dela), création 7-14j OMPIC, frais CRI ~2000 DH**. Sans comparatif, Yassine reste AE 350k → radiation + redressement 68k.

## Framework complet — Tableau 7 critères 2025

| Critère | AE (Loi 114-13) | SARL (Loi 5-96, CGI) | Portage 8% | Gagnant |
|---|---|---|---|---|
| **Plafond CA HT 12 mois** | 500k commerce / 200k service | Illimité | Illimité | SARL si >200k service |
| **Impôt** | IR 0,5 % commerce / 1 % servicesice libératoire | IS 20 % (LF 2026), 20% 300k-1M | 8% +30% frais → ~15% net | AE si <200k, SARL si >300k bénéfice |
| **TVA** | Non assujetti (pas de TVA, pas d'exon art.92) | TVA 20% / 0% export art.92 possible | TVA 20% | SARL si export MRE (0% art.92) |
| **Création** | 1 jour en ligne ae.gov.ma, 0 DH | 7-14j OMPIC, capital 10k, CRI 2000 DH | 24h | AE si solo <200k |
| **PE 6 mois France** | PE perso si salarié Paris 7 mois | PE SARL si bureau/salarié Paris >6 mois (glossaire §02) | Pas de PE | Aucun si PE |
| **Coût fixe/an** | 0 + IR 2% (ex: 150k×2%=3k) | 5000 charges + IS 15% (ex: 100k bén×15%=15k) | 8% CA | AE <200k |
| **Risque** | Radiation si >200k 2 ans + redressement IS 15%+38%+30% | IS mondial si résident 183j (glossaire §01) | Dépendance | SARL si >200k |

**Chiffres à vérifier PLF juillet :** AE 500k/200k, IS 15/20/32%, capital 10k, délai 7-14j.

## Procédure pas-à-pas chiffrée (20 min diagnostic)

**Contexte Maroc 2025 :** cas d'usage illustratif de la compétence — adapter l'exemple au sujet du fichier (voir fiches pratiques du dossier).
2. **Teste AE vs SARL IS (5 min)** : CA 150k service → AE IR 150k×2%=3k vs SARL bénéfice 80k×15%=12k → AE gagne 9k. CA 350k service bénéfice 150k → AE radiation + IS 68k vs SARL IS 22.5k → SARL gagne 45k.
3. **Vérifie PE 6 mois (3 min)** : Salarié/bureau Paris >6 mois ? Si oui → PE France IS 25% même en SARL → portage 8% ou filiale (glossaire §02). Sinon SARL Casa taxée Maroc seul 15%.
4. **Vérifie TVA 0% besoin (3 min)** : Client export MRE Paris ? Besoin exon art.92 → SARL seule (AE non assujetti ne facture pas TVA 0%). Si besoin → SARL.
5. **Décision arbre (2 min)** : CA <200k + pas PE + pas TVA 0% → AE 1j. CA >200k OU PE OU TVA 0% → SARL 10k 7-14j. Entre → portage 8% transitoire.
6. **Log + PLF (2 min)** : Notion "Statut" : CA / IS / AE / décision / PLF vérif juillet. Re-vérifie PLF juillet (IGOC + CGI).

## Exemple Maroc 2025 — 3 diagnostics

| Client | CA 12 mois | IS AE vs SARL | Décision | Prix |
|---|---|---|---|---|
| **Yassine** freelance 600k offshore 350k service | 350k >200k → AE KO | AE radiation 68k vs SARL IS 22.5k | **SARL 10k 7-14j, IS 20 % (LF 2026) | **Option 2900** : diagnostic 20 min + AE→SARL checklist. **Option 5900** : + création SARL 7-14j OMPIC 2000 DH + attestation DGI 30j + compte convertible 48h. Délai 7-14j |
| **Fatima** 30k/mois commerce 360k | 360k <500k → AE OK | AE 360k×1%=3.6k vs SARL 50k bén×15%=7.5k → AE gagne | **AE** (mais Shopify TVA ? → SARL si veut TVA 0%) | 2900 AE, 5900 SARL TVA 0% |
| **Karim MRE** Paris 40j + SARL Casa 100k bén | 100k bén | SARL IS 15k vs AE impossible (résident 40j non résident → SARL) | **SARL + dividende 10% France art.10 + attestation 30j** | 5900 MRE pack |

## Erreurs Top 3

1. **Rester AE 350k 2 ans → radiation + redressement IS 15% + IR 38% +30% pénalités =68k** → corriger : CA >200k service → SARL 7-14j avant 12 mois.
2. **Créer SARL avec salarié Paris 7 mois → PE France IS 25%** → double impo 40k vs 15k → corriger : PE 6 mois test §02 → portage 8% si PE inévitable.
3. **AE avec client export Paris → pas d'exon TVA 0%** → TVA 20% perdue → corriger : AE non assujetti → SARL si besoin art.92 + rapatriement 30j.

## Checklist 12 points — Comparatif Statuts (contextuelle)

- [ ] CA HT 12 mois glissants calculé (200k/500k)
- [ ] IR AE 1%/2% vs IS 20 % (LF 2026)chiffré
- [ ] PE 6 mois France testé (bureau/salarié >6 mois §02)
- [ ] TVA 0% art.92 besoin vérifié (export MRE ?)
- [ ] Résidence 183j §01 vérifiée (210j → IS mondial)
- [ ] Décision AE 1j / SARL 7-14j 10k / portage 8% prise
- [ ] Capital 10k + CRI 2000 DH + délai 7-14j notés
- [ ] PLF juillet vérifiée (AE/IS à jour sgg.gov.ma)
- [ ] IGOC 2024 oc.gov.ma 30j + compte 48-72h si SARL export
- [ ] Convention art.27 dividende 10% France si MRE (glossaire §07)
- [ ] Log décision Notion + re-check J90
- [ ] Interaction 11_07 Cas 5000 : SARL 5900 vs AE 2900

## Sources
- sgg.gov.ma : Loi 114-13 AE 500k/200k 1%/2%, Loi 5-96 SARL 10k, CGI IS 15/20/32%, IGOC 2024, conventions art.7/27
- ompic.ma 7-14j, cndp.ma, oc.gov.ma, PLF sgg.gov.ma juillet
- Glossaire `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §09 (AE/SARL), §01 (183j), §02 (PE 6m), §03 (30j), §07 (dividende 10%)

## Plan d'action 30 jours
**Contexte Maroc 2025 :** cas d'usage illustratif de la compétence — adapter l'exemple au sujet du fichier (voir fiches pratiques du dossier).
**Contexte Maroc 2025 :** cas d'usage illustratif de la compétence — adapter l'exemple au sujet du fichier (voir fiches pratiques du dossier).
- **S3 J22-30** : MRR SARL IS 15% vs AE 2% chiffré, 2 closes 5900 SARL, 1 AE 2900, retro statuts, template v2
- Tracker : Notion "Statuts" + PLF juillet reminder, habit "CA 12 mois glissants"

## Interactions avec autres dossiers
- **12_01 Pricing** : AE 2900 vs SARL 5900/9900
- **09_Cas YouCan** : AE/SARL + 09-08 registre
- **11_07 Cas 5000** : SARL 5900 = AE→SARL 68k évité
- **12_04 TVA** : SARL TVA 0% vs AE non assujetti
- **11_01 BATNA** : statut = BATNA fiscale
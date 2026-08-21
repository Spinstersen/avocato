# 04 — Devis & Facture TVA : HT/TVA 20%/0% art.92 sans redressement 10k

## Définition
Devis/facture avocat = **document art.144 CGI + art.30 Loi 28-08** qui évite redressement TVA 20% (10k sur 50k). 3 mentions obligatoires : **ICE/RC/IF + TVA 20% Maroc ou exon 0% art.92 export + provision 50% + délai 7j**. Sans art.92 mention + SWIFT 30j + rapatriement, TVA 20% due même si client Paris → 10k redressement. Devis 3 options (01) + facture provision + facture solde = 3 documents.

## Framework complet — 3 documents + TVA 20%/0%

| Document | Quand | Mentions TVA art.92 | Mentions art.144 | TVA |
|---|---|---|---|---|
| **Devis 3 options** | J-7 avant signature | "TVA 20% Maroc / 0% export art.92 si paiement devises + rapatriement 30j IGOC" | ICE/RC/IF + délai 7j + provision 50% art.30 | HT |
| **Facture provision 50%** | J0 signature | Même + "Exonération TVA art.92 CGI — prestation exportée hors Maroc — paiement devises — rapatriement 30j" + ICE/RC/IF | Idem + numéro facture | 0% si export, 20% si Maroc |
| **Facture solde** | J7 livraison | Même + "TVA 20% 580 DH sur 2900" ou "0% art.92" | Idem + réserve art.618 | 20%/0% |

**3 conditions exon 0% art.92 (cumulatives, glossaire §04) :**
1. Service rendu hors Maroc (client étranger, contrat FR/EN)
2. Paiement en devises (SWIFT)
3. Rapatriement 30j (dépôt banque, IGOC 2024 oc.gov.ma) → sinon TVA 20% + 15% pénalités +10%/mois.

## Procédure pas-à-pas chiffrée (15 min par deal)

1. **Devis 3 options (5 min J-7)** : Template `05_Document_Bank/devis.md` : tableau 2900/5900/9900 HT + ligne TVA 20% (si client Casa) ou 0% art.92 (si MRE Paris) + total TTC + ICE 00XXXX RC XXXX IF XXXX + provision 50% art.30 + délai 7j après provision + pièces + clause pénale 10% art.264 + réserve art.618 + validité 15j.
2. **Facture provision J0 (5 min)** : Convention Yousign signée → facture provision 1450 HT + TVA 20% 290 =1740 TTC (Maroc) ou 1450 HT 0% (export) + mention art.92 + SWIFT attendu + rapatriement 30j. Envoie Stripe 48h + RIB. Si export, note "Paiement devises — rapatriement 30j IGOC".
3. **Encaissement J0-J2 (2 min)** : Vérifie SWIFT si 0% art.92 → dépose banque 30j → crédit convertible 48h (glossaire §12). Garde SWIFT 10 ans. Si Maroc 20%, pas de SWIFT.
4. **Facture solde J7 (5 min)** : Livraison registre 5 col + politique → facture solde 1450 HT + TVA idem + total 2900 HT (3480 TTC Maroc / 2900 HT export) + mention "Réserve propriété art.618 jusqu'à paiement complet" + échéance 15j + pénalité 10%.
5. **Déclaration TVA (5 min/mois)** : Si TVA 20% → déclare mensuelle DGI (si CA >1M) ou trimestrielle → reverse 20%. Si 0% art.92 → garde dossier export (contrat FR/EN + SWIFT + preuve rapatriement 30j) 10 ans.
6. **Archivage 10 ans (1 min)** : Notion "Factures" : devis + 2 factures + SWIFT + contrat + Yousign. 10 ans CGI.

## Exemple Maroc 2025 — Fatima Casa vs MRE Paris

| Client | Devis | Facture provision J0 | TVA | Dossier |
|---|---|---|---|---|
| **Fatima** Casa 30k, CGV 2900 | Devis 2900 HT + TVA 20% 580 =3480 TTC + ICE + 50% 1740 J0 | 1450 HT +290 =1740 TTC 20% → Stripe 48h | 20% → déclare DGI | Contrat FR, factures 10 ans |
| **Karim MRE Paris** SARL Casa → dividende 5900 | Devis 5900 HT 0% art.92 (service export) + mention devises + rapatriement 30j | 2950 HT 0% art.92 → virement EUR SWIFT → rapatriement 30j → convertible 48h | 0% exon → dossier SWIFT 30j | Contrat FR/EN + SWIFT + rapatriement + attestation DGI 30j (art.27) |

Erreur Fatima Paris 0% sans SWIFT 30j → TVA 590 redressée +15% pénalités =678.

| Pack devis/facture | Prix |
|---|---|
| **Option 2900** | Devis 3 options + 2 factures 20%/0% + mentions art.92/144 |
| **Option 5900** | + dossier export complet + SWIFT 30j assisté + déclaration TVA | Délai 7j après provision 50% |

## Erreurs Top 3

1. **Facturer MRE Paris 0% sans mention art.92 ni SWIFT 30j** → TVA 20% redressée 10k +15% +10%/mois → corriger : mention 3 conditions + SWIFT + rapatriement 30j obligatoires.
2. **Devis TTC sans HT/TVA détaillée** → client croit 2900 TTC → tu perds 580 TVA → corriger : toujours HT + TVA 20% + TTC, 3 colonnes.
3. **Facture sans ICE/RC/IF art.144** → banque refuse rapatriement 30j → TVA 0% refusée → corriger : ICE/RC/IF sur devis + 2 factures.

## Checklist 12 points — Devis Facture TVA (contextuelle)

- [ ] Devis 3 options HT + TVA 20%/0% + TTC + validité 15j
- [ ] Mentions ICE/RC/IF art.144 sur devis + 2 factures
- [ ] Mention TVA art.92 0% ou 20% selon client Maroc/export
- [ ] 3 conditions exon 0% : hors Maroc + devises + rapatriement 30j (si 0%)
- [ ] Provision 50% art.30 + délai 7j après provision + pièces (devis)
- [ ] Facture provision 50% HT+TVA J0 + Stripe 48h
- [ ] SWIFT + rapatriement 30j IGOC déposé banque si 0% (48h crédit)
- [ ] Dossier export : contrat FR/EN + SWIFT + rapatriement 10 ans
- [ ] Facture solde J7 HT+TVA + réserve art.618 + pénalité 10% art.264
- [ ] TVA déclarée DGI mensuelle/trimestrielle si 20%
- [ ] Archivage 10 ans Notion (devis+2 factures+SWIFT+Yousign)
- [ ] Glossaire §04 TVA art.92, §03 IGOC 30j, §10 provision, §12 compte

## Sources
- sgg.gov.ma : CGI art.92 exon export, art.144 mentions ICE/RC/IF, art.30 provision, DOC art.264 10% art.618 art.443, IGOC 2024 oc.gov.ma
- cndp.ma, Bank Al-Maghrib 48-72h
- Glossaire `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §04 (TVA art.92), §03 (30j), §10, §11, §12

## Plan d'action 30 jours
- **S1 J1-7** : Templates devis 3 options + 2 factures (20%/0%) + mentions art.92/144, test Fatima 20% + MRE 0% SWIFT
- **S2 J8-21** : 4 deals facturés (2×20% Maroc +2×0% export SWIFT 30j), 0 redressement, TVA déclarée J30
- **S3 J22-30** : 100% devis HT/TVA/TTC + ICE, 0 facture sans provision 50%, dossier export 10 ans archivé, template v2
- Tracker : Notion "Factures" + Stripe, habit "0% = SWIFT 30j"

## Interactions avec autres dossiers
- **02_Provision** : facture provision 50% = ce fichier
- **01_Pricing** : 2900/5900/9900 HT vs TTC
- **03_KPI** : TVA 20% vs 0% → MRR
- **05_Comparatif Statuts** : AE non assujetti vs SARL TVA 20%
- **11_05 Prix** : TVA incluse dans 2900/5900

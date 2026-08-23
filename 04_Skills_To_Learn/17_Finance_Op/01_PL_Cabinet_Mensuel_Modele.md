# 01 — P&L Cabinet Mensuel : le modèle

> **Cockpit opérateur — module 01/13.** Le compte de résultat mensuel transforme le cabinet en machine pilotable : produits par nature (packs, retainer), charges fixes détaillées, provisions fiscales, marge nette cible ≥60 %. Sans ce tableau, vous pilotez au ressenti ; avec lui, chaque décision (embauche, loyer, outil) se prend sur chiffres.

**Liens :** [Index piste](00_INDEX.md) · [Grilles de pricing](../12_Finance_Cabinet_OS/00_INDEX.md) (source des packs — non dupliquées ici) · [Numbers Sheet](../07_Sharp_Legal_Mind/03_Numbers_Sheet.md) · [Scaling AE→SARL](../../02_Niches_Deep_Dive/06_Autoentrepreneur_to_SARL_Scaling/00_INDEX.md)

## Objectifs
1. Construire un P&L mensuel tenant sur une page : produits / charges fixes / provisions / résultat.
2. Séparer revenus récurrents (retainers 2.500–3.500 HT/mois) et revenus ponctuels (packs).
3. Calculer la marge nette et la comparer à la cible ≥60 %.
4. Déterminer le seuil de rentabilité mensuel et annuel.
5. Traduire chaque charge nouvelle en nombre de retainers avant de signer quoi que ce soit.

## Prérequis
- Compte bancaire professionnel séparé (jamais de flux perso dans le P&L cabinet).
- Facturation exportable par client et par type de mission (un Google Sheets suffit).
- Grilles tarifaires validées (renvoi : 12_Finance_Cabinet_OS).
- 45 minutes bloquées le 1er de chaque mois.

## TL;DR
Cabinet solo réglé : ~21.000 DH HT/mois de produits (3 retainers × 3.000 + ~12.000 de packs), ~7.100 DH de charges fixes, marge nette ≈66 %, seuil de rentabilité ≈7.100 HT/mois soit ~85.200 HT/an. Règle centrale : une charge fixe ne rentre dans le P&L que si les retainers qui la financent existent déjà.

## Base légale

| Règle | Base | Source + date |
|---|---|---|
| IS : taux réduit sur bénéfice net ≤300.000 DH ; barème évolutif | CGI (LF annuelles) | sgg.gov.ma — [vérifier PLF 01/10] |
| TVA standard sur prestations de services : 20 % | CGI art.92-I | sgg.gov.ma |
| Cotisations sociales ≈27,83 % du brut (6,74 % salarié + 21,09 % patronal) | Code sécurité sociale | cnss.ma |
| Capital SARL minimum 10.000 DH ; obligations comptables de la société | Loi 5-96 art.6 | sgg.gov.ma |

## Procédure pas-à-pas (le 1er du mois, 45 min)

### Étape 1 — Ligne produits (par nature)
| Produit | Nature | HT/mois |
|---|---|---|
| Retainer client A (conformité contrats) | Récurrent | 3.000 |
| Retainer client B (veille sociale) | Récurrent | 3.000 |
| Retainer client C (data/RGPD) | Récurrent | 3.000 |
| Packs ponctuels (création, contentieux ciblé, audit) | Ponctuel | ~12.000 |
| **Total produits** | | **21.000** |

Les débours (OMPIC 1.200/classe, huissier, traduction assermentée) ne figurent JAMAIS ici : transit en transparence, module 08.

### Étape 2 — Ligne charges fixes (une ligne par poste)
| Charge | HT/mois |
|---|---|
| Loyer espace partagé | 2.500 |
| Outils SaaS (gestion dossier, facturation, visio) | 800 |
| Comptabilité externalisée | 1.000 |
| Téléphone + internet | 400 |
| Assurance RC professionnelle | 300 |
| CNSS gérant : part patronale 21,09 % d'une base ~6.000 | 1.265 |
| Fournitures, déplacements, divers | 835 |
| **Total charges fixes** | **7.100** |

### Étape 3 — Provisions et résultat
| Calcul | Montant |
|---|---|
| Résultat avant provisions (21.000 − 7.100) | 13.900 |
| Provision fiscale mensuelle (IS sur bénéfice net ≤300.000 : taux cf. Numbers_Fiscal [vérifier PLF]) | ~1.200 |
| **Cash disponible avant décisions** | **~12.700** |

Marge nette = 13.900 / 21.000 = **66 %** ✅ (cible ≥60 %). Seuil de rentabilité = 7.100 HT/mois ≈ **85.200 HT/an**, soit environ 286 DH/jour ouvré.

## Cas pratique chiffré
Tarik quitte l'AE (approche du plafond 500.000 services, Loi 114-13 art.4) et crée sa SARL : capital 10.000, frais CRI ~2.000. Son mois type M+6 : produits 21.000 HT, charges fixes 7.100, prélèvement gérant 6.000 brut (CNSS comprise dans la ligne ci-dessus). Il provisionne l'IS chaque mois (module 03) et laisse le reste dormir en trésorerie jusqu'à validation du comptable. Résultat : quand arrive la liquidation annuelle, aucun stress de cash.

## Erreurs Top 5

| # | Erreur | Coût typique/an |
|---|---|---|
| ❌ | Confondre CA facturé et CA encaissé dans le P&L | Impôt provisionné sur du vent : ±10.000 DH |
| ❌ | Intégrer les débours refacturés dans les produits | Marge fictive, mauvaises décisions d'embauche |
| ❌ | Oublier la part patronale CNSS (21,09 %) dans le coût d'un poste | Sous-estimation ~10.000-12.000 DH |
| ❌ | Aucune ligne « provisions fiscales » | Découvert au paiement de l'IS : -20.000 DH cash |
| ⚠️ | Charges fixes > 35-40 % du CA | Seuil de rentabilité inatteignable en cas de -30 % |

## Checklist 12 points

1. [ ] Compte pro alimenté uniquement par des factures du cabinet.
2. [ ] Chaque produit étiqueté récurrent ou ponctuel.
3. [ ] Retainers facturés le même jour chaque mois (automatisation).
4. [ ] Charges fixes listées poste par poste, jamais en bloc « divers ».
5. [ ] Part patronale 21,09 % incluse dans tout coût d'embauche simulé.
6. [ ] Débours hors P&L (compte transitaire, module 08).
7. [ ] Provision fiscale mensuelle calculée et mise de côté.
8. [ ] Prélèvement gérant fixé à l'avance, modifiable au 1er du mois seulement.
9. [ ] Marge nette comparée à la cible ≥60 %.
10. [ ] Seuil de rentabilité converti en DH/jour ouvré.
11. [ ] Revue P&L le 1er du mois, 45 minutes maximum.
12. [ ] Maximum une décision de dépense nouvelle par mois.

## QCM

**Q1. Un pack 12.000 HT facturé le 28 et payé le 15 du mois suivant : quand entre-t-il dans le P&L ?**
A. À la facturation B. À l'encaissement C. Au prorata sur deux mois

> **Réponse : A —** le compte de résultat enregistre le produit à la livraison/facturation ; l'encaissement appartient au forecast de trésorerie (module 02). Deux vues distinctes : les mélanger fausse la marge ET le cash.

**Q2. Charges fixes 7.100/mois. CA mensuel minimal pour garder une marge ≥60 % ?**
A. ~11.900 B. ~17.750 C. ~21.000

> **Réponse : B —** charges fixes ≤40 % du CA : 7.100 / 0,40 ≈ 17.750 HT. En dessous, la structure mange la croissance ; au-dessus, la marge absorbe un trimestre faible sans casse.

**Q3. Coût employeur réel d'une embauche à 4.000 brut ?**
A. 4.000 B. 4.269 C. ~4.844

> **Réponse : C —** 4.000 + part patronale 21,09 % (≈844) ≈ 4.844/mois, hors indemnité de licenciement à provisionner (~1,5 mois de salaire par année d'ancienneté, Code travail). Soit ~58.100 DH/an, pas 48.000.

## Fiches révision

**Carte 1 — Les quatre lignes du P&L**
Produits (récurrents vs ponctuels) − Charges fixes (poste par poste) − Provisions fiscales = cash disponible. Une page, le 1er du mois, 45 minutes.

**Carte 2 — La règle des 60 %**
Marge nette <60 % deux mois consécutifs : gel des charges fixes, relecture pricing (12_Finance_Cabinet_OS), relances agressives (module 07). Pas de dépense nouvelle tant que la marge n'est pas revenue.

**Carte 3 — Traduire en retainers**
Assistant(e) 4.844 = 1,6 retainer · Bureau 2.500 = 0,83 retainer · SaaS 800 = 0,27 retainer. Les retainers n'existent pas encore ? La dépense attend.

## EN - Key takeaways
The monthly P&L is the operator's first instrument: one page, refreshed on day 1 of each month. Split products into recurring retainers (2,500–3,500 HT/month each) and one-off packs; keep re-billed disbursements (OMPIC, bailiff, sworn translation) strictly out of revenue. List every fixed cost individually and always load the employer-side CNSS share (21.09% of gross) into any hiring simulation, adding a provisioning line for severance (~1.5 month per year of seniority). Target net margin ≥60%; the model cabinet runs 21,000 DH revenue against 7,100 fixed costs (≈66%), breaking even at ≈85,200/year. Set a monthly tax provision, fix your manager draw in advance, and translate every prospective expense into "how many retainers?" — if they do not exist yet, postpone.

## AR - ملخص ومصطلحات

| FR | العربية |
|---|---|
| Compte de résultat | حساب النتائج |
| Charges fixes | المصاريف الثابتة |
| Marge nette | الهامش الصافي |
| Seuil de rentabilité | عتبة المردودية |
| Produit récurrent | الدخل المتكرر |
| Provision fiscale | الاحتياط الجبائي |

**Darija :**
- « Chhal dakhel, chhal khrej » : had jouj so2al homa l-P&L kamel — dokhra 3la l-yamin, msarif 3la l-yassar.
- « Msarif bita » (المصاريف الثابتة) = charges fixes : ila zedti wa7da, sowel rouzek : chhal men retainer kaykelfounha ?

---
**Sources primaires :** sgg.gov.ma (CGI, PLF, Loi 114-13) · cnss.ma · oc.gov.ma (IGOC 2024) · impôts.gouv.fr (convention FR-Maroc) · ompic.ma. Dernière vérification : 23/08/2026 — re-vérifier PLF 01/10 et IGOC 15/07.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Décisions fiscales = comptable agréé obligatoire. Secret professionnel art.36. QCM pédagogique — aucun certificat.

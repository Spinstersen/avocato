# 00 — Index Finance Opérative : le cockpit de l'avocat-entrepreneur

> **Piste Finance Op (17) — 13 modules.** La piste 12_Finance_Cabinet_OS répond à « combien facturer ? ». Cette piste répond à « comment piloter ? » : P&L mensuel, trésorerie 13 semaines, impôts, charges sociales, KPI, indexation des prix. Objectif unique : un cabinet solo à marge nette ≥60 %, qui survit à un trimestre à -30 % d'activité sans drame.

**Liens :** [Pricing (grilles officielles)](../12_Finance_Cabinet_OS/00_INDEX.md) · [03_Numbers_Sheet](../07_Sharp_Legal_Mind/03_Numbers_Sheet.md) (source vérité chiffrée) · [03a_Fiscal](../07_Sharp_Legal_Mind/03a_Numbers_Fiscal.md) · [03b_Social](../07_Sharp_Legal_Mind/03b_Numbers_Social.md) · [03c_Change](../07_Sharp_Legal_Mind/03c_Numbers_Change.md)

## Objectifs
1. Installer un cockpit financier complet en 4 semaines : P&L, forecast, matrice TVA, KPI.
2. Connaître à tout instant : marge nette, cash disponible, seuil de rentabilité, DSO.
3. Ne plus jamais subir : IS, TVA, CNSS deviennent des rituels calendaires, pas des surprises.
4. Se payer correctement (mix salaire/dividendes) sans mettre le cabinet en risque.
5. Augmenter ses prix de +10 % par an sans perdre ses meilleurs clients.

## Prérequis
- Compte bancaire professionnel strictement séparé du compte personnel.
- Outil de facturation (même un Google Sheets) avec export par client et par mission.
- Grilles de prix validées (renvoi exclusif : 12_Finance_Cabinet_OS — cette piste ne duplique aucune grille).
- Convention d'honoraires écrite systématique avec provision de 50 % (art.30) avant démarrage.

## TL;DR
Le cabinet type de cette piste : ~21.000 DH HT/mois de produits (3 retainers × 3.000 + ~12.000 de packs), ~7.100 DH de charges fixes, marge nette ≈66 %, seuil de rentabilité ≈7.100 HT/mois, buffer de trésorerie = 3 mois de charges fixes (~21.300 DH). Les chiffres sensibles (barème IS, taux libératoire AE) vivent dans 03_Numbers_Sheet et se re-vérifient à chaque PLF (01/10) — jamais depuis la mémoire.

## Carte de la piste

| # | Module | Question à laquelle il répond | Livrable |
|---|---|---|---|
| 01 | P&L cabinet mensuel | Où va mon argent, mois par mois ? | Sheet P&L une page |
| 02 | Trésorerie 13 semaines | Tiendrai-je le trimestre prochain ? | Forecast glissant + buffer |
| 03 | IS & checklist PLF | Combien je dois à l'État cette année ? | Ritual PLF 01/10 |
| 04 | TVA appliquée (art.92) | 20 % ou 0 % quand je facture en devises ? | Matrice TVA missions |
| 05 | CNSS/AMO & charges patronales | Combien coûte vraiment un salarié ? | Coût employeur complet |
| 06 | Rémunération & dividendes | Comment je me paie légalement et bien ? | Mix salaire/dividendes |
| 07 | KPI dashboard | Est-ce que ça marche, objectivement ? | 6 KPI hebdo |
| 08 | Débours réels refacturés | Comment refacturer proprement OMPIC/huissier ? | Ledger débours/dossier |
| 09 | Indexation annuelle | Comment augmenter de +10 % sans churn ? | Scripts d'annonce |
| 10 | Vocabulaire FR/EN/AR/Darija | Comment parler finance à un client marocain ? | 48 termes trilingues |
| 11 | Cas année 1 : objectif 300k | Par où commencer concrètement ? | Plan mois par mois cash |
| 12 | Arbre QCM & fiches | Comment consolider et décider vite ? | Arbre décisionnel |

## Personas de référence

| Persona | Situation | Modules prioritaires |
|---|---|---|
| Tarik | Avocat en AE, plafond services 500.000 DH (Loi 114-13 art.4) en vue → création SARL (capital min 10.000, frais CRI ~2.000) | 01, 02, 05, 06, 11 |
| Yassine | Freelance juridique ~600k HT/an, problème de collecte et de TVA sur missions internationales | 02, 04, 07, 09 |
| Salma | Avocate niche e-commerce (marques OMPIC, marketplaces), première embauche en vue | 05, 08, 04, 09 |

## Base légale transversale

| Règle | Base | Source + date |
|---|---|---|
| IS : taux réduit sur bénéfice net ≤300.000 DH ; barème évolutif | CGI (LF annuelles) | sgg.gov.ma — [vérifier PLF 01/10] |
| TVA standard prestations de services 20 % | CGI art.92-I | sgg.gov.ma |
| Export de services 0 % sous 3 conditions cumulatives | CGI art.92-I-1° + IGOC 2024 | sgg.gov.ma / oc.gov.ma |
| Cotisations sociales ≈27,83 % du brut (6,74 % + 21,09 %) ; retard 3 %/mois | Code sécurité sociale | cnss.ma |
| Dividendes vers résident français : retenue limitée à 10 % | Convention fiscale FR-Maroc | impôts.gouv.fr |
| AE : plafond 500.000 services / 1.000.000 commerce ; cotisation libératoire ~0,5 %-1 % | Loi 114-13 art.4 [taux : vérifier] | sgg.gov.ma |
| Capital SARL minimum 10.000 DH | Loi 5-96 art.6 | sgg.gov.ma |
| Dotations change : voyage 100.000/an, e-commerce 15.000/an | IGOC 2024 | oc.gov.ma |

## Procédure : parcours d'installation en 4 semaines

| Semaine | Modules | Action concrète |
|---|---|---|
| S1 | 01 + 02 | Créer le sheet P&L mensuel + le forecast 13 semaines ; saisir 3 mois d'historique |
| S2 | 04 + 08 | Construire la matrice TVA (local/export) + le ledger débours par dossier |
| S3 | 05 + 06 | Calculer le coût employeur complet + figer son mix de rémunération |
| S4 | 07 + 12 | Installer le dashboard KPI (revue du vendredi 30 min) + parcourir l'arbre |
| Rituel annuel | 03 + 09 | PLF : checklist le 01/10 ; indexation : annonce des prix en janvier |

## Cas pratique chiffré (aperçu)
Tarik démarre l'année 1 avec 10.000 DH de capital. Suivant le module 11 : CA 300.000 HT en 12 mois, charges ~108.900, marge ≈64 %, cash projeté ~179.100 avant réserves fiscales. Trois jalons seulement : SARL opérationnelle M3, première embauche M9 (gate : MRR ≥9.000), gros pack 28.000 HT signé M11. Tout le détail mois par mois : module 11.

## Erreurs Top 5 transversales

| # | Erreur | Coût typique |
|---|---|---|
| ❌ | Mélanger trésorerie et résultat dans un seul fichier | Décisions faussées : impact ±20.000 DH/an |
| ❌ | Ignorer la part patronale CNSS (21,09 %) en embauchant | Sous-estimation ~10.000-12.000 DH/an |
| ❌ | Facturer en devises un client final local en croyant éviter la TVA 20 % | Redressement 20 % + pénalités |
| ❌ | Attendre le courrier fiscal pour découvrir son IS | Découvert cash : 20.000-50.000 DH d'un coup |
| ⚠️ | Zéro indexation pendant 3 ans puis +30 % brutal | Pic de churn : 1-2 retainers perdus (~36.000 DH/an) |

## Checklist 12 points du cockpit

1. [ ] Compte pro ouvert et alimenté uniquement par des factures du cabinet.
2. [ ] Sheet P&L mensuel construit (module 01) et rempli 2 mois d'affilée.
3. [ ] Forecast 13 semaines créé (module 02), revu chaque dimanche (20 min).
4. [ ] Buffer = 3 mois de charges fixes constitué et intouchable.
5. [ ] Matrice TVA local/export affichée près de l'outil de facturation.
6. [ ] Ledger débours par dossier fonctionnel (OMPIC, huissier, traduction assermentée).
7. [ ] Coût employeur complet calculé AVANT toute annonce d'embauche.
8. [ ] Mix de rémunération écrit (salaire socle + dividendes après validation comptable).
9. [ ] Dashboard 6 KPI revu chaque vendredi (30 min).
10. [ ] Alerte calendaire PLF 01/10 posée (re-vérifier barème IS sur sgg.gov.ma).
11. [ ] Date d'indexation annuelle fixée (janvier) + scripts prêts.
12. [ ] Revue mensuelle bloquée dans l'agenda : 45 min, chiffres devant soi.

## QCM

**Q1. Quelle est la différence entre cette piste et 12_Finance_Cabinet_OS ?**
A. Elles font la même chose B. Celle-ci pilote (P&L, cash, impôts, KPI), celle-là fixe les grilles de prix C. Celle-ci remplace le comptable

> **Réponse : B —** 12_Finance_Cabinet_OS = pricing (combien facturer) ; 17_Finance_Op = cockpit (comment piloter ce qui rentre et sort). Les grilles de prix ne sont jamais dupliquées ici : on renvoie systématiquement vers la source.

**Q2. Votre marge nette passe sous 60 % deux mois consécutifs. Premier réflexe ?**
A. Trouver de nouveaux clients immédiatement B. Geler toute nouvelle charge fixe et relire le P&L ligne par ligne C. Baisser ses prix pour attirer du volume

> **Réponse : B —** la discipline d'abord : geler les charges, diagnostiquer (prix ? collecte ? mix ?), puis agir. Baisser les prix en crise de marge aggrave le trou ; la chasse client sans cockpit reproduit le problème.

**Q3. Quand le barème IS doit-il être re-vérifié, et où ?**
A. Jamais, il est stable B. Chaque PLF (autour du 01/10) sur sgg.gov.ma et via 03_Numbers_Fiscal C. Sur les groupes WhatsApp d'avocats

> **Réponse : B —** le barème est évolutif (convergence programmée des taux). Source officielle : PLF publié sur sgg.gov.ma, consolidée dans Numbers_Fiscal. Une hypothèse de taux périmée fausse toute la stratégie dividende/salaire.

## Fiches révision

**Carte 1 — Les chiffres d'or du cockpit**
Marge ≥60 % · Provision 50 % (art.30) · Buffer 3 mois de charges fixes (~21.300 DH) · CNSS globale ≈27,83 % · DSO ≤30 jours · Indexation +10 %/an.

**Carte 2 — Les quatre rendez-vous financiers**
Dimanche : forecast 13 semaines (20 min). Vendredi : KPI (30 min). 1er du mois : P&L (45 min). Octobre : checklist PLF. Janvier : indexation.

**Carte 3 — La règle des trois tiroirs**
Honoraires (mon revenu), débours (argent du client, transit sans marge), trésorerie perso (prélèvement décidé, jamais improvisé). Trois flux, jamais mélangés.

## EN - Key takeaways
This track turns a solo law practice into a measurable business. Its twin pillars: a one-page monthly P&L (target net margin ≥60%, break-even ≈7,100 DH/month in the model case) and a rolling 13-week cash forecast protecting a three-month fixed-cost buffer. Taxes and social charges become calendar rituals, never surprises: IS scale re-checked at each Finance Bill (October 1st, sgg.gov.ma), CNSS fully loaded at ≈27.83% before any hire, VAT matrix applied to every invoice (local client billed in foreign currency still pays 20%). You pay yourself through a deliberate salary/dividend mix; you reprice +10% yearly with prepared scripts. Everything here defers to two sources of truth: 12_Finance_Cabinet_OS for price grids and 03_Numbers_Sheet for figures.

## AR - ملخص ومصطلحات

| FR | العربية |
|---|---|
| Cockpit financier | قيادة مالية / لوحة قيادة |
| Trésorerie | السيولة النقدية |
| Marge nette | الهامش الصافي |
| Impôt sur les sociétés | الضريبة على الشركات |
| Cotisations sociales | الاشتراكات الاجتماعية |
| Provision d'honoraires | تسبيق الأتعاب |

**Darija :**
- « L-cockpit » dyal l-cabinet : 3ref kol chhar chhal dakhel, chhal khrej, w chhal b9a — bla ma tkoun tsawer.
- « Tsbiq 50% qbel ma tbda » (تسبيق) : la provision art.30 hiya l-principe numéro wa7ed — bla flous qbel, bla khdma.

---
**Sources primaires :** sgg.gov.ma (CGI, PLF, Loi 114-13) · cnss.ma · oc.gov.ma (IGOC 2024) · impôts.gouv.fr (convention FR-Maroc) · ompic.ma. Dernière vérification : 23/08/2026 — re-vérifier PLF 01/10 et IGOC 15/07.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Décisions fiscales = comptable agréé obligatoire. Secret professionnel art.36. QCM pédagogique — aucun certificat.

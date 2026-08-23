# 07 — KPI Dashboard du Cabinet : MRR, DSO, Collecte, Churn

> **Cockpit opérateur — module 07/13.** Six indicateurs, trente minutes chaque vendredi. Pas davantage. Le dashboard ne décrit pas le passé : il force les décisions de la semaine suivante — qui relancer, quel pack proposer, quelle charge geler. Si un KPI ne déclenche jamais d'action, il quitte le tableau.

**Liens :** [Index piste](00_INDEX.md) · [KPI MRR (pricing)](../12_Finance_Cabinet_OS/00_INDEX.md) · [Numbers Sheet](../07_Sharp_Legal_Mind/03_Numbers_Sheet.md) · [Forecast 13 semaines](02_Tresorerie_13_Semaines_Forecast.md)

## Objectifs
1. Définir 6 KPI non négociables : MRR, CA packs, DSO, taux de collecte, churn, marge nette.
2. Fixer leurs cibles et leurs seuils d'alerte (rouge/orange/vert).
3. Installer la revue du vendredi : 30 minutes, décisions notées, responsables nommés.
4. Relier chaque KPI à une action pré-écrite (pas d'improvisation en crise).
5. Suivre la trajectoire année 1 (objectif 300k, module 11) semaine par semaine.

## Prérequis
- P&L mensuel opérationnel (module 01) et forecast hebdomadaire (module 02).
- Liste clients à jour avec statut retainer/pack et dates de facturation.
- Un sheet unique : onglet Dashboard + onglet Créances + onglet Pipeline.
- Discipline : la revue a lieu même (surtout) en semaine chargée.

## TL;DR
Les cibles du cabinet modèle : MRR ≥9.000 (≥30 % du CA), packs ≥12.000/mois, DSO ≤30 jours, collecte ≥95 %, churn ≤1 client récurrent/an, marge nette ≥60 %, pipeline pondéré ≥2× l'objectif packs. Cas Yassine (600k/an) : DSO 52 jours et collecte 88 % au départ — deux trimestres de rituel vendredi plus tard : DSO 31, collecte 96 %, zéro churn, ~28.000 DH de cash débloqués sans un dirham de CA nouveau.

## Base légale

| Règle | Base | Source + date |
|---|---|---|
| Facturation et suivi des créances conformes aux mentions obligatoires | CGI / obligations comptables | sgg.gov.ma |
| Provision 50 % à la commande (art.30) comme politique de crédit | Convention d'honoraires | Loi 28-08 / pratique barreau |
| Majoration retard CNSS 3 %/mois (KPI « paiements à temps » côté cabinet) | Code sécurité sociale | cnss.ma |
| Secret professionnel : dashboard anonymisé si partagé | Art.36 Loi 28-08 | sgg.gov.ma |

## Procédure pas-à-pas (vendredi, 30 min)

### Étape 1 — Le tableau de bord type
| KPI | Formule | Vert | Orange | Rouge |
|---|---|---|---|---|
| MRR | Σ retainers HT actifs | ≥9.000 | 6.000–9.000 | <6.000 |
| Packs du mois | Σ factures ponctuelles HT | ≥12.000 | 8.000–12.000 | <8.000 |
| DSO | (Créances TTC ÷ CA TTC)×365 | ≤30 j | 31–45 j | >45 j |
| Collecte | Encaissé ÷ Facturé (mois) | ≥95 % | 90–94 % | <90 % |
| Churn récurrent | Clients partis ÷ clients actifs | ≤8 %/an | 9–16 % | >16 % |
| Marge nette | Résultat ÷ CA (module 01) | ≥60 % | 50–59 % | <50 % |

Plus un indicateur de pipeline pondéré : Σ(montant × probabilité) ≥2× l'objectif packs.

### Étape 2 — Associer une action pré-écrite à chaque rouge
| Signal rouge | Action immédiate pré-écrite |
|---|---|
| DSO >45 j | Relances J+7 systématisées + mise en demeure J+60 + provision 100 % nouveaux mandats |
| Collecte <90 % | Gel des nouvelles missions non provisionnées (art.30 strict) |
| Churn >1/trimestre | Entretiens de sortie + revue de valeur + pricing (12_Finance_Cabinet_OS) |
| Marge <60 % 2 mois | Gel charges fixes (module 01) + replay arbitrage (module 09) |
| MRR <6.000 | Semaine commerciale dédiée : 5 propositions de retainer envoyées |
| Pipeline <2× | 10 proscriptions qualifiées avant tout autre travail administratif |

### Étape 3 — Tenir la revue en 30 minutes chrono
1. Coller les chiffres de la semaine (5 min).
2. Lire les rouges uniquement (5 min).
3. Une décision notée par rouge : quoi, qui, quand (10 min).
4. Vérifier le forecast point bas (module 02) (5 min).
5. Une phrase de bilan écrite : « la semaine prochaine je… » (5 min).

### Étape 4 — Mensualiser et historiser
Fin de mois : moyenne mobile 3 mois de chaque KPI, courbe collée dans le P&L. Tendance > instantané : un DSO à 29 après un mois à 52 vaut mieux qu'un 34 stable.

## Cas pratique chiffré
Yassine, 600k/an, dashboard initial : MRR 14.000 (4 retainers × 3.500), packs ~36.000/mois, DSO **52 j**, collecte **88 %**, churn 2/12, marge 61 %. Diagnostic : croissance réelle financée par son propre cash. Plan trimestre 1 : relance automatique J+7 (modèle de mail prêt), appel à J+30, mise en demeure à J+60, provision 100 % sur tout nouveau mandat étranger. Résultats T+90 : DSO **31 j**, collecte **96 %**, churn **0**, cash moyen remonté d'environ +28.000 DH. Aucune action commerciale nouvelle — pure exécution de cockpit.

## Erreurs Top 5

| # | Erreur | Coût typique |
|---|---|---|
| ❌ | Suivre 20 indicateurs, agir sur aucun | Temps perdu + faux sentiment de contrôle |
| ❌ | Revue sautée en semaine chargée | Les rouges vieillissent mal : +10.000 de créances durcies |
| ❌ | DSO ignoré tant que « ça rentre un jour » | Financement permanent des clients : ~25.000 immobilisés |
| ❌ | Churn mesuré seulement quand le client part | Détection post-mortem : rétention impossible |
| ⚠️ | KPI sans action associée | Tableau décoratif : décision jamais prise |

## Checklist 12 points

1. [ ] Sheet dashboard créé avec les 6 KPI + pipeline.
2. [ ] Formules verrouillées (personne ne retape les chiffres à la main).
3. [ ] Créancier à jour : client, montant, date, statut couleur.
4. [ ] Revue vendredi bloquée récurrente (30 min).
5. [ ] Actions pré-écrites collées sous chaque ligne du tableau.
6. [ ] Relance J+7 automatisée (modèle de mail prêt).
7. [ ] Mise en demeure J+60 déclenchée sans exception.
8. [ ] Provision 100 % appliquée dès collecte <90 %.
9. [ ] Courbe 3 mois par KPI tenue.
10. [ ] Dashboard anonymisé avant tout partage (secret pro art.36).
11. [ ] Trajectoire 300k (module 11) suivie sur le même sheet.
12. [ ] Bilan écrit d'une phrase chaque semaine.

## QCM

**Q1. DSO à 52 jours, collecte 88 % : première action ?**
A. Trouver de nouveaux clients B. Exécuter la séquence anti-retard : relance J+7, appel J+30, mise en demeure J+60, provisions renforcées C. Baisser les prix

> **Réponse : B —** Yassine a récupéré ~28.000 DH sans vendre davantage : le problème n'était pas le marché mais le crédit implicite accordé aux clients. Nouveaux clients d'abord ? Ils arriveraient dans le même trou.

**Q2. Que signifie un MRR ≥30 % du CA ?**
A. Une règle légale B. Un socle récurrent couvrant les charges fixes et stabilisant le forecast C. Un objectif marketing arbitraire

> **Réponse : B —** avec 9.000 de MRR contre 7.100 de charges fixes, le cabinet survit au pire mois de packs sans toucher au buffer. Le MRR n'est pas de la vanité : c'est la prime d'assurance du modèle.

**Q3. À quoi sert la courbe 3 mois de chaque KPI ?**
A. À faire joli B. À lire la tendance plutôt que l'instantané et éviter les fausses alertes C. À comparer aux autres cabinets

> **Réponse : B —** un DSO qui descend de 52 à 31 raconte une victoire ; le même 31 stable après un bon mois peut cacher une dérive. La tendance pilote, l'instantané alarme.

## Fiches révision

**Carte 1 — Les six chiffres du vendredi**
MRR ≥9.000 · Packs ≥12.000 · DSO ≤30 j · Collecte ≥95 % · Churn ≤8 %/an · Marge ≥60 %. Rouges lus, décisions notées, 30 minutes chrono.

**Carte 2 — Rouge = action écrite**
Chaque rouge a sa réponse pré-écrite. La crise ne s'improvise pas : elle s'exécute.

**Carte 3 — Le cas Yassine**
DSO 52→31, collecte 88→96 %, +28.000 DH de cash débloqué en un trimestre. Zéro nouveau client, zéro baisse de prix : juste des relances datées.

## EN - Key takeaways
Six indicators, thirty minutes, every Friday: recurring revenue (target ≥9,000, at least 30% of turnover), pack revenue (≥12,000/month), days sales outstanding (≤30), collection rate (≥95%), churn (≤8%/year) and net margin (≥60%). Each red state carries a pre-written response: hardened reminders at day 7, call at day 30, formal notice at day 60, 100% upfront on new mandates once collection drops below 90%. The Yassine case proves the leverage: DSO cut from 52 to 31 days and collection raised from 88% to 96% released roughly 28,000 dirhams of trapped cash in one quarter — no new clients, no discounting. Track three-month trends rather than snapshots, keep the receivables tab color-coded, and anonymize the dashboard before sharing anything (professional secrecy, art.36). An indicator without an attached action leaves the board permanently.

## AR - ملخص ومصطلحات

| FR | العربية |
|---|---|
| Indicateur clé de performance | مؤشر الأداء الرئيسي |
| Revenu récurrent mensuel | الدخل الشهري المتكرر |
| Délai moyen d'encaissement | متوسط أجل التحصيل |
| Taux de collecte | نسبة التحصيل |
| Attrition (churn) | تسرّب الزبناء |
| Tableau de bord | لوحة القيادة |

**Darija :**
- « Njma3 kol jemaa f 30 dqii9a » : sitt chiffres safi — l-rouge kaytqra, l-qarar ykteb, w tsali.
- « Flousna 3la l-wra9 machi flousna » : DSO twil ya3ni rak tkellem b flous l-kliyan — qasser l-mouda w rta7.

---
**Sources primaires :** sgg.gov.ma (CGI, PLF, Loi 114-13) · cnss.ma · oc.gov.ma (IGOC 2024) · impôts.gouv.fr (convention FR-Maroc) · ompic.ma. Dernière vérification : 23/08/2026 — re-vérifier PLF 01/10 et IGOC 15/07.

> **Devoir d'information art.59 Loi 28-08 :** documentation doctrinale, pas consultation personnalisée. Décisions fiscales = comptable agréé obligatoire. Secret professionnel art.36. QCM pédagogique — aucun certificat.

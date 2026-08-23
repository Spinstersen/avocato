# 13 — Audit d'impact des réformes 2025-2026 sur le vault

> **Audit exécuté le 23/08/2026** — suite à `12_VEILLE_LEGALE_2025_2026.md` (lois 58-25 CPC · 66.23 avocats · 03.23 CPP).
> Légende : ✅ corrigé ce jour · 🟡 bannière ajoutée (contenu à réviser en profondeur lors d'un sprint dédié) · ℹ️ conforme, aucune action.

---

## 1. Erreur plafonds AE corrigée (Loi 114-13)

**Erreur identifiée** : le plafond AE commerce était indiqué « **1 million DH** » dans plusieurs fichiers, en contradiction avec la source de vérité du vault (`03_Glossaire §09`) et la loi. **Règle correcte appliquée : 500 000 DH commerce / 200 000 DH services** (HT, 12 mois glissants), vérifiée le 23/08/2026.

| Fichier | Avant → Après |
|---|---|
| `04_Skills/07_Sharp_Legal_Mind/03a_Numbers_Fiscal.md` | Tableau + checklist PLF : 1M → **500k** (+ services 200k), date vérif actualisée |
| `04_Skills/07_Sharp_Legal_Mind/03_Numbers_Sheet.md` | Ligne 2 : 1M → **500k** ; checklists «500k/1M» → «500k/200k» |
| `02_Niches/02_Ecommerce/07_Cas_Pratique_Complet.md` | «plafond commerce 1 million» → **500 000 DH** (CA cas 360k reste sous plafond ✓) |
| `02_Niches/02_Ecommerce/02_Douleurs_Juridiques.md` | «1 million DH/an pour commerce» → **500 000** (200k services) |
| `01_Strategy/03_Unsaturated_Niches_Overview/03_Niche1_Freelancers_Offshore.md` | «1 million achat-revente» → **500 000 DH** |
| `01_Strategy/03_Unsaturated_Niches_Overview/04_Niche2_Ecommerce_YouCan.md` | idem → **500 000 DH** |
| `01_Strategy/03_Unsaturated_Niches_Overview/08_Niche6_AE_vers_SARL.md` | idem → **500 000 DH** |
| `02_Niches/08_Fiscalite_Internationale_Rapatriement/03_Freelance_Ecom…md` | Tables + échafaudage de seuils recalé : bascule SARL «avant 1M» → **avant 500k**, palier 800k → 400k |
| `02_Niches/08_Fiscalite_Internationale_Rapatriement/00_INDEX.md` | Tableau statuts : 1M → **500k** |
| `02_Niches/08_Fiscalite_Internationale_Rapatriement/10_Arbre_Decision_Statut_International.md` | Arbre : «200k-1M» → «200k-500k», «>1M» → «>500k» |
| `04_Skills/03_Sales_Without_Selling/01_Theorie_SPIN_Challenger.md` | Renvoi glossaire «500k/1M» → «500k/200k» |

ℹ️ Déjà conformes (aucune action) : `03_Glossaire §09`, `00_START_HERE/08_FAQ_30`, `12_Finance_Cabinet_OS/05_Comparatif_Statuts`. Les tranches **IS** «20% 300k-1M / 32% >1M» sont un autre sujet (bénéfice SARL, non touchées — déjà marquées «à vérifier PLF 01/10»).

## 2. Loi 58-25 (nouveau CPC, en vigueur le 24/08/2026)

🟡 **Bannière de réforme insérée dans les 13 fichiers du track `14_Litigation/`** (`00_INDEX` → `12_Arbre_QCM`). La bannière précise : abrogation du CPC 1974 au 24/08/2026, intégration des règles procédurales 53-95/41-90/80-03, non-rétroactivité art. 641, obligation de re-vérifier chaque article pour toute nouvelle procédure.

Fichiers dont le **fond procédural** devra être réécrit sous la loi 58-25 (numérotation et délais nouveaux — à faire après publication des textes d'application) :

| Fichier | Points à retravailler plus tard |
|---|---|
| `14_Litigation/01_CPC_Fondamentaux_Juridictions.md` | Cartographie refondue : le « duo fondateur » CPC 1974 + 53-95 devient un code unique ; seuils proximité [vérifier] |
| `…/02_Requete_Introductive_Assignation_Modele.md` | Mentions obligatoires nouvelles ; dépôt greffe **ou électronique** (art. 76) |
| `…/03_Mise_en_Etat_Conclusions.md` | Juge de la mise en état aux pouvoirs élargis |
| `…/04_Audience_Plaidoirie_PV.md` | Audiences à distance encadrées ; délais d'appel à requalifier |
| `…/05_Referes_Ordonnances_Urgentes.md` | Références procédurales à requalifier |
| `…/06_Injonction_De_Payer_TribCom.md` | Procédure rapide : cadre 53-95 intégré au nouveau code |
| `…/07_Execution_Jugement_Saisies.md` | Réforme de l'exécution annoncée par le texte |
| `…/08_Voies_Recours_Opposition_Appel_Cassation.md` | **Voies de recours conditionnées à la valeur du litige** — changement majeur |
| `…/09_Transaction_Arbitrage_Mediation_AMR.md` | À enrichir : médiation/conciliation consacrées (art. 6-9) |
| `…/11_Cas_Pratiques_3_Litiges.md`, `12_Arbre_Decision_QCM_Fiches.md` | Cas/QCM citant dahir 1974 & 53-95 |

ℹ️ Les mentions « DOC art.258/264/618 » (astreinte, clause pénale, réserve de propriété) restent valables : ce sont des articles de **fond** du DOC, non touchés par la réforme procédurale.

## 3. Loi 66.23 (profession d'avocat)

🟡 Bannière insérée dans :
- `01_Strategy/06_Deontologie_Pratique_Avocat_Maroc/00_INDEX.md`
- `05_Document_Bank/templates/01_Convention_Honoraires_Modele.md`

À intégrer dans un prochain sprint : clause de **traçabilité des honoraires** dans les templates, mise à jour de `08_Sanctions_Procedure_Disciplinaire.md` (nouvelle discipline), veille sur la **décision de la Cour constitutionnelle** (pendante au 23/08/2026).

## 4. Loi 03.23 (procédure pénale)

ℹ️ Impact indirect sur ce vault (droit des affaires). Noté dans `12_VEILLE_LEGALE_2025_2026.md` : renvoyer au pénaliste pour tout volet pénal client (escroquerie, chèques) — délais et garanties changés depuis le 08/12/2025.

## 5. Point doctrinal à vérifier (non tranché)

Le vault cite systématiquement « Loi 28-08 » comme base des obligations professionnelles (convention art.30, provision art.32, secret art.36, information art.59). **La loi n° 28-08 est la loi relative à la protection des données personnelles (CNDP)** ; l'organisation de la profession relevait jusqu'ici de la **loi 27-11**, désormais remplacée par la **66.23**. À arbitrer en sprint dédié : soit requalifier ces renvois vers la numérotation exacte (loi/RI), soit documenter explicitement la convention de numérotation utilisée par le vault. Non modifié aujourd'hui pour ne pas casser 400+ références sans certitude.

---

*Prochaine revue recommandée : T4 2026 (après textes d'application 58-25 + décision CC sur 66.23 + PLF 01/10).*

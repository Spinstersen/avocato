# 02 — Salarié Hors Maroc : Détachement 12 mois vs Portage International vs Contrat Local

> **Vide total avant** (`Select-String salarié.*étranger:1 hit`). Profondeur maximale.

## Problème

Client 1: **Société marocaine veut salarié à Paris** (remote). Client 2: **Société française veut salarié à Casa** (coût moitié). Client 3: **Freelance veut devenir salarié hors Maroc** pour sécurité.

## 3 Options (comparatif complet)

| Option | Durée max | Contrat | CNSS/URSSAF | Fiscalité | Avantages | Inconvénients |
|---|---|---|---|---|---|---|
| **Détachement** (art. L.1262 Code travail FR + convention sécu Maroc-France 1968) | 12 mois renouvelable 12 (24 max) | Contrat Maroc reste, mission lettre | CNSS Maroc reste (certificat A1 FR si détachement UE, sinon convention bilat) | IR foyer (183j) mais cotis Maroc | Rapide, pas création entité | Limité 12-24m, risque PE après 6m |
| **Portage international** (société portage Paris/Casa) | Illimité | Contrat portage (salarié porté) | Portage paie URSSAF/CNSS | IR lieu travail 183j | Illimité, sans entité, rapatriement salaire 100% | Coût portage 8-10% CA |
| **Contrat local** (créer filiale/succursale) | Illimité | Contrat local (FR ou MA) | Local | Local | Plein droit | Création 14j + IS |

## Détachement détaillé (cas Maroc → France 12m)

*   **Conditions:** salarié Maroc 6 mois ancienneté, reste à charge société Maroc, pas remplacement autre détaché.
*   **Formalités:** déclaration détachement SIPSI (FR), certificat CNSS Maroc → CPAM (form. SE 350-01), attestation DGI résidence.
*   **CNSS:** reste affilié CNSS Maroc (taux 21.09%) 12 mois, pas URSSAF (économie 45% → 25%).
*   **IR:** si <183j France → IR Maroc seulement (conv. art.15). Si >183j → IR France (retenue 0-20%).
*   **Risque PE:** Si salarié a pouvoir conclure contrats à Paris >6 mois → établissement stable art.13 conv. → IS France 25% sur bénéfice attribué.

## Portage détaillé (recommandé freelance → salarié hors Maroc)

*   **Montage:** Freelance Yassine (Casa) → portage `MABC Portage` (Paris) → client US → portage facture 5k€ → verse salaire 3,5k€ net + cotis 45% → solde 0.
*   **Avantage fiscal:** Portage gère TVA, IR, CNSS — Yassine reste résident Maroc 340j → IR Maroc mais cotis FR (A1).
*   **Contrat:** `Contrat travail portage` + `Convention portage` (3 parties) — modèle `05_Document_Bank/templates/`.
*   **Dotation Office:** Portage = prestation service export → rapatriement 30j IGOC `../09_Office_Changes_Dotation_IGOC2024/07_Obligations_Rapatriement_Justificatifs.md`.

## Contrat local (MRE crée filiale)

*   Si MRE Paris veut salarié Casa → créer SARL Casa (Loi 20-19) `10_MRE_Entrepreneurs/03_Creation_SARL_Distance_Procuration.md` → contrat CDI Maroc (Code travail art.16) + CNSS.
*   **Coût:** Salaire 8k DH brut + CNSS 2,100 DH = 10,100 DH vs 25k DH Paris.

## Synthèse arbre

```
Besoin <12m et pas PE ?
├─ OUI → Détachement (rapide, CNSS Maroc)
└─ NON (>12m ou PE) → Portage si 1 salarié, Filiale si >2 salariés
```

## Missions

*   Diagnostic Salarie Hors Maroc 1,500 HT (choix option + risque PE)
*   Pack Détachement 5,900 HT (lettres + certificat + convention)
*   Pack Portage 4,500 HT (contrats 3 parties)

## Checklist

*   [ ] 183j compté
*   [ ] Convention sécu FR-MA vérifiée
*   [ ] Certificat A1/SE 350
*   [ ] Lettre détachement 12m
*   [ ] Clause non-PE dans contrat
*   [ ] Co-traitance comptable pour IR

---

## Analyse doctrinale et raisonnement juridique — Salarié hors Maroc

**Pourquoi détachement, portage et contrat local ne sont pas interchangeables** : Le détachement (12 mois, convention sécurité sociale Maroc-France 1968, formulaire SE 350-01) maintient l'affiliation CNSS marocaine — utile pour une mission temporaire sans créer d'entité. Le portage crée un contrat de travail avec la société de portage, qui porte le risque social (URSSAF/CNSS) moyennant 8-10% de gestion — utile pour un poste durable sans filiale. Le contrat local suppose une SARL/succursale et transfère tout le droit social local.

**Raisonnement** : Le choix se fait en deux questions : durée >12 mois ? et pouvoir de conclure des contrats pour l'employeur à l'étranger ? Si l'un des deux est oui, le détachement bascule vers portage ou filiale, sinon on crée un établissement stable (art. 7 convention) taxé localement. L'erreur fréquente est de laisser un salarié marocain signer 8 mois à Paris sans portage — on crée un PE taxable en France sans le savoir.

### Sources primaires à consulter (à jour au 20/08/2026)

*   **sgg.gov.ma** — CGI (art. 19, 23, 92, 144, 150), Loi 20-19 (SARL), Loi 114-13 (AE), Loi 02-03 (séjour).
*   **oc.gov.ma** — IGOC 2024 (Instruction Générale des Opérations de Change), circulaires Office des Changes.
*   **cndp.ma** — Délibération 40-22 et guide registre Loi 09-08.
*   **courdecassation.ma / jep.ma** — Jurisprudence Cass. com. (clause pénale, réserve propriété, établissement stable).
*   **ompic.ma** — Guide dépôt marque, classification Nice, Bulletin des marques.

> Toute référence chiffrée (plafond, taux, délai) doit être vérifiée sur le texte source à la date de la consultation — les lois de finances annuelles modifient le barème IS/TVA et les dotations IGOC.

### Limites et devoir d'information (art. 59 Loi 28-08)

Cette fiche est une information doctrinale, pas une consultation individualisée. Le diagnostic préalable (45 min, convention art. 30) reste indispensable pour qualifier la situation personnelle du client, notamment avec le comptable agréé pour le chiffrage exact.

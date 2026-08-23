# 11 — Arbre Décision (01_Freelancers_Agencies_Offshore)

> Réf : `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §01-§12 — chaîne 01→02→04→07 est l'ordre réel freelance offshore.

## Ordre procédural : pourquoi PE avant 183j

Ne commencez pas par CA ou statut. Un PE en France rend la SARL taxable à Paris même si vous êtes résident 210j à Casa. D'où : **PE 6m d'abord → 183j ensuite → TVA ensuite → Convention enfin**.

```
[Q1] PE 6m en France ? §02  (bureau >6m OU salarié signataire ?)
 ├─ OUI → PE → IS France 25% sur bénéfice PE → Option filiale/portage 8% §09
 └─ NON → [Q2] Résident 183j / foyer §01  (CGI art.23) ?
           ├─ >183j OU foyer Casa → Résident → IS mondial 20 % (LF 2026) §09 + Carte 1an §08 si étranger
           └─ <183j ET foyer hors MA → Non-résident → IS source + compte devise MRE §12
                └─ [Q3] TVA art.92 exon ? §04 (service hors MA + devises + rapatriement 30j §03)
                     ├─ 3 OK → Facture HT 0% TVA → [Q4] Dividende art.27 §07 → retenue 10% FR /15% BE
                     └─ 1 KO → TVA 20% + pénalités 15% → corriger avant facturation
```

## Tableau décision — 4 branches max

| Branche | Condition | Base légale | Procédure (renvoi Glossaire) | Sortie |
|---------|-----------|-------------|------------------------------|--------|
| A — PE | Bureau Paris >6 mois ou closer qui signe | Conv. art.5/7 §02 | Test 3 questions §02 → si OUI : créer filiale FR ou portage, sinon SARL Casa seule | IS 25% FR vs 15% MA |
| B — Résidence | >183j ou foyer = résident | CGI art.23 §01 | Compter cachets 365j glissants + attestation DGI 30j §01 → §08 carte si nomad | Mondial vs source |
| C — TVA | Export hors MA payé devises rapatrié 30j | CGI art.92/144 §04 + §03 | Facture mention art.92 + SWIFT 30j banque §03 → sinon TVA 20% due | 0% ou 20% |
| D — Convention | Dividende / double impo | Conv. art.27 §07 + §12 | Attestation résidence DGI + formulaire 5000-F avant virement → compte MRE §12 | Crédit 15k économisé |

## Cas chiffrés

* **Yassine, dev Casa, client Berlin, 180k DH service, 210j Casa, pas de PE** : Résident §01 → AE encore possible (<200k) mais TVA art.92 via SARL plus clean si croissance → si SARL 80k bénéfice → IS 12k (15%) vs AE 3,6k (2% sur CA) — choisir SARL si >200k prévu §09.
* **Léa, agency Casa, closer Paris 7 mois, 600k bénéfice** : PE OUI §02 → 200k rattaché PE → IS FR 50k + IS MA 60k (400k×15%) = 110k ; sans PE (closer sans pouvoir signer) → 90k seulement → **20k surcoût + redressement**.
* **Karim, SAS Paris + SARL Casa, 40j MA, dividende 100k** : Non-résident §01 → IS source only → retenue 10% FR §07 =10k via 5000-F + compte devise MRE §12 transférable 72h.
* **Nadia, freelance 250k CA service, 190j Casa mais foyer Paris** : 190j <183? Non, 190j >183 → résident malgré foyer FR (183j suffit) §01 → IS mondial 15% + TVA art.92 si client FR payé devises §04 → SARL 7-14j §09 obligatoire (AE plafonné).

## Erreurs / pièges

* **Piège PE** : Mettre son frère à Paris 7 mois "sans contrat" → PE requalifié art.5 → redressement FR 25% + MA 15% non crédité.
* **Piège 183j** : 40j à Casa mais épouse/enfants à Casa = foyer → résident mondial malgré 40j §01 → IS 15% sur revenus FR oubliés + 30% pénalités.
* **Piège TVA** : Facturer client Casa en EUR avec exon art.92 → service rendu au MA → TVA 20% redressée §04.
* **Piège dotation** : Payer SaaS US 20k/an avec dotation 15k §03 → dépassement = infraction change 3k-30k ; solution : compte devise + rapatriement.
* **Piège convention** : Démarrer mission sans convention provision 50% §10 → impayé 60% + pas de preuve art.443 §11.
* **Piège carte** : Nomad US 210j Casa sans carte 1 an §08 → séjour irrégulier → amende + blocage compte convertible §12.

---

## L'arbre comme outil d'entretien, pas comme automate

L'arbre hiérarchise les questions préalables — il ne décide pas. Pour freelance offshore, l'ordre PE → 183j → TVA → convention évite de choisir SARL/AE avant de savoir où l'on est imposable. Chaque branche renvoie à une mission avec convention et provision 50% §10 + DOC art.443 §11, pas à un panier. Vérifiez chaque chiffre sur sgg.gov.ma et IGOC 2024 oc.gov.ma à J-0.

> Diagnostic 45 min + co-traitance comptable : chiffrage IS 15/20/32% et PE à confirmer PLF 2025.

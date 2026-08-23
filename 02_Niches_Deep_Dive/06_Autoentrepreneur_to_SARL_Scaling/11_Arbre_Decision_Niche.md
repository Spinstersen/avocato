# 11 — Arbre Décision (06_Autoentrepreneur_to_SARL_Scaling)

> Réf : `00_START_HERE/03_Glossaire_12_Concepts_Cles.md` §01-§12 — scaling = plafond → résidence → TVA → véhicule.

## Ordre procédural : plafond d'abord, statut ensuite

Rester AE au-delà du plafond 2 ans = radiation + redressement. D'où : **CA 200k/500k → 183j → TVA art.92 → AE vs SARL vs Portage**.

```
[Q1] CA 12m glissants > plafond ? §09 Loi 114-13 (200k service / 500k commerce)
 ├─ NON (<180k serv / <450k com) → AE 1j IR 0,5 % commerce / 1 % services (CGI art.73-II) → stay AE + registre 09-08 §06 si collecte
 └─ OUI → [Q1bis] Charges faibles (<50 % CA) ET sous plafonds CPU ?
           ├─ OUI → **CPU** CGI art.40-I (services <500k / commerce <2M ; coeff ×10 % ≈ 2-3 %)
           │         → dossier dédié : `01_Strategy/07_Formes_Juridiques_2026/02_CPU_CGI_art40-I.md`
           └─ NON / besoin TVA-crédit / salariat → [Q2] Résident 183j / foyer ? §01 CGI art.23
                     ├─ >183j résident → IS mondial 20 % (LF 2026) §09 + rapatriement 30j §03 obligatoire
                     └─ <183j non-résident → IS source §07
                          └─ [Q3] Client étranger payé devises + 3 cond. art.92 ? §04
                               ├─ OUI → SARL 10k capital 7-14j §09 → facture 0% TVA + compte convertible §12
                               └─ NON (client MA) → TVA 20% → [Q4] Véhicule ?
                                    ├─ Levée de fonds / pacte prévue ? → **SAS/SASU** loi 19-20 (`07_Formes_Juridiques_2026/01`)
                                    ├─ Sinon → SARL 20 % (LF 2026) §09
                                    └─ Besoin tester sans société → Portage 8% (pas de PE §02) → SARL ensuite
```

## Tableau décision — 4 branches

| Branche | Condition | Base légale | Procédure (renvoi Glossaire) | Sortie |
|---------|-----------|-------------|------------------------------|--------|
| A — Plafond | CA 12m glissants >200k serv /500k com | Loi 114-13 §09 | Suivre CA mensuel glissant → si > plafond 2 ans → radiation AE + bascule résultat réel + pénalités §09 | AE ou sortie AE |
| B — Résidence | 183j / foyer détermine IS | CGI art.23 §01 + §07 art.27 | Compter 365j glissants → attestation DGI 30j §01 → si résident 210j + SARL = carte 1 an §08 | Mondial vs source |
| C — TVA | Export hors MA + devises + 30j | CGI art.92/144 §04 + IGOC §03 | SARL/SAS seule permet exon 0% §04 → mention art.92 + SWIFT 30j §03 → sinon TVA 20% + 15% pénalités | 0% ou 20% |
| D — Véhicule | AE vs **CPU** vs SARL/SAS 20% vs portage 8% | §09 + CGI art.40-I + §02 PE + §12 | Si <200k → AE (0,5-1%) ; si >200k services charges faibles → CPU ~2-3% du CA ; si charges >50 % ou TVA-crédit → SARL/SAS IS 20 % (LF 2026) ; si PE risque FR §02 → portage 8% transitoire ; levée prévue → SAS | Choix chiffré |

## Cas chiffrés

* **Bilal, dev AE 190k service, 210j Casa, client Berlin payé EUR** : Plafond OK (<200k) mais croissance → palier CPU envisageable si charges faibles (CPU coeff 25 % = 4,75k sur 190k, libératoire + plafond 500k) vs SARL IS 20 % sur bénéfice ; mais AE/CPU ne permettent pas exon art.92 propre §04 → TVA 0% via SARL/SAS + rapatriement 30j §03 → société dès le besoin export récurrent, pas après radiation.
* **Fatima, e-com AE 520k commerce** : >500k → AE radiée §09 → redressement résultat réel + pénalités 30 % ; options : **CPU commerce** (coeff ~12 % → ~6,2k, plafond 2M) si charges faibles, ou SARL 10k 7-14j → IS 20 % (LF 2026) → si bénéf 80k → 16k IS vs CPU 6,2k → arbitrage charges/marge ; CMI + dotation 15k §03 débloquées par la société.
* **Younes, 40j MA, AE 180k, client Paris via closer Paris 7 mois** : PE OUI §02 → AE + PE = IS FR 25% → portage 8% (14,4k sur 180k) évite PE le temps de créer SARL Casa sans salarié signataire §02 → économie 30k.

## Erreurs / pièges

* **Piège glissant** : Calculer CA année civile au lieu de 12m glissants §09 → 190k civil mais 215k glissant → dépassement → radiation.
* **Piège AE export** : Facturer export en EUR en AE avec exon art.92 → AE non assujetti mais pas exon §04 → banque refuse rapatriement faute RC SARL §03.
* **Piège 183j** : 40j + foyer Casa = résident §01 → AE 400k déclaré en AE alors qu'IS mondial 15% dû → redressement double.
* **Piège dotation** : AE 15k dotation §03 insuffisante pour ads 25k → utilisation perso → infraction change 3k-30k ; SARL compte devise §12 résout.
* **Piège provision** : Créer SARL sans convention §10 50% + DOC art.443 §11 → impayé 60% missions scaling.
* **Piège marque** : Scaling sans marque 35/41 §05 → concurrent dépose nom → rebrand 60k en pleine croissance.
* **Piège 09-08** : Base clients AE 8k emails sans registre §06 → sanction CNDP qui bloque passage SARL.

---

## L'arbre comme outil d'entretien, pas comme automate

Pour AE→SARL, l'arbre commence par le plafond glissant, pas par l'envie de SARL — le statut est une conséquence fiscale. L'ordre plafond → 183j → TVA → véhicule évite de créer une SARL à 190k qui coûte plus cher qu'AE, ou de rester AE à 520k et se faire radier. Chaque branche renvoie à une mission avec convention provision 50% §10 et preuve DOC art.443 §11 + registre §06 + marque §05. Vérifiez PLF et IGOC à J-0.

> Diagnostic 45 min + comptable + banque : chiffrage AE 0,5-1 % vs CPU art.40-I vs SARL/SAS IS 20 % (LF 2026). Dossier complet statuts : `01_Strategy/07_Formes_Juridiques_2026/`.

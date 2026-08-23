# 02 — CPU : la Contribution Professionnelle Unique (CGI art.40-I), le palier oublié

> **Vérifié le 23/08/2026** — CGI art.40-I (régime de l'entreprise individuelle « classique »). LF 2026 applicable aux taux IS voisins. Sources : tax.gov.ma, pratique DGI.

## TL;DR

Entre le plafond AE et la société, il existe un **troisième palier** que presque personne ne conseille : la **CPU**. Vous restez personne physique, vous payez un **IR libératoire unique = CA × coefficient d'activité × 10 %**, sans déclaration détaillée du résultat. Coût effectif typique pour un freelance IT/conseil : **2 à 3 % du CA** — souvent moins cher qu'une SARL à charges réelles, avec des plafonds bien supérieurs à l'AE.

## Conditions d'éligibilité

| Activité | Plafond CPU |
|---|---|
| Commerce, industrie, artisanat | **2 000 000 MAD** de CA |
| Services & professions non réglementées | **500 000 MAD** de CA |

→ C'est exactement le trou entre AE (200k/500k) et la nécessité de créer une société.

## Le calcul

```
CPU annuelle = CA encaissé × coefficient d'activité × 10 %
```

Coefficients usuels (barème DGI par activité) :

| Activité | Coefficient | Coût effectif (×10 %) |
|---|---|---|
| Alimentation générale | 6 % | 0,6 % du CA |
| Boulangerie | 8 % | 0,8 % |
| Restauration légère | 10 % | 1 % |
| Restauration traditionnelle | 20 % | 2 % |
| Commerce non alimentaire | 12 % | 1,2 % |
| **Conseil / IT / design / formation** | **20-30 %** | **2-3 % du CA** |

Exemple freelance dev (conseil, coeff 25 %) à **400 000 DH de CA** :
CPU = 400 000 × 25 % × 10 % = **10 000 DH** (2,5 % du CA) — contre AE interdit (>200k services) ou SARL IS 20 % sur bénéfice après charges.

## Ce que la CPU couvre / n'couvre pas

- ✅ **Libératoire de l'IR** au titre des bénéfices professionnels : pas de déclaration de résultat détaillée.
- ❌ **TVA** : régime TVA de droit commun selon les seuils classiques — assujettissement obligatoire au-delà des seuils légaux ; vérifier art.91/92 pour exports.
- ⚠️ CNSS/AMO TNS à part ; comptabilité simplifiée mais registres tenus.
- Option **irréversible prudemment évaluée** : sortie du régime = bascule résultat réel ; arbitrer avant adhésion.

## Arbre express

```
CA services >200k ? ──non──> AE (IR 1 %)
        │ oui
        ▼
CA services <500k ET charges faibles ? ──oui──> CPU (coeff 20-30 % → ~2-3 %)
        │ non / besoin TVA-crédit / salariat
        ▼
SARL (IS 20 %) ou SAS si investisseurs
```

Côté commerce : CPU disponible jusqu'à **2M** (coeff 8-12 % → coût effectif 0,8-1,2 %) — très compétitif vs IS pour les activités à forte marge de trésorerie et peu de charges déductibles.

## Erreurs fréquentes

1. Conseiller SARL systématiquement dès 200k services alors que la CPU coûte parfois moitié moins (charges faibles).
2. Oublier que le **coefficient dépend de l'activité réelle** — mal qualifié = redressement.
3. Ignorer l'assujettissement TVA parallèle (CPU ≠ exonération TVA).
4. Ne pas anticiper la fin de libératoire : au-delà des plafonds CPU, bascule société obligatoire.

## Script client (FR)

« Entre l'auto-entrepreneur et la société, il y a un palier fiscal méconnu : la CPU. Vous restez entrepreneur individuel, vous payez environ 2 à 3 % de votre chiffre d'affaires d'impôt, libératoire, jusqu'à 500 000 DH en services. Si vos charges sont faibles, c'est souvent plus intéressant que de créer une société. On fait le calcul chiffré ensemble ? »

---

> **Devoir art.59 :** information doctrinale. Coefficients = barème DGI [vérifier votre code activité]. Diagnostic + comptable agréé avant option.

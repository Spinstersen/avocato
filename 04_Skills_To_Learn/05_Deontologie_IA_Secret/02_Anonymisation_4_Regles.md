# 02 — Anonymisation : 4 règles + exemples

> Anonymiser n'est pas traduire : c'est retirer ce qui identifie, garder ce qui qualifie.

## Les 4 règles
1. **Initiales** pour les personnes, **secteur** pour les sociétés (« agence web », « e-com cosmétiques »).
2. **Montants arrondis** (±10 %) et **dates floues** (« début 2025 », pas « 12/03/2025 »).
3. **Faits utiles conservés** : nature du flux, obligation, clause, juridiction — c'est le droit, pas l'identité.
4. **Un seul jeu de remplacement par affaire** (Client A, Société B) pour ne pas se contredire.

## Avant / après
| Avant (à ne jamais coller) | Après (safe) |
|---|---|
| « Ahmed Benali, ICE 001234567, contrat du 12/03/2025 » | « Client A, agence web, contrat début 2025 » |
| « Facture n° 2025-018, 47 350 DH » | « Facture, environ 45 000 DH » |
| « Mon client attaque la société X devant le tribunal de Casablanca » | « Un client conteste la résiliation devant le tribunal de commerce » |

## Ce qui ne s'anonymise pas
- Une donnée de santé, même sans nom : le contexte peut ré-identifier.
- Un cas unique et médiatisé : le lecteur identifie tout seul.
- Une pièce entière : on ne reformule pas un contrat signé, on ne le colle pas.

## Vérification finale (avant envoi au LLM)
- [ ] Aucun nom propre réel (personnes, sociétés, confrères).
- [ ] Aucun numéro (CIN, ICE, RC, RIB, dossier, téléphone).
- [ ] Montants arrondis, dates floues.
- [ ] Le prompt reste compréhensible sans les données retirées.

## Renvoi
Protocole avancé : `04_Skills_To_Learn/02_AI_For_Lawyers_Prompts/03_Anonymisation_Protocole.md`.

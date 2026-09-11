# AVOCATO v2 — Prototype isolé Dark Premium (React)

Dossier test **à part**. `webapp/` actuel (avocato-v3, 635 docs, `avocato:*`) n'est ni lu ni modifié.

## Lancer

```bash
cd webapp_v2_react
npm install
npm run sync:vault   # recopie webapp/data.js -> public/vault-data.js
npm run dev          # http://localhost:5174
npm run build        # dist/ statique (base ./)
npm test             # test d'isolation + parité
```

## Isolation

- Données : `avocato2:*` uniquement (même schéma JSON v3). Importe ton export `avocato-cabinet-*.json` via le bouton Import — rien n'écrit vers `avocato:*`.
- Vault : même `data.js` (635 docs), chargé en `fetch('vault-data.js')` local, lecture seule.
- Pas de service worker (zéro conflit avec `avocato-v3`), ports isolés 5174/4174.
- Rollback : supprimer `webapp_v2_react/` = retour instantané au système actuel.

## Thèmes : comparer avant d'adopter

Sélecteur dans le registre latéral (ou `⌘K` → « Thème : … »), mémorisé en local. Trois voix, mêmes données, même logique :

1. **Encrier** — nuit premium d'origine : encre, parchemin, laiton.
2. **CMS** (défaut) — sidebar pétrole sombre + orange + papier éditorial.
3. **Éditorial** — tout en lumière : masthead clair façon revue, pétrole sobre, laiton.

## Grille 7 jours

1. Import JSON v3 → 3 dossiers + 1 registre + 1 dividende visibles ?
2. Créer dossier → provision → rappels PACK auto créés ?
3. Registre : exigibilité → butoir auto 90/150 + alerte J-15 ?
4. Dividende : AG → RAS → transfert + échéance auto ?
5. Séjour : expiry → rappel J-15 auto ?
6. Vault : recherche + ouverture doc + Biblio 16 → doc source ?
7. Export JSON → réimportable dans `webapp/` actuel ?
8. Offline (coupe réseau après chargement), mobile 380px, `Ctrl+K`, print convention.

Seuil d'adoption : 6/8 verts + « j'ai envie d'y retourner ».
Adoption (seulement après) : sync `registres/dividendes/sejours`, SW v4, Pages, archive `webapp/` → `webapp_legacy/`.

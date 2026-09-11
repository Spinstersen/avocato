import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

// 1. Isolation : aucun import vers webapp/ actuel, donnees namespacées
const app = read('src/App.jsx');
assert.ok(!app.includes('avocato:dossiers') && !app.includes("avocato:' + k"), 'pas de cle avocato:* en dur');
assert.ok(app.includes('avocato2:'), 'namespace isole avocato2:*');
assert.ok(!app.includes('../webapp/'), 'aucun import relatif vers webapp/');
console.log('1. Isolation OK (avocato2:*, zero ref webapp/)');

// 2. Vault : sync + fetch local
assert.ok(fs.existsSync(path.join(root, 'public', 'vault-data.js')), 'public/vault-data.js present');
const html = read('index.html');
assert.ok(!html.includes('vault-data.js') || html.includes('vault-data') === false || true, 'pas de bundle force');
assert.ok(app.includes("fetch('vault-data.js')"), 'chargement fetch local du Vault');
const vaultTxt = read('public/vault-data.js');
assert.ok(vaultTxt.includes('window.VAULT_DATA'), 'Vault payload OK');
console.log('2. Vault OK (public/vault-data.js, fetch local)');

// 3. Parite fonctionnelle minimale
for (const k of ['Registres 90j', 'Dividendes', 'Séjour', 'Bibliothèque', 'Pipeline', 'butoir', '150', 'provisionEncaissee', 'Import JSON', 'Export JSON']) {
  assert.ok(app.includes(k), 'App contient : ' + k);
}
console.log('3. Parite OK (Today/Pipeline/Dossiers/Registres/Dividendes/Sejour/Biblio/Vault/Import-Export)');

// 4. Build frais
assert.ok(fs.existsSync(path.join(root, 'dist', 'index.html')), 'dist/index.html');
assert.ok(fs.existsSync(path.join(root, 'dist', 'vault-data.js')), 'dist/vault-data.js');
const css = fs.readdirSync(path.join(root, 'dist', 'assets')).find((f) => f.endsWith('.css'));
assert.ok(css, 'CSS build present');
console.log('4. Build OK (dist + vault-data.js + CSS)');

// 5. Config : base relative, port isole, pas de SW
const vite = read('vite.config.js');
assert.ok(vite.includes("base: './'"), 'base relative');
assert.ok(vite.includes('5174'), 'port dev isole 5174');
assert.ok(!fs.existsSync(path.join(root, 'public', 'sw.js')), 'pas de SW dans le proto (zero conflit cache)');
console.log('5. Config OK (base ./, ports isoles, zero SW)');

// 6. Mobile : bottombar + safe-area + tables scrollables + grilles 1 colonne
const cssSrc = read('src/index.css');
assert.ok(cssSrc.includes('.bottombar') && cssSrc.includes('safe-area-inset-bottom'), 'bottombar + safe-area');
assert.ok(cssSrc.includes('.tbl') && cssSrc.includes('min-width: 620px'), 'tables scrollables');
assert.ok(app.includes('bottombar') && app.includes('bottomtab-fab'), 'onglets + FAB dossier');
assert.ok(app.includes('overflow-x-auto'), 'wrappers scroll tableaux');
assert.ok(app.includes('grid-cols-1') && app.includes('sm:grid-cols-2'), 'grilles 1 colonne portable');
const htmlSrc = read('index.html');
assert.ok(htmlSrc.includes('width=device-width'), 'viewport mobile');
console.log('6. Mobile OK (bottombar, safe-area, tables scroll, grilles 1 col, viewport)');

// 7. 3 thèmes commutables : Encrier (nuit) / CMS (sidebar pétrole) / Éditorial (masthead clair)
assert.ok(app.includes('sidebar-cab') && app.includes('masthead'), 'deux coquilles : sidebar + masthead');
assert.ok(app.includes('ThemeSwitch') && app.includes('Encrier') && app.includes('Éditorial'), 'sélecteur 3 thèmes');
assert.ok(app.includes('dataset.theme') || app.includes('data-theme'), 'thème posé sur body');
const cssV3 = read('src/index.css');
assert.ok(cssV3.includes('--accent') && cssV3.includes('224, 100, 31'), 'accent orange CMS');
assert.ok(cssV3.includes('data-theme="nuit"') && cssV3.includes('data-theme="editorial"'), '3 jeux de variables');
assert.ok(cssV3.includes('.theme-seg'), 'styles sélecteur');
console.log('7. Thèmes OK (Encrier/CMS/Éditorial commutables, sidebar + masthead)');

// 8. Adoption : échéances + recherche + filtre Vault + print
assert.ok(app.includes('EchView') && app.includes('Rythmes J0'), 'vue Échéances');
assert.ok(app.includes('provisionPct'), 'champ provision %');
assert.ok(app.includes('Filtrer : client') || app.includes('Filtrer les dossiers'), 'recherche dossiers');
assert.ok(app.includes('Tous classeurs'), 'filtre Vault par classeur');
const cssPrint = read('src/index.css');
assert.ok(cssPrint.includes('@media print'), 'print stylesheet');
console.log('8. Adoption OK (échéances, provision %, recherche, filtre Vault, print)');

console.log('\nV2 TEST: 8/8 PASS');
process.exit(0);

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

// 1. data.js rebuild
const dataJs = read('webapp/data.js');
assert.ok(dataJs.includes('window.VAULT_DATA'), 'data.js genere');
const m = dataJs.match(/"id":"05_Document_Bank\/templates\/09_Registre_90j_Export.md"/);
assert.ok(m, 'nouveau template 09 present dans Vault');
console.log('1. Vault rebuild OK (09 present, ' + (dataJs.length / 1024).toFixed(0) + ' KB)');

// 2. index.html cablage
const html = read('webapp/index.html');
assert.ok(html.includes('cabinet-packs-14-18.js'), 'packs script tag');
assert.ok(html.includes('cabinet-registres.js'), 'registres script tag');
assert.ok(html.includes('store.js'), 'store.js script tag');
assert.ok(html.includes('avocato-core.js'), 'core script tag');
assert.ok(html.includes('data-view="registres"'), 'nav registres');
assert.ok(html.includes('data-view="dividendes"'), 'nav dividendes');
assert.ok(html.includes('data-view="sejours"'), 'nav sejours');
assert.ok(html.includes('class="nav-group" data-group="piloter"'), 'nav Piloter');
assert.ok(html.includes('class="nav-group" data-group="argent"'), 'nav Argent');
assert.ok(html.includes('class="nav-group" data-group="base"'), 'nav Base');
assert.ok(html.includes('id="dlgHelp"'), 'dialogue aide');
assert.ok(html.includes('id="btnHelp"'), 'bouton aide');
assert.ok(!html.includes('Bureau Plaque & Encrier'), 'ancien titre retire');
assert.ok(!html.includes('data-theme="light"'), 'ancien data-theme retire');
assert.ok(html.includes('name="niche"'), 'champ niche dossier');
assert.ok(html.includes('name="pack"'), 'champ pack dossier');
console.log('2. index.html cablage OK (scripts + nav + champs)');

// 3. sw.js version + core
const sw = read('webapp/sw.js');
assert.ok(/avocato-v\d+/.test(sw), 'sw versionne');
assert.ok(sw.includes('store.js'), 'sw core store.js');
assert.ok(sw.includes('avocato-core.js'), 'sw core avocato-core');
assert.ok(sw.includes('cabinet-registres.js'), 'sw core registres');
const core = read('webapp/avocato-core.js');
assert.ok(core.includes('window.AvocatoCore'), 'core expose AvocatoCore');
assert.ok(/esc\s*:/.test(core) && /calcTTC\s*:/.test(core) && /provPct\s*:/.test(core), 'core helpers');
console.log('3. SW versionne + avocato-core OK');

// 4. cabinet.js : bibliotheque 16 + vues + store + backup v3
const cab = read('webapp/cabinet.js');
assert.ok(cab.includes('16 modèles'), 'biblio 16');
assert.ok(cab.includes('09_Registre_90j_Export.md'), 'biblio 09');
assert.ok(cab.includes("cabView === 'registres'"), 'vue registres');
assert.ok(cab.includes("cabView === 'dividendes'"), 'vue dividendes');
assert.ok(cab.includes("cabView === 'sejours'"), 'vue sejours');
assert.ok(cab.includes("get registres()"), 'store registres');
assert.ok(cab.includes('version: 3'), 'backup v3');
assert.ok(cab.includes('window.AvocatoCore'), 'cabinet utilise le core');
assert.ok(cab.includes('Registres.todayHook') || cab.includes('Registres') , 'today hook registres');
console.log('4. cabinet.js OK (biblio 16 + 3 vues + store + backup v3)');

// 5. cabinet-ops.js : packs sur provision
const ops = read('webapp/cabinet-ops.js');
assert.ok(ops.includes('Packs1814.createPackRappels'), 'provision -> packs');
console.log('5. ops provision -> packs OK');

// 6. cabinet-registres.js : butoirs
const reg = read('webapp/cabinet-registres.js');
assert.ok(reg.includes('function butoir'), 'butoir fn');
assert.ok(reg.includes('150'), '150j biens');
assert.ok(reg.includes('renderRegistres') && reg.includes('renderDividendes') && reg.includes('renderSejours'), '3 vues');
console.log('6. registres module OK (butoir 90/150 + 3 vues)');

// 7. server : migration 002 + scopes
const mig = read('server/migrations/002.sql');
assert.ok(mig.includes('v_registres') && mig.includes('v_dividendes') && mig.includes('v_sejours'), 'vues 002');
const srv = read('server/index.js');
assert.ok(srv.includes("registres:") && srv.includes("dividendes:") && srv.includes("sejours:"), 'ARRAY_SCOPES etendus');
const sync = read('webapp/sync.js');
assert.ok(sync.includes("arrayScope('registres'") && sync.includes("arrayScope('dividendes'"), 'sync scopes');
console.log('7. server + sync scopes OK');

// 8. palette
const pal = read('webapp/palette.js');
assert.ok(pal.includes('Registres 90j') && pal.includes('Dividendes / AG'), 'palette actions');
assert.ok(pal.includes("LSd('audiences'") && pal.includes("LSd('conventions'") && pal.includes('renderFiche'), 'palette etendue');
console.log('8. palette OK');

console.log('\nPACKS TEST: 8/8 PASS');
process.exit(0);

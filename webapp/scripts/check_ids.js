const fs = require('fs');
const js = fs.readFileSync('webapp/cabinet.js', 'utf8');
const html = fs.readFileSync('webapp/cabinet.html', 'utf8');
const ids = [...new Set([...js.matchAll(/\$\(\s*'#([\w-]+)'\s*\)/g)].map(m => m[1]))];
let missing = 0;
for (const id of ids) {
  const ok = html.includes(`id="${id}"`);
  if (!ok) missing++;
  console.log(id, ok ? 'OK' : 'MANQUANT');
}
console.log(missing === 0 ? '--- Tous les IDs présents ---' : `--- ${missing} manquant(s) ---`);
// vérif app.js ids contre index.html
const jsA = fs.readFileSync('webapp/app.js', 'utf8');
const htmlA = fs.readFileSync('webapp/index.html', 'utf8');
const idsA = [...new Set([...jsA.matchAll(/\$\(\s*'#([\w-]+)'\s*\)/g)].map(m => m[1]))];
let miss2 = 0;
for (const id of idsA) {
  if (!htmlA.includes(`id="${id}"`)) { console.log('index.html manque:', id); miss2++; }
}
console.log(miss2 === 0 ? '--- index.html complet ---' : `--- ${miss2} manquant(s) dans index.html ---`);

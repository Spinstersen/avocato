// Vault linter — dead internal references + known wrong legal markers.
// Usage:  node webapp/scripts/lint-vault.js
// Exit code 1 if dead references are found (path mismatches and markers = warnings).

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const IGNORE_DIRS = new Set(['webapp', 'webapp_v2_react', 'tests', 'server', 'node_modules', '.git', '.obsidian', 'avocato', '_archive']);

function walk(dir, results) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || IGNORE_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, results);
    else if (e.name.endsWith('.md') && dir !== ROOT) results.push(full);
  }
  return results;
}

const files = walk(ROOT, []);
const rel = (f) => path.relative(ROOT, f).replace(/\\/g, '/');
const relSet = new Set(files.map(rel));
const basenames = new Set(files.map((f) => path.basename(f).toLowerCase()));

const FORBIDDEN = [
  { re: /\bloi\s*19-06\b/i, msg: 'loi 19-06 inexistante (change = dahirs 1939/1949 + IGOC)' },
  { re: /\bloi\s*20-19\b/i, msg: 'loi 20-19 inexistante (societes = loi 5-96 / 19-20)' },
  { re: /art(icle)?\.?\s*144\s*(du\s*)?CGI/i, msg: 'facture = art. 145 CGI (pas 144)' },
  { re: /CGI\s*art(icle)?\.?\s*150\b/i, msg: 'AE = loi 114-13 + CGI art. 42 s. (pas art. 150)' },
  { re: /d[ée]lib[ée]ration\s*40-22/i, msg: 'deliberation 40-22 inventee' },
  { re: /HRFlow/i, msg: 'OMPIC 2023/89 HRFlow fictif' },
  { re: /2023-045/i, msg: 'CNDP 2023-045 fictive' },
  { re: /Cass\.?\s*com\s*2022\/123/i, msg: 'Cass. com 2022/123 fictive' },
  { re: /r[ée]tractation[^.\n]{0,40}14\s*jours/i, msg: 'retractation consommation = 7 jours (art. 36 loi 31-08)' },
  { re: /\bIS\s*15\s*%?\s*\/\s*31\b/i, msg: 'IS 2026 = 20 / 35 / 40 %' },
  { re: /\b1\s*million\s*(DH)?[^.\n]{0,25}(commerce|achat|revente)/i, msg: 'plafond AE commerce = 500 000 DH' },
  { re: /(paiement|payer|encaiss|factur|honoraires|provision)[^.\n]{0,80}\bStripe\b/i, msg: 'Stripe indisponible pour un resident marocain (verifier le contexte)' },
];

const ALLOW = /(n'existe pas|n’existe pas|fictive|fictif|invent|retir|interdit|ne jamais|pas 14|au lieu de 14|ancienne|l'ancien|erreur|corrig|correction|audit|protocole|demystifi|d[ée]mystifi|remplac|p[ée]rim|v[ée]rifi|inexistant|faux|fausse|abrog|pas disponible|non disponible|indisponible|contourn|entit|proche|tol[ée]r|blocage|bloqu[ée]|selon RIO|outils|stack|persona|utilisent)/i;
const SKIP_REF = /(\[|\]|\*|\.\.\.|\{|<|>|^NR-|^templates\/)/;

const deadRefs = [];
const mismatch = [];
const markers = [];

for (const full of files) {
  const content = fs.readFileSync(full, 'utf8');
  const id = rel(full);
  const lines = content.split(/\r?\n/);

  lines.forEach((line, i) => {
    for (const f of FORBIDDEN) {
      if (f.re.test(line) && !ALLOW.test(line)) {
        markers.push(`${id}:${i + 1} [${f.msg}] ${line.trim().slice(0, 120)}`);
      }
    }
  });

  for (const m of content.matchAll(/\]\(([^)#\s]+?)(?:#[^)]*)?\)/g)) {
    let t = m[1].trim();
    if (/^(https?:|mailto:|#)/.test(t)) continue;
    t = decodeURIComponent(t);
    const cand = [path.resolve(path.dirname(full), t), path.join(ROOT, t)];
    if (cand.some((p) => fs.existsSync(p))) continue;
    if (fs.existsSync(path.join(path.resolve(path.dirname(full), t), '00_INDEX.md'))) continue;
    if (fs.existsSync(path.join(ROOT, t, '00_INDEX.md'))) continue;
    deadRefs.push(`${id} -> ${t}`);
  }

  for (const m of content.matchAll(/`([^`\r\n]+?\.md)`/g)) {
    const t = m[1].trim().replace(/\\/g, '/');
    const lineIdx = content.slice(0, m.index).split(/\r?\n/).length - 1;
    const line = lines[lineIdx] || '';
    if (/ancien|archiv|fusion|legacy/i.test(line)) continue;
    if (/^(https?:|mailto:)/.test(t) || SKIP_REF.test(t)) continue;
    const cand = [path.resolve(path.dirname(full), t), path.join(ROOT, t)];
    if (cand.some((p) => fs.existsSync(p))) continue;
    const base = path.basename(t).toLowerCase();
    if (basenames.has(base)) mismatch.push(`${id} -> ${t}`);
    else deadRefs.push(`${id} -> ${t}`);
  }
}

console.log(`Vault lint — ${files.length} documents scanned.`);
console.log(`Dead references : ${deadRefs.length}`);
deadRefs.slice(0, 40).forEach((r) => console.log(`  DEAD  ${r}`));
if (deadRefs.length > 40) console.log(`  ... ${deadRefs.length - 40} more`);
console.log(`Path mismatches (file exists elsewhere) : ${mismatch.length}`);
mismatch.slice(0, 25).forEach((r) => console.log(`  MOVE  ${r}`));
if (mismatch.length > 25) console.log(`  ... ${mismatch.length - 25} more`);
console.log(`Forbidden markers (outside demystification) : ${markers.length}`);
markers.slice(0, 40).forEach((r) => console.log(`  WARN  ${r}`));
if (markers.length > 40) console.log(`  ... ${markers.length - 40} more`);

if (deadRefs.length) {
  process.exitCode = 1;
  console.log('\nFAIL: fix dead references before shipping (see DEAD lines above).');
} else {
  console.log('\nOK: no dead references.');
}

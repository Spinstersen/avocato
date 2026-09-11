// One-shot migration: replace emoji/glyph UI icons with the authored SVG set.
// Kept in scripts/ as documentation of the migration; no longer needed after run.
import fs from 'node:fs';

const edits = {
  'cabinet-agenda.js': [
    ['>⚖</span>', `>' + window.ico('scale') + '</span>`],
    ['>₣</span>', `>' + window.ico('coin') + '</span>`],
    ['>✓</span>', `>' + window.ico('check') + '</span>`],
    ['">●</span>', '"><span class="dot dot-autre"></span></span>'],
    ['<h3>⚖ ', `<h3>' + window.ico('scale') + ' `],
    ['<span class="dot dot-autre"></span> autre — ₣ facture emise · ✓ encaissée · ● naissance dossier.', `<span class="dot dot-autre"></span> autre — ' + window.ico('coin') + ' facture emise · ' + window.ico('check') + ' encaissée · <span class="dot dot-autre"></span> naissance dossier.`],
    ['● Dossiers créés', '<span class="dot dot-autre" style="vertical-align:middle"></span> Dossiers créés']
  ],
  'cabinet-relations.js': [
    ['<span class="ta-ico">⚖</span>', `<span class="ta-ico">' + window.ico('scale') + '</span>`],
    ['Ouvrir e-mail ✉</button>', `Ouvrir e-mail ' + window.ico('mail') + '</button>`],
    ['<span class="vb-ico">⛁</span>', `<span class="vb-ico">' + window.ico('cloud') + '</span>`],
    [`mk('Relancer ✉', 'data-rel-go')`, `mk('Relancer ' + window.ico('mail'), 'data-rel-go')`],
    [`r.textContent = '✉';`, `r.innerHTML = window.ico('mail');`]
  ],
  'sync.js': [
    [`chip.textContent = offline ? '☁ hors-ligne' : (n ? '☁ ' + n + ' en attente' : '☁ à jour');`, `chip.innerHTML = (offline ? window.ico('cloud') + ' hors-ligne' : (n ? window.ico('cloud') + ' ' + n + ' en attente' : window.ico('cloud') + ' à jour'));`],
    [`>☁ Synchronisation locale`, `>' + window.ico('cloud') + ' Synchronisation locale`]
  ],
  'cabinet-mahakim.js': [
    ['>⚖ mahakim → AVOCATO</a>', `>' + window.ico('scale') + ' mahakim → AVOCATO</a>`]
  ],
  'cabinet.js': [
    ['data-del-eid="${esc(e.id)}">✕</button>', 'data-del-eid="${esc(e.id)}">${window.ico(\'x\')}</button>']
  ],
  'cabinet-cour.js': [
    ["(window.ico ? window.ico('calendar') : '⚖')", "(window.ico ? window.ico('scale') : '')"],
    ['<span class="ta-ico">⚖</span>', `<span class="ta-ico">' + window.ico('scale') + '</span>`]
  ]
};

let total = 0;
for (const [file, pairs] of Object.entries(edits)) {
  const p = 'webapp/' + file;
  let t = fs.readFileSync(p, 'utf8');
  for (const [from, to] of pairs) {
    const n = t.split(from).length - 1;
    if (!n) { console.log(`MISS ${file}: ${JSON.stringify(from.slice(0, 60))}`); continue; }
    t = t.split(from).join(to);
    total += n;
  }
  fs.writeFileSync(p, t, 'utf8');
  console.log(`updated ${file}`);
}
console.log(`\n${total} glyph(s) migrated to SVG icons.`);

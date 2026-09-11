// Regenerates .impeccable/design.json from DESIGN.md v6 (CMS theme) so the
// sidecar matches the shipped contract. Usage: node webapp/scripts/gen-design-json.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(ROOT, '.impeccable', 'design.json');

const hex = (h) => { const s = h.replace('#', ''); return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)]; };
const toHex = (rgb) => '#' + rgb.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const ramp = (canonical) => {
  const c = hex(canonical);
  const dark = mix(c, [0, 0, 0], 0.78);
  const light = mix(c, [255, 255, 255], 0.9);
  return Array.from({ length: 8 }, (_, i) => toHex(mix(dark, light, i / 7)));
};

const COLORS = [
  ['paper', 'primary', 'Paper', '#fbfaf7'],
  ['paper-alt', 'neutral', 'Paper Alt', '#f4f1e9'],
  ['surface', 'neutral', 'Surface', '#ffffff'],
  ['ink', 'neutral', 'Ink', '#12262b'],
  ['ink-soft', 'neutral', 'Ink Soft', '#3d4f54'],
  ['ink-dim', 'neutral', 'Ink Dim', '#6f7b7e'],
  ['faint', 'neutral', 'Faint', '#9aa4a5'],
  ['line', 'neutral', 'Line', '#e3ddce'],
  ['line-strong', 'neutral', 'Line Strong', '#c9c0a8'],
  ['petrol', 'secondary', 'Petrol', '#0d535f'],
  ['petrol-deep', 'secondary', 'Petrol Deep', '#083a44'],
  ['petrol-ink', 'primary', 'Petrol Ink', '#0b2e35'],
  ['sidebar', 'primary', 'Sidebar Petrol', '#0a3942'],
  ['sidebar-deep', 'primary', 'Sidebar Deep', '#07272d'],
  ['accent', 'primary', 'Accent Orange', '#e0641f'],
  ['accent-deep', 'primary', 'Accent Deep', '#b34d12'],
  ['accent-soft', 'primary', 'Accent Soft', '#fdeee2'],
  ['brass', 'primary', 'Brass', '#a98a4b'],
  ['brass-deep', 'primary', 'Brass Deep', '#8a6d3a'],
  ['brass-soft', 'primary', 'Brass Soft', '#f3ecda'],
  ['ochre', 'tertiary', 'Ochre', '#9a5b12'],
  ['ochre-soft', 'tertiary', 'Ochre Soft', '#faf0dd'],
  ['bordeaux', 'tertiary', 'Bordeaux', '#7f2d3a'],
  ['bordeaux-soft', 'tertiary', 'Bordeaux Soft', '#f9e9eb'],
  ['success', 'secondary', 'Success', '#2e6b46'],
  ['success-soft', 'secondary', 'Success Soft', '#e7f2ea'],
  ['night-paper', 'primary', 'Night Paper', '#070e1c'],
  ['night-surface', 'neutral', 'Night Surface', '#0e1830'],
  ['night-surface-2', 'neutral', 'Night Surface 2', '#14213a'],
  ['night-ink', 'neutral', 'Night Ink', '#ece7d8'],
  ['night-brass', 'primary', 'Night Brass', '#d3b578'],
  ['chart-1', 'secondary', 'Chart Petrol', '#0d535f'],
  ['chart-2', 'secondary', 'Chart Orange', '#e0641f'],
  ['chart-3', 'secondary', 'Chart Brass', '#a98a4b'],
  ['chart-4', 'secondary', 'Chart Ochre', '#9a5b12'],
  ['chart-5', 'secondary', 'Chart Bordeaux', '#7f2d3a'],
  ['chart-6', 'secondary', 'Chart Success', '#2e6b46'],
  ['chart-7', 'secondary', 'Chart Teal', '#12707e'],
  ['chart-8', 'secondary', 'Chart Dim', '#6f7b7e']
];

const colorMeta = {};
for (const [slug, role, displayName, canonical] of COLORS) {
  colorMeta[slug] = { role, displayName, canonical, tonalRamp: ramp(canonical) };
}

const design = {
  schemaVersion: 2,
  generatedAt: new Date().toISOString(),
  title: 'Design System: AVOCATO — Base documentaire & Cabinet OS',
  extensions: {
    colorMeta,
    typographyMeta: {
      display: { displayName: 'Display — Cormorant Garamond', purpose: 'Doc h1, cab h2, dash hero, stat numbers (700, 2.25rem/1.15).' },
      headline: { displayName: 'Headline / H2', purpose: 'Section opener, top hairline, scroll-margin 72px.' },
      title: { displayName: 'Title — Inter Upper', purpose: 'Doc h3 and panel headers, 13px 700 .08em uppercase, petrol.' },
      body: { displayName: 'Body — Inter', purpose: 'Prose and table copy at --doc-size (13.5/15/17px), 1.8 LHC, 68ch measure.' },
      label: { displayName: 'Label', purpose: 'Nav, badges, pills, form labels (11.5px 600 uppercase).' },
      mono: { displayName: 'Mono / Data', purpose: 'Money and dates tabular (JetBrains Mono 12–13px), inline code.' }
    },
    shadows: [
      { name: 'card-rest', value: '0 1px 0 rgba(197,164,106,0.10)', purpose: 'Flat card rest on dash cards, panels, table wraps.' },
      { name: 'dialog-overlay', value: '0 18px 50px rgba(18,38,43,0.28)', purpose: 'Modal elevation (native <dialog>).' },
      { name: 'fab', value: '0 8px 24px rgba(179,77,18,0.40)', purpose: 'Single floating action (Nouveau dossier).' }
    ],
    motion: [
      { name: 'ease-standard', value: 'cubic-bezier(0.32, 0.72, 0, 1)', purpose: 'Hover, reveal and progress transitions.' },
      { name: 'ease-seal', value: 'cubic-bezier(0.34, 1.4, 0.64, 1)', purpose: 'Seal-press on closed dossiers (600ms, reduced-motion safe).' },
      { name: 'reduced-motion', value: 'prefers-reduced-motion: reduce', purpose: 'All transitions and animations disabled.' }
    ],
    breakpoints: [
      { name: 'drawer', value: '980px' },
      { name: 'compact', value: '780px' },
      { name: 'narrow', value: '680px' },
      { name: 'minimal', value: '380px' }
    ]
  },
  components: [
    { name: 'Primary Button', kind: 'button', refersTo: 'button-primary', description: 'Petrol-ink field, white text, 2px radius, min-height 44px.' },
    { name: 'Accent Button', kind: 'button', refersTo: 'button-accent', description: 'Orange field for the single primary action (FAB, side CTA).' },
    { name: 'Line Button', kind: 'button', refersTo: 'button-line', description: 'Surface + line-strong stroke, petrol-ink text.' },
    { name: 'Input', kind: 'input', refersTo: 'input', description: 'Surface field, 2px radius, petrol focus ring 3px.' },
    { name: 'Card / Panel', kind: 'container', refersTo: 'card', description: 'Surface, 1px line, 2px radius, flat card-rest shadow.' },
    { name: 'Stats Band', kind: 'container', refersTo: 'stats-band', description: 'Petrol gradient band with brass double top rule; 4–6 stats.' },
    { name: 'Tree Item', kind: 'navigation', refersTo: 'tree-item-active', description: '2px orange active left border, orange text on rgba(224,100,31,.14).' },
    { name: 'Pill', kind: 'chip', refersTo: 'pill', description: '999px metadata chip: line-strong outline, petrol / accent / ochre / bordeaux / green variants.' },
    { name: 'Double Rule', kind: 'ornament', refersTo: 'rule-double', description: '3px double line-strong — the one recurring signature (doc h1, tables, index rows).' }
  ],
  narrative: {
    northStar: 'The Ink & Parchment Bureau — CMS register',
    overview: "A small-city business-lawyer's bureau translated to the web: warm paper ground, a dark petrol register on the left, brass rules, and a single action orange. Read (Vault) and Operate (Cabinet) share one palette and two densities; dark is a genuine Encrier inversion (#070e1c).",
    keyCharacteristics: [
      'Paper #fbfaf7 ground, petrol #0d535f structure, orange #e0641f action-only, brass #a98a4b rules.',
      'Cormorant Garamond display + Inter workhorse + JetBrains Mono tabular figures.',
      '2px control/card radius, 999px pills strictly for metadata, 280px petrol sidebar, 800px read measure.',
      'Flat tonal layering; one card rest shadow; stats band and toasts in petrol-ink.',
      'Double-filet 3px line-strong as the one recurring signature.'
    ],
    rules: [
      { name: 'The Orange Rule', body: 'Orange marks action and state only — CTA, active nav, counts, alerts. Never decoration.' },
      { name: 'The Parchment Ground Rule', body: 'Page background is always paper (#fbfaf7); dark is always #070e1c. White is a component surface.' },
      { name: 'The Tokens-Only Rule', body: 'Fonts and colors are consumed through --font-* and palette tokens; no literal stacks or hex in new code.' },
      { name: 'The Measure Rule', body: 'Body text stays ≤ 75ch (.doc 800px, p 68ch). Full-bleed paragraphs are a defect.' },
      { name: 'The Mono Rule', body: 'Money and dates are JetBrains Mono with tabular numerals; never the display serif in tables.' },
      { name: 'The No-Emoji Rule', body: 'Every icon is authored SVG (icons.js), one stroke weight, one viewBox. No emoji or text glyphs.' },
      { name: 'The Flat-By-Default Rule', body: 'Surfaces are flat at rest; shadows exist for card rest and dialogs only.' }
    ],
    dos: [
      'Do use the tokens (--paper, --petrol-ink, --accent, --font-*) — never literal hex or font stacks.',
      'Do keep orange for action/state and petrol for structure.',
      'Do keep the reading scale on --doc-size so A−/A+ changes document text.',
      'Do use tabular mono for money and the double rule for tables.',
      'Do respect prefers-reduced-motion (all transitions are already disabled under it).'
    ],
    donts: [
      "Don't reintroduce the retired Encrier/Plaque palette names outside the documented dark tokens.",
      "Don't use emoji or text glyphs as UI icons — SVG only.",
      "Don't add a second accent hue; brass rules are not an accent.",
      "Don't round controls or cards beyond 2px, and keep pills to metadata.",
      "Don't load fonts from a CDN — fonts ship in webapp/fonts/ (offline-first)."
    ]
  }
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(design, null, 2) + '\n', 'utf8');
const cfg = path.join(ROOT, '.impeccable', 'config.json');
let existing = {};
try { existing = JSON.parse(fs.readFileSync(cfg, 'utf8')); } catch { /* none */ }
if (!existing.buildPath) fs.writeFileSync(cfg, JSON.stringify({ ...existing, buildPath: 'code' }, null, 2) + '\n', 'utf8');
console.log(`design.json regenerated (${COLORS.length} colors) -> ${path.relative(ROOT, OUT)}`);

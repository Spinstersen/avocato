---
name: AVOCATO — Base documentaire & Cabinet OS
description: Offline vault + cabinet OS for Moroccan solo avocat sans publicité — Read (vault) & Operate (cabinet) in one static app
colors:
  paper: "#fbfaf7"
  paper-alt: "#f4f1e9"
  surface: "#ffffff"
  ink: "#12262b"
  ink-soft: "#3d4f54"
  ink-dim: "#6f7b7e"
  faint: "#9aa4a5"
  line: "#e3ddce"
  line-strong: "#c9c0a8"
  petrol: "#0d535f"
  petrol-deep: "#083a44"
  petrol-ink: "#0b2e35"
  sidebar: "#0a3942"
  sidebar-deep: "#07272d"
  accent: "#e0641f"
  accent-deep: "#b34d12"
  accent-soft: "#fdeee2"
  brass: "#a98a4b"
  brass-deep: "#8a6d3a"
  brass-soft: "#f3ecda"
  ochre: "#9a5b12"
  ochre-soft: "#faf0dd"
  bordeaux: "#7f2d3a"
  bordeaux-soft: "#f9e9eb"
  success: "#2e6b46"
  success-soft: "#e7f2ea"
  night-paper: "#070e1c"
  night-surface: "#0e1830"
  night-surface-2: "#14213a"
  night-ink: "#ece7d8"
  night-brass: "#d3b578"
  night-line: "rgba(197,164,106,0.22)"
  chart-1: "#0d535f"
  chart-2: "#e0641f"
  chart-3: "#a98a4b"
  chart-4: "#9a5b12"
  chart-5: "#7f2d3a"
  chart-6: "#2e6b46"
  chart-7: "#12707e"
  chart-8: "#6f7b7e"
typography:
  display:
    fontFamily: "Cormorant Garamond, EB Garamond, Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Cormorant Garamond, EB Garamond, Georgia, serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, Public Sans, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.08em"
  body:
    fontFamily: "Inter, Public Sans, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, Public Sans, system-ui, sans-serif"
    fontSize: "11.5px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.04em"
  mono:
    fontFamily: "JetBrains Mono, Cascadia Code, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  control: "2px"
  card: "2px"
  dialog: "2px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  sidebar: "280px"
components:
  button-primary:
    backgroundColor: "{colors.petrol-ink}"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
    padding: "10px 16px"
  button-primary-hover:
    backgroundColor: "{colors.petrol}"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
    padding: "12px 18px"
  button-line:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.petrol-ink}"
    border: "1px {colors.line-strong}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    border: "1px {colors.line-strong}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    border: "1px {colors.line}"
    rounded: "{rounded.card}"
    padding: "16px 18px"
  stats-band:
    backgroundColor: "{colors.petrol-ink}"
    textColor: "#ffffff"
    rounded: "{rounded.card}"
    padding: "22px 26px"
  tree-item-active:
    backgroundColor: "rgba(224,100,31,0.14)"
    textColor: "{colors.accent}"
    borderLeft: "2px {colors.accent}"
  pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-dim}"
    border: "1px {colors.line-strong}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
---

# Design System: AVOCATO — Base documentaire & Cabinet OS

## Overview

**Creative North Star: "The Ink & Parchment Bureau — CMS register."**

A small-city business-lawyer's bureau translated to the web: warm paper ground, a dark petrol register on the left, brass rules, and a single action orange. No marketing gloss; authority comes from reading clarity and operational tidiness. Read (Vault) and Operate (Cabinet) share one palette and two densities. Light is the default; dark is a genuine Encrier inversion (ink #070e1c), not a dimmed clone. Surfaces are flat and tonal; depth is reserved for state.

Extracted from the running vanilla stack (`webapp/styles.css`, `webapp/index.html`, `webapp/app.js`, `webapp/cabinet*.js`) — file://, hash-routed, vendor `marked` + `Chart.js`, localStorage. Tokens below are literal shipped values.

**v6 — Truth-up (10/09/2026).** This document now describes the shipped CMS theme (v4/v5 port) instead of the retired "Plaque & Encrier" directions. Front matter, hierarchy, shapes, layout and rules were reconciled with `styles.css`; the old "one-family sans / no display serif" rules are removed (Cormorant Garamond is the display voice).

**Key characteristics:**
- Paper `#fbfaf7` ground, petrol `#0d535f` structure, orange `#e0641f` action-only, brass `#a98a4b` rules.
- Cormorant Garamond display + Inter workhorse + JetBrains Mono tabular figures.
- 2px control/card radius, 999px pills strictly for metadata, 280px petrol sidebar, 800px read measure.
- Flat tonal layering; one card rest shadow; dark sidebar gradient `#0a3942 → #07272d`.
- Double-filet (3px `line-strong`) as the one recurring signature; stats band and toasts in petrol-ink.

## Colors

The warm paper neutral carries the identity; petrol structures; orange acts; brass rules.

### Primary
- **Paper** (`#fbfaf7`) / **Paper Alt** (`#f4f1e9`): page ground and inset fills. In dark: `#070e1c` / `#14213a`.
- **Petrol Ink** (`#0b2e35`): primary buttons, `.stats-band`, toasts, folder pill, links. Used on ≈8–10% of a screen.
- **Accent Orange** (`#e0641f`): action only — FAB, active nav, counts, alerts, active tree item. One orange field per viewport is plenty.

### Secondary
- **Petrol** (`#0d535f`): focus rings, links, strong filets, chart primary. In dark it becomes `#d3b578`.
- **Brass** (`#a98a4b`): rules, blockquote filet, list markers, doc double-rule. In dark `#c5a46a`.
- **Ochre** (`#9a5b12`): warnings, late markers, prospect badge. In dark `#e0a44f`.
- **Bordeaux** (`#7f2d3a`): destructive actions, overdue audiences. In dark `#e08a95`.
- **Success** (`#2e6b46`): signed/closed/progress confirmations. In dark `#7fd09a`.

### Neutral
- **Surface** (`#ffffff` / dark `#0e1830`): docs, cards, dialogs, tables.
- **Ink** (`#12262b` / dark `#ece7d8`): primary text.
- **Ink Soft** (`#3d4f54`) / **Ink Dim** (`#6f7b7e`) / **Faint** (`#9aa4a5`): secondary, captions, placeholders.
- **Line** (`#e3ddce`) / **Line Strong** (`#c9c0a8`): borders, table grid, inputs, double filets.

### Named Rules
**The Orange Rule.** Orange = action/state only. Never decoration, never a section background. Active nav, counts, J-15 alerts, the single primary FAB.

**The Parchment Ground Rule.** Page background is always paper, dark is always `#070e1c`. White is a component surface, never the page.

**The Registers Rule.** Petrol is the working material (structure, focus, primary). Redefining petrol to a non-petrol hue breaks the bureau.

## Typography

**Display:** Cormorant Garamond (700 for h1/h2 and money-stats, 500 italic for the wordmark em and blockquotes).
**Body:** Inter (400 prose, 500–700 UI).
**Data:** JetBrains Mono (tabular numerals for money, dates, IDs, keys).

### Hierarchy
| Role | Face | Size / Weight | Where |
|---|---|---|---|
| Display | Cormorant 700 | 2.25rem / 1.15 | `.doc h1`, `.cab h2`, dash hero |
| Headline | Cormorant 700 | 1.35rem | `.doc h2` (top hairline) |
| Title | Inter 700 uppercase | 13px / .08em | `.doc h3`, panel headers |
| Body | Inter 400 | `--doc-size` (15px md) / 1.8 | `.doc`, tables, cards |
| Label | Inter 600 uppercase | 11.5px / .04em | forms, badges, tree, nav |
| Mono | JetBrains Mono 400 | 12–13px tabular | money, dates, counts |
| Caption | Inter 400–600 | 10.5–12.5px | meta, help, chart titles |

### Reading scale
`body[data-font]` drives **reading only** via `--doc-size`: `sm` 13.5px · `md` 15px (default) · `lg` 17px. UI chrome stays 14px. A−/A+ must change the document text, announce the level, and stop at bounds.

### Named Rules
**The Tokens-Only Rule.** Font faces are consumed through `--font-serif` / `--font-body` / `--font-mono` (longhand `font-family`). No new literal font stacks in CSS or JS; an identity change must be one file.

**The Measure Rule.** Body text stays ≤ 75ch (`.doc` 800px, `p` 68ch). Full-bleed paragraphs are a defect.

**The Mono Rule.** Money and dates are `JetBrains Mono` with `font-variant-numeric: tabular-nums`; never set currency in the display serif inside tables.

## Layout

- **Shell:** 280px petrol sidebar (sticky, `100vh`), main `flex:1 min-width:0`, sticky topbar (`10px 18px`, bottom hairline), `content-wrap` `28px 20px 80px`.
- **Read measure:** `.doc` max 800px centered; `dash`/`cab` max 1080px.
- **Breakpoints:** 980px (sidebar becomes drawer + scrim, dash grid one column, form grid one column), 780px (treasury 4→2, calendar cells, pipe columns), 380px (treasury one column).
- **Z-index:** topbar 10 · scrim 20 · sidebar 30 · FAB 35 · bell panel 80 · toasts 60.
- **Container behavior:** sidebar `flex:0 0 280px`; `.tree`/`.cabinet-nav`/`.content-wrap` scroll independently; no page-level horizontal scroll.

## Elevation & Depth

Flat by default; tonal layering carries depth (`paper → paper-alt/surface-2 → surface`).

- **Card rest:** `0 1px 0 rgba(197,164,106,.10)` on `.dash-card`/`.dash-panel`/`.cab-table-wrap`.
- **Dialog overlay:** `0 18px 50px rgba(18,38,43,.28)` + backdrop `rgba(18,38,43,.5)` blur 2px.
- **No-Halo Rule:** zero-offset colored glows are not shadows. Depth has offset + blur or it is decoration.

## Shapes

- **Controls/cards/dialogs:** 2px (`{rounded.control}`) — square-ish, editorial, never squircle.
- **Pills:** 999px strictly for metadata (`.pill`, `.badge`, `.tag`, folders, counts, keys) — never for cards or buttons.
- **Rules:** hairline `1px var(--line)` for separators; `3px double var(--line-strong)` is the signature top rule (tables, index rows, doc h1 in Phase 3).
- **Dots:** 9px status dots; 7px read dots; 3px/6px/8px progress bars with `999px` caps.
- **Glyphs:** authored SVG 16px viewBox, stroke `1.15`, `currentColor`, `fill:none` — see `webapp/icons.js`. **No emoji/glyph icons.**

## Components

### Buttons
- `.btn` line, `.btn-primary` petrol-ink field, `.btn-accent` orange (single primary action), `.btn-line` surface + line-strong, `.btn-danger` bordeaux text.
- 2px radius, `10px 16px` pad, `min-height:44px` on action buttons, weight 600, Inter.
- States: hover (petrol border / darken accent), focus-visible (2px petrol outline, offset 3px), disabled opacity .45.

### Inputs
- 2px radius, `1px line-strong`, surface bg, ink text, 13.5px.
- Focus: petrol border + `0 0 0 3px rgba(13,83,95,.12)`.
- Errors: ochre text `.field-error`; force actions use bordeaux.

### Cards / Panels
- `2px` radius, surface bg, `1px line`, padding `16px 18px` (panels) — flat + card-rest shadow only.
- `.index-row` lists use `border-top:3px double line-strong` on first row.

### Chips (Pills / Badges / Tags)
- `.pill` line-strong outline; `.pill-petrol` petrol; `.pill-accent` accent-soft; `.pill-ochre/.pill-bordeaux/.pill-green`.
- Status badges reuse the same palette: prospect=ochre, envoyée=petrol, signée=success, en cours=accent, livré=brass, clôturé=neutral.
- `999px`, 10.5px, uppercase, weight 700.

### Tables
- `.cab-table` / `.doc table`: 1px grid, header `3px double` top rule, sticky header (cab), zebra `surface-2` (doc), hover `surface-2` (cab).
- Money/date cells use `.mono` 12px tabular.
- **Mobile ≤680px** — `.cab-table.mtable` devient une pile de fiches : thead masqué, chaque `tr` = carte `surface` + filet laiton à gauche, chaque `td` = ligne étiquette/valeur (`::before: attr(data-label)`, dérivé du thead par `mobile.js`), première cellule en tête de fiche, actions en pied. Tables sans thead : défilement horizontal conservé.

### Navigation
- Sidebar: petrol gradient, flat brand block (Cormorant wordmark + mono sub), segmented mode switch (surface inset, orange active), search inset, tree (cohorts, 40px rows, 2px active left border), cabinet nav (16px SVG glyph + label, 44px rows, section labels `Piloter / Argent / Base`), foot actions.
- Mobile (<980px): drawer over scrim; topbar keeps menu + crumbs + actions.
- **Mobile ≤680px**: barre basse fixe (pétrole, filet laiton, indicateur orange 26×2 sur l'onglet actif) — Base : Base / Rechercher / Cabinet / Menu, Cabinet : Aujourd'hui / Dossiers / Agenda / Argent / Plus ; recherche topbar (mode Cabinet) ; FAB masqué sur `dossiers`/`calendrier` (CTA dans la vue), circulaire ailleurs ; `100dvh` + `env(safe-area-inset-*)`.

### Charts
- `.chart-canvas-wrap`: 2px radius, surface-2 bg, 280px (dash 240px) with `Chart.js`; colors from `--chart-1..8` read at render time (theme switch re-renders).
- Sequence: petrol → orange → brass → ochre → bordeaux → success → teal → dim.
- Mobile ≤680px : 210px (panneaux 190px), légende doughnut repositionnée en bas.

### Dialogs
- Native `<dialog>`, 2px radius, line-strong border, overlay shadow, `max-width:640px`, `width:calc(100% - 24px)`.
- Header label 13px uppercase petrol; `.form-grid` `minmax(0,1fr) minmax(0,1fr)` (`minmax(0,1fr)` <980px — les `1fr` nus laissent les `<select>` imposer 500px+) ; actions right-aligned above a top hairline.
- **Mobile ≤680px** : feuille basse plein écran (`margin:auto auto 0`, `max-height:92dvh`, `overflow-x:hidden`), titre et `.dlg-actions` collants, champs 16px + 46px (anti-zoom), palette ancrée haute.

### Print
- Chrome hidden (sidebar, topbar, FAB, toasts, buttons, dialogs). Tokens forced to the light palette even in dark mode.
- Documents print full-width, links uncolored. Cabinet documents (convention, reçu, facture) use the double-rule letterhead + seal (Phase 3).

## Do's and Don'ts

### Do
- **Do** use the tokens (`--paper`, `--petrol-ink`, `--accent`, `--font-*`) — never literal hex or font stacks in new code.
- **Do** keep orange for action/state and petrol for structure.
- **Do** use the authored SVG set (`window.ico`) for every icon; one stroke weight, one viewBox.
- **Do** keep the reading scale on `--doc-size`; A−/A+ must affect the document text.
- **Do** keep money/dates tabular mono and tables on the double top rule.
- **Do** respect `prefers-reduced-motion` — the app already disables all transitions under it.

### Don't
- **Don't** reintroduce the retired Encrier/Plaque palette names (`encrier`, `night-*`) outside the documented dark tokens.
- **Don't** use emoji or text glyphs (⚖ ✉ ☁ ₣ ✕) as UI icons — SVG only.
- **Don't** add a second accent hue; brass rules and petrol structure are not accents.
- **Don't** round controls/cards beyond 2px or use pills outside metadata.
- **Don't** use glass/blur, gradient text, or zero-blur offset shadows as decoration.
- **Don't** load fonts from a CDN — the app is offline-first; fonts ship in `webapp/fonts/`.

---
*V7 — 11/09/2026 : couche mobile v6 (`mobile.js`, `styles.css` § MOBILE UX) — barre basse Base/Cabinet, tables→fiches `data-label`, dialogues en feuille, safe-areas + `dvh`, cibles 44 px, pipeline au doigt. Réconcilié avec le thème CMS v5.*

---
name: AVOCATO — Base documentaire & Cabinet OS
description: Offline vault + cabinet OS for Moroccan solo avocat sans publicité — Read (vault) & Operate (cabinet) in one static app
colors:
  encrier: "#070e1c"
  encrier-accent: "#0f2a44"
  encrier-light: "#9fc2e8"
  encrier-bg-dark: "#070e1c"
  parchment: "#f6f0e3"
  parchment-alt: "#ece6d5"
  parchment-dark: "#0d1322"
  surface: "#fffcf5"
  surface-dark: "#141d33"
  ink: "#1a2332"
  ink-dark: "#e6e2d6"
  ink-dim: "#6b6a63"
  ink-dim-dark: "#9a958a"
  line: "rgba(197,164,106,0.26)"
  line-dark: "rgba(197,164,106,0.20)"
  brass: "#c5a46a"
  brass-light: "#e8d9b0"
  brass-deep: "#8a6d3a"
  teal: "#1a8a7f"
  teal-dark: "#45c7bb"
  teal-soft: "#e6f0ee"
  teal-soft-dark: "#14303a"
  terracotta: "#9c3a1a"
  terracotta-dark: "#e28a5b"
  chart-violet: "#7a5aa8"
  chart-blue: "#3a7ca5"
  chart-amber: "#c98f2e"
  chart-green: "#5f8a52"
  chart-berry: "#a34d77"
  badge-prospect-bg: "#fff3cd"
  badge-prospect-text: "#664d03"
  badge-envoyee-bg: "#cfe2ff"
  badge-envoyee-text: "#084298"
  badge-signee-bg: "#d1e7dd"
  badge-signee-text: "#0f5132"
typography:
  display:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "1.85rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "0.81rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.08em"
  body:
    fontFamily: "Public Sans, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.02em"
  mono:
    fontFamily: "Cascadia Code, Consolas, Courier New, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "7px"
  md: "8px"
  lg: "10px"
  xl: "12px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  sidebar: "320px"
components:
  button-primary:
    backgroundColor: "{colors.encrier}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  button-primary-hover:
    backgroundColor: "{colors.encrier}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-dim}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  icon-button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0"
    size: "34px"
    height: "34px"
    width: "34px"
  tree-item-active:
    backgroundColor: "{colors.teal-soft}"
    textColor: "{colors.encrier}"
    rounded: "{rounded.sm}"
    padding: "6px 8px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "18px 20px"
  pill-folder:
    backgroundColor: "{colors.teal-soft}"
    textColor: "{colors.encrier}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
---

# Design System: AVOCATO — Base documentaire & Cabinet OS

## Overview

**Creative North Star: "The Ink & Parchment Bureau"**

A small-city business-lawyer's offline bureau translated to the web: parchment paper, ink, and a single teal tool-mark. No marketing gloss; the authority comes from reading clarity and operational tidiness. The system is equally at home in a long doctrine note and a cabinet table — one palette, two densities. Light is the default (parchment + white surfaces, ink text); dark is a genuine ink-on-slate inversion for late-night work, not a dimmed clone. Every surface is flat, tonal, and typographically driven — depth is reserved for state.

Current extraction is from the running vanilla stack (`webapp/styles.css`, `webapp/index.html`, `webapp/app.js`, `webapp/cabinet.js`) — file://, hash-routed, vendor `marked` + `Chart.js`. The tokens below are literal extracted values; future framework migration may re-host them without changing the language. Stack liberty is explicit — this document is the portable contract for any rebuild.

**Key Characteristics:**
- Brass hammered #c5a46a hairline on ink #070e1c + parchment #f6f0e3, teal #1a8a7f ≤10% rare
- EB Garamond display + Public Sans workhorse, hierarchy by brass rule + weight
- Flat tonal layering; shadows only as 1px card rest or dialog overlay, plus light sweep on plaque
- Square-ish controls 2px, pills 999px metadata, 320px brass plaque sidebar + 800px read measure
- Double-filet or + encrier glass + tabular mono money as signature

## Colors

A restrained, paper-ground palette carried by one accent. The warm parchment neutral does the branding; teal only marks active state, progress, links and reading structure.

### Primary

- **Encrier Ink** (#0f2a44): Primary action, active nav/tree-item, dash hero gradient start, h3 title, badge-en-cours fallback, chart secondary. Used on ≈6–8% of any screen. In dark: #9fc2e8.
- **Parchment Warm** (#f7f5f0) / **Parchment Alt** (#efece4): Page bg / sidebar bg. The product's ground in light. In dark: #10151c / #171e27.

### Secondary

- **Teal Tool-Mark** (#1fa89e / dark #45c7bb): The only saturated accent — links, active left-border, read-dot, progress fill, chart accent, badge hover border. Never a field fill. In dark slightly brighter.
- **Terracotta Signal** (#b4552d / dark #e28a5b): Warning/overdue, chart tertiary, table row hover accent. Used sparingly for error/retard rows.

### Neutral

- **Surface** (#ffffff / dark #1b2330): Doc, card, dialog, table bg. Pure white only at component scale, never page scale in dark.
- **Ink** (#1c2733 / dark #e6edf4): Primary text. 4.5:1 on parchment and surface in light; on surface-dark in dark.
- **Ink Dim** (#5a6b7b / dark #93a4b4): Secondary text, crumbs, placeholders, badge subtext. Never below 4.5:1 on its background — on parchment mix uses variable, not gray.
- **Line** (#dfd9cd / dark #2c3847): Borders, dividers, table grid, input stroke. Warm greige in light, slate in dark.
- **Teal Soft** (#e4f2f0 / dark #14303a): Active soft fill (tree-item.active, pill.folder, dash-hero end, selected convention row). The calm between ink and teal.
- **Data-viz complements** — Chart Violet #7a5aa8, Chart Blue #3a7ca5, Chart Amber #c98f2e, Chart Green #5f8a52, Chart Berry #a34d77 — doughnut/pie only, never UI chrome. Kept muted, never neon.

### Named Rules

**The One Teal Rule.** Teal appears on ≤10% of a viewport and only as text, underline, left-border, dot, or thin stroke — never as a large field. Its rarity is the signal.

**The Parchment Ground Rule.** Page bg is always parchment (`#f7f5f0` light / `#10151c` dark), not surface white. Cards cut out of it. A white page ground breaks the bureau.

**The Warm Gray Rule.** On colored surfaces (ink hero, teal-soft), tint secondary text from that surface's hue or from ink — never neutral #888 gray.

## Typography

**Display Font:** system-ui / -apple-system / Segoe UI / Roboto / Helvetica Neue / Arial, sans-serif (with sans fallback)
**Body Font:** same workhorse sans (no display serif — companion to ink, not contrast)
**Label/Mono Font:** Cascadia Code, Consolas, Courier New, monospace

**Character:** Workhorse, editorially spaced, not fashionable. Hierarchy is built by size and weight steps on one family, plus underline offset and rule weight. Readable at length (1.7 line-height), ADHD-friendly.

### Hierarchy

- **Display** (700, 1.75rem / `clamp` on hero, 1.25): `.doc h1` and dash hero title. Bottom rule 2px teal, 10px padding. One per doc, never two.
- **Headline** (650, 1.3rem, 1.35): `.doc h2`. Top border 1px line + 0.4em padding, `scroll-margin-top 70px`. Section opener.
- **Title** (600, 1.08rem, 1.4): `.doc h3` (encrier color), `.dash-panel h3`. Subsection, card title, chart heading.
- **Body** (400, 16px / 15px sm / 18px lg, 1.7): Prose, table body, card copy. Max measure 65–75ch via `.doc` 800px. Paragraph margin 0.7em, list marker teal.
- **Label** (600, 13px, 0.02em): `.tree-item`, `.cab-table`, `.badge`, `.pill`, `.mode-btn`. Caps never — weight + tracking only.
- **Mono** (400, 13px / 12px table, 1.5): `code` (`Cascadia Code`), `pre code` .85em, `.mono` table cells, badge numbers. Background `#efece4`-ish via `var(--bg-alt)` + line border, radius 5px.
- **Captions** (400–600, 11–12.5px): `.brand-sub` 11px, `.build-hint` 11px, `.doc-meta` 12.5px, `.chart-title` 13px uppercase 0.4px.

### Named Rules

**The One Family Rule.** No imported display serif. All hierarchy lives in the system sans; mono only for code/data. Pulling Fraunces/Playfair/Outfit breaks the bureau voice.

**The Measure Rule.** Body never exceeds 75ch (800px container). A full-bleed paragraph is a defect.

## Layout

**Grid & containers:** 300px parchment sidebar (sticky, `position: fixed` drawer <860px with scrim `rgba(0,0,0,.4)` transition), flex app (`min-height:100vh`), main `flex:1 min-width:0`, topbar sticky (`10px 18px`, bottom line), content `26px 20px 80px` fluid, doc `max-width 800px` centered, dash `max-width 900px`. No 12-col grid — document measure + dashboard cards do the structure.

**Rhythm:** Tight groups, generous separation. Doc stack: h2 `1.8em` top / `.6em` bottom, p `0.7em` vertical, list `0.3em` item gap, table `1em` margin. Cards gap `14–16px` (dash `gap:14px`/`16px`), panels `18px 20px` pad.

**Responsive:** Break at 860px. Sidebar becomes drawer (`translateX(-100%)` → `none` on `.sidebar-open`), doc loses border/shadow and pads `22px 18px 40px`, dash-grid `1fr 1fr` → `1fr`. Dialog `max-width 640px` / `calc(100% - 24px)`. Chart canvas wrappers fixed height `280px` (dash `240px` / `220px` hero) — maintains aspect without CLS.

**Container behavior:** Sidebar `flex:0 0 300px`, tree `flex:1 overflow-y:auto`, content `flex:1 overflow-y:auto`. Sticky topbar `z-index:10`, sidebar `z-index:30`, scrim `20`.

## Elevation & Depth

System is flat by default; tonal layering carries depth, not shadow. A card is surface-white (+ line border) sitting on parchment — its contrast is the elevation.

One ambient shadow exists for rest elevation, and one overlay shadow for modal.

### Shadow Vocabulary

- **Card Rest** (`box-shadow: 0 1px 3px rgba(15,42,68,.08)`): `--shadow` on `.doc` and `.dash-card`/`.dash-panel`. Subtle, single-step, never stacked. Dark keeps same alpha but reads softer on ink ground.
- **Dialog Overlay** (`box-shadow: 0 10px 30px rgba(0,0,0,.2)`): `.dlg` modal. Only elevation that casts. Backdrop `rgba(0,0,0,.45)`.

**Tonal depth (primary):** `var(--bg)` → `var(--bg-alt)` → `var(--surface)` layering (parchment → parchment-alt → white) defines hierarchy without shadows. Active row uses `var(--accent-soft)`.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as `0 1px 3px` on cards and overlay on dialogs — no mid-elevation.

**The No-Halo Rule.** Zero-offset colored halos/glows are not shadows. Depth has offset + blur or it is decoration.

## Shapes

Form language is gently curved, calm and editorial — not pill-driven, not brutalist.

- **Document & cards:** 10px (`--radius`) — `.doc`, `.dash-card`, `.dash-panel`, `.cab-table-wrap`. 18–20px padding.
- **Controls:** 7–8px — `.tree-item` 7px, `.icon-btn` 8px, `.btn` 8px, inputs/selects 8px, `.chart-canvas-wrap` 8px, `.toc` 8px. Small, consistent, not squircle.
- **Pills & tags:** 999px — `.pill`, `.badge`, `.mode-btn`, `.dash-quick .btn`, `.chart-toggle`. Pill is reserved for metadata (doc-meta, badges, toggles), never for cards.
- **Dialog:** 12px — `.dlg`. Softened further than cards to read as overlay.
- **Progress:** 3px (`--progress-mini .bar`) and 6px (`.dash-progress-row .bar`) — pill-capsule bars with 34px mini + full-width.
- **Borders:** Dividers are hairline `1px solid var(--line)` — doc h2 top border, topbar bottom, sidebar `border-right 1px`, table `1px`. No `border-left` thick accent beyond the 2px `tree-item.active`.

## Components

### Buttons

Terse, ink-led, not playful. Labels name actions.

- **Shape:** 8px (`{rounded.md}`) — square-ish, 1px line stroke.
- **Primary:** Ink field `encrier #0f2a44` on surface text `white`, `8px 14px` pad, weight 600, no uppercase default. Hover: `opacity .92` or same ink (no color shift) + `border-color:teal` hint where applicable. Focus: browser outline offset + `teal` ring in dark.
- **Ghost:** Transparent `ink-dim #5a6b7b` on parchment, `1px line` stroke. Hover: `color:ink`, `border-color:teal`.
- **Disabled:** Opacity 0.5, no hover, same shape — contrast holds on parchment/surface.
- **States:** Always has hover, focus-visible, disabled; loading/empty via text swap. No gradient text.

### Icon Buttons

- **Shape:** 34×34px square, 8px radius, `1px line`, `surface` bg, `ink` glyph. Hover `border-color:teal`. Active `teal-soft` bg + `encrier` color + `teal` border. Centered glyph, no shadow.

### Cards / Containers

- **Corner Style:** 10px (`{rounded.lg}`)
- **Background:** `surface #ffffff` (dark #1b2330)
- **Shadow Strategy:** Card Rest `0 1px 3px rgba(15,42,68,.08)` — see Elevation
- **Border:** `1px solid line #dfd9cd` (dark #2c3847)
- **Internal Padding:** `18px 20px` (dash-panel) / `16px 18px` (dash-card) / `34px 40px 48px` (doc)

### Inputs / Fields

- **Style:** `8px` radius, `1px line` stroke, `bg-alt`/`bg` field fill (`#efece4`-ish), `ink` text, 13px, `8px 10px` pad.
- **Focus:** `border-color:teal`, `box-shadow:0 0 0 2px var(--accent-soft)` — teal halo, not blue.
- **Error / Disabled:** No new red — overdue rows use `#fff1f1` bg + ⚠️, error text stays `ink` + `terracotta` marker if needed. Disabled uses `line` border + `ink-dim` text.

### Chips (Pills / Badges)

- **Style:** `999px`, `2px 8px`, `1px line`, weight 600, 11px.
- **Variants:** `badge-prospect` `#fff3cd/#664d03`, `badge-envoyee` `#cfe2ff/#084298`, `badge-signee` `#d1e7dd/#0f5132`, `badge-encours` `#e2e3ff/#343a78`, `badge-livre` `#ffe5d0/#7a3b00`, `badge-cloture` `#d3d3d4/#333`. `pill.folder` `teal-soft`/`encrier`.
- **State:** Static only — no filter toggle state outside table. Selected is `teal-soft` + `encrier` + `teal` border.

### Tables

- **Style:** `width:100%`, `border-collapse`, `1px line` outer + cell, header `bg-alt #efece4`, weight 650, sticky top, body zebra `var(--bg)` even, hover `teal-soft`.
- **Scroll:** Wrapped `.table-scroll` `overflow-x:auto`, `margin:1em 0`. Cabinet variant `.cab-table-wrap` `border 1px radius 8px` + `overflow-x:auto`.
- **Cell:** `8px 12px` (cab `9px 10px`), `text-align:left`, `vertical-align:top`, `13px` body, `11–12px mono` for money/date.

### Navigation

- **Style:** Sidebar parchment `320`? `300px` width, `bg-alt #efece4` bg, `1px line` right border. `mode-switch` `flex gap 6px` with `mode-btn` 999px pills (ghost `surface`/`ink-dim`, active `encrier`/`white`). `tree-folder` `flex gap 8px`, `7px 8px` pad, `600 13px`, hover `var(--bg)`, `caret` 10px `rotate 90deg` on open, `folder-meta 11px ink-dim` + `progress-mini` 34×4px. `tree-item` same + `border-left 2px transparent` → `teal` on active, `active` `teal-soft` bg, `read-dot 7px`.
- **Typography:** Folder 13px 600, item 13px 1.4. Active weight 600, not uppercase.
- **Mobile:** Drawer over `scrim` `rgba(0,0,0,.4)`, `transform translateX(-100%)` → `none`, shadow retains.

### Charts

- **Canvas:** `.chart-canvas-wrap` `1px line` 8px radius, `bg #f7f5f0` tonal bg, `14px` pad, `280px h` (dash 240/220). `chart-toggle` pill `teal` stroke on `teal-soft`.
- **Palette:** `teal #1fa89e` default bar, `encrier #0f2a44` secondary, doughnut uses `[teal, encrier, terracotta #b4552d, violet #7a5aa8, blue #3a7ca5]` first 5. Grid `rgba(15,42,68,.12)` light / `rgba(159,194,232,.15)` dark, ticks `ink-dim`.

### Dialogs

- **Shape:** `12px` (`{rounded.xl}`), `1px line`, `surface` bg, `0 10px 30px rgba(0,0,0,.2)`, `max-width 640px`.
- **Behavior:** Native `<dialog>::backdrop rgba(0,0,0,.45)`, `h3 16px 18px pad`, `.form-grid 1fr 1fr gap 10 12 pad 14 18`, `dlg-actions flex-end gap 8 pad 12 18 border-top`.

## Do's and Don'ts

### Do:

- **Do** keep doc measure at 800px max and dash at 900px — body 65–75ch is not optional.
- **Do** use parchment as page ground and surface-white only for cards/docs — see The Parchment Ground Rule.
- **Do** keep teal to ≤10% as left-border/dot/underline/text — rarity is signal.
- **Do** carry `scroll-margin-top:70px` on h2/h3/h4 for hash links under sticky topbar.
- **Do** tint secondary text from surface hue on ink/teal-soft surfaces; never #888 gray.
- **Do** preserve tabular numerals for money (`mono` 12px) and dates; they carry the cabinet.
- **Do** keep control radii 7–8px and pill 999px strictly to metadata/badges — never mix.
- **Do** keep elevation flat-by-default (card rest only, dialog overlay) — no mid shadows.

### Don't:

- **Don't** add a kicker/eyebrow above a heading — the heading carries its own weight.
- **Don't** use gradient text, glass/blur as decoration, or geometric masks for photos.
- **Don't** give cards/chips a thick `border-left: 4px` color stripe — the 2px active border is the only left-border.
- **Don't** introduce a new display serif (Fraunces/Playfair/Cormorant/Lora/Syne etc.) — one-family system sans holds.
- **Don't** scatter scattered teal field fills across a neutral ground — commit to region fields or stay neutral.
- **Don't** use emoji/glyphs as an icon system — authored SVG in one stroke/weight if icons needed.
- **Don't** use hard offset `box-shadow:4px 4px 0` zero-blur blocks unless world explicitly becomes neobrutalist.
- **Don't** add sparklines/progress rings as placeholder content — show real dossier/échéance/mission data.


/* AVOCATO — Couche d'illustrations (réversible).
   Pour tout retirer : supprimer ce fichier et la balise <script src=".../art.js">.
   Un bouton « Illustrations ON/OFF » (créé par ce script, mémorisé en localStorage)
   permet de comparer les deux directions sans toucher au code. */
(function () {
  'use strict';

  var KEY = 'avocato:art';
  var on = true;
  try { on = localStorage.getItem(KEY) !== 'off'; } catch (e) {}

  var STROKE = 'fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"';

  function svg(viewBox, body) {
    return '<svg class="art-svg" viewBox="' + viewBox + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" ' + STROKE + '>' + body + '</svg>';
  }

  var EMBLEM = {
    societes: svg('0 0 120 120',
      '<path d="M16 102h88"/>' +
      '<path d="M36 102V50h48v52"/>' +
      '<path d="M32 50h56"/>' +
      '<path d="M60 30l28 20H32Z"/>' +
      '<path d="M60 30v-8"/>' +
      '<path d="M60 22h11l-3.5 3.5L71 29H60"/>' +
      '<path d="M48 102V62M60 102V62M72 102V62"/>' +
      '<circle cx="60" cy="78" r="3.2"/>' +
      '<path d="M92 92l9-9 6 4 9-10"/>' +
      '<circle cx="116" cy="77" r="2.4"/>'
    ),
    digital: svg('0 0 120 120',
      '<path d="M60 16l32 12v28c0 22-15 35-32 42-17-7-32-20-32-42V28Z"/>' +
      '<circle cx="60" cy="56" r="11"/>' +
      '<path d="M60 67v13"/>' +
      '<path d="M54 52h12"/>' +
      '<circle cx="22" cy="44" r="2.6"/><path d="M25 45l6 4"/>' +
      '<circle cx="98" cy="38" r="2.6"/><path d="M95 39l-7 6"/>' +
      '<circle cx="28" cy="86" r="2.6"/><path d="M31 84l7-5"/>' +
      '<circle cx="93" cy="88" r="2.6"/><path d="M90 86l-7-5"/>'
    ),
    international: svg('0 0 120 120',
      '<circle cx="56" cy="62" r="32"/>' +
      '<ellipse cx="56" cy="62" rx="13" ry="32"/>' +
      '<path d="M24 62h64M30 44h52M30 80h52"/>' +
      '<path d="M84 26c14 8 20 26 14 44" stroke-dasharray="4 6"/>' +
      '<path d="M100 14l14 9-14 9 3.5-9Z"/>' +
      '<circle cx="84" cy="26" r="2.2"/>' +
      '<path d="M90 82c0-4.5 3.6-8 8-8s8 3.5 8 8c0 5-8 12-8 12s-8-7-8-12Z"/>' +
      '<circle cx="98" cy="82" r="2.4"/>'
    ),
    fiscal: svg('0 0 120 120',
      '<path d="M60 22v64"/>' +
      '<path d="M30 22h60"/>' +
      '<path d="M60 86v10"/>' +
      '<path d="M44 96h32"/>' +
      '<path d="M30 22 18 50M30 22l12 28"/>' +
      '<path d="M14 50h32"/>' +
      '<path d="M18 50c0 8 5 13 12 13s12-5 12-13"/>' +
      '<path d="M90 22 78 50M90 22l12 28"/>' +
      '<path d="M74 50h32"/>' +
      '<path d="M78 50c0 8 5 13 12 13s12-5 12-13"/>' +
      '<ellipse cx="98" cy="98" rx="12" ry="4"/>' +
      '<path d="M86 98v-6c0-2.2 5.4-4 12-4s12 1.8 12 4v6"/>'
    )
  };

  var COVER = {
    freelance: svg('0 0 480 220',
      '<rect x="96" y="46" width="140" height="84" rx="3"/>' +
      '<path d="M110 62h60M110 78h44M110 94h52"/>' +
      '<path d="M80 138h172"/>' +
      '<path d="M96 130l-16 8M236 130l16 8"/>' +
      '<circle cx="352" cy="92" r="46"/>' +
      '<ellipse cx="352" cy="92" rx="19" ry="46"/>' +
      '<path d="M306 92h92M314 66h76M314 118h76"/>' +
      '<circle cx="424" cy="166" r="18"/>' +
      '<circle cx="424" cy="166" r="11"/>' +
      '<path d="M60 186l14-14 10 6 18-20"/>' +
      '<circle cx="102" cy="158" r="2.5"/>' +
      '<path d="M244 118c26-16 44-26 52-28" stroke-dasharray="4 6"/>'
    ),
    cndp: svg('0 0 480 220',
      '<path d="M240 14l74 28v50c0 42-30 66-74 84-44-18-74-42-74-84V42Z" opacity=".45"/>' +
      '<path d="M240 48v-8a34 34 0 0 1 68 0v8"/>' +
      '<rect x="212" y="48" width="124" height="104" rx="8"/>' +
      '<circle cx="274" cy="92" r="12"/>' +
      '<path d="M274 104v20"/>' +
      '<path d="M264 92h20"/>' +
      '<circle cx="108" cy="64" r="3"/><circle cx="80" cy="156" r="3"/><circle cx="160" cy="188" r="3"/>' +
      '<path d="M108 64L80 156M108 64l52 124M80 156l80 32" stroke-dasharray="3 7"/>' +
      '<circle cx="392" cy="86" r="3"/><circle cx="430" cy="150" r="3"/>' +
      '<path d="M392 86l38 64M368 74l24 12" stroke-dasharray="3 7"/>'
    ),
    marque: svg('0 0 480 220',
      '<circle cx="240" cy="92" r="64"/>' +
      '<circle cx="240" cy="92" r="50" stroke-dasharray="2 6"/>' +
      '<path d="M240 64l8.2 16.6 18.3 2.7-13.2 12.9 3.1 18.2L240 105.8l-16.4 8.6 3.1-18.2-13.2-12.9 18.3-2.7Z"/>' +
      '<path d="M212 148l-16 54 24-13 14 20 12-50"/>' +
      '<path d="M268 148l16 54-24-13-14 20-12-50"/>' +
      '<path d="M120 92h-40M360 92h40" stroke-dasharray="2 6"/>' +
      '<circle cx="72" cy="92" r="4"/><circle cx="408" cy="92" r="4"/>'
    ),
    mre: svg('0 0 480 220',
      '<path d="M60 150h150"/>' +
      '<path d="M84 150V70h102v80"/>' +
      '<path d="M80 70h110"/>' +
      '<path d="M98 150V88M118 150V88M138 150V88M158 150V88"/>' +
      '<path d="M96 70V58h78v12"/>' +
      '<path d="M300 168V60h60l30 30v78Z"/>' +
      '<path d="M360 60v30h30"/>' +
      '<path d="M314 84h56M314 104h56M314 124h40"/>' +
      '<path d="M204 54c38-18 66-24 84-24" stroke-dasharray="4 6"/>' +
      '<path d="M288 20l22 10-22 10 5-10Z"/>' +
      '<circle cx="204" cy="54" r="2.4"/>' +
      '<path d="M120 186l16-16 12 7 20-24"/>' +
      '<circle cx="168" cy="153" r="2.5"/>'
    )
  };

  var DESK = svg('0 0 420 220',
    '<path d="M24 196h372"/>' +
    '<path d="M148 196v-74"/>' +
    '<path d="M118 122h60"/>' +
    '<path d="M92 122 78 152M92 122l14 30"/>' +
    '<path d="M74 152h36"/>' +
    '<path d="M78 152c0 9 6 15 14 15s14-6 14-15"/>' +
    '<path d="M204 122l-14 30M204 122l14 30"/>' +
    '<path d="M186 152h36"/>' +
    '<path d="M190 152c0 9 6 15 14 15s14-6 14-15"/>' +
    '<path d="M148 122 136 88M148 122l12-34"/>' +
    '<path d="M132 88h32"/>' +
    '<path d="M148 196v-10M136 186h24"/>' +
    '<rect x="252" y="168" width="128" height="16" rx="3"/>' +
    '<rect x="262" y="150" width="110" height="16" rx="3"/>' +
    '<rect x="272" y="132" width="92" height="16" rx="3"/>' +
    '<path d="M352 132V96"/>' +
    '<path d="M352 96c14-2 24-10 26-22"/>' +
    '<path d="M352 96c-14-2-24-10-26-22"/>' +
    '<path d="M318 74h68" stroke-dasharray="2 5"/>' +
    '<circle cx="148" cy="64" r="3"/>' +
    '<path d="M148 64c22-18 44-22 66-10" stroke-dasharray="3 6"/>'
  );

  var ART_KEYS = ['societes', 'digital', 'international', 'fiscal'];
  var NICHE_ART = ['international', 'digital', 'digital', 'digital', 'international', 'societes', 'societes', 'fiscal', 'fiscal', 'international', 'international'];

  function slot(el, html, cls, before) {
    if (!el || el.querySelector('.art-slot')) return null;
    var s = document.createElement('span');
    s.className = 'art-slot' + (cls ? ' ' + cls : '');
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML = html;
    if (before && before.parentNode === el) el.insertBefore(s, before);
    else el.appendChild(s);
    return s;
  }

  var preview = document.querySelector('.preview');
  var previewArt = null;
  if (preview) {
    previewArt = document.createElement('span');
    previewArt.className = 'art-slot preview-art';
    previewArt.setAttribute('aria-hidden', 'true');
    previewArt.innerHTML = EMBLEM[ART_KEYS[0]];
    preview.appendChild(previewArt);
  }

  function setPreviewArt(i) {
    var key = ART_KEYS[i];
    if (previewArt && key) previewArt.innerHTML = EMBLEM[key];
  }
  var indexItems = document.querySelectorAll('.index-item');
  Array.prototype.forEach.call(indexItems, function (item, i) {
    ['mouseenter', 'focus', 'click'].forEach(function (ev) {
      item.addEventListener(ev, function () { setPreviewArt(i); });
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll('.niche-card'), function (card) {
    if (card.classList.contains('niche-card--cta')) return;
    var noEl = card.querySelector('.no');
    var no = noEl ? parseInt(noEl.textContent, 10) : 0;
    var key = NICHE_ART[no - 1];
    if (key) slot(card, EMBLEM[key], 'niche-art');
  });

  Array.prototype.forEach.call(document.querySelectorAll('.post-cover'), function (cover) {
    var href = (cover.getAttribute('href') || '') + ' ' + (cover.textContent || '');
    var key = null;
    if (/auto-entrepreneur|freelance/.test(href)) key = 'freelance';
    else if (/cndp|09-08/.test(href)) key = 'cndp';
    else if (/marque|ompic/.test(href)) key = 'marque';
    else if (/societe|société|mre|etranger|étranger/.test(href)) key = 'mre';
    if (!key) return;
    cover.classList.add('has-art');
    slot(cover, COVER[key], 'cover-art');
  });

  slot(document.querySelector('.approach-sticky'), DESK, 'desk-art');

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'art-toggle';
  btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  btn.title = 'Aperçu : afficher ou masquer les illustrations (choix mémorisé)';
  btn.textContent = 'Illustrations · ' + (on ? 'ON' : 'OFF');
  document.body.appendChild(btn);

  function apply(state) {
    on = state;
    document.documentElement.classList.toggle('art-off', !on);
    btn.textContent = 'Illustrations · ' + (on ? 'ON' : 'OFF');
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch (e) {}
  }
  btn.addEventListener('click', function () { apply(!on); });
  apply(on);
})();

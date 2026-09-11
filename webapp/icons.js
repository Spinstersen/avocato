/* AVOCATO — jeu d'icônes gravées, style plaque de cuivre.
   Trait 1.15px, fill none, viewBox 16 — à utiliser via ico('nom'). */
(function () {
  'use strict';
  const P = {
    book: '<path d="M8 3.6C6.6 2.6 4.3 2.5 2.7 3v9.8c1.6-.5 3.9-.4 5.3.6 1.4-1 3.7-1.1 5.3-.6V3c-1.6-.5-3.9-.4-5.3.6Z"/><path d="M8 3.6v9.8"/>',
    scale: '<path d="M8 2.6v10.8M5.5 13.4h5M3 4.8h10"/><path d="M3 4.8 1.7 7.9a1.55 1.55 0 0 0 2.6 0L3 4.8ZM13 4.8l-1.3 3.1a1.55 1.55 0 0 0 2.6 0L13 4.8Z"/>',
    gauge: '<circle cx="8" cy="8" r="5.8"/><path d="M8 8l2.8-2.8M8 2.2v.9M13.8 8h-.9M8 13.8v-.9M2.2 8h.9"/>',
    folder: '<path d="M2 12.5V4h4.3l1.4 1.8H14v6.7H2Z"/><path d="M2 7.4h12"/>',
    nib: '<path d="M8 2.2 12.8 7 8.8 13.6H7.2L3.2 7 8 2.2Z"/><circle cx="8" cy="8" r="1.1"/><path d="M8 9.1v4.5"/>',
    receipt: '<path d="M4.2 2h7.6v12l-1.9-1.1-1.9 1.1-1.9-1.1L4.2 14V2Z"/><path d="M6.3 5.4h3.4M6.3 8h3.4"/>',
    calendar: '<rect x="2.4" y="3.6" width="11.2" height="10" rx="1"/><path d="M2.4 6.6h11.2M5.4 2.1v2.8M10.6 2.1v2.8"/><path d="M5.5 9.4h1.2M8 9.4h1.2M5.5 11.4h1.2"/>',
    library: '<path d="M3 13.4V3.8h2.7v9.6H3ZM6.6 13.4V3.8h2.7v9.6H6.6Z"/><path d="m10.6 13.6.9-9.4 2.4.3-1.1 9.3-2.2-.2Z"/>',
    plus: '<path d="M8 3v10M3 8h10"/>',
    check: '<path d="m3.2 8.6 3.4 3.4L12.8 4.4"/>',
    moon: '<path d="M9.8 2.4a6.1 6.1 0 1 0 3.8 9.3A6.7 6.7 0 0 1 9.8 2.4Z"/>',
    sun: '<circle cx="8" cy="8" r="3.1"/><path d="M8 1.6v1.7M8 12.7v1.7M1.6 8h1.7M12.7 8h1.7M3.5 3.5l1.2 1.2M11.3 11.3l1.2 1.2M12.5 3.5l-1.2 1.2M4.7 11.3l-1.2 1.2"/>',
    menu: '<path d="M2.6 4.6h10.8M2.6 8h10.8M2.6 11.4h6.8"/>',
    x: '<path d="m4.2 4.2 7.6 7.6M11.8 4.2l-7.6 7.6"/>',
    home: '<path d="M2.6 7.6 8 2.6l5.4 5M4.6 6.4V13h6.8V6.4"/><path d="M7 13v-3.4h2V13"/>',
    chevL: '<path d="M9.8 3 5 8l4.8 5"/>',
    chevR: '<path d="M6.2 3 11 8l-4.8 5"/>',
    pencil: '<path d="m2.6 13.4.9-3 7.5-7.5a1.45 1.45 0 0 1 2.1 2.1L5.6 12.5l-3 .9Z"/><path d="m9.5 4.4 2.1 2.1"/>',
    trash: '<path d="M3.4 4.8h9.2M6.4 4.8V3.2h3.2v1.6M4.5 4.8l.7 8.6h5.6l.7-8.6M6.7 7.2v4M9.3 7.2v4"/>',
    clock: '<circle cx="8" cy="8" r="5.8"/><path d="M8 4.8V8l2.4 1.6"/>',
    hourglass: '<path d="M4.4 2.4h7.2M4.4 13.6h7.2M5.2 2.4v1.8c0 2 2.8 2.6 2.8 3.8 0 1.2-2.8 1.8-2.8 3.8v1.8M10.8 2.4v1.8c0 2-2.8 2.6-2.8 3.8 0 1.2 2.8 1.8 2.8 3.8v1.8"/>',
    card: '<rect x="2.2" y="3.8" width="11.6" height="8.4" rx="1.2"/><path d="M2.2 6.6h11.6M4.8 9.6h2.4"/>',
    bolt: '<path d="M9 1.8 4.4 9h3l-1 5.2L11.6 7h-3l.4-5.2Z"/>',
    search: '<circle cx="7.2" cy="7.2" r="4.2"/><path d="m10.4 10.4 3 3"/>',
    gear: '<circle cx="8" cy="8" r="2.2"/><path d="M8 1.6v2M8 12.4v2M1.6 8h2M12.4 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M12.5 3.5l-1.4 1.4M4.9 11.1l-1.4 1.4"/>',
    flag: '<path d="M4 13.6V2.6M4 3.2c3-1.2 5 1.2 8 0v5.6c-3 1.2-5-1.2-8 0"/>',
    arrowR: '<path d="M3 8h10M9.6 4.2 13.4 8l-3.8 3.8"/>',
    chart: '<path d="M2.4 13.6h11.2M4.2 13.6V8.6M7.2 13.6V4.2M10.2 13.6V7.4M13 13.6V2.8"/>',
    table: '<rect x="2.4" y="3.6" width="11.2" height="8.8" rx="1"/><path d="M2.4 6.6h11.2M6.4 6.6v5.8M10.4 6.6v5.8"/>',
    users: '<circle cx="5.8" cy="5.6" r="2.1"/><path d="M2.2 13c.3-2.3 1.8-3.5 3.6-3.5s3.3 1.2 3.6 3.5"/><circle cx="10.8" cy="6.4" r="1.7"/><path d="M9.3 9.8c1.9-.3 3.9.8 4.5 3.2"/>',
    globe: '<circle cx="8" cy="8" r="5.8"/><path d="M2.2 8h11.6M8 2.2c1.7 1.6 2.6 3.6 2.6 5.8S9.7 12.2 8 13.8C6.3 12.2 5.4 10.2 5.4 8S6.3 3.8 8 2.2Z"/>',
    percent: '<path d="m4.4 11.6 7.2-7.2"/><circle cx="5.4" cy="5.4" r="1.6"/><circle cx="10.6" cy="10.6" r="1.6"/>',
    mail: '<rect x="2.2" y="3.8" width="11.6" height="8.4" rx="1.2"/><path d="m2.6 4.9 5.4 3.9 5.4-3.9"/>',
    cloud: '<path d="M4.6 12.4h7a2.6 2.6 0 0 0 .4-5.2 3.6 3.6 0 0 0-7-1A2.9 2.9 0 0 0 4.6 12.4Z"/>',
    coin: '<circle cx="8" cy="8" r="5.6"/><path d="M8 5.2v5.6M6.5 6.4h2.2a1.3 1.3 0 0 1 0 2.6H6.6a1.3 1.3 0 0 0 0 2.6h2.4"/>',
    warning: '<path d="M8 2.6 14 13H2L8 2.6Z"/><path d="M8 6.4v3.1M8 11.5v.1"/>',
    newspaper: '<path d="M2.4 4.2h8.2v8.4H3.6a1.2 1.2 0 0 1-1.2-1.2V4.2Z"/><path d="M10.6 6h1a1.2 1.2 0 0 1 1.2 1.2v4.2a1.2 1.2 0 0 0 1.2 1.2H5.2"/><path d="M4.4 6.4h4.2M4.4 8.4h4.2M4.4 10.4h2.6"/>',
    seal: '<circle cx="8" cy="6.4" r="3.4"/><path d="m5.9 9.3-1 4.3 3.1-1.6 3.1 1.6-1-4.3"/>'
  };
  window.ICO = P;
  window.ico = function (name, cls) {
    return `<svg class="ico${cls ? ' ' + cls : ''}" viewBox="0 0 16 16" aria-hidden="true" focusable="false">${P[name] || ''}</svg>`;
  };
})();

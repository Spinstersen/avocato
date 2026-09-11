/* Genere webapp/icons/icon-192.png + icon-512.png (zero dependance, node:zlib).
   Plaque encrier : fond ink, double filet brass, "A" geometrique brass-light.
   Usage : node webapp/scripts/gen-icons.cjs */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const INK = [7, 14, 28], BRASS = [197, 164, 106], LIGHT = [232, 217, 176];

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c;
  }
  return t;
})();
function crc(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.from(type, 'ascii');
  const cr = Buffer.alloc(4);
  cr.writeUInt32BE(crc(Buffer.concat([td, data])));
  return Buffer.concat([len, td, data, cr]);
}
function distToSeg(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const L2 = dx * dx + dy * dy;
  let t = L2 ? ((px - ax) * dx + (py - ay) * dy) / L2 : 0;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + t * dx, cy = ay + t * dy;
  return Math.hypot(px - cx, py - cy);
}
function draw(size) {
  const px = Buffer.alloc(size * size * 4);
  const set = (x, y, c, a) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const o = (y * size + x) * 4;
    px[o] = c[0]; px[o + 1] = c[1]; px[o + 2] = c[2]; px[o + 3] = a == null ? 255 : a;
  };
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) set(x, y, INK);
  const b = Math.max(2, Math.round(size * 0.014));
  for (let i = 0; i < size; i++) for (let k = 0; k < b; k++) {
    set(i, k, BRASS); set(i, size - 1 - k, BRASS); set(k, i, BRASS); set(size - 1 - k, i, BRASS);
  }
  const y0 = size * 0.24, y1 = size * 0.78, cx = size / 2, half = size * 0.27, w = size * 0.062;
  const yBar = y0 + (y1 - y0) * 0.66;
  const legL = half * (1 - (yBar - y0) / (y1 - y0));
  for (let y = Math.round(y0); y <= Math.round(y1); y++) for (let x = 0; x < size; x++) {
    const d = Math.min(
      distToSeg(x, y, cx, y0, cx - half, y1),
      distToSeg(x, y, cx, y0, cx + half, y1)
    );
    const bar = Math.abs(y - yBar) < w / 2 && Math.abs(x - cx) < legL ? 0 : Infinity;
    if (Math.min(d, bar) < w / 2) set(x, y, LIGHT);
  }
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    px.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0))
  ]);
}
const outDir = path.resolve(__dirname, '..', 'icons');
fs.mkdirSync(outDir, { recursive: true });
for (const s of [192, 512]) {
  fs.writeFileSync(path.join(outDir, 'icon-' + s + '.png'), draw(s));
  console.log('icon-' + s + '.png OK');
}

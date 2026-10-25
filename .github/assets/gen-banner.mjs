/**
 * Generates the theme-adaptive pair of README banners and the CA icon:
 *   rustdesk-banner.svg / .png       light, 1600x500, white background, dark wordmark
 *   rustdesk-banner-dark.svg / .png  dark, 1600x500, GitHub dark background, light wordmark
 *   icon.png                         512x512, the mark on white
 * The mark is RustDesk's own (res/logo.svg upstream); its blue gradient reads on
 * either background, so only the background and text colours flip.
 *
 * Name and claim use DejaVu Sans, fetched at runtime from the dejavu-fonts-ttf npm
 * package via jsDelivr, cached in the OS temp dir and never committed. The text
 * becomes SVG paths (opentype.js), so the SVG is self-contained.
 *
 * Deps: `npm i -g @resvg/resvg-js opentype.js`. Run: node .github/assets/gen-banner.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const require = createRequire(import.meta.url);
const gRoot = execSync("npm root -g").toString().trim();
const { Resvg } = require(`${gRoot}/@resvg/resvg-js`);
const opentype = require(`${gRoot}/opentype.js`);

const __dir = dirname(fileURLToPath(import.meta.url));

const NAME = "RustDesk";
const CLAIM = "Remote control. Home rules.";
const THEMES = [
  { suffix: "", bg: "#ffffff", name: "#1f2328", claim: "#5a5d5e" },
  { suffix: "-dark", bg: "#0d1117", name: "#e6edf3", claim: "#9aa4ad" },
];
const W = 1600, H = 500;
const LH = 340; // the mark is round and fills its square, so it sits smaller than a framed logo
// House banner standard: name 132 / claim 44, logo-to-text gap 70, name-to-claim gap 8.
const nameSize = 132, claimSize = 44, gap = 70, lineGap = 8;

// DejaVu's ccmp lookups crash opentype.js's feature engine, so plain Latin text is
// shaped glyph by glyph with manual pair kerning.
function shapeRun(font, text, size) {
  const scale = size / font.unitsPerEm;
  const run = [];
  let x = 0;
  let prev = null;
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    if (prev) x += font.getKerningValue(prev, g) * scale;
    run.push({ g, x });
    x += g.advanceWidth * scale;
    prev = g;
  }
  return { run, width: x };
}
function runPathData(font, text, x, y, size) {
  let d = "";
  for (const { g, x: gx } of shapeRun(font, text, size).run) {
    d += g.getPath(x + gx, y, size).toPathData(2);
  }
  return d;
}

async function loadFont(url, cacheName) {
  const path = join(tmpdir(), `rustdesk-${cacheName}.ttf`);
  if (!existsSync(path)) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`font fetch ${cacheName}: ${res.status}`);
    writeFileSync(path, Buffer.from(await res.arrayBuffer()));
  }
  const buf = readFileSync(path);
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}
const DEJAVU = "https://cdn.jsdelivr.net/npm/dejavu-fonts-ttf@2.37.3/ttf";
const nameFont = await loadFont(`${DEJAVU}/DejaVuSans-Bold.ttf`, "DejaVuSans-Bold");
const claimFont = await loadFont(`${DEJAVU}/DejaVuSans.ttf`, "DejaVuSans-Book");

const startX = 165; // left-anchored (house banner standard)
const LX = startX, LY = (H - LH) / 2;
const textX = startX + LH + gap;

const em = (f, s) => s / f.unitsPerEm;
const nameAsc = nameFont.ascender * em(nameFont, nameSize);
const nameDesc = -nameFont.descender * em(nameFont, nameSize);
const claimAsc = claimFont.ascender * em(claimFont, claimSize);
const blockH = nameAsc + nameDesc + lineGap + claimAsc;
const nameBaseline = H / 2 - blockH / 2 + nameAsc;
const claimBaseline = nameBaseline + nameDesc + lineGap + claimAsc;

const namePath = runPathData(nameFont, NAME, textX, nameBaseline, nameSize);
const claimPath = runPathData(claimFont, CLAIM, textX, claimBaseline, claimSize);

// The mark keeps its own viewBox; only the root element is replaced by a
// positioned one.
const mark = readFileSync(join(__dir, "rustdesk-logo.svg"), "utf8");
const placed = (x, y, size) =>
  mark.replace(/<svg[\s\S]*?>/, `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="66.993 897.484 26 26" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`);

for (const t of THEMES) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="RustDesk">
  <rect width="${W}" height="${H}" fill="${t.bg}"/>
  ${placed(LX, LY, LH)}
  <path d="${namePath}" fill="${t.name}"/>
  <path d="${claimPath}" fill="${t.claim}"/>
</svg>
`;
  writeFileSync(join(__dir, `rustdesk-banner${t.suffix}.svg`), svg);
  const png = new Resvg(svg, { fitTo: { mode: "width", value: W }, background: t.bg }).render().asPng();
  writeFileSync(join(__dir, `rustdesk-banner${t.suffix}.png`), png);
  console.log(`wrote rustdesk-banner${t.suffix}.svg + .png`);
}

// CA icon: the mark on a solid white square with some margin.
const IS = 512, IM = 56;
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${IS}" height="${IS}" viewBox="0 0 ${IS} ${IS}">
  <rect width="${IS}" height="${IS}" fill="#ffffff"/>
  ${placed(IM, IM, IS - 2 * IM)}
</svg>
`;
writeFileSync(join(__dir, "icon.png"), new Resvg(iconSvg, { fitTo: { mode: "width", value: IS }, background: "#ffffff" }).render().asPng());
console.log("wrote icon.png");

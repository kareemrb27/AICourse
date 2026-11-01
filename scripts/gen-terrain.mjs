// Generates public/hero-terrain.svg: contour lines of an invented landscape with
// a four-waypoint trail climbing to a summit, a nod to the four-level path.
// Run with: node scripts/gen-terrain.mjs
import { writeFileSync } from "node:fs";

const W = 1200, H = 700, STEP = 6;
const hills = [
  [1010, 590, 1.0, 235],
  [330, 300, 0.5, 200],
  [760, 140, 0.55, 210],
  [190, 600, 0.38, 170],
  [1150, 190, 0.45, 150],
];
const height = (x, y) => {
  let h = 0;
  for (const [cx, cy, a, s] of hills) h += a * Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (2 * s * s));
  return h + 0.035 * Math.sin(x / 71 + y / 93) + 0.03 * Math.sin(x / 43 - y / 57);
};

const cols = Math.floor(W / STEP), rows = Math.floor(H / STEP);
const grid = [];
for (let j = 0; j <= rows; j++) {
  const row = [];
  for (let i = 0; i <= cols; i++) row.push(height(i * STEP, j * STEP));
  grid.push(row);
}

const levels = Array.from({ length: 16 }, (_, k) => 0.08 + k * 0.06);
const lerp = (a, b, level) => (level - a) / (b - a);
const f = (n) => Math.round(n * 10) / 10;

let paths = "";
levels.forEach((level, k) => {
  const op = (0.1 + (k / levels.length) * 0.32).toFixed(2);
  let d = "";
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const a = grid[j][i], b = grid[j][i + 1], c = grid[j + 1][i + 1], dd = grid[j + 1][i];
      const x = i * STEP, y = j * STEP;
      const pts = [];
      if ((a < level) !== (b < level)) pts.push([x + lerp(a, b, level) * STEP, y]);
      if ((b < level) !== (c < level)) pts.push([x + STEP, y + lerp(b, c, level) * STEP]);
      if ((dd < level) !== (c < level)) pts.push([x + lerp(dd, c, level) * STEP, y + STEP]);
      if ((a < level) !== (dd < level)) pts.push([x, y + lerp(a, dd, level) * STEP]);
      if (pts.length >= 2) d += `M${f(pts[0][0])} ${f(pts[0][1])}L${f(pts[1][0])} ${f(pts[1][1])}`;
      if (pts.length === 4) d += `M${f(pts[2][0])} ${f(pts[2][1])}L${f(pts[3][0])} ${f(pts[3][1])}`;
    }
  }
  paths += `<path d="${d}" stroke-opacity="${op}"/>`;
});

// The trail: a cubic curve along the bottom to the summit, with four waypoints.
const P = [[450, 668], [640, 655], [820, 640], [1010, 590]];
const bez = (t) => {
  const u = 1 - t;
  return [0, 1].map((k) => u ** 3 * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t ** 3 * P[3][k]);
};
const trail = Array.from({ length: 61 }, (_, n) => bez(n / 60).map(f).join(" ")).join("L");
const stops = [0.1, 0.4, 0.68, 1].map(bez);
const nodes = stops
  .map(([x, y], i) => {
    const last = i === stops.length - 1;
    return `<circle cx="${f(x)}" cy="${f(y)}" r="${last ? 11 : 8}" fill="#14141b" stroke="#34d399" stroke-width="2"/>` +
      (last ? `<circle cx="${f(x)}" cy="${f(y)}" r="4.5" fill="#34d399"/>` : `<circle cx="${f(x)}" cy="${f(y)}" r="2.5" fill="#34d399"/>`);
  })
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="none" aria-hidden="true">
<g stroke="#34d399" stroke-width="1.1" stroke-linecap="round">${paths}</g>
<path d="M${trail}" stroke="#6ee7b7" stroke-opacity="0.85" stroke-width="2" stroke-dasharray="2 9" stroke-linecap="round"/>
${nodes}
</svg>`;

writeFileSync("public/hero-terrain.svg", svg);
console.log(`public/hero-terrain.svg ${(svg.length / 1024).toFixed(0)} KB`);

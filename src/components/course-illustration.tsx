import type { ReactNode } from "react";
import { useId } from "react";

// Vector illustrations for each course, drawn in one soft, dark style so they
// match the site. Every scene is 400 x 260 and uses two accent colors.
export type Palette = [string, string];
type P = { id: string; a: string; b: string };

// Flat, muted colors: a paper-toned background and two earthy accents.
const ART: Record<string, { bg: string; a: string; b: string }> = {
  "ai-foundations": { bg: "#e6ecdf", a: "#5f8a6e", b: "#d9a35f" },
  "working-with-llms": { bg: "#efe6d3", a: "#6f9a78", b: "#c97b5a" },
  "python-and-data-essentials": { bg: "#e3e8ee", a: "#5b7fa3", b: "#e0b24f" },
  "machine-learning-basics": { bg: "#e8e3ee", a: "#7d73a0", b: "#6aa396" },
  "build-with-llm-apis": { bg: "#dfe7ee", a: "#4f7396", b: "#c4875a" },
  "chat-with-your-documents": { bg: "#ece4d6", a: "#4f8a8b", b: "#b6805e" },
  "evaluate-and-use-ai-responsibly": { bg: "#f0e5cf", a: "#c58b3c", b: "#5f8a6e" },
  "agents-fundamentals": { bg: "#efe0dc", a: "#b86f66", b: "#6f7fa0" },
  "browser-automation": { bg: "#e2e6e0", a: "#5f7f9c", b: "#c9a24b" },
  graphrag: { bg: "#e5e9dc", a: "#6f8f5a", b: "#9a6fa0" },
  "agent-memory": { bg: "#efe3e3", a: "#b0697a", b: "#6c82a3" },
  "production-agents": { bg: "#ede4d8", a: "#b7674f", b: "#d1a04a" },
  "repo-context": { bg: "#dfe9e6", a: "#4c8b82", b: "#7380b0" },
  "synthetic-data": { bg: "#ebe2ea", a: "#a56a9a", b: "#5b9aa0" },
  "meta-harness": { bg: "#efe3d6", a: "#c27a45", b: "#7b6c9c" },
  "financial-workflows": { bg: "#eee8cf", a: "#c7a23b", b: "#5b8a68" },
  "ai-code-analysis": { bg: "#eadfdb", a: "#bd6b5b", b: "#5f86ad" },
  "ai-solution-designer": { bg: "#f0e6cc", a: "#d0a33a", b: "#5a8a68" },
};
const FALLBACK = { bg: "#e6ecdf", a: "#5f8a6e", b: "#d9a35f" };

export const PALETTES: Record<string, Palette> = Object.fromEntries(
  Object.entries(ART).map(([slug, c]) => [slug, [c.a, c.b] as Palette]),
);

const INK_HEX = "#2d3a35";
const INK = "rgba(45,58,53,";

function Solid({ p, x, y, w, h, r = 14, rev = false }: { p: P; x: number; y: number; w: number; h: number; r?: number; rev?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={rev ? p.b : p.a} />
    </g>
  );
}

function Glass({ x, y, w, h, r = 14 }: { p?: P; x: number; y: number; w: number; h: number; r?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill="rgba(255,255,255,0.6)" stroke={`${INK}0.2)`} />
    </g>
  );
}

function Orb({ p, cx, cy, r, glass = false, rev = false }: { p: P; cx: number; cy: number; r: number; glass?: boolean; rev?: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={glass ? "rgba(255,255,255,0.6)" : rev ? p.b : p.a} stroke={glass ? `${INK}0.28)` : "none"} />
    </g>
  );
}

function Bar({ x, y, w, h, o = 0.35 }: { x: number; y: number; w: number; h: number; o?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={`${INK}${o})`} />;
}

function Ln({ x1, y1, x2, y2, o = 0.25, w = 1.5, dash }: { x1: number; y1: number; x2: number; y2: number; o?: number; w?: number; dash?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={`${INK}${o})`} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash} />;
}

function Sparkle({ p, x, y, s = 14 }: { p: P; x: number; y: number; s?: number }) {
  const d = `M${x} ${y - s} L${x + s * 0.28} ${y - s * 0.28} L${x + s} ${y} L${x + s * 0.28} ${y + s * 0.28} L${x} ${y + s} L${x - s * 0.28} ${y + s * 0.28} L${x - s} ${y} L${x - s * 0.28} ${y - s * 0.28} Z`;
  return <path d={d} fill={p.b} opacity={0.95} />;
}

function Glyph({ x, y, size, children, fill = INK_HEX, o = 0.95 }: { x: number; y: number; size: number; children: ReactNode; fill?: string; o?: number }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={700} fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fill={fill} opacity={o} textAnchor="middle">
      {children}
    </text>
  );
}

function Scene({ slug, p }: { slug: string; p: P }): ReactNode {
  switch (slug) {
    case "ai-foundations": {
      const layers = [
        { x: 90, ys: [80, 130, 180] },
        { x: 170, ys: [60, 105, 150, 200] },
        { x: 250, ys: [60, 105, 150, 200] },
        { x: 330, ys: [105, 155] },
      ];
      return (
        <>
          {layers.slice(0, -1).map((l, i) =>
            l.ys.flatMap((y1) => layers[i + 1].ys.map((y2) => <Ln key={`${i}-${y1}-${y2}`} x1={l.x} y1={y1} x2={layers[i + 1].x} y2={y2} o={0.14} />)),
          )}
          {layers.map((l, i) => l.ys.map((y, j) => <Orb key={`${i}-${j}`} p={p} cx={l.x} cy={y} r={i === 3 ? 17 : 12} glass={(i + j) % 3 === 0} rev={i % 2 === 1} />))}
        </>
      );
    }
    case "working-with-llms":
      return (
        <>
          <Glass p={p} x={55} y={52} w={200} h={72} r={20} />
          <Bar x={75} y={72} w={150} h={8} />
          <Bar x={75} y={90} w={110} h={8} o={0.25} />
          <path d="M82 124 L72 142 L104 126 Z" fill={`${INK}0.12)`} />
          <Solid p={p} x={140} y={140} w={205} h={72} r={20} />
          <Bar x={162} y={160} w={150} h={8} o={0.55} />
          <Bar x={162} y={178} w={95} h={8} o={0.4} />
          <path d="M320 212 L336 230 L304 214 Z" fill={p.b} opacity={0.9} />
          <Sparkle p={p} x={318} y={62} s={18} />
          <Sparkle p={p} x={286} y={96} s={8} />
        </>
      );
    case "python-and-data-essentials":
      return (
        <>
          <Glass p={p} x={60} y={42} w={250} h={160} r={16} />
          <circle cx={82} cy={62} r={5} fill={p.b} />
          <circle cx={98} cy={62} r={5} fill={`${INK}0.35)`} />
          <circle cx={114} cy={62} r={5} fill={`${INK}0.2)`} />
          <Ln x1={60} y1={78} x2={310} y2={78} o={0.12} />
          <Bar x={80} y={96} w={60} h={9} o={0} />
          <rect x={80} y={96} width={60} height={9} rx={4.5} fill={p.a} />
          <Bar x={148} y={96} w={90} h={9} />
          <Bar x={96} y={118} w={120} h={9} o={0.28} />
          <rect x={96} y={140} width={70} height={9} rx={4.5} fill={p.b} />
          <Bar x={174} y={140} w={50} h={9} />
          <Bar x={80} y={162} w={100} h={9} o={0.28} />
          <Solid p={p} x={236} y={132} w={118} h={92} r={16} rev />
          {[0, 1, 2, 3].map((i) => <rect key={i} x={252 + i * 24} y={198 - (i + 1) * 14} width={14} height={(i + 1) * 14} rx={5} fill={`${INK}0.8)`} />)}
        </>
      );
    case "machine-learning-basics": {
      const left = [[100, 150], [118, 175], [135, 140], [150, 190], [112, 205], [165, 165], [128, 120], [92, 125]];
      const right = [[240, 80], [262, 105], [285, 70], [300, 110], [250, 130], [320, 90], [275, 135], [225, 105]];
      return (
        <>
          <Ln x1={70} y1={215} x2={340} y2={215} o={0.3} />
          <Ln x1={70} y1={215} x2={70} y2={40} o={0.3} />
          <Ln x1={110} y1={40} x2={300} y2={215} o={0.5} w={2} dash="6 7" />
          {left.map(([x, y], i) => <Orb key={`l${i}`} p={p} cx={x} cy={y} r={8} />)}
          {right.map(([x, y], i) => <Orb key={`r${i}`} p={p} cx={x} cy={y} r={8} rev />)}
          <Sparkle p={p} x={330} y={50} s={12} />
        </>
      );
    }
    case "build-with-llm-apis":
      return (
        <>
          <Glass p={p} x={42} y={72} w={118} h={112} r={18} />
          <Glyph x={101} y={140} size={34} fill={p.a}>&lt;/&gt;</Glyph>
          <Solid p={p} x={240} y={72} w={118} h={112} r={18} />
          <Glyph x={299} y={140} size={38} fill="#fff">{"{ }"}</Glyph>
          <Ln x1={172} y1={112} x2={228} y2={112} o={0.6} w={3} />
          <path d="M228 112 l-10 -7 v14 z" fill={`${INK}0.6)`} transform="rotate(180 228 112)" />
          <Ln x1={228} y1={146} x2={172} y2={146} o={0.35} w={3} dash="4 6" />
          <path d="M172 146 l10 -7 v14 z" fill={`${INK}0.4)`} />
          <rect x={172} y={192} width={56} height={22} rx={11} fill={p.b} />
          <Glyph x={200} y={208} size={13} fill={INK_HEX}>200</Glyph>
        </>
      );
    case "chat-with-your-documents":
      return (
        <>
          <g transform="rotate(-8 130 120)"><Glass p={p} x={70} y={50} w={110} h={140} r={12} /></g>
          <g transform="rotate(4 150 120)"><Glass p={p} x={96} y={44} w={110} h={140} r={12} /></g>
          <Solid p={p} x={122} y={52} w={112} h={144} r={14} rev />
          <Bar x={140} y={76} w={72} h={8} o={0.7} />
          <Bar x={140} y={94} w={62} h={8} o={0.45} />
          <Bar x={140} y={112} w={76} h={8} o={0.45} />
          <Bar x={140} y={130} w={50} h={8} o={0.45} />
          <circle cx={262} cy={118} r={38} fill={`${INK}0.08)`} stroke={p.a} strokeWidth={8} />
          <line x1={290} y1={146} x2={322} y2={178} stroke={p.a} strokeWidth={11} strokeLinecap="round" />
          <Solid p={p} x={262} y={186} w={82} h={44} r={16} />
          <Bar x={278} y={202} w={50} h={7} o={0.6} />
        </>
      );
    case "evaluate-and-use-ai-responsibly":
      return (
        <>
          <rect x={196} y={80} width={8} height={120} rx={4} fill={`${INK}0.4)`} />
          <Solid p={p} x={150} y={196} w={100} h={16} r={8} />
          <Ln x1={90} y1={88} x2={310} y2={88} o={0.7} w={6} />
          <Orb p={p} cx={200} cy={80} r={12} />
          <Ln x1={90} y1={88} x2={66} y2={150} o={0.4} />
          <Ln x1={90} y1={88} x2={114} y2={150} o={0.4} />
          <Ln x1={310} y1={88} x2={286} y2={150} o={0.4} />
          <Ln x1={310} y1={88} x2={334} y2={150} o={0.4} />
          <path d="M58 150 H122 Q122 184 90 186 Q58 184 58 150 Z" fill={`${INK}0.12)`} stroke={`${INK}0.3)`} />
          <path d="M278 150 H342 Q342 184 310 186 Q278 184 278 150 Z" fill={p.a} />
          <Orb p={p} cx={90} cy={140} r={9} rev glass />
          <Sparkle p={p} x={310} y={54} s={12} />
        </>
      );
    case "agents-fundamentals":
      return (
        <>
          <circle cx={200} cy={128} r={78} fill="none" stroke={`${INK}0.18)`} strokeWidth={3} strokeDasharray="8 9" />
          <path d="M200 50 A78 78 0 0 1 278 128" fill="none" stroke={p.a} strokeWidth={5} strokeLinecap="round" />
          <path d="M278 128 l-8 -10 h16 z" fill={p.a} transform="rotate(25 278 128)" />
          <Orb p={p} cx={200} cy={128} r={30} />
          <circle cx={190} cy={125} r={4} fill={INK_HEX} />
          <circle cx={210} cy={125} r={4} fill={INK_HEX} />
          <Solid p={p} x={182} y={32} w={36} h={36} r={10} rev />
          <Orb p={p} cx={278} cy={128} r={15} glass />
          <path d="M200 188 L217 218 L183 218 Z" fill={p.b} />
          <rect x={108} y={114} width={28} height={28} rx={8} fill={`${INK}0.16)`} stroke={`${INK}0.3)`} />
        </>
      );
    case "browser-automation":
      return (
        <>
          <Glass p={p} x={52} y={42} w={290} h={176} r={16} />
          <circle cx={74} cy={62} r={5} fill={p.b} />
          <circle cx={90} cy={62} r={5} fill={`${INK}0.35)`} />
          <circle cx={106} cy={62} r={5} fill={`${INK}0.2)`} />
          <rect x={126} y={53} width={196} height={18} rx={9} fill={`${INK}0.1)`} />
          <Ln x1={52} y1={84} x2={342} y2={84} o={0.12} />
          <Solid p={p} x={76} y={100} w={110} h={56} r={12} rev />
          <Bar x={204} y={106} w={100} h={9} o={0.4} />
          <Bar x={204} y={126} w={70} h={9} o={0.25} />
          <Glass p={p} x={76} y={168} w={110} h={34} r={10} />
          <rect x={204} y={168} width={80} height={34} rx={17} fill={p.a} />
          <circle cx={284} cy={172} r={20} fill="none" stroke={p.b} strokeWidth={3} opacity={0.7} />
          <path d="M276 168 L276 214 L287 204 L295 222 L303 218 L295 200 L309 200 Z" fill="#fff" stroke={INK_HEX} strokeWidth={2} strokeLinejoin="round" />
        </>
      );
    case "graphrag": {
      const nodes = [[200, 125, 24], [110, 80, 14], [290, 78, 14], [100, 180, 12], [300, 178, 16], [200, 52, 10], [200, 205, 11], [48, 130, 9], [352, 128, 9]];
      const edges = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 5], [2, 5], [3, 7], [4, 8], [1, 7], [2, 8], [3, 6], [4, 6]];
      return (
        <>
          {edges.map(([i, j]) => <Ln key={`${i}-${j}`} x1={nodes[i][0]} y1={nodes[i][1]} x2={nodes[j][0]} y2={nodes[j][1]} o={0.28} w={2} />)}
          {nodes.map(([x, y, r], i) => <Orb key={i} p={p} cx={x} cy={y} r={r} glass={i > 4} rev={i % 2 === 0 && i > 0} />)}
        </>
      );
    }
    case "agent-memory":
      return (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={90} y={150 - i * 44} width={190} height={36} rx={18} fill={i === 2 ? p.a : i === 1 ? p.b : `${INK}0.1)`} stroke={`${INK}0.22)`} />
              <rect x={104} y={160 - i * 44} width={80} height={8} rx={4} fill={`${INK}0.5)`} />
              <circle cx={256} cy={168 - i * 44} r={6} fill={`${INK}0.7)`} />
            </g>
          ))}
          <circle cx={316} cy={74} r={34} fill={`${INK}0.08)`} stroke={p.b} strokeWidth={6} />
          <line x1={316} y1={74} x2={316} y2={54} stroke={INK_HEX} strokeWidth={5} strokeLinecap="round" />
          <line x1={316} y1={74} x2={332} y2={82} stroke={INK_HEX} strokeWidth={5} strokeLinecap="round" />
          <path d="M286 130 q30 -4 30 -30" fill="none" stroke={`${INK}0.35)`} strokeWidth={3} strokeDasharray="5 6" />
          <Sparkle p={p} x={78} y={60} s={12} />
        </>
      );
    case "production-agents":
      return (
        <>
          <Glass p={p} x={52} y={44} w={296} h={172} r={16} />
          <polyline points="76,150 118,126 160,138 204,96 248,108 290,72 324,84" fill="none" stroke={p.a} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="76,150 118,126 160,138 204,96 248,108 290,72 324,84 324,170 76,170" fill={`${INK}0.05)`} />
          {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={80 + i * 44} y={184 - (i % 3) * 6 - 10} width={26} height={(i % 3) * 6 + 14} rx={6} fill={`${INK}0.25)`} />)}
          <Orb p={p} cx={290} cy={72} r={11} rev />
          <circle cx={78} cy={62} r={5} fill="#34d399" />
          <circle cx={94} cy={62} r={5} fill={p.b} />
          <circle cx={110} cy={62} r={5} fill={`${INK}0.3)`} />
        </>
      );
    case "repo-context":
      return (
        <>
          <g>
            <path d="M62 70 h54 l12 14 h72 a10 10 0 0 1 10 10 v78 a10 10 0 0 1 -10 10 h-138 a10 10 0 0 1 -10 -10 v-92 a10 10 0 0 1 10 -10 z" fill={p.a} />
          </g>
          <Glass p={p} x={218} y={52} w={122} h={152} r={14} />
          <Glyph x={279} y={140} size={46} fill={p.b}>{"{ }"}</Glyph>
          <Bar x={236} y={72} w={70} h={8} o={0.4} />
          <Bar x={236} y={170} w={70} h={8} o={0.3} />
          <Bar x={82} y={178} w={100} h={9} o={0.5} />
          <rect x={74} y={104} width={28} height={36} rx={6} fill={`${INK}0.3)`} />
          <rect x={112} y={104} width={28} height={36} rx={6} fill={`${INK}0.2)`} />
          <rect x={150} y={104} width={28} height={36} rx={6} fill={`${INK}0.2)`} />
          <Ln x1={190} y1={128} x2={216} y2={128} o={0.45} w={3} dash="4 5" />
        </>
      );
    case "synthetic-data": {
      const cells: ReactNode[] = [];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 7; c++) {
          const x = 60 + c * 42;
          const y = 58 + r * 42;
          const generated = c + r > 4;
          cells.push(
            generated ? (
              <Solid key={`${r}-${c}`} p={p} x={x} y={y} w={30} h={30} r={8} rev={(r + c) % 2 === 0} />
            ) : (
              <rect key={`${r}-${c}`} x={x} y={y} width={30} height={30} rx={8} fill={`${INK}0.09)`} stroke={`${INK}0.2)`} />
            ),
          );
        }
      }
      return (
        <>
          {cells}
          <Sparkle p={p} x={334} y={44} s={14} />
          <Sparkle p={p} x={310} y={226} s={9} />
        </>
      );
    }
    case "meta-harness":
      return (
        <>
          <circle cx={200} cy={128} r={84} fill="none" stroke={`${INK}0.14)`} strokeWidth={3} />
          <circle cx={200} cy={128} r={56} fill="none" stroke={`${INK}0.22)`} strokeWidth={3} />
          <circle cx={200} cy={128} r={28} fill={`${INK}0.08)`} stroke={p.a} strokeWidth={5} />
          <Orb p={p} cx={200} cy={44} r={14} />
          <Orb p={p} cx={284} cy={128} r={11} rev />
          <Orb p={p} cx={200} cy={184} r={11} glass />
          <Orb p={p} cx={144} cy={128} r={9} />
          <Orb p={p} cx={259} cy={69} r={9} glass />
          <path d="M240 36 a96 96 0 0 1 56 40" fill="none" stroke={p.b} strokeWidth={5} strokeLinecap="round" />
          <path d="M296 76 l-14 0 l8 -12 z" fill={p.b} transform="rotate(35 296 76)" />
          <Orb p={p} cx={200} cy={128} r={12} rev />
        </>
      );
    case "financial-workflows":
      return (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <ellipse cx={116} cy={196 - i * 20} rx={52} ry={16} fill={(i % 2 ? p.b : p.a)} />
            </g>
          ))}
          <ellipse cx={116} cy={116} rx={52} ry={16} fill={`${INK}0.3)`} />
          <Glyph x={116} y={122} size={20} fill={INK_HEX}>$</Glyph>
          <Glass p={p} x={196} y={52} w={150} h={156} r={16} />
          {[0, 1, 2, 3].map((i) => <Solid key={i} p={p} x={216 + i * 30} y={178 - (i + 1) * 26} w={20} h={(i + 1) * 26} r={6} rev={i % 2 === 1} />)}
          <Ln x1={214} y1={190} x2={330} y2={190} o={0.3} />
          <path d="M214 120 L262 98 L292 108 L328 74" fill="none" stroke={INK_HEX} strokeWidth={3} strokeLinecap="round" strokeDasharray="1 8" opacity={0.7} />
        </>
      );
    case "ai-code-analysis":
      return (
        <>
          <Glass p={p} x={56} y={46} w={248} h={168} r={16} />
          <Bar x={78} y={70} w={70} h={9} o={0.4} />
          <Bar x={78} y={90} w={130} h={9} o={0.28} />
          <rect x={70} y={108} width={226} height={24} rx={8} fill={`${p.a}55`} stroke={p.a} />
          <Bar x={78} y={116} w={110} h={9} o={0.8} />
          <Bar x={78} y={144} w={150} h={9} o={0.28} />
          <Bar x={78} y={164} w={90} h={9} o={0.28} />
          <Bar x={78} y={184} w={120} h={9} o={0.28} />
          <circle cx={268} cy={146} r={34} fill={`${INK}0.1)`} stroke={p.b} strokeWidth={7} />
          <line x1={292} y1={170} x2={320} y2={198} stroke={p.b} strokeWidth={10} strokeLinecap="round" />
          <path d="M338 54 l22 8 v22 q0 18 -22 28 q-22 -10 -22 -28 v-22 z" fill={p.b} />
          <path d="M327 84 l8 9 l16 -18" fill="none" stroke={INK_HEX} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" transform="translate(-1 0)" />
        </>
      );
    case "ai-solution-designer":
      return (
        <>
          {[0, 1, 2, 3].map((i) => <Solid key={i} p={p} x={52 + i * 62} y={176 - i * 30} w={56} h={44 + i * 30} r={12} rev={i % 2 === 1} />)}
          <line x1={282} y1={86} x2={282} y2={34} stroke={INK_HEX} strokeWidth={5} strokeLinecap="round" />
          <path d="M284 36 L330 50 L284 66 Z" fill={p.b} />
          <Sparkle p={p} x={340} y={104} s={12} />
          <Sparkle p={p} x={60} y={70} s={9} />
          <Glass p={p} x={52} y={44} w={96} h={70} r={12} />
          <rect x={64} y={58} width={12} height={12} rx={3} fill={p.b} />
          <Bar x={86} y={60} w={48} h={8} o={0.5} />
          <rect x={64} y={82} width={12} height={12} rx={3} fill={p.b} />
          <Bar x={86} y={84} w={36} h={8} o={0.35} />
        </>
      );
    default:
      return <Orb p={p} cx={200} cy={128} r={44} />;
  }
}

export function CourseIllustration({ slug, className = "" }: { slug: string; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const { bg, a, b } = ART[slug] ?? FALLBACK;
  const p: P = { id: `t${uid}`, a, b };
  return (
    <svg
      viewBox="0 0 400 260"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="260" fill={bg} />
      <Scene slug={slug} p={p} />
    </svg>
  );
}

export function coursePalette(slug: string): Palette {
  return PALETTES[slug] ?? ["#10b981", "#22d3ee"];
}

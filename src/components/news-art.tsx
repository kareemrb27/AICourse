import type { ReactNode } from "react";
import type { NewsCategory } from "@/content/news";

// Flat illustrations for news items, one scene per topic. Nothing is fetched
// from the news sources: the picture is ours, and each item varies a little
// (mirrored, colors swapped) based on its title so a list does not look stamped.
const ART: Record<NewsCategory, { bg: string; a: string; b: string }> = {
  models: { bg: "#e3ebe3", a: "#5f8a6e", b: "#d9a35f" },
  open: { bg: "#e1e9ee", a: "#5b84a0", b: "#c98b6b" },
  ideas: { bg: "#e9e5ee", a: "#7d6fa3", b: "#d9a35f" },
  business: { bg: "#f0e8d8", a: "#c0914a", b: "#5f8a6e" },
  policy: { bg: "#efe3e1", a: "#b0696b", b: "#5b84a0" },
};

const INK = "rgba(45,58,53,";

function hash(text: string) {
  let h = 0;
  for (const char of text) h = (h * 31 + char.charCodeAt(0)) >>> 0;
  return h;
}

function Scene({ category, bg, a, b }: { category: NewsCategory; bg: string; a: string; b: string }): ReactNode {
  switch (category) {
    case "models":
      return (
        <>
          <circle cx="200" cy="130" r="100" fill="none" stroke={`${INK}0.2)`} strokeWidth="2" strokeDasharray="5 7" />
          <circle cx="200" cy="130" r="62" fill={a} />
          <circle cx="200" cy="130" r="36" fill={bg} />
          <circle cx="200" cy="130" r="15" fill={b} />
          <circle cx="300" cy="130" r="13" fill={b} />
          <circle cx="129" cy="59" r="10" fill={a} />
          <circle cx="143" cy="212" r="11" fill={a} />
          <path d="M330 36 L334 46 L344 50 L334 54 L330 64 L326 54 L316 50 L326 46Z" fill={b} />
        </>
      );
    case "open":
      return (
        <>
          <rect x="130" y="132" width="140" height="90" rx="8" fill={a} />
          <path d="M126 132 L158 90 L292 90 L274 132Z" fill={b} />
          <rect x="152" y="166" width="96" height="9" rx="4.5" fill={bg} opacity="0.6" />
          <rect x="146" y="40" width="30" height="30" rx="6" fill={a} />
          <rect x="196" y="26" width="30" height="30" rx="6" fill={b} />
          <rect x="248" y="44" width="30" height="30" rx="6" fill={a} opacity="0.85" />
          <circle cx="86" cy="80" r="7" fill={b} />
          <circle cx="322" cy="120" r="9" fill={a} opacity="0.6" />
        </>
      );
    case "ideas":
      return (
        <>
          <g stroke={`${INK}0.3)`} strokeWidth="3" strokeLinecap="round">
            <path d="M90 70 L150 130 M180 50 L150 130 M150 130 L260 100 M260 100 L320 60 M260 100 L240 190 M150 130 L110 200 M150 130 L240 190" />
          </g>
          <circle cx="90" cy="70" r="14" fill={a} />
          <circle cx="180" cy="50" r="16" fill={a} />
          <circle cx="260" cy="100" r="19" fill={a} />
          <circle cx="320" cy="60" r="12" fill={b} />
          <circle cx="240" cy="190" r="15" fill={a} />
          <circle cx="110" cy="200" r="13" fill={a} />
          <circle cx="150" cy="130" r="28" fill={b} />
          <circle cx="150" cy="130" r="11" fill={bg} />
        </>
      );
    case "business":
      return (
        <>
          <rect x="70" y="216" width="270" height="5" rx="2.5" fill={`${INK}0.25)`} />
          <rect x="90" y="166" width="44" height="50" rx="5" fill={a} opacity="0.7" />
          <rect x="150" y="136" width="44" height="80" rx="5" fill={a} opacity="0.85" />
          <rect x="210" y="106" width="44" height="110" rx="5" fill={a} />
          <rect x="270" y="66" width="44" height="150" rx="5" fill={b} />
          <polyline points="112,150 172,120 232,92 292,52" fill="none" stroke={`${INK}0.5)`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="292" cy="52" r="7" fill={bg} stroke={`${INK}0.5)`} strokeWidth="3" />
          <circle cx="72" cy="66" r="22" fill={b} />
          <circle cx="72" cy="66" r="12" fill="none" stroke={bg} strokeWidth="4" />
        </>
      );
    case "policy":
      return (
        <>
          <rect x="52" y="90" width="52" height="8" rx="4" fill={`${INK}0.15)`} />
          <rect x="52" y="110" width="36" height="8" rx="4" fill={`${INK}0.15)`} />
          <rect x="300" y="150" width="52" height="8" rx="4" fill={`${INK}0.15)`} />
          <path d="M200 40 L272 68 V134 C272 176 240 206 200 222 C160 206 128 176 128 134 V68 Z" fill={a} />
          <path d="M170 132 L194 156 L234 108" fill="none" stroke={bg} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="322" cy="58" r="16" fill={b} />
        </>
      );
  }
}

export function NewsArt({
  category,
  seed,
  className,
}: {
  category: NewsCategory;
  seed: string;
  className?: string;
}) {
  const h = hash(seed);
  const base = ART[category];
  const swap = (h >> 1) % 2 === 1;
  const a = swap ? base.b : base.a;
  const b = swap ? base.a : base.b;
  const flip = h % 2 === 1;
  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
      className={className}
    >
      <rect width="400" height="260" fill={base.bg} />
      <g transform={flip ? "translate(400 0) scale(-1 1)" : undefined}>
        <Scene category={category} bg={base.bg} a={a} b={b} />
      </g>
    </svg>
  );
}

"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

export type FeaturedCard = {
  href: string;
  videoId: string;
  videoTitle: string;
  channel: string;
  minutes: number;
  lessonTitle: string;
  courseTitle: string;
  stageName: string;
  color: string;
};

// A row of video previews that scrolls sideways. It never moves on its own, and
// no player loads here: a card is a thumbnail image that links to the lesson.
export function FeaturedVideos({ cards }: { cards: FeaturedCard[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  function page(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  }

  const arrow =
    "hidden size-11 items-center justify-center rounded-full border border-line bg-surface text-lg transition-colors hover:border-accent disabled:pointer-events-none disabled:opacity-30 sm:inline-flex";

  return (
    <section aria-labelledby="watch-title" className="border-x border-t border-line px-6 py-12 sm:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">Watch and start</p>
          <h2 id="watch-title" className="mt-2 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
            Not sure where to begin? <span className="text-accent">Press play.</span>
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Short videos from lessons across the path. Each card opens the lesson it belongs to.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => page(-1)} disabled={edge.start} aria-label="Previous videos" className={arrow}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={() => page(1)} disabled={edge.end} aria-label="Next videos" className={arrow}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={measure}
        className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth scroll-px-6 px-6 pb-3 pt-2 [scrollbar-width:none] sm:-mx-12 sm:scroll-px-12 sm:px-12 [&::-webkit-scrollbar]:hidden motion-reduce:scroll-auto"
      >
        {cards.map((card) => (
          <li key={card.href} className="w-[78%] shrink-0 snap-start sm:w-72">
            <Link
              href={card.href}
              style={{ "--c": card.color } as CSSProperties}
              className="card-lift group block h-full overflow-hidden rounded-xl border border-line bg-surface focus-visible:outline-2 focus-visible:outline-accent"
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${card.videoId}/mqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-black transition-transform group-hover:scale-110"
                >
                  <svg viewBox="0 0 24 24" className="ml-0.5 size-5" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[11px] text-white">
                  {card.minutes} min
                </span>
              </div>
              <div className="p-4">
                <p className="label flex items-center gap-2" style={{ color: "var(--c)" }}>
                  <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: "var(--c)" }} />
                  {card.stageName}
                </p>
                <p className="mt-2 line-clamp-2 text-[15px] font-semibold leading-snug">{card.videoTitle}</p>
                <p className="mt-2 text-xs leading-5 text-muted">
                  {card.channel} · in <span className="text-[#c1c1cf]">{card.lessonTitle}</span>
                </p>
                <p className="mt-0.5 truncate text-xs text-muted">{card.courseTitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";

// A card-sized click-to-play YouTube embed, like the lesson player: the page
// shows YouTube's preview image, and the player itself (on the
// privacy-enhanced domain) loads only when the viewer presses play.
export function TrendingPlayer({
  id,
  title,
  minutes,
  tag,
}: {
  id: string;
  title: string;
  minutes: number;
  tag: string;
}) {
  const [playing, setPlaying] = useState(false);

  // Stop playback when the page is hidden or unmounted after a client-side
  // navigation, so sound does not carry on behind the next page.
  useEffect(() => {
    return () => setPlaying(false);
  }, []);

  return (
    <div className="card-art relative aspect-video overflow-hidden bg-black">
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <>
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 size-full focus-visible:outline-2 focus-visible:outline-accent"
          >
            {/* sddefault is 640x480 with letterbox bars; object-cover crops them. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/sddefault.jpg`}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 size-full object-cover"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-black transition-transform group-hover:scale-110"
            >
              <svg viewBox="0 0 24 24" className="ml-0.5 size-5" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
          <span className="pointer-events-none absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#14141b]/85 px-2 py-0.5 font-mono text-[10px] tracking-wide text-[#e5e5ec] uppercase backdrop-blur">
            <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: "var(--c)" }} />
            {tag}
          </span>
          <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-full border border-white/10 bg-[#14141b]/85 px-2 py-0.5 text-[11px] font-medium text-[#e5e5ec] backdrop-blur">
            {minutes} min
          </span>
        </>
      )}
    </div>
  );
}

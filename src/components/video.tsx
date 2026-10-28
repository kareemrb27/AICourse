"use client";

import { useEffect, useState, type ReactNode } from "react";

// Click-to-load YouTube embed. The page shows YouTube's preview image, but the
// player itself is not loaded until the viewer presses play, and it uses the
// privacy-enhanced domain.
export function Video({
  id,
  title,
  channel,
  minutes,
  children,
}: {
  id: string;
  title: string;
  channel: string;
  minutes: number;
  children?: ReactNode;
}) {
  const [playing, setPlaying] = useState(false);

  // After a client-side navigation Next.js keeps the previous page mounted but
  // hidden, so a playing video would keep its sound going behind the new page.
  // React runs effect cleanups when a page is hidden or unmounted, so stop
  // playback there and show the play button again.
  useEffect(() => {
    return () => setPlaying(false);
  }, []);

  return (
    <figure className="rounded-lg border border-line bg-surface p-3 sm:p-4">
      <div className="relative aspect-video overflow-hidden rounded bg-black">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 flex h-full w-full flex-col items-start justify-end gap-3 bg-gradient-to-br from-[#14141b] to-[#1b1b24] p-5 text-left sm:p-8"
          >
            {/* sddefault is 640x480 with letterbox bars; object-cover crops them.
                (maxresdefault is sharper but missing for some videos, and
                YouTube answers with a grey placeholder the browser accepts.) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/sddefault.jpg`}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10"
            />
            <span
              aria-hidden="true"
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-black transition-transform group-hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="relative text-base font-semibold leading-snug text-white sm:text-lg">
              {title}
            </span>
            <span className="label relative !text-[#d6d6de]">
              {channel} · {minutes} min
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-sm leading-6 text-muted">
        {children ? <div>{children}</div> : null}
        <div className="mt-2 flex flex-wrap items-center gap-x-4">
          <a
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-accent underline underline-offset-4"
          >
            Watch on YouTube
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <span className="label">Video by {channel}. The player loads only when you press play.</span>
        </div>
      </figcaption>
    </figure>
  );
}

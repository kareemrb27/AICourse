import Link from "next/link";
import type { TrendingEntry } from "@/lib/trending";

// "Trending to learn": a topic, a video worth watching, and the lessons here
// that teach the idea. The thumbnail is a plain image linking to YouTube, so no
// player or third-party script loads with the page.
export function TrendingTopics({ topics }: { topics: TrendingEntry[] }) {
  if (!topics.length) return null;
  return (
    <section aria-labelledby="trending-title" className="border-x border-t border-line px-6 py-12 sm:px-12">
      <p className="label">Trending to learn</p>
      <h2 id="trending-title" className="mt-2 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
        What people are talking about. <span className="text-accent">Learn the idea.</span>
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
        Hand-picked talks on topics moving fast, each paired with the lessons that explain the concepts behind it.
      </p>

      <ul className={`mt-8 grid gap-4 ${topics.length > 1 ? "lg:grid-cols-2" : ""}`}>
        {topics.map((item) => (
          <li key={item.video.id} className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface sm:flex-row">
            <a
              href={`https://www.youtube.com/watch?v=${item.video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-video shrink-0 overflow-hidden bg-black focus-visible:outline-2 focus-visible:outline-accent sm:aspect-auto sm:w-72 lg:w-96"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${item.video.id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute inset-0 size-full object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-black transition-transform group-hover:scale-110"
              >
                <svg viewBox="0 0 24 24" className="ml-0.5 size-6" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[11px] text-white">
                {item.video.minutes} min
              </span>
              <span className="sr-only">Watch “{item.video.title}” on YouTube (opens in a new tab)</span>
            </a>

            <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
              <ul aria-label="Topics" className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-[#c1c1cf] uppercase">
                    {tag}
                  </li>
                ))}
              </ul>
              <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight">{item.topic}</h3>
              <p className="mt-2 text-[15px] leading-7 text-[#c1c1cf]">{item.summary}</p>
              {item.note ? <p className="mt-2 text-xs leading-5 text-muted">{item.note}</p> : null}
              <p className="mt-3 text-xs leading-5 text-muted">
                {item.video.channel} · {item.video.minutes} min
              </p>

              <div className="mt-auto pt-5">
                <p className="label">Learn the ideas</p>
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  {item.learn.map((lesson) => (
                    <li key={lesson.href}>
                      <Link href={lesson.href} className="inline-flex min-h-11 items-center gap-2 text-emerald-300 underline underline-offset-4 hover:text-foreground">
                        {lesson.label} <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

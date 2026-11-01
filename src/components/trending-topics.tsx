import Link from "next/link";
import type { CSSProperties } from "react";
import { TrendingPlayer } from "@/components/trending-player";
import { formatNewsDate } from "@/lib/format";
import type { TrendingEntry } from "@/lib/trending";

const colors = ["#10b981", "#38bdf8", "#a78bfa", "#fbbf24"];

// "Trending to learn": four topics in the same card format as the course
// library, each with a video that plays in the card and the lessons that teach
// the idea behind it.
export function TrendingTopics({ topics }: { topics: TrendingEntry[] }) {
  if (!topics.length) return null;
  return (
    <section aria-labelledby="trending-title" className="border-x border-t border-line px-6 py-14 sm:px-12 sm:py-16">
      <p className="label">Trending to learn</p>
      <h2 id="trending-title" className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
        What people are talking about. <span className="text-accent">Learn the idea.</span>
      </h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-muted">
        Hand-picked talks on topics moving fast. Press play in the card, then follow the lessons that explain the concepts behind it.
      </p>

      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {topics.map((item, index) => (
          <li key={item.video.id} className="min-w-0">
            <article
              style={{ "--c": colors[index % colors.length] } as CSSProperties}
              className="card-lift flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface text-foreground"
            >
              <TrendingPlayer id={item.video.id} title={item.video.title} minutes={item.video.minutes} tag={item.tag} />
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="text-lg font-semibold leading-6 tracking-tight">{item.topic}</h3>
                <p className="mt-2 text-sm leading-6 text-[#b9b9c6]">{item.summary}</p>
                {item.note ? <p className="mt-2 text-xs leading-5 text-muted">{item.note}</p> : null}
                <div className="mt-auto pt-4">
                  <p className="text-xs text-muted">
                    {item.video.channel} · {formatNewsDate(item.video.published)}
                  </p>
                  <div className="mt-3 border-t border-line pt-3">
                    <p className="label">Learn the ideas</p>
                    <ul className="mt-1.5 space-y-0.5 text-xs">
                      {item.learn.map((lesson) => (
                        <li key={lesson.href}>
                          <Link
                            href={lesson.href}
                            className="block py-1.5 font-medium hover:underline"
                            style={{ color: "var(--c)" }}
                          >
                            {lesson.label}{" "}<span aria-hidden="true">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

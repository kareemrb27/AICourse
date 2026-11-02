import Link from "next/link";
import type { CSSProperties } from "react";
import { CategoryPill } from "@/components/news-feed";
import { NewsThumb } from "@/components/news-thumb";
import { newsCategories, newsReviewed, type NewsCategory } from "@/content/news";
import { formatNewsDate } from "@/lib/format";
import type { NewsEntry } from "@/lib/news";

// The page reads like one issue: the latest two weeks grouped by kind, then a
// compact "quick hits" list for everything older.
const sections: { id: string; title: string; blurb: string; categories: NewsCategory[] }[] = [
  { id: "models", title: "Models & releases", blurb: "New frontier and open-weight models.", categories: ["models", "open"] },
  { id: "research", title: "Research & ideas", blurb: "Ideas and architectures worth understanding.", categories: ["ideas"] },
  { id: "business", title: "Business & policy", blurb: "Deals, filings and rules shaping the field.", categories: ["business", "policy"] },
];

const RECENT_DAYS = 14;

// The read link stretches over its whole card (the ::after covers the card), so
// the image, title and text all open the article; links that must stay
// separate, like the lesson link, sit above it with relative z-10.
const readLink =
  "inline-flex min-h-11 items-center gap-2 text-emerald-300 underline underline-offset-4 after:absolute after:inset-0 after:content-[''] hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent";

export function NewsDigest({ items }: { items: NewsEntry[] }) {
  const cutoff = new Date(Date.parse(newsReviewed) - RECENT_DAYS * 86_400_000).toISOString().slice(0, 10);
  const recent = items.filter((item) => item.date >= cutoff);
  const quick = items.filter((item) => item.date < cutoff);

  const groups = sections
    .map((section) => ({ ...section, entries: recent.filter((item) => section.categories.includes(item.category)) }))
    .filter((group) => group.entries.length > 0);

  const jumps = [
    ...groups.map((g) => ({ id: g.id, title: g.title, count: g.entries.length })),
    ...(quick.length ? [{ id: "quick", title: "Quick hits", count: quick.length }] : []),
  ];

  return (
    <div>
      <nav aria-label="In this issue" className="flex flex-wrap items-center gap-2">
        <span className="label mr-2">In this issue</span>
        {jumps.map((jump) => (
          <a
            key={jump.id}
            href={`#${jump.id}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-[#c1c1cf] transition-colors hover:border-accent hover:text-foreground"
          >
            {jump.title}
            <span className="font-mono text-xs text-muted">{jump.count}</span>
          </a>
        ))}
      </nav>

      {groups.map((group) => (
        <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="mt-12 scroll-mt-6">
          <div className="mb-5 border-b border-line pb-4">
            <h2 id={`${group.id}-title`} className="text-2xl font-semibold tracking-[-0.02em]">
              {group.title}
              <span aria-hidden="true" className="ml-3 align-middle font-mono text-xs font-normal text-muted">
                {String(group.entries.length).padStart(2, "0")}
              </span>
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-muted">{group.blurb}</p>
          </div>
          <ul className="grid gap-5 md:grid-cols-2">
            {group.entries.map((item) => (
              <li key={item.url + item.title} className="min-w-0">
                <article
                  style={{ "--c": newsCategories[item.category].color } as CSSProperties}
                  className="relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-[var(--c)] has-[a:focus-visible]:border-[var(--c)]"
                >
                  <NewsThumb category={item.category} seed={item.title} image={item.image} className="card-art aspect-[16/9] w-full" />
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                      <CategoryPill category={item.category} />
                      <time dateTime={item.date} className="label">{formatNewsDate(item.date)}</time>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold leading-snug">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-[#c1c1cf]">{item.summary}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-1 pt-4 text-sm">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className={readLink}>
                        Read at {item.source} <span aria-hidden="true">↗</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      {item.learn ? (
                        <Link href={item.learn.href} className="relative z-10 inline-flex min-h-11 items-center gap-2 text-muted hover:text-foreground">
                          Learn the idea: <span className="text-[#c1c1cf]">{item.learn.label}</span>{" "}
                          <span aria-hidden="true">→</span>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {quick.length > 0 && (
        <section id="quick" aria-labelledby="quick-title" className="mt-12 scroll-mt-6">
          <div className="mb-5 border-b border-line pb-4">
            <h2 id="quick-title" className="text-2xl font-semibold tracking-[-0.02em]">
              Quick hits
              <span aria-hidden="true" className="ml-3 align-middle font-mono text-xs font-normal text-muted">
                {String(quick.length).padStart(2, "0")}
              </span>
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-muted">Earlier items, short.</p>
          </div>
          <ol className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {quick.map((item, index) => (
              <li
                key={item.url + item.title}
                style={{ "--c": newsCategories[item.category].color } as CSSProperties}
                className="relative flex flex-col gap-2 px-5 py-4 transition-colors hover:bg-white/[0.03] sm:flex-row sm:gap-6 sm:py-5"
              >
                <span aria-hidden="true" className="font-mono text-xs text-muted sm:w-6 sm:pt-1">{String(index + 1).padStart(2, "0")}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <CategoryPill category={item.category} />
                    <time dateTime={item.date} className="label">{formatNewsDate(item.date)}</time>
                  </div>
                  <p className="mt-2 font-semibold leading-snug">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:content-[''] hover:text-emerald-300 hover:underline">
                      {item.title}
                      <span aria-hidden="true" className="ml-1.5 text-muted">↗</span>
                      <span className="sr-only"> ({item.source}, opens in a new tab)</span>
                    </a>
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-[#b9b9c6]">{item.summary}</p>
                  <p className="mt-1 text-xs text-muted">{item.source}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}

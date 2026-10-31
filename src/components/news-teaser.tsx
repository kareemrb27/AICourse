import Link from "next/link";
import type { CSSProperties } from "react";
import { NewsArt } from "@/components/news-art";
import { newsCategories } from "@/content/news";
import { formatNewsDate } from "@/lib/format";
import type { NewsEntry } from "@/lib/news";

// A small "what changed lately" strip for the home page; /news has the rest.
export function NewsTeaser({ items }: { items: NewsEntry[] }) {
  return (
    <section aria-labelledby="news-title" className="border-x border-t border-line px-6 py-12 sm:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">What’s new in AI</p>
          <h2 id="news-title" className="mt-2 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
            The field moves weekly. <span className="text-accent">Stay current.</span>
          </h2>
        </div>
        <Link
          href="/news"
          className="label inline-flex min-h-11 items-center rounded border border-line px-3 text-foreground hover:border-accent"
        >
          All updates →
        </Link>
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const { label, color } = newsCategories[item.category];
          return (
            <li key={item.url + item.title}>
              <Link
                href="/news"
                style={{ "--c": color } as CSSProperties}
                className="card-lift flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface focus-visible:outline-2 focus-visible:outline-accent"
              >
                <NewsArt category={item.category} seed={item.title} className="card-art aspect-[16/9] w-full" />
                <div className="flex flex-1 flex-col p-5">
                <p className="label flex items-center gap-2" style={{ color: "var(--c)" }}>
                  <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: "var(--c)" }} />
                  {label}
                </p>
                <p className="mt-3 text-[15px] font-semibold leading-snug">{item.title}</p>
                <p className="mt-auto pt-4 text-xs text-muted">{formatNewsDate(item.date)} · {item.source}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

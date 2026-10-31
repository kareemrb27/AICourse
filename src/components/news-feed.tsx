"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { NewsArt } from "@/components/news-art";
import { newsCategories, type NewsCategory } from "@/content/news";
import { formatNewsDate } from "@/lib/format";
import type { NewsEntry } from "@/lib/news";

export function CategoryPill({ category }: { category: NewsCategory }) {
  const { label, color } = newsCategories[category];
  return (
    <span className="label inline-flex items-center gap-2" style={{ color }}>
      <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

// The full list, with a filter by category.
export function NewsFeed({ items }: { items: NewsEntry[] }) {
  const [filter, setFilter] = useState<NewsCategory | "all">("all");
  const shown = filter === "all" ? items : items.filter((item) => item.category === filter);
  const present = (Object.keys(newsCategories) as NewsCategory[]).filter((c) => items.some((i) => i.category === c));

  const chip = (active: boolean) =>
    `inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition-colors ${
      active ? "border-accent bg-accent-dim text-emerald-300" : "border-line text-muted hover:border-accent hover:text-foreground"
    }`;

  return (
    <div>
      <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setFilter("all")} aria-pressed={filter === "all"} className={chip(filter === "all")}>
          All
        </button>
        {present.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
            className={chip(filter === category)}
          >
            {newsCategories[category].label}
          </button>
        ))}
      </div>

      <ol className="mt-8 space-y-4">
        {shown.map((item) => (
          <li
            key={item.url + item.title}
            style={{ "--c": newsCategories[item.category].color } as CSSProperties}
            className="flex flex-col gap-5 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:p-5"
          >
            <NewsArt
              category={item.category}
              seed={item.title}
              className="aspect-[16/9] w-full shrink-0 rounded-lg border border-white/10 sm:aspect-[3/2] sm:w-56 lg:w-64"
            />
            <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <CategoryPill category={item.category} />
              <time dateTime={item.date} className="label">
                {formatNewsDate(item.date)}
              </time>
            </div>
            <h2 className="mt-3 text-lg font-semibold leading-snug sm:text-xl">{item.title}</h2>
            <p className="mt-2 text-[15px] leading-7 text-[#c1c1cf]">{item.summary}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-emerald-300 underline underline-offset-4 hover:text-foreground"
              >
                Read it at {item.source} <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              {item.learn ? (
                <Link href={item.learn.href} className="inline-flex min-h-11 items-center gap-2 text-muted hover:text-foreground">
                  Learn the idea: <span className="text-[#c1c1cf]">{item.learn.label}</span> <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

import type { Metadata } from "next";
import { NewsFeed } from "@/components/news-feed";
import { newsReviewed } from "@/content/news";
import { formatNewsDate } from "@/lib/format";
import { getNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "What’s new in AI",
  description:
    "A short, regularly reviewed digest of AI news: frontier and open model releases, new ideas and architectures, business and policy, each linked to the source and to the lesson that explains it.",
};

export default function NewsPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-6">
      <section className="border-x border-line px-6 py-16 sm:px-12 sm:py-20">
        <p className="label inline-block rounded border border-accent/40 bg-accent-dim px-2 py-1 text-accent">
          What’s new
        </p>
        <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
          AI moves fast. <span className="text-accent">Here’s what changed.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          Model releases, open weights, new ideas and business news, in short.
          Every item links to the original and, where one fits, to the lesson
          that explains the idea behind it.
        </p>
        <p className="label mt-5">
          Last reviewed {formatNewsDate(newsReviewed)} · Updated weekly
        </p>
      </section>

      <section className="border-x border-t border-line px-6 py-10 sm:px-12">
        <NewsFeed items={getNews()} />
        <p className="mt-10 max-w-2xl text-sm leading-6 text-muted">
          Summaries are ours and kept short. Dates are when the source
          published. Benchmark and capability claims come from the companies
          themselves unless a source says otherwise, so treat them as claims,
          not proof. Spotted a mistake? Use “Report a broken link or error” in
          the footer.
        </p>
      </section>
    </main>
  );
}

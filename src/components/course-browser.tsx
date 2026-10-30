"use client";

import { useState, type ReactNode } from "react";

export type CatalogItem = {
  slug: string;
  group: string;
  topic: string;
  level: string;
  searchText: string;
  card: ReactNode;
};

const groups = [
  { id: "start", title: "Start here", description: "Get comfortable with AI, then build your coding foundations." },
  { id: "build", title: "Build your skills", description: "Turn the fundamentals into useful, tested AI applications." },
  { id: "design", title: "Design & specialize", description: "Explore agent systems, production engineering, and your final capstone." },
];

const controlClass = "min-h-12 min-w-0 w-full rounded-lg border border-line bg-surface px-3 text-sm text-foreground transition-colors hover:border-muted";

export function CourseBrowser({ items }: { items: CatalogItem[] }) {
  const [group, setGroup] = useState("all");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const [level, setLevel] = useState("all");
  const topics = [...new Set(items.map((item) => item.topic))].sort();
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const filtered = items.filter((item) =>
    (group === "all" || item.group === group) &&
    (topic === "all" || item.topic === topic) &&
    (level === "all" || item.level === level) &&
    terms.every((term) => item.searchText.includes(term)),
  );
  const hasFilters = group !== "all" || query !== "" || topic !== "all" || level !== "all";

  function resetFilters() {
    setGroup("all");
    setQuery("");
    setTopic("all");
    setLevel("all");
  }

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap" role="group" aria-label="Filter by learning stage">
        {[{ id: "all", title: "All courses" }, ...groups].map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={group === option.id}
            aria-controls="course-results"
            onClick={() => setGroup(option.id)}
            className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-colors sm:min-h-11 sm:rounded-full sm:px-4 sm:text-sm ${group === option.id ? "border-accent/40 bg-accent-dim text-emerald-300" : "border-line text-[#b9b9c6] hover:border-muted hover:text-foreground"}`}
          >
            <span>{option.title}</span>
            <span className="shrink-0 text-xs opacity-70">{option.id === "all" ? items.length : items.filter((item) => item.group === option.id).length}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-[2fr_1fr_1fr]">
        <label className="col-span-2 block lg:col-span-1">
          <span className="mb-2 block text-xs font-medium text-[#b9b9c6]">Find a course</span>
          <span className="relative block">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="pointer-events-none absolute left-3 top-3.5 size-5 text-muted"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
            <input
              type="search"
              placeholder="Try agents, Python, or RAG"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-controls="course-results"
              className={`${controlClass} pl-10 placeholder:text-muted`}
            />
          </span>
        </label>
        <label>
          <span className="mb-2 block text-xs font-medium text-[#b9b9c6]">Topic</span>
          <select className={controlClass} value={topic} onChange={(event) => setTopic(event.target.value)} aria-controls="course-results">
            <option value="all">All topics</option>
            {topics.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-xs font-medium text-[#b9b9c6]">Experience level</span>
          <select className={controlClass} value={level} onChange={(event) => setLevel(event.target.value)} aria-controls="course-results">
            <option value="all">All levels</option>
            {["Beginner", "Intermediate", "Advanced", "Expert"].map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-4 flex min-h-11 items-center justify-between gap-3 border-b border-line pb-4 text-sm text-muted">
        <p role="status" aria-live="polite" aria-atomic="true">{filtered.length} of {items.length} courses</p>
        {hasFilters && <button type="button" onClick={resetFilters} className="min-h-11 text-emerald-300 underline underline-offset-4 hover:text-foreground">Clear filters</button>}
      </div>

      <div id="course-results">
        {groups.map((section) => {
          const matches = filtered.filter((item) => item.group === section.id);
          if (!matches.length) return null;
          return (
            <section key={section.id} aria-labelledby={`catalog-${section.id}`} className="mt-9">
              <div className="mb-5">
                <h3 id={`catalog-${section.id}`} className="text-xl font-semibold tracking-tight">{section.title}<span aria-hidden="true" className="ml-3 align-middle font-mono text-xs font-normal text-muted">{String(matches.length).padStart(2, "0")}</span></h3>
                <p className="mt-1.5 text-sm leading-6 text-muted">{section.description}</p>
              </div>
              <ul className="grid gap-4 md:grid-cols-2">
                {matches.map((item) => <li key={item.slug} className="min-w-0">{item.card}</li>)}
              </ul>
            </section>
          );
        })}
        {filtered.length === 0 && (
          <div className="mt-8 rounded-xl border border-dashed border-line px-6 py-12 text-center">
            <h3 className="text-xl font-semibold">No courses match just yet</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted">Try a broader search or change the topic, level, or learning stage.</p>
            <button type="button" onClick={resetFilters} className="mt-6 min-h-11 rounded-lg bg-accent px-5 text-sm font-semibold text-black hover:bg-emerald-300">Show all courses</button>
          </div>
        )}
      </div>
    </>
  );
}

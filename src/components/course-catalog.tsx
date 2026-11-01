import Link from "next/link";
import type { CSSProperties } from "react";
import { courses, formatDuration, totalMinutes } from "@/content/courses";
import { pathStages, pathFinal, pathElectives } from "@/content/path";
import { CourseIllustration, coursePalette } from "@/components/course-illustration";
import type { CatalogItem } from "@/components/course-browser";
import { catalogGroups } from "@/content/catalog-groups";

const topics: Record<string, string> = {
  "ai-foundations": "AI foundations",
  "working-with-llms": "LLMs & prompting",
  "python-and-data-essentials": "Python & data",
  "machine-learning-basics": "Python & data",
  "build-with-llm-apis": "LLMs & prompting",
  "chat-with-your-documents": "Retrieval & RAG",
  "evaluate-and-use-ai-responsibly": "Evaluation & safety",
  "ai-code-analysis": "Evaluation & safety",
  "agents-fundamentals": "Agents & systems",
  "browser-automation": "Agents & systems",
  graphrag: "Retrieval & RAG",
  "agent-memory": "Agents & systems",
  "repo-context": "Agents & systems",
  "production-agents": "Agents & systems",
  "ai-solution-designer": "Agents & systems",
  "financial-workflows": "Agents & systems",
  "synthetic-data": "Python & data",
  "meta-harness": "Agents & systems",
};

const pathItems = [
  ...pathStages.flatMap((stage) => stage.items.map((item) => ({ ...item, stage: stage.id }))),
  { ...pathFinal, stage: 4 },
  ...pathElectives.map((item) => ({ ...item, stage: 5 })),
];

// Keep illustrations and the full curriculum on the server; send the browser
// only the rendered cards and the small set of fields needed for filtering.
export function getCatalogItems(): CatalogItem[] {
  const orderedCourses = [...courses].sort((a, b) => {
    const rank = (slug: string) => {
      const index = pathItems.findIndex((item) => item.course === slug);
      return index === -1 ? pathItems.length : index;
    };
    return rank(a.slug) - rank(b.slug);
  });
  return orderedCourses.map((course) => {
    const pathItem = pathItems.find((item) => item.course === course.slug);
    const stage = pathItem?.stage ?? 5;
    const topic = topics[course.slug] ?? course.track;
    const outcome = pathItem?.after ?? course.outcomes[0] ?? course.summary;
    const label = stage <= 3 ? `Stage ${stage}` : stage === 4 ? "Capstone" : "Specialization";

    return {
      slug: course.slug,
      group: stage === 1 ? "start" : stage === 2 ? "build" : "design",
      topic,
      level: course.level,
      searchText: [course.title, course.summary, topic, outcome, ...course.lessons.map((lesson) => lesson.title)].join(" ").toLowerCase(),
      card: (
        <Link
          href={`/courses/${course.slug}`}
          aria-labelledby={`course-title-${course.slug}`}
          style={{ "--c": coursePalette(course.slug)[0], "--c2": coursePalette(course.slug)[1] } as CSSProperties}
          className="card-lift group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface text-foreground"
        >
          <div className="card-art relative overflow-hidden">
            <CourseIllustration slug={course.slug} className="aspect-[16/9] w-full" />
            <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#14141b]/85 px-2 py-0.5 font-mono text-[10px] tracking-wide text-[#e5e5ec] uppercase backdrop-blur">
              <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: "var(--c)" }} />
              {label}
            </span>
            <span className="absolute right-2.5 top-2.5 rounded-full border border-white/10 bg-[#14141b]/85 px-2 py-0.5 text-[11px] font-medium text-[#e5e5ec] backdrop-blur">
              {course.level}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-4 sm:p-5">
            <h4 id={`course-title-${course.slug}`} className="text-lg font-semibold leading-6 tracking-tight">{course.title}</h4>
            <p className="mt-2 text-sm leading-6 text-[#b9b9c6]">{outcome}</p>
            <div className="mt-auto pt-4">
              <p className="text-xs text-muted">{topic}</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-t border-line pt-3 text-xs text-[#b9b9c6] lg:flex-col lg:items-start">
                <span>{course.lessons.length} lessons <span aria-hidden="true" className="px-1 text-muted">·</span> {formatDuration(totalMinutes(course))}</span>
                <span className="inline-flex items-center gap-2 font-medium" style={{ color: "var(--c)" }}>View course <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
              </div>
            </div>
          </div>
        </Link>
      ),
    };
  });

}

export function CourseList({ items }: { items: CatalogItem[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => <li key={item.slug} className="min-w-0">{item.card}</li>)}
    </ul>
  );
}

// How many courses each group shows on the home page; the rest live on its own page.
const HOME_PER_GROUP = 4;

export function CourseCatalog() {
  const items = getCatalogItems();
  return (
    <section id="courses" aria-labelledby="catalog-title" className="light-band scroll-mt-6 px-6 py-14 sm:px-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label !text-[#4a5060]">The course library</p>
          <h2 id="catalog-title" className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Find your next step.</h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-[#4a5060]">Follow the path from the beginning, or choose the skill you need next. Every course is free and self-paced.</p>
        </div>
        <Link
          href="/library"
          className="label inline-flex min-h-11 items-center rounded border border-[#b9bfb2] px-3 !text-[#14141b] hover:border-accent hover:bg-white"
        >
          Search all {items.length} courses →
        </Link>
      </div>

      <Link href="/courses/ai-foundations" className="mt-8 flex flex-col gap-4 rounded-xl border border-emerald-700/25 bg-emerald-700/[0.06] p-5 transition-colors hover:border-emerald-700 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-sm font-semibold text-emerald-800">New to AI? Begin here.</p>
          <p className="mt-1 text-sm leading-6 text-[#4a5060]">AI Foundations for IT Professionals. No coding required.</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-3 text-sm font-semibold">Explore the first course <span aria-hidden="true" className="text-emerald-700">→</span></span>
      </Link>

      {catalogGroups.map((group) => {
        const all = items.filter((item) => item.group === group.id);
        const more = all.length - HOME_PER_GROUP;
        return (
          <section key={group.id} aria-labelledby={`catalog-${group.id}`} className="mt-12">
            <div className="mb-5">
              <h3 id={`catalog-${group.id}`} className="text-xl font-semibold tracking-tight">{group.title}<span aria-hidden="true" className="ml-3 align-middle font-mono text-xs font-normal text-[#6a6f7c]">{String(all.length).padStart(2, "0")}</span></h3>
              <p className="mt-1.5 text-sm leading-6 text-[#4a5060]">{group.description}</p>
            </div>
            <CourseList items={all.slice(0, HOME_PER_GROUP)} />
            {more > 0 && (
              <Link
                href={`/library/${group.id}`}
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#b9bfb2] bg-white px-4 text-sm font-medium text-[#14141b] transition-colors hover:border-emerald-700"
              >
                More courses <span className="text-[#6a6f7c]">· {more} more in {group.title}</span> <span aria-hidden="true" className="text-emerald-700">→</span>
              </Link>
            )}
          </section>
        );
      })}
    </section>
  );
}

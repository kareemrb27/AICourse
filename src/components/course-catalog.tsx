import Link from "next/link";
import type { CSSProperties } from "react";
import { courses, formatDuration, totalMinutes } from "@/content/courses";
import { pathStages, pathFinal, pathElectives } from "@/content/path";
import { CourseIllustration, coursePalette } from "@/components/course-illustration";
import { CourseBrowser, type CatalogItem } from "@/components/course-browser";

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

export function CourseCatalog() {
  // Keep illustrations and the full curriculum on the server; send the browser
  // only the rendered cards and the small set of fields needed for filtering.
  const orderedCourses = [...courses].sort((a, b) => {
    const rank = (slug: string) => {
      const index = pathItems.findIndex((item) => item.course === slug);
      return index === -1 ? pathItems.length : index;
    };
    return rank(a.slug) - rank(b.slug);
  });
  const items: CatalogItem[] = orderedCourses.map((course) => {
    const pathItem = pathItems.find((item) => item.course === course.slug);
    const stage = pathItem?.stage ?? 5;
    const topic = topics[course.slug] ?? course.track;
    const outcome = pathItem?.after ?? course.outcomes[0] ?? course.summary;
    const label = stage <= 3 ? `Stage ${stage} · ${pathStages[stage - 1].name}` : stage === 4 ? "Final capstone" : "Specialization";

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
          className="card-lift group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface"
        >
          <div className="card-art relative overflow-hidden">
            <CourseIllustration slug={course.slug} className="aspect-[3/2] w-full" />
            <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#14141b]/85 px-2.5 py-1 font-mono text-[11px] tracking-wide text-[#e5e5ec] uppercase backdrop-blur">
              <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: "var(--c)" }} />
              {label}
            </span>
            <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-[#14141b]/85 px-2.5 py-1 text-xs font-medium text-[#e5e5ec] backdrop-blur">
              {course.level}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <h4 id={`course-title-${course.slug}`} className="text-xl font-semibold leading-7 tracking-tight">{course.title}</h4>
            <p className="mt-3 text-sm leading-6 text-[#b9b9c6]">{outcome}</p>
            <div className="mt-auto pt-5">
              <p className="text-xs text-muted">{topic}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-xs text-[#b9b9c6]">
                <span>{course.lessons.length} lessons <span aria-hidden="true" className="px-1 text-muted">·</span> {formatDuration(totalMinutes(course))}</span>
                <span className="inline-flex items-center gap-2 font-medium" style={{ color: "var(--c)" }}>View course <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
              </div>
            </div>
          </div>
        </Link>
      ),
    };
  });

  return (
    <section id="courses" aria-labelledby="catalog-title" className="scroll-mt-6 border-x border-t border-line px-6 py-14 sm:px-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">The course library</p>
          <h2 id="catalog-title" className="mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Find your next step.</h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted">Follow the path from the beginning, or choose the skill you need next. Every course is free and self-paced.</p>
        </div>
      </div>

      <Link href="/courses/ai-foundations" className="mt-8 flex flex-col gap-4 rounded-xl border border-accent/25 bg-accent/[0.05] p-5 transition-colors hover:border-accent sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-sm font-semibold text-emerald-300">New to AI? Begin here.</p>
          <p className="mt-1 text-sm leading-6 text-[#b9b9c6]">AI Foundations for IT Professionals. No coding required.</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-3 text-sm font-semibold">Explore the first course <span aria-hidden="true" className="text-accent">→</span></span>
      </Link>

      <CourseBrowser items={items} />
    </section>
  );
}

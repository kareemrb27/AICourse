import type { Metadata } from "next";
import { PathBoard, type BoardItem } from "@/components/path-board";
import {
  formatDuration,
  getCourse,
  totalMinutes,
} from "@/content/courses";
import {
  pathElectives,
  pathFinal,
  pathStages,
  type PathItem,
} from "@/content/path";

export const metadata: Metadata = {
  title: "Learning path",
  description:
    "A free path from no AI background to AI solution designer: three stages of courses and a final capstone.",
};

function toBoardItem(item: PathItem): BoardItem {
  const course = item.course ? getCourse(item.course) : undefined;
  return {
    key: item.key,
    title: item.title,
    sub: item.sub,
    after: item.after,
    href: course ? `/courses/${course.slug}` : undefined,
    meta: course
      ? `${course.lessons.length} lessons · ${formatDuration(totalMinutes(course))}`
      : undefined,
  };
}

export default function PathPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-6">
      <section className="border-x border-line px-6 py-16 sm:px-12 sm:py-20">
        <p className="label inline-block rounded border border-accent/40 bg-accent-dim px-2 py-1 text-accent">
          Learning path
        </p>
        <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
          From curious to <span className="text-accent">AI solution designer</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          Start with no AI background. Three stages, one destination: each
          course makes you more capable of the next. Courses marked planned are
          still being written, so this path grows over time.
        </p>
      </section>
      <section className="border-x border-t border-line px-6 py-10 sm:px-12">
        <PathBoard
          stages={pathStages.map((stage) => ({
            id: stage.id,
            name: stage.name,
            level: stage.level,
            blurb: stage.blurb,
            items: stage.items.map(toBoardItem),
          }))}
          final={toBoardItem(pathFinal)}
          electives={pathElectives.map(toBoardItem)}
        />
      </section>
    </main>
  );
}

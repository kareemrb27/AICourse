"use client";

import Link from "next/link";
import { useEffect } from "react";
import { lessonKey, setLessonDone, useProgress, visitLesson } from "@/lib/progress";

type Stop = { slug: string; title: string };

export function LessonDoneBadge({ course, lesson }: { course: string; lesson: string }) {
  const { done } = useProgress();
  useEffect(() => visitLesson(course, lesson), [course, lesson]);
  if (!done.has(lessonKey(course, lesson))) return null;
  return (
    <span className="rounded-full bg-accent px-3 py-1.5 font-mono text-[#04231a]">
      ✓ Completed
    </span>
  );
}

export function LessonFooter({
  course,
  courseTitle,
  lesson,
  index,
  total,
  prev,
  next,
}: {
  course: string;
  courseTitle: string;
  lesson: Stop;
  index: number;
  total: number;
  prev?: Stop;
  next?: Stop;
}) {
  const { done } = useProgress();
  const finished = done.has(lessonKey(course, lesson.slug));
  const doneCount = [...done].filter((key) => key.startsWith(`${course}/`)).length;
  const markDone = () => setLessonDone(course, lesson.slug, true);

  return (
    <>
      <section
        aria-labelledby="lesson-complete-title"
        className="mt-14 flex flex-col gap-4 rounded-xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
      >
        <div>
          <h2 id="lesson-complete-title" className="text-lg font-semibold">
            {finished ? "Lesson complete" : "Finished this lesson?"}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {doneCount} of {total} lessons complete in this course
          </p>
        </div>
        <button
          type="button"
          aria-pressed={finished}
          onClick={() => setLessonDone(course, lesson.slug, !finished)}
          className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors ${
            finished
              ? "border-accent bg-accent-dim text-accent hover:bg-transparent"
              : "border-accent bg-accent text-black hover:bg-emerald-300"
          }`}
        >
          {finished ? "✓ Completed · Undo" : "Mark lesson complete"}
        </button>
      </section>

      <nav
        aria-label="Lesson navigation"
        className="mt-4 grid gap-4 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/courses/${course}/${prev.slug}`}
            className="flex min-h-20 flex-col justify-center rounded-lg border border-line p-4 hover:border-accent"
          >
            <span className="label">← Previous lesson</span>
            <span className="mt-1 block font-semibold">{prev.title}</span>
          </Link>
        ) : (
          <Link
            href={`/courses/${course}`}
            className="flex min-h-20 flex-col justify-center rounded-lg border border-line p-4 hover:border-accent"
          >
            <span className="label">← Back to</span>
            <span className="mt-1 block font-semibold">Course overview</span>
          </Link>
        )}
        <Link
          href={next ? `/courses/${course}/${next.slug}` : `/courses/${course}`}
          onClick={markDone}
          className="flex min-h-20 flex-col justify-center rounded-lg border border-accent/40 bg-accent-dim p-4 text-right hover:border-accent"
        >
          <span className="label !text-accent">
            {next ? `Next lesson ${index + 2} of ${total} →` : "Finish the course →"}
          </span>
          <span className="mt-1 block font-semibold">
            {next ? next.title : courseTitle}
          </span>
          {!finished ? (
            <span className="mt-1 block text-xs text-muted">Marks this lesson complete</span>
          ) : null}
        </Link>
      </nav>
    </>
  );
}

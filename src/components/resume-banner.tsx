"use client";

import Link from "next/link";
import { lessonKey, useProgress } from "@/lib/progress";

type CatalogCourse = {
  slug: string;
  title: string;
  lessons: { slug: string; title: string }[];
};

// Shown only to someone who has already opened a lesson in this browser.
export function ResumeBanner({ catalog }: { catalog: CatalogCourse[] }) {
  const { done, last, recent } = useProgress();
  const slug = recent?.split("/")[0];
  const course = catalog.find((item) => item.slug === slug);
  if (!course) return null;

  const lessonSlug = last[course.slug];
  const index = course.lessons.findIndex((lesson) => lesson.slug === lessonSlug);
  if (index < 0) return null;

  const doneCount = course.lessons.filter((l) => done.has(lessonKey(course.slug, l.slug))).length;
  const lesson = course.lessons[index];

  return (
    <section
      aria-labelledby="resume-title"
      className="border-x border-t border-line px-6 py-6 sm:px-12"
    >
      <div className="flex flex-col gap-4 rounded-xl border border-accent/25 bg-accent/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="min-w-0">
          <p id="resume-title" className="label !text-accent">
            Continue learning
          </p>
          <p className="mt-2 truncate text-lg font-semibold">{course.title}</p>
          <p className="mt-1 text-sm text-muted">
            Lesson {index + 1}: {lesson.title} · {doneCount} of {course.lessons.length} complete
          </p>
        </div>
        <Link
          href={`/courses/${course.slug}/${lesson.slug}`}
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-300"
        >
          Resume <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

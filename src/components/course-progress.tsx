"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { formatDuration } from "@/lib/format";
import { lessonKey, useProgress, useResume, type CourseLesson } from "@/lib/progress";

function ResumeLink({ course, lessons, className }: { course: string; lessons: CourseLesson[]; className: string }) {
  const resume = useResume(course, lessons);
  if (!resume.lesson) return null;
  const label = resume.allDone
    ? "Review the course"
    : resume.started
      ? `Continue lesson ${resume.index + 1}`
      : "Start lesson 1";
  return (
    <Link href={`/courses/${course}/${resume.lesson.slug}`} className={className}>
      {label} <span aria-hidden="true">→</span>
    </Link>
  );
}

function ResumeNote({ course, lessons }: { course: string; lessons: CourseLesson[] }) {
  const resume = useResume(course, lessons);
  if (!resume.lesson) return null;
  return (
    <>
      {resume.allDone
        ? "You finished every lesson. Revisit any of them from the syllabus."
        : resume.started
          ? "Up next: "
          : "Begin with "}
      {resume.allDone ? null : (
        <>
          <span className="text-[#c1c1cf]">{resume.lesson.title}</span> ·{" "}
          {formatDuration(resume.lesson.minutes)}
        </>
      )}
    </>
  );
}

// Primary button and progress under the course summary.
export function CourseStart({
  course,
  lessons,
  children,
}: {
  course: string;
  lessons: CourseLesson[];
  children?: ReactNode;
}) {
  const resume = useResume(course, lessons);
  return (
    <>
      <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
        <ResumeLink
          course={course}
          lessons={lessons}
          className="inline-flex min-h-12 items-center justify-center gap-4 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-300"
        />
        {children}
      </div>
      {resume.doneCount > 0 ? (
        <div className="mt-5 max-w-sm">
          <p className="text-sm text-muted">
            {resume.doneCount} of {lessons.length} lessons complete
          </p>
          <div aria-hidden className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
            <div
              className="h-full bg-accent transition-[width]"
              style={{ width: `${(resume.doneCount / lessons.length) * 100}%` }}
            />
          </div>
        </div>
      ) : null}
      <p className="mt-4 text-sm leading-6 text-muted">
        <ResumeNote course={course} lessons={lessons} />
      </p>
    </>
  );
}

// Closing call to action at the bottom of the course page.
export function CourseNextStep({ course, lessons }: { course: string; lessons: CourseLesson[] }) {
  const resume = useResume(course, lessons);
  return (
    <section
      aria-labelledby="start-title"
      className="mt-12 flex flex-col gap-5 rounded-xl border border-accent/25 bg-accent/[0.05] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
    >
      <div>
        <h2 id="start-title" className="text-xl font-semibold">
          {resume.allDone
            ? "You have finished this course."
            : resume.started
              ? "Pick up where you left off."
              : "Your next step starts here."}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          <ResumeNote course={course} lessons={lessons} />
        </p>
      </div>
      <ResumeLink
        course={course}
        lessons={lessons}
        className="inline-flex min-h-12 shrink-0 items-center justify-center gap-4 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-black hover:bg-emerald-300"
      />
    </section>
  );
}

// The numbered badge in the syllabus, which turns into a check once done.
export function SyllabusNumber({
  course,
  lesson,
  number,
  project,
}: {
  course: string;
  lesson: string;
  number: string;
  project: boolean;
}) {
  const { done } = useProgress();
  const finished = done.has(lessonKey(course, lesson));
  return (
    <span
      aria-hidden="true"
      className={`flex size-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs sm:size-9 ${
        finished || project ? "bg-accent text-black" : "border border-line text-muted"
      }`}
    >
      {finished ? "✓" : number}
    </span>
  );
}

export function SyllabusDone({ course, lesson }: { course: string; lesson: string }) {
  const { done } = useProgress();
  return done.has(lessonKey(course, lesson)) ? (
    <span className="text-accent">Completed</span>
  ) : null;
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { courses, formatDuration, getCourse } from "@/content/courses";
import { reportIssueUrl } from "@/lib/site";

export function generateStaticParams() {
  return courses.flatMap((c) =>
    c.lessons.map((l) => ({ course: c.slug, lesson: l.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/courses/[course]/[lesson]">): Promise<Metadata> {
  const { course: cs, lesson: ls } = await params;
  const course = getCourse(cs);
  const lesson = course?.lessons.find((l) => l.slug === ls);
  return {
    title: lesson && course ? `${lesson.title} · ${course.title}` : "Lesson",
    description: lesson?.summary,
  };
}

export default function LessonPage(
  props: PageProps<"/courses/[course]/[lesson]">,
) {
  return (
    <Suspense fallback={<main id="main" className="mx-auto max-w-3xl px-6 py-14" />}>
      <LessonContent params={props.params} />
    </Suspense>
  );
}

async function LessonContent({
  params,
}: {
  params: PageProps<"/courses/[course]/[lesson]">["params"];
}) {
  const { course: cs, lesson: ls } = await params;
  const course = getCourse(cs);
  const index = course?.lessons.findIndex((l) => l.slug === ls) ?? -1;
  if (!course || index === -1) notFound();

  const lesson = course.lessons[index];
  const prev = course.lessons[index - 1];
  const next = course.lessons[index + 1];
  const { default: Content } = await lesson.load();

  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-14">
      <Link
        href={`/courses/${course.slug}`}
        className="label inline-flex min-h-11 items-center hover:text-foreground"
      >
        ← {course.title}
      </Link>
      <p className="label mt-8 text-accent">
        Lesson {index + 1} of {course.lessons.length} ·{" "}
        {formatDuration(lesson.minutes)}
      </p>
      <h1 className="mt-3 text-5xl font-extrabold leading-tight tracking-[-0.03em]">
        {lesson.title}
      </h1>

      <article className="prose-lesson mt-10">
        <Content />
      </article>

      <p className="mt-10 text-sm text-muted">
        Found a broken link or a mistake?{" "}
        <a
          href={reportIssueUrl(`Problem in "${lesson.title}" (${course.title})`)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-4"
        >
          Report it
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>

      <nav
        aria-label="Lesson navigation"
        className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/courses/${course.slug}/${prev.slug}`}
            className="rounded-lg border border-line p-4 hover:border-accent"
          >
            <span className="label">← Previous</span>
            <span className="mt-1 block font-semibold">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/courses/${course.slug}/${next.slug}`}
            className="rounded-lg border border-line p-4 text-right hover:border-accent"
          >
            <span className="label">Next →</span>
            <span className="mt-1 block font-semibold">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}

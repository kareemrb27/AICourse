import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseCover } from "@/components/course-cover";
import { CourseShell } from "@/components/course-shell";
import { LessonDoneBadge, LessonFooter } from "@/components/lesson-footer";
import { courses, formatDuration, getCourse } from "@/content/courses";
import { lessonContent } from "@/content/lesson-content";
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

// Every lesson is known at build time, so each page is fully prerendered with
// its text in the HTML. Skipping the instant-navigation check avoids wrapping
// the lesson in a Suspense boundary, which would stream long lessons in later.
export const instant = false;

export default async function LessonPage({
  params,
}: PageProps<"/courses/[course]/[lesson]">) {
  const { course: cs, lesson: ls } = await params;
  const course = getCourse(cs);
  const index = course?.lessons.findIndex((l) => l.slug === ls) ?? -1;
  if (!course || index === -1) notFound();

  const lesson = course.lessons[index];
  const prev = course.lessons[index - 1];
  const next = course.lessons[index + 1];
  const Content = lessonContent[`${course.slug}/${lesson.slug}`];
  if (!Content) notFound();

  return (
    <CourseShell course={course} active={lesson.slug}>
      <CourseCover
        compact
        slug={course.slug}
        eyebrow={`Lesson ${index + 1} of ${course.lessons.length}`}
        title={course.title}
      />
      <header className="mt-6 border-b border-line pb-8 sm:pb-10">
        <Link
          href={`/courses/${course.slug}`}
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-foreground"
        >
          ← {course.title}
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs sm:mt-8">
          <span className="rounded-full border border-accent/25 bg-accent-dim px-3 py-1.5 font-mono text-[#6ee7b7]">
            Lesson {index + 1} of {course.lessons.length}
          </span>
          <LessonDoneBadge course={course.slug} lesson={lesson.slug} />
          <span className="text-muted">
            {formatDuration(lesson.minutes)} · Estimated study time
          </span>
        </div>
        <h1 className="mt-5 text-3xl font-bold leading-[1.15] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
          {lesson.title}
        </h1>
        <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {lesson.summary}
        </p>
      </header>

      <article className="prose-lesson mt-8 sm:mt-10">
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

      <LessonFooter
        course={course.slug}
        courseTitle={course.title}
        lesson={{ slug: lesson.slug, title: lesson.title }}
        index={index}
        total={course.lessons.length}
        prev={prev && { slug: prev.slug, title: prev.title }}
        next={next && { slug: next.slug, title: next.title }}
      />
    </CourseShell>
  );
}

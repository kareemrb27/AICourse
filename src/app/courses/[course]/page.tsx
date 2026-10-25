import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  courses,
  formatDuration,
  getCourse,
  totalMinutes,
} from "@/content/courses";

export function generateStaticParams() {
  return courses.map((c) => ({ course: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/courses/[course]">): Promise<Metadata> {
  const { course: slug } = await params;
  const course = getCourse(slug);
  return { title: course?.title ?? "Course" };
}

export default async function CoursePage({
  params,
}: PageProps<"/courses/[course]">) {
  const { course: slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="label">
        {course.track} · <span className="text-accent">{course.level}</span>
      </p>
      <h1 className="mt-3 text-5xl font-extrabold leading-tight tracking-[-0.03em]">
        {course.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
        {course.summary}
      </p>
      <p className="label mt-6">
        {course.lessons.length} lessons · {formatDuration(totalMinutes(course))}
        {" "}· Free
      </p>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <section>
          <h2 className="label text-accent">You will learn to</h2>
          <ul className="mt-4 space-y-3 text-[15px] leading-7">
            {course.outcomes.map((o) => (
              <li key={o} className="flex gap-3">
                <span className="text-accent">▸</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="label text-accent">Before you start</h2>
          <ul className="mt-4 space-y-3 text-[15px] leading-7">
            {course.prerequisites.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="text-muted">·</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-16">
        <h2 className="label">Syllabus</h2>
        <ol className="mt-4 divide-y divide-line rounded-lg border border-line">
          {course.lessons.map((lesson, i) => (
            <li key={lesson.slug}>
              <Link
                href={`/courses/${course.slug}/${lesson.slug}`}
                className="flex items-center gap-5 p-5 transition-colors hover:bg-surface"
              >
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">{lesson.title}</span>
                  <span className="block text-sm text-muted">
                    {lesson.summary}
                  </span>
                </span>
                <span className="label">{formatDuration(lesson.minutes)}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

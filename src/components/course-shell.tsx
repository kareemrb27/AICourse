import Link from "next/link";
import type { ReactNode } from "react";
import { formatDuration, type Course } from "@/content/courses";

function CourseMenu({
  course,
  active,
}: {
  course: Course;
  active: string | null;
}) {
  const items = [
    { href: `/courses/${course.slug}`, label: "Overview", slug: null },
    ...course.lessons.map((lesson, i) => ({
      href: `/courses/${course.slug}/${lesson.slug}`,
      label: lesson.title,
      slug: lesson.slug,
      number: String(i + 1).padStart(2, "0"),
      minutes: lesson.minutes,
    })),
  ];

  return (
    <ol className="space-y-0.5">
      {items.map((item) => {
        const current = item.slug === active;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={`flex min-h-11 items-start gap-3 rounded border-l-2 px-3 py-2.5 text-[14px] leading-5 transition-colors ${
                current
                  ? "border-accent bg-accent-dim font-semibold text-foreground"
                  : "border-transparent text-muted hover:bg-surface hover:text-foreground"
              }`}
            >
              <span
                className={`w-5 shrink-0 font-mono text-xs leading-5 ${
                  current ? "text-accent" : ""
                }`}
              >
                {"number" in item ? item.number : "·"}
              </span>
              <span className="flex-1">
                {item.label}
                {"minutes" in item ? (
                  <span className="label mt-0.5 block !text-[11px]">
                    {formatDuration(item.minutes)}
                  </span>
                ) : null}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

// Left menu of course sections: a sticky sidebar on wide screens and a
// collapsible list above the content on small ones. `active` is the lesson
// slug, or null on the course overview.
export function CourseShell({
  course,
  active,
  children,
}: {
  course: Course;
  active: string | null;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12 lg:py-14">
      <nav
        aria-label="Course contents"
        className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-y-auto"
      >
        <div className="hidden lg:block">
          <p className="label">Course contents</p>
          <Link
            href={`/courses/${course.slug}`}
            className="mt-2 block text-[15px] font-semibold leading-snug hover:text-accent"
          >
            {course.title}
          </Link>
          <div className="mt-4">
            <CourseMenu course={course} active={active} />
          </div>
        </div>
        {/* Keyed by lesson so it closes again after navigating. */}
        <details
          key={active ?? "overview"}
          className="group rounded-lg border border-line bg-surface lg:hidden"
        >
          <summary className="label flex min-h-11 cursor-pointer list-none items-center justify-between px-4 text-foreground">
            <span>Course contents</span>
            <span aria-hidden className="transition-transform group-open:rotate-180">
              ▾
            </span>
          </summary>
          <div className="border-t border-line p-2">
            <CourseMenu course={course} active={active} />
          </div>
        </details>
      </nav>
      <main id="main" className="mt-8 min-w-0 max-w-3xl lg:mt-0">
        {children}
      </main>
    </div>
  );
}

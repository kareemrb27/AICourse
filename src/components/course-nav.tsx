"use client";

import Link from "next/link";
import { formatDuration } from "@/lib/format";
import { lessonKey, useProgress, type CourseLesson } from "@/lib/progress";

type Props = {
  slug: string;
  title: string;
  lessons: CourseLesson[];
  active: string | null;
};

function Menu({ slug, lessons, active }: Omit<Props, "title">) {
  const { done } = useProgress();
  const items = [
    { href: `/courses/${slug}`, label: "Overview", lesson: null },
    ...lessons.map((lesson, i) => ({
      href: `/courses/${slug}/${lesson.slug}`,
      label: lesson.title,
      lesson,
      number: String(i + 1).padStart(2, "0"),
    })),
  ];

  return (
    <ol className="space-y-0.5">
      {items.map((item) => {
        const current = (item.lesson?.slug ?? null) === active;
        const finished = item.lesson ? done.has(lessonKey(slug, item.lesson.slug)) : false;
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
                aria-hidden
                className={`flex size-5 shrink-0 items-center justify-center font-mono text-xs leading-5 ${
                  finished
                    ? "rounded-full bg-accent text-[#04231a]"
                    : current
                      ? "text-accent"
                      : ""
                }`}
              >
                {finished ? "✓" : "number" in item ? item.number : "·"}
              </span>
              <span className="flex-1">
                {item.label}
                {finished ? <span className="sr-only"> (completed)</span> : null}
                {item.lesson ? (
                  <span
                    className={`label mt-0.5 block !text-[11px] ${current ? "!text-accent" : ""}`}
                  >
                    {current ? "You are here · " : ""}
                    {formatDuration(item.lesson.minutes)}
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

function Count({ slug, lessons }: { slug: string; lessons: CourseLesson[] }) {
  const { done } = useProgress();
  const count = lessons.filter((l) => done.has(lessonKey(slug, l.slug))).length;
  return (
    <>
      <span className="label">
        {count} of {lessons.length} complete
      </span>
      <span
        aria-hidden
        className="mt-1.5 block h-1 overflow-hidden rounded-full bg-line"
      >
        <span
          className="block h-full bg-accent transition-[width]"
          style={{ width: `${(count / lessons.length) * 100}%` }}
        />
      </span>
    </>
  );
}

// Left menu of course sections: a sticky sidebar on wide screens and a
// collapsible list above the content on small ones. `active` is the lesson
// slug, or null on the course overview.
export function CourseNav({ slug, title, lessons, active }: Props) {
  const position = lessons.findIndex((lesson) => lesson.slug === active);
  return (
    <nav
      aria-label="Course contents"
      className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-y-auto"
    >
      <div className="hidden lg:block">
        <p className="label">Course contents</p>
        <Link
          href={`/courses/${slug}`}
          className="mt-2 block text-[15px] font-semibold leading-snug hover:text-accent"
        >
          {title}
        </Link>
        <div className="mt-3">
          <Count slug={slug} lessons={lessons} />
        </div>
        <div className="mt-4">
          <Menu slug={slug} lessons={lessons} active={active} />
        </div>
      </div>
      {/* Keyed by lesson so it closes again after navigating. */}
      <details
        key={active ?? "overview"}
        className="group rounded-lg border border-line bg-surface lg:hidden"
      >
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-2">
          <span className="min-w-0">
            <span className="label block text-foreground">
              {position >= 0
                ? `Lesson ${position + 1} of ${lessons.length}`
                : "Course contents"}
            </span>
            <span className="mt-0.5 block truncate text-xs text-muted">
              {position >= 0 ? lessons[position].title : title}
            </span>
          </span>
          <span aria-hidden className="text-muted transition-transform group-open:rotate-180">
            ▾
          </span>
        </summary>
        <div className="border-t border-line px-4 pt-3">
          <Count slug={slug} lessons={lessons} />
        </div>
        <div className="p-2">
          <Menu slug={slug} lessons={lessons} active={active} />
        </div>
      </details>
    </nav>
  );
}

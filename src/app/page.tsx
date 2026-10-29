import Link from "next/link";
import { CourseThumb } from "@/components/course-thumb";
import { courses, formatDuration, totalMinutes } from "@/content/courses";
import { pathStages } from "@/content/path";

const steps = [
  ...pathStages.map((stage) => ({
    key: `stage-${stage.id}`,
    level: stage.level,
    name: stage.name,
    count: stage.items.length,
  })),
  { key: "final-course", level: "Solution designer", name: "Final course", count: 1 },
];

export default function Home() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-6">
      <section className="border-x border-line px-6 py-20 sm:px-12 sm:py-28">
        <p className="label inline-block rounded border border-accent/40 bg-accent-dim px-2 py-1 text-accent">
          Free · Open · No signup
        </p>
        <h1 className="mt-8 text-6xl font-extrabold leading-none tracking-[-0.03em] sm:text-8xl">
          AI<span className="text-accent">|</span>Course
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-muted">
          Paid conferences and bootcamps teach the topics that matter for AI
          engineers. The knowledge itself is scattered across free videos,
          docs, papers and tutorials. We assemble it into structured courses
          you can finish in order, for free.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/path"
            className="rounded bg-accent px-5 py-3 font-mono text-sm font-semibold tracking-wide text-black"
          >
            START THE LEARNING PATH
          </Link>
          <Link
            href="#courses"
            className="rounded border border-line px-5 py-3 font-mono text-sm tracking-wide hover:border-accent"
          >
            BROWSE COURSES
          </Link>
          <Link
            href="/about"
            className="rounded border border-line px-5 py-3 font-mono text-sm tracking-wide hover:border-accent"
          >
            HOW IT WORKS
          </Link>
        </div>
      </section>

      <section className="border-x border-t border-line px-6 py-12 sm:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label">Learning path</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
              From curious to <span className="text-accent">AI solution designer</span>
            </h2>
          </div>
          <Link
            href="/path"
            className="label inline-flex min-h-11 items-center rounded border border-line px-3 text-foreground hover:border-accent"
          >
            See the full path →
          </Link>
        </div>
        <ol
          aria-label="Learning levels"
          className="relative mt-8 grid grid-cols-4"
        >
          <span
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-[17px] h-0.5 bg-line"
          />
          {steps.map((step, index) => (
            <li key={step.key} className="relative px-1 text-center">
              <Link
                href={`/path#${step.key}`}
                className="group block rounded py-1 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <span className="relative mx-auto mb-2 flex size-9 items-center justify-center rounded-full border-2 border-accent bg-surface font-mono text-sm font-semibold text-accent transition-colors group-hover:bg-accent group-hover:text-[#04231a]">
                  {index + 1}
                </span>
                <span className="block text-xs font-semibold group-hover:text-accent sm:text-[15px]">
                  {step.level}
                </span>
                <span className="label mt-0.5 hidden !text-[11px] sm:block">
                  {step.name} · {step.count} {step.count === 1 ? "course" : "courses"}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="courses"
        className="border-x border-t border-line px-6 py-16 sm:px-12"
      >
        <p className="label">Courses</p>
        <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em]">
          Learn one topic at a time
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-accent"
            >
              <CourseThumb
                slug={course.slug}
                className="aspect-[3/2] w-full transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="label flex justify-between">
                  <span>{course.track}</span>
                  <span className="text-accent">{course.level}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  {course.title}
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-muted">
                  {course.summary}
                </p>
                <div className="label mt-auto flex justify-between pt-6">
                  <span>{course.lessons.length} lessons</span>
                  <span>{formatDuration(totalMinutes(course))}</span>
                </div>
              </div>
            </Link>
          ))}
          <div className="flex items-center justify-center rounded-lg border border-dashed border-line p-6 text-center">
            <p className="label leading-6">More courses coming,
              <br />
              one topic at a time</p>
          </div>
        </div>
      </section>
    </main>
  );
}

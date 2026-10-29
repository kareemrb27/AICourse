import Link from "next/link";
import { CourseThumb } from "@/components/course-thumb";
import { courses, formatDuration, totalMinutes } from "@/content/courses";

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

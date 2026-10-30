import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseNextStep, CourseStart, SyllabusDone, SyllabusNumber } from "@/components/course-progress";
import { CourseCover } from "@/components/course-cover";
import { CourseArtwork } from "@/components/course-thumb";
import { pathStages, pathFinal } from "@/content/path";
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
  return {
    title: course?.title ?? "Course",
    description: course?.summary,
  };
}

// All courses are known at build time; see the lesson page for why this is not
// wrapped in Suspense.
export const instant = false;

export default async function CoursePage({
  params,
}: PageProps<"/courses/[course]">) {
  const { course: slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const project = course.lessons.find((lesson) => lesson.slug === "capstone");
  const stage = pathStages.find((item) => item.items.some((item) => item.course === course.slug));
  const isFinalCourse = pathFinal.course === course.slug;
  const pathLabel = stage ? `Stage ${stage.id} · ${stage.name}` : isFinalCourse ? "Final course · Solution designer" : "Specialization";
  const pathHref = stage ? `/path#stage-${stage.id}` : isFinalCourse ? "/path#final-course" : "/path#electives";
  const projectName = project?.title.replace(/^Capstone(?: project)?:?\s*/i, "");
  const projectTitle = projectName ? projectName.charAt(0).toUpperCase() + projectName.slice(1) : "Put your skills into practice";
  const lessonStops = course.lessons.map(({ slug, title, minutes }) => ({ slug, title, minutes }));

  return (
    <main id="main" className="mx-auto max-w-6xl px-6 pb-16">
      <nav aria-label="Breadcrumb" className="flex min-h-20 flex-wrap items-center gap-3 text-sm text-muted sm:min-h-24">
        <Link href="/#courses" className="inline-flex min-h-11 items-center gap-2 hover:text-foreground"><span aria-hidden="true">←</span> Course library</Link>
        <span aria-hidden="true" className="text-line">/</span>
        <span aria-current="page">Course overview</span>
      </nav>

      <div className="mb-8 lg:mb-10">
        <CourseCover slug={course.slug} eyebrow={pathLabel}>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#b9b9c6] sm:text-base">
            {course.lessons.length} lessons, {formatDuration(totalMinutes(course))} of guided study, free.
          </p>
        </CourseCover>
      </div>

      <section aria-labelledby="course-title" className="grid items-start gap-8 border-b border-line pb-10 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-12 lg:pb-12">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={pathHref} className="inline-flex min-h-8 items-center font-mono text-xs tracking-wide text-muted hover:text-foreground">{pathLabel}</Link>
            <span className="rounded-full border border-accent/25 bg-accent-dim px-2.5 py-1 text-xs font-medium text-emerald-300">{course.level}</span>
          </div>
          <h1 id="course-title" className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-5xl">{course.title}</h1>
          <p className="mt-5 text-base leading-7 text-[#b9b9c6] sm:text-lg sm:leading-8">{course.summary}</p>

          <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4 border-y border-line py-4">
            <div><dt className="text-xs text-muted">Curriculum</dt><dd className="mt-1 text-sm font-semibold">{course.lessons.length} lessons</dd></div>
            <div><dt className="text-xs text-muted">Estimated time</dt><dd className="mt-1 text-sm font-semibold">{formatDuration(totalMinutes(course))}</dd></div>
            <div><dt className="text-xs text-muted">Course access</dt><dd className="mt-1 text-sm font-semibold text-emerald-300">Free · No signup</dd></div>
          </dl>

          <CourseStart course={course.slug} lessons={lessonStops}>
            <a href="#syllabus" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-accent">Explore the syllabus <span aria-hidden="true">↓</span></a>
          </CourseStart>
        </div>

        {project && (
          <aside aria-labelledby="project-title" className="relative overflow-hidden rounded-2xl border border-accent/25 bg-surface p-6 sm:p-7 lg:mt-1">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-accent/[0.07] blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs tracking-wide text-emerald-300 uppercase">The final project</span>
                <span className="text-xs text-muted">Included</span>
              </div>
              <CourseArtwork slug={course.slug} className="mt-6" />
              <h2 id="project-title" className="mt-6 text-2xl font-semibold leading-8 tracking-tight">{projectTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-[#b9b9c6]">{project.summary}</p>
              <Link href={`/courses/${course.slug}/${project.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-emerald-300 hover:text-foreground">Preview the project <span aria-hidden="true">→</span></Link>
              <p className="mt-2 border-t border-line pt-4 text-xs leading-5 text-muted">{formatDuration(project.minutes)} project · Included in the course time</p>
            </div>
          </aside>
        )}
      </section>

      <div className="grid items-start gap-10 pt-10 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-12 lg:pt-12">
        <section aria-labelledby="outcomes-title">
          <p className="label">The outcomes</p>
          <h2 id="outcomes-title" className="mt-2 text-2xl font-bold tracking-tight">What you’ll be able to do</h2>
          <ul className="mt-6 space-y-4">
            {course.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-3 text-[15px] leading-7 text-[#d6d6de]">
                <span aria-hidden="true" className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-dim text-xs text-emerald-300">✓</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        <aside aria-labelledby="prerequisites-title" className="rounded-xl border border-line bg-surface p-6">
          <h2 id="prerequisites-title" className="text-lg font-semibold">Before you start</h2>
          <p className="mt-2 text-sm leading-6 text-muted">A quick check that you’re ready for this course.</p>
          <ul className="mt-5 space-y-4">
            {course.prerequisites.map((prerequisite) => (
              <li key={prerequisite} className="flex gap-3 text-sm leading-6 text-[#c1c1cf]">
                <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                <span>{prerequisite}</span>
              </li>
            ))}
          </ul>
        </aside>

        <section id="syllabus" aria-labelledby="syllabus-title" className="scroll-mt-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><p className="label">Your course plan</p><h2 id="syllabus-title" className="mt-2 text-2xl font-bold tracking-tight">One lesson at a time</h2></div>
            <span className="text-sm text-muted">{course.lessons.length} lessons · {formatDuration(totalMinutes(course))}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">Work through the lessons in order, then put it all together in the final project.</p>
          <ol className="mt-6 space-y-3">
            {course.lessons.map((lesson, index) => {
              const isProject = lesson.slug === project?.slug;
              return (
                <li key={lesson.slug}>
                  <Link href={`/courses/${course.slug}/${lesson.slug}`} aria-labelledby={`lesson-title-${lesson.slug}`} className={`group flex items-start gap-3 rounded-xl border p-4 transition-colors hover:border-accent/60 sm:gap-4 sm:p-5 ${isProject ? "border-accent/30 bg-accent/[0.05]" : "border-line bg-surface"}`}>
                    <SyllabusNumber course={course.slug} lesson={lesson.slug} number={String(index + 1).padStart(2, "0")} project={isProject} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-muted"><span>{isProject ? "Final project" : `Lesson ${index + 1}`}</span><span>{formatDuration(lesson.minutes)} <SyllabusDone course={course.slug} lesson={lesson.slug} /></span></div>
                      <h3 id={`lesson-title-${lesson.slug}`} className="mt-2 font-semibold leading-6 group-hover:text-emerald-300">{lesson.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-muted">{lesson.summary}</p>
                    </div>
                    <span aria-hidden="true" className="mt-1 hidden text-muted group-hover:text-accent sm:block">→</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-8">
          <section aria-labelledby="learning-format-title" className="rounded-xl border border-line p-6">
            <h2 id="learning-format-title" className="text-lg font-semibold">Learn at your own pace</h2>
            <ol className="mt-5 space-y-5">
              {[
                { title: "Understand", detail: "Read the explanations and explore curated videos, docs, and tutorials." },
                { title: "Try it yourself", detail: "Work through the exercises and check your understanding as you go." },
                { title: "Bring it together", detail: "Apply what you’ve learned in the final project." },
              ].map((step, index) => <li key={step.title} className="flex gap-3"><span aria-hidden="true" className="mt-0.5 font-mono text-xs text-accent">0{index + 1}</span><div><h3 className="text-sm font-semibold">{step.title}</h3><p className="mt-1 text-sm leading-6 text-muted">{step.detail}</p></div></li>)}
            </ol>
          </section>
          <section aria-labelledby="path-title" className="rounded-xl border border-line p-6">
            <p className="font-mono text-xs text-emerald-300">{pathLabel}</p>
            <h2 id="path-title" className="mt-3 text-lg font-semibold">Part of a bigger journey</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{stage ? stage.blurb : isFinalCourse ? "Bring your learning together in a complete AI solution design." : "Explore a focused topic after building your foundations."}</p>
            <Link href={pathHref} className="mt-4 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-emerald-300 hover:text-foreground">See the learning path <span aria-hidden="true">→</span></Link>
          </section>
        </aside>
      </div>

      <CourseNextStep course={course.slug} lessons={lessonStops} />
    </main>
  );
}

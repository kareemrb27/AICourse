import type { ReactNode } from "react";
import { CourseNav } from "@/components/course-nav";
import type { Course } from "@/content/courses";

// Left menu of course sections plus the lesson column. `active` is the lesson
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
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14 lg:py-12">
      <CourseNav
        slug={course.slug}
        title={course.title}
        lessons={course.lessons.map(({ slug, title, minutes }) => ({ slug, title, minutes }))}
        active={active}
      />
      <main id="main" className="mx-auto mt-8 w-full min-w-0 max-w-[46rem] lg:mt-0">
        {children}
      </main>
    </div>
  );
}

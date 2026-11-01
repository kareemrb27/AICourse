import type { Metadata } from "next";
import { CourseBrowser } from "@/components/course-browser";
import { getCatalogItems } from "@/components/course-catalog";

export const metadata: Metadata = {
  title: "All courses",
  description: "Search and filter every free AI course by stage, topic and experience level.",
};

export default function LibraryPage() {
  const items = getCatalogItems();
  return (
    <main id="main" className="mx-auto max-w-6xl px-6">
      <section className="border-x border-line px-6 py-14 sm:px-12 sm:py-16">
        <p className="label">The course library</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
          All {items.length} courses.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">
          Search by topic, filter by stage or experience level, and pick the next step.
          Every course is free and self-paced.
        </p>
        <CourseBrowser items={items} />
      </section>
    </main>
  );
}

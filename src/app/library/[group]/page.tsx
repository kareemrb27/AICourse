import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseList, getCatalogItems } from "@/components/course-catalog";
import { catalogGroups } from "@/content/catalog-groups";

export function generateStaticParams() {
  return catalogGroups.map((group) => ({ group: group.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/library/[group]">): Promise<Metadata> {
  const { group: id } = await params;
  const group = catalogGroups.find((g) => g.id === id);
  return {
    title: group ? `${group.title} courses` : "Courses",
    description: group?.description,
  };
}

// Every group is known at build time, like the course pages.
export const instant = false;

export default async function LibraryGroupPage({
  params,
}: PageProps<"/library/[group]">) {
  const { group: id } = await params;
  const group = catalogGroups.find((g) => g.id === id);
  if (!group) notFound();

  const items = getCatalogItems().filter((item) => item.group === group.id);
  const others = catalogGroups.filter((g) => g.id !== group.id);

  return (
    <main id="main" className="mx-auto max-w-6xl px-6">
      <section className="border-x border-line px-6 py-14 sm:px-12 sm:py-16">
        <Link href="/#courses" className="label inline-flex min-h-11 items-center gap-2 hover:text-foreground">
          <span aria-hidden="true">←</span> Course library
        </Link>
        <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
          {group.title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">
          {group.description} {items.length} courses, all free and self-paced.
        </p>

        <div className="mt-10">
          <CourseList items={items} />
        </div>

        <nav aria-label="Other course groups" className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-6 text-sm">
          <span className="text-muted">Also see:</span>
          {others.map((other) => (
            <Link
              key={other.id}
              href={`/library/${other.id}`}
              className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-[#b9b9c6] transition-colors hover:border-accent hover:text-foreground"
            >
              {other.title}
            </Link>
          ))}
          <Link href="/library" className="inline-flex min-h-11 items-center px-2 text-emerald-300 underline underline-offset-4 hover:text-foreground">
            Search all courses
          </Link>
        </nav>
      </section>
    </main>
  );
}

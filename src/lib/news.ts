import { courses } from "@/content/courses";
import { news, type NewsCategory, type NewsItem } from "@/content/news";

export type NewsEntry = Omit<NewsItem, "learn"> & {
  learn?: { href: string; label: string };
};

// Newest first, with each "learn the concept" pointer resolved to a real lesson.
// A pointer to a lesson that no longer exists fails the build, so it cannot
// ship as a dead link.
export function getNews(): NewsEntry[] {
  return [...news]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ learn, ...item }) => {
      if (!learn) return item;
      const course = courses.find((c) => c.slug === learn.course);
      const lesson = course?.lessons.find((l) => l.slug === learn.lesson);
      if (!course || !lesson) {
        throw new Error(`News item "${item.title}" points at a missing lesson: ${learn.course}/${learn.lesson}`);
      }
      return { ...item, learn: { href: `/courses/${course.slug}/${lesson.slug}`, label: lesson.title } };
    });
}

// The newest item from each of a few categories, so the home page shows a mix
// instead of four items on the same topic.
export function getNewsTeaser(
  entries: NewsEntry[],
  categories: NewsCategory[] = ["models", "open", "ideas", "business"],
): NewsEntry[] {
  return categories.flatMap((category) => {
    const found = entries.find((entry) => entry.category === category);
    return found ? [found] : [];
  });
}

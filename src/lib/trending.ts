import { courses } from "@/content/courses";
import { trendingTopics, type TrendingTopic } from "@/content/trending";

export type TrendingEntry = Omit<TrendingTopic, "learn"> & {
  learn: { href: string; label: string }[];
};

// Resolves each lesson pointer to a real lesson; a missing one fails the build
// instead of shipping a dead link.
export function getTrending(): TrendingEntry[] {
  return trendingTopics.map(({ learn, ...topic }) => ({
    ...topic,
    learn: learn.map(({ course: courseSlug, lesson: lessonSlug }) => {
      const course = courses.find((c) => c.slug === courseSlug);
      const lesson = course?.lessons.find((l) => l.slug === lessonSlug);
      if (!course || !lesson) {
        throw new Error(`Trending topic "${topic.topic}" points at a missing lesson: ${courseSlug}/${lessonSlug}`);
      }
      return { href: `/courses/${course.slug}/${lesson.slug}`, label: lesson.title };
    }),
  }));
}

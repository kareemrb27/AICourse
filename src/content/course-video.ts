import { readFileSync } from "node:fs";
import path from "node:path";
import type { Course } from "@/content/courses";

export type CourseVideo = {
  lesson: string;
  lessonNumber: number;
  id: string;
  title: string;
  channel: string;
  minutes: number;
};

const VIDEO = /<Video\s+id="([^"]+)"\s+title="([^"]*)"\s+channel="([^"]*)"\s+minutes=\{(\d+)\}/;

// The first video a learner meets in a course, read from the lesson files so
// the course page cannot drift from what the lessons actually embed. Only runs
// while the pages are prerendered.
export function firstCourseVideo(course: Course): CourseVideo | null {
  for (const [index, lesson] of course.lessons.entries()) {
    let source: string;
    try {
      source = readFileSync(path.join(process.cwd(), "src/content", course.slug, `${lesson.slug}.mdx`), "utf8");
    } catch {
      continue;
    }
    const match = VIDEO.exec(source);
    if (match) {
      return {
        lesson: lesson.slug,
        lessonNumber: index + 1,
        id: match[1],
        title: match[2],
        channel: match[3],
        minutes: Number(match[4]),
      };
    }
  }
  return null;
}

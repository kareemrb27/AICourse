import type { MetadataRoute } from "next";
import { courses } from "@/content/courses";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about"];
  for (const course of courses) {
    paths.push(`/courses/${course.slug}`);
    for (const lesson of course.lessons) {
      paths.push(`/courses/${course.slug}/${lesson.slug}`);
    }
  }
  return paths.map((path) => ({ url: `${SITE_URL}${path === "/" ? "" : path}` }));
}

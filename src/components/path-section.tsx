import { PathBoard, type BoardItem } from "@/components/path-board";
import { formatDuration, getCourse, totalMinutes } from "@/content/courses";
import {
  pathElectives,
  pathFinal,
  pathStages,
  type PathItem,
} from "@/content/path";

function toBoardItem(item: PathItem): BoardItem {
  const course = item.course ? getCourse(item.course) : undefined;
  return {
    key: item.key,
    title: item.title,
    sub: item.sub,
    after: item.after,
    href: course ? `/courses/${course.slug}` : undefined,
    meta: course
      ? `${course.lessons.length} lessons · ${formatDuration(totalMinutes(course))}`
      : undefined,
  };
}

export function PathSection() {
  return (
    <PathBoard
      stages={pathStages.map((stage) => ({
        id: stage.id,
        name: stage.name,
        level: stage.level,
        blurb: stage.blurb,
        items: stage.items.map(toBoardItem),
      }))}
      final={toBoardItem(pathFinal)}
      electives={pathElectives.map(toBoardItem)}
    />
  );
}

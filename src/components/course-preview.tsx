import Link from "next/link";
import type { CSSProperties } from "react";
import { coursePalette } from "@/components/course-illustration";
import type { CourseVideo } from "@/content/course-video";

// "Watch a preview" tile for the course page: the first video in the course,
// as a thumbnail that opens the lesson it lives in. No player loads here.
export function CoursePreview({ slug, video }: { slug: string; video: CourseVideo }) {
  const [color] = coursePalette(slug);
  return (
    <Link
      href={`/courses/${slug}/${video.lesson}`}
      style={{ "--c": color } as CSSProperties}
      className="card-lift group block overflow-hidden rounded-2xl border border-line bg-surface focus-visible:outline-2 focus-visible:outline-accent"
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${video.id}/sddefault.jpg`}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-black transition-transform group-hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className="ml-0.5 size-6" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[11px] text-white">
          {video.minutes} min
        </span>
      </div>
      <div className="p-5">
        <p className="label flex items-center gap-2" style={{ color: "var(--c)" }}>
          <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: "var(--c)" }} />
          Watch a preview
        </p>
        <p className="mt-2 line-clamp-2 text-base font-semibold leading-snug">{video.title}</p>
        <p className="mt-2 text-xs leading-5 text-muted">
          {video.channel} · from lesson {video.lessonNumber}
        </p>
        <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 group-hover:text-foreground">
          Open the lesson <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

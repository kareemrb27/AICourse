import type { CSSProperties, ReactNode } from "react";
import { CourseIllustration, coursePalette } from "@/components/course-illustration";

// A banner tinted with the course's own colors, with its illustration on the
// right. The large version tops the course page; the compact one tops lessons.
export function CourseCover({
  slug,
  eyebrow,
  title,
  children,
  compact = false,
}: {
  slug: string;
  eyebrow: string;
  title?: string;
  children?: ReactNode;
  compact?: boolean;
}) {
  const [a, b] = coursePalette(slug);
  return (
    <div
      style={{ "--c": a, "--c2": b } as CSSProperties}
      className="relative isolate overflow-hidden rounded-2xl border border-line"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 150% at 85% 50%, color-mix(in srgb, var(--c) 42%, transparent), transparent 72%), linear-gradient(120deg, color-mix(in srgb, var(--c2) 30%, #14141b), color-mix(in srgb, var(--c) 8%, #14141b) 75%)",
        }}
      />
      <div
        className={`flex items-center justify-between gap-5 ${
          compact ? "px-5 py-4 sm:px-7" : "px-6 py-6 sm:px-10 sm:py-8"
        }`}
      >
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase" style={{ color: "var(--c)" }}>
            <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: "var(--c)" }} />
            {eyebrow}
          </p>
          {title ? (
            <p className={`mt-2 font-semibold tracking-tight ${compact ? "truncate text-base sm:text-lg" : "text-xl sm:text-2xl"}`}>
              {title}
            </p>
          ) : null}
          {children}
        </div>
        <CourseIllustration
          slug={slug}
          className={`shrink-0 rounded-xl border border-white/10 shadow-2xl shadow-black/40 ${
            compact ? "hidden aspect-[3/2] w-28 sm:block" : "aspect-[3/2] w-32 sm:w-72"
          }`}
        />
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

const KINDS = {
  video: "Video",
  article: "Article",
  docs: "Docs",
  course: "Free course",
  paper: "Paper",
  repo: "Code",
} as const;

export type ResourceKind = keyof typeof KINDS;

export function Resource({
  kind,
  title,
  href,
  source,
  children,
}: {
  kind: ResourceKind;
  title: string;
  href: string;
  source: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose group block rounded-lg border border-line bg-surface p-4 no-underline transition-colors hover:border-accent"
      style={{ textDecoration: "none" }}
    >
      <div className="label flex items-center justify-between">
        <span className="text-accent">{KINDS[kind]}</span>
        <span>
          {source} <span aria-hidden="true">↗</span>
        </span>
      </div>
      <div className="mt-2 text-base font-semibold text-foreground">
        {title}
        <span className="sr-only"> (opens in a new tab)</span>
      </div>
      {children ? (
        <div className="mt-1 text-sm leading-6 text-muted">{children}</div>
      ) : null}
    </a>
  );
}

export function Callout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-accent/40 bg-accent-dim p-4">
      <div className="label text-accent">{title}</div>
      <div className="mt-2 text-[15px] leading-7">{children}</div>
    </div>
  );
}

import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { CopyCode } from "@/components/copy-code";

export function LessonHeading({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2 {...props} data-self-check={children === "Check yourself" || undefined}>
      {children}
    </h2>
  );
}

export function CodeBlock({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  const code = isValidElement<{ className?: string; children?: ReactNode }>(children)
    ? children.props : null;
  const text = typeof code?.children === "string" ? code.children : null;
  const language = code?.className?.match(/(?:^|\s)language-([\w-]+)/)?.[1];
  const lines = text?.trimEnd().split("\n").length;

  return (
    <div className="lesson-code">
      <div className="flex flex-wrap items-center justify-between gap-x-3 border-b border-line px-4 py-1">
        <span className="font-mono text-xs text-muted">
          {language || "Code"}{lines ? ` · ${lines} ${lines === 1 ? "line" : "lines"}` : ""}
        </span>
        {text !== null ? <CopyCode text={text} /> : null}
      </div>
      <pre
        {...props}
        tabIndex={0}
        role="region"
        aria-label={`${language || "Code"} example, scrollable`}
      >
        {children}
      </pre>
    </div>
  );
}

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
      className="lesson-resource group block rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs">
        <span className="rounded border border-accent/25 bg-accent-dim px-2 py-1 font-mono text-[#6ee7b7]">{KINDS[kind]}</span>
        <span className="text-muted">
          {source} <span aria-hidden="true">↗</span>
        </span>
      </div>
      <div className="mt-3 text-base font-semibold leading-6 text-foreground group-hover:text-[#6ee7b7]">
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
    <aside className="lesson-callout rounded-xl border border-accent/25 border-l-4 border-l-accent bg-accent-dim p-5 sm:p-6" aria-label={title}>
      <div className="font-semibold text-[#6ee7b7]">{title}</div>
      <div className="mt-2 text-base leading-7">{children}</div>
    </aside>
  );
}

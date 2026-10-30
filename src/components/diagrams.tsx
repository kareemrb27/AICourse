import type { ReactNode } from "react";

// Small diagrams that lessons use through MDX. They are plain HTML and CSS, so
// they stay sharp, wrap on phones and read well with a screen reader.
type Step = { label: string; note?: string };

function Figure({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <figure
      className="lesson-diagram rounded-xl border border-line bg-surface p-5 sm:p-6"
      aria-label={title}
    >
      {title ? <figcaption className="label mb-4">{title}</figcaption> : null}
      {children}
    </figure>
  );
}

// Ordered steps with arrows between them, and an optional "repeat" bar.
export function Flow({ title, steps, loop }: { title?: string; steps: Step[]; loop?: string }) {
  return (
    <Figure title={title}>
      <ol className="flex flex-col gap-1 md:flex-row md:items-stretch md:gap-0">
        {steps.map((step, index) => (
          <li key={step.label} className="flex flex-1 flex-col md:flex-row md:items-stretch">
            <div className="flex-1 rounded-lg border border-accent/25 bg-accent-dim p-3.5">
              <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-1 text-sm font-semibold text-foreground">{step.label}</p>
              {step.note ? <p className="mt-1 text-xs text-muted">{step.note}</p> : null}
            </div>
            {index < steps.length - 1 ? (
              <span aria-hidden="true" className="flex items-center justify-center py-1 text-accent md:px-2 md:py-0">
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      {loop ? (
        <p className="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-accent/40 px-3 py-2 text-xs text-accent">
          <span aria-hidden="true" className="text-base">↺</span>
          {loop}
        </p>
      ) : null}
    </Figure>
  );
}

// Boxes inside boxes: each item is a smaller slice of the one before it.
export function Layers({ title, items }: { title?: string; items: Step[] }) {
  function nest(rest: Step[], depth: number): ReactNode {
    const [item, ...inner] = rest;
    if (!item) return null;
    return (
      <div
        className="rounded-lg border border-accent/30 p-3 sm:p-4"
        style={{ background: `rgba(16, 185, 129, ${0.04 + depth * 0.05})` }}
      >
        <p className="text-sm font-semibold text-foreground">
          {item.label}
          {item.note ? <span className="font-normal text-muted"> · {item.note}</span> : null}
        </p>
        {inner.length ? <div className="mt-3">{nest(inner, depth + 1)}</div> : null}
      </div>
    );
  }
  return <Figure title={title}>{nest(items, 0)}</Figure>;
}

type Side = { title: string; subtitle?: string; items: string[] };

// Two options side by side, the second highlighted.
export function Compare({ title, left, right }: { title?: string; left: Side; right: Side }) {
  return (
    <Figure title={title}>
      <div className="grid gap-4 md:grid-cols-2">
        {[left, right].map((side, index) => (
          <div
            key={side.title}
            className={`rounded-lg border p-4 ${
              index === 1 ? "border-accent/30 bg-accent-dim" : "border-line bg-background/40"
            }`}
          >
            <p className={`text-base font-semibold ${index === 1 ? "text-accent" : "text-foreground"}`}>
              {side.title}
            </p>
            {side.subtitle ? <p className="mt-1 text-sm text-muted">{side.subtitle}</p> : null}
            <ul className="mt-3 space-y-2">
              {side.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-[#d6d6de]">
                  <span aria-hidden="true" className={index === 1 ? "text-accent" : "text-muted"}>▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Figure>
  );
}

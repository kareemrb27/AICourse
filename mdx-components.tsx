import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { Callout, CodeBlock, LessonHeading, Resource } from "@/components/lesson";
import { Compare, Flow, Layers } from "@/components/diagrams";
import { Video } from "@/components/video";

const components = {
  Resource,
  Callout,
  Video,
  Flow,
  Layers,
  Compare,
  h2: LessonHeading,
  pre: CodeBlock,
  // Wide tables scroll inside their own region instead of the whole page.
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div
      className="lesson-table overflow-x-auto rounded-xl border border-line"
      role="region"
      aria-label="Scrollable table"
      tabIndex={0}
    >
      <table {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => <th scope="col" {...props} />,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}

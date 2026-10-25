import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { Callout, Resource } from "@/components/lesson";

const components = {
  Resource,
  Callout,
  // Wide tables scroll inside their own region instead of the whole page.
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div
      className="overflow-x-auto"
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

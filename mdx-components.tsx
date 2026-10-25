import type { MDXComponents } from "mdx/types";
import { Callout, Resource } from "@/components/lesson";

const components = {
  Resource,
  Callout,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}

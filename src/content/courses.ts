import type { ComponentType } from "react";

export type Level = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  load: () => Promise<{ default: ComponentType }>;
};

export type Course = {
  slug: string;
  title: string;
  track: string;
  level: Level;
  summary: string;
  prerequisites: string[];
  outcomes: string[];
  lessons: Lesson[];
};

export const courses: Course[] = [
  {
    slug: "graphrag",
    title: "Implement GraphRAG with Knowledge Graphs",
    track: "Grounding models with data",
    level: "Intermediate",
    summary:
      "Learn why plain vector RAG breaks on multi-hop and corpus-wide questions, and how knowledge graphs fix it. Build a graph from unstructured text, retrieve over it, and evaluate the result.",
    prerequisites: [
      "Comfortable with Python",
      "You have built or at least understand a basic RAG pipeline",
      "An LLM API key (a free tier or a local model works)",
    ],
    outcomes: [
      "Explain when GraphRAG beats vector RAG, and when it does not",
      "Model a domain as a property graph and query it with Cypher",
      "Build a knowledge graph from documents with an LLM extraction pipeline",
      "Pick the right retrieval pattern: vector, graph traversal, text-to-Cypher or community summaries",
      "Evaluate a GraphRAG system and reason about its cost",
    ],
    lessons: [
      {
        slug: "why-graphrag",
        title: "Why GraphRAG?",
        summary: "Where vector RAG fails, and what a graph adds.",
        minutes: 45,
        load: () => import("./graphrag/why-graphrag.mdx"),
      },
      {
        slug: "knowledge-graph-foundations",
        title: "Knowledge graph foundations",
        summary: "Property graphs, data modeling and your first Cypher queries.",
        minutes: 120,
        load: () => import("./graphrag/knowledge-graph-foundations.mdx"),
      },
      {
        slug: "building-the-graph",
        title: "Building a graph from unstructured text",
        summary: "Chunking, schema-guided extraction and entity resolution.",
        minutes: 120,
        load: () => import("./graphrag/building-the-graph.mdx"),
      },
      {
        slug: "retrieval-patterns",
        title: "GraphRAG retrieval patterns",
        summary: "Vector plus traversal, hybrid search and text-to-Cypher.",
        minutes: 120,
        load: () => import("./graphrag/retrieval-patterns.mdx"),
      },
      {
        slug: "local-vs-global-search",
        title: "Communities: local vs global search",
        summary: "The Microsoft GraphRAG approach to corpus-wide questions.",
        minutes: 90,
        load: () => import("./graphrag/local-vs-global-search.mdx"),
      },
      {
        slug: "agents-and-evaluation",
        title: "Agents, evaluation and production",
        summary: "Put retrieval behind an agent, measure it, control the cost.",
        minutes: 120,
        load: () => import("./graphrag/agents-and-evaluation.mdx"),
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Build and ship a GraphRAG app on a corpus you care about.",
        minutes: 240,
        load: () => import("./graphrag/capstone.mdx"),
      },
    ],
  },
];

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function totalMinutes(course: Course) {
  return course.lessons.reduce((sum, l) => sum + l.minutes, 0);
}

export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

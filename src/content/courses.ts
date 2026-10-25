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
  {
    slug: "agent-memory",
    title: "Engineer Persistent Memory for AI Agents",
    track: "Managing data",
    level: "Advanced",
    summary:
      "Agents are stateless by default. Learn how to give them short-term and long-term memory that stays accurate, affordable and safe: what to store, how to retrieve it, and how to prove it works.",
    prerequisites: [
      "Comfortable with Python and SQL",
      "You have built a tool-calling agent or chatbot",
      "Helpful: the GraphRAG course, for the graph-based lessons",
    ],
    outcomes: [
      "Explain the working, episodic, semantic and procedural memory types and when each applies",
      "Keep long threads inside the context window with trimming, compaction and notes",
      "Design a long-term store with extraction, consolidation, expiry and deletion",
      "Compare tiered, scored and temporal-graph memory architectures",
      "Evaluate memory quality and defend it against leaks and poisoning",
    ],
    lessons: [
      {
        slug: "why-agents-forget",
        title: "Why agents forget",
        summary: "Stateless models, finite context, and what bad memory costs.",
        minutes: 45,
        load: () => import("./agent-memory/why-agents-forget.mdx"),
      },
      {
        slug: "memory-taxonomy",
        title: "A taxonomy of agent memory",
        summary: "Working, episodic, semantic and procedural memory.",
        minutes: 60,
        load: () => import("./agent-memory/memory-taxonomy.mdx"),
      },
      {
        slug: "short-term-memory",
        title: "Short-term memory and context management",
        summary: "Checkpoints, trimming, compaction and structured notes.",
        minutes: 120,
        load: () => import("./agent-memory/short-term-memory.mdx"),
      },
      {
        slug: "long-term-memory",
        title: "Long-term memory stores",
        summary: "Write, read and maintenance paths, with a Postgres schema.",
        minutes: 150,
        load: () => import("./agent-memory/long-term-memory.mdx"),
      },
      {
        slug: "memory-architectures",
        title: "Memory architectures",
        summary: "MemGPT and Letta, Generative Agents, and Zep with Graphiti.",
        minutes: 120,
        load: () => import("./agent-memory/memory-architectures.mdx"),
      },
      {
        slug: "evaluation-and-safety",
        title: "Evaluation, privacy and safety",
        summary: "Benchmarks, test design, leaks and memory poisoning.",
        minutes: 90,
        load: () => import("./agent-memory/evaluation-and-safety.mdx"),
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Ship an assistant that measurably improves by remembering.",
        minutes: 240,
        load: () => import("./agent-memory/capstone.mdx"),
      },
    ],
  },
  {
    slug: "production-agents",
    title: "Deploy Reliable AI Agents in Production",
    track: "Operating in production",
    level: "Advanced",
    summary:
      "A demo that works once is not a product. Learn to measure agent reliability, trace and debug runs, survive failures, defend against prompt injection, control cost and ship changes safely.",
    prerequisites: [
      "You have built an agent that calls tools",
      "Comfortable with Python or TypeScript and basic web services",
      "Helpful: the Persistent Memory course, for context and cost techniques",
    ],
    outcomes: [
      "Measure reliability with evals and repeated-trial metrics, not single runs",
      "Trace agent runs end to end and alert on the right signals",
      "Handle timeouts, retries, idempotency, crashes and runaway loops",
      "Reduce prompt-injection risk with least privilege and structural limits",
      "Control cost and latency, and roll changes out and back safely",
    ],
    lessons: [
      {
        slug: "what-reliable-means",
        title: "What reliable means for agents",
        summary: "Why agents are hard to run, and how to measure consistency.",
        minutes: 45,
        load: () => import("./production-agents/what-reliable-means.mdx"),
      },
      {
        slug: "evals",
        title: "Evals: knowing it works",
        summary: "Building test sets, graders and validated LLM judges.",
        minutes: 150,
        load: () => import("./production-agents/evals.mdx"),
      },
      {
        slug: "observability",
        title: "Tracing and observability",
        summary: "See what the agent saw, decided and did.",
        minutes: 120,
        load: () => import("./production-agents/observability.mdx"),
      },
      {
        slug: "failure-handling",
        title: "Failure handling and durability",
        summary: "Timeouts, retries, idempotency, caps and human approval.",
        minutes: 150,
        load: () => import("./production-agents/failure-handling.mdx"),
      },
      {
        slug: "security",
        title: "Security: injection and excessive agency",
        summary: "The lethal trifecta, least privilege and safe tool design.",
        minutes: 120,
        load: () => import("./production-agents/security.mdx"),
      },
      {
        slug: "cost-and-release",
        title: "Cost, latency and safe releases",
        summary: "Unit economics, caching, rollouts and runbooks.",
        minutes: 120,
        load: () => import("./production-agents/cost-and-release.mdx"),
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Harden an action-taking agent and prove it is ready to ship.",
        minutes: 300,
        load: () => import("./production-agents/capstone.mdx"),
      },
    ],
  },
  {
    slug: "repo-context",
    title: "Engineer Repository Context for Coding Agents",
    track: "Customizing the agent and its environment",
    level: "Advanced",
    summary:
      "Coding agents are only as good as what they can see. Learn to write instruction files, make code easy to find, build fast feedback loops, package skills and subagents, and measure whether any of it helps.",
    prerequisites: [
      "You use a coding agent (Claude Code, Cursor, Copilot, Aider or similar) on real code",
      "Comfortable with Git, a test runner and the command line",
      "Helpful: the Production Agents course, for the trust and security lessons",
    ],
    outcomes: [
      "Explain why context, not just the model, decides coding-agent quality",
      "Write concise instruction files that prevent repeated mistakes",
      "Choose between keyword, semantic, repo-map and structural code search",
      "Build fast, readable feedback loops and connect knowledge with MCP",
      "Package procedures as skills, isolate exploration in subagents, and benchmark your results",
    ],
    lessons: [
      {
        slug: "why-context-matters",
        title: "Why repository context matters",
        summary: "What the agent sees, and why more context is not better.",
        minutes: 45,
        load: () => import("./repo-context/why-context-matters.mdx"),
      },
      {
        slug: "instruction-files",
        title: "Instruction files: AGENTS.md and friends",
        summary: "What to write, what to leave out, and how to keep it alive.",
        minutes: 90,
        load: () => import("./repo-context/instruction-files.mdx"),
      },
      {
        slug: "code-search-and-retrieval",
        title: "Code search and retrieval",
        summary: "Grep, embeddings, repo maps and structural search compared.",
        minutes: 150,
        load: () => import("./repo-context/code-search-and-retrieval.mdx"),
      },
      {
        slug: "tools-and-environment",
        title: "Tools, feedback loops and MCP",
        summary: "Fast verification, readable failures and external knowledge.",
        minutes: 120,
        load: () => import("./repo-context/tools-and-environment.mdx"),
      },
      {
        slug: "skills-and-subagents",
        title: "Skills and subagents",
        summary: "Progressive disclosure and context isolation.",
        minutes: 90,
        load: () => import("./repo-context/skills-and-subagents.mdx"),
      },
      {
        slug: "evaluating-context",
        title: "Evaluating and maintaining context",
        summary: "Private benchmarks, controlled comparisons and context rot.",
        minutes: 120,
        load: () => import("./repo-context/evaluating-context.mdx"),
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Engineer a real repo for agents and prove the improvement.",
        minutes: 300,
        load: () => import("./repo-context/capstone.mdx"),
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

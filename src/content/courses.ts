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
  {
    slug: "browser-automation",
    title: "Implement Browser Automation for AI Agents",
    track: "Enabling agent autonomy",
    level: "Intermediate",
    summary:
      "Give agents the ability to use the web. Learn how browsers are automated, how to show a page to a model, how to design the agent loop, and how to make runs reliable, safe and respectful.",
    prerequisites: [
      "Comfortable with Python or TypeScript",
      "Basic HTML and how web pages work",
      "You have built a tool-calling agent, or read the Production Agents course",
    ],
    outcomes: [
      "Decide when a browser agent is justified, and at which level of control",
      "Automate a browser with Playwright using locators, contexts and auto-waiting",
      "Choose between accessibility snapshots, screenshots and hybrid page views",
      "Design the observe, think and act loop with a small, reliable action set",
      "Defend against page-borne prompt injection and automate respectfully",
    ],
    lessons: [
      {
        slug: "why-browsers",
        title: "Why give agents a browser?",
        summary: "When to use one, when not to, and three levels of control.",
        minutes: 45,
        load: () => import("./browser-automation/why-browsers.mdx"),
      },
      {
        slug: "browser-fundamentals",
        title: "Browser automation fundamentals",
        summary: "Protocols, Playwright, contexts, locators and auto-waiting.",
        minutes: 120,
        load: () => import("./browser-automation/browser-fundamentals.mdx"),
      },
      {
        slug: "how-agents-see-pages",
        title: "How agents see pages",
        summary: "HTML, accessibility trees, screenshots and hybrids.",
        minutes: 90,
        load: () => import("./browser-automation/how-agents-see-pages.mdx"),
      },
      {
        slug: "agent-loop-and-actions",
        title: "The agent loop and action design",
        summary: "Tools, failure modes, and mixing scripts with AI.",
        minutes: 150,
        load: () => import("./browser-automation/agent-loop-and-actions.mdx"),
      },
      {
        slug: "reliability",
        title: "Making runs reliable",
        summary: "Waits, obstacles, isolation, traces and scaling out.",
        minutes: 120,
        load: () => import("./browser-automation/reliability.mdx"),
      },
      {
        slug: "safety-and-ethics",
        title: "Safety, ethics and respectful automation",
        summary: "Prompt injection, isolation, approvals, robots.txt and terms.",
        minutes: 90,
        load: () => import("./browser-automation/safety-and-ethics.mdx"),
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Ship a reliable, safe browser agent for a real task.",
        minutes: 300,
        load: () => import("./browser-automation/capstone.mdx"),
      },
    ],
  },
  {
    slug: "synthetic-data",
    title: "Engineer Synthetic Data for Open LLMs",
    track: "Machine learning foundations",
    level: "Expert",
    summary:
      "Open models need good data. Learn to generate instruction, preference and pretraining-style data with LLMs, filter and decontaminate it, train small models on it, and prove with real held-out data that it helped.",
    prerequisites: [
      "Comfortable with Python and the Hugging Face ecosystem",
      "You have fine-tuned or at least run an open LLM",
      "Access to a GPU or a cloud notebook for training runs",
    ],
    outcomes: [
      "Decide when synthetic data helps, and name its main failure modes",
      "Generate diverse instruction data with Self-Instruct, Evol-Instruct and Magpie-style methods",
      "Build responses and preference pairs with verification and validated judges",
      "Filter, deduplicate and decontaminate, and avoid model collapse",
      "Run controlled ablations, evaluate on real data, and document licensing",
    ],
    lessons: [
      {
        slug: "why-synthetic-data",
        title: "Why synthetic data?",
        summary: "Uses, benefits and the main ways it goes wrong.",
        minutes: 60,
        load: () => import("./synthetic-data/why-synthetic-data.mdx"),
      },
      {
        slug: "instruction-data",
        title: "Generating instruction data",
        summary: "Self-Instruct, Evol-Instruct, Magpie and designing for diversity.",
        minutes: 150,
        load: () => import("./synthetic-data/instruction-data.mdx"),
      },
      {
        slug: "responses-and-preferences",
        title: "Responses, preferences and feedback",
        summary: "Distillation, verification, judges and DPO pairs.",
        minutes: 150,
        load: () => import("./synthetic-data/responses-and-preferences.mdx"),
      },
      {
        slug: "pretraining-style-data",
        title: "Pretraining-style synthetic text",
        summary: "Textbook-quality data, Cosmopedia and rephrasing.",
        minutes: 120,
        load: () => import("./synthetic-data/pretraining-style-data.mdx"),
      },
      {
        slug: "quality-and-contamination",
        title: "Quality, diversity, contamination and collapse",
        summary: "Filtering pipelines, deduplication and decontamination.",
        minutes: 150,
        load: () => import("./synthetic-data/quality-and-contamination.mdx"),
      },
      {
        slug: "training-evaluation-licensing",
        title: "Training, evaluation and licensing",
        summary: "Ablations, evaluation harnesses, terms and dataset cards.",
        minutes: 150,
        load: () => import("./synthetic-data/training-evaluation-licensing.mdx"),
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Generate data, train a small model and prove it helped.",
        minutes: 360,
        load: () => import("./synthetic-data/capstone.mdx"),
      },
    ],
  },
  {
    slug: "meta-harness",
    title: "Explore Meta-Harness Architectures for AI Agents",
    track: "Building agentic systems",
    level: "Expert",
    summary:
      "The harness around a model often matters as much as the model. Learn what a harness is, how long-running harnesses are built, what \"meta-harness\" means, and how to search over harness code with your own data.",
    prerequisites: [
      "You have built a tool-calling agent",
      "Comfortable reading research papers and Python code",
      "Helpful: the Production Agents and Repository Context courses",
    ],
    outcomes: [
      "Describe a harness as a set of design surfaces you can change and measure",
      "Explain the structure of long-running and orchestrator-worker harnesses",
      "Distinguish the senses of \"meta-harness\" and place the research in its lineage",
      "Explain the Meta-Harness method, its evidence and its stated limits",
      "Build and audit a small harness search with proper data splits and sandboxing",
    ],
    lessons: [
      {
        slug: "what-is-a-harness",
        title: "What is a harness?",
        summary: "Agent = model + harness, and why the harness matters.",
        minutes: 60,
        load: () => import("./meta-harness/what-is-a-harness.mdx"),
      },
      {
        slug: "harness-anatomy",
        title: "The anatomy of a harness",
        summary: "Seven design surfaces and how to make them optimizable.",
        minutes: 120,
        load: () => import("./meta-harness/harness-anatomy.mdx"),
      },
      {
        slug: "long-running-harnesses",
        title: "Harnesses for long-running work",
        summary: "Initializer and worker agents, feature lists and orchestrators.",
        minutes: 90,
        load: () => import("./meta-harness/long-running-harnesses.mdx"),
      },
      {
        slug: "what-meta-harness-means",
        title: "What \"meta-harness\" means",
        summary: "Two senses of the term, and the research lineage behind it.",
        minutes: 120,
        load: () => import("./meta-harness/what-meta-harness-means.mdx"),
      },
      {
        slug: "method-deep-dive",
        title: "Deep dive: the Meta-Harness method",
        summary: "Search space, proposer, traces versus summaries, and results.",
        minutes: 150,
        load: () => import("./meta-harness/method-deep-dive.mdx"),
      },
      {
        slug: "build-your-own-search",
        title: "Build your own harness search",
        summary: "Splits, traces, proposer instructions, selection and audits.",
        minutes: 150,
        load: () => import("./meta-harness/build-your-own-search.mdx"),
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Search for a better harness and prove it on held-out data.",
        minutes: 360,
        load: () => import("./meta-harness/capstone.mdx"),
      },
    ],
  },
  {
    slug: "financial-workflows",
    title: "Architect Agentic Systems for Financial Workflows",
    track: "Designing system architectures",
    level: "Beginner",
    summary:
      "Design systems where language models help with financial workflows without being trusted with what they should not decide: exact money handling, validated extraction, approvals, audit trails, evaluation and safe rollout. Built on synthetic data only.",
    prerequisites: [
      "Comfortable with Python or TypeScript",
      "You have called an LLM API with tools or structured output",
      "No finance background needed; the course explains each workflow",
    ],
    outcomes: [
      "Explain why finance workflows demand determinism, auditability and controls",
      "Design a pipeline with the model at the edges and rules, approvals and limits at the core",
      "Handle money exactly, and have models calculate through tools instead of in their heads",
      "Extract and verify data from documents with evidence and validation",
      "Evaluate, roll out and monitor an automated workflow, and map it to risk guidance",
    ],
    lessons: [
      {
        slug: "why-finance-is-different",
        title: "Why finance is different",
        summary: "Workflows, stakes and the principle: the model assists, the system decides.",
        minutes: 45,
        load: () => import("./financial-workflows/why-finance-is-different.mdx"),
      },
      {
        slug: "architecture-patterns",
        title: "Architecture patterns for financial workflows",
        summary: "The reference pipeline, case state machines and exception queues.",
        minutes: 90,
        load: () => import("./financial-workflows/architecture-patterns.mdx"),
      },
      {
        slug: "numbers-and-data",
        title: "Numbers, data and ledgers",
        summary: "Exact decimals, calculation tools, authoritative sources, double entry.",
        minutes: 120,
        load: () => import("./financial-workflows/numbers-and-data.mdx"),
      },
      {
        slug: "documents-and-retrieval",
        title: "Documents, extraction and retrieval",
        summary: "Schemas with evidence, validation, and what FinanceBench showed.",
        minutes: 120,
        load: () => import("./financial-workflows/documents-and-retrieval.mdx"),
      },
      {
        slug: "controls-and-compliance",
        title: "Controls, compliance and risk guidance",
        summary: "Approvals, audit trails, model risk management and frameworks.",
        minutes: 120,
        load: () => import("./financial-workflows/controls-and-compliance.mdx"),
      },
      {
        slug: "evaluation-and-operations",
        title: "Evaluation and operations",
        summary: "Error-cost metrics, shadow mode, monitoring and incidents.",
        minutes: 120,
        load: () => import("./financial-workflows/evaluation-and-operations.mdx"),
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Build a controlled financial workflow on synthetic data.",
        minutes: 300,
        load: () => import("./financial-workflows/capstone.mdx"),
      },
    ],
  },
  {
    slug: "ai-code-analysis",
    title: "Analyze AI-Generated Code for Quality and Security",
    track: "Making systems secure and reliable",
    level: "Intermediate",
    summary:
      "AI tools write plausible code that can be wrong, insecure or built on packages that do not exist. Learn to review it by risk, recognize common weaknesses, vet dependencies, automate analysis and test it properly.",
    prerequisites: [
      "You write code and use pull requests",
      "Basic familiarity with Python or JavaScript, since examples use Python",
      "You have used an AI coding assistant",
    ],
    outcomes: [
      "Explain what research shows about the quality and security of AI-generated code",
      "Review AI-written changes by risk, with a checklist for known failure patterns",
      "Recognize and fix the weaknesses AI tools reproduce most often",
      "Vet dependencies, defend against hallucinated packages and generate an SBOM",
      "Build a layered CI pipeline and tests that genuinely protect you, and measure it",
    ],
    lessons: [
      {
        slug: "why-review-ai-code",
        title: "Why AI-generated code needs a different review",
        summary: "What the research found, and five ways AI code goes wrong.",
        minutes: 60,
        load: () => import("./ai-code-analysis/why-review-ai-code.mdx"),
      },
      {
        slug: "review-by-risk",
        title: "Reviewing by risk",
        summary: "Intent first, risk map, known patterns and running the code.",
        minutes: 90,
        load: () => import("./ai-code-analysis/review-by-risk.mdx"),
      },
      {
        slug: "security-weaknesses",
        title: "Common security weaknesses",
        summary: "Injection, traversal, randomness, secrets and access control, with fixes.",
        minutes: 120,
        load: () => import("./ai-code-analysis/security-weaknesses.mdx"),
      },
      {
        slug: "dependencies-and-supply-chain",
        title: "Dependencies and the supply chain",
        summary: "Hallucinated packages, vulnerabilities, SBOMs, SLSA and licenses.",
        minutes: 90,
        load: () => import("./ai-code-analysis/dependencies-and-supply-chain.mdx"),
      },
      {
        slug: "automated-analysis",
        title: "Automated analysis and governance",
        summary: "Linters, types, SAST, secret scanning, LLM reviewers and policy.",
        minutes: 120,
        load: () => import("./ai-code-analysis/automated-analysis.mdx"),
      },
      {
        slug: "testing-ai-code",
        title: "Testing AI-generated code",
        summary: "Property-based tests, mutation testing, fuzzing and safe execution.",
        minutes: 120,
        load: () => import("./ai-code-analysis/testing-ai-code.mdx"),
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Build a pipeline that gates AI-assisted changes, and measure it.",
        minutes: 300,
        load: () => import("./ai-code-analysis/capstone.mdx"),
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

import type { ComponentType } from "react";
import L0 from "./graphrag/why-graphrag.mdx";
import L1 from "./graphrag/knowledge-graph-foundations.mdx";
import L2 from "./graphrag/building-the-graph.mdx";
import L3 from "./graphrag/retrieval-patterns.mdx";
import L4 from "./graphrag/local-vs-global-search.mdx";
import L5 from "./graphrag/agents-and-evaluation.mdx";
import L6 from "./graphrag/capstone.mdx";
import L7 from "./agent-memory/why-agents-forget.mdx";
import L8 from "./agent-memory/memory-taxonomy.mdx";
import L9 from "./agent-memory/short-term-memory.mdx";
import L10 from "./agent-memory/long-term-memory.mdx";
import L11 from "./agent-memory/memory-architectures.mdx";
import L12 from "./agent-memory/evaluation-and-safety.mdx";
import L13 from "./agent-memory/capstone.mdx";
import L14 from "./production-agents/what-reliable-means.mdx";
import L15 from "./production-agents/evals.mdx";
import L16 from "./production-agents/observability.mdx";
import L17 from "./production-agents/failure-handling.mdx";
import L18 from "./production-agents/security.mdx";
import L19 from "./production-agents/cost-and-release.mdx";
import L20 from "./production-agents/capstone.mdx";
import L21 from "./repo-context/why-context-matters.mdx";
import L22 from "./repo-context/instruction-files.mdx";
import L23 from "./repo-context/code-search-and-retrieval.mdx";
import L24 from "./repo-context/tools-and-environment.mdx";
import L25 from "./repo-context/skills-and-subagents.mdx";
import L26 from "./repo-context/evaluating-context.mdx";
import L27 from "./repo-context/capstone.mdx";
import L28 from "./browser-automation/why-browsers.mdx";
import L29 from "./browser-automation/browser-fundamentals.mdx";
import L30 from "./browser-automation/how-agents-see-pages.mdx";
import L31 from "./browser-automation/agent-loop-and-actions.mdx";
import L32 from "./browser-automation/reliability.mdx";
import L33 from "./browser-automation/safety-and-ethics.mdx";
import L34 from "./browser-automation/capstone.mdx";
import L35 from "./synthetic-data/why-synthetic-data.mdx";
import L36 from "./synthetic-data/instruction-data.mdx";
import L37 from "./synthetic-data/responses-and-preferences.mdx";
import L38 from "./synthetic-data/pretraining-style-data.mdx";
import L39 from "./synthetic-data/quality-and-contamination.mdx";
import L40 from "./synthetic-data/training-evaluation-licensing.mdx";
import L41 from "./synthetic-data/capstone.mdx";
import L42 from "./meta-harness/what-is-a-harness.mdx";
import L43 from "./meta-harness/harness-anatomy.mdx";
import L44 from "./meta-harness/long-running-harnesses.mdx";
import L45 from "./meta-harness/what-meta-harness-means.mdx";
import L46 from "./meta-harness/method-deep-dive.mdx";
import L47 from "./meta-harness/build-your-own-search.mdx";
import L48 from "./meta-harness/capstone.mdx";
import L49 from "./financial-workflows/why-finance-is-different.mdx";
import L50 from "./financial-workflows/architecture-patterns.mdx";
import L51 from "./financial-workflows/numbers-and-data.mdx";
import L52 from "./financial-workflows/documents-and-retrieval.mdx";
import L53 from "./financial-workflows/controls-and-compliance.mdx";
import L54 from "./financial-workflows/evaluation-and-operations.mdx";
import L55 from "./financial-workflows/capstone.mdx";
import L56 from "./ai-code-analysis/why-review-ai-code.mdx";
import L57 from "./ai-code-analysis/review-by-risk.mdx";
import L58 from "./ai-code-analysis/security-weaknesses.mdx";
import L59 from "./ai-code-analysis/dependencies-and-supply-chain.mdx";
import L60 from "./ai-code-analysis/automated-analysis.mdx";
import L61 from "./ai-code-analysis/testing-ai-code.mdx";
import L62 from "./ai-code-analysis/capstone.mdx";
import L63 from "./ai-foundations/what-is-ai.mdx";
import L64 from "./ai-foundations/how-machines-learn.mdx";
import L65 from "./ai-foundations/neural-networks.mdx";
import L66 from "./ai-foundations/how-llms-work.mdx";
import L67 from "./ai-foundations/strengths-and-limits.mdx";
import L68 from "./ai-foundations/the-ai-landscape.mdx";
import L69 from "./ai-foundations/capstone.mdx";

// Lessons are imported eagerly so every lesson page is fully prerendered at
// build time (a dynamic import can push the lesson body out of the static shell).
export const lessonContent: Record<string, ComponentType> = {
  "graphrag/why-graphrag": L0,
  "graphrag/knowledge-graph-foundations": L1,
  "graphrag/building-the-graph": L2,
  "graphrag/retrieval-patterns": L3,
  "graphrag/local-vs-global-search": L4,
  "graphrag/agents-and-evaluation": L5,
  "graphrag/capstone": L6,
  "agent-memory/why-agents-forget": L7,
  "agent-memory/memory-taxonomy": L8,
  "agent-memory/short-term-memory": L9,
  "agent-memory/long-term-memory": L10,
  "agent-memory/memory-architectures": L11,
  "agent-memory/evaluation-and-safety": L12,
  "agent-memory/capstone": L13,
  "production-agents/what-reliable-means": L14,
  "production-agents/evals": L15,
  "production-agents/observability": L16,
  "production-agents/failure-handling": L17,
  "production-agents/security": L18,
  "production-agents/cost-and-release": L19,
  "production-agents/capstone": L20,
  "repo-context/why-context-matters": L21,
  "repo-context/instruction-files": L22,
  "repo-context/code-search-and-retrieval": L23,
  "repo-context/tools-and-environment": L24,
  "repo-context/skills-and-subagents": L25,
  "repo-context/evaluating-context": L26,
  "repo-context/capstone": L27,
  "browser-automation/why-browsers": L28,
  "browser-automation/browser-fundamentals": L29,
  "browser-automation/how-agents-see-pages": L30,
  "browser-automation/agent-loop-and-actions": L31,
  "browser-automation/reliability": L32,
  "browser-automation/safety-and-ethics": L33,
  "browser-automation/capstone": L34,
  "synthetic-data/why-synthetic-data": L35,
  "synthetic-data/instruction-data": L36,
  "synthetic-data/responses-and-preferences": L37,
  "synthetic-data/pretraining-style-data": L38,
  "synthetic-data/quality-and-contamination": L39,
  "synthetic-data/training-evaluation-licensing": L40,
  "synthetic-data/capstone": L41,
  "meta-harness/what-is-a-harness": L42,
  "meta-harness/harness-anatomy": L43,
  "meta-harness/long-running-harnesses": L44,
  "meta-harness/what-meta-harness-means": L45,
  "meta-harness/method-deep-dive": L46,
  "meta-harness/build-your-own-search": L47,
  "meta-harness/capstone": L48,
  "financial-workflows/why-finance-is-different": L49,
  "financial-workflows/architecture-patterns": L50,
  "financial-workflows/numbers-and-data": L51,
  "financial-workflows/documents-and-retrieval": L52,
  "financial-workflows/controls-and-compliance": L53,
  "financial-workflows/evaluation-and-operations": L54,
  "financial-workflows/capstone": L55,
  "ai-code-analysis/why-review-ai-code": L56,
  "ai-code-analysis/review-by-risk": L57,
  "ai-code-analysis/security-weaknesses": L58,
  "ai-code-analysis/dependencies-and-supply-chain": L59,
  "ai-code-analysis/automated-analysis": L60,
  "ai-code-analysis/testing-ai-code": L61,
  "ai-code-analysis/capstone": L62,
  "ai-foundations/what-is-ai": L63,
  "ai-foundations/how-machines-learn": L64,
  "ai-foundations/neural-networks": L65,
  "ai-foundations/how-llms-work": L66,
  "ai-foundations/strengths-and-limits": L67,
  "ai-foundations/the-ai-landscape": L68,
  "ai-foundations/capstone": L69,
};

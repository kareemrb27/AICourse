// The beginner-to-"AI solution designer" learning path.
// An item with a `course` slug is built and links to that course.
// An item without one is planned and shown as such.
export type PathItem = {
  key: string;
  title: string;
  sub: string;
  after: string;
  course?: string;
};

export type PathStage = {
  id: number;
  name: string;
  level: string;
  blurb: string;
  items: PathItem[];
};

export const pathStages: PathStage[] = [
  {
    id: 1,
    name: "Understand",
    level: "Aware",
    blurb: "You can explain AI and use it well.",
    items: [
      { key: "foundations", course: "ai-foundations", title: "AI Foundations for IT Professionals", sub: "What AI is and is not", after: "Explain AI, machine learning and LLMs to a colleague, and spot the hype." },
      { key: "llms", course: "working-with-llms", title: "Working with LLMs", sub: "Prompting, limits, tools", after: "Get reliable results from chat models and know where they fail." },
      { key: "python", course: "python-and-data-essentials", title: "Python and data essentials", sub: "Notebooks, APIs, JSON", after: "Run notebooks, call APIs and handle data well enough to build." },
      { key: "ml", course: "machine-learning-basics", title: "Machine learning basics", sub: "Train, test, evaluate", after: "Know when classic machine learning beats an LLM, and how to judge a model." },
    ],
  },
  {
    id: 2,
    name: "Build",
    level: "Practitioner",
    blurb: "You can ship a small AI solution safely.",
    items: [
      { key: "apis", course: "build-with-llm-apis", title: "Build with LLM APIs", sub: "Structured output, tool calls", after: "Build small apps that call a model, return structured data and use tools." },
      { key: "rag", title: "Chat with your documents (RAG)", sub: "Retrieval from scratch", after: "Ship a document question-and-answer app and explain how it finds answers." },
      { key: "responsible", title: "Evaluate and use AI responsibly", sub: "Evals, privacy, bias", after: "Test an AI feature, protect data, and say when not to ship." },
      { key: "aicode", course: "ai-code-analysis", title: "Analyze AI-Generated Code", sub: "Review, test, scan", after: "Review, test and scan AI-written code before it reaches production." },
    ],
  },
  {
    id: 3,
    name: "Design",
    level: "Designer",
    blurb: "You can design agent-based systems.",
    items: [
      { key: "agents", title: "Agents fundamentals", sub: "Loops, tools, workflows", after: "Tell a workflow from an agent, and build a simple tool-using agent." },
      { key: "browser", course: "browser-automation", title: "Browser Automation for Agents", sub: "Agents that use the web", after: "Give an agent a browser and keep it reliable, safe and polite." },
      { key: "graphrag", course: "graphrag", title: "GraphRAG with Knowledge Graphs", sub: "Retrieval over connected data", after: "Answer connected, multi-hop questions with a knowledge graph." },
      { key: "memory", course: "agent-memory", title: "Persistent Memory for Agents", sub: "Agents that remember", after: "Design memory that stays accurate, private and affordable." },
      { key: "repo", course: "repo-context", title: "Repository Context for Coding Agents", sub: "Agents that fit your repo", after: "Make coding agents effective in a real codebase, and measure it." },
      { key: "prod", course: "production-agents", title: "Reliable Agents in Production", sub: "Evaluate, trace, secure, release", after: "Evaluate, trace, secure and release an agent you can trust." },
    ],
  },
];

export const pathFinal: PathItem = {
  key: "capstone",
  title: "Capstone: AI solution designer",
  sub: "Frame, architect, ship, explain",
  after:
    "Pick a real problem, frame it, choose an architecture, weigh risk and cost, ship it, and explain the result.",
};

export const pathElectives: PathItem[] = [
  { key: "finance", course: "financial-workflows", title: "Agentic Systems for Financial Workflows", sub: "A domain example", after: "Apply the path to regulated, high-stakes workflows." },
  { key: "synthetic", course: "synthetic-data", title: "Synthetic Data for Open LLMs", sub: "Expert", after: "Generate and filter training data for open models." },
  { key: "meta", course: "meta-harness", title: "Meta-Harness Architectures", sub: "Expert", after: "Study how agent harnesses can improve themselves." },
];

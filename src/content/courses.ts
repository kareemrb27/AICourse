export type Level = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
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
    slug: "ai-foundations",
    title: "AI Foundations for IT Professionals",
    track: "Stage 1 · Understand",
    level: "Beginner",
    summary:
      "Start here if you work in IT and have no AI background. Learn what AI actually is, how machines learn, how neural networks and language models work, where they fail, and how to read the landscape, with no coding required.",
    prerequisites: [
      "Comfortable with everyday IT concepts such as APIs, servers and files",
      "No programming or maths beyond school level is needed",
      "Optional: a free account with any chat assistant to try the examples",
    ],
    outcomes: [
      "Explain AI, machine learning, deep learning and generative AI to a colleague",
      "Describe the learning loop and why data quality and testing matter",
      "Understand neural networks and language models well enough to reason about their behaviour",
      "Judge which tasks suit AI using a practical checklist, and spot hallucination, bias and security risks",
      "Read the AI landscape: hosted versus open models, the stack, and the jargon",
    ],
    lessons: [
      { slug: "what-is-ai", title: "What AI is, and is not", summary: "The map of terms and the shift from rules to learning.", minutes: 60 },
      { slug: "how-machines-learn", title: "How machines learn", summary: "Data, models, training, overfitting and the metrics that matter.", minutes: 90 },
      { slug: "neural-networks", title: "Neural networks in plain terms", summary: "Neurons, layers, parameters and how a network learns.", minutes: 90 },
      { slug: "how-llms-work", title: "How language models work", summary: "Tokens, embeddings, attention, context and training stages.", minutes: 120 },
      { slug: "strengths-and-limits", title: "Strengths, limits and risks", summary: "Hallucination, bias, privacy, security and a suitability checklist.", minutes: 90 },
      { slug: "the-ai-landscape", title: "The AI landscape for IT professionals", summary: "Hosted versus open models, the stack, jargon and where you fit.", minutes: 90 },
      { slug: "capstone", title: "Capstone: your AI literacy brief", summary: "Write a brief that helps your team make better AI decisions.", minutes: 180 },
    ],
  },
  {
    slug: "working-with-llms",
    title: "Working with LLMs",
    track: "Stage 1 · Understand",
    level: "Beginner",
    summary:
      "Learn to get reliable, useful results from AI assistants. Choose the right assistant and mode, write clear prompts, use proven patterns, work with documents, use search and reasoning tools, and check answers and protect your data, with no coding required.",
    prerequisites: [
      "Comfortable with everyday IT concepts such as files, APIs and logs",
      "Recommended: complete AI Foundations for IT Professionals first, or know what a language model is",
      "A free account with at least one chat assistant, ideally two, to try the exercises",
    ],
    outcomes: [
      "Choose an assistant, model and mode that suit a task",
      "Write prompts with clear task, context, input, constraints and format",
      "Apply patterns such as examples, steps, structured output and chaining",
      "Give a model documents and context, and get answers you can trace to a source",
      "Use search, reasoning and code execution appropriately, and know their risks",
      "Check outputs, protect sensitive data and recognize prompt injection",
    ],
    lessons: [
      { slug: "choosing-an-assistant", title: "Choosing and using an assistant", summary: "Models versus products, the controls that matter, and a two-assistant test.", minutes: 60 },
      { slug: "prompting-basics", title: "Prompting basics", summary: "The five parts of a good prompt and the habit of iterating.", minutes: 90 },
      { slug: "prompt-patterns", title: "Prompt patterns that work", summary: "Examples, steps, formats, chaining and self-review.", minutes: 90 },
      { slug: "context-and-documents", title: "Context and documents", summary: "Context windows, grounding answers in a source, and long documents.", minutes: 90 },
      { slug: "tools-and-reasoning", title: "Search, reasoning and tools", summary: "Reasoning modes, web search, deep research, code execution and connectors.", minutes: 90 },
      { slug: "verify-and-stay-safe", title: "Verify and stay safe", summary: "Checking answers, privacy rules, prompt injection and a personal policy.", minutes: 90 },
      { slug: "capstone", title: "Capstone: your prompt playbook", summary: "Build and test reusable prompts for five real tasks.", minutes: 180 },
    ],
  },
  {
    slug: "python-and-data-essentials",
    title: "Python and Data Essentials",
    track: "Stage 1 · Understand",
    level: "Beginner",
    summary:
      "Learn just enough Python to start building with AI. Set up a clean environment, write and read scripts, work with files and JSON, call APIs safely, analyze data with pandas, use notebooks, and get help from an AI assistant without losing control, with examples from IT work.",
    prerequisites: [
      "Comfortable with a terminal and everyday IT concepts such as files, APIs and logs",
      "No programming experience is required, though any scripting helps",
      "A computer where you can install software, or a browser to use Google Colab",
    ],
    outcomes: [
      "Set up Python with a virtual environment and run scripts from the terminal",
      "Read and write Python using variables, lists, dictionaries, loops and functions",
      "Read and write files, JSON and CSV, and handle errors",
      "Call web APIs with requests, keep keys safe, and handle failures and rate limits",
      "Load, clean, summarize and chart data with pandas",
      "Use notebooks, Git and an AI assistant to write code you have checked and understand",
    ],
    lessons: [
      { slug: "setup-and-first-script", title: "Set up and run your first script", summary: "Install Python, use virtual environments and read error messages.", minutes: 90 },
      { slug: "python-basics", title: "Python basics for IT work", summary: "Values, text, lists, dictionaries, decisions and loops.", minutes: 120 },
      { slug: "functions-files-and-json", title: "Functions, files and JSON", summary: "Reusable functions, error handling, files, JSON and CSV.", minutes: 120 },
      { slug: "calling-apis", title: "Calling APIs", summary: "HTTP requests, keys, timeouts, retries and handling failures.", minutes: 90 },
      { slug: "data-with-pandas", title: "Data with pandas", summary: "DataFrames, cleaning, grouping, dates and a first chart.", minutes: 120 },
      { slug: "notebooks-and-ai-help", title: "Notebooks, Git and AI help", summary: "Notebook habits, coding with an assistant safely, and version control.", minutes: 90 },
      { slug: "capstone", title: "Capstone: a weather brief", summary: "Fetch, clean, summarize and chart real API data in a tested script.", minutes: 180 },
    ],
  },
  {
    slug: "machine-learning-basics",
    title: "Machine Learning Basics",
    track: "Stage 1 · Understand",
    level: "Beginner",
    summary:
      "Learn how machine learning models are built, tested and judged. Frame a problem, prepare data, train classic models with scikit-learn, evaluate them honestly, avoid overfitting and leakage, and know when to use clustering, anomaly detection, a rule or a language model.",
    prerequisites: [
      "Comfortable with Python and pandas, as taught in Python and Data Essentials",
      "No advanced maths is required, only comfort with percentages and averages",
      "Recommended: AI Foundations for IT Professionals first",
    ],
    outcomes: [
      "Frame a business problem as classification, regression, clustering or anomaly detection",
      "Prepare data, split it properly and spot data leakage",
      "Train and compare linear, tree-based and nearest-neighbor models against a baseline",
      "Evaluate with confusion matrices, precision, recall, thresholds, costs and cross-validation",
      "Recognize and reduce overfitting, and tune settings without peeking at the test set",
      "Choose between machine learning, simple rules and language models, and monitor a model for drift",
    ],
    lessons: [
      { slug: "ml-in-practice", title: "Machine learning in practice", summary: "Kinds of learning, the workflow, and when machine learning is the right tool.", minutes: 60 },
      { slug: "data-and-features", title: "Data, features and honest splits", summary: "Features and labels, train and test sets, leakage and cleaning.", minutes: 90 },
      { slug: "first-models", title: "Your first models", summary: "Baselines, regression, logistic regression, trees and nearest neighbors.", minutes: 120 },
      { slug: "evaluating-models", title: "Evaluating models", summary: "The confusion matrix, precision, recall, thresholds, costs and cross-validation.", minutes: 90 },
      { slug: "overfitting-and-improvement", title: "Overfitting and improvement", summary: "Spotting overfitting, regularization, tuning and ensembles.", minutes: 90 },
      { slug: "clustering-and-anomalies", title: "Clustering, anomalies and choosing tools", summary: "Unsupervised learning, drift, responsible use and rules versus models versus LLMs.", minutes: 90 },
      { slug: "capstone", title: "Capstone: a server failure early warning", summary: "Build, evaluate and write up a complete model, with its limits.", minutes: 180 },
    ],
  },
  {
    slug: "build-with-llm-apis",
    title: "Build with LLM APIs",
    track: "Stage 2 · Build",
    level: "Intermediate",
    summary:
      "Call a language model from your own Python code and build features that hold up. Make your first API call, manage conversations and streaming, get validated structured output, give the model tools safely, handle errors and cost, and test and secure an LLM feature.",
    prerequisites: [
      "Comfortable with Python, JSON and calling web APIs, as taught in Python and Data Essentials",
      "Recommended: Working with LLMs, for prompting and for checking model output",
      "Python 3.10 or newer, and an account with a small amount of credit for the Claude API",
    ],
    outcomes: [
      "Make a call to the Claude API with the official Python SDK, keep the key safe and set a spend limit",
      "Build conversations, use system prompts, control length and effort, and stream responses",
      "Get validated structured output with Pydantic and check it before using it",
      "Give a model tools, run the tool loop and design tools that are safe to expose",
      "Handle errors, rate limits and spend caps, log usage, set budgets and reduce cost",
      "Unit test with a fake client, build a small eval, and defend against prompt injection and leaked secrets",
    ],
    lessons: [
      { slug: "first-api-call", title: "Your first API call", summary: "Accounts, keys, the SDK, reading a response, tokens and cost.", minutes: 90 },
      { slug: "conversations-and-control", title: "Conversations, control and streaming", summary: "History, system prompts, limits, effort, streaming and what no longer works.", minutes: 90 },
      { slug: "structured-output", title: "Structured output", summary: "Pydantic schemas, validated results, checks and business rules.", minutes: 90 },
      { slug: "tool-use", title: "Tool use", summary: "The tool loop, safe tool design, approval gates and the tool runner.", minutes: 120 },
      { slug: "reliability-and-cost", title: "Reliability and cost", summary: "Errors, retries, spend caps, usage logging, caching and batches.", minutes: 90 },
      { slug: "testing-and-safety", title: "Testing and safety", summary: "Fake-client tests, small evals, prompt injection, secrets and privacy.", minutes: 90 },
      { slug: "capstone", title: "Capstone: a support ticket assistant", summary: "Build, test and evaluate a triage and reply assistant.", minutes: 240 },
    ],
  },
  {
    slug: "chat-with-your-documents",
    title: "Chat with Your Documents (RAG)",
    track: "Stage 2 · Build",
    level: "Intermediate",
    summary:
      "Build an assistant that answers from your own documents and shows its sources. Prepare and chunk documents, search with embeddings, keyword search and reranking, generate cited answers that decline when the documents do not say, and measure retrieval and answers with a test set you can re-run.",
    prerequisites: [
      "Comfortable with Python and the Claude API, as taught in Build with LLM APIs",
      "Machine Learning Basics is helpful for thinking about evaluation, but not required",
      "A computer that can download a small embedding model (about 100 MB), and API credit for the answer-generation calls",
    ],
    outcomes: [
      "Explain how RAG works and decide between RAG, long context and other approaches",
      "Load, clean and chunk documents, keeping the metadata you need for citations and access control",
      "Build semantic search with embeddings and understand where it fails",
      "Compare keyword, embedding, hybrid and reranked retrieval using measurements",
      "Generate answers with citations, decline when the sources do not contain the answer, and defend against injected instructions",
      "Build a test set, evaluate retrieval and answers separately, and find the cause of a failure",
    ],
    lessons: [
      { slug: "what-is-rag", title: "What RAG is and when to use it", summary: "The problem, the two phases, a tiny RAG, and RAG versus long context.", minutes: 60 },
      { slug: "preparing-documents", title: "Preparing documents", summary: "Loading, metadata, chunking strategies and keeping an index in sync.", minutes: 90 },
      { slug: "embeddings-and-search", title: "Embeddings and search", summary: "Embeddings, a vector index from scratch, filters and where search surprises you.", minutes: 90 },
      { slug: "better-retrieval", title: "Better retrieval", summary: "Keyword search, hybrid search, reranking, query rewriting and context.", minutes: 120 },
      { slug: "generating-answers", title: "Generating grounded answers", summary: "Citations with search results, declining, follow-ups and injected instructions.", minutes: 90 },
      { slug: "evaluating-rag", title: "Evaluating RAG", summary: "Test sets, retrieval and answer measures, judges and finding failure causes.", minutes: 90 },
      { slug: "capstone", title: "Capstone: an assistant for your documents", summary: "Build, test and evaluate a complete cited-answer assistant.", minutes: 240 },
    ],
  },
  {
    slug: "evaluate-and-use-ai-responsibly",
    title: "Evaluate and Use AI Responsibly",
    track: "Stage 2 · Build",
    level: "Intermediate",
    summary:
      "Test an AI feature honestly and decide whether to ship it. Put intervals on evaluation scores, test for unfairness, protect personal data, red-team for attacks, design human oversight and governance, and make a documented ship or no-ship decision.",
    prerequisites: [
      "Comfortable with Python and pandas, and with the evaluation ideas from Build with LLM APIs",
      "Recommended: Chat with Your Documents, whose assistant is a good system to review",
      "Everything runs locally with free libraries. Calls to the Claude API are optional",
    ],
    outcomes: [
      "Report evaluation results with confidence intervals, compare versions fairly and find weak slices",
      "Measure fairness with several definitions and run counterfactual tests on language model features",
      "Map data flows, redact personal data with tested code and check a dataset for re-identification risk",
      "Build a repeatable red-team suite and measure attack success with intervals",
      "Design human oversight, documentation and accountability, and know the main frameworks and rules",
      "Write launch gates, run a staged rollout with a kill switch, and decide when not to ship",
    ],
    lessons: [
      { slug: "evals-you-can-trust", title: "Evaluation you can trust", summary: "Intervals, run-to-run noise, paired comparisons, slices and judge agreement.", minutes: 90 },
      { slug: "fairness-and-bias", title: "Fairness and bias", summary: "Where bias comes from, fairness metrics with real numbers and counterfactual tests.", minutes: 90 },
      { slug: "privacy-and-data", title: "Privacy and data protection", summary: "Data-flow maps, redaction, re-identification risk and retention.", minutes: 90 },
      { slug: "safety-and-red-teaming", title: "Safety and red teaming", summary: "Threat models, a re-runnable attack suite, defenses and measuring them.", minutes: 90 },
      { slug: "oversight-and-governance", title: "Oversight and governance", summary: "Human oversight, audit records, system cards, frameworks and the EU AI Act.", minutes: 90 },
      { slug: "deciding-to-ship", title: "Deciding to ship", summary: "Risk registers, launch gates, staged rollout, kill switches and when not to ship.", minutes: 90 },
      { slug: "capstone", title: "Capstone: a responsible AI review", summary: "Review a system end to end and defend a ship or no-ship decision.", minutes: 240 },
    ],
  },
  {
    slug: "agents-fundamentals",
    title: "Agents Fundamentals",
    track: "Stage 3 · Design",
    level: "Intermediate",
    summary:
      "Build an agent from the loop up and learn when not to. Tell workflows from agents, write the tool-use loop with hard limits, design safe and teachable tools, manage planning and context, enforce safety in code, and evaluate agents with repeatable tasks and honest statistics.",
    prerequisites: [
      "Comfortable with Python and the Claude API, as taught in Build with LLM APIs",
      "Recommended: Evaluate and Use AI Responsibly, for evaluation statistics and safety thinking",
      "API credit is only needed to run agents against a real model. All tests in the course run without one",
    ],
    outcomes: [
      "Choose between a single call, a workflow and an agent, and build the five standard workflow patterns",
      "Write an agent loop with turn, token and error handling, and test it with a scripted client",
      "Design sandboxed, bounded and self-explaining tools and test them like security boundaries",
      "Manage planning, notes and long runs without editing conversation history",
      "Enforce permissions, approvals, limits and loop detection in code, and defend against injected instructions",
      "Evaluate agents on checkable tasks, repeat runs, report intervals and read traces to find failure causes",
    ],
    lessons: [
      { slug: "workflows-vs-agents", title: "Workflows versus agents", summary: "The definitions, five workflow patterns in code and when an agent is worth it.", minutes: 90 },
      { slug: "the-agent-loop", title: "The agent loop", summary: "Build the loop, add limits and a trace, and test it without a model.", minutes: 90 },
      { slug: "designing-tools", title: "Designing tools", summary: "Sandboxed file tools, descriptions as prompts and errors that teach.", minutes: 120 },
      { slug: "planning-and-memory", title: "Planning, memory and long tasks", summary: "Plans, notes, small outputs and restarting from a summary.", minutes: 90 },
      { slug: "safety-and-control", title: "Safety and control", summary: "A policy layer, approvals, sandboxes, limits and injected instructions.", minutes: 120 },
      { slug: "evaluating-agents", title: "Evaluating agents", summary: "End-state checks, repeated runs, pass-to-the-k and reading transcripts.", minutes: 90 },
      { slug: "capstone", title: "Capstone: an incident investigator", summary: "Build, test and evaluate a read-only log-investigation agent.", minutes: 300 },
    ],
  },
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
      },
      {
        slug: "knowledge-graph-foundations",
        title: "Knowledge graph foundations",
        summary: "Property graphs, data modeling and your first Cypher queries.",
        minutes: 120,
      },
      {
        slug: "building-the-graph",
        title: "Building a graph from unstructured text",
        summary: "Chunking, schema-guided extraction and entity resolution.",
        minutes: 120,
      },
      {
        slug: "retrieval-patterns",
        title: "GraphRAG retrieval patterns",
        summary: "Vector plus traversal, hybrid search and text-to-Cypher.",
        minutes: 120,
      },
      {
        slug: "local-vs-global-search",
        title: "Communities: local vs global search",
        summary: "The Microsoft GraphRAG approach to corpus-wide questions.",
        minutes: 90,
      },
      {
        slug: "agents-and-evaluation",
        title: "Agents, evaluation and production",
        summary: "Put retrieval behind an agent, measure it, control the cost.",
        minutes: 120,
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Build and ship a GraphRAG app on a corpus you care about.",
        minutes: 240,
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
      },
      {
        slug: "memory-taxonomy",
        title: "A taxonomy of agent memory",
        summary: "Working, episodic, semantic and procedural memory.",
        minutes: 60,
      },
      {
        slug: "short-term-memory",
        title: "Short-term memory and context management",
        summary: "Checkpoints, trimming, compaction and structured notes.",
        minutes: 120,
      },
      {
        slug: "long-term-memory",
        title: "Long-term memory stores",
        summary: "Write, read and maintenance paths, with a Postgres schema.",
        minutes: 150,
      },
      {
        slug: "memory-architectures",
        title: "Memory architectures",
        summary: "MemGPT and Letta, Generative Agents, and Zep with Graphiti.",
        minutes: 120,
      },
      {
        slug: "evaluation-and-safety",
        title: "Evaluation, privacy and safety",
        summary: "Benchmarks, test design, leaks and memory poisoning.",
        minutes: 90,
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Ship an assistant that measurably improves by remembering.",
        minutes: 240,
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
      },
      {
        slug: "evals",
        title: "Evals: knowing it works",
        summary: "Building test sets, graders and validated LLM judges.",
        minutes: 150,
      },
      {
        slug: "observability",
        title: "Tracing and observability",
        summary: "See what the agent saw, decided and did.",
        minutes: 120,
      },
      {
        slug: "failure-handling",
        title: "Failure handling and durability",
        summary: "Timeouts, retries, idempotency, caps and human approval.",
        minutes: 150,
      },
      {
        slug: "security",
        title: "Security: injection and excessive agency",
        summary: "The lethal trifecta, least privilege and safe tool design.",
        minutes: 120,
      },
      {
        slug: "cost-and-release",
        title: "Cost, latency and safe releases",
        summary: "Unit economics, caching, rollouts and runbooks.",
        minutes: 120,
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Harden an action-taking agent and prove it is ready to ship.",
        minutes: 300,
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
      },
      {
        slug: "instruction-files",
        title: "Instruction files: AGENTS.md and friends",
        summary: "What to write, what to leave out, and how to keep it alive.",
        minutes: 90,
      },
      {
        slug: "code-search-and-retrieval",
        title: "Code search and retrieval",
        summary: "Grep, embeddings, repo maps and structural search compared.",
        minutes: 150,
      },
      {
        slug: "tools-and-environment",
        title: "Tools, feedback loops and MCP",
        summary: "Fast verification, readable failures and external knowledge.",
        minutes: 120,
      },
      {
        slug: "skills-and-subagents",
        title: "Skills and subagents",
        summary: "Progressive disclosure and context isolation.",
        minutes: 90,
      },
      {
        slug: "evaluating-context",
        title: "Evaluating and maintaining context",
        summary: "Private benchmarks, controlled comparisons and context rot.",
        minutes: 120,
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Engineer a real repo for agents and prove the improvement.",
        minutes: 300,
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
      },
      {
        slug: "browser-fundamentals",
        title: "Browser automation fundamentals",
        summary: "Protocols, Playwright, contexts, locators and auto-waiting.",
        minutes: 120,
      },
      {
        slug: "how-agents-see-pages",
        title: "How agents see pages",
        summary: "HTML, accessibility trees, screenshots and hybrids.",
        minutes: 90,
      },
      {
        slug: "agent-loop-and-actions",
        title: "The agent loop and action design",
        summary: "Tools, failure modes, and mixing scripts with AI.",
        minutes: 150,
      },
      {
        slug: "reliability",
        title: "Making runs reliable",
        summary: "Waits, obstacles, isolation, traces and scaling out.",
        minutes: 120,
      },
      {
        slug: "safety-and-ethics",
        title: "Safety, ethics and respectful automation",
        summary: "Prompt injection, isolation, approvals, robots.txt and terms.",
        minutes: 90,
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Ship a reliable, safe browser agent for a real task.",
        minutes: 300,
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
      },
      {
        slug: "instruction-data",
        title: "Generating instruction data",
        summary: "Self-Instruct, Evol-Instruct, Magpie and designing for diversity.",
        minutes: 150,
      },
      {
        slug: "responses-and-preferences",
        title: "Responses, preferences and feedback",
        summary: "Distillation, verification, judges and DPO pairs.",
        minutes: 150,
      },
      {
        slug: "pretraining-style-data",
        title: "Pretraining-style synthetic text",
        summary: "Textbook-quality data, Cosmopedia and rephrasing.",
        minutes: 120,
      },
      {
        slug: "quality-and-contamination",
        title: "Quality, diversity, contamination and collapse",
        summary: "Filtering pipelines, deduplication and decontamination.",
        minutes: 150,
      },
      {
        slug: "training-evaluation-licensing",
        title: "Training, evaluation and licensing",
        summary: "Ablations, evaluation harnesses, terms and dataset cards.",
        minutes: 150,
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Generate data, train a small model and prove it helped.",
        minutes: 360,
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
      },
      {
        slug: "harness-anatomy",
        title: "The anatomy of a harness",
        summary: "Seven design surfaces and how to make them optimizable.",
        minutes: 120,
      },
      {
        slug: "long-running-harnesses",
        title: "Harnesses for long-running work",
        summary: "Initializer and worker agents, feature lists and orchestrators.",
        minutes: 90,
      },
      {
        slug: "what-meta-harness-means",
        title: "What \"meta-harness\" means",
        summary: "Two senses of the term, and the research lineage behind it.",
        minutes: 120,
      },
      {
        slug: "method-deep-dive",
        title: "Deep dive: the Meta-Harness method",
        summary: "Search space, proposer, traces versus summaries, and results.",
        minutes: 150,
      },
      {
        slug: "build-your-own-search",
        title: "Build your own harness search",
        summary: "Splits, traces, proposer instructions, selection and audits.",
        minutes: 150,
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Search for a better harness and prove it on held-out data.",
        minutes: 360,
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
      },
      {
        slug: "architecture-patterns",
        title: "Architecture patterns for financial workflows",
        summary: "The reference pipeline, case state machines and exception queues.",
        minutes: 90,
      },
      {
        slug: "numbers-and-data",
        title: "Numbers, data and ledgers",
        summary: "Exact decimals, calculation tools, authoritative sources, double entry.",
        minutes: 120,
      },
      {
        slug: "documents-and-retrieval",
        title: "Documents, extraction and retrieval",
        summary: "Schemas with evidence, validation, and what FinanceBench showed.",
        minutes: 120,
      },
      {
        slug: "controls-and-compliance",
        title: "Controls, compliance and risk guidance",
        summary: "Approvals, audit trails, model risk management and frameworks.",
        minutes: 120,
      },
      {
        slug: "evaluation-and-operations",
        title: "Evaluation and operations",
        summary: "Error-cost metrics, shadow mode, monitoring and incidents.",
        minutes: 120,
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Build a controlled financial workflow on synthetic data.",
        minutes: 300,
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
      },
      {
        slug: "review-by-risk",
        title: "Reviewing by risk",
        summary: "Intent first, risk map, known patterns and running the code.",
        minutes: 90,
      },
      {
        slug: "security-weaknesses",
        title: "Common security weaknesses",
        summary: "Injection, traversal, randomness, secrets and access control, with fixes.",
        minutes: 120,
      },
      {
        slug: "dependencies-and-supply-chain",
        title: "Dependencies and the supply chain",
        summary: "Hallucinated packages, vulnerabilities, SBOMs, SLSA and licenses.",
        minutes: 90,
      },
      {
        slug: "automated-analysis",
        title: "Automated analysis and governance",
        summary: "Linters, types, SAST, secret scanning, LLM reviewers and policy.",
        minutes: 120,
      },
      {
        slug: "testing-ai-code",
        title: "Testing AI-generated code",
        summary: "Property-based tests, mutation testing, fuzzing and safe execution.",
        minutes: 120,
      },
      {
        slug: "capstone",
        title: "Capstone project",
        summary: "Build a pipeline that gates AI-assisted changes, and measure it.",
        minutes: 300,
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

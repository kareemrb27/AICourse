// Topics people in the field are talking about, each with a video worth
// watching and the lessons here that teach the idea. Hand-picked: check the
// title, channel, length and date on YouTube, write the summary in our own
// words from what the video says it covers, and add a note when the speaker
// sells something relevant. Keep four, so the row fills the grid.
export type TrendingTopic = {
  topic: string;
  tag: string; // one word shown on the thumbnail
  summary: string; // one or two sentences, kept short for the card
  note?: string; // a short heads-up about the source
  video: {
    id: string;
    title: string;
    channel: string;
    minutes: number;
    published: string; // YYYY-MM-DD
  };
  learn: { course: string; lesson: string }[]; // lessons that explain the idea
};

export const trendingTopics: TrendingTopic[] = [
  {
    topic: "Agents that improve over time",
    tag: "Agents",
    summary:
      "LangChain’s CEO splits an agent into the model, the harness and the context, and shows how each can get better. His case: traces and evals are the shared foundation.",
    note: "From LangChain, which sells agent tooling.",
    video: {
      id: "xy_7SzwsIjM",
      title: "How to Build Agents That Improve Over Time: Model, Harness, Context | Interrupt London",
      channel: "LangChain",
      minutes: 20,
      published: "2026-10-27",
    },
    learn: [
      { course: "meta-harness", lesson: "what-is-a-harness" },
      { course: "production-agents", lesson: "evals" },
    ],
  },
  {
    topic: "Why more context can make agents worse",
    tag: "Context",
    summary:
      "IBM’s Martin Keen explains context rot and four ways an agent’s context goes wrong: poisoning, distraction, confusion and clash. Then four fixes: validate, compact, curate and prune.",
    video: {
      id: "BwXremQ-i6I",
      title: "Context Engineering for AI Agents: 4 Failure Modes to Avoid",
      channel: "IBM Technology",
      minutes: 10,
      published: "2026-10-15",
    },
    learn: [
      { course: "repo-context", lesson: "why-context-matters" },
      { course: "agent-memory", lesson: "short-term-memory" },
    ],
  },
  {
    topic: "MCP: how agents reach your tools",
    tag: "MCP",
    summary:
      "An animated walkthrough of the Model Context Protocol: hosts, clients and servers, one tool call step by step, and why tool descriptions need to be trusted.",
    video: {
      id: "cJbK_czw-q0",
      title: "How MCP Works: The Model Context Protocol, Visually",
      channel: "AI Systems with Andy",
      minutes: 8,
      published: "2026-10-13",
    },
    learn: [
      { course: "agents-fundamentals", lesson: "designing-tools" },
      { course: "repo-context", lesson: "tools-and-environment" },
    ],
  },
  {
    topic: "Loops: agents that keep working",
    tag: "Loops",
    summary:
      "Dan Vega explains the Ralph loop: a simple script that reruns a coding agent with fresh context each round, keeping its state in files like a task list and a progress log. He builds a small Java app with it.",
    note: "The demo is in Java; the pattern works in any language.",
    video: {
      id: "CV97l0GkPHo",
      title: "The Ralph Loop Explained: Automate AI Coding Tasks in Java",
      channel: "Dan Vega",
      minutes: 18,
      published: "2026-02-05",
    },
    learn: [
      { course: "agents-fundamentals", lesson: "the-agent-loop" },
      { course: "meta-harness", lesson: "long-running-harnesses" },
    ],
  },
];

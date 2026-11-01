// Topics people in the field are talking about, each with a video worth
// watching and the lessons here that teach the idea behind it. Hand-picked:
// check the title, channel and length on YouTube, write the summary in our own
// words, and say whose talk it is when the speaker sells something relevant.
export type TrendingTopic = {
  topic: string;
  tags: string[];
  summary: string;
  note?: string; // a short heads-up about the source, shown under the summary
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
    tags: ["Agents", "Evals", "Memory"],
    summary:
      "LangChain’s CEO splits an agent into three parts, the model, the harness around it and the context it draws on, and describes how each can get better over time. His argument is that traces and evals are the shared foundation: you cannot improve what you cannot measure.",
    note: "A conference talk from LangChain, which sells agent tooling and features its own products. The ideas apply to any stack.",
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
      { course: "agent-memory", lesson: "long-term-memory" },
    ],
  },
];

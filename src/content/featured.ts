// Lessons shown in the "Watch and start" row on the home page. Each one points
// at a lesson that already embeds this video, so the card is a preview of it.
export type FeaturedVideo = {
  course: string;
  lesson: string;
  videoId: string;
  videoTitle: string;
  channel: string;
  minutes: number;
  // Index into the four path colors on the home page.
  stage: 0 | 1 | 2;
};

export const featuredVideos: FeaturedVideo[] = [
  { course: "ai-foundations", lesson: "what-is-ai", videoId: "qYNweeDHiyU", videoTitle: "AI, Machine Learning, Deep Learning and Generative AI Explained", channel: "IBM Technology", minutes: 10, stage: 0 },
  { course: "ai-foundations", lesson: "how-llms-work", videoId: "LPZh9BOjkQs", videoTitle: "Large Language Models explained briefly", channel: "3Blue1Brown", minutes: 7, stage: 0 },
  { course: "chat-with-your-documents", lesson: "what-is-rag", videoId: "T-D1OfcDW1M", videoTitle: "What is Retrieval-Augmented Generation (RAG)?", channel: "IBM Technology", minutes: 7, stage: 1 },
  { course: "build-with-llm-apis", lesson: "tool-use", videoId: "h8gMhXYAv1k", videoTitle: "What is Tool Calling? Connecting LLMs to Your Data", channel: "IBM Technology", minutes: 5, stage: 1 },
  { course: "agents-fundamentals", lesson: "the-agent-loop", videoId: "vFdIrZyKEwQ", videoTitle: "ReAct AI Agents, clearly explained!", channel: "Akshay Pachaar", minutes: 6, stage: 2 },
  { course: "production-agents", lesson: "what-reliable-means", videoId: "D7_ipDqhtwk", videoTitle: "How We Build Effective Agents", channel: "AI Engineer", minutes: 15, stage: 2 },
];

// Recent happenings in AI, shown on /news and as a teaser on the home page.
// A weekly job drafts new entries here for review. Keep every entry factual,
// written in our own words, dated by when the source published, and linked to
// the original. Prefer the lab's own page over press coverage.
export type NewsCategory = "models" | "open" | "ideas" | "business" | "policy";

export type NewsItem = {
  date: string; // YYYY-MM-DD, when the source published
  category: NewsCategory;
  title: string;
  summary: string;
  source: string; // who published it, shown next to the link
  url: string;
  learn?: { course: string; lesson: string }; // the lesson that explains the idea
};

export const newsCategories: Record<NewsCategory, { label: string; color: string }> = {
  models: { label: "Frontier models", color: "#10b981" },
  open: { label: "Open models", color: "#38bdf8" },
  ideas: { label: "Research & ideas", color: "#a78bfa" },
  business: { label: "Business", color: "#fbbf24" },
  policy: { label: "Policy & safety", color: "#f472b6" },
};

// The day the list was last reviewed, shown at the top of the page.
export const newsReviewed = "2026-10-31";

export const news: NewsItem[] = [
  {
    date: "2026-10-30",
    category: "ideas",
    title: "Trending: models that only use part of themselves",
    summary:
      "Mistral Large 4 is listed at about 1 trillion parameters with 52 billion active, and Meta’s new open model is reported at 816 billion with 42 billion active. Both quote a total and an “active” size, the mark of a mixture-of-experts design: only a few expert sub-networks run for each token, so a huge model costs far less to run.",
    source: "Mistral",
    url: "https://mistral.ai/news/mistral-large-4/",
    learn: { course: "ai-foundations", lesson: "how-llms-work" },
  },
  {
    date: "2026-10-30",
    category: "ideas",
    title: "Google gets a first AI response from a chip in orbit",
    summary:
      "Google Research says its Project Suncatcher prototype satellite sent back the first AI response from a data-center-class TPU in space, which the team calls its “Hello World” milestone. It is an early test of running AI compute off the ground.",
    source: "Google",
    url: "https://blog.google/innovation-and-ai/models-and-research/google-research/project-suncatcher-satellite-response/",
  },
  {
    date: "2026-10-30",
    category: "policy",
    title: "OpenAI on how websites can signal AI training preferences",
    summary:
      "OpenAI published its approach to making it easier for website owners to say whether their content may be used to train AI. The question of who controls training data is one to watch if you build on or publish web content.",
    source: "OpenAI",
    url: "https://openai.com/index/helping-websites-express-ai-training-preferences",
    learn: { course: "evaluate-and-use-ai-responsibly", lesson: "privacy-and-data" },
  },
  {
    date: "2026-10-29",
    category: "policy",
    title: "OpenAI publishes an updated Model Spec",
    summary:
      "OpenAI released a new version of its Model Spec, the public document describing how its models are meant to behave. The same week it also wrote about how it detects misalignment in frontier models.",
    source: "OpenAI",
    url: "https://openai.com/index/updated-model-spec",
    learn: { course: "evaluate-and-use-ai-responsibly", lesson: "oversight-and-governance" },
  },
  {
    date: "2026-10-28",
    category: "models",
    title: "Google announces Gemini 4 Carbon",
    summary:
      "Google calls Gemini 4 Carbon its strongest model, with state-of-the-art cybersecurity and long-horizon capabilities. Long-horizon means staying on task over many steps, which is what agents depend on.",
    source: "Google",
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/",
    learn: { course: "agents-fundamentals", lesson: "the-agent-loop" },
  },
  {
    date: "2026-10-28",
    category: "business",
    title: "OpenAI and ServiceNow expand their partnership",
    summary:
      "OpenAI and ServiceNow announced a wider partnership covering enterprise workflows, one more sign of AI labs working through the software companies that businesses already use.",
    source: "OpenAI",
    url: "https://openai.com/index/openai-servicenow-partnership-expansion",
  },
  {
    date: "2026-10-26",
    category: "business",
    title: "Anthropic files for an IPO",
    summary:
      "Anthropic filed an S-1 with the US SEC for a proposed initial public offering, planning to list on Nasdaq under the symbol ANT. The registration is not yet effective, and the number of shares and price range have not been set.",
    source: "Anthropic",
    url: "https://www.anthropic.com/news/s1-sec",
  },
  {
    date: "2026-10-17",
    category: "open",
    title: "DeepSeek posts V4.1-Flash-1017",
    summary:
      "DeepSeek added a dated update to its open V4.1-Flash model on Hugging Face. Dated checkpoints like this are how many labs ship small improvements to open models between big releases.",
    source: "Hugging Face",
    url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017",
  },
  {
    date: "2026-10-15",
    category: "open",
    title: "Meta opens the weights of Muse Spark",
    summary:
      "Press reports say Meta released Muse Spark Open, an open-weight model of about 816 billion parameters with a 1 million token context window. It uses Meta’s own Muse Model License rather than a standard open-source one, so read the terms before building on it.",
    source: "The Batch",
    url: "https://www.deeplearning.ai/the-batch/meta-releases-wonder-opens-spark/",
  },
  {
    date: "2026-10-12",
    category: "models",
    title: "Meta releases its first frontier models, Muse Wonder",
    summary:
      "Meta’s Superintelligence Lab released Muse Wonder through its API and Muse Wonder Full for Muse Code subscribers. By Meta’s own testing they roughly match the top models from OpenAI and Anthropic, though those results are not independent.",
    source: "TechCrunch",
    url: "https://techcrunch.com/2026/10/12/meta-releases-its-first-frontier-model-muse-wonder/",
  },
  {
    date: "2026-10-07",
    category: "models",
    title: "Anthropic introduces Claude Haiku 5.5",
    summary:
      "Anthropic released Claude Haiku 5.5, the newest model in its small, fast Haiku line.",
    source: "Anthropic",
    url: "https://www.anthropic.com/claude-haiku-5-5",
  },
  {
    date: "2026-10-06",
    category: "open",
    title: "Mistral Large 4: previewed in October, weights now on Hugging Face",
    summary:
      "Mistral previewed Large 4, a natively multimodal mixture-of-experts model, on October 6 and promised the weights by the end of the month. Its Hugging Face page now lists them. Check the model card for the license before you use it.",
    source: "Mistral",
    url: "https://mistral.ai/news/mistral-large-4/",
  },
];

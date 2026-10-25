import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "How AICourse builds free courses from public videos, docs, papers and tutorials, and credits the original authors.",
};

export default function About() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-16">
      <p className="label">About</p>
      <h1 className="mt-3 text-5xl font-extrabold tracking-[-0.03em]">
        Knowledge should not cost $799
      </h1>
      <div className="prose-lesson mt-8">
        <p>
          Good AI engineering education is expensive to attend and easy to
          miss. But almost every topic taught in paid programs is also covered,
          openly, by the people who build the tools: docs, research papers,
          engineering blogs, conference talks and free courses.
        </p>
        <h2>How each course is made</h2>
        <ul>
          <li>
            <strong>Curated, not copied.</strong> Every lesson is our own
            explanation plus links to the best public resource for each idea.
            We never reproduce paid or copyrighted material.
          </li>
          <li>
            <strong>Ordered like a real course.</strong> Lessons build on each
            other, with outcomes, exercises and a capstone project.
          </li>
          <li>
            <strong>Credited.</strong> Each resource shows its source and links
            to the original, so the authors get the traffic they deserve.
          </li>
          <li>
            <strong>Free to use.</strong> If a linked resource moves behind a
            paywall, open an issue and we will replace it.
          </li>
        </ul>
        <p>
          This is an independent project. It is not affiliated with, endorsed
          by, or a replacement for any conference or company whose topics
          inspired the course list.
        </p>
      </div>
    </main>
  );
}

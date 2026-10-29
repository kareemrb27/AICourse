import type { Metadata } from "next";
import { PathSection } from "@/components/path-section";

export const metadata: Metadata = {
  title: "Learning path",
  description:
    "A free path from no AI background to AI solution designer: three stages of courses and a final capstone.",
};

export default function PathPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-6">
      <section className="border-x border-line px-6 py-16 sm:px-12 sm:py-20">
        <p className="label inline-block rounded border border-accent/40 bg-accent-dim px-2 py-1 text-accent">
          Learning path
        </p>
        <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
          From curious to <span className="text-accent">AI solution designer</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          Start with no AI background. Three stages, one destination: each
          course makes you more capable of the next. Every course on the path
          is now available, so you can follow it from the first step to the
          final capstone.
        </p>
      </section>
      <section className="border-x border-t border-line px-6 py-10 sm:px-12">
        <PathSection />
      </section>
    </main>
  );
}

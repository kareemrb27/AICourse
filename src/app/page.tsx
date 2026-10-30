import Link from "next/link";
import { CourseCatalog } from "@/components/course-catalog";
import { ResumeBanner } from "@/components/resume-banner";
import { courses } from "@/content/courses";
import { pathStages } from "@/content/path";

const steps = [
  ...pathStages.map((stage) => ({
    key: `stage-${stage.id}`,
    level: stage.level,
    name: stage.name,
    count: stage.items.length,
  })),
  { key: "final-course", level: "Solution designer", name: "Final course", count: 1 },
];

export default function Home() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-6">
      <section aria-labelledby="hero-title" className="relative overflow-hidden border-x border-line px-6 py-14 sm:px-12 sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 size-[520px] rounded-full bg-accent/[0.06] blur-3xl" />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-dim px-3 py-1.5 font-mono text-xs text-emerald-300">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              Free. Open. No signup.
            </p>
            <h1 id="hero-title" className="mt-7 text-[clamp(2.75rem,5.5vw,4.5rem)] font-extrabold leading-[1.06] tracking-[-0.045em]">
              Learn to build<br />AI systems.<br />
              <span className="text-accent">Start free.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#b9b9c6]">
              A practical learning path for IT professionals. Go from AI
              foundations to designing real solutions, with guided lessons,
              hands-on projects, and curated free resources.
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <Link href="/path" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-300">
                Start the learning path <span aria-hidden="true">↗</span>
              </Link>
              <Link href="#courses" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-line bg-surface/50 px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:bg-accent-dim">
                Browse courses
              </Link>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted">
              Start with no AI background. Learn at your own pace.
            </p>
          </div>

          <div className="relative rounded-2xl border border-line bg-surface p-5 shadow-2xl shadow-black/20 sm:p-7">
            <div className="flex items-center justify-between gap-3 border-b border-line pb-5">
              <p className="font-mono text-xs tracking-widest text-muted uppercase">Your learning journey</p>
              <span className="rounded-full bg-accent-dim px-2.5 py-1 text-xs font-medium text-emerald-300">4 levels</span>
            </div>
            <ol className="mt-6 space-y-5">
              {[
                { title: "Understand the foundations", detail: "Build your AI literacy", icon: "01" },
                { title: "Build with models", detail: "Create a document assistant", icon: "02" },
                { title: "Design reliable agents", detail: "Connect tools, memory, and evaluation", icon: "03" },
                { title: "Design your AI solution", detail: "Bring it together in a capstone", icon: "04" },
              ].map((item, index) => (
                <li key={item.icon} className="relative flex items-start gap-4">
                  {index < 3 && <span aria-hidden="true" className="absolute left-[19px] top-10 h-5 border-l border-dashed border-accent/30" />}
                  <span aria-hidden="true" className={`flex size-10 shrink-0 items-center justify-center rounded-xl border font-mono text-xs ${index === 3 ? "border-accent bg-accent text-black" : "border-accent/25 bg-accent-dim text-emerald-300"}`}>
                    {item.icon}
                  </span>
                  <div className="py-0.5">
                    <p className="text-sm font-semibold sm:text-base">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-muted sm:text-sm">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-7 flex items-center gap-3 rounded-lg border border-accent/20 bg-accent/[0.04] p-3">
              <span aria-hidden="true" className="text-lg text-accent">↗</span>
              <p className="text-xs leading-5 text-[#b9b9c6]">Learn the concepts. Build the projects.<br /><span className="text-foreground">Finish with a complete AI solution design.</span></p>
            </div>
          </div>
        </div>
        <div className="relative mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line pt-6 text-sm text-muted">
          <span><strong className="font-semibold text-foreground">{courses.length} courses</strong> to explore</span>
          <span><strong className="font-semibold text-foreground">Hands-on</strong> capstone projects</span>
          <Link href="/about" className="inline-flex min-h-8 items-center gap-2 underline decoration-line underline-offset-4 hover:text-foreground">How we curate resources <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <ResumeBanner
        catalog={courses.map((c) => ({
          slug: c.slug,
          title: c.title,
          lessons: c.lessons.map((l) => ({ slug: l.slug, title: l.title })),
        }))}
      />

      <section className="border-x border-t border-line px-6 py-12 sm:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label">Learning path</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
              From curious to <span className="text-accent">AI solution designer</span>
            </h2>
          </div>
          <Link
            href="/path"
            className="label inline-flex min-h-11 items-center rounded border border-line px-3 text-foreground hover:border-accent"
          >
            See the full path →
          </Link>
        </div>
        <ol
          aria-label="Learning levels"
          className="relative mt-8 grid grid-cols-4"
        >
          <span
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-[17px] h-0.5 bg-line"
          />
          {steps.map((step, index) => (
            <li key={step.key} className="relative px-1 text-center">
              <Link
                href={`/path#${step.key}`}
                className="group block rounded py-1 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <span className="relative mx-auto mb-2 flex size-9 items-center justify-center rounded-full border-2 border-accent bg-surface font-mono text-sm font-semibold text-accent transition-colors group-hover:bg-accent group-hover:text-[#04231a]">
                  {index + 1}
                </span>
                <span className="block text-xs font-semibold group-hover:text-accent sm:text-[15px]">
                  {step.level}
                </span>
                <span className="label mt-0.5 hidden !text-[11px] sm:block">
                  {step.name} · {step.count} {step.count === 1 ? "course" : "courses"}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <CourseCatalog />
    </main>
  );
}

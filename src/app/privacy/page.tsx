import type { Metadata } from "next";
import Link from "next/link";
import { REPO_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What AICourse stores, what it counts, and which outside services your browser contacts. No accounts, no cookies set by us.",
};

const updated = "November 1, 2026";

export default function PrivacyPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-6">
      <article className="border-x border-line px-6 py-16 sm:px-12 sm:py-20">
        <p className="label">Privacy</p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
          Short version: we don’t know who you are.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          There are no accounts, no sign-up and no forms here, and we set no cookies. This page
          lists the few things that do happen, so you can decide for yourself.
        </p>

        <div className="mt-12 max-w-2xl space-y-10 text-[15px] leading-7 text-[#c1c1cf]">
          <section aria-labelledby="stored">
            <h2 id="stored" className="text-xl font-semibold tracking-tight text-foreground">
              What stays in your browser
            </h2>
            <p className="mt-3">
              To remember which lessons you finished and where to resume, the site saves your
              progress in your browser’s local storage (under the names <code className="font-mono text-sm">aicourse-progress</code> and{" "}
              <code className="font-mono text-sm">aicourse-path-done</code>). It never leaves your device and we cannot see it. Clearing
              your site data for this website removes it.
            </p>
          </section>

          <section aria-labelledby="counted">
            <h2 id="counted" className="text-xl font-semibold tracking-tight text-foreground">
              What we count
            </h2>
            <p className="mt-3">
              We use Vercel Web Analytics to see how many people visit and which pages they read. It
              uses no cookies, does not follow you across other websites, and does not build a
              profile of you. It records page views along with broad details such as country, the
              site that referred you, and the type of browser and device.
            </p>
            <p className="mt-3">
              The site is hosted on Vercel, which, like any web host, processes your IP address in
              its server logs to deliver pages and keep the service secure.
            </p>
          </section>

          <section aria-labelledby="outside">
            <h2 id="outside" className="text-xl font-semibold tracking-tight text-foreground">
              Outside services your browser contacts
            </h2>
            <ul className="mt-3 list-disc space-y-3 pl-5">
              <li>
                <strong className="font-semibold text-foreground">YouTube thumbnails.</strong> Video
                preview images load from YouTube’s image servers (<code className="font-mono text-sm">i.ytimg.com</code>) when a page opens, so
                Google can see that your browser asked for them. We ask your browser not to send
                the page address along.
              </li>
              <li>
                <strong className="font-semibold text-foreground">YouTube videos.</strong> The video
                player itself loads only when you press play, from YouTube’s privacy-enhanced
                address (<code className="font-mono text-sm">youtube-nocookie.com</code>). From that moment YouTube’s own privacy policy applies to
                that video.
              </li>
              <li>
                <strong className="font-semibold text-foreground">News images.</strong> Some items
                on the news page show the preview image from the original article, loaded from the
                publisher’s own servers, again without sending the page address.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Links to other sites.</strong>{" "}
                Lessons link to public articles, documentation and videos. Once you follow a link,
                that site’s own privacy practices apply.
              </li>
            </ul>
            <p className="mt-3">
              Fonts are served from this site itself, not from a font provider.
            </p>
          </section>

          <section aria-labelledby="reports">
            <h2 id="reports" className="text-xl font-semibold tracking-tight text-foreground">
              If you report a problem
            </h2>
            <p className="mt-3">
              The “Report a broken link or error” link opens an issue on{" "}
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-300 underline underline-offset-4 hover:text-foreground">
                this project’s GitHub page<span className="sr-only"> (opens in a new tab)</span>
              </a>
              . Issues there are public and need a GitHub account, so don’t put anything private in
              one.
            </p>
          </section>

          <section aria-labelledby="changes">
            <h2 id="changes" className="text-xl font-semibold tracking-tight text-foreground">
              Changes
            </h2>
            <p className="mt-3">
              If this ever changes, for example if we add accounts or another analytics tool, we
              will update this page first. Last updated {updated}.{" "}
              <Link href="/about" className="text-emerald-300 underline underline-offset-4 hover:text-foreground">
                More about the project
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

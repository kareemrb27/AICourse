import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { REPO_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Free, open AI engineering courses built from the best public videos, docs, papers and tutorials.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AICourse — free AI engineering courses",
    template: "%s · AICourse",
  },
  description: DESCRIPTION,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>
        <header className="border-b border-line">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center font-mono text-sm font-semibold tracking-wide"
            >
              AI<span className="text-accent">|</span>Course
            </Link>
            <nav aria-label="Primary" className="label flex gap-2">
              <Link
                href="/#courses"
                className="inline-flex min-h-11 items-center px-2 hover:text-foreground"
              >
                Courses
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-11 items-center px-2 hover:text-foreground"
              >
                About
              </Link>
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-8 label leading-6">
            Free to use · Every lesson links to public resources, with credit
            to the original authors · Independent project, not affiliated with
            any conference or course provider.
            <div className="mt-3 flex flex-wrap gap-x-6">
              <a
                href={`${REPO_URL}/issues/new`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-foreground"
              >
                Report a broken link or error
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-foreground"
              >
                Source on GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

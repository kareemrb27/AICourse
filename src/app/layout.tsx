import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AICourse — free AI engineering courses",
    template: "%s · AICourse",
  },
  description:
    "Free, open AI engineering courses built from the best public videos, docs, papers and tutorials.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-line">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-mono text-sm font-semibold tracking-wide">
              AI<span className="text-accent">|</span>Course
            </Link>
            <nav className="label flex gap-6">
              <Link href="/#courses" className="hover:text-foreground">
                Courses
              </Link>
              <Link href="/about" className="hover:text-foreground">
                About
              </Link>
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-8 label leading-6">
            Free forever · Every lesson links to public resources, with credit
            to the original authors · Independent project, not affiliated with
            any conference or course provider.
          </div>
        </footer>
      </body>
    </html>
  );
}

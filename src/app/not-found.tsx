import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-24">
      <p className="label">404</p>
      <h1 className="mt-3 text-5xl font-extrabold tracking-[-0.03em]">
        Page not found
      </h1>
      <p className="mt-5 text-lg leading-8 text-muted">
        That page does not exist, or the course it belonged to has moved.
      </p>
      <Link
        href="/#courses"
        className="mt-8 inline-flex min-h-11 items-center rounded bg-accent px-5 font-mono text-sm font-semibold tracking-wide text-black"
      >
        BROWSE COURSES
      </Link>
    </main>
  );
}

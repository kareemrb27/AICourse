export const SITE_NAME = "AICourse";

// Change this (or set NEXT_PUBLIC_SITE_URL in Vercel) when the site gets its own domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-course-six-ecru.vercel.app";

export const REPO_URL = "https://github.com/kareemrb27/AICourse";

export function reportIssueUrl(title: string) {
  return `${REPO_URL}/issues/new?title=${encodeURIComponent(title)}`;
}

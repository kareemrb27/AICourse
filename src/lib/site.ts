export const SITE_NAME = "AICourse";

// The production domain. Set NEXT_PUBLIC_SITE_URL to override it, for example for a staging site.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://iaicourses.com";

export const REPO_URL = "https://github.com/kareemrb27/AICourse";

export function reportIssueUrl(title: string) {
  return `${REPO_URL}/issues/new?title=${encodeURIComponent(title)}`;
}

// Utilities for working with URLs

// @return The site's effective URL, e.g., https://www.beporsed.org
export function getSiteUrl(): string {
  // If SITE_URL is present, use that. Otherwise use the Vercel deployment's
  // dynamic URL for preview and dev deployments.
  return process.env.SITE_URL ?? 'https://' + process.env.VERCEL_URL;
}

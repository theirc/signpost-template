// pages/server-sitemap.xml/index.tsx
import generateSitemap from '@ircsignpost/signpost-base/dist/src/server-sitemap';
import type { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { getSiteUrl } from '../../lib/url';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  const allPaths: string[] = await Promise.all([
    /* Put dynamic paths here */
  ]).then((results: string[][]) => results.flat());

  return generateSitemap(ctx, getSiteUrl(), allPaths);
}

// Default export to prevent next.js errors
export default function Sitemap() {}

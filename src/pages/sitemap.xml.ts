import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { slugify } from "../utils";

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export const GET: APIRoute = async ({ site }) => {
  if (!site) return new Response("Missing site URL", { status: 500 });

  const posts = await getCollection("blog");
  const siteOrigin = site.origin;
  const staticPaths = ["/", "/about/", "/projects/", "/blog/", "/contact/", "/resume/"];
  const postCountsByTag = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags || []) {
      const slug = slugify(tag);
      postCountsByTag.set(slug, (postCountsByTag.get(slug) || 0) + 1);
    }
  }

  // Avoid promoting thin tag archives as search landing pages.
  const topicPaths = [...postCountsByTag.entries()]
    .filter(([, count]) => count >= 3)
    .map(([slug]) => `/tags/${slug}/`);

  const urls: Array<{ loc: string; lastmod?: string }> = [
    ...[...staticPaths, ...topicPaths].map((path) => ({ loc: new URL(path, site).href })),
    ...posts.flatMap((post) => {
      const canonicalUrl = post.data.canonicalUrl
        ? new URL(post.data.canonicalUrl)
        : new URL(`/${post.slug}/`, site);

      // Only include this site's canonical URLs; externally syndicated copies
      // should not compete with the publisher's original article.
      if (canonicalUrl.origin !== siteOrigin) return [];

      return [{
        loc: canonicalUrl.href,
        lastmod: (post.data.updatedDate || post.data.pubDate).toISOString(),
      }];
    }),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(({ loc, lastmod }) => `  <url><loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`)
    .join("\n")}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
};

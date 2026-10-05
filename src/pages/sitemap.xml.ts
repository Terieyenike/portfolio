import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { slugify } from '../utils';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('blog');
  const pages = ['', '/about/', '/projects/', '/blog/', '/contact/', '/tags/', '/resume/'];
  const topicPages = [...new Set(posts.flatMap((post) => post.data.tags || []).map((tag) => `/tags/${slugify(tag)}/`))];
  const allPages = [...pages, ...topicPages];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (path) => `
  <url>
    <loc>${site}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${site}/${post.slug}/</loc>
    <lastmod>${post.data.pubDate.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}; 

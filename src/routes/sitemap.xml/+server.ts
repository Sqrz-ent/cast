import type { RequestHandler } from '@sveltejs/kit';

const SITE = 'https://sqrz.com';
const TODAY = new Date().toISOString().split('T')[0];

const routes: { path: string; priority: string; changefreq: string }[] = [
  { path: '/',                                  priority: '1.0', changefreq: 'weekly'  },
  { path: '/grow',                              priority: '0.9', changefreq: 'weekly'  },
  { path: '/blog',                              priority: '0.7', changefreq: 'daily'   },
  { path: '/compare',                           priority: '0.9', changefreq: 'monthly' },
  { path: '/compare/sqrz-vs-linktree',          priority: '0.8', changefreq: 'monthly' },
  { path: '/compare/sqrz-vs-komi',              priority: '0.8', changefreq: 'monthly' },
  { path: '/compare/sqrz-vs-website',           priority: '0.8', changefreq: 'monthly' },
  { path: '/compare/sqrz-vs-agency',            priority: '0.8', changefreq: 'monthly' },
  { path: '/compare/sqrz-vs-fiverr-upwork',     priority: '0.8', changefreq: 'monthly' },
  { path: '/compare/sqrz-vs-onlyfans',          priority: '0.8', changefreq: 'monthly' },
  { path: '/compare/sqrz-vs-beacons',           priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy',                           priority: '0.3', changefreq: 'yearly'  },
  { path: '/terms',                             priority: '0.3', changefreq: 'yearly'  },
  { path: '/cookies',                           priority: '0.3', changefreq: 'yearly'  },
];

export const GET: RequestHandler = () => {
  const urls = routes
    .map(
      ({ path, priority, changefreq }) => `
  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600',
    },
  });
};

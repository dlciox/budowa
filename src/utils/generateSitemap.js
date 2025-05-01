import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseUrl = 'https://oskbudvip.pl';
const today = new Date().toISOString().split('T')[0];

const routes = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/realizacje', priority: '0.9', changefreq: 'weekly' },
  { url: '/realizacje/kuchnie', priority: '0.8', changefreq: 'weekly' },
  { url: '/realizacje/lazienki', priority: '0.8', changefreq: 'weekly' },
  { url: '/realizacje/przedpokoje', priority: '0.8', changefreq: 'weekly' },
  { url: '/realizacje/remonty', priority: '0.8', changefreq: 'weekly' },
  { url: '/kontakt', priority: '0.8', changefreq: 'monthly' },
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('')}
</urlset>`;

  writeFileSync(
    join(__dirname, '../../public/sitemap.xml'),
    sitemap.trim()
  );
  console.log('Sitemap generated successfully!');
};

generateSitemap();
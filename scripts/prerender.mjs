import { createServer } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', mode: 'production' });
try {
  const { render, metadataHtml, getMetadata, viewToPath, SITE_URL } = await server.ssrLoadModule('/src/entry-server.tsx');
  const template = await readFile('dist/index.html', 'utf8');
  const pages = [...Object.entries(viewToPath), ['not-found', '/404']];
  for (const [view, route] of pages) {
    const content = await render(view);
    const html = template.replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, metadataHtml(view)).replace('<div id="root"></div>', () => `<div id="root" data-page="${view}">${content}</div>`);
    // Flat .html works with clean URLs on Vercel; directory index works on GitHub Pages.
    const file = route === '/' ? 'dist/index.html' : `dist${route}.html`;
    await writeFile(file, html);
    if (route !== '/' && view !== 'not-found') {
      const dir = path.join('dist', route.slice(1));
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, 'index.html'), html);
    }
  }
  const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const urls = Object.entries(viewToPath).filter(([view]) => !getMetadata(view).noindex).map(([,route]) => `  <url><loc>${escapeXml(SITE_URL + route)}</loc></url>`).join('\n');
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  console.log(`Prerendered ${pages.length} pages with metadata, sitemap.xml, robots.txt, and a 404 page.`);
} finally {
  await server.close();
}

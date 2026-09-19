import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const pages = readdirSync(root).filter(file => file.endsWith('.html'));
assert.equal(pages.length, 13, 'All public pages and the 404 document must be exported');
const titles = new Set();
let assetCount = 0;
let linkCount = 0;
for (const file of pages) {
  const html = readFileSync(path.join(root,file),'utf8');
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${file}: exactly one h1`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title && !titles.has(title), `${file}: unique title`);
  titles.add(title);
  assert.match(html, /<meta name="description" content="[^"]{40,}"/, `${file}: useful description`);
  assert.match(html, /<link rel="canonical" href="https?:\/\/[^"]+"/, `${file}: canonical`);
  for (const property of ['og:title','og:description','og:url','og:image']) assert.ok(html.includes(`property="${property}"`), `${file}: ${property}`);
  const structured = html.match(/<script id="structured-data" type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  assert.ok(structured, `${file}: structured data`);
  assert.equal(JSON.parse(structured)['@context'], 'https://schema.org');
  assert.match(html, /<main[^>]*id="main-content"/, `${file}: skip-link destination`);
  for (const match of html.matchAll(/href="#([^"\s]+)"/g)) {
    assert.ok(html.includes(`id="${match[1]}"`), `${file}: missing local anchor ${match[1]}`);
    linkCount++;
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${file}: duplicate IDs`);
  if (!['index.html', 'services.html', 'contact.html', '404.html', 'photography.html'].includes(file)) {
    assert.ok(html.includes('aria-label="On this page"'), `${file}: project section navigation`);
    assert.ok(html.includes('aria-label="More portfolio work"'), `${file}: onward project navigation`);
  }
  for (const match of html.matchAll(/(?:src|href)="(\/[^"]*)"/g)) {
    const url = new URL(match[1], 'https://portfolio.test');
    if (url.pathname.startsWith('/assets/') || /\.(webp|svg|jpg|png|mp4)$/.test(url.pathname)) {
      assert.ok(existsSync(path.join(root,url.pathname)), `${file}: missing asset ${url.pathname}`);
      assetCount++;
    } else {
      const destination = url.pathname === '/' ? path.join(root,'index.html') : path.join(root,url.pathname.replace(/\/$/,'')+'.html');
      assert.ok(existsSync(destination), `${file}: broken link ${url.pathname}`);
      if (url.hash) assert.ok(readFileSync(destination,'utf8').includes(`id="${url.hash.slice(1)}"`), `${file}: missing anchor ${url.hash}`);
      linkCount++;
    }
  }
  const noindex = file === '404.html' || file === 'photography.html';
  assert.equal(html.includes('content="noindex, follow"'), noindex, `${file}: index policy`);
  if (!['404.html','index.html'].includes(file)) assert.equal(readFileSync(path.join(root,file.replace('.html','/index.html')),'utf8'),html, `${file}: deep-link HTML matches`);
}
const sitemap = readFileSync(path.join(root,'sitemap.xml'),'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, 11);
assert.ok(!sitemap.includes('/photography') && !sitemap.includes('/404'));
assert.match(readFileSync(path.join(root,'robots.txt'),'utf8'), /Sitemap: https?:\/\//);
assert.ok(existsSync(path.join(root,'social-preview.jpg')));
console.log(`PASS: ${pages.length} static pages, ${assetCount} asset references, ${linkCount} internal links/anchors, unique SEO metadata, structured data, sitemap, and deep-link exports.`);

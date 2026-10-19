import type { PageView } from '@/router/pages';
import { viewToPath,viewToTitle } from '@/router/routes';
import { CONTACT,SITE_URL } from './site';

const descriptions: Record<PageView, string> = {
  home: 'Explore Gofi’s digital portfolio: websites, data analysis, design, motion graphics, and video. From ideas to digital experiences.',
  services: 'Digital services by Gofi: motion graphics, graphic design, video production, web development, data analysis, and market research.',
  contact: 'Contact Aditya Gofi Saputra in Jakarta to discuss design, video, web development, or data projects. Connect by email or WhatsApp.',
  motion: 'Explore Gofi’s motion graphics portfolio, including brand animations, logo reveals, and animated campaigns for Asahi, SATS, and more.',
  graphic: 'Explore Gofi’s graphic design portfolio: social media visuals, ecommerce assets, company profile booklets, and product design.',
  'short-form': 'Watch short-form video projects by Gofi for TikTok, Reels, and brand campaigns, including Changi Airport, Pocari Sweat, and Mantappu.',
  'long-form': 'Explore long-form video editing and storytelling by Gofi, with YouTube productions, interviews, and educational content.',
  photography: 'Gofi’s photography collection is being curated. Get in touch to discuss a shoot or request relevant photography work samples.',
  'web-dev': 'Explore websites developed by Gofi, including the PageByPage marketplace and Benzwood portfolio, built with React, Shopify, and Tailwind CSS.',
  'market-research': 'Explore market research projects by Gofi, with web scraping, competitor analysis, and automation for actionable market insights.',
  'data-analysis': 'Gofi’s data work: GA4 and Looker Studio marketing analytics, Apps Script reporting automation, Tableau dashboards, and Python machine learning projects.',
  'meta-ads': 'Gofi’s Meta Ads work: full-funnel Facebook and Instagram campaigns, Looker Studio dashboards, and reporting automated with Google Apps Script.',
  'not-found': 'This page could not be found. Explore Gofi’s digital portfolio or get in touch about a project.',
};
const images: Partial<Record<PageView, string>> = {
  motion: 'motion', graphic: 'graphic', 'short-form': 'short-form', 'long-form': 'long-form',
  'web-dev': 'web-dev', 'market-research': 'market-research', 'data-analysis': 'data-analysis', 'meta-ads': 'meta-ads',
};
export function getMetadata(view: PageView) {
  const title = view === 'not-found' ? 'Page not found | Gofi’s Portfolio' : viewToTitle[view];
  const path = view === 'not-found' ? '/404' : viewToPath[view];
  const canonical = SITE_URL + path;
  const image = SITE_URL + (images[view] ? `/projects/${images[view]}.webp` : '/social-preview.jpg');
  const noindex = view === 'not-found' || view === 'photography';
  const person = { '@type': 'Person', '@id': SITE_URL + '/#person', name: CONTACT.name, alternateName: 'Gofi', url: SITE_URL + '/', jobTitle: 'Multidisciplinary Designer and Developer', sameAs: ['https://www.linkedin.com/in/adityagofi/', 'https://www.behance.net/adityagofi', 'https://github.com/adityagofi'] };
  const graph: Record<string, unknown>[] = [person, { '@type': 'WebSite', '@id': SITE_URL + '/#website', name: 'Gofi’s Portfolio', url: SITE_URL + '/', author: { '@id': SITE_URL + '/#person' } }, { '@type': view === 'contact' ? 'ContactPage' : 'WebPage', '@id': canonical + '#page', url: canonical, name: title, description: descriptions[view], isPartOf: { '@id': SITE_URL + '/#website' }, about: { '@id': SITE_URL + '/#person' } }];
  if (view !== 'home' && !noindex) graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' }, { '@type': 'ListItem', position: 2, name: title.split(' |')[0], item: canonical }] });
  return { title, description: descriptions[view], canonical, image, noindex, structured: { '@context': 'https://schema.org', '@graph': graph } };
}
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export function metadataHtml(view: PageView) {
  const m = getMetadata(view);
  return `<title>${escape(m.title)}</title>
    <meta name="description" content="${escape(m.description)}" />
    <meta name="robots" content="${m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />
    <link rel="canonical" href="${escape(m.canonical)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Gofi’s Portfolio" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${escape(m.title)}" />
    <meta property="og:description" content="${escape(m.description)}" />
    <meta property="og:url" content="${escape(m.canonical)}" />
    <meta property="og:image" content="${escape(m.image)}" />
    <meta property="og:image:alt" content="Digital work by Aditya Gofi Saputra" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(m.title)}" />
    <meta name="twitter:description" content="${escape(m.description)}" />
    <meta name="twitter:image" content="${escape(m.image)}" />
    <script id="structured-data" type="application/ld+json">${JSON.stringify(m.structured).replaceAll('<', '\\u003c')}</script>`;
}
export function applyMetadata(view: PageView) {
  // The production build already includes this metadata; dev needs the same result.
  const template = document.createElement('template');
  template.innerHTML = metadataHtml(view);
  for (const element of Array.from(template.content.children)) {
    let existing: Element | null = null;
    if (element.tagName === 'TITLE') existing = document.querySelector('title');
    else if (element.tagName === 'LINK') existing = document.querySelector('link[rel="canonical"]');
    else if (element.id) existing = document.getElementById(element.id);
    else {
      const key = element.hasAttribute('name') ? 'name' : 'property';
      existing = document.querySelector(`meta[${key}="${element.getAttribute(key)}"]`);
    }
    if (existing) existing.replaceWith(element);
    else document.head.append(element);
  }
}

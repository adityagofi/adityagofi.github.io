import { renderToString } from 'react-dom/server';
import App from './App';
import { pageLoaders, type PageView } from './router/pages';
export { getMetadata,metadataHtml } from './lib/seo';
export { SITE_URL } from './lib/site';
export { viewToPath } from './router/routes';
export async function render(view: PageView) {
  const { default: Page } = await pageLoaders[view]();
  return renderToString(<App view={view}><Page /></App>);
}

import App from '@/App';
import '@/index.css';
import { applyMetadata } from '@/lib/seo';
import { pageLoaders } from '@/router/pages';
import { resolveView } from '@/router/routes';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

async function start() {
  const view = resolveView(window.location.pathname);
  applyMetadata(view);
  const { default: Page } = await pageLoaders[view]();
  const root = document.getElementById('root')!;
  const app = <StrictMode><App view={view}><Page /></App></StrictMode>;
  if (root.hasChildNodes() && root.dataset.page === view) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
start().catch(error => {
  console.error('Unable to load the page', error);
  const root = document.getElementById('root')!;
  // Preserve the readable prerendered page when only its enhancement fails.
  if (!root.hasChildNodes()) {
    root.innerHTML = '<main class="empty-state section-shell"><h1>Something didn’t load.</h1><p>Please refresh the page, or contact Gofi by email.</p><a href="mailto:gofisaputra4@gmail.com">Email Gofi</a></main>';
  }
});

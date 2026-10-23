import ProjectNext from '@/components/ui/ProjectNext';
import CursorGlow from '@/components/ui/CursorGlow';
import PageMotion from '@/components/ui/PageMotion';
import type { ViewType } from '@/router/routes';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import type { PageView } from '@/router/pages';
import { Analytics } from '@vercel/analytics/react';
import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

export default function App({ view, children }: { view: PageView; children: ReactNode }) {
  const projectPage = !['home', 'services', 'contact', 'photography', 'not-found'].includes(view);
  return <MotionConfig reducedMotion="user" transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
    <PageMotion page={view} />
    <CursorGlow />
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navbar currentView={view} />
    <main id="main-content" data-page-view={view} tabIndex={-1} className={projectPage ? 'project-page page-content' : 'page-content'}>{children}{projectPage && <ProjectNext view={view as ViewType} />}</main>
    <Footer currentView={view} />
    {import.meta.env.PROD && import.meta.env.VITE_ENABLE_ANALYTICS === 'true' && <Analytics />}
  </MotionConfig>;
}

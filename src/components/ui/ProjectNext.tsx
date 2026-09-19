import { CREATIVE_PROJECTS, TECHNICAL_PROJECTS } from '@/lib/constants';
import { viewToPath, type ViewType } from '@/router/routes';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function ProjectNext({ view }: { view: ViewType }) {
  const projects = [...CREATIVE_PROJECTS, ...TECHNICAL_PROJECTS];
  const index = projects.findIndex(project => project.view === view);
  const next = projects[(index + 1) % projects.length];
  return <nav className="project-next section-shell" aria-label="More portfolio work">
    <a href="/#work" className="text-link"><ArrowLeft size={16} /> All work</a>
    <a href={viewToPath[next.view]} className="next-project-link"><span><small>Keep exploring</small><strong>{next.title}</strong></span><ArrowUpRight size={26} /></a>
  </nav>;
}

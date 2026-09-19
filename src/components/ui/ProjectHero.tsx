import { CREATIVE_PROJECTS, TECHNICAL_PROJECTS } from '@/lib/constants';
import type { ViewType } from '@/router/routes';
import { ArrowLeft } from 'lucide-react';

export type ProjectJumpLink = { id: string; label: string };
export default function ProjectHero({ view, sections = [] }: { view: ViewType; sections?: ProjectJumpLink[] }) {
  const project = [...CREATIVE_PROJECTS, ...TECHNICAL_PROJECTS].find(item => item.view === view)!;
  return <header className="project-hero section-shell">
    <nav className="breadcrumb" aria-label="Breadcrumb"><a href="/#work"><ArrowLeft size={16} /> All work</a><span aria-hidden="true">/</span><span aria-current="page">{project.title}</span></nav>
    <div className="project-hero-grid"><div><p className="eyebrow">My digital work / {String([...CREATIVE_PROJECTS, ...TECHNICAL_PROJECTS].indexOf(project) + 1).padStart(2, '0')}</p><h1>{project.title}</h1><p className="project-summary">{project.desc}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><img src={project.image} alt={`${project.title} work by Gofi`} width="800" height="600" fetchPriority="high" /></div>
    {sections.length > 0 && <nav className="project-jump-nav" aria-label="On this page"><span>Explore this work</span>{sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.label} <span aria-hidden="true">↘</span></a>)}</nav>}
  </header>;
}

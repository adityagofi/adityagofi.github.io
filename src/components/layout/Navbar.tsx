import { CREATIVE_PROJECTS, TECHNICAL_PROJECTS } from '@/lib/constants';
import { ViewType, viewToPath } from '@/router/routes';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Navbar({ currentView }: { currentView: ViewType | 'not-found' }) {
  const [open, setOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [projectsPinned, setProjectsPinned] = useState(false);
  const projectsMenuRef = useRef<HTMLDivElement>(null);
  const closeProjects = () => { setProjectsOpen(false); setProjectsPinned(false); };
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const projectsRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); closeProjects(); }, [currentView]);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
      if (!projectsMenuRef.current?.contains(event.target as Node)) closeProjects();
    };
    document.addEventListener('pointerdown', dismiss);
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') closeProjects(); };
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
    };
  }, []);
  const link = (view: ViewType, label: string) => <a href={viewToPath[view]} aria-current={currentView === view ? 'page' : undefined} onClick={() => { setOpen(false); closeProjects(); }}>{label}</a>;
  return (
    <header className="site-header">
      <nav ref={navRef} className="site-nav" aria-label="Main navigation" onKeyDown={event => {
        if (event.key === 'Escape') {
          if (projectsOpen) { closeProjects(); projectsRef.current?.focus(); }
          else { setOpen(false); toggleRef.current?.focus(); }
        }
      }} onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget) && !projectsPinned) { setOpen(false); closeProjects(); }
      }}>
        <a href="/" className="wordmark" aria-label="go. — home">go<span>.</span></a>
        <button ref={toggleRef} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        <div id="main-navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
          {link('home', 'Home')}
          <div ref={projectsMenuRef} className="projects-menu" onPointerEnter={event => {
            if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 768px) and (hover: hover)').matches) setProjectsOpen(true);
          }} onPointerLeave={event => {
            if (event.pointerType === 'mouse' && !projectsPinned && !event.currentTarget.querySelector('.nav-dropdown')?.contains(document.activeElement)) setProjectsOpen(false);
          }} onBlur={event => {
            if (!projectsPinned && !event.currentTarget.contains(event.relatedTarget)) setProjectsOpen(false);
          }}>
            <button ref={projectsRef} aria-expanded={projectsOpen} aria-controls="project-navigation" onClick={() => { if (projectsPinned) closeProjects(); else { setProjectsPinned(true); setProjectsOpen(true); } }} className={!['home', 'services', 'contact', 'not-found'].includes(currentView) ? 'is-current' : ''}>Work <ChevronDown size={15} /></button>
            {projectsOpen && <div id="project-navigation" className="nav-dropdown">
              <a className="all-work-link" href="/#work" onClick={() => { setOpen(false); closeProjects(); }}>Explore all work <ArrowUpRight size={16} /></a>
              <div className="nav-project-groups">
                {[{ name: 'Design & media', items: CREATIVE_PROJECTS }, { name: 'Build & grow', items: TECHNICAL_PROJECTS }].map(group => <div key={group.name}><p className="eyebrow">{group.name}</p>{group.items.map(item => <a key={item.view} href={viewToPath[item.view]} aria-current={currentView === item.view ? 'page' : undefined} onClick={() => { setOpen(false); closeProjects(); }}>{item.title}</a>)}</div>)}
              </div>
            </div>}
          </div>
          {link('services', 'Services')}
          <a href="/#about" onClick={() => setOpen(false)}>About</a>
          <a href="/contact" className="button button-small" aria-current={currentView === 'contact' ? 'page' : undefined}>Let’s talk <ArrowUpRight size={16} /></a>
        </div>
      </nav>
    </header>
  );
}

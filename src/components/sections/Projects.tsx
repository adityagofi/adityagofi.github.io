import { CREATIVE_PROJECTS, TECHNICAL_PROJECTS } from '@/lib/constants';
import { viewToPath } from '@/router/routes';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Projects() {
  const [filter, setFilter] = useState('All work');
  const [allProjects, setAllProjects] = useState(() => [...CREATIVE_PROJECTS, ...TECHNICAL_PROJECTS]);
  const shuffled = useRef(false);
  useEffect(() => {
    // Run after hydration so static SEO markup and the initial React tree agree.
    // Shuffle once per page visit, never on filter changes or other renders.
    if (shuffled.current) return;
    shuffled.current = true;
    const order = [...CREATIVE_PROJECTS, ...TECHNICAL_PROJECTS];
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    setAllProjects(order);
  }, []);
  const items = filter === 'Design & media' ? CREATIVE_PROJECTS : filter === 'Data & marketing' ? TECHNICAL_PROJECTS : allProjects;
  return <section id="work" className="work-section section-shell" aria-labelledby="work-title">
    <div className="section-heading"><div><p className="eyebrow">01 / The portfolio</p><h2 id="work-title">A world of digital work.<br /><span className="muted">Built with intention.</span></h2></div><p>Websites, visuals, motion, and data.<br />Explore what I do in digital.</p></div>
    <div className="work-toolbar"><div className="filter-group" role="group" aria-label="Filter portfolio">{['All work', 'Design & media', 'Data & marketing'].map(name => <button key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>)}</div><p className="result-count" aria-live="polite">{items.length} disciplines</p></div>
    <div className="portfolio-grid">{items.map((item, index) => <a className="portfolio-card" href={viewToPath[item.view]} key={item.view}>
      <div className="portfolio-image"><img src={item.image} alt={`${item.title} portfolio preview`} loading="lazy" decoding="async" width="800" height="600" /><span className="card-index">{String(index + 1).padStart(2, '0')}</span><span className="card-arrow"><ArrowUpRight size={22} /></span></div>
      <div className="portfolio-copy"><h3>{item.title}</h3><p>{item.desc}</p><div className="tags">{item.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div><span className="card-link">Explore work <ArrowUpRight size={15} /></span></div>
    </a>)}</div>
  </section>;
}

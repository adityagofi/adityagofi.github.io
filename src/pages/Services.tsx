import { CREATIVE_PROJECTS, TECHNICAL_PROJECTS } from '@/lib/constants';
import { viewToPath } from '@/router/routes';
import { ArrowUpRight, Camera } from 'lucide-react';
export default function Services() {
  return <section className="section-shell" aria-labelledby="services-title"><header className="page-intro"><p className="eyebrow">What I can help with</p><h1 id="services-title">Digital possibilities.<br /><span className="muted">Thoughtful execution.</span></h1><p>Choose a single discipline or bring them together. Explore the work in each area to find the right fit for your project.</p></header>
    <div className="service-grid">{[...CREATIVE_PROJECTS, ...TECHNICAL_PROJECTS].map((service, index) => <article key={service.view} className="service-card"><span className="eyebrow">{String(index + 1).padStart(2,'0')} / {index < CREATIVE_PROJECTS.length ? 'Design & media' : 'Build & grow'}</span><h2>{service.title}</h2><p>{service.desc}</p><div className="tags">{service.tags.slice(0,3).map(tag => <span key={tag}>{tag}</span>)}</div><a href={viewToPath[service.view]} className="text-link">Explore {service.title.toLowerCase()} <ArrowUpRight size={16} /></a></article>)}
    <article className="service-card"><Camera size={24} className="text-orange-400" /><h2>Photography</h2><p>Product, lifestyle, and portrait photography. Get in touch to discuss your brief and request relevant samples.</p><a href="/contact" className="text-link">Discuss a shoot <ArrowUpRight size={16} /></a></article></div>
  </section>;
}

import { ArrowLeft, ArrowUpRight, Camera } from 'lucide-react';

export default function PhotographyProject() {
  return <section className="empty-state section-shell">
    <a href="/#work" className="back-link"><ArrowLeft size={16} /> All work</a>
    <p className="eyebrow"><Camera size={18} /> Photography</p>
    <h1>A new collection<br />is on its way.</h1>
    <p>The photography portfolio is being curated. Get in touch to discuss a shoot or request relevant work samples.</p>
    <div className="button-row"><a href="/contact" className="button">Discuss a project <ArrowUpRight size={18} /></a><a href="/#work" className="text-link">Explore other work <ArrowUpRight size={18} /></a></div>
  </section>;
}

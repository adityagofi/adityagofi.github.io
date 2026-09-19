const clients = [
  ['Asahi Group','asahi.svg'], ['SATS','sats.svg'], ['Changi Airport','changi.svg'], ['Pocari Sweat','pocari.svg'], ['Wuling Indonesia','wuling.svg'],
  ['Rocketindo','rocketindo.svg'], ['Mantappu Corp','mantappu.svg'], ['Mantappu Academy','mantappu-academy.svg'], ['Hong Kong Jockey Club','hkjc.svg'], ['HenShu Motion','henshu.svg'],
];
export default function About() {
  return <section id="about" className="about-section section-shell" aria-labelledby="about-title">
    <p className="eyebrow">02 / Behind the work</p>
    <div className="about-grid"><h2 id="about-title">One digital partner.<br /><span className="muted">From idea to execution.</span></h2>
      <div><p>I’m Aditya Gofi Saputra — Gofi for short. I turn ideas into digital experiences through development, design, and data.</p><p>I believe the best digital work happens when design and development speak the same language from day one. My work spans websites, data, visuals, and video, with care for how each piece looks and works.</p><a href="/services" className="text-link">Explore how we can work together ↗</a><div className="about-facts"><div><strong>5+</strong><span>Years of craft</span></div><div><strong>100+</strong><span>Projects delivered</span></div></div></div>
    </div>
    <div className="client-strip"><p className="eyebrow">Brands featured in my work</p><div className="client-grid">{clients.map(([name, logo]) => <div key={name}><img src={`/clients/${logo}`} alt="" loading="lazy" width="36" height="36" /><span>{name}</span></div>)}</div></div>
  </section>;
}

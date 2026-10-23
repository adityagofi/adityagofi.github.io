import ProjectHero from '@/components/ui/ProjectHero';
import { motion } from 'motion/react';

const MARKET_TECH_STACK = [
  { name: "Python", category: "Language", level: 95 },
  { name: "BeautifulSoup", category: "Scraping", level: 92 },
  { name: "Selenium", category: "Automation", level: 88 },
  { name: "Pandas", category: "Data Processing", level: 94 },
  { name: "Playwright", category: "Dynamic Scraping", level: 85 },
  { name: "Scrapy", category: "Framework", level: 90 },
];

const RESEARCH_PROJECTS = [
  {
    id: 1,
    title: "Fragrance Price Monitor",
    category: "Price Intelligence",
    description: "A price monitoring project that collects fragrance prices across retailers and organizes them for comparison and market analysis.",
    tags: ["Python", "Selenium", "Data Visualization"],
    image: "/research/project-1.webp",
    link: "",
    stats: { accuracy: "99.8%", frequency: "Hourly", coverage: "10+ Sites" }
  },
  {
    id: 2,
    title: "KOL Scraping Database",
    category: "Influencer Intelligence",
    description: "An automated KOL discovery pipeline that scrapes creator profiles across social platforms and enriches each record with engagement-rate (ER) calculations, follower demographics, and content category — building a searchable influencer database for campaign planning.",
    tags: ["Python", "Selenium", "ER Calculation", "Pandas"],
    image: "/research/project-2.webp",
    link: "",
    stats: { kols: "100+", erRange: "0.3% – 12%", platforms: "IG / TikTok / YT" }
  }
];



export default function MarketResearchProject() {



  return (
    <div className="min-h-screen text-white font-sans selection:bg-orange-500">
      {/* Hero Section */}
      <ProjectHero view="market-research" sections={[{ id: "case-studies", label: "Projects" }, { id: "capabilities", label: "Capabilities" }]} />

{/* Case Studies */}
      <section id="case-studies" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="project-section-intro"><h2>Selected projects</h2><p>Data collection and research tools built to make market information easier to use.</p></div>
          {RESEARCH_PROJECTS.map((project, index) => (
            <motion.div 
              key={project.id}
              data-reveal
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 lg:gap-20 items-center mb-20 last:mb-0`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-orange-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img loading="lazy" decoding="async" src={project.image} alt={project.title} className="rounded-3xl w-full aspect-[4/3] object-cover relative z-10 border border-white/10 transition-all duration-700" />
                  <dl className="project-stats">{Object.entries(project.stats).map(([label, value]) => <div key={label}><dt>{{accuracy: 'Accuracy', frequency: 'Frequency', coverage: 'Coverage', kols: 'Profiles', erRange: 'Engagement range', platforms: 'Platforms'}[label] ?? label}</dt><dd>{value}</dd></div>)}</dl>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <div className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6">
                  {project.category}
                </div>
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8 leading-none">{project.title}</h3>
                <p className="text-white/60 text-lg mb-12 font-light">{project.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-12">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest font-bold text-white/30 border-b border-white/10 pb-1">{tag}</span>
                  ))}
                </div>


              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Capabilities section */}
      <section id="capabilities" className="pb-32 px-6 md:px-20 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter text-orange-500">Scraping<br/>Infrastructure</h2>
            <p className="text-white/40 text-sm md:text-base leading-relaxed font-medium uppercase tracking-widest">
              Tools for collecting, processing, and organizing market data.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {MARKET_TECH_STACK.map((tech, i) => (
              <motion.div 
                key={tech.name}
                data-reveal
                className="p-6 bg-white/5 rounded-2xl border border-white/5"
              >
                <div className="text-[10px] uppercase font-bold text-orange-500 mb-1">{tech.category}</div>
                <div className="text-xl font-bold">{tech.name}</div>
                <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="h-full bg-orange-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

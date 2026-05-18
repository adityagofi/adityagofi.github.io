import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  ExternalLink, 
  Database,
  BarChart3,
  Search,
  Globe,
  Binary,
  PieChart,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { heroEnter, scrollFadeUp } from '@/lib/animations';
import SketchDecorations from '@/components/ui/SketchDecorations';

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
    description: "A scrapped data of fragrance prices for various retailers.",
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

const RESEARCH_TAGS = ["Web Scraping", "Data Mining", "ETL Pipelines", "Competitive Intelligence", "Sentiment Analysis", "Market Trends", "Lead Generation"];

const bannerImages = [
  "/research/banner-1.webp",
  "/research/banner-2.webp",
];

export default function MarketResearchProject() {
  const [bannerDuration, setBannerDuration] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 4
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const update = () => {
      setBannerDuration(window.innerWidth >= 768 ? 20 : 4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-orange-500">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <motion.div
            key={bannerDuration}
            className="flex h-full"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: bannerDuration, repeat: Infinity, ease: "linear" }}
            style={{ width: "200%" }}
          >
            {[...bannerImages, ...bannerImages].map((src, i) => (
              <div key={i} className="w-1/4 h-full flex-shrink-0">
                <img 
                  src={src} 
                  alt="" 
                  className="w-full h-full object-cover brightness-[0.3]"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </motion.div>
        </div>


        <SketchDecorations />

        <div className="relative z-20 text-center px-6">
          <motion.div {...heroEnter}>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              Market<br/><span className="text-orange-500">Research & Data</span>
            </h1>
            <p className="text-white/60 text-[10px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase">
              Extracting Intelligence from Chaos
            </p>
          </motion.div>

        </div>

        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 md:gap-12 text-white/60 uppercase text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.3em] font-bold">
          <div className="flex items-center gap-2"><Globe size={14} /> Global Scaling</div>
          <div className="flex items-center gap-2"><Binary size={14} /> Precise Extraction</div>
          <div className="flex items-center gap-2 md:flex hidden"><Zap size={14} /> Rapid Processing</div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="pt-16 pb-12 px-6 md:px-20 max-w-7xl mx-auto text-center relative z-10">
        <motion.p
          {...scrollFadeUp}
          className="text-white/70 text-xl md:text-2xl leading-relaxed mb-16 max-w-5xl mx-auto font-light"
        >
          I specialize in building intelligent data pipelines that scrape, clean, and transform raw web information into strategic business assets. From price monitoring to competitor analysis, I bridge the gap between unstructured web data and actionable insights.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {RESEARCH_TAGS.map((tag, i) => (
            <motion.span 
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-6 py-2.5 border border-white/10 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-white/40 hover:text-orange-500 hover:border-orange-500/50 transition-all cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {RESEARCH_PROJECTS.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-20 items-center mb-40 last:mb-0`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-orange-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img src={project.image} alt={project.title} className="rounded-3xl w-full aspect-[4/3] object-cover relative z-10 border border-white/10 transition-all duration-700" />
                  <div className="absolute bottom-8 left-8 z-20 flex gap-4">
                    {Object.entries(project.stats).map(([label, value]) => (
                      <div key={label} className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-xl border border-white/10">
                        <div className="text-[8px] uppercase text-white/40 tracking-widest">{label}</div>
                        <div className="text-sm font-bold text-orange-500">{value}</div>
                      </div>
                    ))}
                  </div>
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

                {/* <a href={project.link} className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300">
                  View Data Model <ExternalLink size={14} />
                </a> */}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Capabilities section */}
      <section className="pb-32 px-6 md:px-20 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter text-orange-500">Scraping<br/>Infrastructure</h2>
            <p className="text-white/40 text-sm md:text-base leading-relaxed font-medium uppercase tracking-widest">
              Built to handle the most complex anti-bot systems.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {MARKET_TECH_STACK.map((tech, i) => (
              <motion.div 
                key={tech.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/5 rounded-2xl border border-white/5"
              >
                <div className="text-[10px] uppercase font-bold text-orange-500 mb-1">{tech.category}</div>
                <div className="text-xl font-bold">{tech.name}</div>
                <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
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

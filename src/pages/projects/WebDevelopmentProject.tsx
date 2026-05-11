import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Globe, 
  Cpu, 
  Layers, 
  Smartphone, 
  Zap, 
  Shield, 
  ExternalLink, 
  Github,
  CheckCircle2,
  Terminal,
  Server,
  Database,
  BarChart3
} from 'lucide-react';
import { heroEnter, scrollFadeUp } from '@/lib/animations';
import SketchDecorations from '@/components/ui/SketchDecorations';

const TECH_STACK = [
  { name: "React", category: "Frontend", level: 95 },
  { name: "Shopify", category: "E-commerce", level: 90 },
  { name: "CSS", category: "Styling", level: 90 },
  { name: "Tailwind CSS", category: "Utility", level: 98 },
];

const WEB_PROJECTS = [
  {
    id: 1,
    title: "Benzwood Website",
    category: "Corporate Portfolio",
    description: "A showcase of premium woodworking and bespoke furniture, designed with a focus on high-quality visuals and smooth interactions.",
    tags: ["React", "CSS", "Tailwind"],
    image: "/web/project-1.webp",
    link: "https://www.benzwood.com",
    stats: { speed: "99/100", uptime: "100%", users: "Global" }
  },
  {
    id: 2,
    title: "PageByPage Marketplace",
    category: "E-commerce Marketplace",
    description: "A high-performance marketplace platform built with React and powered by a headless Shopify backend, offering a seamless and intuitive shopping experience.",
    tags: ["React", "Shopify", "Tailwind"],
    image: "/web/project-2.webp",
    link: "https://pagebypage.co.id",
    stats: { speed: "98/100", uptime: "99.9%", users: "Users" }
  }
];

const PROCESS_STEPS = [
  { title: "Discovery", desc: "Understanding business goals, user personas, and technical constraints." },
  { title: "Architecture", desc: "Defining the tech stack, data models, and API structures." },
  { title: "Development", desc: "Agile sprints with modular, type-safe coding practices." },
  { title: "Optimization", desc: "Strict performance tuning, SEO hardening, and accessibility audits." }
];

const bannerImages = [
  "/web/banner-1.webp",
  "/web/banner-2.webp",
  "/web/banner-3.webp",
  "/web/banner-4.webp",
];

const WEB_TAGS = ["Full-Stack", "Frontend", "Backend", "DevOps", "UI/UX", "API Design", "Architecture", "Cloud Ready"];

export default function WebDevelopmentProject() {
  const [bannerDuration, setBannerDuration] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 4 : 20
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
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500 relative overflow-hidden">
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
                  className="w-full h-full object-cover brightness-[0.5]"
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
              Web <span className="text-orange-500">Development</span>
            </h1>
            <p className="text-white/100 text-[10px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase">
              Engineering Resilient Digital Systems
            </p>
          </motion.div>

        </div>

        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 md:gap-12 text-white/60 uppercase text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.3em] font-bold">
          <div className="flex items-center gap-2"><Zap size={14} /> Performance First</div>
          <div className="flex items-center gap-2 md:flex hidden"><Shield size={14} /> Scalable Ops</div>
          <div className="flex items-center gap-2"><Globe size={14} /> Global Delivery</div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="pt-16 pb-12 px-6 md:px-20 max-w-7xl mx-auto text-center relative z-10">
        <motion.p
          {...scrollFadeUp}
          className="text-white/70 text-xl md:text-2xl leading-relaxed mb-16 max-w-5xl mx-auto font-light"
        >
          My technical philosophy focuses on clean, performant, and maintainable architecture. I build digital solutions that bridge the gap between complex business logic and intuitive user experiences.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {WEB_TAGS.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">Case Studies</h2>
              <p className="text-white/40 mt-4 uppercase tracking-[0.2em] font-bold text-xs md:text-sm">Solving real-world business challenges</p>
            </div>
            <div className="flex items-center gap-4 text-white/60">
              <span className="text-4xl font-bold">02</span>
              <span className="uppercase text-[10px] tracking-widest font-bold">Featured Projects</span>
            </div>
          </div>

          <div className="space-y-40">
            {WEB_PROJECTS.map((project, i) => (
              <div key={project.id} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full lg:w-3/5"
                >
                  <div className="relative aspect-video rounded-[1rem] md:rounded-[1.5rem] overflow-hidden group shadow-2xl">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-75 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-8 md:p-12">
                      <div className="flex gap-4">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] uppercase font-bold tracking-widest">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full lg:w-2/5"
                >
                  <div className="text-orange-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-4">{project.category}</div>
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8 leading-none">{project.title}</h3>
                  <p className="text-white/60 text-lg mb-12 font-light">{project.description}</p>
                  
                  <div className="flex items-center gap-6">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300">
                      Visit Website <ExternalLink size={14} />
                    </a>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Skills Section */}
      <section className="pb-32 px-6 md:px-20 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter text-orange-500">Core<br/>Capabilities</h2>
            <p className="text-white/40 text-sm md:text-base leading-relaxed font-medium uppercase tracking-widest">
              Mastering the technical tools that drive modern innovation.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {TECH_STACK.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 bg-white/5 rounded-2xl border border-white/5"
              >
                <div className="text-[10px] uppercase font-bold text-orange-500 mb-1">{tech.category}</div>
                <div className="text-xl font-bold">{tech.name}</div>
                <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-orange-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Workflow */}
      <section className="py-32 px-6 md:px-0 bg-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">The Workflow</h2>
            <p className="text-white/40 uppercase tracking-[0.2em] font-bold text-xs">From Prototype to Production</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="p-10 bg-black rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-orange-500 group-hover:bg-orange-500/10 transition-all duration-500 mb-8 border border-white/5">
                  <span className="text-2xl font-black">{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold uppercase mb-4 tracking-tight">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

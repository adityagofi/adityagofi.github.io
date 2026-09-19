import ProjectHero from '@/components/ui/ProjectHero';
import {
ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

const TECH_STACK = [
  { name: "React", category: "Frontend", level: 95 },
  { name: "Shopify", category: "E-commerce", level: 90 },
  { name: "CSS", category: "Styling", level: 90 },
  { name: "Tailwind CSS", category: "Utility", level: 98 },
];

const WEB_PROJECTS = [
  {
    id: 1,
    title: "PageByPage Marketplace",
    category: "E-commerce Marketplace",
    description: "A high-performance marketplace platform built with React and powered by a headless Shopify backend, offering a seamless and intuitive shopping experience.",
    tags: ["React", "Shopify", "Tailwind"],
    image: "/web/project-2.webp",
    link: "https://pagebypage.co.id",
    stats: { speed: "98/100", uptime: "99.9%", users: "Users" }
  },
  {
    id: 2,
    title: "Benzwood Website",
    category: "Corporate Portfolio",
    description: "A showcase of premium woodworking and bespoke furniture, designed with a focus on high-quality visuals and smooth interactions.",
    tags: ["React", "CSS", "Tailwind"],
    image: "/web/project-1.webp",
    link: "https://www.benzwood.com",
    stats: { speed: "99/100", uptime: "100%", users: "Global" }
  }
];

const PROCESS_STEPS = [
  { title: "Discovery", desc: "Understanding business goals, user personas, and technical constraints." },
  { title: "Architecture", desc: "Defining the tech stack, data models, and API structures." },
  { title: "Development", desc: "Agile sprints with modular, type-safe coding practices." },
  { title: "Optimization", desc: "Strict performance tuning, SEO hardening, and accessibility audits." }
];



export default function WebDevelopmentProject() {



  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500 relative overflow-hidden">
      {/* Hero Section */}
      <ProjectHero view="web-dev" sections={[{ id: "case-studies", label: "Projects" }, { id: "capabilities", label: "Capabilities" }, { id: "workflow", label: "Process" }]} />

{/* Case Studies */}
      <section id="case-studies" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">Selected projects</h2>
              <p className="text-white/40 mt-4 uppercase tracking-[0.2em] font-bold text-xs md:text-sm">Solving real-world business challenges</p>
            </div>
            <div className="flex items-center gap-4 text-white/60">
              <span className="text-4xl font-bold">02</span>
              <span className="uppercase text-[10px] tracking-widest font-bold">Featured Projects</span>
            </div>
          </div>

          <div className="space-y-20">
            {WEB_PROJECTS.map((project, i) => (
              <div key={project.id} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                <motion.div
                  data-reveal
                  className="w-full lg:w-3/5"
                >
                  <div className="relative aspect-video rounded-[1rem] md:rounded-[1.5rem] overflow-hidden group shadow-2xl">
                    <img loading="lazy" decoding="async" src={project.image}
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-75 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-4 md:p-8">
                      <div className="flex flex-wrap gap-2">
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
                  data-reveal
                  className="w-full lg:w-2/5"
                >
                  <div className="text-orange-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-4">{project.category}</div>
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8 leading-none">{project.title}</h3>
                  <p className="text-white/60 text-lg mb-12 font-light">{project.description}</p>
                  
                  <div className="flex items-center gap-6">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="button">
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
      <section id="capabilities" className="pb-32 px-6 md:px-20 max-w-7xl mx-auto border-b border-white/5">
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
                data-reveal
                className="p-6 bg-white/5 rounded-2xl border border-white/5"
              >
                <div className="text-[10px] uppercase font-bold text-orange-500 mb-1">{tech.category}</div>
                <div className="text-xl font-bold">{tech.name}</div>
                <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-orange-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Workflow */}
      <section id="workflow" className="py-32 px-6 md:px-0 bg-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">The Workflow</h2>
            <p className="text-white/40 uppercase tracking-[0.2em] font-bold text-xs">From Prototype to Production</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                data-reveal
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

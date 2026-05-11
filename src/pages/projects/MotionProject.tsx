import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Zap, Film, Layers } from 'lucide-react';
import { MOTION_GRAPHICS_TAGS } from '@/lib/constants';
import { heroEnter, scrollFadeUp } from '@/lib/animations';
import StopMotionIcon, { STOP_MOTION_PATHS } from '@/components/ui/StopMotionIcon';
import VideoModal from '@/components/ui/VideoModal';
import SketchDecorations from '@/components/ui/SketchDecorations';

const bannerImages = [
  "/assets/motion/banner-1.mp4",
  "/assets/motion/banner-2.mp4",
  "/assets/motion/banner-3.mp4",
  "/assets/motion/banner-4.mp4",
];

const projects = [
  {
    id: "project-sats",
    client: "SATS",
    category: "Corporate Branding",
    desc: "Created high-fidelity motion graphics for SATS (Singapore Airport Terminal Services) brand presentations and internal communications. Transformed static designs into polished, fluid animations using After Effects and Premiere Pro, ensuring every asset was strictly aligned with corporate identity and visual standards.",
    tools: ["After Effects", "Premiere Pro", " Adobe Illustrator"],
    process: ["ASSET PREPARATION", "COMPOSITING", "MOTION DESIGN", "BRAND DELIVERY"],
    videos: [
      { id: "6e4iAQoJe2Q?si=ReCBPDVp_TZsN0-K", thumbnail: "/assets/motion/project-sats-1.webp" },
      { id: "PSrjIgHP8_w?si=zmBX_iz5WLyCJbzP", thumbnail: "/assets/motion/project-sats-2.webp" },
      { id: "DIZUdyIjFQI?si=0ot06FChsTNz46bp", thumbnail: "/assets/motion/project-sats-3.webp" },
      { id: "aVfRjooW_HA?si=13jiIIVZYm6pi8TG", thumbnail: "/assets/motion/project-sats-4.webp" },
      { id: "ZzpjP8yzEpU?si=ivQ-SYKeprDj4AMm", thumbnail: "/assets/motion/project-sats-5.webp" },
    ]
  },
  {
    id: "project-asahi",
    client: "ASAHI",
    category: "Product Launch",
    desc: "Created dynamic motion graphics for Asahi Group’s latest product launch. Developed high-energy animations and promotional assets using After Effects, ensuring the visual style captured the new product’s identity while maintaining the Japanese group’s global brand standards.",
    tools: ["After Effects", "Premiere Pro", "Adobe Illustrator"],
    process: ["BRAND ALIGNMENT", "COMPOSITING", "MOTION DESIGN", "FINAL ASSEMBLY"],
    videos: [
      { id: "qLpifVZ-dmk?si=y35j26pEmsV8Puge", thumbnail: "/assets/motion/project-asahi-1.webp" },
      { id: "8DDICzKh3WM?si=-azAmIfSRZNz8k1E", thumbnail: "/assets/motion/project-asahi-2.webp" },
      { id: "xza2qTI-uyI?si=SVaS_w0cIWc_fHZw", thumbnail: "/assets/motion/project-asahi-3.webp" },
      { id: "VyO0TLW2kNE?si=GL3A1Pv7hVPSACmp", thumbnail: "/assets/motion/project-asahi-4.webp" },
      { id: "rsH6bARSwJE?si=Sp7FTKrRq6EGYJS0", thumbnail: "/assets/motion/project-asahi-5.webp" },
    ]
  },
  {
    id: "project-page-by-page",
    client: "PAGE BY PAGE",
    category: "Brand Identity",
    desc: "Crafted the motion branding identity for Page by Page in a single high-fidelity piece, translating their editorial tone into fluid type-led motion. Every transition was designed to reinforce the brand's voice and feel consistent across every touchpoint.",
    tools: ["After Effects", "Adobe Illustrator"],
    process: ["BRAND STUDY", "MOTION DESIGN", "FINAL DELIVERY"],
    videos: [
      { id: "83hD6AzHgv4?si=Za_aCgtX0QwzPX6C", thumbnail: "/assets/motion/project-pagebypage-1.webp" },
    ]
  },
  {
    id: "project-rocketindo",
    client: "ROCKETINDO",
    category: "Award Show",
    desc: "Responsible for the main stage display motion of Rocketindo's awarding show. Designed the show's signature motion piece to anchor the live broadcast, reinforce its identity, and carry the energy of the night across every reveal on the main screen.",
    tools: ["After Effects", "Premiere Pro", "Adobe Illustrator"],
    process: ["CONCEPT", "STORYBOARDING", "MOTION DESIGN", "ON-STAGE DELIVERY"],
    videos: [
      { id: "WUIYjz4xeNI?si=zjoN6V2sXLj0KRT9", thumbnail: "/assets/motion/project-rocketindo-1.webp" },
      { id: "PJA_o4raqLU?si=XWDTtFD6kSvOWThG", thumbnail: "/assets/motion/project-rocketindo-2.webp" },
      { id: "NXlX3jDOxyc?si=RHf95wQgMjpImr9B", thumbnail: "/assets/motion/project-rocketindo-3.webp" },
      { id: "abun14N8HAc?si=xPJG5Jy_d8U2ZA2j", thumbnail: "/assets/motion/project-rocketindo-4.webp" },
      { id: "nWGorJBpExY?si=EMLyQZ4zAjwd9ETc", thumbnail: "/assets/motion/project-rocketindo-5.webp" },
    ]
  },
  {
    id: "project-logos",
    client: "LOGO MOTION",
    category: "Logo Animation",
    desc: "Animated logo reveals for Racing Hearts, The Hong Kong Jockey Club, Mantappu Academy, and Mantappu Corp, each built around the brand's identity with fluid, bespoke motion.",
    tools: ["After Effects", "Adobe Illustrator"],
    process: ["LOGO VECTORIZATION", "MOTION STORYBOARDING", "FLUID ANIMATION"],
    videos: [
      { id: "4YGU5brEefo?si=ta8xPSxfSRpgDLtj", thumbnail: "/assets/motion/project-logos-1.webp" },
      { id: "vO9dL6rn9c8?si=NivV2MCv6MNnjyBH", thumbnail: "/assets/motion/project-logos-2.webp" },
      { id: "jDznvfNzPjE?si=11XdPkWC1DPx8IQ9", thumbnail: "/assets/motion/project-logos-3.webp" },
    ]
  },
  {
    id: "project-advanced-agri",
    client: "PT ADVANCED AGRI",
    category: "Company Profile",
    desc: "A company profile video for PT Advanced Agri Indonesia communicating their vision, services, and field operations, motion graphics paired with footage edits for a broadcast-ready piece.",
    tools: ["After Effects", "Premiere Pro"],
    process: ["STORYBOARDING", "VISUAL DESIGN", "MOTION & EDIT"],
    videos: [
      { id: "aawdawdwdasdaws", thumbnail: "/assets/motion/project-advanced-agri-1.webp" },

    ]
  },
];

const tags = MOTION_GRAPHICS_TAGS;

// Brand-coloured product tiles. `bg` is the dark backplate, `fg` the lighter
// mark colour, `label` the two-letter wordmark.
const TOOL_LOGOS: Record<string, { bg: string; fg: string; label: string }> = {
  "After Effects":      { bg: "#00005B", fg: "#D8A8FF", label: "Ae" },
  "Premiere Pro":       { bg: "#1F0033", fg: "#EA77FF", label: "Pr" },
  "Adobe Illustrator":  { bg: "#330000", fg: "#FF9A00", label: "Ai" },
  "Photoshop":          { bg: "#001E36", fg: "#31A8FF", label: "Ps" },
  "InDesign":           { bg: "#49021F", fg: "#FF3366", label: "Id" },
  "Lightroom":          { bg: "#001E36", fg: "#31A8FF", label: "Lr" },
  "Audition":           { bg: "#00081C", fg: "#9999FF", label: "Au" },
  "Cinema 4D":          { bg: "#011A6B", fg: "#F4F8FC", label: "C4D" },
  "Figma":              { bg: "#0A0A0A", fg: "#FFFFFF", label: "Fg" },
};

const tileFor = (tool: string) =>
  TOOL_LOGOS[tool.trim()] ?? { bg: "#1A1A1A", fg: "#FFFFFF", label: tool.trim().slice(0, 2) };

// Pre-computed randomized doodle strokes that border the slider frame on all
// four sides. Each stroke picks one of four shapes — curved scratch, S-curve,
// circular loop, or arrow — to read like a scattered hand-drawn sketch.
const HATCHING_STROKES = (() => {
  const rand = (i: number, k: number) => {
    const v = Math.sin(i * 17.31 + k * 91.7) * 43758.5453;
    return v - Math.floor(v);
  };
  const f = (n: number) => n.toFixed(1);
  const make = (
    xRange: [number, number],
    yRange: [number, number],
    seed: number,
    count: number,
  ) => {
    const out: { d: string; delay: number; duration: number; repeatDelay: number }[] = [];
    for (let i = 0; i < count; i++) {
      const x = xRange[0] + rand(i + seed, 1) * (xRange[1] - xRange[0]);
      const y = yRange[0] + rand(i + seed, 2) * (yRange[1] - yRange[0]);
      const len = 8 + rand(i + seed, 3) * 10;
      const ang = (rand(i + seed, 4) - 0.5) * 1.7;
      const x2 = x + Math.cos(ang) * len;
      const y2 = y + Math.sin(ang) * len;
      const perp = ang + Math.PI / 2;
      const variant = rand(i + seed, 7);

      let d: string;
      if (variant < 0.5) {
        // Curved scratch — quadratic bezier bowed perpendicular to the axis.
        const bow = (rand(i + seed, 6) - 0.5) * 8;
        const cx = (x + x2) / 2 + Math.cos(perp) * bow;
        const cy = (y + y2) / 2 + Math.sin(perp) * bow;
        d = `M ${f(x)} ${f(y)} Q ${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`;
      } else if (variant < 0.7) {
        // S-curve — cubic bezier with opposing control points.
        const bow = 3 + rand(i + seed, 6) * 4;
        const c1x = x + (x2 - x) * 0.33 + Math.cos(perp) * bow;
        const c1y = y + (y2 - y) * 0.33 + Math.sin(perp) * bow;
        const c2x = x + (x2 - x) * 0.67 - Math.cos(perp) * bow;
        const c2y = y + (y2 - y) * 0.67 - Math.sin(perp) * bow;
        
        d = `M ${f(x)} ${f(y)} C ${f(c1x)} ${f(c1y)}, ${f(c2x)} ${f(c2y)}, ${f(x2)} ${f(y2)}`;
      } else if (variant < 0.85) {
        // Loop — small near-circle at the start, then a tail to the end.
        const r = 2.5 + rand(i + seed, 6) * 2;
        const sweep = rand(i + seed, 8) > 0.5 ? 1 : 0;
        d = `M ${f(x)} ${f(y)} a ${f(r)} ${f(r)} 0 1 ${sweep} 0.1 0 L ${f(x2)} ${f(y2)}`;
      } else {
        // Arrow — straight stroke with a single barb at the tip.
        const headLen = 3 + rand(i + seed, 6) * 2;
        const headAng = ang + Math.PI - 0.5;
        const hx = x2 + Math.cos(headAng) * headLen;
        const hy = y2 + Math.sin(headAng) * headLen;
        d = `M ${f(x)} ${f(y)} L ${f(x2)} ${f(y2)} L ${f(hx)} ${f(hy)}`;
      }

      out.push({
        d,
        // Wide initial offset and per-stroke timing so the cycles never re-sync.
        // Delay spans more than a full cycle so each stroke fires independently.
        delay: rand(i + seed, 5) * 12 + rand(i + seed, 11) * 3,
        duration: 2.5 + rand(i + seed, 9) * 3,
        repeatDelay: rand(i + seed, 10) * 3,
      });
    }
    return out;
  };
  return [
    ...make([2, 188], [0, 14], 100, 10),    // top border
    ...make([2, 188], [86, 100], 200, 10),  // bottom border
    ...make([0, 18], [4, 88], 300, 7),      // left border
    ...make([182, 200], [4, 88], 400, 7),   // right border
  ];
})();

type Selection = { videos: string[]; index: number } | null;

export default function MotionProject() {
  const [selection, setSelection] = useState<Selection>(null);
  const [projectSlides, setProjectSlides] = useState<Record<string, [number, number]>>(
    Object.fromEntries(projects.map(p => [p.id, [0, 0]]))
  );
  const [bannerDuration, setBannerDuration] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 20
  );

  useEffect(() => {
    const update = () => {
      setBannerDuration(window.innerWidth >= 768 ? 20 : 8);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const nextProjectSlide = (projectId: string, max: number) => {
    setProjectSlides(prev => {
      const [current] = prev[projectId];
      return {
        ...prev,
        [projectId]: [(current + 1) % max, 1]
      };
    });
  };

  const prevProjectSlide = (projectId: string, max: number) => {
    setProjectSlides(prev => {
      const [current] = prev[projectId];
      return {
        ...prev,
        [projectId]: [(current - 1 + max) % max, -1]
      };
    });
  };

  const goToSlide = (projectId: string, index: number) => {
    setProjectSlides(prev => {
      const [current] = prev[projectId];
      if (index === current) return prev;
      return {
        ...prev,
        [projectId]: [index, index > current ? 1 : -1]
      };
    });
  };

  const tripletVariants = {
    center: {
      x: '0%',
      scale: 1.25,
      rotateY: 0,
      rotate: 0,
      opacity: 1,
      zIndex: 20,
    },
    left: {
      x: '-45%',
      scale: 0.6,
      rotateY: 15,
      rotate: -5,
      opacity: 0.4,
      zIndex: 10,
    },
    right: {
      x: '45%',
      scale: 0.6,
      rotateY: -15,
      rotate: 5,
      opacity: 0.4,
      zIndex: 10,
    },
    enterRight: {
      x: '100%',
      scale: 0.5,
      opacity: 0,
      zIndex: 0,
    },
    enterLeft: {
      x: '-100%',
      scale: 0.5,
      opacity: 0,
      zIndex: 0,
    }
  };

  const getSlidePosition = (index: number, current: number, total: number) => {
    if (index === current) return 'center';
    if (index === (current - 1 + total) % total) return 'left';
    if (index === (current + 1) % total) return 'right';
    return index > current ? 'enterRight' : 'enterLeft';
  };

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
                {src.endsWith('.mp4') ? (
                  <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover brightness-[0.5]"
                  />
                ) : (
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover brightness-[0.3]"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        <SketchDecorations />

        <div className="relative z-20 text-center px-6">
          <motion.div {...heroEnter}>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              Motion <span className="text-orange-500">Graphics</span>
            </h1>
            <p className="text-white/100 text-[10px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase ">
              Bringing Brands to Life Through Animation
            </p>
          </motion.div>

        </div>

        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 md:gap-12 text-white/70 uppercase text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.3em] font-bold">
          <div className="flex items-center gap-2"><Zap size={14} /> Dynamic Storytelling</div>
          <div className="flex items-center gap-2 md:flex hidden"><Film size={14} /> Cinematic Reveals</div>
          <div className="flex items-center gap-2"><Layers size={14} /> Brand-Driven Motion</div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="pt-16 pb-12 px-6 md:px-20 max-w-7xl mx-auto text-center relative z-10">
        <motion.p
          {...scrollFadeUp}
          className="text-white/70 text-xl md:text-2xl leading-relaxed mb-16 max-w-5xl mx-auto font-light"
        >
          Transforming ideas into dynamic visual narratives. I specialize in crafting high-impact motion graphics that communicate complex messages with clarity, style, and precision across any platform.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tags.map((tag, i) => (
            <motion.span 
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-6 py-2.5 border border-white/10 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-white/40 hover:text-orange-500 hover:border-orange-500/50 transition-all cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative px-4 md:px-8 lg:px-12 pb-32">
        <div className="mx-6 md:mx-24 space-y-16 md:space-y-20 relative z-10">
          {projects.map((project, pIdx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center"
              >
                {/* Project Info */}
                <div className={`${pIdx % 2 === 0 ? "order-1 lg:col-start-2" : "order-1 lg:order-2 lg:col-start-8"} lg:col-span-4`}>
                  <span className="text-orange-500 text-xs md:text-sm uppercase tracking-[0.2em] font-bold mb-4 block">
                    {project.category}
                  </span>
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-5 leading-[0.85] w-full">
                    {project.client}
                  </h2>
                  <p className="text-white/60 text-base md:text-md leading-relaxed mb-10 max-w-lg font-light text-justify">
                    {project.desc}
                  </p>

                <div className="mb-12">
                  <div className="flex items-center gap-4 text-white/30 text-xs md:text-sm uppercase tracking-widest font-bold mb-6">
                    <div className="w-12 h-[1px] bg-white/20" />
                    Toolkit
                    <div className="text-orange-500 font-mono text-[10px]">/ {project.tools.length}</div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {project.tools.map((tool, tIdx) => {
                      const tile = tileFor(tool);
                      return (
                        <motion.div
                          key={tool}
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ delay: tIdx * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="group relative"
                        >
                          {/* Hover tooltip */}
                          <div className="absolute -top-11 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none shadow-xl">
                            {tool.trim()}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-black/90 border-r border-b border-white/10" />
                          </div>
                          {/* Branded tile */}
                          <div
                            className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-white/30 group-hover:scale-110 transition-all duration-500 cursor-default shadow-lg overflow-hidden"
                            style={{ backgroundColor: tile.bg }}
                          >
                            {/* Top-left highlight for depth */}
                            <div
                              className="absolute inset-0 opacity-60 pointer-events-none"
                              style={{ background: `radial-gradient(circle at 25% 20%, ${tile.fg}22, transparent 60%)` }}
                            />
                            {/* Hover glow */}
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                              style={{ background: `radial-gradient(circle at 50% 100%, ${tile.fg}40, transparent 70%)` }}
                            />
                            <span
                              className="relative z-10 font-black text-lg md:text-xl tracking-tight leading-none"
                              style={{ color: tile.fg, fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}
                            >
                              {tile.label}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 text-white/30 text-xs md:text-sm uppercase tracking-widest font-bold mb-6">
                    <div className="w-12 h-[1px] bg-white/20" />
                    Creative Process
                    <div className="text-orange-500 font-mono text-[10px]">/ {project.process.length}</div>
                  </div>
                  <div className="relative">
                    {/* Timeline rail — grows in on view */}
                    <motion.div
                      className="absolute left-[17px] top-4 bottom-4 w-px origin-top"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      style={{ background: 'linear-gradient(to bottom, rgba(249,115,22,0.6), rgba(255,255,255,0.1) 70%, transparent)' }}
                    />
                    <div className="space-y-1">
                      {project.process.map((step, sIdx) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ delay: 0.2 + sIdx * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                          className="relative flex items-center gap-5 group cursor-default py-2.5"
                        >
                          {/* Numbered circle */}
                          <div className="relative z-10 shrink-0 w-[35px] h-[35px] rounded-full bg-[#0a0a0a] border border-white/15 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-500 transition-all duration-300">
                            <span className="text-orange-500 font-mono text-[10px] font-bold group-hover:text-black transition-colors">0{sIdx + 1}</span>
                            {/* Pulsing ring on hover */}
                            <span className="absolute inset-0 rounded-full border border-orange-500/0 group-hover:border-orange-500/40 group-hover:scale-[1.6] group-hover:opacity-0 transition-all duration-700" />
                          </div>
                          {/* Step text + connector */}
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <span className="text-white/40 text-[11px] md:text-xs uppercase tracking-widest font-bold group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0">
                              {step}
                            </span>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Slider */}
              <div className={`relative group ${pIdx % 2 === 0 ? "order-2 lg:col-start-6" : "order-2 lg:order-1 lg:col-start-2"} lg:col-span-6`}>
                {/* Infinite Grid Backdrop */}
                <div 
                  className="absolute inset-[-10px] md:inset-[-30px] z-0 opacity-10 pointer-events-none overflow-hidden"
                  style={{ 
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                  }}
                >
                  <motion.div 
                    className="absolute inset-0 h-full"
                    style={{ 
                      backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', 
                      backgroundSize: '40px 40px',
                      width: '200%'
                    }}
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="relative z-10 min-h-[220px] md:min-h-[440px] overflow-visible perspective-[1500px] flex items-center justify-center">
                  {/* Sketch hatching — short scratches randomly scattered around all four sides of the slider frame */}
                  <svg
                    className="absolute inset-0 w-full h-full text-white/20 pointer-events-none z-0"
                    viewBox="0 0 200 100"
                    preserveAspectRatio="none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {HATCHING_STROKES.map((stroke, i) => (
                      <motion.path
                        key={i}
                        d={stroke.d}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: [0, 1, 1, 0, 0], opacity: [0, 1, 1, 1, 0] }}
                        transition={{
                          duration: stroke.duration,
                          times: [0, 0.3, 0.7, 0.95, 1],
                          ease: [0.65, 0, 0.35, 1],
                          repeat: Infinity,
                          repeatDelay: stroke.repeatDelay,
                          delay: stroke.delay,
                        }}
                      />
                    ))}
                  </svg>

                  <div className="relative w-full max-w-[240px] md:max-w-[480px] aspect-video flex items-center justify-center">
                    {project.videos.map((video, vIdx) => {
                      const position = getSlidePosition(vIdx, projectSlides[project.id][0], project.videos.length);
                      const isCenter = position === 'center';
                      
                      return (
                        <motion.div
                          key={vIdx}
                          variants={tripletVariants}
                          initial={false}
                          animate={position}
                          transition={{
                            type: "spring",
                            stiffness: 160,
                            damping: 24
                          }}
                          className={`absolute w-full h-full rounded-2xl md:rounded-[1.5rem] overflow-hidden border border-white/10 group/card transition-shadow duration-500 ${isCenter ? 'shadow-[0_10px_80px_-10px_rgba(249,115,22,0.5)]' : 'shadow-[0_20px_80px_rgba(0,0,0,0.6)]'}`}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <img 
                            src={video.thumbnail} 
                            alt="" 
                            className="w-full h-full object-cover brightness-90 group-hover/card:brightness-100 transition-all duration-700"
                            referrerPolicy="no-referrer"
                          />
                          {isCenter && (
                            <button
                              onClick={() => setSelection({ videos: project.videos.map(v => v.id), index: vIdx })}
                              className="absolute inset-0 flex items-center justify-center cursor-pointer group/vid"
                            >
                              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 backdrop-blur-xs border border-white/50 flex items-center justify-center text-white/70 group-hover/vid:scale-110 group-hover/vid:bg-orange-500 group-hover/vid:text-white group-hover/vid:border-white/90 transition-all duration-500">
                                <StopMotionIcon
                                  paths={STOP_MOTION_PATHS.play}
                                  size={52}
                                  strokeWidth={3}
                                  drawDuration={0}
                                  staggerDelay={0}
                                  wobble
                                />
                              </div>
                            </button>
                          )}
                          {!isCenter && (
                            <div 
                              className="absolute inset-0 cursor-pointer z-50 bg-black/20" 
                              onClick={() => goToSlide(project.id, vIdx)}
                            />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Navigation Buttons — only when there's more than one video to scroll through */}
                  {project.videos.length > 1 && (
                    <div className="absolute inset-x-[0%] md:inset-x-[-5%] top-1/2 -translate-y-1/2 flex justify-between z-[60] pointer-events-none px-2 md:px-0">
                      <button
                          onClick={() => prevProjectSlide(project.id, project.videos.length)}
                          className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 text-white transition-all cursor-pointer pointer-events-auto shadow-2xl"
                      >
                          <StopMotionIcon
                            paths={STOP_MOTION_PATHS.arrowLeft}
                            size={28}
                            strokeWidth={4}
                            loop
                            loopDuration={2.4}
                            loopPause={0.15}
                            staggerDelay={0.2}
                            wobble={false}
                          />
                      </button>
                      <button
                          onClick={() => nextProjectSlide(project.id, project.videos.length)}
                          className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 text-white transition-all cursor-pointer pointer-events-auto shadow-2xl"
                      >
                          <StopMotionIcon
                            paths={STOP_MOTION_PATHS.arrowRight}
                            size={28}
                            strokeWidth={4}
                            loop
                            loopDuration={2.4}
                            loopPause={0.15}
                            staggerDelay={0.2}
                            wobble={false}
                          />
                      </button>
                    </div>
                  )}
                </div>

                {/* Pagination Dots — only when there's more than one video */}
                {project.videos.length > 1 && (
                  <div className="flex justify-center gap-2.5 mt-10 relative z-20">
                    {project.videos.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => goToSlide(project.id, dotIdx)}
                        className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${dotIdx === projectSlides[project.id][0] ? 'bg-orange-500 w-8' : 'bg-white/20 hover:bg-white/40 w-3'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <VideoModal
        videos={selection?.videos ?? null}
        index={selection?.index ?? 0}
        onIndexChange={(i) => setSelection((prev) => (prev ? { ...prev, index: i } : prev))}
        onClose={() => setSelection(null)}
        aspect="landscape"
      />
    </div>
  );
}

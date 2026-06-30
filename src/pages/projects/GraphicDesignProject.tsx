import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Layers, PenTool } from 'lucide-react';
import { GRAPHIC_DESIGN_TAGS } from '@/lib/constants';
import { heroEnter, scrollFadeUp } from '@/lib/animations';
import StopMotionIcon, { STOP_MOTION_PATHS } from '@/components/ui/StopMotionIcon';
import SketchDecorations from '@/components/ui/SketchDecorations';

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

const bannerImages = [
  "/graphic/banner-1.webp",
  "/graphic/banner-2.webp",
  "/graphic/banner-3.webp",
  "/graphic/banner-4.webp",
];

const infographicImages = [
  "/graphic/infographic-1.webp",
  "/graphic/infographic-2.webp",
  "/graphic/infographic-3.webp",
  "/graphic/infographic-4.webp",
  "/graphic/infographic-5.webp",
  "/graphic/infographic-6.webp",
  "/graphic/infographic-7.webp",
  "/graphic/infographic-8.webp",
  "/graphic/infographic-9.webp",
  "/graphic/infographic-10.webp",
  "/graphic/infographic-11.webp",
  "/graphic/infographic-12.webp",
  "/graphic/infographic-13.webp",
  "/graphic/infographic-14.webp",
  "/graphic/infographic-15.webp",
];

const bookletProjects = [
  {
    clientName: "Benz Wood",
    industry: "Interior Contractor",
    description: "A refined company profile that captures Benz Wood's mastery of custom interior carpentry. Warm editorial photography is paired with elegant typography to convey the craftsmanship and material honesty behind every build.",
    images: [
      "/graphic/booklet-1-1.webp",
      "/graphic/booklet-1-2.webp",
      "/graphic/booklet-1-3.webp",
      "/graphic/booklet-1-4.webp",
      "/graphic/booklet-1-5.webp",
      "/graphic/booklet-1-6.webp",
      "/graphic/booklet-1-7.webp",
    ]
  },
  {
    clientName: "Kirana Energy",
    industry: "Energy & Sustainability",
    description: "A forward-looking corporate booklet for Kirana Energy that turns complex sustainability data into a clear visual narrative. Bold infographics and confident layouts communicate the company's vision for clean, accessible power.",
    images: [
      "/graphic/booklet-2-1.webp",
      "/graphic/booklet-2-2.webp",
      "/graphic/booklet-2-3.webp",
      "/graphic/booklet-2-4.webp",
      "/graphic/booklet-2-5.webp",
      "/graphic/booklet-2-6.webp",
      "/graphic/booklet-2-7.webp",
    ]
  }
];

const productDesignProjects = [
  {
    id: "01",
    title: "PAGE BY PAGE",
    subtitle: "Packaging Design",
    description: "A series of minimalist packaging designs for a fragrance brand, where each scent is represented as a chapter in a story. The design uses bold typography and subtle textures to evoke the narrative behind each fragrance.",
    colors: ["#000000", "#8B7355", "#D2B48C", "#FFFFFF"],
    tools: ["Adobe Illustrator", "Photoshop"],
    images: [
      "/graphic/product-1-1.webp",
      "/graphic/product-1-2.webp",
      "/graphic/product-1-3.webp",
      "/graphic/product-1-4.webp",
      "/graphic/product-1-5.webp",
    ]
  },
];

const socialMediaSlides = [
  [
    "/social/slide-5-1.webp",
    "/social/slide-5-2.webp",
    "/social/slide-5-3.webp",
    "/social/slide-5-4.webp",
    "/social/slide-5-5.webp",
    "/social/slide-5-6.webp",
    "/social/slide-5-7.webp",
    "/social/slide-5-8.webp",
  ], 
  [
    "/social/slide-1-1.webp",
    "/social/slide-1-2.webp",
    "/social/slide-1-3.webp",
    "/social/slide-1-4.webp",
    "/social/slide-1-5.webp",
    "/social/slide-1-6.webp",
    "/social/slide-1-7.webp",
    "/social/slide-1-8.webp",
  ],
  [
    "/social/slide-2-1.webp",
    "/social/slide-2-2.webp",
    "/social/slide-2-3.webp",
    "/social/slide-2-4.webp",
    "/social/slide-2-5.webp",
    "/social/slide-2-6.webp",
    "/social/slide-2-7.webp",
    "/social/slide-2-8.webp",
  ],
  [
    "/social/slide-3-1.webp",
    "/social/slide-3-2.webp",
    "/social/slide-3-3.webp",
    "/social/slide-3-4.webp",
    "/social/slide-3-5.webp",
    "/social/slide-3-6.webp",
    "/social/slide-3-7.webp",
    "/social/slide-3-8.webp",
  ],
  [
    "/social/slide-4-1.webp",
    "/social/slide-4-2.webp",
    "/social/slide-4-3.webp",
    "/social/slide-4-4.webp",
    "/social/slide-4-5.webp",
    "/social/slide-4-6.webp",
    "/social/slide-4-7.webp",
    "/social/slide-4-8.webp",
  ]
];

const uiUxRows = [
  [
    "/uiux/row-1-1.webp",
    "/uiux/row-1-2.webp",
    "/uiux/row-1-3.webp",
    "/uiux/row-1-4.webp",
  ],
  [
    "/uiux/row-2-1.webp",
    "/uiux/row-2-2.webp",
    "/uiux/row-2-3.webp",
    "/uiux/row-2-4.webp",
  ],
  [
    "/uiux/row-3-1.webp",
    "/uiux/row-3-2.webp",
    "/uiux/row-3-3.webp",
    "/uiux/row-3-4.webp",
  ]
];


function ProductGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowStart, setWindowStart] = useState(0);
  const [stepPx, setStepPx] = useState(124);

  const VISIBLE_COUNT = 3;
  const maxStart = Math.max(0, images.length - VISIBLE_COUNT);
  const pageCount = maxStart + 1;

  const canPageUp = windowStart > 0;
  const canPageDown = windowStart < maxStart;

  const pageUp = () => { if (canPageUp) setWindowStart(s => s - 1); };
  const pageDown = () => { if (canPageDown) setWindowStart(s => s + 1); };

  useEffect(() => {
    const update = () => {
      setStepPx(window.innerWidth >= 768 ? 124 : 88);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="flex gap-3 md:gap-5 w-full lg:w-3/5 items-center">
      {/* Pagination dots — one per valid window position */}
      <div className="flex flex-col gap-3 items-center flex-shrink-0">
        {Array.from({ length: pageCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => setWindowStart(i)}
            aria-label={`Go to page ${i + 1}`}
            className={`w-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === windowStart ? 'bg-orange-500 h-8' : 'bg-white/20 h-2 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Thumbnail Column — triplet view, arrows above/below */}
      <div className="flex flex-col items-center gap-2 md:gap-3 w-20 md:w-28 flex-shrink-0">
        {/* Up arrow */}
        <button
          onClick={pageUp}
          disabled={!canPageUp}
          aria-label="Previous thumbnails"
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all ${
            canPageUp
              ? 'hover:bg-orange-500 hover:border-orange-500 cursor-pointer'
              : 'opacity-25 cursor-not-allowed'
          }`}
        >
          <StopMotionIcon paths={STOP_MOTION_PATHS.arrowUp} size={22} strokeWidth={8} wobble={true} drawDuration={0} staggerDelay={0} />
        </button>

        {/* Sliding strip — all thumbs translate as one */}
        <div className="relative w-full overflow-hidden h-[256px] md:h-[360px]">
          <motion.div
            className="flex flex-col gap-2 md:gap-3 w-full"
            animate={{ y: -windowStart * stepPx }}
            transition={{ type: 'spring', stiffness: 200, damping: 26, mass: 0.9 }}
          >
            {images.map((src, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                animate={{ scale: i === activeIndex ? 1.04 : 1 }}
                transition={{ scale: { type: 'spring', stiffness: 280, damping: 22 } }}
                className={`relative aspect-square w-full rounded-xl overflow-hidden border-2 cursor-pointer transition-[border-color,opacity] duration-300 flex-shrink-0 ${
                  i === activeIndex
                    ? 'border-orange-500 opacity-100'
                    : 'border-white/10 hover:border-white/40 opacity-50 hover:opacity-90'
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Down arrow */}
        <button
          onClick={pageDown}
          disabled={!canPageDown}
          aria-label="Next thumbnails"
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all ${
            canPageDown
              ? 'hover:bg-orange-500 hover:border-orange-500 cursor-pointer'
              : 'opacity-25 cursor-not-allowed'
          }`}
        >
          <StopMotionIcon paths={STOP_MOTION_PATHS.arrowDown} size={22} strokeWidth={8} wobble={true} drawDuration={0} staggerDelay={0} />
        </button>
      </div>

      {/* Active Main Image — square 1080×1080 */}
      <div className="relative w-[1080px] max-w-full aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.04 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function GraphicDesignProject() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSocialSlide, setCurrentSocialSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [socialDirection, setSocialDirection] = useState(0);
  const [bannerDuration, setBannerDuration] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 20
  );

  useEffect(() => {
    const update = () => {
      setBannerDuration(window.innerWidth >= 768 ? 20 : 6);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % bookletProjects.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + bookletProjects.length) % bookletProjects.length);
  };

  const nextSocialSlide = () => {
    setSocialDirection(1);
    setCurrentSocialSlide((prev) => (prev + 1) % socialMediaSlides.length);
  };
  const prevSocialSlide = () => {
    setSocialDirection(-1);
    setCurrentSocialSlide((prev) => (prev - 1 + socialMediaSlides.length) % socialMediaSlides.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)"
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 1.05,
      filter: "blur(10px)"
    })
  };

  const socialVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      filter: "blur(5px)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)"
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      filter: "blur(5px)"
    })
  };

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
              <div key={i} className="w-1/2 md:w-1/4 h-full flex-shrink-0">
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover brightness-[0.7]"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <SketchDecorations />

        <div className="relative z-20 text-center px-6">
          <motion.div {...heroEnter}>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              Graphic <span className="text-orange-500">Design</span>
            </h1>
            <p className="text-white/100 text-[10px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase">
              Crafting Visual Identities That Resonate
            </p>
          </motion.div>

        </div>

        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 md:gap-12 text-white/100 uppercase text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.3em] font-bold">
          <div className="flex items-center gap-2"><Palette size={14} /> Bold Identity</div>
          <div className="flex items-center gap-2 md:flex hidden"><Layers size={14} /> Layered Systems</div>
          <div className="flex items-center gap-2"><PenTool size={14} /> Bespoke Craft</div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="pt-16 pb-12 px-6 md:px-20 max-w-7xl mx-auto text-center relative z-10">
        <motion.p
          {...scrollFadeUp}
          className="text-white/70 text-xl md:text-2xl leading-relaxed mb-16 max-w-5xl mx-auto font-light"
        >
          Elevating brand identities through intentional design. I specialize in creating visual systems and digital assets that communicate core values with clarity, aesthetic excellence, and strategic impact.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {GRAPHIC_DESIGN_TAGS.map((tag, i) => (
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

      {/* Project 1: Social Media Design - 2 Row Slider */}
      <section className="py-32 px-6 md:px-32 bg-zinc-900/30 relative overflow-hidden">
        {/* Grid Background */}
        <motion.div 
          className="absolute inset-0 opacity-[0.1] pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', 
            backgroundSize: '60px 60px' 
          }}
          animate={{ backgroundPositionX: ["0px", "-60px"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter">Social Media Design</h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl">
                Transforming complex data into visual stories that resonate. Every pixel is placed with purpose to ensure clarity, engagement, and a seamless flow of information across digital platforms.
              </p>
            </motion.div>
          </div>

          <div className="relative group/social">
            <div className="relative h-[720px] md:h-[800px] w-full">
              <AnimatePresence mode="popLayout" custom={socialDirection}>
                <motion.div
                  key={currentSocialSlide}
                  custom={socialDirection}
                  variants={socialVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 }
                  }}
                  className="absolute inset-0"
                >
                  <div className="flex flex-col gap-4 md:gap-6 h-full justify-center">
                    {/* Row 1 — wraps to 2-up on mobile, stays 4-up on md+ */}
                    <div className="flex flex-wrap md:flex-nowrap justify-center gap-3 md:gap-8">
                      {socialMediaSlides[currentSocialSlide].slice(0, 4).map((src, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.5, rotate: i % 2 === 0 ? -5 : 5 }}
                          animate={{ opacity: 1, scale: 0.9, rotate: i % 2 === 0 ? -2 : 3 }}
                          className={`w-[40%] md:w-[22%] aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 shadow-2xl flex-shrink-0 group ${i % 2 === 0 ? 'md:mt-0' : 'md:mt-[30px]'}`}
                        >
                          <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                        </motion.div>
                      ))}
                    </div>
                    {/* Row 2 — same wrap behaviour */}
                    <div className="flex flex-wrap md:flex-nowrap justify-center gap-3 md:gap-8">
                      {socialMediaSlides[currentSocialSlide].slice(4, 8).map((src, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.5, rotate: i % 2 === 0 ? 5 : -5 }}
                          animate={{ opacity: 1, scale: 0.9, rotate: i % 2 === 0 ? 3 : -2 }}
                          className={`w-[40%] md:w-[22%] aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 shadow-2xl flex-shrink-0 group ${i % 2 === 0 ? 'md:mt-[30px]' : 'md:mt-0'}`}
                        >
                          <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-12 z-50">
                <button 
                  onClick={prevSocialSlide}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-orange-500 transition-all cursor-pointer shadow-2xl"
                >
                  <StopMotionIcon
                    paths={STOP_MOTION_PATHS.arrowLeft}
                    size={28}
                    strokeWidth={8}
                    wobble={true}
                  />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-12 z-50">
                <button 
                  onClick={nextSocialSlide}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-orange-500 transition-all cursor-pointer shadow-2xl"
                >
                  <StopMotionIcon
                    paths={STOP_MOTION_PATHS.arrowRight}
                    size={28}
                    strokeWidth={8}
                    wobble={true}
                  />
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-12">
              {socialMediaSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSocialDirection(i > currentSocialSlide ? 1 : -1);
                    setCurrentSocialSlide(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${i === currentSocialSlide ? 'bg-orange-500 w-8' : 'bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project: UI UX Design - Animated Infinite Rows */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-32 mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter"
          >
            UI UX Website Design
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-base md:text-lg max-w-2xl mx-auto"
          >
            Crafting intuitive digital experiences that combine functional precision with aesthetic clarity. Focusing on user-centered design systems and interactive prototypes.
          </motion.p>
        </div>

        <div className="space-y-6 md:space-y-10">
          {uiUxRows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative flex">
              <motion.div 
                className="flex gap-6 md:gap-10 shrink-0"
                animate={{ 
                  x: rowIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] 
                }}
                transition={{ 
                  duration: 40 + rowIndex * 5, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                style={{ width: "fit-content" }}
              >
                {[...row, ...row].map((src, i) => (
                  <div 
                    key={i} 
                    className="w-[280px] md:w-[450px] aspect-video rounded-[1rem] overflow-hidden border border-white/5 bg-white/5 shrink-0"
                  >
                    <img 
                      src={src} 
                      alt="" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Project 2: Company Profile Booklet - Collage Slider */}
      <section className="py-20 md:py-24 px-6 md:px-32 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-14">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Company Profile Booklet</h2>
              <div className="space-y-2 text-white/60 text-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p><span className="text-white font-medium">Client :</span> {bookletProjects[currentSlide].clientName}</p>
                    <p className="max-w-md leading-relaxed mt-4">
                      {bookletProjects[currentSlide].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="flex flex-col md:items-end justify-center">
              <div className="text-left md:text-right">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSlide}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="text-white/60 text-sm"
                  >
                    Industry : {bookletProjects[currentSlide].industry}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Collage Slider */}
          <div className="relative group/slider">
            <div className="relative h-[400px] md:h-[600px] w-full">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    filter: { duration: 0.4 }
                  }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    <motion.div
                      className="absolute top-[20%] left-[25%] md:top-[8%] md:left-[26%] lg:top-[5%] lg:left-[32%] w-[50%] md:w-[44%] lg:w-[32%] aspect-[3/4] z-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden border border-white/10"
                      initial={{ rotate: -2, y: 20, opacity: 0 }}
                      animate={{ rotate: 1, y: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                    >
                      <img src={bookletProjects[currentSlide].images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </motion.div>

                    {/* Image 2: Top Left - Abstract Angle */}
                    <motion.div
                      className="absolute top-[8%] left-[-15%] md:top-[6%] md:left-[3%] lg:top-[2%] lg:left-[7%] w-[25%] md:w-[22%] lg:w-[16%] aspect-[3/4] z-10 shadow-2xl rounded-xl overflow-hidden border border-white/10"
                      initial={{ rotate: -15, x: -40, opacity: 0 }}
                      animate={{ rotate: -8, x: 70, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <img src={bookletProjects[currentSlide].images[1]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </motion.div>

                    {/* Image 3: Top Right - Abstract Angle */}
                    <motion.div
                      className="absolute top-[12%] right-[-20%] md:top-[14%] md:right-[3%] lg:top-[8%] lg:right-[6%] w-[25%] md:w-[22%] lg:w-[17%] aspect-[3/4] z-10 shadow-2xl rounded-xl overflow-hidden border border-white/10"
                      initial={{ rotate: 12, x: 40, opacity: 0 }}
                      animate={{ rotate: 6, x: -100, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                    >
                      <img src={bookletProjects[currentSlide].images[2]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </motion.div>

                    {/* Image 4: Mid Left - Overlapping */}
                    <motion.div
                      className="absolute top-[45%] left-[-20%] md:top-[50%] md:left-[-2%] lg:top-[42%] lg:left-[0%] w-[30%] md:w-[26%] lg:w-[19%] aspect-[3/4] z-30 shadow-2xl rounded-xl overflow-hidden border border-white/10"
                      initial={{ rotate: -8, x: -30, opacity: 0 }}
                      animate={{ rotate: -4, x: 100, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <img src={bookletProjects[currentSlide].images[3]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </motion.div>

                    {/* Image 5: Mid Right - Floating */}
                    <motion.div
                      className="absolute top-[52%] right-[-4%] md:top-[55%] md:right-[-2%] lg:top-[48%] lg:right-[6%] w-[30%] md:w-[26%] lg:w-[20%] aspect-[3/4] z-30 shadow-2xl rounded-xl overflow-hidden border border-white/10"
                      initial={{ rotate: 10, x: 30, opacity: 0 }}
                      animate={{ rotate: 5, x: -10, opacity: 1 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                    >
                      <img src={bookletProjects[currentSlide].images[4]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </motion.div>

                    {/* Image 6: Bottom Left Center - Tucked Behind */}
                    <motion.div
                      className="absolute bottom-[10%] left-[20%] md:bottom-[2%] md:left-[10%] lg:bottom-[-3%] lg:left-[22%] w-[25%] md:w-[20%] lg:w-[14%] aspect-[3/4] z-40 shadow-xl rounded-xl overflow-hidden border border-white/10"
                      initial={{ rotate: -5, y: 40, opacity: 0 }}
                      animate={{ rotate: -2, y: 0, opacity: 1 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                    >
                      <img src={bookletProjects[currentSlide].images[5]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </motion.div>

                    {/* Image 7: Bottom Right Center - Dynamic */}
                    <motion.div
                      className="absolute bottom-[5%] right-[22%] md:bottom-[-2%] md:right-[24%] lg:bottom-[-6%] lg:right-[28%] w-[25%] md:w-[22%] lg:w-[16%] aspect-[3/4] z-40 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] rounded-xl overflow-hidden border border-white/10"
                      initial={{ rotate: 15, y: 60, opacity: 0 }}
                      animate={{ rotate: 8, y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      <img src={bookletProjects[currentSlide].images[6]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-12 z-50">
                <button 
                  onClick={prevSlide}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer shadow-2xl"
                >
                  <StopMotionIcon
                    paths={STOP_MOTION_PATHS.arrowLeft}
                    size={28}
                    strokeWidth={8}
                    wobble={true}
                  />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-12 z-50">
                <button 
                  onClick={nextSlide}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer shadow-2xl"
                >
                  <StopMotionIcon
                    paths={STOP_MOTION_PATHS.arrowRight}
                    size={28}
                    strokeWidth={8}
                    wobble={true}
                  />
                </button>
              </div>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-8 md:mt-10">
              {bookletProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i === currentSlide) return;
                    setDirection(i > currentSlide ? 1 : -1);
                    setCurrentSlide(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${i === currentSlide ? 'bg-orange-500 w-8' : 'bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project 3: Product Design Portfolio - Page by Page */}
      <section className="py-32 bg-[#121212] relative overflow-hidden">
        {/* Grid Background */}
        <motion.div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', 
            backgroundSize: '60px 60px' 
          }}
          animate={{ backgroundPositionX: ["0px", "-60px"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="max-w-7xl mx-auto px-6 md:px-32 relative z-10">
          <div className="flex flex-col items-center mb-32">
            <h2 className="text-3xl md:text-6xl font-bold  text-center">Product Design Portfolio</h2>
          </div>
          
          <div className="space-y-64">
            {productDesignProjects.map((project, index) => (
              <div key={index} className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                {/* Left Side: Image Gallery */}
                <ProductGallery images={project.images} />

                {/* Right Side: Content */}
                <div className="w-full lg:w-2/5 space-y-10">
                  <div>
                    <p className="text-orange-500 font-mono text-xs tracking-[0.3em] uppercase mb-4"> {project.id} / {project.subtitle}</p>
                    <h3 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">{project.title}</h3>
                    
                    <div className="space-y-6">
                      <p className="text-white/60 leading-relaxed text-sm md:text-base max-w-md">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Tools */}
                  <div>
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
                              <div
                                className="absolute inset-0 opacity-60 pointer-events-none"
                                style={{ background: `radial-gradient(circle at 25% 20%, ${tile.fg}22, transparent 60%)` }}
                              />
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

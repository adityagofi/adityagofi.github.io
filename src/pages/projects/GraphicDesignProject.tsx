import { COLLAGE_COLORS as C, CollageHeading, FloatingDoodles, MarkerScribble, Swatches, ToolChips } from '@/components/ui/Collage';
import ProjectHero from '@/components/ui/ProjectHero';
import StopMotionIcon, { STOP_MOTION_PATHS } from '@/components/ui/StopMotionIcon';
import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { useEffect, useState } from 'react';

const bookletProjects = [
  {
    clientName: "Benzwood",
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

type GalleryCollection = {
  name: string;
  slug: string;
  tint: [string, string];
  images: string[];
};

// Social media collections — one client/campaign per filter. Rename the display
// names below to match the real clients; each collection shows its own image set.
const socialCollections: GalleryCollection[] = [
  { name: "Realita Beach", slug: "realita-beach", tint: ["#1e2a33", "#0d141a"], images: [
    "/social/slide-5-1.webp", "/social/slide-5-2.webp", "/social/slide-5-3.webp", "/social/slide-5-4.webp",
    "/social/slide-5-5.webp", "/social/slide-5-6.webp", "/social/slide-5-7.webp", "/social/slide-5-8.webp",
  ] },
  { name: "RSPI", slug: "rspi", tint: ["#1f2b26", "#0e1512"], images: [
    "/social/slide-1-1.webp", "/social/slide-1-2.webp", "/social/slide-1-3.webp", "/social/slide-1-4.webp",
    "/social/slide-1-5.webp", "/social/slide-1-6.webp", "/social/slide-1-7.webp", "/social/slide-1-8.webp",
  ] },
  { name: "Mantappu Corp", slug: "mantappu-corp", tint: ["#2a1f2f", "#130f16"], images: [
    "/social/slide-2-1.webp", "/social/slide-2-2.webp", "/social/slide-2-3.webp", "/social/slide-2-4.webp",
    "/social/slide-2-5.webp", "/social/slide-2-6.webp", "/social/slide-2-7.webp", "/social/slide-2-8.webp",
  ] },
  { name: "Pocari Sweat", slug: "pocari-sweat", tint: ["#1a2733", "#0c1219"], images: [
    "/social/slide-3-1.webp", "/social/slide-3-2.webp", "/social/slide-3-3.webp", "/social/slide-3-4.webp",
    "/social/slide-3-5.webp", "/social/slide-3-6.webp", "/social/slide-3-7.webp", "/social/slide-3-8.webp",
  ] },
  { name: "Sweet", slug: "sweet", tint: ["#33202a", "#160f13"], images: [
    "/social/slide-4-1.webp", "/social/slide-4-2.webp", "/social/slide-4-3.webp", "/social/slide-4-4.webp",
    "/social/slide-4-5.webp", "/social/slide-4-6.webp", "/social/slide-4-7.webp", "/social/slide-4-8.webp",
  ] },
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

const buildEcomImages = (slug: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/ecommerce/${slug}-${i + 1}.webp`);

// Each collection maps to a set of product visuals. Adjust the image count per
// collection by changing the second argument of buildEcomImages().
const ecommerceCollections: GalleryCollection[] = [
  { name: "Morning Chill Club", slug: "morning-chill-club", tint: ["#1e2f3a", "#0e161c"], images: buildEcomImages("morning-chill-club", 8) },
  { name: "Disturb Me Not",     slug: "disturb-me-not",     tint: ["#2a1f3a", "#120f18"], images: buildEcomImages("disturb-me-not", 8) },
  { name: "Volume On",          slug: "volume-on",          tint: ["#123230", "#0a1614"], images: buildEcomImages("volume-on", 8) },
  { name: "Lemme C",            slug: "lemme-c",            tint: ["#3a2e12", "#161009"], images: buildEcomImages("lemme-c", 8) },
  { name: "Nonchalant",         slug: "nonchalant",         tint: ["#332b24", "#15110d"], images: buildEcomImages("nonchalant", 8) },
  { name: "Darling Picasso",    slug: "darling-picasso",    tint: ["#3a1a2e", "#160e13"], images: buildEcomImages("darling-picasso", 8) },
  { name: "Naked Spice",        slug: "naked-spice",        tint: ["#3a251a", "#16100b"], images: buildEcomImages("naked-spice", 8) },
  { name: "Moss Brillionaire",  slug: "moss-brillionaire",  tint: ["#25321c", "#101509"], images: buildEcomImages("moss-brillionaire", 8) },
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
            aria-label={`Go to thumbnail page ${i + 1}`} aria-current={i === windowStart}
            className={`carousel-dot w-2 rounded-full transition-all duration-300 cursor-pointer ${
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
                aria-label={`View design ${i + 1}`} aria-pressed={i === activeIndex} tabIndex={i >= windowStart && i < windowStart + VISIBLE_COUNT ? 0 : -1}
                onClick={() => setActiveIndex(i)}
                animate={{ scale: i === activeIndex ? 1.04 : 1 }}
                transition={{ scale: { type: 'spring', stiffness: 280, damping: 22 } }}
                className={`relative aspect-square w-full rounded-xl overflow-hidden border-2 cursor-pointer transition-[border-color,opacity] duration-300 flex-shrink-0 ${
                  i === activeIndex
                    ? 'border-orange-500 opacity-100'
                    : 'border-white/10 hover:border-white/40 opacity-50 hover:opacity-90'
                }`}
              >
                <img loading="lazy" decoding="async" src={src} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
      <div className="sticker sticker-tape relative w-[1080px] max-w-full" style={{ '--tilt': '-1.5deg' } as React.CSSProperties}><div className="sticker-inner relative w-full aspect-square overflow-hidden bg-white/[0.03]">
        <AnimatePresence mode="wait">
          <motion.img loading="lazy" decoding="async" key={activeIndex}
            src={images[activeIndex]}
            aria-label={`Selected product design ${activeIndex + 1}`}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.04 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div></div>
    </div>
  );
}

// Shared filterable gallery: one collection active at a time, animated pill,
// clean image-only grid. Used by both the Social Media and Ecommerce sections.
const TILTS = [-2, 1.5, -1, 2.5, -2.5, 1, -1.5, 2];

function FilterableGallery({
  collections,
  aspectClass,
  layoutId,
}: {
  collections: GalleryCollection[];
  aspectClass: string;
  layoutId: string;
}) {
  const [activeFilter, setActiveFilter] = useState<string>(collections[0].name);
  const active = collections.find((c) => c.name === activeFilter) ?? collections[0];

  return (
    <div>
      {/* Collection filter */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12">
        {collections.map((c) => (
          <button
            key={c.slug}
            aria-pressed={activeFilter === c.name}
            onClick={() => setActiveFilter(c.name)}
            className={`relative px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === c.name ? "text-black" : "text-white border border-white/60 hover:bg-white hover:text-black"
            }`}
          >
            {activeFilter === c.name && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-orange-500"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{c.name}</span>
          </button>
        ))}
      </div>

      {/* Image grid */}
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-7">
        <AnimatePresence mode="popLayout">
          {active.images.map((src, i) => (
            <motion.div
              key={`${active.slug}-${i}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className={`sticker ${i % 3 === 0 ? 'sticker-tape' : ''}`}
              style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` } as React.CSSProperties}
            >
              <div className={`sticker-inner relative ${aspectClass} overflow-hidden`} style={{ background: `linear-gradient(140deg, ${active.tint[0]}, ${active.tint[1]})` }}>
                <img loading="lazy" decoding="async" src={src}
                  alt={`${active.name} — design ${i + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function GraphicDesignProject() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);


  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % bookletProjects.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + bookletProjects.length) % bookletProjects.length);
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

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-orange-500">
      <ProjectHero view="graphic" sections={[{ id: "social-design", label: "Social media" }, { id: "ecommerce-design", label: "E-commerce" }, { id: "interface-design", label: "UI/UX" }, { id: "booklet-design", label: "Booklets" }, { id: "product-design", label: "Products" }]} />

{/* Project 1: Social Media Design - Filterable Gallery */}
      <section id="social-design" className="paper-grid py-24 md:py-32 px-6 md:px-32 relative overflow-hidden">
        <FloatingDoodles items={[
          { kind: 'burst', color: C.orange, size: 84, top: '3%', right: '2%', rotate: 12 },
          { kind: 'squiggle', color: C.violet, size: 90, top: '46%', left: '-3%', rotate: -10, desktopOnly: true },
          { kind: 'sparkle', color: C.yellow, size: 40, top: '38%', right: '1%', desktopOnly: true },
          { kind: 'flower', color: C.green, size: 64, bottom: '2%', left: '-1%', rotate: 20 },
          { kind: 'asterisk', color: C.pink, size: 42, bottom: '14%', right: '1%', desktopOnly: true },
        ]} scatter={{ seed: 3, count: 26 }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <CollageHeading index="01" kicker="Social media" title={<>Social Media <span className="text-orange-500">Design</span></>}
            aside={<ToolChips tools={["Adobe Illustrator", "Photoshop"]} />}>
            Transforming brand stories into scroll-stopping social content. Every post is crafted with intent — balancing bold visuals, clarity, and a consistent identity that drives engagement across every platform.
          </CollageHeading>

          <FilterableGallery collections={socialCollections} aspectClass="aspect-[3/4]" layoutId="socialFilterPill" />
        </div>
      </section>

      {/* Project: E-commerce Design - Product Imaging Showcase */}
      <section id="ecommerce-design" className="paper-grid py-24 md:py-32 px-6 md:px-32 relative overflow-hidden">
        <FloatingDoodles items={[
          { kind: 'blob', color: C.violet, size: 80, top: '3%', right: '3%', rotate: -8, desktopOnly: true },
          { kind: 'sparkle', color: C.orange, size: 44, top: '34%', right: '1%' },
          { kind: 'circle', color: C.yellow, size: 80, bottom: '6%', right: '-1%', rotate: 10, desktopOnly: true },
          { kind: 'plus', color: C.green, size: 36, bottom: '2%', left: '1%' },
        ]} scatter={{ seed: 7, count: 26 }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <CollageHeading index="02" kicker="E-commerce · Page by Page" title={<>E-commerce <span className="text-orange-500">Design</span></>}
            aside={<ToolChips tools={["Photoshop"]} label="Retouch & composite :)" />}>
            Ecommerce product visuals where design meets image-making. Beyond composing each frame, I retouch and composite — reconstructing props, scenes, and details that were never captured in the original photoshoot — to craft polished, on-brand imagery for every collection.
          </CollageHeading>

          <FilterableGallery collections={ecommerceCollections} aspectClass="aspect-square" layoutId="ecomFilterPill" />
        </div>
      </section>

      {/* Project: UI UX Design - Animated Infinite Rows */}
      <section id="interface-design" className="paper-grid py-24 md:py-32 relative overflow-hidden">
        <FloatingDoodles items={[
          { kind: 'arrow', color: C.orange, size: 100, top: '8%', left: '6%', rotate: -6, desktopOnly: true },
          { kind: 'smile', color: C.yellow, size: 70, top: '6%', right: '8%', rotate: 8 },
          { kind: 'burst', color: C.green, size: 70, bottom: '6%', right: '5%', rotate: -12, desktopOnly: true },
        ]} scatter={{ seed: 11, count: 26 }} />
        <div className="max-w-7xl mx-auto px-6 md:px-32">
          <CollageHeading index="03" kicker="Interfaces" align="center" title={<>UI/UX <span className="text-orange-500">Design</span></>}>
            Crafting intuitive digital experiences that combine functional precision with aesthetic clarity. Focusing on user-centered design systems and interactive prototypes.
          </CollageHeading>
        </div>

        <div className="section-shell relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {uiUxRows.flat().map((src, i) => <figure key={src} className={`sticker ${i % 4 === 1 ? 'sticker-tape' : ''}`} style={{ '--tilt': `${TILTS[i % TILTS.length] / 2}deg` } as React.CSSProperties}><img src={src} alt={`Website interface design ${i + 1}`} width="800" height="450" loading="lazy" decoding="async" className="w-full aspect-video object-cover" /></figure>)}
        </div>
      </section>

      {/* Project 2: Company Profile Booklet - Collage Slider */}
      <section id="booklet-design" className="paper-grid py-20 md:py-24 px-6 md:px-32 relative overflow-hidden">
        <FloatingDoodles items={[
          { kind: 'flower', color: C.pink, size: 56, top: '45%', right: '-1%', rotate: 15, desktopOnly: true },
          { kind: 'squiggle', color: C.yellow, size: 100, bottom: '8%', left: '2%', rotate: 6, desktopOnly: true },
        ]} scatter={{ seed: 17, count: 26 }} />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-14">
            <div>
              <p className="handwritten text-xl md:text-2xl text-orange-500 mb-2">Project 04 <span className="text-white">/ Print</span></p>
              <h2 className="text-3xl md:text-5xl font-bold mb-1">Company Profile <span className="text-orange-500">Booklet</span></h2>
              <MarkerScribble className="mb-6" />
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
                      className="absolute top-[20%] left-[25%] md:top-[8%] md:left-[26%] lg:top-[5%] lg:left-[32%] w-[50%] md:w-[44%] lg:w-[32%] aspect-[3/4] z-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden bg-white p-1 md:p-1.5"
                      initial={{ rotate: -2, y: 20, opacity: 0 }}
                      animate={{ rotate: 1, y: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                    >
                      <img loading="lazy" decoding="async" src={bookletProjects[currentSlide].images[0]} alt="" className="w-full h-full object-cover rounded" referrerPolicy="no-referrer" />
                    </motion.div>

                    {/* Image 2: Top Left - Abstract Angle */}
                    <motion.div
                      className="absolute top-[8%] left-[-15%] md:top-[6%] md:left-[3%] lg:top-[2%] lg:left-[7%] w-[25%] md:w-[22%] lg:w-[16%] aspect-[3/4] z-10 shadow-2xl rounded-lg overflow-hidden bg-white p-1 md:p-1.5"
                      initial={{ rotate: -15, x: -40, opacity: 0 }}
                      animate={{ rotate: -8, x: 70, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <img loading="lazy" decoding="async" src={bookletProjects[currentSlide].images[1]} alt="" className="w-full h-full object-cover rounded" referrerPolicy="no-referrer" />
                    </motion.div>

                    {/* Image 3: Top Right - Abstract Angle */}
                    <motion.div
                      className="absolute top-[12%] right-[-20%] md:top-[14%] md:right-[3%] lg:top-[8%] lg:right-[6%] w-[25%] md:w-[22%] lg:w-[17%] aspect-[3/4] z-10 shadow-2xl rounded-lg overflow-hidden bg-white p-1 md:p-1.5"
                      initial={{ rotate: 12, x: 40, opacity: 0 }}
                      animate={{ rotate: 6, x: -100, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                    >
                      <img loading="lazy" decoding="async" src={bookletProjects[currentSlide].images[2]} alt="" className="w-full h-full object-cover rounded" referrerPolicy="no-referrer" />
                    </motion.div>

                    {/* Image 4: Mid Left - Overlapping */}
                    <motion.div
                      className="absolute top-[45%] left-[-20%] md:top-[50%] md:left-[-2%] lg:top-[42%] lg:left-[0%] w-[30%] md:w-[26%] lg:w-[19%] aspect-[3/4] z-30 shadow-2xl rounded-lg overflow-hidden bg-white p-1 md:p-1.5"
                      initial={{ rotate: -8, x: -30, opacity: 0 }}
                      animate={{ rotate: -4, x: 100, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <img loading="lazy" decoding="async" src={bookletProjects[currentSlide].images[3]} alt="" className="w-full h-full object-cover rounded" referrerPolicy="no-referrer" />
                    </motion.div>

                    {/* Image 5: Mid Right - Floating */}
                    <motion.div
                      className="absolute top-[52%] right-[-4%] md:top-[55%] md:right-[-2%] lg:top-[48%] lg:right-[6%] w-[30%] md:w-[26%] lg:w-[20%] aspect-[3/4] z-30 shadow-2xl rounded-lg overflow-hidden bg-white p-1 md:p-1.5"
                      initial={{ rotate: 10, x: 30, opacity: 0 }}
                      animate={{ rotate: 5, x: -10, opacity: 1 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                    >
                      <img loading="lazy" decoding="async" src={bookletProjects[currentSlide].images[4]} alt="" className="w-full h-full object-cover rounded" referrerPolicy="no-referrer" />
                    </motion.div>

                    {/* Image 6: Bottom Left Center - Tucked Behind */}
                    <motion.div
                      className="absolute bottom-[10%] left-[20%] md:bottom-[2%] md:left-[10%] lg:bottom-[-3%] lg:left-[22%] w-[25%] md:w-[20%] lg:w-[14%] aspect-[3/4] z-40 shadow-xl rounded-lg overflow-hidden bg-white p-1 md:p-1.5"
                      initial={{ rotate: -5, y: 40, opacity: 0 }}
                      animate={{ rotate: -2, y: 0, opacity: 1 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                    >
                      <img loading="lazy" decoding="async" src={bookletProjects[currentSlide].images[5]} alt="" className="w-full h-full object-cover rounded" referrerPolicy="no-referrer" />
                    </motion.div>

                    {/* Image 7: Bottom Right Center - Dynamic */}
                    <motion.div
                      className="absolute bottom-[5%] right-[22%] md:bottom-[-2%] md:right-[24%] lg:bottom-[-6%] lg:right-[28%] w-[25%] md:w-[22%] lg:w-[16%] aspect-[3/4] z-40 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] rounded-lg overflow-hidden bg-white p-1 md:p-1.5"
                      initial={{ rotate: 15, y: 60, opacity: 0 }}
                      animate={{ rotate: 8, y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      <img loading="lazy" decoding="async" src={bookletProjects[currentSlide].images[6]} alt="" className="w-full h-full object-cover rounded" referrerPolicy="no-referrer" />
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-12 z-50">
                <button 
                  aria-label="Previous project" onClick={prevSlide}
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
                  aria-label="Next project" onClick={nextSlide}
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
                  aria-label={`Show booklet ${i + 1}`} aria-current={i === currentSlide}
                  onClick={() => {
                    if (i === currentSlide) return;
                    setDirection(i > currentSlide ? 1 : -1);
                    setCurrentSlide(i);
                  }}
                  className={`carousel-dot w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${i === currentSlide ? 'bg-orange-500 w-8' : 'bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project 3: Product Design Portfolio - Page by Page */}
      <section id="product-design" className="paper-grid py-24 md:py-32 relative overflow-hidden">
        <FloatingDoodles items={[
          { kind: 'burst', color: C.yellow, size: 80, top: '6%', left: '5%', rotate: -10 },
          { kind: 'sparkle', color: C.white, size: 40, top: '12%', right: '10%', desktopOnly: true },
          { kind: 'blob', color: C.orange, size: 70, bottom: '6%', right: '6%', rotate: 20, desktopOnly: true },
        ]} scatter={{ seed: 23, count: 26, free: [0, 52] }} />
        
        <div className="max-w-7xl mx-auto px-6 md:px-32 relative z-10">
          <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
            <p className="handwritten text-xl md:text-2xl text-orange-500 mb-2">Project 05 <span className="text-white">/ Packaging</span></p>
            <h2 className="text-3xl md:text-6xl font-bold">Product Design <span className="text-orange-500">Portfolio</span></h2>
            <MarkerScribble className="mt-2 mx-auto" />
          </div>
          
          <div className="space-y-32">
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

                  <div className="flex flex-wrap gap-8">
                    <ToolChips tools={project.tools} />
                    <Swatches colors={project.colors} />
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

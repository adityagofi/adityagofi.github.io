import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Calendar, Clock, Film } from 'lucide-react';
import { LONG_FORM_VIDEO_TAGS } from '@/lib/constants';
import { heroEnter, scrollFadeUp } from '@/lib/animations';
import StopMotionIcon, { STOP_MOTION_PATHS } from '@/components/ui/StopMotionIcon';
import SketchDecorations from '@/components/ui/SketchDecorations';
import VideoModal from '@/components/ui/VideoModal';

const bannerImages = [
  "/assets/longform/banner-1.webp",
  "/assets/longform/banner-2.webp",
  "/assets/longform/banner-3.webp",
  "/assets/longform/banner-4.webp",
];

const SECTIONS = [
  {
    title: "Jerome Polin Vlog Video",
    desc: "Dynamic, fast-paced vlogs that capture the essence of travel, food, and culture through Jerome's unique lens.",
    videos: [
      { id: "pNlmn48warw?si=xLMth3AZ_SM7MAzx", title: "JEROME JADI ORANG ARAB!? MUKBANG MAKANAN ARAB + CERITA SERU FT. TASYA FARASYA", thumbnail: "/assets/longform/section-2-1.webp", desc: "Jerome x Tasya Farasya" },
      { id: "Piuw_Kom4dA?si=xIPQzizw3TELcQkm", title: "PASAR MALAM VIRAL BANGKOK! IGA RAKSASA, SERANGGA GORENG, PENJUAL JUS VIRAL!? | WORLD TRIP 2", thumbnail: "/assets/longform/section-2-2.webp", desc: "Waseda Boys World Tour Thailand" },
      { id: "bgrAJpyqVA4?si=kBU3gmU8O9ihip7ass", title: "REACTION REWIND INDONESIA 2023! TOMO PERTAMA KALI IKUT, SAMPE MERINDING!!", thumbnail: "/assets/longform/section-2-3.webp", desc: "Indonesian Reaction Rewind 2023" },
    ]
  },
  {
    title: "Mantappu Academy Education Video",
    desc: "Educational yet entertaining content focusing on personal growth, creativity, and academy life.",
    videos: [
      { id: "C1-cGjurGyA?si=1s_ayLTSGpHorO5r", title: "NGERJAIN SOAL SOAL TENTANG SNBT!!!! WAJIB DIPAHAMI", thumbnail: "/assets/longform/section-3-1.webp", desc: "Soal SNBT" },
      { id: "H96S0kHyQdk?si=5En0M_pGElt1J_xZ", title: "BAHAS & TRIK 15 SOAL ASLI SNBT PENGETAHUAN KUANTITATIF!", thumbnail: "/assets/longform/section-3-2.webp", desc: "Tips & Tricks Kerjain Soal SNBT" },
      { id: "FqYIq9kdshM?si=apWzQ-7iotBVwzHJ", title: "LOGARITMA ITU GAMPANG!! Bahas Logaritma Kelas 10", thumbnail: "/assets/longform/section-3-3.webp", desc: "Belajar Logaritma" }
    ]
  },
  {
    title: "Independent & Client Productions",
    desc: "A range of long-form work spanning YouTube documenter pieces, marketing storytelling for brands, and academic short films — each crafted with the same attention to narrative pacing and cinematic finish.",
    videos: [
      { id: "kZ7V5QMSrsA?si=9sy6tpGYuDKy22vc", title: "Stop PMO", thumbnail: "/assets/longform/section-1-1.webp", desc: "Short film how  to stop PMO" },
      { id: "9MZHNkbAX4A?si=kjk2tNI2SHFEh5Ub", title: "Tiger Mothering", thumbnail: "/assets/longform/section-1-2.webp", desc: "A look at the pressures of academic excellence in a competitive environment." },
    ]
  }
];

// Highlight-only metadata that has no equivalent on the section video itself.
const HIGHLIGHT_META = [
  { duration: "29:48", date: "2023" },
  { duration: "17:48", date: "2024" },
  { duration: "06:09", date: "2023" }
];

// Each highlight is derived from the first video of its corresponding section —
// thumbnail included — so a single asset is reused in both the hero slider and
// the section lead card.
const HIGHLIGHT_VIDEOS = SECTIONS.map((section, idx) => ({
  id: section.videos[0].id,
  title: section.videos[0].title,
  category: section.title,
  thumbnail: section.videos[0].thumbnail,
  duration: HIGHLIGHT_META[idx].duration,
  date: HIGHLIGHT_META[idx].date,
  desc: section.videos[0].desc,
}));

export default function LongFormVideoProject() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selection, setSelection] = useState<{ videos: string[]; index: number } | null>(null);
  const [bannerDuration, setBannerDuration] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 20
  );
  const [bannerItemVw, setBannerItemVw] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 25
  );

  useEffect(() => {
    const update = () => {
      const isDesktop = window.innerWidth >= 768;
      setBannerDuration(isDesktop ? 20 : 10);
      setBannerItemVw(isDesktop ? 25 : 50);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const bannerTotalVw = bannerImages.length * 2 * bannerItemVw;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
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
      scale: 1.1,
      filter: "blur(10px)"
    })
  };

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex(prev => (prev + 1) % HIGHLIGHT_VIDEOS.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex(prev => (prev - 1 + HIGHLIGHT_VIDEOS.length) % HIGHLIGHT_VIDEOS.length);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-orange-500">
      {/* Hero Section - Infinite Banner */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <motion.div
            key={`${bannerDuration}-${bannerItemVw}`}
            className="flex h-full"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: bannerDuration, repeat: Infinity, ease: "linear" }}
            style={{ width: `${bannerTotalVw}vw` }}
          >
            {[...bannerImages, ...bannerImages].map((src, i) => (
              <div key={i} className="h-full flex-shrink-0" style={{ width: `${bannerItemVw}vw` }}>
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover brightness-[0.6]"
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
              Long Form <span className="text-orange-500">Video</span>
            </h1>
            <p className="text-white/100 text-[10px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase">
              Cinematic Narratives That Hold Attention
            </p>
          </motion.div>

        </div>

        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 md:gap-12 text-white/60 uppercase text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.3em] font-bold">
          <div className="flex items-center gap-2"><Film size={14} /> Cinematic Craft</div>
          <div className="flex items-center gap-2 md:flex hidden"><Clock size={14} /> Deep Engagement</div>
          <div className="flex items-center gap-2"><Play size={14} /> YouTube Native</div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="pt-16 pb-12 px-6 md:px-20 max-w-7xl mx-auto text-center relative z-10">
        <motion.p
          {...scrollFadeUp}
          className="text-white/70 text-xl md:text-2xl leading-relaxed mb-16 max-w-5xl mx-auto font-light"
        >
          Capturing depth and perspective through cinematic long-form content. I specialize in documentary-style storytelling and high-production YouTube formats that build deep connections and provide meaningful value to the audience.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {LONG_FORM_VIDEO_TAGS.map((tag, i) => (
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

      {/* Highlight Slider Section */}
      <section className="py-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Featured Productions</h2>
          <p className="text-white/40 max-w-xl mx-auto">Selected long-form projects where narrative depth meets visual excellence.</p>
        </div>

        <div className="relative group/gallery max-w-6xl mx-auto px-6">
          <div className="relative h-[400px] md:h-[600px] flex items-center justify-center overflow-visible">
            {/* Nav Controls — always shown, wobble */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-20 z-20">
              <button
                onClick={prevSlide}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer shadow-2xl group/nav"
              >
                <StopMotionIcon
                  paths={STOP_MOTION_PATHS.arrowLeft}
                  size={32}
                  strokeWidth={4}
                  drawDuration={0}
                  staggerDelay={0}
                  wobble={true}
                />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-20 z-20">
              <button
                onClick={nextSlide}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer shadow-2xl group/nav"
              >
                <StopMotionIcon
                  paths={STOP_MOTION_PATHS.arrowRight}
                  size={32}
                  strokeWidth={4}
                  drawDuration={0}
                  staggerDelay={0}
                  wobble={true}
                />
              </button>
            </div>

            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div 
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ 
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 }
                }}
                className="absolute inset-0 rounded-[2.5rem] overflow-hidden group/card shadow-2xl border border-white/10"
              >
                <img
                  src={HIGHLIGHT_VIDEOS[activeIndex].thumbnail}
                  alt=""
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-1000 brightness-95"
                  referrerPolicy="no-referrer"
                />
                {/* Bottom-fade gradient — keeps the info overlay readable */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.15) 70%, transparent 100%)'
                  }}
                />
                <button
                  onClick={() => setSelection({ videos: HIGHLIGHT_VIDEOS.map(v => v.id), index: activeIndex })}
                  className="absolute inset-0 flex items-center justify-center group/play cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center group-hover/play:scale-110 group-hover/play:bg-orange-500 transition-all duration-500 shadow-2xl">
                    <StopMotionIcon
                      paths={STOP_MOTION_PATHS.play}
                      size={48}
                      strokeWidth={3}
                      drawDuration={0}
                      staggerDelay={0}
                      wobble
                    />
                  </div>
                </button>
                
                {/* Info Overlay */}
                <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none">
                  <div>
                    <span className="text-orange-500 text-[10px] uppercase tracking-widest font-bold mb-2 block">{HIGHLIGHT_VIDEOS[activeIndex].category}</span>
                    <h3 className="text-lg md:text-3xl font-bold mb-4">{HIGHLIGHT_VIDEOS[activeIndex].title}</h3>
                    <p className="text-white/90 max-w-lg mb-0">{HIGHLIGHT_VIDEOS[activeIndex].desc}</p>
                  </div>
                  <div className="flex gap-8 text-[10px] md:text-xs">
                    <div className="flex items-center gap-2 text-white/90">
                      <Clock size={14} /> <span>{HIGHLIGHT_VIDEOS[activeIndex].duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <Calendar size={14} /> <span>{HIGHLIGHT_VIDEOS[activeIndex].date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-3 mt-12">
            {HIGHLIGHT_VIDEOS.map((_, i) => (
              <button 
                key={i}
                onClick={() => {
                  setDirection(i > activeIndex ? 1 : -1);
                  setActiveIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === activeIndex ? 'bg-orange-500 w-8' : 'bg-white/20 w-2 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sections for Specific Categories */}
      {SECTIONS.map((section, sIdx) => (
        <section key={section.title} className={`py-24 px-6 md:px-32 ${sIdx % 2 !== 0 ? 'bg-white/5' : ''}`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 max-w-2xl">
              <span className="text-orange-500 text-[10px] uppercase tracking-widest font-bold mb-4 block">0{sIdx + 1} / Collection</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{section.title}</h2>
              <p className="text-white/40 text-lg leading-relaxed">{section.desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {section.videos.map((v, vIdx) => (
              <button
                key={v.id}
                onClick={() => setSelection({ videos: section.videos.map(sv => sv.id), index: vIdx })}
                className="group/item cursor-pointer text-left"
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 border border-white/5 shadow-2xl">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-full h-full object-cover brightness-100 group-hover/item:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl transition-all duration-500 group-hover/item:scale-110 group-hover/item:bg-orange-500 group-hover/item:border-orange-500">
                      <StopMotionIcon
                        paths={STOP_MOTION_PATHS.play}
                        size={36}
                        strokeWidth={3}
                        drawDuration={0}
                        staggerDelay={0}
                        wobble
                      />
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-2 text-white/90 group-hover/item:text-orange-500 transition-colors uppercase tracking-tight">{v.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed font-light">{v.desc}</p>
              </button>
              ))}
            </div>
          </div>
        </section>
      ))}

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

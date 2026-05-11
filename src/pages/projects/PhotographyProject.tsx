import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, GraduationCap, Heart, Instagram, ArrowLeft } from 'lucide-react';
import { heroEnter, heroEnterDelay, scrollFadeUp } from '@/lib/animations';
import StopMotionIcon, { STOP_MOTION_PATHS } from '@/components/ui/StopMotionIcon';
import SketchDecorations from '@/components/ui/SketchDecorations';

const GRADUATION_IMAGES = [
  { id: 1, url: '/photography/grad-1.webp', title: 'Class of 2024' },
  { id: 2, url: '/photography/grad-2.webp', title: 'Golden Hour Celebration' },
  { id: 3, url: '/photography/grad-3.webp', title: 'Academic Excellence' },
  { id: 4, url: '/photography/grad-4.webp', title: 'Campus Memories' },
  { id: 5, url: '/photography/grad-5.webp', title: 'Future Leaders' },
  { id: 6, url: '/photography/grad-6.webp', title: 'Final Farewell' },
  { id: 7, url: '/photography/grad-7.webp', title: 'Success Path' },
];

const bannerImages = [
  "/photography/banner-1.webp",
  "/photography/banner-2.webp",
  "/photography/banner-3.webp",
  "/photography/banner-4.webp",
];

const PHOTOGRAPHY_TAGS = ["Portrait", "Wedding", "Graduation", "Event", "Documentary", "Visual Storytelling"];

export default function PhotographyProject() {
  const [gradIndex, setGradIndex] = useState(0);
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

  const nextSlide = () => {
    setGradIndex((prev) => (prev + 1) % GRADUATION_IMAGES.length);
  };

  const prevSlide = () => {
    setGradIndex((prev) => (prev - 1 + GRADUATION_IMAGES.length) % GRADUATION_IMAGES.length);
  };

  const goToSlide = (index: number) => {
    setGradIndex(index);
  };

  const tripletVariants = {
    center: {
      x: '0%',
      scale: 1.5,
      rotateY: 0,
      rotate: 0,
      opacity: 1,
      zIndex: 20,
    },
    left: {
      x: '-70%',
      scale: 0.75,
      rotateY: 15,
      rotate: -5,
      opacity: 0.4,
      zIndex: 10,
    },
    right: {
      x: '70%',
      scale: 0.75,
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
              Photography
            </h1>
            <p className="text-white/60 text-[10px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase">
              Capturing Moments
            </p>
          </motion.div>

        </div>

        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 md:gap-12 text-white/60 uppercase text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.3em] font-bold">
          <div className="flex items-center gap-2"><Camera size={14} /> Natural Light</div>
          <div className="flex items-center gap-2 md:flex hidden"><Heart size={14} /> Honest Moments</div>
          <div className="flex items-center gap-2"><GraduationCap size={14} /> Milestone Memory</div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="pt-16 pb-12 px-6 md:px-20 max-w-7xl mx-auto text-center relative z-10">
        <motion.p
          {...scrollFadeUp}
          className="text-white/70 text-xl md:text-2xl leading-relaxed mb-16 max-w-5xl mx-auto font-light"
        >
          Capturing the essence of human connection and milestone achievements. Every frame is a preserved memory, told through natural light and authentic emotions.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {PHOTOGRAPHY_TAGS.map((tag, i) => (
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

      {/* Graduation Section */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16 justify-center">
            <GraduationCap className="text-orange-500 w-8 h-8" />
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Graduation Portfolio</h2>
          </div>

          <div className="relative">
            <div className="relative z-10 min-h-[220px] md:min-h-[650px] overflow-visible perspective-[1500px] flex items-center justify-center">
              <div className="relative w-full max-w-[200px] md:max-w-[600px] aspect-video flex items-center justify-center">
                {GRADUATION_IMAGES.map((img, i) => {
                  const position = getSlidePosition(i, gradIndex, GRADUATION_IMAGES.length);
                  const isCenter = position === 'center';
                  
                  return (
                    <motion.div
                      key={img.id}
                      variants={tripletVariants}
                      initial={false}
                      animate={position}
                      transition={{
                        type: "spring",
                        stiffness: 160,
                        damping: 24
                      }}
                      className="absolute w-full h-full rounded-2xl md:rounded-[1.5rem] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)] border border-white/10 group/card bg-[#1a1a1a]"
                    >
                      <img 
                        src={img.url} 
                        alt={img.title}
                        className="w-full h-full object-cover brightness-90 group-hover/card:brightness-100 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      {isCenter && (
                        <div className="absolute bottom-0 inset-x-0 p-4 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
                          <h3 className="text-sm md:text-xl font-bold uppercase tracking-tight text-white">{img.title}</h3>
                        </div>
                      )}
                      {!isCenter && (
                        <div 
                          className="absolute inset-0 cursor-pointer z-50 bg-black/20" 
                          onClick={() => goToSlide(i)}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="absolute inset-x-[0%] md:inset-x-[-5%] top-1/2 -translate-y-1/2 flex justify-between z-[60] pointer-events-none px-2 md:px-0">
                <button 
                    onClick={prevSlide}
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
                    onClick={nextSlide}
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
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2.5 mt-20 relative z-20">
              {GRADUATION_IMAGES.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => goToSlide(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${dotIdx === gradIndex ? 'bg-orange-500 w-8' : 'bg-white/20 hover:bg-white/40 w-3'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}


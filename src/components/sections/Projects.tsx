import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CREATIVE_PROJECTS, TECHNICAL_PROJECTS } from '@/lib/constants';
import StopMotionIcon, { STOP_MOTION_PATHS } from '@/components/ui/StopMotionIcon';
import SketchLine from '@/components/ui/SketchLine';

export default function Projects({ onNavigate }: { onNavigate: (v: 'home' | 'motion' | 'graphic' | 'short-form' | 'long-form' | 'photography' | 'web-dev' | 'market-research' | 'data-analysis' | 'meta-ads') => void }) {
  const [activeTab, setActiveTab] = useState<'creative' | 'technical'>('creative');

  const items = activeTab === 'creative' ? CREATIVE_PROJECTS : TECHNICAL_PROJECTS;

  const handleDetailClick = (title: string) => {
    if (title === "Motion Graphics") {
      onNavigate('motion');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (title === "Graphic Design") {
      onNavigate('graphic');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (title === "Short Form Video") {
      onNavigate('short-form');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (title === "Long Form Video") {
      onNavigate('long-form');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (title === "Photography") {
      onNavigate('photography');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (title === "Web Development") {
      onNavigate('web-dev');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (title === "Data Analysis & Visualization") {
      onNavigate('data-analysis');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (title === "Meta Ads") {
      onNavigate('meta-ads');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative py-24 bg-[#121212] px-8 sm:px-12 md:px-48 overflow-hidden">
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
        animate={{ backgroundPositionX: ["0px", "-60px"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Looping sketch decorations */}
      <div className="absolute top-12 right-8 md:right-24 text-orange-500/70 pointer-events-none hidden sm:block">
        <StopMotionIcon
          paths={STOP_MOTION_PATHS.sparkle}
          size={56}
          strokeWidth={1.4}
          loop
          loopDuration={3.2}
          loopPause={0.3}
          staggerDelay={0.12}
        />
      </div>
      <div className="absolute bottom-16 left-6 md:left-24 text-white/30 pointer-events-none hidden md:block rotate-[-8deg]">
        <StopMotionIcon
          paths={STOP_MOTION_PATHS.circle}
          size={64}
          strokeWidth={1.2}
          loop
          loopDuration={4}
          loopPause={0.5}
        />
      </div>

      <div className="relative flex flex-col items-center mb-16">
        <div className="flex items-center gap-4 mb-8 w-full">
          <SketchLine reverse />
          <div className="px-6 py-1.5 border border-orange-500/30 rounded-full text-xs uppercase tracking-widest text-orange-500 font-bold">
            What I Did
          </div>
          <SketchLine delay={0.4} />
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-2">
          Every project, one standard
        </h2>
        {/* Scribble underline that draws and erases continuously */}
        <div className="text-orange-500/70 mb-4 -mt-1">
          <StopMotionIcon
            paths={STOP_MOTION_PATHS.scribble}
            size={140}
            strokeWidth={1.6}
            viewBox="0 0 100 100"
            loop
            loopDuration={2.8}
            loopPause={0.4}
            wobble={false}
            style={{ height: 28 }}
          />
        </div>
        <p className="text-white/80 text-base md:text-lg text-center max-w-2xl mb-12">
          Pick your lane or let me handle everything you need. Every service is built with the same obsession for quality.
        </p>

        <div className="relative flex gap-4 p-1 bg-white/5 rounded-full text-white">
          {/* Looping sketch border — four segments trace the pill in sequence */}
          <svg
            className="absolute -inset-2.5 w-[calc(100%+1.25rem)] h-[calc(100%+1.25rem)] opacity-60 pointer-events-none"
            viewBox="0 0 200 50"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {[
              'M30 4 C 80 6, 130 2, 170 4',
              'M170 4 C 188 4, 196 14, 196 25 C 196 36, 188 46, 170 46',
              'M170 46 C 130 48, 80 44, 30 46',
              'M30 46 C 12 46, 4 36, 4 25 C 4 14, 12 4, 30 4',
            ].map((d, i) => (
              <motion.path
                key={i}
                d={d}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1, 0, 0], opacity: [0, 1, 1, 1, 0] }}
                transition={{
                  duration: 3.5,
                  times: [0, 0.4, 0.7, 0.95, 1],
                  ease: [0.65, 0, 0.35, 1],
                  repeat: Infinity,
                  delay: i * 0.2,
                  repeatDelay: 0.3,
                }}
              />
            ))}
          </svg>
          <button
            onClick={() => setActiveTab('creative')}
            className={`relative px-10 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${activeTab === 'creative' ? 'bg-orange-500 text-white' : 'text-white/40 hover:text-white'}`}
          >
            Creative
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            className={`relative px-10 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${activeTab === 'technical' ? 'bg-orange-500 text-white' : 'text-white/40 hover:text-white'}`}
          >
            Technical
          </button>
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial="initial"
              whileInView="enter"
              whileHover="hover"
              viewport={{ once: true }}
              variants={{
                initial: { opacity: 0, y: 30 },
                enter: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, delay: index * 0.1, ease: "easeOut" }
                }
              }}
              className="relative aspect-square cursor-pointer rounded-[1rem]"
              onClick={() => handleDetailClick(item.title)}
            >
              <div className="absolute inset-0 overflow-hidden rounded-[1rem] bg-zinc-900 border border-white/5">
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
                variants={{
                  initial: { scale: 1, opacity: 0.6 },
                  hover: { scale: 1.1, opacity: 0.4 }
                }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              />

              <div className="absolute inset-0 px-4 pt-4 pb-5 sm:px-6 sm:pt-6 sm:pb-8 md:px-10 md:pt-10 md:pb-10 flex flex-col justify-end items-start text-left bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                <motion.h3
                  layout="position"
                  className="text-base sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight break-words translate-y-3 sm:translate-y-0"
                >
                  {item.title}
                </motion.h3>

                <motion.div
                  layout="position"
                  className="hidden sm:flex flex-wrap gap-1.5 sm:gap-2 justify-start"
                >
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 sm:px-3 sm:py-1 border border-white/20 rounded-full text-[8px] sm:text-[9px] uppercase tracking-wider text-white/50 font-medium whitespace-nowrap bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && (
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 border border-white/20 rounded-full text-[8px] sm:text-[9px] uppercase tracking-wider text-white/50 font-medium whitespace-nowrap bg-white/5">
                      +{item.tags.length - 2}
                    </span>
                  )}
                </motion.div>

                <motion.div 
                  variants={{
                    initial: { height: 0, opacity: 0, marginTop: 0 },
                    hover: { height: "auto", opacity: 1, marginTop: 24 }
                  }}
                  transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                  className="overflow-hidden"
                >
                  <motion.p 
                    variants={{
                      initial: { y: 20, opacity: 0 },
                      hover: { y: 0, opacity: 1 }
                    }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-white/60 text-xs md:text-sm leading-relaxed line-clamp-3 mb-4"
                  >
                    {item.desc}
                  </motion.p>
                  <motion.div 
                    variants={{
                      initial: { y: 10, opacity: 0 },
                      hover: { y: 0, opacity: 1 }
                    }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex items-center justify-start gap-2 text-orange-500 font-bold text-[12px] uppercase tracking-widest"
                  >
                    View Project
                    <StopMotionIcon
                      paths={STOP_MOTION_PATHS.arrowRight}
                      size={30}
                      strokeWidth={4}
                      loop
                      loopDuration={1.8}
                      loopPause={0.2}
                      staggerDelay={0.15}
                      wobble={false}
                    />
                  </motion.div>
                </motion.div>
              </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

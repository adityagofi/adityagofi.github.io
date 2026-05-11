import { motion } from 'motion/react';
import { ViewType } from '@/router/routes';
import SketchLine from '@/components/ui/SketchLine';

export default function Footer({ currentView }: { currentView?: ViewType }) {
  return (
    <footer id="contact" className="bg-[#121212] pt-24 pb-20 px-6 md:px-32 border-t border-white/5">
      {currentView !== 'contact' && (
        <div className="flex flex-col items-center mb-24">
          <div className="flex items-center gap-4 mb-16 w-full">
            <SketchLine reverse />
            <div className="px-6 py-1.5 border border-orange-500/30 rounded-full text-xs uppercase tracking-widest text-orange-500 font-bold">
              Work With Me
            </div>
            <SketchLine delay={0.4} />
          </div>

          <motion.div 
            className="w-full max-w-4xl bg-zinc-900/50 border border-white/10 rounded-[32px] md:rounded-[40px] p-8 md:p-20 text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 md:mb-10 relative z-10 leading-tight">
              Got an ideas? <br />
              <span className="text-white/40">Let's make it real.</span>
            </h2>
            <p className="text-white/60 text-base md:text-xl mb-12 md:mb-16 max-w-2xl mx-auto relative z-10 leading-relaxed font-light">
              Whether you need a brand, a website, or both I'm ready to build something worth talking about.
            </p>
            
            <motion.a
              href="https://wa.me/6282236127366"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 md:px-12 py-4 md:py-5 bg-white text-black rounded-full font-bold text-sm md:text-base relative z-10 hover:bg-orange-500 hover:text-white transition-colors duration-300 cursor-pointer whitespace-nowrap inline-block"
            >
              {/* Looping sketch border — four segments draw in sequence around the pill */}
              <svg
                className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
                viewBox="0 0 200 50"
                preserveAspectRatio="none"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
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
              <span className="relative">Start a conversation</span>
            </motion.a>
          </motion.div>
        </div>
      )}

      <div className="flex justify-center items-center pt-12 border-t border-white/5">
        <div className="text-white/40 text-xs uppercase tracking-widest font-bold text-center">
          All rights reserved © Aditya Gofi Saputra 2026
        </div>
      </div>
    </footer>
  );
}

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { CREATIVE_PROJECT_TITLES, TECHNICAL_PROJECT_TITLES } from '@/lib/constants';
import { ViewType } from '@/router/routes';

const creativeProjects = CREATIVE_PROJECT_TITLES;
const technicalProjects = TECHNICAL_PROJECT_TITLES;

export default function Navbar({ onNavigate }: { onNavigate: (v: ViewType) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<'creative' | 'technical' | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll behavior
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Show navbar if scrolling up or at the top
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false); // Hide on scroll down
        } else {
          setIsVisible(true); // Show on scroll up
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setExpandedCategory(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProjectClick = (item: string) => {
    if (item === "Motion Graphics") {
      onNavigate('motion');
    } else if (item === "Graphic Design") {
      onNavigate('graphic');
    } else if (item === "Short Form Video") {
      onNavigate('short-form');
    } else if (item === "Long Form Video") {
      onNavigate('long-form');
    } else if (item === "Photography") {
      onNavigate('photography');
    } else if (item === "Web Development") {
      onNavigate('web-dev');
    } else if (item === "Market Research") {
      onNavigate('market-research');
    } else if (item === "Data Analysis & Visualization") {
      onNavigate('data-analysis');
    } else if (item === "Meta Ads") {
      onNavigate('meta-ads');
    } else {
      onNavigate('home');
      // Scroll to section if it exists on home page
      const id = item.toLowerCase().replace(/\s+/g, '-');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
    setActiveDropdown(null);
    setExpandedCategory(null);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav 
      initial={{ y: 0, x: '-50%' }}
      animate={{ y: isVisible ? 0 : -120, x: '-50%' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 z-50 w-[90%] max-w-6xl"
    >
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-2 flex items-center justify-between shadow-2xl">
        {/* Logo - Left */}
        <div className="flex-1 flex justify-start">
          <button 
            onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-2xl cursor-pointer"
          >
            G.
          </button>
        </div>

        {/* Desktop Menu - Center */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-whites">
          <button onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-orange-500 transition-colors cursor-pointer text-white">Home</button>
          
          <div 
            className="relative"
            ref={dropdownRef}
          >
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'projects' ? null : 'projects')}
              className="flex items-center gap-1 hover:text-orange-500 transition-colors cursor-pointer outline-none text-white"
            >
              Projects <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'projects' ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {activeDropdown === 'projects' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[240px] bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-6 text-white"
                >
                  <div className="grid grid-cols-1 gap-6">
                    {/* Creative Category */}
                    <div>
                      <button 
                        onClick={() => setExpandedCategory(expandedCategory === 'creative' ? null : 'creative')}
                        className="flex items-center justify-between w-full text-orange-500 text-sm font-bold uppercase tracking-widest mb-4 hover:text-orange-400 transition-colors group/cat cursor-pointer"
                      >
                        Creative
                        <ChevronDown size={14} className={`transition-transform duration-300 ${expandedCategory === 'creative' ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {expandedCategory === 'creative' && (
                          <motion.ul 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3 overflow-hidden"
                          >
                            {creativeProjects.map((item) => (
                              <li key={item}>
                                <button 
                                  onClick={() => handleProjectClick(item)}
                                  className="text-white/60 hover:text-white transition-colors block text-sm text-left w-full cursor-pointer"
                                >
                                  {item}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Technical Category */}
                    <div>
                      <button 
                        onClick={() => setExpandedCategory(expandedCategory === 'technical' ? null : 'technical')}
                        className="flex items-center justify-between w-full text-orange-500 text-sm font-bold uppercase tracking-widest mb-4 hover:text-orange-400 transition-colors group/cat cursor-pointer"
                      >
                        Technical
                        <ChevronDown size={14} className={`transition-transform duration-300 ${expandedCategory === 'technical' ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {expandedCategory === 'technical' && (
                          <motion.ul 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3 overflow-hidden"
                          >
                            {technicalProjects.map((item) => (
                              <li key={item}>
                                <button 
                                  onClick={() => handleProjectClick(item)}
                                  className="text-white/60 hover:text-white transition-colors block text-sm leading-tight text-left w-full cursor-pointer"
                                >
                                  {item}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => {
              onNavigate('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="hover:text-orange-500 transition-colors cursor-pointer text-white"
          >
            Services
          </button>
          <button 
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="hover:text-orange-500 transition-colors cursor-pointer text-white"
          >
            Contact
          </button>
        </div>

        {/* Right Action */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <div className="relative hidden md:block">
            <a
              href="https://wa.me/6282236127366"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 block px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 cursor-pointer"
            >
              Get in touch
            </a>
            {/* Loose abstract sketch loops layered above the button — SVG is wider than tall so circles stretch into pill-like ovals */}
            <svg
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white z-20"
              width="200"
              height="100"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {(() => {
                const loops = [
                  {
                    d: 'M30 24 C 16 38, 16 60, 34 72 C 54 84, 78 76, 84 58 C 88 42, 76 24, 56 22 C 40 22, 30 30, 28 38',
                    duration: 9.0,
                    x: [0, 1.5, -1.2, 1.8, -1.0, 0.7, -1.4, 1.1, -0.9, 1.6, -1.3, 0.8, -0.5, 1.2, -1.7, 0.9, -1.0, 0],
                    y: [0, -1.3, 1.0, -0.7, 1.4, -1.1, 0.8, -1.6, 1.2, -0.9, 0.6, -1.2, 1.5, -0.8, 1.1, -1.4, 0.7, 0],
                    rotate: [0, 14, -19, 23, -11, 28, -25, 16, -8, 32, -21, 10, -29, 18, -14, 25, -12, 0],
                    times: [0, 0.06, 0.12, 0.18, 0.24, 0.3, 0.36, 0.42, 0.48, 0.54, 0.6, 0.66, 0.72, 0.78, 0.84, 0.9, 0.95, 1],
                  },
                  {
                    d: 'M70 18 C 86 30, 90 54, 74 70 C 58 86, 30 84, 20 66 C 12 52, 22 30, 42 22 C 58 16, 66 18, 72 24',
                    duration: 13.0,
                    x: [0, -1.2, 1.5, -0.8, 1.3, -1.7, 0.9, -1.1, 1.4, -0.5, 0.7, -1.4, 1.0, -1.6, 0.6, -0.9, 1.2, -1.3, 0.8, -1.5, 1.1, 0],
                    y: [0, 1.4, -1.0, 1.2, -1.5, 0.8, -0.7, 1.6, -1.2, 0.9, -1.4, 0.5, -1.1, 1.3, -0.6, 1.0, -1.7, 0.7, -0.9, 1.5, -1.0, 0],
                    rotate: [0, -22, 13, -29, 18, -14, 33, -9, 24, -27, 11, -19, 30, -16, 21, -25, 8, -32, 17, -12, 26, 0],
                    times: [0, 0.04, 0.09, 0.14, 0.19, 0.24, 0.28, 0.33, 0.38, 0.43, 0.48, 0.52, 0.57, 0.62, 0.67, 0.72, 0.77, 0.82, 0.87, 0.91, 0.96, 1],
                  },
                  {
                    d: 'M22 46 C 18 28, 38 14, 62 18 C 84 22, 92 46, 80 66 C 70 82, 44 86, 28 74',
                    duration: 8.0,
                    x: [0, 1.9, -1.5, 1.3, -1.0, 0.6, -1.3, 0.9, -0.7, 1.5, -1.2, 0.8, -1.4, 1.0, -0.6, 0],
                    y: [0, -1.3, 1.7, -1.1, 0.9, -0.7, 1.2, -0.5, 1.4, -1.0, 0.6, -1.5, 0.8, -0.4, 0.9, 0],
                    rotate: [0, 26, -18, 14, -29, 23, -10, 19, -25, 15, -33, 21, -13, 28, -16, 0],
                    times: [0, 0.07, 0.14, 0.21, 0.28, 0.35, 0.42, 0.49, 0.56, 0.63, 0.7, 0.77, 0.84, 0.9, 0.95, 1],
                  },
                  {
                    d: 'M82 38 C 92 52, 82 78, 56 80 C 32 82, 12 62, 18 42 C 24 26, 46 18, 60 22',
                    duration: 11.0,
                    x: [0, -1.7, 1.4, -1.1, 0.7, -1.5, 1.2, -0.8, 0.9, -1.3, 1.0, -0.5, 1.6, -1.4, 0.8, -1.2, 1.1, -0.6, 0.4, 0],
                    y: [0, 1.2, -1.6, 0.9, -0.7, 1.4, -1.0, 0.6, -1.3, 0.8, -1.5, 1.1, -0.9, 1.3, -1.7, 0.5, -1.2, 0.7, -0.5, 0],
                    rotate: [0, -23, 16, -34, 9, -14, 31, -19, 12, -25, 28, -11, 21, -32, 17, -8, 26, -22, 13, 0],
                    times: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.92, 1],
                  },
                ];
                return loops.map((loop, i) => (
                  <motion.path
                    key={i}
                    d={loop.d}
                    animate={{ x: loop.x, y: loop.y, rotate: loop.rotate }}
                    transition={{
                      duration: loop.duration,
                      times: loop.times,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{ transformOrigin: '50% 50%', transformBox: 'fill-box' }}
                  />
                ));
              })()}
            </svg>
          </div>
          <button className="md:hidden text-white cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden"
          >
            <div className="flex flex-col gap-4 text-white/80">
              <button onClick={() => { onNavigate('home'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-orange-500 text-left">Home</button>
              <div className="space-y-4">
                {/* Mobile Creative */}
                <div>
                  <button 
                    onClick={() => setExpandedCategory(expandedCategory === 'creative' ? null : 'creative')}
                    className="flex items-center justify-between w-full text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 cursor-pointer"
                  >
                    Creative Projects
                    <ChevronDown size={14} className={`transition-transform duration-300 ${expandedCategory === 'creative' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedCategory === 'creative' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-2 gap-2 overflow-hidden"
                      >
                        {creativeProjects.map(item => (
                          <button 
                            key={item} 
                            onClick={() => handleProjectClick(item)} 
                            className="text-xs text-white/80 py-1 text-left cursor-pointer"
                          >
                            {item}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Technical */}
                <div>
                  <button 
                    onClick={() => setExpandedCategory(expandedCategory === 'technical' ? null : 'technical')}
                    className="flex items-center justify-between w-full text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 cursor-pointer"
                  >
                    Technical Projects
                    <ChevronDown size={14} className={`transition-transform duration-300 ${expandedCategory === 'technical' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedCategory === 'technical' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-2 gap-2 overflow-hidden"
                      >
                        {technicalProjects.map(item => (
                          <button 
                            key={item} 
                            onClick={() => handleProjectClick(item)} 
                            className="text-xs text-white/60 py-1 text-left cursor-pointer"
                          >
                            {item}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <button 
                onClick={() => { 
                  onNavigate('services'); 
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="hover:text-orange-500 text-left cursor-pointer"
              >
                Services
              </button>
              <button 
                onClick={() => { 
                  onNavigate('contact'); 
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="hover:text-orange-500 text-left cursor-pointer"
              >
                Contact
              </button>
              <a 
                href="https://wa.me/6282236127366"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-5 py-3 bg-white text-black rounded-xl text-center text-xs font-bold cursor-pointer"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

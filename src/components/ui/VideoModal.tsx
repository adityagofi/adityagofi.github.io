import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import StopMotionIcon, { STOP_MOTION_PATHS } from '@/components/ui/StopMotionIcon';

// Strip YouTube share params (`?si=…`, `&t=…`) so they don't collide with our
// own `?autoplay=1` and so the thumbnail URL stays valid.
const baseVideoId = (id: string) => id.split('?')[0].split('&')[0];
const ytPoster = (id: string) => `https://img.youtube.com/vi/${baseVideoId(id)}/hqdefault.jpg`;
const ytEmbed = (id: string) => `https://www.youtube.com/embed/${baseVideoId(id)}?autoplay=1&rel=0`;

type VideoModalProps = {
  // null = closed. When non-null, modal opens on `videos[index]`.
  videos: string[] | null;
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
  // 'landscape' = 16:9, 'portrait' = 9:16 (e.g. shorts / vertical ads).
  aspect?: 'landscape' | 'portrait';
};

export default function VideoModal({
  videos,
  index,
  onIndexChange,
  onClose,
  aspect = 'landscape',
}: VideoModalProps) {
  const isPortrait = aspect === 'portrait';
  const isOpen = videos !== null && videos.length > 0;
  const currentVideo = isOpen ? videos[index] : null;
  const showNav = isOpen && videos.length > 1;
  const [iframeReady, setIframeReady] = useState(false);

  // Each navigation swaps the iframe's src — show the poster again until the
  // new iframe reports loaded.
  useEffect(() => {
    setIframeReady(false);
  }, [currentVideo]);

  // Warm up the YouTube domains the moment the modal opens so the first iframe
  // request lands without DNS / TLS overhead.
  useEffect(() => {
    if (!isOpen) return;
    const hosts = ['https://www.youtube.com', 'https://i.ytimg.com', 'https://www.google.com'];
    const links = hosts.map((href) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = '';
      document.head.appendChild(link);
      return link;
    });
    return () => {
      links.forEach((l) => l.remove());
    };
  }, [isOpen]);

  // Prefetch every carousel thumbnail so prev/next swaps are instant.
  useEffect(() => {
    if (!isOpen || !videos) return;
    videos.forEach((v) => {
      const img = new Image();
      img.src = ytPoster(v);
    });
  }, [isOpen, videos]);

  const goPrev = () => {
    if (!isOpen) return;
    onIndexChange((index - 1 + videos.length) % videos.length);
  };
  const goNext = () => {
    if (!isOpen) return;
    onIndexChange((index + 1) % videos.length);
  };

  return (
    <AnimatePresence>
      {isOpen && currentVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-20 bg-black/95 backdrop-blur-3xl"
          onClick={onClose}
        >
          <div
            className={`relative w-full ${isPortrait ? 'max-w-[400px] aspect-[9/16]' : 'max-w-6xl aspect-video'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video card — re-animates on src change so navigation feels alive */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentVideo}
                initial={{ scale: 0.92, opacity: 0, y: 16, filter: 'blur(10px)' }}
                animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ scale: 0.96, opacity: 0, y: -10, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-black rounded-[1rem] overflow-hidden shadow-[0_40px_120px_-20px_rgba(249,115,22,0.35)] border border-white/10"
              >
                {/* Poster shown immediately so the modal isn't black while the iframe boots */}
                <img
                  src={ytPoster(currentVideo)}
                  alt=""
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${iframeReady ? 'opacity-0' : 'opacity-100'}`}
                  referrerPolicy="no-referrer"
                />
                <iframe
                  src={ytEmbed(currentVideo)}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${iframeReady ? 'opacity-100' : 'opacity-0'}`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  onLoad={() => setIframeReady(true)}
                />
              </motion.div>
            </AnimatePresence>

            {/* Close button — rotates and snaps to orange on hover */}
            <motion.button
              onClick={onClose}
              initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
              whileHover={{ scale: 1.12, rotate: 90 }}
              whileTap={{ scale: 0.92, rotate: 90 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              aria-label="Close video"
              className="absolute -top-5 -right-5 md:-top-7 md:-right-7 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/20 backdrop-blur-md text-white/80 hover:text-white hover:bg-orange-500 hover:border-orange-500 flex items-center justify-center cursor-pointer z-[110] transition-colors duration-300 shadow-lg"
            >
              <X size={22} strokeWidth={2.4} />
            </motion.button>

            {/* Prev / next arrows — only shown if more than one video */}
            {showNav && (
              <>
                <motion.button
                  onClick={goPrev}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  whileHover={{ scale: 1.1, x: -4 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  aria-label="Previous video"
                  className="absolute top-1/2 -left-4 md:-left-20 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 hover:bg-orange-500 hover:border-orange-500 text-white flex items-center justify-center cursor-pointer z-[110] transition-colors duration-300 shadow-2xl"
                >
                  <StopMotionIcon
                    paths={STOP_MOTION_PATHS.arrowLeft}
                    size={26}
                    strokeWidth={4}
                    loop
                    loopDuration={2.4}
                    loopPause={0.15}
                    staggerDelay={0.2}
                    wobble={false}
                  />
                </motion.button>
                <motion.button
                  onClick={goNext}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  whileHover={{ scale: 1.1, x: 4 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  aria-label="Next video"
                  className="absolute top-1/2 -right-4 md:-right-20 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 hover:bg-orange-500 hover:border-orange-500 text-white flex items-center justify-center cursor-pointer z-[110] transition-colors duration-300 shadow-2xl"
                >
                  <StopMotionIcon
                    paths={STOP_MOTION_PATHS.arrowRight}
                    size={26}
                    strokeWidth={4}
                    loop
                    loopDuration={2.4}
                    loopPause={0.15}
                    staggerDelay={0.2}
                    wobble={false}
                  />
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

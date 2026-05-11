import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import FlowField from '@/components/ui/FlowField';
import { heroEnterDelay } from '@/lib/animations';
import StopMotionIcon, { STOP_MOTION_PATHS } from '@/components/ui/StopMotionIcon';

type CollageCard = {
  src: string;
  aspect: string;
  size: string; // tailwind width classes (may be md: only for desktop-only cards)
  pos: string;  // tailwind left/top classes; can include hidden md:block to hide on mobile
  rotate: number;
};

// On mobile, only the top + bottom strips show so cards never sit under the text.
// On desktop, cards spread across the right half (constrained by dragConstraints).
const COLLAGE_CARDS: CollageCard[] = [
  // Top strip — visible mobile + desktop
  { src: '/hero/workspace-1.webp',           aspect: 'aspect-[4/3]',  size: 'w-[80px]  md:w-[180px]', pos: 'absolute left-[10%]  top-[12%]  md:left-[4%]  md:top-[13%]', rotate: -6 },
  { src: '/shortform/project-rspi-5.webp',   aspect: 'aspect-[9/16]', size: 'w-[60px]  md:w-[140px]', pos: 'absolute left-[36%] top-[7%]  md:left-[26%] md:top-[10%]', rotate: 5  },
  { src: '/graphic/banner-1.webp',           aspect: 'aspect-[16/9]', size: 'w-[96px]  md:w-[220px]', pos: 'absolute left-[62%] top-[10%] md:left-[64%] md:top-[11%]', rotate: 4  },

  // Middle band — desktop only (hidden on mobile so it doesn't overlap text)
  { src: '/motion/project-sats-1.webp',      aspect: 'aspect-square', size: 'md:w-[170px]',           pos: 'absolute hidden md:block md:left-[46%] md:top-[17%]', rotate: -3 },
  { src: '/shortform/project-pocari-1.webp', aspect: 'aspect-[9/16]', size: 'md:w-[130px]',           pos: 'absolute hidden md:block md:left-[82%] md:top-[27%]', rotate: -7 },
  { src: '/motion/project-asahi-1.webp',     aspect: 'aspect-square', size: 'md:w-[170px]',           pos: 'absolute hidden md:block md:left-[8%]  md:top-[39%]', rotate: 3  },
  { src: '/graphic/booklet-2-1.webp',        aspect: 'aspect-[3/4]',  size: 'md:w-[160px]',           pos: 'absolute hidden md:block md:left-[30%] md:top-[43%]', rotate: -5 },
  { src: '/motion/project-asahi-2.webp',     aspect: 'aspect-[16/9]', size: 'md:w-[230px]',           pos: 'absolute hidden md:block md:left-[50%] md:top-[45%]', rotate: 5  },
  { src: '/graphic/booklet-1-1.webp',        aspect: 'aspect-square', size: 'md:w-[160px]',           pos: 'absolute hidden md:block md:left-[78%] md:top-[51%]', rotate: -4 },

  // Bottom strip — visible mobile + desktop
  { src: '/motion/project-sats-3.webp',      aspect: 'aspect-[16/9]', size: 'w-[100px] md:w-[230px]', pos: 'absolute left-[2%]  top-[80%] md:left-[4%]  md:top-[71%]', rotate: 4  },
  { src: '/shortform/project-mantappu-academy-4.webp', aspect: 'aspect-[9/16]', size: 'w-[60px] md:w-[140px]', pos: 'absolute left-[38%] top-[82%] md:left-[36%] md:top-[73%]', rotate: -6 },
  { src: '/longform/banner-2.webp',          aspect: 'aspect-[16/9]', size: 'w-[100px] md:w-[230px]', pos: 'absolute left-[64%] top-[78%] md:left-[58%] md:top-[75%]', rotate: 3  },
];

export default function Hero() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [zOrder, setZOrder] = useState<number[]>(COLLAGE_CARDS.map((_, i) => i));

  const bringToFront = (index: number) => {
    setZOrder((prev) => [...prev.filter((i) => i !== index), index]);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#121212]">
      <FlowField />

      {/* Drag container — full viewport on mobile, right half on desktop */}
      <div
        ref={constraintsRef}
        className="absolute inset-0 md:left-1/2 z-10"
      >
        {COLLAGE_CARDS.map((card, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            dragElastic={0.12}
            onPointerDown={() => bringToFront(i)}
            whileHover={{ scale: 1.04 }}
            whileDrag={{ scale: 1.08, transition: { duration: 0.15 } }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              zIndex: zOrder.indexOf(i) + 10,
            }}
            className={`${card.pos} cursor-grab active:cursor-grabbing select-none`}
          >
            {/* Inner layer handles the continuous float so it composes with the outer drag transform */}
            <motion.div
              animate={{
                x: [0, 12, -8, 6, 0],
                y: [0, -10, 8, -4, 0],
                rotate: [
                  card.rotate,
                  card.rotate + 2,
                  card.rotate - 1.5,
                  card.rotate + 1,
                  card.rotate,
                ],
              }}
              transition={{
                duration: 10 + (i % 5) * 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`${card.size} ${card.aspect} rounded-lg overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-white/10`}
            >
              <img
                src={card.src}
                alt=""
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Text content — left side, always on top */}
      <div className="relative z-30 px-12 md:pl-48 md:pr-24 pt-55 pb-12 max-w-3xl">
        <motion.h1
          {...heroEnterDelay(0.1)}
          className="text-4xl md:text-[3.6rem] font-bold text-white leading-[1.1] mb-6 max-w-4xl"
        >
          Hii, Welcome! <br/>
          <span className="text-orange-500 font-medium">Let's build something great</span>
        </motion.h1>

        <motion.p
          {...heroEnterDelay(0.25)}
          className="text-white text-base md:text-lg max-w-md mb-8 leading-relaxed font-light"
        >
          I’m Gofi. I specialize in making digital products that look stunning and work even better. Stay a while and look around.
        </motion.p>

        <motion.a
          href="https://wa.me/6282236127366"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative inline-flex items-center gap-3 px-12 py-4 rounded-full text-white text-sm font-medium hover:bg-white hover:text-black transition-colors duration-500 cursor-pointer"
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
                  duration: 3,
                  times: [0, 0.4, 0.7, 0.95, 1],
                  ease: [0.65, 0, 0.35, 1],
                  repeat: Infinity,
                  delay: i * 0,
                  repeatDelay: 0,
                }}
              />
            ))}
          </svg>

          <span className="relative">Start a Project</span>
          <span className="relative">
            <StopMotionIcon
              paths={STOP_MOTION_PATHS.arrowRight}
              size={30}
              strokeWidth={4}
              wobble={true}
            />
          </span>
        </motion.a>
      </div>
    </section>
  );
}

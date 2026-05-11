import { motion } from 'motion/react';
import { useEffect, useState, CSSProperties } from 'react';

type StopMotionIconProps = {
  // Each path renders as one stroke animated in. They draw in sequence.
  paths: string[];
  viewBox?: string;
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  drawDuration?: number;
  staggerDelay?: number;
  // Subtle frame-by-frame jitter once the icon has finished drawing.
  wobble?: boolean;
  wobbleFps?: number;
  // When true, the strokes draw in → hold → erase → repeat forever.
  loop?: boolean;
  loopDuration?: number;
  loopPause?: number;
  className?: string;
  style?: CSSProperties;
};

// Tiny per-frame transform offsets so the drawn icon "breathes" like a
// stop-motion pencil animation. Stepped transitions keep the look snappy.
const FRAMES = [
  { tx: 0,    ty: 0,    r: 0 },
  { tx: 1.6,  ty: -1.3, r:6 },
  { tx: -1.3, ty: 1.6,  r: -4 },
  { tx: 1.0,  ty: 1.0,  r: 3 },
];

export default function StopMotionIcon({
  paths,
  viewBox = '0 0 100 100',
  size = 80,
  stroke = 'currentColor',
  strokeWidth = 1.6,
  drawDuration = 1.4,
  staggerDelay = 0.25,
  wobble = true,
  wobbleFps = 3,
  loop = false,
  loopDuration = 3.5,
  loopPause = 0.4,
  className = '',
  style,
}: StopMotionIconProps) {
  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    if (!wobble) return;
    const interval = 1000 / wobbleFps;
    const id = window.setInterval(() => {
      setFrameIdx(i => (i + 1) % FRAMES.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [wobble, wobbleFps]);

  const frame = FRAMES[frameIdx];

  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      className={className}
      style={style}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g
        style={{
          transform: `translate(${frame.tx}px, ${frame.ty}px) rotate(${frame.r}deg)`,
          transformOrigin: '50% 50%',
          transition: 'transform 60ms steps(1)',
        }}
      >
        {paths.map((d, i) => {
          if (loop) {
            return (
              <motion.path
                key={i}
                d={d}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1, 0, 0],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{
                  duration: loopDuration,
                  times: [0, 0.35, 0.7, 0.95, 1],
                  ease: [0.65, 0, 0.35, 1],
                  repeat: Infinity,
                  repeatDelay: loopPause,
                  delay: i * staggerDelay,
                }}
              />
            );
          }
          return (
            <motion.path
              key={i}
              d={d}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: {
                  duration: drawDuration,
                  delay: i * staggerDelay,
                  ease: [0.65, 0, 0.35, 1],
                },
                opacity: { duration: 0.15, delay: i * staggerDelay },
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}

// A small library of decorative sketch paths. Each entry is an array because
// most icons need multiple strokes drawn in order.
export const STOP_MOTION_PATHS = {
  // 4-point sparkle, two crossed strokes — punchy when looped.
  sparkle: [
    'M50 18 C 50 35, 50 45, 50 82',
    'M18 50 C 35 50, 45 50, 82 50',
    'M28 28 C 38 38, 42 42, 50 50',
    'M72 72 C 62 62, 58 58, 50 50',
  ],
  // Squiggly underline — works under headings.
  scribble: [
    'M10 50 C 18 38, 26 62, 34 50 C 42 38, 50 62, 58 50 C 66 38, 74 62, 82 50 C 86 44, 90 50, 90 50',
  ],
  // Curved arrow with arrowhead — implies "look here" or forward motion.
  arrow: [
    'M14 60 C 28 30, 56 22, 82 36',
    'M76 26 L 82 36 L 72 42',
  ],
  // Horizontal sketchy arrow — sized for inline use next to link text.
  arrowRight: [
    'M14 50 C 32 47, 56 53, 78 50',
    'M62 36 L 80 50 L 62 64',
  ],
  // Mirror of arrowRight — points left.
  arrowLeft: [
    'M86 50 C 68 47, 44 53, 22 50',
    'M38 36 L 20 50 L 38 64',
  ],
  // Downward sketchy arrow — for hero "scroll down" cues.
  arrowDown: [
    'M50 14 C 47 32, 53 56, 50 78',
    'M34 62 L 50 80 L 66 62',
  ],
  // Mirror of arrowDown — points up.
  arrowUp: [
    'M50 86 C 47 68, 53 44, 50 22',
    'M34 38 L 50 20 L 66 38',
  ],
  // Hand-drawn circle — for highlighting or circling something.
  circle: [
    'M50 16 C 22 18, 14 42, 22 64 C 32 84, 64 86, 78 68 C 90 50, 84 22, 56 16',
  ],
  // Five-point star, single continuous stroke.
  star: [
    'M50 14 L 60 38 L 86 40 L 66 58 L 72 84 L 50 70 L 28 84 L 34 58 L 14 40 L 40 38 Z',
  ],
  // Puffy hand-drawn cloud outline.
  cloud: [
    'M26 64 C 14 64, 10 52, 20 44 C 18 32, 36 26, 44 36 C 50 22, 72 26, 74 40 C 86 40, 90 58, 76 64 Z',
  ],
  // A simple sketched heart, single continuous stroke.
  heart: [
    'M50 78 C 30 60, 18 48, 18 36 C 18 26, 26 20, 34 22 C 41 24, 47 30, 50 36 C 53 30, 59 24, 66 22 C 74 20, 82 26, 82 36 C 82 48, 70 60, 50 78 Z',
  ],
  // A hand-drawn check mark.
  check: [
    'M22 52 L 42 70 L 78 32',
  ],
  // Sketched play triangle — outline plus interior vertical hatching so the
  // shape reads as a solid hand-drawn fill rather than a hollow outline.
  // Optically centered around (50, 50).
  play: [
    'M36 24 L 36 76 L 80 50 Z',
    'M44 30 L 42 70',
    'M50 33 L 50 67',
    'M56 37 L 56 63',
    'M62 40 L 62 60',
    'M68 44 L 68 56',
    'M74 47 L 74 53',
  ],
  // Lightning bolt — works for "speed" / "energy" callouts.
  bolt: [
    'M52 14 L 30 56 L 48 56 L 40 86 L 70 42 L 52 42 Z',
  ],
  // Artist palette with thumb hole and three paint blobs.
  palette: [
    'M25 50 C 25 30, 45 18, 65 22 C 84 26, 90 44, 86 56 C 82 66, 70 70, 62 66 C 58 64, 54 68, 56 74 C 58 80, 52 84, 44 82 C 28 78, 25 65, 25 50 Z',
    'M40 38 C 40 35, 46 35, 46 38 C 46 41, 40 41, 40 38 Z',
    'M58 30 C 58 27, 64 27, 64 30 C 64 33, 58 33, 58 30 Z',
    'M70 46 C 70 43, 76 43, 76 46 C 76 49, 70 49, 70 46 Z',
  ],
  // Video camera body with conical lens on the right.
  video: [
    'M14 38 C 14 36, 16 34, 18 34 L 60 34 C 62 34, 64 36, 64 38 L 64 64 C 64 66, 62 68, 60 68 L 18 68 C 16 68, 14 66, 14 64 Z',
    'M64 46 L 86 36 L 86 66 L 64 56 Z',
  ],
  // Code brackets — angles and slash, like </>
  code: [
    'M34 30 L 16 50 L 34 70',
    'M66 30 L 84 50 L 66 70',
    'M58 22 L 42 78',
  ],
  // Megaphone cone with mouthpiece and a sound wave.
  megaphone: [
    'M14 38 L 60 22 L 60 78 L 14 62 Z',
    'M60 32 L 76 36 L 76 64 L 60 68',
    'M82 42 C 88 46, 88 54, 82 58',
  ],
  // Bar chart — three bars sitting on a baseline.
  barChart: [
    'M14 80 L 86 80',
    'M22 80 L 22 60 L 32 60 L 32 80',
    'M42 80 L 42 46 L 52 46 L 52 80',
    'M62 80 L 62 30 L 72 30 L 72 80',
  ],
  // Database cylinder — top disc, side walls, and a middle band.
  database: [
    'M22 26 C 22 18, 78 18, 78 26 C 78 34, 22 34, 22 26 Z',
    'M22 26 L 22 74 C 22 82, 78 82, 78 74 L 78 26',
    'M22 50 C 22 58, 78 58, 78 50',
  ],
  // Camera body with viewfinder bump and a two-ring lens.
  camera: [
    'M14 32 L 36 32 L 42 22 L 58 22 L 64 32 L 86 32 L 86 78 L 14 78 Z',
    'M50 40 C 36 40, 30 50, 30 58 C 30 66, 40 72, 50 72 C 60 72, 70 66, 70 58 C 70 50, 64 40, 50 40 Z',
    'M50 50 C 44 50, 42 54, 42 58 C 42 63, 47 65, 50 65 C 54 65, 58 63, 58 58 C 58 54, 56 50, 50 50',
  ],
};

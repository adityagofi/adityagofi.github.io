import { motion } from 'motion/react';

type SketchLineProps = {
  className?: string;
  strokeWidth?: number;
  // Full draw → hold → erase cycle in seconds.
  duration?: number;
  // Pause between cycles in seconds.
  pause?: number;
  // Delay before the first cycle starts. Useful for staggering pairs.
  delay?: number;
  // Draw from right → left instead of the default left → right.
  reverse?: boolean;
};

// A flex-1 SVG horizontal divider that continuously draws and erases itself.
// Drop it where you'd otherwise put `<div className="h-[1px] flex-1 bg-…" />`.
export default function SketchLine({
  className = '',
  strokeWidth = 0.1,
  duration = 3,
  pause = 0.4,
  delay = 0,
  reverse = false,
}: SketchLineProps) {
  return (
    <svg
      className={`flex-1 h-2 text-white/40 ${className}`}
      viewBox="0 0 100 4"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    >
      <motion.path
        // Slight wave so it reads as hand-drawn rather than ruled.
        // Reversing the M point flips which end the stroke grows from.
        d={reverse ? 'M 0 2 C 25 1.4, 50 2.6, 100 2' : 'M 100 2 C 75 2.6, 50 1.4, 0 2'}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 0, 0], opacity: [0, 1, 1, 1, 0] }}
        transition={{
          duration,
          times: [0, 0.4, 0.7, 0.95, 1],
          ease: [0.65, 0, 0.35, 1],
          repeat: Infinity,
          repeatDelay: pause,
          delay,
        }}
      />
    </svg>
  );
}

import StopMotionIcon, { STOP_MOTION_PATHS } from './StopMotionIcon';

// Reusable cluster of looping sketch icons (sparkle / star / cloud / circle)
// dropped inside a `relative overflow-hidden` section so they sit behind any
// foreground content and clip at the section edges.
export default function SketchDecorations() {
  return (
    <>
      <div className="absolute top-8 right-8 md:right-20 text-orange-500/60 pointer-events-none hidden sm:block z-10">
        <StopMotionIcon
          paths={STOP_MOTION_PATHS.sparkle}
          size={48}
          strokeWidth={1.4}
          loop
          loopDuration={3.2}
          loopPause={0.3}
          staggerDelay={0.12}
        />
      </div>
      <div className="absolute top-[28%] left-6 md:left-20 text-white/30 pointer-events-none hidden md:block rotate-[-12deg] z-10">
        <StopMotionIcon
          paths={STOP_MOTION_PATHS.star}
          size={44}
          strokeWidth={1.4}
          loop
          loopDuration={3.6}
          loopPause={0.3}
        />
      </div>
      <div className="absolute bottom-20 right-10 md:right-32 text-white/25 pointer-events-none hidden md:block rotate-[6deg] z-10">
        <StopMotionIcon
          paths={STOP_MOTION_PATHS.cloud}
          size={68}
          strokeWidth={1.4}
          loop
          loopDuration={4}
          loopPause={0.4}
        />
      </div>
      <div className="absolute bottom-24 left-10 md:left-40 text-orange-500/40 pointer-events-none hidden md:block rotate-[-6deg] z-10">
        <StopMotionIcon
          paths={STOP_MOTION_PATHS.circle}
          size={56}
          strokeWidth={1.2}
          loop
          loopDuration={4}
          loopPause={0.5}
        />
      </div>
    </>
  );
}

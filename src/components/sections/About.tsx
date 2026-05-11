import { motion, useMotionValue, useTransform, animate, useInView, useAnimate } from 'motion/react';
import { useEffect, useRef } from 'react';
import SketchLine from '@/components/ui/SketchLine';

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 1, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function About() {
  const [scope, animateControl] = useAnimate();
  const animationRef = useRef<any>(null);

  useEffect(() => {
    animationRef.current = animateControl(
      scope.current,
      { x: ["0%", "-50%"] },
      { 
        duration: 30, 
        ease: "linear", 
        repeat: Infinity 
      }
    );
    return () => animationRef.current?.stop();
  }, [animateControl, scope]);

  return (
    <section className="py-24 bg-[#121212] px-8 sm:px-12 md:px-48 border-t border-white/5">
      <div className="flex flex-col items-center mb-16">
        <div className="flex items-center gap-4 mb-8 w-full">
          <SketchLine reverse />
          <div className="px-6 py-1.5 border border-orange-500/30 rounded-full text-xs uppercase tracking-widest text-orange-500 font-bold">
            About
          </div>
          <SketchLine delay={0.4} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 items-start">
        <div className="text-center md:text-left md:col-span-1">
          <h3 className="text-2xl md:text-3xl font-medium text-white/40 mb-8">Who am I?</h3>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
            Most people pick a lane. <br />
            <span className="text-white/40">I chose to build the bridge.</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg mb-6 leading-relaxed">
            I work with a simple belief that the best digital work happens when design and development speak the same language from day one.
          </p>
          <p className="text-white/60 text-base md:text-lg mb-6 leading-relaxed">
            No handoff friction. No "that's not my scope." Just one person who takes your idea from concept to shipped beautifully.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 mb-20">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <Counter value={5} suffix="+" />
              </div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-white/40 font-bold">Years of craft</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <Counter value={100} suffix="+" />
              </div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-white/40 font-bold">Projects delivered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <Counter value={100} suffix="%" />
              </div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-white/40 font-bold">Client satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* My Clients Section */}
      <div className="mt-20 md:mt-32">
        <div className="flex flex-col items-center mb-10 md:mb-16">
          <div className="flex items-center gap-4 mb-8 w-full">
            <SketchLine reverse />
            <div className="px-6 py-1.5 border border-orange-500/30 rounded-full text-xs uppercase tracking-widest text-orange-500 font-bold">
              Clients
            </div>
            <SketchLine delay={0.4} />
          </div>
        </div>

        <div 
          className="overflow-hidden relative"
          onMouseEnter={() => animationRef.current?.pause()}
          onMouseLeave={() => animationRef.current?.play()}
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#121212] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#121212] to-transparent z-10" />
          
          <motion.div 
            ref={scope}
            className="flex items-center w-max"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-8 md:gap-16 items-center pr-8 md:pr-16 bg-transparent">
                {[
                  { name: "Asahi Group", url: "asahi.svg" },
                  { name: "SATS", url: "sats.svg" },
                  { name: "Changi Airport", url: "changi.svg" },
                  { name: "Pocari Sweat", url: "pocari.svg" },
                  { name: "Wuling Indonesia", url: "wuling.svg" },
                  { name: "Rocketindo", url: "rocketindo.svg" },
                  { name: "Mantappu Corp", url: "mantappu.svg" },
                  { name: "Mantappu Academy", url: "mantappu-academy.svg" },
                  { name: "The Hongkong Jockey Club", url: "hkjc.svg" },
                  { name: "HenShu Motion", url: "henshu.svg" }
                ].map((client, idx) => (
                  <div key={idx} className="flex items-center gap-3 md:gap-4 group cursor-default flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 aspect-square rounded-xl bg-white/5 border border-white/10 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:border-orange-500/50 group-hover:bg-orange-500/5 flex-shrink-0">
                      <img 
                        src={`/assets/clients/${client.url}`} 
                        alt={client.name} 
                        className="w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-opacity"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <span className="text-base md:text-xl font-medium text-white/20 group-hover:text-white transition-colors tracking-tight whitespace-nowrap">
                      {client.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

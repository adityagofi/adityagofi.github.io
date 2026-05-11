import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  TrendingUp,
  Target,
  Zap,
  Users,
  ArrowUpRight,
  Instagram,
  Facebook,
  Activity,
  DollarSign,
  PieChart,
  MousePointer2
} from 'lucide-react';
import { heroEnter } from '@/lib/animations';
import VideoModal from '@/components/ui/VideoModal';
import StopMotionIcon, { STOP_MOTION_PATHS } from '@/components/ui/StopMotionIcon';
import SketchDecorations from '@/components/ui/SketchDecorations';

const ADS_STATS = [
  { label: "Total Students Reached", value: "2M+", icon: <Users size={20} /> },
  { label: "Campaign ROAS", value: "5.2x", icon: <TrendingUp size={20} /> },
  { label: "Cost Per Lead", value: "Rp 1.2k", icon: <DollarSign size={20} /> },
  { label: "Total Conversions", value: "45k+", icon: <Target size={20} /> },
];

const ADS_PROJECTS = [
  {
    id: 1,
    title: "Mantappu Academy SNBT Campaign",
    category: "Education Tech",
    featuredOverline: "Featured Campaign",
    headline: ["Mantappu", "Academy", "SNBT 2024"], // last entry rendered as the orange accent
    description: "For the SNBT prep season, we developed a high-impact creative framework focused on the \"Education journey.\" By combining student-first messaging with aggressive mid-funnel retargeting, we achieved a significant breakthrough in enrollment rates.",
    tags: ["Education", "Video Ads", "Conversion Focus"],
    image: "/meta/project-1.webp",
    videoThumb: "/meta/project-1.webp",
    videoId: "8lECBDOp-Jc?si=BIgUjfyLIBxaK3ma",
    overline: "Scale Campaign",
    cta: "Watch the Ad Content",
    badge: { label: "Enrollment Boost", value: "+340%" },
    stats: { roas: "5.2x", cpl: "Rp 1.2k", conversions: "45,000+" }
  }
];

const bannerImages = [
  "/meta/banner-1.webp",
  "/meta/banner-2.webp",
  "/meta/banner-3.webp",
  "/meta/banner-4.webp",
];

export default function MetaAdsProject() {
  const [selection, setSelection] = useState<{ videos: string[]; index: number } | null>(null);
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
              Meta <span className="text-orange-500">Ads</span>
            </h1>
            <p className="text-white/60 text-[10px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase">
              Performance-Driven Creative for Explosive Growth
            </p>
          </motion.div>

        </div>

        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 md:gap-12 text-white/60 uppercase text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.3em] font-bold">
          <div className="flex items-center gap-2"><Target size={14} /> Performance First</div>
          <div className="flex items-center gap-2 md:flex hidden"><TrendingUp size={14} /> High ROAS</div>
          <div className="flex items-center gap-2"><Zap size={14} /> Rapid Scale</div>
        </div>
      </section>

      {/* Intro Stats */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-y border-white/5 bg-white/[0.02]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {ADS_STATS.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center text-orange-500 mb-4">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-black mb-1">{stat.value}</div>
              <div className="text-[10px] uppercase text-white/40 font-bold tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Project - Mantappu Academy */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px]">{ADS_PROJECTS[0].featuredOverline}</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4 mb-8 leading-none">
                {ADS_PROJECTS[0].headline.map((line, i) => {
                  const isAccent = i === ADS_PROJECTS[0].headline.length - 1;
                  return (
                    <span key={i}>
                      {isAccent ? <span className="text-orange-500">{line}</span> : line}
                      {i < ADS_PROJECTS[0].headline.length - 1 && <br/>}
                    </span>
                  );
                })}
              </h2>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light mb-12">
                {ADS_PROJECTS[0].description}
              </p>

              <div className="grid grid-cols-3 gap-8">
                {Object.entries(ADS_PROJECTS[0].stats).map(([label, value]) => (
                  <div key={label} className="p-6 bg-white/5 rounded-3xl border border-white/10">
                    <div className="text-[10px] uppercase text-white/30 tracking-widest font-bold mb-2">{label}</div>
                    <div className="text-2xl font-black text-orange-500 tracking-tighter">{value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group pt-10"
            >
              <div className="absolute inset-0 bg-orange-500/10 blur-[100px] rounded-full" />
              
              {/* Ad Video Preview */}
              <div className="relative aspect-[9/16] max-w-[320px] mx-auto rounded-[1.5rem] overflow-hidden shadow-2xl bg-black group/video">
                <div className="absolute inset-0 z-10">
                  <img
                    src={ADS_PROJECTS[0].videoThumb}
                    className="w-full h-full object-cover group-hover/video:scale-105 transition-all duration-700"
                    alt={ADS_PROJECTS[0].title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <button
                    onClick={() => setSelection({ videos: [ADS_PROJECTS[0].videoId], index: 0 })}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group/btn"
                  >
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-[2px] border border-white/50 flex items-center justify-center transition-all duration-500 shadow-xl relative z-20 group-hover/btn:bg-orange-500 group-hover/btn:border-orange-500"
                    >
                      <StopMotionIcon
                        paths={STOP_MOTION_PATHS.play}
                        size={42}
                        strokeWidth={3}
                        drawDuration={0}
                        staggerDelay={0}
                        wobble
                      />
                    </motion.div>
                  </button>

                  <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                    <div className="text-[10px] uppercase font-bold text-orange-500 mb-2 tracking-[0.2em]">{ADS_PROJECTS[0].overline}</div>
                    <div className="text-xl font-black uppercase tracking-tight">{ADS_PROJECTS[0].cta}</div>
                  </div>
                </div>

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Success Badges */}
              <div className="absolute top-0 right-0 md:-right-10 p-6 bg-white rounded-3xl text-black shadow-2xl scale-75 md:scale-100">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="text-orange-500" size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{ADS_PROJECTS[0].badge.label}</span>
                </div>
                <div className="text-2xl font-black">{ADS_PROJECTS[0].badge.value}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-40 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">The Ads<br/>Framework</h2>
              <p className="text-white/40 text-sm md:text-base leading-relaxed font-bold uppercase tracking-widest mb-12">
                A structured approach to profitable scaling.
              </p>
              
              <div className="space-y-12">
                {[
                  { icon: <Target className="text-orange-500" />, title: "Creative Sprints", desc: "Developing 5-10 hook variations weekly to find winners." },
                  { icon: <Activity className="text-orange-500" />, title: "Full Funnel Tracking", desc: "Implementing CAPI and advanced tracking to battle attribution loss." },
                  { icon: <PieChart className="text-orange-500" />, title: "Budget Scaling", desc: "Horizontal and vertical scaling strategies to grow spend without breaking ROAS." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold uppercase tracking-tight mb-2">{item.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-orange-500/10 blur-3xl rounded-full" />
              <div className="relative p-10 bg-black border border-white/10 rounded-[3rem]">
                <div className="flex justify-between items-center mb-10">
                  <h5 className="font-bold uppercase tracking-widest text-[10px]">Campaign Health</h5>
                  <div className="flex items-center gap-1.5 text-orange-500">
                    <Activity size={14} />
                    <span className="font-mono text-xs">LIVE_METRICS</span>
                  </div>
                </div>

                <div className="space-y-8">
                  {[
                    { label: "CTR (Link Click)", value: "2.45%", progress: 75 },
                    { label: "Conversion Rate", value: "3.8%", progress: 60 },
                    { label: "Add to Cart Cost", value: "$4.12", progress: 85 }
                  ].map((metric, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-white/40">{metric.label}</span>
                        <span className="text-xs font-black">{metric.value}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${metric.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-orange-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                  <div className="text-[10px] uppercase text-white/40 font-bold tracking-widest mb-1">Estimated ROAS Uplift</div>
                  <div className="text-4xl font-black text-white">+180%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <VideoModal
        videos={selection?.videos ?? null}
        index={selection?.index ?? 0}
        onIndexChange={(i) => setSelection((prev) => (prev ? { ...prev, index: i } : prev))}
        onClose={() => setSelection(null)}
        aspect="portrait"
      />
    </div>
  );
}

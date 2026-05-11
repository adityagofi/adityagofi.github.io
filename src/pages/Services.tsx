import { motion } from 'motion/react';
import { heroEnterDelay, cardIn } from '@/lib/animations';
import StopMotionIcon, { STOP_MOTION_PATHS } from '@/components/ui/StopMotionIcon';

const SketchIcon = ({ paths }: { paths: string[] }) => (
  <StopMotionIcon
    paths={paths}
    size={32}
    strokeWidth={3}
    staggerDelay={0}
    wobble={true}
    className="text-orange-500"
  />
);

const SERVICES_DATA = [
  {
    paths: STOP_MOTION_PATHS.palette,
    title: "Graphic Design",
    desc: "Visual identities and brand guidelines that resonate across all digital and print platforms.",
    features: ["Brand Identity", "UI/UX Design", "Print Assets"]
  },
  {
    paths: STOP_MOTION_PATHS.video,
    title: "Video Production",
    desc: "Professional end-to-end production for short and long-form video content.",
    features: ["Cinematography", "Post-production", "Color Grading"]
  },
  {
    paths: STOP_MOTION_PATHS.bolt,
    title: "Motion Graphics",
    desc: "Custom animations and visual effects that bring your digital presence to life.",
    features: ["2D/3D Animation", "Social Media Assets", "Micro-interactions"]
  },
  {
    paths: STOP_MOTION_PATHS.code,
    title: "Web Development",
    desc: "High-performance digital experiences built with modern frameworks and SEO focus.",
    features: ["React / Next.js", "E-commerce", "Performance"]
  },
  {
    paths: STOP_MOTION_PATHS.megaphone,
    title: "Digital Marketing",
    desc: "Strategic campaigns that convert interest into measurable business growth.",
    features: ["Ads Management", "Content Strategy", "PPC"]
  },
  {
    paths: STOP_MOTION_PATHS.barChart,
    title: "Market Research",
    desc: "Data-driven insights to understand your audience and competitive landscape.",
    features: ["Competitor Analysis", "User Interviews", "Trend Scouting"]
  },
  {
    paths: STOP_MOTION_PATHS.database,
    title: "Data Analysis",
    desc: "Turning complex data into clear, actionable business intelligence and dashboards.",
    features: ["Stat Modeling", "Custom Reporting", "ETL Pipelines"]
  },
  {
    paths: STOP_MOTION_PATHS.camera,
    title: "Photography",
    desc: "Professional commercial and product photography aligned with your brand aesthetic.",
    features: ["Product Shoots", "Lifestyle", "Retouching"]
  }
];

export default function Services() {
  return (
    <section id="services-page" className="pt-40 pb-24 bg-[#121212] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-18">
        <header className="mb-16">
          <motion.div
            {...heroEnterDelay(0)}
            className="flex items-center gap-4 mb-8"
          >
            <div className="px-4 py-1.5 border border-orange-500/30 rounded-full text-[10px] uppercase tracking-[0.2em] text-orange-500 font-bold">
              Expertise
            </div>
          </motion.div>
          <motion.h1
            {...heroEnterDelay(0.15)}
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1]"
          >
            Creative Solutions. <br />
            Technical Excellence.
          </motion.h1>
          <motion.p
            {...heroEnterDelay(0.3)}
            className="text-white/60 text-lg max-w-xl leading-relaxed"
          >
            Bridging imagination and implementation with a unified digital workflow.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.title}
              {...cardIn(index * 0.08)}
              className="p-8 rounded-[2rem] bg-zinc-900 border border-white/5 hover:border-orange-500/30 transition-all duration-500 group"
            >
              <div className="mb-6 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-500/10 transition-all duration-500">
                <SketchIcon paths={service.paths} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors">
                {service.title}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed mb-6">
                {service.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.features.map(feature => (
                  <div key={feature} className="px-2 py-1 bg-white/5 rounded-md text-[10px] text-white/30 whitespace-nowrap">
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import ScribblePlay from '@/components/ui/ScribblePlay';
import ProjectHero from '@/components/ui/ProjectHero';
import EvidenceTabs, { type EvidenceItem } from '@/components/ui/EvidenceTabs';
import VideoModal from '@/components/ui/VideoModal';
import {
ArrowUpRight,
ChartColumn,
Database,
FileSpreadsheet,
LayoutDashboard,
Megaphone,
MousePointerClick,
Repeat,
ShoppingBag,
SlidersHorizontal,
Target,
TrendingUp,
Workflow
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

// What I own end to end on a Meta account — not just the campaign setup.
const CAPABILITIES = [
  { icon: <SlidersHorizontal size={18} />, title: "Set up & optimise", desc: "Full-funnel structure in Ads Manager, from audiences and budgets to creative testing." },
  { icon: <ChartColumn size={18} />, title: "Analyse", desc: "Looker Studio dashboards per objective, filterable by ad set and date." },
  { icon: <Workflow size={18} />, title: "Automate", desc: "Apps Script pulls Meta data into Google Sheets daily. No manual exports." }
];

// Page by Page — figures taken from Ads Manager and Looker Studio (19 Sep – 19 Oct 2026).
const PBP_TOTALS = [
  { label: "Ad spend managed", value: "Rp6.8M" },
  { label: "Impressions", value: "4.78M" },
  { label: "Landing page views", value: "11,050" },
  { label: "Reached in Jabodetabek", value: "1.14M" }
];

const PBP_FUNNEL = [
  {
    icon: <Megaphone size={16} />,
    stage: "Awareness",
    result: "1.14M",
    resultLabel: "people reached",
    detail: "Tomorrow pre-launch in Jabodetabek at Rp2,129 per 1,000 people reached."
  },
  {
    icon: <MousePointerClick size={16} />,
    stage: "Traffic",
    result: "Rp243",
    resultLabel: "per landing page view",
    detail: "Always-on traffic: 11,050 real page loads across five product creatives."
  },
  {
    icon: <ShoppingBag size={16} />,
    stage: "Sales",
    result: "1.8x",
    resultLabel: "ROAS on retargeting",
    detail: "Rp3.13M purchase value from Rp1.74M spend, with 59 checkouts started."
  }
];

const PBP_CREATIVES = [
  { title: "Morning Chill Club", format: "Static", note: "5,621 LPV at Rp144", thumb: "/meta/pagebypage-creative-morning-chill-club.webp", best: true },
  { title: "Personalization", format: "Short video", note: "2,533 LPV at Rp327", thumb: "/meta/pagebypage-creative-personalization.webp", videoId: "--N0bJMh0sw" },
  { title: "Jesty", format: "Short video", note: "4 purchases, 1.9x ROAS", thumb: "/meta/pagebypage-creative-jesty.webp", videoId: "93GW6KFbyGc" }
];
const PBP_VIDEO_IDS = PBP_CREATIVES.flatMap((creative) => (creative.videoId ? [creative.videoId] : []));

// Insight read straight from the traffic dashboard.
const PBP_TRAFFIC = [
  { name: "Morning Chill Club", lpv: "5,621", cpr: "Rp144", status: "Best result", best: true },
  { name: "Personalization", lpv: "2,533", cpr: "Rp327", status: "Running" },
  { name: "Nonchalant", lpv: "2,938", cpr: "Rp338", status: "Running" },
  { name: "Volume On", lpv: "69", cpr: "Rp486", status: "Paused" },
  { name: "Naked Spice", lpv: "121", cpr: "Rp534", status: "Paused" }
];

const PIPELINE = [
  { icon: <Megaphone size={16} />, title: "Meta Ads", desc: "Ad-level results, demographics and CPAS." },
  { icon: <Workflow size={16} />, title: "Apps Script", desc: "Scheduled pull, no copy and paste." },
  { icon: <FileSpreadsheet size={16} />, title: "Google Sheets", desc: "One tab per dataset and funnel." },
  { icon: <LayoutDashboard size={16} />, title: "Looker Studio", desc: "A dashboard per objective." }
];

const EVIDENCE: EvidenceItem[] = [
  { label: "Traffic dashboard", src: "/meta/pagebypage-looker-traffic-dashboard.webp", width: 1007, height: 655, alt: "Looker Studio traffic dashboard with landing page views and cost per landing page view per creative", caption: "Looker Studio: landing page views and cost per result for each creative." },
  { label: "Sales dashboard", src: "/meta/pagebypage-looker-sales-dashboard.webp", width: 1007, height: 641, alt: "Looker Studio sales dashboard with spend, purchases, purchase value and ROAS per creative", caption: "Looker Studio: spend through to ROAS for each sales creative." },
  { label: "Google Sheets", src: "/meta/pagebypage-sheets-apps-script.webp", width: 1600, height: 821, alt: "Google Sheets filled daily by Apps Script with Meta ad-level data, demographics, funnel and CPAS tabs; IDs blurred", caption: "Filled daily by Apps Script: ad-level data, demographics, funnels and CPAS. IDs blurred." },
  { label: "Ads Manager", src: "/meta/pagebypage-ads-manager-campaigns.webp", width: 1600, height: 464, alt: "Meta Ads Manager showing the Page by Page sales, traffic and awareness campaigns", caption: "All three campaigns in Ads Manager, last 30 days." }
];

const MANTAPPU = {
  title: "Mantappu Academy SNBT Campaign",
  description: "For the SNBT prep season, I developed a creative framework built around the student's education journey. Student-first messaging combined with mid-funnel retargeting led to a clear jump in enrollments.",
  thumb: "/meta/mantappu-masterclass-ad.webp",
  videoId: "8lECBDOp-Jc?si=BIgUjfyLIBxaK3ma",
  badge: { label: "Enrollment Boost", value: "+340%" },
  stats: [
    { label: "Students reached", value: "2M+" },
    { label: "ROAS", value: "5.2x" },
    { label: "Cost per lead", value: "Rp1.2k" },
    { label: "Conversions", value: "45k+" }
  ]
};

const FRAMEWORK = [
  { icon: <Target size={18} />, title: "Funnel-first structure", desc: "Separate campaigns for awareness, traffic and sales, each optimised for its own result." },
  { icon: <Repeat size={18} />, title: "Creative iteration", desc: "Several hooks and formats per product. Winners get budget, weak ads get paused early." },
  { icon: <Database size={18} />, title: "Automated reporting", desc: "Daily data in Sheets and Looker Studio, so decisions are based on numbers." },
  { icon: <TrendingUp size={18} />, title: "Budget scaling", desc: "Scale what is proven, retarget warm visitors, and protect ROAS as spend grows." }
];

const WEEKLY_LOOP = [
  "Read the dashboards by objective and creative",
  "Pause ads above target cost per result",
  "Move budget to the winning creative",
  "Brief new hooks based on what worked",
  "Share a clear summary with the client"
];

const eyebrow = "text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]";
const card = "rounded-2xl bg-white/5 border border-white/10";

export default function MetaAdsProject() {
  const [selection, setSelection] = useState<{ videos: string[]; index: number } | null>(null);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-orange-500 relative overflow-hidden">
      <ProjectHero view="meta-ads" sections={[
        { id: "page-by-page", label: "Page by Page" },
        { id: "reporting-system", label: "Reporting" },
        { id: "featured-campaign", label: "Mantappu" },
        { id: "ads-framework", label: "Process" }
      ]} />

      {/* Overview: setup, analysis, automation */}
      <section id="campaign-overview" className="py-12 md:py-16 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 items-center">
          <div data-reveal>
            <span className={eyebrow}>More than campaign setup</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mt-3 leading-tight">I run the ads, read the data, and automate the reporting.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CAPABILITIES.map((item) => (
              <div key={item.title} data-reveal className={`p-5 ${card}`}>
                <div className="flex items-center gap-2 text-orange-500 mb-2">{item.icon}<h3 className="font-bold text-white">{item.title}</h3></div>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study: Page by Page */}
      <section id="page-by-page" className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end mb-10">
            <div data-reveal>
              <span className={eyebrow}>Case study · Fragrance e-commerce</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-3 mb-5 leading-none">Page by <span className="text-orange-500">Page</span></h2>
              <p className="text-white/60 leading-relaxed">A full-funnel Meta setup for a local perfume brand: warming up Jabodetabek before a launch, sending qualified traffic to the website every day, and retargeting visitors who are ready to buy. All of it tracked in an automated reporting system.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PBP_TOTALS.map((stat) => (
                <div key={stat.label} data-reveal className={`p-4 md:p-5 ${card}`}>
                  <div className="text-2xl md:text-3xl font-black tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] uppercase text-white/40 font-bold tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {PBP_FUNNEL.map((step, i) => (
              <div key={step.stage} data-reveal className={`p-5 ${card}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-2 text-orange-500 text-xs font-bold uppercase tracking-widest">{step.icon}{step.stage}</span>
                  <span className="text-white/20 font-black text-xs">0{i + 1}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-black tracking-tighter">{step.result}</span>
                  <span className="text-xs text-white/40">{step.resultLabel}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-start">
            <div>
              <h3 data-reveal className="text-xl md:text-2xl font-black tracking-tight mb-4">Creatives I made for the campaign</h3>
              <div className="flex sm:grid sm:grid-cols-3 gap-3 overflow-x-auto sm:overflow-visible snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0 pb-2 sm:pb-0">
                {PBP_CREATIVES.map((creative) => {
                  const content = (
                    <>
                      <img loading="lazy" decoding="async" src={creative.thumb} alt={`${creative.title} ad creative for Page by Page`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                      {creative.videoId && (
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-[2px] border border-white/50 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-colors">
                          <ScribblePlay size={28} />
                        </span>
                      )}
                      {creative.best && <span className="absolute top-2 left-2 px-2 py-1 rounded-full bg-orange-500 text-black text-[9px] font-black uppercase tracking-wider">Top</span>}
                      <span className="absolute bottom-0 left-0 right-0 p-3 text-left">
                        <span className="block text-[9px] uppercase tracking-widest text-orange-500 font-bold">{creative.format}</span>
                        <span className="block text-sm font-bold leading-tight">{creative.title}</span>
                        <span className="block text-[11px] text-white/60 mt-0.5 leading-snug">{creative.note}</span>
                      </span>
                    </>
                  );
                  const cls = "group relative block w-[46%] shrink-0 snap-start sm:w-auto aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-black";
                  return creative.videoId ? (
                    <button key={creative.title} data-reveal type="button" aria-label={`Play ${creative.title} ad`} className={`${cls} cursor-pointer hover:border-orange-500/60`}
                      onClick={() => setSelection({ videos: PBP_VIDEO_IDS, index: PBP_VIDEO_IDS.indexOf(creative.videoId!) })}>
                      {content}
                    </button>
                  ) : (
                    <div key={creative.title} data-reveal className={cls}>{content}</div>
                  );
                })}
              </div>
            </div>

            <div data-reveal>
              <span className={eyebrow}>Insight from the data</span>
              <h3 className="text-xl md:text-2xl font-black tracking-tight mt-3 mb-3">One creative brought in half the traffic at less than half the cost.</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">Six days in, the two weakest ads were paused so the budget could go to the creatives that were working.</p>
              <div className="rounded-2xl border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <caption className="sr-only">Landing page views and cost per landing page view by creative</caption>
                  <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/40">
                    <tr>
                      <th scope="col" className="text-left font-bold px-3 sm:px-4 py-3">Creative</th>
                      <th scope="col" className="text-right font-bold px-2 py-3">LPV</th>
                      <th scope="col" className="text-right font-bold px-2 py-3">Cost / LPV</th>
                      <th scope="col" className="text-right font-bold px-3 sm:px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PBP_TRAFFIC.map((row) => (
                      <tr key={row.name} className={`border-t border-white/5 ${row.best ? 'bg-orange-500/10' : ''}`}>
                        <th scope="row" className={`text-left font-bold px-3 sm:px-4 py-2.5 ${row.best ? 'text-orange-500' : ''}`}>{row.name}</th>
                        <td className="text-right px-2 py-2.5 tabular-nums">{row.lpv}</td>
                        <td className="text-right px-2 py-2.5 tabular-nums">{row.cpr}</td>
                        <td className="text-right px-3 sm:px-4 py-2.5 text-white/50 text-xs">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting system: Apps Script -> Sheets -> Looker Studio */}
      <section id="reporting-system" className="py-16 md:py-20 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 items-end mb-8">
            <div data-reveal>
              <span className={eyebrow}>Automated reporting</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mt-3 mb-4 leading-none">From Ads Manager to dashboard, with no manual export.</h2>
              <p className="text-white/60 leading-relaxed">Apps Script collects the data, Google Sheets stores it, and Looker Studio turns it into dashboards anyone on the team can read.</p>
            </div>
            <ol className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {PIPELINE.map((step, i) => (
                <li key={step.title} data-reveal className="p-4 rounded-2xl bg-black border border-white/10">
                  <div className="flex items-center justify-between mb-3 text-orange-500">{step.icon}<span className="text-white/20 font-black text-xs">0{i + 1}</span></div>
                  <h3 className="font-bold text-sm mb-1">{step.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <EvidenceTabs items={EVIDENCE} label="Campaign evidence" />
        </div>
      </section>

      {/* Featured campaign: Mantappu Academy */}
      <section id="featured-campaign" className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <motion.div data-reveal>
            <span className={eyebrow}>Case study · Education</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-3 mb-5 leading-none">Mantappu Academy <span className="text-orange-500">SNBT 2024</span></h2>
            <p className="text-white/60 leading-relaxed mb-6">{MANTAPPU.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MANTAPPU.stats.map((stat) => (
                <div key={stat.label} className={`p-4 ${card}`}>
                  <div className="text-[10px] uppercase text-white/30 tracking-widest font-bold mb-1">{stat.label}</div>
                  <div className="text-2xl font-black text-orange-500 tracking-tighter">{stat.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div data-reveal className="relative pt-6">
            <div className="absolute inset-0 bg-orange-500/10 blur-[100px] rounded-full" />
            <div className="relative aspect-[9/16] max-w-[260px] mx-auto rounded-[1.5rem] overflow-hidden shadow-2xl bg-black group/video">
              <img loading="lazy" decoding="async" src={MANTAPPU.thumb} className="absolute inset-0 w-full h-full object-cover group-hover/video:scale-105 transition-all duration-700" alt={MANTAPPU.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <button aria-label="Play Mantappu Academy ad video" onClick={() => setSelection({ videos: [MANTAPPU.videoId], index: 0 })} className="absolute inset-0 flex items-center justify-center cursor-pointer group/btn">
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-[2px] border border-white/50 flex items-center justify-center transition-all duration-500 shadow-xl group-hover/btn:bg-orange-500 group-hover/btn:border-orange-500">
                  <ScribblePlay size={36} />
                </motion.div>
              </button>
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none text-lg font-black uppercase tracking-tight">Watch the ad</div>
            </div>
            <div className="absolute top-0 right-0 lg:-right-4 p-4 bg-white rounded-2xl text-black shadow-2xl">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="text-orange-500" size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">{MANTAPPU.badge.label}</span>
              </div>
              <div className="text-xl font-black">{MANTAPPU.badge.value}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section id="ads-framework" className="py-16 md:py-20 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">The Ads Framework</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FRAMEWORK.map((item) => (
                <div key={item.title} className={`p-5 ${card}`}>
                  <div className="flex items-center gap-2 text-orange-500 mb-2">{item.icon}<h3 className="font-bold text-white">{item.title}</h3></div>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8 bg-black border border-white/10 rounded-[2rem]">
            <span className={eyebrow}>Every week</span>
            <p className="text-2xl font-black tracking-tight mt-2 mb-5">The optimisation loop</p>
            <ol className="space-y-3">
              {WEEKLY_LOOP.map((step, i) => (
                <li key={step} className="flex gap-3 items-start">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-orange-500/10 text-orange-500 text-xs font-black flex items-center justify-center">{i + 1}</span>
                  <span className="text-white/70 text-sm leading-relaxed pt-1">{step}</span>
                </li>
              ))}
            </ol>
            <a href="/contact" className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-orange-500 text-black font-bold hover:bg-orange-400 transition-colors">
              Discuss your campaign <ArrowUpRight size={16} />
            </a>
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

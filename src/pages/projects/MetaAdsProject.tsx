import ScribblePlay from '@/components/ui/ScribblePlay';
import ProjectHero from '@/components/ui/ProjectHero';
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
  {
    icon: <SlidersHorizontal size={20} />,
    title: "Set up & optimise",
    desc: "Full-funnel structure in Ads Manager — awareness, traffic and sales — with naming conventions, audiences, budgets and creative testing."
  },
  {
    icon: <ChartColumn size={20} />,
    title: "Analyse",
    desc: "Looker Studio dashboards per objective, filterable by ad set and date, so every creative is judged on the metric that matters for its stage."
  },
  {
    icon: <Workflow size={20} />,
    title: "Automate",
    desc: "Google Apps Script pulls ad-level Meta data into Google Sheets every day. No manual exports, and the dashboards are always up to date."
  }
];

// Page by Page — figures taken from Ads Manager and Looker Studio (19 Sep – 19 Oct 2026).
const PBP_TOTALS = [
  { label: "Ad spend managed", value: "Rp6.8M" },
  { label: "Impressions", value: "4.78M" },
  { label: "Landing page views", value: "11,050" },
  { label: "People reached in Jabodetabek", value: "1.14M" }
];

const PBP_FUNNEL = [
  {
    icon: <Megaphone size={18} />,
    stage: "Awareness",
    campaign: "Tomorrow pre-launch · Jabodetabek",
    result: "1,137,558",
    resultLabel: "people reached",
    detail: "Rp2,129 per 1,000 people reached, building demand before launch with still and video pre-launch creatives."
  },
  {
    icon: <MousePointerClick size={18} />,
    stage: "Traffic",
    campaign: "Always-on website traffic",
    result: "Rp243",
    resultLabel: "per landing page view",
    detail: "11,050 landing page views across five product creatives, optimised for real page loads instead of cheap clicks."
  },
  {
    icon: <ShoppingBag size={18} />,
    stage: "Sales",
    campaign: "Website sales retargeting",
    result: "1.8x",
    resultLabel: "ROAS on retargeting",
    detail: "Rp3.13M purchase value from Rp1.74M spend, with 59 checkouts started from warm website visitors."
  }
];

// Insight read straight from the traffic dashboard.
const PBP_CREATIVES = [
  { name: "Morning Chill Club", lpv: "5,621", cpr: "Rp144", status: "Best result", best: true },
  { name: "Personalization", lpv: "2,533", cpr: "Rp327", status: "Running" },
  { name: "Nonchalant", lpv: "2,938", cpr: "Rp338", status: "Running" },
  { name: "Volume On", lpv: "69", cpr: "Rp486", status: "Paused" },
  { name: "Naked Spice", lpv: "121", cpr: "Rp534", status: "Paused" }
];

const PIPELINE = [
  { icon: <Megaphone size={18} />, title: "Meta Ads", desc: "Campaign, ad set and ad-level results, plus demographics and CPAS marketplace ads." },
  { icon: <Workflow size={18} />, title: "Apps Script", desc: "A scheduled script pulls the latest data into the sheet, with no copy and paste." },
  { icon: <FileSpreadsheet size={18} />, title: "Google Sheets", desc: "One tab per dataset: daily ads, demographics, a funnel per campaign, and CPAS." },
  { icon: <LayoutDashboard size={18} />, title: "Looker Studio", desc: "A dashboard per objective that the team can filter by ad set and date range." }
];

const MANTAPPU = {
  title: "Mantappu Academy SNBT Campaign",
  headline: ["Mantappu", "Academy", "SNBT 2024"], // last entry rendered as the orange accent
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
  { icon: <Target className="text-orange-500" />, title: "Funnel-first structure", desc: "Separate campaigns for awareness, traffic and sales, each optimised for its own result." },
  { icon: <Repeat className="text-orange-500" />, title: "Creative iteration", desc: "Several hooks and formats per product. Winners get budget, weak ads get paused early." },
  { icon: <Database className="text-orange-500" />, title: "Automated reporting", desc: "Daily data in Sheets and Looker Studio, so decisions are based on numbers, not guesses." },
  { icon: <TrendingUp className="text-orange-500" />, title: "Budget scaling", desc: "Scale what is proven, retarget warm visitors, and protect ROAS as spend grows." }
];

const WEEKLY_LOOP = [
  "Read the dashboards by objective and by creative",
  "Pause ads above target cost per result",
  "Move budget to the winning creative",
  "Brief new hooks based on what worked",
  "Share a clear summary with the client"
];

function Screenshot({ src, alt, caption, width, height }: { src: string; alt: string; caption: string; width: number; height: number }) {
  return (
    <figure data-reveal className="group">
      <a href={src} target="_blank" rel="noreferrer" className="block rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-orange-500/60 transition-colors">
        <img loading="lazy" decoding="async" src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
      </a>
      <figcaption className="mt-3 flex items-start justify-between gap-4 text-sm text-white/50">
        <span>{caption}</span>
        <a href={src} target="_blank" rel="noreferrer" className="shrink-0 inline-flex items-center gap-1 text-orange-500 hover:text-orange-400">
          Full size <ArrowUpRight size={14} />
        </a>
      </figcaption>
    </figure>
  );
}

export default function MetaAdsProject() {
  const [selection, setSelection] = useState<{ videos: string[]; index: number } | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500 relative overflow-hidden">
      <ProjectHero view="meta-ads" sections={[
        { id: "campaign-overview", label: "Overview" },
        { id: "page-by-page", label: "Page by Page" },
        { id: "reporting-system", label: "Reporting" },
        { id: "featured-campaign", label: "Mantappu" },
        { id: "ads-framework", label: "Process" }
      ]} />

      {/* Overview: setup, analysis, automation */}
      <section id="campaign-overview" className="py-20 md:py-28 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="max-w-3xl mb-14">
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px]">More than campaign setup</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-4 leading-none">I run the ads, read the data, and automate the reporting.</h2>
            <p className="text-white/60 text-lg leading-relaxed mt-6">Most ad managers stop at launching campaigns. I also build the data pipeline and dashboards behind them, so every budget decision is backed by up-to-date numbers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAPABILITIES.map((item) => (
              <div key={item.title} data-reveal className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study: Page by Page */}
      <section id="page-by-page" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start mb-16">
            <div data-reveal>
              <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px]">Case study · Fragrance e-commerce</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4 mb-8 leading-none">Page by <span className="text-orange-500">Page</span></h2>
              <p className="text-white/60 text-lg leading-relaxed">A full-funnel Meta setup for a local perfume brand: warming up Jabodetabek before a product launch, sending qualified traffic to the website every day, and retargeting visitors who are ready to buy. Everything is tracked in an automated reporting system.</p>
            </div>
            <div data-reveal className="max-w-sm w-full mx-auto lg:ml-auto">
              <img loading="lazy" decoding="async" src="/meta/pagebypage-creative-morning-chill-club.webp" alt="Morning Chill Club perfume ad creative for Page by Page" width="1080" height="1080" className="w-full h-auto rounded-3xl border border-white/10" />
              <p className="mt-3 text-sm text-white/50">Best-performing creative: Morning Chill Club</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            {PBP_TOTALS.map((stat) => (
              <div key={stat.label} data-reveal className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <div className="text-3xl md:text-4xl font-black tracking-tighter">{stat.value}</div>
                <div className="text-[10px] uppercase text-white/40 font-bold tracking-widest mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          <h3 data-reveal className="text-2xl md:text-3xl font-black tracking-tight mb-6">One funnel, three objectives</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {PBP_FUNNEL.map((step, i) => (
              <div key={step.stage} data-reveal className="relative p-8 rounded-3xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-2 text-orange-500 text-xs font-bold uppercase tracking-widest">{step.icon}{step.stage}</span>
                  <span className="text-white/20 font-black text-sm">0{i + 1}</span>
                </div>
                <div className="text-4xl font-black tracking-tighter">{step.result}</div>
                <div className="text-xs uppercase tracking-widest text-white/40 font-bold mt-1 mb-5">{step.resultLabel}</div>
                <p className="text-sm text-white/40 mb-2">{step.campaign}</p>
                <p className="text-white/60 text-sm leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>

          <Screenshot src="/meta/pagebypage-ads-manager-campaigns.webp" alt="Meta Ads Manager showing the Page by Page sales, traffic and awareness campaigns" caption="Ads Manager: all three campaigns, last 30 days." width={1600} height={464} />

          {/* Creative insight */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-20">
            <div data-reveal>
              <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px]">Insight from the data</span>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight mt-4 mb-6">One creative brought in half the traffic at less than half the cost.</h3>
              <p className="text-white/60 leading-relaxed mb-4">The traffic dashboard showed that Morning Chill Club delivered 5,621 landing page views at Rp144 each, while the other creatives cost Rp327–534.</p>
              <p className="text-white/60 leading-relaxed">Six days in, the two weakest ads were paused so the budget could go to the creatives that were working.</p>
            </div>
            <div data-reveal className="rounded-3xl border border-white/10 overflow-hidden">
              <table className="w-full text-sm">
                <caption className="sr-only">Landing page views and cost per landing page view by creative</caption>
                <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/40">
                  <tr>
                    <th scope="col" className="text-left font-bold px-4 sm:px-6 py-4">Creative</th>
                    <th scope="col" className="text-right font-bold px-2 sm:px-4 py-4">LPV</th>
                    <th scope="col" className="text-right font-bold px-2 sm:px-4 py-4">Cost / LPV</th>
                    <th scope="col" className="text-right font-bold px-4 sm:px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {PBP_CREATIVES.map((row) => (
                    <tr key={row.name} className={`border-t border-white/5 ${row.best ? 'bg-orange-500/10' : ''}`}>
                      <th scope="row" className={`text-left font-bold px-4 sm:px-6 py-4 ${row.best ? 'text-orange-500' : ''}`}>{row.name}</th>
                      <td className="text-right px-2 sm:px-4 py-4 tabular-nums">{row.lpv}</td>
                      <td className="text-right px-2 sm:px-4 py-4 tabular-nums">{row.cpr}</td>
                      <td className="text-right px-4 sm:px-6 py-4 text-white/50 text-xs">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting system: Apps Script -> Sheets -> Looker Studio */}
      <section id="reporting-system" className="py-24 md:py-32 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="max-w-3xl mb-14">
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px]">Automated reporting</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-4 leading-none">From Ads Manager to dashboard, with no manual export.</h2>
            <p className="text-white/60 text-lg leading-relaxed mt-6">I built a reporting pipeline so the team always sees fresh numbers. Apps Script collects the data, Google Sheets stores it, and Looker Studio turns it into dashboards anyone can read.</p>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {PIPELINE.map((step, i) => (
              <li key={step.title} data-reveal className="relative p-6 rounded-3xl bg-black border border-white/10">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">{step.icon}</div>
                  <span className="text-white/20 font-black text-sm">0{i + 1}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Screenshot src="/meta/pagebypage-looker-sales-dashboard.webp" alt="Looker Studio sales dashboard with spend, purchases, purchase value and ROAS per creative" caption="Looker Studio, sales: spend through to ROAS for each creative." width={1007} height={641} />
            <Screenshot src="/meta/pagebypage-looker-traffic-dashboard.webp" alt="Looker Studio traffic dashboard with landing page views and cost per landing page view per creative" caption="Looker Studio, traffic: landing page views and cost per result for each creative." width={1015} height={655} />
          </div>
          <Screenshot src="/meta/pagebypage-sheets-apps-script.webp" alt="Google Sheets filled daily by Apps Script with Meta ad-level data, demographics, funnel and CPAS tabs" caption="Google Sheets, filled daily by Apps Script: ad-level data, demographics, funnels and CPAS." width={1600} height={821} />
        </div>
      </section>

      {/* Featured campaign: Mantappu Academy */}
      <section id="featured-campaign" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div data-reveal>
              <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px]">Case study · Education</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4 mb-8 leading-none">
                {MANTAPPU.headline.map((line, i) => {
                  const isAccent = i === MANTAPPU.headline.length - 1;
                  return (
                    <span key={i}>
                      {isAccent ? <span className="text-orange-500">{line}</span> : line}
                      {i < MANTAPPU.headline.length - 1 && <br/>}
                    </span>
                  );
                })}
              </h2>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light mb-12">{MANTAPPU.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {MANTAPPU.stats.map((stat) => (
                  <div key={stat.label} className="p-5 bg-white/5 rounded-3xl border border-white/10">
                    <div className="text-[10px] uppercase text-white/30 tracking-widest font-bold mb-2">{stat.label}</div>
                    <div className="text-2xl font-black text-orange-500 tracking-tighter">{stat.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div data-reveal className="relative group pt-10">
              <div className="absolute inset-0 bg-orange-500/10 blur-[100px] rounded-full" />
              <div className="relative aspect-[9/16] max-w-[320px] mx-auto rounded-[1.5rem] overflow-hidden shadow-2xl bg-black group/video">
                <div className="absolute inset-0 z-10">
                  <img loading="lazy" decoding="async" src={MANTAPPU.thumb}
                    className="w-full h-full object-cover group-hover/video:scale-105 transition-all duration-700"
                    alt={MANTAPPU.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <button
                    aria-label="Play Mantappu Academy ad video"
                    onClick={() => setSelection({ videos: [MANTAPPU.videoId], index: 0 })}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group/btn"
                  >
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-[2px] border border-white/50 flex items-center justify-center transition-all duration-500 shadow-xl relative z-20 group-hover/btn:bg-orange-500 group-hover/btn:border-orange-500"
                    >
                      <ScribblePlay size={42} />
                    </motion.div>
                  </button>
                  <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                    <div className="text-[10px] uppercase font-bold text-orange-500 mb-2 tracking-[0.2em]">Scale campaign</div>
                    <div className="text-xl font-black uppercase tracking-tight">Watch the ad</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-0 right-0 md:-right-10 p-6 bg-white rounded-3xl text-black shadow-2xl scale-75 md:scale-100">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="text-orange-500" size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{MANTAPPU.badge.label}</span>
                </div>
                <div className="text-2xl font-black">{MANTAPPU.badge.value}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="ads-framework" className="py-24 md:py-40 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">The Ads<br/>Framework</h2>
              <p className="text-white/40 text-sm md:text-base leading-relaxed font-bold uppercase tracking-widest mb-12">A structured approach to profitable scaling.</p>
              <div className="space-y-10">
                {FRAMEWORK.map((item) => (
                  <div key={item.title} className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-tight mb-2">{item.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-orange-500/10 blur-3xl rounded-full" />
              <div className="relative p-8 md:p-10 bg-black border border-white/10 rounded-[2rem] md:rounded-[3rem]">
                <h3 className="font-bold uppercase tracking-widest text-[10px] text-orange-500 mb-2">Every week</h3>
                <p className="text-2xl md:text-3xl font-black tracking-tight mb-8">The optimisation loop</p>
                <ol className="space-y-5">
                  {WEEKLY_LOOP.map((step, i) => (
                    <li key={step} className="flex gap-4 items-start">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 text-xs font-black flex items-center justify-center">{i + 1}</span>
                      <span className="text-white/70 leading-relaxed pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
                <a href="/contact" className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-black font-bold hover:bg-orange-400 transition-colors">
                  Discuss your campaign <ArrowUpRight size={16} />
                </a>
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

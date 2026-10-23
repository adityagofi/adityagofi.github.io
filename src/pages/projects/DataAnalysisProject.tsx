import EvidenceTabs, { type EvidenceItem } from '@/components/ui/EvidenceTabs';
import ProjectHero from '@/components/ui/ProjectHero';
import StopMotionIcon, { STOP_MOTION_PATHS } from '@/components/ui/StopMotionIcon';
import { ArrowUpRight, ChartColumn, Database, FileSpreadsheet, LayoutDashboard, LineChart, Search, Target, Workflow } from 'lucide-react';
import { motion } from 'motion/react';

const DATA_PROJECTS = [
  {
    id: 4,
    title: "Indonesia's Election Sentiment Analysis",
    category: "NLP & Deep Learning",
    description: "A natural language processing project analyzing public sentiment around Indonesia's election across social media. Built with TensorFlow and trained on Indonesian-language data to classify opinions as positive, negative, or neutral.",
    tags: ["Python", "NLP", "TensorFlow", "Web Scraping"],
    image: "/data/project-4.webp",
    link: "https://medium.com/@adityagofi/2024-indonesia-public-election-twitter-sentiment-analysis-using-nlp-623745e5ad76",
    stats: { accuracy: "0.87", samples: "20k+" }
  },
  {
    id: 5,
    title: "Fine-Tuning a Llama 3 Medical Chatbot",
    category: "LLM Fine-Tuning",
    description: "Fine-tuned the Llama 3 model on curated medical Q&A datasets to build a domain-specialized chatbot. Focused on accurate, context-aware responses for health-related queries while preserving safety guardrails.",
    tags: ["Python", "Llama 3", "LoRA", "PyTorch"],
    image: "/data/project-5.webp",
    link: "https://medium.com/@adityagofi/medical-diagnosis-chatbot-assistant-71fb0d33dce8",
    stats: { base_model: "Llama 3 8B", domain: "Medical" }
  },
  {
    id: 1,
    title: "House Sales Tableau Dashboard",
    category: "Real Estate Analytics",
    description: "The House Sales Dashboard that I created using Tableau Public, focuses on daily prices, geographical trends, and key property features in the USA real estate market.",
    tags: ["Tableau", "Excel"],
    image: "/data/project-1.webp",
    link: "https://public.tableau.com/views/HouseSalesDashboard_17069871307200/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link",
    stats: { depth: "2 Years", data: "MySkill Academy" }
  },
  {
    id: 2,
    title: "Bank Customer Churn Prediction",
    category: "Predictive Analytics",
    description: "This project predicts customer churn in the banking sector using machine learning. Using 3 models Logistic Regression, Random Forest, and XGBoost. The XGBoost model achieved the highest accuracy at 85.05%",
    tags: ["Python", "Logistic Regression", "XGBoost", "Random Forest", ],
    image: "/data/project-2.webp",
    link: "https://github.com/adityagofi/Customer-Churn-Prediction",
    stats: { xgboost: "0.85", data_points: "10k+" }
  },
  {
    id: 3,
    title: "House Price Prediction (XGBoost)",
    category: "Machine Learning",
    description: "I developed this project with the aim of harnessing the predictive power of the XGBoost model to assist in the real estate domain. the model enabled us to predict house prices with an R² score of 0.82",
    tags: ["Python", "XGBoost", "Feature Engineering"],
    image: "/data/project-3.webp",
    link: "https://medium.com/@adityagofi/predicting-house-prices-with-xgboost-a-machine-learning-journey-b8ed827cd05f",
    stats: { r2_score: "0.82", features: "28" }
  }
];


// Page by Page website analytics, GA4 range 21 Sep – 18 Oct 2026. Only active users, total LPV and ROAS are shown; other figures stay confidential.
const GA4_KPIS = [
  { label: "Active users", value: "18.4k" },
  { label: "Total landing page views", value: "11,282" },
  { label: "Retargeting ROAS", value: "1.8x" },
  { label: "Data stack", value: "GA4 · Looker", small: true }
];

const GA4_INSIGHTS = [
  {
    icon: <LineChart size={18} />,
    kicker: "Campaign impact",
    title: "One product page drew most of the views",
    body: "The Nonchalant product page took the majority of all page views, peaking in the week the Nonchalant sales ads were running. Paid social was the second-largest traffic source after direct."
  },
  {
    icon: <Target size={18} />,
    kicker: "Recommendation",
    title: "Clicks arrive, but they don't stay",
    body: "Engagement time on the Nonchalant product page was far shorter than on the homepage or the Meet Your Alter Ego page. The next test: send part of the traffic to richer pages and compare checkouts."
  },
  {
    icon: <Search size={18} />,
    kicker: "Search demand",
    title: "Ads are building brand search",
    body: "Brand queries such as “page by page” make up most of the organic clicks, and product names like “morning chill club” are now searched and rank near the top of Google."
  }
];

const ANALYTICS_EVIDENCE: EvidenceItem[] = [
  { label: "GA4 · Pages", src: "/data/pagebypage-ga4-pages-and-screens.webp", width: 1151, height: 742, alt: "GA4 pages and screens report showing views, users and engagement time per page; figures blurred", caption: "GA4 pages and screens: which pages the campaigns drove people to. Figures blurred except active users." },
  { label: "GA4 · Search queries", src: "/data/pagebypage-ga4-organic-search-queries.webp", width: 1223, height: 737, alt: "GA4 organic Google Search queries report with clicks, impressions, CTR and average position", caption: "Organic Google Search queries in GA4: brand demand growing alongside the ads. Figures blurred." },
  { label: "GA4 · Acquisition", src: "/data/pagebypage-ga4-reports-snapshot.webp", width: 1412, height: 810, alt: "GA4 reports snapshot with users, sessions and top traffic sources; figures blurred", caption: "GA4 reports snapshot: users and top traffic sources. Figures blurred except active users." },
  { label: "Looker · Traffic", src: "/data/pagebypage-looker-traffic-dashboard-blurred.webp", width: 1007, height: 655, alt: "Looker Studio traffic dashboard with landing page views and cost per landing page view per creative", caption: "Looker Studio dashboard I built for the traffic campaign. Figures blurred except total LPV." },
  { label: "Looker · Sales", src: "/data/pagebypage-looker-sales-dashboard-blurred.webp", width: 1007, height: 641, alt: "Looker Studio sales dashboard with spend, purchases, purchase value and ROAS per creative", caption: "Looker Studio dashboard I built for the sales campaign. Figures blurred except ROAS." },
  { label: "Apps Script · Sheets", src: "/meta/pagebypage-sheets-apps-script.webp", width: 1600, height: 821, alt: "Google Sheets filled daily by Apps Script with Meta ad-level data; IDs blurred", caption: "The data layer: Google Sheets filled daily by Apps Script. IDs blurred." }
];

const PIPELINE = [
  { icon: <Workflow size={16} />, title: "Collect", desc: "Apps Script pulls Meta Ads data daily; GA4 tracks what happens on the site." },
  { icon: <FileSpreadsheet size={16} />, title: "Model", desc: "Google Sheets tabs per dataset: daily ads, demographics, funnels." },
  { icon: <LayoutDashboard size={16} />, title: "Visualise", desc: "Looker Studio dashboards per objective, filterable by ad set and date." },
  { icon: <ChartColumn size={16} />, title: "Act", desc: "Weekly insights that decide budget, creatives and landing pages." }
];

const TOOLKIT = [
  { icon: <LineChart size={18} />, group: "Analytics & tracking", tools: ["Google Analytics 4", "Search Console data", "Meta Ads Manager"] },
  { icon: <LayoutDashboard size={18} />, group: "Dashboards", tools: ["Looker Studio", "Tableau"] },
  { icon: <Workflow size={18} />, group: "Automation", tools: ["Google Apps Script", "Google Sheets", "Excel"] },
  { icon: <Database size={18} />, group: "Data science", tools: ["Python", "Pandas", "XGBoost", "TensorFlow", "NLP", "LLM fine-tuning"] }
];

const eyebrow = "text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]";
const card = "rounded-2xl bg-white/5 border border-white/10";

export default function DataAnalysisProject() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500 relative overflow-hidden">
      <ProjectHero view="data-analysis" sections={[
        { id: "marketing-analytics", label: "Marketing analytics" },
        { id: "toolkit", label: "Toolkit" },
        { id: "case-studies", label: "Projects" }
      ]} />

      {/* Marketing analytics: Page by Page */}
      <section id="marketing-analytics" className="py-16 md:py-20 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end mb-10">
            <div data-reveal>
              <span className={eyebrow}>Marketing analytics · Page by Page</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mt-3 mb-5 leading-none">From ad click to website behaviour, in one view.</h2>
              <p className="text-white/60 leading-relaxed">For a local perfume brand, I connected Meta Ads data, Google Analytics 4 and Looker Studio to answer one question: which ads bring people who actually engage and buy? These are the dashboards and the findings from one month of data.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {GA4_KPIS.map((kpi) => (
                <div key={kpi.label} data-reveal className={`p-4 md:p-5 ${card}`}>
                  <div className={`${kpi.small ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-black tracking-tighter`}>{kpi.value}</div>
                  <div className="text-[10px] uppercase text-white/40 font-bold tracking-widest mt-1">{kpi.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {GA4_INSIGHTS.map((insight) => (
              <div key={insight.title} data-reveal className={`p-5 ${card}`}>
                <span className="inline-flex items-center gap-2 text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">{insight.icon}{insight.kicker}</span>
                <h3 className="text-lg font-bold leading-snug mb-2">{insight.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{insight.body}</p>
              </div>
            ))}
          </div>

          <EvidenceTabs items={ANALYTICS_EVIDENCE} label="Analytics dashboards" />

          <ol className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-12">
            {PIPELINE.map((step, i) => (
              <li key={step.title} data-reveal className="p-4 rounded-2xl bg-black border border-white/10">
                <div className="flex items-center justify-between mb-3 text-orange-500">{step.icon}<span className="text-white/20 font-black text-xs">0{i + 1}</span></div>
                <h3 className="font-bold text-sm mb-1">{step.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
          <a href="/meta-ads" className="mt-6 inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-bold text-sm">
            See the campaign side on the Meta Ads page <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      {/* Toolkit */}
      <section id="toolkit" className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="mb-8">
            <span className={eyebrow}>Toolkit</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mt-3">Tools I use, from tracking to modelling</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOOLKIT.map((group) => (
              <div key={group.group} data-reveal className={`p-5 ${card}`}>
                <div className="flex items-center gap-2 text-orange-500 mb-4">{group.icon}<h3 className="font-bold text-white">{group.group}</h3></div>
                <div className="tags">{group.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Projects Grid */}
      <section id="case-studies" className="py-16 md:py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="project-section-intro">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-3 text-orange-500">Data science projects</h2>
            <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Machine learning, NLP and dashboards, with code and write-ups</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {DATA_PROJECTS.map((project, i) => (
              <motion.div 
                key={project.id}
                data-reveal
                className="group relative"
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title}`}
                  className="block relative aspect-[4/3] overflow-hidden rounded-[1.5rem] mb-6 cursor-pointer"
                >
                  <img loading="lazy" decoding="async" src={project.image} alt={project.title} className="w-full h-full object-cover  group-hover:scale-110 transition-all duration-700" />
                </a>
                
                <div className="px-2">
                  <div className="text-[10px] uppercase font-bold text-orange-500 mb-2 tracking-widest">{project.category}</div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 group-hover:text-orange-500 transition-colors">{project.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light mb-8 ">{project.description}</p>
                  
                  <div className="tags mb-5">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <div className="pt-6 border-t border-white/10 flex justify-between">
                    {Object.entries(project.stats).slice(0, 2).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-[11px] uppercase text-white/60 tracking-widest font-bold">{key.replaceAll('_', ' ')}</div>
                        <div className="text-lg font-black text-white/80">{value}</div>
                      </div>
                    ))}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center self-end group-hover:bg-orange-500 group-hover:text-black transition-all -rotate-45"
                    >
                      <StopMotionIcon
                        paths={STOP_MOTION_PATHS.arrowRight}
                        size={20}
                        strokeWidth={8}
                        wobble={true}
                      />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

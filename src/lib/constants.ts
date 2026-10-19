import type { ViewType } from '@/router/routes';
export type PortfolioProject = { view: ViewType; title: string; desc: string; tags: string[]; image: string };

export const MOTION_GRAPHICS_TAGS = [
  "SaaS Explainer",
  "Motion Logo",
  "2D Animation",
  "Commercials",
  "Animated Ads"
];

export const GRAPHIC_DESIGN_TAGS = [
  "Branding",
  "UI Design",
  "Product Design",
  "Social Media",
  "Infographics",
  "Booklet Design"
];

export const SHORT_FORM_VIDEO_TAGS = [
  "Reels",
  "TikTok",
  "Ads",
  "Viral Content",
  "Branding Campaign"
];

export const LONG_FORM_VIDEO_TAGS = [
  "YouTube",
  "Documentary",
  "Interviews",
  "Vlogs",
  "Education",
  "Storytelling"
];

export const CREATIVE_PROJECTS: PortfolioProject[] = [
  {
    view: "motion",
    title: "Motion Graphics",
    desc: "Bring your brand to life with animation that moves people — from logo reveals to full SaaS explainer videos.",
    tags: MOTION_GRAPHICS_TAGS,
    image: "/projects/motion.webp"
  },
  {
    view: "graphic",
    title: "Graphic Design",
    desc: "Visual identities that stand out in a crowded market. From branding to digital assets.",
    tags: GRAPHIC_DESIGN_TAGS,
    image: "/projects/graphic.webp"
  },
  {
    view: "short-form",
    title: "Short-Form Video",
    desc: "Engaging content for TikTok, Reels, and Shorts that captures attention in seconds.",
    tags: ["Reels", "TikTok", "Ads", "Viral Content"],
    image: "/projects/short-form.webp"
  },
  {
    view: "long-form",
    title: "Long-Form Video",
    desc: "Documentaries, interviews, and long-form storytelling.",
    tags: ["YouTube", "Documentary", "Interviews"],
    image: "/projects/long-form.webp"
  }
];

export const TECHNICAL_PROJECTS: PortfolioProject[] = [
  {
    view: "web-dev",
    title: "Web Development",
    desc: "High-performance websites built with modern frameworks like React and Next.js.",
    tags: ["React", "TypeScript", "Tailwind", "Next.js"],
    image: "/projects/web-dev.webp"
  },
  {
    view: "data-analysis",
    title: "Data Analysis & Visualization",
    desc: "Marketing analytics and data science: GA4 and Looker Studio dashboards, automated reporting, and Python models.",
    tags: ["GA4", "Looker Studio", "Python", "Tableau"],
    image: "/projects/data-analysis.webp"
  },
  {
    view: "market-research",
    title: "Market Research",
    desc: "Automated scraping and analysis to understand market trends.",
    tags: ["Scraping", "Automation", "Competitor Analysis"],
    image: "/projects/market-research.webp"
  },
  {
    view: "meta-ads",
    title: "Meta Ads",
    desc: "Full-funnel Meta campaigns, backed by automated reporting and dashboards.",
    tags: ["Meta Ads Manager", "Looker Studio", "Apps Script", "ROAS Optimization"],
    image: "/projects/meta-ads.webp"
  }
];

export const CREATIVE_PROJECT_TITLES = CREATIVE_PROJECTS.map(p => p.title);
export const TECHNICAL_PROJECT_TITLES = TECHNICAL_PROJECTS.map(p => p.title);

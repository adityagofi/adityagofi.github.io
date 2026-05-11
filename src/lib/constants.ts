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

export const CREATIVE_PROJECTS = [
  {
    title: "Motion Graphics",
    desc: "Bring your brand to life with animation that moves people — from logo reveals to full SaaS explainer videos.",
    tags: MOTION_GRAPHICS_TAGS,
    image: "/assets/projects/motion.webp"
  },
  {
    title: "Graphic Design",
    desc: "Visual identities that stand out in a crowded market. From branding to digital assets.",
    tags: GRAPHIC_DESIGN_TAGS,
    image: "/assets/projects/graphic.webp"
  },
  {
    title: "Short Form Video",
    desc: "Engaging content for TikTok, Reels, and Shorts that captures attention in seconds.",
    tags: ["Reels", "TikTok", "Ads", "Viral Content"],
    image: "/assets/projects/short-form.webp"
  },
  {
    title: "Long Form Video",
    desc: "Documentaries, interviews, and long-form storytelling.",
    tags: ["YouTube", "Documentary", "Interviews"],
    image: "/assets/projects/long-form.webp"
  },
  {
    title: "Photography",
    desc: "Capturing moments and products with a professional eye.",
    tags: ["Product", "Lifestyle", "Portrait"],
    image: "/assets/projects/photography.webp"
  }
];

export const TECHNICAL_PROJECTS = [
  {
    title: "Web Development",
    desc: "High-performance websites built with modern frameworks like React and Next.js.",
    tags: ["React", "TypeScript", "Tailwind", "Next.js"],
    image: "/assets/projects/web-dev.webp"
  },
  {
    title: "Data Analysis & Visualization",
    desc: "Turning raw data into actionable insights and intuitive visualizations using Python, Tableau, and ML models.",
    tags: ["Python", "Pandas", "Tableau", "ML"],
    image: "/assets/projects/data-analysis.webp"
  },
  {
    title: "Market Research",
    desc: "Automated scraping and analysis to understand market trends.",
    tags: ["Scraping", "Automation", "Competitor Analysis"],
    image: "/assets/projects/market-research.webp"
  },
  {
    title: "Meta Ads",
    desc: "Data-driven advertising campaigns that convert.",
    tags: ["Facebook Ads", "Instagram Ads", "ROAS Optimization"],
    image: "/assets/projects/meta-ads.webp"
  }
];

export const CREATIVE_PROJECT_TITLES = CREATIVE_PROJECTS.map(p => p.title);
export const TECHNICAL_PROJECT_TITLES = TECHNICAL_PROJECTS.map(p => p.title);

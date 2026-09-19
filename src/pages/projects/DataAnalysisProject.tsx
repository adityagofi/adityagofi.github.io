import ProjectHero from '@/components/ui/ProjectHero';
import StopMotionIcon, { STOP_MOTION_PATHS } from '@/components/ui/StopMotionIcon';
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


export default function DataAnalysisProject() {



  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500 relative overflow-hidden">
      {/* Hero Section */}
      <ProjectHero view="data-analysis" sections={[{ id: "case-studies", label: "Projects" }]} />


      {/* Analysis Projects Grid */}
      <section id="case-studies" className="py-32 px-6 relative bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="project-section-intro">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-orange-500">Selected projects</h2>
            <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Deep dives into complex problem solving</p>
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

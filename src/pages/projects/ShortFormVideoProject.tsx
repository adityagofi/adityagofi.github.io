import ScribblePlay from '@/components/ui/ScribblePlay';
import ProjectHero from '@/components/ui/ProjectHero';
import StopMotionIcon, { STOP_MOTION_PATHS } from '@/components/ui/StopMotionIcon';
import VideoModal from '@/components/ui/VideoModal';
import { scrollSlideIn } from '@/lib/animations';
import { AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';


const projects = [
  {
    id: "01",
    title: "POCARI SWEAT",
    subtitle: "Bintang SMA",
    category: "Branding Campaign",
    description: "Bintang SMA is a national student talent search competition. I created a series of dynamic short videos for TikTok and Reels to promote the event, featuring energetic edits to drive engagement among high school students across Indonesia.",
    videos: [
      { id: "bDGXZZNxU4A?si=60kNFdNmsmHfhyjE", thumbnail: "/shortform/project-pocari-1.webp" },
      { id: "YjPIg1WQ2iw?si=-vQ_rYdJ_DCJltQB", thumbnail: "/shortform/project-pocari-2.webp" },
      { id: "mePqPbIC_Yo?si=NOh-8PHMdKUOB0Nm", thumbnail: "/shortform/project-pocari-3.webp" },
      { id: "4CHF8njkgA0?si=EafJ5MJ8gTc9IJqF", thumbnail: "/shortform/project-pocari-4.webp" },
    ]
  },
  {
    id: "02",
    title: "RSPI",
    subtitle: "Rumah Sakit Pondok Indah",
    category: "Healthcare Content",
    description: "Short-form videos for one of Indonesia's leading private hospitals — health awareness, service highlights, and patient stories crafted to feel approachable while staying medically credible.",
    videos: [
      { id: "x9iulHZlCGc?si=xKM73OXzttK0Mdcc", thumbnail: "/shortform/project-rspi-1.webp" },
      { id: "03UHHkUQhwg?si=dVxK5LPxpQbFDTkD", thumbnail: "/shortform/project-rspi-2.webp" },
      { id: "8QYdJocDWuY?si=AfIjWt132ynbr9_r", thumbnail: "/shortform/project-rspi-3.webp" },
      { id: "lGffLtHxRDo?si=0p1Wdn7fPiaM-Ut4s", thumbnail: "/shortform/project-rspi-4.webp" },
      { id: "pkMDWtYfNno?si=CYk_-yKCQqS4uF1R", thumbnail: "/shortform/project-rspi-5.webp" },
      { id: "fOZt1q4DoF8?si=WjlF83h7JX8mCk-j", thumbnail: "/shortform/project-rspi-6.webp" },
      { id: "ihdXI_Um8yY?si=QLphxppmaqGHBwXw", thumbnail: "/shortform/project-rspi-7.webp" },
      { id: "k4lLQOLScKo?si=_eCKWyAk9eLUDSfy", thumbnail: "/shortform/project-rspi-8.webp" },
    ]
  },
  {
    id: "03",
    title: "CHANGI AIRPORT",
    subtitle: "Travel Experience",
    category: "Travel & Hospitality",
    description: "Vertical content for Singapore's Changi Airport — facility highlights, dining and shopping discovery, and traveler-tip edits built for TikTok and Reels to inspire and inform passengers on the move.",
    videos: [
      { id: "idQjJRSBgr8?si=wKBYiN2ybYeC070H", thumbnail: "/shortform/project-changi-1.webp" },
      { id: "Sq17YYl45xA?si=tEW5JCziciwu-OKL", thumbnail: "/shortform/project-changi-2.webp" },
      { id: "5heIQRMPEj4?si=B9ojlh566weN1dSd", thumbnail: "/shortform/project-changi-3.webp" },
      { id: "coeF7Y7SKsw?si=DwHUkw8GofBULiWA", thumbnail: "/shortform/project-changi-4.webp" },
      { id: "diD-dDPgW_I?si=sOjBy_l4qRKVJW16", thumbnail: "/shortform/project-changi-5.webp" },
      { id: "r1OREtLjAz4?si=kVoSFEuh1nP2EXs4", thumbnail: "/shortform/project-changi-6.webp" },
      { id: "bTVpIblMR0k?si=VTAUZRBj1ZPx2ZBm", thumbnail: "/shortform/project-changi-7.webp" },
    ]
  },
  {
    id: "04",
    title: "WULING",
    subtitle: "Wuling Indonesia",
    category: "Branding Campaign",
    description: "Short-form vehicle showcases and lifestyle pieces for Wuling's Indonesian arm — supporting product launches and dealership campaigns with a sharp, platform-native visual language.",
    videos: [
      { id: "t4Od_Q3A-kM?si=sCk8YIxvjQbQZltR", thumbnail: "/shortform/project-wuling-1.webp" },
      { id: "MOzSv3n6y_4?si=OlmPCtVUZJRNaqff", thumbnail: "/shortform/project-wuling-2.webp" },
      { id: "ZyJ9YA98jqk?si=HV-vMSe_razhxIad", thumbnail: "/shortform/project-wuling-3.webp" },
    ]
  },
  {
    id: "05",
    title: "MANTAPPU CORP",
    subtitle: "Corporate Branding",
    category: "Corporate Branding",
    description: "Short-form reels and announcement edits for Mantappu Corp's owned media presence — covering corporate channel content, behind-the-scenes, and brand campaigns under one of Indonesia's biggest creator networks.",
    videos: [
      { id: "egQqNXgkjwM?si=GBSMuii3lbj8IJeJ", thumbnail: "/shortform/project-mantappu-corp-1.webp" },
      { id: "HTsUGJC-pUQ?si=9KSZduLJynwReOZZ", thumbnail: "/shortform/project-mantappu-corp-2.webp" },
      { id: "9qBRF-rFU-k?si=nAKeFmzn5nUDjsH6", thumbnail: "/shortform/project-mantappu-corp-3.webp" },
      { id: "gyPDXgF4LHM?si=bKjuxfiFVtVHepK6", thumbnail: "/shortform/project-mantappu-corp-4.webp" },
      { id: "YwPQvsoh73I?si=RbmwL5ghiNo1-fk7", thumbnail: "/shortform/project-mantappu-corp-5.webp" },
      { id: "e_qZt1qU9o0?si=88IDNJtvALkQYSwc", thumbnail: "/shortform/project-mantappu-corp-6.webp" },
    ]
  },
  {
    id: "06",
    title: "MANTAPPU ACADEMY",
    subtitle: "Corporate Branding",
    category: "Education Content",
    description: "Short-form study tips, motivational clips, and SNBT-prep content for Mantappu Academy's student-facing channels — tuned for TikTok and Instagram engagement during peak exam-prep season.",
    videos: [
      { id: "syrjTpZh-Q0?si=v-8Hr4o-CjAn3UvD", thumbnail: "/shortform/project-mantappu-academy-1.webp" },
      { id: "041XaH9LyDw?si=7_ZpM2I1eu0Gg7az", thumbnail: "/shortform/project-mantappu-academy-2.webp" },
      { id: "11-NXb_IXms?si=Hr3saqpAXodIVu6D", thumbnail: "/shortform/project-mantappu-academy-3.webp" },
      { id: "x0L4M4tcWBw?si=SGbb5BniYcCNiSCN", thumbnail: "/shortform/project-mantappu-academy-4.webp" },
    ]
  },
  {
    id: "07",
    title: "OTHERS",
    subtitle: "Creators & Independent Clients",
    category: "Various Clients",
    description: "A long-running roster of short-form work for content creators and individual clients across Indonesia — from creator collaborations to one-off campaign pieces. The brief stays the same: hook fast, edit tight, ship daily.",
    videos: [
      { id: "f9GQW8Wp9b4?si=z9qeB8SvZYMIvSj-", thumbnail: "/shortform/project-others-1.webp" },
      { id: "LbipgWAwYIg?si=RM1cpeYgQTaw4uCv", thumbnail: "/shortform/project-others-2.webp" },
      { id: "HQPLrIV1OWM?si=gllzoQ6u96FdiTDO", thumbnail: "/shortform/project-others-3.webp" },
      { id: "4VJ_rnda2PU?si=Y39baRjXs6c4GFy_", thumbnail: "/shortform/project-others-4.webp" },
    ]
  }
];

export default function ShortFormVideoProject() {
  const [selection, setSelection] = useState<{ videos: string[]; index: number } | null>(null);
  const [projectSlides, setProjectSlides] = useState<Record<string, number>>(
    Object.fromEntries(projects.map(p => [p.id, 0]))
  );
  const [projectDirections, setProjectDirections] = useState<Record<string, number>>(
    Object.fromEntries(projects.map(p => [p.id, 0]))
  );



  const nextProjectSlide = (projectId: string, totalVideos: number) => {
    setProjectDirections(prev => ({ ...prev, [projectId]: 1 }));
    setProjectSlides(prev => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % totalVideos
    }));
  };

  const prevProjectSlide = (projectId: string, totalVideos: number) => {
    setProjectDirections(prev => ({ ...prev, [projectId]: -1 }));
    setProjectSlides(prev => ({
      ...prev,
      [projectId]: (prev[projectId] - 1 + totalVideos) % totalVideos
    }));
  };

  const goToSlide = (projectId: string, index: number) => {
    setProjectDirections(prev => ({ ...prev, [projectId]: index > projectSlides[projectId] ? 1 : -1 }));
    setProjectSlides(prev => ({ ...prev, [projectId]: index }));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    })
  };

  const getVisibleVideos = (videos: any[], currentIndex: number) => {
    const total = videos.length;
    const prev = (currentIndex - 1 + total) % total;
    const current = currentIndex;
    const next = (currentIndex + 1) % total;
    return [
      { ...videos[prev], type: 'prev' },
      { ...videos[current], type: 'current' },
      { ...videos[next], type: 'next' },
    ];
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-orange-500">
      <ProjectHero view="short-form" sections={projects.map(project => ({ id: `project-${project.id}`, label: project.title }))} />

{/* Projects List */}
      <div className="pb-8 space-y-16">
        {projects.map((project, index) => (
          <section id={`project-${project.id}`} key={project.id} className="px-6 md:px-32">
            <div className={`max-w-7xl mx-auto flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 md:gap-20`}>
              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <motion.div
                  {...scrollSlideIn(index % 2 === 0 ? -30 : 30)}
                >
                  <p className="text-orange-500 font-mono text-xs tracking-[0.3em] uppercase mb-4">{project.category}</p>
                  <h2 className="text-4xl md:text-7xl font-bold text-white mb-2 tracking-tighter">{project.title}</h2>
                  <h3 className="text-2xl md:text-4xl font-bold text-white/60 mb-4">{project.subtitle}</h3>
                  <p className="text-white/60 leading-relaxed text-sm md:text-base max-w-md text-justify">
                    {project.description}
                  </p>
                  <div className="flex items-start gap-2 mt-4 max-w-md text-white/30 text-sm italic">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5 text-orange-500" />
                    <p>Note: Some videos don't include background music due to copyright restrictions.</p>
                  </div>
                </motion.div>
              </div>

              {/* Video Slider/Collage */}
              <div className="w-full lg:w-1/2 group/slider relative">
                <div className="relative h-[380px] md:h-[550px] flex items-center justify-center">
                   {/* Middle Overlay Layer */}
                   <motion.div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                      backgroundSize: '60px 60px'
                    }}
                    animate={{ backgroundPositionX: ["0px", "-60px"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   />

                   {/* Orange Gradient Glow — sits behind the focused card */}
                   <motion.div
                    className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    animate={{ opacity: [0.7, 1, 0.7], scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   >
                     <div
                       className="w-[55%] h-[75%] md:w-[45%] md:h-[80%] rounded-[50%]"
                       style={{
                         background: 'radial-gradient(ellipse at center, rgba(255,106,0,0.45) 0%, rgba(255,106,0,0.18) 40%, transparent 75%)',
                         filter: 'blur(60px)'
                       }}
                     />
                   </motion.div>

                   {/* Focused Triplet Video Slider */}
                   <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                     <AnimatePresence mode="popLayout" initial={false} custom={projectDirections[project.id]}>
                       <motion.div
                        key={`${project.id}-${projectSlides[project.id]}`}
                        custom={projectDirections[project.id]}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="relative flex items-center justify-center gap-0 md:gap-8 w-full h-full"
                       >
                         {getVisibleVideos(project.videos, projectSlides[project.id]).map((video, vIndex) => (
                           <motion.div
                            key={`${video.id}-${vIndex}`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ 
                              scale: vIndex === 1 ? 1.5 : 0.8, 
                              opacity: vIndex === 1 ? 1 : 0.25,
                              rotate: vIndex === 0 ? -8 : vIndex === 2 ? 8 : 0,
                              zIndex: vIndex === 1 ? 20 : 10
                            }}
                            className={`relative aspect-[9/16] w-[40%] md:w-[38%] bg-zinc-800 rounded-[0.5rem] md:rounded-[1rem] overflow-hidden shadow-2xl border border-white/10 group cursor-pointer ${vIndex === 1 ? 'shadow-orange-500/20' : ''}`}
                            role="button" tabIndex={0} aria-label={`Play ${project.title} video ${project.videos.findIndex(v => v.id === video.id) + 1}`}
                            onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.currentTarget.click(); } }}
                            onClick={() => setSelection({
                              videos: project.videos.map(v => v.id),
                              index: project.videos.findIndex(v => v.id === video.id),
                            })}
                           >
                             <img loading="lazy" decoding="async" src={video.thumbnail}
                              alt="" 
                              className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-700" 
                              referrerPolicy="no-referrer" 
                             />
                             {vIndex === 1 && (
                               <div className="absolute inset-0 flex items-center justify-center">
                                 <motion.div 
                                  whileHover={{ scale: 1.05 }}
                                  className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-[2px] border border-white/50 flex items-center justify-center group-hover:bg-orange-500  transition-all duration-500 shadow-xl"
                                 >
                                   <ScribblePlay size={42} />
                                 </motion.div>
                               </div>
                             )}
                           </motion.div>
                         ))}
                       </motion.div>
                     </AnimatePresence>
                   </div>

                   {/* Navigation Arrows — hidden when only one video */}
                   {project.videos.length > 1 && (
                     <>
                       <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8 z-50">
                         <button
                           aria-label="Previous video" onClick={() => prevProjectSlide(project.id, project.videos.length)}
                           className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-orange-500  transition-all cursor-pointer shadow-2xl"
                         >
                           <StopMotionIcon
                             paths={STOP_MOTION_PATHS.arrowLeft}
                             size={28}
                             strokeWidth={8}
                             drawDuration={0}
                             staggerDelay={0}
                             wobble={true}
                           />
                         </button>
                       </div>
                       <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8 z-50">
                         <button
                           aria-label="Next video" onClick={() => nextProjectSlide(project.id, project.videos.length)}
                           className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-orange-500 transition-all cursor-pointer shadow-2xl"
                         >
                           <StopMotionIcon
                             paths={STOP_MOTION_PATHS.arrowRight}
                             size={28}
                             strokeWidth={8}
                             drawDuration={0}
                             staggerDelay={0}
                             wobble={true}
                           />
                         </button>
                       </div>
                     </>
                   )}
                </div>

                {/* Pagination Dots — hidden when only one video */}
                {project.videos.length > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {project.videos.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        aria-label={`Show ${project.title} video ${dotIndex + 1}`} aria-current={dotIndex === projectSlides[project.id]}
                        onClick={() => goToSlide(project.id, dotIndex)}
                        className={`carousel-dot w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${dotIndex === projectSlides[project.id] ? 'bg-orange-500 w-6' : 'bg-white/20 hover:bg-white/40'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

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

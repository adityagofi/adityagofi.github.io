import MotionVideoSlider from '@/components/ui/MotionVideoSlider';
import { COLLAGE_COLORS as C, FloatingDoodles, MarkerScribble, ToolChips, cornerDoodles } from '@/components/ui/Collage';
import ProjectHero from '@/components/ui/ProjectHero';
import VideoModal from '@/components/ui/VideoModal';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    id: "project-sats",
    client: "SATS",
    category: "Corporate Branding",
    desc: "Created high-fidelity motion graphics for SATS (Singapore Airport Terminal Services) brand presentations and internal communications. Transformed static designs into polished, fluid animations using After Effects and Premiere Pro, ensuring every asset was strictly aligned with corporate identity and visual standards.",
    tools: ["After Effects", "Premiere Pro", " Adobe Illustrator"],
    process: ["ASSET PREPARATION", "COMPOSITING", "MOTION DESIGN", "BRAND DELIVERY"],
    videos: [
      { id: "6e4iAQoJe2Q?si=ReCBPDVp_TZsN0-K", thumbnail: "/motion/project-sats-1.webp" },
      { id: "PSrjIgHP8_w?si=zmBX_iz5WLyCJbzP", thumbnail: "/motion/project-sats-2.webp" },
      { id: "DIZUdyIjFQI?si=0ot06FChsTNz46bp", thumbnail: "/motion/project-sats-3.webp" },
      { id: "aVfRjooW_HA?si=13jiIIVZYm6pi8TG", thumbnail: "/motion/project-sats-4.webp" },
      { id: "ZzpjP8yzEpU?si=ivQ-SYKeprDj4AMm", thumbnail: "/motion/project-sats-5.webp" },
    ]
  },
  {
    id: "project-asahi",
    client: "ASAHI",
    category: "Product Launch",
    desc: "Created dynamic motion graphics for Asahi Group’s latest product launch. Developed high-energy animations and promotional assets using After Effects, ensuring the visual style captured the new product’s identity while maintaining the Japanese group’s global brand standards.",
    tools: ["After Effects", "Premiere Pro", "Adobe Illustrator"],
    process: ["BRAND ALIGNMENT", "COMPOSITING", "MOTION DESIGN", "FINAL ASSEMBLY"],
    videos: [
      { id: "qLpifVZ-dmk?si=y35j26pEmsV8Puge", thumbnail: "/motion/project-asahi-1.webp" },
      { id: "8DDICzKh3WM?si=-azAmIfSRZNz8k1E", thumbnail: "/motion/project-asahi-2.webp" },
      { id: "xza2qTI-uyI?si=SVaS_w0cIWc_fHZw", thumbnail: "/motion/project-asahi-3.webp" },
      { id: "VyO0TLW2kNE?si=GL3A1Pv7hVPSACmp", thumbnail: "/motion/project-asahi-4.webp" },
      { id: "rsH6bARSwJE?si=Sp7FTKrRq6EGYJS0", thumbnail: "/motion/project-asahi-5.webp" },
    ]
  },
  {
    id: "project-page-by-page",
    client: "PAGE BY PAGE",
    category: "Brand Identity",
    desc: "Crafted the motion branding identity for Page by Page in a single high-fidelity piece, translating their editorial tone into fluid type-led motion. Every transition was designed to reinforce the brand's voice and feel consistent across every touchpoint.",
    tools: ["After Effects", "Adobe Illustrator"],
    process: ["BRAND STUDY", "MOTION DESIGN", "FINAL DELIVERY"],
    videos: [
      { id: "83hD6AzHgv4?si=Za_aCgtX0QwzPX6C", thumbnail: "/motion/project-pagebypage-1.webp" },
    ]
  },
  {
    id: "project-rocketindo",
    client: "ROCKETINDO",
    category: "Award Show",
    desc: "Responsible for the main stage display motion of Rocketindo's awarding show. Designed the show's signature motion piece to anchor the live broadcast, reinforce its identity, and carry the energy of the night across every reveal on the main screen.",
    tools: ["After Effects", "Premiere Pro", "Adobe Illustrator"],
    process: ["CONCEPT", "STORYBOARDING", "MOTION DESIGN", "ON-STAGE DELIVERY"],
    videos: [
      { id: "WUIYjz4xeNI?si=zjoN6V2sXLj0KRT9", thumbnail: "/motion/project-rocketindo-1.webp" },
      { id: "PJA_o4raqLU?si=XWDTtFD6kSvOWThG", thumbnail: "/motion/project-rocketindo-2.webp" },
      { id: "NXlX3jDOxyc?si=RHf95wQgMjpImr9B", thumbnail: "/motion/project-rocketindo-3.webp" },
      { id: "abun14N8HAc?si=xPJG5Jy_d8U2ZA2j", thumbnail: "/motion/project-rocketindo-4.webp" },
      { id: "nWGorJBpExY?si=EMLyQZ4zAjwd9ETc", thumbnail: "/motion/project-rocketindo-5.webp" },
    ]
  },
  {
    id: "project-logos",
    client: "LOGO MOTION",
    category: "Logo Animation",
    desc: "Animated logo reveals for Racing Hearts, The Hong Kong Jockey Club, Mantappu Academy, and Mantappu Corp, each built around the brand's identity with fluid, bespoke motion.",
    tools: ["After Effects", "Adobe Illustrator"],
    process: ["LOGO VECTORIZATION", "MOTION STORYBOARDING", "FLUID ANIMATION"],
    videos: [
      { id: "4YGU5brEefo?si=ta8xPSxfSRpgDLtj", thumbnail: "/motion/project-logos-1.webp" },
      { id: "vO9dL6rn9c8?si=NivV2MCv6MNnjyBH", thumbnail: "/motion/project-logos-2.webp" },
      { id: "jDznvfNzPjE?si=11XdPkWC1DPx8IQ9", thumbnail: "/motion/project-logos-3.webp" },
    ]
  },
];



type Selection = { videos: string[]; index: number } | null;

export default function MotionProject() {
  const [selection, setSelection] = useState<Selection>(null);
  const [slides, setSlides] = useState<Record<string, number>>({});
  const selectSlide = (id: string, index: number, total: number) => {
    setSlides(previous => ({ ...previous, [id]: (index + total) % total }));
  };
  return <div className="motion-portfolio">
    <ProjectHero view="motion" sections={projects.map(project => ({ id: project.id, label: project.client === 'LOGO MOTION' ? 'Logo motion' : project.client === 'PAGE BY PAGE' ? 'Page by Page' : project.client === 'ROCKETINDO' ? 'Rocketindo' : project.client }))} />
    <section id="selected-projects" aria-labelledby="motion-work-title" className="paper-grid relative overflow-hidden">
      <FloatingDoodles items={[
        { kind: 'burst', color: C.orange, size: 84, top: '1%', right: '2%', rotate: 12 },
        { kind: 'squiggle', color: C.violet, size: 90, top: '0.5%', right: '22%', desktopOnly: true },
      ]} scatter={{ seed: 61, count: 60, band: 7, front: false }} />
      <div className="motion-collection-heading relative z-10">
        <div><p className="handwritten text-xl md:text-2xl text-orange-500 mb-2">Selected work <span className="text-white">/ Motion</span></p><h2 id="motion-work-title">Identity, in motion.</h2><MarkerScribble className="mt-2" /></div>
        <p>Brand stories, product launches, and on-screen experiences. Explore each collection and press play.</p>
      </div>
      <div className="motion-case-list relative z-10">
        {projects.map((project, projectIndex) => {
          const current = slides[project.id] ?? 0;
          return <article key={project.id} id={project.id} className="motion-case relative" aria-labelledby={`${project.id}-title`}>
            <FloatingDoodles items={cornerDoodles(projectIndex * 3 + 1)} spill />
            <header className="motion-case-heading">
              <div className="motion-case-title"><span className="handwritten text-xl text-orange-500">Project {String(projectIndex + 1).padStart(2, '0')}</span><h3 id={`${project.id}-title`}>{project.client === 'PAGE BY PAGE' ? 'Page by Page' : project.client === 'LOGO MOTION' ? 'Logo motion' : project.client === 'ROCKETINDO' ? 'Rocketindo' : project.client}</h3></div>
              <span className="motion-category">{project.category}</span>
            </header>
            <div className="motion-case-grid">
              <div className="motion-gallery" role="group" aria-label={`${project.client} video collection`}>
                <MotionVideoSlider videos={project.videos} client={project.client} current={current}
                  onSelect={index => selectSlide(project.id, index, project.videos.length)}
                  onPlay={index => setSelection({ videos: project.videos.map(item => item.id), index })} />
                <div className="motion-gallery-toolbar">
                  <p aria-live="polite">Film <strong>{String(current + 1).padStart(2, '0')}</strong> / {String(project.videos.length).padStart(2, '0')}</p>
                  {project.videos.length > 1 && <div className="motion-gallery-arrows"><button type="button" aria-label={`Previous ${project.client} video`} onClick={() => selectSlide(project.id, current - 1, project.videos.length)}><ArrowLeft size={18} /></button><button type="button" aria-label={`Next ${project.client} video`} onClick={() => selectSlide(project.id, current + 1, project.videos.length)}><ArrowRight size={18} /></button></div>}
                </div>
                {project.videos.length > 1 && <div className="motion-slider-dots" aria-label={`Choose a ${project.client} film`}>
                  {project.videos.map((item, index) => <button type="button" key={item.id} className="carousel-dot" aria-label={`Show ${project.client} video ${index + 1}`} aria-current={current === index} onClick={() => selectSlide(project.id, index, project.videos.length)} />)}
                </div>}
              </div>
              <div className="motion-case-info">
                <div><p className="eyebrow">About the project</p><p className="motion-description">{project.desc}</p></div>
                <ToolChips tools={project.tools} />
                <div><p className="eyebrow">Process</p><ol className="motion-process">{project.process.map((step, index) => <li key={step}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{step.toLowerCase()}</li>)}</ol></div>
              </div>
            </div>
          </article>;
        })}
      </div>
    </section>
    <VideoModal videos={selection?.videos ?? null} index={selection?.index ?? 0} onIndexChange={index => setSelection(previous => previous ? { ...previous, index } : previous)} onClose={() => setSelection(null)} aspect="landscape" />
  </div>;
}

import ScribblePlay from '@/components/ui/ScribblePlay';
import { ArrowDown, ArrowUpRight, Pause } from 'lucide-react';
import { motion, useMotionValue } from 'motion/react';
import { useRef, useState, type CSSProperties, type RefObject } from 'react';

const cards = [
  { src: '/web/project-2.webp', label: 'PageByPage website', left: 7, top: 8, width: 40, ratio: '16/10', rotate: -8 },
  { src: '/data/project-1.webp', label: 'Data dashboard', left: 58, top: 6, width: 33, ratio: '4/3', rotate: 7 },
  { src: '/motion/project-asahi-1.webp', label: 'Asahi motion design', left: 35, top: 29, width: 30, ratio: '1', rotate: -5 },
  { src: '/shortform/project-pocari-1.webp', label: 'Pocari Sweat video', left: 75, top: 32, width: 19, ratio: '9/16', rotate: 9 },
  { src: '/graphic/booklet-2-1.webp', label: 'Kirana Energy booklet', left: 4, top: 41, width: 26, ratio: '3/4', rotate: 5 },
  { src: '/web/project-1.webp', label: 'Benzwood website', left: 35, top: 65, width: 42, ratio: '16/10', rotate: -6 },
  { src: '/motion/project-sats-3.webp', label: 'SATS motion design', left: 4, top: 78, width: 27, ratio: '16/9', rotate: -9 },
];

function FloatingCard({ card, index, bounds, onRaise, zIndex }: {
  card: typeof cards[number]; index: number; bounds: RefObject<HTMLDivElement>;
  onRaise: () => void; zIndex: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const node = useRef<HTMLButtonElement>(null);
  return <motion.button
    ref={node}
    type="button"
    className="floating-card"
    drag
    dragConstraints={bounds}
    dragMomentum={false}
    dragElastic={0}
    style={{ left: `${card.left}%`, top: `${card.top}%`, width: `${card.width}%`, x, y, zIndex }}
    onPointerDown={onRaise}
    onFocus={onRaise}
    aria-label={`Move ${card.label} preview`}
    aria-describedby="float-instructions"
    onKeyDown={event => {
      if (event.key === 'Escape' || event.key === 'Enter') {
        event.preventDefault(); x.set(0); y.set(0); return;
      }
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
      event.preventDefault();
      const frame = bounds.current;
      const element = node.current;
      if (!frame || !element) return;
      const step = event.shiftKey ? 32 : 12;
      const dx = event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0;
      const dy = event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0;
      x.set(Math.max(-element.offsetLeft + 10, Math.min(frame.clientWidth - element.offsetLeft - element.offsetWidth - 10, x.get() + dx)));
      y.set(Math.max(-element.offsetTop + 10, Math.min(frame.clientHeight - element.offsetTop - element.offsetHeight - 10, y.get() + dy)));
    }}>
    <span className="floating-image" style={{ aspectRatio: card.ratio, '--card-angle': `${card.rotate}deg`, '--float-duration': `${8 + index * 1.3}s`, '--float-delay': `-${index * 1.7}s` } as CSSProperties}>
      <img src={card.src} alt="" draggable={false} width="800" height="600" fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" />
    </span>
  </motion.button>;
}

export default function Hero() {
  const bounds = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [order, setOrder] = useState(cards.map((_, index) => index));
  return <section className="home-hero section-shell" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="status-dot" /> Hi, I’m Gofi.</p>
      <h1 id="hero-title">Turning ideas<br />into <span>digital<br />experiences.</span></h1>
      <p className="hero-intro">I build, design, and bring things to life in digital. From websites and data to visuals and motion, I connect the dots from the first idea to the final experience.</p>
      <div className="button-row">
        <a href="#work" className="button">Explore my work <ArrowDown size={18} /></a>
        <a href="/contact" className="text-link">Let’s work together <ArrowUpRight size={18} /></a>
      </div>
      <div className="hero-note"><span>Development</span><span>Design & motion</span><span>Data & insights</span></div>
    </div>
    <div className={`hero-playground ${paused ? 'is-paused' : ''}`}>
      <div className="hero-art-heading"><span>A glimpse into my digital world</span><button className="float-toggle" aria-label={paused ? 'Resume floating images' : 'Pause floating images'} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <ScribblePlay size={20} /> : <Pause size={14} />}<span>{paused ? 'Resume' : 'Pause'}</span></button></div>
      <div ref={bounds} className="floating-stage">
        {cards.map((card, index) => <FloatingCard key={card.src} card={card} index={index} bounds={bounds} zIndex={order.indexOf(index) + 1} onRaise={() => setOrder(previous => previous[previous.length - 1] === index ? previous : [...previous.filter(value => value !== index), index])} />)}
      </div>
      <p id="float-instructions" className="float-instructions">Drag a little. Explore a lot.<span className="sr-only"> Focus a preview and use arrow keys to move it. Press Enter or Escape to reset its position.</span></p>
    </div>
  </section>;
}

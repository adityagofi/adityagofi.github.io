import { motion } from 'motion/react';
import { useRef } from 'react';
import ScribblePlay from './ScribblePlay';

type Video = { id: string; thumbnail: string };

export default function MotionVideoSlider({ videos, client, current, onSelect, onPlay }: {
  videos: Video[]; client: string; current: number;
  onSelect: (index: number) => void; onPlay: (index: number) => void;
}) {
  const dragged = useRef(false);
  const multiple = videos.length > 1;
  const visible = multiple ? [-1, 0, 1] : [0];
  return <>
    <motion.div className={`motion-triplet ${multiple ? '' : 'is-single'}`}
      role="group" aria-roledescription="carousel" aria-label={`${client} films. Drag or use arrow keys to browse.`}
      tabIndex={multiple ? 0 : undefined}
      drag={multiple ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.1} dragMomentum={false}
      onPointerDown={() => { dragged.current = false; }}
      onDragStart={() => { dragged.current = true; }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 35 || Math.abs(info.velocity.x) > 350) onSelect(current + (info.offset.x < 0 ? 1 : -1));
      }}
      onKeyDown={event => {
        if (!multiple || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        onSelect(current + (event.key === 'ArrowRight' ? 1 : -1));
      }}>
      {visible.map(position => {
        const index = (current + position + videos.length) % videos.length;
        const active = position === 0;
        return <motion.button key={videos[index].id} type="button"
          className={`motion-featured-video motion-triplet-card ${active ? 'is-active' : 'is-side'}`}
          initial={false}
          animate={{ x: `${position * 43}%`, y: '-50%', scale: active ? 1 : 0.76, rotate: position * 7, opacity: active ? 1 : 0.5 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{ zIndex: active ? 3 : 1 }}
          aria-label={active ? `Play ${client} video ${index + 1}` : `Select ${position < 0 ? 'previous' : 'next'} ${client} video ${index + 1}`}
          onClick={() => { if (!dragged.current) { if (active) onPlay(index); else onSelect(index); } }}
          onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') dragged.current = false; }}>
          <img src={videos[index].thumbnail} alt="" width="1280" height="720" loading="lazy" decoding="async" draggable={false} />
          {active && <><span className="motion-play"><ScribblePlay size={44} /></span><span className="motion-play-caption">Watch film <span>{String(index + 1).padStart(2, '0')}</span></span></>}
        </motion.button>;
      })}
    </motion.div>
    {multiple && <p className="motion-swipe-hint">Drag to explore · Click the center to play</p>}
  </>;
}

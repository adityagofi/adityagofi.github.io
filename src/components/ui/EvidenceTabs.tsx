import { ArrowUpRight } from 'lucide-react';
import { useId, useState } from 'react';

export type EvidenceItem = { label: string; src: string; width: number; height: number; alt: string; caption: string };

/** Tabbed screenshot viewer: one image at a time keeps long proof galleries short. */
export default function EvidenceTabs({ items, label }: { items: EvidenceItem[]; label: string }) {
  const [index, setIndex] = useState(0);
  const id = useId();
  const item = items[index];
  return (
    <div data-reveal>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2 mb-4">
        {items.map((tab, i) => (
          <button key={tab.label} type="button" role="tab" id={`${id}-tab-${i}`} aria-selected={i === index} aria-controls={`${id}-panel`}
            onClick={() => setIndex(i)}
            className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${i === index ? 'bg-orange-500 border-orange-500 text-black' : 'border-white/70 text-white hover:bg-white hover:text-black'}`}>
            {tab.label}
          </button>
        ))}
      </div>
      <figure id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`}>
        <a href={item.src} target="_blank" rel="noreferrer" className="flex justify-center rounded-2xl">
          <img loading="lazy" decoding="async" src={item.src} alt={item.alt} width={item.width} height={item.height} className="w-auto h-auto max-w-full max-h-[70vh] rounded-2xl border border-white/10 hover:border-orange-500/60 transition-colors" />
        </a>
        <figcaption className="mt-3 flex items-start justify-between gap-4 text-sm text-white/50">
          <span>{item.caption}</span>
          <a href={item.src} target="_blank" rel="noreferrer" className="shrink-0 inline-flex items-center gap-1 text-orange-500 hover:text-orange-400">Full size <ArrowUpRight size={14} /></a>
        </figcaption>
      </figure>
    </div>
  );
}

import type { CSSProperties, ReactNode } from 'react';

/* Contemporary collage kit: hand-drawn doodles, sticker frames, tool chips and swatches.
   All shapes are drawn here as SVG, so no third-party artwork is used. */

export const COLLAGE_COLORS = {
  orange: '#ff6a00',
  violet: '#7b6cf6',
  green: '#2f9e6b',
  yellow: '#ffb020',
  pink: '#ff5d8f',
  white: '#f5f3ed',
};

export type DoodleKind = 'burst' | 'sparkle' | 'squiggle' | 'asterisk' | 'arrow' | 'flower' | 'circle' | 'smile' | 'plus' | 'blob'
  | 'zigzag' | 'spiral' | 'heart' | 'star' | 'scribble' | 'dots' | 'lightning' | 'triangle' | 'loop' | 'dot';

function scallopPath(points = 12, outer = 46, inner = 38) {
  const step = (Math.PI * 2) / points;
  let d = '';
  for (let i = 0; i < points; i++) {
    const a = i * step, mid = a + step / 2, b = a + step;
    const p = (r: number, t: number) => `${(50 + r * Math.cos(t)).toFixed(2)} ${(50 + r * Math.sin(t)).toFixed(2)}`;
    d += i === 0 ? `M ${p(inner, a)} ` : '';
    d += `Q ${p(outer + 8, mid)} ${p(inner, b)} `;
  }
  return d + 'Z';
}

const BURST = scallopPath();

export function Doodle({ kind, color = COLLAGE_COLORS.orange, size = 64, className = '', style }: { kind: DoodleKind; color?: string; size?: number; className?: string; style?: CSSProperties }) {
  const common = { width: size, height: size, viewBox: '0 0 100 100', className, style, 'aria-hidden': true as const, focusable: 'false' as const };
  const stroke = { fill: 'none', stroke: color, strokeWidth: 7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (kind) {
    case 'burst':
      return <svg {...common}><path d={BURST} fill={color} /><circle cx="50" cy="50" r="13" fill="#121212" opacity=".18" /></svg>;
    case 'sparkle':
      return <svg {...common}><path d="M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4Z" fill={color} /></svg>;
    case 'squiggle':
      return <svg {...common}><path d="M6 60 C18 30 30 30 38 55 S58 82 66 52 S86 22 94 44" {...stroke} /></svg>;
    case 'asterisk':
      return <svg {...common}><g {...stroke} strokeWidth={10}><path d="M50 10 V90" /><path d="M15 30 L85 70" /><path d="M85 30 L15 70" /></g></svg>;
    case 'arrow':
      return <svg {...common}><g {...stroke}><path d="M10 78 C26 30 58 20 84 34" /><path d="M70 20 L86 35 L66 46" /></g></svg>;
    case 'flower':
      return <svg {...common}><g fill={color}>{[0, 72, 144, 216, 288].map((r) => <circle key={r} cx={50 + 22 * Math.cos((r * Math.PI) / 180)} cy={50 + 22 * Math.sin((r * Math.PI) / 180)} r="20" />)}</g><circle cx="50" cy="50" r="12" fill="#121212" opacity=".22" /></svg>;
    case 'circle':
      return <svg {...common}><path d="M78 26 C60 6 18 14 12 46 C6 80 52 96 80 76 C98 62 92 30 64 20" {...stroke} strokeWidth={5} /></svg>;
    case 'smile':
      return <svg {...common}><g {...stroke}><circle cx="36" cy="38" r="1.5" /><circle cx="64" cy="38" r="1.5" /><path d="M28 60 C40 76 62 76 74 58" /></g></svg>;
    case 'plus':
      return <svg {...common}><g {...stroke} strokeWidth={12}><path d="M50 18 V82" /><path d="M18 50 H82" /></g></svg>;
    case 'blob':
      return <svg {...common}><path d="M52 8 C78 8 94 28 90 54 C86 82 60 96 36 88 C12 80 4 56 12 34 C18 18 34 8 52 8Z" fill={color} /></svg>;
    case 'zigzag':
      return <svg {...common}><path d="M6 64 L20 38 L34 64 L48 38 L62 64 L76 38 L94 64" {...stroke} /></svg>;
    case 'spiral':
      return <svg {...common}><path d="M52 50 C52 44 60 44 60 52 C60 62 44 64 42 52 C40 36 64 32 70 50 C76 70 46 80 34 66 C20 50 30 22 56 20 C80 18 92 42 86 62" {...stroke} strokeWidth={5} /></svg>;
    case 'heart':
      return <svg {...common}><path d="M50 86 C20 64 8 46 14 30 C20 14 42 14 50 32 C58 14 80 14 86 30 C92 46 80 64 50 86Z" fill={color} /></svg>;
    case 'star':
      return <svg {...common}><path d="M50 6 L61 37 L94 38 L68 58 L77 90 L50 71 L23 90 L32 58 L6 38 L39 37Z" fill={color} /></svg>;
    case 'scribble':
      return <svg {...common}><path d="M8 58 C20 30 34 74 44 46 C52 22 30 30 40 54 C50 78 70 20 76 46 C82 70 60 66 70 44 C78 28 92 40 92 52" {...stroke} strokeWidth={5} /></svg>;
    case 'dots':
      return <svg {...common}><g fill={color}>{[[20, 22], [50, 18], [80, 26], [28, 52], [62, 50], [86, 58], [18, 80], [48, 84], [76, 82]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="7" />)}</g></svg>;
    case 'lightning':
      return <svg {...common}><path d="M58 4 L22 56 L46 56 L38 96 L80 38 L54 38Z" fill={color} /></svg>;
    case 'triangle':
      return <svg {...common}><path d="M50 12 L90 84 L10 84Z" {...stroke} strokeWidth={8} /></svg>;
    case 'loop':
      return <svg {...common}><path d="M6 70 C24 70 30 30 46 30 C62 30 58 62 44 60 C30 58 40 24 62 26 C80 28 82 60 96 54" {...stroke} strokeWidth={6} /></svg>;
    case 'dot':
      return <svg {...common}><circle cx="50" cy="50" r="40" fill={color} /></svg>;
  }
}

export type FloatingItem = {
  kind: DoodleKind;
  color?: string;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate?: number;
  delay?: number;
  /** Hide on narrow screens so the content keeps room. */
  desktopOnly?: boolean;
  /** Draw above the content instead of behind it. */
  front?: boolean;
};

const SCATTER_KINDS: DoodleKind[] = ['sparkle', 'zigzag', 'dot', 'heart', 'scribble', 'star', 'spiral', 'dots', 'lightning', 'triangle', 'loop', 'plus', 'asterisk', 'squiggle', 'circle'];
const SCATTER_COLORS = [COLLAGE_COLORS.orange, COLLAGE_COLORS.violet, COLLAGE_COLORS.green, COLLAGE_COLORS.yellow, COLLAGE_COLORS.pink, COLLAGE_COLORS.white];

export type ScatterOptions = {
  seed: number;
  count: number;
  /** Section opens with a left-aligned heading: keep the top band clear except at the far right. */
  heading?: boolean;
  /** Horizontal range (in %) with no text, where doodles may sit away from the edges. */
  free?: [number, number];
  /** Height of the heading band in % of the section (default 32). */
  band?: number;
  /** Allow small pieces on top of the content (only where the content is imagery, not text). */
  front?: boolean;
};

/** Deterministic pseudo-random doodle confetti: the same seed gives the same layout on server and client. */
export function scatterDoodles({ seed, count, heading = true, free = [0, 94], band = 32, front: allowFront = true }: ScatterOptions): FloatingItem[] {
  let state = seed * 9301 + 49297;
  const rand = () => { state = (state * 9301 + 49297) % 233280; return state / 233280; };
  return Array.from({ length: count }, (_, i) => {
    const kind = SCATTER_KINDS[Math.floor(rand() * SCATTER_KINDS.length)];
    const small = kind === 'dot' || kind === 'plus' || kind === 'sparkle' || kind === 'star' || kind === 'heart';
    let top = rand() * 92;
    const zone = rand();
    let x: number;
    if (heading && top < band) {
      // Heading band: far-right edge, or high up on the open right side above the tool chips.
      if (zone < 0.6) x = 95 + rand() * 3.5;
      else { x = 64 + rand() * 24; top = rand() * band * 0.38; }
    } else {
      x = zone < 0.2 ? rand() * 3.5 : zone < 0.4 ? 95 + rand() * 3.5 : free[0] + rand() * (free[1] - free[0]);
    }
    const nearEdge = x < 4 || x > 94;
    const size = Math.round(small ? 14 + rand() * 22 : 34 + rand() * 40);
    // Some small pieces sit on top of the work, like stickers stuck onto the prints.
    const front = allowFront && !(heading && top < band) && small && rand() < 0.55;
    return {
      kind,
      color: SCATTER_COLORS[(i + Math.floor(rand() * 6)) % SCATTER_COLORS.length],
      size,
      top: `${top.toFixed(1)}%`,
      left: `${x.toFixed(1)}%`,
      rotate: Math.round(rand() * 60 - 30),
      delay: +(rand() * 4).toFixed(2),
      desktopOnly: !(small && nearEdge),
      front,
    };
  });
}

const CORNER_KINDS: DoodleKind[] = ['burst', 'flower', 'star', 'sparkle', 'heart', 'lightning', 'blob', 'asterisk', 'smile', 'spiral'];

/** Three or four doodles peeking out from the corners of a card, drawn in front like stuck-on stickers. */
export function cornerDoodles(seed: number): FloatingItem[] {
  let state = seed * 7919 + 104729;
  const rand = () => { state = (state * 9301 + 49297) % 233280; return state / 233280; };
  const pick = <T,>(list: T[]) => list[Math.floor(rand() * list.length)];
  const spots: Partial<FloatingItem>[] = [
    { top: '-22px', right: '-14px' },
    { bottom: '-20px', left: '-12px' },
    { top: '38%', left: '-18px' },
    { bottom: '-16px', right: '18%' },
  ];
  return spots.slice(0, 3 + Math.round(rand())).map((spot, i) => ({
    ...spot,
    kind: pick(CORNER_KINDS),
    color: SCATTER_COLORS[(seed + i * 2) % (SCATTER_COLORS.length - 1)],
    size: Math.round(36 + rand() * 26),
    rotate: Math.round(rand() * 40 - 20),
    delay: +(rand() * 3).toFixed(2),
    front: true,
    desktopOnly: i > 1,
  }));
}

/** Absolutely positioned doodles drifting slowly behind the content. */
export function FloatingDoodles({ items = [], scatter, spill = false }: { items?: FloatingItem[]; scatter?: ScatterOptions; spill?: boolean }) {
  const all = scatter ? [...items, ...scatterDoodles(scatter)] : items;
  const layer = (list: FloatingItem[], front: boolean) => (
    <div className={`collage-doodles${front ? ' collage-front' : ''}${spill ? ' collage-spill' : ''}`} aria-hidden="true">
      {list.map((item, i) => (
        <span key={i} className={`collage-doodle${item.desktopOnly ? ' collage-desktop-only' : ''}`}
          style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, '--tilt': `${item.rotate ?? 0}deg`, '--delay': `${item.delay ?? i * 0.7}s` } as CSSProperties}>
          <Doodle kind={item.kind} color={item.color} size={item.size} />
        </span>
      ))}
    </div>
  );
  return <>{layer(all.filter((item) => !item.front), false)}{layer(all.filter((item) => item.front), true)}</>;
}

export const TOOL_LOGOS: Record<string, { bg: string; fg: string; label: string }> = {
  "After Effects": { bg: "#00005B", fg: "#D8A8FF", label: "Ae" },
  "Premiere Pro": { bg: "#1F0033", fg: "#EA77FF", label: "Pr" },
  "Adobe Illustrator": { bg: "#330000", fg: "#FF9A00", label: "Ai" },
  "Photoshop": { bg: "#001E36", fg: "#31A8FF", label: "Ps" },
  "InDesign": { bg: "#49021F", fg: "#FF3366", label: "Id" },
  "Lightroom": { bg: "#001E36", fg: "#31A8FF", label: "Lr" },
  "Audition": { bg: "#00081C", fg: "#9999FF", label: "Au" },
  "Cinema 4D": { bg: "#011A6B", fg: "#F4F8FC", label: "C4D" },
  "Figma": { bg: "#0A0A0A", fg: "#FFFFFF", label: "Fg" },
};

export const toolTile = (tool: string) =>
  TOOL_LOGOS[tool.trim()] ?? { bg: "#1A1A1A", fg: "#FFFFFF", label: tool.trim().slice(0, 2) };

/** "Tools I used :)" row of small app tiles. */
export function ToolChips({ tools, label = "Tools I used :)" }: { tools: string[]; label?: string }) {
  return (
    <div>
      <p className="handwritten text-lg text-white mb-2">{label}</p>
      <ul className="flex flex-wrap gap-2" aria-label="Tools">
        {tools.map((tool) => {
          const tile = toolTile(tool);
          return (
            <li key={tool} title={tool.trim()} className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm border-2 shadow-[3px_3px_0_#00000080]"
              style={{ backgroundColor: tile.bg, color: tile.fg, borderColor: tile.fg }}>
              <span aria-hidden="true">{tile.label}</span><span className="sr-only">{tool.trim()}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Brand colour dots, like a printed swatch strip. */
export function Swatches({ colors, label = "Palette" }: { colors: string[]; label?: string }) {
  return (
    <div>
      <p className="handwritten text-lg text-white mb-2">{label}</p>
      <ul className="flex gap-1.5" aria-label={`${label}: ${colors.join(', ')}`}>
        {colors.map((c) => <li key={c} className="w-6 h-6 rounded-md border-2 border-white" style={{ backgroundColor: c }} />)}
      </ul>
    </div>
  );
}

/** Loose marker stroke drawn under a title. */
export function MarkerScribble({ className = '', color = COLLAGE_COLORS.orange }: { className?: string; color?: string }) {
  return (
    <svg className={`block w-44 md:w-64 h-5 md:h-6 ${className}`} viewBox="0 0 260 24" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path d="M4 14 C40 6 80 18 120 10 S200 4 256 12" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <path d="M30 20 C80 14 150 22 230 16" stroke={COLLAGE_COLORS.yellow} strokeWidth="3" strokeLinecap="round" opacity=".8" />
    </svg>
  );
}

/** Section opener in the collage style: handwritten project label, big title, copy and extras. */
export function CollageHeading({ index, kicker, title, children, aside, align = 'left' }: { index: string; kicker: string; title: ReactNode; children?: ReactNode; aside?: ReactNode; align?: 'left' | 'center' }) {
  return (
    <div data-reveal className={`relative z-10 mb-10 md:mb-14 grid gap-8 ${aside ? 'lg:grid-cols-[1.4fr_1fr] lg:items-end' : ''} ${align === 'center' ? 'text-center justify-items-center' : ''}`}>
      <div>
        <p className="handwritten text-xl md:text-2xl text-orange-500 mb-2">Project {index} <span className="text-white">/ {kicker}</span></p>
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-1">{title}</h2>
        <MarkerScribble className={`mb-5 ${align === 'center' ? 'mx-auto' : ''}`} />
        {children && <div className={`text-white/70 text-base md:text-lg leading-relaxed max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>{children}</div>}
      </div>
      {aside && <div className="flex flex-wrap gap-6 lg:justify-end">{aside}</div>}
    </div>
  );
}

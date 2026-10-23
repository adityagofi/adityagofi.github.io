import { useEffect, useRef } from 'react';

/** Soft orange light that trails the mouse. Fine pointers only; hidden for touch and reduced motion. */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;

    let targetX = window.innerWidth / 2, targetY = window.innerHeight / 3;
    let x = targetX, y = targetY, frame = 0;
    const tick = () => {
      // Ease towards the pointer so the light lags slightly behind it.
      x += (targetX - x) * 0.14;
      y += (targetY - y) * 0.14;
      el.style.setProperty('--glow-x', `${x.toFixed(1)}px`);
      el.style.setProperty('--glow-y', `${y.toFixed(1)}px`);
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      el.classList.add('is-active');
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const leave = () => el.classList.remove('is-active');
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

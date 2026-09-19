import { useEffect } from 'react';

/** Progressive enhancement: server-rendered content stays visible without JS. */
export default function PageMotion({ page }: { page: string }) {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;
    const selector = '[data-reveal], main section, .portfolio-card, .motion-case, .service-card, .contact-option, .contact-details, .project-next, .site-footer';
    const elements = [...document.querySelectorAll<HTMLElement>(selector)];
    const pending = new Set<HTMLElement>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.classList.remove('reveal-ready');
        element.classList.add('reveal-enter');
        observer.unobserve(element);
        pending.delete(element);
      });
    }, { threshold: 0, rootMargin: '0px 0px 36px 0px' });
    elements.forEach(element => {
      if (element.getBoundingClientRect().top < window.innerHeight) return;
      element.classList.add('reveal-ready');
      pending.add(element);
      observer.observe(element);
    });
    const revealFocus = (event: FocusEvent) => {
      pending.forEach(element => {
        if (element.contains(event.target as Node)) {
          element.classList.remove('reveal-ready');
          observer.unobserve(element);
          pending.delete(element);
        }
      });
    };
    const stop = () => {
      observer.disconnect();
      elements.forEach(element => element.classList.remove('reveal-ready', 'reveal-enter'));
    };
    document.addEventListener('focusin', revealFocus);
    preference.addEventListener('change', stop);
    return () => {
      stop();
      document.removeEventListener('focusin', revealFocus);
      preference.removeEventListener('change', stop);
    };
  }, [page]);
  return null;
}

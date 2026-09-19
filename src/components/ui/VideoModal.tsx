import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

type VideoModalProps = {
  videos: string[] | null;
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  aspect?: 'landscape' | 'portrait';
};
const baseVideoId = (id: string) => id.split('?')[0].split('&')[0];

export default function VideoModal({ videos, index, onIndexChange, onClose, aspect = 'landscape' }: VideoModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const isOpen = !!videos?.length;
  const currentIndex = videos?.length ? Math.max(0, Math.min(index, videos.length - 1)) : 0;
  const video = videos?.[currentIndex];
  useEffect(() => {
    const element = dialog.current;
    if (!element || !isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [isOpen]);
  const move = (direction: number) => {
    if (videos?.length) onIndexChange((currentIndex + direction + videos.length) % videos.length);
  };
  return <dialog ref={dialog} className={`video-dialog ${aspect === 'portrait' ? 'video-portrait' : ''}`} aria-labelledby="video-dialog-title"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    }}>
    {isOpen && video && <div className="video-dialog-content">
      <div className="video-dialog-toolbar"><h2 id="video-dialog-title">Portfolio video <span aria-live="polite">{currentIndex + 1} / {videos.length}</span></h2><button ref={closeButton} onClick={onClose} aria-label="Close video"><X size={22} /></button></div>
      <div className="video-frame"><iframe key={video} src={`https://www.youtube-nocookie.com/embed/${baseVideoId(video)}?autoplay=1&rel=0`} title={`Portfolio video ${currentIndex + 1} of ${videos.length}`} allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
      <div className="video-dialog-footer">{videos.length > 1 && <button onClick={() => move(-1)} aria-label="Previous video"><ArrowLeft size={18} /> Previous</button>}<a href={`https://www.youtube.com/watch?v=${baseVideoId(video)}`} target="_blank" rel="noopener noreferrer">Watch on YouTube <ExternalLink size={14} /></a>{videos.length > 1 && <button onClick={() => move(1)} aria-label="Next video">Next <ArrowRight size={18} /></button>}</div>
    </div>}
  </dialog>;
}

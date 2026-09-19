import { CONTACT } from '@/lib/site';
import { ArrowUpRight } from 'lucide-react';
export default function Footer({ currentView }: { currentView: string }) {
  return <footer className="site-footer section-shell">
    {currentView !== 'contact' && <div className="footer-cta"><div><p className="eyebrow">Have something in mind?</p><h2>Let’s make<br /><span>something great.</span></h2></div><div><p>A brand, a story, or a digital experience.<br />Let’s find the right way to bring it to life.</p><a href="/contact" className="button">Start a conversation <ArrowUpRight size={18} /></a></div></div>}
    <div className="footer-bottom"><a href="/" className="wordmark" aria-label="Gofi — home">gofi<span>.</span></a><p>© {new Date().getFullYear()} {CONTACT.name}</p><nav aria-label="Footer navigation"><a href="/#work">Work</a><a href="/services">Services</a><a href="/contact">Contact</a><a href="https://www.linkedin.com/in/adityagofi/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={13} /></a></nav><a href="#main-content" className="back-to-top">Back to top ↑</a></div>
  </footer>;
}

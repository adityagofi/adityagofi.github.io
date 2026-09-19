import { CONTACT } from '@/lib/site';
import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react';
export default function Contact() {
  return <section className="section-shell" aria-labelledby="contact-title"><header className="page-intro"><p className="eyebrow">Let’s collaborate</p><h1 id="contact-title">Good work starts<br /><span className="muted">with a conversation.</span></h1><p>Have a project in mind? Tell me what you’re working on and where you need a hand. We’ll work out the next steps together.</p></header>
    <div className="contact-grid"><div className="contact-options">
      <a className="contact-option" href={`mailto:${CONTACT.email}`}><Mail size={25} /><div><small>Email me</small><strong>{CONTACT.email}</strong></div><ArrowUpRight size={20} className="ml-auto" /></a>
      <a className="contact-option" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={25} /><div><small>Chat on WhatsApp</small><strong>+62 822 3612 7366</strong></div><ArrowUpRight size={20} className="ml-auto" /></a>
      <p className="text-sm text-white/60 flex items-center gap-2 mt-4"><MapPin size={17} />{CONTACT.location}</p>
      <div className="contact-socials">{[['Instagram','https://www.instagram.com/adityagofi_/'],['LinkedIn','https://www.linkedin.com/in/adityagofi/'],['Behance','https://www.behance.net/adityagofi'],['GitHub','https://github.com/adityagofi']].map(([label,url]) => <a className="text-link" href={url} key={label} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight size={14}/></a>)}</div>
    </div><div className="contact-details"><h2>A little context goes a long way.</h2><p>Your brief doesn’t need to be perfect. A few details will help get the conversation started:</p><ul><li>What you’re building and who it’s for</li><li>The kind of digital work you need help with</li><li>Your ideal timeline and budget range</li></ul><p>Still exploring? Share your idea and we can figure out the scope together.</p></div></div>
  </section>;
}

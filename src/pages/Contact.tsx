import { motion } from 'motion/react';
import { Send, Mail, MapPin, Phone, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBehance } from '@fortawesome/free-brands-svg-icons';
import { heroEnterDelay } from '@/lib/animations';

export default function Contact() {
  return (
    <section id="contact-page" className="pt-40 pb-48 bg-[#121212] min-h-screen selection:bg-orange-500">
      <div className="max-w-7xl mx-auto px-6 md:px-18">
        <div className="max-w-4xl">
          
          <motion.h1
            {...heroEnterDelay(0.1)}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-10 leading-[0.9] "
          >
            Let's build
            something <br />
            <span className="text-white/80">extraordinary.</span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <motion.div
              {...heroEnterDelay(0.25)}
            >
              <p className="text-white/50 text-xl leading-relaxed mb-12">
                I'm currently available for new projects and collaborations. If you have an idea that needs a blend of creative vision and technical precision, reach out.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Instagram, url: "https://www.instagram.com/adityagofi_/", label: "Instagram" },
                  { icon: Linkedin, url: "https://www.linkedin.com/in/adityagofi/", label: "LinkedIn" },
                  { icon: (props: any) => (
                    <FontAwesomeIcon icon={faBehance} style={{ width: props.size, height: props.size }} />
                  ), url: "https://www.behance.net/adityagofi", label: "Behance" },
                  { icon: Github, url: "https://github.com/adityagofi", label: "GitHub" },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300"
                  >
                    <social.icon size={18} />
                    <span className="text-sm font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...heroEnterDelay(0.4)}
              className="space-y-12"
            >
              <div className="group">
                <div className="text-orange-500/40 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 group-hover:text-orange-500 transition-colors">Direct Email</div>
                <a href="mailto:gofisaputra4@gmail.com" className="text-2xl md:text-3xl text-white hover:text-orange-500 transition-all duration-300 block font-light">
                  gofisaputra4@gmail.com
                </a>
              </div>

              <div className="group">
                <div className="text-orange-500/40 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 group-hover:text-orange-500 transition-colors">Whatsapp / Call</div>
                <a href="http://wa.me/6282236127366" target="_blank" rel="noopener noreferrer" className="text-2xl md:text-3xl text-white hover:text-orange-500 transition-all duration-300 block font-light">
                  +62 822 3612 7366
                </a>
              </div>

              <div>
                <div className="text-orange-500/40 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Base Location</div>
                <div className="text-2xl text-white/70 font-light flex items-center gap-3">
                   <MapPin size={20} className="text-orange-500/50" />
                   South Jakarta, Indonesia
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { useLenis } from '../hooks/useLenis';
import { ArrowUp, Mail, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const { scrollTo } = useLenis();

  const handleBackToTop = (e) => {
    e.preventDefault();
    scrollTo(0);
  };

  return (
    <footer className="relative bg-black border-t border-white/[0.08] py-16 px-6 md:px-12 text-brand-muted">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Tier: Identity & Back to Top */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.06] pb-12">
          <div className="space-y-3">
            <div className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-brand-text flex items-center gap-2">
              <span>{personalInfo.name}</span>
              <span className="text-accent text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10">
                PRO
              </span>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              {personalInfo.role}
            </p>
            <p className="font-mono text-xs text-brand-dim">
              {personalInfo.location}
            </p>
          </div>

          <button
            type="button"
            onClick={handleBackToTop}
            className="self-start md:self-auto flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/10 hover:border-accent hover:bg-accent/10 hover:text-white hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:-translate-y-1 text-xs font-mono uppercase tracking-widest transition-all duration-300 group active:scale-95"
            aria-label="Scroll back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} className="group-hover:-translate-y-1.5 transition-transform text-accent group-hover:scale-125 duration-300" />
          </button>
        </div>

        {/* Bottom Tier: Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`mailto:${personalInfo.email}`}
              className="group/flink relative py-1 text-brand-muted hover:text-white transition-colors flex items-center gap-1.5 hover:-translate-y-0.5 duration-200"
            >
              <Mail size={13} className="text-accent group-hover/flink:scale-110 transition-transform" />
              <span>{personalInfo.email}</span>
              <span className="absolute bottom-0 left-0 w-0 group-hover/flink:w-full h-[1px] bg-accent transition-all duration-300 shadow-[0_0_6px_#38BDF8]" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group/flink relative py-1 text-brand-muted hover:text-white transition-colors flex items-center gap-1.5 hover:-translate-y-0.5 duration-200"
            >
              <Linkedin size={13} className="text-accent group-hover/flink:scale-110 transition-transform" />
              <span>LinkedIn</span>
              <span className="absolute bottom-0 left-0 w-0 group-hover/flink:w-full h-[1px] bg-accent transition-all duration-300 shadow-[0_0_6px_#38BDF8]" />
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/flink relative py-1 text-brand-muted hover:text-white transition-colors flex items-center gap-1.5 hover:-translate-y-0.5 duration-200"
            >
              <Github size={13} className="text-accent group-hover/flink:scale-110 transition-transform" />
              <span>GitHub</span>
              <span className="absolute bottom-0 left-0 w-0 group-hover/flink:w-full h-[1px] bg-accent transition-all duration-300 shadow-[0_0_6px_#38BDF8]" />
            </a>
          </div>

          <div className="text-brand-dim text-center sm:text-right">
            © 2026 JARIR MULTANI. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}

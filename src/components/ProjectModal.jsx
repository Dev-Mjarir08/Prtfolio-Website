import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function ProjectModal({ project, isOpen, onClose }) {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Stop Lenis from intercepting scroll events
      if (window.__lenis) {
        window.__lenis.stop();
      }

      const tl = gsap.timeline();
      tl.to(modalRef.current, { display: 'flex', duration: 0 })
        .to(backdropRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' })
        .fromTo(
          contentRef.current,
          { y: 30, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' },
          '-=0.1'
        );
    } else {
      document.body.style.overflow = '';
      // Resume Lenis smooth scroll
      if (window.__lenis) {
        window.__lenis.start();
      }

      const tl = gsap.timeline({
        onComplete: () => {
          if (modalRef.current) gsap.set(modalRef.current, { display: 'none' });
        }
      });
      tl.to(contentRef.current, { y: 20, opacity: 0, scale: 0.98, duration: 0.2, ease: 'power2.in' })
        .to(backdropRef.current, { opacity: 0, duration: 0.15 }, '-=0.1');
    }

    return () => {
      document.body.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <div
      ref={modalRef}
      data-lenis-prevent="true"
      className="fixed inset-0 z-[9990] hidden items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md opacity-0 transition-opacity"
      />

      {/* Modal Container */}
      <div
        ref={contentRef}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[85vh] bg-surface-elevated border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 overflow-y-auto z-10 shadow-2xl shadow-black/80 my-auto overscroll-contain focus:outline-none"
        tabIndex={-1}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-semibold text-accent uppercase tracking-widest">
                PROJECT {project.number}
              </span>
              {project.badges?.map((badge, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.08] text-brand-text border border-white/10"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h2
              id="modal-title"
              className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white uppercase"
            >
              {project.title}
            </h2>
            <p className="font-mono text-xs text-brand-dim mt-1">
              {project.category}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-brand-muted hover:text-white hover:border-white/30 hover:bg-white/10 transition-colors"
            aria-label="Close Project Details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Overview Description */}
        <div className="space-y-6">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-dim mb-2 font-semibold">
              OVERVIEW
            </h3>
            <p className="text-brand-text text-sm sm:text-base leading-relaxed">
              {project.extendedDescription || project.description}
            </p>
          </div>

          {/* Key Architecture Highlights */}
          {project.highlights && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-brand-dim mb-3 font-semibold">
                SYSTEM HIGHLIGHTS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3.5 rounded-lg bg-surface-card border border-white/[0.06]"
                  >
                    <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-xs text-brand-muted leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-dim mb-3 font-semibold">
              TECH STACK & TOOLS
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/10 text-brand-text"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-4">
            <MagneticButton
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              icon={<Github size={15} />}
            >
              SOURCE CODE
            </MagneticButton>

            <MagneticButton
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              icon={<ExternalLink size={15} />}
            >
              LIVE EXPERIENCE
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}

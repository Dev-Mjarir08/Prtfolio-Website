import React, { useState, useRef, useEffect } from 'react';
import { sendContactEmail } from '../services/emailService';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data/portfolioData';
import {
  Mail,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const headlineRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');

    if (headlineLines && headlineLines.length > 0) {
      gsap.fromTo(
        headlineLines,
        { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          stagger: 0.12,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all fields before sending.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      await sendContactEmail({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      });

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Email dispatch error:', err);
      setStatus('error');
      setErrorMessage(
        err.message || 'Failed to dispatch email via EmailJS. Please verify your Service & Template IDs.'
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 bg-background border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              06 / GET IN TOUCH
            </span>
            <div className="h-[1px] w-12 bg-accent/40" />
          </div>
          <span className="font-mono text-xs text-brand-dim uppercase tracking-wider hidden sm:inline">
            DIRECT COMMUNICATION
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Monumental Typography & Direct Channels */}
          <div className="lg:col-span-6 space-y-10">
            <div ref={headlineRef} className="space-y-1">
              <div className="overflow-hidden">
                <h2 className="headline-line text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase tracking-tight text-brand-text leading-[0.95]">
                  LET'S BUILD
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="headline-line text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400 leading-[0.95]">
                  SOMETHING
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="headline-line text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase tracking-tight text-brand-text leading-[0.95] flex items-baseline gap-2">
                  GREAT<span className="text-accent">.</span>
                </h2>
              </div>
            </div>

            <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-md">
              Have a project, opportunity, or idea? I am actively available for full-time roles, full-stack contracts, and software engineering opportunities.
            </p>

            {/* Direct Channels Box */}
            <div className="space-y-4 pt-4">
              {/* Email Chip with Copy Button */}
              <div className="group/email p-4 rounded-xl bg-surface-card border border-white/[0.08] hover:border-accent/40 hover:shadow-[0_0_25px_rgba(56,189,248,0.1)] transition-all duration-300 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-lg bg-accent/10 text-accent shrink-0 group-hover/email:bg-accent group-hover/email:text-black group-hover/email:shadow-[0_0_12px_#38BDF8] transition-all duration-300">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase text-brand-dim group-hover/email:text-accent/80 transition-colors">
                      PRIMARY EMAIL
                    </div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="font-mono text-xs sm:text-sm text-brand-text hover:text-accent truncate block transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-accent hover:bg-accent hover:text-black hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] text-brand-muted active:scale-95 transition-all duration-300 flex items-center gap-1.5 font-mono text-xs shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400 font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Social Channels with Light Sweep and Hover Lift */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden p-4 rounded-xl bg-surface-card border border-white/[0.08] hover:border-accent/60 hover:bg-surface-elevated hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 pointer-events-none" />
                  <div className="flex items-center gap-2.5">
                    <Linkedin size={18} className="text-brand-muted group-hover:text-accent transition-colors" />
                    <div>
                      <div className="font-mono text-[10px] text-brand-dim uppercase">CONNECT</div>
                      <div className="font-mono text-xs text-brand-text font-semibold group-hover:text-white transition-colors">LINKEDIN</div>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-brand-dim group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden p-4 rounded-xl bg-surface-card border border-white/[0.08] hover:border-accent/60 hover:bg-surface-elevated hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 pointer-events-none" />
                  <div className="flex items-center gap-2.5">
                    <Github size={18} className="text-brand-muted group-hover:text-accent transition-colors" />
                    <div>
                      <div className="font-mono text-[10px] text-brand-dim uppercase">REPOSITORIES</div>
                      <div className="font-mono text-xs text-brand-text font-semibold group-hover:text-white transition-colors">GITHUB</div>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-brand-dim group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: EmailJS Contact Form */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-2xl sm:rounded-3xl bg-surface border border-white/[0.08] shadow-2xl shadow-black/60 relative">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-muted font-semibold">
                  SEND A DIRECT MESSAGE
                </span>
                <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-wider">
                  FAST RESPONSE
                </span>
              </div>

              {status === 'success' ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white uppercase">
                    MESSAGE RECEIVED
                  </h3>
                  <p className="text-sm text-brand-muted max-w-sm mx-auto font-mono">
                    Thank you for reaching out. Your message has been dispatched to <span className="text-white">{personalInfo.email}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-6 py-2.5 rounded-full bg-white/10 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {status === 'error' && (
                    <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
                      <AlertCircle size={16} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block font-mono text-[11px] uppercase tracking-widest text-brand-muted font-semibold"
                    >
                      NAME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-surface-card border border-white/[0.08] text-brand-text placeholder-brand-dim focus:outline-none focus:border-accent font-mono text-sm transition-colors"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block font-mono text-[11px] uppercase tracking-widest text-brand-muted font-semibold"
                    >
                      EMAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@example.com"
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-surface-card border border-white/[0.08] text-brand-text placeholder-brand-dim focus:outline-none focus:border-accent font-mono text-sm transition-colors"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block font-mono text-[11px] uppercase tracking-widest text-brand-muted font-semibold"
                    >
                      MESSAGE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project, team opportunity, or inquiry..."
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-surface-card border border-white/[0.08] text-brand-text placeholder-brand-dim focus:outline-none focus:border-accent font-mono text-sm transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group relative overflow-hidden w-full py-4 rounded-xl bg-white text-black font-mono text-xs uppercase tracking-widest font-extrabold hover:bg-accent hover:shadow-[0_0_30px_rgba(56,189,248,0.45)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {/* Beam sweep */}
                    <span className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 pointer-events-none" />

                    {status === 'sending' ? (
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        SENDING...
                      </span>
                    ) : (
                      <span className="relative z-10 flex items-center gap-2">
                        <span>SEND MESSAGE</span>
                        <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

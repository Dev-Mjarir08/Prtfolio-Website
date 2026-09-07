import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { navLinks } from '../data/portfolioData';
import { useLenis } from '../hooks/useLenis';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = ['work', 'experience', 'about', 'skills', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate mobile menu open/close
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(menu, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power3.out'
      });
      gsap.fromTo(
        mobileLinksRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(menu, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power3.in'
      });
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-surface/80 backdrop-blur-md border-b border-white/[0.06] py-3.5 shadow-2xl shadow-black/40'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Monogram */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center font-display text-lg md:text-xl font-bold tracking-tight text-brand-text select-none"
            aria-label="Jarir Multani Home"
          >
            <div className="relative flex items-center gap-1 px-3 py-1 rounded-lg border border-transparent group-hover:border-accent/40 group-hover:bg-accent/[0.06] group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300">
              <span className="text-white group-hover:text-accent font-orbitron italic transition-all duration-300 group-hover:-translate-y-0.5 inline-block">
                M
              </span>
              <span className="text-white group-hover:text-accent font-orbitron italic transition-all duration-300 group-hover:translate-y-0.5 inline-block">
                J
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform duration-300 ml-0.5 shadow-[0_0_6px_#38BDF8]" />
            </div>
          </a>

          {/* Desktop Center/Right Navigation with Unique Kinetic Rolling Text */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-brand-muted" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`group relative py-1.5 uppercase transition-colors duration-300 ${
                    isActive ? 'text-accent font-bold' : 'hover:text-white'
                  }`}
                >
                  {/* Kinetic dual-layer vertical text roll */}
                  <span className="relative block h-4 overflow-hidden leading-4 select-none">
                    <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                      {link.label}
                    </span>
                    <span className="block text-accent font-bold transition-transform duration-300 ease-out group-hover:-translate-y-full shadow-[0_0_10px_rgba(56,189,248,0.5)]">
                      {link.label}
                    </span>
                  </span>

                  {/* Laser underline with center expansion & glow */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-accent rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(56,189,248,0.9)] ${
                      isActive
                        ? 'w-full opacity-100'
                        : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right Status Badge (Desktop) */}
          <div className="hidden lg:flex items-center">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-accent hover:bg-accent/[0.08] hover:shadow-[0_0_18px_rgba(56,189,248,0.25)] hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-brand-muted group-hover:text-brand-text transition-colors">
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-text hover:text-accent focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 opacity-0 pointer-events-none md:hidden"
      >
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent font-semibold">
            NAVIGATION
          </p>
          <div className="flex flex-col gap-5">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                ref={(el) => (mobileLinksRef.current[idx] = el)}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group font-display text-3xl font-bold tracking-tight text-brand-text hover:text-accent flex items-center justify-between border-b border-white/[0.06] pb-3 transition-all duration-300 hover:pl-2"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                <ArrowUpRight size={22} className="text-brand-dim group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile footer within menu */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>
          <p className="font-mono text-[11px] text-brand-dim">
            SURAT, GUJARAT — INDIA
          </p>
        </div>
      </div>
    </>
  );
}

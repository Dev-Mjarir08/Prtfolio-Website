import React from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  icon = null,
  strength = 0.3,
  target,
  rel,
  ariaLabel
}) {
  const magneticRef = useMagnetic(strength);

  const baseStyles = "relative inline-flex items-center justify-center font-mono text-xs uppercase tracking-widest px-7 py-3.5 rounded-full transition-all duration-300 font-semibold group overflow-hidden select-none active:scale-[0.96]";

  const variants = {
    primary: "bg-white text-black hover:bg-accent hover:text-black hover:shadow-[0_0_30px_rgba(56,189,248,0.45)] hover:-translate-y-0.5",
    secondary: "bg-white/[0.04] text-brand-text border border-white/10 hover:border-accent hover:text-white hover:bg-accent/[0.06] hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:-translate-y-0.5 backdrop-blur-sm",
    accent: "bg-accent text-black hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-0.5",
    ghost: "bg-transparent text-brand-muted hover:text-accent border border-transparent hover:border-accent/40 hover:bg-accent/[0.04]",
    glass: "bg-surface-elevated/80 text-brand-text border border-white/10 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:-translate-y-0.5 backdrop-blur-md"
  };

  const content = (
    <>
      {/* Light beam sweep on hover */}
      <span className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 pointer-events-none" />

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2 transition-transform duration-300">
        {children}
        {icon && (
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-1.5">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={magneticRef}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={magneticRef}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {content}
    </button>
  );
}

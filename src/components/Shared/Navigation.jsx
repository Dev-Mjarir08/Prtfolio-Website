import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { profile } from '../../data/portfolio.js';

const navItems = [
  { href: '#about', label: 'Roots' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' }
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-nav ${solid ? 'is-solid' : ''}`}>
      <a className="font-display text-sm font-semibold tracking-[0.25em] text-cyan" href="#hero" data-cursor="magnetic">
        {profile.name}
      </a>
      <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="nav-link" data-cursor="magnetic">
            {item.label}
          </a>
        ))}
      </nav>
      <button type="button" className="nav-menu-button md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Menu">
        {open ? <FiX /> : <FiMenu />}
      </button>
      {open && (
        <div className="mobile-nav md:hidden">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

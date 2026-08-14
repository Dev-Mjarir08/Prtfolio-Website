import React, { useState, useEffect } from 'react';

export default React.memo(function Navbar({ data, setCursor, onToggleMenu, menuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    let timer = null;
    const handleScroll = () => {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        setScrolled(window.scrollY > 40);

        const sections = ['about', 'work', 'skills', 'process', 'contact'];
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 250 && rect.bottom >= 250) {
              setActiveSection(id);
              break;
            }
          }
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`} id="nav">
      <div className="nav__inner">
        <a 
          href="#hero" 
          className="nav__logo" 
          onMouseEnter={() => setCursor('hover', 'HOME')}
          onMouseLeave={() => setCursor('default')}
        >
          <img src="/assets/logo.png" alt="Jarir Multani Logo" className="nav__logo-img" />

          <span className="nav__logo-text">{data.personalInfo.name}</span>
        </a>


        <nav className="nav__links" id="navLinks">
          {[
            { id: 'about', label: 'About' },
            { id: 'work', label: 'Projects' },
            { id: 'skills', label: 'Skills' },
            { id: 'process', label: 'Process' },
            { id: 'contact', label: 'Contact' }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav__link ${activeSection === item.id ? 'is-active' : ''}`}
              onMouseEnter={() => setCursor('hover', item.label)}
              onMouseLeave={() => setCursor('default')}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <a 
          href="#contact" 
          className="nav__cta magnetic"
          onMouseEnter={() => setCursor('hover', 'CONNECT')}
          onMouseLeave={() => setCursor('default')}
        >
          <span className="btn-shine">Let's Connect</span>
        </a>

        <button 
          className={`nav__burger ${menuOpen ? 'is-active' : ''}`} 
          onClick={onToggleMenu}
          aria-label="Toggle Navigation Menu"
          onMouseEnter={() => setCursor('hover', menuOpen ? 'CLOSE' : 'MENU')}
          onMouseLeave={() => setCursor('default')}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
});


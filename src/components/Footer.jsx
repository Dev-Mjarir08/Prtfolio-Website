import React from 'react';

export default function Footer({ data, setCursor, lenis }) {
  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer__top">
        <h2 
          className="footer__logo"
          onMouseEnter={() => setCursor('view', 'JARIR')}
          onMouseLeave={() => setCursor('default')}
        >
          {data.personalInfo.name}
        </h2>
        <button 
          className="footer__totop magnetic" 
          onClick={scrollToTop}
          onMouseEnter={() => setCursor('hover', 'TOP')}
          onMouseLeave={() => setCursor('default')}
        >
          <i>&#8593;</i>
          <span>Back to top</span>
        </button>
      </div>

      <div className="footer__grid">
        <div className="footer__col">
          <span className="footer__label">Navigation</span>
          <a href="#about">About</a>
          <a href="#work">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer__col">
          <span className="footer__label">Social</span>
          <a 
            href={data.personalInfo.github} 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={() => setCursor('hover', 'GITHUB')}
            onMouseLeave={() => setCursor('default')}
          >
            GitHub
          </a>
          <a 
            href={data.personalInfo.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={() => setCursor('hover', 'LINKEDIN')}
            onMouseLeave={() => setCursor('default')}
          >
            LinkedIn
          </a>
        </div>
        <div className="footer__col footer__col--wide">
          <span className="footer__label">Contact</span>
          <a 
            href={`mailto:${data.personalInfo.email}`}
            onMouseEnter={() => setCursor('hover', 'MAIL')}
            onMouseLeave={() => setCursor('default')}
          >
            {data.personalInfo.email}
          </a>
          <p>{data.personalInfo.address}<br />{data.personalInfo.phone}</p>
        </div>
      </div>

      <div className="footer__base">
        <span>&copy; 2026 {data.personalInfo.name} — All rights reserved.</span>
        <span>Engineered with passion &amp; clean code.</span>
      </div>
    </footer>
  );
}

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MobileMenu({ data, isOpen, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();

      tl.to(menuRef.current, {
        display: 'flex',
        opacity: 1,
        pointerEvents: 'all',
        duration: 0.3
      })
      .fromTo('.menu__list li', 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
      )
      .fromTo('.menu__footer',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(menuRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        onComplete: () => {
          if (menuRef.current) menuRef.current.style.display = 'none';
        }
      });
    }
  }, [isOpen]);

  const menuItems = [
    { num: '01', word: 'About', href: '#about' },
    { num: '02', word: 'Projects', href: '#work' },
    { num: '03', word: 'Skills', href: '#skills' },
    { num: '04', word: 'Process', href: '#process' },
    { num: '05', word: 'Contact', href: '#contact' },
  ];

  return (
    <div ref={menuRef} className="menu" id="menu" style={{ display: 'none', opacity: 0 }}>
      <div className="menu__index">Menu — 05</div>
      <ul className="menu__list">
        {menuItems.map((item) => (
          <li key={item.num}>
            <a href={item.href} onClick={onClose}>
              <span className="menu__num">{item.num}</span>
              <span className="menu__word">{item.word}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="menu__footer">
        <a href={`mailto:${data.personalInfo.email}`}>{data.personalInfo.email}</a>
        <div className="menu__socials">
          <a href={data.personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}

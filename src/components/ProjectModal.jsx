import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import gsap from 'gsap';

export default function ProjectModal({ project, onClose, setCursor }) {
  const modalRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = 'hidden';

    if (modalRef.current && cardRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(cardRef.current,
        { y: 30, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' }
      );
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setCursor('default');

    if (modalRef.current && cardRef.current) {
      gsap.to(cardRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.96,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div 
      ref={modalRef} 
      className="project-modal" 
      onClick={handleClose}
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
    >
      <div 
        ref={cardRef}
        className="project-modal__card" 
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setCursor('default')}
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
      >
        {/* Sticky Glowing Gold Close Button */}
        <button 
          className="project-modal__close" 
          onClick={handleClose}
          aria-label="Close modal"
          onMouseEnter={() => setCursor('hover', 'CLOSE')}
          onMouseLeave={() => setCursor('default')}
        >
          ✕
        </button>

        {/* Modal Top Header */}
        <div className="project-modal__header">
          <div className="project-modal__header-left">
            <span className="project-modal__id">PROJECT {project.id}</span>
            <span className="project-modal__cat">{project.category}</span>
          </div>
        </div>

        {/* Hero Media Banner */}
        <div className="project-modal__hero">
          <img src={project.image} alt={project.title} />
          <div className="project-modal__overlay">
            <h2>{project.title}</h2>
          </div>
        </div>

        {/* Modal Content Details */}
        <div className="project-modal__content">
          <div className="project-modal__meta">
            <div>
              <span className="tick">Client / Context</span>
              <p>{project.details?.client || 'Personal Exploration'}</p>
            </div>
            <div>
              <span className="tick">Release Year</span>
              <p>{project.details?.year || '2026'}</p>
            </div>
            <div>
              <span className="tick">Technologies</span>
              <div className="project__tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="project-modal__body">
            <h3>Executive Overview</h3>
            <p>{project.details?.overview || project.description}</p>

            {project.details?.features && (
              <div className="project-modal__highlights">
                <h4>Key Highlights & Architecture</h4>
                <ul className="project-modal__features">
                  {project.details.features.map((feat, idx) => (
                    <li key={idx}>
                      <span className="feat-check">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="project-modal__actions">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn--fill magnetic"
              onMouseEnter={() => setCursor('hover', 'REPO')}
              onMouseLeave={() => setCursor('default')}
            >
              <span>GitHub Repository</span>
              <i className="btn__arrow">&#8594;</i>
            </a>
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn--ghost magnetic"
              onMouseEnter={() => setCursor('hover', 'DEMO')}
              onMouseLeave={() => setCursor('default')}
            >
              <span>Live Demo ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

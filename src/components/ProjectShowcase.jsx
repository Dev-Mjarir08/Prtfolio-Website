import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectModal from './ProjectModal';

gsap.registerPlugin(ScrollTrigger);

export default React.memo(function ProjectShowcase({ projects, setCursor, mousePos }) {
  const showcaseRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  useEffect(() => {
    if (!showcaseRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal project cards sequentially
      const cards = gsap.utils.toArray('.project-card');
      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            onEnter: () => setActiveProjectIdx(index)
          }
        });
      });
    }, showcaseRef);

    return () => ctx.revert();
  }, []);

  // 3D image tilt distortion on hover
  const getTiltTransform = (cardId) => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return {};
    const x = (mousePos.x / window.innerWidth - 0.5) * 8;
    const y = (mousePos.y / window.innerHeight - 0.5) * 8;
    return {
      transform: `perspective(1000px) rotateY(${x.toFixed(1)}deg) rotateX(${(-y).toFixed(1)}deg) scale3d(1.02, 1.02, 1.02)`
    };
  };

  return (
    <section ref={showcaseRef} className="work" id="work">
      <div className="section-head">
        <span className="section-head__index">04</span>
        <h2 className="section-head__title reveal-text">Selected Work</h2>
        <span className="section-head__note">Featured Repositories — 2024 / 2026</span>
      </div>

      <div className="project-showcase-grid">
        {projects.map((project, idx) => {
          const isReverse = idx % 2 !== 0;
          return (
            <article 
              key={project.id} 
              className={`project project-card ${isReverse ? 'project--reverse' : ''}`}
              onClick={() => setSelectedProject(project)}
            >
              <div 
                className="project__media"
                style={getTiltTransform(project.id)}
                onMouseEnter={() => setCursor('view', 'PROJECT')}
                onMouseLeave={() => setCursor('default')}
              >
                <div className="reveal-img">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    width="1200" 
                    height="896" 
                    loading="lazy"
                    decoding="async" 
                  />
                  <div className="project__media-badge">EXPLORE DETAILS ↗</div>
                </div>
                <span className="project__cat">{project.category}</span>
              </div>

              <div className="project__info">
                <span className="project__index">{project.id}</span>
                <h3 className="project__title">{project.title}</h3>
                <p className="project__desc">{project.description}</p>
                <div className="project__tags">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx}>{tag}</span>
                  ))}
                </div>
                <div className="project__links">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="link-underline magnetic"
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={() => setCursor('hover', 'REPO')}
                    onMouseLeave={() => setCursor('default')}
                  >
                    GitHub Repository
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="link-underline magnetic"
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={() => setCursor('hover', 'DEMO')}
                    onMouseLeave={() => setCursor('default')}
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        setCursor={setCursor}
      />
    </section>
  );
});


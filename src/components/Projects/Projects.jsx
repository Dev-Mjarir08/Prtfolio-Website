import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi';
import { projects } from '../../data/portfolio.js';
import { SectionTitle } from '../Shared/SectionTitle.jsx';
import { MagneticButton } from '../Shared/MagneticButton.jsx';

export function Projects() {
  const [active, setActive] = useState(null);

  return (
    <section id="projects" className="section-root projects-section">
      <SectionTitle
        eyebrow="Project Ecosystems"
        title="Floating products around the canopy."
        copy="Each ecosystem carries a product problem, stack choices, and the result it was grown to produce."
      />
      <div className="project-ecosystems">
        <div className="project-tree-core" aria-hidden="true" />
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.button
              key={project.title}
              type="button"
              className={`project-planet project-planet-${index}`}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              onClick={() => setActive(project)}
              data-cursor="magnetic"
            >
              <span className="project-orb">
                <Icon />
              </span>
              <strong>{project.title}</strong>
              <small>{project.tagline}</small>
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      className="project-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        className="project-modal"
        initial={{ opacity: 0, scale: 0.86, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close project modal">
          <FiX />
        </button>
        <span className="modal-eyebrow">Featured build</span>
        <h3>{project.title}</h3>
        <p>{project.tagline}</p>
        <div className="modal-preview" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="modal-impact">{project.impact}</p>
        <ul>
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="modal-actions">
          <MagneticButton href={project.live}>
            Live Demo <FiExternalLink />
          </MagneticButton>
          <MagneticButton href={project.github} variant="secondary">
            GitHub <FiGithub />
          </MagneticButton>
        </div>
      </motion.article>
    </motion.div>
  );
}

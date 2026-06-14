import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/portfolio.js';
import { SectionTitle } from '../Shared/SectionTitle.jsx';
import { scaleIn, stagger } from '../../animations/variants.js';

export function Skills() {
  const [active, setActive] = useState(skills[0]);

  return (
    <section id="skills" className="section-root skills-section">
      <SectionTitle
        eyebrow="Skill Fruits"
        title="Technologies that keep the tree productive."
        copy="Each glowing fruit represents a practical capability across interface, API, database, and deployment work."
      />
      <motion.div
        className="skill-orchard"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="orchard-branch branch-left" />
        <div className="orchard-branch branch-right" />
        <div className="orchard-trunk grow-line" />
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.button
              key={skill.name}
              type="button"
              className={`skill-fruit skill-fruit-${index} ${active.name === skill.name ? 'is-active' : ''}`}
              variants={scaleIn}
              onMouseEnter={() => setActive(skill)}
              onFocus={() => setActive(skill)}
              data-cursor="magnetic"
            >
              <Icon />
              <span>{skill.name}</span>
            </motion.button>
          );
        })}
        <motion.aside
          className="skill-detail"
          key={active.name}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <span>{active.category}</span>
          <h3>{active.name}</h3>
          <p>{active.detail}</p>
        </motion.aside>
      </motion.div>
    </section>
  );
}
